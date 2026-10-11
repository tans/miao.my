---
target: "https://www.miao.my/product/agents/"
total_score: 30
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
timestamp: 2026-10-11T22-56-24Z
slug: www-miao-my-product-agents
---
Method: dual-agent (A: /root/design_review2 · B: /root/detector_browser2)

# Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | Six-step flow, pending receipt, cancellation, and offline state are clear; the page cannot show a live run. |
| 2 | Match System / Real World | 3/4 | Procurement, sales follow-up, and collection are concrete; harness, Jev, CRUD, and field scopes remain internal terms. |
| 3 | User Control and Freedom | 3/4 | Confirmation, cancellation, expiry, and permission rechecks are explicit; there is no operable demo to verify the promise. |
| 4 | Consistency and Standards | 3/4 | Flow labels, cards, tags, and boundary colors form a rule; Chinese and English casing and punctuation are slightly mixed. |
| 5 | Error Prevention | 4/4 | Planning, impact/budget review, confirmation gates, version checks, and forbidden arbitrary tools are the strongest part of the page. |
| 6 | Recognition Rather Than Recall | 3/4 | Headings, cards, bullets, and the six-step flow scan well; visitors must remember rules across sections. |
| 7 | Flexibility and Efficiency | 2/4 | No contents or anchor navigation; the long page lacks a fast path for visitors who already know the product. |
| 8 | Aesthetic and Minimalist Design | 4/4 | White paper-like surfaces, restrained borders, warm boundary block, green receipt block, and whitespace are coherent; the long mobile page adds scroll cost. |
| 9 | Error Recovery | 2/4 | The page explains when plans are blocked but does not show how to inspect the reason, retry, or contact an owner. |
| 10 | Help and Documentation | 3/4 | Product, operations, architecture, issue, and English links exist; they are grouped only at the end and the issue link is not task-focused for every persona. |
| **Total** | | **30/40** | **Good; the page has a strong foundation with clear conversion and mobile gaps.** |

# Design Specificity Verdict

## LLM assessment

The page feels authored for MIAO. The six-step Describe to Receipt chain, permission language, offline behavior, warm boundary block, green receipt block, and bilingual navigation create a recognizable product story. The visual system is stronger than a category-default SaaS landing page. The remaining sameness comes from repeated card grids, a familiar large hero, and links as the only next steps. The product distinction is currently carried by copy and claims about boundaries rather than a visible, verifiable run.

## Deterministic scan

The CLI detector ran once against `/Users/ke/code/miao.my/product/agents/index.html`. It was **DEGRADED** because `htmlparser2`, `css-select`, `css-tree`, and `domutils` were unavailable, so it used regex matching without selector matching or computed contrast. It reported one undercounted finding: `side-tab` / “Side-tab accent border”, warning severity, in line 8 at `.boundary{...border-left:4px solid #c99b52}`. The side border is a real issue under the craft floor; the detector result is not a clean bill of health.

BrowserOS neo visual inspection used fresh desktop and mobile tabs at 1440x900 and 390x844. Mutable preflight and detector overlay injection succeeded. The browser scan reported eight findings: undersized 10px section kicker; approximately 129-character line length in the confirmation paragraph; the `.boundary` 4px side border with 12px radius; four undersized 10px footer links; and Geist used for 99% of text. The yellow detector banner and highlights were visible in the owned detector-evidence tab. BrowserOS has no visibility/presentation API, so no literal `[Human]` tab label was available.

# Overall Impression

This is a credible boundary explainer with a calm, specific visual voice. The biggest opportunity is to turn comprehension into a deliberate next step without weakening the honesty that makes the page trustworthy. The page currently ends with a link list after a long read; it should make one safe action obvious much earlier.

# What's Working

- The narrative spine is unusually clear: the six-step chain leads into scenarios, read/execute/do-not-execute boundaries, confirmation and budget rules, a receipt, and offline behavior.
- The visual language is specific and restrained. Warm paper surfaces, quiet borders, a green receipt block, and a yellow boundary block create meaning without decorative gradients.
- The security promise is concrete. “No shell, arbitrary source, unauthorized HTTP, or permission expansion” is more credible than generic safety language.

# Priority Issues

## [P1] No clear next action

**Why it matters:** Visitors can understand the boundary but cannot tell whether to try MIAO, read architecture, install self-hosted MIAO, or contact an owner. The only next steps are a final list of equal-weight links and an internal issue.

**Fix:** Add one primary hero CTA to a real next step such as the architecture or self-hosting entry point, plus one secondary action. At the end, group links by audience (operator, security, developer) and keep one primary route.

**Suggested command:** `$impeccable clarify` or `$impeccable layout`

## [P1] Mobile first viewport loses words and compresses navigation

**Why it matters:** At 390px, the h1 isolates “作” and “界” on their own lines, while five nav items fit into a 59px header at very small type. The first impression becomes visually broken and tap targets are harder to use.

**Fix:** Add balanced or controlled headline wrapping for the Chinese phrases; reduce the mobile hero size slightly; move nav to a readable two-row or overflow pattern with adequate hit targets.

**Suggested command:** `$impeccable adapt` or `$impeccable typeset`

## [P1] All runtime evidence is illustrative

**Why it matters:** The page repeatedly says demo and illustrative, including the receipt and model name. That protects truthfulness but leaves the core differentiator unverified, so a careful visitor may read it as a design promise rather than a working capability.

**Fix:** Add one real but redacted trace or a short recorded run with timestamp, action, permission scope, rejection state, and resulting receipt. Keep it clearly separated from illustrative content.

**Suggested command:** `$impeccable delight` or `$impeccable clarify`

## [P2] Internal terms and mixed language increase interpretation cost

**Why it matters:** `harness`, `Jev`, `CRUD`, `HTTP(S)`, and field scopes appear without first-use explanations. “demo / illustrative” and stage labels mix casing and language.

**Fix:** Add a short glossary sentence at first use, use Chinese labels on the Chinese page where English adds no precision, and standardize tags and stage casing.

**Suggested command:** `$impeccable clarify`

## [P2] Long page has no fast navigation or progressive disclosure

**Why it matters:** Mobile main content is roughly 4,377px high. The flow, receipt, and offline boundary are useful but expensive to reach, and the final links arrive only after all sections.

**Fix:** Add a compact in-page contents row, anchor links, and collapsible detail for the full receipt or offline notes while keeping a short summary visible.

**Suggested command:** `$impeccable distill` or `$impeccable layout`

## [P2] Blocked states lack a recovery path

**Why it matters:** Visitors are told that expiry or permission changes stop execution, but not how a user inspects the cause, retries safely, or escalates.

**Fix:** Add “view reason”, “check before retry”, and “contact administrator” examples to the blocked-state explanation or link to a task-focused runbook.

**Suggested command:** `$impeccable harden`

# Persona Red Flags

### Jordan First Timer

Jordan can understand “permission decides the boundary” and the scenario cards, but has no primary “try”, “open”, or “install” action. The receipt is explicitly illustrative, so Jordan cannot tell how to experience a real run or what setup is needed.

### Riley Stress Tester

Riley sees strong statements about credentials and offline continuation, but no data-retention, region, encryption, audit-retention, or recovery detail. `harness` and `Jev` read like internal components rather than inspectable controls. The page does not state what happens after a blocked or expired run beyond “it stops”.

### Casey Mobile User

Casey faces a 43.2px mobile h1 that splits “工作” and “边界” into isolated characters, a compressed five-item nav, and a 4,377px page. The six-step flow and receipt stack correctly, but the page offers no thumb-friendly primary action and no section jump path.

# Minor Observations

- The 10px section kicker and footer links are below the page's otherwise readable density.
- The long confirmation paragraph is around 129 characters per line on desktop.
- The `border-left: 4px` callout accent conflicts with the craft floor's one-pixel boundary rule.
- `GitHub ↗` and `English` are visually heavy in the nav relative to the primary reading path.
- The `2026-10-08` illustrative date can look like live data without an “as of” cue.
- The flow uses `role=img`; verify how its bilingual accessible name is announced by screen readers.

# Questions to Consider

- If every core trace is illustrative, what evidence lets a visitor believe the Agent exists as a working capability?
- Is the first action meant for a security reviewer, a developer, or a business owner, and why are they all given the same final link row?
- “Continue after the browser closes” is a strong differentiator; where is the observable queue, receipt, or recovery demonstration?
- Does the offline section help a visitor continue work, or only reassure them that the system has a fallback?
- If mobile is a common sharing context, should the safety story arrive before the first 4,000px of scrolling?
