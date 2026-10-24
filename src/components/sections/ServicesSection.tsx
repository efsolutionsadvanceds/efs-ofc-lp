import { ArrowRight, ArrowUpRight } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SECTION_IDS } from '@/config/sections'
import { SERVICES } from '@/content/services'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { useSpotlight } from '@/hooks/useSpotlight'
import { cx } from '@/lib/cx'
import { stagger } from '@/lib/stagger'

/** Larguras alternadas no desktop (7/5, 5/7): um mosaico em vez de uma grade uniforme. */
const SPANS = ['md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7']

/**
 * Os quatro serviços, com os termos de busca principais nos <h3>. O cartão
 * inteiro leva ao orçamento (link esticado sobre o cartão) e ganha uma
 * borda luminosa que segue o ponteiro.
 */
export function ServicesSection() {
  const { ref, revealState } = useRevealOnScroll<HTMLElement>()
  const gridRef = useSpotlight<HTMLUListElement>()

  return (
    <section
      ref={ref}
      data-reveal={revealState}
      id={SECTION_IDS.services}
      aria-labelledby="servicos-titulo"
      className="frame section-space"
    >
      <SectionHeader
        id="servicos-titulo"
        title="Sites, sistemas e IA"
        muted="para empresas que querem crescer."
        lead="Contrate uma solução ou combine várias — tudo pensado para gerar clientes e tirar trabalho manual da sua rotina."
      />

      <ul ref={gridRef} className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-12">
        {SERVICES.map((service, index) => (
          <li key={service.id} data-reveal-item style={stagger(index + 2)} className={SPANS[index]}>
            <article
              className={cx(
                'spotlight group/card flex h-full flex-col rounded-2xl border border-white/10 bg-surface p-6 sm:p-8',
                'transition-[border-color,transform] duration-300 hover:border-white/20 active:scale-[0.995]',
                'has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent',
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-micro text-accent">{service.label}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 text-muted transition-transform duration-300 ease-out-expo group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 group-hover/card:text-ink"
                />
              </div>

              <h3 className="mt-6 max-w-[20em] text-lead font-semibold">{service.title}</h3>
              <p className="mt-3 max-w-[34em] text-body text-muted">{service.description}</p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <li key={tag}>
                    <Badge>{tag}</Badge>
                  </li>
                ))}
              </ul>

              <a
                href={`#${SECTION_IDS.solutions}`}
                className="mt-auto inline-flex items-center gap-2 self-start pt-8 text-small font-medium focus-visible:outline-none"
              >
                {/* Link esticado: o cartão todo é clicável, com um único nome acessível. */}
                <span aria-hidden="true" className="absolute inset-0 rounded-2xl" />
                {service.cta}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 ease-out-expo group-hover/card:translate-x-1"
                />
              </a>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
