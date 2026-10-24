import { createContext, useContext } from 'react'

import type { SolutionId } from '@/content/solutions'

export interface SelectionState {
  /** Soluções marcadas, sempre na ordem do catálogo. */
  selected: readonly SolutionId[]
  toggle: (id: SolutionId) => void
  clear: () => void
}

export const SelectionContext = createContext<SelectionState | null>(null)

export function useSelection(): SelectionState {
  const context = useContext(SelectionContext)
  if (!context) {
    throw new Error('useSelection precisa ser usado dentro de <SelectionProvider>')
  }
  return context
}
