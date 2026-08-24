import { SiteHeader } from './components/layout/SiteHeader'
import { BusinessDiagnosisSection } from './components/sections/BusinessDiagnosisSection'
import { HeroSection } from './components/sections/HeroSection'
import { SolutionArchitectureSection } from './components/sections/SolutionArchitectureSection'

function App() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <BusinessDiagnosisSection />
        <SolutionArchitectureSection />
      </main>
    </>
  )
}

export default App
