import { afterEach, describe, expect, it, vi } from 'vitest'

import { handleContactRequest, resolveCorsOrigin } from './contactHandler'

const basePayload = {
  name: 'Ana Ferreira',
  company: 'Ferreira Reformas',
  whatsapp: '(11) 96787-3507',
  helpType: 'site-ou-landing-page',
  description: 'Recebemos pedidos pelo WhatsApp, mas os orçamentos acabam se perdendo na conversa.',
  consent: true,
  website: '',
  formRenderedAt: Date.now() - 5000,
}

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('handleContactRequest', () => {
  it('retorna 503 quando nenhum provedor está configurado', async () => {
    vi.stubEnv('CONTACT_PROVIDER', 'none')
    const result = await handleContactRequest({ body: basePayload, ip: '10.0.0.1' })
    expect(result.statusCode).toBe(503)
    expect(result.body.ok).toBe(false)
  })

  it('rejeita quando o honeypot está preenchido', async () => {
    const result = await handleContactRequest({
      body: { ...basePayload, website: 'spam-bot' },
      ip: '10.0.0.2',
    })
    expect(result.statusCode).toBe(400)
  })

  it('rejeita envio rápido demais (provável bot)', async () => {
    const result = await handleContactRequest({
      body: { ...basePayload, formRenderedAt: Date.now() },
      ip: '10.0.0.3',
    })
    expect(result.statusCode).toBe(400)
  })

  it('rejeita payload inválido', async () => {
    const result = await handleContactRequest({
      body: { ...basePayload, whatsapp: '123' },
      ip: '10.0.0.4',
    })
    expect(result.statusCode).toBe(400)
  })

  it('aplica limite de taxa após muitas tentativas do mesmo IP', async () => {
    const ip = '10.0.0.5'
    for (let i = 0; i < 5; i += 1) {
      await handleContactRequest({ body: basePayload, ip })
    }
    const result = await handleContactRequest({ body: basePayload, ip })
    expect(result.statusCode).toBe(429)
  })
})

describe('resolveCorsOrigin', () => {
  it('permite a origem de desenvolvimento do Vite', () => {
    expect(resolveCorsOrigin('http://localhost:5173')).toBe('http://localhost:5173')
  })

  it('permite uma origem presente em ALLOWED_ORIGIN', () => {
    vi.stubEnv('ALLOWED_ORIGIN', 'https://www.efsolutions.com.br')
    expect(resolveCorsOrigin('https://www.efsolutions.com.br')).toBe('https://www.efsolutions.com.br')
  })

  it('rejeita uma origem fora da allowlist', () => {
    vi.stubEnv('ALLOWED_ORIGIN', 'https://www.efsolutions.com.br')
    expect(resolveCorsOrigin('https://malicioso.example')).toBeNull()
  })
})
