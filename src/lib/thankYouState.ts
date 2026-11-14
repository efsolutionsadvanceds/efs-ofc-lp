import { isSolutionId, sortByCatalog, type SolutionId } from '@/content/solutions'

import type { LeadOrigin } from './whatsapp'

/**
 * Estado enviado à página /obrigado pelo histórico do navegador
 * (`history.state`). Sobrevive a recarregar a página e à restauração de
 * abas descartadas, sem expor a seleção na URL. Leva também a cidade da
 * página de origem, para o botão "abrir o WhatsApp novamente" repetir a
 * mesma mensagem.
 */
export interface ThankYouState {
  services: SolutionId[]
  city?: { slug: string; name: string }
}

export function createThankYouState(services: readonly SolutionId[], origin: LeadOrigin = {}): ThankYouState {
  return { services: [...services], ...(origin.city ? { city: { ...origin.city } } : {}) }
}

/** Lê o estado de forma defensiva: `history.state` pode conter qualquer coisa. */
export function readThankYouServices(state: unknown): SolutionId[] {
  if (typeof state !== 'object' || state === null || !('services' in state)) return []
  const { services } = state as { services: unknown }
  return Array.isArray(services) ? sortByCatalog(services.filter(isSolutionId)) : []
}

/** Origem do contato guardada no estado (só aceita uma cidade bem formada). */
export function readThankYouOrigin(state: unknown): LeadOrigin {
  if (typeof state !== 'object' || state === null || !('city' in state)) return {}
  const { city } = state as { city: unknown }
  if (typeof city !== 'object' || city === null) return {}
  const { slug, name } = city as { slug: unknown; name: unknown }
  return typeof slug === 'string' && typeof name === 'string' && /^[a-z-]+$/.test(slug) && name.length <= 60
    ? { city: { slug, name } }
    : {}
}
