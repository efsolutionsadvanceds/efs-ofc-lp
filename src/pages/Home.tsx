import { ConversionBar } from '@/components/conversion/ConversionBar'
import { ClosingSection } from '@/components/sections/ClosingSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { SolutionsSection } from '@/components/sections/SolutionsSection'

/**
 * Landing page, curta e direta: promessa (H1 com os termos de busca) →
 * serviços → orçamento por seleção → como funciona → dúvidas → fechamento.
 * Título, description, Open Graph e schema desta rota vêm de
 * src/config/pages.ts (`pages.home`).
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <SolutionsSection />
      <ProcessSection />
      <FaqSection />
      <ClosingSection />
      <ConversionBar />
    </>
  )
}
