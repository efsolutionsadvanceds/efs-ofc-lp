import type { ReactNode } from 'react'
import styled from 'styled-components'

import { useMagneticHover } from '@/hooks/useMagneticHover'

const Wrapper = styled.span`
  display: inline-flex;
  transition: transform 220ms ease-out;
  will-change: transform;
`

interface MagneticButtonProps {
  children: ReactNode
  strength?: number
  className?: string
}

/** Envolve um CTA principal com um leve acompanhamento do cursor — reservado a 1-2 CTAs por página. */
export function MagneticButton({ children, strength, className }: MagneticButtonProps) {
  const ref = useMagneticHover<HTMLSpanElement>(strength)
  return (
    <Wrapper ref={ref} className={className}>
      {children}
    </Wrapper>
  )
}
