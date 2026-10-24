import { useEffect, useRef } from 'react'

/**
 * Faz o brilho dos cartões `.spotlight` seguir o ponteiro (ver o CSS em
 * src/styles/app.css). Um único listener delegado no contêiner grava a
 * posição como variáveis CSS (`--mx`/`--my`) direto no cartão — sem estado
 * do React, então mover o mouse não causa nenhum re-render. Só liga em
 * dispositivos com mouse/trackpad; no toque não há hover.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const container = ref.current
    if (!container || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let frame = 0
    let lastEvent: PointerEvent | null = null

    function paint() {
      frame = 0
      const card = (lastEvent?.target as Element | null)?.closest<HTMLElement>('.spotlight')
      if (!lastEvent || !card || !container?.contains(card)) return
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${lastEvent.clientX - rect.left}px`)
      card.style.setProperty('--my', `${lastEvent.clientY - rect.top}px`)
    }

    function handleMove(event: PointerEvent) {
      lastEvent = event
      if (!frame) frame = requestAnimationFrame(paint)
    }

    container.addEventListener('pointermove', handleMove)
    return () => {
      container.removeEventListener('pointermove', handleMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return ref
}
