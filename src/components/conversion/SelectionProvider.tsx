import { useCallback, useMemo, useState, type ReactNode } from 'react'

import { sortByCatalog, type SolutionId } from '@/content/solutions'

import { SelectionContext } from './SelectionContext'

/**
 * Estado da seleção de soluções, compartilhado entre o seletor, a barra fixa
 * de conversão e o CTA final. Fica no layout (acima das rotas) para a
 * escolha sobreviver a uma ida e volta às páginas legais.
 */
export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<readonly SolutionId[]>([])

  const toggle = useCallback((id: SolutionId) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : sortByCatalog([...current, id]),
    )
  }, [])

  const clear = useCallback(() => setSelected([]), [])

  const value = useMemo(() => ({ selected, toggle, clear }), [selected, toggle, clear])

  return <SelectionContext value={value}>{children}</SelectionContext>
}
