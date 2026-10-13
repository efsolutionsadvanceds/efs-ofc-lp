import { useEffect, useRef } from 'react'

import { useMediaQuery } from './useMediaQuery'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Expõe a posição do ponteiro como variáveis CSS (`--pointer-x`/`--pointer-y`,
 * em %) direto no elemento, via `ref` — nunca via estado do React, para não
 * causar re-render a cada movimento do mouse. Consuma com
 * `var(--pointer-x, 50%)` num `radial-gradient` ou `background-position`.
 *
 * Só ativa em dispositivos com ponteiro fino (mouse/trackpad) e quando o
 * usuário não pediu movimento reduzido — em touch ou com `prefers-reduced-
 * motion`, a variável simplesmente nunca é definida e o CSS cai no valor
 * padrão (centro, estático).
 */
export function usePointerGlow<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const hasFinePointer = useMediaQuery('(pointer: fine)')

  useEffect(() => {
    const node = ref.current
    if (!node || prefersReducedMotion || !hasFinePointer) return

    let frame: number | null = null

    function handleMove(event: PointerEvent) {
      if (frame !== null) return
      frame = requestAnimationFrame(() => {
        const rect = node!.getBoundingClientRect()
        const x = ((event.clientX - rect.left) / rect.width) * 100
        const y = ((event.clientY - rect.top) / rect.height) * 100
        node!.style.setProperty('--pointer-x', `${x}%`)
        node!.style.setProperty('--pointer-y', `${y}%`)
        frame = null
      })
    }

    node.addEventListener('pointermove', handleMove)
    return () => {
      node.removeEventListener('pointermove', handleMove)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [prefersReducedMotion, hasFinePointer])

  return ref
}
