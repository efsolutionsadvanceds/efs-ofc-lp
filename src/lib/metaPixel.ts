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
