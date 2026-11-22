<template>
  <Image
    class="logo"
    :src="media.bird.src"
    :alt="alt"
    sizes="(max-width: 640px) 32px, (max-width: 1024px) 40px, 48px"
    :loading="loading"
    :skeleton="false" />
</template>

<script setup lang="ts">
import media from '~/data/media.json'

const { alt = '', loading = 'lazy' } = defineProps<{
  alt?: string
  loading?: 'lazy' | 'eager'
}>()
</script>

<style lang="scss" scoped>
.logo {
  flex: none;
  width: 48px;
}

@media (max-width: $breakpoint-laptop) {
  .logo {
    width: 40px;
  }
}

@media (max-width: $breakpoint-mobile) {
  .logo {
    width: 32px;
  }
}
</style>
