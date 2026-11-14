import { ArrowUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { RichText } from '@/components/content/RichText'
import { WhatsAppCta } from '@/components/conversion/WhatsAppCta'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { GridBackdrop } from '@/components/ui/GridBackdrop'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { getPageMeta } from '@/config/pages'
import { ARTICLE_INDEX, articlePath, findArticleEntry, formatArticleDate } from '@/content/articleIndex'
import { ARTICLE_CONTENT, type ArticleBlock } from '@/content/articles'
import { findServiceEntry, servicePath } from '@/content/serviceIndex'
import NotFound from '@/pages/NotFound'

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case 'h3':
      return <h3 className="mt-8 text-lead font-semibold">{block.text}</h3>
    case 'ul':
    case 'ol': {
      const List = block.type
      return (
        <List className={`mt-4 flex flex-col gap-2.5 pl-5 ${block.type === 'ul' ? 'list-disc' : 'list-decimal'} marker:text-muted`}>
          {block.items.map((item) => (
            <li key={item.slice(0, 40)} className="pl-1">
              <RichText text={item} />
            </li>
          ))}
        </List>
      )
    }
    default:
      return (
        <p className="mt-4">
          <RichText text={block.text} />
        </p>
      )
  }
}

/**
 * Artigo da área de conteúdos (/conteudos/:artigo): sumário com âncoras,
 * texto com links internos, tempo de leitura, chamada contextual para o
 * WhatsApp (o orçamento já chega com a solução do artigo marcada e a
 * mensagem cita o artigo) e leituras relacionadas. Schema `Article` no
 * <head>, a partir de src/config/pages.ts.
 */
export default function ArticlePage() {
  const { artigo } = useParams()
  const article = findArticleEntry(artigo)
  if (!article) return <NotFound />

  const content = ARTICLE_CONTENT[article.slug]
  const meta = getPageMeta(articlePath(article.slug))
  const service = findServiceEntry(article.service)
  const others = ARTICLE_INDEX.filter((item) => item.slug !== article.slug)

  return (
    <article aria-labelledby="artigo-titulo" className="relative isolate overflow-x-clip">
      <GridBackdrop className="h-[28rem]" />
      <div className="frame pt-8 pb-[clamp(4rem,2.5rem+6vw,7.5rem)] md:pt-12">
        <Breadcrumbs items={meta.breadcrumbs ?? []} />

        <header className="mt-12 max-w-4xl md:mt-16">
          <p className="font-mono text-micro text-accent">{article.section}</p>
          <h1 id="artigo-titulo" className="mt-4 text-title">
            {article.headline}
          </h1>
          <p className="mt-6 max-w-[38em] text-lead text-ink/80">{article.description}</p>
          <p className="mt-6 font-mono text-micro text-muted">
            <time dateTime={article.datePublished}>{formatArticleDate(article.datePublished)}</time>
            <span aria-hidden="true"> · </span>
            {article.readingMinutes} min de leitura
          </p>
        </header>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
          <nav aria-label="Neste artigo" className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="font-mono text-micro text-muted">Neste artigo</p>
              <ol className="mt-4 flex flex-col gap-2.5 border-l border-white/10 text-small">
                {content.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="-ml-px block border-l border-transparent pl-4 text-muted transition-colors duration-150 hover:border-accent hover:text-ink"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="max-w-[44em] text-body text-ink/85 lg:col-span-8 lg:col-start-5">
            {content.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-4 first:mt-0 text-lead text-ink/90">
                <RichText text={paragraph} />
              </p>
            ))}

            {content.sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-titulo`} className="scroll-mt-28">
                <h2 id={`${section.id}-titulo`} className="mt-14 text-lead font-semibold sm:text-[1.5rem]">
                  {section.heading}
                </h2>
                {section.blocks.map((block, index) => (
                  <Block key={index} block={block} />
                ))}
              </section>
            ))}

            <aside aria-labelledby="artigo-cta" className="mt-16 rounded-2xl border border-white/10 bg-surface p-6 sm:p-8">
              <h2 id="artigo-cta" className="text-lead font-semibold">
                {content.cta.title}
              </h2>
              <p className="mt-2 text-body text-muted">{content.cta.text}</p>
              <WhatsAppCta location="article" className={`${buttonStyles({ size: 'md' })} mt-6`}>
                <WhatsAppIcon size={18} />
                Falar no WhatsApp
              </WhatsAppCta>
              {service ? (
                <p className="mt-5 text-small text-muted">
                  Ou veja a página de{' '}
                  <Link to={servicePath(service.slug)} className="font-medium text-ink underline decoration-ink/40 underline-offset-4">
                    {service.name.toLowerCase()}
                  </Link>
                  .
                </p>
              ) : null}
            </aside>

            <section aria-labelledby="leia-tambem" className="mt-16">
              <h2 id="leia-tambem" className="text-lead font-semibold">
                Leia também
              </h2>
              <ul className="mt-6 grid grid-cols-1 gap-4">
                {others.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={articlePath(item.slug)}
                      className="group/read flex items-start justify-between gap-6 rounded-2xl border border-white/10 p-5 transition-[border-color] duration-200 hover:border-white/20"
                    >
                      <span>
                        <span className="font-mono text-micro text-accent">{item.section}</span>
                        <span className="mt-2 block text-body font-medium">{item.headline}</span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-muted transition-[translate,color] duration-200 ease-out group-hover/read:translate-x-0.5 group-hover/read:-translate-y-0.5 group-hover/read:text-ink"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </article>
  )
}
