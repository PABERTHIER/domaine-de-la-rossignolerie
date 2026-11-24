<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const localeHead = useLocaleHead({ seo: true })

const route = useRoute()
const head = injectHead()

// Filter resolved tags so the SEO module's automatic canonical cannot reappear on review pages
const removeReviewLinks = head.hooks?.hook('tags:afterResolve', context => {
  if (route.meta.reviewOnly) {
    context.tags = context.tags.filter(
      tag =>
        tag.tag !== 'link' ||
        (tag.props.rel !== 'canonical' &&
          !(tag.props.rel === 'alternate' && tag.props.hreflang))
    )
  }
})

onScopeDispose(() => removeReviewLinks?.())

useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs,
  link: localeHead.value.link,
  meta: localeHead.value.meta,
}))
</script>

<style lang="scss" scoped></style>
