import type { SolutionId } from '@/content/solutions'

import { generateEventId, trackContactEvent } from './metaPixel'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

/** Onde o clique aconteceu — vira o parâmetro `cta_location` no GA4. */
export type CtaLocation = 'hero' | 'sticky_bar' | 'closing' | 'footer' | 'not_found' | 'thank_you' | 'article'

type EventParams = Record<string, string | number | boolean>

/**
 * Envia um evento ao Google Analytics 4. O gtag.js só existe quando
 * `VITE_GA_MEASUREMENT_ID` foi configurado no build (ver vite.config.ts) —
 * sem ele, ou com o script bloqueado por extensão, a chamada é ignorada.
 * Rastreamento nunca pode interromper o fluxo do usuário.
 */
export function trackEvent(name: string, params: EventParams = {}): void {
  try {
    window.gtag?.('event', name, params)
  } catch {
    // Silencioso de propósito.
  }
}

interface WhatsAppLeadInput {
  services: readonly SolutionId[]
  location: CtaLocation
  /** Slug da cidade, quando o clique vem de uma página de cidade. */
  city?: string
  /** Slug do serviço, quando o clique vem de uma página de serviço. */
  service?: string
  /** Slug do artigo, quando o clique vem da área de conteúdos. */
  article?: string
}

/**
 * Conversão principal do site: clique que abre o WhatsApp.
 * - GA4: evento recomendado `generate_lead` (marque-o como "evento-chave"
 *   no GA4 para usá-lo como conversão, inclusive no Google Ads). Nas
 *   páginas de cidade, serviço e artigo, leva `page_city`, `page_service`
 *   ou `page_article` (crie as dimensões personalizadas no GA4);
 * - Meta Pixel: evento padrão `Contact`, com ID único por clique para
 *   deduplicação caso a API de Conversões seja adotada no futuro.
 */
export function trackWhatsAppLead({ services, location, city, service, article }: WhatsAppLeadInput): void {
  trackEvent('generate_lead', {
    lead_source: 'whatsapp',
    cta_location: location,
    selected_services: services.length > 0 ? services.join(',') : 'nenhuma',
    services_count: services.length,
    ...(city ? { page_city: city } : {}),
    ...(service ? { page_service: service } : {}),
    ...(article ? { page_article: article } : {}),
  })
  trackContactEvent(generateEventId())
}
