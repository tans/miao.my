# Changelog

## v0.2.0
- date: 2026-10-11
- tags: Released
- links: Release | https://github.com/tans/miao/releases/tag/v0.2.0 | Commit | https://github.com/tans/miao/compare/v0.0.1...v0.2.0

- **Export and search made easier.** Export one app table as CSV; search records across every accessible app and table; share a single record with a stable deep link.
- **Notifications get timely.** Filter and mark all notifications as read; background tasks can be scheduled with interval, monthly and cron triggers; workspace notifications can be delivered by email, WeCom, DingTalk and Lark.
- **Assistant and interface.** App settings are clearer; the supported interface languages remain Chinese and English.
- **Stability.** Fixed auth endpoint rate limiting, out-of-range pagination, background worker panic isolation and administrator authorization.

## In development
- pending: dev
- links: Commit | https://github.com/tans/miao/commits/main

- The following are source records, not released versions; downloadable versions are the GitHub Releases.

## 2026-10-09
- date: Build 3388d67
- tags: Source record
- pending: yes
- links: Commit | https://github.com/tans/miao/commit/3388d67

- **App icons and version switching.** Added app icons and a local icon picker; the app runtime toolbar can switch versions directly.
- Publishing a conversational UI draft no longer needs a second confirmation; removed draft and version-history blocks from the app runtime.
- Fixes: form deduplication and persisted run metrics, app settings rendering, workspace selector overflow, assistant loading and model-error prompts, and failed assistant retry cleanup.

## 2026-10-08
- tags: Source record
- pending: yes

- **Version releases and SSE streaming updates.** Publish app changes and switch versions; assistant and app runtime updates push via SSE streaming.
- Agent runs move to background jobs; platform title is configurable.
- Fixes: keep data tables when deleting an app, restore the signed-in state without a login flash, normalize legacy data directories to the initial schema, and runtime package metadata archiving.

## 2026-10-07
- tags: Major release day | Source record
- pending: yes

- **The workbench takes shape.** The assistant becomes a permanent third dark terminal-style column; the workspace switcher becomes a dropdown; icons unify on the Feather icon set.
- **Full UI and copy localization.** Assistant prompts, imports, app settings, collection results, usage notifications, platform admin and English workbench translations are complete; account language preference is supported.
- Publish and edit UI through the conversation thread; invitations become 24-hour email links.
- Collection workflows completed: external HTTP source reads, Typesafe Jev endpoints and independent notification retries.

## 2026-10-03 – 10-06

- **Controlled json-render runtime.** The backend harness and json-render rendering runtime shipped; drafts are composed and validated through the harness.
- **Business actions and workflows.** Generic transactional business actions, input declaration validation, workflow state machines and constrained external connectors.
- Background jobs join the shared Runtime; read-only public app pages shipped; Jev decisions use a pinned evaluator version.
- Fixes: attachment/outbound migration, automation retries, in-transaction AI quota reservation and transactional account deletion — a large batch of stability fixes.

## 2026-09-28 – 10-02
- tags: Architecture rewrite | Source record
- pending: yes

- **Moved to Go + PocketBase.** Removed the Mongo/DSH stack; app data and accounts persist to embedded PocketBase; the server is a single Go binary.
- **Agent-first workbench.** Rebuilt as an Agent-driven app runtime with versioned app runs, UI draft history, legacy-version-compatible recovery and persistent private conversations.
- Durable background jobs (Bun runtime); member invitations and the enterprise fx gateway.

## 2026-08-21 – 09-03
- tags: Start | Source record
- pending: yes

- **Project start.** Core API, MongoDB runtime, a bootstrap workspace UI and the ontology design kernel.
- Built-in DeepSeek Harness Agent, MCP sessions with permission tracking, and per-session Agent execution traces.
- Tenant file assets, backup/recovery scripts, Docker deployment and nginx reverse proxy.