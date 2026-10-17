#!/usr/bin/env python3
"""Inject static <title> and meta description into built HTML shells from copy/zh.toml.

The React pages are client-rendered (no SSR), so each dist HTML needs static
zh SEO tags for crawlers and no-JS visitors. copy/zh.toml is the single source
of truth; the src/pages/*.html shells carry no copy of their own.

Usage: python3 scripts/inject-seo.py   (after `vite build` + page rename in postbuild.mjs)
"""
import json
import re
import tomllib
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
COPY = tomllib.loads((ROOT / "copy" / "zh.toml").read_text(encoding="utf-8"))
SITE_PAGES = json.loads((ROOT / "web" / "site-pages.json").read_text(encoding="utf-8"))


def copy_keys(section: str, keys: list[str]) -> list[str]:
    node = COPY
    for part in section.split("."):
        node = node[part]
    return [node[k] for k in keys]


def main() -> None:
    for page in SITE_PAGES:
        rel = page["output"]
        f = DIST / rel
        if not f.exists():
            continue
        vals = copy_keys(page["seo"]["section"], page["seo"]["keys"])
        title = escape(vals[0])
        desc = escape("".join(vals[1:]))
        html = f.read_text(encoding="utf-8")
        # Normalize: drop any existing hand-written tags, then insert fresh ones.
        html = re.sub(r"\s*<title>[^<]*</title>", "", html, count=1)
        html = re.sub(r'\s*<meta name="description" content="[^"]*"\s*/?>', "", html, count=1)
        # Idempotent JSON-LD: remove any previously injected block.
        html = re.sub(
            r'\s*<script type="application/ld\+json">.*?</script>',
            "",
            html,
            count=1,
            flags=re.S,
        )
        url = "/" if rel == "index.html" else "/" + rel
        schema = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": title,
            "url": f"https://miao.my{url}",
            "description": desc,
            "inLanguage": "zh-CN",
        }
        ld = (
            f'\n    <script type="application/ld+json">'
            f'{__import__("json").dumps(schema, ensure_ascii=False)}'
            f'</script>'
        )
        tags = f'\n    <title>{title}</title>\n    <meta name="description" content="{desc}" />{ld}'
        html = html.replace("</head>", tags + "\n  </head>", 1)
        f.write_text(html, encoding="utf-8")
        print(f"injected seo → {rel}")


if __name__ == "__main__":
    main()
