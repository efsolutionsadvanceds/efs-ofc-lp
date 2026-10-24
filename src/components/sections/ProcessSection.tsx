import { SECTION_IDS } from '@/config/sections'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { stagger } from '@/lib/stagger'

const STEPS = [
  {
    term: 'Você escolhe',
    text: 'Marque as soluções que fazem sentido para o seu negócio. Pode ser uma só ou várias.',
  },
  {
    term: 'A conversa começa',
    text: 'O WhatsApp abre com a sua seleção já escrita. Você confere a mensagem e envia.',
  },
  {
    term: 'Você recebe a proposta',
    text: 'Entendemos o seu cenário e enviamos escopo, prazo e investimento definidos por escrito.',
  },
]

/** Como o contato funciona — reduz a ansiedade bem no momento da decisão. */
export function ProcessSection() {
  const { ref, revealState } = useRevealOnScroll<HTMLElement>()

  return (
    <section
      ref={ref}
      data-reveal={revealState}
      id={SECTION_IDS.process}
      aria-labelledby="como-funciona-titulo"
      className="section-space bg-surface"
    >
      <div className="frame">
        <h2 id="como-funciona-titulo" data-reveal-item style={stagger(0)} className="max-w-[13.25em] text-title">
          Do clique à proposta, sem burocracia.
        </h2>

        <dl className="mt-14 flex flex-col gap-10 md:mt-20 md:gap-14">
          {STEPS.map((step, index) => (
            <div
              key={step.term}
              data-reveal-item
              style={stagger(index + 1)}
              className="grid gap-2 md:grid-cols-12 md:gap-6"
            >
              <dt className="text-lead font-semibold md:col-span-4">{step.term}</dt>
              <dd className="max-w-[29em] text-lead md:col-span-7 md:col-start-6">{step.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
