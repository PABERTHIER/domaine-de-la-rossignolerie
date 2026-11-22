<template>
  <Teleport to="body">
    <Transition
      name="viewer-fade"
      :duration="fadeDuration"
      @after-leave="finishClose">
      <dialog
        v-if="visible"
        ref="dialogRef"
        class="photo-viewer"
        data-lenis-prevent
        :aria-labelledby="titleId"
        @cancel.prevent="requestClose"
        @pointerdown="onBackdropPointerDown"
        @click="onBackdropClick"
        @close="onNativeClose"
        @keydown="onDialogKeydown">
        <div class="photo-viewer__backdrop" aria-hidden="true" />
        <div
          class="photo-viewer__panel"
          :style="{ '--viewer-header-height': `${headerHeight}px` }">
          <header ref="headerRef" class="photo-viewer__header">
            <h2 :id="titleId" class="photo-viewer__title">
              {{ displayTitle }}
            </h2>
            <button
              ref="closeButtonRef"
              type="button"
              class="photo-viewer__button photo-viewer__close"
              :aria-label="t('components.photo_viewer.close_label')"
              :title="t('components.photo_viewer.close_label')"
              @click="requestClose">
              <Icon name="lucide:x" aria-hidden="true" />
            </button>
          </header>

          <div
            ref="imageContainerRef"
            class="photo-viewer__stage"
            :class="{ 'photo-viewer__stage--zoomed': zoom > 1 }"
            tabindex="0"
            role="region"
            :aria-label="t('components.photo_viewer.image_region')"
            :aria-describedby="hintId"
            :aria-busy="imageState === 'loading'"
            @wheel="onStageWheel"
            @pointerdown="onStagePointerDown"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @pointercancel="onPointerUp"
            @lostpointercapture="onPointerUp"
            @click="onStageClick">
            <div class="photo-viewer__image-wrapper" :style="wrapperStyle">
              <img
                v-if="imageState !== 'error'"
                :key="`${image.src}-${retryCount}`"
                ref="imageRef"
                :src="image.src"
                :alt="image.alt"
                class="photo-viewer__image"
                :class="{
                  'photo-viewer__image--pending': imageState === 'loading',
                }"
                :style="imageStyle"
                draggable="false"
                @load="onImageLoad"
                @error="onImageError" />
              <div
                v-if="imageState === 'loading' && showSkeleton"
                class="photo-viewer__skeleton"
                role="status">
                {{ t('components.photo_viewer.image_loading') }}
              </div>
              <div
                v-if="imageState === 'error'"
                class="photo-viewer__error"
                @pointerdown.stop
                @click.stop>
                <p role="status">
                  {{ t('components.photo_viewer.image_unavailable') }}
                </p>
                <button
                  type="button"
                  class="photo-viewer__button"
                  @click="retryImage">
                  {{ t('components.photo_viewer.retry') }}
                </button>
              </div>
            </div>
          </div>

          <div
            class="photo-viewer__toolbar"
            :class="{
              'photo-viewer__toolbar--single': sequence.length < 2,
            }">
            <button
              v-if="sequence.length > 1"
              type="button"
              class="photo-viewer__button"
              :aria-label="t('components.photo_viewer.previous')"
              :title="t('components.photo_viewer.previous')"
              @click="navigate(-1)">
              <Icon name="lucide:arrow-left" aria-hidden="true" />
            </button>
            <div
              class="photo-viewer__zoom"
              role="group"
              :aria-label="t('components.photo_viewer.zoom_label')">
              <label :for="zoomId" class="photo-viewer__sr-only">
                {{ t('components.photo_viewer.zoom_label') }}
              </label>
              <button
                type="button"
                class="photo-viewer__button"
                :disabled="imageState !== 'loaded' || zoom <= 1"
                :aria-label="t('components.photo_viewer.zoom_out')"
                :title="t('components.photo_viewer.zoom_out')"
                @click="setZoom(zoom / 1.25)">
                <Icon name="lucide:minus" aria-hidden="true" />
              </button>
              <input
                :id="zoomId"
                type="range"
                class="photo-viewer__slider"
                min="0"
                max="100"
                step="1"
                :value="sliderRaw"
                :disabled="imageState !== 'loaded'"
                :aria-valuetext="`${Math.round(zoom * 100)}%`"
                @input="onZoomSliderInput" />
              <button
                type="button"
                class="photo-viewer__button"
                :disabled="imageState !== 'loaded' || zoom >= maxZoom"
                :aria-label="t('components.photo_viewer.zoom_in')"
                :title="t('components.photo_viewer.zoom_in')"
                @click="setZoom(zoom * 1.25)">
                <Icon name="lucide:plus" aria-hidden="true" />
              </button>
              <span class="photo-viewer__zoom-value" aria-hidden="true">
                {{ Math.round(zoom * 100) }}%
              </span>
              <button
                type="button"
                class="photo-viewer__button photo-viewer__fit"
                :aria-label="t('components.photo_viewer.zoom_fit')"
                :title="t('components.photo_viewer.zoom_fit')"
                @click="reset">
                <Icon name="lucide:shrink" aria-hidden="true" />
              </button>
            </div>
            <button
              v-if="sequence.length > 1"
              type="button"
              class="photo-viewer__button"
              :aria-label="t('components.photo_viewer.next')"
              :title="t('components.photo_viewer.next')"
              @click="navigate(1)">
              <Icon name="lucide:arrow-right" aria-hidden="true" />
            </button>
          </div>

          <div class="photo-viewer__details">
            <p>{{ image.alt }}</p>
            <p v-if="image.dimensions">
              <strong>
                {{ t('components.photo_viewer.dimensions_label') }}:
              </strong>
              {{ image.dimensions }}
            </p>
          </div>
          <p :id="hintId" class="photo-viewer__sr-only">
            {{ t('components.photo_viewer.pan_hint') }}
          </p>
          <span
            class="photo-viewer__sr-only"
            role="status"
            aria-live="polite"
            aria-atomic="true">
            {{ displayTitle }}
          </span>
        </div>
      </dialog>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { ImageSource } from '~/types/image'

const props = withDefaults(
  defineProps<{
    image: ImageSource
    visible: boolean
    images?: readonly ImageSource[]
    opener?: HTMLElement | null
  }>(),
  { images: () => [], opener: null }
)

const emit = defineEmits<{ close: []; select: [image: ImageSource] }>()

const { t } = useI18n()
const route = useRoute()
const { $overlayScroll } = useNuxtApp()
const { lockScroll, unlockScroll } = useOverlayScrollLock()
const reducedMotion = useNativeMediaQuery(
  '(prefers-reduced-motion: reduce)',
  false
)

const fadeDuration = computed(() => (reducedMotion.value ? 0 : 250))

const dialogRef = ref<HTMLDialogElement | null>(null)
const closeButtonRef = ref<HTMLButtonElement | null>(null)
const imageContainerRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLImageElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const headerHeight = ref(0)
const imageState = ref<'loading' | 'loaded' | 'error'>('loading')
const showSkeleton = ref(false)
const retryCount = ref(0)
const naturalSize = ref({ width: 0, height: 0 })
const containerSize = ref({ width: 0, height: 0 })

const titleId = useId()
const zoomId = useId()
const hintId = useId()

let invokingElement: HTMLElement | null = null
let openerGallery: Element | null = null
let openerSource = ''
let activeDialog: HTMLDialogElement | null = null
let resizeObserver: ResizeObserver | undefined
let skeletonTimer: ReturnType<typeof setTimeout> | undefined
let backdropPointerDown = false
let focusRequest = 0
let disposed = false

const displayTitle = computed(
  () =>
    props.image.title ||
    props.image.mobileTitle ||
    t('components.photo_viewer.aria_label')
)

const sequence = computed(() =>
  props.images.length ? props.images : [props.image]
)
const currentIndex = computed(() =>
  sequence.value.findIndex(image => image.src === props.image.src)
)

const baseSize = computed(() => {
  const { width, height } = naturalSize.value

  if (!width || !height) {
    return { width: 0, height: 0 }
  }

  const scale = Math.min(
    containerSize.value.width / width,
    containerSize.value.height / height
  )

  return { width: width * scale, height: height * scale }
})

const {
  zoom,
  maxZoom,
  setZoom,
  pan,
  reset,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onImageClick,
  onWheel,
} = useImageViewerGestures(imageContainerRef, baseSize, navigate)

const sliderRaw = computed(
  () => (Math.log(zoom.value) / Math.log(maxZoom)) * 100
)
const imageStyle = computed(() => ({
  width: `${baseSize.value.width * zoom.value}px`,
  height: `${baseSize.value.height * zoom.value}px`,
}))

const wrapperStyle = computed(() => ({
  width: `${Math.max(containerSize.value.width, baseSize.value.width * zoom.value)}px`,
  height: `${Math.max(containerSize.value.height, baseSize.value.height * zoom.value)}px`,
}))

function clearSkeletonTimer() {
  clearTimeout(skeletonTimer)

  skeletonTimer = undefined
  showSkeleton.value = false
}

function startImageLoading() {
  clearSkeletonTimer()
  reset()

  naturalSize.value = { width: 0, height: 0 }
  imageState.value = 'loading'

  if (props.visible) {
    skeletonTimer = setTimeout(() => {
      showSkeleton.value = imageState.value === 'loading'
    }, 300)
  }

  void nextTick(checkCachedImage)
}

function measureContainer() {
  const element = imageContainerRef.value

  if (element) {
    containerSize.value = {
      width: element.clientWidth,
      height: element.clientHeight,
    }

    headerHeight.value = headerRef.value?.offsetHeight ?? 0
  }
}

function checkCachedImage() {
  const image = imageRef.value

  if (image?.complete && image.currentSrc) {
    if (image.naturalWidth) {
      void onImageLoad()
    } else {
      markImageError()
    }
  }
}

async function onImageLoad(event?: Event) {
  const image =
    event?.target instanceof HTMLImageElement ? event.target : imageRef.value

  if (!image || image !== imageRef.value) {
    return
  }

  try {
    await image.decode()
  } catch {
    // A successful load can still be displayed when decode() is unavailable
  }

  if (!props.visible || image !== imageRef.value) {
    return
  }

  clearSkeletonTimer()

  naturalSize.value = { width: image.naturalWidth, height: image.naturalHeight }
  imageState.value = 'loaded'

  void nextTick(measureContainer)
}

function markImageError() {
  clearSkeletonTimer()

  imageState.value = 'error'

  reset()
}

function onImageError(event: Event) {
  if (event.target === imageRef.value) {
    markImageError()
  }
}

function retryImage() {
  imageContainerRef.value?.focus({ preventScroll: true })
  retryCount.value++

  startImageLoading()
}

function onStageWheel(event: WheelEvent) {
  if (imageState.value === 'loaded') {
    onWheel(event)
  }
}

function onStagePointerDown(event: PointerEvent) {
  if (imageState.value === 'loaded') {
    onPointerDown(event)
  }
}

function onStageClick(event: MouseEvent) {
  if (imageState.value === 'loaded') {
    onImageClick(event)
  }
}

function onZoomSliderInput(event: Event) {
  if (event.target instanceof HTMLInputElement) {
    setZoom(Math.exp((Number(event.target.value) / 100) * Math.log(maxZoom)))
  }
}

function navigate(direction: -1 | 1) {
  if (!props.visible || sequence.value.length < 2 || currentIndex.value < 0) {
    return
  }

  const index =
    (currentIndex.value + direction + sequence.value.length) %
    sequence.value.length

  const image = sequence.value[index]

  if (image) {
    emit('select', image)
  }
}

function onDialogKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    event.stopPropagation()

    requestClose()

    return
  }

  if (
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    (event.shiftKey && event.key !== '+') ||
    event.target instanceof HTMLInputElement
  ) {
    return
  }

  const panKeys: Record<string, readonly [number, number]> = {
    ArrowLeft: [-80, 0],
    ArrowRight: [80, 0],
    ArrowUp: [0, -80],
    ArrowDown: [0, 80],
  }

  if (
    event.target === imageContainerRef.value &&
    zoom.value > 1 &&
    panKeys[event.key]
  ) {
    const offset = panKeys[event.key]

    if (offset) {
      event.preventDefault()
      pan(...offset)
    }
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault()
    navigate(event.key === 'ArrowLeft' ? -1 : 1)
  } else if (
    ['+', '=', '-'].includes(event.key) &&
    imageState.value === 'loaded'
  ) {
    event.preventDefault()

    setZoom(event.key === '-' ? zoom.value / 1.25 : zoom.value * 1.25)
  } else if (event.key === '0') {
    event.preventDefault()
    reset()
  }
}

function requestClose() {
  if (props.visible) {
    emit('close')
  }
}

function onNativeClose(event: Event) {
  if (event.target === activeDialog && !activeDialog?.open) {
    requestClose()
  }
}

function onBackdropPointerDown(event: PointerEvent) {
  backdropPointerDown = event.target === dialogRef.value
}

function onBackdropClick(event: MouseEvent) {
  if (backdropPointerDown && event.target === dialogRef.value) {
    requestClose()
  }

  backdropPointerDown = false
}

function finishClose() {
  clearSkeletonTimer()
  reset()

  resizeObserver?.disconnect()
  resizeObserver = undefined
  activeDialog?.close()
  activeDialog = null

  unlockScroll()

  const replacement = Array.from(
    openerGallery?.querySelectorAll<HTMLAnchorElement>('[data-photo-src]') ?? []
  ).find(element => element.dataset.photoSrc === openerSource)

  const target = invokingElement?.isConnected ? invokingElement : replacement

  const request = ++focusRequest
  const path = route.fullPath

  void $overlayScroll.whenUnlocked().then(() => {
    if (
      !disposed &&
      request === focusRequest &&
      route.fullPath === path &&
      target?.isConnected
    ) {
      target.focus({ preventScroll: true })
    }
  })

  invokingElement = null
  openerGallery = null
}

function openDialog() {
  if (!props.visible || !dialogRef.value || dialogRef.value.open) {
    return
  }

  const focused = props.opener?.isConnected
    ? props.opener
    : document.activeElement

  invokingElement = focused instanceof HTMLElement ? focused : null
  openerGallery = invokingElement?.closest('.photo-grid') ?? null
  openerSource = props.image.src

  focusRequest++
  lockScroll()

  activeDialog = dialogRef.value
  activeDialog.showModal()
  closeButtonRef.value?.focus({ preventScroll: true })

  resizeObserver = new ResizeObserver(measureContainer)

  if (imageContainerRef.value) {
    resizeObserver.observe(imageContainerRef.value)
  }

  if (headerRef.value) {
    resizeObserver.observe(headerRef.value)
  }

  measureContainer()
  startImageLoading()
}

watch(
  [() => props.image.src, () => props.visible],
  ([source, visible], [previousSource]) => {
    if (!visible) {
      clearSkeletonTimer()

      return
    }

    if (source !== previousSource) {
      startImageLoading()
    }

    void nextTick(openDialog)
  }
)

watch(
  () => route.fullPath,
  () => {
    if (props.visible) {
      requestClose()
      finishClose()
    }
  }
)

onMounted(openDialog)
onBeforeUnmount(() => {
  disposed = true
  finishClose()
})
</script>

<style lang="scss" scoped>
.photo-viewer {
  position: fixed;
  inset: 0;
  width: 100%;
  max-width: none;
  height: 100%;
  max-height: none;
  margin: 0;
  padding: calc(#{$space-16} + env(safe-area-inset-top))
    calc(#{$space-16} + env(safe-area-inset-right))
    calc(#{$space-16} + env(safe-area-inset-bottom))
    calc(#{$space-16} + env(safe-area-inset-left));
  border: 0;
  background: transparent;
  color: $paper;
  color-scheme: dark;

  :focus-visible {
    outline-color: $yellow;
    outline-offset: 1px;
  }

  &[open] {
    display: grid;
    place-items: center;
  }

  &::backdrop {
    background: transparent;
  }

  &__backdrop {
    position: fixed;
    inset: 0;
    background: rgba($ink, 0.8);
    -webkit-backdrop-filter: blur($space-6);
    backdrop-filter: blur($space-6);
    pointer-events: none;
  }

  &__panel {
    position: relative;
    display: grid;
    grid-template-rows: auto minmax($viewer-stage-min-height, 1fr) auto auto;
    width: min(92vw, $viewer-max-width);
    max-width: 100%;
    height: min(90svh, $viewer-max-height);
    max-height: 100%;
    min-height: 0;
    overflow-y: auto;
    scroll-padding-top: calc(var(--viewer-header-height, 0px) + #{$space-4});
    scroll-padding-bottom: $space-4;
    overscroll-behavior: contain;
    border-radius: $radius-panel;
    background: $viewer-surface;
    box-shadow: 0 $space-20 $space-60 rgba(0, 0, 0, 0.4);
  }

  &__header {
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: flex-start;
    gap: $space-16;
    padding: $space-16 $space-20;
    border-bottom: $border-width solid rgba($sage, 0.3);
    background: $viewer-surface;
  }

  &__title {
    flex: 1;
    min-width: 0;
    margin: 0;
    color: $paper;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.5;
    overflow-wrap: anywhere;
  }

  &__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: $control-size;
    min-height: $control-size;
    padding: $space-8;
    border: $border-width solid $sage;
    border-radius: $radius-control;
    background: $green;
    color: $paper;
    font-size: 0.9375rem;
    line-height: 1.4;

    &:hover:not(:disabled) {
      background: $viewer-control-hover;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    :deep(.iconify) {
      width: $space-20;
      height: $space-20;
    }
  }

  &__close {
    flex: none;
    border: 0;
    border-radius: 50%;
    background: transparent;
  }

  &__stage {
    position: relative;
    min-width: 0;
    min-height: 0;
    margin: $space-4;
    overflow: auto;
    overscroll-behavior: contain;
    background: $ink;
    touch-action: none;
    scrollbar-width: none;
    cursor: zoom-in;

    &::-webkit-scrollbar {
      display: none;
    }

    &--zoomed {
      cursor: grab;

      &:active {
        cursor: grabbing;
      }
    }
  }

  &__image-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 100%;
    min-height: 100%;
  }

  &__image {
    display: block;
    flex: none;
    max-width: none;
    object-fit: contain;
    user-select: none;
    -webkit-user-drag: none;

    &--pending {
      opacity: 0;
    }
  }

  &__toolbar {
    display: grid;
    grid-template-columns: $control-size minmax(0, 1fr) $control-size;
    align-items: center;
    gap: $space-8;
    padding: $space-8 $space-20;
    border-top: $border-width solid rgba($sage, 0.3);

    &--single {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  &__zoom {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $space-8;
    width: 100%;
    max-width: $viewer-zoom-max-width;
    margin-inline: auto;
    min-width: 0;
  }

  &__slider {
    flex: 1;
    width: 100%;
    min-width: 0;
    max-width: $viewer-slider-max-width;
    height: $control-size;
    margin: 0;
    accent-color: $yellow;
    cursor: pointer;
  }

  &__zoom-value {
    min-width: 4ch;
    color: $cream;
    font-size: 0.875rem;
    text-align: center;
  }

  &__details {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: $space-4 $space-16;
    padding: $space-8 $space-20;
    border-top: $border-width solid rgba($sage, 0.3);
    color: $cream;
    font-size: 0.875rem;
    line-height: 1.6;
    overflow-wrap: anywhere;

    p {
      margin: 0;
    }
  }

  &__skeleton,
  &__error {
    position: absolute;
    inset: 0;
    display: grid;
    place-content: center;
    gap: $space-10;
    padding: $space-16;
    border-radius: $radius-panel;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.5;
    text-align: center;
  }

  &__skeleton {
    background: linear-gradient(
      110deg,
      $viewer-skeleton-base 20%,
      $viewer-skeleton-highlight 50%,
      $viewer-skeleton-base 80%
    );
    background-size: 200% 100%;
    color: $viewer-skeleton-text;
    border-radius: $space-7;
    font-size: 0.82rem;
    pointer-events: none;
  }

  &__error p {
    margin: 0;
  }

  &__sr-only {
    position: absolute;
    width: $border-width;
    height: $border-width;
    padding: 0;
    clip-path: inset(50%);
    overflow: hidden;
    white-space: nowrap;
  }
}

.viewer-fade-enter-active .photo-viewer__backdrop,
.viewer-fade-leave-active .photo-viewer__backdrop,
.viewer-fade-enter-active .photo-viewer__panel,
.viewer-fade-leave-active .photo-viewer__panel {
  transition: opacity $transition-viewer;
}

.viewer-fade-enter-from .photo-viewer__backdrop,
.viewer-fade-leave-to .photo-viewer__backdrop,
.viewer-fade-enter-from .photo-viewer__panel,
.viewer-fade-leave-to .photo-viewer__panel {
  opacity: 0;
}

@media (max-width: $breakpoint-mobile) {
  .photo-viewer {
    padding: calc(#{$space-8} + env(safe-area-inset-top))
      calc(#{$space-8} + env(safe-area-inset-right))
      calc(#{$space-8} + env(safe-area-inset-bottom))
      calc(#{$space-8} + env(safe-area-inset-left));

    &__panel {
      width: 100%;
      border-radius: $radius-control;
    }

    &__header,
    &__details {
      padding: $space-8 $space-12;
    }

    &__toolbar {
      padding: $space-8;
    }
  }
}

@media (max-width: $viewer-compact-width) {
  .photo-viewer {
    &__zoom {
      display: grid;
      grid-template-columns: $control-size minmax(0, 1fr) $control-size;
      gap: $space-4;
    }

    &__zoom-value {
      grid-column: 1 / 3;
    }
  }
}

@media (max-height: $short-viewport-height) {
  .photo-viewer {
    &__panel {
      height: 100%;
    }

    &__header {
      padding-block: $space-4;
    }
  }
}

@media (prefers-reduced-motion: no-preference) {
  .photo-viewer {
    &__image {
      transition: opacity $transition-viewer;

      @starting-style {
        opacity: 0;
      }
    }

    &__button {
      transition: background-color $transition-ui;
    }

    &__skeleton {
      animation: skeletonShimmer 1.8s ease-in-out infinite;
    }
  }
}

@media (forced-colors: active) {
  .photo-viewer {
    color-scheme: light dark;

    :focus-visible {
      outline-color: Highlight;
    }

    &__panel {
      border: $border-width solid CanvasText;
    }

    &__backdrop {
      background: Canvas;
    }
  }
}
</style>
