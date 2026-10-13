import { SiteLayout } from "@/components/site/SiteLayout";
import { useCopy } from "@/lib/i18n";
import { useLocale, usePageMeta } from "@/lib/locale";

export default function ProductAgents() {
  const { locale } = useLocale();
  const { t, h } = useCopy(locale);
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

      <h2>{t("product.agents.flow.title")}</h2>
      <div className="flow" role="img" aria-label={t("product.agents.flow.aria")}>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n}>
            <b>{t(`product.agents.flow.step${n}_name`)}</b>
            <span>{t(`product.agents.flow.step${n}_desc`)}</span>
          </div>
        ))}
      </div>

      <h2>{t("product.agents.scenarios.title")}</h2>
      <div className="cards">
        {(["requests", "records", "collection"] as const).map((s) => (
          <article key={s} className="agent-card">
            <h3>{t(`product.agents.scenarios.${s}_title`)}</h3>
            <p>{t(`product.agents.scenarios.${s}_body`)}</p>
            <ul>
              <li>{t(`product.agents.scenarios.${s}_li1`)}</li>
              <li>{t(`product.agents.scenarios.${s}_li2`)}</li>
              <li>{t(`product.agents.scenarios.${s}_li3`)}</li>
            </ul>
          </article>
        ))}
      </div>

      <h2>{t("product.agents.capabilities.title")}</h2>
      <div className="cards">
        <article className="agent-card">
          <h3>{t("product.agents.capabilities.read_label")}</h3>
          <p>{t("product.agents.capabilities.read_body")}</p>
          <p>
            <a href="https://github.com/tans/miao/blob/main/PRODUCT.md">{t("product.agents.capabilities.read_product_link")}</a>
            {t("product.agents.capabilities.read_sep")}
            <a href="https://github.com/tans/miao">{t("product.agents.capabilities.read_source_link")}</a>
          </p>
        </article>
        <article className="agent-card">
          <h3>{t("product.agents.capabilities.execute_label")}</h3>
          <p>{t("product.agents.capabilities.execute_body")}</p>
          <p>{t("product.agents.capabilities.execute_note")}</p>
        </article>
        <article className="agent-card">
          <h3>{t("product.agents.capabilities.cannot_label")}</h3>
          <p>{t("product.agents.capabilities.cannot_body")}</p>
          <p><a href="https://github.com/tans/miao/blob/main/docs/OPERATIONS.md">{t("product.agents.capabilities.cannot_link")}</a></p>
        </article>
      </div>

      <h2>{t("product.agents.confirmation.title")}</h2>
      <p>{t("product.agents.confirmation.body1")}{t("product.agents.confirmation.body2")}{t("product.agents.confirmation.body3")}</p>

      <h2>{t("product.agents.receipt.title")}<span className="tag">{t("product.agents.receipt.tag")}</span></h2>
      <section className="run">
        <div>
          <p>{t("product.agents.receipt.run")}</p>
          <dl>
            <dt>{t("product.agents.receipt.model_label")}</dt><dd>{t("product.agents.receipt.model_value")}</dd>
            <dt>{t("product.agents.receipt.plan_label")}</dt><dd>{t("product.agents.receipt.plan_value")}</dd>
            <dt>{t("product.agents.receipt.scope_label")}</dt><dd>{t("product.agents.receipt.scope_value")}</dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt>{t("product.agents.receipt.events_label")}</dt><dd>{t("product.agents.receipt.events_value")}</dd>
            <dt>{t("product.agents.receipt.final_label")}</dt><dd>{t("product.agents.receipt.final_value")}</dd>
            <dt>{t("product.agents.receipt.budget_label")}</dt><dd>{t("product.agents.receipt.budget_value")}</dd>
          </dl>
          <p>{t("product.agents.receipt.note")}</p>
        </div>
      </section>

      <h2>{t("product.agents.offline.title")}</h2>
      <div className="boundary">
        <p><strong>{t("product.agents.offline.available_label")}</strong>{t("product.agents.offline.available_body")}</p>
        <p><strong>{t("product.agents.offline.waits_label")}</strong>{t("product.agents.offline.waits_body")}</p>
        <p><strong>{t("product.agents.offline.not_promised_label")}</strong>{t("product.agents.offline.not_promised_body")}</p>
      </div>

      <h2>{t("product.agents.read_next.title")}</h2>
      <div className="links">
        <a href={h("product.agents.read_next.arch_href")}>{t("product.agents.read_next.arch_link")}</a>
        <a href="https://github.com/tans/miao/blob/main/PRODUCT.md">{t("product.agents.read_next.product_link")}</a>
        <a href="https://github.com/tans/miao/blob/main/docs/OPERATIONS.md">{t("product.agents.read_next.ops_link")}</a>
        <a href="https://github.com/tans/miao/issues/26">{t("product.agents.read_next.issue_link")}</a>
        <a href={h("product.agents.read_next.alt_href")}>{t("product.agents.read_next.alt_link")}</a>
      </div>
    </SiteLayout>
  );
}