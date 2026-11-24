import { defineEventHandler } from 'h3'
import { useRuntimeConfig } from 'nitropack/runtime'
import {
  ContactError,
  contactConfiguration,
  deliverEnquiry,
  validateEnquiry,
} from '../utils/contact'
import { limitContactRequest } from '../utils/contact-rate-limit'
import {
  checkContactRequest,
  contactClientIp,
  contactFailure,
  contactResponseHeaders,
  readContactBody,
} from '../utils/contact-request'

export default defineEventHandler(async event => {
  contactResponseHeaders(event)

  try {
    const runtime = useRuntimeConfig(event)

    checkContactRequest(event, runtime.contact.origin)

    const config = contactConfiguration(runtime.contact)

    if (!config) {
      throw new ContactError(503, 'unavailable')
    }

    await limitContactRequest(contactClientIp(event, config), config)

    const enquiry = validateEnquiry(await readContactBody(event))

    return await deliverEnquiry(enquiry, config)
  } catch (error) {
    return contactFailure(event, error)
  }
})
