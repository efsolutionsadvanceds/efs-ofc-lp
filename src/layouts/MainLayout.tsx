import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { SelectionProvider } from '@/components/conversion/SelectionProvider'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SkipLink } from '@/components/layout/SkipLink'
import { getPageMeta, pages } from '@/config/pages'
import { useScrollToTopOnNavigate } from '@/hooks/useScrollToTopOnNavigate'
import { useSeo } from '@/hooks/useSeo'

/**
 * Layout persistente entre rotas. O <head> de cada rota (título, meta,
 * canonical, Open Graph e JSON-LD) vem do registro src/config/pages.ts — o
 * mesmo usado no pré-render — e o estado da seleção de soluções fica acima
 * das rotas para sobreviver à navegação.
 */
export function MainLayout() {
  const { pathname } = useLocation()
  const meta = getPageMeta(pathname)

  useSeo(meta)
  useScrollToTopOnNavigate()

  return (
    <SelectionProvider>
      <SkipLink />
      <SiteHeader />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <SiteFooter reserveBarSpace={meta === pages.home} />
    </SelectionProvider>
  )
}
