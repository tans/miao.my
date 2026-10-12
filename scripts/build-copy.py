#!/usr/bin/env python3
"""Render templates/**/*.html with copy/{zh,en}.toml into the final site paths.

Usage: python3 scripts/build-copy.py
Each template renders twice: zh at its own path, en under en/. Two templates
override the default: index renders to ./index.html + en/index.html (same as
the default), showcases renders to zh/showcases.html + en/showcases.html so
root showcases.html can stay a redirect to the English page.
Generated HTML is committed; Vercel deploys the repo as-is, no build command.

Guards: a {{key}} with no TOML value fails the build, and a TOML value no
template uses fails the build (catches typos and dead copy).
"""
import re
import sys
import tomllib
from pathlib import Path

root = Path(__file__).resolve().parent.parent
templates = sorted((root / "templates").glob("**/*.html"))
if not templates:
    sys.exit("no templates in templates/")

PLACEHOLDER = re.compile(r"\{\{([\w.-]+)\}\}")

# template path relative to templates/ -> (zh target, en target); the default
# renders zh to the same path and en under en/.
OVERRIDES = {
    "showcases.html": ("zh/showcases.html", "en/showcases.html"),
}


def targets(rel):
    return OVERRIDES.get(rel, (rel, "en/" + rel))


def flatten(d, prefix=""):
    out = {}
    for k, v in d.items():
        key = prefix + k
        if isinstance(v, dict):
            out.update(flatten(v, key + "."))
        else:
            out[key] = v
    return out


def render(template, values, label):
    used = []

    def sub(m):
        key = m.group(1)
        if key not in values:
            sys.exit(f"{label}: missing TOML key {{{{{key}}}}}")
        used.append(key)
        return values[key]

    html = PLACEHOLDER.sub(sub, template)
    html = re.sub(r"\n[ \t]+\n", "\n", html)  # drop whitespace-only lines left by empty values
    if "{{" in html:
        sys.exit(f"{label}: unrendered placeholder remains")
    return html, used


used_total = set()
for locale, subdir in (("zh", None), ("en", "en")):
    values = flatten(tomllib.load(open(root / "copy" / (locale + ".toml"), "rb")))
    for t in templates:
        rel = t.relative_to(root / "templates").as_posix()
        zh_target, en_target = targets(rel)
        out = root / (en_target if subdir else zh_target)
        out.parent.mkdir(parents=True, exist_ok=True)
        html, used = render(t.read_text(encoding="utf-8"), values, f"{locale}/{rel}")
        used_total.update(used)
        out.write_text(html, encoding="utf-8")
        print("wrote", out.relative_to(root))

all_keys = set()
for locale in ("zh", "en"):
    all_keys.update(flatten(tomllib.load(open(root / "copy" / (locale + ".toml"), "rb"))))
unused = all_keys - used_total
if unused:
    sys.exit("unused TOML keys: " + ", ".join(sorted(unused)))
print("ok")
