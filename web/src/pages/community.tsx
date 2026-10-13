import { SiteLayout, GithubIcon, ShieldIcon } from "@/components/site/SiteLayout";
import { useCopy } from "@/lib/i18n";
import { useLocale, usePageMeta } from "@/lib/locale";

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
          <a className="btn btn-neutral" href="https://github.com/tans/miao/issues">
            {t("community.cta_issues")} <GithubIcon />
          </a>
          <a className="btn btn-outline" href="/docs/">{t("community.cta_docs")}</a>
        </div>
      </section>

      <section className="community-grid" aria-labelledby="routes-title">
        <h2 id="routes-title">{t("community.routes_title")}</h2>
        <div className="community-cards">
          <article className="community-card">
            <p className="section-kicker">{t("community.bug.kicker")}</p>
            <h3>{t("community.bug.title")}</h3>
            <p>{t("community.bug.body")}</p>
            <a href="https://github.com/tans/miao/issues/new/choose">{t("community.bug.link")}</a>
          </article>
          <article className="community-card">
            <p className="section-kicker">{t("community.idea.kicker")}</p>
            <h3>{t("community.idea.title")}</h3>
            <p>{t("community.idea.body1")}{t("community.idea.body2")}</p>
            <a href="https://github.com/tans/miao/discussions">{t("community.idea.link")}</a>
          </article>
          <article className="community-card">
            <p className="section-kicker">{t("community.self_hosting.kicker")}</p>
            <h3>{t("community.self_hosting.title")}</h3>
            <p>{t("community.self_hosting.body1")}{t("community.self_hosting.body2")}</p>
            <a href="/self-hosting/">{t("community.self_hosting.link")}</a>
          </article>
          <article className="community-card">
            <p className="section-kicker">{t("community.releases.kicker")}</p>
            <h3>{t("community.releases.title")}</h3>
            <p>{t("community.releases.body1")}{t("community.releases.body2")}</p>
            <a href="https://github.com/tans/miao/releases">{t("community.releases.link")}</a>
          </article>
        </div>
      </section>

      <section className="community-safety" aria-labelledby="safety-title">
        <div>
          <p className="section-kicker">{t("community.security.kicker")}</p>
          <h2 id="safety-title">{t("community.security.title")}</h2>
          <p>
            {t("community.security.body1")}{t("community.security.body2")}
            {t("community.security.body3")}{t("community.security.body4")}
          </p>
          <a className="btn btn-outline" href="https://github.com/tans/miao/security/advisories/new">
            {t("community.security.cta")} <ShieldIcon />
          </a>
        </div>
        <div className="community-boundary">
          <h3>{t("community.boundary.title")}</h3>
          <ul>
            <li>{t("community.boundary.li1")}</li>
            <li>{t("community.boundary.li2")}</li>
            <li>{t("community.boundary.li3")}</li>
            <li>{t("community.boundary.li4")}</li>
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}