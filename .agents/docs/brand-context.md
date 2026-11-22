# Domaine de la Rossignolerie — Brand Context

Domaine de la Rossignolerie is presented as a wine estate in Chalonnes-sur-Loire, Anjou.
Its supplied content combines a personal estate story, vineyard and cellar photography, named wines and practical visiting information.
This guide separates supplied information from current business verification.

## Identity

| Fact               | Supplied information                                                             | Use                                                                           |
| ------------------ | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Public name        | Domaine de la Rossignolerie                                                      | Preserve the full spelling and capitalization                                 |
| Location           | Chalonnes-sur-Loire, Anjou                                                       | Ground descriptions in the actual estate rather than generic wine tourism     |
| Visual identity    | Green bird on a branch, cream/green surfaces, real estate and bottle photography | Preserve the recognizable mark and image subjects                             |
| Estate story       | Michel's career change and takeover of a ten-hectare estate                      | Preserve the personal account without expanding it into an invented biography |
| Team               | Michel, Christophe and Tanguy                                                    | Review roles and current participation before publication                     |
| Wine presentations | Six distinct presentations including two Anjou blanc vintages                    | Keep wine identities and factual quantities distinct                          |

The supplied roles are Michel for winegrowing, Christophe for vineyard/cellar work and Tanguy for marketing/sales.
They are authored business information, not independent confirmation of present employment or responsibilities.
The complete estate name takes precedence over truncated search-title variants.

## Repository Evidence

| Subject                            | Current source                             | Boundary                                                                           |
| ---------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------- |
| Public identity and contact        | [site.ts](../../app/data/site.ts)          | Supplied business information still needs publication review                       |
| Estate/team wording                | `pages.about.*                             | Preserve the personal account without inventing current roles                      |
| Wine identity and prose            | `pages.wines.items.*`                      | A description is not evidence of stock or an offer                                 |
| Project titles and dates           | `pages.gallery.projects.*`                 | Authored display dates are distinct from upload/change timestamps                  |
| Shared font and site configuration | [nuxt.config.ts](../../nuxt.config.ts)     | Configuration is not evidence that every page uses a family or has passed an audit |

## Intended Character

Keep the estate approachable, personal and grounded in its Anjou setting.
Let real vineyards, cellar work, people and bottles establish the character.
Keep ordinary navigation and practical information clear instead of replacing them with wine-marketing slogans.
The supplied palette and typography guide presentation; they do not establish a separately approved brand manual.

## Contact Information

These values describe supplied project content.
Reconfirm time-sensitive details before publishing changes or incorporating them into structured business claims.

| Field           | Supplied value                                            | Handling                                               |
| --------------- | --------------------------------------------------------- | ------------------------------------------------------ |
| Address         | 1008 rue des Montaigus, 49290 Chalonnes-sur-Loire, France | Keep contact text and directions consistent            |
| Email           | domaine.larossignolerie@gmail.com                         | Use the verified destination for contact links         |
| Telephone       | 06 07 22 80 39                                            | Use `tel:+33607228039` for the link destination        |
| Hours           | Monday–Friday, 09:00–12:00 and 14:00–17:30                | Review current hours and exceptions before publication |
| Instagram       | `https://www.instagram.com/domainedelarossignolerie/`     | Preserve the supplied profile destination              |
| Company name    | SARL La Rossignolerie                                     | Verify legal wording before use in policy content      |
| Representative  | Michel PITTIGLIO                                          | Keep legal identity separate from editorial biography  |
| Register number | 940 713 373 R.C.S. Angers                                 | Verify before publication                              |
| VAT string      | FR 159 407 133 73                                         | Preserve as supplied pending verification              |
| Capital         | 3 000,00 Euros                                            | Verify before publication                              |

Keep shared factual values in one source so footer, contact content and schema cannot drift independently.
Use `externalLinks.instagram` and `externalLinks.directions` from the shared site data for those destinations.
Do not infer coordinates, holiday opening, appointment availability or a booking guarantee from an address and ordinary hours.

## Visitor Priorities

| Visitor intent                    | Presentation goal                                                                 |
| --------------------------------- | --------------------------------------------------------------------------------- |
| Discover the estate               | Identify its location, people and story quickly                                   |
| Explore the wines                 | Reach every presentation and distinguish vintages, grapes and tasting information |
| Arrange a visit or ask a question | Find readable practical details and genuine contact actions                       |
| View estate photos                | Discover projects and inspect their ordered photographs                           |
| Read in English                   | Follow the equivalent page and retain the same information and actions            |

Use [UX principles](ux-principles.md) for journey acceptance and [content direction](content-direction.md) for editorial treatment.

## Assets And Identity Boundaries

Preserve supplied bird, vineyard, cellar, team and bottle imagery.
Keep meaningful photo crops in page compositions and full photographs available when viewing them in detail.
Do not generate replacement business imagery or introduce stock photos during routine implementation.
Keep the personal winery character; avoid invented crests, luxury claims, certifications or generic premium-brand stories.
Template banners and sample service information do not establish business facts.
Use [design system](design-system.md) for the visual vocabulary and its limits.
