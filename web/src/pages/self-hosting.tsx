import { SiteLayout } from "@/components/site/SiteLayout";
import { useCopy } from "@/lib/i18n";
import { useLocale, usePageMeta } from "@/lib/locale";
import { mountPage } from "./mount";

export default function SelfHosting() {
  const { locale } = useLocale();
  const { t } = useCopy(locale);
  usePageMeta("self-hosting.title", ["self-hosting.meta"]);

  return (
    <SiteLayout active="self_hosting" mainClass="hosting-main max-w-[960px] mx-auto px-6 pt-20 pb-28 [&_a]:text-inherit">
      <p className="section-kicker">{t("self-hosting.kicker")}</p>
      <h1 className="text-[clamp(2.5rem,6vw,5rem)] my-2 mb-4">{t("self-hosting.h1")}</h1>
      <p className="lede text-[1.2rem] max-w-[700px]">
        {t("self-hosting.lede1")}{t("self-hosting.lede2")}
      </p>
      <p className="note p-4 pl-5 border-l-4 border-[#c99b52] bg-[#f8f1e5]">
        {t("self-hosting.note_lead")}
        <a href="/self-hosting/costs/">{t("self-hosting.note_link")}</a>
        {t("self-hosting.note_tail1")}{t("self-hosting.note_tail2")}
      </p>

      <h2 className="mt-14">{t("self-hosting.prepare.title")}</h2>
      <p className="muted">{t("self-hosting.prepare.intro")}</p>
      <div className="boundary grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 my-6">
        <div className="p-4 border border-[#d8d7ce] rounded-xl">
          <span className="badge badge-soft">{t("self-hosting.prepare.must_kicker")}</span>
          <ul>
            <li><strong>{t("self-hosting.prepare.must1_title")}</strong><span>{t("self-hosting.prepare.must1_body")}</span></li>
            <li><strong>{t("self-hosting.prepare.must2_title")}</strong><span>{t("self-hosting.prepare.must2_body")}</span></li>
            <li><strong>{t("self-hosting.prepare.must3_title")}</strong><span>{t("self-hosting.prepare.must3_body")}</span></li>
          </ul>
        </div>
        <div className="p-4 border border-[#d8d7ce] rounded-xl">
          <span className="badge badge-soft">{t("self-hosting.prepare.public_kicker")}</span>
          <ul>
            <li><strong>{t("self-hosting.prepare.public1_title")}</strong><span>{t("self-hosting.prepare.public1_body")}</span></li>
          </ul>
          <span className="badge badge-soft">{t("self-hosting.prepare.model_kicker")}</span>
          <ul>
            <li><strong>{t("self-hosting.prepare.model1_title")}</strong><span>{t("self-hosting.prepare.model1_body")}</span></li>
          </ul>
          <span className="badge badge-soft">{t("self-hosting.prepare.mail_kicker")}</span>
          <ul>
            <li><strong>{t("self-hosting.prepare.mail1_title")}</strong><span>{t("self-hosting.prepare.mail1_body")}</span></li>
          </ul>
        </div>
      </div>

      <h2 className="mt-14">{t("self-hosting.steps.title")}</h2>
      <ol className="steps pl-5 list-decimal">
        {[1, 2, 3].map((n) => (
          <li className="my-4" key={n}>
            <strong>{t(`self-hosting.steps.step${n}_title`)}。</strong>
            {t(`self-hosting.steps.step${n}_body`)}
          </li>
        ))}
      </ol>
      <p className="note p-4 pl-5 border-l-4 border-[#c99b52] bg-[#f8f1e5]">
        {t("self-hosting.steps.finish_note")}
      </p>

      <h2 className="mt-14">{t("self-hosting.data.title")}</h2>
      <div className="boundary grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 my-6">
        {[1, 2, 3].map((n) => (
          <article className="p-4 border border-[#d8d7ce] rounded-xl" key={n}>
            <h3 className="mt-0">{t(`self-hosting.data.point${n}_title`)}</h3>
            <p className="text-[0.95rem] leading-relaxed text-[#5d655e]">{t(`self-hosting.data.point${n}_body`)}</p>
          </article>
        ))}
      </div>
      <details className="border border-[#d8d7ce] rounded-xl bg-[#fbfaf4] p-4 my-4">
        <summary className="cursor-pointer font-semibold">{t("self-hosting.data.arch_link")}</summary>
        <p className="note text-[0.9rem] my-3">{t("self-hosting.data.arch_intro")}</p>
        <svg className="block w-full h-auto" viewBox="0 0 900 250" role="img" aria-labelledby="arch-title arch-desc">
          <title id="arch-title">{t("self-hosting.architecture.svg_title")}</title>
          <desc id="arch-desc">{t("self-hosting.architecture.desc1")}{t("self-hosting.architecture.desc2")}</desc>
          <g fontFamily="system-ui,sans-serif" fontSize="14" fill="#26332b" stroke="#566b5d" strokeWidth="1.5">
            <rect x="20" y="90" width="130" height="60" rx="10" fill="#e6f0e6" />
            <text x="85" y="118" textAnchor="middle" stroke="none">{t("self-hosting.architecture.node_browser")}</text>
            <text x="85" y="138" textAnchor="middle" stroke="none">{t("self-hosting.architecture.node_browser_sub")}</text>
            <rect x="210" y="40" width="380" height="160" rx="14" fill="#eef3ed" />
            <text x="400" y="68" textAnchor="middle" stroke="none" fontWeight="bold">{t("self-hosting.architecture.node_process")}</text>
            <rect x="235" y="82" width="155" height="42" rx="7" fill="#fffdf7" />
            <text x="312" y="107" textAnchor="middle" stroke="none">{t("self-hosting.architecture.node_api")}</text>
            <rect x="420" y="82" width="145" height="42" rx="7" fill="#fffdf7" />
            <text x="492" y="107" textAnchor="middle" stroke="none">{t("self-hosting.architecture.node_agent")}</text>
            <rect x="235" y="140" width="155" height="42" rx="7" fill="#fffdf7" />
            <text x="312" y="165" textAnchor="middle" stroke="none">{t("self-hosting.architecture.node_ui")}</text>
            <rect x="420" y="140" width="145" height="42" rx="7" fill="#fffdf7" />
            <text x="492" y="165" textAnchor="middle" stroke="none">{t("self-hosting.architecture.node_db")}</text>
            <rect x="650" y="150" width="220" height="55" rx="10" fill="#f7ead4" />
            <text x="760" y="177" textAnchor="middle" stroke="none">{t("self-hosting.architecture.node_gateway")}</text>
            <text x="760" y="195" textAnchor="middle" stroke="none">{t("self-hosting.architecture.node_gateway_sub")}</text>
            <rect x="650" y="30" width="220" height="55" rx="10" fill="#e8e1d8" />
            <text x="760" y="57" textAnchor="middle" stroke="none">{t("self-hosting.architecture.node_data")}</text>
            <text x="760" y="75" textAnchor="middle" stroke="none">{t("self-hosting.architecture.node_data_sub")}</text>
            <path d="M150 120h60" markerEnd="url(#arrow2)" fill="none" />
            <path d="M590 103h60" markerEnd="url(#arrow2)" fill="none" />
            <path d="M590 161l60 34" markerEnd="url(#arrow2)" fill="none" />
            <path d="M150 120h60" markerEnd="url(#arrow2)" fill="none" />
          </g>
          <defs>
            <marker id="arrow2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8z" fill="#566b5d" />
            </marker>
          </defs>
        </svg>
        <p className="note text-[0.85rem] mt-3">{t("self-hosting.architecture.note1")}</p>
      </details>

      <h2 className="mt-14">{t("self-hosting.ops.title")}</h2>
      <div className="links flex flex-wrap gap-4">
        <a className="font-semibold" href={t("self-hosting.ops.install_href")}>{t("self-hosting.ops.install")}</a>
        <a className="font-semibold" href="https://github.com/tans/miao/blob/main/docs/OPERATIONS.md">{t("self-hosting.ops.backup")}</a>
        <a className="font-semibold" href="https://github.com/tans/miao/blob/main/docs/OPERATIONS.md">{t("self-hosting.ops.upgrade")}</a>
        <a className="font-semibold" href="https://github.com/tans/miao/blob/main/docs/OPERATIONS.md">{t("self-hosting.ops.gateway")}</a>
      </div>
      <p className="note p-4 pl-5 border-l-4 border-[#c99b52] bg-[#f8f1e5]">
        {t("self-hosting.ops.note1")}{t("self-hosting.ops.note2")}
      </p>

      <h2 className="mt-14">{t("self-hosting.details.title")}</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
        <a className="p-4 border border-[#d8d7ce] rounded-xl no-underline hover:border-[#9db6a4]" href="/self-hosting/costs/">
          <h3 className="mt-0">{t("self-hosting.details.costs_title")}</h3>
          <p className="text-[0.95rem] text-[#5d655e]">{t("self-hosting.details.costs_body")}</p>
        </a>
        <a className="p-4 border border-[#d8d7ce] rounded-xl no-underline hover:border-[#9db6a4]" href="/docs/#附录：技术架构">
          <h3 className="mt-0">{t("self-hosting.details.arch_title")}</h3>
          <p className="text-[0.95rem] text-[#5d655e]">{t("self-hosting.details.arch_body")}</p>
        </a>
        <a className="p-4 border border-[#d8d7ce] rounded-xl no-underline hover:border-[#9db6a4]" href="/docs/#权限与安全边界">
          <h3 className="mt-0">{t("self-hosting.details.security_title")}</h3>
          <p className="text-[0.95rem] text-[#5d655e]">{t("self-hosting.details.security_body")}</p>
        </a>
      </div>
    </SiteLayout>
  );
}

mountPage(SelfHosting);
