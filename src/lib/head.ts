import type { PageMeta } from '@/config/pages'
import { absoluteUrl, site } from '@/config/site'

import { buildStructuredData } from './structuredData'

/**
 * Cabeçalho (<head>) de cada página descrito como dados — a mesma lista é
 * serializada em HTML no pré-render do build (`renderHeadTags`) e aplicada
 * ao DOM nas navegações do lado do cliente (`applyHeadTags`), então as duas
 * saídas nunca divergem. As tags gerenciadas recebem `data-head`, o que
 * permite remover as que deixaram de valer (ex.: canonical numa página
 * noindex) sem tocar nas tags fixas do index.html.
 */

export type HeadTag =
  | { type: 'title'; content: string }
  | { type: 'meta'; key: 'name' | 'property'; name: string; content: string }
  | { type: 'link'; rel: string; href: string }
  | { type: 'jsonld'; id: string; content: string }

const STRUCTURED_DATA_ID = 'structured-data'

const meta = (name: string, content: string): HeadTag => ({ type: 'meta', key: 'name', name, content })
const property = (name: string, content: string): HeadTag => ({ type: 'meta', key: 'property', name, content })

/** JSON seguro dentro de <script>: impede que um "</script>" no texto feche a tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function buildHeadTags(page: PageMeta): HeadTag[] {
  const url = absoluteUrl(page.path)
  const image = absoluteUrl(site.ogImage.path)

  const tags: HeadTag[] = [
    { type: 'title', content: page.title },
    meta('description', page.description),
    meta('robots', page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'),
  ]

  if (!page.noindex) tags.push({ type: 'link', rel: 'canonical', href: url })

  tags.push(
    property('og:type', 'website'),
    property('og:locale', 'pt_BR'),
    property('og:site_name', site.name),
    property('og:title', page.title),
    property('og:description', page.description),
  )
  if (!page.noindex) tags.push(property('og:url', url))
  tags.push(
    property('og:image', image),
    property('og:image:type', site.ogImage.type),
    property('og:image:width', String(site.ogImage.width)),
    property('og:image:height', String(site.ogImage.height)),
    property('og:image:alt', site.ogImage.alt),
    meta('twitter:card', 'summary_large_image'),
    meta('twitter:title', page.title),
    meta('twitter:description', page.description),
    meta('twitter:image', image),
    meta('twitter:image:alt', site.ogImage.alt),
    { type: 'jsonld', id: STRUCTURED_DATA_ID, content: serializeJsonLd(buildStructuredData(page)) },
  )

  return tags
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/** Serializa as tags para o HTML estático gerado no build. */
export function renderHeadTags(tags: readonly HeadTag[]): string {
  return tags
    .map((tag) => {
      switch (tag.type) {
        case 'title':
          return `<title>${escapeHtml(tag.content)}</title>`
        case 'meta':
          return `<meta ${tag.key}="${escapeHtml(tag.name)}" content="${escapeHtml(tag.content)}" data-head />`
        case 'link':
          return `<link rel="${escapeHtml(tag.rel)}" href="${escapeHtml(tag.href)}" data-head />`
        case 'jsonld':
          return `<script type="application/ld+json" id="${escapeHtml(tag.id)}" data-head>${tag.content}</script>`
      }
    })
    .join('\n    ')
}

function keyOf(tag: Exclude<HeadTag, { type: 'title' }>): string {
  if (tag.type === 'meta') return `meta:${tag.key}:${tag.name}`
  if (tag.type === 'link') return `link:${tag.rel}`
  return `script:${tag.id}`
}

function keyOfElement(element: Element): string {
  if (element instanceof HTMLMetaElement) {
    const key = element.hasAttribute('property') ? 'property' : 'name'
    return `meta:${key}:${element.getAttribute(key) ?? ''}`
  }
  if (element instanceof HTMLLinkElement) return `link:${element.rel}`
  return `script:${element.id}`
}

/** Sincroniza o <head> do documento com as tags da página atual (lado do cliente). */
export function applyHeadTags(tags: readonly HeadTag[], doc: Document = document): void {
  const stale = new Map<string, Element>()
  doc.head.querySelectorAll('[data-head]').forEach((element) => stale.set(keyOfElement(element), element))

  for (const tag of tags) {
    if (tag.type === 'title') {
      doc.title = tag.content
      continue
    }

    const key = keyOf(tag)
    let element = stale.get(key)
    stale.delete(key)

    if (!element) {
      element = doc.createElement(tag.type === 'jsonld' ? 'script' : tag.type)
      element.setAttribute('data-head', '')
      doc.head.appendChild(element)
    }

    if (tag.type === 'meta') {
      element.setAttribute(tag.key, tag.name)
      element.setAttribute('content', tag.content)
    } else if (tag.type === 'link') {
      element.setAttribute('rel', tag.rel)
      element.setAttribute('href', tag.href)
    } else {
      element.setAttribute('type', 'application/ld+json')
      element.id = tag.id
      element.textContent = tag.content
    }
  }

  stale.forEach((element) => element.remove())
}
