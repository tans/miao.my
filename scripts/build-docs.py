#!/usr/bin/env python3
"""Render the Chinese and English user guides into static pages. Requires pandoc."""
from pathlib import Path
import subprocess

root = Path(__file__).resolve().parents[1]


def build(source, template, target):
    fragment = subprocess.check_output(
        ["pandoc", "-f", "gfm", "-t", "html5", "--wrap=none", str(source)],
        text=True,
    )
    html = template.read_text(encoding="utf-8").replace("<!-- GUIDE_CONTENT -->", fragment)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(html, encoding="utf-8")
    print(target)


build(root / "docs" / "USER_GUIDE.md", root / "docs" / "template.html", root / "docs" / "index.html")
build(root / "docs" / "USER_GUIDE.en.md", root / "docs" / "template.en.html", root / "en" / "docs" / "index.html")
