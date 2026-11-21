---
name: rossignolerie-review
description: Review Domaine de la Rossignolerie visual fidelity, product scope and French/English visitor journeys with concrete evidence and mobile coverage. Use for acceptance or release reviews rather than routine documentation edits.
---

# Winery Acceptance Review

Follow [AGENTS.md](../../../AGENTS.md) and select the relevant [guides](../../README.md#reference-guides).
Determine the requested review scope and whether it concerns source, runtime behavior or publication.
Review without editing unless fixes are requested.

## Acceptance Coverage

| Area           | Review                                                                                              |
| -------------- | --------------------------------------------------------------------------------------------------- |
| Identity       | Bird proportions, supplied photos, palette, heading character and recognizable page hierarchy       |
| Scope          | Genuine estate/wine/contact/gallery journeys without sample commerce, account or reservation UI     |
| Navigation     | Direct links, current-page context and equivalent French/English switching                          |
| Wines          | Every presentation reachable, distinct vintages, matching bottle/facts and keyboard/touch selection |
| Photos         | Project order, direct links, image sequence, viewer controls and focus/scroll return                |
| Contact        | Labels, validation, input retention, sending/failure states and honest acceptance feedback          |
| Recovery       | Actual HTTP status, localized useful actions and no misleading ordinary-page metadata               |
| Responsive use | Short/narrow screens, enlarged text, hit areas, visible close controls and reduced motion           |

Use [content direction](../../docs/content-direction.md) to check factual boundaries and template exclusions.
Use [mobile acceptance](../../docs/ux-principles.md#mobile-acceptance) and the [manual accessibility audit](../../docs/accessibility.md#manual-release-audit) for relevant runtime coverage.
For metadata claims, use [SEO](../seo/SKILL.md) and inspect actual output rather than configuration intent alone.
Use test transports for contact review instead of sending live enquiries.
Use [gallery-page](../gallery-page/SKILL.md) in review mode for project-specific naming, ordered media and adjacent-navigation checks.
Check shared navigation ownership separately: history priority, bounded height readiness, malformed hashes, nested leases and cancellation after newer input/routes.
Verify `en-US` key/placeholder parity and actual compiled font delivery rather than inferring either from a configuration declaration.

## Evidence And Findings

Record file/component, reproduction, expected result, observed result and visitor impact for each finding.
For visual comparison, match viewport and interaction state and record intentional differences separately from defects.
State browser/device or emulation, language, viewport, journey and result.
Distinguish source observations from tested behavior and do not call unexercised criteria passed.

Run declared checks appropriate to any requested fixes.
Report unavailable real-device, screen-reader, deployed, provider and account coverage explicitly.
A build, screenshot or automated score does not establish release readiness.
