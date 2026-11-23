<template>
  <div ref="root" class="photo-grid">
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
      <span class="photo-grid__frame">
        <Image
          class="photo-grid__image"
          :src="media[photo].src"
          :alt="t(`pictures.${photo}.title`)"
          :sizes="sizes"
          :priority="priority && index === 0"
          @load="scheduleParallax"
          @error="scheduleParallax" />
      </span>
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

const root = useTemplateRef('root')
const motionAllowed = useNativeMediaQuery(
  '(prefers-reduced-motion: no-preference)'
)

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

let visibilityObserver: IntersectionObserver | undefined
let resizeObserver: ResizeObserver | undefined
let animationFrame: number | undefined
let gridVisible = false
let frames: HTMLElement[] = []

function updateParallax() {
  animationFrame = undefined

  const viewportHeight = window.innerHeight
  const positions = frames.map(frame => {
    const image = frame.querySelector<HTMLImageElement>('img')
    const bounds = frame.getBoundingClientRect()

    if (
      !image ||
      !image.naturalWidth ||
      bounds.bottom <= 0 ||
      bounds.top >= viewportHeight
    ) {
      return
    }

    // Use only the existing object-fit crop; never enlarge a photo for scrolling
    const crop = Math.max(
      0,
      (bounds.width * image.naturalHeight) / image.naturalWidth - bounds.height
    )

    const travel = Math.min(40, crop / 2)

    const progress = Math.max(
      -1,
      Math.min(
        1,
        ((viewportHeight - bounds.top * 2 - bounds.height) * 1.5) /
          (viewportHeight + bounds.height)
      )
    )

    const position = crop > 0 ? 50 + (progress * travel * 100) / crop : 50

    return { image, position }
  })

  // Keep geometry reads together before updating any of the visible images
  for (const entry of positions) {
    entry?.image.style.setProperty(
      '--photo-grid-position',
      `${entry.position.toFixed(3)}%`
    )
  }
}

function scheduleParallax() {
  if (
    !gridVisible ||
    !motionAllowed.value ||
    viewerVisible.value ||
    animationFrame !== undefined
  ) {
    return
  }

  animationFrame = requestAnimationFrame(updateParallax)
}

function stopParallax() {
  visibilityObserver?.disconnect()
  resizeObserver?.disconnect()

  visibilityObserver = undefined
  resizeObserver = undefined
  gridVisible = false

  window.removeEventListener('scroll', scheduleParallax)
  window.removeEventListener('resize', scheduleParallax)

  if (animationFrame !== undefined) {
    cancelAnimationFrame(animationFrame)

    animationFrame = undefined
  }

  for (const frame of frames) {
    frame.querySelector('img')?.style.removeProperty('--photo-grid-position')
  }

  frames = []
}

function startParallax() {
  stopParallax()

  if (
    !motionAllowed.value ||
    !root.value ||
    typeof IntersectionObserver === 'undefined' ||
    typeof ResizeObserver === 'undefined'
  ) {
    return
  }

  frames = Array.from(
    root.value.querySelectorAll<HTMLElement>('.photo-grid__frame')
  )

  visibilityObserver = new IntersectionObserver(entries => {
    gridVisible = entries.some(entry => entry.isIntersecting)
    scheduleParallax()
  })

  resizeObserver = new ResizeObserver(scheduleParallax)

  visibilityObserver.observe(root.value)
  resizeObserver.observe(root.value)

  window.addEventListener('scroll', scheduleParallax, { passive: true })
  window.addEventListener('resize', scheduleParallax, { passive: true })
}

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

watch([motionAllowed, () => photos], startParallax, { flush: 'post' })
watch(viewerVisible, scheduleParallax, { flush: 'post' })

onMounted(startParallax)
onBeforeUnmount(stopParallax)
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

  &__frame {
    display: block;
    aspect-ratio: 3 / 2;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__enlarge {
    position: absolute;
    right: $space-8;
    bottom: $space-8;
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    color: $green;
    background: $paper;
    font-size: 1.125rem;
    line-height: 1;
    pointer-events: none;
  }
}

@media (min-width: $breakpoint-tablet) {
  .photo-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .photo-grid__enlarge {
    right: $space-12;
    bottom: $space-12;
    width: 36px;
    height: 36px;
    font-size: 1.25rem;
  }
}

@media (min-width: $breakpoint-desktop) {
  .photo-grid__enlarge {
    width: $control-size;
    height: $control-size;
    font-size: 1.5rem;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .photo-grid__image {
    object-position: center var(--photo-grid-position, 50%);
    transition: transform 0.65s cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  @media (hover: hover) and (pointer: fine) {
    .photo-grid__link:focus-visible .photo-grid__image,
    .photo-grid__link:hover .photo-grid__image {
      transform: scale(1.04);
    }
  }
}
</style>
