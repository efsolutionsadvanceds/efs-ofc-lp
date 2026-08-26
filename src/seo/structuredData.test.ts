import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const rootDir = fileURLToPath(new URL('../../', import.meta.url))
const indexHtml = readFileSync(resolve(rootDir, 'index.html'), 'utf-8')
const robotsTxt = readFileSync(resolve(rootDir, 'public', 'robots.txt'), 'utf-8')
const sitemapXml = readFileSync(resolve(rootDir, 'public', 'sitemap.xml'), 'utf-8')

const CANONICAL_URL = 'https://www.efsolutions.com.br/'

function extractJsonLd(html: string): unknown {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
  if (!match) {
    throw new Error('Bloco JSON-LD não encontrado em index.html')
  }
  return JSON.parse(match[1])
}

describe('index.html — metadados essenciais', () => {
  it('declara lang="pt-BR"', () => {
    expect(indexHtml).toContain('lang="pt-BR"')
  })

  it('não usa noindex acidentalmente', () => {
    expect(indexHtml).not.toMatch(/name="robots"[^>]*noindex/i)
    expect(indexHtml).toContain('index, follow')
  })

  it('declara exatamente uma tag canonical', () => {
    const matches = indexHtml.match(/rel="canonical"/g) ?? []
    expect(matches.length).toBe(1)
  })

  it('usa a mesma URL canônica em og:url e na tag canonical', () => {
    expect(indexHtml).toContain(`href="${CANONICAL_URL}"`)
    expect(indexHtml).toContain(`content="${CANONICAL_URL}"`)
  })

  it('não referencia nenhuma URL de produção em http:// (não seguro)', () => {
    expect(indexHtml).not.toMatch(/http:\/\/efsa\.com\.br/)
  })
})

describe('JSON-LD Organization', () => {
  const data = extractJsonLd(indexHtml) as Record<string, unknown>

  it('é um JSON válido e parseável', () => {
    expect(data).toBeTypeOf('object')
  })

  it('declara o tipo Organization com contexto schema.org', () => {
    expect(data['@context']).toBe('https://schema.org')
    expect(data['@type']).toBe('Organization')
  })

  it('usa a mesma URL canônica do restante da página', () => {
    expect(data.url).toBe(CANONICAL_URL)
  })

  it('não inclui campos não verificados (endereço, telefone, avaliações, prêmios)', () => {
    expect(data).not.toHaveProperty('address')
    expect(data).not.toHaveProperty('telephone')
    expect(data).not.toHaveProperty('aggregateRating')
    expect(data).not.toHaveProperty('review')
    expect(data).not.toHaveProperty('award')
    expect(data).not.toHaveProperty('sameAs')
  })
})

describe('robots.txt e sitemap.xml', () => {
  it('robots.txt permite rastreamento geral e referencia o sitemap de produção', () => {
    expect(robotsTxt).toContain('Allow: /')
    expect(robotsTxt).toContain(`Sitemap: ${CANONICAL_URL}sitemap.xml`)
  })

  it('sitemap.xml contém apenas a URL canônica de produção', () => {
    const locMatches = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
    expect(locMatches).toEqual([CANONICAL_URL])
  })

  it('sitemap.xml não contém URLs de desenvolvimento (localhost)', () => {
    expect(sitemapXml).not.toMatch(/localhost|127\.0\.0\.1/)
  })
})
