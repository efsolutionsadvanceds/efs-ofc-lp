import { useId, useRef, useState, type KeyboardEvent } from 'react'

import { cx } from '@/lib/cx'

import { ChatPreview } from './ChatPreview'
import { SearchPreview } from './SearchPreview'
import { TerminalPreview } from './TerminalPreview'

const TABS = [
  { id: 'atendimento', label: 'Atendente IA', Scene: ChatPreview },
  { id: 'sistema', label: 'Sistema', Scene: TerminalPreview },
  { id: 'seo', label: 'Site + SEO', Scene: SearchPreview },
] as const

/**
 * Prévia interativa do hero: três cenas do que a E.F Solutions desenvolve,
 * em abas acessíveis (padrão WAI-ARIA: setas, Home/End, foco itinerante).
 *
 * As abas só mudam quando o visitante escolhe (nada troca sozinho). A cena
 * escolhida se monta em sequência com CSS puro; com
 * `prefers-reduced-motion`, aparece pronta. O painel tem altura fixa:
 * trocar de cena nunca desloca o layout.
 */
export function HeroPreview() {
  const baseId = useId()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [active, setActive] = useState(0)

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = TABS.length - 1
    const target =
      event.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : event.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : null
    if (target === null) return
    event.preventDefault()
    tabRefs.current[target]?.focus()
    setActive(target)
  }

  const current = TABS[active] ?? TABS[0]
  const panelId = `${baseId}-painel`

  return (
    <div className="relative">
      {/* Cartões empilhados atrás, dando profundidade à prévia. */}
      <div aria-hidden="true" className="absolute inset-x-8 -top-3 h-16 rounded-2xl border border-white/10 bg-surface/70" />
      <div aria-hidden="true" className="absolute inset-x-16 -top-6 h-16 rounded-2xl border border-white/[0.06] bg-surface/40" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-[0_32px_80px_-24px_rgb(0_0_0/0.8)]">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-white/15" />
          <span aria-hidden="true" className="size-2.5 rounded-full bg-white/15" />
          <span aria-hidden="true" className="size-2.5 rounded-full bg-white/15" />
          <span className="ml-2 font-mono text-micro text-muted">efsolutions · prévia</span>
        </div>

        <div role="tablist" aria-label="Exemplos do que desenvolvemos" className="flex gap-1 border-b border-white/10 p-1.5">
          {TABS.map((tab, index) => {
            const selected = index === active
            return (
              <button
                key={tab.id}
                ref={(element) => {
                  tabRefs.current[index] = element
                }}
                type="button"
                role="tab"
                id={`${baseId}-${tab.id}`}
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={cx(
                  'relative flex-1 rounded-md px-2 py-2 text-micro font-medium whitespace-nowrap',
                  'transition-[color,background-color,scale] duration-150 ease-out active:scale-[0.97]',
                  // Aba ativa: fundo claro e um traço turquesa de 1px na base.
                  'after:absolute after:inset-x-3 after:bottom-0.5 after:h-px after:bg-accent after:opacity-0 after:transition-opacity',
                  selected
                    ? 'bg-white/[0.08] text-ink after:opacity-100'
                    : 'text-muted hover:bg-white/[0.04] hover:text-ink',
                )}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <div
          key={current.id}
          role="tabpanel"
          id={panelId}
          aria-labelledby={`${baseId}-${current.id}`}
          className="h-[27rem] overflow-hidden p-4 sm:h-[23rem] sm:p-5"
        >
          <current.Scene />
        </div>

        <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5 font-mono text-micro text-muted">
          <span>Exemplo ilustrativo</span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            feito sob medida
          </span>
        </div>
      </div>
    </div>
  )
}
