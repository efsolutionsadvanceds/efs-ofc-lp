import { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  denyConsent,
  getCurrentConsent,
  grantConsent,
  initAnalytics,
  isAnalyticsAvailable,
} from './analytics/analytics'
import { ConsentBanner } from './components/analytics/ConsentBanner'
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { BusinessDiagnosisSection } from './components/sections/BusinessDiagnosisSection'
import { ConversionSection } from './components/sections/ConversionSection'
import { DifferentialsSection } from './components/sections/DifferentialsSection'
import { FaqSection } from './components/sections/FaqSection'
import { HeroSection } from './components/sections/HeroSection'
import { SolutionArchitectureSection } from './components/sections/SolutionArchitectureSection'
import { WorkProcessSection } from './components/sections/WorkProcessSection'

const SkipLink = styled.a`
  position: fixed;
  top: ${({ theme }) => theme.spacing.md};
  left: ${({ theme }) => theme.spacing.md};
  z-index: ${({ theme }) => theme.zIndex.skipLink};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  text-decoration: none;
  transform: translateY(-200%);
  transition: transform 0.2s ease;

  &:focus {
    transform: translateY(0);
  }
`

function App() {
  const [isConsentPanelOpen, setIsConsentPanelOpen] = useState(
    () => isAnalyticsAvailable() && getCurrentConsent() === null,
  )

  useEffect(() => {
    initAnalytics()
  }, [])

  function handleAcceptAnalytics() {
    grantConsent()
    setIsConsentPanelOpen(false)
  }

  function handleRejectAnalytics() {
    denyConsent()
    setIsConsentPanelOpen(false)
  }

  function handleOpenPrivacyPreferences() {
    setIsConsentPanelOpen(true)
  }

  return (
    <>
      <SkipLink href="#conteudo-principal">Pular para o conteúdo</SkipLink>
      <SiteHeader />
      <main id="conteudo-principal" tabIndex={-1}>
        <HeroSection />
        <BusinessDiagnosisSection />
        <SolutionArchitectureSection />
        <WorkProcessSection />
        <DifferentialsSection />
        <FaqSection />
        <ConversionSection />
      </main>
      <SiteFooter
        onOpenPrivacyPreferences={isAnalyticsAvailable() ? handleOpenPrivacyPreferences : undefined}
      />
      {isAnalyticsAvailable() && isConsentPanelOpen && (
        <ConsentBanner onAccept={handleAcceptAnalytics} onReject={handleRejectAnalytics} />
      )}
    </>
  )
}

export default App
