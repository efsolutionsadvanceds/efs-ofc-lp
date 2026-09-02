import type { ElementType, ReactNode } from 'react'
import styled from 'styled-components'

import { useReveal } from '@/hooks/useReveal'

interface RevealProps {
  children: ReactNode
  delayMs?: number
  offsetPx?: number
  as?: ElementType
  className?: string
}

const RevealBox = styled.div<{ $visible: boolean; $offset: number }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible, $offset }) => ($visible ? 0 : $offset)}px);
  transition:
    opacity ${({ theme }) => theme.motion.durationBase} ${({ theme }) => theme.motion.ease},
    transform ${({ theme }) => theme.motion.durationBase} ${({ theme }) => theme.motion.ease};
  will-change: ${({ $visible }) => ($visible ? 'auto' : 'opacity, transform')};
`

/** Revela o conteúdo uma única vez ao entrar no viewport (opacity + translateY). */
export function Reveal({ children, delayMs = 0, offsetPx = 20, as, className }: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>({ delayMs })

  return (
    <RevealBox ref={ref} as={as} $visible={isVisible} $offset={offsetPx} className={className}>
      {children}
    </RevealBox>
  )
}
