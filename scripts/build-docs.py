#!/usr/bin/env python3
"""Render the Chinese and English user guides into static pages. Requires pandoc."""
from pathlib import Path
import subprocess

root = Path(__file__).resolve().parents[1]


def build(source, template, target, replacements=None):
    fragment = subprocess.check_output(
        ["pandoc", "-f", "gfm", "-t", "html5", "--wrap=none", str(source)],
        text=True,
    )
    html = template.read_text(encoding="utf-8").replace("<!-- GUIDE_CONTENT -->", fragment)
    for old, new in (replacements or {}).items():
        html = html.replace(old, new)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(html, encoding="utf-8")
    print(target)


build(root / "docs" / "USER_GUIDE.md", root / "docs" / "template.html", root / "docs" / "index.html")
build(root / "docs" / "USER_GUIDE.en.md", root / "docs" / "template.en.html", root / "en" / "docs" / "index.html", {
    "lang=\"zh-CN\"": "lang=\"en\"",
    "MIAO 用户手册：从创建工作区、通过 Agent 建立应用，到团队使用、权限管理、数据治理与企业运营。": "MIAO user guide: create workspaces, build apps with the AI assistant, run team workflows, manage permissions and govern data.",
    "用户手册：从创建工作区、通过 Agent 建立应用，到团队使用、权限管理、数据治理与企业运营。": "MIAO user guide: create workspaces, build apps with the AI assistant, run team workflows, manage permissions and govern data.",
    "用户手册 · MIAO": "User Guide · MIAO",
    "href=\"/\" aria-label=\"MIAO 首页\"": "href=\"/\" aria-label=\"MIAO home\"",
    "开源的企业 AI 工作台": "Open source business workspace",
    "href=\"#目录\">手册目录</a>": "href=\"#contents\">Contents</a>",
    "href=\"/en/docs/\">English": "href=\"/docs/\">中文",
    "href=\"#目录\">返回目录 ↑</a>": "href=\"#contents\">Back to contents ↑</a>",
})
build(
    root / "docs" / "DECISION_GUIDE.md",
    root / "docs" / "template.html",
    root / "guide" / "index.html",
    {
        "MIAO 用户手册：从创建工作区、通过 Agent 建立应用，到团队使用、权限管理、数据治理与企业运营。": "MIAO 产品选择指南：用公开事实判断 MIAO 是否适合团队的工作。",
        "<title>用户手册 · MIAO</title>": "<title>产品选择指南 · MIAO</title>",
        'href="#目录">手册目录</a>': 'href="#miao-产品选择指南">指南目录</a>',
        'href="/en/docs/">English': 'href="/en/guide/">English',
        'href="#目录">返回目录 ↑</a>': 'href="#miao-产品选择指南">返回目录 ↑</a>',
    },
)
build(
    root / "docs" / "DECISION_GUIDE.en.md",
    root / "docs" / "template.en.html",
    root / "en" / "guide" / "index.html",
    {
        "MIAO user guide: create workspaces, build apps with the AI assistant, run team workflows, manage permissions and govern data.": "MIAO product decision guide: use public facts to decide whether MIAO fits your team's work.",
        "<title>User Guide · MIAO</title>": "<title>Product Decision Guide · MIAO</title>",
        'href="#contents">Contents</a>': 'href="#miao-product-decision-guide">Guide contents</a>',
        'href="/docs/">中文': 'href="/guide/">中文',
        'href="#contents">Back to contents ↑</a>': 'href="#miao-product-decision-guide">Back to contents ↑</a>',
    },
)
