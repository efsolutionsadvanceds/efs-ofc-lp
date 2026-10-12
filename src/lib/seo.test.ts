import { describe, expect, it } from 'vitest'

import {
  buildBreadcrumbStructuredData,
  buildOrganizationStructuredData,
  buildServiceStructuredData,
  buildWebsiteStructuredData,
} from './seo'

describe('buildOrganizationStructuredData', () => {
  it('usa o nome e domínio reais da E.F Solutions', () => {
    const data = buildOrganizationStructuredData()
    expect(data.name).toBe('E.F Solutions')
    expect(data.url).toBe('https://www.efsolutions.com.br/')
  })
})

describe('buildWebsiteStructuredData', () => {
  it('usa o domínio real como url', () => {
    const data = buildWebsiteStructuredData()
    expect(data['@type']).toBe('WebSite')
    expect(data.url).toBe('https://www.efsolutions.com.br/')
  })
})

describe('buildServiceStructuredData', () => {
  it('monta a url absoluta a partir do path da rota', () => {
    const data = buildServiceStructuredData({
      name: 'Criação de sites',
      description: 'Sites profissionais para empresas.',
      path: '/criacao-de-sites',
    })
    expect(data.url).toBe('https://www.efsolutions.com.br/criacao-de-sites')
    expect(data.provider.name).toBe('E.F Solutions')
  })
})

describe('buildBreadcrumbStructuredData', () => {
  it('gera um ListItem por item, na ordem informada', () => {
    const data = buildBreadcrumbStructuredData([
      { name: 'Início', path: '/' },
      { name: 'Criação de sites', path: '/criacao-de-sites' },
    ])
    expect(data.itemListElement).toHaveLength(2)
    expect(data.itemListElement[0]).toMatchObject({ position: 1, name: 'Início' })
    expect(data.itemListElement[1]?.item).toBe('https://www.efsolutions.com.br/criacao-de-sites')
  })
})
