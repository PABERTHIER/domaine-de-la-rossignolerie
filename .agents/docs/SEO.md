# Domaine de la Rossignolerie — SEO

Keep localized discovery tied to real estate content, stable URLs and verified business facts.
This guide defines metadata and publication requirements without claiming deployed output or crawler validation.
Use the [SEO skill](../skills/seo/SKILL.md) for a scoped implementation or review.

## URL Identity And Language

The supplied public domain is `https://www.domainedelarossignolerie.com`.
Use the full name Domaine de la Rossignolerie rather than truncated title variants.
Verify the chosen canonical origin and deployment configuration before publication.

Preserve meaningful French paths, with French at the unprefixed root and English equivalents under `/en`.
Do not force browser-language redirection away from existing French URLs.
Language switching preserves page/project identity through locale-aware routing.
Keep stable project IDs separate from translated labels and encoded slugs.
Verify the supplied decomposed `laménagement` path and its percent-encoded form without accidental double decoding or normalization.

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

## Origins And Indexing

Resolve one trusted origin consistently for locale metadata, canonicals, sharing URLs, schema and sitemaps.
Do not derive identity solely from an arbitrary request Host header.
Check environment overrides against every module that reads them independently.
When configuration is embedded at build time, rebuild and serve under a compatible runtime configuration.

| Environment or response                | Required outcome                                                        |
| -------------------------------------- | ----------------------------------------------------------------------- |
| Local development                      | Local origin and noindex                                                |
| Preview/review                         | Actual preview origin and non-indexable content                         |
| Production awaiting publication review | Deliberate review policy without accidental indexing                    |
| Approved production                    | Canonical winery origin and crawlable indexable content                 |
| Unknown URL                            | Real 404 and noindex with useful recovery                               |
| Explicitly retired URL                 | Real 410 where recorded, without a blanket home redirect                |
| Server error or unavailable content    | Honest status and noindex, without misleading canonical/alternate links |

Treat `/home` as a single-hop permanent alias to `/` when applying the supplied URL disposition.
Do not infer that every unknown path is retired.
Choose redirects only when an actual equivalent destination exists and record deliberate URL changes.
Keep redirects and errors out of canonical page registries and sitemaps.

Robots crawl policy is distinct from access control and page-level indexing directives.
A crawler blocked from a page cannot inspect that page's noindex directive.
Inspect actual response headers, head output, robots and sitemap behavior for each environment.

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

## Publication Verification

| Concern            | Evidence to collect                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------- |
| Localized content  | Correct French/English headings, metadata, HTML language and reciprocal alternates            |
| Client navigation  | Head and schema update after page/locale changes and error recovery                           |
| URLs               | Direct loads, accented/encoded paths, single-hop aliases and correct unknown/retired statuses |
| Images             | Successful response, actual MIME/dimensions and publicly reachable sharing URL                |
| Indexing           | Environment-specific headers/meta/robots and sitemap contents                                 |
| Schema             | Valid supported nodes, visible matching facts and stable identities                           |
| External discovery | Actual crawler/social checks and account validation when available and authorized             |

Local builds do not prove public crawler access, rankings or social-platform cropping.
Report deployment, account and external validation separately from local checks.
Use [content direction](content-direction.md) for factual boundaries and [accessibility](accessibility.md) for error and recovery interaction.
