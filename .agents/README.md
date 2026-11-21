# Domaine de la Rossignolerie — Design And Implementation Guidance

This folder contains focused project guides and reusable skills for the winery website.
Start with [AGENTS.md](../AGENTS.md) for shared constraints, conventions and verification.
Use this index to select the context needed for the task rather than loading every guide and skill.

## Guidance Ownership

| Layer                | Location                                         | Purpose                                                       |
| -------------------- | ------------------------------------------------ | ------------------------------------------------------------- |
| Shared project rules | [AGENTS.md](../AGENTS.md)                        | Scope, Git policy, engineering conventions and verification   |
| Reference guides     | [docs](docs/)                                    | Brand, editorial direction, design, UX, accessibility and SEO |
| Task skills          | [skills](skills/)                                | Reusable implementation and review workflows                  |
| Scoped instructions  | [.github/instructions](../.github/instructions/) | File-specific standards and routing to shared owners          |
| Task entry points    | [.github/prompts](../.github/prompts/)           | Focused prompts that reuse shared workflows                   |
| Tool entry points    | [Copilot](../.github/copilot-instructions.md)    | Access to the same project rules and catalogs                 |

Keep each detailed procedure in its owning skill and each reference topic in its guide.
Tool-specific files route to shared guidance rather than maintaining competing requirements.

## Evidence And Implementation Status

| Evidence level        | Meaning                                              | Use                                                                               |
| --------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------- |
| Supplied content      | Authored information supplied with the project       | Preserve meaning and provenance; review time-sensitive details before publication |
| Confirmed requirement | An explicit project or user decision                 | Apply within the current task without reopening settled choices                   |
| Observed source       | Behavior or data directly supported by current files | Recheck the implementation before relying on a contract                           |
| Acceptance criterion  | Required outcome for implementation or review        | Do not describe it as already implemented or verified                             |
| Verified behavior     | A recorded check in a stated environment             | Report the actual coverage and its limits                                         |

A documented requirement does not establish that the site satisfies it.
Supplied business information is not independent confirmation of current hours, staff roles, stock or service availability.
Source inspection does not establish browser behavior, measured contrast, screen reader quality or deployed metadata.

## Reference Guides

| Guide                                          | Read for                                                                                 |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [Brand context](docs/brand-context.md)         | Estate identity, supplied contact information, visitor priorities and factual boundaries |
| [Content direction](docs/content-direction.md) | French-first voice, wine presentations, project order and natural English                |
| [Design system](docs/design-system.md)         | Winery palette, typography, page compositions and stylesheet responsibility              |
| [UX principles](docs/ux-principles.md)         | Navigation, wine selection, photo viewing, enquiries and mobile acceptance               |
| [Accessibility](docs/accessibility.md)         | Semantics, dialogs, focus, forms, motion and manual audit coverage                       |
| [SEO](docs/SEO.md)                             | Localized URLs, head ownership, indexability, structured data and publication checks     |

## Skills

| Skill                                                            | Use for                                                                    |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [rossignolerie-fidelity](skills/rossignolerie-fidelity/SKILL.md) | Winery compositions, brand continuity and responsive improvements          |
| [rossignolerie-content](skills/rossignolerie-content/SKILL.md)   | Estate copy, wine facts, photo captions and editorial review               |
| [rossignolerie-review](skills/rossignolerie-review/SKILL.md)     | Scoped acceptance review and evidence-based findings                       |
| [i18n](skills/i18n/SKILL.md)                                     | Bilingual keys, interpolation, translated state and route continuity       |
| [nuxt-vue-patterns](skills/nuxt-vue-patterns/SKILL.md)           | Components, strict types, SSR and client integrations                      |
| [winery-assets](skills/winery-assets/SKILL.md)                   | Photo provenance, bottle proportions, responsive assets and font licensing |
| [accessibility](skills/accessibility/SKILL.md)                   | Focused interaction audits and accessible implementation                   |
| [seo](skills/seo/SKILL.md)                                       | Reactive localized metadata, sharing images, indexing and schema           |
| [gallery-page](skills/gallery-page/SKILL.md)                     | Create, extend or review photo projects and their ordered image sequences  |

Use the [content naming map](skills/i18n/references/content-naming.md) when connecting page, wine/project, image-description and metadata identities.
The map documents actual messages and stable IDs; it does not derive route or asset paths from translated titles.

## Scoped Instructions

| Instruction                                                            | Applies to                                                           |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [Nuxt and Vue](../.github/instructions/vue-nuxt.instructions.md)       | Vue files, application/server TypeScript and Nuxt configuration      |
| [Styling](../.github/instructions/styles.instructions.md)              | Vue presentation, shared SCSS and style configuration                |
| [Internationalization](../.github/instructions/i18n.instructions.md)   | French and English locale JSON                                       |
| [Accessibility](../.github/instructions/accessibility.instructions.md) | Semantics, focus, overlays, responsive readability and motion        |
| [SEO](../.github/instructions/seo.instructions.md)                     | Pages, metadata helpers, locale head, errors and site configuration  |
| [Gallery pages](../.github/instructions/gallery-page.instructions.md)  | Photo-project pages, captions, ordered media and adjacent navigation |

Select scoped files using [AGENTS.md's applicability table](../AGENTS.md#tool-integration-and-scoped-instructions), including overlapping concerns.
The catalogs aid discovery and do not imply every workflow applies to every task.

## Task Entry Points

| Prompt                                                            | Shared workflow                                                     |
| ----------------------------------------------------------------- | ------------------------------------------------------------------- |
| [New winery page](../.github/prompts/new-winery-page.prompt.md)   | Visual fidelity with task-relevant content, routes and verification |
| [Add translations](../.github/prompts/add-translations.prompt.md) | Message editing and consumer checks through the i18n skill          |
| [New gallery page](../.github/prompts/new-gallery-page.prompt.md) | Photo-project scope through the shared gallery-page skill           |

## Maintenance

Use focused tables, one sentence per source line, UTF-8 and LF endings.
Check changed Markdown formatting, local links, anchors and frontmatter.
Update catalogs alongside changes to guides, skills or instruction filenames.
Keep paths and claims grounded in the current repository and report unavailable verification explicitly.
