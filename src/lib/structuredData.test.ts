import { describe, expect, it } from 'vitest'

import { pages } from '@/config/pages'
import { FAQ_ITEMS } from '@/content/faq'
import { SOLUTIONS } from '@/content/solutions'

import { buildStructuredData } from './structuredData'

type Node = Record<string, unknown>

function graphOf(meta: Parameters<typeof buildStructuredData>[0]) {
  return buildStructuredData(meta)['@graph'] as Node[]
}

function nodeOfType(graph: Node[], type: string) {
  return graph.find((node) => node['@type'] === type)
}

describe('buildStructuredData', () => {
  it('home: LocalBusiness + WebSite + WebPage + FAQPage no mesmo @graph', () => {
    const graph = graphOf(pages.home)
    expect(graph.map((node) => node['@type'])).toEqual(['LocalBusiness', 'WebSite', 'WebPage', 'FAQPage'])
  })

  it('LocalBusiness usa os dados reais da empresa e o catálogo de soluções', () => {
    const business = nodeOfType(graphOf(pages.home), 'LocalBusiness')!
    expect(business.name).toBe('E.F Solutions')
    expect(business.url).toBe('https://www.efsolutions.com.br/')
    expect(business.telephone).toBe('+5511967873507')
    expect(business.address).toEqual({ '@type': 'PostalAddress', addressCountry: 'BR' })
    const catalog = business.hasOfferCatalog as { itemListElement: unknown[] }
    expect(catalog.itemListElement).toHaveLength(SOLUTIONS.length)
  })

  it('FAQPage tem as 5 perguntas exibidas na página, com as mesmas respostas', () => {
    const faq = nodeOfType(graphOf(pages.home), 'FAQPage')!
    const questions = faq.mainEntity as { name: string; acceptedAnswer: { text: string } }[]
    expect(questions).toHaveLength(5)
    expect(questions.map((question) => question.name)).toEqual(FAQ_ITEMS.map((item) => item.question))
    expect(questions[0]?.acceptedAnswer.text).toBe(FAQ_ITEMS[0]?.answer)
  })

  it('páginas internas indexáveis ganham BreadcrumbList ligada à WebPage', () => {
    const graph = graphOf(pages.privacidade)
    const breadcrumb = nodeOfType(graph, 'BreadcrumbList')!
    expect(breadcrumb.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.efsolutions.com.br/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Política de Privacidade',
        item: 'https://www.efsolutions.com.br/privacidade',
      },
    ])
    expect(nodeOfType(graph, 'WebPage')?.breadcrumb).toEqual({ '@id': breadcrumb['@id'] })
  })

  it('páginas noindex trazem só os dados da empresa e do site', () => {
    expect(graphOf(pages.naoEncontrada).map((node) => node['@type'])).toEqual(['LocalBusiness', 'WebSite'])
  })
})
