<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <NuxtLink class="site-footer__back-top" :to="{ hash: '#page-top' }">
        <Icon
          name="lucide:arrow-up"
          class="site-footer__icon"
          aria-hidden="true" />
        {{ t('components.footer.back_top') }}
      </NuxtLink>
      <div class="site-footer__main">
        <NuxtLink
          class="site-footer__home"
          :to="localePath({ name: 'index' })"
          :aria-label="t('app.logo_alt')">
          <Logo />
        </NuxtLink>
        <div class="site-footer__details">
          <h2 class="site-footer__heading">
            {{ t('components.footer.details') }}
          </h2>
          <address class="site-footer__address">{{ address }}</address>
          <div class="site-footer__contacts">
            <a class="site-footer__link" :href="`mailto:${contactEmail}`">
              {{ contactEmail }}
            </a>
            <a class="site-footer__link" :href="phone.href">
              {{ phone.display }}
            </a>
          </div>
        </div>
        <nav
          class="site-footer__policies"
          :aria-label="t('components.footer.policies')">
          <h2 class="site-footer__heading site-footer__policy-heading">
            {{ t('components.footer.policies') }}
          </h2>
          <ul class="site-footer__policy-links">
            <li v-for="policy in policies" :key="policy">
              <NuxtLink
                class="site-footer__link"
                :to="localePath(`/${policy}`)">
                {{ t(`pages.policies.${policy}.title`) }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
      <div class="site-footer__bottom">
        <p class="site-footer__copyright">
          {{ t('components.footer.copyright', { year }) }}
        </p>
        <div class="site-footer__socials">
          <a
            v-for="link in socialLinks"
            :key="link.id"
            class="site-footer__social-link"
            :href="link.url"
            :title="link.name"
            :aria-label="t(`components.footer.${link.id}`)">
            <Icon
              :name="link.icon"
              class="site-footer__social-icon"
              aria-hidden="true" />
            <Icon
              name="lucide:arrow-up-right"
              class="site-footer__external-icon"
              aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { address, contactEmail, phone, socialLinks } from '~/data/site'

const { t } = useI18n()
const localePath = useLocalePath()

const year = useState('copyright-year', () => new Date().getUTCFullYear())

const policies = ['legal', 'cookies', 'privacy'] as const
</script>

<style lang="scss" scoped>
.site-footer {
  padding: 0 $page-gutter calc(#{$space-16} + env(safe-area-inset-bottom, 0px));
  padding-inline: calc(#{$page-gutter} + env(safe-area-inset-left, 0px))
    calc(#{$page-gutter} + env(safe-area-inset-right, 0px));
  font-size: 0.875rem;

  &__inner {
    max-width: $content-max-width;
    margin-inline: auto;
  }

  &__back-top {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $space-8;
    min-width: $control-size;
    min-height: $control-size;
    width: fit-content;
    margin: $space-8 auto;
    padding: $space-4 $space-12;
  }

  &__main {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: start;
    gap: $space-24 $space-20;
    padding-block: $space-24;
    border-top: 1px solid rgba($green, 0.25);
  }

  &__home,
  &__link,
  &__social-link {
    display: inline-flex;
    align-items: center;
    gap: $space-4;
    min-width: $control-size;
    min-height: $control-size;
    max-width: 100%;
  }

  &__home {
    flex: none;
    justify-content: center;
  }

  &__details {
    min-width: 0;
  }

  &__heading {
    margin: 0 0 $space-8;
    font-size: 1.2rem;
  }

  &__address {
    font-style: normal;
  }

  &__contacts,
  &__bottom {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0 $space-24;
  }

  &__bottom {
    justify-content: space-between;
    column-gap: $space-8;
    padding-top: $space-8;
    border-top: 1px solid rgba($green, 0.15);
  }

  &__copyright {
    margin: 0;
    text-wrap: pretty;
  }

  &__policies {
    grid-column: 2;
    min-width: 0;
  }

  &__policy-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0 $space-24;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      min-width: 0;
    }
  }

  &__icon {
    flex: none;
    width: 1em;
    height: 1em;
  }

  &__socials {
    display: flex;
    flex-wrap: wrap;
    gap: $space-8;
  }

  &__social-link {
    justify-content: center;
    padding-inline: $space-8;
    border-radius: 4px;

    &:hover {
      background: $cream;
    }
  }

  &__social-icon {
    flex: none;
    width: 1.25rem;
    height: 1.25rem;
  }

  &__external-icon {
    flex: none;
    width: 0.75rem;
    height: 0.75rem;
  }
}

@media (max-width: $breakpoint-mobile) {
  .site-footer {
    &__main {
      gap: $space-8 $space-12;
      padding-block: $space-16 $space-24;
    }

    &__home,
    &__heading {
      align-self: center;
    }

    &__details {
      display: contents;
    }

    &__heading {
      margin-bottom: 0;
    }

    &__address,
    &__contacts,
    &__policies {
      grid-column: 1 / -1;
    }

    &__policies {
      margin-top: $space-16;
    }

    &__policy-links {
      gap: 0 $space-16;
    }

    &__bottom {
      flex-direction: column;
      gap: $space-4;
      text-align: center;
    }
  }
}

@media (min-width: $breakpoint-tablet) {
  .site-footer {
    &__main {
      grid-template-columns: auto minmax(0, 1.25fr) minmax(0, 1fr);
      column-gap: clamp(24px, 3vw, 48px);
    }

    &__policies {
      grid-column: 3;
      justify-self: end;
      max-width: 24rem;
    }
  }
}
</style>
