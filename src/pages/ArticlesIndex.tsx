import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { ClosingSection } from '@/components/sections/ClosingSection'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { GridBackdrop } from '@/components/ui/GridBackdrop'
import { pages } from '@/config/pages'
import { SECTION_IDS } from '@/config/sections'
import { ARTICLE_INDEX, articlePath, formatArticleDate } from '@/content/articleIndex'

/**
 * Índice da área de conteúdos (/conteudos): guias para quem está decidindo
 * contratar um site, um sistema, um atendente com IA ou um trabalho de SEO.
 */
export default function ArticlesIndex() {
  return (
    <>
      <section aria-labelledby="conteudos-titulo" className="relative isolate overflow-x-clip">
        <GridBackdrop />
        <div className="frame pt-8 pb-16 md:pt-12 md:pb-20">
          <Breadcrumbs items={pages.conteudos.breadcrumbs} />
          <div className="mt-14 max-w-4xl md:mt-20">
            <p className="font-mono text-micro text-accent">conteudos/</p>
            <h1 id="conteudos-titulo" className="mt-4 text-hero">
              Guias sobre sites, sistemas, <span className="text-muted">atendimento com IA e SEO</span>
            </h1>
            <p className="mt-6 max-w-[34em] text-lead text-ink/80">
              Respostas diretas para as dúvidas que aparecem antes de contratar: quanto custa, como funciona e quando
              vale a pena.
            </p>
          </div>
        </div>
      </section>

      <div className="frame pb-[clamp(4rem,2.5rem+6vw,7.5rem)]">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {ARTICLE_INDEX.map((article) => (
            <li key={article.slug}>
              <Link
                to={articlePath(article.slug)}
                className="group/article flex h-full flex-col rounded-2xl border border-white/10 bg-surface p-6 transition-[translate,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-white/20 sm:p-8"
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="font-mono text-micro text-accent">{article.section}</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 text-muted transition-[translate,color] duration-200 ease-out group-hover/article:translate-x-0.5 group-hover/article:-translate-y-0.5 group-hover/article:text-ink"
                  />
                </span>
                <h2 className="mt-5 text-lead font-semibold">{article.headline}</h2>
                <p className="mt-3 text-body text-muted">{article.description}</p>
                <p className="mt-auto pt-6 font-mono text-micro text-muted">
                  <time dateTime={article.datePublished}>{formatArticleDate(article.datePublished)}</time>
                  <span aria-hidden="true"> · </span>
                  {article.readingMinutes} min de leitura
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <ClosingSection pickerHref={`/#${SECTION_IDS.solutions}`} />
    </>
  )
}
