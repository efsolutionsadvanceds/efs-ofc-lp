import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { MainLayout } from '@/layouts/MainLayout'

const Home = lazy(() => import('@/pages/Home'))
const Solucoes = lazy(() => import('@/pages/Solucoes'))
const CriacaoDeSites = lazy(() => import('@/pages/CriacaoDeSites'))
const SistemasPersonalizados = lazy(() => import('@/pages/SistemasPersonalizados'))
const AutomacaoWhatsApp = lazy(() => import('@/pages/AutomacaoWhatsApp'))
const SeoDivulgacao = lazy(() => import('@/pages/SeoDivulgacao'))
const Sobre = lazy(() => import('@/pages/Sobre'))
const Contato = lazy(() => import('@/pages/Contato'))
const Privacidade = lazy(() => import('@/pages/Privacidade'))
const Termos = lazy(() => import('@/pages/Termos'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="solucoes" element={<Solucoes />} />
          <Route path="criacao-de-sites" element={<CriacaoDeSites />} />
          <Route path="sistemas-personalizados" element={<SistemasPersonalizados />} />
          <Route path="automacao-whatsapp" element={<AutomacaoWhatsApp />} />
          <Route path="seo-e-divulgacao" element={<SeoDivulgacao />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="contato" element={<Contato />} />
          <Route path="privacidade" element={<Privacidade />} />
          <Route path="termos" element={<Termos />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
