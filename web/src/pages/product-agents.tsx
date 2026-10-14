import { SiteLayout } from "@/components/site/SiteLayout";
import { useCopy } from "@/lib/i18n";
import { useLocale, usePageMeta } from "@/lib/locale";

export default function ProductAgents() {
  const { locale } = useLocale();
  const { t } = useCopy(locale);
  usePageMeta("product.agents.title", ["product.agents.meta"]);

  return (
    <SiteLayout active="agents" mainClass="agent-main">
      <p className="section-kicker">{t("product.agents.kicker")}</p>
      <h1>{t("product.agents.h1_line1")}<br />{t("product.agents.h1_line2")}</h1>
      <p className="lede">{t("product.agents.lede1")}{t("product.agents.lede2")}{t("product.agents.lede3")}</p>
      <p>
        <span className="tag">{t("product.agents.tag_demo")}</span>
        {t("product.agents.tag_note")}
      </p>

      <h2>{t("product.agents.build.title")}</h2>
      <div className="cards">
        {[1, 2, 3].map((n) => (
          <article key={n} className="agent-card">
            <h3>{t(`product.agents.build.card${n}_title`)}</h3>
            <p>{t(`product.agents.build.card${n}_body`)}</p>
          </article>
        ))}
      </div>
      <p className="note">{t("product.agents.build.note")}</p>

      <h2>{t("product.agents.tasks.title")}</h2>
      <div className="cards">
        {[1, 2, 3].map((n) => (
          <article key={n} className="agent-card">
            <h3>{t(`product.agents.tasks.card${n}_title`)}</h3>
            <p>{t(`product.agents.tasks.card${n}_body`)}</p>
          </article>
        ))}
      </div>

      <h2>{t("product.agents.confirm.title")}</h2>
      <p>{t("product.agents.confirm.body1")}</p>
      <p>{t("product.agents.confirm.body2")}</p>

      <h2>{t("product.agents.boundary.title")}</h2>
      <div className="boundary">
        <p>{t("product.agents.boundary.body1")}</p>
        <p>{t("product.agents.boundary.body2")}</p>
      </div>

      <h2>{t("product.agents.how.title")}</h2>
      <p>{t("product.agents.how.summary")}</p>
      <details>
        <summary>{t("product.agents.flow.title")}</summary>
        <div className="flow" role="img" aria-label={t("product.agents.flow.aria")}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n}>
              <b>{t(`product.agents.flow.step${n}_name`)}</b>
              <span>{t(`product.agents.flow.step${n}_desc`)}</span>
            </div>
          ))}
        </div>

        <h3>{t("product.agents.receipt.title")}<span className="tag">{t("product.agents.receipt.tag")}</span></h3>
        <section className="run">
          <div>
            <p>{t("product.agents.receipt.run")}</p>
            <dl>
              <dt>{t("product.agents.receipt.did_label")}</dt><dd>{t("product.agents.receipt.did_value")}</dd>
              <dt>{t("product.agents.receipt.changed_label")}</dt><dd>{t("product.agents.receipt.changed_value")}</dd>
              <dt>{t("product.agents.receipt.result_label")}</dt><dd>{t("product.agents.receipt.result_value")}</dd>
            </dl>
            <p>{t("product.agents.receipt.note")}</p>
          </div>
        </section>
      </details>

      <h2>{t("product.agents.cta.title")}</h2>
      <div className="links">
        <a className="btn btn-neutral" href={t("product.agents.cta.primary_href")}>{t("product.agents.cta.primary")}</a>
        <a className="btn btn-ghost" href={t("product.agents.cta.secondary_href")}>{t("product.agents.cta.secondary")}</a>
      </div>

      <h2>{t("product.agents.read_next.title")}</h2>
      <div className="links">
        <a href={t("product.agents.read_next.arch_href")}>{t("product.agents.read_next.arch_link")}</a>
        <a href="https://github.com/tans/miao/blob/main/PRODUCT.md">{t("product.agents.read_next.product_link")}</a>
        <a href="https://github.com/tans/miao/blob/main/docs/OPERATIONS.md">{t("product.agents.read_next.ops_link")}</a>
        <a href="https://github.com/tans/miao/issues/26">{t("product.agents.read_next.issue_link")}</a>
        <a href={t("product.agents.read_next.alt_href")}>{t("product.agents.read_next.alt_link")}</a>
      </div>
    </SiteLayout>
  );
}
