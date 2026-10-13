import { SiteLayout } from "@/components/site/SiteLayout";
import { useCopy } from "@/lib/i18n";
import { useLocale, usePageMeta } from "@/lib/locale";

export default function GetStarted() {
  const { locale } = useLocale();
  const { t, h } = useCopy(locale);
  usePageMeta("get-started.title", ["get-started.meta1", "get-started.meta2"]);

  return (
    <SiteLayout active="get_started" mainClass="start-main">
      <p className="section-kicker">{t("get-started.kicker")}</p>
      <h1>{t("get-started.h1")}</h1>
      <p className="start-lede">
        {t("get-started.lede1")}{t("get-started.lede2")}{t("get-started.lede3")}{t("get-started.lede4")}{t("get-started.lede5")}
      </p>
      <div className="start-notice">
        <strong>{t("get-started.notice_title")}</strong>
        <span>{t("get-started.notice1")}{t("get-started.notice2")}{t("get-started.notice3")}</span>
      </div>

      <section className="start-grid" aria-label={t("get-started.grid_label")}>
        <article className="start-card">
          <p className="section-kicker">{t("get-started.local.kicker")}</p>
          <h2>{t("get-started.local.title")}</h2>
          <p>{t("get-started.local.body1")}{t("get-started.local.body2")}{t("get-started.local.body3")}</p>
          <dl className="start-meta">
            <div>
              <dt>{t("get-started.dt_prereq")}</dt>
              <dd>{t("get-started.local.dd_prereq1")}{t("get-started.local.dd_prereq2")}</dd>
            </div>
            <div>
              <dt>{t("get-started.dt_product")}</dt>
              <dd>{t("get-started.local.dd_product")}</dd>
            </div>
            <div>
              <dt>{t("get-started.local.dt_updates")}</dt>
              <dd>{t("get-started.local.dd_updates1")}{t("get-started.local.dd_updates2")}</dd>
            </div>
          </dl>
          <div className="start-actions">
            <a className="btn btn-neutral" href="https://github.com/tans/miao#self-hosting">{t("get-started.local.cta")}</a>
            <a href="/docs/">{t("get-started.local.link")}</a>
          </div>
          <span className="status ready">{t("get-started.local.status")}</span>
        </article>

        <article className="start-card start-card-featured">
          <p className="section-kicker">{t("get-started.production.kicker")}</p>
          <h2>{t("get-started.production.title")}</h2>
          <p>{t("get-started.production.body1")}{t("get-started.production.body2")}{t("get-started.production.body3")}</p>
          <dl className="start-meta">
            <div>
              <dt>{t("get-started.dt_prereq")}</dt>
              <dd>{t("get-started.production.dd_prereq")}</dd>
            </div>
            <div>
              <dt>{t("get-started.dt_product")}</dt>
              <dd>{t("get-started.production.dd_product")}</dd>
            </div>
            <div>
              <dt>{t("get-started.production.dt_rollback")}</dt>
              <dd>{t("get-started.production.dd_rollback1")}{t("get-started.production.dd_rollback2")}</dd>
            </div>
          </dl>
          <div className="start-actions">
            <a className="btn btn-neutral" href="https://github.com/tans/miao/releases">{t("get-started.production.cta")}</a>
            <a href="/self-hosting/">{t("get-started.production.link1")}</a>
            {" · "}
            <a href="/self-hosting/costs/">{t("get-started.production.link2")}</a>
          </div>
          <span className="status verify">{t("get-started.production.status")}</span>
        </article>

        <article className="start-card">
          <p className="section-kicker">{t("get-started.contribute.kicker")}</p>
          <h2>{t("get-started.contribute.title")}</h2>
          <p>{t("get-started.contribute.body1")}{t("get-started.contribute.body2")}{t("get-started.contribute.body3")}</p>
          <dl className="start-meta">
            <div>
              <dt>{t("get-started.dt_prereq")}</dt>
              <dd>{t("get-started.contribute.dd_prereq")}</dd>
            </div>
            <div>
              <dt>{t("get-started.dt_product")}</dt>
              <dd>{t("get-started.contribute.dd_product")}</dd>
            </div>
            <div>
              <dt>{t("get-started.contribute.dt_boundary")}</dt>
              <dd>{t("get-started.contribute.dd_boundary1")}{t("get-started.contribute.dd_boundary2")}</dd>
            </div>
          </dl>
          <div className="start-actions">
            <a className="btn btn-neutral" href="https://github.com/tans/miao/issues">{t("get-started.contribute.cta")}</a>
            <a href="https://github.com/tans/miao/blob/main/AGENTS.md">{t("get-started.contribute.link")}</a>
          </div>
          <span className="status ready">{t("get-started.contribute.status")}</span>
        </article>
      </section>

      <section className="start-next" aria-labelledby="next-title">
        <p className="section-kicker">{t("get-started.next.kicker")}</p>
        <h2 id="next-title">{t("get-started.next.title")}</h2>
        <div className="start-next-grid">
          <a href="https://github.com/tans/miao/blob/main/docs/OPERATIONS.md">
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