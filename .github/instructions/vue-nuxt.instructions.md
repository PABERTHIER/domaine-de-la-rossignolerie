---
description: 'Use when editing winery Vue pages, components, layouts, application/server TypeScript or Nuxt configuration.'
applyTo: 'app/**/*.vue,app/**/*.ts,server/**/*.ts,nuxt.config.ts'
---

# Vue And Nuxt Instructions

Use [nuxt-vue-patterns](../../.agents/skills/nuxt-vue-patterns/SKILL.md) for component structure, strict types, SSR, lifecycle and server boundaries.
Read the nearest implementation and current configuration before choosing an abstraction or relying on an API.

## Implementation Rules

- Keep SFC order `<template>`, `<script setup lang="ts">`, then scoped SCSS.
  Prefer registered Nuxt auto-imports and explicit imports for shared data, types, utilities and library APIs.
- Use braces for conditionals and blank lines between guards, state changes, derived values and returns.
  Group declarations and helpers by responsibility instead of compressing control flow.
- Inspect shell ownership before adding a main landmark or H1.
  Preserve one of each per rendered page and keep the skip-link target usable.
- Keep browser globals and DOM access in mounted hooks, event handlers or client integrations.
  Preserve stable SSR markup, per-request state and cleanup of added resources.
- Derive translated script-side collections and metadata reactively.
  Keep tab selection, menu expansion and viewer position separate from translated strings.
- Use locale-aware internal destinations and preserve equivalent-page language switching.
  Keep public assets, email/telephone links and external URLs outside locale prefixing.
- Reuse actual scroll/overlay owners and preserve native touch, reduced motion and history/anchor behavior.
  Guard asynchronous results against obsolete requests, selections and closed dialogs.
  Use the named `smooth-scroll` → `overlay-scroll-lock` → `navigation-focus` dependency chain.
  Keep route navigation immediate and await `$overlayScroll.whenUnlocked()` only for focus/scroll work.
- Keep credentials and delivery adapters server-side.
  Validate request types/lengths/size and expose success only after configured service acceptance.

## Select Additional Guidance

| Concern                          | Guidance                                                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Appearance and responsive layout | [Styling](styles.instructions.md) and [visual fidelity](../../.agents/skills/rossignolerie-fidelity/SKILL.md) |
| Translated consumers             | [i18n](../../.agents/skills/i18n/SKILL.md)                                                                    |
| Photos or fonts                  | [Winery assets](../../.agents/skills/winery-assets/SKILL.md)                                                  |
| Interactive behavior             | [Accessibility](accessibility.instructions.md)                                                                |
| Metadata, status or indexing     | [SEO](seo.instructions.md)                                                                                    |

Use [shared verification](../../AGENTS.md#verification) with commands actually declared by the project.
Use shared [site data](../../app/data/site.ts) for identity and destinations and the [content map](../../.agents/skills/i18n/references/content-naming.md) for message ownership.
Use [gallery instructions](gallery-page.instructions.md) when photo-project work overlaps this scope.
Plugin-provided state belongs to the app instance, with explicit cleanup for pending restoration, listeners and temporary tabindex.
Check different consumers when changing shared behavior and report unavailable runtime coverage.
