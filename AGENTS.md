# Domaine de la Rossignolerie Website Guidance

This is the shared project entry point for Codex, GitHub Copilot and other coding agents working on Domaine de la Rossignolerie.
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

## Build And Dev Commands

Use Node.js 24 and Yarn 4.18.1, pinned by `packageManager` in [package.json](package.json).
The [Yarn configuration](.yarnrc.yml) uses the `node-modules` linker and a three-day minimum package age.
CI uses the same Node major and Yarn release.
Enable Corepack when setting up the launcher; use `corepack yarn` if needed or `yarn.cmd` when PowerShell blocks `yarn.ps1`.
Keep dependency changes within scope and let Yarn maintain [yarn.lock](yarn.lock).

| Task                        | Command                    | Notes                                             |
| --------------------------- | -------------------------- | ------------------------------------------------- |
| Install locked dependencies | `yarn install --immutable` | Reproduce the resolved dependency graph           |
| Start development           | `yarn dev`                 | Normally `http://localhost:3000`                  |
| Check formatting            | `yarn format:check`        | Application Vue, TypeScript, SCSS and locale JSON |
| Format application files    | `yarn format`              | Prefer changed-file scope for small edits         |
| Check types                 | `yarn typecheck`           | Nuxt and Vue TypeScript checks                    |
| Lint                        | `yarn lint`                | ESLint with its Prettier integration              |
| Fix lint findings           | `yarn lint:fix`            | Review fixes and keep them within scope           |
| Build production output     | `yarn build`               | Check SSR and runtime configuration               |
| Generate static output      | `yarn generate`            | Use for a deliberate static-delivery check        |
| Preview built output        | `yarn preview`             | Run after the corresponding build or generation   |
| Prepare Nuxt types          | `yarn postinstall`         | Also runs automatically after installation        |
| Profile a build             | `yarn profile`             | Use when profiling is part of the task            |

There is no `test` script in the package file.
`format` and `format:check` check application source and locale JSON; Markdown and root configuration files need an explicit file check.
Check changed Markdown explicitly with the installed Prettier using `--prose-wrap preserve --end-of-line lf`.
Check changed root configuration and workflow files explicitly as well.
See [README.md](README.md) for local setup and the dependency map.

## Direct Dependencies

Consult [package.json](package.json) for declared versions and [yarn.lock](yarn.lock) for the resolved graph.
This table groups every direct entry by responsibility.

| Dependencies                                                                             | Purpose or current status                                                 |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `nuxt`                                                                                   | Routing, Vue application build, SSR and prerendering                      |
| `@nuxtjs/i18n`                                                                           | French/English messages, prefixed routes and language preference          |
| `@nuxtjs/seo`                                                                            | Site metadata, robots, sitemap and structured-data modules                |
| `@nuxt/fonts`                                                                            | Resolves Oswald and Roboto and emits locally served font files            |
| `@nuxt/icon`, `@iconify-json/lucide`                                                     | Icon component and locally bundled Lucide icons                           |
| `lenis`                                                                                  | Client smooth scrolling, reduced motion and coordinated route restoration |
| `rolldown`                                                                               | Build tooling satisfying Nuxt's bundler peer dependency                   |
| `@nuxt/eslint`, `eslint`, `eslint-config-prettier`, `eslint-plugin-prettier`, `prettier` | Linting and formatting configuration/tooling                              |
| `typescript`, `vue-tsc`, `@types/node`                                                   | Nuxt, Vue and Node API declarations and type checking                     |
| `sass`                                                                                   | SCSS compilation                                                          |

Check runtime API availability against Node 24 independently of the declaration package version.
Nuxt Fonts resolves the two configured families through its Google provider and serves the downloaded files locally.
Inspect generated font CSS and actual requests before claiming a family, weight or subset renders correctly.

## Architecture

```text
app/
├── app.vue, error.vue                 # Locale head and independent error shell
├── layouts/default.vue               # Skip link and focusable main
├── pages/                            # File-based page compositions and page SEO
├── components/common/                # Shared image, photo grid/viewer, logo and language controls
├── components/layout/                # Header, primary navigation and footer
├── data/                             # Identity, navigation, media, SEO and legacy paths
├── composables/                      # Page SEO, media queries and overlay lifecycle
├── types/                            # Image and SEO contracts
├── styles/                           # CSS-free tokens, base rules, shared keyframes and classes
├── plugins/                          # Lenis, overlays, focus and pointer/keyboard modality
└── router.options.ts                 # History, anchor and page scrolling
i18n/locales/                         # French source and US English messages
public/                               # Estate assets, favicon, licenses and crawler policy
server/middleware/legacy-redirects.ts # Permanent redirects for recorded aliases
server/api/                           # Contact submission and configuration-readiness endpoints
server/utils/                         # Contact validation, delivery, request limits and shared abuse controls
```

| Concern                 | Owner                                                                                                     | Contract                                                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Business identity       | [site.ts](app/data/site.ts)                                                                               | Supplied name, contact, ordered team IDs and `externalLinks`; publication review still applies                         |
| Wheel scrolling         | [smooth-scroll.client.ts](app/plugins/smooth-scroll.client.ts)                                            | One `$lenis`; native touch and Ctrl-wheel; motion-preference changes cancel interpolation                              |
| History readiness       | Same smooth-scroll plugin                                                                                 | `$waitForScrollPosition(top)` waits up to three seconds for content height; input, navigation and unmount cancel it    |
| Overlay lifecycle       | [overlay-scroll-lock.client.ts](app/plugins/overlay-scroll-lock.client.ts)                                | `$overlayScroll.lock()` returns an idempotent release; only the final release restores prior styles and scrolling      |
| Route scrolling         | [router.options.ts](app/router.options.ts)                                                                | Destination readiness, overlay release, saved-position priority, safe hash decoding and sticky-header clearance        |
| Route focus             | [navigation-focus.client.ts](app/plugins/navigation-focus.client.ts)                                      | Targets `main-content` or a decoded hash after completion/unlock; cancels stale requests and cleans temporary tabindex |
| Messages                | [fr-FR.json](i18n/locales/fr-FR.json), [en-US.json](i18n/locales/en-US.json)                              | Matching ownership, snake_case keys and interpolation names                                                            |
| Modules and environment | [nuxt.config.ts](nuxt.config.ts)                                                                          | SSR, locale head, Fonts, schema, sitemap and environment indexing                                                      |
| App shell               | [app.vue](app/app.vue), [default layout](app/layouts/default.vue), [error shell](app/error.vue)           | Locale head, one layout-owned main and independent status-preserving recovery                                          |
| SEO                     | [registry](app/data/seo.ts), [helper](app/composables/usePageSeo.ts), [types](app/types/seo.ts)           | Actual pages only, reactive head/schema and typed image references                                                     |
| Styles                  | [styles](app/styles/)                                                                                     | CSS-free tokens injected once; base, shared keyframes and classes loaded once                                          |
| Public media            | [manifest](app/data/media.json), [dimension catalog](app/data/imageDimensions.ts), [public](public/)      | Supplied variants and measured file dimensions, with stable identities                                                 |
| Navigation              | [navigation.ts](app/data/navigation.ts)                                                                   | Ordered primary paths and translation keys; the brand owns the home link                                               |
| Legacy URLs             | [redirect mappings](app/data/legacyRoutes.ts), [server middleware](server/middleware/legacy-redirects.ts) | Recorded source URLs redirect to French pages with query preservation                                                  |

Plugins are client-only and ordered by named dependencies: smooth scrolling, overlay locking, then navigation focus.
Call an overlay release on dismissal and unmount, and keep native-scroll overlay regions marked `data-lenis-prevent`.
Only focus and viewport scrolling wait for `$overlayScroll.whenUnlocked()`; route navigation itself must remain immediate.
Keep plugin state per app and preserve listener/observer/timer cleanup during hot replacement and unmount.
The focus destination and shell landmark ID must agree; inspect their actual consumers when changing that contract.

## Routes And Page Workflow

French and English routes use `/fr` and `/en` through Nuxt I18n's `prefix` strategy.
Use file-based page paths under both locale prefixes.
The root `/` is the language-detection entry point, with French as default and the `i18n_redirected` cookie preserving preference.
Keep explicit localized URLs authoritative even when browser language or a saved preference differs.
For requested page work:

1. Inspect the relevant source, supplied content and shared shell before selecting components and landmark ownership.
2. Resolve route identity, visible `pages.*` copy, `pictures.*` descriptions and `seo.*` metadata independently.
   Use the [content naming map](.agents/skills/i18n/references/content-naming.md) rather than deriving URLs or filenames from display titles.
3. Update corresponding French and US English message identities together and keep script-side translated collections reactive.
4. Preserve one main and H1, direct localized links, native modified-click behavior and useful no-JavaScript content.
5. Keep shared metadata ownership explicit, with measured real imagery and accurate HTTP dispositions.
6. Update only affected navigation and neighboring project links, then exercise affected locales and states through shared verification.

Use [gallery-page](.agents/skills/gallery-page/SKILL.md) for a photo-project workflow rather than treating a translation-only edit as page creation.

## Localization And Content Boundaries

| Namespace         | Content                                                                           |
| ----------------- | --------------------------------------------------------------------------------- |
| `app.*`           | Estate identity and logo alternative                                              |
| `components.*`    | Layout, header/footer, language, form and viewer messages                         |
| `pages.*`         | Page prose, `tab_name` labels, wine descriptions, projects and policy-review copy |
| `pictures.*`      | Image descriptions indexed by stable media ID                                     |
| `seo.*`           | Site description, page-specific titles/descriptions and sharing-image alternative |
| `error.*`         | Missing-page and unexpected-error messages                                        |
| `miscellaneous.*` | Shared factual-field labels                                                       |

Use `fr-FR.json` and `en-US.json`, preserving supplied French names and facts while using natural US English.
New multiword message keys use snake_case; existing wine/project/media IDs remain stable even when their punctuation differs.
Keep component controls under their actual owner, not mixed into page prose solely because the component is used once.
Keep shared names and destinations in site data; do not duplicate contact facts independently in messages or schema.
Use Vue I18n-safe literal syntax for `@`, `|` and braces, and verify dynamic key families as well as literal calls.
See [content direction](.agents/docs/content-direction.md) for editorial boundaries.

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

Preserve meaningful content identities and record explicit redirects when implemented page paths change.
Use locale-aware route helpers instead of assembling prefixes or translating path fragments by hand.
Keep public asset URLs and external links outside locale routing.

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

| Guide              | File                                                        | Read for                                                                             |
| ------------------ | ----------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Brand context      | [brand-context.md](.agents/docs/brand-context.md)           | Estate identity, factual positioning and contact information                         |
| Content direction  | [content-direction.md](.agents/docs/content-direction.md)   | French-first voice, wine copy and English adaptation                                 |
| Design system      | [design-system.md](.agents/docs/design-system.md)           | Palette, typography, page composition and stylesheet ownership                       |
| UX principles      | [ux-principles.md](.agents/docs/ux-principles.md)           | Navigation, wines, photos, enquiries and responsive acceptance                       |
| Accessibility      | [accessibility.md](.agents/docs/accessibility.md)           | Semantics, focus, touch, readability and audit coverage                              |
| SEO                | [SEO.md](.agents/docs/SEO.md)                               | Localized URLs, metadata, indexing and publication checks                            |
| Contact processing | [contact-processing.md](.agents/docs/contact-processing.md) | Private delivery configuration, API contract, abuse protection and policy boundaries |

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
| Gallery pages        | [gallery-page](.agents/skills/gallery-page/SKILL.md)                     | Photo-project pages, ordered images, adjacent navigation and review |

## Task Entry Points

| Task                            | Entry point                                                              | Shared owner                                                 |
| ------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------ |
| New or extended winery page     | [new-winery-page.prompt.md](.github/prompts/new-winery-page.prompt.md)   | Visual-fidelity skill with task-relevant technical workflows |
| Photo-project page              | [new-gallery-page.prompt.md](.github/prompts/new-gallery-page.prompt.md) | Gallery-page skill                                           |
| Locale messages only            | [add-translations.prompt.md](.github/prompts/add-translations.prompt.md) | I18n skill                                                   |
| Read-only source/journey review | Request review mode in the relevant skill                                | Acceptance-review or gallery-page skill                      |

Codex can read the prompt's shared skill directly; prompt files do not require a second implementation or an installed command adapter.

## Tool Integration And Scoped Instructions

[Copilot's entry point](.github/copilot-instructions.md) routes to these shared rules.
Codex uses this `AGENTS.md` and the applicable ancestor/current-directory instruction chain.
Repository skills are discoverable under `.agents/skills/`; their names/descriptions guide selection, with bodies read when relevant.
The [.agents index](.agents/README.md) is navigational; it does not replace this file.
Before editing application files, all coding agents must select and read applicable scoped instructions from the table below.
Match both the file pattern and the concern being changed, including overlapping scopes.
Read them explicitly when the client does not attach `applyTo` metadata.

| Agent               | Shared entry point                                                                        | Scoped guidance                                                       |
| ------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Codex               | This `AGENTS.md`, applicable `AGENTS.override.md`/ancestor guidance and repository skills | Explicitly select and read all matching rows below                    |
| GitHub Copilot      | [copilot-instructions.md](.github/copilot-instructions.md) and shared project rules       | `description`/`applyTo` where supported; read explicitly when needed  |
| Other coding agents | This shared guide and relevant skills                                                     | Read applicable files rather than assuming client-specific attachment |

Codex's instruction discovery does not automatically apply Copilot's `applyTo` metadata.
See [official OpenAI instruction discovery](https://learn.chatgpt.com/docs/agent-configuration/agents-md) and [repository skill discovery](https://learn.chatgpt.com/docs/build-skills).

| Instruction                                                         | File patterns                                                                                                              | Use for                                                                  |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [Nuxt and Vue](.github/instructions/vue-nuxt.instructions.md)       | `app/**/*.vue`, `app/**/*.ts`, `server/**/*.ts`, `nuxt.config.ts`                                                          | Components, SSR, helpers, endpoints and configuration                    |
| [Styling](.github/instructions/styles.instructions.md)              | `app/**/*.vue`, `app/styles/**/*.scss`, `nuxt.config.ts`                                                                   | Appearance, responsive layout and style loading                          |
| [Internationalization](.github/instructions/i18n.instructions.md)   | `i18n/locales/*.json`                                                                                                      | French and English keys, copy and interpolation                          |
| [Accessibility](.github/instructions/accessibility.instructions.md) | `app/**/*.vue`, `app/plugins/**/*.ts`, `app/composables/**/*.ts`, `app/styles/**/*.scss`                                   | Semantics, focus, overlays, touch and motion                             |
| [SEO](.github/instructions/seo.instructions.md)                     | `app/pages/**/*.vue`, `app/data/seo.ts`, `app/composables/usePageSeo.ts`, `app/app.vue`, `app/error.vue`, `nuxt.config.ts` | Page identity, metadata, locale head and indexing                        |
| [Gallery pages](.github/instructions/gallery-page.instructions.md)  | `app/pages/photos/**/*.vue`                                                                                                | Photo projects, image order, translated captions and adjacent navigation |

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
For application/configuration changes, run `yarn format:check`, `yarn typecheck`, `yarn lint` and the relevant production build.
The [CI workflow](.github/workflows/ci.yml) installs dependencies immutably and runs lint; its build-named job does not run the production build or generation.
Run Nuxt type preparation and lint sequentially when they share generated configuration.
Inspect both SSR and client navigation when changing translated state or head metadata.
For navigation integrations, check saved-position priority, delayed content height, malformed hashes, nested overlay release and interruption by user input or a newer route.
Check the actual compiled font URLs and served MIME types; a successful font-resolution log does not prove the browser used those faces.
For shared UI, cover different consumers and states rather than relying on one screenshot.
Report checks actually performed and distinguish source inspection, emulation, real-device testing and deployed verification.
Do not claim unavailable browser, assistive-technology, delivery or production coverage.
