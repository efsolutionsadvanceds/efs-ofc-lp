import { describe, expect, it } from 'vitest'
import { priorityOptions, segmentOptions } from '../data/conversionForm'
import {
  COMPANY_MAX_LENGTH,
  CONTEXT_MAX_LENGTH,
  NAME_MAX_LENGTH,
  parseConversionForm,
} from './conversionFormSchema'

const validPayload = {
  nome: 'Maria da Silva',
  empresa: 'Reformas Silva Ltda',
  segmento: segmentOptions[0],
  prioridade: priorityOptions[0],
  contexto: 'Preciso de um site novo.',
}

describe('parseConversionForm', () => {
  it('aceita um payload totalmente válido', () => {
    const result = parseConversionForm(validPayload)

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.nome).toBe('Maria da Silva')
      expect(result.data.contexto).toBe('Preciso de um site novo.')
    }
  })

  it('rejeita nome contendo apenas espaços em branco', () => {
    const result = parseConversionForm({ ...validPayload, nome: '    ' })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors.nome).toBe('Informe o seu nome.')
    }
  })

  it('rejeita empresa contendo apenas espaços em branco', () => {
    const result = parseConversionForm({ ...validPayload, empresa: '   \t  ' })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors.empresa).toBe('Informe o nome da empresa.')
    }
  })

  it('aceita nome exatamente no limite máximo de caracteres', () => {
    const nome = 'A'.repeat(NAME_MAX_LENGTH)
    const result = parseConversionForm({ ...validPayload, nome })

    expect(result.success).toBe(true)
  })

  it('rejeita nome que excede o limite máximo de caracteres', () => {
    const nome = 'A'.repeat(NAME_MAX_LENGTH + 1)
    const result = parseConversionForm({ ...validPayload, nome })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors.nome).toContain(String(NAME_MAX_LENGTH))
    }
  })

  it('aceita empresa exatamente no limite máximo de caracteres', () => {
    const empresa = 'B'.repeat(COMPANY_MAX_LENGTH)
    const result = parseConversionForm({ ...validPayload, empresa })

    expect(result.success).toBe(true)
  })

  it('rejeita empresa que excede o limite máximo de caracteres', () => {
    const empresa = 'B'.repeat(COMPANY_MAX_LENGTH + 1)
    const result = parseConversionForm({ ...validPayload, empresa })

    expect(result.success).toBe(false)
  })

  it('aceita contexto exatamente no limite máximo de caracteres', () => {
    const contexto = 'C'.repeat(CONTEXT_MAX_LENGTH)
    const result = parseConversionForm({ ...validPayload, contexto })

    expect(result.success).toBe(true)
  })

  it('rejeita contexto que excede o limite máximo de caracteres', () => {
    const contexto = 'C'.repeat(CONTEXT_MAX_LENGTH + 1)
    const result = parseConversionForm({ ...validPayload, contexto })

    expect(result.success).toBe(false)
  })

  it('rejeita um segmento fora do conjunto permitido', () => {
    const result = parseConversionForm({ ...validPayload, segmento: 'Segmento inventado' })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors.segmento).toBe('Selecione o segmento principal.')
    }
  })

  it('rejeita uma prioridade fora do conjunto permitido', () => {
    const result = parseConversionForm({ ...validPayload, prioridade: 'Prioridade inventada' })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors.prioridade).toBe('Selecione a prioridade mais importante neste momento.')
    }
  })

  it('aceita o contexto omitido (string vazia)', () => {
    const result = parseConversionForm({ ...validPayload, contexto: '' })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.contexto).toBe('')
    }
  })

  it('remove espaços nas extremidades dos campos de texto', () => {
    const result = parseConversionForm({
      ...validPayload,
      nome: '  Maria da Silva  ',
      empresa: '  Reformas Silva Ltda  ',
      contexto: '  Preciso de ajuda  ',
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.nome).toBe('Maria da Silva')
      expect(result.data.empresa).toBe('Reformas Silva Ltda')
      expect(result.data.contexto).toBe('Preciso de ajuda')
    }
  })
})
