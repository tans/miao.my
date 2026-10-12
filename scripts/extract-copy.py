#!/usr/bin/env python3
"""Extract a bilingual page pair into one template + two [name] TOML sections.

Usage: python3 scripts/extract-copy.py <name>
<name> is the template path without .html, e.g. "index", "showcases",
"changelog", "get-started/index", "product/agents/index". Sources mirror the
build targets: zh at <name>.html (index: ./index.html; showcases:
zh/showcases.html), en at en/<name>.html. Writes templates/<name>.html with
{{section.key}} placeholders and appends a [name] section (dotted for
subdirectories, e.g. [product.agents]) to copy/zh.toml and copy/en.toml.

Shared nav/footer/brand text that already exists in [site] reuses its site key;
everything else becomes p001, p002, ... in page order. Rename keys and split
long values into short phrases afterwards, then run scripts/build-copy.py.

Re-run only after editing the source pages; re-running appends a duplicate
[name] section, so remove the old one first.
"""
import sys
import tomllib
from html.parser import HTMLParser
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

# text and hrefs that already exist in [site] reuse their site key
site_values = {}
for loc in ("zh", "en"):
    for k, v in tomllib.load(open(root / "copy" / f"{loc}.toml", "rb"))["site"].items():
        if isinstance(v, str):
            site_values.setdefault(v, "site." + k)

VOID = {"br", "img", "input", "use", "path", "symbol", "rect", "ellipse", "circle", "line"}
COPY_ATTRS = {"content", "title", "aria-label", "alt", "placeholder", "value"}


class Extract(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out, self.copy, self.n = [], {}, 0

    def key(self, text):
        if text in site_values:
            return site_values[text]
        self.n += 1
        k = f"p{self.n:03d}"
        self.copy[k] = text
        return k

    def attr(self, tag, n, v):
        if v is None:
            return n
        if tag == "html" and n == "lang":
            return 'lang="{{site.lang}}"'
        if v in site_values:  # nav links, language switch, brand
            return f'{n}="{{{{{site_values[v]}}}}}"'
        if n in COPY_ATTRS and v.strip():
            return f'{n}="{{{{{self.key(v)}}}}}"'
        return f'{n}="{v}"'

    def handle_starttag(self, tag, attrs):
        a = [self.attr(tag, n, v) for n, v in attrs]
        self.out.append(f"<{tag}" + (f" {' '.join(a)}" if a else "") + ("/>" if tag in VOID else ">"))

    def handle_endtag(self, tag):
        self.out.append(f"</{tag}>")

    def handle_data(self, d):
        self.out.append(d if not d.strip() else "{{" + self.key(d) + "}}")

    def handle_entityref(self, n):
        self.out.append(f"&{n};")

    def handle_charref(self, n):
        self.out.append(f"&#{n};")


templates, copies = [], {}
for loc in ("zh", "en"):
    p = Extract()
    p.feed(sources[loc].read_text(encoding="utf-8"))
    t = "".join(p.out)
    if templates:
        assert t == templates[0], f"{loc} template diverged from {templates[0]!r}"
    templates.append(t)
    copies[loc] = p.copy

out_tpl = root / "templates" / (name + ".html")
out_tpl.parent.mkdir(parents=True, exist_ok=True)
out_tpl.write_text(templates[0], encoding="utf-8")
for loc, cp in copies.items():
    with open(root / "copy" / f"{loc}.toml", "a", encoding="utf-8") as f:
        f.write(f"\n[{section}]\n")
        for k, v in cp.items():
            f.write(f'{k} = "{v.replace(chr(92), chr(92) * 2).replace(chr(34), chr(92) + chr(34))}"\n')
        print(f"{loc}: {len(cp)} page keys")
print(f"wrote templates/{name}.html")
