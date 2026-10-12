#!/usr/bin/env python3
"""Extract a bilingual page pair into one template + two [name] TOML sections.

Usage: python3 scripts/extract-copy.py <name>
<name> is the template path without .html, e.g. "index", "showcases",
"changelog", "get-started/index", "product/agents/index". Sources mirror the
build targets: zh at <name>.html (index: ./index.html; showcases:
zh/showcases.html), en at en/<name>.html. Writes templates/<name>.html with
{{section.key}} placeholders and appends a [name] section (dotted for
subdirectories, e.g. [product.agents]) to copy/zh.toml and copy/en.toml.

The transformer is regex-based so markup (attribute case, void elements,
entities, indentation) survives byte-for-byte except for substitutions:

- text nodes become p001, p002, ... in page order; text matching a [site]
  value reuses its site key
- the language switch link uses {{site.switch_href}} / {{site.switch_lang}}
- hrefs and copy attrs (content/title/aria-label/alt/placeholder/value) are
  sentinel tokens resolved after both locales parse: identical raws stay
  hardcoded, hrefs differing only by the locale base become
  {{site.base}}<rest>, everything else becomes h001/h002... or a001... keys
- only copy attrs whose value matches a [site] value reuse that site key;
  fixed attrs like hreflang stay literal (their values are language codes
  that map to different site keys per locale)
- the html lang attribute uses {{site.lang}}

Rename keys and split long values into short phrases afterwards, then run
scripts/build-copy.py.

Re-run only after editing the source pages; re-running appends a duplicate
[name] section, so remove the old one first.
"""
import re
import sys
import tomllib
from pathlib import Path

root = Path(__file__).resolve().parent.parent
name = sys.argv[1]
section = name[:-len("/index")] if name.endswith("/index") else name
section = section.replace("/", ".")
if name == "index":
    sources = {"zh": root / "index.html", "en": root / "en" / "index.html"}
elif name == "showcases":
    sources = {"zh": root / "zh" / "showcases.html", "en": root / "en" / "showcases.html"}
else:
    sources = {"zh": root / (name + ".html"), "en": root / "en" / (name + ".html")}

# text and attr values that already exist in [site] reuse their site key.
# A value may only reuse a site key when every locale containing it maps to
# the same key: locale-relative values such as "/" (zh site.base vs en
# site.switch_href) or "zh-CN" (site.lang vs site.switch_lang) would render
# the wrong locale's value, so they stay literal or become page keys.
per_locale_site = {}
for loc in ("zh", "en"):
    m = {}
    for k, v in tomllib.load(open(root / "copy" / f"{loc}.toml", "rb"))["site"].items():
        if isinstance(v, str):
            m.setdefault(v, "site." + k)
    per_locale_site[loc] = m
site_values = per_locale_site["zh"]
unsafe_site_values = set()
for v in set().union(*(set(m) for m in per_locale_site.values())):
    if len({m[v] for m in per_locale_site.values() if v in m}) > 1:
        unsafe_site_values.add(v)

COPY_ATTRS = {"content", "title", "aria-label", "alt", "placeholder", "value"}
SENTINEL = "\x00K:"
SENT = re.compile(re.escape(SENTINEL) + r"(.*?)\x00", re.S)
TAG_SPLIT = re.compile(r"(<[^>]*>)")
ATTR = re.compile(r"([\w:-]+)\s*=\s*(\"([^\"]*)\"|'([^']*)')")
TAGNAME = re.compile(r"<\s*(/?)([a-zA-Z][\w:-]*)")
LANG_ATTR = re.compile(r"(?<![-\w])lang\s*=")


class Extractor:
    def __init__(self, site_map):
        self.site_map = site_map
        self.copy = {}
        self.n = 0

    def key(self, text):
        if text in self.site_map and text not in unsafe_site_values:
            return self.site_map[text]
        self.n += 1
        k = f"p{self.n:03d}"
        self.copy[k] = text
        return section + "." + k

    def transform_tag(self, tag):
        m = TAGNAME.match(tag)
        tagname = m.group(2).lower() if m else ""
        is_switch = tagname == "a" and LANG_ATTR.search(tag) is not None

        def repl(am):
            attr, quoted = am.group(1), am.group(2)
            val = am.group(3) if am.group(3) is not None else am.group(4)
            q = quoted[0]
            if tagname == "html" and attr == "lang":
                new = "{{site.lang}}"
            elif is_switch and attr == "lang":
                new = "{{site.switch_lang}}"
            elif is_switch and attr == "href":
                new = "{{site.switch_href}}"
            elif attr == "href":
                new = SENTINEL + val + "\x00"
            elif attr in COPY_ATTRS and val in self.site_map and val not in unsafe_site_values:
                # only copy attrs may reuse a [site] value; fixed attrs such
                # as hreflang carry language codes that mean different site
                # keys per locale and must stay literal
                new = "{{" + self.site_map[val] + "}}"
            elif attr in COPY_ATTRS and val.strip():
                new = SENTINEL + val + "\x00"
            else:
                return am.group(0)
            return f"{attr}={q}{new}{q}"

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
                # indentation (whitespace containing newlines) stays literal so
                # pretty-printed pages round-trip byte-for-byte; pure space
                # padding moves into the value so per-locale spacing around
                # inline tags does not diverge the templates
                wm = re.match(r"^(\s*)(.*?)(\s*)$", part, re.S)
                lead, core, trail = wm.group(1), wm.group(2), wm.group(3)
                lead_lit = lead if "\n" in lead else ""
                trail_lit = trail if "\n" in trail else ""
                value = lead[len(lead_lit):] + core + trail[: len(trail) - len(trail_lit)]
                out.append(lead_lit + "{{" + self.key(value) + "}}" + trail_lit)
        return "".join(out)


parsed = {}
for loc in ("zh", "en"):
    ex = Extractor(per_locale_site[loc])
    parsed[loc] = (ex.run(sources[loc].read_text(encoding="utf-8")), ex)

# resolve sentinels positionally
zh_html, en_html = parsed["zh"][0], parsed["en"][0]
zh_parts, en_parts = SENT.split(zh_html), SENT.split(en_html)
if len(zh_parts) != len(en_parts):
    sys.exit(f"{name}: sentinel count diverged (zh {len(zh_parts) // 2}, en {len(en_parts) // 2})")
bases = {"zh": "/", "en": "/en/"}
keys = {"zh": {}, "en": {}}
out = {"zh": [], "en": []}
kn = 0
for i in range(0, len(zh_parts) - 1, 2):
    out["zh"].append(zh_parts[i])
    out["en"].append(en_parts[i])
    raw = {"zh": zh_parts[i + 1], "en": en_parts[i + 1]}
    if raw["zh"] == raw["en"]:
        tok = raw["zh"]  # same in both locales: keep hardcoded
    else:
        rest = {loc: v[len(bases[loc]):] if v.startswith(bases[loc]) else None for loc, v in raw.items()}
        if rest["zh"] is not None and rest["zh"] == rest["en"]:
            tok = "{{site.base}}" + rest["zh"]
        else:
            kn += 1
            k = f"k{kn:03d}"
            for loc in ("zh", "en"):
                keys[loc][k] = raw[loc]
            tok = "{{" + section + "." + k + "}}"
    out["zh"].append(tok)
    out["en"].append(tok)
out["zh"].append(zh_parts[-1])
out["en"].append(en_parts[-1])

templates = {"zh": "".join(out["zh"]), "en": "".join(out["en"])}
if templates["zh"] != templates["en"]:
    sys.exit(f"{name}: zh and en templates diverged")

out_tpl = root / "templates" / (name + ".html")
out_tpl.parent.mkdir(parents=True, exist_ok=True)
out_tpl.write_text(templates["zh"], encoding="utf-8")
for loc in ("zh", "en"):
    cp = dict(parsed[loc][1].copy)
    cp.update(keys[loc])
    with open(root / "copy" / f"{loc}.toml", "a", encoding="utf-8") as f:
        f.write(f"\n[{section}]\n")
        for k, v in cp.items():
            f.write(f'{k} = "{v.replace(chr(92), chr(92) * 2).replace(chr(34), chr(92) + chr(34))}"\n')
        print(f"{loc}: {len(cp)} page keys ({len(keys[loc])} resolved keys)")
print(f"wrote templates/{name}.html")
