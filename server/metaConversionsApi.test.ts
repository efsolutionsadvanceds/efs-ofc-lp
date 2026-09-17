import { afterEach, describe, expect, it, vi } from 'vitest'

import type { ContactRequestPayload } from '../src/schemas/contactFormSchema'
import { sendLeadEventToMetaCapi } from './metaConversionsApi'

const basePayload: ContactRequestPayload = {
  name: 'Ana Ferreira',
  company: 'Ferreira Arquitetura',
  whatsapp: '(11) 96787-3507',
  helpType: 'site-ou-landing-page',
  description: '',
  consent: true,
  website: '',
  formRenderedAt: Date.now() - 5000,
  metaEventId: 'test-event-id',
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('sendLeadEventToMetaCapi', () => {
  it('retorna not-configured sem tentar rede quando as variáveis de ambiente estão ausentes', async () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)

    const result = await sendLeadEventToMetaCapi(basePayload, {
      eventId: 'test-event-id',
      clientIp: '203.0.113.10',
      userAgent: 'test-agent',
    })

    expect(result).toEqual({ ok: false, reason: 'not-configured' })
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('envia o telefone apenas como hash SHA-256, nunca em texto puro', async () => {
    vi.stubEnv('META_PIXEL_ID', '123456')
    vi.stubEnv('META_CAPI_ACCESS_TOKEN', 'fake-token-for-test')

    const fetchSpy = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchSpy)

    const result = await sendLeadEventToMetaCapi(basePayload, {
      eventId: 'test-event-id',
      clientIp: '203.0.113.10',
      userAgent: 'test-agent',
    })

    expect(result).toEqual({ ok: true })
    expect(fetchSpy).toHaveBeenCalledTimes(1)

    const [url, init] = fetchSpy.mock.calls[0] as [string, RequestInit]
    expect(url).toBe('https://graph.facebook.com/v21.0/123456/events')

    const body = JSON.parse(init.body as string)
    expect(body.access_token).toBe('fake-token-for-test')

    const event = body.data[0]
    expect(event.event_name).toBe('Lead')
    expect(event.event_id).toBe('test-event-id')
    expect(event.action_source).toBe('website')

    // Nunca em texto puro: nem os dígitos do WhatsApp, nem o próprio valor original.
    const rawBody = init.body as string
    expect(rawBody).not.toContain('967873507')
    expect(rawBody).not.toContain('(11) 96787-3507')
    expect(event.user_data.ph[0]).toMatch(/^[a-f0-9]{64}$/)
    expect(event.user_data.client_ip_address).toBe('203.0.113.10')
    expect(event.user_data.client_user_agent).toBe('test-agent')
  })

  it('nunca lança erro quando a chamada de rede falha', async () => {
    vi.stubEnv('META_PIXEL_ID', '123456')
    vi.stubEnv('META_CAPI_ACCESS_TOKEN', 'fake-token-for-test')
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('network down')),
    )

    const result = await sendLeadEventToMetaCapi(basePayload, {
      eventId: 'test-event-id',
      clientIp: '203.0.113.10',
    })

    expect(result).toEqual({ ok: false, reason: 'dispatch-failed' })
  })
})
