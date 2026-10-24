import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Ao trocar de página pelo roteador, começa a nova página no topo. O
 * primeiro carregamento fica por conta do navegador (inclusive âncoras como
 * /#duvidas, já presentes no HTML pré-renderizado), e links de âncora na
 * mesma página usam a rolagem nativa (`scroll-behavior: smooth` no CSS).
 */
export function useScrollToTopOnNavigate(): void {
  const { pathname } = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
}
