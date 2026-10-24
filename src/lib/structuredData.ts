import type { PageMeta } from '@/config/pages'
import { absoluteUrl, site } from '@/config/site'
import { SERVICES } from '@/content/services'

/**
 * Dados estruturados (schema.org, JSON-LD) num único `@graph` por página —
 * os nós se referenciam por `@id`, o que evita repetir a empresa em cada nó
 * e deixa a relação página → site → empresa explícita para os buscadores.
 */

const BUSINESS_ID = `${site.domain}/#empresa`
const WEBSITE_ID = `${site.domain}/#site`

type JsonLdNode = Record<string, unknown>

export function buildLocalBusinessNode(): JsonLdNode {
  return {
    '@type': 'LocalBusiness',
    '@id': BUSINESS_ID,
    name: site.legalName,
    url: absoluteUrl('/'),
    description: site.description,
    slogan: site.tagline,
    logo: absoluteUrl(site.logoPath),
    image: absoluteUrl(site.ogImage.path),
    telephone: site.whatsapp.e164,
    address: { '@type': 'PostalAddress', ...site.address },
    areaServed: { '@type': 'Country', name: 'Brasil' },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.whatsapp.e164,
      contactType: 'sales',
      areaServed: 'BR',
      availableLanguage: ['Portuguese'],
    },
    knowsAbout: [
      'Criação de sites profissionais',
      'Desenvolvimento de sistemas de gestão',
      'Atendente virtual com inteligência artificial',
      'Automação de atendimento no WhatsApp',
      'SEO',
      'Google Search Console',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Serviços ${site.name}`,
      itemListElement: SERVICES.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.title, description: service.description },
      })),
    },
    ...(site.social.length > 0 ? { sameAs: site.social.map((profile) => profile.href) } : {}),
  }
}

export function buildWebSiteNode(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: absoluteUrl('/'),
    name: site.name,
    inLanguage: site.locale,
    publisher: { '@id': BUSINESS_ID },
  }
}

function buildWebPageNode(meta: PageMeta, hasBreadcrumb: boolean): JsonLdNode {
  const url = absoluteUrl(meta.path)
  return {
    '@type': 'WebPage',
    '@id': `${url}#pagina`,
    url,
    name: meta.title,
    description: meta.description,
    inLanguage: site.locale,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': BUSINESS_ID },
    ...(hasBreadcrumb ? { breadcrumb: { '@id': `${url}#trilha` } } : {}),
  }
}

/** Só gera a trilha quando todos os itens têm URL (páginas indexáveis). */
export function buildBreadcrumbNode(meta: PageMeta): JsonLdNode | null {
  const items = meta.breadcrumbs
  if (!items || items.length === 0 || items.some((item) => !item.path)) return null

  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(meta.path)}#trilha`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path ?? '/'),
    })),
  }
}

export function buildFaqNode(meta: PageMeta): JsonLdNode | null {
  if (!meta.faq || meta.faq.length === 0) return null

  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(meta.path)}#duvidas`,
    mainEntity: meta.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function buildStructuredData(meta: PageMeta) {
  const breadcrumb = meta.noindex ? null : buildBreadcrumbNode(meta)
  const graph: JsonLdNode[] = [buildLocalBusinessNode(), buildWebSiteNode()]

  if (!meta.noindex) graph.push(buildWebPageNode(meta, breadcrumb !== null))
  if (breadcrumb) graph.push(breadcrumb)

  const faq = buildFaqNode(meta)
  if (faq) graph.push(faq)

  return { '@context': 'https://schema.org', '@graph': graph }
}
