# Domaine de la Rossignolerie — Accessibility

Use WCAG 2.2 AA as the review target and comfortable mobile interaction as a project requirement.
This guide defines acceptance and audit coverage, not a completed conformance assessment.
Keep source findings, intended behavior and verified runtime results distinct.

## Review Ownership

| Concern                  | Inspect together                                                                       |
| ------------------------ | -------------------------------------------------------------------------------------- |
| Landmarks and navigation | Shell, skip link, page headings and completed-route focus                              |
| Menu behavior            | Trigger, controlled region, responsive modes and close lifecycle                       |
| Wine selection           | Tablist, selected state, keyboard behavior and panel visibility                        |
| Photo viewing            | Trigger, modal, image sequence, zoom controls and focus return                         |
| Contact                  | Labels, validation, error summaries, pending state and server feedback                 |
| Readability and motion   | Actual backgrounds, focus styling, type scaling, reduced motion and scroll integration |

Inspect the current implementation before deciding which component owns a change.
For an audit request, report findings without editing unless fixes are requested.
Use the [accessibility skill](../skills/accessibility/SKILL.md) for a focused implementation or review workflow.

## Semantics And Names

Use native links for destinations and buttons for actions.
Give non-submit buttons `type="button"` where a form context can otherwise submit them.
Keep reading order and keyboard order aligned; do not use positive tabindex values.
Expose one main landmark and one meaningful H1, with headings structured by content hierarchy.

Give icon-only controls localized accessible names and keep decorative icons hidden from assistive technology.
Visible labels must remain represented in their control's accessible name.
Distinguish essential names from optional tooltip hints; touch access cannot depend on hover.
Use descriptive alt for informative photos and empty alt for decorative or genuinely redundant images.
Avoid duplicating full captions and tasting paragraphs in accessible action names.

## Keyboard And Focus

Every essential action must work with the keyboard and a single pointer.
Keep focus indicators visible against actual surfaces and clear of sticky UI.
Check Tab/Shift+Tab order, Enter/Space actions, Escape handling and relevant arrow keys.
Do not replace native range-input key handling with gallery shortcuts.

Opening a modal moves focus inside and prevents background interaction.
Keep focus contained while the modal is open and return it to a usable invoking control on close.
The close action must remain reachable at short viewport heights and enlarged text.
Release scroll locks, pointer captures and observers on close and unmount, including interrupted transitions.
Multiple active overlays must not independently restore background scrolling.

A disclosure menu exposes expanded state without pretending to be a modal.
A modal menu must satisfy the modal requirements in full.
Route and language changes close transient navigation and move focus only when the destination and overlay lifecycle permit it.

## Wines, Photos And Forms

Wine tabs need selected state, associated panels, roving tabindex and complete arrow/Home/End behavior.
Inactive panels must not contribute stray focusable descendants.
All wine information remains meaningfully accessible without JavaScript.

Photo viewers expose close, previous/next and fit/zoom actions visibly.
Keep complete photo composition available at fit size and supply alternatives to dragging or gesture-only panning.
Loading, error and image-position announcements should convey useful changes without flooding live regions.

Form fields need visible labels, required indicators and associated errors.
Keep validation errors actionable and preserve entered values after a failed request.
Announce sending and result states without moving focus unpredictably.
Keep email and telephone alternatives available when delivery is unavailable.
Do not claim success solely from a client-side animation or timer.

## Contrast, Reflow And Motion

Measure text contrast against real backgrounds: at least 4.5:1 for ordinary text and 3:1 for qualifying large text.
Check applicable non-text control/state contrast at 3:1, including focus and selection indicators.
Do not use color alone to communicate state or errors.
Check photo-overlay text after the actual image and crop load.

Keep content usable at 200% text enlargement and at 320 CSS px reflow width.
Allow text wrapping, natural section height and browser pinch zoom.
Standalone touch controls need 44 by 44 CSS px hit areas with useful spacing; the visible icon may remain smaller.
Check short landscape viewports, browser bars and safe-area insets around fixed controls.
Fix the source of overflow instead of masking it with document-level clipping.

Respect reduced-motion preferences in CSS and JavaScript, including smooth scrolling and automatic rotation.
Provide a persistent pause for automatic photo sequences.
Do not restart rotation merely because hover or keyboard focus leaves.
Keep focus restoration usable without forced animated scrolling.

## Manual Release Audit

| Coverage               | Exercise                                                                                   | Record                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| Keyboard               | Skip link, menu, language controls, wine tabs, viewer, form and recovery                   | Order, visible focus, activation, Escape and focus return      |
| Touch and pointer      | Narrow layouts, every wine, image actions, pan alternatives and form controls              | Target spacing, discoverability and gesture alternatives       |
| Reflow and enlargement | 320×568, landscape, 200% text and relevant browser zoom                                    | Clipping, overflow, reachable close controls and sticky UI     |
| Reduced motion         | Preference at startup and after a change                                                   | Scrolling, transitions, rotation and cleanup                   |
| Screen reader          | Landmarks, names, tab states, dialog, field errors and result announcements                | Platform, reader, language and concrete outcomes               |
| Contrast               | Text, focus, disabled/selected states and image overlays                                   | Actual pairing and measured ratio                              |
| Browser/device         | Affected French/English journeys on desktop, iOS Safari and Android Chrome where available | Device or emulation, browser version, viewport and limitations |
| Loading and failure    | Delayed/broken photos and rejected/unavailable contact processing                          | Reserved space, feedback and recovery                          |

Automated checks and accessibility-tree inspection complement manual coverage.
A build, screenshot or automated score does not prove conformance or mobile compatibility.
Report a finding with location, reproduction, expected behavior, observed impact and verification coverage.
For shared components, inspect different consuming pages and states.
Use [UX acceptance](ux-principles.md#mobile-acceptance) for the parallel journey checklist.
