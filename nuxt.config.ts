// https://nuxt.com/docs/api/configuration/nuxt-config
import { pageSeo, robotsContent } from './app/data/seo'
import type { PageSeoDefinition } from './app/types/seo'
import { externalLinks, siteName, socialLinks } from './app/data/site'

// Production can override the canonical origin with NUXT_SITE_URL at build time
const prodUrl = (
  process.env.NUXT_SITE_URL || 'https://domainedelarossignolerie.vercel.app'
).replace(/\/$/, '')

const siteUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.VERCEL_ENV === 'production'
      ? prodUrl
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : prodUrl

const indexable =
  process.env.NODE_ENV !== 'development' &&
  (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production')

export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '64x64',
          href: '/favicon.png', // TODO: Replace with /favicon.ico
        },
      ],
      title: siteName,
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, viewport-fit=cover',
        },
        { name: 'application-name', content: siteName },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        {
          name: 'apple-mobile-web-app-title',
          content: siteName,
        },
        { name: 'theme-color', content: '#285a5b' },
      ],
      templateParams: {
        separator: '-',
      },
    },
  },
  ssr: true,
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  plugins: [],
  build: {
    transpile: [],
  },
  typescript: {
    strict: true,
  },
  modules: [
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxt/fonts',
    '@nuxt/eslint',
  ],
  imports: {
    dirs: [],
  },
  runtimeConfig: {
    public: {
      i18n: {
        baseUrl: siteUrl,
      },
    },
  },
  icon: {
    mode: 'svg',
    provider: 'none',
    clientBundle: {
      // Include conditional and error-page icons without a runtime API request
      icons: [
        'lucide:arrow-up',
        'lucide:arrow-up-right',
        'lucide:check',
        'lucide:chevron-down',
        'lucide:languages',
        'lucide:menu',
        'lucide:x',
        ...socialLinks.map(link => link.icon),
      ],
    },
  },
  fonts: {
    defaults: {
      weights: [400, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
    families: [
      { name: 'Oswald', provider: 'google', weights: [400], global: true },
      { name: 'Roboto', provider: 'google', global: true },
    ],
  },
  i18n: {
    baseUrl: siteUrl,
    defaultLocale: 'fr',
    langDir: 'locales',
    strategy: 'prefix',
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr-FR.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en-US.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
  css: [
    '~/styles/default.scss',
    '~/styles/keyframes.scss',
    '~/styles/shared.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/variables.scss" as *;',
        },
      },
    },
    optimizeDeps: {
      include: [
        '@unhead/schema-org/vue',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'lenis',
      ],
    },
    plugins: [],
  },
  compatibilityDate: '2026-11-21',
  devtools: {
    enabled: true,
  },
  site: {
    url: siteUrl,
    name: siteName,
    defaultLocale: 'fr-FR',
    trailingSlash: false,
    indexable,
  },
  robots: {
    robotsEnabledValue: robotsContent.indexable,
    robotsDisabledValue: robotsContent.blocked,
  },
  aiReady: false, // SEO v6 bundles AI Ready; this SSR site does not publish AI content endpoints
  skewProtection: false, // Vercel builds do not share the local asset cache required by this module
  sitemap: {
    // The registry covers every public page; avoid duplicate auto-discovered routes overriding their images
    excludeAppSources: ['nuxt:pages'],
    // Runtime SSR pages aren't crawled for images by the sitemap module
    // i18n expands each record into FR/EN with reciprocal alternates
    urls: Object.values(pageSeo)
      .filter((page: PageSeoDefinition) => page.indexable !== false)
      .map(page => ({
        loc: page.path,
        _i18nTransform: true,
        images: page.images.map(loc => ({ loc })),
      })),
  },
  schemaOrg: {
    reactive: true,
    identity: {
      type: 'Organization',
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/images/bird-320.webp`, // TODO: Need a svg logo
      image: `${siteUrl}/images/bird-320.webp`,
      sameAs: [externalLinks.instagram],
    },
  },
  unhead: {
    vite: {
      // Preserve this helper's reactive useSchemaOrg call on the client
      // Other server-only composables can still be removed normally
      treeshake: {
        filter: {
          exclude: [/[/\\]app[/\\]composables[/\\]usePageSeo\.ts(?:\?|$)/],
        },
      },
    },
  },
  ogImage: {
    enabled: false,
  },
})
