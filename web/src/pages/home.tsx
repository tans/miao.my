import { useEffect, useRef, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { GithubIcon } from "@/components/site/SiteLayout";
import { useCopy } from "@/lib/i18n";
import { useLocale, usePageMeta } from "@/lib/locale";

function CatFigure() {
  return (
    <svg className="miao-cat-figure" viewBox="0 0 64 40" xmlns="http://www.w3.org/2000/svg" focusable="false">
      <g className="miao-cat-tail">
        <path d="M47 23Q54 21 56 14" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
        <g className="miao-cat-tail-tip">
          <path d="M56 14Q60 5 55 7" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
        </g>
      </g>
      <g className="miao-cat-legs-back">
        <g transform="translate(26 25)">
          <path className="miao-cat-leg miao-cat-leg-far-front" d="M0 0 Q1 6 -3 12 L-5 13" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g transform="translate(41 25)">
          <path className="miao-cat-leg miao-cat-leg-far-hind" d="M0 0 Q1 6 -3 12 L-5 13" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <g className="miao-cat-body">
        <ellipse cx="36" cy="23" rx="15" ry="8.5" fill="currentColor" />
        <path d="M11 17c0-4.2 2.5-7.2 6-7.8L19 4l4 6 2.2 1.2c2.4 1.4 3.7 4.4 3 7.5l-1 3.6H13c-1.2-1.2-2-2.7-2-4.3Z" fill="currentColor" />
        <circle cx="14.2" cy="15.2" r="1" fill="#e5b93f" />
        <circle cx="10.7" cy="18.4" r=".85" fill="#d98f93" />
      </g>
      <g className="miao-cat-legs-front">
        <g transform="translate(29 25)">
          <path className="miao-cat-leg miao-cat-leg-near-front" d="M0 0 Q1 6 -3 12 L-5 13" fill="none" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g transform="translate(44 25)">
          <path className="miao-cat-leg miao-cat-leg-near-hind" d="M0 0 Q1 6 -3 12 L-5 13" fill="none" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  );
}

function SolCat() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-sitting");
    } else {
      const onEnd = (event: AnimationEvent) => {
        if (event.target === el && event.animationName === "miao-cat-sol-to-center") {
          el.classList.add("is-sitting");
        }
      };
      el.addEventListener("animationend", onEnd);
      return () => el.removeEventListener("animationend", onEnd);
    }
  }, []);
  return (
    <div className="miao-cat miao-cat-sol" ref={ref}>
      <span className="miao-cat-label">sol</span>
      <CatFigure />
      <svg className="miao-cat-seated" viewBox="0 0 64 40" xmlns="http://www.w3.org/2000/svg" focusable="false">
        <path className="miao-cat-seated-tail" d="M42 34C51 39 59 38 57 33c-1-3-5-2-6 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="38" cy="30" rx="11" ry="8" fill="currentColor" />
        <path d="M24 17c8-2 12 2 14 9l7 10H24c-3-7-3-13 0-19Z" fill="currentColor" />
        <path d="M13 15c0-4 2-6 5-7l2-6 4 6 4 2c3 2 4 5 2 8l-2 4H17c-3-2-4-4-4-7Z" fill="currentColor" />
        <path d="M24 23v14h-4m10-13v13h-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="16" cy="13" r="1" fill="#e5b93f" />
        <circle cx="13" cy="16" r=".8" fill="#d98f93" />
      </svg>
    </div>
  );
}

function StoryStep({
  id,
  kicker,
  title,
  body,
  limit,
  actions,
  imgSrc,
  imgAlt,
  caption,
}: {
  id: string;
  kicker: string;
  title: string;
  body: string;
  limit: string;
  actions: { primary: { href: string; label: string }; links: { href: string; label: string }[] };
  imgSrc: string;
  imgAlt: string;
  caption: string;
}) {
  return (
    <article className="story-step" id={id} aria-labelledby={`${id}-title`}>
      <div className="story-copy">
        <p className="section-kicker">{kicker}</p>
        <h3 id={`${id}-title`}>{title}</h3>
        <p>{body}</p>
        <p className="story-limit">{limit}</p>
        <div className="story-actions">
          <a className="btn btn-neutral" href={actions.primary.href}>{actions.primary.label}</a>
          {actions.links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </div>
      </div>
      <figure>
        <a href={actions.links[0].href}>
          <img src={imgSrc} width="1440" height="900" loading="lazy" alt={imgAlt} />
        </a>
        <figcaption>{caption}</figcaption>
      </figure>
    </article>
  );
}


type DemoApp = "crm" | "projects" | "knowledge";
type DemoTab = "app" | "data" | "files";

function WorkspaceDemo({ english }: { english: boolean }) {
  const [app, setApp] = useState<DemoApp>("crm");
  const [tab, setTab] = useState<DemoTab>("app");
  const [asked, setAsked] = useState(false);
  const label = (zh: string, en: string) => english ? en : zh;
  const apps: { id: DemoApp; icon: string; zh: string; en: string }[] = [
    { id: "crm", icon: "♧", zh: "客户管理", en: "Customers" },
    { id: "projects", icon: "▦", zh: "项目管理", en: "Projects" },
    { id: "knowledge", icon: "▤", zh: "知识库", en: "Knowledge" },
  ];
  const current = apps.find((a) => a.id === app)!;
  const customers = [
    [label("深圳某科技有限公司", "Shenzhen Technology"), label("跟进中", "In progress"), label("2 天前", "2 days ago")],
    [label("杭州云创科技", "Hangzhou Cloud"), label("已预约", "Scheduled"), label("3 天前", "3 days ago")],
    [label("上海星辰智能", "Shanghai Intelligence"), label("评估中", "Reviewing"), label("4 天前", "4 days ago")],
  ];
  const projects = [
    [label("官网升级", "Website refresh"), label("进行中", "In progress"), label("今天", "Today")],
    [label("客户回访计划", "Customer follow-up"), label("待检查", "To review"), label("昨天", "Yesterday")],
    [label("季度报告", "Quarterly report"), label("已完成", "Done"), label("2 天前", "2 days ago")],
  ];
  const knowledge = [
    [label("产品介绍", "Product overview"), label("已发布", "Published"), label("今天", "Today")],
    [label("交付流程", "Delivery process"), label("已发布", "Published"), label("昨天", "Yesterday")],
    [label("常见问题", "Common questions"), label("草稿", "Draft"), label("3 天前", "3 days ago")],
  ];
  const rows = app === "crm" ? customers : app === "projects" ? projects : knowledge;
  const ask = () => setAsked(true);
  return (
    <div className="miao-demo" aria-label={label("MIAO 三栏工作台交互示意", "Interactive three-column MIAO workspace illustration")}>
      <aside className="miao-demo-side">
        <div className="miao-demo-brand"><span className="miao-demo-cat">♡</span><b>miao</b><span className="miao-demo-brand-plus">⊞</span></div>
        <div className="miao-demo-search">⌕ &nbsp;{label("搜索应用…", "Search apps…")}</div>
        <div className="miao-demo-side-label">{label("我的应用", "MY APPS")}</div>
        {apps.map((item) => <button key={item.id} type="button" className={`miao-demo-app-link ${app === item.id ? "is-active" : ""}`} onClick={() => { setApp(item.id); setTab("app"); setAsked(false); }} aria-pressed={app === item.id}><span className="miao-demo-app-icon">{item.icon}</span>{english ? item.en : item.zh}</button>)}
        <div className="miao-demo-side-divider" />
        <span className="miao-demo-muted-line">＋ {label("新建应用", "Create app")}</span>
        <span className="miao-demo-muted-line">▦ {label("应用模板", "Templates")}</span>
        <div className="miao-demo-account"><span className="miao-demo-avatar">M</span><span>{label("我的工作区", "My workspace")}<small>{label("示意界面", "Illustration")}</small></span><span className="miao-demo-gear">⚙</span></div>
      </aside>
      <section className="miao-demo-chat">
        <div className="miao-demo-panel-head"><span className="miao-demo-header-icon">{current.icon}</span><span><strong>{english ? current.en : current.zh}</strong><small><i />{label("应用助手", "App assistant")}</small></span><span className="miao-demo-head-menu">···</span></div>
        <div className="miao-demo-conversation">
          <div className="miao-demo-greeting"><span className="miao-demo-chat-cat">♡</span><div><strong>{label("你好！我是应用助手", "Hello! I'm your app assistant")}</strong><p>{label("我可以帮你查找记录、整理进度，也可以直接操作右侧的应用。", "I can find records, summarize progress, and help you work in the app on the right.")}</p></div></div>
          <div className="miao-demo-suggestions">
            <button type="button" onClick={ask}>{label("整理最近的工作进展", "Summarize recent work")}</button>
            <button type="button" onClick={ask}>{label("查看待处理事项", "Show pending work")}</button>
          </div>
          <div className="miao-demo-user-bubble">{label("帮我整理最近的工作情况", "Summarize recent activity")}</div>
          <div className="miao-demo-assistant-answer">
            <span className="miao-demo-chat-cat">♡</span>
            <div><p>{asked ? label("已为你整理示例中的待办和进展。", "Here's the sample activity summary.") : label("好的，这里是最近的工作概况。", "Here's a quick overview of recent work.")}</p>
              <div className="miao-demo-result"><strong>{label("最近 7 天", "Last 7 days")}</strong><div className="miao-demo-stats"><span><b>12</b><small>{label("进行中", "Active")}</small></span><span><b>5</b><small>{label("新增记录", "New")}</small></span><span><b>3</b><small>{label("待处理", "Pending")}</small></span></div><div className="miao-demo-result-foot">{label("点击右侧切换视图，查看对应示意数据 →", "Explore the sample data on the right →")}</div></div>
            </div>
          </div>
        </div>
        <div className="miao-demo-composer"><span>{label("发送消息，或输入 / 选择技能…", "Message or choose a skill…")}</span><button type="button" onClick={ask} aria-label={label("演示发送消息", "Demo send message")}>➤</button></div>
      </section>
      <section className="miao-demo-runtime">
        <div className="miao-demo-tabs" role="tablist" aria-label={label("示意应用视图", "Demo views")}>
          {([{ id: "app", zh: "应用", en: "App" }, { id: "data", zh: "数据", en: "Data" }, { id: "files", zh: "文件", en: "Files" }] as const).map((item) => <button key={item.id} type="button" role="tab" aria-selected={tab === item.id} className={tab === item.id ? "selected" : ""} onClick={() => setTab(item.id)}>{english ? item.en : item.zh}</button>)}
          <span className="miao-demo-tabs-more">···</span>
        </div>
        <div className="miao-demo-runtime-body">
          <div className="miao-demo-runtime-intro"><span className="miao-demo-runtime-logo">{current.icon}</span><div><h3>{english ? current.en : current.zh}</h3><p>{label("业务数据与团队协作，都在这里完成。", "Your team's work and data in one place.")}</p></div></div>
          <div className="miao-demo-runtime-title"><strong>{tab === "app" ? label("记录列表", "Records") : tab === "data" ? label("数据表", "Data tables") : label("应用文件", "App files")}</strong><span>＋ {tab === "files" ? label("上传", "Upload") : label("新建", "New")}</span></div>
          {tab === "files" ? <div className="miao-demo-file-list"><div>▤ &nbsp;{label("客户需求说明.pdf", "Requirements.pdf")}</div><div>▤ &nbsp;{label("工作进展.xlsx", "Progress.xlsx")}</div><div>▤ &nbsp;{label("产品资料.md", "Product-notes.md")}</div></div> :
          <div className="miao-demo-table"><div className="miao-demo-table-header"><span>{tab === "data" ? label("数据表 / 记录", "Table / record") : label("名称", "Name")}</span><span>{label("状态", "Status")}</span><span>{label("更新", "Updated")}</span></div>
          {(tab === "data" ? [[label("主要记录", "Main records"), "12", label("今天", "Today")], [label("跟进记录", "Activity log"), "8", label("昨天", "Yesterday")], [label("文件附件", "Attachments"), "3", label("3 天前", "3 days ago")]] : rows).map((r) => <div className="miao-demo-table-row" key={r[0]}><span>{r[0]}</span><span><em>{r[1]}</em></span><span>{r[2]}</span></div>)}</div>}
          <div className="miao-demo-pagination">‹ &nbsp; <b>1</b> &nbsp; 2 &nbsp; 3 &nbsp; ›</div>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  const { locale } = useLocale();
  const { t, h } = useCopy(locale);
  const dialogRef = useRef<HTMLDialogElement>(null);
  usePageMeta("index.title", ["index.meta1", "index.meta2", "index.meta3", "index.meta4"]);

  const steps = [
    {
      id: "describe",
      prefix: "index.describe",
      img: "/docs/prototypes/images/02-start.png",
    },
    {
      id: "shape",
      prefix: "index.shape",
      img: "/docs/prototypes/images/03-create.png",
    },
    {
      id: "use",
      prefix: "index.use",
      img: "/docs/prototypes/images/05-work.png",
    },
    {
      id: "operate",
      prefix: "index.operate",
      img: "/docs/prototypes/images/10-troubleshoot.png",
    },
  ];

  return (
    <SiteLayout active={null} bodyClass="home-page" mainClass="landing-home">
      <section className="home-hero home-hero-compact" aria-labelledby="hero-title">
        <h1 id="hero-title">{t("index.hero_title")}</h1>
        <p className="hero-description">
          {t("index.hero_lead1")}{t("index.hero_lead2")}{t("index.hero_lead3")}{t("index.hero_lead4")}
        </p>
        <div className="hero-actions">
          <a className="btn btn-neutral" href={h("index.cta_start_href")}>{t("index.cta_start")}</a>
          <a className="btn btn-outline" href={h("index.cta_guide_href")}>{t("index.cta_guide")}</a>
          <a className="btn btn-outline" href="https://github.com/tans/miao">
            {t("index.cta_source")} <GithubIcon />
          </a>
          <a className="btn btn-outline" href={h("index.cta_costs_href")}>{t("index.cta_costs")}</a>
        </div>
        <nav className="story-nav" aria-label={t("index.story_nav_label")}>
          <a href="#describe">{t("index.step1_nav")}</a>
          <a href="#shape">{t("index.step2_nav")}</a>
          <a href="#use">{t("index.step3_nav")}</a>
          <a href="#operate">{t("index.step4_nav")}</a>
        </nav>
        <div className="hero-visual">
          <div className="miao-cat-track" aria-hidden="true">
            <div className="miao-cat miao-cat-luna">
              <span className="miao-cat-label">luna</span>
              <CatFigure />
            </div>
            <SolCat />
          </div>
          <figure className="home-preview-figure">
            <WorkspaceDemo english={locale === "en"} />
            <figcaption className="home-preview-caption">
              <span>{t("index.preview_caption")}</span>
              <a href={h("index.preview_href")}>{t("index.preview_link")}</a>
            </figcaption>
          </figure>
        </div>
        <p className="story-note">
          {t("index.note1")}{t("index.note2")}{t("index.note3")}
        </p>
        <button className="btn btn-neutral deploy-cta" id="contact-cta" type="button" aria-haspopup="dialog" onClick={() => dialogRef.current?.showModal()}>
          {t("index.contact")}
        </button>
      </section>

      <section className="product-story" aria-labelledby="story-title">
        <h2 id="story-title">{t("index.story_title")}</h2>
        {steps.map((step) => (
          <StoryStep
            key={step.id}
            id={step.id}
            kicker={t(`${step.prefix}.kicker`)}
            title={t(`${step.prefix}.title`)}
            body={[1, 2, 3, 4].map((n) => t(`${step.prefix}.body${n}`)).join("")}
            limit={[1, 2, 3, 4].map((n) => t(`${step.prefix}.limit${n}`)).join("")}
            actions={{
              primary: { href: h(`${step.prefix}.a1_href`), label: t(`${step.prefix}.a1`) },
              links: [
                { href: h(`${step.prefix}.a2_href`), label: t(`${step.prefix}.a2`) },
                { href: h(`${step.prefix}.a3_href`), label: t(`${step.prefix}.a3`) },
              ],
            }}
            imgSrc={step.img}
            imgAlt={t(`${step.prefix}.img_alt`)}
            caption={t(`${step.prefix}.caption`)}
          />
        ))}
      </section>

      <dialog className="modal contact-modal" id="wechat-dialog" aria-labelledby="wechat-title" ref={dialogRef}>
        <div className="modal-box">
          <h2 id="wechat-title">{t("index.dialog.title")}</h2>
          <p>{t("index.dialog.wechat")}</p>
          <strong className="wechat-id">tianshe00</strong>
          <form method="dialog" className="modal-action">
            <button className="btn btn-neutral">{t("index.dialog.ok")}</button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button aria-label={t("index.dialog.close_label")}>{t("index.dialog.close")}</button>
        </form>
      </dialog>
    </SiteLayout>
  );
}