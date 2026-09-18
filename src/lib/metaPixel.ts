declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Dispara o evento padrão "Lead" do Meta Pixel após uma submissão confirmada
 * do formulário de contato (nunca no clique do botão — um clique pode falhar
 * na validação ou na rede, e isso poluiria a otimização de anúncios com
 * "leads" que não aconteceram de verdade).
 *
 * `eventId` é o mesmo identificador enviado ao servidor (ver ContactForm e
 * server/metaConversionsApi.ts) — permite ao Meta deduplicar quando o mesmo
 * evento chega tanto pelo Pixel do navegador quanto pela Conversions API.
 *
 * Silencioso se o Pixel não carregou (bloqueador de anúncios, script ainda
 * carregando) — o formulário nunca deve falhar por causa do rastreamento.
 */
export function trackLeadEvent(eventId: string): void {
  try {
    window.fbq?.('track', 'Lead', {}, { eventID: eventId })
  } catch {
    // Rastreamento nunca deve interromper o fluxo do usuário.
  }
}

/**
 * Gera um ID de evento com fallback seguro — `crypto.randomUUID()` não existe
 * em todos os navegadores/WebViews (ex.: alguns navegadores in-app mais
 * antigos usados a partir de anúncios do Instagram/Facebook). Nunca lança
 * exceção: se nada estiver disponível, cai para um ID baseado em timestamp +
 * número aleatório, suficiente para deduplicação entre Pixel e CAPI.
 */
export function generateEventId(): string {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID()
    }
    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
      const bytes = crypto.getRandomValues(new Uint8Array(16))
      return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
    }
  } catch {
    // Segue para o fallback abaixo.
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`
}
