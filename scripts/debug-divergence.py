#!/usr/bin/env python3
"""Debug helper: list every structural divergence between a bilingual page pair.

Usage: python3 scripts/debug-divergence.py <name>
<name> uses the same mapping as extract-copy.py. Runs the extractor transform
on both locales, resolves href sentinels, and prints every position where the
two templates differ, with context, so the source pages can be aligned.
"""
import re
import sys
import tomllib
from pathlib import Path

root = Path(__file__).resolve().parent.parent
name = sys.argv[1]
if name == "index":
    sources = {"zh": root / "index.html", "en": root / "en" / "index.html"}
elif name == "showcases":
    sources = {"zh": root / "zh" / "showcases.html", "en": root / "en" / "showcases.html"}
else:
    sources = {"zh": root / (name + ".html"), "en": root / "en" / (name + ".html")}

site_values = {}
for loc in ("zh", "en"):
    for k, v in tomllib.load(open(root / "copy" / f"{loc}.toml", "rb"))["site"].items():
        if isinstance(v, str):
            site_values.setdefault(v, "site." + k)

COPY_ATTRS = {"content", "title", "aria-label", "alt", "placeholder", "value"}
SENTINEL = "\x00K:"
TAG_SPLIT = re.compile(r"(<[^>]*>)")
ATTR = re.compile(r"([\w:-]+)\s*=\s*(\"([^\"]*)\"|'([^']*)')")
TAGNAME = re.compile(r"<\s*(/?)([a-zA-Z][\w:-]*)")
LANG_ATTR = re.compile(r"(?<![-\w])lang\s*=")
SENT = re.compile(re.escape(SENTINEL) + r"(.*?)\x00", re.S)
bases = {"zh": "/", "en": "/en/"}


class Ex:
    def __init__(self):
        self.copy, self.n = {}, 0

    def key(self, text):
        if text in site_values:
            return site_values[text]
        self.n += 1
        k = f"p{self.n:03d}"
        self.copy[k] = text
        return "P." + k

    def transform_tag(self, tag):
        m = TAGNAME.match(tag)
        tagname = m.group(2).lower() if m else ""
        is_switch = tagname == "a" and LANG_ATTR.search(tag) is not None

        def repl(am):
            attr, quoted = am.group(1), am.group(2)
            val = am.group(3) if am.group(3) is not None else am.group(4)
            q = quoted[0]
            if tagname == "html" and attr == "lang":
                return f'lang={q}{{{{site.lang}}}}{q}'
            if is_switch and attr == "lang":
                return f'lang={q}{{{{site.switch_lang}}}}{q}'
            if is_switch and attr == "href":
                return f'href={q}{{{{site.switch_href}}}}{q}'
            if attr == "href":
                return f'href={q}{SENTINEL}{val}\x00{q}'
            if val in site_values:
                return f'{attr}={q}{{{{{site_values[val]}}}}}{q}'
            if attr in COPY_ATTRS and val.strip():
                return f'{attr}={q}{SENTINEL}{val}\x00{q}'
            return am.group(0)

        return ATTR.sub(repl, tag)

    def run(self, html):
        out, skip = [], False
        for part in TAG_SPLIT.split(html):
            if part.startswith("<"):
                m = TAGNAME.match(part)
                tagname = m.group(2).lower() if m else ""
                if tagname in ("script", "style"):
                    skip = not part.startswith("</")
                out.append(self.transform_tag(part))
            elif skip or not part.strip():
                out.append(part)
            else:
                wm = re.match(r"^(\s*)(.*?)(\s*)$", part, re.S)
                lead, core, trail = wm.group(1), wm.group(2), wm.group(3)
                lead_lit = lead if "\n" in lead else ""
                trail_lit = trail if "\n" in trail else ""
                value = lead[len(lead_lit):] + core + trail[: len(trail) - len(trail_lit)]
                out.append(lead_lit + "{{" + self.key(value) + "}}" + trail_lit)
        return "".join(out)


ex = {"zh": Ex(), "en": Ex()}
raw = {loc: ex[loc].run(sources[loc].read_text(encoding="utf-8")) for loc in ("zh", "en")}
parts = {loc: SENT.split(raw[loc]) for loc in raw}
if len(parts["zh"]) != len(parts["en"]):
    sys.exit(f"sentinel count diverged: zh {len(parts['zh']) // 2}, en {len(parts['en']) // 2}")
out = {"zh": [], "en": []}
for i in range(0, len(parts["zh"]) - 1, 2):
    for loc in out:
        out[loc].append(parts[loc][i])
    r = {loc: parts[loc][i + 1] for loc in parts}
    if r["zh"] == r["en"]:
        tok = r["zh"]
    else:
        rest = {loc: v[len(bases[loc]):] if v.startswith(bases[loc]) else None for loc, v in r.items()}
        tok = "{{site.base}}" + rest["zh"] if rest["zh"] is not None and rest["zh"] == rest["en"] else "{{K}}"
    for loc in out:
        out[loc].append(tok)
for loc in out:
    out[loc].append(parts[loc][-1])
ta, tb = "".join(out["zh"]), "".join(out["en"])

diverged = False
for i in range(len(parts["zh"])):
    if parts["zh"][i] != parts["en"][i]:
        diverged = True
        print(f"--- segment #{i} differs:")
        print("ZH:", repr(parts["zh"][i][:220]))
        print("EN:", repr(parts["en"][i][:220]))
if not diverged:
    print("literal segments identical; sentinel raws differ only:")
    for i in range(1, len(parts["zh"]), 2):
        if parts["zh"][i] != parts["en"][i]:
            print(f"sentinel #{i}: zh={parts['zh'][i][:90]!r} en={parts['en'][i][:90]!r}")
elif len(parts["zh"]) != len(parts["en"]):
    print("segment count differs:", len(parts["zh"]), len(parts["en"]))
