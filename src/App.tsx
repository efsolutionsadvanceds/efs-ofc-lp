import { lazy, Suspense } from 'react'

import { SiteHeader } from '@/components/layout/SiteHeader'
import { SkipLink } from '@/components/layout/SkipLink'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustStripSection } from '@/components/sections/TrustStripSection'
import { StructuredData } from '@/components/seo/StructuredData'

const BelowFoldContent = lazy(() => import('@/components/sections/BelowFoldContent'))
const SiteFooter = lazy(() =>
  import('@/components/layout/SiteFooter').then((module) => ({ default: module.SiteFooter })),
)

export default function App() {
  return (
    <>
      <StructuredData />
      <SkipLink />
      <SiteHeader />
      <main id="conteudo-principal">
        <HeroSection />
        <TrustStripSection />
        <Suspense fallback={null}>
          <BelowFoldContent />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <SiteFooter />
      </Suspense>
    </>
  )
}
