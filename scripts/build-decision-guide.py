#!/usr/bin/env python3
"""Build the bilingual product decision guide without extra dependencies."""
from html import escape
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def inline(text):
    text = escape(text, quote=False)
    text = re.sub(r"\[([^]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', text)
    text = re.sub(r"`([^`]+)`", r"<code>\1</code>", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    return text


def render(source):
    lines = source.read_text(encoding="utf-8").splitlines()
    out, i = [], 0
    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1
            continue
        heading = re.match(r"^(#{1,6}) (.+)$", line)
        if heading:
            level, text = len(heading.group(1)), heading.group(2)
            anchor = re.sub(r"[^\w\u4e00-\u9fff -]", "", text.lower()).replace(" ", "-")
            out.append(f'<h{level} id="{anchor}">{inline(text)}</h{level}>')
            i += 1
            continue
        if line.startswith("| ") and i + 1 < len(lines) and lines[i + 1].startswith("| ---"):
            rows = []
            while i < len(lines) and lines[i].startswith("|"):
                if not re.match(r"^\|\s*:?-+", lines[i]):
                    rows.append([cell.strip() for cell in lines[i].strip("|").split("|")])
                i += 1
            out.append("<table><thead><tr>" + "".join(f"<th>{inline(c)}</th>" for c in rows[0]) + "</tr></thead><tbody>")
            out.extend("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in row) + "</tr>" for row in rows[1:])
            out.append("</tbody></table>")
            continue
        if re.match(r"^[-*] ", line):
            items = []
            while i < len(lines) and re.match(r"^[-*] ", lines[i]):
                items.append(f"<li>{inline(lines[i][2:])}</li>")
                i += 1
            out.append("<ul>" + "".join(items) + "</ul>")
            continue
        if re.match(r"^\d+\. ", line):
            items = []
            while i < len(lines) and re.match(r"^\d+\. ", lines[i]):
                items.append(f"<li>{inline(re.sub(r'^\d+\. ', '', lines[i]))}</li>")
                i += 1
            out.append("<ol>" + "".join(items) + "</ol>")
            continue
        paragraph = [line]
        i += 1
        while i < len(lines) and lines[i].strip() and not re.match(r"^(#{1,6} |[-*] |\d+\. |\| )", lines[i]):
            paragraph.append(lines[i])
            i += 1
        out.append("<p>" + inline(" ".join(paragraph)) + "</p>")
    return "\n".join(out)


def build(source, template, target, replacements):
    html = template.read_text(encoding="utf-8").replace("<!-- GUIDE_CONTENT -->", render(source))
    for old, new in replacements.items():
        html = html.replace(old, new)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(html, encoding="utf-8")


build(ROOT / "docs/DECISION_GUIDE.md", ROOT / "docs/template.html", ROOT / "guide/index.html", {
    "MIAO 用户手册：从创建工作区、通过 Agent 建立应用，到团队使用、权限管理、数据治理与企业运营。": "MIAO 产品选择指南：用公开事实判断 MIAO 是否适合团队的工作。",
    "<title>用户手册 · MIAO</title>": "<title>产品选择指南 · MIAO</title>",
    'href="#目录">手册目录</a>': 'href="#miao-产品选择指南">指南目录</a>',
    'href="/en/docs/">English': 'href="/en/guide/">English',
    'href="#目录">返回目录 ↑</a>': 'href="#miao-产品选择指南">返回目录 ↑</a>',
})
build(ROOT / "docs/DECISION_GUIDE.en.md", ROOT / "docs/template.html", ROOT / "en/guide/index.html", {
    "MIAO 用户手册：从创建工作区、通过 Agent 建立应用，到团队使用、权限管理、数据治理与企业运营。": "MIAO product decision guide: use public facts to decide whether MIAO fits your team's work.",
    "开源的企业 AI 工作台": "Open source business workspace",
    "用户手册 · MIAO": "Product Decision Guide · MIAO",
    "lang=\"zh-CN\"": "lang=\"en\"",
    'aria-label="MIAO 首页"': 'aria-label="MIAO home"',
    'href="#目录">手册目录</a>': 'href="#miao-product-decision-guide">Guide contents</a>',
    'href="/en/docs/">English': 'href="/guide/">中文',
    'href="#目录">返回目录 ↑</a>': 'href="#miao-product-decision-guide">Back to contents ↑</a>',
})
