import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface MaskedHeadlineProps {
  text: string
  id?: string
  className?: string
}

const Heading = styled.h1`
  font-family: ${({ theme }) => theme.displayFontStack};
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  color: ${({ theme }) => theme.colors.textOnDark};
`

const WordMask = styled.span`
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
`

const Word = styled.span<{ $revealed: boolean; $delayMs: number }>`
  display: inline-block;
  transform: translateY(${({ $revealed }) => ($revealed ? '0' : '112%')});
  transition: transform 560ms ${({ theme }) => theme.motion.easeReveal};
  transition-delay: ${({ $delayMs }) => $delayMs}ms;
`

/**
 * Título com revelação mascarada palavra a palavra (cada palavra "sobe" para
 * o lugar) — entra assim que a página carrega, não depende de scroll. O
 * texto real permanece intacto como um único <h1> (cada palavra é um <span>
 * inline comum, sem ARIA especial), então leitores de tela leem a frase
 * normalmente. Com `prefers-reduced-motion`, as palavras já nascem visíveis.
 */
export function MaskedHeadline({ text, id, className }: MaskedHeadlineProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [revealed, setRevealed] = useState(prefersReducedMotion)

  useEffect(() => {
    if (prefersReducedMotion) {
      setRevealed(true)
      return
    }
    const timeoutId = setTimeout(() => setRevealed(true), 50)
    return () => clearTimeout(timeoutId)
  }, [prefersReducedMotion])

  const words = text.split(' ')

  return (
    <Heading id={id} className={className}>
      {words.map((word, index) => (
        // eslint-disable-next-line react/no-array-index-key -- lista estática, nunca reordenada.
        <span key={index}>
          <WordMask>
            <Word $revealed={revealed} $delayMs={prefersReducedMotion ? 0 : index * 28}>
              {word}
            </Word>
          </WordMask>
          {index < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Heading>
  )
}
