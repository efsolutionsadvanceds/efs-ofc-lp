import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { ConversionBar } from '@/components/conversion/ConversionBar'
import { WhatsAppCta } from '@/components/conversion/WhatsAppCta'
import { ClosingSection } from '@/components/sections/ClosingSection'
import { SolutionsSection } from '@/components/sections/SolutionsSection'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { buttonArrowStyles, buttonStyles } from '@/components/ui/buttonStyles'
import { GridBackdrop } from '@/components/ui/GridBackdrop'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { pages } from '@/config/pages'
import { HERO_CTA_ID, SECTION_IDS } from '@/config/sections'
import { CITY_CONTENT } from '@/content/cities'
import { CITY_GROUPS, CITY_INDEX, cityPath } from '@/content/cityIndex'
import { stagger } from '@/lib/stagger'

/**
 * Hub de criação de sites por cidade (/criacao-de-sites): liga para as
 * páginas de cada cidade, agrupadas por região, e mantém o seletor de
 * soluções para quem já quer pedir orçamento.
 */
export default function CitiesHub() {
  return (
    <>
      <section aria-labelledby="cidades-hub-titulo" className="relative isolate overflow-x-clip">
        <GridBackdrop />
        <div className="frame pt-8 pb-20 md:pt-12 md:pb-28">
          <Breadcrumbs items={pages.cidades.breadcrumbs} />

          <div className="mt-14 max-w-4xl md:mt-20">
            <h1 id="cidades-hub-titulo" className="text-hero">
              Criação de sites para empresas <span className="text-muted">de todo o estado de São Paulo</span>
            </h1>
            <p className="mt-6 max-w-[34em] text-lead text-ink/80">
              Atendimento online para a capital, a Grande São Paulo, o litoral e o interior. Escolha a sua cidade para ver
              como trabalhamos com os negócios da região, ou monte o seu orçamento agora.
            </p>

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
          </div>
        </div>
      </section>

      <section id="cidades" aria-labelledby="cidades-titulo" className="frame section-space">
        <SectionHeader id="cidades-titulo" title="Escolha a sua cidade" muted="e veja como atendemos." />

        <div className="mt-12 flex flex-col gap-12 md:mt-16">
          {CITY_GROUPS.map((group) => (
            <div key={group.id}>
              <h3 className="font-mono text-micro text-muted">{group.label}</h3>
              <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {CITY_INDEX.filter((city) => city.group === group.id).map((city) => (
                  <li key={city.slug}>
                    <Link
                      to={cityPath(city.slug)}
                      className="group/city flex h-full flex-col rounded-2xl border border-white/10 bg-surface p-6 transition-[translate,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-white/20"
                    >
                      <span className="flex items-center justify-between gap-4">
                        <span className="text-lead font-semibold">{city.name}</span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 shrink-0 text-muted transition-[translate,color] duration-200 ease-out group-hover/city:translate-x-0.5 group-hover/city:-translate-y-0.5 group-hover/city:text-ink"
                        />
                      </span>
                      <span className="mt-1 font-mono text-micro text-accent">{city.region}</span>
                      <span className="mt-4 text-body text-muted">{CITY_CONTENT[city.slug].summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 max-w-[40em] text-body text-muted">
          A sua cidade não está na lista? O atendimento é online e chega a empresas de todo o Brasil: é só chamar no
          WhatsApp.
        </p>
      </section>

      <SolutionsSection />
      <ClosingSection />
      <ConversionBar />
    </>
  )
}
