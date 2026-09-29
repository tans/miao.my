#!/usr/bin/env python3
"""Export the static prototype HTML pages as 1440×900 PNG previews.

Requires WeasyPrint, PyMuPDF and a Chinese font installed locally.
"""
from pathlib import Path
import fitz
from weasyprint import HTML

root = Path(__file__).resolve().parents[1]
folder = root / "docs" / "prototypes"
images = folder / "images"
images.mkdir(exist_ok=True)

for page in sorted(folder.glob("[0-9][0-9]-*.html")):
    pdf = fitz.open(stream=HTML(filename=str(page)).write_pdf(), filetype="pdf")
    if len(pdf) != 1:
        raise RuntimeError(f"{page.name}: expected one page, got {len(pdf)}")
    output = images / f"{page.stem}.png"
    pixmap = pdf[0].get_pixmap(matrix=fitz.Matrix(96 / 72, 96 / 72), alpha=False)
    if (pixmap.width, pixmap.height) != (1440, 900):
        raise RuntimeError(f"{page.name}: unexpected image size")
    pixmap.save(output)
    print(output.relative_to(root))
