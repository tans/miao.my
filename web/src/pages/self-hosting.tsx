import { SiteLayout } from "@/components/site/SiteLayout";
import { useCopy } from "@/lib/i18n";
import { useLocale, usePageMeta } from "@/lib/locale";

export default function SelfHosting() {
  const { locale } = useLocale();
  const { t, h } = useCopy(locale);
  usePageMeta("self-hosting.title", ["self-hosting.meta"]);

  return (
    <SiteLayout active="self_hosting" mainClass="hosting-main max-w-[960px] mx-auto px-6 pt-20 pb-28 [&_a]:text-inherit">
      <p className="section-kicker">{t("self-hosting.kicker")}</p>
      <h1 className="text-[clamp(2.5rem,6vw,5rem)] my-2 mb-4">{t("self-hosting.h1")}</h1>
      <p className="lede text-[1.2rem] max-w-[700px]">
        {t("self-hosting.lede1")}{t("self-hosting.lede2")}{t("self-hosting.lede3")}{t("self-hosting.lede4")}
      </p>
      <p className="note p-4 pl-5 border-l-4 border-[#c99b52] bg-[#f8f1e5]">
        {t("self-hosting.note_lead")}
        <a href="/self-hosting/costs/">{t("self-hosting.note_link")}</a>
        {t("self-hosting.note_tail1")}{t("self-hosting.note_tail2")}
      </p>
      <p>
        <span className="badge badge-success">{t("self-hosting.badge_implemented")}</span>
        <span className="badge badge-warning">{t("self-hosting.badge_verify")}</span>
        <span className="badge badge-error">{t("self-hosting.badge_not_provided")}</span>
      </p>

      <h2 className="mt-14">{t("self-hosting.architecture.title")}</h2>
      <div className="architecture my-8 p-4 border border-[#d8d7ce] rounded-2xl bg-[#fbfaf4] overflow-auto">
        <svg className="block min-w-[720px] w-full h-auto" viewBox="0 0 900 330" role="img" aria-labelledby="arch-title arch-desc">
          <title id="arch-title">{t("self-hosting.architecture.svg_title")}</title>
          <desc id="arch-desc">{t("self-hosting.architecture.desc1")}{t("self-hosting.architecture.desc2")}{t("self-hosting.architecture.desc3")}</desc>
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8z" fill="#566b5d" />
            </marker>
          </defs>
          <g fontFamily="system-ui,sans-serif" fontSize="16" fill="#26332b" stroke="#566b5d" strokeWidth="2">
            <rect x="20" y="125" width="145" height="70" rx="12" fill="#e6f0e6" />
            <text x="92" y="155" textAnchor="middle" stroke="none">{t("self-hosting.architecture.node_browser")}</text>
            <text x="92" y="178" textAnchor="middle" stroke="none">{t("self-hosting.architecture.node_browser_sub")}</text>
            <rect x="210" y="75" width="390" height="170" rx="16" fill="#eef3ed" />
            <text x="405" y="103" textAnchor="middle" stroke="none" fontWeight="bold">{t("self-hosting.architecture.node_process")}</text>
            <rect x="235" y="120" width="155" height="45" rx="8" fill="#fffdf7" />
            <text x="312" y="148" textAnchor="middle" stroke="none">{t("self-hosting.architecture.node_api")}</text>
            <rect x="420" y="120" width="155" height="45" rx="8" fill="#fffdf7" />
            <text x="497" y="148" textAnchor="middle" stroke="none">{t("self-hosting.architecture.node_agent")}</text>
            <rect x="235" y="180" width="155" height="40" rx="8" fill="#fffdf7" />
            <text x="312" y="205" textAnchor="middle" stroke="none">{t("self-hosting.architecture.node_ui")}</text>
            <rect x="420" y="180" width="155" height="40" rx="8" fill="#fffdf7" />
            <text x="497" y="205" textAnchor="middle" stroke="none">{t("self-hosting.architecture.node_db")}</text>
            <rect x="650" y="30" width="210" height="65" rx="12" fill="#f7ead4" />
            <text x="755" y="58" textAnchor="middle" stroke="none">{t("self-hosting.architecture.node_gateway")}</text>
            <text x="755" y="80" textAnchor="middle" stroke="none">{t("self-hosting.architecture.node_gateway_sub")}</text>
            <rect x="650" y="130" width="210" height="65" rx="12" fill="#f7ead4" />
            <text x="755" y="158" textAnchor="middle" stroke="none">{t("self-hosting.architecture.node_jev")}</text>
            <text x="755" y="180" textAnchor="middle" stroke="none">{t("self-hosting.architecture.node_jev_sub")}</text>
            <rect x="650" y="230" width="210" height="65" rx="12" fill="#e8e1d8" />
            <text x="755" y="258" textAnchor="middle" stroke="none">{t("self-hosting.architecture.node_data")}</text>
            <text x="755" y="280" textAnchor="middle" stroke="none">{t("self-hosting.architecture.node_data_sub")}</text>
            <path d="M165 160H210" markerEnd="url(#arrow)" fill="none" />
            <path d="M600 120L650 70" markerEnd="url(#arrow)" fill="none" />
            <path d="M600 160H650" markerEnd="url(#arrow)" fill="none" />
            <path d="M600 210L650 255" markerEnd="url(#arrow)" fill="none" />
          </g>
        </svg>
      </div>
      <p className="note p-4 pl-5 border-l-4 border-[#c99b52] bg-[#f8f1e5]">
        {t("self-hosting.architecture.note1")}{t("self-hosting.architecture.note2")}
      </p>

      <h2 className="mt-14">{t("self-hosting.install.title")}</h2>
      <ol className="steps pl-5 list-decimal">
        <li className="my-4">
          {t("self-hosting.install.step1_lead")}
          <code>{t("self-hosting.install.code_curl")}</code>
          {t("self-hosting.install.step1_and")}
          <code>{t("self-hosting.install.code_openssl")}</code>
          {t("self-hosting.install.step1_mid")}
          <a href="https://github.com/tans/miao/releases">{t("self-hosting.install.step1_releases")}</a>
          {t("self-hosting.install.step1_tail")}
        </li>
        <li className="my-4">{t("self-hosting.install.step2a")}{t("self-hosting.install.step2b")}</li>
        <li className="my-4">{t("self-hosting.install.step3a")}{t("self-hosting.install.step3b")}</li>
      </ol>

      <h2 className="mt-14">{t("self-hosting.permissions.title")}</h2>
      <div className="boundary grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
        <article className="p-4 border border-[#d8d7ce] rounded-xl">
          <h3 className="mt-0">{t("self-hosting.permissions.row1_label")}</h3>
          <p>{t("self-hosting.permissions.row1_body1")}{t("self-hosting.permissions.row1_body2")}</p>
          <span className="badge badge-success">{t("self-hosting.badge_implemented")}</span>
        </article>
        <article className="p-4 border border-[#d8d7ce] rounded-xl">
          <h3 className="mt-0">{t("self-hosting.permissions.row2_label")}</h3>
          <p>{t("self-hosting.permissions.row2_body1")}{t("self-hosting.permissions.row2_body2")}</p>
          <span className="badge badge-warning">{t("self-hosting.badge_verify")}</span>
        </article>
        <article className="p-4 border border-[#d8d7ce] rounded-xl">
          <h3 className="mt-0">{t("self-hosting.permissions.row3_label")}</h3>
          <p>{t("self-hosting.permissions.row3_body1")}{t("self-hosting.permissions.row3_body2")}</p>
          <span className="badge badge-success">{t("self-hosting.badge_implemented")}</span>
        </article>
      </div>

      <h2 className="mt-14">{t("self-hosting.operations.title")}</h2>
      <div className="links flex flex-wrap gap-4">
        <a className="font-semibold" href="https://github.com/tans/miao/blob/main/docs/OPERATIONS.md">{t("self-hosting.operations.install")}</a>
        <a className="font-semibold" href={h("self-hosting.operations.backup_href")}>{t("self-hosting.operations.backup")}</a>
        <a className="font-semibold" href={h("self-hosting.operations.upgrade_href")}>{t("self-hosting.operations.upgrade")}</a>
        <a className="font-semibold" href={h("self-hosting.operations.gateway_href")}>{t("self-hosting.operations.gateway")}</a>
      </div>
      <p className="note p-4 pl-5 border-l-4 border-[#c99b52] bg-[#f8f1e5]">
        {t("self-hosting.operations.note1")}{t("self-hosting.operations.note2")}
      </p>
    </SiteLayout>
  );
}