#!/usr/bin/env python3
"""Generate web/src/lib/copy.gen.ts from ../copy/{zh,en}.toml.

Run: python3 scripts/gen-copy.py   (from repo root, writes into web/)
"""
import tomllib
from pathlib import Path

root = Path(__file__).resolve().parent.parent.parent.parent  # miao.my/
out = root / "web" / "src" / "lib" / "copy.gen.ts"


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
    "// AUTO-GENERATED from copy/{zh,en}.toml by web/src/lib/gen-copy.py.",
    "// Do not edit by hand. Change the toml, then re-run the script.",
    "export type Locale = 'zh' | 'en';",
    "",
    "export const COPY: Record<Locale, Record<string, string>> = {",
]

for locale in ("zh", "en"):
    data = tomllib.loads((root / "copy" / f"{locale}.toml").read_text(encoding="utf-8"))
    flat = flatten(data)
    parts.append(f"  {locale}: {{")
    for key in sorted(flat):
        parts.append(f"    {ts_str(key)}: {ts_str(str(flat[key]))},")
    parts.append("  },")
parts.append("};")

out.write_text("\n".join(parts) + "\n", encoding="utf-8")
print(f"wrote {out} ({len(parts)} lines)")
