# Winery Content Naming Map

Use this map to connect current message identities without deriving routes or asset paths from translated text.
Both [French](../../../../i18n/locales/fr-FR.json) and [US English](../../../../i18n/locales/en-US.json) use the same ownership and stable IDs.
Resolve actual route names and public files from their owning source before implementing a consumer.

## Domains And Ownership

| Concern            | Current identity                                                                                            | Rule                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Shared identity    | `app.name`, `app.logo_alt`, [site data](../../../../app/data/site.ts)                                       | Keep the estate name and factual destinations consistent        |
| Page prose         | `pages.home`, `about`, `wines`, `contact`, `gallery`, `policies` under `pages`                              | Keep page content separate from component controls              |
| Component controls | `components.layout`, `header`, `footer`, `lang_switcher`, `contact_form`, `photo_viewer` under `components` | Keep mutable UI state independent of translated display strings |
| Pictures           | `pictures.<media-id>.title`                                                                                 | Preserve stable media IDs and inspect actual image content      |
| Metadata           | `seo.<page>.title`, `.description`                                                                          | Use complete text independent of `pages.*.tab_name`             |

## Wine Identities

| ID        | French presentation    | Message owner               |
| --------- | ---------------------- | --------------------------- |
| `anjou25` | Anjou blanc sec 2025   | `pages.wines.items.anjou25` |
| `anjou24` | Anjou blanc sec 2024   | `pages.wines.items.anjou24` |
| `rose25`  | Rosé de Loire sec 2025 | `pages.wines.items.rose25`  |
| `epure`   | Fines bulles blanches  | `pages.wines.items.epure`   |
| `eclat`   | Fines bulles rosées    | `pages.wines.items.eclat`   |
| `layon25` | Coteaux du Layon 2025  | `pages.wines.items.layon25` |

Retain vintage distinctions and supplied sequence order.
IDs are neither translated titles nor proof of a filename, availability or production quantity.

## Photo-Project Identities

| ID           | French title           | Page messages                       | SEO identity             |
| ------------ | ---------------------- | ----------------------------------- | ------------------------ |
| `spring`     | Retour des beaux jours | `pages.gallery.projects.spring`     | `seo.gallery_spring`     |
| `vineyards`  | Les vignes du domaine  | `pages.gallery.projects.vineyards`  | `seo.gallery_vineyards`  |
| `renovation` | L'aménagement          | `pages.gallery.projects.renovation` | `seo.gallery_renovation` |
| `chenin`     | Grappe de Chenin       | `pages.gallery.projects.chenin`     | `seo.gallery_chenin`     |

Keep this supplied order rather than sorting by dates or labels.
The supplied decomposed `laménagement` slug is distinct from a title apostrophe or normalized filesystem name.
Choose an explicit equivalent-page mapping when changing localized project paths.

## Picture And Control Keys

Image alternatives use `pictures.<media-id>.title`; the sharing JPEG uses `pictures.social.title`.

`pictures` retains stable media IDs such as `home-estate`, `pruned-vines` and `photo-40`.
The hyphens are part of those existing identities and do not justify renaming the assets or deriving a numbered range.
Wine bottle alternatives are `pages.wines.items.<id>.alt`.
Project descriptions may be empty where no authored description was supplied; do not fill them with invented text.
Use `components.photo_viewer.*` for viewer actions and `components.gallery_project.*` for the return link and project navigation.
Keep image navigation distinct from project navigation and preserve `{number}`, `{total}` and `{caption}` interpolation names.
