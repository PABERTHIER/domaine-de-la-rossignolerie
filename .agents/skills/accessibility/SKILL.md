---
name: accessibility
description: Audit or improve Domaine de la Rossignolerie semantics, keyboard and touch controls, wine tabs, photo-viewer focus, forms, responsive readability and reduced motion. Use for accessibility work and changes to interactive UI.
---

# Winery Accessibility

Follow [AGENTS.md](../../../AGENTS.md) and the [accessibility instructions](../../../.github/instructions/accessibility.instructions.md).
Read the relevant [accessibility guide](../../docs/accessibility.md) section and inspect the affected UI together with its consumers.
Use WCAG 2.2 AA as the target while distinguishing source evidence from verified conformance.
Current focus, scrolling and lease ownership is mapped in the guide's [source table](../../docs/accessibility.md#current-source-and-ownership).

## Select The Mode

| Request                | Work                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------ |
| Audit or review        | Inspect available source/runtime states and report findings without editing unless fixes are requested |
| Controls or navigation | Implement native semantics, meaningful names, visible focus and complete activation/close behavior     |
| Wine tabs or viewer    | Verify selection, keyboard shortcuts, focus containment/return and non-gesture alternatives            |
| Form                   | Verify labels, required information, errors, pending/results and recoverable failure                   |
| Appearance or motion   | Measure actual contrast and inspect text enlargement, short screens and reduced motion                 |

## Interaction Requirements

Use links for destinations and buttons for actions.
Keep DOM and focus order logical and use localized names for icon-only controls.
Keep informative image alternatives concise and decorative or redundant images silent.
Do not make essential actions hover-only, color-only, drag-only or gesture-only.
Preserve 44 by 44 CSS px standalone touch targets without requiring the visible icon to fill the entire hit area.

Inspect modal triggers and return targets together.
Opening moves focus inside, dismissal returns it usefully and background content remains inactive while open.
Test Escape from every relevant control, including zoom inputs.
Keep close/fit controls reachable at short heights and enlarged text.
Preserve native range-input arrows rather than intercepting them for image navigation.

Use appropriate tablist selection, associations, roving focus and arrow/Home/End behavior for wine tabs.
Keep inactive panels out of the tab order and all wine content meaningfully available without JavaScript.
Use a disclosure pattern for non-modal menus and full modal behavior only when the menu is modal.
Check close behavior on navigation, language change and responsive mode changes.

Link field errors to inputs and announce pending/result states without flooding live regions.
Preserve input on failure and keep practical contact alternatives available.
Coordinate overlay locks and scrolling through their actual owners, releasing resources on dismissal/unmount.
Use `$overlayScroll.lock()` for scroll ownership and separately verify native modal focus/inert behavior.
Await final unlock before destination focus; keep the actual opener for focus return rather than assuming pointer activation focused it.
Preserve the shared `main-content` destination and temporary-tabindex cleanup when changing navigation focus.

## Verification And Reporting

Use the [manual audit matrix](../../docs/accessibility.md#manual-release-audit) for coverage appropriate to the request.
Check keyboard, touch, focus visibility, narrow/short screens, text enlargement and reduced motion for affected French/English journeys.
Measure actual text, focus and state contrast against the rendered backgrounds.
Include text-spacing overrides and forced-colors controls where relevant; do not replace system colors with fixed brand colors.
Use available screen readers and accessibility-tree/automated tools as complementary evidence.
Report each finding with location, reproduction, impact and expected behavior.
State missing browser/device/assistive-technology coverage; source fixes or a score do not establish conformance.
