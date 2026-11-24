export const siteName = 'Domaine de la Rossignolerie'

export const contactEmail = 'domaine.larossignolerie@gmail.com'

// TODO: Supplied legal wording awaiting verification before policy publication
export const legalIdentity = {
  companyName: 'SARL La Rossignolerie',
  representative: 'Michel Pittiglio',
} as const

export const phone = {
  display: '06 07 22 80 39',
  href: 'tel:+33607228039',
} as const

export const address =
  '1008 rue des Montaigus, 49290 Chalonnes-sur-Loire, France'

export const externalLinks = {
  instagram: 'https://www.instagram.com/domainedelarossignolerie/',
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`,
} as const

export const socialLinks = [
  {
    id: 'instagram',
    name: 'Instagram',
    url: externalLinks.instagram,
    icon: 'lucide:instagram',
  },
] as const

export const team = [
  { id: 'michel', name: 'Michel' },
  { id: 'christophe', name: 'Christophe' },
  { id: 'tanguy', name: 'Tanguy' },
] as const
