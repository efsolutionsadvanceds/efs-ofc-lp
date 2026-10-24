import { isSolutionId, sortByCatalog, type SolutionId } from '@/content/solutions'

/**
 * Estado enviado à página /obrigado pelo histórico do navegador
 * (`history.state`). Sobrevive a recarregar a página e à restauração de
 * abas descartadas, sem expor a seleção na URL.
 */
export interface ThankYouState {
  services: SolutionId[]
}

export function createThankYouState(services: readonly SolutionId[]): ThankYouState {
  return { services: [...services] }
}

/** Lê o estado de forma defensiva: `history.state` pode conter qualquer coisa. */
export function readThankYouServices(state: unknown): SolutionId[] {
  if (typeof state !== 'object' || state === null || !('services' in state)) return []
  const { services } = state as { services: unknown }
  return Array.isArray(services) ? sortByCatalog(services.filter(isSolutionId)) : []
}
