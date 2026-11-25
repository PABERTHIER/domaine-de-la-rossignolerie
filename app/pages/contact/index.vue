<template>
  <div class="contact-page">
    <section class="contact-page__intro" aria-labelledby="contact-title">
      <Image
        class="contact-page__photo"
        :src="media.contact.src"
        :alt="t('pictures.contact.title')"
        sizes="(min-width: 1548px) 704px, (min-width: 1280px) 46vw, 92vw"
        priority />
      <div class="contact-page__enquiry">
        <h1 id="contact-title">{{ t('pages.contact.title') }}</h1>
        <p>{{ t('pages.contact.intro') }}</p>
        <a class="contact-page__email" :href="`mailto:${contactEmail}`">
          {{ contactEmail }}
        </a>
        <ContactForm />
      </div>
    </section>
    <section class="contact-page__visit" aria-labelledby="visit-title">
      <h2 id="visit-title">{{ t('pages.contact.visit') }}</h2>
      <div class="contact-page__details">
        <address>{{ address }}</address>
        <div>
          <p>{{ t('pages.contact.hours') }}</p>
          <a :href="phone.href">{{ phone.display }}</a>
        </div>
      </div>
      <a class="button-link" :href="externalLinks.directions">
        {{ t('pages.contact.directions') }}
        <Icon name="lucide:arrow-up-right" aria-hidden="true" />
      </a>
    </section>
  </div>
</template>

<script setup lang="ts">
import media from '~/data/media.json'
import { address, contactEmail, externalLinks, phone } from '~/data/site'

const { t } = useI18n()

useHead(usePageSeo('contact'))
</script>

<style lang="scss" scoped>
.contact-page {
  max-width: $content-max-width;
  margin-inline: auto;

  &__intro {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }

  &__photo {
    width: 100%;
    height: 100%;
    max-height: 32rem;
    object-fit: cover;
  }

  &__enquiry {
    min-width: 0;
    padding: clamp(24px, 4vw, 64px);
    background: $yellow;

    h1 {
      margin: 0 0 $space-16;
    }
  }

  &__email {
    display: inline-flex;
    align-items: center;
    min-height: $control-size;
    max-width: 100%;
  }

  &__visit {
    padding: clamp(32px, 4vw, 56px) $space-16 0;
    margin-bottom: clamp(16px, 2vw, 32px);
    text-align: center;

    h2 {
      margin: 0 0 $space-24;
    }

    .button-link {
      gap: $space-8;
    }
  }

  &__details {
    display: grid;
    gap: $space-20;
    max-width: 55rem;
    margin: 0 auto $space-24;

    > address,
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 0;
    }

    address {
      font-style: normal;
    }

    p {
      margin: 0;
    }

    a {
      display: inline-flex;
      align-items: center;
      min-height: $control-size;
    }
  }
}

@media (min-width: $breakpoint-tablet) {
  .contact-page__details {
    position: relative;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0;

    > address,
    > div {
      padding-inline: $space-32;
    }

    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1px;
      height: 100%;
      max-height: 64px;
      background: $green;
      transform: translate(-50%, -50%);
      content: '';
    }
  }
}

@media (min-width: $breakpoint-desktop) {
  .contact-page {
    &__intro {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    &__photo {
      max-height: none;
    }
  }
}
</style>
