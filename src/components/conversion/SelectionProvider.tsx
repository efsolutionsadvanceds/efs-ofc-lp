import { useCallback, useMemo, useState, type ReactNode } from 'react'

import { sortByCatalog, type SolutionId } from '@/content/solutions'

import { SelectionContext } from './SelectionContext'

const NONE: readonly SolutionId[] = []

interface SelectionProviderProps {
  children: ReactNode
  /** Soluções já marcadas pela página atual (ex.: o serviço da página), até o visitante mexer. */
  defaults?: readonly SolutionId[]
}

/**
 * Estado da seleção de soluções, compartilhado entre o seletor, a barra fixa
 * de conversão e os CTAs. Fica no layout (acima das rotas) para a escolha
 * sobreviver à navegação.
 *
 * Enquanto o visitante não mexe, a seleção é a sugerida pela página
 * (`defaults`): já vem marcada no HTML pré-renderizado e no link do
 * WhatsApp, sem efeito depois da hidratação. Ao primeiro toque, a seleção
 * passa a ser dele e acompanha a navegação.
 */
export function SelectionProvider({ children, defaults = NONE }: SelectionProviderProps) {
  const [chosen, setChosen] = useState<readonly SolutionId[] | null>(null)
  const selected = chosen ?? defaults

  const toggle = useCallback(
    (id: SolutionId) => {
      setChosen((current) => {
        const base = current ?? defaults
        return base.includes(id) ? base.filter((item) => item !== id) : sortByCatalog([...base, id])
      })
    },
    [defaults],
  )

  const clear = useCallback(() => setChosen([]), [])

  const value = useMemo(() => ({ selected, toggle, clear }), [selected, toggle, clear])

  return <SelectionContext value={value}>{children}</SelectionContext>
}
