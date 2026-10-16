#!/usr/bin/env python3
"""生成并维护根目录的 llms.txt（AI Agent 友好性）。

扫描部署产物 dist/ 下的所有真实页面（React 壳页 + 静态双语页），
提取标题、URL、meta description，输出 llms.txt。幂等：每轮重跑，
内容只随页面 title/description 变化。

页面 URL 均对应线上路径（cleanUrls：无 .html 后缀优先）。
运行：python3 scripts/gen-llms.py   （在仓库根目录，需先构建生成 dist/）
"""
import re
from pathlib import Path
from urllib.parse import urljoin

root = Path(__file__).resolve().parent.parent
DIST = root / "dist"

# 站点基础信息（llms.txt 头部）
SITE_NAME = "miao.my"
SITE_DESC = (
    "MIAO 是适合中小企业的开源、可自托管工作台："
    "说出需求、搭建应用、团队协作，定时任务自动处理重复工作。"
)
SITE_URL = "https://miao.my"


def is_redirect(html: str) -> bool:
    return 'http-equiv="refresh"' in html


def extract(path: Path, html: str) -> dict | None:
    # 容忍 <title data-en="..."> 这类带属性的双语页标题
    m = re.search(r"<title[^>]*>(.*?)</title>", html, re.S)
    title = re.sub(r"\s+", " ", m.group(1)).strip() if m else ""
    d = re.search(r'<meta name="description" content="(.*?)"', html, re.S)
    desc = re.sub(r"\s+", " ", d.group(1)).strip() if d else ""
    if not title:
        return None
    rel = path.relative_to(DIST).as_posix()
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
    # 优先扫描构建产物 dist/（部署到线上的真实页面全集）；
    # dist 不存在时回退扫描仓库根目录（排除模板源与子项目）。
    base = DIST if DIST.is_dir() else root
    skips = set() if DIST.is_dir() else {"templates", "web", "_temp", "dist", "content"}
    entries = []
    for path in sorted(base.rglob("*.html")):
        if skips & set(path.parts):
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
        f"内容语言：每页均为中英双语，客户端切换（默认中文，?lang=en 或页面按钮切换）。",
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
