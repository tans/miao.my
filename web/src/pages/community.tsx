import { useState } from "react";
import { SiteLayout, GithubIcon, ShieldIcon } from "@/components/site/SiteLayout";
import { useCopy } from "@/lib/i18n";
import { useLocale, usePageMeta } from "@/lib/locale";

function CopyTemplate({ steps, hint }: { steps: string[]; hint: string }) {
  const [copied, setCopied] = useState(false);
  const text = steps.map((s) => `- ${s}`).join("\n");
  return (
    <div className="community-template">
      <ul>
        {steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
      <button
        type="button"
        className="btn btn-outline btn-sm"
        onClick={() => {
          void navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        }}
      >
        {copied ? "✓" : hint}
      </button>
    </div>
  );
}

export default function Community() {
  const { locale } = useLocale();
  const { t } = useCopy(locale);
  usePageMeta("community.title", ["community.meta1", "community.meta2"]);

  return (
    <SiteLayout active="community" bodyClass="community-page" mainClass="community-main">
      <section className="community-hero" aria-labelledby="community-title">
        <p className="section-kicker">{t("community.kicker")}</p>
        <h1 id="community-title">{t("community.h1")}</h1>
        <p>{t("community.lede1")}{t("community.lede2")}{t("community.lede3")}</p>
        <div className="community-actions">
          <a className="btn btn-neutral" href={t("community.found_bug.link_href")}>
            {t("community.cta_issues")} <GithubIcon />
          </a>
          <a className="btn btn-outline" href={t("community.help_not_sure.link_href")}>{t("community.cta_docs")}</a>
        </div>
      </section>

      <section className="community-grid" aria-labelledby="routes-title">
        <h2 id="routes-title">{t("community.routes.title")}</h2>
        <div className="community-cards">
          {(["help_not_sure", "install_error", "found_bug"] as const).map((k) => (
            <article className="community-card" key={k}>
              <p className="section-kicker">{t(`community.${k}.kicker`)}</p>
              <h3>{t(`community.${k}.title`)}</h3>
              <p>{t(`community.${k}.body`)}</p>
              <a href={t(`community.${k}.link_href`)}>{t(`community.${k}.link`)}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="community-template-wrap" aria-labelledby="template-title">
        <p className="section-kicker">{t("community.template.kicker")}</p>
        <h2 id="template-title">{t("community.template.title")}</h2>
        <CopyTemplate
          steps={[1, 2, 3, 4, 5].map((n) => t(`community.template.step${n}`))}
          hint={t("community.template.copy_hint")}
        />
      </section>

      <section className="community-grid" aria-labelledby="build-title">
        <h2 id="build-title">{t("community.build_together.title")}</h2>
        <div className="community-cards">
          {(["idea", "code", "releases"] as const).map((k) => (
            <article className="community-card" key={k}>
              <p className="section-kicker">{t(`community.build_together.${k}_title`)}</p>
              <h3>{t(`community.build_together.${k}_title`)}</h3>
              <p>{t(`community.build_together.${k}_body`)}</p>
              <a href={t(`community.build_together.${k}_link_href`)}>{t(`community.build_together.${k}_link`)}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="community-safety" aria-labelledby="safety-title">
        <div>
          <p className="section-kicker">{t("community.security.kicker")}</p>
          <h2 id="safety-title">{t("community.security.title")}</h2>
          <p>
            {t("community.security.body1")}{t("community.security.body2")}
            {t("community.security.body3")}
          </p>
          <a className="btn btn-outline" href={t("community.security.cta_href")}>
            {t("community.security.cta")} <ShieldIcon />
          </a>
        </div>
        <div className="community-boundary">
          <h3>{t("community.boundary.title")}</h3>
          <ul>
            <li>{t("community.boundary.li1")}</li>
            <li>{t("community.boundary.li2")}</li>
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
