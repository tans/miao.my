import { SiteLayout } from "@/components/site/SiteLayout";
import { useCopy } from "@/lib/i18n";
import { useLocale, usePageMeta } from "@/lib/locale";

type IntegrationCard = {
  key: string;
  title: string;
  tag: string;
  flow: React.ReactNode;
  auth: React.ReactNode;
  access: React.ReactNode;
  limits: React.ReactNode;
  audit: React.ReactNode;
  links: { href: string; label: string }[];
};

function Card({ card }: { card: IntegrationCard }) {
  return (
    <article className="integration-card">
      <header>
        <h3>{card.title}</h3>
        <span>{card.tag}</span>
      </header>
      <dl>
        <div><dt>{/* row_flow */}</dt><dd>{card.flow}</dd></div>
        <div><dt>{/* row_auth */}</dt><dd>{card.auth}</dd></div>
        <div><dt>{/* row_access */}</dt><dd>{card.access}</dd></div>
        <div><dt>{/* row_limits */}</dt><dd>{card.limits}</dd></div>
        <div><dt>{/* row_audit */}</dt><dd>{card.audit}</dd></div>
      </dl>
      <footer>
        {card.links.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </footer>
    </article>
  );
}

export default function Integrations() {
  const { locale } = useLocale();
  const { t } = useCopy(locale);
  usePageMeta("integrations.title", ["integrations.meta"]);

  const cards: IntegrationCard[] = [
    {
      key: "http",
      title: t("integrations.available.http_title"),
      tag: t("integrations.available.http_tag"),
      flow: t("integrations.available.http_flow"),
      auth: t("integrations.available.http_auth"),
      access: t("integrations.available.http_access"),
      limits: t("integrations.available.http_limits"),
      audit: t("integrations.available.http_audit1") + t("integrations.available.http_audit2"),
      links: [
        { href: "https://github.com/tans/miao/blob/main/internal/httpapi/external_fetch.go", label: t("integrations.available.http_link_source") },
        { href: "https://github.com/tans/miao/blob/main/internal/httpapi/collection_scripts.go", label: t("integrations.available.http_link_limits") },
        { href: "https://github.com/tans/miao/blob/main/docs/OPERATIONS.md", label: t("integrations.available.http_link_ops") },
      ],
    },
    {
      key: "collection",
      title: t("integrations.available.collection_title"),
      tag: t("integrations.available.collection_tag"),
      flow: t("integrations.available.collection_flow"),
      auth: t("integrations.available.collection_auth"),
      access: t("integrations.available.collection_access"),
      limits: t("integrations.available.collection_limits"),
      audit: t("integrations.available.collection_audit"),
      links: [
        { href: "https://github.com/tans/miao/blob/main/internal/httpapi/collection_scripts.go", label: t("integrations.available.collection_link_source") },
        { href: "https://github.com/tans/miao/blob/main/docs/OPERATIONS.md", label: t("integrations.available.collection_link_ops") },
        { href: "https://github.com/tans/miao/issues", label: t("integrations.available.collection_link_issues") },
      ],
    },
    {
      key: "pocketbase",
      title: t("integrations.available.pocketbase_title"),
      tag: t("integrations.available.pocketbase_tag"),
      flow: t("integrations.available.pocketbase_flow"),
      auth: t("integrations.available.pocketbase_auth"),
      access: t("integrations.available.pocketbase_access"),
      limits: t("integrations.available.pocketbase_limits"),
      audit: t("integrations.available.pocketbase_audit"),
      links: [
        { href: "https://github.com/tans/miao/blob/main/internal/pocketbase/events.go", label: t("integrations.available.pocketbase_link_source") },
        { href: "https://github.com/tans/miao/blob/main/docs/OPERATIONS.md", label: t("integrations.available.pocketbase_link_ops") },
      ],
    },
    {
      key: "workflows",
      title: t("integrations.controlled.workflows_title"),
      tag: t("integrations.controlled.workflows_tag"),
      flow: t("integrations.controlled.workflows_flow"),
      auth: t("integrations.controlled.workflows_auth"),
      access: t("integrations.controlled.workflows_access"),
      limits: t("integrations.controlled.workflows_limits"),
      audit: t("integrations.controlled.workflows_audit"),
      links: [
        { href: "https://github.com/tans/miao/blob/main/internal/httpapi/backend_plans.go", label: t("integrations.controlled.workflows_link_source") },
        { href: "https://github.com/tans/miao/blob/main/docs/OPERATIONS.md", label: t("integrations.controlled.workflows_link_ops") },
        { href: "https://github.com/tans/miao/issues", label: t("integrations.controlled.workflows_link_issues") },
      ],
    },
    {
      key: "public",
      title: t("integrations.controlled.public_title"),
      tag: t("integrations.controlled.public_tag"),
      flow: t("integrations.controlled.public_flow"),
      auth: t("integrations.controlled.public_auth"),
      access: t("integrations.controlled.public_access"),
      limits: t("integrations.controlled.public_limits"),
      audit: t("integrations.controlled.public_audit"),
      links: [
        { href: "https://github.com/tans/miao/blob/main/internal/httpapi/publications.go", label: t("integrations.controlled.public_link_source") },
        { href: "https://github.com/tans/miao/blob/main/docs/OPERATIONS.md", label: t("integrations.controlled.public_link_ops") },
      ],
    },
    {
      key: "connectors",
      title: t("integrations.planned.connectors_title"),
      tag: t("integrations.planned.connectors_tag"),
      flow: t("integrations.planned.connectors_flow"),
      auth: t("integrations.planned.connectors_auth"),
      access: t("integrations.planned.connectors_access"),
      limits: t("integrations.planned.connectors_limits"),
      audit: t("integrations.planned.connectors_audit"),
      links: [
        { href: "https://github.com/tans/miao/issues/117", label: t("integrations.planned.connectors_link_issue") },
        { href: "https://github.com/tans/miao", label: t("integrations.planned.connectors_link_repo") },
      ],
    },
  ];

  return (
    <SiteLayout active="integrations" bodyClass="home-page" mainClass="docs-main integration-main">
      <header className="docs-heading">
        <p className="docs-eyebrow">{t("integrations.eyebrow")}</p>
        <h1>{t("integrations.h1")}</h1>
        <p>{t("integrations.lede1")}{t("integrations.lede2")}{t("integrations.lede3")}</p>
      </header>

      <section className="integration-group" aria-labelledby="available">
        <div className="integration-group-heading">
          <div>
            <p className="docs-eyebrow">{t("integrations.available.eyebrow")}</p>
            <h2 id="available">{t("integrations.available.title")}</h2>
          </div>
          <span className="integration-state state-available">{t("integrations.available.state")}</span>
        </div>
        {cards.slice(0, 3).map((card) => (
          <Card key={card.key} card={card} />
        ))}
      </section>

      <section className="integration-group controlled-group" aria-labelledby="controlled">
        <div className="integration-group-heading">
          <div>
            <p className="docs-eyebrow">{t("integrations.controlled.eyebrow")}</p>
            <h2 id="controlled">{t("integrations.controlled.title")}</h2>
          </div>
          <span className="integration-state state-controlled">{t("integrations.controlled.state")}</span>
        </div>
        {cards.slice(3, 5).map((card) => (
          <Card key={card.key} card={card} />
        ))}
      </section>

      <section className="integration-group planned-group" aria-labelledby="planned">
        <div className="integration-group-heading">
          <div>
            <p className="docs-eyebrow">{t("integrations.planned.eyebrow")}</p>
            <h2 id="planned">{t("integrations.planned.title")}</h2>
          </div>
          <span className="integration-state state-planned">{t("integrations.planned.state")}</span>
        </div>
        <article className="integration-card planned-card">
          {cards.slice(5, 6).map((card) => (
            <Card key={card.key} card={card} />
          ))}
        </article>
      </section>

      <aside className="integration-safety">
        <h2>{t("integrations.safety.title")}</h2>
        <ul>
          <li>{t("integrations.safety.li1")}</li>
          <li>
            {t("integrations.safety.li2_lead")}
            <a href="https://github.com/tans/miao/issues/93">{t("integrations.safety.li2_link")}</a>
            {t("integrations.safety.li2_tail")}
          </li>
          <li>{t("integrations.safety.li3")}</li>
          <li>{t("integrations.safety.li4")}</li>
        </ul>
      </aside>
    </SiteLayout>
  );
}