#!/usr/bin/env python3
"""Inject static <title> and meta description into built HTML shells from copy/zh.toml.

The React pages are client-rendered (no SSR), so each dist HTML needs static
zh SEO tags for crawlers and no-JS visitors. copy/zh.toml is the single source
of truth; the src/pages/*.html shells carry no copy of their own.

Usage: python3 scripts/inject-seo.py   (after `vite build` + page rename in postbuild.mjs)
"""
import re
import tomllib
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
COPY = tomllib.loads((ROOT / "copy" / "zh.toml").read_text(encoding="utf-8"))

# dist page path -> (toml section, [keys: first is title, rest join into description])
PAGES = {
    "index.html": ("index", ["title", "meta1", "meta2", "meta3", "meta4"]),
    "get-started/index.html": ("get-started", ["title", "meta1", "meta2"]),
    "community/index.html": ("community", ["title", "meta1", "meta2"]),
    "self-hosting/index.html": ("self-hosting", ["title", "meta"]),
    "self-hosting/costs/index.html": ("self-hosting.costs", ["title", "meta"]),
    "integrations/index.html": ("integrations", ["title", "meta"]),
    "product/agents/index.html": ("product.agents", ["title", "meta"]),
    "showcases.html": ("showcases", ["title", "meta"]),
}


def copy_keys(section: str, keys: list[str]) -> list[str]:
    node = COPY
    for part in section.split("."):
        node = node[part]
    return [node[k] for k in keys]


def main() -> None:
    for rel, (section, keys) in PAGES.items():
        f = DIST / rel
        if not f.exists():
            continue
        vals = copy_keys(section, keys)
        title = escape(vals[0])
        desc = escape("".join(vals[1:]))
        html = f.read_text(encoding="utf-8")
        # Normalize: drop any existing hand-written tags, then insert fresh ones.
        html = re.sub(r"\s*<title>[^<]*</title>", "", html, count=1)
        html = re.sub(r'\s*<meta name="description" content="[^"]*"\s*/?>', "", html, count=1)
        tags = f'\n    <title>{title}</title>\n    <meta name="description" content="{desc}" />'
        html = html.replace("</head>", tags + "\n  </head>", 1)
        f.write_text(html, encoding="utf-8")
        print(f"injected seo → {rel}")


if __name__ == "__main__":
    main()