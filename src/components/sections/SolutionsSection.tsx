import { SolutionPicker } from '@/components/conversion/SolutionPicker'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SECTION_IDS } from '@/config/sections'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { stagger } from '@/lib/stagger'

/**
 * Coração da conversão: o visitante marca o que precisa e a barra fixa
 * monta a mensagem do WhatsApp em tempo real (lógica em
 * src/components/conversion/ — esta seção só cuida do layout).
 */
export function SolutionsSection() {
  const { ref, revealState } = useRevealOnScroll<HTMLElement>()

  return (
    <section
      ref={ref}
      data-reveal={revealState}
      id={SECTION_IDS.solutions}
      aria-labelledby="solucoes-titulo"
      className="frame section-space"
    >
      <SectionHeader
        id="solucoes-titulo"
        title="Monte seu orçamento"
        muted="sem preencher formulário."
        lead="Marque o que a sua empresa precisa. A mensagem chega pronta no WhatsApp e você recebe o retorno por lá."
      />

      <div className="mt-12 md:mt-16">
        <SolutionPicker staggerOffset={2} />
      </div>

      <p data-reveal-item style={stagger(9)} className="mt-6 font-mono text-micro text-muted">
        Ainda não sabe por onde começar? Envie sem selecionar nada — a gente ajuda a definir.
      </p>
    </section>
  )
}
