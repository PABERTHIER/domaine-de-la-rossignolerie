---
name: seo
description: Implement, review or debug Domaine de la Rossignolerie localized metadata, canonical and alternate URLs, sharing images, structured data and indexing. Use for SEO work without expanding unrelated edits into a site-wide redesign.
---

# Winery SEO

Follow [AGENTS.md](../../../AGENTS.md), [SEO instructions](../../../.github/instructions/seo.instructions.md) and the relevant section of the [SEO guide](../../docs/SEO.md).
Inspect current page identity, metadata helpers, root head and runtime configuration before changing ownership.
Confirm installed module APIs instead of assuming a registry or composable contract exists.

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
Inspect client navigation and locale changes as well as the initial SSR output.
Do not introduce a bundler workaround until the current implementation demonstrates the need.

## URLs And Indexing

| Concern                    | Preserve or verify                                                                  |
| -------------------------- | ----------------------------------------------------------------------------------- |
| Locale identity            | Unprefixed French, equivalent English, self-canonicals and reciprocal alternates    |
| Project slugs              | Stable identity, percent encoding and the supplied decomposed accent                |
| Origin                     | One trusted environment-correct origin across all metadata owners                   |
| Preview                    | Actual preview URLs and non-indexable output                                        |
| Publication                | Indexable real content only after the intended production policy is established     |
| Errors and retired content | Real status, noindex and no misleading canonical/alternate set                      |
| Sitemap                    | Actual canonical content and useful images; no errors, redirects or unapproved text |

Distinguish unknown 404s from explicitly retired 410s and genuine equivalent-page redirects.
Use single-hop aliases and do not redirect unrelated missing URLs to home.
Keep public image delivery on the serving origin; SEO configuration must not rewrite native asset requests.
Do not equate robots blocking with authentication or reliable page removal.

## Verification

Use declared checks appropriate to page, SSR and configuration changes.
Inspect affected French/English output for one title, description and canonical, correct language alternates and complete image metadata.
Exercise client route/locale changes and error recovery, checking head and schema restoration.
Inspect real status codes, encoded paths, image responses, robots directives and sitemap output in the relevant environment.
Separate local source/build results from deployed crawler, social-platform and account checks.
Report unavailable external coverage without claiming rankings or launch readiness.
