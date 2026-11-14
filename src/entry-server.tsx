import { StrictMode } from 'react'
import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'

import App from './App'
import { getPageMeta, PRERENDERED_PAGES } from './config/pages'
import { buildHeadTags, renderHeadTags } from './lib/head'
import { buildLlmsTxt } from './lib/llms'
import { buildRobotsTxt, buildSitemapXml } from './lib/sitemap'

/**
 * Entrada de servidor usada apenas no build (SSG) por scripts/prerender.mjs —
 * nunca é publicada. Gera o HTML de cada rota e os arquivos de SEO a partir
 * do mesmo registro de páginas usado pelo app.
 */

export interface RenderResult {
  /** Marcação do app, injetada dentro de #root. */
  html: string
  /** Tags da rota (título, meta, canonical, Open Graph, JSON-LD), injetadas no <head>. */
  head: string
}

/**
 * `prerenderToNodeStream` aguarda todo o Suspense resolver (inclusive as
 * rotas carregadas com React.lazy) antes de devolver o HTML completo.
 *
 * `progressiveChunkSize` sem limite: por padrão, o React 19.2 tira do lugar
 * qualquer limite de Suspense grande (o conteúdo da página inteira vira um
 * `<div hidden>` depois do rodapé, e um script o move para dentro do
 * `<main>` depois). Num HTML estático isso só piora as coisas: em conexões
 * lentas o visitante via a página vazia com o rodapé no topo, e o conteúdo
 * saltava para o lugar (CLS alto). Assim, todo o conteúdo sai na ordem certa.
 */
export async function render(url: string): Promise<RenderResult> {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
    { progressiveChunkSize: Number.MAX_SAFE_INTEGER },
  )

  // Concatena os bytes antes de decodificar: um caractere acentuado pode
  // chegar dividido entre dois chunks.
  const chunks: Buffer[] = []
  for await (const chunk of prelude) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }

  // Fora do modo "documento inteiro", o React 19 emite suas dicas de recurso
  // (ex.: <link rel="preload"> de imagens) no início da marcação — o lugar
  // certo delas é o <head>, onde o navegador as descobre antes.
  const markup = Buffer.concat(chunks).toString('utf8')
  const resourceHints = markup.match(LEADING_LINK_TAGS)?.[0] ?? ''

  const { pathname } = new URL(url, 'https://prerender.local')
  return {
    html: markup.slice(resourceHints.length),
    head: [renderHeadTags(buildHeadTags(getPageMeta(pathname))), resourceHints].filter(Boolean).join('\n    '),
  }
}

const LEADING_LINK_TAGS = /^(?:<link\b[^>]*>)+/

/** Rotas a gerar e o arquivo de saída de cada uma (inclui a 404). */
export const prerenderTargets = PRERENDERED_PAGES.map(({ path, file }) => ({ path, file }))

export function sitemapXml(): string {
  return buildSitemapXml(PRERENDERED_PAGES)
}

export function robotsTxt(): string {
  return buildRobotsTxt()
}

export function llmsTxt(): string {
  return buildLlmsTxt()
}
