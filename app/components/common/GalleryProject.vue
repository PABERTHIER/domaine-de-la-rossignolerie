<template>
  <article class="gallery-project">
    <NuxtLink class="gallery-project__back" :to="localePath('/gallery')">
      <Icon name="lucide:arrow-left" aria-hidden="true" />
      {{ t('components.gallery_project.back') }}
    </NuxtLink>
    <header class="gallery-project__intro">
      <h1>{{ t(`pages.gallery.projects.${project.id}.title`) }}</h1>
      <p class="gallery-project__date">
        {{ t(`pages.gallery.projects.${project.id}.date`) }}
        <span v-if="location">· {{ location }}</span>
      </p>
      <p v-if="projectType">{{ projectType }}</p>
      <p v-if="description">{{ description }}</p>
    </header>
    <PhotoGrid
      :photos="project.images"
      :title="t(`pages.gallery.projects.${project.id}.title`)"
      sizes="(min-width: 1536px) 696px, (min-width: 768px) 45vw, 92vw"
      priority />
    <nav
      v-if="previous || next"
      class="gallery-project__navigation"
      :aria-label="t('components.gallery_project.navigation')">
      <NuxtLink
        v-if="previous"
        class="gallery-project__neighbor"
        :to="localePath(previous.path)">
        <span>{{ t('components.gallery_project.previous_project') }}</span>
        <span class="gallery-project__neighbor-title">
          {{ t(`pages.gallery.projects.${previous.id}.title`) }}
        </span>
      </NuxtLink>
      <NuxtLink
        v-if="next"
        class="gallery-project__neighbor gallery-project__neighbor--next"
        :to="localePath(next.path)">
        <span>{{ t('components.gallery_project.next_project') }}</span>
        <span class="gallery-project__neighbor-title">
          {{ t(`pages.gallery.projects.${next.id}.title`) }}
        </span>
      </NuxtLink>
    </nav>
  </article>
</template>

<script setup lang="ts">
import { galleryProjects, projects } from '~/data/gallery'
import type { ProjectId } from '~/data/gallery'

const { id } = defineProps<{ id: ProjectId }>()

const { t, te } = useI18n()
const localePath = useLocalePath()

const project = computed(() => projects.find(project => project.id === id)!)

const location = computed(() =>
  'location' in project.value ? project.value.location : ''
)

const projectType = computed(() => {
  const key = `pages.gallery.projects.${project.value.id}.type`

  return te(key) ? t(key) : ''
})

const description = computed(() => {
  const key = `pages.gallery.projects.${project.value.id}.description`

  return te(key) ? t(key) : ''
})

const index = computed(() =>
  galleryProjects.findIndex(project => project.id === id)
)

const previous = computed(() =>
  galleryProjects.length > 1 && index.value >= 0
    ? galleryProjects[
        (index.value + galleryProjects.length - 1) % galleryProjects.length
      ]
    : undefined
)
const next = computed(() =>
  galleryProjects.length > 1 && index.value >= 0
    ? galleryProjects[(index.value + 1) % galleryProjects.length]
    : undefined
)
</script>

<style lang="scss" scoped>
.gallery-project {
  max-width: $content-max-width;
  margin: 0 auto $space-32;

  &__back {
    display: inline-flex;
    align-items: center;
    gap: $space-8;
    min-height: $control-size;

    :deep(svg) {
      flex: none;
    }
  }

  &__intro {
    max-width: $prose-max-width;
    padding-block: $space-24 $space-32;

    h1 {
      margin: 0 0 $space-16;
    }

    p {
      margin: $space-16 0 0;
    }
  }

  &__date {
    color: $green;
  }

  &__navigation {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: $space-24;
    padding-top: $space-32;
  }

  &__neighbor {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
    min-height: $control-size;
    max-width: 100%;
    padding-block: $space-8;

    &--next {
      margin-inline-start: auto;
      text-align: end;
    }
  }

  &__neighbor-title {
    font-family: $heading-font;
    font-size: 1.3rem;
  }
}
</style>
