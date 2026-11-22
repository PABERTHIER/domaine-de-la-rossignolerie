export type ImageDimensions = readonly [width: number, height: number]

export interface MediaVariant {
  src: string
  width: number
  bytes: number
}

export interface MediaDefinition {
  width: number
  height: number
  src: string
  variants: readonly MediaVariant[]
}

export type ImageSource = {
  src: string
  title?: string
  mobileTitle?: string
  alt: string
  dimensions?: string
}
