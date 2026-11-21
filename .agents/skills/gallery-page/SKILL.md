---
name: gallery-page
description: Create, extend or review Domaine de la Rossignolerie photo-project pages, ordered image groups, bilingual captions, metadata and adjacent-project navigation. Use for a gallery workflow rather than translation-only or metadata-only changes.
---

# Winery Gallery Pages

Follow [AGENTS.md](../../../AGENTS.md) and inspect the requested project, supplied photos and nearest actual gallery consumer.
For review mode, report source/runtime findings without editing unless fixes are requested.

## Sources And Ownership

| Concern                           | Guidance or current source                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------ |
| Stable identities                 | [Content naming map](../i18n/references/content-naming.md)                                 |
| Titles, descriptions and captions | `pages.gallery.*`, `pictures.*` in [both locales](../../../i18n/locales/)                  |
| Factual boundaries                | [Content direction](../../docs/content-direction.md)                                       |
| File identity and delivery        | [Winery assets](../winery-assets/SKILL.md)                                                 |
| Locale reactivity                 | [i18n](../i18n/SKILL.md)                                                                   |
| Search and sharing                | [SEO](../seo/SKILL.md)                                                                     |
| Composition and viewer journey    | [UX principles](../../docs/ux-principles.md), [design system](../../docs/design-system.md) |
| Controls and focus                | [Accessibility](../accessibility/SKILL.md)                                                 |

An existing page is a structural reference, not proof that all of its metadata, reactivity or interaction is correct.
Load only the linked workflows needed by the request.

## Establish The Project

Resolve stable project ID, supplied French title, English equivalent, actual media list and authored ordering independently.
Preserve the four supplied project identities and their curated order; do not sort by date or filename.
Keep a missing optional description absent instead of inventing a story.
Project display dates do not establish upload or modification timestamps.
Check exact filename casing, irregular sequences and missing numbers before constructing an image array.
Do not assume every `photo-<number>` exists or insert a cover twice because source data repeats it.
Resolve actual route names and Unicode slugs from the relevant source rather than deriving them from the display title.
Continue independent work when an optional fact is unresolved; report a missing source that prevents the requested result.

## Build Or Extend The Page

Inspect the shell before deciding main/H1 ownership and reuse existing page/viewer contracts where available.
Keep page-specific composition local, with qualified BEM classes and readable mobile text flow.
Use a meaningful heading and the supplied description only where it adds content rather than repeating the same paragraph twice.
Keep translated photo/caption/navigation collections inside computed getters and mutable viewer selection separate.
Use meaningful image alternatives from `pictures.*` and preserve full-photo detail access.
Native links retain useful direct-file and modified-click behavior; preview actions need a named operable control and a reliable actual opener for focus return.
Keep the viewer sequence bounded to the selected group and distinguish previous/next image from previous/next project.
Coordinate overlays with `$overlayScroll` and keep native-scroll regions `data-lenis-prevent`.
Preserve complete fit view, reachable close/fit controls, non-gesture alternatives and useful loading/failure feedback.
Metadata uses the route-qualified `seo.gallery_<id>` identity, actual representative imagery and measured dimensions.
Keep canonical/language ownership centralized and preserve equivalent French/English project destinations.
Do not add filenames, routes, component contracts or optimizers to documentation until they exist.

## Connect Navigation

Update only the requested project entry and genuinely related neighboring links.
Keep explicit curated order and preserve unrelated destinations.
Use locale-aware links rather than assembling language prefixes or manually translating a slug.
Check current-project, first/last, direct-entry and history-return behavior separately from image navigation.

## Verification And Review

Check bilingual key/placeholder parity, exact media paths, matching captions and intended order.
Compile changed messages and run declared task-relevant checks.
Exercise direct entry, client route/locale changes, unchanged-width caption refresh and overlay dismissal where runtime coverage is available.
Use the [mobile matrix](../../docs/ux-principles.md#mobile-acceptance) and [accessibility audit](../../docs/accessibility.md#manual-release-audit) for keyboard, touch, text enlargement and short screens.
Report findings with location, reproduction and impact, separating source inspection from actual browser/device outcomes.
