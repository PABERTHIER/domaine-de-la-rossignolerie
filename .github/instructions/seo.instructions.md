---
description: 'Use when winery pages, metadata helpers, locale head, errors or Nuxt configuration affect search and sharing output.'
applyTo: 'app/pages/**/*.vue,app/data/seo.ts,app/composables/usePageSeo.ts,app/app.vue,app/error.vue,nuxt.config.ts'
---

# SEO Instructions

Use [seo](../../.agents/skills/seo/SKILL.md) for implementation and the [SEO guide](../../.agents/docs/SEO.md) for URL, origin, indexing and publication requirements.
Inspect current ownership and installed APIs before editing metadata.
Site identity/profiles come from [site.ts](../../app/data/site.ts), and search copy comes from `seo.*` in the [locale files](../../i18n/locales/).
Use `seo.gallery_<id>` for photo-project metadata and keep `pages.*.tab_name` separate from complete titles/descriptions.

Keep one owner for page metadata and one for canonical/language head data.
Do not combine competing automatic and manual locale-head modes.
Preserve full localized titles/descriptions, one brand occurrence and representative estate imagery with truthful dimensions and alternatives.
Keep translated head and schema reactive through route and language changes.

Preserve meaningful French paths, equivalent English destinations and supplied Unicode project identity.
Use self-canonicals, reciprocal language alternates and French `x-default` for complete indexable translations.
Keep trusted environment origins consistent across metadata, schema and sitemaps.
Native image delivery must remain on the serving origin.

Preview/review output remains non-indexable.
Errors retain actual HTTP status and noindex without misleading canonical/alternate links.
Sitemaps contain canonical real content and exclude errors, redirects and unapproved policy text.
Use verified business facts without invented offers, ratings, certifications or dates.
Keep `seo.site.description` distinct from the page description and inspect schema IDs/URLs after client navigation.
Do not add keyword meta lists or arbitrary article/profile fields to generic winery content.
Check actual SSR/client output, headers, image responses and applicable sitemap/robots behavior; report unavailable deployed/crawler coverage.
