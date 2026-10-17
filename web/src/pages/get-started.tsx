import { SiteLayout } from "@/components/site/SiteLayout";
import { useCopy } from "@/lib/i18n";
import { useLocale, usePageMeta } from "@/lib/locale";
import { mountPage } from "./mount";

export default function GetStarted() {
  const { locale } = useLocale();
  const { t, h } = useCopy(locale);
  usePageMeta("get-started.title", ["get-started.meta1", "get-started.meta2"]);

  return (
    <SiteLayout active="get_started" mainClass="start-main">
      <p className="section-kicker">{t("get-started.kicker")}</p>
      <h1>{t("get-started.h1")}</h1>
      <p className="start-lede">
        {t("get-started.lede1")}{t("get-started.lede2")}{t("get-started.lede3")}
      </p>
      <div className="start-notice">
        <strong>{t("get-started.notice_title")}</strong>
        <span>{t("get-started.notice1")}{t("get-started.notice2")}{t("get-started.notice3")}</span>
      </div>

      <section className="start-grid" aria-label={t("get-started.grid_label")}>
        <article className="start-card">
          <p className="section-kicker">{t("get-started.watch.kicker")}</p>
          <h2>{t("get-started.watch.title")}</h2>
          <p>{t("get-started.watch.body1")}{t("get-started.watch.body2")}{t("get-started.watch.body3")}</p>
          <div className="start-actions">
            <a className="btn btn-neutral" href="/examples.html">{t("get-started.watch.cta")}</a>
          </div>
          <span className="status ready">{t("get-started.watch.status")}</span>
        </article>

        <article className="start-card start-card-featured">
          <p className="section-kicker">{t("get-started.deploy.kicker")}</p>
          <h2>{t("get-started.deploy.title")}</h2>
          <p>{t("get-started.deploy.body1")}{t("get-started.deploy.body2")}{t("get-started.deploy.body3")}</p>
          <div className="start-actions">
            <a className="btn btn-neutral" href="/self-hosting/">{t("get-started.deploy.cta")}</a>
            <a href="https://github.com/tans/miao/releases">{t("get-started.deploy.link1")}</a>
            {" · "}
            <a href="/self-hosting/costs/">{t("get-started.deploy.link2")}</a>
          </div>
          <span className="status verify">{t("get-started.deploy.status")}</span>
        </article>
      </section>

      <section className="start-steps" aria-labelledby="steps-title">
        <p className="section-kicker">{t("get-started.steps.kicker")}</p>
        <h2 id="steps-title">{t("get-started.steps.title")}</h2>
        <ol className="start-steps-list">
          {[1, 2, 3].map((n) => (
            <li key={n}>
              <strong>{t(`get-started.steps.step${n}_title`)}</strong>
              <span>{t(`get-started.steps.step${n}_body`)}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="start-next" aria-labelledby="next-title">
        <p className="section-kicker">{t("get-started.next.kicker")}</p>
        <h2 id="next-title">{t("get-started.next.title")}</h2>
        <div className="start-next-grid">
          <a href="/docs/">
            <strong>{t("get-started.next.ops_title")}</strong>
            <span>{t("get-started.next.ops_desc")}</span>
          </a>
          <a href={h("/changelog.html")}>
            <strong>{t("site.changelog")}</strong>
            <span>{t("get-started.next.changelog_desc")}</span>
          </a>
          <a href="/community/">
            <strong>{t("get-started.next.community_title")}</strong>
            <span>{t("get-started.next.community_desc")}</span>
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}

mountPage(GetStarted);
