<template>
  <div class="about">
    <section class="about__intro" aria-labelledby="about-title">
      <div class="about__introduction">
        <h1 id="about-title">{{ t('pages.about.title') }}</h1>
        <p>{{ t('pages.about.intro') }}</p>
      </div>
      <Image
        class="about__landscape"
        :src="media.history.src"
        :alt="t('pictures.history.title')"
        sizes="(min-width: 1548px) 704px, (min-width: 768px) 46vw, 92vw"
        priority />
    </section>
    <section class="about__story" aria-labelledby="story-title">
      <h2 id="story-title">{{ t('pages.about.story_title') }}</h2>
      <blockquote>
        <p>{{ t('pages.about.story') }}</p>
        <cite>{{ storyAuthor?.name }}</cite>
      </blockquote>
    </section>
    <section class="about__team" aria-labelledby="team-title">
      <h2 id="team-title">{{ t('pages.about.team') }}</h2>
      <div class="about__people">
        <article v-for="person in team" :key="person.id" class="about__person">
          <Image
            class="about__portrait"
            :src="media[person.id].src"
            :alt="t(`pictures.${person.id}.title`)"
            sizes="(min-width: 1548px) 448px, (min-width: 768px) 29vw, 92vw" />
          <div class="about__biography">
            <p class="about__role">
              {{ t(`pages.about.${person.id}.role`) }}
            </p>
            <h3>{{ person.name }}</h3>
            <p>{{ t(`pages.about.${person.id}.bio`) }}</p>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import media from '~/data/media.json'
import { team } from '~/data/site'

const { t } = useI18n()

const storyAuthor = team.find(person => person.id === 'michel')

useHead(usePageSeo('about'))
</script>

<style lang="scss" scoped>
.about {
  max-width: $content-max-width;
  margin-inline: auto;

  &__intro {
    display: grid;
  }

  &__introduction {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(24px, 5vw, 80px);
    background: $yellow;
    text-align: center;

    h1 {
      margin: 0 0 $space-24;
    }

    p {
      margin: 0;
    }
  }

  &__landscape {
    width: 100%;
    height: 100%;
    aspect-ratio: 3 / 2;
    object-fit: cover;
  }

  &__story {
    margin-top: clamp(24px, 3vw, 48px);
    padding: clamp(32px, 6vw, 80px) clamp(20px, 4vw, 64px);
    color: $paper;
    background: $vine;
    text-align: center;

    h2 {
      max-width: 30ch;
      margin: 0 auto $space-24;
      color: inherit;
    }

    blockquote {
      max-width: $prose-max-width;
      margin: 0 auto;
      font-size: 1.2rem;
    }

    p {
      margin: 0 0 $space-24;
    }

    cite {
      font-size: 1rem;
      font-style: normal;
    }
  }

  &__team {
    margin-top: clamp(32px, 4vw, 56px);
    margin-bottom: clamp(16px, 2vw, 32px);

    > h2 {
      margin: 0 0 clamp(24px, 3vw, 40px);
      text-align: center;
    }
  }

  &__people {
    display: grid;
    gap: $space-32;
  }

  &__person {
    min-width: 0;
    background: $cream;
  }

  &__portrait {
    width: 100%;
    height: auto;
    aspect-ratio: 403 / 334;
    object-fit: cover;
  }

  &__biography {
    padding: $space-24;

    h3 {
      margin: $space-8 0 $space-20;
      font-size: 1.5rem;
    }

    p {
      margin: 0;
    }
  }

  &__role {
    font-size: 0.875rem;
  }
}

@media (min-width: $breakpoint-tablet) {
  .about__intro {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .about__people {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
