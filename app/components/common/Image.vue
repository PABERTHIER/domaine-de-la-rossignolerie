<template>
  <img
    :key="src"
    ref="image"
    class="image"
    :class="{ 'image--loading': skeleton && pending }"
    :src="src"
    :srcset="resolvedSrcset"
    :sizes="resolvedSrcset ? sizes : undefined"
    :width="width ?? dimensions?.[0]"
    :height="height ?? dimensions?.[1]"
    :alt="alt"
    :loading="priority ? 'eager' : loading"
    :fetchpriority="priority ? 'high' : 'auto'"
    decoding="async"
    @load="settle"
    @error="settle" />
</template>

<script setup lang="ts">
import { imageDimensions } from '~/data/imageDimensions'
import media from '~/data/media.json'
import type { ImageDimensions } from '~/types/image'

const {
  src,
  alt,
  width = undefined,
  height = undefined,
  srcset = undefined,
  sizes = '100vw',
  priority = false,
  loading = 'lazy',
  skeleton = true,
} = defineProps<{
  src: string
  alt: string
  width?: number | string
  height?: number | string
  srcset?: string
  sizes?: string
  priority?: boolean
  loading?: 'lazy' | 'eager'
  skeleton?: boolean
}>()

const dimensions = computed(() => {
  const catalog: Readonly<Record<string, ImageDimensions | undefined>> =
    imageDimensions

  return Object.hasOwn(catalog, src) ? catalog[src] : undefined
})

const resolvedSrcset = computed(() => {
  if (srcset !== undefined) {
    return srcset
  }

  const entry = Object.values(media).find(item => item.src === src)

  return entry?.variants
    .map(variant => `${variant.src} ${variant.width}w`)
    .join(', ')
})

const image = useTemplateRef('image')
const pending = ref(false)

let placeholderTimer: ReturnType<typeof setTimeout> | undefined

function settle(event?: Event) {
  if (event && event.target !== image.value) {
    return
  }

  clearTimeout(placeholderTimer)

  pending.value = false
}

function trackLoading() {
  settle()

  if (!skeleton || image.value?.complete) {
    return
  }

  // Avoid a placeholder flash for cached and quickly loaded images
  // Keep the native image visible for progressive loading and no-JS use
  placeholderTimer = setTimeout(() => {
    pending.value = !image.value?.complete
  }, 150)
}

onMounted(trackLoading)

watch([() => src, resolvedSrcset, () => sizes, () => skeleton], trackLoading, {
  flush: 'post',
})

onBeforeUnmount(settle)
</script>

<style lang="scss" scoped>
.image {
  display: block;
  min-width: 0;
  max-width: 100%;
  height: auto;
  object-fit: contain;

  &--loading {
    background: linear-gradient(110deg, $cream 20%, $paper 50%, $cream 80%);
    background-size: 200% 100%;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .image--loading {
    animation: skeletonShimmer 1.8s ease-in-out infinite;
  }
}
</style>
