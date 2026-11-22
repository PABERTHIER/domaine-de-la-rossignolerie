# domaine-de-la-rossignolerie

[![Build][build-badge]][build-link]
[![Website][release-badge]][release-link]

A French-first website project for Domaine de la Rossignolerie, a wine estate in Chalonnes-sur-Loire, Anjou.

The public estate address is [domainedelarossignolerie][release-link].

The source uses Nuxt 4, Vue 3, TypeScript, SCSS, French/US English locales and Vercel-compatible SSR output.

## Routes And Shared Shell

| Entry           | URL                  | Current behavior                                                          |
| --------------- | -------------------- | ------------------------------------------------------------------------- |
| Language entry  | `/`                  | Nuxt I18n selects a locale from browser language or its preference cookie |
| French home     | `/fr`                | Minimal home container with localized metadata                            |
| English home    | `/en`                | Equivalent minimal container with US English metadata                     |
| Legacy home     | `/home`              | One-hop permanent redirect to the French home                             |
| Unknown content | Unmatched URL        | Localized 404 shell and home recovery                                     |
| Former services | Recorded legacy path | One-hop permanent redirect to the French home                             |

The default layout owns the skip link, focusable `main-content` landmark and content-driven flex shell.
The homepage deliberately contains only an empty HTML container and its page metadata.
The independent error shell has its own skip link, main, status heading, proportional bird mark and localized recovery.
Native modified clicks remain available on recovery links.

Route scrolling and completed-navigation focus share one Lenis instance and overlay-release contract.
Saved positions take priority over anchors and can wait briefly for delayed content height.
Native touch, Ctrl-wheel zoom, reduced motion and cleanup on navigation/unmount remain part of that contract.
The focus-visible plugin distinguishes pointer interaction from deliberate keyboard input.

## Develop Locally

Use Node.js 24 and the Yarn release pinned in [package.json](package.json).
The [Yarn configuration](.yarnrc.yml) uses the `node-modules` linker and a three-day minimum package age.
Enable Corepack during launcher setup, then reproduce the dependency lockfile:

```sh
corepack enable
yarn install --immutable
```

Use `corepack yarn <command>` when the Yarn launcher is unavailable.
On PowerShell hosts that block `yarn.ps1`, use `yarn.cmd <command>`.

Start development, normally on `http://localhost:3000`:

```sh
yarn dev
```

### Production

Build SSR output:

```sh
yarn build
```

Preview the corresponding output locally:

```sh
yarn preview
```

| Command             | Purpose                                                                    |
| ------------------- | -------------------------------------------------------------------------- |
| `yarn dev`          | Start the Nuxt development server                                          |
| `yarn format:check` | Check application Vue, TypeScript, SCSS and locale JSON formatting         |
| `yarn format`       | Format application/locale files; prefer changed-file scope for small edits |
| `yarn typecheck`    | Check Nuxt and Vue types                                                   |
| `yarn lint`         | Run ESLint with its Prettier integration                                   |
| `yarn lint:fix`     | Apply lint fixes and review the result                                     |
| `yarn build`        | Build production Nuxt SSR output                                           |
| `yarn generate`     | Generate static output for a deliberate route/asset-delivery check         |
| `yarn preview`      | Preview the corresponding build output                                     |
| `yarn postinstall`  | Prepare generated Nuxt types; also runs after installation                 |
| `yarn profile`      | Profile a production build                                                 |

There is no `test` script in the package file.
`format` and `format:check` exclude Markdown and root configuration files.
Check changed Markdown explicitly with Prettier using `--check --prose-wrap preserve --end-of-line lf`, and check root configuration/workflow files separately.
Run type checking and lint sequentially because Nuxt regenerates their shared configuration.
Use [shared verification](AGENTS.md#verification) for checks appropriate to the task.

## Direct Dependencies

Consult [package.json](package.json) for declared versions and [yarn.lock](yarn.lock) for resolved versions.

| Dependencies                                                                             | Purpose or current status                                                 |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `nuxt`                                                                                   | Routing, Vue application build, SSR and prerendering                      |
| `@nuxtjs/i18n`                                                                           | French/English messages, prefixed routes and language preference          |
| `@nuxtjs/seo`                                                                            | Site configuration, metadata, robots, sitemap and structured-data modules |
| `@nuxt/fonts`                                                                            | Oswald/Roboto resolution and locally served font files                    |
| `@nuxt/icon`, `@iconify-json/lucide`                                                     | Icon component and locally bundled Lucide icons                           |
| `lenis`                                                                                  | Smooth wheel scrolling and coordinated history restoration                |
| `rolldown`                                                                               | Nuxt bundler peer dependency                                              |
| `@nuxt/eslint`, `eslint`, `eslint-config-prettier`, `eslint-plugin-prettier`, `prettier` | Linting and formatting configuration/tooling                              |
| `typescript`, `vue-tsc`, `@types/node`                                                   | Nuxt, Vue and Node API declarations and type checking                     |
| `sass`                                                                                   | Global and scoped SCSS compilation                                        |

Verify runtime API availability against Node 24 independently of the declaration package version.
Nuxt Fonts resolves Oswald 400 and Roboto 400/700, normal style, with Latin/Latin Extended subsets.
Rendered heading/body rules select the families; inspect computed styles and actual font requests when changing typography.

## Project Map

| Location                                                          | Responsibility                                                                               |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [app.vue](app/app.vue)                                            | Root page/layout composition, route announcements and locale head ownership                  |
| [Default layout](app/layouts/default.vue)                         | Skip link, focusable main and safe-area-aware flex shell                                     |
| [Home page](app/pages/index.vue)                                  | Empty home container and localized page metadata                                             |
| [Error shell](app/error.vue)                                      | Status-preserving localized error metadata and recovery                                      |
| [Components](app/components/)                                     | Shared UI components                                                                         |
| [Composables](app/composables/)                                   | Page SEO, media queries, screen-size state and overlay-lease lifecycle                       |
| [Data](app/data/)                                                 | Site/wine/project identities, responsive media, measured dimensions, SEO and legacy mappings |
| [Shared types](app/types/)                                        | Image/media and page SEO contracts                                                           |
| [Styles](app/styles/)                                             | CSS-free tokens, global defaults/focus/motion and reusable classes                           |
| [Plugins](app/plugins/), [router options](app/router.options.ts)  | Lenis, overlay coordination, completed focus and pointer/keyboard modality                   |
| [Server legacy middleware](server/middleware/legacy-redirects.ts) | Permanent redirects from recorded incoming legacy paths to the French home                   |
| [Locale files](i18n/locales/)                                     | Matching `fr-FR.json` and `en-US.json` message ownership                                     |
| [Public files](public/)                                           | Estate imagery, favicon, licenses and authored crawler policy                                |
| [Nuxt configuration](nuxt.config.ts)                              | Modules, fonts, stylesheet injection, origins, sitemap and organization schema               |

## Public Assets And Fonts

The public collection includes 112 WebP variants, the JPEG sharing image, PNG favicon and two font-license notices.
The [media manifest](app/data/media.json) records 40 stable image identities and their supplied variants, including actual widths and byte counts.
The [dimension catalog](app/data/imageDimensions.ts) contains the measured dimensions of all 114 public images.

Keep original filenames, casing, aspect ratios and project ordering.
Use public assets through `/images/...` or `/favicon.png`, without a `/public` or locale prefix.
Preserve complete bottle proportions and full-photo detail access.
Responsive CSS alone does not reduce downloaded bytes; use the actual variants and accurate `sizes` where appropriate.
SEO pixel dimensions describe the served file rather than the original source or a CSS display size.

Nuxt Fonts owns font loading.
Do not add a duplicate remote stylesheet or per-family loading packages.
The [Oswald](public/licenses/oswald.txt) and [Roboto](public/licenses/roboto.txt) notices accompany the locally distributed font files.
Keep license notices with redistributed assets, and verify real MIME types and local HTTP requests after build/generation.
Use [winery-assets](.agents/skills/winery-assets/SKILL.md) for asset work.

## Deploy On Vercel

Use Node.js 24, the Nuxt preset, `yarn install --immutable` and `yarn build`.
Leave the Output Directory override disabled so Nuxt/Nitro controls SSR output.
Use `yarn generate` for an explicit static-delivery check rather than the Vercel SSR build target.

The canonical origin defaults to `https://domainedelarossignolerie.vercel.app`.
Override it with build-time `NUXT_SITE_URL` in the Production environment only.
Development uses localhost; Vercel previews use their own `VERCEL_URL`.
Production and local production builds are indexable; development and non-production Vercel environments are not.
Check the actual resolved URLs and response directives for each environment.

French/English routes use `/fr` and `/en`.
The root is a language-detection entry point, with French default and the `i18n_redirected` preference cookie.
Explicit localized URLs remain authoritative.
Only implemented pages belong in the typed SEO registry and sitemap.

The [page helper](app/composables/usePageSeo.ts) supplies reactive page metadata, sharing image details and structured data.
[app.vue](app/app.vue) owns canonical/hreflang links, HTML language and OG locale.
The [registry](app/data/seo.ts) owns page paths, schema types, image descriptions and sitemap images; [types/seo.ts](app/types/seo.ts) owns its contracts.
The narrow Unhead transform exclusion retains client schema updates from the helper.

[public/_robots.txt](public/_robots.txt) is merged by Nuxt Robots and retains `Content-Usage: train-ai=n`.
Nuxt supplies the sitemap declaration; do not add a duplicate public `robots.txt` or hardcoded sitemap origin.
Inspect production-style rules locally with `/robots.txt?mockProductionEnv`.
AI Ready, Skew Protection and generated OG images are disabled.
See [SEO guidance](.agents/docs/SEO.md) for metadata, environment and crawler checks.

## Configuration And CI

| Location                                                                                           | Responsibility                                                        |
| -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [package.json](package.json), [yarn.lock](yarn.lock), [.yarnrc.yml](.yarnrc.yml)                   | Commands, declared/resolved dependencies and package-manager settings |
| [tsconfig.json](tsconfig.json)                                                                     | Strict TypeScript compiler options                                    |
| [eslint.config.mjs](eslint.config.mjs), [.prettierrc](.prettierrc), [.editorconfig](.editorconfig) | Linting, formatting and file conventions                              |
| [CI workflow](.github/workflows/ci.yml)                                                            | Node 24, pinned Yarn, immutable installation and lint                 |
| [Editor settings](.vscode/settings.json)                                                           | ESLint save actions and French-source localization assistance         |

CI uses the same Yarn pin as the manifest.
Its build-named job installs dependencies and runs lint; it does not replace local type, production-build or generation checks.
For shared behavior, inspect the different consumers and direct/client navigation in both locales.
For presentation changes, include keyboard, touch, short screens, enlarged text and reduced motion.
Report unavailable deployment, crawler, real-device and assistive-technology coverage instead of treating a build as a full-site audit.

## Project Guidance

| Resource                                               | Purpose                                                             |
| ------------------------------------------------------ | ------------------------------------------------------------------- |
| [AGENTS.md](AGENTS.md)                                 | Shared constraints, current architecture, commands and verification |
| [.agents/README.md](.agents/README.md)                 | Guide/skill/instruction catalogs and evidence levels                |
| [Copilot entry point](.github/copilot-instructions.md) | Access to the same shared requirements                              |
| [Brand context](.agents/docs/brand-context.md)         | Estate identity and factual boundaries                              |
| [Content direction](.agents/docs/content-direction.md) | French-first copy, wine facts and US English                        |
| [Design system](.agents/docs/design-system.md)         | Palette, fonts, stylesheet ownership and visual conventions         |
| [UX principles](.agents/docs/ux-principles.md)         | Responsive journeys and mobile acceptance                           |
| [Accessibility](.agents/docs/accessibility.md)         | Current ownership and manual audit coverage                         |
| [SEO](.agents/docs/SEO.md)                             | Head ownership, origins, indexing and discovery                     |

Codex uses `AGENTS.md` and repository skills; Copilot enters through its dedicated file.
Select focused workflows from the [skill catalog](AGENTS.md#available-skills) and read matching [scoped instructions](AGENTS.md#tool-integration-and-scoped-instructions).
All Git commands remain prohibited unless the user explicitly lifts the restriction.

[build-badge]: https://github.com/PABERTHIER/domaine-de-la-rossignolerie/actions/workflows/ci.yml/badge.svg
[build-link]: https://github.com/PABERTHIER/domaine-de-la-rossignolerie/actions/workflows/ci.yml

[release-badge]: https://img.shields.io/badge/website-Domaine%20de%20la%20Rossignolerie-285a5b
[release-link]: https://domainedelarossignolerie.vercel.app
