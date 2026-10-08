#!/usr/bin/env python3
"""Generate the current MIAO product screens and their gallery."""
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "prototypes"
OUT.mkdir(parents=True, exist_ok=True)


def badge(text, tone=""):
    return f'<span class="badge {tone}">{text}</span>'


def table(headers, records):
    head = "".join(f"<th>{x}</th>" for x in headers)
    body = "".join("<tr>" + "".join(f"<td>{cell}</td>" for cell in row) + "</tr>" for row in records)
    return f'<table class="data"><thead><tr>{head}</tr></thead><tbody>{body}</tbody></table>'


def box(title_text, content, cls=""):
    return f'<section class="box {cls}"><div class="box-head"><b>{title_text}</b></div>{content}</section>'


def chat(who, content):
    name = "fx" if who == "agent" else "你"
    return f'<div class="bubble {who}"><b>{name}</b><p>{content}</p></div>'


def title(kicker, heading, subtitle, action=""):
    return f'<div class="kicker">{kicker}</div><div class="title-row"><div><h1>{heading}</h1><p class="lead">{subtitle}</p></div>{action}</div>'


def metric(label, value, detail):
    return f'<div class="metric"><small>{label}</small><strong>{value}</strong><span>{detail}</span></div>'


def field(label, value):
    return f'<div class="field"><small>{label}</small><div>{value}</div></div>'


def assistant_panel(summary, messages, composer="描述你要完成的工作…"):
    return (
        '<aside class="assistant-panel"><div class="assistant-panel-head"><b>小助手 · fx</b>'
        f'<span>{summary}</span></div><div class="assistant-panel-context">应用：客户跟进　·　AI 服务已连接</div>'
        f'<div class="assistant-panel-messages">{messages}</div>'
        f'<div class="assistant-panel-composer">{composer}<span>发送 ↑</span></div></aside>'
    )


def shell(active="概览", body=""):
    apps = ["概览", "应用模板", "工作区管理", "客户跟进", "需求收集"]
    nav = "".join(f'<div class="nav-item {"active" if item == active else ""}"><span>{"⌂" if item == "概览" else "□"}</span>{item}</div>' for item in apps)
    return (
        '<div class="frame"><aside class="sidebar"><div class="logo"><img src="../../assets/mascots/cat-logo-head.png" alt=""><b>MIAO</b></div>'
        '<div class="switch">研发工作区 <span>⌄</span></div><div class="side-label">工作区</div>'
        f'{nav}<div class="side-bottom"><div class="nav-item">⚙　工作区管理</div><div class="person"><i>陈</i>陈曦 <span>···</span></div></div></aside>'
        '<div class="work-area"><header class="topbar"><div>研发工作区 <span>/</span> MIAO 工作台</div><div class="top-right"><i></i> 服务正常　　通知　 <b>陈</b></div></header>'
        f'<main class="screen">{body}<div class="prototype-note">MIAO 当前版本示意图 · 示例数据</div></main></div></div>'
    )


SCREENS = [
    ("01-overview", "认识 MIAO", "登录后的工作区概览", shell("概览",
        title("工作区 / 概览", "你的应用", "从应用开始处理工作；需要创建或修改时，打开右侧小助手。") +
        '<div class="current-cards"><div class="app-card current"><div class="app-icon">客</div><h3>客户跟进</h3><p>统一记录沟通与下一步行动</p><footer>已发布 · 访问 128 次 <span>打开应用 →</span></footer></div>'
        '<div class="app-card current"><div class="app-icon gray">需</div><h3>需求收集</h3><p>把各部门的需求集中在一起</p><footer>已发布 · 42 条记录 <span>打开应用 →</span></footer></div>'
        '<div class="app-card current"><div class="app-icon beige">采</div><h3>采购申请</h3><p>申请、审批和进度查询</p><footer>草稿 · 需要继续配置 <span>打开应用 →</span></footer></div></div>'
        '<p class="hint">概览页只列出当前工作区有权访问的应用；小助手固定在工作区右侧。</p>' +
        assistant_panel("整个工作区", '<div class="assistant-welcome"><b>你想做什么？</b><span>描述目标、补充资料，fx 会创建可审阅的候选。</span></div><div class="assistant-chip">梳理工作流程</div><div class="assistant-chip">从一个想法开始</div>'))),
    ("02-start", "开始使用", "登录、选择工作区和模板", shell("概览",
        title("开始使用", "先进入正确的工作区", "账号、成员、应用和业务数据按工作区隔离。") +
        '<div class="start-grid"><div class="start-card"><div class="start-step">01</div><h2>登录账号</h2><p>使用企业邮箱登录。受邀成员用邀请邮箱注册或接受邀请。</p><div class="fake-login"><span>name@company.com</span><button class="primary">登录</button></div></div>'
        '<div class="start-card"><div class="start-step">02</div><h2>选择工作区</h2><p>切换菜单只显示你所属的空间，也可以从菜单末尾创建工作区。</p><div class="choice selected"><i>研</i><div><b>研发工作区</b><p>企业空间 · 8 位成员 · 3 个应用</p></div><span>当前</span></div></div>'
        '<div class="start-card"><div class="start-step">03</div><h2>从模板开始</h2><p>模板会创建一个可继续让小助手调整的起点。</p><div class="template-line"><b>客户跟进</b><span>3 张数据表　<button class="outline">一键创建</button></span></div></div></div>' +
        '<div class="notice"><b>看不到应用？</b><p>先确认工作区和账号，再请 owner 检查应用访问权限。链接本身不会授予访问权。</p></div>')),
    ("03-create", "创建应用", "通过固定小助手创建候选", shell("概览",
        title("工作区 / 小助手", "创建客户跟进应用", "对话会保存为当前账号的私有线程；写入和发布候选需要你确认。") +
        '<div class="columns"><div class="wide">' + box("小助手对话　·　运行中", chat("user", "为 8 人销售团队做一个客户跟进应用，记录联系人、沟通和下次跟进时间。") + chat("agent", "我会先建立客户、跟进记录和状态流。销售只能看到负责的客户，主管查看全部，可以吗？") + chat("user", "可以，另外需要每周待跟进和逾期列表。") + '<div class="run-trace"><b>运行记录</b><span>整理需求　✓　读取应用权限　✓　等待确认</span></div><div class="composer">继续补充需求… <span>发送 ↑</span></div>', "chat") + '</div>'
        '<div class="narrow">' + box("候选回执　·　等待确认", '<h2>客户跟进</h2><p>生成 3 个页面、2 张数据表和 1 个状态流。</p>' + field("将要创建", "客户、跟进记录") + field("成员权限", "销售 editor · 主管 viewer") + field("下一步", "确认后生成草稿") + '<button class="primary full">确认并生成草稿</button><button class="outline full">拒绝候选</button>', "proposal") + '</div></div>')),
    ("04-publish", "预览与发布", "检查草稿、动作与发布范围", shell("客户跟进",
        title("客户跟进 / 草稿预览", "先试用，再让小助手发布", "预览使用示例记录；正式记录和公开范围在发布候选中单独确认。", badge("v4 草稿", "warm")) +
        '<div class="columns preview"><div class="wide">' + box("客户跟进　·　预览", '<div class="inner-app"><small>总览 / 客户 / 跟进任务</small><h2>本周工作</h2><div class="cards-3">' + metric("待跟进", "12", "查看任务") + metric("已逾期", "3", "优先处理") + '</div><table class="data"><thead><tr><th>客户</th><th>负责人</th><th>状态</th></tr></thead><tbody><tr><td>星河设计</td><td>陈曦</td><td>' + badge("待跟进", "warm") + '</td></tr><tr><td>青屿科技</td><td>林青</td><td>' + badge("进行中") + '</td></tr></tbody></table></div>', "preview-box") + '</div>'
        '<div class="narrow">' + box("发布候选", '<ul class="checks"><li>✓ 页面和数据源通过校验</li><li>✓ 4 个动作需要确认</li><li>✓ 公开页面：未开启</li><li>✓ 影响范围：当前工作区成员</li></ul><div class="notice"><b>确认门</b><p>发布、扩大访问范围或开启匿名公开前，fx 会展示具体影响。</p></div><button class="primary full">交给小助手确认发布</button>', "publish-box") + '</div></div>')),
    ("05-work", "团队日常使用", "在已发布应用中处理业务", shell("客户跟进",
        title("客户跟进 / 已发布", "客户跟进", "成员在业务页面完成记录、状态和下一步行动。", '<button class="primary">＋ 新增客户</button>') +
        '<div class="tabs"><b>总览</b><span>客户</span><span>跟进任务</span><span>更多…</span></div><div class="cards-3">' + metric("本周待跟进", "12", "查看任务 →") + metric("已逾期", "3", "优先处理 →") + metric("本周已完成", "8", "查看记录 →") + '</div>' +
        '<div class="section-title"><h2>接下来需要处理</h2><span>搜索　筛选　排序</span></div>' + table(["客户", "负责人", "最近沟通", "下次跟进", "状态"], [["星河设计", "陈曦", "10 月 07 日", "今天 15:00", badge("待跟进", "warm")], ["光点工作室", "林青", "10 月 06 日", "明天 10:00", badge("进行中")], ["青屿科技", "陈曦", "10 月 04 日", "10 月 10 日", badge("进行中")], ["北岸咖啡", "周安", "10 月 02 日", "10 月 11 日", badge("待跟进", "warm")]]) + '<p class="hint">没有写权限的成员只会看到可读操作；每次写入都会重新检查权限和记录版本。</p>')),
    ("06-change", "修改应用与版本", "对话生成草稿，发布前查看差异", shell("客户跟进",
        title("客户跟进 / 应用配置", "修改应用", "应用页面、业务动作、状态流和公开范围都通过小助手形成草稿。") +
        '<div class="columns"><div class="wide">' + box("小助手对话", chat("user", "在客户详情增加最近联系结果，并把逾期客户放到总览顶部。") + chat("agent", "我会修改客户详情和总览排序，现有记录不变。需要把联系结果作为选项字段吗？") + '<div class="run-trace"><b>变更摘要</b><span>2 个页面　·　1 个字段　·　无数据删除　·　等待确认</span></div><div class="composer">继续说明修改… <span>发送 ↑</span></div>', "chat") + '</div>'
        '<div class="narrow">' + box("草稿版本", '<div class="version">当前正式版　v3　·　2026-10-06</div><div class="change"><b>+ 客户详情</b><p>新增“联系结果”字段</p></div><div class="change"><b>↕ 总览排序</b><p>逾期客户优先显示</p></div><div class="change"><b>权限影响</b><p>沿用现有成员访问范围</p></div><button class="primary full">预览 v4</button>', "proposal") + '</div></div>')),
    ("07-data", "数据、附件与导出", "检查数据表和记录", shell("客户跟进",
        title("客户跟进 / 查看数据表", "检查数据", "这里用于搜索、分页和必要修正；应用结构和页面修改仍交给小助手。", '<button class="outline">导出授权数据 ↓</button>') +
        '<div class="toolbar">⌕ 搜索客户、联系人…　　负责人：全部 ⌄　　状态：全部 ⌄</div><div class="columns data-columns"><div class="wide">' + box("数据表　·　客户　1–25 / 128", table(["客户名称", "联系人", "负责人", "状态"], [["星河设计", "王女士", "陈曦", badge("待跟进", "warm")], ["光点工作室", "李先生", "林青", badge("进行中")], ["青屿科技", "赵女士", "陈曦", badge("已完成", "green")], ["北岸咖啡", "孙先生", "周安", badge("待跟进", "warm")]]) + '<div class="pager">上一页　1 / 6　下一页 →</div>') + '</div><div class="narrow">' + box("记录详情　·　只读", '<h2>星河设计</h2>' + field("联系人", "王女士") + field("负责人", "陈曦") + field("下次跟进", "2026-10-08 15:00") + field("附件", "需求清单.pdf　↓") + '<button class="outline full">进入编辑状态</button>', "record-side") + '</div></div>')),
    ("08-team", "成员与权限", "工作区管理和应用访问名单", shell("工作区管理",
        title("研发工作区 / 工作区管理", "成员与邀请", "工作区角色决定空间管理能力；应用访问权限还要单独检查。", '<button class="primary">邀请成员</button>') +
        '<div class="tabs"><b>成员与邀请</b><span>操作日志</span><span>工作区设置</span></div>' + box("当前成员　·　8 位成员", table(["成员", "工作区角色", "应用访问", "状态"], [["陈曦", "owner", "全部应用", badge("当前账号", "green")], ["林青", "admin", "客户跟进 · editor", badge("已接受")], ["周安", "member", "客户跟进 · viewer", badge("已接受")], ["赵宁", "member", "待授权", badge("待接受", "warm")]]) + '<div class="invite-row"><span>待接受邀请：zhao@example.com</span><button class="outline">复制邀请链接</button></div>') + '<div class="notice"><b>权限边界</b><p>平台管理员不因此获得业务记录读取权限；应用 publisher 才能确认发布候选。</p></div>')),
    ("09-governance", "企业治理", "用量、预算、导出和平台后台", shell("工作区管理",
        title("研发工作区 / 设置", "把运行状态放在同一个管理入口", "工作区 owner 可以查看审计、AI 用量与预算，并导出当前账号获授权的数据。") +
        '<div class="cards-3">' + metric("应用", "3", "2 已发布 · 1 草稿") + metric("成员", "8", "1 个待接受邀请") + metric("近 7 天 AI 请求", "24", "LLM 18 · JEV 6") + '</div><div class="columns governance"><div class="wide">' + box("AI 用量与预算", '<div class="bars"><i style="height:42%"></i><i style="height:68%"></i><i style="height:54%"></i><i style="height:80%"></i><i style="height:58%"></i><i style="height:92%"></i><i style="height:73%"></i></div><div class="bar-labels">周一　周二　周三　周四　周五　周六　周日</div><button class="outline">查看调用明细与预算</button>') + '</div><div class="narrow">' + box("最近操作", '<div class="event"><b>陈曦发布了客户跟进 v3</b><small>今天 10:32</small></div><div class="event"><b>林青更新了一条客户记录</b><small>今天 09:18</small></div><div class="event"><b>赵宁导出了授权数据</b><small>昨天 15:07</small></div><button class="outline full">查看操作日志</button>') + '</div></div>')),
    ("10-troubleshoot", "常见问题", "通知、后台运行和排障入口", shell("客户跟进",
        title("客户跟进 / 后台任务", "查看运行结果和通知", "关闭页面不会取消已入队运行；每次结果都保留可审阅的回执。") +
        '<div class="task-layout"><div class="task-main">' + box("后台任务　·　最近运行", '<div class="task-row"><b>每天同步公开目录</b><span>' + badge("成功", "green") + '　写入 18 条　·　今天 08:00</span><button class="outline">查看结果</button></div><div class="task-row"><b>逾期客户提醒</b><span>' + badge("等待确认", "warm") + '　3 条通知　·　昨天 18:00</span><button class="outline">处理运行</button></div><div class="task-row"><b>客户状态汇总</b><span>' + badge("失败") + '　来源超时　·　昨天 09:00</span><button class="outline">查看错误</button></div>', "task-box") + '</div><div class="task-side">' + box("通知", '<div class="event"><b>有一条运行需要确认</b><small>刚刚</small></div><div class="event"><b>客户跟进 v4 已发布</b><small>昨天</small></div><div class="event"><b>工作区邀请已接受</b><small>周一</small></div><button class="outline full">打开全部通知</button>') + '</div></div><div class="notice"><b>fx 暂时不可用？</b><p>已发布应用、确定性 CRUD、历史回执和声明式采集结果仍可继续查看；创建或修改候选会等待 AI 服务恢复。</p></div>')),
    ("11-example", "完整示例", "从创建到日常运行的一条业务闭环", shell("客户跟进",
        title("客户跟进 / 示例", "一周后的客户跟进工作台", "业务成员在已发布页面处理记录，小助手负责后续结构和自动化变更。") +
        '<div class="example-banner"><div class="app-icon">客</div><div><b>客户跟进</b><span>已发布 v3 · 8 位成员 · 128 条客户记录</span></div><button class="primary">＋ 新增客户</button></div><div class="tabs"><b>总览</b><span>客户</span><span>跟进任务</span><span>后台任务</span></div><div class="cards-3">' + metric("待跟进", "12", "今天需要处理") + metric("逾期", "3", "需要优先联系") + metric("自动化运行", "18", "本周成功") + '</div><div class="columns example-columns"><div class="wide">' + box("本周进展", table(["负责人", "待跟进", "已完成", "状态"], [["陈曦", "4", "8", badge("正常", "green")], ["林青", "5", "6", badge("正常", "green")], ["周安", "3", "2", badge("需关注", "warm")]])) + '</div><div class="narrow">' + box("小助手记录", '<div class="run-trace"><b>运行完成</b><span>查询记录　✓　生成提醒　✓　等待确认</span></div><p>“下周增加联系结果字段”已生成 v4 草稿。</p><button class="outline full">查看变更草稿</button>') + '</div></div>')),
    ("12-architecture", "技术架构", "当前服务、数据和 AI 边界", shell("概览",
        title("用户手册 / 附录", "企业技术架构", "浏览器、Go 服务、PocketBase 与 AI/Jev 之间的职责边界。") +
        '<div class="architecture"><div class="arch-row"><div class="arch-box"><small>成员浏览器</small><h3>已发布业务页面</h3><p>表单、列表、详情和动作</p></div><div class="arch-box"><small>成员浏览器</small><h3>小助手 fx</h3><p>持久运行、候选和确认门</p></div></div><div class="arrow">↓　身份、工作区和应用权限　↓</div><div class="arch-row"><div class="arch-box strong"><small>单个 Go 进程</small><h3>MIAO API + Engine</h3><p>HTTP API · 任务调度 · 版本发布 · 审计</p></div><div class="arch-box"><small>服务端配置</small><h3>AI Gateway / Jev</h3><p>长期密钥留在服务端 · 评估与用量</p></div></div><div class="arrow">↓　事务读写与附件授权　↓</div><div class="arch-row"><div class="arch-box"><small>嵌入式数据层</small><h3>PocketBase + SQLite</h3><p>账号 · 工作区 · 应用 · 记录 · 附件</p></div><div class="arch-box"><small>企业运维</small><h3>备份与恢复</h3><p>数据目录 · 备份策略 · 隔离演练</p></div></div></div><p class="hint">平台后台管理账号和配置，不因此获得工作区业务记录、附件或私有对话正文。</p>')),
]


links = "".join(
    f'<a class="gallery-card" href="./{slug}.html"><img src="./images/{slug}.png" alt="{escape(section)}原型图" loading="lazy"><span><b>{number:02d}　{escape(section)}</b><small>{escape(label)} →</small></span></a>'
    for number, (slug, section, label, _) in enumerate(SCREENS, 1)
)

for _, _, _, body in SCREENS:
    pass
for slug, section, _, body in SCREENS:
    html = (
        '<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
        f'<title>{escape(section)} · MIAO 当前版本示意图</title><link rel="stylesheet" href="prototype.css"></head><body>{body}</body></html>'
    )
    (OUT / f"{slug}.html").write_text(html, encoding="utf-8")

(OUT / "index.html").write_text(
    '<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
    '<title>MIAO 用户手册 · 当前版本示意图</title><link rel="stylesheet" href="prototype.css"></head><body class="gallery">'
    '<header><a href="../">← 返回用户手册</a><span>MIAO / 当前版本示意图</span></header><main><p class="kicker">12 SCREENS / HTML + PNG</p>'
    '<h1>从登录、建应用到团队运行</h1><p>这些页面是根据当前 MIAO 工作台整理的示意原型，使用示例数据；它们用于说明入口、信息层级和确认边界，不代表某个线上账号的实际内容。</p>'
    '<div class="gallery-grid">' + links + '</div></main></body></html>', encoding="utf-8"
)
