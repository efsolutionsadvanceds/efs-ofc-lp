import { describe, expect, it } from 'vitest'
import { contact } from './contact'

describe('contact.whatsappUrl', () => {
  it('aponta para o número comercial centralizado via wa.me', () => {
    expect(contact.whatsappUrl.startsWith(`https://wa.me/${contact.whatsappNumber}?`)).toBe(true)
  })

  it('contém somente dígitos no número do WhatsApp', () => {
    expect(/^\d+$/.test(contact.whatsappNumber)).toBe(true)
  })
})

describe('contact.buildWhatsAppUrl', () => {
  it('gera uma URL https válida para o domínio wa.me', () => {
    const url = contact.buildWhatsAppUrl('Olá')
    const parsed = new URL(url)

    expect(parsed.protocol).toBe('https:')
    expect(parsed.hostname).toBe('wa.me')
  })

  it('codifica acentos e caracteres especiais do português', () => {
    const url = contact.buildWhatsAppUrl('Reforma, arquitetura & construção — atenção!')
    const parsed = new URL(url)

    expect(parsed.searchParams.get('text')).toBe(
      'Reforma, arquitetura & construção — atenção!',
    )
    // A string bruta da URL nunca deve conter o "&" decodificado fora do valor do parâmetro.
    expect(url).not.toContain(' & ')
  })

  it('codifica espaços corretamente', () => {
    const url = contact.buildWhatsAppUrl('duas palavras')
    expect(url).toContain('duas+palavras')
  })

  it('preserva quebras de linha ao decodificar de volta o parâmetro', () => {
    const message = 'Linha 1\nLinha 2\nLinha 3'
    const url = contact.buildWhatsAppUrl(message)
    const parsed = new URL(url)

    expect(parsed.searchParams.get('text')).toBe(message)
  })

  it('codifica o caractere "&" sem quebrar a estrutura de query string', () => {
    const message = 'Empresa A & Empresa B'
    const url = contact.buildWhatsAppUrl(message)
    const parsed = new URL(url)

    expect(parsed.searchParams.get('text')).toBe(message)
    expect(parsed.searchParams.size).toBe(1)
  })

  it('lida com uma mensagem vazia sem lançar erro', () => {
    expect(() => contact.buildWhatsAppUrl('')).not.toThrow()
    const parsed = new URL(contact.buildWhatsAppUrl(''))
    expect(parsed.searchParams.get('text')).toBe('')
  })
})
