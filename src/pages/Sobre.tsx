import { ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { Link } from 'react-router-dom'

import { WhatsAppCta } from '@/components/conversion/WhatsAppCta'
import { ClosingSection } from '@/components/sections/ClosingSection'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { buttonArrowStyles, buttonStyles } from '@/components/ui/buttonStyles'
import { GridBackdrop } from '@/components/ui/GridBackdrop'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { pages } from '@/config/pages'
import { SECTION_IDS } from '@/config/sections'
import { CITIES_HUB_PATH } from '@/content/cityIndex'
import { servicePath } from '@/content/serviceIndex'
import { stagger } from '@/lib/stagger'

const OFFER = [
  { to: CITIES_HUB_PATH, label: 'sites/', title: 'Criação de sites', text: 'Sites institucionais rápidos e prontos para o Google, com páginas por cidade em São Paulo.' },
  { to: servicePath('sistemas-personalizados'), label: 'sistemas/', title: 'Sistemas de gestão sob medida', text: 'Vendas, estoque, agenda e financeiro num sistema web feito para o seu processo.' },
  { to: servicePath('automacao-whatsapp'), label: 'atendimento-ia/', title: 'Atendente virtual com IA', text: 'Atendimento no WhatsApp a qualquer hora, com passagem para a equipe quando precisa.' },
  { to: servicePath('seo-e-divulgacao'), label: 'seo/', title: 'SEO técnico e local', text: 'Site tecnicamente correto e Perfil da Empresa completo, acompanhados no Search Console.' },
  { to: servicePath('landing-pages-e-lojas'), label: 'landing-pages/', title: 'Landing pages e lojas', text: 'Páginas de campanha e lojas virtuais próprias, com medição de conversões.' },
]

const METHOD = [
  {
    title: 'Conversa inicial',
    text: 'Você conta o que precisa pelo WhatsApp, com ou sem as soluções marcadas no site. Fazemos as perguntas certas para entender o negócio.',
  },
  {
    title: 'Diagnóstico e proposta',
    text: 'Analisamos o cenário e enviamos a proposta por escrito: escopo, prazo, investimento e o que não está incluído.',
  },
  {
    title: 'Desenvolvimento em etapas',
    text: 'O projeto avança em entregas parciais, com versões para você ver e validar antes da publicação.',
  },
  {
    title: 'Publicação e medição',
    text: 'O site vai ao ar com Search Console, Google Analytics 4 e eventos de conversão configurados, respeitando o consentimento de cookies.',
  },
  {
    title: 'Acompanhamento',
    text: 'Depois da entrega, os dados mostram o que ajustar. Melhorias e novas etapas são combinadas por escrito.',
  },
]

const REMOTE = [
  {
    title: 'Canais definidos',
    text: 'WhatsApp para o dia a dia e chamadas online para os alinhamentos, sem depender de visitas presenciais.',
  },
  {
    title: 'Tudo por escrito',
    text: 'Escopo, decisões e aprovações registrados, para todo mundo saber exatamente o que foi combinado.',
  },
  {
    title: 'Empresas de qualquer cidade',
    text: 'Já entregamos projetos para empresas de Santa Catarina e de São Paulo, e atendemos todo o Brasil do mesmo jeito.',
  },
]

const TECHNICAL = [
  { title: 'Velocidade de verdade', text: 'Páginas pré-renderizadas, imagens otimizadas e código enxuto, medidos pelos Core Web Vitals do Google.' },
  { title: 'SEO desde o código', text: 'Títulos, descrições, canonical, sitemap, dados estruturados e links internos pensados desde o início do projeto.' },
  { title: 'Acessibilidade', text: 'Navegação por teclado, contraste adequado, textos alternativos e hierarquia de títulos correta.' },
  { title: 'Privacidade e LGPD', text: 'Consentimento de cookies de verdade: as ferramentas de medição só carregam depois da permissão do visitante.' },
  { title: 'Medição de conversão', text: 'Cada contato registrado com a origem certa, para saber quais páginas e campanhas trazem clientes.' },
  { title: 'Código testado', text: 'Testes automatizados e revisão antes de cada publicação, para o site não quebrar a cada mudança.' },
]

const WONT_DO = [
  'Prometer a primeira posição no Google.',
  'Inventar avaliações, depoimentos ou números de resultado.',
  'Começar um projeto sem escopo, prazo e investimento por escrito.',
]

/**
 * Sobre a E.F Solutions (/sobre): quem somos, o que fazemos, como
 * trabalhamos (metodologia), atendimento remoto e diferenciais técnicos.
 * Só afirmações verificáveis: nada de anos de mercado, contagem de
 * clientes ou prêmios.
 */
export default function Sobre() {
  return (
    <>
      <section aria-labelledby="sobre-titulo" className="relative isolate overflow-x-clip">
        <GridBackdrop />
        <div className="frame pt-8 pb-20 md:pt-12 md:pb-28">
          <Breadcrumbs items={pages.sobre.breadcrumbs} />
          <div className="mt-14 max-w-4xl md:mt-20">
            <p className="font-mono text-micro text-accent">sobre/</p>
            <h1 id="sobre-titulo" className="mt-4 text-hero">
              A E.F Solutions desenvolve sites, sistemas{' '}
              <span className="text-muted">e atendimento com IA para empresas</span>
            </h1>
            <p className="mt-6 max-w-[34em] text-lead text-ink/80">
              Somos uma empresa de engenharia de software. Criamos sites profissionais, sistemas de gestão sob medida,
              atendentes virtuais com IA no WhatsApp e trabalhos de SEO, com atendimento online para empresas de todo
              o Brasil.
            </p>
            <div className="rise mt-9 flex flex-wrap items-center gap-3" style={stagger(0)}>
              <Link to="/projetos" className={buttonStyles({ size: 'lg' })}>
                Ver projetos entregues
                <ArrowRight aria-hidden="true" className={buttonArrowStyles} />
              </Link>
              <WhatsAppCta location="hero" className={buttonStyles({ variant: 'secondary', size: 'lg' })}>
                <WhatsAppIcon size={18} />
                Falar no WhatsApp
              </WhatsAppCta>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="o-que-fazemos-titulo" className="frame section-space">
        <SectionHeader id="o-que-fazemos-titulo" title="O que fazemos" muted="do site ao sistema." />
        <ul className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {OFFER.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="group/offer flex h-full flex-col rounded-2xl border border-white/10 bg-surface p-6 transition-[translate,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-white/20 sm:p-8"
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="font-mono text-micro text-accent">{item.label}</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 text-muted transition-[translate,color] duration-200 ease-out group-hover/offer:translate-x-0.5 group-hover/offer:-translate-y-0.5 group-hover/offer:text-ink"
                  />
                </span>
                <span className="mt-5 text-lead font-semibold">{item.title}</span>
                <span className="mt-2 text-body text-muted">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="metodo-titulo" className="frame section-space">
        <SectionHeader
          id="metodo-titulo"
          title="Como trabalhamos"
          muted="com método, do começo ao fim."
          lead="Engenharia de software aplicada a projetos de empresa: escopo claro, entregas em etapas e decisões baseadas em dados."
        />
        <ol className="mt-12 grid grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-surface md:mt-16 lg:grid-cols-5">
          {METHOD.map((step, index) => (
            <li key={step.title} className={index > 0 ? 'border-t border-white/10 p-6 sm:p-8 lg:border-t-0 lg:border-l' : 'p-6 sm:p-8'}>
              <span className="font-mono text-micro text-accent">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-6 text-lead font-semibold">{step.title}</h3>
              <p className="mt-2 text-body text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="remoto-titulo" className="frame section-space">
        <SectionHeader id="remoto-titulo" title="Atendimento remoto" muted="com processo, não com improviso." />
        <ul className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-3">
          {REMOTE.map((item) => (
            <li key={item.title} className="rounded-2xl border border-white/10 bg-surface p-6 sm:p-8">
              <h3 className="text-lead font-semibold">{item.title}</h3>
              <p className="mt-2 text-body text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="diferenciais-titulo" className="frame section-space">
        <SectionHeader id="diferenciais-titulo" title="Diferenciais técnicos" muted="que o visitante sente." />
        <ul className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {TECHNICAL.map((item) => (
            <li key={item.title} className="rounded-2xl border border-white/10 bg-surface p-6 sm:p-8">
              <h3 className="text-lead font-semibold">{item.title}</h3>
              <p className="mt-2 text-body text-muted">{item.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-2xl border border-white/10 p-6 sm:p-8">
          <h3 className="text-lead font-semibold">O que não fazemos</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {WONT_DO.map((item) => (
              <li key={item} className="flex gap-3 text-body text-muted">
                <X aria-hidden="true" className="mt-1 size-4 shrink-0 text-muted" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingSection pickerHref={`/#${SECTION_IDS.solutions}`} />
    </>
  )
}
