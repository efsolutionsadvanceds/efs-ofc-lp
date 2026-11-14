import { isSolutionId, sortByCatalog, type SolutionId } from '@/content/solutions'

import type { LeadOrigin } from './whatsapp'

/**
 * Estado enviado à página /obrigado pelo histórico do navegador
 * (`history.state`). Sobrevive a recarregar a página e à restauração de
 * abas descartadas, sem expor a seleção na URL. Leva também a página de
 * origem (cidade, serviço ou artigo), para o botão "abrir o WhatsApp
 * novamente" repetir a mesma mensagem.
 */
export interface ThankYouState extends LeadOrigin {
  services: SolutionId[]
}

export function createThankYouState(services: readonly SolutionId[], origin: LeadOrigin = {}): ThankYouState {
  return { ...origin, services: [...services] }
}

/** Lê o estado de forma defensiva: `history.state` pode conter qualquer coisa. */
export function readThankYouServices(state: unknown): SolutionId[] {
  if (typeof state !== 'object' || state === null || !('services' in state)) return []
  const { services } = state as { services: unknown }
  return Array.isArray(services) ? sortByCatalog(services.filter(isSolutionId)) : []
}

function readPage(value: unknown): { slug: string; name: string } | null {
  if (typeof value !== 'object' || value === null) return null
  const { slug, name } = value as { slug: unknown; name: unknown }
  return typeof slug === 'string' && typeof name === 'string' && /^[a-z0-9-]+$/.test(slug) && name.length <= 140
    ? { slug, name }
    : null
}

/** Origem do contato guardada no estado (só aceita páginas bem formadas). */
export function readThankYouOrigin(state: unknown): LeadOrigin {
  if (typeof state !== 'object' || state === null) return {}
  const { city, service, article } = state as Record<string, unknown>
  const origin: LeadOrigin = {}
  const [cityPage, servicePage, articlePage] = [readPage(city), readPage(service), readPage(article)]
  if (cityPage) origin.city = cityPage
  if (servicePage) origin.service = servicePage
  if (articlePage) origin.article = articlePage
  return origin
}
