---
name: nuxt-vue-patterns
description: Implement or refactor Domaine de la Rossignolerie Nuxt and Vue components, pages, composables and server boundaries using strict TypeScript, SSR and scoped SCSS. Use for application structure and behavior rather than copy-only changes.
---

# Winery Nuxt And Vue Patterns

Follow [AGENTS.md](../../../AGENTS.md) for shared constraints and read the applicable [Nuxt instructions](../../../.github/instructions/vue-nuxt.instructions.md).
Inspect the affected source, nearest consumer and current configuration before choosing an API or abstraction.
Use installed capabilities rather than assuming a helper exists because another project uses it.

## Components And State

Keep SFC order `<template>`, `<script setup lang="ts">`, then scoped SCSS.
Use typed props/emits, explicit `import type` for shared types and Nuxt auto-imports for registered APIs.
Import shared data, utilities and unregistered library APIs explicitly.
Keep strict types and handle optional values and missing DOM refs instead of suppressing them with `any`.

Group state, derived values, handlers and lifecycle work by responsibility.
Use braces for conditionals and blank lines around guards, state changes and returns.
Keep template guards understandable; move complex decisions into named derived state.
Keep stable wine/project IDs independent of translated display values.

Inspect the layout before adding landmarks or an H1.
There must be one main landmark and one meaningful H1 per rendered page.
Reuse shared behavior through components without turning page-specific structure into global machinery.

## SSR And Lifecycle

Render stable initial markup on server and client.
Prefer CSS for responsive composition rather than viewport-dependent setup branches.
Keep browser globals and DOM measurements in mounted hooks, client plugins or event handlers.
Do not hide whole pages behind `ClientOnly` to mask hydration problems.
Keep mutable visitor data local or per request; avoid cross-request module-level state.

Clean up listeners, timers, observers, animation frames and pointer captures on unmount or ownership changes.
Guard asynchronous image/request results against stale selection and closed overlays.
Use shared scrolling/overlay owners when available; do not create a second instance or independently mutate body styles.
Preserve native touch, browser zoom, reduced motion and history/anchor restoration.

## Translated Consumers And Routes

Use [i18n](../i18n/SKILL.md) when translated state or routes change.
Derive script-side labels, arrays and metadata inside tracked getters.
Keep mutable selection and menu expansion separate from translated derived objects.
Verify a locale change at an unchanged viewport; recomputed input alone does not prove a measured gallery or cached component refreshed.
Use locale-aware route helpers, preserving native modified-click behavior.
Keep public assets and external links outside locale prefixing.

## Server Boundaries

Keep secrets and provider requests server-side.
Validate input types, lengths and request size independently of browser checks.
Design abuse controls for the actual deployment and trusted proxy model rather than assuming process-local state is global.
Return bounded, useful errors without leaking personal data or provider credentials.
Accepting a delivery request is distinct from actual inbox arrival.
Use isolated transports and test data for routine verification.

## Select Additional Guidance

| Concern                         | Guidance                                                                                                                            |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Page composition and appearance | [Visual fidelity](../rossignolerie-fidelity/SKILL.md), [styling instructions](../../../.github/instructions/styles.instructions.md) |
| Wine facts, prose or captions   | [Winery content](../rossignolerie-content/SKILL.md)                                                                                 |
| Photos, bottle imagery or fonts | [Winery assets](../winery-assets/SKILL.md)                                                                                          |
| Menus, tabs, dialogs or forms   | [Accessibility](../accessibility/SKILL.md)                                                                                          |
| Metadata, status or indexing    | [SEO](../seo/SKILL.md)                                                                                                              |

## Verification

Use declared task-relevant formatting, type, lint and build commands.
Do not invent scripts or add scaffolding solely to make a command available.
Inspect affected French/English SSR and client behavior, including hydration, state preservation and cleanup.
For shared components, cover distinct consumers and interrupted lifecycle states.
Report actual checks and unavailable runtime coverage through [shared verification](../../../AGENTS.md#verification).
