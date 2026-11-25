# Contact Processing And Setup

The contact API sends an enquiry to one configured recipient through Resend.
Shared Upstash Redis counters limit requests across server instances.
Both services use Node's native `fetch`; no mail or Redis SDK is required.
Delivery is disabled by default and needs all the private configuration below.
This API requires an SSR server; static hosting alone cannot process enquiries.
The Nitro Vercel configuration sets a 30-second function duration so the three-second Redis, five-second body-reading and eight-second mail deadlines can complete.
See [Vercel function duration](https://vercel.com/docs/functions/configuring-functions/duration) for platform limits.

## Configure The Services

1. Create a Resend account and add a sending domain or subdomain whose DNS you control.
   Follow [Resend's domain verification instructions](https://resend.com/docs/dashboard/domains/introduction).
   A Gmail address can be the recipient, but cannot be your verified sending domain.
   The site's `vercel.app` hostname does not supply a sending domain you control.
   Choose a sender mailbox on the verified domain and create a sending-only API key restricted to that domain.
2. Create an Upstash Redis database, preferably near the deployment region.
   Copy its HTTPS REST URL and writable REST token from the connection details, as described in the [REST API documentation](https://upstash.com/docs/redis/features/restapi).
   A read-only token cannot run the limiter's `EVAL` command.
   Use a dedicated database and separate credentials for any isolated preview testing.
3. Generate a private random secret locally:

   ```sh
   node -e "process.stdout.write(require('node:crypto').randomBytes(32).toString('hex'))"
   ```

   Keep this value stable across instances and deployments in the same environment.
   Changing it resets the application's rate-limit namespace.

4. Add the variables below to the intended environment in the Vercel project's environment settings.
   Keep `NUXT_CONTACT_ENABLED=false` while configuring services.
   Never expose credentials through `NUXT_PUBLIC_*`, browser code, screenshots or committed files.
   Keep delivery disabled in ordinary development and preview environments.
5. Redeploy after changing Vercel environment variables.
   Confirm the exact serving origin and environment, then enable delivery deliberately with `NUXT_CONTACT_ENABLED=true` and redeploy.
   Configuration readiness does not verify credentials, DNS, quotas, service health or inbox delivery.
   A controlled delivery check needs a deliberately chosen test recipient and explicit authorization; routine verification uses mocks.

The supplied estate contact destination remains in [site data](../../app/data/site.ts).
Choose the recipient explicitly; the server does not fill it automatically.
Sender and recipient settings accept one plain mailbox each, without display names or comma-separated lists.
Mailbox validation supports ordinary ASCII addresses, including plus addressing, with a dotted DNS domain.

## Private Runtime Configuration

All settings belong to `runtimeConfig.contact` in [nuxt.config.ts](../../nuxt.config.ts).
Nuxt applies the corresponding server-side environment overrides as described in [runtime configuration](https://nuxt.com/docs/4.x/guide/going-further/runtime-config).
There is no new public origin setting or browser-visible provider configuration.

| Environment variable             | Default                   | Value when enabling delivery                                           |
| -------------------------------- | ------------------------- | ---------------------------------------------------------------------- |
| `NUXT_CONTACT_ENABLED`           | `false`                   | Exactly `true`                                                         |
| `NUXT_CONTACT_ORIGIN`            | Environment's site origin | Exact origin with scheme/port, without a path or trailing slash        |
| `NUXT_CONTACT_API_KEY`           | Empty                     | Resend sending API key                                                 |
| `NUXT_CONTACT_FROM`              | Empty                     | Mailbox on your verified sending domain                                |
| `NUXT_CONTACT_TO`                | Empty                     | Deliberately chosen recipient mailbox                                  |
| `NUXT_CONTACT_IP_SOURCE`         | `vercel`                  | `vercel` on Vercel, or `socket` for a directly exposed Node server     |
| `NUXT_CONTACT_RATE_LIMIT_SECRET` | Empty                     | The 64 hexadecimal characters generated above                          |
| `NUXT_CONTACT_REDIS_URL`         | Empty                     | Root HTTPS REST URL ending in `.upstash.io`, without credentials/query |
| `NUXT_CONTACT_REDIS_TOKEN`       | Empty                     | Writable Upstash REST token                                            |

Production/preview origins follow the existing site-origin selection at build time.
`NUXT_CONTACT_ORIGIN` overrides the private contact origin without changing SEO ownership.
Use the actual origin serving the form; aliases should redirect there before rendering it.
Never derive trust from incoming `Host`, `Forwarded` or `X-Forwarded-Host` headers.
HTTPS is required except for explicit loopback origins used locally.
For isolated local verification, select `socket` and an exact loopback origin such as `http://127.0.0.1:3000`.
A built Node server does not automatically load `.env`; supply its runtime environment through the launcher.
No environment file or credentials are supplied by the repository.

## Availability And Submission Contract

`GET /api/contact/status` returns HTTP 200 with `{ "available": false, "delivery": "disabled" }` or `{ "available": true, "delivery": "unverified" }`.
Availability means the settings and deployment mode permit a submission attempt.
This endpoint makes no external requests and never reports provider health or inbox delivery.
Revoked credentials, outages and exhausted quotas can still cause submission failure.
The form must handle status-request failure and submission errors independently.

`POST /api/contact` requires the exact configured `Origin` and `Content-Type: application/json`, optionally with `charset=utf-8`.
Missing/different origins and contradictory `Sec-Fetch-Site` values are rejected.
Compressed bodies are unsupported.
The body must be a JSON object with these fields and no unknown keys:

| Field       | Required | Maximum UTF-16 code units | Contract                                       |
| ----------- | -------- | ------------------------- | ---------------------------------------------- |
| `email`     | Yes      | 254                       | Valid plain reply mailbox                      |
| `name`      | No       | 120                       | Text                                           |
| `phone`     | No       | 60                        | Text; no invented telephone-format requirement |
| `message`   | Yes      | 5000                      | Nonempty text; tabs and line breaks allowed    |
| `website`   | No       | 200                       | Honeypot; empty after trimming                 |
| `requestId` | Yes      | 36                        | UUID v4 generated for this enquiry             |

Optional fields may be omitted; supplied values must be strings.
Lengths are checked before trimming.
Control characters are rejected, with the documented message whitespace exception.
Text is trimmed and line endings normalized to LF.
Email and a nonempty message are required; name and telephone remain optional.

The entire UTF-8 body is limited to 24,000 bytes independently of its declared length.
Streamed/chunked bodies are counted while reading; incomplete bodies time out after five seconds of body reading.
A hosting platform may buffer or reject requests before the handler; the application cannot prevent upstream buffering.
The Node adapter also checks already supplied raw buffers/strings and rejects pre-parsed objects.

HTTP 200 with `{ "accepted": true }` is returned only after Resend returns a successful response containing a nonempty email ID.
This confirms provider acceptance, without promising inbox arrival or a reservation.
Handled failures use `{ "accepted": false, "error": { "code": "…", "fields": {} } }`.
HTTP 422 field errors use `required_error`, `length_error`, `characters_error` or `email_error` under `error.fields`.
Transport errors and upstream response bodies are never returned to visitors.

| HTTP status | Error code    | Meaning                                                             |
| ----------- | ------------- | ------------------------------------------------------------------- |
| 400         | `invalid`     | Malformed JSON/UTF-8, unreadable body or unsupported raw body       |
| 403         | `failure`     | Origin or fetch-site rejected                                       |
| 408         | `invalid`     | Body-reading deadline exceeded                                      |
| 413         | `invalid`     | Declared or actual body exceeds the byte limit                      |
| 415         | `invalid`     | Unsupported media type, charset or encoding                         |
| 422         | `invalid`     | Invalid fields, unknown keys, honeypot or request identity          |
| 429         | `rate`        | Shared allowance exhausted                                          |
| 502         | `failure`     | Mail rejection, ambiguous timeout/network failure or invalid reply  |
| 503         | `unavailable` | Disabled/incomplete configuration, IP failure or protection failure |

Resend authentication failures and throttling return 503 with a 60-second `Retry-After`.
Redis failures return 503 with a 60-second `Retry-After`; no mail request follows.
Rate responses supply the remaining blocking interval in `Retry-After` seconds.
Both endpoints use `Cache-Control: no-store`, `X-Robots-Tag: noindex, nofollow` and `X-Content-Type-Options: nosniff`.
They add no CORS allowance or cookies.

## Shared Abuse Protection And Retries

One Redis Lua command atomically checks/increments three fixed-window counters: five admitted attempts per IP per 15 minutes, 30 per origin per hour and 100 per origin per 24 hours.
Windows begin with their first admitted request, independently of calendar periods.
Rejected origin/media/declared-size requests do not reach Redis.
After admission, malformed bodies, validation failures, duplicate retries and unsuccessful mail attempts consume allowance.
These conservative limits also bound send volume from many IP addresses.
They do not replace hosting-layer request limits or DDoS protection, and infrastructure failover does not guarantee strict accounting.
Review traffic and account quotas before changing [the limiter](../../server/utils/contact-rate-limit.ts).

All instances must use the same database, trusted origin and secret.
There is no in-process fallback limiter.
Keys contain HMAC-SHA-256 digests of the origin/IP; values contain counts only.
IP keys expire after 15 minutes; aggregate keys expire after one and 24 hours respectively.
No email address, enquiry body or UUID is stored in these counters.

Vercel mode requires server environment `VERCEL=1` and uses only `x-vercel-forwarded-for`, documented in [Vercel request headers](https://vercel.com/docs/headers/request-headers).
Missing/malformed addresses stop submission; arbitrary forwarding headers are never a fallback.
Socket mode ignores every forwarding header and uses the direct connection address.
Do not select socket mode behind a proxy; other hosting/proxy topologies need an explicitly reviewed trust adapter.
Equivalent IPv6 spellings are normalized before hashing.

Resend receives `Idempotency-Key: rossignolerie/<requestId>` with normalized UUID casing.
[Resend retains idempotency keys for 24 hours](https://resend.com/docs/dashboard/emails/idempotency-keys), protecting concurrent/repeated requests across instances.
The application makes one mail attempt and never retries automatically.
A timeout can occur after acceptance; preserve the same UUID and unchanged input for a prompt manual retry.
Changing payload under a used UUID can be rejected by Resend.
Generate a new UUID after an input edit or confirmed success, and never automatically retry old enquiries after the provider's 24-hour window.
Resend remains the duplicate-send authority; there is no permanent application submission ledger.

## Data And Policy Boundaries

Mail requests contain the fixed sender/recipient, estate subject, visitor reply address, name, phone and message as plain text.
Visitor input never becomes the sender, recipient, subject or HTML markup.
The UUID is provider idempotency metadata; the honeypot is omitted from mail.
Redis receives only the counter keys/counts described above.
The application adds no enquiry log, database, analytics, tracking cookie or automatic acknowledgement email.
Enquiry content exists in request memory during processing and is transmitted to Resend when enabled.

Provider storage, infrastructure logs, selected regions, contractual safeguards, mailbox access and estate retention/deletion practices need confirmation for the privacy page.
Counter expiry does not establish provider log or backup retention.
Accounts, DNS, credentials, approved policy text, deployment and live delivery checks remain operator configuration/publication responsibilities.
Keep telephone/email alternatives available when the form is unavailable.
