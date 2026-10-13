import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { BootScreen } from '@/components/ui/BootScreen'
import { MainLayout } from '@/layouts/MainLayout'

const Home = lazy(() => import('@/pages/Home'))
const Solucoes = lazy(() => import('@/pages/Solucoes'))
const Contato = lazy(() => import('@/pages/Contato'))
const Privacidade = lazy(() => import('@/pages/Privacidade'))
const Termos = lazy(() => import('@/pages/Termos'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <>
      <BootScreen />
      <Suspense fallback={null}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="solucoes" element={<Solucoes />} />
            <Route path="contato" element={<Contato />} />
            <Route path="privacidade" element={<Privacidade />} />
            <Route path="termos" element={<Termos />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}
