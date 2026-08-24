import { SiteHeader } from './components/layout/SiteHeader'
import { BusinessDiagnosisSection } from './components/sections/BusinessDiagnosisSection'
import { DifferentialsSection } from './components/sections/DifferentialsSection'
import { HeroSection } from './components/sections/HeroSection'
import { SolutionArchitectureSection } from './components/sections/SolutionArchitectureSection'
import { WorkProcessSection } from './components/sections/WorkProcessSection'

function App() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <BusinessDiagnosisSection />
        <SolutionArchitectureSection />
        <WorkProcessSection />
        <DifferentialsSection />
      </main>
    </>
  )
}

export default App
