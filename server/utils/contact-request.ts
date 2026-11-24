import { isIP } from 'node:net'
import { getRequestHeader, setResponseHeader, setResponseStatus } from 'h3'
import type { H3Event } from 'h3'
import { ContactError } from './contact'
import type { ContactConfiguration } from './contact'

const maxBodyBytes = 24_000
const bodyTimeoutMs = 5000

export function contactResponseHeaders(event: H3Event) {
  setResponseHeader(event, 'Cache-Control', 'no-store')
  setResponseHeader(event, 'X-Robots-Tag', 'noindex, nofollow')
  setResponseHeader(event, 'X-Content-Type-Options', 'nosniff')
}

export function checkContactRequest(event: H3Event, origin: string) {
  const fetchSite = getRequestHeader(event, 'sec-fetch-site')

  if (
    getRequestHeader(event, 'origin') !== origin ||
    (fetchSite && !['same-origin', 'none'].includes(fetchSite))
  ) {
    throw new ContactError(403, 'failure')
  }

  if (
    !/^application\/json(?:\s*;\s*charset\s*=\s*(?:utf-8|"utf-8"))?$/i.test(
      getRequestHeader(event, 'content-type') || ''
    ) ||
    !['identity', undefined].includes(
      getRequestHeader(event, 'content-encoding')
    )
  ) {
    throw new ContactError(415, 'invalid')
  }

  const length = getRequestHeader(event, 'content-length')

  if (length && (!/^\d+$/.test(length) || Number(length) > maxBodyBytes)) {
    throw new ContactError(413, 'invalid')
  }
}

export function contactClientIp(event: H3Event, config: ContactConfiguration) {
  // Forwarding headers are trusted only in explicitly selected Vercel mode
  const ip =
    config.ipSource === 'vercel'
      ? getRequestHeader(event, 'x-vercel-forwarded-for')
      : event.node.req.socket.remoteAddress

  if (!ip || !isIP(ip)) {
    throw new ContactError(503, 'unavailable')
  }

  return isIP(ip) === 6 ? new URL(`http://[${ip}]/`).hostname : ip
}

export async function readContactBody(event: H3Event): Promise<unknown> {
  const request = event.node.req

  const buffered = request as typeof request & {
    rawBody?: unknown
    body?: unknown
  }

  const provided = buffered.rawBody ?? buffered.body
  let body: Buffer

  // Some Node adapters provide the raw body before invoking Nitro
  if (provided !== undefined) {
    if (!Buffer.isBuffer(provided) && typeof provided !== 'string') {
      throw new ContactError(400, 'invalid')
    }

    body = Buffer.isBuffer(provided) ? provided : Buffer.from(provided)

    if (body.length > maxBodyBytes) {
      throw new ContactError(413, 'invalid')
    }
  } else {
    body = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = []
      let bytes = 0
      let settled = false

      const finish = (error?: ContactError) => {
        if (settled) {
          return
        }

        settled = true

        clearTimeout(timer)

        request.off('data', onData)
        request.off('end', onEnd)

        if (error) {
          request.resume()
          reject(error)
        } else {
          resolve(Buffer.concat(chunks, bytes))
        }
      }

      const onData = (part: Buffer | string) => {
        const chunk = Buffer.isBuffer(part) ? part : Buffer.from(part)

        bytes += chunk.length

        if (bytes > maxBodyBytes) {
          finish(new ContactError(413, 'invalid'))

          return
        }

        chunks.push(chunk)
      }

      const onEnd = () => finish()
      const onError = () => finish(new ContactError(400, 'invalid'))

      const timer = setTimeout(
        () => finish(new ContactError(408, 'invalid')),
        bodyTimeoutMs
      )

      request.on('data', onData)
      request.once('end', onEnd)
      request.once('error', onError)

      request.once('close', () => {
        finish(new ContactError(400, 'invalid'))
        request.off('error', onError)
      })

      if (request.readableEnded || request.destroyed) {
        finish(new ContactError(400, 'invalid'))
      }
    })
  }

  try {
    return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(body))
  } catch {
    throw new ContactError(400, 'invalid')
  }
}

export function contactFailure(event: H3Event, error: unknown) {
  const failure =
    error instanceof ContactError ? error : new ContactError(503, 'unavailable')

  setResponseStatus(event, failure.statusCode)

  if (failure.retryAfter) {
    setResponseHeader(event, 'Retry-After', failure.retryAfter)
  }

  // Close rejected HTTP/1 requests after responding, including incomplete bodies
  if (event.node.req.httpVersionMajor === 1) {
    setResponseHeader(event, 'Connection', 'close')
  }

  event.node.req.resume()

  return {
    accepted: false as const,
    error: { code: failure.code, fields: failure.fields },
  }
}
