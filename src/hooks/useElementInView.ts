import { useEffect, useState } from 'react'

/**
 * Observa se o elemento com o `id` informado está na tela. `initial` é o
 * valor usado no pré-render e até o primeiro retorno do observer.
 */
export function useElementInView(id: string, initial: boolean): boolean {
  const [inView, setInView] = useState(initial)

  useEffect(() => {
    const element = document.getElementById(id)
    if (!element || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting ?? false))
    observer.observe(element)
    return () => observer.disconnect()
  }, [id])

  return inView
}
