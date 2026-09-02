import { useEffect, useRef } from 'react'

import { buildFaqStructuredData, buildOrganizationStructuredData } from '@/lib/seo'

/**
 * Injeta os dados estruturados (Organization + FAQPage) gerados a partir do
 * mesmo conteúdo exibido na página. Usa `textContent` (nunca innerHTML) para
 * preencher a tag <script type="application/ld+json">, que nunca é
 * interpretada como HTML pelo navegador.
 */
export function StructuredData() {
  const organizationRef = useRef<HTMLScriptElement>(null)
  const faqRef = useRef<HTMLScriptElement>(null)

  useEffect(() => {
    if (organizationRef.current) {
      organizationRef.current.textContent = JSON.stringify(buildOrganizationStructuredData())
    }
    if (faqRef.current) {
      faqRef.current.textContent = JSON.stringify(buildFaqStructuredData())
    }
  }, [])

  return (
    <>
      <script ref={organizationRef} type="application/ld+json" />
      <script ref={faqRef} type="application/ld+json" />
    </>
  )
}
