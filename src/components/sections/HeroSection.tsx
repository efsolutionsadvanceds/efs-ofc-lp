import { ArrowRight, Check } from 'lucide-react'

import { WhatsAppCta } from '@/components/conversion/WhatsAppCta'
import { HeroPreview } from '@/components/preview/HeroPreview'
import { buttonArrowStyles, buttonStyles } from '@/components/ui/buttonStyles'
import { GridBackdrop } from '@/components/ui/GridBackdrop'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { HERO_CTA_ID, SECTION_IDS } from '@/config/sections'
import { stagger } from '@/lib/stagger'

const ASSURANCES = ['Orçamento sem compromisso', 'Atendimento em todo o Brasil', 'Resposta pelo WhatsApp']

/**
 * Primeira dobra, dividida: à esquerda, o título orientado à busca e as
 * ações; à direita, a prévia interativa do que é desenvolvido.
 *
 * Título e parágrafo (os candidatos a LCP) são pintados já no primeiro
 * quadro, sem animação de entrada; o restante entra com o utilitário
 * `rise` (CSS puro). No desktop as colunas alinham pelo topo, então a
 * posição da prévia não depende da altura do texto (nem da troca da fonte).
 */
export function HeroSection() {
  return (
    <section id={SECTION_IDS.hero} aria-labelledby="inicio-titulo" className="relative isolate overflow-x-clip">
      <GridBackdrop />

      <div className="frame grid grid-cols-1 gap-16 pt-10 pb-20 md:pt-16 md:pb-28 lg:grid-cols-12 lg:items-start lg:gap-10 lg:pt-20">
        <div className="lg:col-span-7">
          <h1 id="inicio-titulo" className="max-w-[15em] text-hero">
            Criação de Sites Profissionais,{' '}
            <span className="text-muted">Sistemas Sob Medida e Atendimento Virtual com IA</span>
          </h1>

          <p className="mt-6 max-w-[32em] text-lead text-ink/80">
            Sites rápidos que aparecem no Google, sistemas de gestão feitos para o seu processo e um atendente virtual
            que responde seus clientes no WhatsApp 24 horas.
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

          <ul className="rise mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-micro text-muted" style={stagger(1)}>
            {ASSURANCES.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check aria-hidden="true" className="size-3.5 text-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rise relative lg:col-span-5 lg:mt-2" style={stagger(1)}>
          {/* Brilho turquesa por trás da prévia. */}
          <div
            aria-hidden="true"
            className="absolute -inset-12 -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(24_200_200/0.16),transparent)] blur-2xl"
          />
          <HeroPreview />
        </div>
      </div>
    </section>
  )
}
