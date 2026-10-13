import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const LINES = [
  '$ ef_solutions --init',
  '> carregando sites...        [ok]',
  '> carregando sistemas...     [ok]',
  '> carregando automações...   [ok]',
  '> pronto.',
]

const LINE_INTERVAL_MS = 220
const HOLD_MS = 350
const FADE_MS = 400
const SESSION_KEY = 'ef-boot-shown'

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

const Overlay = styled.div<{ $fading: boolean }>`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.skipLink + 10};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.black};
  opacity: ${({ $fading }) => ($fading ? 0 : 1)};
  transition: opacity ${FADE_MS}ms ease;
  pointer-events: ${({ $fading }) => ($fading ? 'none' : 'auto')};
`

const Panel = styled.div`
  width: min(420px, 86vw);
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.accent};
  line-height: 1.8;
`

const Cursor = styled.span`
  display: inline-block;
  animation: ${blink} 900ms step-end infinite;
`

/**
 * Sequência de "boot" exibida uma única vez por sessão de navegador
 * (sessionStorage) — não bloqueia o carregamento real da página (o conteúdo
 * já está no DOM por baixo), é só uma sobreposição curta e decorativa.
 * Pulada inteiramente com `prefers-reduced-motion`.
 */
export function BootScreen() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [visible, setVisible] = useState(false)
  const [fading, setFading] = useState(false)
  const [lineCount, setLineCount] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) return
    if (typeof window === 'undefined') return
    if (window.sessionStorage.getItem(SESSION_KEY)) return

    window.sessionStorage.setItem(SESSION_KEY, '1')
    setVisible(true)
  }, [prefersReducedMotion])

  useEffect(() => {
    if (!visible) return

    const revealTimer = setInterval(() => {
      setLineCount((count) => Math.min(count + 1, LINES.length))
    }, LINE_INTERVAL_MS)

    return () => clearInterval(revealTimer)
  }, [visible])

  useEffect(() => {
    if (!visible || lineCount < LINES.length) return

    const holdTimer = setTimeout(() => setFading(true), HOLD_MS)
    const removeTimer = setTimeout(() => setVisible(false), HOLD_MS + FADE_MS)

    return () => {
      clearTimeout(holdTimer)
      clearTimeout(removeTimer)
    }
  }, [visible, lineCount])

  if (!visible) return null

  return (
    <Overlay $fading={fading} aria-hidden="true">
      <Panel>
        {LINES.slice(0, lineCount).map((line, index) => (
          <div key={line}>
            {line}
            {index === lineCount - 1 ? <Cursor>▋</Cursor> : null}
          </div>
        ))}
      </Panel>
    </Overlay>
  )
}
