# Domaine de la Rossignolerie — SEO

Keep localized discovery tied to real estate content, stable URLs and verified business facts.
This guide defines metadata and publication requirements without claiming deployed output or crawler validation.
Use the [SEO skill](../skills/seo/SKILL.md) for a scoped implementation or review.

## URL Identity And Language

The supplied public domain is `https://domainedelarossignolerie.vercel.app`.
Use the full name Domaine de la Rossignolerie rather than truncated title variants.
Verify the chosen canonical origin and deployment configuration before publication.

French and English use `/fr` and `/en` through the configured `prefix` strategy.
The root `/` detects language using the browser and `i18n_redirected` cookie, with French as default.
Explicit localized URLs must not be overridden by a different saved language preference.
Language switching preserves page/project identity through locale-aware routing.
Keep stable project IDs separate from translated labels and route paths.

Each complete indexable translation is self-canonical with reciprocal, self-inclusive language alternates.
Use the French equivalent for `x-default`.
Exclude tracking parameters and fragments from canonical identity while preserving meaningful navigation behavior.
Do not canonicalize English pages to French.

## Metadata Ownership

| Concern                        | Responsibility                                                                    |
| ------------------------------ | --------------------------------------------------------------------------------- |
| Verified business facts        | One shared factual source for brand, contact and supported profiles               |
| Page identity                  | Stable route, schema type, representative image and indexability decision         |
| Authored search copy           | Localized title, description and image alternative                                |
| Reactive page head             | Page-specific metadata and schema derived from tracked state                      |
| Locale head                    | One central owner for canonical, alternate languages, HTML language and OG locale |
| Environment policy             | Shared trusted origin, indexing, robots and sitemap configuration                 |
| Errors and unavailable content | Real status, noindex and useful localized recovery                                |

Check actual module versions and ownership before changing a metadata API.
Do not combine competing automatic/manual canonical and locale-head mechanisms.
Preserve one useful title, description and canonical per valid page and include the brand once.
Keep headings/navigation labels separate from search-specific copy.
Use specific truthful descriptions instead of keyword lists or invented local expertise claims.

Translated titles, descriptions, image alternatives and schema must follow client navigation and locale changes.
Inspect both SSR HTML and the resulting client head; a correct initial response does not prove reactive updates.
Do not copy a bundler workaround without reproducing the problem in the current source.

## Current Sources

| Concern                                                  | Current owner                                                                                      |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Estate name, contact and profiles                        | [site.ts](../../app/data/site.ts)                                                                  |
| Page/site search wording                                 | `seo.*` in [French](../../i18n/locales/fr-FR.json) and [US English](../../i18n/locales/en-US.json) |
| Locale loading, origin, indexing and organization schema | [nuxt.config.ts](../../nuxt.config.ts)                                                             |

`seo.site.description` describes the site as a whole and must not become a second page-description meta tag.
Photo-project metadata uses route-qualified identities such as `seo.gallery_spring`.
Visible navigation uses `pages.*.tab_name`, distinct from complete metadata titles.

## Topics And Semantic Fields

Use relevant visible subjects as structured-data topics only when they describe the page.
Do not add keyword meta lists, profile/article fields to generic winery pages, or invented authors, employers and publication dates.
Keep business identity separate from page-specific facts and avoid duplicate WebSite/publisher nodes.
Inside a computed schema node, resolve translated values and arrays within the tracked getter; do not take setup-time snapshots or assume nested computed arrays satisfy the installed schema types.
Inspect node IDs, URLs and actions after client navigation as well as server rendering.

## Sharing Images And Media Discovery

Use representative real estate imagery with absolute public URLs and measured raster dimensions.
Keep alt, MIME type, dimensions and the actual served image consistent.
Do not treat physical bottle dimensions or CSS display sizes as raster metadata.
Reserve visual image space and keep ordinary photo delivery independent of SEO-origin configuration.
Native asset URLs stay on the serving origin rather than being prefixed by a canonical production origin.

Include actual canonical content and useful page images in sitemaps.
Preserve curated photo order and exclude errors, redirects, unapproved policy text and removed product flows.
Use `lastmod` only when a reliable content-change date exists.
Project display dates do not establish a last-modified timestamp.
Follow the generated sitemap index rather than assuming module-specific filenames.
Open Graph should supply truthful sharing title, description, URL and image; use the large-image card selector when appropriate without fabricating a social handle.
Keep application icons global rather than replacing them with each page's photo.
Check actual metadata-validator output before deciding whether a warning reflects an application defect or an upstream rule.

## Origins And Indexing

Resolve one trusted origin consistently for locale metadata, canonicals, sharing URLs, schema and sitemaps.
Do not derive identity solely from an arbitrary request Host header.
Check environment overrides against every module that reads them independently.
When configuration is embedded at build time, rebuild and serve under a compatible runtime configuration.

| Environment or response                       | Required outcome                                                           |
| --------------------------------------------- | -------------------------------------------------------------------------- |
| Local development                             | Local origin and noindex                                                   |
| Preview/review                                | Actual preview origin and non-indexable content                            |
| Production, including local production builds | Canonical winery origin and crawlable indexable registered content         |
| Unknown URL                                   | Real 404 and noindex with useful recovery                                  |
| Recorded legacy URL                           | One-hop permanent redirect to its French destination, preserving the query |
| Server error or unavailable content           | Honest status and noindex, without misleading canonical/alternate links    |

The [legacy map](../../app/data/legacyRoutes.ts) records source paths and unprefixed destination paths.
The [middleware](../../server/middleware/legacy-redirects.ts) prepends `/fr`, preserves query parameters and safely decodes accented source paths before matching.
Internal links target actual localized pages through Nuxt I18n rather than obsolete paths.
Ordinary fragments remain page-anchor navigation targets.
Keep unrelated unknown paths as 404s and record deliberate URL changes in the map.
Keep redirects and errors out of canonical page registries and sitemaps.

Robots crawl policy is distinct from access control and page-level indexing directives.
A crawler blocked from a page cannot inspect that page's noindex directive.
Inspect actual response headers, head output, robots and sitemap behavior for each environment.

## Error And Recovery Requirements

Keep actual error statuses and server-only response-header writes distinct from client head updates.
Errors need useful localized recovery, a meaningful heading/description and no misleading canonical or alternate-language set.
Recovery must clear the active error before navigating to a valid destination.
Inspect client policy restoration when leaving an excluded page or recovering from an error; a correct initial noindex response does not prove later metadata is restored.

## Structured Data And Services

Use supported WebSite/page/business schema matching visible content and verified facts.
Check the installed integration's support before selecting a winery-specific helper.
Keep legal identity, address, telephone and profiles consistent with approved business content.
Do not invent offers, prices, availability, ratings, reviews, certifications or events from wine descriptions.
Keep unverified hours and identifiers out of structured claims.

Evaluate optional module features against actual requirements.
Do not enable generated sharing services, AI publishing endpoints, analytics or asset-retention features merely because a bundle includes them.
An AI development configuration is not a business content-use or publishing policy.
Vercel is the supplied hosting target; this does not establish an account connection, deployment or runtime verification.
Keep SSR, form processing and the chosen output compatible.

## Configuration Ownership

[nuxt.config.ts](../../nuxt.config.ts) enables SSR, French/English locale identities, site configuration, robots, sitemap and organization schema.
French and English use `prefix`, with browser/cookie language detection at `/` only.
The configured language tags are `fr-FR` and `en-US`, loaded from their corresponding locale files.
The site name and supplied Instagram destination come from shared [site data](../../app/data/site.ts).

| Concern                | Configured behavior                                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Development origin     | `http://localhost:3000`                                                                                           |
| Preview origin         | HTTPS `VERCEL_URL` when provided outside production                                                               |
| Production-mode origin | `https://domainedelarossignolerie.vercel.app`, overridable by build-time `NUXT_SITE_URL`                          |
| Indexing               | Enabled in production and local production builds; disabled in development and non-production Vercel environments |
| Alias                  | Recorded source paths permanently redirect to French pages through server middleware                              |
| Sitemap                | Explicit indexable registry entries, expanded into French/English; no synthetic modification dates                |
| Structured identity    | Organization name, resolved URL and supplied Instagram profile                                                    |
| Optional services      | AI publishing, Skew Protection and generated OG images disabled                                                   |

The [typed page registry](../../app/data/seo.ts) contains actual pages only and owns their shared paths, schema types, representative image and sitemap images.
The helper resolves registered paths with `localePath()`.
The [page helper](../../app/composables/usePageSeo.ts) supplies reactive metadata/schema, while [app.vue](../../app/app.vue) owns locale head links and HTML language.
The [image catalog](../../app/data/imageDimensions.ts) records measured pixels for every public image, including responsive variants.
The narrow Unhead transform exclusion keeps the page helper's schema calls on the client; verify graph changes after navigation when upgrading dependencies.
Do not interpret these configuration choices as verified page output, a deployment or a completed search audit.
Use [README.md](../../README.md#configuration-and-ci) for the root configuration and CI map.
Nuxt Fonts resolves configured families at build time and emits local font URLs; verify those requests in the selected output.
On a Windows network with an organizational certificate chain, use Node 24's trusted system-CA support when needed rather than disabling TLS verification.

## Robots And Sitemaps

[public/_robots.txt](../../public/_robots.txt) is merged by Nuxt Robots and carries the authored allow/content-use policy.
Do not add a second public `robots.txt` or a hardcoded sitemap origin.
The module supplies the environment-correct sitemap declaration and blocks development/preview crawling.
Use `/robots.txt?mockProductionEnv` to inspect production-style groups locally without enabling preview indexing.
The sitemap uses the explicit page registry with `excludeAppSources: ['nuxt:pages']` so automatic entries cannot override authored image lists.
Only registered indexable pages contribute content entries; the root language redirect, errors and legacy aliases are excluded.
The legal, cookies and privacy review pages are registered with `indexable: false` and use [usePolicySeo](../../app/composables/usePolicySeo.ts) for HTTP 503, noindex and no-store responses.
Their page metadata marks them `reviewOnly`; the root head owner filters canonical and language-alternate tags after resolution, including the SEO module's automatic canonical.
Keep their provisional presentation and sitemap exclusion until publication facts and policy content are explicitly approved.
The standalone [error shell](../../app/error.vue) preserves 404 and other error statuses and emits noindex without canonical/hreflang links.

## Publication Verification

| Concern            | Evidence to collect                                                                      |
| ------------------ | ---------------------------------------------------------------------------------------- |
| Localized content  | Correct French/English headings, metadata, HTML language and reciprocal alternates       |
| Client navigation  | Head and schema update after page/locale changes and error recovery                      |
| URLs               | Direct loads, accented/encoded paths, single-hop home redirects and genuine unknown 404s |
| Images             | Successful response, actual MIME/dimensions and publicly reachable sharing URL           |
| Indexing           | Environment-specific headers/meta/robots and sitemap contents                            |
| Schema             | Valid supported nodes, visible matching facts and stable identities                      |
| External discovery | Actual crawler/social checks and account validation when available and authorized        |

Local builds do not prove public crawler access, rankings or social-platform cropping.
Report deployment, account and external validation separately from local checks.
Use [content direction](content-direction.md) for factual boundaries and [accessibility](accessibility.md) for error and recovery interaction.
