import { describe, expect, it } from 'vitest'

import { applyConsent, CONSENT_STORAGE_KEY, readConsent, trackPixelPageView, writeConsent, type TrackingConfig } from './tracking'

/** localStorage em memória. */
function memoryStorage(initial: Record<string, string> = {}): Storage {
  const data = new Map(Object.entries(initial))
  return {
    get length() {
      return data.size
    },
    clear: () => data.clear(),
    getItem: (key) => data.get(key) ?? null,
    key: (index) => [...data.keys()][index] ?? null,
    removeItem: (key) => void data.delete(key),
    setItem: (key, value) => void data.set(key, String(value)),
  }
}

/** Documento e janela mínimos: registram scripts, cookies e chamadas. */
function fakeBrowser(cookies: string[] = []) {
  const scripts: Record<string, { src: string }> = {}
  const cookieWrites: string[] = []
  const doc = {
    head: { appendChild: (script: { id: string; src: string }) => (scripts[script.id] = script) },
    createElement: () => ({ id: '', src: '', async: false }),
    getElementById: (id: string) => scripts[id] ?? null,
    get cookie() {
      return cookies.join('; ')
    },
    set cookie(value: string) {
      cookieWrites.push(value)
    },
  }
  const win = { location: { hostname: 'www.efsolutions.com.br' } } as unknown as Window & Record<string, unknown>
  return { doc: doc as unknown as Document, win, scripts, cookieWrites }
}

const CONFIG: TrackingConfig = { gaMeasurementId: 'G-TESTE1234', metaPixelId: '1613382170484651' }

/** Chamadas enfileiradas no Pixel (antes do fbevents.js chegar). */
function pixelQueue(win: Window): unknown[][] {
  return ((win.fbq?.queue ?? []) as IArguments[]).map((args) => [...args])
}

describe('armazenamento da escolha', () => {
  it('sem escolha salva, o aviso deve aparecer', () => {
    expect(readConsent(memoryStorage())).toBeNull()
  })

  it('salva e lê a escolha', () => {
    const storage = memoryStorage()
    writeConsent({ analytics: true, marketing: false }, storage, new Date('2026-11-14T12:00:00Z'))
    expect(readConsent(storage, Date.parse('2026-11-20T12:00:00Z'))).toEqual({
      version: 1,
      analytics: true,
      marketing: false,
      updatedAt: '2026-11-14T12:00:00.000Z',
    })
  })

  it('a escolha expira em 12 meses e valores inválidos são ignorados', () => {
    const storage = memoryStorage()
    writeConsent({ analytics: true, marketing: true }, storage, new Date('2025-11-01T00:00:00Z'))
    expect(readConsent(storage, Date.parse('2026-11-14T00:00:00Z'))).toBeNull()
    expect(readConsent(memoryStorage({ [CONSENT_STORAGE_KEY]: '{quebrado' }))).toBeNull()
    expect(readConsent(memoryStorage({ [CONSENT_STORAGE_KEY]: JSON.stringify({ version: 1, analytics: 'sim' }) }))).toBeNull()
  })

  it('sem localStorage disponível, não lança exceção', () => {
    expect(() => writeConsent({ analytics: true, marketing: true }, null)).not.toThrow()
    expect(readConsent(null)).toBeNull()
  })
})

describe('carregamento das ferramentas', () => {
  it('recusando tudo, nada do Google nem da Meta é carregado', () => {
    const { doc, win, scripts } = fakeBrowser()
    applyConsent({ analytics: false, marketing: false }, CONFIG, doc, win)
    expect(Object.keys(scripts)).toEqual([])
    expect(win.gtag).toBeUndefined()
    expect(win.fbq).toBeUndefined()
  })

  it('só medição: carrega o GA4 com Consent Mode (padrão negado, depois só a medição liberada)', () => {
    const { doc, win, scripts } = fakeBrowser()
    applyConsent({ analytics: true, marketing: false }, CONFIG, doc, win)
    expect(scripts['efs-ga4']?.src).toBe('https://www.googletagmanager.com/gtag/js?id=G-TESTE1234')
    expect(scripts['efs-meta-pixel']).toBeUndefined()

    const queue = (win.dataLayer as IArguments[]).map((args) => [...args])
    expect(queue[0]).toEqual([
      'consent',
      'default',
      { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' },
    ])
    expect(queue[1]).toEqual([
      'consent',
      'update',
      { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' },
    ])
    expect(queue.some(([command, id]) => command === 'config' && id === 'G-TESTE1234')).toBe(true)
  })

  it('só marketing: carrega o Meta Pixel e registra o PageView', () => {
    const { doc, win, scripts } = fakeBrowser()
    applyConsent({ analytics: false, marketing: true }, CONFIG, doc, win)
    expect(scripts['efs-meta-pixel']?.src).toBe('https://connect.facebook.net/en_US/fbevents.js')
    expect(scripts['efs-ga4']).toBeUndefined()
    const queue = pixelQueue(win)
    expect(queue).toEqual([['consent', 'grant'], ['init', '1613382170484651'], ['track', 'PageView']])
  })

  it('revogar desliga as ferramentas já carregadas e apaga os cookies delas', () => {
    const { doc, win, cookieWrites } = fakeBrowser(['_ga=GA1.1.1', '_ga_TESTE1234=GS1.1', '_fbp=fb.1.2', 'outro=1'])
    applyConsent({ analytics: true, marketing: true }, CONFIG, doc, win)
    applyConsent({ analytics: false, marketing: false }, CONFIG, doc, win)

    expect(win['ga-disable-G-TESTE1234']).toBe(true)
    expect(pixelQueue(win).at(-1)).toEqual(['consent', 'revoke'])
    const cleared = new Set(cookieWrites.map((write) => write.split('=')[0]))
    expect([...cleared].sort()).toEqual(['_fbp', '_ga', '_ga_TESTE1234'])
    expect(cookieWrites.every((write) => write.includes('Max-Age=0'))).toBe(true)
  })

  it('o PageView das navegações internas só dispara com o Pixel carregado', () => {
    const { doc, win } = fakeBrowser()
    trackPixelPageView(doc, win)
    expect(win.fbq).toBeUndefined()

    applyConsent({ analytics: false, marketing: true }, CONFIG, doc, win)
    trackPixelPageView(doc, win)
    const queue = pixelQueue(win)
    expect(queue.filter(([, event]) => event === 'PageView')).toHaveLength(2)
  })

  it('sem IDs configurados, nada é carregado mesmo com consentimento', () => {
    const { doc, win, scripts } = fakeBrowser()
    applyConsent({ analytics: true, marketing: true }, { gaMeasurementId: null, metaPixelId: null }, doc, win)
    expect(Object.keys(scripts)).toEqual([])
  })
})
