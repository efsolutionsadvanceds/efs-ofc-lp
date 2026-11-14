import { describe, expect, it } from 'vitest'

import { pages, SERVICE_PAGES } from '@/config/pages'
import { confirmedSocialProfiles, site } from '@/config/site'
import { FAQ_ITEMS } from '@/content/faq'
import { SERVICES } from '@/content/services'

import { buildStructuredData } from './structuredData'

type Node = Record<string, unknown>

function graphOf(meta: Parameters<typeof buildStructuredData>[0]) {
  return buildStructuredData(meta)['@graph'] as Node[]
}

function nodeOfType(graph: Node[], type: string) {
  return graph.find((node) => node['@type'] === type)
}

describe('buildStructuredData', () => {
  it('home: ProfessionalService + WebSite + WebPage + FAQPage no mesmo @graph', () => {
    const graph = graphOf(pages.home)
    expect(graph.map((node) => node['@type'])).toEqual(['ProfessionalService', 'WebSite', 'WebPage', 'FAQPage'])
  })

  it('a empresa usa os dados reais e o catálogo de serviços, com a página de cada um', () => {
    const business = nodeOfType(graphOf(pages.home), 'ProfessionalService')!
    expect(business.name).toBe('E.F Solutions')
    expect(business.url).toBe('https://www.efsolutions.com.br/')
    expect(business.telephone).toBe('+5511967873507')
    expect(business.address).toEqual({ '@type': 'PostalAddress', addressCountry: 'BR' })
    const catalog = business.hasOfferCatalog as { itemListElement: { itemOffered: { name: string; url?: string } }[] }
    const names = catalog.itemListElement.map((offer) => offer.itemOffered.name)
    expect(names).toEqual([...SERVICES.map((service) => service.title), 'Landing pages e lojas virtuais'])
    expect(catalog.itemListElement.every((offer) => offer.itemOffered.url?.startsWith('https://www.efsolutions.com.br/'))).toBe(true)
  })

  it('sameAs só leva perfis sociais confirmados', () => {
    const business = nodeOfType(graphOf(pages.home), 'ProfessionalService')!
    const confirmed = confirmedSocialProfiles().map((profile) => profile.href)
    expect(business.sameAs ?? []).toEqual(confirmed)
    // Perfil ainda não confirmado (ou sem URL) nunca vai para o schema.
    for (const profile of site.social.filter((item) => !item.confirmed || !item.href)) {
      expect(JSON.stringify(business)).not.toContain(profile.href ?? '§sem-url§')
    }
  })

  it('FAQPage tem as 5 perguntas exibidas na página, com as mesmas respostas', () => {
    const faq = nodeOfType(graphOf(pages.home), 'FAQPage')!
    const questions = faq.mainEntity as { name: string; acceptedAnswer: { text: string } }[]
    expect(questions).toHaveLength(5)
    expect(questions.map((question) => question.name)).toEqual(FAQ_ITEMS.map((item) => item.question))
    expect(questions[0]?.acceptedAnswer.text).toBe(FAQ_ITEMS[0]?.answer)
  })

  it('páginas de serviço: Service com tipo próprio, atendendo o Brasil, como entidade principal da página', () => {
    for (const meta of SERVICE_PAGES) {
      const graph = graphOf(meta)
      const service = nodeOfType(graph, 'Service')!
      expect(service.serviceType).toBe(meta.service?.type)
      expect(service.areaServed).toEqual({ '@type': 'Country', name: 'Brasil' })
      expect(nodeOfType(graph, 'WebPage')?.mainEntity).toEqual({ '@id': service['@id'] })
    }
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
        item: 'https://www.efsolutions.com.br/politica-de-privacidade',
      },
    ])
    expect(nodeOfType(graph, 'WebPage')?.breadcrumb).toEqual({ '@id': breadcrumb['@id'] })
  })

  it('páginas noindex trazem só os dados da empresa e do site', () => {
    expect(graphOf(pages.naoEncontrada).map((node) => node['@type'])).toEqual(['ProfessionalService', 'WebSite'])
  })
})
