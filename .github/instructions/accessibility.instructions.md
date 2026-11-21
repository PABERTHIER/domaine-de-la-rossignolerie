---
description: 'Use when winery Vue, client integration or SCSS changes affect semantics, focus, overlays, tabs, forms, touch, readability or motion.'
applyTo: 'app/**/*.vue,app/plugins/**/*.ts,app/composables/**/*.ts,app/styles/**/*.scss'
---

# Accessibility Instructions

Use [accessibility](../../.agents/skills/accessibility/SKILL.md) for the scoped workflow and the [accessibility guide](../../.agents/docs/accessibility.md) for acceptance and manual audit coverage.
Treat WCAG 2.2 AA as the target without claiming conformance from source inspection alone.

Use links for destinations, buttons for actions and a logical heading/focus order.
Preserve the skip link, one main landmark and one meaningful H1.
Keep visible focus, localized control names and useful informative image alternatives.
Decorative/redundant images and icons must not create duplicate announcements.
Keep essential actions independent of hover, color, dragging or gestures alone.

Disclosures expose expanded state without an unnecessary focus trap.
Modals move/contain focus, prevent background interaction and return focus and scrolling on close.
Keep close and fit controls reachable on short screens and at enlarged text.
Coordinate scroll locks and resource cleanup through close, responsive changes and unmount.
Use the shared overlay lease for scroll ownership and verify modal focus/inertness separately.
Preserve the [focus plugin](../../app/plugins/navigation-focus.client.ts)'s `main-content`/hash destination and stale-request/temporary-tabindex cleanup.

Wine tabs need associated panels, selected state, roving focus and arrow/Home/End behavior.
Keep inactive panels out of keyboard navigation and preserve meaningful no-JavaScript content access.
Do not intercept native zoom/range-input keys as viewer navigation.
Forms need visible labels, associated actionable errors, announced result states and input retention after failure.

Measure real contrast and preserve 44 by 44 CSS px standalone touch targets.
Check text enlargement, safe areas, narrow/short layouts and reduced motion in CSS and JavaScript.
Include text-spacing overrides and forced-colors focus/control visibility where relevant.
Use [mobile acceptance](../../.agents/docs/ux-principles.md#mobile-acceptance) and report actual keyboard, touch, device and assistive-technology coverage.
