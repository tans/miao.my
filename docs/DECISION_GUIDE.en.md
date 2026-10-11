# MIAO product decision guide

This factual guide helps a team decide whether MIAO fits its current work. It is not a competitor ranking and does not suggest that MIAO is reproducing Budibase's product line. The conclusions describe public source, documentation and recorded boundaries; planned capabilities are not current capabilities.

## Quick start

- [Install and self-host](https://github.com/tans/miao#self-hosting): deploy one Go binary; the operator owns the data directory, HTTPS, backups and recovery.
- [Create your first app](./USER_GUIDE.en.md#create-an-app): sign in, ask the assistant for a controlled draft, then preview and confirm with an authorized member.
- [Operations and recovery](https://github.com/tans/miao/blob/main/docs/OPERATIONS.md) · [Generated API reference](https://github.com/tans/miao/tree/main/docs/generated)

## Capability matrix

| Capability | Available now | Field validation | Planned |
| --- | --- | --- | --- |
| Agent app creation, controlled JSON UI and version releases | Implemented; source and user guide | [#50 product and field acceptance](https://github.com/tans/miao/issues/50) | [#53 execution plan](https://github.com/tans/miao/issues/53) |
| State flows, real records, permissions and background jobs | Implemented; operations guide | [#63 three-scenario workflow](https://github.com/tans/miao/issues/63) | [#64 final verification](https://github.com/tans/miao/issues/64) |
| Declarative collection, public read-only pages and image grants | Implemented; operations guide | [#63 three-scenario workflow](https://github.com/tans/miao/issues/63) | [#62 target environment](https://github.com/tans/miao/issues/62) |
| Backups, recovery, HTTPS, mail and AI service configuration | Operational responsibility documented | [#62 target environment](https://github.com/tans/miao/issues/62) | [#64 final verification](https://github.com/tans/miao/issues/64) |
| OCR, language expansion and a general drag-and-drop editor | Not promised | Not applicable | No current product commitment |

## Boundaries

| Area | Current boundary | Status |
| --- | --- | --- |
| Model offline | Published apps, deterministic CRUD, historical run receipts and existing collection results remain available; new Agent creation/changes and model-dependent operations do not | Available now; validate in target environment |
| Attachments | Up to 5 MB per file; PNG, JPEG, GIF, WebP, PDF and plain text | Available now |
| CSV/XLSX | Reads are limited to the first 100 rows; each import batch is at most 100 rows and requires review and confirmation | Available now |
| Public pages | Only explicitly granted pages, record fields and images in a published version; read-only, with no attachments, relations, business actions or writes | Available now; validate in target environment |
| App UI | Controlled schema v3/json-render components, up to 12 validated published pages; no user source, SQL or arbitrary code execution | Available now |

- [MIAO product reference](https://github.com/tans/miao/blob/main/PRODUCT.md)
- [MIAO README: capabilities and boundaries](https://github.com/tans/miao/blob/main/README.md)
- [MIAO operations guide](https://github.com/tans/miao/blob/main/docs/OPERATIONS.md)
- [Budibase website](https://budibase.com/)
- [Budibase open-source repository](https://github.com/Budibase/budibase)

## Quick read

| If the team needs | Conclusion |
| --- | --- |
| Describe an internal workflow in plain language, then shape a controlled app with an Agent | **MIAO fits** |
| Keep data self-hosted in a single deployment while owning backups, HTTPS and upgrades | **MIAO fits** |
| Controlled pages, real records, state flows, background jobs and auditable release confirmation | **MIAO fits** |
| A drag-and-drop general canvas, arbitrary code or SQL, complex portals or anonymous writes | **Not currently supported** |
| Broader page composition, a hosted option or extensive external integrations | **Evaluate** |

## Six decision dimensions

### 1. Creation: Agent-led or drag-and-drop/configuration-first

**MIAO: fits.** MIAO is positioned as agent-first: a user describes the work, and the server-side Agent proposes pages, data structures and actions through constrained capabilities. A member previews and confirms the result. The Agent has no shell access and does not execute arbitrary application source submitted by a user.

**Evaluate.** If the team needs a visual canvas, form builder or low-code component catalog as its primary creation method, validate that interaction model and migration cost separately against a general low-code platform. Budibase's public materials are the source of truth for its positioning: [website](https://budibase.com/) and [repository](https://github.com/Budibase/budibase). This guide does not rank the products on experience, performance or price.

**Not currently supported.** MIAO is not an arbitrary source, SQL or shell execution environment, and it does not claim to cover every general page type with a canvas.

Sources: [PRODUCT.md](https://github.com/tans/miao/blob/main/PRODUCT.md), [README Product boundaries](https://github.com/tans/miao/blob/main/README.md#product-boundaries).

### 2. Deployment: PocketBase plus one Go binary or multi-service/hosted

**MIAO: fits.** MIAO embeds PocketBase in one Go process. PocketBase and the MIAO API handle identity, application data and access checks; the README lists self-hosting one Go binary as a capability. The operator owns the data directory, backups, recovery, domain, HTTPS, mail and AI/Jev keys.

**Evaluate.** If the team prefers a vendor-hosted service, managed database, horizontal scaling or a multi-service platform, evaluate its operations capacity and recovery procedure. Budibase's deployment shape and components should be checked in its [official material and repository](https://github.com/Budibase/budibase); this guide does not make an architecture value judgment.

**Not currently supported.** This guide does not promise MIAO hosted service, SLA, automatic scaling or zero-operations delivery.

Sources: [README Self-hosting](https://github.com/tans/miao/blob/main/README.md#self-hosting), [PRODUCT.md](https://github.com/tans/miao/blob/main/PRODUCT.md).

### 3. Pages: controlled JSON UI and up to 12 validated pages

**MIAO: fits.** UI schema v3 uses controlled json-render components. Page data sources bind to real resources, declared actions are validated server-side, and the product boundaries state that published interfaces support up to 12 validated pages and fixed field actions.

**Evaluate.** If an app needs many free-form pages, a complex marketing site, arbitrary components or more than 12 pages, validate the page limit, relations, files and actions with a real workflow. Refer to each low-code product's public material for its general canvas capabilities; do not infer them from this guide.

**Not currently supported.** MIAO does not run arbitrary frontend source submitted by users and does not currently promise a general page canvas.

Sources: [README Product boundaries](https://github.com/tans/miao/blob/main/README.md#product-boundaries), [PRODUCT.md](https://github.com/tans/miao/blob/main/PRODUCT.md).

### 4. Publishing: public read-only pages and field grants or an external write portal

**MIAO: fits.** A release can select pages, data sources and fields, then expose an anonymous read-only page through explicit table and field read grants. Anonymous runtime uses only the current published version and exposes no writes, attachments, relations or business actions; member access remains server-enforced.

**Evaluate.** For a public directory, status lookup or curated data view, validate pages, fields and image authorization. If the requirement includes visitor submission, customer self-editing, file upload or a complex portal workflow, evaluate authentication, abuse controls and the write loop separately.

**Not currently supported.** MIAO's anonymous publication is not an external write portal. A public link must not be treated as workspace access.

Sources: [PRODUCT.md](https://github.com/tans/miao/blob/main/PRODUCT.md), [README Why MIAO](https://github.com/tans/miao/blob/main/README.md#why-miao).

### 5. Work loop: real records, state flows, jobs and collection receipts

**MIAO: fits.** MIAO stores real business records in PocketBase and checks workspace, app and record permissions through the API. A user-defined state machine can bind to any application table. Background jobs can be triggered by time, records or authenticated external events, with attempts, permissions and idempotent receipts. Agent and collection HTTP(S) reads are bounded by budgets and authorization scope.

**Evaluate.** If the team needs multi-system orchestration, a large connector catalog, a complex event bus or high-volume automation, validate the actual workflow and operational target. Do not infer a complete automation platform from “background jobs.” Budibase's public positioning can be checked in its [website](https://budibase.com/) and [repository](https://github.com/Budibase/budibase).

**Not currently supported.** MIAO does not promise arbitrary network writes, arbitrary SQL, unlimited imports or automation without authorization boundaries. CSV/XLSX imports and each import batch are currently limited to 100 rows.

Sources: [PRODUCT.md](https://github.com/tans/miao/blob/main/PRODUCT.md), [README Features](https://github.com/tans/miao/blob/main/README.md#features).

### 6. Governance: license, data ownership, key location and acceptance evidence

**MIAO: fits.** MIAO source is licensed under Apache License 2.0. In a self-hosted deployment, the data directory is under the operator's control, who also owns backup and recovery. Long-lived AI credentials stay on the server and the browser calls an authenticated proxy. Release, write and background runs retain confirmation or run receipts, so acceptance can be written as repeatable business-flow checks.

**Evaluate.** The organization should still review Apache 2.0, third-party dependencies and MIAO trademark restrictions, then define its own retention, backup, recovery, key rotation and access-audit policy. Budibase's license and deployment terms should be taken directly from its [repository](https://github.com/Budibase/budibase) and official material.

**Not currently supported.** This guide makes no claim about particular customers, prices, SLAs, compliance certifications or deployment outcomes, and it does not treat prototype screenshots as production acceptance evidence. The MIAO repository explicitly says customer proof, adoption data, pricing and deployment claims are not verified materials.

Sources: [README License](https://github.com/tans/miao/blob/main/README.md#license), [PRODUCT.md Evidence on Hand](https://github.com/tans/miao/blob/main/PRODUCT.md#evidence-on-hand), [Operations guide](https://github.com/tans/miao/blob/main/docs/OPERATIONS.md).

## Suggested acceptance order

1. Use one real but bounded internal workflow to validate “describe → draft → preview → publish.”
2. Validate record access, field permissions, state transitions and conflict handling with real roles.
3. In an isolated environment, validate backups, recovery, HTTPS, mail, AI keys and logging policy.
4. Validate one read-only public page, including page, field, image and unpublish boundaries.
5. Then decide whether more pages, external writes, hosted deployment or broader automation are needed.

This page may change as public source and documentation change. Before implementation, use the corresponding repository version, operations guide and the organization's security review as the authority.
