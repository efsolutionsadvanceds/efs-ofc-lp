import { ArrowRight, Check } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { ConversionBar } from '@/components/conversion/ConversionBar'
import { WhatsAppCta } from '@/components/conversion/WhatsAppCta'
import { ClosingSection } from '@/components/sections/ClosingSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { SolutionsSection } from '@/components/sections/SolutionsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { buttonArrowStyles, buttonStyles } from '@/components/ui/buttonStyles'
import { GridBackdrop } from '@/components/ui/GridBackdrop'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { getPageMeta } from '@/config/pages'
import { HERO_CTA_ID, SECTION_IDS } from '@/config/sections'
import { CITY_CONTENT } from '@/content/cities'
import { CITIES_HUB_PATH, cityPath, findCityEntry } from '@/content/cityIndex'
import { stagger } from '@/lib/stagger'
import NotFound from '@/pages/NotFound'

/**
 * Página de criação de sites de uma cidade (/criacao-de-sites/:cidade).
 * Texto próprio da cidade (abertura, economia local, setores, perguntas),
 * o mesmo seletor de soluções da home e a cidade na mensagem do WhatsApp.
 * Título, description, canonical e schema `Service` + `areaServed` vêm de
 * src/config/pages.ts. Cidade desconhecida: 404.
 */
export default function CityPage() {
  const { cidade } = useParams()
  const city = findCityEntry(cidade)
  if (!city) return <NotFound />

  const content = CITY_CONTENT[city.slug]
  const meta = getPageMeta(cityPath(city.slug))

  return (
    <>
      <section aria-labelledby="cidade-titulo" className="relative isolate overflow-x-clip">
        <GridBackdrop />
        <div className="frame pt-8 pb-20 md:pt-12 md:pb-28">
          <Breadcrumbs items={meta.breadcrumbs ?? []} />

          <div className="mt-14 max-w-4xl md:mt-20">
            <p className="font-mono text-micro text-accent">{city.region}, SP</p>
            <h1 id="cidade-titulo" className="mt-4 text-hero">
              Criação de sites <span className="text-muted">em {city.name}</span>
            </h1>
            <p className="mt-6 max-w-[34em] text-lead text-ink/80">{content.intro}</p>

            <div id={HERO_CTA_ID} className="rise mt-9 flex flex-wrap items-center gap-3" style={stagger(0)}>
              <a href={`#${SECTION_IDS.solutions}`} className={buttonStyles({ size: 'lg' })}>
                Montar meu orçamento
                <ArrowRight aria-hidden="true" className={buttonArrowStyles} />
              </a>
              <WhatsAppCta location="hero" className={buttonStyles({ variant: 'secondary', size: 'lg' })}>
                <WhatsAppIcon size={18} />
                Falar no WhatsApp
              </WhatsAppCta>
            </div>

            <ul className="rise mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-micro text-muted" style={stagger(1)}>
              {[`Atendimento online em ${city.name}`, 'Orçamento sem compromisso', 'Resposta pelo WhatsApp'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check aria-hidden="true" className="size-3.5 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="mercado-local" aria-labelledby="mercado-local-titulo" className="frame section-space">
        <SectionHeader id="mercado-local-titulo" title={`Negócios de ${city.name}`} muted="e o que eles precisam online." />

        <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-6 text-lead text-muted lg:col-span-5">
            {content.context.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <ul className="grid grid-cols-1 gap-4 lg:col-span-7">
            {content.sectors.map((sector) => (
              <li key={sector.name} className="rounded-2xl border border-white/10 bg-surface p-6 sm:p-8">
                <h3 className="text-lead font-semibold">{sector.name}</h3>
                <p className="mt-2 max-w-[38em] text-body text-muted">{sector.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TestimonialsSection />
      <SolutionsSection />
      <ProcessSection />
      <FaqSection items={content.faq} muted={`em ${city.name}.`} lead="O que as empresas da cidade mais perguntam antes de contratar." />

      <section aria-labelledby="outras-cidades-titulo" className="frame pb-[clamp(4rem,2.5rem+6vw,7.5rem)]">
        <h2 id="outras-cidades-titulo" className="text-title">
          Também atendemos <span className="block text-muted">outras cidades de São Paulo.</span>
        </h2>
        <ul className="mt-10 flex flex-wrap gap-2">
          {content.nearby.map((slug) => {
            const nearby = findCityEntry(slug)
            return nearby ? (
              <li key={slug}>
                <Link
                  to={cityPath(nearby.slug)}
                  className="inline-flex h-11 items-center rounded-md border border-white/10 bg-white/[0.03] px-4 text-small transition-[border-color,scale] duration-150 ease-out hover:border-white/25 active:scale-[0.97]"
                >
                  Sites em {nearby.name}
                </Link>
              </li>
            ) : null
          })}
          <li>
            <Link
              to={CITIES_HUB_PATH}
              className="inline-flex h-11 items-center gap-2 rounded-md px-4 text-small text-muted transition-colors duration-150 hover:text-ink"
            >
              Todas as cidades
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </li>
        </ul>
      </section>

      <ClosingSection />
      <ConversionBar />
    </>
  )
}
