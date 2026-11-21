import { defineEventHandler, getRequestURL, sendRedirect } from 'h3'
import { legacyDestinations } from '../../app/data/legacyRoutes'

// This server middleware returns a 301 for old paths such as /galerie, before the page loads
export default defineEventHandler(event => {
  const requestUrl = getRequestURL(event)
  let legacyPath: string

  try {
    legacyPath = decodeURIComponent(requestUrl.pathname.slice(1))
  } catch {
    return
  }

  if (!Object.hasOwn(legacyDestinations, legacyPath)) {
    return
  }

  const destination = legacyDestinations[legacyPath]
  const target = new URL(
    `/fr${destination === '/' ? '' : destination}`,
    requestUrl
  )

  target.search = requestUrl.search

  return sendRedirect(
    event,
    `${target.pathname}${target.search}${target.hash}`,
    301
  )
})
