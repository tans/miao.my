import { SiteLayout } from "@/components/site/SiteLayout";
import { useCopy } from "@/lib/i18n";
import { useLocale, usePageMeta } from "@/lib/locale";

export default function Integrations() {
  const { locale } = useLocale();
  const { t } = useCopy(locale);
  usePageMeta("integrations.title", ["integrations.meta"]);

  return (
    <SiteLayout active="integrations" bodyClass="home-page" mainClass="docs-main integration-main">
      <header className="docs-heading">
        <p className="docs-eyebrow">{t("integrations.eyebrow")}</p>
        <h1>{t("integrations.h1")}</h1>
        <p>{t("integrations.lede1")}{t("integrations.lede2")}</p>
        <p className="integration-warn">{t("integrations.lede3")}</p>
      </header>

      <section className="integration-group" aria-labelledby="two-paths">
        <div className="integration-group-heading">
          <div>
            <p className="docs-eyebrow">AVAILABLE NOW</p>
            <h2 id="two-paths">{t("integrations.two_paths.title")}</h2>
          </div>
        </div>
        <div className="integration-path-grid">
          <article className="integration-card">
            <header>
              <h3>{t("integrations.read.title")}</h3>
              <span className="integration-state state-available">{t("integrations.read.kicker")}</span>
            </header>
            <p className="integration-card-body">{t("integrations.read.body")}</p>
            <ul className="integration-list">
              <li>{t("integrations.read.li1")}</li>
              <li>{t("integrations.read.li2")}</li>
              <li>{t("integrations.read.li3")}</li>
            </ul>
            <footer><a href={t("integrations.read.link_href")}>{t("integrations.read.link")}</a></footer>
          </article>
          <article className="integration-card">
            <header>
              <h3>{t("integrations.collect.title")}</h3>
              <span className="integration-state state-available">{t("integrations.collect.kicker")}</span>
            </header>
            <p className="integration-card-body">{t("integrations.collect.body")}</p>
            <ul className="integration-list">
              <li>{t("integrations.collect.li1")}</li>
              <li>{t("integrations.collect.li2")}</li>
              <li>{t("integrations.collect.li3")}</li>
            </ul>
            <footer><a href={t("integrations.collect.link_href")}>{t("integrations.collect.link")}</a></footer>
          </article>
        </div>
      </section>

      <section className="integration-group" aria-labelledby="data-flow">
        <div className="integration-group-heading">
          <div>
            <p className="docs-eyebrow">DATA FLOW</p>
            <h2 id="data-flow">{t("integrations.flow.title")}</h2>
          </div>
        </div>
        <p className="integration-flow-intro">{t("integrations.flow.intro")}</p>
        <ol className="integration-flow">
          {[1, 2, 3, 4].map((n) => (
            <li key={n}>{t(`integrations.flow.step${n}`)}</li>
          ))}
        </ol>
        <p className="integration-flow-note">{t("integrations.flow.note")}</p>
      </section>

      <section className="integration-group" aria-labelledby="not-supported">
        <div className="integration-group-heading">
          <div>
            <p className="docs-eyebrow">NOT SUPPORTED YET</p>
            <h2 id="not-supported">{t("integrations.not_supported.title")}</h2>
          </div>
        </div>
        <ul className="integration-not-supported">
          {[1, 2, 3, 4].map((n) => (
            <li key={n}>{t(`integrations.not_supported.li${n}`)}</li>
          ))}
        </ul>
        <p className="integration-flow-note">{t("integrations.not_supported.note")}</p>
      </section>

      <section className="integration-group" aria-labelledby="security-faq">
        <div className="integration-group-heading">
          <div>
            <p className="docs-eyebrow">PERMISSIONS &amp; SECURITY</p>
            <h2 id="security-faq">{t("integrations.security.title")}</h2>
          </div>
        </div>
        <div className="integration-faq">
          {[1, 2, 3].map((n) => (
            <div key={n}>
              <h3>{t(`integrations.security.qa${n}_q`)}</h3>
              <p>{t(`integrations.security.qa${n}_a`)}</p>
            </div>
          ))}
        </div>
        <p className="integration-flow-note">{t("integrations.security.note")}</p>
      </section>

      <section className="integration-safety">
        <h2>{t("integrations.next.title")}</h2>
        <p>{t("integrations.next.body")}</p>
        <div className="intro-actions">
          <a className="btn btn-neutral" href={t("integrations.next.examples_href")}>{t("integrations.next.examples")}</a>
          <a className="btn btn-ghost" href={t("integrations.next.get_started_href")}>{t("integrations.next.get_started")}</a>
        </div>
      </section>
    </SiteLayout>
  );
}
