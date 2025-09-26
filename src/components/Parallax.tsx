import { useEffect } from 'react'

export function useParallax(): void {
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      document.querySelectorAll<HTMLElement>('[data-parallax]')
        .forEach(el => {
          const speed = Number(el.dataset.speed || '0.15')
          const sx = Number(el.dataset.sx || '0')
          const sy = Number(el.dataset.sy || '1')
          const tx = (y * speed) * sx
          const ty = (y * speed) * sy
          el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
        })
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReduced) {
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    // Reveal on scroll
    const toReveal = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      })
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 })
    toReveal.forEach(el => io.observe(el))

    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])
}


