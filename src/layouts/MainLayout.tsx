import { Suspense, useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { ConsentProvider } from '@/components/consent/ConsentProvider'
import { CookieBanner } from '@/components/consent/CookieBanner'
import { CookiePreferences } from '@/components/consent/CookiePreferences'
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
 * chega a todos os CTAs de WhatsApp pelo LeadOriginContext (assim como o
 * serviço ou o artigo), as soluções sugeridas pela página chegam marcadas no
 * seletor, e o consentimento de cookies decide se o GA4 e o Meta Pixel carregam.
 */
export function MainLayout() {
  const { pathname } = useLocation()
  const meta = getPageMeta(pathname)
  const origin = useMemo(
    () => ({
      ...(meta.city ? { city: meta.city } : {}),
      ...(meta.leadService ? { service: meta.leadService } : {}),
      ...(meta.article ? { article: { slug: meta.article.slug, name: meta.article.headline } } : {}),
    }),
    [meta],
  )

  useSeo(meta)
  useScrollToTopOnNavigate()

  return (
    <ConsentProvider>
      <SelectionProvider defaults={meta.defaultSolutions}>
        <LeadOriginContext value={origin}>
          <SkipLink />
          <SiteHeader />
          <main id="conteudo" tabIndex={-1} className="outline-none">
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </main>
          <SiteFooter reserveBarSpace={meta.conversionBar === true} />
          <CookieBanner />
          <CookiePreferences />
        </LeadOriginContext>
      </SelectionProvider>
    </ConsentProvider>
  )
}
