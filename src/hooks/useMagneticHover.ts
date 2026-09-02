import { useEffect, useRef } from 'react'

import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Aplica um leve "efeito magnético" (o elemento acompanha o cursor por uma
 * fração da distância) a um wrapper — usado apenas nos CTAs principais, não
 * no componente `Button` base. Não usa `requestAnimationFrame`: reage a
 * `mousemove` e escreve diretamente em `style.transform` via ref (sem
 * setState/rerender). Ignorado em touch (`pointer: coarse`) e em
 * `prefers-reduced-motion`.
 */
export function useMagneticHover<T extends HTMLElement>(strength = 14) {
  const ref = useRef<T | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || prefersReducedMotion) return
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return

    function handleMove(event: MouseEvent) {
      const rect = node!.getBoundingClientRect()
      const x = ((event.clientX - rect.left - rect.width / 2) / rect.width) * strength
      const y = ((event.clientY - rect.top - rect.height / 2) / rect.height) * strength
      node!.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`
    }

    function handleLeave() {
      node!.style.transform = ''
    }

    node.addEventListener('mousemove', handleMove)
    node.addEventListener('mouseleave', handleLeave)

    return () => {
      node.removeEventListener('mousemove', handleMove)
      node.removeEventListener('mouseleave', handleLeave)
      node.style.transform = ''
    }
  }, [prefersReducedMotion, strength])

  return ref
}
