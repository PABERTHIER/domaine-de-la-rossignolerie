---
name: winery-assets
description: Add, replace or review Domaine de la Rossignolerie bird, vineyard, cellar, team and bottle assets with preserved provenance, proportions, responsive delivery and font licensing. Use for asset work rather than unrelated copy edits.
---

# Winery Assets

Follow [AGENTS.md](../../../AGENTS.md) and read [brand context](../../docs/brand-context.md) and the relevant [design system](../../docs/design-system.md) section.
Inspect the supplied file and its actual consumers before changing identity, crop or delivery.
Use the [content naming map](../i18n/references/content-naming.md) for picture and project IDs rather than guessing filenames from titles.

## Identity And Provenance

Preserve original filenames/casing, stable identities and curated photo order unless a deliberate change is required.
Do not infer people, dates, locations or image rights from filenames alone.
Keep original evidence unchanged and generate derivatives separately when the task requires them.
For generated outputs, retain source identity, original dimensions, crop context and a verifiable relationship to the original.
Do not duplicate covers just because source data repeats them.
Exclude stock/template media that does not belong to the estate.

| Asset                 | Presentation requirement                                                                           |
| --------------------- | -------------------------------------------------------------------------------------------------- |
| Bird mark             | Preserve proportions, colors and transparency; give linked branding an accessible home destination |
| Bottle                | Contain the complete bottle without stretching the label or clipping identity                      |
| Vineyard/cellar panel | Retain the intended editorial crop and focal point                                                 |
| Team portrait         | Preserve identity and framing without inventing biographical metadata                              |
| Gallery photograph    | Keep the full composition available in detail viewing and preserve sequence order                  |
| Font                  | Verify license and redistribution rights, retain notices and check accented glyph coverage         |

Do not generate replacements for business images during routine implementation.
Do not treat downloaded proprietary fonts as licensed for distribution.

## Font Delivery

[Nuxt configuration](../../../nuxt.config.ts) uses `@nuxt/fonts` with explicit Google-provider Oswald/Roboto families, weights and Latin subsets.
Keep one font-loading owner, preserve actual licensed faces and verify emitted local font URLs instead of adding a duplicate remote stylesheet or per-family packages.
Inspect generated CSS and HTTP responses as well as computed family/weight and accented glyphs in the browser.
Family declarations alone do not prove which face rendered.

## Delivery And Layout

Use public paths without a `/public` prefix and keep them independent of locale and canonical-origin configuration.
Supply truthful intrinsic dimensions and reserve layout space.
Distinguish CSS display size from bytes downloaded and source pixel dimensions.
Use real generated files for `srcset`; changing `sizes` or CSS alone does not reduce payload.
Do not document an image provider, optimizer or derivative pipeline as present without inspecting its implementation.
The [media manifest](../../../app/data/media.json) records 40 stable image identities and their supplied responsive variants, including actual variant byte counts.
The [dimension catalog](../../../app/data/imageDimensions.ts) measures the files themselves, rather than assuming an original's dimensions also describe a smaller derivative.
Keep both catalogs and the [public assets](../../../public/) synchronized; public URLs remain independent of locale prefixes and canonical origins.
When replacing/removing media, search explicit arrays, generated names, locale descriptions, metadata, previews and configuration before deleting the original.

Prioritize genuine early-viewport/LCP candidates and defer below-fold photographs.
Eager loading and high fetch priority are separate decisions.
Large viewer images should load when needed, with useful localized loading/error feedback.
Keep asynchronous decode/load callbacks from updating obsolete selections.

## Verification

Check exact path casing, file existence, dimensions, aspect ratio, MIME type and file size.
Inspect source and rendered crops, bottle proportions, responsive selection and reserved space.
Verify actual image requests on the serving origin and in the selected output environment when available.
Check translated alt/captions and keyboard-operable preview actions with [accessibility](../accessibility/SKILL.md).
Report original/derivative choices and unavailable deployed verification without claiming image optimization from CSS alone.
