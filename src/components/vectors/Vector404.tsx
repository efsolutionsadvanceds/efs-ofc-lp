import { useId } from 'react'

import { anim, VectorScene } from './VectorScene'

/** Dígitos em matriz 5 × 7 (o zero cortado, como em fontes de terminal). */
const GLYPHS: Record<'4' | '0', readonly string[]> = {
  '4': ['...#.', '..##.', '.#.#.', '#..#.', '#####', '...#.', '...#.'],
  '0': ['.###.', '#...#', '#..##', '#.#.#', '##..#', '#...#', '.###.'],
}

const STEP = 14
const COLUMNS = 19

/** Pontos acesos de "404": três dígitos com 2 colunas de espaço entre eles. */
const DOTS = (['4', '0', '4'] as const).flatMap((digit, index) =>
  GLYPHS[digit].flatMap((row, y) =>
    [...row].flatMap((cell, x) => (cell === '#' ? [{ col: index * 7 + x, row: y }] : [])),
  ),
)

/**
 * "404" em matriz de pontos sobre uma grade apagada. A página carrega com o
 * desenho pronto; o hover (ou o foco) remonta os pontos numa onda diagonal,
 * uma vez, em pouco mais de 1s.
 */
export function Vector404() {
  const patternId = useId()

  return (
    <VectorScene duration={1.4} replayOn=".vector-404" className="vector-404 w-full max-w-[28rem]">
      <svg viewBox={`0 0 ${COLUMNS * STEP} ${7 * STEP}`} className="h-auto w-full">
        <defs>
          <pattern id={patternId} width={STEP} height={STEP} patternUnits="userSpaceOnUse">
            <circle cx={STEP / 2} cy={STEP / 2} r="1.5" className="fill-white/10" />
          </pattern>
        </defs>
        <rect width={COLUMNS * STEP} height={7 * STEP} fill={`url(#${patternId})`} />
        {DOTS.map(({ col, row }) => (
          <circle
            key={`${col}-${row}`}
            cx={STEP / 2 + col * STEP}
            cy={STEP / 2 + row * STEP}
            r="4"
            className="v-anim v-in fill-accent"
            style={anim({ d: 0.1 + (col + row) * 0.035, t: 0.4, from: 'scale(0.4)' })}
          />
        ))}
      </svg>
    </VectorScene>
  )
}
