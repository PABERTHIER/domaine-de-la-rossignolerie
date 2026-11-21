---
description: 'Use when editing winery Vue presentation, shared SCSS, responsive layouts or Sass configuration.'
applyTo: 'app/**/*.vue,app/styles/**/*.scss,nuxt.config.ts'
---

# Styling And Responsive Design

Use [design system](../../.agents/docs/design-system.md) for palette, typography, page composition and stylesheet ownership.
Use [UX principles](../../.agents/docs/ux-principles.md) for affected responsive journeys.
Preserve the bird, real estate imagery and recognizable cream/green presentation.
Nuxt Fonts owns Oswald/Roboto resolution; inspect configured weights, emitted URLs and actual computed faces instead of adding duplicate font-loading code.

## Ownership And Organization

| Concern           | Rule                                                                          |
| ----------------- | ----------------------------------------------------------------------------- |
| Tokens            | Keep CSS-free values separate and group them by visual responsibility         |
| Global defaults   | Load reset, base typography, focus and motion rules once                      |
| Reusable classes  | Require demonstrated reuse instead of moving page-specific selectors globally |
| Shared animation  | Keep definitions and actual consumers coordinated                             |
| Local appearance  | Use scoped page/component SCSS and intentional qualified BEM nesting          |
| Measured geometry | Keep dynamic measurements with their behavior and static presentation in SCSS |

Use blank lines between declaration groups, nested visual sections and media overrides.
Preserve public component classes and transition state names during style-only cleanup.
Avoid mechanical class renaming, arbitrary nesting limits or broad breakpoint conversions unrelated to the task.
Reuse actual tokens and inspect their values instead of assuming a token list from another implementation.
Keep CSS-emitting sheets out of repeated token injection and do not introduce a parallel styling framework.

## Responsive Acceptance

Reflow panels, wine selectors, form fields and longer English labels without shrinking essential text or hiding functionality.
Preserve complete bottle proportions and full-photo detail access; use [winery-assets](../../.agents/skills/winery-assets/SKILL.md) for delivery decisions.
Let prose determine section height and use content-appropriate fluid containers.
Keep the browser's preferred root text size and allow browser zoom.
Account for safe areas and short landscape screens around fixed controls and dialogs.

Measure contrast against actual surfaces and image overlays and keep focus visible.
Separate visual control size from its 44px touch hit area.
Fix the source of overflow rather than hiding it at document level.
Respect reduced motion in CSS and related JavaScript.
Inspect stacking contexts and shared scroll locks before changing an overlay layer independently.
Use the current [overlay plugin](../../app/plugins/overlay-scroll-lock.client.ts) and preserve its temporary occupied gutter/document-height handling.
Keep native-scroll regions `data-lenis-prevent`; do not reserve a permanent empty gutter or introduce a competing viewport-height writer.
Retain forced-colors system values and focus visibility during motion/reveal changes.

Use [accessibility instructions](accessibility.instructions.md) for interaction states and [mobile acceptance](../../.agents/docs/ux-principles.md#mobile-acceptance) for viewport/journey coverage.
Compare matching states after fonts and images load and report actual browser/device checks.
