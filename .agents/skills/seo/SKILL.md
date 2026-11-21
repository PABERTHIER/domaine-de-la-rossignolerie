---
name: seo
description: Implement, review or debug Domaine de la Rossignolerie localized metadata, canonical and alternate URLs, sharing images, structured data and indexing. Use for SEO work without expanding unrelated edits into a site-wide redesign.
---

# Winery SEO

Follow [AGENTS.md](../../../AGENTS.md), [SEO instructions](../../../.github/instructions/seo.instructions.md) and the relevant section of the [SEO guide](../../docs/SEO.md).
Inspect current page identity, metadata helpers, root head and runtime configuration before changing ownership.
Confirm installed module APIs instead of assuming a registry or composable contract exists.

## Sources And Responsibilities

| Concern                      | Current source or rule                                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------------------------------- |
| Estate identity/profiles     | [site.ts](../../../app/data/site.ts)                                                                     |
| Full search copy             | `seo.*` in [French](../../../i18n/locales/fr-FR.json) and [US English](../../../i18n/locales/en-US.json) |
| Visible page labels          | `pages.*.tab_name`, separate from metadata                                                               |
| Site origin and organization | [nuxt.config.ts](../../../nuxt.config.ts)                                                                |
| Picture alternatives         | `pictures.*` and wine-specific alternatives in locale messages                                           |

Keep `seo.site.description` distinct from each page's description and use route-qualified names such as `gallery_spring`.
Current page contracts live in [types/seo.ts](../../../app/types/seo.ts), with entries in [data/seo.ts](../../../app/data/seo.ts), measured imagery in [imageDimensions.ts](../../../app/data/imageDimensions.ts) and reactive output in [usePageSeo.ts](../../../app/composables/usePageSeo.ts).
[app.vue](../../../app/app.vue) owns locale head links and HTML language, and [error.vue](../../../app/error.vue) owns independent error metadata/recovery.
Register actual implemented pages only; translated copy or a photo registry alone does not establish a routable page.
Use the [naming map](../i18n/references/content-naming.md) to resolve identities independently from display text.

## Page Metadata

Identify the stable page and its equivalent French/English paths.
Use a single owner for page-specific metadata and a single owner for canonical/language head data.
Do not combine competing automatic and manual locale-head modes.
Keep localized search copy separate from visible navigation labels and use the complete estate name once in the title.

Select real representative estate imagery and measure actual raster dimensions.
Keep absolute image URL, MIME type, dimensions and localized alternative consistent.
Do not invent dates, prices, wine availability, ratings or certifications to enrich schema.
Use supported page/business entities matching visible verified content.

Keep translated titles, descriptions, image alternatives and schema reactive.
Refs/computed getters can remain reactive inputs to head APIs; avoid reading `.value` once into a static metadata object.
Resolve schema arrays inside a tracked node getter when required by the installed schema types.
Inspect client navigation and locale changes as well as the initial SSR output.
Do not introduce a bundler workaround until the current implementation demonstrates the need.

## URLs And Indexing

| Concern         | Preserve or verify                                                                        |
| --------------- | ----------------------------------------------------------------------------------------- |
| Locale identity | `/fr` and `/en`, self-canonicals and reciprocal alternates                                |
| Project slugs   | Stable identity, percent encoding and the supplied decomposed accent                      |
| Origin          | One trusted environment-correct origin across all metadata owners                         |
| Preview         | Actual preview URLs and non-indexable output                                              |
| Production      | Canonical winery origin and indexable registered pages; development/previews stay blocked |
| Errors          | Real status, noindex and no misleading canonical/alternate set                            |
| Sitemap         | Actual canonical content and useful images; no errors, redirects or unapproved text       |

The legacy map records old unprefixed paths; server middleware redirects incoming requests to the French home.
Use single-hop aliases and do not redirect unrelated missing URLs to home.
Keep public image delivery on the serving origin; SEO configuration must not rewrite native asset requests.
Do not equate robots blocking with authentication or reliable page removal.

## Authored Copy And Social Cards

Use [content direction](../../docs/content-direction.md) for complete page-specific descriptions without arbitrary truncation.
Give sharing images their actual concise alternative rather than repeating a whole page paragraph.
Use measured raster dimensions, truthful MIME and existing representative imagery.
Keep application icons global and do not fabricate account handles or profile/article fields for generic winery pages.
Distinguish intentional upstream validator warnings from missing/stale output, and verify public cropping/access separately from local metadata.

## Verification

Use declared checks appropriate to page, SSR and configuration changes.
Inspect affected French/English output for one title, description and canonical, correct language alternates and complete image metadata.
Exercise client route/locale changes and error recovery, checking head and schema restoration.
Inspect real status codes, encoded paths, image responses, robots directives and sitemap output in the relevant environment.
Separate local source/build results from deployed crawler, social-platform and account checks.
Report unavailable external coverage without claiming rankings or launch readiness.
