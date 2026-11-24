import { robotsContent } from '~/data/seo'
import type { PolicyName } from '~/types/seo'

export function usePolicySeo(page: PolicyName) {
  if (import.meta.server) {
    const event = useRequestEvent()

    if (event) {
      setResponseStatus(event, 503)
      useResponseHeader('X-Robots-Tag').value = robotsContent.blocked
      useResponseHeader('Cache-Control').value = 'no-store'
    }
  }

  return usePageSeo(page)
}
