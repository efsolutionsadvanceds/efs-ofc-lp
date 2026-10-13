import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface TypewriterProps {
  words: readonly string[]
  className?: string
}

const TYPE_MS = 70
const DELETE_MS = 40
const HOLD_MS = 1400

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

const Cursor = styled.span`
  display: inline-block;
  margin-left: 2px;
  animation: ${blink} 850ms step-end infinite;
`

/** Cicla continuamente entre palavras, digitando e apagando — pausa em uma palavra fixa (sem animação) quando o usuário prefere menos movimento. */
export function Typewriter({ words, className }: TypewriterProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [wordIndex, setWordIndex] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion || words.length === 0) return

    const currentWord = words[wordIndex % words.length] ?? ''
    let timeoutId: ReturnType<typeof setTimeout>

    if (!deleting && charCount < currentWord.length) {
      timeoutId = setTimeout(() => setCharCount((count) => count + 1), TYPE_MS)
    } else if (!deleting && charCount === currentWord.length) {
      timeoutId = setTimeout(() => setDeleting(true), HOLD_MS)
    } else if (deleting && charCount > 0) {
      timeoutId = setTimeout(() => setCharCount((count) => count - 1), DELETE_MS)
    } else {
      setDeleting(false)
      setWordIndex((index) => (index + 1) % words.length)
    }

    return () => clearTimeout(timeoutId)
  }, [charCount, deleting, wordIndex, words, prefersReducedMotion])

  if (prefersReducedMotion) {
    return <span className={className}>{words[0] ?? ''}</span>
  }

  const currentWord = words[wordIndex % words.length] ?? ''

  return (
    <span className={className}>
      {currentWord.slice(0, charCount)}
      <Cursor aria-hidden="true">▋</Cursor>
    </span>
  )
}
