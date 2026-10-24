import { SolutionPicker } from '@/components/conversion/SolutionPicker'
import { SECTION_IDS } from '@/config/sections'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { stagger } from '@/lib/stagger'

/**
 * Coração da conversão: o visitante marca o que precisa e a barra fixa
 * monta a mensagem do WhatsApp em tempo real. No desktop, o texto de apoio
 * fica fixo à esquerda enquanto a lista de opções rola à direita.
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
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-12">
            <h2 id="solucoes-titulo" data-reveal-item style={stagger(0)} className="max-w-[10em] text-title">
              O que sua empresa precisa agora?
            </h2>
            <p data-reveal-item style={stagger(1)} className="mt-6 max-w-[24em] text-lead">
              Selecione uma ou mais soluções. Montamos a mensagem com a sua escolha e você envia direto pelo WhatsApp
              — sem formulário.
            </p>
            <p data-reveal-item style={stagger(2)} className="mt-6 max-w-[25em] text-small text-muted">
              Ainda não sabe por onde começar? Envie sem selecionar nada: a gente ajuda a definir.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SolutionPicker staggerOffset={2} />
        </div>
      </div>
    </section>
  )
}
