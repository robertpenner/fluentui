# Fluent Motion System — Senior UXE Backlog (Tier 1 Planning Doc)

**Author:** Robert Penner
**Status:** Tier 1 — readiness-driven planning artifact for the eventual Senior UXE partner. Tier 2 (GitHub issue conversion) follows via Claude Code + `gh` against [microsoft/projects/1222](https://github.com/orgs/microsoft/projects/1222).
**Scope window:** ~3 months from UXE start
**Anchors:** [Migration epic #36125](https://github.com/microsoft/fluentui/issues/36125) · [Project board](https://github.com/orgs/microsoft/projects/1222) · [Migration plan](packages/react-components/CSS_ANIMATION_MIGRATION_PLAN.md) · [`@fluentui/react-motion` Storybook docs](https://storybooks.fluentui.dev/react/) · [Motion System Teams channel](https://teams.microsoft.com/l/channel/19%3A6001d7bdb9884e4e90890d0260d339a2%40thread.skype/Motion%20System?groupId=64c2bd5c-33c2-4898-918f-4a02a6ac98e1&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47)

**How to read this doc:** The eight groups below describe a delegatable backlog for a Senior UXE joining as a partner on Fluent Motion System (FMS) work. Items are organized by workstream, not by priority — the **sequencing legend** below tells you when each item runs. Many items cross-reference each other; see the **cross-reference index** for the dependency map. Decisions made during planning are noted at the top of each group.

---

## Terminology

Used consistently throughout this doc:

- **The UXE** — the Senior UX Engineer joining as a partner on FMS work (the role this backlog targets)
- **Robert** — Robert Penner, FMS tech lead (author of this doc)
- **Casey** — Casey Baker, design-side motion product owner; primary design lead for choreography work
- **shift / Dmytro** — Oleksandr Fediashov ("shift") and Dmytro Kirpa, Fluent UI engineering reviewers
- **FMS** — Fluent Motion System (`@fluentui/react-motion` and `@fluentui/react-motion-components-preview`)
- **Beta / Stable** — for **motion components**: formal Fluent v9 maturity states governed by the v9 Stable release criteria. For **choreography (Stagger, Sequence)**: "Beta" is informal/internal — a readiness milestone Robert defines, not a formal package state
- **The migration plan** — the 10-issue migration epic at [#36125](https://github.com/microsoft/fluentui/issues/36125), covering CSS animations → FMS migrations across Fluent UI components

---

## Default Definition of Done

Applies to all _shipping_ items unless the item adds or overrides criteria. Onboarding/ramp-up and stretch items are exempt where noted.

> - PR opened against `microsoft/fluentui`, linked to its backlog item / GitHub issue
> - Code review approved by Robert (motion-semantic correctness) and at least one Fluent UI maintainer (e.g., shift, Dmytro) for platform-side concerns
> - Storybook story added or updated where applicable, including a motion slot customization example
> - Unit tests added/updated; existing tests pass
> - No new accessibility, RTL, theming, or reduced-motion regressions
> - Bundle-size and perf checks pass (no unjustified regressions)
> - Changefile added per Fluent UI release process
> - Backlog item / issue closed with a one-line outcome note

**Per-group additions:** Some groups add or relax DoD criteria — see each group's header for specifics. Notably:

- Migrations (Group 3) add: visual parity, reduced-motion compliance, keyboard navigation, cross-browser compat, breaking-change discipline (changefile + migration note for breaking items)
- Choreography (Group 4) adds: product-grounded scenarios, composition tested under interruption, dual purpose as docs + stress test
- Reliability (Group 7) adds: findings reports always; in-scope/deferred split documented
- Onboarding (Group 1) and Stretch (Group 8) relax DoD significantly — exploratory artifacts count

---

## Sequencing legend

Calendar dates are intentionally avoided since UXE start date is TBD. Sequencing is **relative**:

| Marker       | Meaning                                                                                                |
| ------------ | ------------------------------------------------------------------------------------------------------ |
| **M1 W1–2**  | Month 1, weeks 1–2 — compressed onboarding ramp (the UXE is C+D+E profile, so 2 weeks not 4)           |
| **M2 W3–8**  | Month 2, weeks 3–8 — shipping cadence picks up; first solo migrations; Group 4 begins                  |
| **M3 W9–12** | Month 3, weeks 9–12 — choreography ownership, API freeze, marquee migration (#36132), readiness audits |
| **End M3**   | End of month 3 — closing artifacts (CHOR-07 Beta declaration, PROM-REPORT, REL-07 follow-up backlog)   |
| **Ongoing**  | Recurring items (e.g., DOC-08 product Q&A) — start at a marker and continue indefinitely               |
| **Stretch**  | Group 8 items — opt-in, no commitment, picked up if/when slack exists                                  |

---

## Label taxonomy

For Tier 2 GitHub issue creation. Each item maps to one **area** label and zero-or-more **cross-cutting** labels.

**Area labels** (one per item, group-derived):

- `area: onboarding` — Group 1
- `area: docs` — Group 2
- `area: migration` — Group 3
- `area: choreography` — Group 4
- `area: api` — Group 5
- `area: promotion` — Group 6
- `area: reliability` — Group 7
- `area: ai-workflow` — Group 8

**Cross-cutting labels** (zero or more per item):

- `partner-pickup` — UXE-driven (most items)
- `paired` — designed to be paired on with Robert
- `stable-blocker` — must land before motion-component Stable promotion
- `choreography-beta-blocker` — must land before choreography Beta milestone
- `api-input` — produces signal that informs Group 5 item drafting
- `flywheel-output` — produces backlog items for future planning cycles (Group 8 audits)
- `marquee` — signature partner work; flagship contribution
- `growth` — JD-anchored growth-track work (representation, advanced topics)
- `a11y` — accessibility-focused
- `closing` — closing artifact for its group

---

## ID prefix scheme

Stable, group-derived IDs for unambiguous cross-references. Some IDs are intentionally not present (cut during planning) — the gap is preserved rather than recompacted.

| Prefix    | Group                  | Range                                                                                                                                                                                  |
| --------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ONB-##`  | Group 1 — Onboarding   | ONB-01 through ONB-07                                                                                                                                                                  |
| `DOC-##`  | Group 2 — Docs         | DOC-01, DOC-04, DOC-05, DOC-08, DOC-10 (gaps preserved: DOC-02, DOC-03, DOC-06 → CHOR-02, DOC-07, DOC-09 were cut)                                                                     |
| `MIG-##`  | Group 3 — Migrations   | MIG-05 through MIG-10 (MIG-01–04 reference Phase 1–2 work completed before UXE start)                                                                                                  |
| `CHOR-##` | Group 4 — Choreography | CHOR-01 through CHOR-07                                                                                                                                                                |
| `API-##`  | Group 5 — API          | TBD — items deferred to M2 drafting                                                                                                                                                    |
| `PROM-##` | Group 6 — Promotion    | `PROM-INFRA-01` through `PROM-INFRA-09` (cross-cutting); `PROM-FADE`, `PROM-COLLAPSE`, `PROM-SCALE`, `PROM-SLIDE`, `PROM-ROTATE`, `PROM-BLUR` (per-component); `PROM-REPORT` (closing) |
| `REL-##`  | Group 7 — Reliability  | REL-01 through REL-07                                                                                                                                                                  |
| `STR-##`  | Group 8 — Stretch      | STR-01 through STR-06                                                                                                                                                                  |

---

## One-page summary table

All committed items across Groups 1–7, plus stretch items from Group 8. Sorted by sequencing.

| ID            | Title                                              | Group | Difficulty       | Sequencing     | Notes                               |
| ------------- | -------------------------------------------------- | ----- | ---------------- | -------------- | ----------------------------------- |
| ONB-01        | Read & annotate FMS core docs                      | 1     | Easy             | M1 W1          |                                     |
| ONB-02        | Walk the FMS source tree                           | 1     | Easy-Med         | M1 W1–2        |                                     |
| ONB-03        | Build "Hello, FMS" Storybook playground            | 1     | Easy             | M1 W2          |                                     |
| ONB-04        | Code archaeology on recent migration PR            | 1     | Easy             | M1 W2          |                                     |
| ONB-05        | Read v9 Stable checklist; map to motion components | 1     | Medium           | M1 W2          |                                     |
| **ONB-06**    | **Pair on Skeleton migration** _(= MIG-05)_        | 1     | Med-Hard         | M1 W2 → M2 W3  | ⭐ First paired migration           |
| ONB-07        | Onboarding retro + docs improvement proposal       | 1     | Easy-Med         | End M1 W2      |                                     |
| DOC-01        | Address top docs gaps from ONB-07                  | 2     | Easy-Med         | M1 W3–4        |                                     |
| DOC-10        | Audit & extend new docs from UXE ramp              | 2     | Easy-Med         | M1 W1–4        |                                     |
| DOC-08        | Recurring product team Q&A support                 | 2     | Easy (recurring) | M2 W3+ ongoing |                                     |
| **MIG-05**    | **Skeleton migration (#36130)** _(= ONB-06)_       | 3     | Med-Hard         | M1 W2 → M2 W3  | ⭐ First paired                     |
| MIG-06        | Nav migration (#36131)                             | 3     | Med-Hard         | M2 W4–5        | First family                        |
| CHOR-01       | Define Beta exit criteria + propose 5 scenarios    | 4     | Med / Hard       | M2 W5–6        | Robert-owned                        |
| DOC-05        | Per-component slot customization story audit       | 2     | Easy-Med         | M2 W5–7        | `stable-blocker`                    |
| CHOR-02       | 5 foundation scenarios + ergonomics notes          | 4     | Med-Hard         | M2 W6 → M3 W9  | `choreography-beta-blocker`         |
| **MIG-07**    | **Focus border migration ×7 (#36132)**             | 3     | Hard             | M2 W6–8        | ⭐ Marquee                          |
| CHOR-03       | Composition stress test catalog                    | 4     | Medium           | M2 W7–8        | `api-input`                         |
| PROM-INFRA-01 | VR test scaffolding                                | 6     | Med-Hard         | M2 W7–8        | `stable-blocker`                    |
| DOC-04        | "Migrating a Fluent UI component from CSS to FMS"  | 2     | Med-Hard         | M2 W7–8        |                                     |
| PROM-INFRA-02 | Bundle-size fixtures                               | 6     | Easy             | M2 W8          | `stable-blocker`                    |
| PROM-INFRA-03 | Perf scenarios                                     | 6     | Med-Hard         | M3 W9–10       | ⭐ `marquee`                        |
| PROM-INFRA-04 | `isConformant.ts` adaptation                       | 6     | Medium           | M3 W9–10       | `stable-blocker`                    |
| MIG-08        | Avatar migration (#36133)                          | 3     | Med-Hard         | M3 W9          |                                     |
| REL-01        | Cleanup discipline audit                           | 7     | Med-Hard         | M3 W9          |                                     |
| REL-02        | Browser quirks audit                               | 7     | Medium           | M3 W9–10       |                                     |
| CHOR-05       | Reduced-motion strategy (proposal + impl)          | 4     | Med-Hard         | M3 W9–11       | `choreography-beta-blocker`, `a11y` |
| CHOR-04       | Combined Stagger + Sequence ergonomics review      | 4     | Medium           | M3 W10         | `api-input`                         |
| PROM-INFRA-05 | SSR safety verification                            | 6     | Medium           | M3 W10         | `stable-blocker`                    |
| PROM-INFRA-06 | Composition/interruption API freeze                | 6     | Hard             | M3 W10         | Robert-led, `stable-blocker`        |
| **PROM-FADE** | **Fade Stable readiness audit**                    | 6     | Med-Hard         | M3 W10         | ⭐ Proof-of-pattern, paired         |
| REL-03        | Error handling + degradation policy                | 7     | Medium           | M3 W10         |                                     |
| REL-04        | Motion state ↔ React state sync audit              | 7     | Med-Hard         | M3 W10         |                                     |
| MIG-09        | Tab indicator migration (#36134)                   | 3     | Hard             | M3 W10–11      | Decision point                      |
| PROM-COLLAPSE | Collapse Stable readiness audit                    | 6     | Medium           | M3 W11         | `stable-blocker`                    |
| PROM-SCALE    | Scale Stable readiness audit                       | 6     | Medium           | M3 W11         | `stable-blocker`                    |
| PROM-SLIDE    | Slide Stable readiness audit                       | 6     | Medium           | M3 W11–12      | `stable-blocker`                    |
| PROM-INFRA-07 | Internal stress test (bug bash substitute)         | 6     | Easy-Med         | M3 W11–12      |                                     |
| PROM-INFRA-08 | A11y review pattern + sweep                        | 6     | Medium           | M3 W11         | `stable-blocker`, `a11y`            |
| PROM-INFRA-09 | Motion-specific addendum to v9 checklist           | 6     | Easy-Med         | M3 W11         |                                     |
| REL-05        | Strict mode + concurrent rendering compat          | 7     | Medium           | M3 W11         |                                     |
| REL-06        | Defensive patterns + edge inputs                   | 7     | Easy-Med         | M3 W11         |                                     |
| MIG-10        | Spinner tail migration (#36135)                    | 3     | Hard             | M3 W11–12      | Paired                              |
| CHOR-06       | Apply Group 5 API changes to choreography          | 4     | Medium           | M3 W11+        | `choreography-beta-blocker`         |
| PROM-ROTATE   | Rotate Stable readiness audit                      | 6     | Medium           | M3 W12         | `stable-blocker`                    |
| PROM-BLUR     | Blur Stable readiness audit                        | 6     | Medium           | M3 W12         | `stable-blocker`                    |
| **CHOR-07**   | **Declare Beta in Motion System channel**          | 4     | Easy             | End M3         | Co-authored, `closing`              |
| PROM-REPORT   | Stable Readiness Report (consolidated)             | 6     | Easy             | End M3         | Co-authored, `closing`              |
| REL-07        | Reliability follow-up backlog                      | 7     | Easy             | End M3         | `closing`                           |
| STR-01        | Claude skill for FMS motion authoring              | 8     | Med-Hard         | Stretch M2–M3  | `growth`                            |
| STR-02        | Audit existing CSS motion → migration suggestions  | 8     | Medium           | Stretch M3     | `flywheel-output`                   |
| STR-03        | Audit components without motion → opportunities    | 8     | Med-Hard         | Stretch M3     | `flywheel-output`                   |
| STR-04        | AI-assisted motion PR review skill                 | 8     | Medium           | Stretch M3     |                                     |
| STR-05        | Story generation from product references           | 8     | Med-Hard         | Stretch M3+    |                                     |
| STR-06        | Synthesis: "AI motion workflow patterns" doc       | 8     | Easy-Med         | End M3+        | `closing`                           |

**Group 5 (API Improvements)** is intentionally absent from this table — items are deferred to M2 drafting. See Group 5 group description.

---

## What's already shipped — do not re-propose

This appendix catalogs work completed _before_ the UXE starts. Items here should not be re-proposed in Tier 2 GitHub issues. The UXE encounters this work during ONB-01 (read docs) and ONB-04 (code archaeology) — it's their starting baseline, not their backlog.

### Storybook documentation (recently shipped)

`@fluentui/react-motion` — new docs:

- `Motion/Introduction` — hero landing page explaining atomic motion (compose primitives: fade, scale, slide, rotate, blur)
  - `MotionIntroDemo` — live interactive demo
  - `MotionVsPresenceDemo` — `useMotion` vs. `createPresenceComponent` side-by-side with code
  - Design principles section (purposeful, accessible, performant, consistent)
- `Motion/Migration` — 656-line guide for migrating _consumer apps_ from Framer Motion / React Spring / CSS transitions to FMS. Comparison tables, pros/cons, before/after code.
- `Motion/MotionSlotAPI` — `MotionSlotDefault`, `MotionSlotCustomize`, `MotionSlotDisable` story sets with `.md` descriptions and `.tsx` implementations
- `Motion/PresenceMotionSlotAPI` — `PresenceMotionSlotDefault`, `PresenceMotionSlotCustomize`, `PresenceMotionSlotDisable` story sets
- Updated `react-motion` README — usage patterns, API overview, links to Storybook docs

`@fluentui/react-motion-components-preview` — new docs:

- `Motion/Components (preview)/Introduction`
  - `ComponentsGrid` — visual overview of all pre-built components (Collapse, Fade, Scale, etc.)
  - `InOutDemo` — live in/out toggle
  - `VariantsDemo` — interactive variant explorer
- `Motion/Components (preview)/Atoms`
  - `AtomsDemo` — interactive playground per atom (fade, scale, slide, rotate, blur)
  - `ComposingAtomsDemo` — composing multiple atoms (includes SpinBlur example)
- Updated `react-motion-components-preview` README — installation, usage, API reference

### Migrations from the migration plan — current status

Status of items in the [migration epic #36125](https://github.com/microsoft/fluentui/issues/36125):

- ✅ **#36126 ProgressBar** — Phase 1, indeterminate animation. Shipped via [#35883](https://github.com/microsoft/fluentui/pull/35883).
- ⏳ **#36127 Calendar** — Phase 1. Migration still needs to land; PR [#35666](https://github.com/microsoft/fluentui/pull/35666) is open.
- ⏳ **#36128 Spinner root** — Phase 2. Migration still needs to land; PR [#35882](https://github.com/microsoft/fluentui/pull/35882) is open.

Calendar (#36127) and Spinner root (#36128) are not committed UXE backlog items; they need to land regardless of UXE start (Robert-owned, or absorbed into the UXE backlog if still outstanding when the UXE is onboarded — decide at the time). The earliest "available" UXE pickup items in the migration plan are #36129 (Drawer, Phase 2) or #36130 (Skeleton, Phase 3 — locked as MIG-05 / ONB-06 first paired migration).

### FMS work currently in flight (not yet shipped)

The doc references the items below as if they are available; in fact they are open PRs and may or may not be merged by UXE start. Treat them as upcoming dependencies, not as shipped:

- ⏳ **`Sequence` choreography component** — PR [#35775](https://github.com/microsoft/fluentui/pull/35775), open since 2026-02-23. Group 4 (CHOR-02, CHOR-03, CHOR-04) assumes Sequence is available; if it has not landed by UXE start, those items either wait on it or absorb the remaining Sequence work.
- ⏳ **`replayKey` prop on motion components** — PR [#36108](https://github.com/microsoft/fluentui/pull/36108), open since 2026-05-06. Prerequisite for the Calendar migration PR [#35666](https://github.com/microsoft/fluentui/pull/35666); also relevant to Group 5 (interruption / replay semantics).

### Backlog items cut during planning (do not re-propose)

These were drafted then cut because the underlying work is already shipped or judged not worth UXE time:

- ~~DOC-02 (FMS architecture overview page)~~ — cut; already shipped as `Motion/Introduction`
- ~~DOC-03 ("Customizing motion" docs page)~~ — cut; already shipped as `Motion/MotionSlotAPI` / `PresenceMotionSlotAPI`
- ~~DOC-07 (`react-motion` README refresh)~~ — cut; already shipped
- ~~DOC-09 (Contributor architecture deep-dive)~~ — cut; UXE can read source; not justified by current friction

---

## Cross-reference index — dependency map

A directed graph of which items unblock which. Read as: _"this → enables that"_.

### The choreography → API → promotion spine

This is the critical narrative running through the whole plan. Without these dependencies, the 3-month story doesn't hang together.

```
CHOR-02 (5 scenarios) ─┐
CHOR-03 (stress catalog)├──→  Group 5 (API items drafted in M2)
CHOR-04 (ergonomics)   ─┘             │
                                       ▼
                              PROM-INFRA-06 (API freeze)
                                       │
                                       ▼
                              PROM-FADE → PROM-{COLLAPSE,SCALE,SLIDE,ROTATE,BLUR}
                                       │
                                       ▼
                              PROM-REPORT (closing)
                                       │
                                       ▼
                              CHOR-06 (apply API to choreography)
                                       │
                                       ▼
                              CHOR-07 (declare Beta)
```

### The onboarding → first-shipped artifact chain

```
ONB-01 ─┐
ONB-02  ├──→ ONB-03 ──→ ONB-06 = MIG-05 (Skeleton, first paired)
ONB-04  │             ├──→ MIG-06 (Nav, first solo family)
ONB-05 ─┘             └──→ MIG-07 (Focus border ×7, marquee)
                              │
ONB-07 ──→ DOC-01, DOC-10 (closes the docs loop)
```

### The Group 6 cross-cutting infra → per-component audit chain

```
PROM-INFRA-01–05, 07–09 ─┐
                          ├──→ PROM-FADE (proof-of-pattern, paired) ──→ PROM-{COLLAPSE,SCALE,SLIDE,ROTATE,BLUR}
PROM-INFRA-06 (API freeze)┘                                                       │
                                                                                   ▼
                                                                            PROM-REPORT (closing)
```

### The Group 7 reliability investigations → handoff chain

```
REL-01 (cleanup)        ─┐
REL-02 (browser quirks) ─┤
REL-03 (error handling) ─┼──→ REL-07 (Reliability follow-up backlog, handoff artifact)
REL-04 (state sync)     ─┤
REL-05 (strict mode)    ─┤
REL-06 (defensive)      ─┘

REL-04 ──→ may inform Group 5 API decisions (lifecycle/completion callbacks)
```

### The Group 8 stretch flywheel

```
STR-01 (authoring skill)         ┐
STR-04 (PR review skill)         ├──→ feed FMS team workflows
STR-05 (story-from-reference)    ┘
STR-02 (audit existing motion) ──→ Phase 6 of migration plan (next-cycle backlog)
STR-03 (audit no-motion)       ──→ motion opportunities backlog (next-cycle)
                                          │
STR-01–05 ──→ STR-06 (synthesis doc, closing artifact)
```

### Notable cross-group dependencies

| Item                                | Depends on                          | Reason                                                      |
| ----------------------------------- | ----------------------------------- | ----------------------------------------------------------- |
| MIG-05 (Skeleton)                   | ONB-02, ONB-03, ONB-04              | First paired migration; needs ramp                          |
| MIG-07 (Focus border ×7)            | MIG-05, MIG-06                      | Multi-atom + family discipline before scaling to 7          |
| MIG-10 (Spinner tail)               | #36128 (already merged)             | Phase 5 depends on Phase 2 merged work                      |
| CHOR-01                             | ONB-05, ONB-07                      | UXE needs Stable checklist context to propose Beta criteria |
| CHOR-02                             | CHOR-01 approved                    | Scenarios need exit criteria first                          |
| CHOR-04                             | CHOR-02 (3+ scenarios)              | Ergonomics review needs lived signal                        |
| CHOR-05 (reduced motion)            | CHOR-01, CHOR-02                    | Strategy applies to scenarios                               |
| CHOR-06                             | Group 5 items merged                | Apply Group 5 fixes to choreography                         |
| CHOR-07                             | CHOR-01 through CHOR-06             | Beta declaration is closing                                 |
| PROM-INFRA-06                       | Group 5 substantially complete      | API freeze needs proposed direction                         |
| PROM-FADE                           | Most PROM-INFRA-\* + PROM-INFRA-06  | Per-component audit needs scaffolding + API freeze          |
| PROM-{others}                       | PROM-FADE                           | Pattern established by Fade audit                           |
| PROM-REPORT                         | All PROM-\* per-component done      | Consolidates findings                                       |
| DOC-04 (maintainer migration guide) | ONB-04, ONB-06, 1–2 UXE migrations  | Needs lived migration experience                            |
| DOC-08 (recurring Q&A)              | ONB-01–07                           | UXE needs baseline fluency to answer publicly               |
| STR-04 (review skill)               | UXE has reviewed several motion PRs | Review skill needs pattern data                             |
| REL-07                              | All REL-\*                          | Aggregates deferred items                                   |

### Items that _don't_ have hard cross-group dependencies

These can pick up in parallel based on UXE bandwidth, without queueing on other items:

- ONB-01, ONB-02, ONB-03 (onboarding parallel reads)
- DOC-05 (slot customization audit — once UXE has source-tree fluency)
- DOC-10 (extend new docs based on ramp friction — captured during ramp)
- PROM-INFRA-01, PROM-INFRA-02 (early scaffolding, can run in M2)
- STR-\* (all stretch — opt-in by definition)
- REL-\* phase 1 audits (each independently)

---

(End of header content. Group 1 begins below.)

# 📦 Group 1 — Onboarding / Ramp-Up

**Label:** `area: onboarding`
**Sequencing:** All M1 (Weeks 1–2) — 2-week compressed ramp
**DoD:** Loose by design — these are exploratory ramp items. "Done" = a written-up artifact (a doc page, a notes Loop, a PR comment thread, a Storybook playground branch) shared with Robert. The artifact itself doubles as feedback for our docs.
**Theme:** _"The UXE's onboarding experience is itself a deliverable — every friction point they hit becomes a docs improvement."_

**Locked decisions:**

- 2-week ramp (compressed from 4 because UXE profile is C+D+E)
- Output artifacts feed downstream items (ONB-01 → DOC-01, ONB-04 reflection → DOC-04, ONB-07 retro → Group 2 priorities)
- ONB-06 first paired migration target = Skeleton (#36130) — same item as MIG-05; not a Phase 1 warmup since Phase 1 will already be done at UXE start

---

## ONB-01 — Read & annotate the Fluent Motion System core docs

**Description:** Read through the existing Fluent Motion System documentation — including the new pages Robert recently published (`Motion/Introduction`, `Motion/Migration`, `Motion/MotionSlotAPI`, `Motion/PresenceMotionSlotAPI`, the updated `react-motion` README, plus `Motion/Components (preview)/Introduction` and `Motion/Components (preview)/Atoms`). Annotate as you go: anything unclear, missing, or surprising for a senior UXE coming in fresh.

**Why it matters:** Establishes baseline mental model and produces the first batch of docs improvement signal. Annotations become DOC-01 and DOC-10 inputs.

- **Difficulty:** Easy
- **Dependencies:** None — this is the entry point
- **Sequencing:** M1 W1
- **Pairing:** Async; debrief with Robert at end of W1
- **Output:** A shared doc with annotations grouped by _unclear / missing / surprising / wrong_

---

## ONB-02 — Walk the Fluent Motion System source tree

**Description:** Spend focused time reading source for the 6 atomic motion components (Blur, Collapse, Fade, Rotate, Scale, Slide) and the choreography components (Stagger, Sequence). Sketch a mental map of: what each component renders, how `motionSlot` and `presenceMotionSlot` work, where the React lifecycle hooks attach, and how presence vs. atomic motion differ.

**Why it matters:** Source-reading is the fastest path to fluency for a C+D+E UXE. Output also becomes the seed for any future contributor architecture documentation.

- **Difficulty:** Easy-Medium
- **Dependencies:** ONB-01
- **Sequencing:** M1 W1–2
- **Pairing:** 1× walkthrough session with Robert mid-way; UXE drives, Robert answers questions
- **Output:** Architecture sketch shared with Robert (informal — diagram, notes, or written narrative)

---

## ONB-03 — Build a "Hello, FMS" Storybook playground

**Description:** In a local branch (no PR expected), build a Storybook story that uses each of the 6 atomic motion components at least once, plus Stagger and Sequence on a small list of items. No production polish — purpose is hands-on familiarity. Try customizing motion via `motionSlot` for at least one component.

**Why it matters:** First hands-on contact with the API surface. Friction encountered here directly informs DOC-10 and surfaces day-one API ergonomic feedback.

- **Difficulty:** Easy
- **Dependencies:** ONB-01, ONB-02
- **Sequencing:** M1 W2
- **Pairing:** Pair the first 30 minutes (Robert helps with environment setup), then UXE solo
- **Output:** Local branch + a written reflection on what was easy / confusing / surprising

---

## ONB-04 — Code archaeology: read a recently-merged migration PR

**Description:** Pick a recently-merged migration PR from Phase 1 or Phase 2 of the migration plan (likely #36126 ProgressBar or #36127 Calendar). Read the diff line-by-line, ask questions, write a short post-merge reflection covering: the migration pattern used, what changed structurally, what was non-obvious. Robert narrates decisions during a walkthrough.

**Why it matters:** Migrations are the UXE's most repeated activity in M2–M3. Reading a merged PR with a senior engineer narrating compresses ramp dramatically. Output seeds DOC-04 (the maintainer migration guide).

- **Difficulty:** Easy
- **Dependencies:** ONB-02 recommended
- **Sequencing:** M1 W2

# 📦 Group 2 — Documentation, Storybook, and Examples Improvements

**Label:** `area: docs`
**Sequencing:** Mostly M1–M2, with one recurring thread
**Default DoD applies** — except Storybook stories don't always need unit tests; "stories pass visual regression" replaces "unit tests" where applicable.
**Theme:** _"The UXE's onboarding friction becomes the next engineer's smooth path. Docs are real product and deserve real engineering rigor."_

**Locked decisions:**

- DOC-02 (architecture overview) cut — already shipped as `Motion/Introduction`
- DOC-03 (slot customization page) cut — already shipped as `Motion/MotionSlotAPI` / `PresenceMotionSlotAPI`
- DOC-07 (`react-motion` README refresh) cut — already shipped
- DOC-09 (contributor architecture deep-dive) cut — UXE can read source; not a budgeted item
- DOC-06 (choreography scenarios) moved to **CHOR-02** in Group 4
- DOC-04 (maintainer migration guide) renamed: "Migrating a Fluent UI component from CSS to FMS"
- DOC-10 (audit new docs based on UXE ramp friction) added

---

## DOC-01 — Address top-priority docs gaps from onboarding retrospective

**Description:** Take the prioritized docs improvement list produced in ONB-07 and ship the top 3–5 items. Likely targets (depends on UXE's actual annotations): unclear code examples, missing cross-links, stories that don't show failure modes, pages that assume context the UXE didn't have. With the new Storybook docs already shipped, the gaps are likely polish-level rather than foundational.

**Why it matters:** The strongest argument for docs work is that it has an identified consumer. ONB-07 _literally produces that list_. Shipping it within W3–4 makes the UXE's onboarding immediately compounding — every future contributor benefits.

- **Difficulty:** Easy-Medium
- **Dependencies:** ONB-07
- **Sequencing:** M1 W3–4 (early M2)
- **Pairing:** Async; Robert reviews each PR
- **Notes:** Ship as a series of small PRs, not one big one
- **Mode:** UXE-proposes-Robert-approved (UXE picks the top items and order; Robert sanity-checks before they invest)

---

## DOC-04 — "Migrating a Fluent UI component from CSS to FMS" maintainer guide

**Description:** Convert the migration-pattern reflection from ONB-04 (and lessons from ONB-06 and the UXE's first migrations) into a published guide. Audience: future Fluent UI maintainers migrating their own components from CSS animations to FMS. Distinct from the existing `Motion/Migration` page (which targets _consumers_ migrating _their app_ from Framer Motion / React Spring / CSS transitions). Cover: identifying CSS animation patterns in source, mapping to FMS components (atomic vs. presence), handling DOM-structure-breaking changes, the per-migration slot customization story requirement, the Stable promotion implications.

**Why it matters:** Migrations are the dominant FMS workstream and will outlast the UXE's tenure. Codifying the pattern means _anyone_ can drive a migration, not just FMS team members.

- **Difficulty:** Medium-Hard (needs to be concrete enough to be useful, abstract enough to apply broadly)
- **Dependencies:** ONB-04, ONB-06, plus 1–2 UXE-led migrations under their belt
- **Sequencing:** M2 W7–8 — after UXE has lived the pattern, not from theory
- **Pairing:** 1× review with Robert before publishing; consider sharing with shift / Dmytro for platform-side accuracy review
- **Mode:** UXE-driven

---

## DOC-05 — Per-component slot customization story audit

**Description:** Audit the 6 atomic motion components and Stagger/Sequence in Storybook for _component-level_ slot customization stories (distinct from the new `Motion/MotionSlotAPI` API-level stories). For each: confirm there's a customization story on the component's own page, that it's titled and located consistently, and that it demonstrates a realistic use case (not a toy). Add or improve where missing.

**Why it matters:** A motion component without a per-component customization example is arguably not "production ready." Audit reveals coverage gaps that should block Stable promotion. Cross-cutting version of what migrations already require per-component.

- **Difficulty:** Easy-Medium per story; the _audit_ itself is the planning step
- **Dependencies:** ONB-03 (familiarity); ideally happens _before_ product teams start asking "how do I customize Fade?"
- **Sequencing:** M2 W5–7, can happen in parallel with other docs work
- **Pairing:** Async; Robert reviews each PR
- **Notes:** Ship as one PR per component, not a single mega-PR
- **Mode:** UXE-driven; Stable-promotion adjacent
- **Tags:** `partner-pickup`, `stable-blocker`

---

## DOC-08 — Recurring: respond to product team motion questions in chat / GitHub

**Description:** Establish the UXE as an active responder for tactical product team motion questions (per JD L12). Channels: Fluent UI GitHub issue triage, motion-related Teams chats including the Motion System channel, cross-team consults from Teams/ODSP/Copilot engineers asking "how do I do X with FMS?" Robert remains escalation for strategic questions and design direction; UXE handles tactical patterns and "how do I" questions.

**Why it matters:** Two reasons: **scaling Robert** (currently many motion questions land on Robert; UXE can absorb the tactical layer) and **UXE growth into representation** (JD L15/L33 explicitly identifies "growing into representing the Motion System in broader forums" as a growth vector — tactical question answering is the entry point).

- **Difficulty:** Easy individually; recurring time commitment is the real cost
- **Dependencies:** ONB-01 through ONB-07 complete (need baseline fluency before answering for the team)
- **Sequencing:** Starts M2 W3; recurring through M3+
- **Pairing:** Robert is escalation; UXE posts answers and CCs Robert when uncertain
- **Mode:** Recurring
- **Notes:** Time-box ~2–3 hours/week initial allocation, growing over time. Worth tracking which questions recur so they become DOC-\* items proper.

---

## DOC-10 — Audit & extend new docs based on UXE ramp friction

**Description:** Specific to the _new_ pages Robert recently shipped (`Motion/Introduction`, `Motion/Migration`, `Motion/MotionSlotAPI`, etc.): as the UXE reads them during ONB-01, capture friction. Did the live demos make sense? Did the migration guide cover their actual prior-stack experience (likely Framer Motion or CSS, given the JD profile)? Were the slot API stories self-explanatory? Ship fixes as a series of small PRs.

**Why it matters:** The new pages haven't been pressure-tested by a fresh senior reader yet. The UXE is the ideal first audience. Treat their reactions as a free user study.

- **Difficulty:** Easy-Medium
- **Dependencies:** ONB-01 (signal source)
- **Sequencing:** Capture in M1 W1–2; ship fixes M1 W3–4 (folds together with DOC-01)
- **Pairing:** Async; Robert reviews
- **Mode:** UXE-proposed, Robert approves

---

## 📊 Group 2 summary

| ID     | Title                                             | Difficulty       | Sequencing     |
| ------ | ------------------------------------------------- | ---------------- | -------------- |
| DOC-01 | Address top docs gaps from ONB-07                 | Easy-Med         | M1 W3–4        |
| DOC-04 | "Migrating a Fluent UI component from CSS to FMS" | Med-Hard         | M2 W7–8        |
| DOC-05 | Per-component slot customization story audit      | Easy-Med         | M2 W5–7        |
| DOC-08 | Recurring product team Q&A support                | Easy (recurring) | M2 W3+ ongoing |
| DOC-10 | Audit & extend new docs from UXE ramp             | Easy-Med         | M1 W1–4        |

**Implicit narrative:** Close the onboarding loop (DOC-01, DOC-10) → audit and lift Storybook coverage (DOC-05) → codify the migration pattern (DOC-04) → become a community responder (DOC-08).

**Critical cross-references:**

- DOC-05 is a partial Stable-promotion blocker; referenced from Group 6.
- DOC-04 codifies the pattern that Group 3 (Migrations) executes.
- DOC-08 establishes relationships that feed CHOR-02 product-team designer reviews in Group 4.

**What's already shipped (do not re-propose):**

- `Motion/Introduction` (hero landing + `MotionIntroDemo` + `MotionVsPresenceDemo`)
- `Motion/Migration` (656-line guide for Framer Motion / React Spring / CSS transitions)
- `Motion/MotionSlotAPI` and `Motion/PresenceMotionSlotAPI` (Default / Customize / Disable story sets)
- `Motion/Components (preview)/Introduction` (`ComponentsGrid`, `InOutDemo`, `VariantsDemo`)
- `Motion/Components (preview)/Atoms` (`AtomsDemo`, `ComposingAtomsDemo` with SpinBlur example)
- Updated `react-motion` README
- Updated `react-motion-components-preview` README

# 📦 Group 3 — Component Migrations (CSS → Motion System)

**Label:** `area: migration`
**Sequencing:** M1 W2 → M2 → M3 (paired first, solo middle, paired finale)
**Default DoD applies** — plus migration-specific notes from migration plan:

- Visual parity verified against pre-migration baseline
- Reduced-motion compliance verified
- Keyboard navigation verified
- Cross-browser compat verified
- Storybook story demonstrating motion slot customization (per migration plan DoD)
- For breaking-change items: changefile reflects breaking change; migration note in changelog

**Theme:** _"Migrations are the UXE's most repeated activity. The first one is paired (Skeleton); migrations 2–3 establish solo cadence; the marquee is the focus border shared utility (×7 components); the finale is paired again."_

**Anchors:** [Epic #36125](https://github.com/microsoft/fluentui/issues/36125) · [Project board](https://github.com/orgs/microsoft/projects/1222) · [Migration plan](packages/react-components/CSS_ANIMATION_MIGRATION_PLAN.md)

**Locked decisions:**

- Phase 1 #36126 (ProgressBar) shipped; Phase 1 #36127 (Calendar) and Phase 2 #36128 (Spinner root) still need to land but are not committed UXE backlog items (Robert-owned, or absorbed if outstanding at UXE start)
- First paired migration is Skeleton (#36130, Phase 3) — chosen over Phase 1/2 because UXE is C+D+E and shouldn't be under-leveraged
- Marquee item is #36132 (focus border ×7) per JD L8 ("translate system concepts into reusable patterns")

---

## MIG-05 — Skeleton migration (#36130, paired) — also = ONB-06

**Description:** First UXE-driven migration. `::after` pseudo-element with wave (`translateX`) and pulse (`opacity`) animations → new `animationOverlay` slot (`<span>`), with `SkeletonWaveMotion` + `SkeletonPulseMotion`. Breaking DOM structure change. UXE drives the keyboard; Robert pairs synchronously across multiple sessions.

**Why it matters:** First shipped artifact. First exposure to multi-atom motion composition on a single slot, which is where composition gaps will surface. First migration involving breaking changes — UXE learns the breaking-change discipline (changefile, migration note, downstream impact analysis) on a bounded scope. Cross-references ONB-06.

- **Difficulty:** Medium-Hard
- **Dependencies:** ONB-02 through ONB-05 complete
- **Sequencing:** M1 W2 → M2 W3
- **Pairing:** ~3× synchronous sessions
- **Tags:** `partner-pickup`, `paired`

---

## MIG-06 — Nav selection indicator + icon migration (#36131)

**Description:** Indicator `::after` → real `<span>` slot wrapped with Fade; icon slot wrapped with presence component. DOM structure change across NavItem, NavCategoryItem, NavSubItem, AppItem.

**Why it matters:** First "family" migration — UXE makes consistent decisions across multiple sibling components. Mirrors the discipline they'll need for MIG-07 (focus border across 7 form components). Stepping stone to the marquee.

- **Difficulty:** Medium-Hard
- **Dependencies:** MIG-05 complete
- **Sequencing:** M2 W4–5
- **Pairing:** Light pair on family-consistency decisions; async on implementation
- **Tags:** `partner-pickup`

---

## MIG-07 — Focus border migration ×7 (#36132) — ⭐ MARQUEE

**Description:** The cross-cutting one. `::after` pseudo-element with `transform scaleX(0→1)` on `:focus-within` is _identical_ across 7 components today. Migration creates a **shared `FocusBorderMotion` utility**, converts `::after` to `<span>` ×7, adds `onFocus/onBlur` state management ×7. Components: Input, Textarea, Select, SpinButton, Combobox, Dropdown, TagPicker. Breaking DOM structure change ×7.

**Why it matters:** **The UXE's signature contribution to FMS.** Perfect senior-UXE problem: shared utility design, systems-thinking across 7 component touch points, breaking-change discipline at scale, real reusable pattern that informs future migrations. JD L8 ("translate system concepts into reusable patterns that scale across components and products") points directly here.

- **Difficulty:** Hard
- **Dependencies:** MIG-05 (multi-atom composition discipline), MIG-06 (family migration discipline)
- **Sequencing:** M2 W6–8 (~3 weeks)
- **Pairing:** Synchronous design conversation upfront on shared utility shape (~1 hr); paired review of the utility design (PR #1) before the 7 component PRs land
- **Strategy:** Default to splitting into **8 PRs** — 1 for the shared utility + 7 for the per-component conversions. Reduces review load and rollback risk. (To be confirmed before UXE starts.)
- **Tags:** `partner-pickup`, `paired` (utility design only)

---

## MIG-08 — Avatar active/inactive ring migration (#36133)

**Description:** `::before` (ring) and `::after` (shadow) with multi-property transitions (transform + margin + opacity). Convert to real `<span>` elements; `createPresenceComponent` with multi-atom composition.

**Why it matters:** Multi-atom composition in a real product context. Reinforces the composition patterns surfaced in MIG-05.

- **Difficulty:** Medium-Hard
- **Dependencies:** MIG-07 complete (utility-design experience helps here)
- **Sequencing:** M3 W9
- **Pairing:** Async; Robert reviews
- **Tags:** `partner-pickup`

---

## MIG-09 — Tab animated indicator migration (#36134)

**Description:** `::after` with CSS transition driven by _CSS custom properties_; convert to `<span>` and use `imperativeRef` to trigger animations programmatically on tab switch. The `imperativeRef` pattern is the deepest mechanic in the migration plan.

**Why it matters:** Tests whether the UXE can navigate FMS's lower-level imperative APIs. Genuinely Hard — could be UXE-led with deep pairing, or Robert-led with UXE contributing.

- **Difficulty:** Hard
- **Dependencies:** MIG-08 complete
- **Sequencing:** M3 W10–11
- **Pairing:** **Decide at the time:** if UXE is running strong through earlier migrations, UXE-led with synchronous pairing on the `imperativeRef` design; if not, Robert-led with UXE reviewing and contributing.
- **Tags:** `partner-pickup` _(provisional)_, `paired`

---

## MIG-10 — Spinner tail arc migration (#36135)

**Description:** `spinnerTail::before/::after` with coordinated conic-gradient arc animations using `animation:inherit`. Real `<span>` elements, arc motion components, coordinate with the already-merged root rotation (#36128).

**Why it matters:** Closes the Spinner migration loop. Highest-complexity item due to coordinated multi-element animation with shared timing inheritance. Likely paired throughout.

- **Difficulty:** Hard
- **Dependencies:** MIG-09 ideally complete first; #36128 (Spinner root) already merged
- **Sequencing:** M3 W11–12
- **Pairing:** Likely paired throughout
- **Tags:** `partner-pickup` _(provisional)_, `paired`

---

## 📊 Group 3 summary

| ID         | GitHub                     | Difficulty   | Sequencing        | Marquee?                       |
| ---------- | -------------------------- | ------------ | ----------------- | ------------------------------ |
| **MIG-05** | **#36130 Skeleton**        | **Med-Hard** | **M1 W2 → M2 W3** | ⭐ **First paired (= ONB-06)** |
| MIG-06     | #36131 Nav                 | Med-Hard     | M2 W4–5           | First family                   |
| **MIG-07** | **#36132 Focus border ×7** | **Hard**     | **M2 W6–8**       | ⭐ **Marquee**                 |
| MIG-08     | #36133 Avatar rings        | Med-Hard     | M3 W9             |                                |
| MIG-09     | #36134 Tab indicator       | Hard         | M3 W10–11         | Decision point                 |
| MIG-10     | #36135 Spinner tail        | Hard         | M3 W11–12         | Paired                         |

**Critical narrative:** The migration arc _is_ the UXE's growth arc. Start paired (MIG-05), establish solo cadence (MIG-06), peak at the shared-utility design (MIG-07), and close with paired work on the deepest mechanics (MIG-09, MIG-10). Six migrations total; ~14 components touched; one reusable utility designed; breaking changes navigated at scale; fluency built with FMS's lower-level APIs.

**Critical cross-references:**

- MIG-05, MIG-08 likely surface composition gaps → input to **Group 5 (API Improvements)**
- All migrations validate motion components in real product use → input to **Group 6 (Stable Promotion)** ("validated in a real product" criterion)
- Per-component slot customization stories (per migration DoD) → input to **DOC-05** (slot customization audit)

**Decisions to confirm before UXE starts:**

- MIG-07 PR strategy (8 PRs vs. grouped) — defaulted to 8 PRs
- MIG-09 / MIG-10 paired-or-not — defaulted to "decide at the time"
- Whether to add a recurring "migration plan stewardship" item — defaulted to no

# 📦 Group 4 — Choreography Beta Milestone

**Label:** `area: choreography`
**Sequencing:** M2 W5+ → M3+
**Default DoD applies** — plus choreography-specific:

- Each scenario is _product-grounded_ (not abstract)
- Storybook story published with `.md` description and `.tsx` implementation
- Composition behavior tested under interruption (cancel/reverse/replace)
- Reduced-motion compliance verified (scenarios have meaningful reduced-motion fallbacks)
- Scenario serves dual purpose: documentation artifact + composition stress test
- Cross-link to surfaced API gaps (Group 5)

**Theme:** _"Choreography Beta is reached when realistic, product-grounded scenarios prove the feature set and validate the API design under interruption and composition. The work doubles as documentation, stress test, and the trigger for Group 5 API improvements."_

**Key reframe:** "Beta" here is **informal/internal** — a readiness milestone Robert defines, not a Fluent v9 package state. Exit criteria are Robert's call; UXE proposes them.

**Locked decisions:**

- 5 foundation scenarios (CHOR-02), with scenario 5 acceptable to slip into early M3
- Scenario list deferred to UXE discovery (CHOR-01 expanded to include "propose 5 scenarios")
- Stagger and Sequence ergonomics reviews merged into **one** combined review (CHOR-04), preceded by per-scenario notes during CHOR-02
- Reduced-motion strategy: UXE proposes, Robert decides (CHOR-05)
- Casey for design direction; product-team designers for per-scenario surface realism (two-layer design input)
- Beta declaration: co-authored, broader Microsoft audience, Motion System Teams channel

---

## CHOR-01 — Define Beta exit criteria + propose 5 scenarios (Robert-owned, UXE proposes)

**Description:** Author a short, decision-oriented doc defining what "choreography Beta" _means_: which composition behaviors must work cleanly, what API stability bar Stagger/Sequence must hit, what consumer feedback we need, **and which 5 product-grounded scenarios prove it out.** UXE drives discovery: brief 1:1s with Casey + 2–3 product engineers across surfaces (Teams, ODSP, Copilot) to surface real motion needs. UXE produces a proposal; Robert + Casey approve.

**Why it matters:** Without explicit exit criteria, "Beta" is forever-aspirational. With criteria, the UXE has something concrete to drive toward, and Robert has a clear "are we there yet?" gate. Scenario discovery doubles as cross-team relationship building (JD L18).

- **Difficulty:** Medium (UXE draft); Hard (Robert decision)
- **Dependencies:** ONB-05, ONB-07
- **Sequencing:** M2 W5–6
- **Pairing:** 1× discussion with Robert + Casey before drafting; final approval gate after
- **Mode:** Robert-owned; UXE proposes; Casey co-approves
- **Output:** ~1-page doc listing (a) ~5 product-grounded scenarios, (b) composition/interruption behaviors that must hold, (c) API stability commitments, (d) "we know we're done when…" criteria

---

## CHOR-02 — 5 foundation scenarios (was DOC-06)

**Description:** Build the 5 Storybook stories defined in CHOR-01, demonstrating Stagger and Sequence in realistic, product-grounded scenarios. Each story is a documentation artifact, a composition stress test, and a candidate for Beta exit criteria's "must work" set. Each PR includes brief ergonomics notes (PR description or linked doc) capturing what was easy / awkward / surprising about Stagger/Sequence usage in that scenario.

**Why it matters:** Per Q1, choreography Beta is _proven out by realistic scenarios_. These stories are the proof. They're also where composition/interruption gaps surface most visibly — feeding Group 5.

- **Difficulty:** Medium-Hard (design judgment + technical depth)
- **Dependencies:** CHOR-01 approved
- **Sequencing:** M2 W6 → M3 W9 (~1 scenario every ~10 days; scenario 5 can slip into M3)
- **Pairing:** Per scenario: 1× design conversation with Casey (system-level coherence) + 1× consult with that scenario's product-team designer (surface realism)
- **Mode:** UXE-driven; Casey + product-team designer review for design; Robert + Fluent UI maintainers review for code
- **Strategy:** Ship one scenario at a time (PR per scenario)
- **Tags:** `partner-pickup`, `choreography-beta-blocker`

---

## CHOR-03 — Composition stress test catalog

**Description:** Build a focused Storybook story (or test fixture) that _intentionally stresses_ composition: Stagger inside Sequence, multiple atomic motions on the same element, interrupting an in-flight Stagger mid-execution, replacing a Sequence with a different one mid-execution. Not a polished product scenario — a deliberate corner-case explorer. Output: a "composition issues catalog" doc — list of behaviors + repro link to each stress-test story. Each entry feeds an item in Group 5.

**Why it matters:** CHOR-02 surfaces composition issues _organically_. CHOR-03 surfaces them _systematically_. Output is a _catalog of known issues_ that anchors Group 5 item drafting.

- **Difficulty:** Medium (coding is straightforward; value is in observing failure modes)
- **Dependencies:** ONB-03; ideally CHOR-02 first scenario landed
- **Sequencing:** M2 W7–8, in parallel with CHOR-02
- **Pairing:** Async; weekly check-in on observed issues
- **Mode:** UXE-driven
- **Tags:** `partner-pickup`, `choreography-beta-blocker`, `api-input`

---

## CHOR-04 — Combined Stagger + Sequence ergonomics review

**Description:** Consolidate per-scenario ergonomics notes (captured during CHOR-02) into a single review document covering both Stagger and Sequence. Audit: per-child motion override, conditional sequencing, dynamic child counts, server-rendered children, per-step timing, branching, cancellation/replacement semantics, completion callbacks, type ergonomics. Output: review doc + concrete API change proposals (kept / changed / removed).

**Why it matters:** Beta = API design validated. Validation requires lived consumer experience (CHOR-02). CHOR-04 is the _write-up_, distilled into actionable API decisions feeding Robert's CHOR-01 final criteria and Group 5 item drafting. Combined Stagger+Sequence review reflects how the two components are actually used (compositionally).

- **Difficulty:** Medium
- **Dependencies:** CHOR-02 with at least 3–4 scenarios landed (ideally including Sequence-heavy and Stagger-inside-Sequence scenarios)
- **Sequencing:** M3 W10
- **Pairing:** 1× synchronous review with Robert (~1 hr) — Robert is final decision-maker on API direction
- **Mode:** UXE-driven; Robert decides
- **Output:** Ergonomics review doc + proposed API changes (input to Group 5)
- **Tags:** `partner-pickup`, `api-input`

---

## CHOR-05 — Reduced-motion strategy for choreography (UXE-proposed, Robert-decided)

**Description:** Two phases. **Phase 1 (analysis):** UXE produces a proposal doc analyzing options — collapse to instantaneous / collapse to a quick fade / preserve sequencing with compressed timing / per-scenario configurable. Robert reviews and decides which strategy to adopt. **Phase 2 (implementation):** UXE implements the chosen strategy across CHOR-02 scenarios; updates docs.

**Why it matters:** Reduced-motion compliance is on the v9 Stable checklist _and_ in the Default DoD. Choreography components have unique reduced-motion semantics — sequencing has meaning. Beta exit criteria should include a defined, documented reduced-motion strategy.

- **Difficulty:** Medium-Hard
- **Dependencies:** CHOR-01 (criteria mention this), CHOR-02 (scenarios to apply it to); benefits from CHOR-04 observations
- **Sequencing:** M3 W9–10 (analysis), W10–11 (implementation), in parallel with CHOR-04
- **Pairing:** 1× decision conversation between Phase 1 and Phase 2 (~1 hr)
- **Mode:** UXE-proposes; Robert decides; UXE implements
- **Tags:** `partner-pickup`, `choreography-beta-blocker`, `a11y`

---

## CHOR-06 — Apply Group 5 API changes to choreography components

**Description:** Once Group 5 (API Improvements) lands the composition/interruption fixes, integrate them into Stagger and Sequence. Update CHOR-02 scenarios to use new APIs. Verify the issues from CHOR-03 catalog are resolved. This item is the _closing of the loop_ — choreography surfaced the gaps, API improvements fixed them, choreography validates the fixes.

**Why it matters:** Without this step, the API improvements are theoretical. With it, the UXE gets to _demonstrate_ that choreography Beta is reached: scenarios work, composition is clean, interruption is graceful, catalog of known issues is empty (or down to acceptable residuals).

- **Difficulty:** Medium (integration work, not green-field design)
- **Dependencies:** Group 5 items merged (specifically composition/interruption API work)
- **Sequencing:** M3 W11+ (depends on Group 5 timing)
- **Pairing:** Async; Robert reviews
- **Mode:** UXE-driven
- **Tags:** `partner-pickup`, `choreography-beta-blocker`

---

## CHOR-07 — Declare choreography Beta in Motion System Teams channel (co-authored)

**Description:** Co-authored channel post in the Motion System Teams channel. UXE drafts the full post end-to-end (technical summary + first pass at strategic framing). Robert reviews, edits the strategic framing, adds his voice. Final post shipped under both names. Audience: Fluent UI maintainers, motion-curious engineers across M365, design leads, M365 product teams. Post invites teams to start adopting choreography and directs them to the channel for questions (feeding DOC-08).

**Why it matters:** Closes the loop publicly. Signals that choreography is ready for broader internal adoption. Co-authorship signals team growth (FMS is now two people). Per JD L15/L33, the UXE's growth-toward-representation arc starts _here_, with Robert as a safety net. Sets up the eventual Stable promotion announcement (out of scope) to be UXE-led.

- **Difficulty:** Easy (closing ceremony)
- **Dependencies:** CHOR-01 through CHOR-06 complete
- **Sequencing:** End of M3
- **Mode:** Co-authored: Robert + UXE
- **Output:** Channel post; updated docs reflecting Beta status

---

## 📊 Group 4 summary

| ID      | Title                                                  | Difficulty                  | Sequencing    | Mode                                              |
| ------- | ------------------------------------------------------ | --------------------------- | ------------- | ------------------------------------------------- |
| CHOR-01 | Define Beta exit criteria + propose 5 scenarios        | Med (draft) / Hard (decide) | M2 W5–6       | Robert-owned; UXE proposes; Casey co-approves     |
| CHOR-02 | 5 foundation scenarios + per-scenario ergonomics notes | Med-Hard                    | M2 W6 → M3 W9 | UXE-driven; Casey + product-team designer reviews |
| CHOR-03 | Composition stress test catalog                        | Medium                      | M2 W7–8       | UXE-driven                                        |
| CHOR-04 | Combined Stagger + Sequence ergonomics review          | Medium                      | M3 W10        | UXE-driven; Robert decides                        |
| CHOR-05 | Reduced-motion strategy (proposal + implementation)    | Med-Hard                    | M3 W9–11      | UXE-proposed; Robert decides                      |
| CHOR-06 | Apply Group 5 API changes to choreography              | Medium                      | M3 W11+       | UXE-driven                                        |
| CHOR-07 | Declare Beta in Motion System channel                  | Easy                        | End M3        | Co-authored: Robert + UXE                         |

**Critical narrative:** Define what done looks like (CHOR-01) → build evidence with two-layer design input (CHOR-02) → catalog gaps systematically (CHOR-03) → distill API decisions (CHOR-04) → solve a11y (CHOR-05) → integrate Group 5 fixes (CHOR-06) → declare done in the Motion System channel (CHOR-07).

**This group is the lynchpin.** The Q1 framing — _"choreography is the forcing function for Stable promotion"_ — manifests here:

```
CHOR-02 scenarios → CHOR-03 catalog → Group 5 API fixes → CHOR-06 integration
                                          ↓
                Motion components' API surface settles → Group 6 Stable promotion readiness
```

Without Group 4, Group 5 has no concrete input and Group 6 has no API stability rationale. This is the spine.

# 📦 Group 5 — API Improvements (Composition & Interruption)

**Label:** `area: api`
**Status:** ⏳ **Thin scaffolding — items deferred to M2.**

**Anchor problem:** Composition & interruption gaps surfaced from real usage. Atomic motions don't compose cleanly when nested; in-flight motion interruption produces glitches; no clean cancel/reverse semantics; reduced-motion fallbacks don't compose well.

**Why this group exists:** API stability is a **formal gate** for motion components' Stable promotion. Per the Fluent v9 Stable release criteria, `_unstable` suffixes cannot be removed until the next major version — meaning any composition/interruption API surface that should ship in stable v9 APIs needs to land _before_ promotion. This group is the API-freeze-readiness workstream.

**Why items aren't drafted yet:** API direction shouldn't be pre-designed without real signal. **Group 4 surfaces the signal** — CHOR-02 scenarios reveal organic composition issues, CHOR-03 stress test catalogs them systematically, and CHOR-04 ergonomics review distills them into proposed API changes. **Group 5 items will be authored in M2 once that signal exists**, with Robert leading direction and the UXE contributing prototypes and proposals.

**Locked decision:** Tier 1 doc holds Group 5 as scaffolding only — no detailed items pre-drafted. Items get authored _with_ the UXE in M2 when signal exists.

**Expected shape (rough — to be refined when items are authored):**

- Composition primitives (timing context, child-motion overrides, nested-motion semantics)
- Interruption semantics (cancel, reverse, replace, in-flight cleanup)
- Reduced-motion composition (per Q8: pattern is mature, but composition story may need work)
- Lifecycle / completion callbacks (when motion is "really done" vs. visually settled)

**Sequencing (rough):**

- Items drafted M2 W7–8 (after CHOR-03 catalog has begun)
- Implementation runs M3 W9–11
- Integration via CHOR-06 closes the loop

**Mode:** Robert leads API design direction; UXE prototypes options, contributes proposals, implements decided direction.

**Tags expected:** `area: api`, `stable-blocker` (for items gating motion-component Stable promotion), `partner-pickup` (for implementation items).

**Dependencies:**

- **CHOR-03** (composition stress test catalog) — provides the issue inventory
- **CHOR-04** (ergonomics review) — provides the prioritized API change proposals

**Output of this group feeds:**

- **CHOR-06** (apply Group 5 API changes to choreography)
- **PROM-INFRA-06** (motion-component API freeze) → Group 6 Stable promotion readiness

---

**Note for the UXE reading this:** This group is intentionally undefined right now. Treat it as a workstream you'll co-author with Robert in M2, informed by what CHOR-03 and CHOR-04 surface. The empty placeholder is a feature, not a gap.

# 📦 Group 6 — Beta → Stable Promotion Readiness

**Label:** `area: promotion`
**Sequencing:** Phase A (cross-cutting infra) M2–M3 ongoing → Phase B (per-component audits) M3 w10–12
**Scope:** Prepare all 6 motion components (Blur, Collapse, Fade, Rotate, Scale, Slide) for Stable promotion per the Fluent v9 Stable release criteria. Promotion _publication_ is **out of scope** and deferred to a later cycle. Closing deliverable: a "Stable Readiness Report" per component plus a consolidated summary.

**Default DoD applies** — plus promotion-specific DoD additions per item where relevant.

**Theme:** _"We're not promoting. We're getting to a state where promotion is a paperwork step, not an engineering risk."_

**Locked decisions from clarifying questions:**

- **Structure:** Hybrid — cross-cutting infra items handle gates that batch well; light per-component audits handle gates needing per-component judgment.
- **In-scope:** 0 components publish to Stable in this 3-month window. Deliverable is a fully prepped Stable surface; the publish moment defers to a later cycle.
- **Bug bash:** Internal stress test (~2 weeks, FMS team + 2–3 trusted reviewers) substitutes for formal v9 bug bash. Formal US/EU rounds defer to publish.
- **API freeze:** Robert-led; UXE contributes via Group 5 prototypes and CHOR-04 ergonomics review.
- **Per-component audits:** Six separate items (one per component) for board visibility.
- **Audit sequencing:** Fade first as proof-of-pattern (paired), remaining five run in parallel after pattern is settled.

---

## Phase A — Cross-cutting infrastructure

UXE-driven, runs throughout M2–M3, can run in parallel with Group 4. Most are partner-pickup; one (API freeze) is Robert-led.

---

### PROM-INFRA-01 — VR test scaffolding for `react-motion` package

**Description:** Set up visual regression test scaffolding in `vr-tests-react-components` covering all 6 motion components' visual states (idle, in-progress, completed, reduced-motion, RTL). Scaffolding once; per-component stories added as part of audits.

**Why it matters:** v9 checklist requires VR coverage. Motion components need different VR patterns than leaf components (capturing keyframes vs. final state); scaffolding has to be designed before per-component VR stories can land.

- **Difficulty:** Medium-Hard
- **Sequencing:** M2 w7–8
- **Tags:** `partner-pickup`, `stable-blocker`

---

### PROM-INFRA-02 — Bundle-size fixtures for all motion components

**Description:** Add `bundle-size/<Name>.fixture.js` for Blur, Collapse, Fade, Rotate, Scale, Slide. Establishes baseline bundle budgets per component. Mechanical work; batches well.

**Why it matters:** v9 checklist requires bundle-size fixtures. Per-component baselines also produce signal on whether the motion-component implementation has unjustified weight.

- **Difficulty:** Easy
- **Sequencing:** M2 w8 (single PR covering all 6)
- **Tags:** `partner-pickup`, `stable-blocker`

---

### PROM-INFRA-03 — Perf scenarios for all motion components

**Description:** Add scenarios in `perf-test-react-components` covering each motion component's typical and stressed usage (single instance, many instances, rapid mount/unmount, interruption mid-animation). Motion is uniquely sensitive to perf — this scaffolding produces the data that informs perf budget discussions.

**Why it matters:** v9 checklist requires perf scenarios. The JD calls out perf twice (L11, L23) as a UXE specialty — this is where the C-from-Q11 strength shines. Marquee partner work, not hygiene.

- **Difficulty:** Medium-Hard
- **Sequencing:** M3 w9–10
- **Tags:** `partner-pickup`, `stable-blocker`, `marquee`

---

### PROM-INFRA-04 — `isConformant.ts` adaptation for motion components

**Description:** Run all 6 motion components through `testing/isConformant.ts`. Motion components wrap children rather than render leaf DOM, so conformance assertions may need adjustment. Either fix the components, fix the conformance assertions, or document accepted exceptions.

**Why it matters:** Conformance is a v9 checklist gate. Motion components are non-trivial here precisely because they're not leaf components — discovery work, not just mechanical execution.

- **Difficulty:** Medium (could surface real issues)
- **Sequencing:** M3 w9–10
- **Tags:** `partner-pickup`, `stable-blocker`

---

### PROM-INFRA-05 — SSR safety verification for motion components

**Description:** Verify all 6 motion components render without errors in SSR environments. Add SSR test coverage where missing. Motion components touching `window` / `document` need to gate behind `useFluent_unstable()` or `canUseDOM()` per v9 architecture rules.

**Why it matters:** SSR safety is a v9 checklist gate. Motion components are at risk here since animation APIs touch the DOM.

- **Difficulty:** Medium
- **Sequencing:** M3 w10
- **Tags:** `partner-pickup`, `stable-blocker`

---

### PROM-INFRA-06 — Composition/interruption API freeze (Robert-led)

**Description:** Final review and lock of the composition/interruption API surface for v9 stable. Reviews Group 5 outputs, CHOR-04 ergonomics proposals, and prototype results. Robert decides what becomes stable API, what stays `_unstable`, what gets deprecated. Output: an updated `.api.md` and a freeze decision doc.

**Why it matters:** **Highest-stakes gate in the group.** `_unstable` suffixes can't be removed until next major version, so this freeze is a v9-lifetime commitment.

- **Difficulty:** Hard (decision-heavy, not coding-heavy)
- **Sequencing:** M3 w10
- **Mode:** Robert-led
- **Tags:** `stable-blocker` — **NOT** `partner-pickup`

---

### PROM-INFRA-07 — Internal stress test (substitute for formal bug bash)

**Description:** Two-week internal stress test where the FMS team plus 2–3 trusted reviewers (e.g., shift, Dmytro, a Teams or ODSP engineer using FMS in a real product) actively use the prepped motion components in development. Issues are filed, triaged, and addressed during the test period. Captured as a single workstream item.

**Why it matters:** Substitute for the formal v9 bug bash, which is deferred to publish. Produces real consumer signal on the prepped surface before the readiness report finalizes.

- **Difficulty:** Easy-Medium per UXE; coordination-heavy
- **Sequencing:** M3 w11–12
- **Tags:** `partner-pickup`
- **Note:** Readiness report explicitly notes "formal v9 bug bash (US + EU rounds) deferred to publish cycle."

---

### PROM-INFRA-08 — Manual a11y review pattern + sweep across all 6 components

**Description:** Author a per-component a11y review checklist (NVDA, JAWS, VoiceOver, high contrast, RTL, keyboard navigation, reduced-motion), then run all 6 motion components through it. Output is per-component a11y status notes that feed the per-component readiness audits in Phase B.

**Why it matters:** Manual a11y review is a v9 checklist gate. Motion components have unique a11y considerations (reduced-motion semantics especially).

- **Difficulty:** Medium (judgment-heavy; AT testing has friction)
- **Sequencing:** M3 w11
- **Tags:** `partner-pickup`, `stable-blocker`, `a11y`

---

### PROM-INFRA-09 — Motion-specific addendum to v9 Stable checklist

**Description:** Author a short doc capturing motion-component-specific gates not in the standard v9 checklist: reduced-motion compliance, composition/interruption behavior verified, perf under animation load, choreography integration verified. Lives alongside the checklist Robert compiled.

**Why it matters:** Future motion components (or future promotions) need this addendum. Codifies tribal knowledge.

- **Difficulty:** Easy-Medium (writing)
- **Sequencing:** M3 w11
- **Mode:** UXE-driven, Robert reviews
- **Tags:** `partner-pickup`

---

## Phase B — Per-component readiness audits

UXE-driven, M3 w10–12. Each item is a structured pass through the v9 checklist for that component, using outputs from Phase A. Produces a per-component readiness report.

---

### PROM-FADE — Fade Stable readiness audit (proof-of-pattern, paired)

**Description:** First audit. Runs Fade through the full v9 checklist using Phase A scaffolding. Produces (a) Fade's readiness report, (b) the **audit pattern doc** that the remaining 5 audits will follow, (c) a per-component "what's left" list if anything is incomplete.

**Why it matters:** Fade is the most-validated motion component (heavy migration consumer use). Auditing it first produces the cleanest signal on whether the audit approach works. The pattern doc that comes out of this is reused 5 times.

- **Difficulty:** Medium-Hard (first time through, no template)
- **Dependencies:** PROM-INFRA-01 through PROM-INFRA-09 sufficiently complete; PROM-INFRA-06 (API freeze) must be done
- **Sequencing:** M3 w10
- **Pairing:** Robert pairs on kickoff (~1 hr) and closing report review (~1 hr)
- **Tags:** `partner-pickup`, `paired`, `stable-blocker`

---

### PROM-COLLAPSE — Collapse Stable readiness audit

**Description:** Second audit, applies Fade's pattern to Collapse. Solo, async.

- **Difficulty:** Medium
- **Dependencies:** PROM-FADE complete (pattern established)
- **Sequencing:** M3 w11
- **Tags:** `partner-pickup`, `stable-blocker`

---

### PROM-SCALE — Scale Stable readiness audit

**Description:** Same pattern. Solo, async.

- **Difficulty:** Medium
- **Dependencies:** PROM-FADE complete
- **Sequencing:** M3 w11
- **Tags:** `partner-pickup`, `stable-blocker`

---

### PROM-SLIDE — Slide Stable readiness audit

**Description:** Same pattern. Solo, async.

- **Difficulty:** Medium
- **Dependencies:** PROM-FADE complete
- **Sequencing:** M3 w11–12
- **Tags:** `partner-pickup`, `stable-blocker`

---

### PROM-ROTATE — Rotate Stable readiness audit

**Description:** Same pattern. Solo, async.

- **Difficulty:** Medium
- **Dependencies:** PROM-FADE complete
- **Sequencing:** M3 w12
- **Tags:** `partner-pickup`, `stable-blocker`

---

### PROM-BLUR — Blur Stable readiness audit

**Description:** Same pattern. May be the _least_-validated component (Blur has fewer migration consumers); the audit may produce a "needs more validation before publish" finding — that's an expected outcome.

- **Difficulty:** Medium
- **Dependencies:** PROM-FADE complete
- **Sequencing:** M3 w12
- **Tags:** `partner-pickup`, `stable-blocker`

---

## Closing artifact

### PROM-REPORT — Stable Readiness Report (consolidated)

**Description:** Consolidates the 6 per-component reports into a single document. Per-component readiness state, what's pending, what's recommended for the publish cycle. Includes notes: "Formal bug bash deferred," "API freeze settled at <date>," "Recommended publish order."

**Why it matters:** Handoff artifact. Anyone (Robert, the UXE in their next cycle, a future contributor) can pick this up and execute publish from it.

- **Difficulty:** Easy (consolidating; not new findings)
- **Sequencing:** End of M3
- **Mode:** Co-authored, Robert + UXE
- **Tags:** Robert-led closing

---

## 📊 Group 6 summary

| Phase                              | Count        | Notes                                                    |
| ---------------------------------- | ------------ | -------------------------------------------------------- |
| **Phase A — Cross-cutting infra**  | 9 items      | UXE-driven (8); Robert-led (1, the API freeze)           |
| **Phase B — Per-component audits** | 6 items      | Fade is paired proof-of-pattern; rest are solo, parallel |
| **Closing**                        | 1 item       | Consolidated readiness report                            |
| **Total**                          | **16 items** |                                                          |

**Critical narrative:**

> Build infra (Phase A) → freeze API (PROM-INFRA-06) → audit one component as proof (PROM-FADE) → audit remaining five in parallel → consolidated readiness report.
>
> End state: motion components positioned for promotion; publish is paperwork in a later cycle.

**Cross-references:**

- **Group 4 (Choreography)** → CHOR-04 ergonomics review feeds PROM-INFRA-06 API freeze
- **Group 5 (API Improvements)** → must be substantially complete before PROM-INFRA-06 can finalize
- **Group 3 (Migrations)** → migration consumers provide "validated in a real product" coverage referenced in per-component audits
- **Group 7 (Perf, reliability, a11y)** → PROM-INFRA-03 (perf) and PROM-INFRA-08 (a11y) overlap; will dedupe when Group 7 is drafted

# 📦 Group 7 — Reliability & Quality Hardening

**Label:** `area: reliability`
**Sequencing:** Mostly M3 W9–12; some items can start earlier if signal surfaces from migrations
**Default DoD applies** — plus reliability-specific DoD additions:

- Findings report produced (per item) regardless of whether fixes land
- In-scope/deferred split documented and reviewed by Robert before fixes are scoped
- Deferred items land in the closing "Reliability follow-up backlog"

**Theme:** _"Reliability is found, not designed. Six investigations across known concern areas; small fixes land in scope, large fixes are documented and deferred."_

**Scope sharpening (locked):** Group 7 is **reliability**, not perf or a11y. Perf scaffolding is in **Group 6 (PROM-INFRA-03)**; a11y review pattern + sweep is in **Group 6 (PROM-INFRA-08)**; choreography reduced-motion is in **Group 4 (CHOR-05)**. This group covers what's left after those claim their territory: cleanup discipline, browser quirks, error handling, state synchronization, concurrent/strict-mode compatibility, and defensive patterns.

**Locked decisions:**

- All 6 reliability concerns (A–F from Q2) become items
- Investigation depth: audit-and-fix small; audit-and-defer large (Option B)
- Items default to two phases: (1) audit + findings report; (2) fix what's small / defer what's big
- Closing artifact: aggregated "Reliability follow-up backlog" hand-off

---

## REL-01 — Cleanup discipline audit

**Description:** Investigate FMS's cleanup behavior across the lifecycle: when a component using a motion is unmounted mid-animation, are WAAPI animations cancelled cleanly? Are timers/refs cleared? Are listeners detached? Audit the 6 motion components, presence components, Stagger, and Sequence. Produce a findings report. Land small fixes (e.g., missing `useEffect` cleanup returns, missed `cancel()` calls) in scope. Defer large fixes (e.g., systemic cleanup pattern refactor) to follow-up.

**Why it matters:** Long-lived apps like Teams accumulate cleanup debt. Memory leaks, console warnings about state updates on unmounted components, and weird interactions all stem from cleanup gaps. The Stable readiness story is weaker if cleanup discipline is unaudited.

- **Difficulty:** Medium-Hard (audit requires reading lifecycle code carefully)
- **Sequencing:** M3 W9
- **Tags:** `partner-pickup`
- **Phase 1 output:** Findings report; in-scope fixes list; deferred items list
- **Phase 2 output:** PRs for in-scope fixes

---

## REL-02 — Browser quirks and edge-case compatibility audit

**Description:** Investigate FMS behavior across browsers and platforms. Targets: Safari (WAAPI quirks), Firefox (`prefers-reduced-motion` differences), Chrome (compositor offloading edge cases), mobile WebViews especially in Teams clients. Cross-reference against any existing bug reports. Audit by running a representative set of motions across all targets, capturing observed inconsistencies. Land small workarounds in scope (e.g., a feature-detection guard, a workaround for a specific Safari quirk). Defer larger compatibility refactors.

**Why it matters:** FMS ships to consumers across the entire M365 surface, including Teams desktop's older WebView contexts. Cross-browser correctness is a Stable promotion implicit gate, even though the v9 checklist doesn't enumerate it explicitly.

- **Difficulty:** Medium (testing burden is real; analysis is moderate)
- **Sequencing:** M3 W9–10
- **Tags:** `partner-pickup`
- **Note:** This audit benefits from access to Teams desktop's specific WebView versions; coordinate with shift or a Teams engineer if needed

---

## REL-03 — Error handling and graceful degradation policy

**Description:** Investigate what happens when motion fails — WAAPI throws on a detached node, an iframe context has unusual permissions, a degraded environment (e.g., very old browser) doesn't support a needed feature. Define a graceful-degradation policy: when motion can't run, what should consumers experience? (Options: silent no-op with state still progressing; explicit error logged with state still progressing; thrown error with caller responsibility.) Audit current behavior, propose a policy, document it. Implement small alignment fixes in scope.

**Why it matters:** Without an explicit policy, every motion component handles failure differently — and consumers can't reliably reason about edge cases. Defining the policy is partly a design decision (Robert reviews) and partly an implementation alignment task.

- **Difficulty:** Medium
- **Sequencing:** M3 W10
- **Mode:** UXE proposes policy; Robert decides; UXE implements alignment
- **Tags:** `partner-pickup`

---

## REL-04 — Motion state vs. React state synchronization audit

**Description:** Investigate the interaction between motion lifecycle and React rendering. When a motion finishes, when does React know? Are there races between motion completion and state updates that depend on it? How do controlled vs. uncontrolled motion components handle this? Audit the patterns used in the 6 motion components, presence components, and choreography components. Produce a findings report. Land small fixes (e.g., missing completion callbacks, off-by-one timing issues) in scope. Defer larger redesigns.

**Why it matters:** "The motion finished but the parent didn't re-render" is a classic source of subtle bugs in motion systems. Choreography (CHOR-02 work) will stress this — better to audit before that signal arrives so the UXE can recognize it.

- **Difficulty:** Medium-Hard (timing/race issues are subtle)
- **Sequencing:** M3 W10
- **Tags:** `partner-pickup`
- **Cross-ref:** Findings may feed Group 5 API decisions (specifically around lifecycle/completion callbacks)

---

## REL-05 — React strict mode + concurrent rendering compatibility

**Description:** Investigate FMS's behavior under React 18 strict mode (development-mode double-invocation) and concurrent rendering features. Specifically: does `useMotion` survive a strict-mode double-invoke without producing duplicate animations or leaks? Are presence components safe under interrupted/replayed renders? Audit by enabling strict mode in a test harness and running representative motions. Land small fixes (e.g., guarding a side effect that should run once); defer larger architectural changes.

**Why it matters:** React 19 and concurrent rendering features are now widely deployed in product code. FMS components that fail under strict mode produce subtle bugs in dev that surface as flakiness in prod. This is an emerging-but-real concern — better audited proactively than after a bug report.

- **Difficulty:** Medium
- **Sequencing:** M3 W11
- **Tags:** `partner-pickup`

---

## REL-06 — Defensive patterns: prop validation and edge inputs

**Description:** Investigate FMS behavior under unusual inputs: empty children, null refs, zero duration, very long duration, rapidly toggled `visible` props, identical motion props passed twice in rapid succession, motion components nested inside themselves. Audit for crashes, infinite loops, console errors, silent corruption. Produce a findings report. Land small fixes (e.g., null-guards, prop validation warnings in dev) in scope; defer larger validation framework work.

**Why it matters:** Real product code passes weird inputs sometimes — especially when inputs come from server data, from user interactions, or from dynamically-generated UI. Defensive patterns aren't glamorous but they're how a system becomes trustworthy.

- **Difficulty:** Easy-Medium (mostly mechanical; the audit _finds_ the surprises)
- **Sequencing:** M3 W11
- **Tags:** `partner-pickup`

---

## REL-07 — Closing artifact: Reliability follow-up backlog

**Description:** Aggregate all "deferred" items from REL-01 through REL-06 into a single "Reliability follow-up backlog" doc. Per item: severity, scope estimate, recommended owner, link back to the original findings report. Becomes a handoff artifact for a future planning cycle.

**Why it matters:** Without this aggregation, deferred items become invisible. The closing backlog ensures the work isn't lost — it's just deferred with a written plan.

- **Difficulty:** Easy (aggregation; not new findings)
- **Sequencing:** End of M3
- **Mode:** UXE-driven; Robert reviews
- **Tags:** Closing

---

## 📊 Group 7 summary

| ID     | Title                                     | Difficulty | Sequencing |
| ------ | ----------------------------------------- | ---------- | ---------- |
| REL-01 | Cleanup discipline audit                  | Med-Hard   | M3 W9      |
| REL-02 | Browser quirks audit                      | Medium     | M3 W9–10   |
| REL-03 | Error handling + degradation policy       | Medium     | M3 W10     |
| REL-04 | Motion state ↔ React state sync audit     | Med-Hard   | M3 W10     |
| REL-05 | Strict mode + concurrent rendering compat | Medium     | M3 W11     |
| REL-06 | Defensive patterns + edge inputs          | Easy-Med   | M3 W11     |
| REL-07 | Closing: Reliability follow-up backlog    | Easy       | End of M3  |

**Critical narrative:**

> Six investigations × audit + fix-small + defer-large → aggregated follow-up backlog.
>
> End state: FMS has been examined across the major reliability axes; small issues are fixed; larger ones are documented with a plan; nothing is invisible.

**Cross-references:**

- **Group 4** holds choreography-specific reliability work (CHOR-05 reduced-motion, CHOR-03 stress-test catalog implicitly stresses interruption reliability)
- **Group 5** receives input from REL-04 (state sync findings may inform lifecycle/completion API decisions)
- **Group 6** absorbs perf (PROM-INFRA-03) and a11y (PROM-INFRA-08) work that _isn't_ in Group 7
- **Migrations (Group 3)** organically surface reliability issues; UXE should file findings against REL-\* items as they encounter issues during MIG-05 through MIG-10

# 📦 Group 8 — AI-Augmented Motion Workflow

**Label:** `area: ai-workflow`
**Sequencing:** Stretch — pickup when committed work has slack, throughout M2–M3+
**Status:** Aspirational, not committed. UXE picks items based on energy and bandwidth.

**Default DoD applies** — plus stretch-specific DoD relaxations:

- "Done" can mean a working tool + a written-up audit run, not a polished general-purpose product
- Findings reports count as primary output for audit items
- Tools shipped as Claude skills or repo scripts don't need full Fluent UI release polish

**Theme:** _"The UXE develops fluency with AI-assisted motion workflows — building tools that automate motion creation, audit existing motion for improvement, and surface motion opportunities. Output is a dual flywheel: tools that the FMS team uses, and audit findings that feed future planning cycles."_

**Why this group exists:** Per the Q10 scope split, R&D into WebGL, advanced easing, analytic motion, Fuse, and math-heavy graphics work stays with Robert. Group 8 gives the UXE a complementary, distinct specialty: **AI-augmented motion engineering workflow.** Builds on the partner's likely AI-tool fluency, plays to JD growth vectors (L28 AI-driven UI, L32 strategic AI capability, L34 technical depth), and produces multiplier output — audit findings generate future MIG-_, API-_, and PERF-\* items.

**Distinct from Robert's R&D:** Robert explores AI motion _as consumer experience_ (motion-for-AI, expressive primitives for AI products). UXE explores AI motion _as creator workflow_ (using AI to author, audit, and improve motion code). Complementary, not competitive.

**Locked decisions:**

- All items frame around AI workflow tools or AI-driven audits
- Mixed tone: scoped contributions (build tools) + audit-and-findings outputs
- Each audit item generates downstream backlog items for future cycles (the flywheel)

---

## STR-01 — Claude skill for FMS motion authoring

**Description:** Build a Claude skill (or set of skills) that helps engineers author motion using FMS — generating motion slot customizations, scaffolding new presence components from a description, suggesting which atomic motion(s) to compose for a given product scenario, generating Storybook customization stories from a component reference. Skill is structured around the public FMS API surface and the patterns established in the recent docs (`Motion/Introduction`, `Motion/MotionSlotAPI`, etc.).

**Why it matters:** Motion authoring has friction. A well-tuned Claude skill reduces time-to-first-working-motion for product engineers — directly supporting JD L12 ("answer technical questions from product teams") at scale. Also: the skill itself becomes a teaching artifact about what "good FMS usage" looks like.

- **Difficulty:** Medium-Hard (skill engineering + curation of patterns)
- **Sequencing:** M2–M3 stretch
- **Output:** A working Claude skill (`.skill` file or equivalent) + a short usage guide
- **Mode:** UXE-driven; Robert reviews the skill's pattern recommendations for motion-semantic correctness
- **Tags:** `partner-pickup`, `growth`

---

## STR-02 — Audit existing motion (CSS animations across Fluent UI) — AI-assisted suggestions

**Description:** Build an automated pass over the Fluent UI repo that identifies CSS `animation` and `transition` declarations _outside_ the migration plan (i.e., not already epic'd in #36125–#36135). For each finding, use Claude (or a similar LLM workflow) to suggest: (a) whether the animation is a candidate for FMS migration, (b) what FMS components or atoms it would map to, (c) whether the migration is non-breaking or DOM-changing. Produce a findings report — effectively _Phase 6 of the migration plan_.

**Why it matters:** Robert's migration plan covers known CSS animations through Phase 5. Phase 6 — "what's left across the Fluent UI repo?" — is exactly the kind of broad survey AI tooling does well. Output is **the next round of migration items** for a future cycle, complete with proposed mapping. Multiplier value: the UXE produces a backlog _for the next UXE_ (or for themselves).

- **Difficulty:** Medium (mostly tool-building + curation; the LLM does the heavy lifting on suggestions)
- **Sequencing:** M3 stretch
- **Output:** A repo-scanning script + a findings report ranking candidate migrations by fit/effort/breaking-change risk
- **Mode:** UXE-driven; Robert reviews the proposed migration mappings
- **Tags:** `partner-pickup`, `growth`, `flywheel-output`

---

## STR-03 — Audit components _without_ motion — AI-assisted suggestions where motion would help

**Description:** Inverse of STR-02. Build an automated pass over Fluent UI components that _don't currently have motion_ and use AI tooling to suggest: (a) whether motion would meaningfully improve the component (e.g., a dialog appearing without entrance motion, a tooltip with no fade), (b) what kind of motion would fit, (c) what the user experience case is. Cross-reference with design intent docs and Casey's input where applicable. Produce a findings report.

**Why it matters:** FMS adoption today is reactive — components migrate when there's existing motion to convert. The proactive question — "where _should_ there be motion?" — is rarely asked systematically. AI-assisted survey makes this question tractable. Output is a list of **motion opportunities**, not migrations — distinct backlog feeding a future product/design conversation.

- **Difficulty:** Medium-Hard (the _judgment_ about "should this have motion?" is design-heavy; AI surfaces candidates, humans curate)
- **Sequencing:** M3 stretch
- **Output:** A findings report with prioritized motion-opportunity list; ideally reviewed with Casey for design alignment
- **Mode:** UXE-driven; Casey reviews curation; Robert reviews motion direction
- **Tags:** `partner-pickup`, `growth`, `flywheel-output`

---

## STR-04 — AI-assisted motion code review skill

**Description:** Build a skill (or PR-review automation) that reviews motion-related code changes for common issues: missing reduced-motion handling, incorrect motion slot usage, unnecessary CSS animation introductions, motion durations outside accepted ranges, missing customization stories per migration DoD. Could integrate with GitHub Actions or run as a manual `claude review` step on PRs.

**Why it matters:** Robert is the primary reviewer for motion-semantic correctness (Q12 5+/week commitment). An AI-assisted first-pass review catches mechanical issues _before_ Robert reviews — multiplying review bandwidth without sacrificing rigor. Robert reviews what AI flags + the higher-judgment items; the UXE reviews what AI says is mechanical.

- **Difficulty:** Medium (skill-tuning is the work; logic is mostly pattern-matching)
- **Sequencing:** M3 stretch (after the UXE has reviewed enough motion PRs to know what mechanical issues recur)
- **Output:** A working review skill + integration sketch (Action workflow or manual command)
- **Mode:** UXE-driven; Robert reviews skill's review criteria
- **Tags:** `partner-pickup`, `growth`

---

## STR-05 — AI-assisted Storybook story generation from product references

**Description:** Build a workflow where the UXE feeds a product UI screenshot or video clip (e.g., a Teams panel entrance, an ODSP file-list expansion) and the AI proposes a Storybook story implementing that motion using FMS. Iterates until the story matches the reference. Becomes a tool for CHOR-02 scenario authoring and for cross-team consults — when a product team asks "how would I build _this_ with FMS?" the workflow turns the question into a concrete starting point.

**Why it matters:** CHOR-02's scenario discovery (Q4) involves consulting product designers about realistic motion. STR-05 _operationalizes_ that consultation — the UXE can take a designer's reference and produce a FMS implementation faster. Reduces the consultation-to-prototype loop.

- **Difficulty:** Medium-Hard (multimodal AI workflow; iterative refinement)
- **Sequencing:** M3+ stretch (most useful _after_ CHOR-02 patterns are established)
- **Output:** A working tool/workflow + a few demonstrated reference-to-story conversions
- **Mode:** UXE-driven; Casey or product designers provide the references
- **Tags:** `partner-pickup`, `growth`

---

## STR-06 — Findings synthesis: "AI motion workflow patterns" doc

**Description:** Closing artifact. After the UXE has built a few of STR-01 through STR-05, write up the meta-patterns: what worked, what didn't, what's reusable, where AI tooling adds genuine leverage and where it doesn't. Could become a Microsoft-internal channel post or a docs page about the FMS team's AI workflow practice.

**Why it matters:** Synthesis is what turns _experiments_ into _practice_. Also positions the UXE as having a genuine specialty — not "did some AI tool experiments" but "built a coherent AI-augmented motion engineering workflow and codified it." Real growth artifact for Connect/promotion conversations.

- **Difficulty:** Easy-Medium (writing; pattern extraction)
- **Sequencing:** End of M3+ (only meaningful after at least 2–3 STR-\* items have shipped)
- **Output:** A doc or channel post; possibly a presentation candidate for an internal venue
- **Mode:** UXE-driven; Robert reviews; could be co-authored if the patterns extend across both your work
- **Tags:** `partner-pickup`, `growth`, `closing`

---

## 📊 Group 8 summary

| ID     | Title                                             | Difficulty | Sequencing | Type             |
| ------ | ------------------------------------------------- | ---------- | ---------- | ---------------- |
| STR-01 | Claude skill for FMS motion authoring             | Med-Hard   | M2–M3      | Tool             |
| STR-02 | Audit existing CSS motion → migration suggestions | Medium     | M3         | Audit (flywheel) |
| STR-03 | Audit components without motion → opportunities   | Med-Hard   | M3         | Audit (flywheel) |
| STR-04 | AI-assisted motion PR review skill                | Medium     | M3         | Tool             |
| STR-05 | Story generation from product references          | Med-Hard   | M3+        | Tool             |
| STR-06 | Synthesis: "AI motion workflow patterns" doc      | Easy-Med   | End M3+    | Closing          |

**Critical narrative:**

> Build tools (STR-01, STR-04, STR-05) → run audits (STR-02, STR-03) → synthesize patterns (STR-06).
>
> Dual flywheel: **tools** that the FMS team and product engineers use; **findings** that feed future migration, motion-opportunity, and improvement backlogs. The UXE develops a coherent AI-augmented motion engineering specialty distinct from Robert's R&D.

**Cross-references:**

- **Group 3 (Migrations):** STR-02's findings produce _Phase 6_ of the migration plan — a backlog handoff for a future cycle
- **Group 4 (Choreography):** STR-05 supports CHOR-02 scenario authoring; STR-03's findings may surface choreography opportunities
- **Group 7 (Reliability):** STR-04's review skill should encode reliability-pattern checks (e.g., cleanup discipline) once Group 7 surfaces patterns worth checking
- **DOC-08 (recurring product Q&A):** STR-01 and STR-05 reduce the friction of answering "how do I do X with FMS?" — multiplying Q&A bandwidth

**Distinct from Robert's R&D space (per Q10 scope split):** Robert keeps WebGL, analytic motion / Fuse, advanced easing, math-heavy graphics, and motion-for-AI as consumer experience. Group 8 is **AI motion as creator workflow** — using AI to build, audit, and improve motion code. Complementary, not competitive.

**Stretch nature:** All Group 8 items are explicitly opt-in. The UXE picks based on bandwidth and energy; nothing in Group 8 is _committed_ work. If everything in Groups 1–7 ships and Group 8 is untouched, the partnership has succeeded.
