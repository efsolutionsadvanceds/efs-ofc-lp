/**
 * Consentimento de cookies e carregamento das ferramentas de medição.
 *
 * Nada de rastreamento carrega antes da escolha do visitante:
 * - Medição (Google Analytics 4): só com `analytics`. Consent Mode v2 no
 *   modo básico: o gtag.js nem é baixado antes do aceite; ao carregar, o
 *   padrão é tudo negado e só então a escolha é aplicada.
 * - Marketing (Meta Pixel): só com `marketing`. O fbevents.js nem é
 *   baixado antes do aceite.
 * - Revogar desliga a ferramenta já carregada (opt-out oficial do GA4 e
 *   `consent revoke` do Pixel) e apaga os cookies dela (_ga, _fbp).
 *
 * A escolha fica no localStorage do navegador por 12 meses (depois disso,
 * o aviso volta). Nenhum dado é enviado a servidor nosso.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
    fbq?: FacebookPixel
    _fbq?: FacebookPixel
  }
}

interface FacebookPixel {
  (...args: unknown[]): void
  callMethod?: (...args: unknown[]) => void
  queue: unknown[]
  push: FacebookPixel
  loaded: boolean
  version: string
}

export interface ConsentChoice {
  /** Medição de uso (Google Analytics 4). */
  analytics: boolean
  /** Medição de anúncios (Meta Pixel). */
  marketing: boolean
}

export interface StoredConsent extends ConsentChoice {
  version: 1
  /** Data da escolha (ISO 8601). */
  updatedAt: string
}

export const CONSENT_STORAGE_KEY = 'efsolutions:consentimento'
const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000

/** Pixel já publicado no site; `VITE_META_PIXEL_ID` permite trocar sem editar código. */
const DEFAULT_META_PIXEL_ID = '1613382170484651'

export interface TrackingConfig {
  gaMeasurementId: string | null
  metaPixelId: string | null
}

function validId(value: string | undefined, pattern: RegExp): string | null {
  const id = value?.trim()
  return id && pattern.test(id) ? id : null
}

export const trackingConfig: TrackingConfig = {
  gaMeasurementId: validId(import.meta.env.VITE_GA_MEASUREMENT_ID, /^G-[A-Z0-9]{4,}$/),
  metaPixelId: validId(import.meta.env.VITE_META_PIXEL_ID || DEFAULT_META_PIXEL_ID, /^\d{6,20}$/),
}

function browserStorage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage
  } catch {
    // Armazenamento bloqueado (alguns modos privados): a escolha vale só nesta visita.
    return null
  }
}

/** Escolha salva e ainda válida, ou `null` (o aviso deve aparecer). */
export function readConsent(storage: Storage | null = browserStorage(), now: number = Date.now()): StoredConsent | null {
  try {
    const raw = storage?.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const data: unknown = JSON.parse(raw)
    if (typeof data !== 'object' || data === null) return null
    const { version, analytics, marketing, updatedAt } = data as Record<string, unknown>
    if (version !== 1 || typeof analytics !== 'boolean' || typeof marketing !== 'boolean' || typeof updatedAt !== 'string') {
      return null
    }
    const time = Date.parse(updatedAt)
    if (!Number.isFinite(time) || now - time > CONSENT_MAX_AGE_MS) return null
    return { version: 1, analytics, marketing, updatedAt }
  } catch {
    return null
  }
}

export function writeConsent(
  choice: ConsentChoice,
  storage: Storage | null = browserStorage(),
  now: Date = new Date(),
): StoredConsent {
  const record: StoredConsent = { version: 1, analytics: choice.analytics, marketing: choice.marketing, updatedAt: now.toISOString() }
  try {
    storage?.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record))
  } catch {
    // Sem armazenamento: a escolha vale só nesta visita.
  }
  return record
}

const GA_SCRIPT_ID = 'efs-ga4'
const PIXEL_SCRIPT_ID = 'efs-meta-pixel'

function addScript(doc: Document, id: string, src: string): void {
  if (doc.getElementById(id)) return
  const script = doc.createElement('script')
  script.id = id
  script.async = true
  script.src = src
  doc.head.appendChild(script)
}

/** Apaga os cookies da ferramenta (no host atual e no domínio principal). */
export function clearCookies(prefixes: readonly string[], doc: Document, hostname: string): void {
  const names = doc.cookie
    .split(';')
    .map((cookie) => cookie.split('=')[0]?.trim() ?? '')
    .filter((name) => prefixes.some((prefix) => name === prefix || name.startsWith(`${prefix}_`)))
  const domains = ['', hostname, `.${hostname.replace(/^www\./, '')}`]
  for (const name of names) {
    for (const domain of domains) {
      doc.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`
    }
  }
}

function googleConsent(choice: ConsentChoice) {
  const ads = choice.marketing ? 'granted' : 'denied'
  return {
    analytics_storage: choice.analytics ? 'granted' : 'denied',
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  }
}

function applyGoogleAnalytics(id: string, choice: ConsentChoice, doc: Document, win: Window): void {
  const loaded = doc.getElementById(GA_SCRIPT_ID) !== null
  const optOutFlag = `ga-disable-${id}`
  ;(win as unknown as Record<string, unknown>)[optOutFlag] = !choice.analytics

  if (!choice.analytics) {
    if (loaded) {
      win.gtag?.('consent', 'update', googleConsent(choice))
      clearCookies(['_ga'], doc, win.location.hostname)
    }
    return
  }

  if (!loaded) {
    win.dataLayer = win.dataLayer ?? []
    const dataLayer = win.dataLayer
    // O gtag.js espera o objeto `arguments` na fila (formato oficial do snippet).
    win.gtag = function gtag() {
      // oxlint-disable-next-line prefer-rest-params
      dataLayer.push(arguments)
    }
    win.gtag('consent', 'default', googleConsent({ analytics: false, marketing: false }))
    win.gtag('consent', 'update', googleConsent(choice))
    win.gtag('js', new Date())
    win.gtag('config', id)
    addScript(doc, GA_SCRIPT_ID, `https://www.googletagmanager.com/gtag/js?id=${id}`)
    return
  }
  win.gtag?.('consent', 'update', googleConsent(choice))
}

function applyMetaPixel(id: string, choice: ConsentChoice, doc: Document, win: Window): void {
  const loaded = doc.getElementById(PIXEL_SCRIPT_ID) !== null

  if (!choice.marketing) {
    if (loaded) {
      win.fbq?.('consent', 'revoke')
      clearCookies(['_fbp', '_fbc'], doc, win.location.hostname)
    }
    return
  }

  if (loaded) {
    win.fbq?.('consent', 'grant')
    return
  }

  // Equivalente ao snippet oficial do Meta Pixel, criado só depois do aceite.
  if (!win.fbq) {
    const fbq = function (this: unknown) {
      // oxlint-disable-next-line prefer-rest-params
      if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments as unknown as unknown[])
      // oxlint-disable-next-line prefer-rest-params
      else fbq.queue.push(arguments)
    } as unknown as FacebookPixel
    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.queue = []
    win.fbq = fbq
    if (!win._fbq) win._fbq = fbq
  }
  win.fbq('consent', 'grant')
  win.fbq('init', id)
  win.fbq('track', 'PageView')
  addScript(doc, PIXEL_SCRIPT_ID, 'https://connect.facebook.net/en_US/fbevents.js')
}

/** Aplica a escolha: carrega, mantém ou desliga cada ferramenta. */
export function applyConsent(
  choice: ConsentChoice,
  config: TrackingConfig = trackingConfig,
  doc: Document = document,
  win: Window = window,
): void {
  try {
    if (config.gaMeasurementId) applyGoogleAnalytics(config.gaMeasurementId, choice, doc, win)
    if (config.metaPixelId) applyMetaPixel(config.metaPixelId, choice, doc, win)
  } catch {
    // Rastreamento nunca pode quebrar a página.
  }
}

/**
 * PageView do Pixel nas navegações internas (o GA4 registra as dele pela
 * Medição otimizada). Só dispara se o Pixel foi carregado com consentimento.
 */
export function trackPixelPageView(doc: Document = document, win: Window = window): void {
  try {
    if (doc.getElementById(PIXEL_SCRIPT_ID)) win.fbq?.('track', 'PageView')
  } catch {
    // Silencioso de propósito.
  }
}
