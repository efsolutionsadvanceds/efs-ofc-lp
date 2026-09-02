import { describe, expect, it } from 'vitest'

import { contactFormSchema, contactRequestSchema } from './contactFormSchema'

const validValues = {
  name: 'Ana Ferreira',
  company: 'Ferreira Arquitetura',
  whatsapp: '(11) 96787-3507',
  helpType: 'site-ou-landing-page' as const,
  description: '',
  consent: true as const,
}

describe('contactFormSchema', () => {
  it('aceita dados válidos', () => {
    expect(contactFormSchema.safeParse(validValues).success).toBe(true)
  })

  it('aceita sem empresa informada', () => {
    expect(contactFormSchema.safeParse({ ...validValues, company: '' }).success).toBe(true)
  })

  it('rejeita nome muito curto', () => {
    const result = contactFormSchema.safeParse({ ...validValues, name: 'A' })
    expect(result.success).toBe(false)
  })

  it('rejeita WhatsApp inválido', () => {
    const result = contactFormSchema.safeParse({ ...validValues, whatsapp: '123' })
    expect(result.success).toBe(false)
  })

  it('rejeita tipo de ajuda fora da lista', () => {
    const result = contactFormSchema.safeParse({ ...validValues, helpType: 'inexistente' })
    expect(result.success).toBe(false)
  })

  it('exige consentimento explícito (não aceita false)', () => {
    const result = contactFormSchema.safeParse({ ...validValues, consent: false })
    expect(result.success).toBe(false)
  })

  it('aceita descrição ausente (campo opcional)', () => {
    const { description: _description, ...withoutDescription } = validValues
    expect(contactFormSchema.safeParse(withoutDescription).success).toBe(true)
  })

  it('aceita descrição preenchida', () => {
    const result = contactFormSchema.safeParse({
      ...validValues,
      description: 'Preciso de um site que gere mais pedidos de orçamento qualificados.',
    })
    expect(result.success).toBe(true)
  })

  it('rejeita descrição acima de 500 caracteres', () => {
    const result = contactFormSchema.safeParse({ ...validValues, description: 'a'.repeat(501) })
    expect(result.success).toBe(false)
  })
})

describe('contactRequestSchema', () => {
  it('exige honeypot vazio e formRenderedAt numérico', () => {
    const result = contactRequestSchema.safeParse({
      ...validValues,
      website: '',
      formRenderedAt: Date.now(),
    })
    expect(result.success).toBe(true)
  })

  it('rejeita quando o honeypot está preenchido', () => {
    const result = contactRequestSchema.safeParse({
      ...validValues,
      website: 'spam',
      formRenderedAt: Date.now(),
    })
    expect(result.success).toBe(false)
  })
})
