<template>
  <header
    id="page-top"
    ref="header"
    class="site-header"
    :class="{ 'site-header--enhanced': mounted }"
    :style="
      headerHeight ? { '--site-header-height': `${headerHeight}px` } : undefined
    ">
    <div class="site-header__inner">
      <NuxtLink
        class="site-header__brand"
        :to="localePath({ name: 'index' })"
        :title="t('components.header.back_home')"
        :aria-label="t('app.logo_alt')">
        <Logo loading="eager" />
        <span class="site-header__name">{{ siteName }}</span>
      </NuxtLink>
      <div class="site-header__actions">
        <Navigation />
        <LanguageSwitcher />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { siteName } from '~/data/site'

const { t } = useI18n()
const localePath = useLocalePath()

const header = useTemplateRef('header')

const mounted = ref(false)
const headerHeight = ref(0)

let headerObserver: ResizeObserver | undefined

onMounted(() => {
  mounted.value = true

  if (header.value) {
    headerObserver = new ResizeObserver(() => {
      headerHeight.value = header.value?.offsetHeight ?? 0
    })

    headerObserver.observe(header.value)
  }
})

onBeforeUnmount(() => {
  headerObserver?.disconnect()
})
</script>

<style lang="scss" scoped>
.site-header {
  position: relative;
  z-index: $header-z-index;
  padding: calc(#{$space-8} + env(safe-area-inset-top, 0px)) $page-gutter
    $space-8;
  padding-inline: calc(#{$page-gutter} + env(safe-area-inset-left, 0px))
    calc(#{$page-gutter} + env(safe-area-inset-right, 0px));
  border-bottom: 1px solid rgba($green, 0.15);
  background: $cream;

  &__inner {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: $space-12;
    max-width: $content-max-width;
    margin-inline: auto;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: $space-12;
    min-width: 0;
    min-height: $control-size;
    text-decoration: none;
    font: 400 1.5rem / 1.25 $heading-font;
    letter-spacing: 0.025em;
  }

  &__name {
    min-width: 0;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $space-12;
    min-width: 0;
  }
}

@media (max-width: $breakpoint-laptop) {
  .site-header:not(.site-header--enhanced) {
    .site-header__inner {
      grid-template-columns: minmax(0, 1fr);
    }

    .site-header__actions {
      justify-content: space-between;
    }
  }

  .site-header__brand {
    font-size: 1.3rem;
  }
}

@media (max-width: $breakpoint-mobile) {
  .site-header__actions {
    gap: $space-4;
  }

  .site-header__brand {
    gap: $space-8;
    font-size: 1.05rem;
  }
}
</style>
