import type { PageName, PageSeoDefinition } from '../types/seo'
import { galleryProjects, projects } from './gallery'
import media from './media.json'
import { wines } from './wines'

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
  gallery_renovation: {
    path: '/photos/renovation',
    type: 'ItemPage',
    image: '/images/photo-35-1600.webp',
    imageAlt: 'pictures.photo-35.title',
    images: projects[2].images.map(photo => media[photo].src),
  },
  gallery_chenin: {
    path: '/photos/chenin',
    type: 'ItemPage',
    image: '/images/photo-26-1080.webp',
    imageAlt: 'pictures.photo-26.title',
    images: projects[3].images.map(photo => media[photo].src),
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
  contact: {
    path: '/contact',
    type: 'ContactPage',
    image: '/images/contact-1080.webp',
    imageAlt: 'pictures.contact.title',
    images: ['/images/contact-1080.webp'],
  },
  wines: {
    path: '/wines',
    type: 'CollectionPage',
    image: '/images/anjou-320.webp',
    imageAlt: 'pages.wines.items.anjou25.alt',
    images: [...new Set(wines.map(wine => media[wine.image].src))],
  },
  legal: {
    path: '/legal',
    type: 'WebPage',
    image: '/images/social.jpg',
    imageAlt: 'pictures.social.title',
    images: [],
    indexable: false,
  },
  cookies: {
    path: '/cookies',
    type: 'WebPage',
    image: '/images/social.jpg',
    imageAlt: 'pictures.social.title',
    images: [],
    indexable: false,
  },
  privacy: {
    path: '/privacy',
    type: 'WebPage',
    image: '/images/social.jpg',
    imageAlt: 'pictures.social.title',
    images: [],
    indexable: false,
  },
}
