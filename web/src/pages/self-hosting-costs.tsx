import { SiteLayout } from "@/components/site/SiteLayout";
import { useCopy } from "@/lib/i18n";
import { useLocale, usePageMeta } from "@/lib/locale";
import { mountPage } from "./mount";

export default function SelfHostingCosts() {
  const { locale } = useLocale();
  const { t } = useCopy(locale);
  usePageMeta("self-hosting.costs.title", ["self-hosting.costs.meta"]);

  const rows: { id: string; purpose: React.ReactNode; owner: React.ReactNode; billing: React.ReactNode; impact: React.ReactNode }[] = [
    {
      id: "license",
      purpose: t("self-hosting.costs.table.license_purpose"),
      owner: t("self-hosting.costs.table.license_owner"),
      billing: (
        <>
          <a href="https://github.com/tans/miao/blob/main/LICENSE">{t("self-hosting.costs.table.license_billing_link")}</a>
          {t("self-hosting.costs.table.license_billing_and")}
          <a href="https://github.com/tans/miao/blob/main/TRADEMARKS.md">{t("self-hosting.costs.table.license_trademark_link")}</a>
          {t("self-hosting.costs.table.license_trademark_note")}
        </>
      ),
      impact: t("self-hosting.costs.table.license_impact"),
    },
    {
      id: "server",
      purpose: t("self-hosting.costs.table.server_purpose"),
      owner: t("self-hosting.costs.table.server_owner"),
      billing: t("self-hosting.costs.table.server_billing"),
      impact: t("self-hosting.costs.table.server_impact"),
    },
    {
      id: "domain",
      purpose: (
        <>
          {t("self-hosting.costs.table.domain_purpose_lead")}
          <code className="whitespace-nowrap">{t("self-hosting.costs.table.domain_listen")}</code>
          {t("self-hosting.costs.table.domain_purpose_tail")}
        </>
      ),
      owner: t("self-hosting.costs.table.domain_owner"),
      billing: t("self-hosting.costs.table.domain_billing"),
      impact: t("self-hosting.costs.table.domain_impact"),
    },
    {
      id: "storage",
      purpose: (
        <>
          {t("self-hosting.costs.table.storage_purpose_lead")}
          <code className="whitespace-nowrap">{t("self-hosting.costs.table.storage_data_dir")}</code>
          {t("self-hosting.costs.table.storage_purpose_mid")}
          <code className="whitespace-nowrap">{t("self-hosting.costs.table.storage_backup_dir")}</code>
          {t("self-hosting.costs.table.storage_purpose_tail")}
        </>
      ),
      owner: t("self-hosting.costs.table.storage_owner"),
      billing: t("self-hosting.costs.table.storage_billing"),
      impact: t("self-hosting.costs.table.storage_impact"),
    },
    {
      id: "llm",
      purpose: (
        <>
          {t("self-hosting.costs.table.llm_purpose_lead")}
          <code className="whitespace-nowrap">{t("self-hosting.costs.table.llm_admin")}</code>
          {t("self-hosting.costs.table.llm_purpose_tail")}
        </>
      ),
      owner: t("self-hosting.costs.table.llm_owner"),
      billing: t("self-hosting.costs.table.llm_billing"),
      impact: t("self-hosting.costs.table.llm_impact"),
    },
    {
      id: "jev",
      purpose: (
        <>
          {t("self-hosting.costs.table.jev_purpose_lead")}
          <code className="whitespace-nowrap">{t("self-hosting.costs.table.jev_admin")}</code>
          {t("self-hosting.costs.table.jev_purpose_mid")}
          <code className="whitespace-nowrap">{t("self-hosting.costs.table.jev_kind")}</code>
          {t("self-hosting.costs.table.jev_purpose_tail")}
        </>
      ),
      owner: (
        <>
          {t("self-hosting.costs.table.jev_owner_lead")}
          <code className="whitespace-nowrap">{t("self-hosting.costs.table.jev_budget_api")}</code>
          {t("self-hosting.costs.table.jev_owner_tail")}
        </>
      ),
      billing: t("self-hosting.costs.table.jev_billing"),
      impact: t("self-hosting.costs.table.jev_impact"),
    },
    {
      id: "mail",
      purpose: (
        <>
          {t("self-hosting.costs.table.mail_purpose_lead")}
          <code className="whitespace-nowrap">{t("self-hosting.costs.table.mail_admin")}</code>
          {t("self-hosting.costs.table.mail_purpose_tail")}
        </>
      ),
      owner: t("self-hosting.costs.table.mail_owner"),
      billing: (
        <>
          <a href="https://resend.com/pricing">{t("self-hosting.costs.table.mail_billing_link")}</a>
          {t("self-hosting.costs.table.mail_billing_note")}
        </>
      ),
      impact: t("self-hosting.costs.table.mail_impact"),
    },
    {
      id: "custom",
      purpose: t("self-hosting.costs.table.custom_purpose"),
      owner: t("self-hosting.costs.table.custom_owner"),
      billing: t("self-hosting.costs.table.custom_billing"),
      impact: t("self-hosting.costs.table.custom_impact"),
    },
  ];

  return (
    <SiteLayout active="self_hosting" mainClass="hosting-main max-w-[960px] mx-auto px-6 pt-20 pb-28 [&_a]:text-inherit">
      <p className="section-kicker">{t("self-hosting.costs.kicker")}</p>
      <h1 className="text-[clamp(2.2rem,5vw,4rem)] my-2 mb-4">{t("self-hosting.costs.h1")}</h1>
      <p className="lede text-[1.2rem] max-w-[700px]">
        {t("self-hosting.costs.lede1")}{t("self-hosting.costs.lede2")}{t("self-hosting.costs.lede3")}
        <a href="https://github.com/tans/miao/blob/main/docs/OPERATIONS.md">{t("self-hosting.costs.ops_link")}</a>
        {t("self-hosting.costs.lede4")}{t("self-hosting.costs.lede5")}
      </p>

      <h2 className="mt-14">{t("self-hosting.costs.table.title")}</h2>
      <div className="tablewrap overflow-auto my-8">
        <table className="cost w-full min-w-[720px] border-collapse text-[.95rem]">
          <thead>
            <tr>
              {(["col_item", "col_purpose", "col_owner", "col_billing", "col_impact"] as const).map((col) => (
                <th key={col} className="border border-[#d8d7ce] px-3 py-2.5 text-left align-top bg-[#eef3ed]">
                  {t(`self-hosting.costs.table.${col}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="border border-[#d8d7ce] px-3 py-2.5 text-left align-top">
                  <strong>{t(`self-hosting.costs.table.${row.id}_label`)}</strong>
                </td>
                <td className="border border-[#d8d7ce] px-3 py-2.5 text-left align-top">{row.purpose}</td>
                <td className="border border-[#d8d7ce] px-3 py-2.5 text-left align-top">{row.owner}</td>
                <td className="border border-[#d8d7ce] px-3 py-2.5 text-left align-top">{row.billing}</td>
                <td className="border border-[#d8d7ce] px-3 py-2.5 text-left align-top">{row.impact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-14">{t("self-hosting.costs.limits.title")}</h2>
      <p>{t("self-hosting.costs.limits.lead")}</p>
      <ul className="checklist pl-5 list-disc">
        {(["no_model", "no_llm", "no_jev", "no_mail"] as const).map((item) => (
          <li key={item} className="my-3">
            <strong>{t(`self-hosting.costs.limits.${item}_label`)}</strong>
            {t(`self-hosting.costs.limits.${item}_body`)}
          </li>
        ))}
      </ul>

      <h2 className="mt-14">{t("self-hosting.costs.checklist.title")}</h2>
      <ol className="checklist pl-5 list-decimal">
        <li className="my-3">
          {t("self-hosting.costs.checklist.item1_lead")}
          <code className="whitespace-nowrap">{t("self-hosting.costs.checklist.item1_curl")}</code>
          {t("self-hosting.costs.checklist.item1_and")}
          <code className="whitespace-nowrap">{t("self-hosting.costs.checklist.item1_openssl")}</code>
          {t("self-hosting.costs.checklist.item1_tail")}
        </li>
        <li className="my-3">
          {t("self-hosting.costs.checklist.item2_lead")}
          <code className="whitespace-nowrap">{t("self-hosting.costs.checklist.item2_key")}</code>
          {t("self-hosting.costs.checklist.item2_tail")}
        </li>
        <li className="my-3">{t("self-hosting.costs.checklist.item3")}</li>
        <li className="my-3">{t("self-hosting.costs.checklist.item4")}</li>
        <li className="my-3">{t("self-hosting.costs.checklist.item5")}</li>
        <li className="my-3">{t("self-hosting.costs.checklist.item6")}</li>
      </ol>

      <h2 className="mt-14">{t("self-hosting.costs.responsibilities.title")}</h2>
      <p>
        {t("self-hosting.costs.responsibilities.body1")}{t("self-hosting.costs.responsibilities.body2")}
        {t("self-hosting.costs.responsibilities.body3")}
      </p>

      <h2 className="mt-14">{t("self-hosting.costs.sources.title")}</h2>
      <div className="links flex flex-wrap gap-4">
        <a className="font-semibold" href="https://github.com/tans/miao/blob/main/LICENSE">{t("self-hosting.costs.sources.license_link")}</a>
        <a className="font-semibold" href="https://github.com/tans/miao/blob/main/TRADEMARKS.md">{t("self-hosting.costs.sources.trademark_link")}</a>
        <a className="font-semibold" href="https://github.com/tans/miao/blob/main/docs/OPERATIONS.md#6-自托管部署">{t("self-hosting.costs.sources.deploy_link")}</a>
        <a className="font-semibold" href="https://github.com/tans/miao/blob/main/docs/OPERATIONS.md#7-备份与恢复">{t("self-hosting.costs.sources.backup_link")}</a>
        <a className="font-semibold" href="https://resend.com/pricing">{t("self-hosting.costs.sources.resend_link")}</a>
      </div>
      <p className="note p-4 pl-5 border-l-4 border-[#c99b52] bg-[#f8f1e5]">
        {t("self-hosting.costs.sources.note1")}{t("self-hosting.costs.sources.note2")}
      </p>
    </SiteLayout>
  );
}

mountPage(SelfHostingCosts);
