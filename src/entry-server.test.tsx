import { describe, expect, it } from 'vitest'

import { PRERENDERED_PAGES } from './config/pages'
import { prerenderTargets, render } from './entry-server'

/**
 * Pré-renderiza cada página como o build faz. Garante que o registro de
 * páginas (src/config/pages.ts) e as rotas de App.tsx não divergem e que o
 * HTML estático já traz o conteúdo real — inclusive das rotas carregadas
 * com React.lazy.
 */

const H1_BY_PATH: Record<string, string> = {
  '/': 'Criação de Sites Profissionais, Sistemas Sob Medida e Atendimento Virtual com IA',
  '/politica-de-privacidade': 'Política de Privacidade',
  '/termos-de-uso': 'Termos de Uso',
  '/obrigado': 'Falta só enviar a mensagem.',
  '/404': 'Esta página não existe.',
}

/** Texto do elemento como um leitor (ou buscador) o lê: sem tags e sem comentários do React. */
function textOf(html: string): string {
  return html
    .replace(/<!--.*?-->/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

describe('pré-renderização', () => {
  it('gera um arquivo por página registrada', () => {
    expect(prerenderTargets.map((target) => target.path)).toEqual(PRERENDERED_PAGES.map((page) => page.path))
  })

  it.each(prerenderTargets)('$path renderiza o próprio conteúdo com um único h1', async ({ path }) => {
    const { html, head } = await render(path)
    const h1s = html.match(/<h1\b[^>]*>(.*?)<\/h1>/g) ?? []
    expect(h1s).toHaveLength(1)
    expect(textOf(h1s[0] ?? '')).toBe(H1_BY_PATH[path])
    expect(head).toContain('<title>')
    expect(html.startsWith('<link')).toBe(false)
  })

  it('a home traz os quatro termos de busca principais nos títulos das seções', async () => {
    const { html } = await render('/')
    const headings = (html.match(/<h3\b[^>]*>(.*?)<\/h3>/g) ?? []).map(textOf)
    expect(headings).toEqual(
      expect.arrayContaining([
        'Criação de sites profissionais para empresas',
        'Desenvolvimento de sistemas de gestão sob medida',
        'Atendente virtual e automação de atendimento no WhatsApp',
        'Otimização SEO para ser encontrado no Google',
      ]),
    )
    expect(html).toContain('Google Search Console')
  })

  it('a home traz o seletor de soluções, o FAQ e a barra de conversão no HTML', async () => {
    const { html } = await render('/')
    expect(html.match(/type="checkbox"/g)).toHaveLength(6)
    expect(html.match(/<details\b/g)).toHaveLength(5)
    expect(html).toContain('aria-label="Resumo do seu orçamento"')
    expect(html).toContain('href="https://wa.me/5511967873507?text=')
  })

  it.each(prerenderTargets)('$path entrega o conteúdo dentro do <main>, na ordem (sem limite de Suspense deslocado)', async ({ path }) => {
    const { html } = await render(path)
    // Regressão: o React 19.2 movia o conteúdo para um <div hidden> depois do
    // rodapé, revelado por script (página vazia em conexão lenta, CLS ~0,4).
    expect(html).not.toContain('<template id="B:')
    expect(html).not.toMatch(/hidden id="S:/)
    const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'))
    expect(main).toMatch(/<h1\b/)
  })

  it('páginas internas trazem a trilha de navegação', async () => {
    const { html } = await render('/politica-de-privacidade')
    expect(html).toContain('aria-label="Trilha de navegação"')
    expect(html).toContain('aria-current="page"')
  })
})

/**
 * Regras inegociáveis do projeto (EF-doc-oficial), verificadas no HTML que
 * vai para produção: corpo da página e <head> (título, metas, JSON-LD).
 */
describe('regras do projeto em todas as páginas', () => {
  it.each(prerenderTargets)('$path não usa travessões, emoji, pílulas nem selo de IA', async ({ path }) => {
    const { html, head } = await render(path)
    const output = `${head}\n${html}`

    // Travessão (—) e meia-risca (–) proibidos na copy.
    expect(output.match(/[–—].{0,40}/gu) ?? []).toEqual([])
    // Emoji: caracteres com apresentação de emoji por padrão ou forçada (VS16).
    expect(output.match(/\p{Emoji_Presentation}|️/gu) ?? []).toEqual([])
    // Botões e links em formato pílula.
    expect(output.match(/<(?:a|button)\b[^>]*class="[^"]*\brounded-full\b/g) ?? []).toEqual([])
    // Nenhum selo "Feito com IA".
    expect(output).not.toMatch(/feito com (ia|intelig[eê]ncia artificial)/i)
  })
})
