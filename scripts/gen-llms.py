#!/usr/bin/env python3
"""生成并维护根目录的 llms.txt（AI Agent 友好性）。

扫描所有"真实内容页"（排除纯重定向页），提取标题、URL、meta description，
输出 llms.txt。幂等：每轮重跑，内容只随 HTML 的 title/description 变化。

运行：python3 scripts/gen-llms.py   （在仓库根目录）
"""
import re
from pathlib import Path
from urllib.parse import urljoin

root = Path(__file__).resolve().parent.parent

# 站点基础信息（llms.txt 头部）
SITE_NAME = "miao.my"
SITE_DESC = (
    "MIAO 是面向内部运营团队的开源、可自托管 Agent 工作台："
    "用自然语言描述需求，由服务端 Agent 生成受控草稿，协作处理记录，"
    "再以授权后台任务持续运行。"
)
SITE_URL = "https://miao.my"


def is_redirect(html: str) -> bool:
    return 'http-equiv="refresh"' in html


def extract(path: Path, html: str) -> dict | None:
    m = re.search(r"<title>(.*?)</title>", html, re.S)
    title = re.sub(r"\s+", " ", m.group(1)).strip() if m else ""
    d = re.search(r'<meta name="description" content="(.*?)"', html, re.S)
    desc = re.sub(r"\s+", " ", d.group(1)).strip() if d else ""
    if not title:
        return None
    rel = path.relative_to(root).as_posix()
    if rel.endswith(".html") and not rel.endswith("index.html"):
        url = rel
    elif rel.endswith("index.html"):
        base = rel[: -len("index.html")]
        url = base.rstrip("/") or "/"
    else:
        url = rel
    full_url = urljoin(SITE_URL + "/", url.lstrip("/"))
    return {"url": full_url, "title": title, "desc": desc}


def main() -> None:
    entries = []
    # 排除模板源（templates/）与独立子项目（web/、_temp/）
    SKIP_DIRS = {"templates", "web", "_temp"}
    for path in sorted(root.rglob("*.html")):
        if SKIP_DIRS & set(path.parts):
            continue
        html = path.read_text(encoding="utf-8", errors="replace")
        if is_redirect(html):
            continue
        e = extract(path, html)
        if e:
            entries.append(e)

    # 首页置顶，其余按 URL 排序
    entries.sort(key=lambda e: (e["url"] != SITE_URL + "/", e["url"]))

    lines = [
        f"# {SITE_NAME}",
        "",
        SITE_DESC,
        "",
        f"站点地址：{SITE_URL}",
        f"内容语言：简体中文（/）与 English（/en/）镜像。",
        f"本页由 scripts/gen-llms.py 自动生成并维护，每小时刷新。",
        "",
        "## 页面",
        "",
    ]
    for e in entries:
        if e["desc"]:
            lines.append(f"- [{e['title']}]({e['url']}): {e['desc']}")
        else:
            lines.append(f"- [{e['title']}]({e['url']})")

    out = root / "llms.txt"
    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"wrote {out} ({len(entries)} pages)")


if __name__ == "__main__":
    main()
