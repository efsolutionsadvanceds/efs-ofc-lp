import { SECTION_IDS } from '@/config/sections'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { stagger } from '@/lib/stagger'

const PRINCIPLES = [
  {
    title: 'Desempenho medido',
    text: 'Sites leves e rápidos, construídos para os indicadores de qualidade do Google e para quem acessa pelo celular.',
  },
  {
    title: 'Feito para o seu processo',
    text: 'Nada de adaptar a sua empresa a um software genérico: cada sistema nasce da forma como você trabalha.',
  },
  {
    title: 'IA com propósito',
    text: 'Assistentes e automações aplicados a tarefas reais do dia a dia, sempre com a sua equipe no controle.',
  },
]

/** Por que a E.F Solutions — princípios de trabalho, sem provas inventadas. */
export function PrinciplesSection() {
  const { ref, revealState } = useRevealOnScroll<HTMLElement>()

  return (
    <section
      ref={ref}
      data-reveal={revealState}
      id={SECTION_IDS.principles}
      aria-labelledby="diferenciais-titulo"
      className="frame section-space"
    >
      <h2 id="diferenciais-titulo" data-reveal-item style={stagger(0)} className="max-w-[12em] text-title">
        Engenharia de verdade, não modelo pronto.
      </h2>

      <ul className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-8 lg:gap-12">
        {PRINCIPLES.map((principle, index) => (
          <li key={principle.title} data-reveal-item style={stagger(index + 1)}>
            <h3 className="text-lead font-semibold">{principle.title}</h3>
            <p className="mt-3 max-w-[25em] text-body">{principle.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
