import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'

import { ConversionBar } from '@/components/conversion/ConversionBar'
import { WhatsAppCta } from '@/components/conversion/WhatsAppCta'
import { ClosingSection } from '@/components/sections/ClosingSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { SolutionsSection } from '@/components/sections/SolutionsSection'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { buttonArrowStyles, buttonStyles } from '@/components/ui/buttonStyles'
import { GridBackdrop } from '@/components/ui/GridBackdrop'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { SERVICE_HERO_VECTORS } from '@/components/vectors/ServiceHeroVectors'
import { getPageMeta } from '@/config/pages'
import { HERO_CTA_ID, SECTION_IDS } from '@/config/sections'
import { ARTICLE_INDEX, articlePath } from '@/content/articleIndex'
import { CITIES_HUB_PATH } from '@/content/cityIndex'
import { findServiceEntry, servicePath, type ServiceSlug } from '@/content/serviceIndex'
import { SERVICE_CONTENT } from '@/content/servicePages'
import { cx } from '@/lib/cx'
import { stagger } from '@/lib/stagger'

const SECTION_END = 'pb-[clamp(4rem,2.5rem+6vw,7.5rem)]'

/**
 * Página de um serviço principal (/sistemas-personalizados,
 * /automacao-whatsapp, /seo-e-divulgacao, /landing-pages-e-lojas): um H1
 * com a intenção de busca, ilustração animada exclusiva, o que está
 * incluído, para quem é, como o projeto acontece, o seletor de orçamento já
 * com o serviço marcado, perguntas frequentes e links para páginas
 * relacionadas. Título, description, canonical e schema `Service` vêm de
 * src/config/pages.ts.
 */
export default function ServicePage({ slug }: { slug: ServiceSlug }) {
  const service = findServiceEntry(slug)
  if (!service) return null

  const content = SERVICE_CONTENT[slug]
  const meta = getPageMeta(servicePath(slug))
  const Vector = SERVICE_HERO_VECTORS[slug]
  const articles = ARTICLE_INDEX.filter((article) => article.service === slug)

  return (
    <>
      <section aria-labelledby="servico-titulo" className="relative isolate overflow-x-clip">
        <GridBackdrop />
        <div className="frame pt-8 pb-20 md:pt-12 md:pb-28">
          <Breadcrumbs items={meta.breadcrumbs ?? []} />

          <div className="mt-12 grid grid-cols-1 items-center gap-12 md:mt-16 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <p className="font-mono text-micro text-accent">{service.label}</p>
              <h1 id="servico-titulo" className="mt-4 max-w-[16em] text-hero">
                {content.heading[0]} <span className="text-muted">{content.heading[1]}</span>
              </h1>
              <p className="mt-6 max-w-[34em] text-lead text-ink/80">{content.lead}</p>

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
                {content.assurances.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check aria-hidden="true" className="size-3.5 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <Vector />
            </div>
          </div>
        </div>
      </section>

      <section id="incluido" aria-labelledby="incluido-titulo" className="frame section-space">
        <SectionHeader id="incluido-titulo" title="O que está incluído" muted="no projeto." />
        <ul className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {content.features.map((feature) => (
            <li key={feature.title} className="rounded-2xl border border-white/10 bg-surface p-6 sm:p-8">
              <h3 className="text-lead font-semibold">{feature.title}</h3>
              <p className="mt-2 text-body text-muted">{feature.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="para-quem" aria-labelledby="para-quem-titulo" className="frame section-space">
        <SectionHeader id="para-quem-titulo" title="Para quem é" muted="e quando faz sentido." />
        <ul className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2">
          {content.audiences.map((audience) => (
            <li key={audience.title} className="rounded-2xl border border-white/10 bg-surface p-6 sm:p-8">
              <h3 className="text-lead font-semibold">{audience.title}</h3>
              <p className="mt-2 max-w-[34em] text-body text-muted">{audience.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="etapas" aria-labelledby="etapas-titulo" className="frame section-space">
        <SectionHeader id="etapas-titulo" title="Como o projeto acontece" muted="do diagnóstico à entrega." />
        <ol className="mt-12 grid grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-surface md:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((step, index) => (
            <li
              key={step.title}
              className={cx(
                'p-6 sm:p-8',
                index > 0 && 'border-t border-white/10',
                index === 1 && 'md:border-t-0 md:border-l',
                index === 2 && 'lg:border-t-0 lg:border-l',
                index === 3 && 'md:border-l lg:border-t-0',
              )}
            >
              <span className="font-mono text-micro text-accent">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-6 text-lead font-semibold">{step.title}</h3>
              <p className="mt-2 text-body text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <SolutionsSection />

      <FaqSection
        items={content.faq}
        muted="antes de contratar."
        lead={`As dúvidas mais comuns sobre ${service.name.toLowerCase()}, respondidas sem rodeios.`}
      />

      <section aria-labelledby="veja-tambem-titulo" className={cx('frame', SECTION_END)}>
        <h2 id="veja-tambem-titulo" className="text-title">
          Veja também <span className="block text-muted">outros serviços e guias.</span>
        </h2>
        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.related.map((relatedSlug) => {
            const related = findServiceEntry(relatedSlug)
            return related ? (
              <li key={relatedSlug}>
                <RelatedLink to={servicePath(related.slug)} label={related.label} title={related.name} />
              </li>
            ) : null
          })}
          <li>
            <RelatedLink to={CITIES_HUB_PATH} label="criacao-de-sites/" title="Criação de sites por cidade" />
          </li>
          <li>
            <RelatedLink to="/projetos" label="projetos/" title="Projetos entregues" />
          </li>
          {articles.map((article) => (
            <li key={article.slug}>
              <RelatedLink to={articlePath(article.slug)} label="conteudos/" title={article.headline} />
            </li>
          ))}
        </ul>
      </section>

      <ClosingSection />
      <ConversionBar />
    </>
  )
}

function RelatedLink({ to, label, title }: { to: string; label: string; title: string }) {
  return (
    <Link
      to={to}
      className="group/related flex h-full flex-col rounded-2xl border border-white/10 bg-surface p-6 transition-[translate,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-white/20"
    >
      <span className="flex items-center justify-between gap-4">
        <span className="font-mono text-micro text-accent">{label}</span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 text-muted transition-[translate,color] duration-200 ease-out group-hover/related:translate-x-0.5 group-hover/related:-translate-y-0.5 group-hover/related:text-ink"
        />
      </span>
      <span className="mt-4 text-lead font-semibold">{title}</span>
    </Link>
  )
}
