#!/usr/bin/env python3
"""Render the user guide into the static docs page. Requires pandoc."""
from pathlib import Path
import subprocess

root = Path(__file__).resolve().parents[1]
source = root / "docs" / "USER_GUIDE.md"
template = root / "docs" / "template.html"
target = root / "docs" / "index.html"
fragment = subprocess.check_output(
    ["pandoc", "-f", "gfm", "-t", "html5", "--wrap=none", str(source)],
    text=True,
)
html = template.read_text(encoding="utf-8").replace("<!-- GUIDE_CONTENT -->", fragment)
target.write_text(html, encoding="utf-8")
print(target)
