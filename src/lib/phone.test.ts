import { describe, expect, it } from 'vitest'

import { formatBrazilianWhatsApp, isValidBrazilianWhatsApp, normalizeBrazilianWhatsApp } from './phone'

describe('normalizeBrazilianWhatsApp', () => {
  it('normaliza um número sem DDI', () => {
    expect(normalizeBrazilianWhatsApp('(11) 96787-3507')).toBe('5511967873507')
  })

  it('normaliza um número já com DDI', () => {
    expect(normalizeBrazilianWhatsApp('+55 11 96787-3507')).toBe('5511967873507')
  })

  it('aceita números de 8 dígitos (fixo/antigo)', () => {
    expect(normalizeBrazilianWhatsApp('11 6787-3507')).toBe('551167873507')
  })

  it('rejeita valores muito curtos', () => {
    expect(normalizeBrazilianWhatsApp('12345')).toBeNull()
  })

  it('rejeita DDD inválido', () => {
    expect(normalizeBrazilianWhatsApp('01 96787-3507')).toBeNull()
  })
})

describe('isValidBrazilianWhatsApp', () => {
  it('valida um número plausível', () => {
    expect(isValidBrazilianWhatsApp('(11) 96787-3507')).toBe(true)
  })

  it('invalida texto sem dígitos suficientes', () => {
    expect(isValidBrazilianWhatsApp('abc')).toBe(false)
  })
})

describe('formatBrazilianWhatsApp', () => {
  it('formata os dígitos normalizados', () => {
    expect(formatBrazilianWhatsApp('5511967873507')).toBe('+55 (11) 96787-3507')
  })
})
