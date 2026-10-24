import { useEffect, useRef, useState } from 'react'

export type RevealState = 'pending' | 'done'

/**
 * Entrada das seções ao rolar: o grupo recebe `data-reveal` e seus filhos
 * marcados com `data-reveal-item` sobem com opacidade, escalonados pela
 * variável `--i` (CSS em src/styles/app.css). Só transform e opacity.
 *
 * O HTML pré-renderizado nasce visível: o grupo só é escondido depois da
 * hidratação, e apenas se ainda estiver abaixo da dobra. Assim, sem
 * JavaScript (ou se ele falhar) nada fica invisível, o que já está na tela
 * não pisca e o LCP não depende do bundle.
 */
export function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [state, setState] = useState<RevealState | undefined>(undefined)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) return

    setState('pending')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setState('done')
        observer.disconnect()
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, revealState: state }
}
