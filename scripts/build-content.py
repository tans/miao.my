#!/usr/bin/env python3
"""Generate examples.html and changelog.html as single bilingual pages.

Content source: content/examples.{zh,en}.md, content/changelog.{zh,en}.md
Page skeleton: content/layouts/{kind}.{locale}.html ({{CARDS}} / {{ENTRIES}}
placeholder) — one bilingual page per kind: both languages ship in one HTML,
switched client-side by assets/js/site-switch.js (see scripts/bilingual.py).

Usage: python3 scripts/build-content.py
The generated HTML is what Vercel deploys via web/scripts/postbuild.mjs;
keep the Markdown as the editable source and re-run this script after edits.
"""
from html import escape
from pathlib import Path
import re
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent))
from bilingual import merge_bilingual

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "content"
LAYOUTS = CONTENT / "layouts"


def parse_sections(text: str):
    """Split into # title block, then ## entries with - field: value and body lines."""
    head, body = text.split("\n\n", 1) if "\n\n" in text else (text, "")
    sections = []
    current = None
    for line in body.splitlines():
        if line.startswith("## "):
            if current:
                sections.append(current)
            current = {"title": line[3:].strip(), "fields": {}, "body": []}
        elif current is not None:
            match = re.match(r"^- ([a-z_]+):\s*(.*)$", line)
            if match:
                current["fields"][match.group(1)] = match.group(2).strip()
            elif line.strip() and not line.startswith("#"):
                current["body"].append(line.strip())
    if current:
        sections.append(current)
    return sections


def vals(s: str) -> list[str]:
    return [x.strip() for x in s.split("|")]


def inline(text: str) -> str:
    text = escape(text, quote=False)
    text = re.sub(r"\[([^]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', text)
    text = re.sub(r"`([^`]+)`", r"<code>\1</code>", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    return text


def render_examples(source: Path, locale: str) -> str:
    foot_label = "场景示例" if locale == "zh" else "Scenario example"
    featured, more = [], []
    for item in parse_sections(source.read_text(encoding="utf-8")):
        f = item["fields"]
        title, sub = item["title"], f.get("sub", "")
        tag = f.get("tag", "")
        tag_cls = " built-in" if f.get("kind") == "built-in" else (" featured" if f.get("kind") == "featured" else "")
        rail = "".join(f"<span>{inline(x)}</span>" for x in vals(f.get("rail", "")))
        table = "".join(f"<span>{inline(x)}</span>" for x in vals(f.get("table", "")))
        flow = "".join(f"<b>{inline(x)}</b><i></i>" for x in vals(f.get("flow", ""))).rsplit("<i></i>", 1)[0]
        footer = "".join(f"<span>{inline(x)}</span>" for x in vals(f.get("footer", "")))
        meta = "".join(f"<span>{inline(x)}</span>" for x in vals(f.get("meta", "")))
        link = f.get("link", "")
        if "|" in link:
            label, url = link.split("|", 1)
            link_html = f'<a href="{escape(url.strip(), quote=True)}">{inline(label.strip())}</a>'
        elif link:
            # A bare link value without a URL is rendered as a static span.
            link_html = f"<span>{inline(link)}</span>"
        elif f.get("foot"):
            link_html = f"<span>{inline(f['foot'])}</span>"
        else:
            link_html = ""
        desc = inline(" ".join(item["body"]))
        scope = inline(f.get("scope", ""))
        scope_html = f'<p class="example-scope">{scope}</p>' if scope else ""
        card = (
            f'<article class="example-card"><div class="example-card-head">'
            f'<h2>{inline(title)}<span>{inline(sub)}</span></h2>'
            f'<span class="example-tag{tag_cls}">{inline(tag)}</span></div>'
            f'<div class="example-diagram"><div class="diagram-rail">{rail}</div>'
            f'<div class="diagram-body"><div class="diagram-table">{table}</div>'
            f'<div class="diagram-flow">{flow}</div><div class="diagram-footer">{footer}</div></div></div>'
            f'<p>{desc}</p>{scope_html}<div class="example-meta">{meta}</div>'
            f'<div class="example-foot"><span>{foot_label}</span>{link_html}</div></article>'
        )
        (featured if f.get("kind") == "featured" else more).append(card)
    return {
        "FEATURED": "\n".join(featured),
        "MORE": "\n".join(more),
    }


def render_changelog(source: Path, locale: str) -> str:
    pending = "现场验收待单独确认" if locale == "zh" else "Field acceptance pending"
    entries = []
    for item in parse_sections(source.read_text(encoding="utf-8")):
        f = item["fields"]
        ident = re.sub(r"[^a-zA-Z0-9\u4e00-\u9fff-]+", "-", item["title"].lower()).strip("-")
        tags = "".join(f'<span class="changelog-tag">{inline(x)}</span>' for x in vals(f.get("tags", "")))
        if f.get("pending") == "yes":
            tags += f'<span class="changelog-tag changelog-tag-pending">{pending}</span>'
        date = f'<span class="changelog-date">{inline(f["date"])}</span>' if f.get("date") else ""
        links = ""
        if f.get("links"):
            parts = vals(f["links"])
            for i in range(0, len(parts) - 1, 2):
                links += f'<a class="changelog-tag" href="{escape(parts[i+1], quote=True)}">{inline(parts[i])} ↗</a>'
        bullets = "".join(f"<li>{inline(x[2:] if x.startswith('- ') else x)}</li>" for x in item["body"])
        entries.append(
            f'<article class="changelog-entry"><div class="changelog-version">'
            f'<h2 id="{ident}">{inline(item["title"])}</h2>{date}{tags}{links}</div><ul>{bullets}</ul></article>'
        )
    return "\n".join(entries)


for kind in ("examples", "changelog"):
    pages = {}
    for locale in ("zh", "en"):
        md = CONTENT / f"{kind}.{locale}.md"
        layout = LAYOUTS / f"{kind}.{locale}.html"
        html = layout.read_text(encoding="utf-8")
        if kind == "examples":
            render = render_examples(md, locale)
            html = html.replace("{{FEATURED}}", render["FEATURED"]).replace("{{MORE}}", render["MORE"])
        else:
            html = html.replace("{{ENTRIES}}", render_changelog(md, locale))
        pages[locale] = html
    target = ROOT / f"{kind}.html"
    target.write_text(merge_bilingual(pages["zh"], pages["en"]), encoding="utf-8")
    print(f"wrote {target}")
