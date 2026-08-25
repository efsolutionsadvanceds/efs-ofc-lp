import { describe, expect, it } from 'vitest'
import { isAnalyticsAvailable, sanitizeEventParams, sanitizePageLocation, trackEvent } from './analytics'

describe('sanitizePageLocation', () => {
  it('mantém apenas origem e caminho', () => {
    const result = sanitizePageLocation({
      origin: 'https://efsa.com.br',
      pathname: '/contato',
    })

    expect(result).toBe('https://efsa.com.br/contato')
  })

  it('nunca inclui query string, mesmo que a origem/caminho a contenham indiretamente', () => {
    const result = sanitizePageLocation({
      origin: 'https://efsa.com.br',
      pathname: '/',
    })

    expect(result).not.toContain('?')
    expect(result).not.toContain('#')
  })
})

describe('sanitizeEventParams', () => {
  it('preserva apenas as chaves permitidas', () => {
    const result = sanitizeEventParams({ placement_id: 'hero_primary', item_id: 'faq-1' })

    expect(result).toEqual({ placement_id: 'hero_primary', item_id: 'faq-1' })
  })

  it('descarta qualquer chave que não faça parte do schema permitido (nunca envia dados de formulário)', () => {
    const dirtyParams = {
      placement_id: 'form_submit',
      // Simula um uso indevido tentando vazar dados pessoais pelo mesmo objeto.
      nome: 'Maria da Silva',
      empresa: 'Reformas Silva Ltda',
      contexto: 'Texto livre do formulário',
      telefone: '11999999999',
    } as Record<string, unknown>

    const result = sanitizeEventParams(dirtyParams as never)

    expect(result).toEqual({ placement_id: 'form_submit' })
    expect(result).not.toHaveProperty('nome')
    expect(result).not.toHaveProperty('empresa')
    expect(result).not.toHaveProperty('contexto')
    expect(result).not.toHaveProperty('telefone')
  })

  it('aceita a contagem de erros como número', () => {
    const result = sanitizeEventParams({ error_count: 2 })
    expect(result).toEqual({ error_count: 2 })
  })
})

describe('trackEvent sem configuração válida', () => {
  it('não lança mesmo sem `window`/`document` disponíveis (ambiente Node)', () => {
    expect(() => trackEvent('cta_click', { placement_id: 'hero_primary' })).not.toThrow()
  })

  it('isAnalyticsAvailable reflete a ausência de VITE_GA_MEASUREMENT_ID neste ambiente de teste', () => {
    expect(isAnalyticsAvailable()).toBe(false)
  })
})
