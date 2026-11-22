# Domaine de la Rossignolerie — Design System

Keep the estate's green bird, restrained green/cream identity, condensed headings and real photography recognizable.
Use supplied design values as evidence for visual decisions, not proof of measured accessibility.
Improvements should address concrete readability, layout or interaction needs within the task.

## Styling Ownership

Current owners are [variables.scss](../../app/styles/variables.scss) for CSS-free tokens, [default.scss](../../app/styles/default.scss) for base/focus/motion rules, [keyframes.scss](../../app/styles/keyframes.scss) for shared animations and [shared.scss](../../app/styles/shared.scss) for reusable classes.
[Nuxt configuration](../../nuxt.config.ts) loads the base, keyframe and shared-class sheets once and injects only tokens into component SCSS.
The [default layout](../../app/layouts/default.vue) owns the flex shell, focusable main and safe-area-aware content padding.

| Concern              | Ownership rule                                                                                           |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| Sass tokens          | Keep colors, typography, spacing, controls, layers, motion and breakpoints in a CSS-free token owner     |
| Global defaults      | Load resets, base typography, focus and reduced-motion rules once                                        |
| Shared classes       | Add reusable utilities for demonstrated cross-component use                                              |
| Shared animation     | Keep reusable definitions in [keyframes.scss](../../app/styles/keyframes.scss), loaded once through Nuxt |
| Shell structure      | Keep header/footer/main composition with the layout                                                      |
| Local appearance     | Keep page and component rules in scoped SCSS beside their owner                                          |
| Dynamic measurements | Keep measured image/zoom geometry in its owning behavior; use SCSS for static presentation               |

Do not inject CSS-emitting stylesheets into every component.
Use qualified BEM blocks, nested `&__element` and `&--modifier` rules where the relationship is intentional.
Separate declaration groups and nested selectors with blank lines.
Avoid mechanical class renames, excessive nesting and a parallel CSS framework.
Keep public component classes and transition state names stable during style-only cleanup.

## Palette

| Role   | Supplied value | Use                               |
| ------ | -------------- | --------------------------------- |
| Paper  | `#FFFDFB`      | Warm white page surface           |
| Cream  | `#DBDAD0`      | Pale header and secondary surface |
| Green  | `#285A5B`      | Headings and principal identity   |
| Vine   | `#075F47`      | Dark green action accent          |
| Ink    | `#0D2120`      | Dark text and strong contrast     |
| Sage   | `#B3BFB0`      | Wine presentation surface         |
| Yellow | `#FFB84D`      | Contact feature surface           |

These values reflect supplied design material.
Check actual rendered foreground/background pairs, including focus rings, disabled states and photo overlays.
Adjust a failing UI pairing with the smallest brand-consistent change while preserving the bird mark.
Do not treat every theme variable as a color visibly used by every descendant.

## Typography And Hierarchy

Use the condensed character of Oswald for headings and readable Roboto-style body/UI text.
Font family definitions do not prove which face or weight actually renders.
The [Nuxt configuration](../../nuxt.config.ts) uses `@nuxt/fonts` for Oswald 400 and Roboto 400/700, normal style, with Latin and Latin Extended subsets.
The Google provider resolves the configured families and the production build emits locally served font files.
Global family definitions are enabled; actual heading/body application belongs to rendered styles.
The global defaults now apply Roboto to body content and Oswald to headings without adding another font loader.
Check the resolved face, loading, line breaks and accented glyphs in both languages.
Use licensed font distributions and preserve their notices; downloaded source font files alone do not establish redistribution rights.

Keep the homepage title prominent with fluid sizing rather than a fixed desktop size on phones.
Use a logical H1/H2/H3 outline independently of visual text size.
Allow longer English labels and accented French headings to wrap naturally.
Preserve the browser's preferred root font size and comfortable body text.
Do not reproduce excessively thin or low-contrast text merely for visual similarity.

## Page Composition

| Area    | Recognizable composition                                                          | Responsive treatment                                                           |
| ------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Header  | Bird, full estate name and direct navigation                                      | Reflow links or use a labeled menu; retain language and contact access         |
| Home    | Vineyard hero, prominent title, estate/wine/visit image panels and photo sequence | Fluid headings, stacked panels and visible photo controls                      |
| Estate  | Introduction, personal story and three team portraits                             | Readable line lengths and natural image/text stacking                          |
| Wines   | Six selectors and a sage presentation with bottle and tasting notes               | All labels reachable, complete bottle proportions and readable stacked content |
| Contact | Cellar photo with a yellow form area and practical visit details                  | Visible labels, comfortable fields, honest feedback and useful directions      |
| Gallery | Ordered project covers and photo detail sequences                                 | Descriptive links, full-photo access and distinct project/image navigation     |
| Footer  | Bird, practical contact, useful policy/social destinations and copyright          | Wrapping groups with no dense duplicate navigation                             |

Use content-appropriate fluid containers rather than imposing one narrow maximum width on every composition.
Let text content determine section height.
Reserve image space without forcing all photographs into interchangeable cards.
Keep bottle labels undistorted with proportional containment.

## Assets And Surfaces

Use real vineyard, cellar, team and bottle images.
Keep intentional editorial crops in page panels; show full photographs in detail viewing.
Preserve transparency and aspect ratio for the bird and bottles.
Prefer rectangular panels, simple underlines and restrained controls consistent with the supplied identity.
Avoid unrelated decorative textures, excessive rounding or generated winery scenes.
Use the [asset skill](../skills/winery-assets/SKILL.md) for delivery and provenance decisions.

## Motion And Layers

Keep scrolling, photo controls and route navigation usable with native touch and browser zoom.
Respect reduced motion in CSS and JavaScript, including changes to the preference during a session.
Coordinate smooth scrolling, history restoration, anchor navigation and overlays through their actual shared owners.
Do not create a second smooth-scroll instance or independently restart one while another overlay remains open.
Retain native scrolling inside bounded dialogs and release scroll locks on dismissal and unmount.

Automatic photo rotation needs a persistent pause mechanism and must not restart simply because hover or focus ends.
Do not add parallax or decorative motion during structural cleanup.
Keep modal controls visible above their content and account for actual stacking contexts and safe areas.

## Visual Verification

Use [Nuxt Fonts configuration](https://nuxt.com/modules/fonts/configuration) and [provider guidance](https://nuxt.com/modules/fonts/providers) for family resolution options.

Compare matching states at matching viewports after fonts and images load.
Review logo proportions, hierarchy, colors, crops, section order and open menus/viewers.
Check both languages, narrow and short screens, touch hit areas, enlarged text and reduced motion.
Record intentional visual differences and the concrete problem they address.
Use [UX acceptance](ux-principles.md#mobile-acceptance) and [accessibility coverage](accessibility.md#manual-release-audit) alongside visual comparison.

## Responsive Structure And Layers

Use normal-flow shells whose header and footer grow with text.
Prefer a CSS minimum viewport height to a JavaScript viewport-height writer or fixed header/footer subtraction.
Add safe-area insets to normal gutters and keep close controls outside or above the scrolling region of short-screen overlays.
Match any JavaScript responsive mode to the actual rendered control rather than maintaining contradictory breakpoint logic.
Keep compact visual frames separate from usable touch hit areas.
Native dialogs occupy the browser top layer; inspect their child scrim, panel and backdrop together when changing transitions.

## Page And Component Conventions

Use page-qualified blocks such as `home-page`, `estate-page`, `wines-page`, `contact-page` and `gallery-page` for new page-owned presentation.
Keep shared public classes and typed variant contracts stable during cleanup.
Use rem/fluid values for scalable type and content bounds.
Use pixel tokens for static spacing, control sizes, borders, focus outlines and breakpoint thresholds; keep fluid gutters bounded by pixel values.
Retain pixel inputs for raster dimensions, measured geometry and one-pixel clipping utilities.
Do not create a separate token for every isolated value or mechanically convert all image/layout measurements.
Name actual transition properties instead of using `transition: all`.
Hover movement requires a fine pointer and a reduced-motion gate.
Focus must remain visible within image/frame clipping; a reveal animation must not leave a focused control transparent or replay after blur.
Keep captions in natural flow on touch layouts and ensure longer labels grow without overlapping neighboring rows.

## Scrollbar And Overlay Ownership

The [overlay plugin](../../app/plugins/overlay-scroll-lock.client.ts) temporarily preserves an occupied scrollbar gutter and the document height while fixing the body.
The final lease release restores previous styles and the real scroll offset, including whether Lenis was already stopped.
Do not reserve an empty resting gutter or add independent body-style mutations in a component.
Use `data-lenis-prevent` on native-scroll overlay regions.
Preserve system-color keywords and native scrollbars in forced-colors mode rather than substituting fixed brand colors.
