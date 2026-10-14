# MIAO product decision guide

If you need to manage customers, track orders, handle internal workflows, or collect business information on a schedule, MIAO can help you build a work app that fits your team. Look at what it can do first, then decide whether to deploy.

- **See business examples** → [/examples.html](/examples.html)
- **Get started** → [/get-started/](/get-started/)

MIAO is an open-source, self-hosted AI workbench: you do not need to learn development first. Start from a concrete work need, build an app, put it to use with your team, and adjust it as you go. This guide uses facts to describe what kind of work MIAO fits and what it cannot do yet. Conclusions are based on public source, documentation and recorded boundaries; planned capabilities are not current capabilities.

## These kinds of work are a good fit for MIAO

- **Manage business data**: keep customers, projects and orders in your own app, and let the team view and update them in one place.
- **Use it with your team**: invite colleagues to collaborate with member-level access to data, with a record of who changed what.
- **Simplify approvals and flows**: set states and actions for specific records, such as quote → approval → deal closed.
- **Automate repetitive tasks**: schedule tasks, collection and reminders within authorized scope, such as gathering public tender information.

## Decide in one minute

**Good fit**: your team needs lightweight, adjustable internal business tools and can accept self-hosting and maintenance. Common needs like customer management, order follow-up, internal workflows and public information collection are all covered.

**Evaluate first**: when you need complex pages, multi-system integration, large-scale automation or external publishing, validate with a real workflow before deciding. MIAO pages use controlled components — at most 12 validated pages per published interface; it does not run user source, SQL or arbitrary code.

**Not a fit right now**: if you want to buy a hosted SaaS with no operations, or you need arbitrary scripts, SQL or anonymous visitor writes. MIAO is self-hosted; the server, HTTPS, backups and recovery are the deployer's responsibility.

## Validate with one small app

1. **Pick one concrete problem**, such as customer follow-up: put customers, owners and follow-up status into one app.
2. **Build and preview** the data tables, pages and permissions, and confirm they match how you work.
3. **Invite one colleague to try it**, and validate publishing, record operations and the recovery path with the team.

## Know these boundaries before you use it

**MIAO is open-source and self-hosted, not hosted SaaS.** The deployer must prepare the server, HTTPS, backups and recovery; some AI building features also need model services and credentials to be configured. This page does not promise "free models", "one-click production", "no operations" or "instant online trial".

**Pages and actions use controlled components.** App interfaces are built from server-validated controlled components, with at most 12 validated pages per published interface; no arbitrary user frontend source, SQL or shell execution. Attachments are up to 5 MB per file (PNG, JPEG, GIF, WebP, PDF, plain text); CSV/XLSX reads are limited to the first 100 rows and each import batch to 100 rows, with preview and confirmation.

**Public pages are limited to explicitly authorized read-only information.** A release can select pages, data sources and fields to provide an anonymous read-only page; no writes, attachments, relations or business actions. A public link is not workspace access.

**AI depends on model services.** Capabilities that need model proposals, such as conversational building and UI drafts, are unavailable until LLM/JEV models are configured; published-app login, permissions, deterministic data operations and authorized background tasks do not depend on models and work once configured.

**What still works when models are offline?** Deterministic pages of published apps, login and permission checks, authorized CRUD, historical run receipts and existing collection results remain available; Agent plans for building or changing apps, and summaries and suggestions that need model understanding, wait until service recovery.

## Detailed capabilities and boundaries

### Capability matrix

| Capability | Available now | Field validation | Planned |
| --- | --- | --- | --- |
| Agent app creation, controlled JSON UI and version releases | Implemented; source and user guide | [#50 product and field acceptance](https://github.com/tans/miao/issues/50) | [#53 execution plan](https://github.com/tans/miao/issues/53) |
| State flows, real records, permissions and background jobs | Implemented; operations guide | [#63 three-scenario workflow](https://github.com/tans/miao/issues/63) | [#64 final verification](https://github.com/tans/miao/issues/64) |
| Declarative collection, public read-only pages and image grants | Implemented; operations guide | [#63 three-scenario workflow](https://github.com/tans/miao/issues/63) | [#62 target environment](https://github.com/tans/miao/issues/62) |
| Backups, recovery, HTTPS, mail and AI service configuration | Operational responsibility documented | [#62 target environment](https://github.com/tans/miao/issues/62) | [#64 final verification](https://github.com/tans/miao/issues/64) |
| OCR, language expansion and a general drag-and-drop editor | Not promised | Not applicable | No current product commitment |

### Boundaries

| Area | Current boundary | Status |
| --- | --- | --- |
| Model offline | Published apps, deterministic CRUD, historical run receipts and existing collection results remain available; new Agent creation/changes and model-dependent operations do not | Available now; validate in target environment |
| Attachments | Up to 5 MB per file; PNG, JPEG, GIF, WebP, PDF and plain text | Available now |
| CSV/XLSX | Reads limited to the first 100 rows; each import batch at most 100 rows, with preview and confirmation | Available now |
| Public pages | Only explicitly granted pages, record fields and images in a published version; read-only, with no attachments, relations, business actions or writes | Available now; validate in target environment |
| App UI | Controlled schema v3/json-render components, up to 12 validated published pages; no user source, SQL or arbitrary code execution | Available now |

### Six decision dimensions (technical detail)

1. **Creation: Agent-led or drag-and-drop/configuration-first.** MIAO is positioned as agent-first: a user describes the work, and the server-side Agent proposes pages, data structures and actions through constrained capabilities, which a member previews and confirms. The Agent has no shell access and does not execute arbitrary application source. If the team needs a visual canvas or form builder as the primary creation method, validate that separately against a general low-code platform. MIAO is not an arbitrary source, SQL or shell execution environment.
2. **Deployment: PocketBase plus one Go binary or multi-service/hosted.** MIAO embeds PocketBase in one Go process; PocketBase and the MIAO API handle identity, application data and access checks. The operator owns the data directory, backups, recovery, domain, HTTPS, mail and AI/Jev keys. This guide does not promise hosted service, SLA, automatic scaling or zero-operations delivery.
3. **Pages: controlled JSON UI and up to 12 validated pages.** UI schema v3 uses controlled json-render components; page data sources bind to real resources and declared actions are validated server-side. If an app needs many free-form pages, a complex marketing site, arbitrary components or more than 12 pages, validate the page limit with a real workflow first.
4. **Publishing: public read-only pages and field grants or an external write portal.** A release can select pages, data sources and fields to expose an anonymous read-only page through explicit table and field read grants. Anonymous runtime uses only the current published version and exposes no writes, attachments, relations or business actions. If you need visitor submission, file upload or a complex portal workflow, evaluate authentication and the write loop separately.
5. **Work loop: real records, state flows, jobs and collection receipts.** MIAO stores real business records in PocketBase and checks workspace, app and record permissions through the API; a user-defined state machine can bind to any application table. Background jobs can be triggered by time, records or authenticated external events, with attempts, permissions and idempotent receipts. For multi-system orchestration, a large connector catalog or high-volume automation, validate the actual workflow.
6. **Governance: license, data ownership, key location and acceptance evidence.** MIAO source is licensed under Apache License 2.0; in a self-hosted deployment the data directory is under the operator's control, who also owns backup and recovery. Long-lived AI credentials stay on the server. Release, write and background runs retain confirmation or run receipts. This guide makes no claim about particular customers, prices, SLAs, compliance certifications or deployment outcomes.

## Suggested acceptance order

1. Use one real but bounded internal workflow to validate "describe → draft → preview → publish".
2. Validate record access, field permissions, state transitions and conflict handling with real roles.
3. In an isolated environment, validate backups, recovery, HTTPS, mail, AI keys and logging policy.
4. Validate one read-only public page, including page, field, image and unpublish boundaries.
5. Then decide whether more pages, external writes, hosted deployment or broader automation are needed.

This page may change as public source and documentation change. Before implementation, use the corresponding repository version, operations guide and the organization's security review as the authority.

- [MIAO product reference](https://github.com/tans/miao/blob/main/PRODUCT.md)
- [MIAO README: capabilities and boundaries](https://github.com/tans/miao/blob/main/README.md)
- [MIAO operations guide](https://github.com/tans/miao/blob/main/docs/OPERATIONS.md)
- [Budibase website](https://budibase.com/) (appendix reference)
- [Budibase open-source repository](https://github.com/Budibase/budibase) (appendix reference)
