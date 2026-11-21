import type { imageDimensions } from '~/data/imageDimensions'

export type PageName = 'home'

export interface PageSeoDefinition {
  path: string
  type: 'WebPage' | 'AboutPage' | 'CollectionPage' | 'ContactPage' | 'ItemPage'
  image: keyof typeof imageDimensions
  imageAlt: string
  images: readonly string[]
  keywordKeys?: readonly string[]
  indexable?: boolean
}
