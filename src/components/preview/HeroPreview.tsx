import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'

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
 * Troca automática: quando a prévia aparece na tela, uma barra de progresso
 * (animação CSS) percorre a aba ativa e, ao terminar, avança para a próxima —
 * pausa com o ponteiro ou o foco sobre a prévia, para de vez quando o
 * visitante escolhe uma aba e só dá uma volta completa. Com
 * `prefers-reduced-motion`, nada troca sozinho.
 *
 * O painel tem altura fixa: trocar de cena nunca desloca o layout.
 */
export function HeroPreview() {
  const baseId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [active, setActive] = useState(0)
  const [autoplay, setAutoplay] = useState(false)

  useEffect(() => {
    const node = rootRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setAutoplay(true)
        observer.disconnect()
      },
      { threshold: 0.5 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  function choose(index: number) {
    setActive(index)
    setAutoplay(false)
  }

  function advance() {
    const next = (active + 1) % TABS.length
    setActive(next)
    if (next === 0) setAutoplay(false)
  }

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
    choose(target)
  }

  const current = TABS[active] ?? TABS[0]
  const panelId = `${baseId}-painel`

  return (
    <div ref={rootRef} className="preview relative">
      {/* Cartões empilhados atrás, dando profundidade à prévia. */}
      <div aria-hidden="true" className="absolute inset-x-8 -top-3 h-16 rounded-2xl border border-white/10 bg-surface/70" />
      <div aria-hidden="true" className="absolute inset-x-16 -top-6 h-16 rounded-2xl border border-white/[0.06] bg-surface/40" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-[0_32px_80px_-24px_rgb(0_0_0/0.8)]">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-white/15" />
          <span aria-hidden="true" className="size-2.5 rounded-full bg-white/15" />
          <span aria-hidden="true" className="size-2.5 rounded-full bg-white/15" />
          <span className="ml-2 font-mono text-micro text-muted">efsolutions — prévia</span>
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
                onClick={() => choose(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={cx(
                  'relative flex-1 overflow-hidden rounded-lg px-2 py-2 text-micro font-medium whitespace-nowrap',
                  'transition-[color,background-color] duration-200 active:scale-[0.98]',
                  selected ? 'bg-white/[0.08] text-ink' : 'text-muted hover:bg-white/[0.04] hover:text-ink',
                )}
              >
                {tab.label}
                {selected && autoplay ? (
                  <span
                    aria-hidden="true"
                    onAnimationEnd={advance}
                    className="tab-progress absolute inset-x-2 bottom-0.5 h-px bg-accent"
                  />
                ) : null}
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
