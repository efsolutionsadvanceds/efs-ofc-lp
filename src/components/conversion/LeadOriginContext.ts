import { createContext, useContext } from 'react'

import type { LeadOrigin } from '@/lib/whatsapp'

/**
 * Origem do contato (ex.: a cidade da página), definida pelo layout a partir
 * do registro de páginas. Todos os CTAs de WhatsApp da página leem daqui:
 * a cidade entra na mensagem e no GA4 sem cada botão precisar saber disso.
 */
export const LeadOriginContext = createContext<LeadOrigin>({})

export function useLeadOrigin(): LeadOrigin {
  return useContext(LeadOriginContext)
}
