import { useEffect, useRef, useState } from 'react'

import { usePrefersReducedMotion } from './usePrefersReducedMotion'

interface UseRevealOptions {
  /** Fração visível necessária para disparar a revelação. */
  threshold?: number
  /** Atraso adicional em ms (usado para escalonar cartões/listas). */
  delayMs?: number
}

/**
 * Revela um elemento uma única vez quando ele entra no viewport, via
 * IntersectionObserver. Com `prefers-reduced-motion`, o conteúdo já nasce
 * visível — nenhuma funcionalidade depende do estado de animação.
 */
export function useReveal<T extends HTMLElement>({
  threshold = 0.2,
  delayMs = 0,
}: UseRevealOptions = {}) {
  const ref = useRef<T | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [isVisible, setIsVisible] = useState(prefersReducedMotion)

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const node = ref.current
    if (!node) return

    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          timeoutId = setTimeout(() => setIsVisible(true), delayMs)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [threshold, delayMs, prefersReducedMotion])

  return { ref, isVisible }
}
