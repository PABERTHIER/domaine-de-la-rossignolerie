import type { PageName, PageSeoDefinition } from '../types/seo'
import { galleryProjects, projects } from './gallery'
import media from './media.json'

// Shared by Nuxt Robots (HTTP/SSR), content pages and error recovery (client)
export const robotsContent = {
  indexable:
    'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  blocked: 'noindex, nofollow',
} as const

// Keep each selected artwork with its existing translated description
// Sitemap images describe content available on the page, including its viewer
export const pageSeo: Record<PageName, PageSeoDefinition> = {
  home: {
    path: '/',
    type: 'WebPage',
    image: '/images/social.jpg',
    imageAlt: 'pictures.social.title',
    images: [],
  },
  gallery: {
    path: '/gallery',
    type: 'CollectionPage',
    image: '/images/photo-40-1468.webp',
    imageAlt: 'pictures.photo-40.title',
    images: galleryProjects.map(project => media[project.images[0]].src),
  },
  gallery_spring: {
    path: '/photos/spring',
    type: 'ItemPage',
    image: '/images/photo-40-1468.webp',
    imageAlt: 'pictures.photo-40.title',
    images: projects[0].images.map(photo => media[photo].src),
  },
  gallery_vineyards: {
    path: '/photos/vineyards',
    type: 'ItemPage',
    image: '/images/photo-3-1600.webp',
    imageAlt: 'pictures.photo-3.title',
    images: projects[1].images.map(photo => media[photo].src),
  },
  about: {
    path: '/about',
    type: 'AboutPage',
    image: '/images/history-1600.webp',
    imageAlt: 'pictures.history.title',
    images: [
      '/images/history-1600.webp',
      '/images/michel-944.webp',
      '/images/christophe-980.webp',
      '/images/tanguy-1282.webp',
    ],
  },
}
