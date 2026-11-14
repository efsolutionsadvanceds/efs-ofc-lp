import { describe, expect, it } from 'vitest'

import { PRERENDERED_PAGES } from '@/config/pages'

import { buildLlmsTxt } from './llms'

describe('llms.txt', () => {
  const llms = buildLlmsTxt()

  it('segue o formato do llmstxt.org: título, resumo e seções com links', () => {
    expect(llms.startsWith('# E.F Solutions\n\n> ')).toBe(true)
    for (const heading of ['Serviços', 'Empresa', 'Conteúdos', 'Criação de sites por cidade', 'Contato']) {
      expect(llms).toContain(`\n## ${heading}\n`)
    }
  })

  it('lista todas as páginas indexáveis do site (serviços, empresa, conteúdos e cidades)', () => {
    for (const page of PRERENDERED_PAGES.filter((item) => item.sitemap && !item.noindex)) {
      expect(llms, page.path).toContain(`(https://www.efsolutions.com.br${page.path === '/' ? '/' : page.path})`)
    }
  })

  it('todos os links são absolutos e no domínio oficial', () => {
    const urls = [...llms.matchAll(/\]\(([^)]+)\)/g)].map((match) => match[1])
    expect(urls.length).toBeGreaterThan(18)
    for (const url of urls) expect(url).toMatch(/^https:\/\/www\.efsolutions\.com\.br\//)
  })

  it('sem travessões nem emoji', () => {
    expect(llms).not.toMatch(/[–—]/)
    expect(llms).not.toMatch(/\p{Extended_Pictographic}/u)
  })
})
