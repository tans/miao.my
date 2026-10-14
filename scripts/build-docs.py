#!/usr/bin/env python3
"""Render user guides into single bilingual static pages. Requires pandoc.

docs/index.html = USER_GUIDE (zh + en in one page, switched client-side)
guide/index.html = DECISION_GUIDE (zh + en in one page)

Zh copy is the default (SEO); the en block is namespaced and toggled by
assets/js/site-switch.js, see scripts/bilingual.py.
"""
from pathlib import Path
import subprocess
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent))
from bilingual import merge_bilingual

root = Path(__file__).resolve().parents[1]


def build(source, template, replacements=None):
    fragment = subprocess.check_output(
        ["pandoc", "-f", "gfm", "-t", "html5", "--wrap=none", str(source)],
        text=True,
    )
    html = template.read_text(encoding="utf-8").replace("<!-- GUIDE_CONTENT -->", fragment)
    for old, new in (replacements or {}).items():
        html = html.replace(old, new)
    return html


def write_bilingual(rel_target, zh_src, zh_tpl, en_src, en_tpl, en_repl=None):
    zh = build(zh_src, zh_tpl)
    en = build(en_src, en_tpl, en_repl)
    target = root / rel_target
    target.write_text(merge_bilingual(zh, en), encoding="utf-8")
    print(target)


write_bilingual(
    "docs/index.html",
    root / "docs" / "USER_GUIDE.md",
    root / "docs" / "template.html",
    root / "docs" / "USER_GUIDE.en.md",
    root / "docs" / "template.en.html",
    {
        "MIAO 用户手册：从创建工作区、通过 Agent 建立应用，到团队使用、权限管理、数据治理与企业运营。": "MIAO user guide: create workspaces, build apps with the AI assistant, run team workflows, manage permissions and govern data.",
        "用户手册：从创建工作区、通过 Agent 建立应用，到团队使用、权限管理、数据治理与企业运营。": "MIAO user guide: create workspaces, build apps with the AI assistant, run team workflows, manage permissions and govern data.",
        "用户手册 · MIAO": "User Guide · MIAO",
        "开源的企业 AI 工作台": "Open source business workspace",
    },
)
write_bilingual(
    "guide/index.html",
    root / "docs" / "DECISION_GUIDE.md",
    root / "docs" / "template.html",
    root / "docs" / "DECISION_GUIDE.en.md",
    root / "docs" / "template.en.html",
    {
        "MIAO 用户手册：从创建工作区、通过 Agent 建立应用，到团队使用、权限管理、数据治理与企业运营。": "MIAO product decision guide: use public facts to decide whether MIAO fits your team's work.",
        "<title>用户手册 · MIAO</title>": "<title>Product Decision Guide · MIAO</title>",
        "用户手册 · MIAO": "Product Decision Guide · MIAO",
        "开源的企业 AI 工作台": "Open source business workspace",
    },
)