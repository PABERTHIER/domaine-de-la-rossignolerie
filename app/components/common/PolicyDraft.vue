<template>
  <article class="policy-draft" :aria-labelledby="`${kind}-title`">
    <h1 :id="`${kind}-title`" class="policy-draft__title">
      {{ t(`pages.policies.${kind}.title`) }}
    </h1>
    <p class="policy-draft__notice">
      <strong>{{ t('pages.policies.review_title') }}</strong>
      <span>{{ t('pages.policies.pending') }}</span>
    </p>
    <section
      v-for="section in sections[kind]"
      :key="section"
      class="policy-draft__section"
      :aria-labelledby="`${kind}-${section}`">
      <h2 :id="`${kind}-${section}`">
        {{ t(`pages.policies.${kind}.${section}.title`) }}
      </h2>
      <p>{{ t(`pages.policies.${kind}.${section}.body`, legalIdentity) }}</p>
    </section>
    <a class="policy-draft__contact" :href="`mailto:${contactEmail}`">
      {{ contactEmail }}
    </a>
  </article>
</template>

<script setup lang="ts">
import { contactEmail, legalIdentity } from '~/data/site'
import type { PolicyName } from '~/types/seo'

defineProps<{ kind: PolicyName }>()

const { t } = useI18n()

const sections = {
  legal: ['identity', 'hosting'],
  cookies: ['language', 'services'],
  privacy: ['enquiries', 'protection', 'review'],
} as const
</script>

<style lang="scss" scoped>
.policy-draft {
  max-width: 48rem;
  margin-inline: auto;
  padding-block: $space-24 $space-32;

  &__title {
    margin: 0 0 $space-24;
  }

  &__notice {
    display: grid;
    gap: $space-8;
    margin: 0 0 $space-32;
    border-inline-start: 3px solid $green;
    padding: $space-16;
    background: $cream;
  }

  &__section {
    margin-block: $space-24;

    h2 {
      margin: 0 0 $space-12;
      font-size: clamp(1.5rem, 3vw, 2rem);
    }

    p {
      margin: 0;
    }
  }

  &__contact {
    display: inline-flex;
    align-items: center;
    min-height: $control-size;
    max-width: 100%;
    overflow-wrap: anywhere;
  }
}
</style>
