<template>
  <div class="gallery">
    <header class="gallery__intro">
      <h1>{{ t('pages.gallery.title') }}</h1>
      <p>{{ t('pages.gallery.intro') }}</p>
    </header>
    <div class="gallery__projects">
      <NuxtLink
        v-for="(project, index) in galleryProjects"
        :key="project.id"
        class="gallery__project"
        :to="localePath(project.path)">
        <span class="gallery__cover-frame">
          <Image
            class="gallery__cover"
            :src="media[project.images[0]].src"
            :alt="t(`pictures.${project.images[0]}.title`)"
            sizes="(min-width: 1536px) 453px, (min-width: 1280px) 30vw, (min-width: 640px) 45vw, 92vw"
            :priority="index === 0" />
        </span>
        <h2>{{ t(`pages.gallery.projects.${project.id}.title`) }}</h2>
        <p>{{ t(`pages.gallery.projects.${project.id}.date`) }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { galleryProjects } from '~/data/gallery'
import media from '~/data/media.json'

const { t } = useI18n()
const localePath = useLocalePath()

useHead(usePageSeo('gallery'))
</script>

<style lang="scss" scoped>
.gallery {
  max-width: $content-max-width;
  margin-inline: auto;

  &__intro {
    max-width: $prose-max-width;
    margin-inline: auto;
    padding-block: clamp(24px, 4vw, 64px) $space-32;
    text-align: center;

    h1 {
      margin: 0 0 $space-16;
    }

    p {
      margin: 0;
    }
  }

  &__projects {
    display: grid;
    gap: $space-32 $space-24;
    margin-bottom: $space-32;
  }

  &__project {
    min-width: 0;
    text-decoration: none;

    h2 {
      margin: $space-16 0 $space-4;
      font-size: 1.6rem;
    }

    p {
      margin: 0;
    }

    &:hover h2,
    &:focus-visible h2 {
      text-decoration: underline;
      text-underline-offset: 0.2em;
    }
  }

  &__cover-frame {
    display: block;
    aspect-ratio: 1;
    overflow: hidden;
  }

  &__cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

@media (min-width: $breakpoint-mobile) {
  .gallery__projects {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: $breakpoint-desktop) {
  .gallery__projects {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (prefers-reduced-motion: no-preference) {
  .gallery__cover {
    transition: transform 0.65s cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  @media (hover: hover) and (pointer: fine) {
    .gallery__project:focus-visible .gallery__cover,
    .gallery__project:hover .gallery__cover {
      transform: scale(1.04);
    }
  }
}
</style>
