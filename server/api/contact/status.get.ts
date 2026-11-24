import { defineEventHandler } from 'h3'
import { useRuntimeConfig } from 'nitropack/runtime'
import { contactConfiguration } from '../../utils/contact'
import { contactResponseHeaders } from '../../utils/contact-request'

export default defineEventHandler(event => {
  contactResponseHeaders(event)

  const config = contactConfiguration(useRuntimeConfig(event).contact)

  // Readiness permits an attempt; this endpoint never probes or sends mail
  return {
    available: Boolean(config),
    delivery: config ? ('unverified' as const) : ('disabled' as const),
  }
})
