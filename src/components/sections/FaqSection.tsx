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
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
        <h2 id="duvidas-titulo" data-reveal-item style={stagger(0)} className="max-w-[8em] text-title lg:col-span-4 lg:self-start">
          Dúvidas frequentes
        </h2>

        <div className="flex flex-col gap-3 lg:col-span-8">
          {FAQ_ITEMS.map((item, index) => (
            <details
              key={item.question}
              name="duvidas"
              data-reveal-item
              style={stagger(index + 1)}
              className="group rounded-3xl bg-surface"
            >
              <summary
                className={cx(
                  'relative isolate flex items-start justify-between gap-6 rounded-3xl p-6 text-lead font-medium sm:p-7',
                  'before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-ink before:opacity-0 before:transition-opacity before:duration-300',
                  'hover:before:opacity-[0.04] active:opacity-80',
                )}
              >
                {item.question}
                <Plus
                  aria-hidden="true"
                  className="mt-0.5 size-6 shrink-0 transition-transform duration-500 ease-out-expo group-open:rotate-45"
                />
              </summary>
              <div data-answer className="max-w-[41em] px-6 pb-7 text-body sm:px-7">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
