import { describe, expect, it } from 'vitest'

import { buildRobotsTxt, buildSitemapXml } from '@/lib/sitemap'

import { getPageMeta, pages, PRERENDERED_PAGES } from './pages'

describe('registro de páginas (SEO)', () => {
  it('títulos e descriptions são únicos', () => {
    const titles = PRERENDERED_PAGES.map((page) => page.title)
    const descriptions = PRERENDERED_PAGES.map((page) => page.description)
    expect(new Set(titles).size).toBe(titles.length)
    expect(new Set(descriptions).size).toBe(descriptions.length)
  })

  it('títulos cabem no resultado do Google (≤ 60 caracteres) e descriptions entre 70 e 160', () => {
    for (const page of PRERENDERED_PAGES) {
      expect(page.title.length, page.title).toBeLessThanOrEqual(60)
      expect(page.description.length, page.description).toBeGreaterThanOrEqual(70)
      expect(page.description.length, page.description).toBeLessThanOrEqual(160)
    }
  })

  it('a home mira os termos de busca principais no título e na description', () => {
    expect(pages.home.title).toMatch(/^Criação de Sites/)
    expect(pages.home.title).toContain('Sistemas Sob Medida')
    for (const term of ['criação de sites profissionais para empresas', 'sistemas de gestão sob medida', 'atendente virtual', 'WhatsApp', 'Google']) {
      expect(pages.home.description.toLowerCase()).toContain(term.toLowerCase())
    }
  })

  it('páginas noindex nunca entram no sitemap', () => {
    for (const page of PRERENDERED_PAGES.filter((item) => item.noindex)) {
      expect(page.sitemap).toBeUndefined()
    }
  })

  it('getPageMeta normaliza barra final e manda caminhos desconhecidos para a 404', () => {
    expect(getPageMeta('/')).toBe(pages.home)
    expect(getPageMeta('/privacidade/')).toBe(pages.privacidade)
    expect(getPageMeta('/nao-existe')).toBe(pages.naoEncontrada)
    expect(getPageMeta('/404')).toBe(pages.naoEncontrada)
  })
})

describe('sitemap.xml e robots.txt', () => {
  it('o sitemap lista só as páginas indexáveis, com URL absoluta e lastmod', () => {
    const xml = buildSitemapXml(PRERENDERED_PAGES)
    expect(xml).toContain('<loc>https://www.efsolutions.com.br/</loc>')
    expect(xml).toContain('<loc>https://www.efsolutions.com.br/privacidade</loc>')
    expect(xml).toContain('<loc>https://www.efsolutions.com.br/termos</loc>')
    expect(xml).not.toContain('/obrigado')
    expect(xml).not.toContain('/404')
    expect(xml.match(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g)).toHaveLength(3)
  })

  it('o robots.txt libera o rastreamento e aponta o sitemap', () => {
    expect(buildRobotsTxt()).toBe('User-agent: *\nAllow: /\n\nSitemap: https://www.efsolutions.com.br/sitemap.xml\n')
  })
})
