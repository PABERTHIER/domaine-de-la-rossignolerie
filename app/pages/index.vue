<template>
  <div class="home-page">
    <section class="home-page__hero" aria-labelledby="home-title">
      <Image
        class="home-page__hero-image"
        :src="media.hero.src"
        alt=""
        priority
        sizes="(min-width: 1536px) 1408px, calc(100vw - clamp(32px, 8.4vw, 128px))" />
      <div class="home-page__intro">
        <p class="home-page__region">{{ t('pages.home.region') }}</p>
        <h1 id="home-title">{{ siteName }}</h1>
        <p>{{ t('pages.home.intro') }}</p>
      </div>
    </section>

    <section
      class="home-page__journeys"
      :aria-label="t('pages.home.introduction')">
      <NuxtLink
        v-for="journey in journeys"
        :key="journey.path"
        class="home-page__journey"
        :class="{ 'home-page__journey--wine': journey.image === 'home-wine' }"
        :to="localePath(journey.path)">
        <span class="home-page__journey-frame">
          <Image
            class="home-page__journey-image"
            :src="media[journey.image].src"
            alt=""
            sizes="(min-width: 1536px) 470px, (min-width: 768px) 31vw, 92vw" />
        </span>
        <div class="home-page__journey-copy">
          <h2>{{ t(journey.title) }}</h2>
          <span>
            {{ t(journey.label) }}
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </NuxtLink>
    </section>

    <section class="home-page__gallery" aria-labelledby="home-gallery">
      <div class="home-page__gallery-heading">
        <h2 id="home-gallery">{{ t('pages.home.gallery') }}</h2>
        <NuxtLink :to="localePath('/gallery')">
          {{ t('pages.home.gallery_link') }}
          <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>
      <PhotoGrid
        :photos="homePhotos"
        :title="t('pages.home.gallery')"
        sizes="(min-width: 1536px) 696px, (min-width: 768px) 45vw, 92vw" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { homePhotos } from '~/data/gallery'
import media from '~/data/media.json'
import { siteName } from '~/data/site'

const { t } = useI18n()
const localePath = useLocalePath()

const journeys = [
  {
    path: '/about',
    image: 'home-estate',
    title: 'pages.home.estate',
    label: 'pages.home.history',
  },
  {
    path: '/wines',
    image: 'home-wine',
    title: 'pages.home.wines',
    label: 'pages.wines.tab_name',
  },
  {
    path: '/contact',
    image: 'home-visit',
    title: 'pages.home.visit',
    label: 'pages.home.contact',
  },
] as const

useHead(usePageSeo('home'))
</script>

<style lang="scss" scoped>
.home-page {
  max-width: $content-max-width;
  margin-inline: auto;

  &__hero {
    position: relative;
    display: grid;
    place-items: center;
    min-height: clamp(24rem, 38vw, 35rem);
    text-align: center;
    color: $paper;
    background: $ink;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba($ink, 0.64);
    }
  }

  &__hero-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center bottom;
  }

  &__intro {
    position: relative;
    z-index: 1;
    min-width: 0;
    padding: $space-32 $space-16;

    h1 {
      max-width: 15ch;
      margin: $space-16 auto;
      color: inherit;
      font-size: clamp(2.5rem, 7.2vw, 6.25rem);
      line-height: 1.12;
    }

    p {
      margin: $space-8 0;
    }
  }

  &__region {
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-size: 0.875rem;
  }

  &__journeys {
    display: grid;
    margin-block: clamp(32px, 5vw, 64px);
  }

  &__journey {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
    min-height: 400px;
    text-align: center;
    text-decoration: none;
    background: $cream;

    &:focus-visible {
      z-index: 1;
      outline-offset: -$focus-width;
    }

    &:focus-visible .home-page__journey-copy {
      outline: calc(#{$focus-width} * var(--focus-ring-opacity, 1)) solid $green;
      outline-offset: -$focus-width;
    }

    &:hover .home-page__journey-copy > span,
    &:focus-visible .home-page__journey-copy > span {
      text-decoration-thickness: 0.15em;
    }
  }

  &__journey-frame {
    position: absolute;
    inset: 0;
  }

  &__journey-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__journey-copy {
    position: relative;
    margin: $space-24;
    padding: $space-24 $space-16;
    background: $paper;

    h2 {
      margin: 0 0 $space-12;
      font-size: clamp(1.6rem, 2.2vw, 2.2rem);
      text-transform: uppercase;
    }

    > span {
      text-decoration: underline;
      text-underline-offset: 0.3em;
    }
  }

  &__journey--wine {
    background: $yellow;

    .home-page__journey-frame {
      position: relative;
      flex: 1;
      min-height: 280px;
    }

    .home-page__journey-image {
      position: absolute;
      inset: 0;
      object-fit: contain;
    }
  }

  &__gallery {
    margin-block: clamp(32px, 5vw, 64px);
  }

  &__gallery-heading {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: $space-16;
    margin-bottom: $space-24;

    h2 {
      margin: 0;
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: $space-8;
      min-height: $control-size;
    }
  }
}

@media (min-width: $breakpoint-tablet) {
  .home-page__journeys {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .home-page__journey {
    min-height: clamp(448px, 48vw, 672px);
  }
}

@media (forced-colors: active) {
  .home-page__hero {
    color: CanvasText;
    background: Canvas;

    &::after {
      display: none;
    }
  }

  .home-page__intro {
    background: Canvas;
  }

  .home-page__journey-copy {
    outline-color: Highlight;
  }
}
</style>
