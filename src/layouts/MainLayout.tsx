import { lazy, Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { SiteHeader } from '@/components/layout/SiteHeader'
import { SkipLink } from '@/components/layout/SkipLink'
import { StructuredData } from '@/components/seo/StructuredData'
import { buildOrganizationStructuredData, buildWebsiteStructuredData } from '@/lib/seo'

const SiteFooter = lazy(() =>
  import('@/components/layout/SiteFooter').then((module) => ({ default: module.SiteFooter })),
)

const GLOBAL_SCHEMA = [buildOrganizationStructuredData(), buildWebsiteStructuredData()]

/**
 * Layout persistente entre rotas — header, rodapé e dados estruturados
 * globais (Organization + WebSite) só montam uma vez; cada página injeta seu
 * próprio título/descrição via `useSeo` e, quando fizer sentido, seu próprio
 * schema adicional (Service, BreadcrumbList) através de `StructuredData`.
 */
export function MainLayout() {
  const location = useLocation()

  // Navegação entre rotas deve iniciar no topo da nova página — diferente do
  // bug do formulário de contato (scroll forçado *durante* uma submissão),
  // aqui é o comportamento padrão esperado ao trocar de página. `behavior:
  // 'instant'` substitui o `scroll-behavior: smooth` global (pensado para
  // âncoras internas) — sem isso, o salto para o topo apareceria animado.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <>
      <StructuredData schema={GLOBAL_SCHEMA} />
      <SkipLink />
      <SiteHeader />
      <main id="conteudo-principal" key={location.pathname}>
        <Outlet />
      </main>
      <Suspense fallback={null}>
        <SiteFooter />
      </Suspense>
    </>
  )
}
