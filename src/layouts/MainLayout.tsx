import { Suspense, useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { LeadOriginContext } from '@/components/conversion/LeadOriginContext'
import { SelectionProvider } from '@/components/conversion/SelectionProvider'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SkipLink } from '@/components/layout/SkipLink'
import { getPageMeta } from '@/config/pages'
import { useScrollToTopOnNavigate } from '@/hooks/useScrollToTopOnNavigate'
import { useSeo } from '@/hooks/useSeo'

/**
 * Layout persistente entre rotas. O <head> de cada rota (título, meta,
 * canonical, Open Graph e JSON-LD) vem do registro src/config/pages.ts — o
 * mesmo usado no pré-render — e o estado da seleção de soluções fica acima
 * das rotas para sobreviver à navegação. A cidade da página (se houver)
 * chega a todos os CTAs de WhatsApp pelo LeadOriginContext.
 */
export function MainLayout() {
  const { pathname } = useLocation()
  const meta = getPageMeta(pathname)
  const origin = useMemo(() => (meta.city ? { city: meta.city } : {}), [meta])

  useSeo(meta)
  useScrollToTopOnNavigate()

  return (
    <SelectionProvider>
      <LeadOriginContext value={origin}>
        <SkipLink />
        <SiteHeader />
        <main id="conteudo" tabIndex={-1} className="outline-none">
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </main>
        <SiteFooter reserveBarSpace={meta.conversionBar === true} />
      </LeadOriginContext>
    </SelectionProvider>
  )
}
