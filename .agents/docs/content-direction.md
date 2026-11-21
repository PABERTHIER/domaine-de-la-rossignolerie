# Domaine de la Rossignolerie — Content Direction

French is the source language and English must preserve the same meaning and visitor access.
Keep the estate's direct, personal voice and useful factual detail.
Clarify supplied information without inventing wine expertise, biographies or marketing claims.

## Voice And Point Of View

| Context             | Preferred treatment                                                 | Avoid                                                   |
| ------------------- | ------------------------------------------------------------------- | ------------------------------------------------------- |
| Navigation          | Short destination labels such as estate, wines, contact and gallery | Slogans that hide the destination                       |
| Estate story        | Personal account grounded in supplied facts                         | Invented family history, awards or tradition            |
| Wine presentation   | Named wine, vintage, grapes and restrained tasting description      | Unsupported quality rankings, prices or certifications  |
| Visit information   | Clear practical details and a genuine way to enquire                | Promises of availability or reservation confirmation    |
| Calls to action     | A verb that explains the destination or action                      | Ambiguous labels or implied purchases                   |
| Errors and feedback | Explain the result and the available next action                    | Simulated success, blame or unexplained technical codes |

Preserve official names including Chenin, Grolleau, Anjou and Coteaux du Layon in English.
Keep the estate name unchanged.
Use natural English rather than literal French phrasing.
Keep first-person estate passages in that voice instead of turning them into impersonal promotional copy.
Utility text should be understandable out of context, including a screen reader's links list.
Use US English spelling and conventions without changing French proper names or business facts.

## Message And Page Ownership

| Content                                 | Current message owner                                                                                                                                       |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stable estate name and logo alternative | `app.*`                                                                                                                                                     |
| Main visitor copy                       | `pages.home.*`, `pages.estate.*`, `pages.wines.*`, `pages.contact.*`                                                                                        |
| Project introduction and metadata       | `pages.gallery.*`, including `projects.<id>`                                                                                                                |
| Shared control and state messages       | `components.layout.*`, `components.header.*`, `components.footer.*`, `components.lang_switcher.*`, `components.contact_form.*`, `components.photo_viewer.*` |
| Image alternatives                      | `pictures.<media-id>` and wine-specific `pages.wines.items.<id>.alt`                                                                                        |
| Search and sharing copy                 | `seo.site.*`, `seo.<page>.*` and `seo.image_alt`                                                                                                            |
| Policy-review and recovery text         | `pages.policies.*`, `error.*`                                                                                                                               |

The [French source](../../i18n/locales/fr-FR.json) and [US English messages](../../i18n/locales/en-US.json) use the same key identities.
`pages.*.tab_name` is a navigation label; it does not replace a full search title.
Use the [content naming map](../skills/i18n/references/content-naming.md) for stable wine/project IDs and metadata names.

## Wine Information

These are supplied editorial facts, not current stock, availability or an independently verified inventory.
The annual production figures must retain their meaning and vintage context.

| Presentation                    | Supplied grapes and description                                                   | Annual production |
| ------------------------------- | --------------------------------------------------------------------------------- | ----------------- |
| Anjou blanc sec 2025            | Chenin, older Rossignolerie parcel; yellow peach, lime blossom and acacia notes   | 5 733 bottles     |
| Anjou blanc sec 2024            | Chenin, schist-rich terroir; white flowers, pastry, white peach and mineral notes | 4 667 bottles     |
| Rosé de Loire sec 2025          | Grolleau; tart fruit and raspberry notes                                          | 2 133 bottles     |
| Fines bulles blanches — L'Epure | Chenin; lightly brioche, green apple and white-flower notes                       | 4 910 bottles     |
| Fines bulles rosées — L'Eclat   | Grolleau; red fruit and rose notes                                                | 1 078 bottles     |
| Coteaux du Layon 2025           | Chenin, Monts Pertus; ripe fruit and lavender-honey notes                         | 2 800 bottles     |

Keep the two Anjou blanc vintages distinct even where bottle imagery is shared.
Do not infer prices, alcohol percentage, bottle volume, current stock, exact vinification or additional appellation claims.
Check revised names, quantities and vintage information against supplied evidence before publication.

## Photo Projects

Preserve supplied project order independently from chronological sorting.
Displayed project dates describe authored metadata, not guaranteed creation or upload dates.

| Order | Project                | Supplied display date |
| ----- | ---------------------- | --------------------- |
| 1     | Retour des beaux jours | May 2026              |
| 2     | Les vignes du domaine  | October 2025          |
| 3     | L'aménagement          | June 2025             |
| 4     | Grappe de Chenin       | September 2025        |

Keep stable project identities separate from translated titles and URL spellings.
The supplied `laménagement` path contains a decomposed accent; do not normalize it as an incidental editorial cleanup.
Preserve curated image order and do not insert a cover a second time because source data repeats it.

## Image Alternatives And Captions

Describe useful visible meaning rather than filenames or export-tool labels.
For bottle imagery, identify the wine concisely without repeating its entire tasting description.
Keep captions distinct from action names and image alternatives.
Use empty alt for decorative or redundant images when adjacent content already supplies the same meaning.
A linked logo needs an accessible home destination without duplicated spoken branding.
Do not infer names, location or dates solely from a photo filename.

## Content Boundaries

Editor prompts, empty-project instructions, template payment lists and sample booking/order data are not estate copy.
Exclude generic sample addresses, telephone numbers, service prices and confirmation messages.
An empty shop banner does not establish organic, free-range or other certification claims for the wines.
Preserve genuine wine content while removing the supplied 2024 panel's sample editor paragraph.

Legal, privacy and cookie text must describe actual business information and services.
Do not publish host details, retention promises or consent behavior inferred from generic templates.
Resolve missing facts within the affected publication scope while continuing independent work.
Use [brand context](brand-context.md) for supplied factual values and [UX principles](ux-principles.md#contact-and-visits) for honest form feedback.

## Translation And Message Safety

Keep key paths, value shapes and interpolation names aligned across French and English.
Use locale-aware number/date formatting without changing underlying factual values.
Use `en-US` for English formatting; a formatting locale is not a claim about sales markets or business location.
Translate labels, validation, sending/failure/success states, captions, alt text, metadata and errors.
Keep translated script-side data reactive rather than taking setup-time snapshots.
Inspect Vue I18n syntax for `|`, `@` and braces; valid JSON alone does not prove a message compiles.
Use text or structured rich-text components instead of injecting arbitrary translated HTML.

## Metadata And Visible Copy

Adapt a long supplied description into a complete, useful metadata sentence rather than cutting it at an arbitrary character position.
Keep visible titles, captions and search descriptions aligned in meaning without duplicating entire paragraphs into every field.
Use [SEO guidance](SEO.md) for ownership, images and semantic fields.
Do not advertise a form, transaction or service as operational based only on the presence of its translated messages.

## Editorial Verification

Compare revised French against the supplied wording and check English for the same factual meaning.
Check names, vintages, quantities, project order and interpolated values separately from prose quality.
Inspect affected consumers for stale translated state, missing keys and longer English wrapping.
Use the [content skill](../skills/rossignolerie-content/SKILL.md) for editorial work and [i18n](../skills/i18n/SKILL.md) for message and route mechanics.
