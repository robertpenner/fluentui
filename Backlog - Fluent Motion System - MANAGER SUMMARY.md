# Fluent Motion System — UXE Backlog Summary

**Author:** Robert Penner · **Date:** May 2026

---

## Executive Overview

This backlog defines the work for a Senior UX Engineer joining as a partner to Robert Penner on the Fluent Motion System (FMS) — the animation primitives powering Fluent UI v9 across Microsoft 365, Teams, OneDrive and SharePoint.

[UXE backlog board](https://github.com/orgs/microsoft/projects/1222/views/3?filterQuery=-status%3APRs+label%3A%22Motion+UXE+backlog%22)

---

## Key Outcomes

- **6 component migrations shipped** — Skeleton, Nav, Focus border ×7, Avatar, Tab indicator, Spinner tail (~14 components touched; 1 reusable shared utility designed)
- **6 motion components audited for Stable promotion** — Fade, Collapse, Scale, Slide, Rotate, Blur (promotion publication deferred to a later cycle)
- **Choreography (Stagger/Sequence) reaches Beta milestone** — validated by 5 product-grounded scenarios, reduced-motion strategy defined, API freeze settled
- **Reliability hardened** — 6 investigations across cleanup, browser compat, error handling, state sync, strict mode, and defensive patterns
- **Docs and onboarding path improved** — onboarding friction turned into durable documentation; recurring product-team Q&A established
- **Stretch: AI-augmented motion workflow** — optional tools and audits that generate future backlog (flywheel)

---

### Phase 1 — Onboarding & Ramp

The UXE ramps in ~2 weeks. Every friction point becomes a docs improvement signal.

| ID     | Title                                              |
| ------ | -------------------------------------------------- |
| ONB-01 | Read & annotate FMS core docs                      |
| ONB-02 | Walk the FMS source tree                           |
| ONB-03 | Build "Hello, FMS" Storybook playground            |
| ONB-04 | Code archaeology on recent migration PR            |
| ONB-05 | Read v9 Stable checklist; map to motion components |
| DOC-10 | Audit & extend new docs from UXE ramp              |
| ONB-07 | Onboarding retro + docs improvement proposal       |

### Phase 2 — First Migrations + Docs Fixes

First paired migration ships; docs gaps from onboarding are addressed.

| ID     | Title                                        |
| ------ | -------------------------------------------- |
| ONB-06 | Pair on Skeleton migration (= MIG-05)        |
| MIG-05 | Skeleton (#36130)                            |
| DOC-01 | Address top docs gaps from ONB-07            |
| DOC-08 | Recurring product team Q&A support (ongoing) |

### Phase 3 — Solo Migrations + Choreography Begins

UXE builds solo migration cadence. Choreography work kicks off in parallel.

| ID         | Title                                           |
| ---------- | ----------------------------------------------- |
| MIG-06     | Nav (#36131)                                    |
| DOC-05     | Per-component slot customization story audit    |
| CHOR-01    | Define Beta exit criteria + propose 5 scenarios |
| **MIG-07** | **Focus border ×7 (#36132)**                    |
| CHOR-02    | 5 foundation scenarios + ergonomics notes       |
| CHOR-03    | Composition stress test catalog                 |
| DOC-04     | Maintainer migration guide (CSS → FMS)          |

### Phase 4 — Promotion Infra + API Work

Stable promotion scaffolding begins. Choreography signal feeds API improvements (Group 5 items TBD, co-authored with UXE).

| ID            | Title                               |
| ------------- | ----------------------------------- |
| PROM-INFRA-01 | VR test scaffolding                 |
| PROM-INFRA-02 | Bundle-size fixtures                |
| PROM-INFRA-03 | Perf scenarios                      |
| PROM-INFRA-04 | `isConformant.ts` adaptation        |
| PROM-INFRA-05 | SSR safety verification             |
| PROM-INFRA-06 | Composition/interruption API freeze |

### Phase 5 — Remaining Migrations + Choreography Maturation

Later migrations land. Choreography API is reviewed and reduced-motion strategy defined.

| ID      | Title                                         |
| ------- | --------------------------------------------- |
| MIG-08  | Avatar (#36133)                               |
| CHOR-04 | Combined Stagger + Sequence ergonomics review |
| CHOR-05 | Reduced-motion strategy (proposal + impl)     |
| MIG-09  | Tab indicator (#36134)                        |
| CHOR-06 | Apply Group 5 API changes to choreography     |
| MIG-10  | Spinner tail (#36135)                         |

### Phase 6 — Stable Audits + Reliability Sweep

Per-component Stable audits run (Fade first as proof-of-pattern, then remaining 5 in parallel). Reliability investigations run alongside.

| ID            | Title                                      |
| ------------- | ------------------------------------------ |
| PROM-FADE     | Fade Stable readiness audit                |
| PROM-COLLAPSE | Collapse readiness audit                   |
| PROM-SCALE    | Scale readiness audit                      |
| PROM-SLIDE    | Slide readiness audit                      |
| PROM-ROTATE   | Rotate readiness audit                     |
| PROM-BLUR     | Blur readiness audit                       |
| PROM-INFRA-07 | Internal stress test (bug bash substitute) |
| PROM-INFRA-08 | A11y review pattern + sweep                |
| PROM-INFRA-09 | Motion-specific addendum to v9 checklist   |
| REL-01        | Cleanup discipline audit                   |
| REL-02        | Browser quirks audit                       |
| REL-03        | Error handling + degradation policy        |
| REL-04        | Motion state ↔ React state sync audit      |
| REL-05        | Strict mode + concurrent rendering compat  |
| REL-06        | Defensive patterns + edge inputs           |

### Phase 7 — Closing Artifacts

Closing reports and declarations that wrap up the body of work.

| ID          | Title                                  |
| ----------- | -------------------------------------- |
| CHOR-07     | Declare choreography Beta              |
| PROM-REPORT | Stable Readiness Report (consolidated) |
| REL-07      | Reliability follow-up backlog          |

### Stretch — AI-Augmented Workflow (Optional)

Picked up if bandwidth allows. Tools the team uses + audit findings that feed future cycles.

| ID     | Title                                             |
| ------ | ------------------------------------------------- |
| STR-01 | Claude skill for FMS motion authoring             |
| STR-02 | Audit existing CSS motion → migration suggestions |
| STR-03 | Audit components without motion → opportunities   |
| STR-04 | AI-assisted motion PR review skill                |
| STR-05 | Story generation from product references          |
| STR-06 | Synthesis: "AI motion workflow patterns" doc      |

---

## Item Counts

| Area                       | Committed | Stretch |   Total |
| -------------------------- | --------: | ------: | ------: |
| Onboarding                 |         7 |       0 |       7 |
| Documentation              |         5 |       0 |       5 |
| Migrations                 |         6 |       0 |       6 |
| Choreography Beta          |         7 |       0 |       7 |
| API Improvements           |       TBD |       0 |     TBD |
| Stable Promotion Readiness |        16 |       0 |      16 |
| Reliability Hardening      |         7 |       0 |       7 |
| AI-Augmented Workflow      |         0 |       6 |       6 |
| **Total**                  |   **48+** |   **6** | **54+** |
