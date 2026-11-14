import { ArrowUpRight, Check } from 'lucide-react'

import { ClosingSection } from '@/components/sections/ClosingSection'
import { Badge } from '@/components/ui/Badge'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { GridBackdrop } from '@/components/ui/GridBackdrop'
import { pages } from '@/config/pages'
import { SECTION_IDS } from '@/config/sections'
import { PROJECTS } from '@/content/projects'
import { TESTIMONIALS } from '@/content/testimonials'

/**
 * Projetos entregues (/projetos): para cada cliente, o que o site precisava
 * fazer, o que foi entregue (como está publicado) e o depoimento. Sem
 * números nem resultados inventados; projeto em desenvolvimento fica sem
 * link até o lançamento.
 */
export default function Projetos() {
  return (
    <>
      <section aria-labelledby="projetos-titulo" className="relative isolate overflow-x-clip">
        <GridBackdrop />
        <div className="frame pt-8 pb-16 md:pt-12 md:pb-20">
          <Breadcrumbs items={pages.projetos.breadcrumbs} />
          <div className="mt-14 max-w-4xl md:mt-20">
            <p className="font-mono text-micro text-accent">projetos/</p>
            <h1 id="projetos-titulo" className="mt-4 text-hero">
              Projetos entregues <span className="text-muted">para empresas reais</span>
            </h1>
            <p className="mt-6 max-w-[34em] text-lead text-ink/80">
              Sites desenvolvidos pela E.F Solutions para empresas de Santa Catarina e de São Paulo: o que cada uma
              precisava resolver, o que foi entregue e o que o próprio cliente disse.
            </p>
          </div>
        </div>
      </section>

      <div className="frame flex flex-col gap-6 pb-[clamp(4rem,2.5rem+6vw,7.5rem)]">
        {PROJECTS.map((project) => {
          const testimonial = TESTIMONIALS.find((item) => item.id === project.testimonialId)
          const titleId = `projeto-${project.id}`
          return (
            <article
              key={project.id}
              aria-labelledby={titleId}
              className="grid grid-cols-1 gap-10 rounded-2xl border border-white/10 bg-surface p-6 sm:p-8 lg:grid-cols-12 lg:gap-6 lg:p-10"
            >
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-micro text-muted">
                  <span className="text-accent">{project.segment}</span>
                  {project.location ? <span>{project.location}</span> : null}
                  {project.status ? <Badge>{project.status}</Badge> : null}
                </div>
                <h2 id={titleId} className="mt-4 text-title">
                  {project.client}
                </h2>

                <h3 className="mt-8 text-body font-semibold">O que o site precisava fazer</h3>
                <p className="mt-2 max-w-[38em] text-body text-muted">{project.goal}</p>

                {project.delivered.length > 0 ? (
                  <>
                    <h3 className="mt-8 text-body font-semibold">O que foi entregue</h3>
                    <ul className="mt-3 flex flex-col gap-2.5">
                      {project.delivered.map((item) => (
                        <li key={item} className="flex gap-3 text-body text-muted">
                          <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>

              <div className="flex flex-col justify-between gap-8 lg:col-span-5 lg:border-l lg:border-white/10 lg:pl-8">
                {testimonial ? (
                  <figure>
                    <blockquote className="text-lead text-ink/90">
                      <p>“{testimonial.quote}”</p>
                    </blockquote>
                    <figcaption className="mt-4 text-small text-muted">
                      {testimonial.author}
                      {testimonial.company ? `, ${testimonial.company}` : ''}
                    </figcaption>
                  </figure>
                ) : null}

                {project.site ? (
                  <a
                    href={project.site.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 self-start font-mono text-micro text-muted transition-colors duration-200 hover:text-ink"
                  >
                    {project.site.label}
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                ) : null}
              </div>
            </article>
          )
        })}

        <p className="max-w-[44em] text-small text-muted">
          Os projetos acima descrevem o que está publicado nos sites dos clientes, e os depoimentos estão transcritos
          como cada cliente escreveu.
        </p>
      </div>

      <ClosingSection pickerHref={`/#${SECTION_IDS.solutions}`} />
    </>
  )
}
