import type { ReactNode } from 'react'

import { stagger } from '@/lib/stagger'

interface SectionHeaderProps {
  /** id do <h2>, referenciado pelo `aria-labelledby` da seção. */
  id: string
  /** Primeira linha do título, em tinta cheia. */
  title: string
  /** Segunda linha, em cinza — a assinatura tipográfica da referência visual. */
  muted: string
  /** Texto de apoio, alinhado à direita no desktop. */
  lead?: ReactNode
}

/**
 * Cabeçalho de seção em dois tons. O espaço entre as partes mantém o texto
 * do <h2> correto para leitores de tela e buscadores ("título segunda
 * linha"), mesmo com a segunda parte em bloco. Os itens entram com o
 * revelar-ao-rolar da seção (`data-reveal-item`).
 */
export function SectionHeader({ id, title, muted, lead }: SectionHeaderProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-6">
      <h2 id={id} data-reveal-item style={stagger(0)} className="text-title lg:col-span-7">
        {title} <span className="block text-muted">{muted}</span>
      </h2>
      {lead ? (
        <p data-reveal-item style={stagger(1)} className="max-w-[28em] text-lead text-muted lg:col-span-5 lg:col-start-8">
          {lead}
        </p>
      ) : null}
    </div>
  )
}
