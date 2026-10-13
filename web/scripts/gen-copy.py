#!/usr/bin/env python3
"""Generate web/src/lib/copy.gen.ts from ../copy/{zh,en}.toml.

The toml files are the single source of copy. This script flattens the
nested tables into a flat key object (dot-separated) per locale so the
React i18n module can do a plain `t("index.hero_title")` lookup.

Run: python3 scripts/gen-copy.py   (from web/)
"""
import tomllib
from pathlib import Path

root = Path(__file__).resolve().parent.parent.parent
out = Path(__file__).resolve().parent.parent / "src" / "lib" / "copy.gen.ts"

LOCALES = {"zh": "zh.toml", "en": "en.toml"}


def flatten(d: dict, prefix: str = "") -> dict:
    out = {}
    for k, v in d.items():
        key = f"{prefix}{k}"
        if isinstance(v, dict):
            out.update(flatten(v, key + "."))
        else:
            out[key] = v
    return out


def ts_str(s: str) -> str:
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


parts = [
    "// AUTO-GENERATED from ../copy/{zh,en}.toml by scripts/gen-copy.py.",
    "// Do not edit by hand — change the toml, then re-run the script.",
    "export type Locale = \"zh\" | \"en\";",
    "export type Copy = { [key: string]: string };",
    "",
    "export const COPY: Record<Locale, Copy> = {",
]

for locale, fname in LOCALES.items():
    data = tomllib.loads((root / "copy" / fname).read_text(encoding="utf-8"))
    flat = flatten(data)
    parts.append(f"  {locale}: {{")
    for key in sorted(flat):
        parts.append(f"    {ts_str(key)}: {ts_str(str(flat[key]))},")
    parts.append("  },")
parts.append("};")
out.write_text("\n".join(parts) + "\n", encoding="utf-8")
print("wrote", out, "zh:", len(flatten(tomllib.loads((root / 'copy' / 'zh.toml').read_text()))), "keys")
