import { SectionHeader } from '@/components/ui/SectionHeader'
import { SECTION_IDS } from '@/config/sections'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { cx } from '@/lib/cx'
import { stagger } from '@/lib/stagger'

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

/** Como o contato funciona — três passos num painel único dividido por bordas de 1px. */
export function ProcessSection() {
  const { ref, revealState } = useRevealOnScroll<HTMLElement>()

  return (
    <section
      ref={ref}
      data-reveal={revealState}
      id={SECTION_IDS.process}
      aria-labelledby="como-funciona-titulo"
      className="frame section-space"
    >
      <SectionHeader id="como-funciona-titulo" title="Do clique à proposta" muted="sem burocracia." />

      <ol className="mt-12 grid grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-surface md:mt-16 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            data-reveal-item
            style={stagger(index + 1)}
            className={cx('p-6 sm:p-8', index > 0 && 'border-t border-white/10 md:border-t-0 md:border-l')}
          >
            <span className="font-mono text-micro text-accent">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="mt-8 text-lead font-semibold">{step.title}</h3>
            <p className="mt-2 max-w-[24em] text-body text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
