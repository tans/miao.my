#!/usr/bin/env python3
"""Generate the shared bilingual site header and footer for public pages."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def route_for(path: Path) -> str:
    relative = path.relative_to(ROOT).as_posix()
    if relative.endswith("/index.html"):
        return "/" + relative[:-len("index.html")]
    if relative == "index.html":
        return "/"
    return "/" + relative


def link(label: str, href: str, current: bool = False, extra: str = "") -> str:
    attrs = f' href="{href}"'
    if current:
        attrs += ' aria-current="page"'
    if extra:
        attrs += f" {extra}"
    return f'<a class="nav-link{" nav-link-active" if current else ""}"{attrs}>{label}</a>'


def chrome(path: Path) -> tuple[str, str]:
    relative = path.relative_to(ROOT).as_posix()
    english = relative.startswith("en/") or relative == "docs/template.en.html"
    root = "/en/" if english else "/"
    route = route_for(path)
    current = route.rstrip("/") or "/"

    if english:
        direct = [
            ("Docs", "/en/docs/", current.startswith("/en/docs")),
            ("Decision guide", "/en/guide/", current.startswith("/en/guide")),
            ("Examples", "/en/examples.html", current == "/en/examples.html"),
            ("Get started", "/en/get-started/", current.startswith("/en/get-started")),
        ]
        more = [
            ("Agent", "/en/product/agents/", current.startswith("/en/product/agents")),
            ("Community", "/en/community/", current.startswith("/en/community")),
            ("Self-hosting", "/en/self-hosting/", current.startswith("/en/self-hosting")),
            ("Integrations", "/en/integrations/", current.startswith("/en/integrations")),
            ("Changelog", "/en/changelog.html", current == "/en/changelog.html"),
            ("Showcases", "/en/showcases.html", current == "/en/showcases.html"),
        ]
        language = link("中文", "/", extra='lang="zh-CN"')
        aria = "Main navigation"
        footer_aria = "Footer navigation"
        footer_links = [
            ("Home", "/en/"),
            ("Docs", "/en/docs/"),
            ("Decision guide", "/en/guide/"),
            ("Examples", "/en/examples.html"),
            ("Get started", "/en/get-started/"),
            ("Community", "/en/community/"),
            ("Self-hosting", "/en/self-hosting/"),
            ("中文", "/"),
        ]
        tagline = "Open source business workspace"
        brand_label = "MIAO home"
        more_label = "More"
    else:
        direct = [
            ("文档", "/docs/", current.startswith("/docs")),
            ("产品指南", "/guide/", current.startswith("/guide")),
            ("行业示例", "/examples.html", current == "/examples.html"),
            ("开始使用", "/get-started/", current.startswith("/get-started")),
        ]
        more = [
            ("Agent", "/product/agents/", current.startswith("/product/agents")),
            ("社区与支持", "/community/", current.startswith("/community")),
            ("自托管", "/self-hosting/", current.startswith("/self-hosting")),
            ("集成", "/integrations/", current.startswith("/integrations")),
            ("更新日志", "/changelog.html", current == "/changelog.html"),
            ("案例故事", "/zh/showcases.html", current == "/zh/showcases.html"),
        ]
        language = link("English", "/en/", extra='lang="en"')
        aria = "主导航"
        footer_aria = "页脚导航"
        footer_links = [
            ("首页", "/"),
            ("文档", "/docs/"),
            ("产品指南", "/guide/"),
            ("行业示例", "/examples.html"),
            ("开始使用", "/get-started/"),
            ("社区与支持", "/community/"),
            ("自托管", "/self-hosting/"),
            ("English", "/en/"),
        ]
        tagline = "开源的企业 AI 工作台"
        brand_label = "MIAO 首页"
        more_label = "更多"

    direct_html = "".join(link(label, href, active) for label, href, active in direct)
    more_html = "".join(link(label, href, active) for label, href, active in more)
    footer_html = "".join(f'<a href="{href}">{label}</a>' for label, href in footer_links)
    header_extra = " showcase-nav" if relative.endswith("showcases.html") else ""
    footer_extra = " showcase-footer" if relative.endswith("showcases.html") else ""
    header = (
        f'<header class="navbar site-nav{header_extra}">'
        f'<div class="navbar-start"><a class="brand" href="{root}" aria-label="{brand_label}">'
        '<img src="/assets/mascots/cat-logo-head.png" alt="" /><strong>miao.my</strong>'
        f'<span class="brand-divider"></span><span class="brand-caption">{tagline}</span></a></div>'
        f'<nav class="navbar-end" aria-label="{aria}">{direct_html}'
        f'<details class="nav-more"><summary class="nav-link">{more_label}</summary><div class="nav-menu">{more_html}</div></details>'
        f'{language}<a class="btn btn-neutral btn-sm nav-github" href="https://github.com/tans/miao">GitHub ↗</a></nav>'
        '</header>'
    )
    footer = (
        f'<footer class="site-footer{footer_extra}">'
        f'<a class="brand" href="{root}" aria-label="{brand_label}"><img src="/assets/mascots/cat-logo-head.png" alt="" /><strong>miao.my</strong></a>'
        f'<span>{tagline}</span><nav aria-label="{footer_aria}">{footer_html}<a href="https://github.com/tans/miao">GitHub ↗</a></nav>'
        '</footer>'
    )
    return header, footer


def should_process(path: Path) -> bool:
    relative = path.relative_to(ROOT).as_posix()
    return (
        path.suffix == ".html"
        and not relative.startswith("_temp/")
        and not relative.startswith("docs/prototypes/")
        and relative != "showcases.html"
    )


for page in sorted(ROOT.rglob("*.html")):
    if not should_process(page):
        continue
    html = page.read_text(encoding="utf-8")
    header, footer = chrome(page)
    html, header_count = re.subn(r'<header class="navbar site-nav[^\"]*">.*?</header>', header, html, count=1, flags=re.S)
    html, footer_count = re.subn(r'<footer class="site-footer[^\"]*">.*?</footer>', footer, html, count=1, flags=re.S)
    if header_count and footer_count:
        page.write_text(html, encoding="utf-8")
        print(page.relative_to(ROOT))
