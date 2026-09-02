import { useEffect, useState } from 'react'

/** Verdadeiro após a rolagem ultrapassar `thresholdPx`, atualizado via rAF. */
export function useScrolled(thresholdPx = 24): boolean {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let ticking = false

    function handleScroll() {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > thresholdPx)
        ticking = false
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [thresholdPx])

  return isScrolled
}
