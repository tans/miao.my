/**
 * Site-wide chrome (header, footer, language switch) as React components.
 * Replace the per-page duplicated navbar/footer from the static site.
 */

import { useEffect, type ReactNode } from "react";
import { useCopy } from "@/lib/i18n";
import { useLocale } from "@/lib/locale";

export function GithubIcon() {
  return (
    <svg
      className="icon-github"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export function ShieldIcon() {
  return (
    <svg
      className="icon-shield"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function BrandLink({ compact = false }: { compact?: boolean }) {
  const { locale } = useLocale();
  const { t } = useCopy(locale);
  return (
    <a className="brand" href="/" aria-label={t("site.brand_label")}>
      <img src="/assets/mascots/cat-logo-head.png" alt="" />
      <strong>miao.my</strong>
      {!compact && (
        <>
          <span className="brand-divider"></span>
          <span className="brand-caption">{t("site.tagline")}</span>
        </>
      )}
    </a>
  );
}

export function LanguageSwitch({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  const { t } = useCopy(locale);
  const other = locale === "zh" ? "en" : "zh";
  return (
    <button
      type="button"
      className={className}
      lang={other === "zh" ? "zh-CN" : "en"}
      onClick={() => setLocale(other)}
    >
      {t("site.switch")}
    </button>
  );
}

export type NavId =
  | "docs"
  | "guide"
  | "examples"
  | "get_started"
  | "agents"
  | "community"
  | "self_hosting"
  | "integrations"
  | "changelog"
  | "showcases";

const TOP_NAV: NavId[] = ["docs", "guide", "examples", "get_started"];
const MORE_NAV: NavId[] = [
  "agents",
  "community",
  "self_hosting",
  "integrations",
  "changelog",
  "showcases",
];

const NAV_HREF: Record<NavId, string> = {
  docs: "/docs/",
  guide: "/guide/",
  examples: "/examples.html",
  get_started: "/get-started/",
  agents: "/product/agents/",
  community: "/community/",
  self_hosting: "/self-hosting/",
  integrations: "/integrations/",
  changelog: "/changelog.html",
  showcases: "/showcases.html",
};

function NavLink({ id, active }: { id: NavId; active: NavId | null }) {
  const { locale } = useLocale();
  const { t } = useCopy(locale);
  const isActive = id === active;
  return (
    <a
      className={"nav-link" + (isActive ? " nav-link-active" : "")}
      href={NAV_HREF[id]}
      aria-current={isActive ? "page" : undefined}
    >
      {t(`site.${id}`)}
    </a>
  );
}

export function SiteHeader({ active }: { active: NavId | null }) {
  const { locale } = useLocale();
  const { t } = useCopy(locale);
  return (
    <header className="navbar site-nav">
      <div className="navbar-start">
        <BrandLink />
      </div>
      <nav className="navbar-end" aria-label={t("site.nav_label")}>
        {TOP_NAV.map((id) => (
          <NavLink key={id} id={id} active={active} />
        ))}
        <details className="nav-more">
          <summary className="nav-link">{t("site.more")}</summary>
          <div className="nav-menu">
            {MORE_NAV.map((id) => (
              <NavLink key={id} id={id} active={active} />
            ))}
          </div>
        </details>
        <LanguageSwitch className="nav-link" />
        <a className="btn btn-neutral btn-sm nav-github" href="https://github.com/tans/miao">
          GitHub <GithubIcon />
        </a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  const { locale } = useLocale();
  const { t } = useCopy(locale);
  const footerLinks: NavId[] = [
    "docs",
    "guide",
    "examples",
    "get_started",
    "community",
    "self_hosting",
  ];
  return (
    <footer className="site-footer">
      <BrandLink compact />
      <span>{t("site.tagline")}</span>
      <nav aria-label={t("site.footer_label")}>
        <a href="/">{t("site.footer_home")}</a>
        {footerLinks.map((id) => (
          <a key={id} href={NAV_HREF[id]}>
            {t(`site.${id}`)}
          </a>
        ))}
        <LanguageSwitch />
        <a href="https://github.com/tans/miao">
          GitHub <GithubIcon />
        </a>
      </nav>
    </footer>
  );
}

/**
 * Page shell: skip link + header + main + footer, with body class for
 * per-page theming (home-page / community-page / showcase-page …).
 */
export function SiteLayout({
  active,
  bodyClass = "",
  mainClass = "",
  mainId = "main-content",
  skipTarget = "main-content",
  children,
}: {
  active: NavId | null;
  bodyClass?: string;
  mainClass?: string;
  mainId?: string;
  skipTarget?: string;
  children: ReactNode;
}) {
  const { locale } = useLocale();
  const { t } = useCopy(locale);
  useEffect(() => {
    document.body.className = bodyClass;
  }, [bodyClass]);
  return (
    <>
      <a className="skip-link btn btn-ghost btn-sm" href={`#${skipTarget}`}>
        {t("site.skip")}
      </a>
      <SiteHeader active={active} />
      <main className={mainClass} id={mainId}>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}