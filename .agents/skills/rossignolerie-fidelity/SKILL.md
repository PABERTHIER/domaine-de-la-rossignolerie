---
name: rossignolerie-fidelity
description: Build or refine Domaine de la Rossignolerie winery pages and responsive compositions while preserving its bird, photographs, palette and recognizable hierarchy. Use for visual implementation rather than creating a new brand.
---

# Winery Visual Fidelity

Follow [AGENTS.md](../../../AGENTS.md).
Read [design system](../../docs/design-system.md), [UX principles](../../docs/ux-principles.md) and the affected composition or supplied visual reference.
Inspect real assets before choosing a crop, container or heading scale.

## Compose Within Scope

Keep the bird mark, cream/green/yellow vocabulary, condensed headings and real estate imagery recognizable.
Preserve the supplied content hierarchy and direct estate/wine/contact/gallery journeys.
Use the requested level of fidelity; do not treat routine implementation as permission for a new art direction.
Make useful visual improvements only within the task and explain the concrete issue they address.

Understand the desktop structure and compose coherent small-screen behavior.
Reflow panels and long English labels instead of shrinking all content or hiding essential controls.
Preserve bottle proportions, intentional panel crops and complete photo detail views.
Keep text sections content-driven rather than reproducing large empty source regions or fixed desktop heights.

Check actual rendered fonts, colors and text spans instead of assuming a theme definition proves visible use.
Use scoped SCSS, qualified BEM blocks and the documented token/base/shared-style separation.
Do not add decorative card systems, textures or generated imagery unrelated to the supplied identity.

## Coordinate The Page

Use [winery content](../rossignolerie-content/SKILL.md) for authored wording and factual changes.
Use [Nuxt patterns](../nuxt-vue-patterns/SKILL.md) for structure, SSR and lifecycle work.
Use [winery assets](../winery-assets/SKILL.md) for file identity, responsive delivery and font rights.
Use [accessibility](../accessibility/SKILL.md) for menus, wine tabs, viewers or forms.
Use [SEO](../seo/SKILL.md) when page identity, metadata or URL behavior changes.
Use [gallery-page](../gallery-page/SKILL.md) for a full photo-project workflow and its ordered media/navigation.
Load only workflows needed for the requested change.

## Verification

Compare matching viewport/state after fonts and photos load.
Inspect logo, palette, hierarchy, crops, section order and open interactions.
Check both languages, narrow/short screens, visible focus, touch targets and reduced motion.
Use the [mobile acceptance matrix](../../docs/ux-principles.md#mobile-acceptance).
Record intentional differences and checks actually performed; a matching desktop screenshot does not prove mobile usability.
Check actual Nuxt Fonts family/weight output and preserve the existing Lenis/overlay/focus ownership when changing presentation around navigation.
