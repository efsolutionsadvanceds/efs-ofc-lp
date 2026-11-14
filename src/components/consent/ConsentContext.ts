import { createContext, useContext } from 'react'

import type { ConsentChoice, StoredConsent } from '@/lib/tracking'

export interface ConsentState {
  /** Escolha salva (`null`: o visitante ainda não escolheu). */
  consent: StoredConsent | null
  /** A escolha já foi lida do navegador (só depois da hidratação). */
  ready: boolean
  /** O aviso de cookies está na tela. */
  bannerVisible: boolean
  preferencesOpen: boolean
  choose: (choice: ConsentChoice) => void
  openPreferences: () => void
  closePreferences: () => void
}

export const ConsentContext = createContext<ConsentState | null>(null)

export function useConsent(): ConsentState {
  const context = useContext(ConsentContext)
  if (!context) throw new Error('useConsent precisa ser usado dentro de <ConsentProvider>')
  return context
}
