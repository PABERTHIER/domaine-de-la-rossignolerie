<template>
  <header id="page-top" class="site-header">
    <div class="site-header__inner">
      <NuxtLink
        class="site-header__brand"
        :to="localePath({ name: 'index' })"
        :aria-label="t('app.logo_alt')">
        <Logo loading="eager" />
        <span class="site-header__name">{{ siteName }}</span>
      </NuxtLink>
      <LanguageSwitcher />
    </div>
  </header>
</template>

<script setup lang="ts">
import { siteName } from '~/data/site'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.site-header {
  padding: calc(#{$space-8} + env(safe-area-inset-top, 0px)) $page-gutter
    $space-8;
  padding-inline: calc(#{$page-gutter} + env(safe-area-inset-left, 0px))
    calc(#{$page-gutter} + env(safe-area-inset-right, 0px));
  border-bottom: 1px solid rgba($green, 0.15);
  background: $cream;

  &__inner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: $space-12;
    max-width: $content-max-width;
    margin-inline: auto;
  }

  &__brand {
    display: flex;
    flex: 1 1 12rem;
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
}

@media (max-width: $breakpoint-laptop) {
  .site-header__brand {
    font-size: 1.3rem;
  }
}

@media (max-width: $breakpoint-mobile) {
  .site-header__brand {
    gap: $space-8;
    font-size: 1.05rem;
  }
}
</style>
