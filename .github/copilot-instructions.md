# GitHub Copilot Entry Point

[AGENTS.md](../AGENTS.md) owns shared constraints, engineering conventions and verification.
Its Git policy prohibits every Git command unless the user explicitly lifts the restriction.
Use [.agents/README.md](../.agents/README.md) for guidance ownership and evidence levels.

## Copilot Conventions

- Preserve the winery's supplied identity, factual boundaries and French/English visitor access.
  Read current source before describing a component, command or integration as present.
- Treat [mobile acceptance](../AGENTS.md#mobile-experience-acceptance-criteria) as part of UI completion.
  Check affected keyboard, touch, short-screen and translated-content states.
- Keep translated script-side data and metadata reactive.
  Use locale-aware internal destinations and preserve native asset/external URLs.
- Read applicable scoped instructions and load only task-relevant guides and skills.
  Explicitly select overlapping concerns when automatic attachment is unavailable.

## Reference Documentation

| Guide                                                     | Read for                                                   |
| --------------------------------------------------------- | ---------------------------------------------------------- |
| [Brand context](../.agents/docs/brand-context.md)         | Estate identity and supplied factual information           |
| [Content direction](../.agents/docs/content-direction.md) | French-first prose, wine facts and English adaptation      |
| [Design system](../.agents/docs/design-system.md)         | Palette, typography, composition and style ownership       |
| [UX principles](../.agents/docs/ux-principles.md)         | Navigation, wines, photos, contact and mobile acceptance   |
| [Accessibility](../.agents/docs/accessibility.md)         | Semantics, focus, touch, forms, motion and manual coverage |
| [SEO](../.agents/docs/SEO.md)                             | URLs, metadata, origins, indexing and publication checks   |

## Shared Skills

| Skill                                                                | Use for                                                 |
| -------------------------------------------------------------------- | ------------------------------------------------------- |
| [Visual fidelity](../.agents/skills/rossignolerie-fidelity/SKILL.md) | Recognizable winery pages and responsive composition    |
| [Winery content](../.agents/skills/rossignolerie-content/SKILL.md)   | Estate copy, wine information and photo captions        |
| [Acceptance review](../.agents/skills/rossignolerie-review/SKILL.md) | Scoped findings and evidence-based journey review       |
| [Internationalization](../.agents/skills/i18n/SKILL.md)              | Message parity, reactive copy and route continuity      |
| [Nuxt and Vue](../.agents/skills/nuxt-vue-patterns/SKILL.md)         | Components, TypeScript, SSR and client lifecycle        |
| [Winery assets](../.agents/skills/winery-assets/SKILL.md)            | Photos, bottles, responsive delivery and font rights    |
| [Accessibility](../.agents/skills/accessibility/SKILL.md)            | Accessible implementation and focused audits            |
| [SEO](../.agents/skills/seo/SKILL.md)                                | Localized metadata, sharing images, schema and indexing |

Canonical workflows live in `.agents/skills/`.
The catalogs aid discovery rather than requiring every skill to be loaded.

## Scoped Instructions

| Instruction                                                 | File patterns                                                                                                              | Use for                                              |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [Nuxt and Vue](instructions/vue-nuxt.instructions.md)       | `app/**/*.vue`, `app/**/*.ts`, `server/**/*.ts`, `nuxt.config.ts`                                                          | Components, SSR, endpoints and runtime configuration |
| [Styling](instructions/styles.instructions.md)              | `app/**/*.vue`, `app/styles/**/*.scss`, `nuxt.config.ts`                                                                   | Appearance, responsive layout and style loading      |
| [Internationalization](instructions/i18n.instructions.md)   | `i18n/locales/*.json`                                                                                                      | Bilingual messages and interpolation                 |
| [Accessibility](instructions/accessibility.instructions.md) | `app/**/*.vue`, `app/plugins/**/*.ts`, `app/composables/**/*.ts`, `app/styles/**/*.scss`                                   | Semantics, focus, overlays, readability and motion   |
| [SEO](instructions/seo.instructions.md)                     | `app/pages/**/*.vue`, `app/data/seo.ts`, `app/composables/usePageSeo.ts`, `app/app.vue`, `app/error.vue`, `nuxt.config.ts` | Page metadata, locale head, status and indexing      |

Scoped files declare `description` and `applyTo` metadata.
Use the [shared applicability rules](../AGENTS.md#tool-integration-and-scoped-instructions) when several concerns overlap or the client does not attach them automatically.

## Reusable Prompts

| Prompt                                                 | Scope                                                                 |
| ------------------------------------------------------ | --------------------------------------------------------------------- |
| [New winery page](prompts/new-winery-page.prompt.md)   | Requested page work through shared visual/content/technical workflows |
| [Add translations](prompts/add-translations.prompt.md) | Locale messages and their consumers without creating unrelated pages  |

Use [shared verification](../AGENTS.md#verification) and report checks actually performed.
Keep tool-specific files focused on routing to shared owners.
