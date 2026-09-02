import { useEffect, useRef, useState } from 'react'

/**
 * Indica se a seção está perto o bastante do viewport para justificar
 * animações ambiente contínuas — usado para pausar órbitas, pulsos e
 * flutuações quando a seção inteira está bem longe da tela (economiza CPU
 * sem exigir um loop de `requestAnimationFrame`). `rootMargin` generoso
 * evita pausar/retomar de forma perceptível durante o scroll normal.
 */
export function useSectionActive<T extends HTMLElement>(rootMargin = '35% 0px 35% 0px') {
  const ref = useRef<T | null>(null)
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(([entry]) => setIsActive(!!entry?.isIntersecting), { rootMargin })

    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, isActive }
}
