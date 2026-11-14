import type { ReactNode } from 'react'

import { VectorScene } from './VectorScene'

interface VectorPanelProps {
  /** Duração total da cena, em segundos. */
  duration: number
  /** Elementos do desenho, em coordenadas de 280 × 144. */
  children: ReactNode
}

/**
 * Moldura das ilustrações dos cartões de serviço: altura fixa (CLS zero),
 * grade fina ao fundo e o SVG em 280 × 144. Em 1:1 no desktop e na maioria
 * dos celulares, então as linhas de 1px ficam nítidas. O hover do cartão
 * recomeça a cena.
 */
export function VectorPanel({ duration, children }: VectorPanelProps) {
  return (
    <VectorScene
      duration={duration}
      replayOn="article"
      className="mt-6 h-36 overflow-hidden rounded-lg border border-white/10 bg-ground"
    >
      <div className="bg-grid absolute inset-0 [--grid-size:16px] [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" />
      <svg
        viewBox="0 0 280 144"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute top-1/2 left-0 h-36 w-full -translate-y-1/2"
      >
        {children}
      </svg>
    </VectorScene>
  )
}
