import { describe, expect, it } from 'vitest'

import { createThankYouState, readThankYouServices } from './thankYouState'

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
})
