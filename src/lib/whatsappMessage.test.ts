import { describe, expect, it } from 'vitest'

import { buildLeadWhatsAppMessage } from './whatsappMessage'

describe('buildLeadWhatsAppMessage', () => {
  it('inclui nome, empresa, tipo de ajuda e descrição quando todos preenchidos', () => {
    const message = buildLeadWhatsAppMessage({
      name: 'Ana Ferreira',
      company: 'Ferreira Arquitetura',
      helpType: 'site-ou-landing-page',
      description: 'Preciso de um site novo.',
    })

    expect(message).toContain('Ana Ferreira')
    expect(message).toContain('Ferreira Arquitetura')
    expect(message).toContain('Site ou landing page')
    expect(message).toContain('Preciso de um site novo.')
  })

  it('omite empresa e descrição quando ausentes, sem deixar linhas vazias', () => {
    const message = buildLeadWhatsAppMessage({
      name: 'Ana Ferreira',
      company: '',
      helpType: 'site-ou-landing-page',
      description: '',
    })

    expect(message).not.toContain('Empresa:')
    expect(message).not.toContain('Descrição:')
    expect(message.split('\n').some((line) => line.trim() === '')).toBe(false)
  })

  it('preserva acentos e caracteres especiais em português', () => {
    const message = buildLeadWhatsAppMessage({
      name: 'José Ação',
      company: 'Construção & Reforma Ltda.',
      helpType: 'sistema-sob-medida',
      description: 'Preciso organizar orçamentos, prazos e aprovações — tudo em um só lugar.',
    })

    expect(message).toContain('José Ação')
    expect(message).toContain('Construção & Reforma Ltda.')
    expect(message).toContain('orçamentos, prazos e aprovações — tudo em um só lugar.')
  })

  it('preserva quebras de linha dentro da descrição', () => {
    const message = buildLeadWhatsAppMessage({
      name: 'Ana',
      company: '',
      helpType: 'agente-de-ia',
      description: 'Linha 1\nLinha 2',
    })

    expect(message).toContain('Linha 1\nLinha 2')
  })

  it('gera uma URL do WhatsApp codificada uma única vez, sem dupla codificação', () => {
    const message = buildLeadWhatsAppMessage({
      name: 'José Ação',
      company: '',
      helpType: 'site-ou-landing-page',
      description: '',
    })

    const params = new URLSearchParams({ text: message })
    const encoded = params.toString()

    // "%C3%A9" é o "é" de "José" codificado uma vez — dupla codificação
    // produziria "%25C3%25A9" (o "%" também seria escapado).
    expect(encoded).toContain('Jos%C3%A9')
    expect(encoded).not.toContain('%25')
  })
})
