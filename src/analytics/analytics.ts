import { z } from 'zod'
import { analyticsConfig } from '../config/analyticsConfig'
import { getStoredConsent, storeConsent } from './consent'
import type { ConsentStatus } from './consent'

type GtagArgs = [string, ...unknown[]]

declare global {
  interface Window {
    dataLayer?: unknown[][]
    gtag?: (...args: GtagArgs) => void
  }
}

let currentConsent: ConsentStatus | null = null
let hasActivated = false

/**
 * Só origem + caminho — nunca query string nem fragmento, para não capturar
 * acidentalmente dados de formulário ou parâmetros de campanha sensíveis.
 * Recebe a localização como argumento (em vez de ler `window.location`
 * diretamente) para permanecer uma função pura e testável sem DOM.
 */
export function sanitizePageLocation(location: { origin: string; pathname: string }): string {
  return `${location.origin}${location.pathname}`
}

function pushToDataLayer(...args: GtagArgs): void {
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push(args)
}

function ensureGtagStub(): void {
  window.dataLayer = window.dataLayer ?? []
  if (!window.gtag) {
    window.gtag = (...args: GtagArgs) => pushToDataLayer(...args)
  }
}

function loadGoogleTagScript(measurementId: string): void {
  const existing = document.querySelector(`script[data-ga-measurement-id="${measurementId}"]`)
  if (existing) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  script.dataset.gaMeasurementId = measurementId
  document.head.appendChild(script)
}

/** Só é chamada depois que o usuário concede consentimento explicitamente. */
function activate(measurementId: string): void {
  if (hasActivated) return
  hasActivated = true

  ensureGtagStub()
  window.gtag?.('js', new Date())
  window.gtag?.('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
  })
  window.gtag?.('config', measurementId, {
    page_location: sanitizePageLocation(window.location),
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  })

  loadGoogleTagScript(measurementId)
}

/**
 * Deve ser chamada uma vez na inicialização da aplicação. Não carrega nenhum
 * script do Google — apenas reativa uma preferência de "aceitar" já
 * concedida em uma sessão anterior.
 */
export function initAnalytics(): void {
  if (!analyticsConfig.isEnabled || !analyticsConfig.measurementId) return

  currentConsent = getStoredConsent()

  if (currentConsent === 'granted') {
    activate(analyticsConfig.measurementId)
  }
}

export function grantConsent(): void {
  if (!analyticsConfig.isEnabled || !analyticsConfig.measurementId) return

  currentConsent = 'granted'
  storeConsent('granted')
  activate(analyticsConfig.measurementId)
}

export function denyConsent(): void {
  currentConsent = 'denied'
  storeConsent('denied')

  if (hasActivated) {
    window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
  }
}

export function getCurrentConsent(): ConsentStatus | null {
  return currentConsent ?? getStoredConsent()
}

export function isAnalyticsAvailable(): boolean {
  return analyticsConfig.isEnabled
}

export type AnalyticsEventName =
  | 'cta_click'
  | 'generate_lead'
  | 'form_start'
  | 'form_validation_error'
  | 'select_content'

/**
 * Lista fechada de chaves permitidas. Qualquer chave fora deste schema é
 * descartada silenciosamente pelo Zod (comportamento padrão de `z.object`),
 * o que funciona como uma rede de segurança em tempo de execução — mesmo que
 * o TypeScript seja contornado, nenhuma chave inesperada (nome, empresa,
 * contexto etc.) chega ao `gtag`.
 */
const eventParamsSchema = z.object({
  placement_id: z.string().optional(),
  content_type: z.string().optional(),
  item_id: z.string().optional(),
  error_count: z.number().optional(),
})

export type AnalyticsEventParams = z.infer<typeof eventParamsSchema>

/** Exportado à parte para ser testável independentemente do gate de consentimento. */
export function sanitizeEventParams(params: AnalyticsEventParams): AnalyticsEventParams {
  return eventParamsSchema.parse(params)
}

export function trackEvent(name: AnalyticsEventName, params: AnalyticsEventParams = {}): void {
  if (!analyticsConfig.isEnabled || currentConsent !== 'granted') return

  window.gtag?.('event', name, sanitizeEventParams(params))
}
