<template>
  <div
    ref="root"
    class="site-navigation"
    :class="{
      'site-navigation--compact': mounted && compact,
      'site-navigation--open': open,
    }"
    @keydown.esc="handleEscape"
    @focusout="handleFocusOut">
    <button
      ref="trigger"
      class="site-navigation__trigger"
      type="button"
      :aria-label="
        t(open ? 'components.header.close_menu' : 'components.header.menu')
      "
      :title="
        t(open ? 'components.header.close_menu' : 'components.header.menu')
      "
      :aria-expanded="open"
      :aria-controls="navigationId"
      @click="open = !open">
      <Icon v-show="!open" name="lucide:menu" aria-hidden="true" />
      <Icon v-show="open" name="lucide:x" aria-hidden="true" />
    </button>
    <nav
      :id="navigationId"
      class="site-navigation__links"
      data-lenis-prevent
      :aria-label="t('components.header.nav')">
      <ul class="site-navigation__list">
        <li v-for="item in navigationLinks" :key="item.path">
          <NuxtLink
            class="site-navigation__link"
            :to="localePath(item.path)"
            @click="closeMenu(true)">
            {{ t(item.label) }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { navigationLinks } from '~/data/navigation'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const navigationId = useId()

const root = useTemplateRef('root')
const trigger = useTemplateRef('trigger')
const compact = useNativeMediaQuery('(max-width: 1024px)')

const mounted = ref(false)
const open = ref(false)

function closeMenu(restoreFocus = false) {
  open.value = false

  if (restoreFocus && compact.value) {
    trigger.value?.focus({ preventScroll: true })
  }
}

function handleEscape(event: KeyboardEvent) {
  if (open.value) {
    event.preventDefault()
    closeMenu(true)
  }
}

function handleFocusOut(event: FocusEvent) {
  if (
    event.relatedTarget instanceof Node &&
    !root.value?.contains(event.relatedTarget)
  ) {
    closeMenu()
  }
}

function handleOutsidePointer(event: PointerEvent) {
  if (event.target instanceof Node && !root.value?.contains(event.target)) {
    closeMenu()
  }
}

watch(
  () => route.fullPath,
  () => closeMenu()
)

watch(compact, async isCompact => {
  const active = document.activeElement
  const moveFocus =
    root.value?.contains(active) && (isCompact || active === trigger.value)

  closeMenu()

  if (moveFocus) {
    await nextTick()

    if (compact.value !== isCompact) {
      return
    }

    const target = isCompact
      ? trigger.value
      : (root.value?.querySelector<HTMLAnchorElement>(
          'a[aria-current="page"]'
        ) ?? root.value?.querySelector<HTMLAnchorElement>('a'))

    target?.focus({ preventScroll: true })
  }
})

onMounted(() => {
  mounted.value = true

  document.addEventListener('pointerdown', handleOutsidePointer)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleOutsidePointer)
})
</script>

<style lang="scss" scoped>
.site-navigation {
  min-width: 0;

  &__trigger {
    display: none;
    align-items: center;
    justify-content: center;
    padding: $space-8;
    border: 0;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 700;

    .iconify {
      width: 22px;
      height: 22px;
    }

    &:hover {
      background: rgba($green, 0.08);
    }
  }

  &--compact &__trigger {
    display: flex;
  }

  &--compact:not(&--open) &__links {
    display: none;
  }

  &--compact &__links {
    position: absolute;
    top: 100%;
    inset-inline: 0;
    max-height: max(
      44px,
      calc(100dvh - var(--site-header-height, 80px) - 16px)
    );
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: $space-12 $page-gutter $space-20;
    padding-inline: calc(#{$page-gutter} + env(safe-area-inset-left, 0px))
      calc(#{$page-gutter} + env(safe-area-inset-right, 0px));
    border-bottom: 1px solid rgba($green, 0.25);
    background: $cream;
    box-shadow: 0 8px 16px rgba($ink, 0.1);
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: $space-4 $space-12;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__link {
    display: flex;
    align-items: center;
    min-height: $control-size;
    min-width: $control-size;
    padding: $space-8 $space-12;
    font-size: 0.875rem;
    text-decoration: none;

    &:hover,
    &[aria-current='page'] {
      text-decoration: underline;
    }

    &[aria-current='page'] {
      font-weight: 700;
    }
  }
}

@media (max-width: $breakpoint-laptop) {
  .site-navigation {
    &__list {
      flex-direction: column;
      margin-top: 0;
    }
  }
}
</style>
