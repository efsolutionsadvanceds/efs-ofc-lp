import { describe, expect, it } from 'vitest'

import { describeSelectionCount, sortByCatalog } from '@/content/solutions'

import { buildLeadMessage, buildLeadUrl, buildWhatsAppUrl, GENERIC_LEAD_MESSAGE } from './whatsapp'

describe('buildLeadMessage', () => {
  it('usa a mensagem genérica quando nada foi selecionado', () => {
    expect(buildLeadMessage([])).toBe(GENERIC_LEAD_MESSAGE)
  })

  it('lista as soluções na ordem do catálogo, não na ordem dos cliques', () => {
    expect(buildLeadMessage(['seo', 'site', 'assistente'])).toBe(
      [
        'Olá, E.F Solutions! Vim pelo site e quero um orçamento.',
        '',
        '*Soluções de interesse:*',
        '• Site profissional otimizado para o Google',
        '• Assistente virtual com IA para atendimento 24h',
        '• SEO e posicionamento no Google',
        '',
        'Podemos conversar?',
      ].join('\n'),
    )
  })

  it('não usa emoji (alguns apps de desktop corrompem emoji em links do wa.me)', () => {
    const message = buildLeadMessage(['site', 'sistema', 'assistente', 'loja', 'automacao', 'seo'])
    expect(message).not.toMatch(/\p{Extended_Pictographic}/u)
  })
})

describe('buildWhatsAppUrl', () => {
  it('codifica espaços como %20 e quebras de linha como %0A', () => {
    const url = buildWhatsAppUrl('Olá, tudo bem?\nSim', '5511999999999')
    expect(url).toBe('https://wa.me/5511999999999?text=Ol%C3%A1%2C%20tudo%20bem%3F%0ASim')
  })

  it('aponta para o número configurado e preserva a mensagem completa', () => {
    const url = new URL(buildLeadUrl(['loja']))
    expect(url.origin + url.pathname).toBe('https://wa.me/5511967873507')
    expect(url.searchParams.get('text')).toBe(buildLeadMessage(['loja']))
  })
})

describe('catálogo de soluções', () => {
  it('sortByCatalog remove duplicados e respeita a ordem do catálogo', () => {
    expect(sortByCatalog(['seo', 'site', 'seo', 'loja'])).toEqual(['site', 'loja', 'seo'])
  })

  it('describeSelectionCount flexiona singular e plural', () => {
    expect(describeSelectionCount(1)).toBe('1 solução selecionada')
    expect(describeSelectionCount(3)).toBe('3 soluções selecionadas')
  })
})
