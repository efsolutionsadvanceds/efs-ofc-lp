import { describe, expect, it } from 'vitest'
import { priorityOptions, segmentOptions } from '../data/conversionForm'
import { contact } from '../config/contact'
import { buildWhatsAppFormMessage } from './whatsappMessage'

const baseData = {
  nome: 'Maria da Silva',
  empresa: 'Reformas Silva Ltda',
  segmento: segmentOptions[0],
  prioridade: priorityOptions[0],
  contexto: 'Preciso modernizar o site.',
}

describe('buildWhatsAppFormMessage', () => {
  it('inclui todos os campos preenchidos na mensagem final', () => {
    const message = buildWhatsAppFormMessage(baseData)

    expect(message).toContain('Nome: Maria da Silva')
    expect(message).toContain('Empresa: Reformas Silva Ltda')
    expect(message).toContain(`Segmento: ${segmentOptions[0]}`)
    expect(message).toContain(`Principal prioridade: ${priorityOptions[0]}`)
    expect(message).toContain('Contexto: Preciso modernizar o site.')
  })

  it('usa "Não informado" quando o contexto está vazio', () => {
    const message = buildWhatsAppFormMessage({ ...baseData, contexto: '' })

    expect(message).toContain('Contexto: Não informado')
  })

  it('nunca inclui um valor de contexto vazio sem o texto de fallback', () => {
    const message = buildWhatsAppFormMessage({ ...baseData, contexto: '' })

    expect(message).not.toMatch(/Contexto:\s*$/m)
  })

  it('gera uma URL do WhatsApp que preserva a mensagem completa após decodificação', () => {
    const message = buildWhatsAppFormMessage(baseData)
    const url = contact.buildWhatsAppUrl(message)
    const parsed = new URL(url)

    expect(parsed.searchParams.get('text')).toBe(message)
  })

  it('preserva acentuação e caracteres especiais do português na URL final', () => {
    const message = buildWhatsAppFormMessage({
      ...baseData,
      empresa: 'Construção & Reformas Ápice',
      contexto: 'Atendimento em várias frentes: aquisição, atenção e operação.',
    })
    const url = contact.buildWhatsAppUrl(message)
    const parsed = new URL(url)

    expect(parsed.searchParams.get('text')).toBe(message)
  })
})
