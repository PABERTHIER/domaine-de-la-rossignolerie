<template>
  <details
    ref="root"
    class="lang-switcher"
    @keydown="handleKeydown"
    @focusout="handleFocusOut">
    <summary
      ref="trigger"
      class="lang-switcher__trigger"
      :aria-label="`${t('components.lang_switcher.label')}: ${currentLocale?.name ?? locale}`">
      <Icon
        class="lang-switcher__language-icon"
        name="lucide:languages"
        aria-hidden="true" />
      <span aria-hidden="true">{{ locale.toUpperCase() }}</span>
      <Icon
        class="lang-switcher__chevron"
        name="lucide:chevron-down"
        aria-hidden="true" />
    </summary>
    <nav
      class="lang-switcher__menu"
      :aria-label="t('components.lang_switcher.label')">
      <ul class="lang-switcher__list">
        <li v-for="item in availableLocales" :key="item.code">
          <NuxtLink
            class="lang-switcher__link"
            :to="item.destination"
            :lang="item.language"
            :hreflang="item.language"
            :aria-current="item.code === locale ? 'true' : undefined"
            @click="closeMenu(true)">
            {{ item.name }}
            <Icon
              class="lang-switcher__check"
              name="lucide:check"
              aria-hidden="true" />
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </details>
</template>

<script setup lang="ts">
const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()
const router = useRouter()

const root = useTemplateRef('root')
const trigger = useTemplateRef('trigger')
const mounted = ref(false)
const compact = useNativeMediaQuery('(max-width: 640px)')

const currentLocale = computed(() =>
  locales.value.find(item => item.code === locale.value)
)
const availableLocales = computed(() =>
  locales.value.map(item => {
    const destination = router.resolve(switchLocalePath(item.code))

    return {
      ...item,
      destination: {
        path: destination.path,
        query: destination.query,
        // Fragments reach the client only; add them after hydration
        hash: mounted.value ? destination.hash : '',
      },
    }
  })
)

function closeMenu(restoreFocus = false) {
  if (!root.value?.open) {
    return
  }

  root.value.open = false

  if (restoreFocus) {
    trigger.value?.focus({ preventScroll: true })
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && root.value?.open) {
    event.preventDefault()
    closeMenu(true)

    return
  }

  if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
    return
  }

  const options = Array.from(root.value?.querySelectorAll('a') ?? [])

  if (!root.value || !options.length) {
    return
  }

  event.preventDefault()

  const activeIndex = options.findIndex(item => item === document.activeElement)
  const nextIndex =
    event.key === 'Home' || (activeIndex === -1 && event.key === 'ArrowDown')
      ? 0
      : event.key === 'End' || (activeIndex === -1 && event.key === 'ArrowUp')
        ? options.length - 1
        : (activeIndex +
            (event.key === 'ArrowDown' ? 1 : -1) +
            options.length) %
          options.length

  root.value.open = true

  options[nextIndex]?.focus({ preventScroll: true })
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

watch(compact, () => closeMenu(root.value?.contains(document.activeElement)))

onMounted(() => {
  mounted.value = true

  document.addEventListener('pointerdown', handleOutsidePointer)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleOutsidePointer)
})
</script>

<style lang="scss" scoped>
.lang-switcher {
  position: relative;
  flex: none;
  margin-inline-start: auto;
  color: $green;

  &__trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $space-8;
    min-width: $control-size;
    min-height: $control-size;
    padding-inline: $space-8;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 700;
    list-style: none;
    cursor: pointer;

    &::-webkit-details-marker {
      display: none;
    }
  }

  &__language-icon {
    flex: none;
    width: 18px;
    height: 18px;
  }

  &__chevron {
    flex: none;
    width: 12px;
    height: 12px;
    transition: transform $transition-ui;
  }

  &[open] &__trigger,
  &__trigger:hover {
    background: rgba($green, 0.08);
  }

  &[open] &__chevron {
    transform: rotate(180deg);
  }

  &__menu {
    position: absolute;
    z-index: 1;
    top: calc(100% + #{$space-4});
    right: 0;
    width: max-content;
    min-width: min(10rem, calc(100vw - 2 * #{$page-gutter}));
    max-width: calc(100vw - 2 * #{$page-gutter});
    padding: $space-4;
    border: 1px solid rgba($green, 0.25);
    border-radius: 4px;
    background: $paper;
    box-shadow: 0 8px 24px rgba($ink, 0.12);
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-20;
    min-width: $control-size;
    min-height: $control-size;
    padding: $space-8 $space-12;
    border-radius: 2px;
    font-size: 0.875rem;
    text-decoration: none;

    &:hover,
    &[aria-current='true'] {
      background: $cream;
    }

    &[aria-current='true'] {
      font-weight: 700;
    }

    &:focus-visible {
      outline-offset: -$focus-width;
    }
  }

  &__check {
    flex: none;
    width: 1em;
    height: 1em;
    visibility: hidden;
  }

  &__link[aria-current='true'] &__check {
    visibility: visible;
  }
}

@media (max-width: $breakpoint-mobile) {
  .lang-switcher__language-icon {
    display: none;
  }
}

@media (forced-colors: active) {
  .lang-switcher__link[aria-current='true'] {
    outline: 1px solid CanvasText;
    outline-offset: -1px;
  }
}
</style>
