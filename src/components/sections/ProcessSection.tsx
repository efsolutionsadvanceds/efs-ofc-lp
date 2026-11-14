import { SectionHeader } from '@/components/ui/SectionHeader'
import { StepNode, VectorProcess } from '@/components/vectors/VectorProcess'
import { SECTION_IDS } from '@/config/sections'
import { cx } from '@/lib/cx'

const STEPS = [
  {
    title: 'Você seleciona',
    text: 'Marque as soluções que fazem sentido para o seu negócio. Pode ser uma só ou várias.',
  },
  {
    title: 'Conversamos no WhatsApp',
    text: 'A mensagem abre pronta com a sua seleção. Você envia e a conversa começa.',
  },
  {
    title: 'Você recebe a proposta',
    text: 'Escopo, prazo e investimento definidos por escrito, antes de qualquer compromisso.',
  },
]

/**
 * Como o contato funciona: três passos num painel único dividido por bordas
 * de 1px, ligados por uma trilha que acende em sequência quando o painel
 * aparece (vertical no celular, horizontal no desktop).
 */
export function ProcessSection() {
  return (
    <section id={SECTION_IDS.process} aria-labelledby="como-funciona-titulo" className="frame section-space">
      <SectionHeader id="como-funciona-titulo" title="Do clique à proposta" muted="sem burocracia." />

      <VectorProcess className="mt-12 md:mt-16">
        <ol className="grid grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-surface md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className={cx(
                // --pad: o padding do passo, também usado para posicionar a trilha.
                'relative grid grid-cols-[2.5rem_1fr] gap-x-5 p-(--pad) [--pad:1.5rem] sm:[--pad:2rem] md:block',
                index > 0 && 'border-t border-white/10 md:border-t-0 md:border-l',
              )}
            >
              <StepNode index={index} last={index === STEPS.length - 1} />
              <div className="md:mt-8">
                <span className="font-mono text-micro text-accent">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 text-lead font-semibold">{step.title}</h3>
                <p className="mt-2 max-w-[24em] text-body text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </VectorProcess>
    </section>
  )
}
