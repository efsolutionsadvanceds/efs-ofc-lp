import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { ComponentType } from 'react'

import { Badge } from '@/components/ui/Badge'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { VectorAutomation } from '@/components/vectors/VectorAutomation'
import { VectorSeo } from '@/components/vectors/VectorSeo'
import { VectorSite } from '@/components/vectors/VectorSite'
import { VectorSystem } from '@/components/vectors/VectorSystem'
import { SECTION_IDS } from '@/config/sections'
import { SERVICES } from '@/content/services'
import { cx } from '@/lib/cx'

/** Larguras alternadas no desktop (7/5, 5/7): um mosaico em vez de uma grade uniforme. */
const SPANS = ['md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7']

/** Ilustração animada de cada serviço (pelo `id` em src/content/services.ts). */
const VECTORS: Record<string, ComponentType> = {
  sites: VectorSite,
  sistemas: VectorSystem,
  'atendimento-ia': VectorAutomation,
  seo: VectorSeo,
}

/**
 * Os quatro serviços, com os termos de busca principais nos <h3>. O cartão
 * inteiro leva ao orçamento (link esticado sobre o cartão) e sobe 2px no
 * hover, só com mouse. Cada um traz uma ilustração animada que toca uma
 * vez ao aparecer e recomeça no hover.
 */
export function ServicesSection() {
  return (
    <section id={SECTION_IDS.services} aria-labelledby="servicos-titulo" className="frame section-space">
      <SectionHeader
        id="servicos-titulo"
        title="Sites, sistemas e IA"
        muted="para empresas que querem crescer."
        lead="Contrate uma solução ou combine várias. Tudo pensado para gerar clientes e tirar trabalho manual da sua rotina."
      />

      <ul className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-12">
        {SERVICES.map((service, index) => (
          <li key={service.id} className={SPANS[index]}>
            <article
              className={cx(
                'group/card relative flex h-full flex-col rounded-2xl border border-white/10 bg-surface p-6 sm:p-8',
                'transition-[translate,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-white/20',
                'has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent',
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-micro text-accent">{service.label}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 text-muted transition-[translate,color] duration-200 ease-out group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 group-hover/card:text-ink"
                />
              </div>

              <ServiceVector id={service.id} />

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
                  className="size-4 transition-transform duration-200 ease-out group-hover/card:translate-x-1"
                />
              </a>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}

function ServiceVector({ id }: { id: string }) {
  const Vector = VECTORS[id]
  return Vector ? <Vector /> : null
}
