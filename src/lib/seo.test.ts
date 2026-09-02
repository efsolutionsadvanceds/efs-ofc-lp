import { describe, expect, it } from 'vitest'

import { FAQ_ITEMS } from '@/content/faq'

import { buildFaqStructuredData, buildOrganizationStructuredData } from './seo'

describe('buildFaqStructuredData', () => {
  it('gera uma entidade Question para cada item visível do FAQ', () => {
    const data = buildFaqStructuredData()
    expect(data['@type']).toBe('FAQPage')
    expect(data.mainEntity).toHaveLength(FAQ_ITEMS.length)
    expect(data.mainEntity[0]?.name).toBe(FAQ_ITEMS[0]?.question)
    expect(data.mainEntity[0]?.acceptedAnswer.text).toBe(FAQ_ITEMS[0]?.answer)
  })
})

describe('buildOrganizationStructuredData', () => {
  it('usa o nome e domínio reais da E.F Solutions', () => {
    const data = buildOrganizationStructuredData()
    expect(data.name).toBe('E.F Solutions')
    expect(data.url).toBe('https://www.efsolutions.com.br/')
  })
})
