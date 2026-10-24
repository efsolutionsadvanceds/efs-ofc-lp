import type { CSSProperties } from 'react'

/**
 * Posição de um item numa sequência animada — vira a variável CSS `--i`,
 * que as utilidades `rise` e `[data-reveal-item]` multiplicam pelo atraso
 * base (ver src/styles/app.css).
 */
export function stagger(index: number): CSSProperties {
  return { '--i': index } as CSSProperties
}
