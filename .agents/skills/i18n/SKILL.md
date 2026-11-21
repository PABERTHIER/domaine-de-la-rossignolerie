---
name: i18n
description: Add, update or review Domaine de la Rossignolerie French and English messages, interpolation, reactive translated UI and equivalent-page navigation. Use for localization work; translation-only requests do not require creating routes.
---

# Winery Internationalization

Follow [AGENTS.md](../../../AGENTS.md) and the [i18n instructions](../../../.github/instructions/i18n.instructions.md).
Read affected messages and consumers before editing.
Use [content direction](../../docs/content-direction.md) for voice and factual boundaries.

## Message Ownership

French is the source language; English preserves the same meaning and actions.
Keep the supplied regional formatting convention rather than renaming locale files during a wording change.
Search existing namespaces before adding keys and keep component labels with their component's message owner.
Stable IDs, proper names, contact destinations and verified numerical facts can remain shared data.
Authored prose, accessible names, image alternatives, errors and metadata belong in translated messages.

| Change                  | Required handling                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------------ |
| Add a message identity  | Add matching key/value shapes and placeholders in both locales                                         |
| Rename or remove a key  | Update both locales and every consumer, including generated key families                               |
| Correct wording         | Change the affected language without forcing an unrelated edit to correct existing wording elsewhere   |
| Change factual content  | Preserve the same verified fact in both languages and shared data                                      |
| Translate a proper name | Retain official wine, estate and appellation names unless a supplied translation establishes otherwise |

Do not infer missing English from fallback French or treat fallback output as parity evidence.
Keep interpolation names and intended plural behavior aligned.
Parse JSON and compile affected messages; `|`, `@` and braces can be message syntax even in valid JSON.
Use structured rich text instead of introducing arbitrary HTML injection.

## Reactive UI

Translate in templates or tracked getters.
Use `computed()` for script-side translated arrays, captions and navigation objects.
Reading a computed value once into a static object still produces a stale snapshot.
Keep mutable tab selection, menu expansion and viewer position separate from translated labels.
Inspect consumers that cache measurements or rows and verify their metadata updates without a resize.

## Routing And Asset Boundaries

Preserve unprefixed French and equivalent `/en` destinations as described in [SEO](../../docs/SEO.md#url-identity-and-language).
Use `useLocalePath()` for internal destinations and `useSwitchLocalePath()` for language changes where supported by the installed integration.
Preserve page/project identity and translated dynamic parameters rather than sending every language change home.
Do not translate or prefix public image paths, email/telephone links or external destinations.
Keep a stable project ID separate from the supplied decomposed-accent slug.

Check URL, HTML language, visible content and metadata together.
Changing a locale variable alone does not prove navigation succeeded.
Do not add a parallel localStorage/cookie preference mechanism without inspecting the actual language owner.

## Verification

Compare affected leaf key paths, value types and interpolation names across both locales.
Search dynamic key construction before deleting messages.
Compile changed messages with available project checks and inspect source consumers.
Switch languages without reloading and verify headings, selected wine, photo captions, controls, errors and metadata affected by the task.
Check direct localized URLs and longer English text on small screens.
Report existing parity defects separately from the requested change and state unavailable browser coverage.
