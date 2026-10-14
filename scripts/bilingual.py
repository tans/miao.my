"""Merge separately-built zh/en full-page fragments into one bilingual page.

Used by build-content.py / build-docs.py / build-decision-guide.py so each
static page ships as a single HTML that switches language client-side via
assets/js/site-switch.js — no server-side rendering, no /en/ mirror files.

The merged page keeps the zh copy visible by default (SEO) and toggles
[data-lang-zh] / [data-lang-en] blocks; the en block's ids are namespaced
(en-*) so both copies can coexist in one document.
"""
import re
from html import escape


def merge_bilingual(zh_html: str, en_html: str) -> str:
    zh_head = re.search(r"<head[^>]*>(.*?)</head>", zh_html, re.S).group(1)
    zh_body = re.search(r"<body[^>]*>(.*?)</body>", zh_html, re.S).group(1)
    en_body = re.search(r"<body[^>]*>(.*?)</body>", en_html, re.S).group(1)

    zh_title = re.search(r"<title[^>]*>(.*?)</title>", zh_html, re.S).group(1)
    en_title = re.search(r"<title[^>]*>(.*?)</title>", en_html, re.S).group(1)
    zh_m = re.search(r'<meta name="description" content="([^"]*)"', zh_html, re.S)
    en_m = re.search(r'<meta name="description" content="([^"]*)"', en_html, re.S)
    zh_desc = zh_m.group(1) if zh_m else ""
    en_desc = en_m.group(1) if en_m else ""

    # ---- zh copy: navigation/footer language links switch in place ----
    zh_body = zh_body.replace(
        '<a class="nav-link" href="/" lang="en">English</a>',
        '<a class="nav-link lang-switch" href="#" data-lang="en">English</a>',
    )
    zh_body = zh_body.replace(
        '<a href="/">English</a>',
        '<a class="lang-switch" href="#" data-lang="en">English</a>',
    )
    # remaining /en/ links in the zh body (e.g. changelog lead) switch in place
    zh_body = re.sub(
        r'<a([^>]*?)\bhref="/en/[^"]*"([^>]*?)>',
        lambda m: f'<a{m.group(1)}href="#" class="lang-switch" data-lang="en"{m.group(2)}>',
        zh_body,
    )

    # ---- en copy: drop /en/ prefix, switch links, namespace ids ----
    en_body = re.sub(r'href="/en/', 'href="/', en_body)
    en_body = en_body.replace(
        '<a class="nav-link" href="/" lang="zh-CN">中文</a>',
        '<a class="nav-link lang-switch" href="#" data-lang="zh">中文</a>',
    )
    en_body = en_body.replace(
        '<a href="/">中文</a>',
        '<a class="lang-switch" href="#" data-lang="zh">中文</a>',
    )
    en_body = en_body.replace(
        '<a href="/changelog.html">中文版本</a>',
        '<a class="lang-switch" href="#" data-lang="zh">中文版本</a>',
    )
    en_body = re.sub(r'\bid="([^"]+)"', r'id="en-\1"', en_body)
    en_body = re.sub(
        r'\b(href|aria-labelledby|aria-describedby|for)="#([^"]+)"',
        r'\1="#en-\2"',
        en_body,
    )

    zh_head = re.sub(
        r"<title[^>]*>.*?</title>",
        f'<title data-en="{escape(en_title)}">{escape(zh_title)}</title>',
        zh_head,
        count=1,
        flags=re.S,
    )
    if zh_desc:
        zh_head = re.sub(
            r'<meta name="description" content="[^"]*"',
            f'<meta name="description" content="{escape(zh_desc)}" '
            f'data-zh="{escape(zh_desc)}" data-en="{escape(en_desc)}"',
            zh_head,
            count=1,
        )

    return (
        "<!doctype html>\n"
        '<html lang="zh-CN" data-theme="light">\n'
        "<head>\n" + zh_head
        + '\n<script src="/assets/js/site-switch.js"></script>\n'
        + "</head>\n<body>\n"
        + '<div data-lang-zh>\n' + zh_body + "\n</div>\n"
        + '<div data-lang-en hidden>\n' + en_body + "\n</div>\n"
        + "</body>\n</html>\n"
    )