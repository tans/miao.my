import { useEffect, useRef } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { GithubIcon } from "@/components/site/SiteLayout";
import { useCopy } from "@/lib/i18n";
import { useLocale, usePageMeta } from "@/lib/locale";
import { mountPage } from "./mount";

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
            <img className="home-preview-image" src={h("index.preview_image")} alt={t("index.preview_alt")} />
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

mountPage(Home);
