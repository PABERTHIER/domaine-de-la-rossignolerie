import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export default defineNuxtPlugin({
  name: 'smooth-scroll',
  setup(nuxtApp) {
    const router = useRouter()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let cancelRestoration: (() => void) | undefined

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      syncTouch: false,
      virtualScroll: () => !reducedMotion.matches,
    })

    function cancelScroll() {
      lenis.scrollTo(lenis.actualScroll, { immediate: true, force: true })
    }

    function waitForScrollPosition(top: number): Promise<boolean> {
      cancelRestoration?.()

      if (document.documentElement.scrollHeight - window.innerHeight >= top) {
        return Promise.resolve(true)
      }

      // Wait briefly for asynchronous content to reach the saved history offset
      return new Promise(resolve => {
        let settled = false
        const observer = new ResizeObserver(checkHeight)
        const timeout = setTimeout(() => finish(true), 3000)

        function finish(restore: boolean) {
          if (settled) {
            return
          }

          settled = true
          observer.disconnect()

          clearTimeout(timeout)

          window.removeEventListener('wheel', cancel)
          window.removeEventListener('pointerdown', cancel)
          window.removeEventListener('keydown', cancel)

          cancelRestoration = undefined
          resolve(restore)
        }

        function cancel() {
          finish(false)
        }

        function checkHeight() {
          if (
            document.documentElement.scrollHeight - window.innerHeight >=
            top
          ) {
            finish(true)
          }
        }

        cancelRestoration = cancel

        observer.observe(document.body)

        window.addEventListener('wheel', cancel, { passive: true })
        window.addEventListener('pointerdown', cancel, { passive: true })
        window.addEventListener('keydown', cancel)

        checkHeight()
      })
    }

    const removeNavigationGuard = router.beforeEach(() => {
      cancelRestoration?.()
      cancelScroll()
    })

    reducedMotion.addEventListener('change', cancelScroll)

    nuxtApp.vueApp.onUnmount(() => {
      removeNavigationGuard()
      cancelRestoration?.()
      reducedMotion.removeEventListener('change', cancelScroll)
      lenis.destroy()
    })

    return { provide: { lenis, waitForScrollPosition } }
  },
})
