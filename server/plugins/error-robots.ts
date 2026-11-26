import { getResponseStatus, setResponseHeader } from 'h3'
import type { H3Event } from 'h3'
import { defineNitroPlugin } from 'nitropack/runtime'
import { robotsContent } from '../../app/data/seo'

function markErrorResponse(event: H3Event) {
  if (!event.handled && getResponseStatus(event) >= 400) {
    setResponseHeader(event, 'X-Robots-Tag', robotsContent.blocked)
  }
}

export default defineNitroPlugin(nitroApp => {
  nitroApp.hooks.hook('beforeResponse', markErrorResponse)

  // Nitro can send thrown errors directly, bypassing beforeResponse
  nitroApp.hooks.hook('error', (_error, { event }) => {
    if (event) {
      markErrorResponse(event)
    }
  })
})
