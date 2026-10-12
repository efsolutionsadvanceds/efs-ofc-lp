import { useEffect } from 'react'

import { site } from '@/config/site'

interface SeoOptions {
  title: string
  description: string
  /** Caminho absoluto a partir da raiz, ex.: "/sobre". Use "/" para a home. */
  path: string
  /** true apenas para páginas que não devem ser indexadas (ex.: 404). Padrão: indexável. */
  noindex?: boolean
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

/**
 * Atualiza título, meta description, canonical e Open Graph/Twitter ao
 * navegar entre rotas — esta é uma aplicação client-rendered sem SSR, então
 * estas tags ficam corretas para quem (ou o que) executa o JavaScript da
 * página; não substitui pré-renderização para rastreadores que não executam
 * JavaScript.
 */
export function useSeo({ title, description, path, noindex = false }: SeoOptions) {
  useEffect(() => {
    const canonicalUrl = `${site.domain}${path}`

    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertCanonical(canonicalUrl)
  }, [title, description, path, noindex])
}
