import { afterEach, describe, expect, it, vi } from 'vitest'

import { trackEvent, trackWhatsAppLead } from './analytics'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('trackEvent', () => {
  it('não lança exceção sem gtag (GA4 não configurado ou bloqueado)', () => {
    vi.stubGlobal('window', {})
    expect(() => trackEvent('qualquer')).not.toThrow()
  })

  it('não lança exceção quando o gtag falha internamente', () => {
    vi.stubGlobal('window', {
      gtag: () => {
        throw new Error('bloqueado')
      },
    })
    expect(() => trackEvent('qualquer')).not.toThrow()
  })
})

describe('trackWhatsAppLead', () => {
  it('envia generate_lead ao GA4 e Contact ao Meta Pixel', () => {
    const gtag = vi.fn()
    const fbq = vi.fn()
    vi.stubGlobal('window', { gtag, fbq })

    trackWhatsAppLead({ services: ['site', 'seo'], location: 'sticky_bar' })

    expect(gtag).toHaveBeenCalledWith('event', 'generate_lead', {
      lead_source: 'whatsapp',
      cta_location: 'sticky_bar',
      selected_services: 'site,seo',
      services_count: 2,
    })
    expect(fbq).toHaveBeenCalledWith('track', 'Contact', {}, { eventID: expect.any(String) })
  })

  it('envia page_city só quando o clique vem de uma página de cidade', () => {
    const gtag = vi.fn()
    vi.stubGlobal('window', { gtag })

    trackWhatsAppLead({ services: ['site'], location: 'hero', city: 'campinas' })
    trackWhatsAppLead({ services: ['site'], location: 'hero' })

    expect(gtag.mock.calls[0]?.[2]).toEqual(expect.objectContaining({ page_city: 'campinas' }))
    expect(gtag.mock.calls[1]?.[2]).not.toHaveProperty('page_city')
  })

  it('registra "nenhuma" quando o contato acontece sem seleção', () => {
    const gtag = vi.fn()
    vi.stubGlobal('window', { gtag })

    trackWhatsAppLead({ services: [], location: 'hero' })

    expect(gtag).toHaveBeenCalledWith('event', 'generate_lead', expect.objectContaining({ selected_services: 'nenhuma', services_count: 0 }))
  })
})
