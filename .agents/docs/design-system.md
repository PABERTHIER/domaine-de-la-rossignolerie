# Domaine de la Rossignolerie — Design System

Keep the estate's green bird, restrained green/cream identity, condensed headings and real photography recognizable.
Use supplied design values as evidence for visual decisions, not proof of measured accessibility.
Improvements should address concrete readability, layout or interaction needs within the task.

## Styling Ownership

| Concern              | Ownership rule                                                                                       |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| Sass tokens          | Keep colors, typography, spacing, controls, layers, motion and breakpoints in a CSS-free token owner |
| Global defaults      | Load resets, base typography, focus and reduced-motion rules once                                    |
| Shared classes       | Add reusable utilities for demonstrated cross-component use                                          |
| Shared animation     | Centralize a definition only when actual consumers need it                                           |
| Shell structure      | Keep header/footer/main composition with the layout                                                  |
| Local appearance     | Keep page and component rules in scoped SCSS beside their owner                                      |
| Dynamic measurements | Keep measured image/zoom geometry in its owning behavior; use SCSS for static presentation           |

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

Compare matching states at matching viewports after fonts and images load.
Review logo proportions, hierarchy, colors, crops, section order and open menus/viewers.
Check both languages, narrow and short screens, touch hit areas, enlarged text and reduced motion.
Record intentional visual differences and the concrete problem they address.
Use [UX acceptance](ux-principles.md#mobile-acceptance) and [accessibility coverage](accessibility.md#manual-release-audit) alongside visual comparison.
