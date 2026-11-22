<template>
  <div class="photo-grid">
    <a
      v-for="(photo, index) in photos"
      :key="photo"
      class="photo-grid__link"
      :href="media[photo].src"
      :data-photo-src="media[photo].src"
      :aria-label="
        t('components.photo_grid.open', {
          caption: t(`pictures.${photo}.title`),
        })
      "
      @click="openPhoto($event, index)">
      <Image
        class="photo-grid__image"
        :src="media[photo].src"
        :alt="t(`pictures.${photo}.title`)"
        :sizes="sizes"
        :priority="priority && index === 0" />
      <span class="photo-grid__enlarge" aria-hidden="true">＋</span>
    </a>
  </div>
  <PhotoViewer
    v-if="viewerImage"
    :image="viewerImage"
    :images="images"
    :visible="viewerVisible"
    :opener="viewerOpener"
    @select="selectImage"
    @close="closeViewer" />
</template>

<script setup lang="ts">
import media from '~/data/media.json'
import type { ImageSource } from '~/types/image'

const {
  photos,
  title,
  priority = false,
  sizes = '(min-width: 768px) 45vw, 100vw',
} = defineProps<{
  photos: readonly (keyof typeof media)[]
  title: string
  priority?: boolean
  sizes?: string
}>()

const { t } = useI18n()

const images = computed<readonly ImageSource[]>(() =>
  photos.map(photo => ({
    src: media[photo].src,
    title,
    alt: t(`pictures.${photo}.title`),
  }))
)

const {
  viewerImage,
  viewerVisible,
  viewerOpener,
  openViewer,
  selectImage,
  closeViewer,
} = useImagePreview(() => images.value)

function openPhoto(event: MouseEvent, index: number) {
  if (
    event.defaultPrevented ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0 ||
    !(event.currentTarget instanceof HTMLElement) ||
    typeof HTMLDialogElement === 'undefined' ||
    typeof HTMLDialogElement.prototype.showModal !== 'function'
  ) {
    return
  }

  event.preventDefault()

  openViewer(index, event)
}
</script>

<style lang="scss" scoped>
.photo-grid {
  display: grid;
  gap: $space-16;

  &__link {
    position: relative;
    display: block;
    min-width: 0;
  }

  &__image {
    width: 100%;
    height: auto;
    aspect-ratio: 3 / 2;
    object-fit: cover;
  }

  &__enlarge {
    position: absolute;
    right: $space-12;
    bottom: $space-12;
    display: grid;
    place-items: center;
    width: $control-size;
    height: $control-size;
    color: $green;
    background: $paper;
    font-size: 1.5rem;
  }
}

@media (min-width: $breakpoint-tablet) {
  .photo-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
