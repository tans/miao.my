#!/usr/bin/env python3
"""Generate twelve standalone HTML screens and their gallery."""
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

def box(title, content, cls=""):
    return f'<section class="box {cls}"><div class="box-head"><b>{title}</b></div>{content}</section>'

def chat(who, content):
    return f'<div class="bubble {who}"><b>{"fx" if who == "agent" else "你"}</b><p>{content}</p></div>'

def title(kicker, heading, subtitle, action=""):
    return f'<div class="kicker">{kicker}</div><div class="title-row"><div><h1>{heading}</h1><p class="lead">{subtitle}</p></div>{action}</div>'

def metric(label, value, detail):
    return f'<div class="metric"><small>{label}</small><strong>{value}</strong><span>{detail}</span></div>'

def field(label, value):
    return f'<div class="field"><small>{label}</small><div>{value}</div></div>'

SCREENS = [
 ("01-overview", "认识 MIAO", "工作区首页",
  title("工作区 / 概览", "今天想做什么？", "描述一项工作，fx 会帮你整理成团队可以直接使用的应用。") +
  '<div class="prompt">例如：做一个客户跟进应用，销售录入客户，主管查看本周待跟进…<button>发送 ↗</button></div>'
  '<div class="section-title"><h2>你的应用</h2><span>最近使用 ⌄</span></div>'
  '<div class="cards-3">'
  '<div class="app-card"><div class="app-icon">客</div><h3>客户跟进</h3><p>统一记录沟通与下次行动</p><div class="mini"><i></i><i></i><i></i></div><footer>● 运行中 <span>刚刚使用</span></footer></div>'
  '<div class="app-card"><div class="app-icon gray">需</div><h3>需求收集</h3><p>把来自各部门的需求放在一起</p><div class="mini"><i></i><i></i><i></i></div><footer>● 运行中 <span>昨天更新</span></footer></div>'
  '<div class="app-card"><div class="app-icon beige">采</div><h3>采购申请</h3><p>申请、审批与进度查询</p><div class="mini"><i></i><i></i><i></i></div><footer>◌ 草稿 <span>继续创建 →</span></footer></div></div>'
  '<p class="hint">管理应用靠对话 · 团队日常工作在应用中完成 · 数据表位于次级入口</p>'),
 ("02-start", "开始使用", "选择工作区",
  title("欢迎使用 MIAO", "选择你的工作区", "每个工作区拥有独立的应用、成员与数据。") +
  '<div class="onboard"><div class="choice selected"><i>T</i><div><b>极速互动</b><p>企业工作区 · 8 位成员 · 3 个应用</p></div><span>进入 →</span></div>'
  '<div class="choice"><i class="pale">我</i><div><b>我的工作区</b><p>个人空间 · 仅自己可见</p></div><span>进入 →</span></div>'
  '<div class="notice"><b>收到团队邀请？</b><p>请使用受邀邮箱登录。加入后即可看到获得授权的应用。</p><a>查看邀请 →</a></div>'
  '<div class="step-line"><b>1 选择空间</b><span>2 描述工作</span><span>3 试用应用</span></div></div>'),
 ("03-create", "创建应用", "与 fx 讨论需求",
  title("工作区 / 新应用", "客户跟进", "先说清楚团队的工作，fx 会整理方案并生成草稿。") +
  '<div class="columns"><div class="wide">' +
  box("与 fx 对话　　·　需求确认中",
      chat("user", "为 8 人销售团队做一个客户跟进应用。需要记录沟通和下次跟进时间。") +
      chat("agent", "我会建立客户列表、详情和跟进任务。销售之间可以互相查看客户吗？主管需要看到全部客户吗？") +
      chat("user", "销售只能看负责的客户，主管可以看全部。") +
      chat("agent", "收到。我先生成方案，你可以在右侧检查。") +
      '<div class="composer">继续补充需求… <span>发送 ↗</span></div>', "chat")
  + '</div><div class="narrow">' +
  box("应用方案　　{}",
      '<h2>客户跟进</h2><p>让销售跟进有记录，让主管知道下一步。</p>'
      + field("页面", "总览　客户列表　跟进任务")
      + field("核心信息", "客户 · 联系人 · 负责人 · 沟通记录 · 下次跟进")
      + field("主要操作", "新增客户 · 记录沟通 · 标记完成 · 筛选逾期")
      + field("可见范围", "销售查看负责客户；主管查看全部")
      + '<button class="primary full">生成可试用的草稿 →</button>', "proposal")
  + '</div></div>'),
 ("04-publish", "预览与发布", "发布确认",
  title("客户跟进 / 草稿预览", "先试用，再发布", "预览数据为示例，正式业务记录不会改变。", badge("预览中 · v3 草稿", "warm")) +
  '<div class="columns preview"><div class="wide">' +
  box("客户跟进　　总览　客户　跟进任务",
      '<div class="inner-app"><small>本周 / 团队</small><h2>待跟进客户</h2>'
      '<div class="cards-3">'+metric("本周待跟进","12","查看任务 →")+metric("已逾期","3","优先处理 →")+metric("已完成","8","查看记录 →")+'</div>'
      + table(["客户", "负责人", "下次跟进"], [["星河设计 · 示例", "陈曦", "10 月 02 日"], ["光点工作室 · 示例", "林青", "10 月 03 日"]])
      + '</div>', "preview-box") + '</div><div class="narrow">' +
  box("发布检查　　3 / 3 已完成",
      '<h2>客户跟进</h2><p>本次发布 3 个页面、1 个数据表和 4 个业务操作。</p>'
      '<ul class="checks"><li>✓ 页面和表单可正常使用</li><li>✓ 销售与主管权限已检查</li><li>✓ 数据与字段引用有效</li></ul>'
      '<div class="notice"><b>影响范围</b><p>发布后成员看到新版。示例记录不进入正式数据。</p></div>'
      '<button class="primary full">确认发布</button><p class="muted center">失败时现有版本继续运行</p>', "publish-box") + '</div></div>'),
 ("05-work", "团队日常使用", "客户跟进应用",
  title("极速互动 / 客户跟进", "客户跟进", "记录下一步，让团队协作有连续性。", '<button class="primary">＋ 新增客户</button>') +
  '<div class="tabs"><b>总览</b><span>客户</span><span>跟进任务</span><span>···</span></div>'
  '<div class="cards-3">'+metric("本周待跟进","12","查看任务 →")+metric("已逾期","3","优先处理 →")+metric("本周已完成","8","查看记录 →")+'</div>'
  '<div class="section-title"><h2>接下来需要处理</h2><span>⌕ 搜索客户　　筛选 ⌄</span></div>' +
  table(["客户", "负责人", "最近沟通", "下次跟进", "状态"], [
      ["星河设计", "陈曦", "9 月 28 日", "今天 15:00", badge("待跟进", "warm")],
      ["光点工作室", "林青", "9 月 26 日", "明天 10:00", badge("进行中")],
      ["青屿科技", "陈曦", "9 月 24 日", "10 月 02 日", badge("进行中")],
      ["北岸咖啡", "周安", "9 月 21 日", "10 月 03 日", badge("待跟进", "warm")]]) +
  '<p class="hint">成员在业务页面处理工作，不必每一步都进入 Agent 对话。</p>'),
 ("06-change", "修改应用与版本", "变更预览",
  title("客户跟进 / 管理应用", "修改应用", "一次对话形成一个草稿。确认差异后再发布。") +
  '<div class="columns"><div class="wide">' +
  box("与 fx 对话　　·　绑定客户跟进 v3",
      chat("user", "在客户详情增加“最近一次联系结果”，并把逾期客户放在总览最上方。") +
      chat("agent", "已生成 v4 草稿。右侧是变更摘要，预览不会改变正式数据。") +
      chat("agent", "已有记录的新字段初始可以留空，以后在客户详情补充。") +
      '<div class="composer">继续修改，或打开预览… <span>发送 ↗</span></div>', "chat")
  + '</div><div class="narrow">' +
  box("v3 → v4　　·　草稿",
      '<h2>变更摘要</h2><div class="change"><b>＋ 客户详情</b><p>新增“最近一次联系结果”字段</p></div>'
      '<div class="change"><b>↗ 总览</b><p>逾期客户移到列表顶部</p></div>'
      '<div class="notice"><b>数据影响</b><p>已有客户保留；新字段初始为空。</p></div>'
      '<p class="version">v1 创建　—　v2 权限　—　v3 当前　—　<b>v4 草稿</b></p>'
      '<button class="primary full">打开草稿预览 →</button>', "proposal") + '</div></div>'),
 ("07-data", "数据、附件与导出", "数据检查",
  title("客户跟进 / ··· / 查看数据表", "检查数据", "这里用于核对和必要修正；修改应用结构请告诉 fx。", '<button class="outline">导出授权数据 ↓</button>') +
  '<div class="tabs"><b>客户 · 128</b><span>跟进记录 · 346</span><span>附件</span></div>'
  '<div class="toolbar">⌕ 搜索客户、联系人…　　负责人：全部 ⌄　　状态：全部 ⌄</div>'
  '<div class="columns data-columns"><div class="wide">' +
  box("客户记录　　1–25 / 128", table(["客户名称", "联系人", "负责人", "状态"], [
      ["星河设计", "王女士", "陈曦", badge("待跟进", "warm")],
      ["光点工作室", "李先生", "林青", badge("进行中")],
      ["青屿科技", "赵女士", "陈曦", badge("已完成", "green")],
      ["北岸咖啡", "孙先生", "周安", badge("待跟进", "warm")]]) + '<div class="pager">上一页　　下一页 →</div>') +
  '</div><div class="narrow">' +
  box("记录详情　　×", '<h2>星河设计</h2>' + field("联系人", "王女士") + field("负责人", "陈曦") + field("下次跟进", "2026-09-29 15:00") + field("附件", "需求清单.pdf　↓") + '<button class="outline full">进入编辑状态</button>') +
  '</div></div>'),
 ("08-team", "成员与权限", "成员管理",
  title("极速互动 / 空间设置", "成员与应用权限", "先确定团队角色，再按应用授予查看、编辑和管理权限。", '<button class="primary">邀请成员</button>') +
  '<div class="tabs"><b>成员</b><span>应用访问</span><span>邀请记录</span></div>'
  '<div class="columns"><div class="wide">' +
  box("工作区成员　　8 位成员", table(["成员", "工作区角色", "状态"], [
      ["陈曦 · chenxi@example.com", badge("owner"), "已加入"],
      ["林青 · linqing@example.com", badge("admin"), "已加入"],
      ["周安 · zhouan@example.com", badge("member"), "已加入"],
      ["何雨 · heyu@example.com", badge("member"), "已加入"]])) +
  '</div><div class="narrow">' +
  box("客户跟进　　访问范围", '<p>链接不会自动授权。成员需要在名单中才能打开应用。</p>'
      '<div class="access">陈曦 <span>应用管理者</span></div><div class="access">林青 <span>editor</span></div><div class="access">周安 <span>viewer</span></div>'
      '<button class="outline full">管理应用访问</button>') + '</div></div>'
  '<div class="notice"><b>离职交接</b><p>先交接客户和应用责任，再移除成员。移出工作区不会停用全局账号。</p></div>'),
 ("09-governance", "企业治理", "工作区治理",
  title("极速互动 / 空间设置", "工作区治理", "应用责任、用量与审计放在同一个空间管理视图中。") +
  '<div class="cards-3">'+metric("应用","3","2 运行中 · 1 草稿")+metric("成员","8","1 个待接受邀请")+metric("今日 AI 请求","24","预算内 · 查看用量 →")+'</div>'
  '<div class="columns governance"><div class="wide">' +
  box("AI 用量趋势　　近 7 天", '<div class="bars"><i style="height:44%"></i><i style="height:62%"></i><i style="height:38%"></i><i style="height:74%"></i><i style="height:50%"></i><i style="height:84%"></i><i style="height:68%"></i></div><div class="bar-labels">周三　　　 周四　　　 周五　　　 周六　　　 周日　　　 周一　　　 周二</div><p class="muted">请求数、token 数与费用分别核对。</p>') +
  '</div><div class="narrow">' +
  box("最近操作　　查看全部 →", '<div class="event"><b>陈曦发布了客户跟进 v3</b><small>今天 10:32</small></div><div class="event"><b>林青更新了一条客户记录</b><small>今天 09:18</small></div><div class="event"><b>陈曦邀请了新成员</b><small>昨天 16:40</small></div><div class="event"><b>周安导出了授权数据</b><small>昨天 15:07</small></div>') +
  '</div></div><p class="hint">界面示例数据。正式产品按当前工作区授权与实际统计展示。</p>'),
 ("10-troubleshoot", "常见问题", "帮助与诊断",
  title("帮助 / 问题处理", "先确认范围，再处理问题", "快速找到可以自己完成的检查，再决定是否联系管理员。") +
  '<div class="toolbar">⌕ 搜索“打不开应用”“保存失败”“发布冲突”…</div>'
  '<div class="cards-2 help">'
  '<div class="help-card"><i>◇</i><h3>同事打不开应用</h3><p>确认登录邮箱与工作区，再请 owner 检查应用访问名单。</p><span>查看处理步骤 →</span></div>'
  '<div class="help-card"><i>↻</i><h3>草稿没有出现在正式应用</h3><p>检查发布状态和变更历史；发布失败时原版继续运行。</p><span>查看处理步骤 →</span></div>'
  '<div class="help-card"><i>!</i><h3>记录保存失败</h3><p>检查字段提示、权限和网络；发生冲突后读取最新内容。</p><span>查看处理步骤 →</span></div>'
  '<div class="help-card"><i>✳</i><h3>fx 暂时不可用</h3><p>查看 AI 服务状态或预算。已发布业务页面可继续使用。</p><span>查看处理步骤 →</span></div></div>'
  '<div class="notice"><b>需要管理员协助？</b><p>提供工作区、应用名称、操作时间和错误提示。不要发送密钥或完整业务数据。</p></div>'),
 ("11-example", "完整示例", "客户跟进详情",
  title("客户跟进 / 客户 / 星河设计", "星河设计", "从一条客户记录，走完跟进、交接和复盘。", '<button class="primary">＋ 记录一次沟通</button>') +
  '<div class="tabs"><b>概览</b><span>沟通记录</span><span>附件</span></div><div class="columns"><div class="wide">' +
  box("下一步　　今天待跟进", '<h2>确认方案评审时间</h2><p>客户希望本周看到两套方案。联系后记录反馈，并约定下一次沟通时间。</p>'
      '<button class="primary">标记已完成</button> <button class="outline">调整时间</button>'
      '<div class="section-title"><h3>最近沟通</h3><span>查看全部 →</span></div>'
      '<div class="event"><b>电话沟通</b><small>09 月 28 日 · 陈曦</small><p>确认需求范围，客户希望加入移动端使用场景。</p></div>'
      '<div class="event"><b>首次拜访</b><small>09 月 21 日 · 陈曦</small><p>已了解团队规模和当前记录方式。</p></div>') +
  '</div><div class="narrow">' +
  box("客户信息　　编辑", field("负责人", "陈曦") + field("联系人", "王女士") + field("阶段", "方案沟通") + field("下次跟进", "今天 15:00") + field("附件", "需求清单.pdf　↓")) +
  '</div></div>'),
 ("12-architecture", "技术架构", "企业技术评估",
  title("用户手册 / 附录", "企业技术架构", "了解各层职责和数据边界，便于评估自托管、授权与恢复。") +
  '<div class="architecture">'
  '<div class="arch-row"><div class="arch-box"><small>成员的浏览器</small><h3>业务界面</h3><p>使用已发布应用</p></div><div class="arch-box"><small>成员的浏览器</small><h3>fx Agent</h3><p>创建和修改应用</p></div></div>'
  '<div class="arrow">↓　当前身份与受控工具　↓</div>'
  '<div class="arch-row"><div class="arch-box strong"><small>企业运行服务</small><h3>MIAO API</h3><p>权限检查 · 版本发布 · 业务操作</p></div><div class="arch-box"><small>模型请求</small><h3>AI Gateway 代理</h3><p>服务端保管长期密钥</p></div></div>'
  '<div class="arrow">↓　授权读写　↓</div>'
  '<div class="arch-row"><div class="arch-box"><small>企业数据</small><h3>PocketBase</h3><p>账号 · 应用 · 记录 · 附件</p></div><div class="arch-box"><small>企业运维</small><h3>备份与恢复</h3><p>异地副本 · 隔离演练</p></div></div></div>'
  '<p class="hint">静态官网和手册独立部署；平台管理员不因此获得企业业务内容的读取权限。</p>'),
]

def sidebar(active):
    items = [("◫", "概览"), ("□", "客户跟进"), ("□", "需求收集"), ("□", "采购申请")]
    nav = "".join(f'<div class="nav-item {"active" if name == active else ""}"><span>{icon}</span>{name}</div>' for icon, name in items)
    return ('<aside class="sidebar"><div class="logo"><img src="../../assets/mascots/cat-logo-head.png" alt=""><b>MIAO</b></div>'
            '<div class="switch">T　极速互动 <span>⌄</span></div><div class="side-label">工作区</div>' + nav +
            '<div class="side-bottom"><div class="nav-item"><span>⚙</span>空间设置</div><div class="person"><i>陈</i>陈曦 <span>···</span></div></div></aside>')

for number, (slug, section, label, body) in enumerate(SCREENS, 1):
    active = "概览" if number <= 3 or number in (9, 10, 12) else "客户跟进"
    html = (f'<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
            f'<title>{escape(section)} · MIAO 原型</title><link rel="stylesheet" href="./prototype.css"></head><body>'
            f'<div class="frame">{sidebar(active)}<div class="work-area"><header class="topbar"><div>极速互动 <span>/</span> {escape(label)}</div>'
            '<div class="top-right"><i></i> 服务正常　　⌕　 <b>陈</b></div></header>'
            f'<main class="screen">{body}<div class="prototype-note">MIAO 界面原型 · 第 {number:02d} / 12 张 · 示例数据</div></main>'
            '</div></div></body></html>')
    (OUT / f"{slug}.html").write_text(html, encoding="utf-8")

links = "".join(f'<a class="gallery-card" href="./{slug}.html"><img src="./images/{slug}.png" alt="{escape(section)}原型图" loading="lazy"><span><b>{number:02d}　{escape(section)}</b><small>{escape(label)} →</small></span></a>' for number, (slug, section, _, _) in enumerate(SCREENS, 1))
(OUT / "index.html").write_text('<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>MIAO 用户手册 · 界面原型</title><link rel="stylesheet" href="./prototype.css"></head><body class="gallery"><header><a href="../">← 返回用户手册</a><span>MIAO / 界面原型</span></header><main><p class="kicker">12 SCREENS / HTML + PNG</p><h1>从描述工作到团队使用</h1><p>每张图片对应一份可打开的 HTML 原型。画面使用示例数据，供产品与工程实现时参考交互层级和布局。</p><div class="gallery-grid">' + links + '</div></main></body></html>', encoding="utf-8")
print(f"Generated {len(SCREENS)} screens and gallery")
