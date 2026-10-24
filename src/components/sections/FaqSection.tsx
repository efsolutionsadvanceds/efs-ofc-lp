import { Plus } from 'lucide-react'

import { SECTION_IDS } from '@/config/sections'
import { FAQ_ITEMS } from '@/content/faq'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { cx } from '@/lib/cx'
import { stagger } from '@/lib/stagger'

/**
 * Acordeão com <details>/<summary> nativos: acessível, funciona sem
 * JavaScript e todo o texto já está no HTML (os buscadores leem as
 * respostas). `name` agrupa os itens — abrir um fecha o anterior. O mesmo
 * conteúdo alimenta o schema FAQPage (src/config/pages.ts).
 */
export function FaqSection() {
  const { ref, revealState } = useRevealOnScroll<HTMLElement>()

  return (
    <section
      ref={ref}
      data-reveal={revealState}
      id={SECTION_IDS.faq}
      aria-labelledby="duvidas-titulo"
      className="frame section-space"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="duvidas-titulo" data-reveal-item style={stagger(0)} className="text-title">
              Perguntas <span className="block text-muted">frequentes.</span>
            </h2>
            <p data-reveal-item style={stagger(1)} className="mt-6 max-w-[22em] text-body text-muted">
              Preço, prazo e como funciona cada solução — respondido sem rodeios.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:col-span-8">
          {FAQ_ITEMS.map((item, index) => (
            <details
              key={item.question}
              name="duvidas"
              data-reveal-item
              style={stagger(index + 1)}
              className="group rounded-2xl border border-white/10 bg-surface transition-colors duration-300 open:border-white/20 hover:border-white/20"
            >
              <summary
                className={cx(
                  'flex items-start justify-between gap-6 rounded-2xl p-6 text-lead font-medium sm:p-7',
                  'transition-opacity duration-200 active:opacity-80',
                )}
              >
                {item.question}
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-white/10 transition-colors duration-300 group-open:border-accent/40 group-open:text-accent"
                >
                  <Plus className="size-4 transition-transform duration-500 ease-out-expo group-open:rotate-45" />
                </span>
              </summary>
              <div data-answer className="max-w-[41em] px-6 pb-7 text-body text-muted sm:px-7">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
