import type { CSSProperties } from 'react'

/**
 * Posição de um item numa sequência animada — vira a variável CSS `--i`,
 * que as utilidades `rise` e `[data-reveal-item]` multiplicam pelo atraso
 * base (ver src/styles/app.css).
 */
export function stagger(index: number): CSSProperties {
  return { '--i': index } as CSSProperties
}

/**
 * Momento de um elemento numa cena da prévia do hero — vira `--step`, usado
 * pelas classes `.seq`, `.seq-text` e `.seq-typing` (passos de 0,75s).
 */
export function sequenceStep(step: number): CSSProperties {
  return { '--step': step } as CSSProperties
}
