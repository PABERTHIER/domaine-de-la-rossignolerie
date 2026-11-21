<template>
  <div class="site-layout">
    <a class="skip-link" href="#main-content" @click="focusMain">
      {{ t('components.layout.skip') }}
    </a>
    <main id="main-content" ref="main" class="site-main" tabindex="-1">
      <div class="page-content">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const main = useTemplateRef('main')

function focusMain() {
  main.value?.focus({ preventScroll: true })
}
</script>

<style lang="scss" scoped>
.site-layout {
  display: flex;
  flex-direction: column;
  min-height: 100svh;
}

.site-main {
  display: flex;
  flex: 1;
  min-width: 0;
}

.page-content {
  flex: 1;
  min-width: 0;
  padding: $page-gutter;
  padding-inline: calc(#{$page-gutter} + env(safe-area-inset-left, 0px))
    calc(#{$page-gutter} + env(safe-area-inset-right, 0px));
}
</style>
