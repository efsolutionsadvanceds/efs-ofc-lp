import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/Badge'
import { textLinkStyles } from '@/components/ui/buttonStyles'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SECTION_IDS } from '@/config/sections'
import { TESTIMONIALS } from '@/content/testimonials'

/**
 * Depoimentos de clientes reais, logo depois dos serviços. Cada cliente
 * aparece com o site entregue (link externo, em nova aba) ou, se o projeto
 * ainda não foi publicado, sem link e com o status do projeto.
 */
export function TestimonialsSection() {
  return (
    <section id={SECTION_IDS.testimonials} aria-labelledby="depoimentos-titulo" className="frame section-space">
      <SectionHeader
        id="depoimentos-titulo"
        title="O que dizem"
        muted="nossos clientes."
        lead="Nas palavras de quem já contratou a E.F Solutions."
      />

      <ul className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-3">
        {TESTIMONIALS.map((item) => (
          <li key={item.id}>
            <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-surface p-6 sm:p-8">
              <blockquote className="flex-1 text-lead text-ink/90">
                <p>“{item.quote}”</p>
              </blockquote>

              <figcaption className="mt-8 border-t border-white/10 pt-6">
                <p className="text-small font-medium">
                  {item.author}
                  {item.company ? <span className="text-muted">, {item.company}</span> : null}
                </p>
                <div className="mt-2">
                  {item.site ? (
                    <a
                      href={item.site.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-micro text-muted transition-colors duration-200 hover:text-ink"
                    >
                      {item.site.label}
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>
                  ) : item.status ? (
                    <Badge>{item.status}</Badge>
                  ) : null}
                </div>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <Link to="/projetos" className={`${textLinkStyles} mt-10 text-small`}>
        Ver o que foi entregue em cada projeto
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </section>
  )
}
