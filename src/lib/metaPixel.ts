declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Dispara o evento padrão "Contact" do Meta Pixel quando o visitante clica no
 * botão principal do WhatsApp — o evento correto para "visitante iniciou
 * contato", já que o site não coleta mais dados de um formulário (não há
 * "Lead" sem dados de lead). Silencioso se o Pixel não carregou (bloqueador
 * de anúncios, script ainda carregando) — o botão nunca deve falhar por
 * causa do rastreamento.
 */
export function trackContactEvent(eventId: string): void {
  try {
    window.fbq?.('track', 'Contact', {}, { eventID: eventId })
  } catch {
    // Rastreamento nunca deve interromper o fluxo do usuário.
  }
}

/**
 * Gera um ID de evento com fallback seguro — `crypto.randomUUID()` não existe
 * em todos os navegadores/WebViews (ex.: alguns navegadores in-app mais
 * antigos usados a partir de anúncios do Instagram/Facebook). Nunca lança
 * exceção: se nada estiver disponível, cai para um ID baseado em timestamp +
 * número aleatório — evita contar o mesmo clique duas vezes caso o evento
 * seja reenviado.
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
