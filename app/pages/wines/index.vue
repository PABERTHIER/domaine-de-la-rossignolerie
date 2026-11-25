<template>
  <div class="wines-page">
    <div class="page-intro">
      <h1 id="wines-title">{{ t('pages.wines.title') }}</h1>
      <p>{{ t('pages.wines.intro') }}</p>
    </div>
    <div class="wines-page__collection">
      <div
        v-if="interactive"
        class="wines-page__tabs"
        role="tablist"
        aria-labelledby="wines-title">
        <button
          v-for="(wine, index) in wines"
          :id="`wine-tab-${wine.id}`"
          :key="wine.id"
          ref="tabs"
          class="wines-page__tab"
          type="button"
          role="tab"
          :aria-selected="active === index"
          :aria-controls="`wine-panel-${wine.id}`"
          :tabindex="active === index ? 0 : -1"
          @click="active = index"
          @keydown="onTabKey($event, index)">
          {{ t(`pages.wines.items.${wine.id}.title`) }}
        </button>
      </div>
      <section
        v-for="(wine, index) in wines"
        :id="`wine-panel-${wine.id}`"
        :key="wine.id"
        class="wines-page__panel"
        :role="interactive ? 'tabpanel' : undefined"
        :aria-labelledby="
          interactive ? `wine-tab-${wine.id}` : `wine-title-${wine.id}`
        "
        :hidden="interactive && active !== index"
        :tabindex="interactive ? 0 : undefined">
        <div class="wines-page__identity">
          <p class="wines-page__grape">{{ wine.grape }}</p>
          <h2 :id="`wine-title-${wine.id}`">
            {{ t(`pages.wines.items.${wine.id}.title`) }}
          </h2>
        </div>
        <Image
          class="wines-page__bottle"
          :src="media[wine.image].src"
          :alt="t(`pages.wines.items.${wine.id}.alt`)"
          sizes="6rem"
          :priority="index === 0" />
        <div class="wines-page__notes">
          <p>{{ t(`pages.wines.items.${wine.id}.origin`) }}</p>
          <p>{{ t(`pages.wines.items.${wine.id}.notes`) }}</p>
          <p class="wines-page__production">
            {{ t('pages.wines.production', { count: n(wine.production) }) }}
          </p>
          <NuxtLink :to="localePath('/contact')">
            {{ t('pages.wines.enquiry') }}
            <Icon name="lucide:arrow-right" aria-hidden="true" />
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import media from '~/data/media.json'
import { wines } from '~/data/wines'

const { t, n } = useI18n()
const localePath = useLocalePath()

const tabs = useTemplateRef<HTMLButtonElement[]>('tabs')
const active = useState<number>('wines:selected', () => 0)

const interactive = ref(false)

function onTabKey(event: KeyboardEvent, index: number) {
  let next: number

  switch (event.key) {
    case 'ArrowRight':
      next = (index + 1) % wines.length
      break
    case 'ArrowLeft':
      next = (index + wines.length - 1) % wines.length
      break
    case 'Home':
      next = 0
      break
    case 'End':
      next = wines.length - 1
      break
    default:
      return
  }

  event.preventDefault()

  active.value = next
  tabs.value?.find(tab => tab.id === `wine-tab-${wines[next]?.id}`)?.focus()
}

onMounted(() => {
  interactive.value = true
})

useHead(usePageSeo('wines'))
</script>

<style lang="scss" scoped>
.wines-page {
  &__collection {
    width: calc(100% - 2 * #{$page-gutter});
    max-width: 70rem;
    margin: 0 auto clamp(32px, 8vw, 96px);
    color: $ink;
    background: $sage;
  }

  &__tabs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 8rem), 1fr));
    background: $cream;
  }

  &__tab {
    min-width: 0;
    min-height: $control-size;
    padding: $space-16 $space-8;
    border: 0;
    border-bottom: 3px solid transparent;
    color: $ink;
    line-height: 1.4;
    overflow-wrap: anywhere;

    &[aria-selected='true'] {
      border-bottom-color: $vine;
      background: $sage;
      font-weight: 700;
    }

    &:focus-visible {
      position: relative;
      z-index: 1;
      outline-offset: -4px;
    }
  }

  &__panel {
    display: grid;
    gap: $space-32;
    padding: clamp(24px, 4vw, 64px);

    &[hidden] {
      display: none;
    }

    h2 {
      margin: $space-8 0 0;
      color: $ink;
      font-size: clamp(2.3rem, 4vw, 3.6rem);
      text-transform: uppercase;
      overflow-wrap: anywhere;
    }
  }

  &__identity,
  &__notes {
    min-width: 0;
  }

  &__grape {
    margin: 0;
    letter-spacing: 0.08em;
  }

  &__bottle {
    justify-self: center;
    width: auto;
    height: 21rem;
    max-width: 100%;
    object-fit: contain;
  }

  &__notes {
    p:first-child {
      margin-top: 0;
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: $space-8;
      min-height: $control-size;
      color: $ink;

      svg {
        flex-shrink: 0;
      }
    }
  }

  &__production {
    margin-top: $space-32;
  }
}

@media (min-width: $breakpoint-tablet) {
  .wines-page {
    &__panel {
      grid-template-columns: minmax(0, 1fr) minmax(0, 0.65fr) minmax(0, 1.4fr);
      align-items: center;
    }
  }
}

@media (forced-colors: active) {
  .wines-page__tab[aria-selected='true'] {
    border-bottom-color: Highlight;
  }
}
</style>
