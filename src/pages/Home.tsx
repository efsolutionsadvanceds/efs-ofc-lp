import { ConversionBar } from '@/components/conversion/ConversionBar'
import { ClosingSection } from '@/components/sections/ClosingSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { PrinciplesSection } from '@/components/sections/PrinciplesSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { SolutionsSection } from '@/components/sections/SolutionsSection'

/**
 * Landing page. Fluxo: promessa → seleção das soluções → como funciona →
 * diferenciais → objeções (FAQ) → fechamento. Título, description, Open
 * Graph e schema desta rota vêm de src/config/pages.ts (`pages.home`).
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <SolutionsSection />
      <ProcessSection />
      <PrinciplesSection />
      <FaqSection />
      <ClosingSection />
      <ConversionBar />
    </>
  )
}
