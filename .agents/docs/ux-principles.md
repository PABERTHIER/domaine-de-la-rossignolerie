# Domaine de la Rossignolerie — UX Principles

Keep estate, wine, contact/visit and photo journeys direct in French and English.
Design around genuine visitor actions and practical information.
The requirements below are acceptance criteria rather than claims of completed implementation.

## Navigation And Language

Expose the primary destinations and language control clearly at desktop and mobile sizes.
Language controls identify Français and English and preserve the equivalent page or project.
Keep expanded menu state separate from translated display strings.
Navigation links retain native modified-click and open-in-new-tab behavior.

Use a button with `aria-expanded` and a controlled-region relationship for a disclosure menu.
A non-modal disclosure does not need an artificial focus trap.
A modal menu needs complete dialog behavior, background isolation and focus return.
Keep long menus scrollable on short screens and close them on navigation and Escape.
Do not delay route navigation solely for a decorative exit animation; coordinate destination focus and scrolling with overlay release.

Preserve one main landmark and one meaningful H1.
Keep a visible-on-focus skip link with a valid focusable main destination.
Route completion must not leave keyboard focus on removed content or under a fixed header.

## Wine Exploration

Preserve all six wine presentations and their supplied order, including the two Anjou blanc vintages.
Keep the selected label, bottle, tasting notes and factual quantities associated.
All wines must remain discoverable on touch without relying on a drag gesture.

Use an accessible tabs pattern when the interface behaves as tabs.
Associate tab and panel IDs, expose selection, use roving tabindex and support arrow, Home and End navigation.
Keep inactive panels out of keyboard navigation.
Choose activation timing that remains responsive; avoid expensive work on every focus movement.
Keep the selected tab visible when its strip scrolls.

Reflow the presentation into readable mobile columns rather than shrinking a desktop composition.
Keep meaningful wine information available in server-rendered content and in the absence of JavaScript.
Do not make accessibility depend on hidden duplicate panels that repeat controls in the tab order.

## Gallery And Photo Viewing

Preserve project identities and curated image order rather than re-sorting by dates or filenames.
Show cover titles without requiring hover.
Distinguish previous/next project links from previous/next image actions.
Retain useful supplied captions and date/type/location information without inventing missing fields.

| Viewer concern | Acceptance criterion                                                            |
| -------------- | ------------------------------------------------------------------------------- |
| Opening        | Operable trigger with a concise name and a reliable focus-return target         |
| Composition    | Full image visible at fit size with undistorted proportions                     |
| Navigation     | Visible previous/next controls and position within the selected sequence        |
| Zoom and pan   | Visible fit/zoom actions and alternatives to gesture-only or drag-only behavior |
| Closing        | Reachable close button, Escape behavior and restored focus/scroll position      |
| Failure        | Visible localized loading/error feedback without stale image updates            |

Use native photo links where they provide useful fallback and modified-click behavior.
Keep range-input keyboard behavior intact if zoom uses a range control.
Do not let image-navigation shortcuts consume arrows intended for a focused input.

## Contact And Visits

Preserve the supplied name, telephone, email and message fields.
Email is required in the supplied form; do not silently make every field mandatory.
Use visible labels, appropriate autocomplete/type/inputmode and errors linked to the affected field.
Explain the required information in the form itself.

| State                 | Required behavior                                                             |
| --------------------- | ----------------------------------------------------------------------------- |
| Idle                  | Clear fields, required indicators and practical contact alternatives          |
| Invalid               | Localized actionable errors with input retained and focus directed usefully   |
| Sending               | Announced pending state and protection against accidental duplicate sends     |
| Accepted              | Success only after the configured service accepts delivery                    |
| Failed or unavailable | Honest recoverable feedback, input preserved and email/telephone alternatives |

An enquiry does not reserve a slot, confirm a visit or make a purchase.
Do not imply inbox delivery from provider acceptance alone.
Keep server validation and abuse handling independent of browser validation.
Verify delivery behavior using isolated transports during development.

Show address, hours and telephone as readable text with useful contact links.
Provide a working directions link without requiring an embedded map.
Add an embed only when its service, privacy implications and accessibility are understood within the task.

## Loading And Recovery

Render important text and navigation on the server.
Reserve media space and prioritize only genuine early-viewport candidates.
Defer below-fold photos and large viewer images until needed.
Do not put a blocking custom loader in front of essential content.

Missing and retired URLs need meaningful recovery with their actual HTTP status.
Keep recovery actions localized and preserve the visual identity without pretending an error is an ordinary content page.
Use [SEO](SEO.md) for status, canonical and indexing requirements.

## Mobile Acceptance

| Area               | Acceptance criterion                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------- |
| Composition        | Clear identity and next action, with no page-level horizontal overflow or clipped content |
| Reading            | Comfortable French/English wrapping, 200% text enlargement and enabled browser zoom       |
| Touch              | Standalone targets at least 44 by 44 CSS px, with room between adjacent actions           |
| Menu               | Reachable toggle/close, visible expanded state and scrollable short-screen content        |
| Wines              | Every selector and all wine information reachable without hover or drag-only interaction  |
| Photos             | Complete fit view, visible controls and restored place after dismissal                    |
| Form               | Usable labels, field errors, pending/failure feedback and input preservation              |
| Viewport           | Fixed UI respects browser toolbars, short landscape screens and safe areas                |
| Language           | Equivalent URL, translated visible state and metadata remain in agreement                 |
| Loading and motion | Reserved image space, prompt actions and reduced-motion behavior                          |

Check affected journeys at 320, 375, 430, 768, 1024 and 1440 CSS px widths, including 320×568 and relevant landscape states.
Check between breakpoints and with longer English content.
For release coverage, exercise iOS Safari and Android Chrome where available and distinguish real-device results from desktop emulation.
Check slow loading and a throttled mobile environment when performance or shared UI is affected.
Record browser/device, language, viewport, state and outcome; report unavailable coverage.
