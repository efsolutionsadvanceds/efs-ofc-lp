import { describe, expect, it } from 'vitest'

import { createThankYouState, readThankYouOrigin, readThankYouServices } from './thankYouState'

describe('estado da página de obrigado', () => {
  it('faz a ida e volta das soluções selecionadas', () => {
    expect(readThankYouServices(createThankYouState(['site', 'assistente']))).toEqual(['site', 'assistente'])
  })

  it('ignora valores inválidos vindos do history.state', () => {
    expect(readThankYouServices(null)).toEqual([])
    expect(readThankYouServices('site')).toEqual([])
    expect(readThankYouServices({ services: 'site' })).toEqual([])
    expect(readThankYouServices({ services: ['seo', 'hackeado', 42, 'site'] })).toEqual(['site', 'seo'])
  })

  it('guarda a cidade da página de origem e ignora cidades malformadas', () => {
    const city = { slug: 'campinas', name: 'Campinas' }
    expect(readThankYouOrigin(createThankYouState(['site'], { city }))).toEqual({ city })
    expect(readThankYouOrigin(createThankYouState(['site']))).toEqual({})
    expect(readThankYouOrigin({ city: 'Campinas' })).toEqual({})
    expect(readThankYouOrigin({ city: { slug: '<script>', name: 'X' } })).toEqual({})
    expect(readThankYouOrigin({ city: { slug: 'campinas', name: 42 } })).toEqual({})
    const service = { slug: 'seo-e-divulgacao', name: 'SEO e posicionamento no Google' }
    expect(readThankYouOrigin(createThankYouState(['seo'], { service }))).toEqual({ service })
  })
})
