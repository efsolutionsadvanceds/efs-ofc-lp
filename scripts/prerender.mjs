/**
 * Pré-renderização (SSG) — última etapa do `yarn build`, depois de
 * `vite build` (bundle do navegador) e `vite build --ssr` (dist-ssr/).
 *
 * Para cada página do registro src/config/pages.ts:
 *   1. renderiza o app no servidor (HTML completo, com o conteúdo real);
 *   2. injeta as tags de <head> da rota (título, meta, canonical, Open
 *      Graph, JSON-LD) no template gerado pelo Vite;
 *   3. embute o CSS no próprio HTML (economiza uma ida e volta à rede antes
 *      da primeira pintura);
 *   4. grava dist/<arquivo>.html — o Vercel serve /rota a partir de
 *      rota.html (`cleanUrls`) e usa dist/404.html com status 404 real.
 *
 * Depois gera sitemap.xml e robots.txt a partir do mesmo registro e apaga
 * a saída temporária dist-ssr/.
 */
import { readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST_DIR = path.join(ROOT, 'dist')
const SSR_DIR = path.join(ROOT, 'dist-ssr')

const HEAD_PLACEHOLDER = '<!--app-head-->'
const APP_PLACEHOLDER = '<!--app-html-->'
const STYLESHEET_LINK = /<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/

/**
 * Acima disso, o CSS volta a ser um arquivo separado (o cache entre páginas
 * passa a compensar). 64 kB sem compressão ≈ 10 kB com gzip — dentro do
 * orçamento de CSS crítico para embutir.
 */
const MAX_INLINE_CSS_BYTES = 64 * 1024

const kb = (value) => `${(Buffer.byteLength(value) / 1024).toFixed(1)} kB`

async function inlineStylesheet(html) {
  const match = html.match(STYLESHEET_LINK)
  if (!match) return html

  const css = await readFile(path.join(DIST_DIR, match[1]), 'utf8')
  if (Buffer.byteLength(css) > MAX_INLINE_CSS_BYTES) {
    console.log(`  CSS com ${kb(css)} — mantido como arquivo externo.`)
    return html
  }
  console.log(`  CSS embutido no HTML (${kb(css)}).`)
  return html.replace(match[0], () => `<style>${css}</style>`)
}

async function main() {
  const rawTemplate = await readFile(path.join(DIST_DIR, 'index.html'), 'utf8')
  if (!rawTemplate.includes(HEAD_PLACEHOLDER) || !rawTemplate.includes(APP_PLACEHOLDER)) {
    throw new Error(`dist/index.html precisa conter ${HEAD_PLACEHOLDER} e ${APP_PLACEHOLDER}.`)
  }

  const { render, prerenderTargets, sitemapXml, robotsTxt } = await import(
    pathToFileURL(path.join(SSR_DIR, 'entry-server.js')).href
  )

  console.log('\nPré-renderizando páginas:')
  const template = await inlineStylesheet(rawTemplate)

  for (const target of prerenderTargets) {
    const { html, head } = await render(target.path)
    // Funções de substituição: o conteúdo pode conter "$&" e afins, que
    // String#replace interpretaria como padrões especiais.
    const page = template.replace(HEAD_PLACEHOLDER, () => head).replace(APP_PLACEHOLDER, () => html)
    await writeFile(path.join(DIST_DIR, target.file), page)
    console.log(`  ${target.path.padEnd(14)} → dist/${target.file} (${kb(page)})`)
  }

  await writeFile(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml())
  await writeFile(path.join(DIST_DIR, 'robots.txt'), robotsTxt())
  console.log('  sitemap.xml e robots.txt gerados.')

  await rm(SSR_DIR, { recursive: true, force: true })
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
