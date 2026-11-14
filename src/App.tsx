import { lazy, Suspense, type ReactNode } from 'react'
import { Route, Routes } from 'react-router-dom'

import { RouteSkeleton } from '@/components/layout/RouteSkeleton'
import { SERVICE_PAGE_INDEX } from '@/content/serviceIndex'
import { MainLayout } from '@/layouts/MainLayout'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import Obrigado from '@/pages/Obrigado'

// Páginas legais: só texto e fora do caminho de conversão — ficam fora do
// bundle inicial da landing page e carregam sob demanda.
const Privacidade = lazy(() => import('@/pages/Privacidade'))
const Termos = lazy(() => import('@/pages/Termos'))
const Cookies = lazy(() => import('@/pages/Cookies'))
// Páginas por cidade: o texto das cidades só carrega nestas rotas.
const CitiesHub = lazy(() => import('@/pages/CitiesHub'))
const CityPage = lazy(() => import('@/pages/CityPage'))
// Páginas de serviço: uma rota por serviço, mesmo componente (carregado sob demanda).
const ServicePage = lazy(() => import('@/pages/ServicePage'))

/**
 * Limite de Suspense próprio de cada rota sob demanda: numa navegação
 * interna, o limite é novo, então o React mostra o esqueleto enquanto o
 * código chega (em vez de congelar a página anterior sem aviso).
 */
function OnDemand({ children }: { children: ReactNode }) {
  return <Suspense fallback={<RouteSkeleton />}>{children}</Suspense>
}

/** Rotas — cada uma tem seu meta/SEO em src/config/pages.ts. */
export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="criacao-de-sites" element={<OnDemand><CitiesHub /></OnDemand>} />
        <Route path="criacao-de-sites/:cidade" element={<OnDemand><CityPage /></OnDemand>} />
        {SERVICE_PAGE_INDEX.map((service) => (
          <Route
            key={service.slug}
            path={service.slug}
            element={
              <OnDemand>
                <ServicePage slug={service.slug} />
              </OnDemand>
            }
          />
        ))}
        <Route path="obrigado" element={<Obrigado />} />
        <Route path="politica-de-privacidade" element={<OnDemand><Privacidade /></OnDemand>} />
        <Route path="termos-de-uso" element={<OnDemand><Termos /></OnDemand>} />
        <Route path="politica-de-cookies" element={<OnDemand><Cookies /></OnDemand>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
