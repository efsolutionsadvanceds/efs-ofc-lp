import { Check } from 'lucide-react'
import { useId } from 'react'

import { describeSelectionCount, SOLUTIONS } from '@/content/solutions'
import { cx } from '@/lib/cx'
import { stagger } from '@/lib/stagger'

import { useSelection } from './SelectionContext'

interface SolutionPickerProps {
  /** Deslocamento do escalonamento de entrada (itens anteriores na mesma seção). */
  staggerOffset?: number
}

/**
 * Seletor múltiplo de soluções — checkboxes nativos (teclado, leitores de
 * tela e clique no rótulo funcionam sem código extra) com aparência
 * própria. O estado visual vem do CSS (`:checked`), então a marcação
 * responde ao toque até antes da hidratação; o React só guarda a seleção
 * para montar a mensagem do WhatsApp.
 */
export function SolutionPicker({ staggerOffset = 0 }: SolutionPickerProps) {
  const { selected, toggle } = useSelection()
  const baseId = useId()

  return (
    <fieldset>
      <legend className="sr-only">Soluções de interesse — selecione uma ou mais</legend>

      <ul className="flex flex-col gap-3">
        {SOLUTIONS.map((solution, index) => {
          const titleId = `${baseId}-${solution.id}-titulo`
          const descriptionId = `${baseId}-${solution.id}-descricao`

          return (
            <li key={solution.id} data-reveal-item style={stagger(index + staggerOffset)}>
              <label
                className={cx(
                  'group relative isolate flex items-start gap-5 rounded-3xl bg-surface p-6 sm:gap-6 sm:p-7',
                  'transition-transform duration-200 ease-out active:scale-[0.99]',
                  'before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-ink before:opacity-0 before:transition-opacity before:duration-300',
                  'hover:before:opacity-[0.04] has-checked:before:opacity-[0.08]',
                  'has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-accent',
                )}
              >
                <input
                  type="checkbox"
                  name="solucoes"
                  value={solution.id}
                  checked={selected.includes(solution.id)}
                  onChange={() => toggle(solution.id)}
                  aria-labelledby={titleId}
                  aria-describedby={descriptionId}
                  className="sr-only"
                />

                <span
                  aria-hidden="true"
                  className="relative mt-0.5 grid size-7 shrink-0 place-items-center rounded-full ring-2 ring-muted/70 ring-inset"
                >
                  <span className="absolute inset-0 grid scale-50 place-items-center rounded-full bg-accent text-accent-ink opacity-0 transition-[opacity,scale] duration-300 ease-out-expo group-has-checked:scale-100 group-has-checked:opacity-100">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                </span>

                <span className="flex min-w-0 flex-col gap-1.5">
                  <span id={titleId} className="text-lead font-medium">
                    {solution.title}
                  </span>
                  <span id={descriptionId} className="text-body">
                    {solution.description}
                  </span>
                </span>
              </label>
            </li>
          )
        })}
      </ul>

      <p className="sr-only" aria-live="polite">
        {selected.length > 0 ? describeSelectionCount(selected.length) : ''}
      </p>
    </fieldset>
  )
}
