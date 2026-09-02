import { ComparisonSection } from './ComparisonSection'
import { FaqSection } from './FaqSection'
import { FinalCtaSection } from './FinalCtaSection'
import { ImpactSection } from './ImpactSection'
import { LegalSection } from './LegalSection'
import { ObjectionsSection } from './ObjectionsSection'
import { PerceptionSection } from './PerceptionSection'
import { ProblemsSection } from './ProblemsSection'
import { ProcessSection } from './ProcessSection'
import { ProofSection } from './ProofSection'
import { SegmentsSection } from './SegmentsSection'
import { ShowcaseSection } from './ShowcaseSection'
import { SolutionsSection } from './SolutionsSection'
import { WhyEfSection } from './WhyEfSection'

/**
 * Tudo que fica abaixo da hero/trust-strip é agrupado em um único chunk
 * carregado sob demanda (React.lazy, em App.tsx). Mantém o caminho crítico
 * inicial pequeno — a hero é interativa antes de este código ser buscado.
 *
 * Ordem segue a sequência comercial: reconhecimento → valor da presença
 * digital → soluções → jornada → objeções → prova visual → suporte → CTA
 * final. Perception/Impact seguem como conteúdo de apoio, sem reordenar a
 * sequência principal.
 */
export default function BelowFoldContent() {
  return (
    <>
      <ProblemsSection />
      <WhyEfSection />
      <ComparisonSection />
      <SolutionsSection />
      <SegmentsSection />
      <ProcessSection />
      <ObjectionsSection />
      <FaqSection />
      <ShowcaseSection />
      <PerceptionSection />
      <ImpactSection />
      <ProofSection />
      <FinalCtaSection />
      <LegalSection />
    </>
  )
}
