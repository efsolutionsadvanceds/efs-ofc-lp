import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import { MainLayout } from '@/layouts/MainLayout'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import Obrigado from '@/pages/Obrigado'

// Páginas legais: só texto e fora do caminho de conversão — ficam fora do
// bundle inicial da landing page e carregam sob demanda.
const Privacidade = lazy(() => import('@/pages/Privacidade'))
const Termos = lazy(() => import('@/pages/Termos'))

/** Rotas — cada uma tem seu meta/SEO em src/config/pages.ts. */
export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="obrigado" element={<Obrigado />} />
        <Route path="privacidade" element={<Privacidade />} />
        <Route path="termos" element={<Termos />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
