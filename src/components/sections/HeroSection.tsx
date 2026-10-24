import { ArrowDown } from 'lucide-react'

import { WhatsAppCta } from '@/components/conversion/WhatsAppCta'
import { buttonStyles, textLinkStyles } from '@/components/ui/buttonStyles'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { HERO_CTA_ID, SECTION_IDS } from '@/config/sections'
import { stagger } from '@/lib/stagger'

const ASSURANCES = ['Orçamento sem compromisso', 'Resposta pelo WhatsApp', 'Atendimento em todo o Brasil']

/**
 * Primeira dobra: o que a empresa faz e o que fazer agora, em segundos.
 * Composição em "Z" — título largo no topo, apoio à esquerda e ações à
 * direita. Título e parágrafo (os candidatos a LCP no desktop e no celular)
 * são pintados já no primeiro quadro, sem animação de entrada: o Chrome só
 * conta um elemento para o LCP quando a opacidade dele passa de zero. As
 * ações e as garantias entram depois com o utilitário `rise` (CSS puro, não
 * depende do JavaScript).
 */
export function HeroSection() {
  return (
    <section
      id={SECTION_IDS.hero}
      aria-labelledby="inicio-titulo"
      className="frame pt-14 pb-20 md:pt-24 md:pb-28 lg:pt-28 lg:pb-32"
    >
      <h1 id="inicio-titulo" className="max-w-[11.25em] text-display">
        Mais clientes, menos trabalho manual.
      </h1>

      {/* Ordem no DOM (e no celular): apoio → ações → garantias. No desktop, o
          texto fica à esquerda e as ações à direita, alinhados pelo topo. Tudo
          empilhado na vertical: nenhuma quebra de linha depende da largura do
          texto, então a troca da fonte não desloca o layout. */}
      <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-8">
        <p className="max-w-[26.5em] text-lead lg:col-span-6 lg:row-start-1">
          A E.F Solutions desenvolve sites que aparecem no Google, sistemas de gestão sob medida e assistentes
          virtuais com IA que atendem seus clientes 24 horas por dia.
        </p>

        <div
          id={HERO_CTA_ID}
          className="rise flex flex-col items-start gap-6 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1"
          style={stagger(0)}
        >
          <a href={`#${SECTION_IDS.solutions}`} className={buttonStyles({ size: 'lg' })}>
            Montar meu orçamento
            <ArrowDown
              aria-hidden="true"
              className="size-5 transition-transform duration-300 ease-out-expo group-hover/button:translate-y-0.5"
            />
          </a>
          <WhatsAppCta location="hero" className={textLinkStyles}>
            <WhatsAppIcon size={18} />
            Falar direto no WhatsApp
          </WhatsAppCta>
        </div>

        <ul className="rise flex flex-col gap-1.5 text-small text-muted lg:col-span-6 lg:row-start-2" style={stagger(1)}>
          {ASSURANCES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
