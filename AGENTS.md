# Domaine de la Rossignolerie Website Guidance

This is the shared project entry point for coding agents working on Domaine de la Rossignolerie.
Use [.agents/README.md](.agents/README.md) to select focused context.
Keep project rules here, reference material in guides, reusable workflows in skills and file-specific standards in scoped instructions.

## Shared Constraints

- Preserve unrelated user changes and keep work within the requested scope.
  Treat any external project supplied for comparison as read-only unless the user authorizes edits there.
- Preserve the estate's full name, bird mark, real photographs, wine identities and curated photo order.
  Confirm business facts rather than inventing missing information.
- French is the source language; English covers the same visitor journeys.
  Add, rename and remove message identities together, preserving interpolation names and natural English.
- Preserve recognizable page structure and visual identity.
  Improve clarity, accessibility and responsive behavior within the task; do not introduce a new brand.
- Contact enquiries remain distinct from reservations and sales.
  Do not add accounts, commerce, payment or sample booking flows.
- Mobile usability, keyboard operation and reduced motion are part of UI completion.
  Requirements are acceptance criteria, not evidence of completed verification.
- Inspect the current source before relying on a component, dependency, command or documented contract.
  Do not describe an absent file, unconfigured service or unperformed check as present or working.

## Git Policy

Do not run **any Git command** unless the user explicitly lifts this restriction for the task.
This includes read-only commands such as `git status`, `git diff`, `git log` and `git show`.
Do not modify Git metadata, stage files, commit, change remotes or install hooks.
Use filesystem inspection and direct file comparisons, preserving unrelated user changes.

## Engineering Conventions

Use Nuxt 4, Vue 3, strict TypeScript, Yarn 4 and SCSS for application work.
Use Node.js 24 and the package-manager version declared by the project manifest.
Inspect declared dependencies and the resolved lockfile before selecting an API or changing versions.
Keep only dependencies with a demonstrated purpose in the source.
Let Yarn maintain its lockfile; do not add competing package-manager lockfiles.
On PowerShell hosts that block `yarn.ps1`, use `yarn.cmd` or the Corepack launcher.

Use only commands actually declared by the current manifest.
An immutable install reproduces a lockfile; dependency edits require Yarn to update it deliberately.
Leave generated framework output and dependency directories to their tools.
Do not install dependencies or introduce application scaffolding solely to validate a documentation change.

### Vue, TypeScript And Styling

- Use SFC order `<template>`, `<script setup lang="ts">`, then `<style lang="scss" scoped>`.
  Prefer Nuxt auto-imports for registered APIs and explicit imports for shared data, types and library APIs.
  Use `import type` for types.
- Group declarations by responsibility.
  Use braces for conditionals and blank lines between imports, guards, state, computed values, handlers and lifecycle work.
- Keep browser globals in client integrations, mounted hooks or event handlers.
  Preserve stable SSR markup and clean up listeners, observers, timers and animation loops.
  Keep visitor state local or per request.
- Reuse components for actual shared behavior.
  Keep page composition with its page and avoid abstractions or dependencies introduced only for hypothetical reuse.
- Give tokens, base rules, reusable classes and shared animation definitions distinct owners.
  Inject only CSS-free Sass tokens; load CSS-emitting styles once.
  Keep local appearance scoped and use qualified BEM blocks with intentional nesting.
- Preserve one main landmark and one meaningful H1 per rendered page.
  Inspect the shell before deciding where those landmarks belong.
- Keep stable identities and verified factual data separate from translated prose, accessible labels, image alternatives and metadata.
  Derive translated script-side collections reactively.

### Content, URLs And Integrations

Preserve meaningful French URLs and equivalent English destinations.
Use locale-aware route helpers instead of assembling prefixes or translating path fragments by hand.
Keep public asset URLs and external links outside locale routing.
Verify accented and decomposed-Unicode project paths without silently normalizing their identity.

Keep secrets and provider configuration server-side.
Form success must correspond to acceptance by the configured delivery service; provider acceptance does not prove inbox arrival.
Use mocked transports for routine verification and preserve email/telephone alternatives.
Do not submit live enquiries or contact the estate as a side effect of testing without explicit authorization.

Use [content direction](.agents/docs/content-direction.md) for factual and editorial boundaries and [SEO](.agents/docs/SEO.md) for metadata and indexing decisions.

## Mobile Experience Acceptance Criteria

Mobile usability is part of completion for UI changes in both languages.
Reflow content and controls while preserving access to essential information and actions.
Use the [mobile acceptance matrix](.agents/docs/ux-principles.md#mobile-acceptance) and [manual release audit](.agents/docs/accessibility.md#manual-release-audit).
These criteria do not establish device compatibility or accessibility conformance without the corresponding checks.

## Reference Documentation

| Guide             | File                                                      | Read for                                                       |
| ----------------- | --------------------------------------------------------- | -------------------------------------------------------------- |
| Brand context     | [brand-context.md](.agents/docs/brand-context.md)         | Estate identity, factual positioning and contact information   |
| Content direction | [content-direction.md](.agents/docs/content-direction.md) | French-first voice, wine copy and English adaptation           |
| Design system     | [design-system.md](.agents/docs/design-system.md)         | Palette, typography, page composition and stylesheet ownership |
| UX principles     | [ux-principles.md](.agents/docs/ux-principles.md)         | Navigation, wines, photos, enquiries and responsive acceptance |
| Accessibility     | [accessibility.md](.agents/docs/accessibility.md)         | Semantics, focus, touch, readability and audit coverage        |
| SEO               | [SEO.md](.agents/docs/SEO.md)                             | Localized URLs, metadata, indexing and publication checks      |

## Available Skills

Canonical workflows live in `.agents/skills/<name>/SKILL.md`.
Load only skills relevant to the task and read their linked guides on demand.

| Skill                | File                                                                     | Use for                                                             |
| -------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| Visual fidelity      | [rossignolerie-fidelity](.agents/skills/rossignolerie-fidelity/SKILL.md) | Recognizable winery layouts and useful responsive improvements      |
| Winery content       | [rossignolerie-content](.agents/skills/rossignolerie-content/SKILL.md)   | Wine facts, estate copy, project captions and provenance            |
| Acceptance review    | [rossignolerie-review](.agents/skills/rossignolerie-review/SKILL.md)     | Scoped UI review with concrete evidence and coverage limits         |
| Internationalization | [i18n](.agents/skills/i18n/SKILL.md)                                     | Message parity, reactive translation and equivalent-page navigation |
| Nuxt and Vue         | [nuxt-vue-patterns](.agents/skills/nuxt-vue-patterns/SKILL.md)           | Components, TypeScript, SSR and client lifecycle                    |
| Winery assets        | [winery-assets](.agents/skills/winery-assets/SKILL.md)                   | Photo identity, proportions, responsive delivery and font rights    |
| Accessibility        | [accessibility](.agents/skills/accessibility/SKILL.md)                   | Interaction implementation and focused accessibility audits         |
| SEO                  | [seo](.agents/skills/seo/SKILL.md)                                       | Localized metadata, sharing images, schema and indexing             |

## Tool Integration And Scoped Instructions

[Copilot's entry point](.github/copilot-instructions.md) route to these shared rules.
The [.agents index](.agents/README.md) is navigational; it does not replace this file.
Before editing application files, all coding agents must select and read applicable scoped instructions from the table below.
Match both the file pattern and the concern being changed, including overlapping scopes.
Read them explicitly when the client does not attach `applyTo` metadata.

| Instruction                                                         | File patterns                                                                                                              | Use for                                               |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| [Nuxt and Vue](.github/instructions/vue-nuxt.instructions.md)       | `app/**/*.vue`, `app/**/*.ts`, `server/**/*.ts`, `nuxt.config.ts`                                                          | Components, SSR, helpers, endpoints and configuration |
| [Styling](.github/instructions/styles.instructions.md)              | `app/**/*.vue`, `app/styles/**/*.scss`, `nuxt.config.ts`                                                                   | Appearance, responsive layout and style loading       |
| [Internationalization](.github/instructions/i18n.instructions.md)   | `i18n/locales/*.json`                                                                                                      | French and English keys, copy and interpolation       |
| [Accessibility](.github/instructions/accessibility.instructions.md) | `app/**/*.vue`, `app/plugins/**/*.ts`, `app/composables/**/*.ts`, `app/styles/**/*.scss`                                   | Semantics, focus, overlays, touch and motion          |
| [SEO](.github/instructions/seo.instructions.md)                     | `app/pages/**/*.vue`, `app/data/seo.ts`, `app/composables/usePageSeo.ts`, `app/app.vue`, `app/error.vue`, `nuxt.config.ts` | Page identity, metadata, locale head and indexing     |

Reusable prompts are thin task entry points: [new winery page](.github/prompts/new-winery-page.prompt.md) and [add translations](.github/prompts/add-translations.prompt.md).
Keep detailed procedures in their owning skills instead of duplicating them in tool-specific adapters.

## Documentation Conventions

Use UTF-8, LF endings and one sentence per source line in prose.
Use focused Markdown tables for parallel mappings and keep a blank line around headings, tables and lists.
Preserve accents and verify written text after editing on Windows.
Use Unicode-safe patch or file APIs; explicitly set UTF-8 before piping authored non-ASCII text between processes.
Format changed Markdown with Prettier using `--prose-wrap preserve --end-of-line lf`.
Keep links relative to their file and point only to resources that exist.
Update discovery tables when adding, renaming or removing guidance.
Keep historical work logs and completed-check claims out of durable instructions.

## Verification

| Change                                        | Relevant checks                                                                                                         |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Documentation only                            | Changed-file formatting, local links and anchors, YAML frontmatter, UTF-8/LF and factual accuracy                       |
| Application implementation                    | Declared format, type and lint commands, plus affected French/English behavior                                          |
| Shared behavior, SSR or runtime configuration | Relevant production build and affected consumers                                                                        |
| Routes or image delivery                      | Real HTTP responses, encoding, metadata and image dimensions/MIME; generation only when the selected output requires it |
| UI, styles or interaction                     | Mobile acceptance, keyboard/touch journeys, overlays, text enlargement and reduced motion                               |
| Contact processing                            | Validation and failure paths through isolated transports; no unauthorized live submissions                              |

Run checks appropriate to the actual change and current tooling.
Run Nuxt type preparation and lint sequentially when they share generated configuration.
Inspect both SSR and client navigation when changing translated state or head metadata.
For shared UI, cover different consumers and states rather than relying on one screenshot.
Report checks actually performed and distinguish source inspection, emulation, real-device testing and deployed verification.
Do not claim unavailable browser, assistive-technology, delivery or production coverage.
