<template>
  <div class="error-page">
    <a class="skip-link" href="#error-content" @click.prevent="focusContent">
      {{ t('components.layout.skip') }}
    </a>
    <header class="error-page__header">
      <a
        :href="homePath"
        :aria-label="t('app.logo_alt')"
        class="error-page__brand"
        @click="recover($event, homePath)">
        <img
          class="error-page__logo"
          src="/images/bird-320.webp"
          :width="logoWidth"
          :height="logoHeight"
          :alt="t('app.logo_alt')" />
        <span>{{ siteName }}</span>
      </a>
    </header>
    <main
      id="error-content"
      ref="content"
      class="error-page__content"
      tabindex="-1">
      <p class="error-page__code">
        {{ t('error.code', { code: statusCode }) }}
      </p>
      <h1 class="error-page__title">{{ title }}</h1>
      <p class="error-page__description">{{ description }}</p>
      <nav class="error-page__actions" :aria-label="t('error.navigation')">
        <a
          :href="homePath"
          class="error-page__action"
          @click="recover($event, homePath)">
          {{ t('error.home') }}
        </a>
      </nav>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'
import { imageDimensions } from '~/data/imageDimensions'
import { pageSeo, robotsContent } from '~/data/seo'
import { siteName } from '~/data/site'

const props = defineProps<{ error: NuxtError }>()

const { t, localeProperties } = useI18n()
const localePath = useLocalePath()
const site = useSiteConfig()
const route = useRoute()
const content = useTemplateRef('content')

const statusCode = computed(() => props.error.status || 500)
const errorKind = computed(() =>
  statusCode.value === 404 ? 'not_found' : 'unexpected'
)
const title = computed(() => t(`error.${errorKind.value}.title`))
const description = computed(() => t(`error.${errorKind.value}.description`))
const homePath = computed(() => localePath('/'))

const [logoWidth, logoHeight] = imageDimensions['/images/bird-320.webp']
const imagePath = pageSeo.home.image
const [imageWidth, imageHeight] = imageDimensions[imagePath]

if (import.meta.server) {
  // Error pages preserve their HTTP status and must never become search results
  useResponseHeader('X-Robots-Tag').value = robotsContent.blocked
}

useSeoMeta({
  robots: robotsContent.blocked,
  description,
  ogTitle: title,
  ogDescription: description,
  ogSiteName: siteName,
  ogType: 'website',
  ogUrl: () => new URL(route.path, site.url).href,
  ogLocale: () => localeProperties.value.language?.replace('-', '_'),
  ogImage: () => new URL(imagePath, site.url).href,
  ogImageAlt: () => t(pageSeo.home.imageAlt),
  ogImageType: 'image/jpeg',
  ogImageWidth: imageWidth,
  ogImageHeight: imageHeight,
  twitterCard: 'summary_large_image',
})

useHead(() => ({
  title: title.value,
  titleTemplate: '%s',
  htmlAttrs: {
    lang: localeProperties.value.language,
    dir: localeProperties.value.dir || 'ltr',
  },
}))

function focusContent() {
  content.value?.focus({ preventScroll: true })
  content.value?.scrollIntoView({ behavior: 'instant', block: 'start' })
}

async function recover(event: MouseEvent, path: string) {
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return
  }

  event.preventDefault()

  await clearError({ redirect: path })
}
</script>

<style lang="scss" scoped>
.error-page {
  min-height: 100svh;
  padding: calc(#{$page-gutter} + env(safe-area-inset-top, 0px))
    calc(#{$page-gutter} + env(safe-area-inset-right, 0px))
    calc(#{$page-gutter} + env(safe-area-inset-bottom, 0px))
    calc(#{$page-gutter} + env(safe-area-inset-left, 0px));

  &__header,
  &__content {
    max-width: $prose-max-width;
    margin-inline: auto;
  }

  &__brand {
    display: inline-flex;
    align-items: center;
    gap: $space-12;
    min-height: $control-size;
    color: inherit;
    text-decoration: none;

    span {
      min-width: 0;
    }
  }

  &__logo {
    flex-shrink: 0;
    width: 3rem;
    height: auto;
  }

  &__content {
    padding-block: $space-32;
  }

  &__title {
    margin-block: $space-12 $space-20;
  }

  &__description {
    max-width: 52ch;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    margin-top: $space-24;
  }

  &__action {
    display: inline-flex;
    align-items: center;
    min-height: $control-size;
  }
}
</style>
