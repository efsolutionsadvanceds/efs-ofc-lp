import { useEffect } from 'react'

import type { PageMeta } from '@/config/pages'
import { applyHeadTags, buildHeadTags } from '@/lib/head'

/**
 * Mantém o <head> sincronizado com a rota atual nas navegações do lado do
 * cliente. No primeiro carregamento as tags já vêm prontas no HTML
 * pré-renderizado (ver scripts/prerender.mjs), então rastreadores que não
 * executam JavaScript — inclusive os de prévia do WhatsApp e do LinkedIn —
 * leem os mesmos valores.
 */
export function useSeo(meta: PageMeta): void {
  useEffect(() => {
    applyHeadTags(buildHeadTags(meta))
  }, [meta])
}
