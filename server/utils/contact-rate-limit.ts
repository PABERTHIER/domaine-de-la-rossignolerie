import { createHmac } from 'node:crypto'
import { ContactError, readContactServiceJson } from './contact'
import type { ContactConfiguration } from './contact'

// All checks and increments run together on shared storage, across instances
// Matching hash tags keep the keys together on Redis cluster deployments
const rateLimitScript = `
local retry = 0
for i, key in ipairs(KEYS) do
  local limit = tonumber(ARGV[i * 2 - 1])
  if tonumber(redis.call('GET', key) or '0') >= limit then
    retry = math.max(retry, redis.call('PTTL', key), 1)
  end
end
if retry > 0 then
  return {0, math.ceil(retry / 1000)}
end
for i, key in ipairs(KEYS) do
  if redis.call('INCR', key) == 1 then
    redis.call('PEXPIRE', key, ARGV[i * 2])
  end
end
return {1, 0}
`

export async function limitContactRequest(
  ip: string,
  config: ContactConfiguration,
  transport: typeof fetch = fetch
) {
  const hash = (value: string) =>
    createHmac('sha256', config.rateLimitSecret).update(value).digest('hex')

  const scope = `{contact:${hash(config.origin)}}`
  const keys = [`${scope}:hour`, `${scope}:day`, `${scope}:ip:${hash(ip)}`]

  try {
    const response = await transport(config.redisUrl, {
      method: 'POST',
      redirect: 'error',
      signal: AbortSignal.timeout(3000),
      headers: {
        Authorization: `Bearer ${config.redisToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        'EVAL',
        rateLimitScript,
        keys.length,
        ...keys,
        30,
        60 * 60_000,
        100,
        24 * 60 * 60_000,
        5,
        15 * 60_000,
      ]),
    })

    if (!response.ok) {
      await response.body?.cancel()

      throw new ContactError(503, 'unavailable', {}, 60)
    }

    const data = await readContactServiceJson(response)

    const result =
      data && typeof data === 'object' && !('error' in data) && 'result' in data
        ? data.result
        : undefined

    if (
      !Array.isArray(result) ||
      result.length !== 2 ||
      ![0, 1].includes(result[0]) ||
      !Number.isSafeInteger(result[1]) ||
      result[1] < 0 ||
      result[1] > 86_400 ||
      (result[0] === 0 && result[1] === 0) ||
      (result[0] === 1 && result[1] !== 0)
    ) {
      throw new ContactError(503, 'unavailable', {}, 60)
    }

    if (result[0] === 0) {
      throw new ContactError(429, 'rate', {}, result[1])
    }
  } catch (error) {
    if (error instanceof ContactError) {
      throw error
    }

    throw new ContactError(503, 'unavailable', {}, 60)
  }
}
