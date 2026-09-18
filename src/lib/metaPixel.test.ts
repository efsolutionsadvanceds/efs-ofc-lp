import { afterEach, describe, expect, it, vi } from 'vitest'

import { generateEventId, trackLeadEvent } from './metaPixel'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('generateEventId', () => {
  it('usa crypto.randomUUID quando disponível', () => {
    const id = generateEventId()
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)
  })

  it('nunca lança exceção e sempre retorna um ID não vazio quando crypto.randomUUID não existe', () => {
    const originalCrypto = globalThis.crypto
    vi.stubGlobal('crypto', {
      ...originalCrypto,
      randomUUID: undefined,
      getRandomValues: undefined,
    })

    expect(() => generateEventId()).not.toThrow()
    const id = generateEventId()
    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
  })

  it('gera IDs diferentes em chamadas sucessivas mesmo no fallback', () => {
    vi.stubGlobal('crypto', { randomUUID: undefined, getRandomValues: undefined })
    const first = generateEventId()
    const second = generateEventId()
    expect(first).not.toBe(second)
  })
})

describe('trackLeadEvent', () => {
  it('não lança exceção quando window.fbq não está definido', () => {
    vi.stubGlobal('window', {})
    expect(() => trackLeadEvent('test-id')).not.toThrow()
  })

  it('não lança exceção quando window.fbq lança erro internamente', () => {
    vi.stubGlobal('window', {
      fbq: () => {
        throw new Error('blocked by extension')
      },
    })
    expect(() => trackLeadEvent('test-id')).not.toThrow()
  })

  it('chama fbq com o evento Lead e o eventID informado', () => {
    const fbqSpy = vi.fn()
    vi.stubGlobal('window', { fbq: fbqSpy })

    trackLeadEvent('shared-event-id')

    expect(fbqSpy).toHaveBeenCalledWith('track', 'Lead', {}, { eventID: 'shared-event-id' })
  })
})
