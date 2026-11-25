import { siteName } from '../../app/data/site'
import type { ContactFieldError } from '../../app/types/contact'

export const contactLimits = {
  name: 120,
  phone: 60,
  email: 254,
  message: 5000,
  website: 200,
} as const

export type ContactField = keyof typeof contactLimits
export type Enquiry = Record<ContactField, string> & { requestId: string }
export type ContactCode = 'invalid' | 'failure' | 'unavailable' | 'rate'

export class ContactError extends Error {
  constructor(
    readonly statusCode: number,
    readonly code: ContactCode,
    readonly fields: Partial<Record<ContactField, ContactFieldError>> = {},
    readonly retryAfter?: number
  ) {
    super(code)
  }
}

function hasContactControls(value: string, multiline = false) {
  return Array.from(value).some(character => {
    const code = character.charCodeAt(0)

    return (
      (code < 32 && !(multiline && [9, 10, 13].includes(code))) ||
      (code >= 127 && code <= 159)
    )
  })
}

export function validContactEmail(value: string) {
  return (
    value.length <= contactLimits.email &&
    value.indexOf('@') <= 64 &&
    /^[a-z\d!#$%&'*+/=?^_`{|}~.-]+@(?:[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?\.)+[a-z]{2,63}$/i.test(
      value
    ) &&
    !value.includes('..') &&
    !value.startsWith('.') &&
    !value.includes('.@')
  )
}

export function validateEnquiry(input: unknown): Enquiry {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new ContactError(422, 'invalid')
  }

  const source = input as Record<string, unknown>
  const fields: Partial<Record<ContactField, ContactFieldError>> = {}
  const result = {} as Enquiry

  if (
    Object.keys(source).some(
      key => key !== 'requestId' && !Object.hasOwn(contactLimits, key)
    )
  ) {
    throw new ContactError(422, 'invalid')
  }

  for (const field of Object.keys(contactLimits) as ContactField[]) {
    const value = source[field] === undefined ? '' : source[field]

    result[field] = ''

    if (typeof value !== 'string' || value.length > contactLimits[field]) {
      fields[field] = 'length_error'
    } else if (hasContactControls(value, field === 'message')) {
      fields[field] = 'characters_error'
    } else {
      result[field] = value.trim().replace(/\r\n?/g, '\n')
    }
  }

  if (!fields.email && !validContactEmail(result.email)) {
    fields.email = result.email ? 'email_error' : 'required_error'
  }

  if (!fields.message && !result.message) {
    fields.message = 'required_error'
  }

  if (Object.keys(fields).length) {
    throw new ContactError(422, 'invalid', fields)
  }

  if (
    result.website ||
    typeof source.requestId !== 'string' ||
    !/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(
      source.requestId
    )
  ) {
    throw new ContactError(422, 'invalid')
  }

  result.requestId = source.requestId.toLowerCase()

  return result
}

export interface ContactConfiguration {
  origin: string
  apiKey: string
  from: string
  to: string
  ipSource: 'vercel' | 'socket'
  rateLimitSecret: string
  redisUrl: string
  redisToken: string
}

// Nuxt runtime environment overrides can arrive as strings
export function contactConfiguration(
  input: Record<string, unknown>,
  onVercel = process.env.VERCEL === '1'
): ContactConfiguration | undefined {
  if (input.enabled !== true && input.enabled !== 'true') {
    return
  }

  const keys = [
    'origin',
    'apiKey',
    'from',
    'to',
    'ipSource',
    'rateLimitSecret',
    'redisUrl',
    'redisToken',
  ] as const

  if (keys.some(key => typeof input[key] !== 'string' || !input[key])) {
    return
  }

  const config = Object.fromEntries(
    keys.map(key => [key, input[key]])
  ) as unknown as ContactConfiguration

  try {
    const origin = new URL(config.origin)
    const redis = new URL(config.redisUrl)
    const local = ['localhost', '127.0.0.1', '[::1]'].includes(origin.hostname)

    if (
      origin.origin !== config.origin ||
      (origin.protocol !== 'https:' &&
        !(local && origin.protocol === 'http:')) ||
      redis.protocol !== 'https:' ||
      !/^[a-z\d-]+\.upstash\.io$/i.test(redis.hostname) ||
      redis.username ||
      redis.password ||
      redis.port ||
      redis.pathname !== '/' ||
      redis.search ||
      redis.hash
    ) {
      return
    }
  } catch {
    return
  }

  if (
    !validContactEmail(config.from) ||
    !validContactEmail(config.to) ||
    !/^[a-f\d]{64}$/i.test(config.rateLimitSecret) ||
    !/^[\x21-\x7e]{1,256}$/.test(config.apiKey) ||
    !/^[\x21-\x7e]{1,4096}$/.test(config.redisToken) ||
    (config.ipSource !== 'socket' && config.ipSource !== 'vercel') ||
    (config.ipSource === 'vercel' && !onVercel) ||
    (onVercel && config.ipSource !== 'vercel')
  ) {
    return
  }

  return config
}

export async function readContactServiceJson(
  response: Response
): Promise<unknown> {
  const reader = response.body?.getReader()

  if (!reader) {
    throw new Error('Invalid service response')
  }

  const chunks: Uint8Array[] = []
  let bytes = 0

  try {
    while (true) {
      const { done, value } = await reader.read()

      if (done) {
        break
      }

      bytes += value.byteLength

      if (bytes > 16_384) {
        await reader.cancel()

        throw new Error('Invalid service response')
      }

      chunks.push(value)
    }
  } finally {
    reader.releaseLock()
  }

  return JSON.parse(
    new TextDecoder('utf-8', { fatal: true }).decode(
      Buffer.concat(chunks, bytes)
    )
  )
}

export async function deliverEnquiry(
  enquiry: Enquiry,
  config: ContactConfiguration,
  transport: typeof fetch = fetch
) {
  try {
    const response = await transport('https://api.resend.com/emails', {
      method: 'POST',
      redirect: 'error',
      signal: AbortSignal.timeout(8000),
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `rossignolerie/${enquiry.requestId}`,
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: enquiry.email,
        subject: `Demande depuis le site du ${siteName}`,
        text: `Nom : ${enquiry.name}\nTéléphone : ${enquiry.phone}\nE-mail : ${enquiry.email}\n\n${enquiry.message}`,
      }),
    })

    if (!response.ok) {
      await response.body?.cancel()

      if ([401, 403, 429].includes(response.status)) {
        throw new ContactError(503, 'unavailable', {}, 60)
      }

      throw new ContactError(502, 'failure')
    }

    const result = await readContactServiceJson(response)

    if (
      !result ||
      typeof result !== 'object' ||
      !('id' in result) ||
      typeof result.id !== 'string' ||
      !result.id.trim() ||
      result.id.length > 200
    ) {
      throw new ContactError(502, 'failure')
    }

    return { accepted: true as const }
  } catch (error) {
    if (error instanceof ContactError) {
      throw error
    }

    throw new ContactError(502, 'failure')
  }
}
