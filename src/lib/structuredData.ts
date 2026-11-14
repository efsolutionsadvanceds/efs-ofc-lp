import type { PageMeta } from '@/config/pages'
import { absoluteUrl, confirmedSocialProfiles, site } from '@/config/site'
import { SERVICE_PAGE_INDEX, servicePath } from '@/content/serviceIndex'
import { SERVICES } from '@/content/services'

/**
 * Dados estruturados (schema.org, JSON-LD) num único `@graph` por página —
 * os nós se referenciam por `@id`, o que evita repetir a empresa em cada nó
 * e deixa a relação página → site → empresa explícita para os buscadores.
 */

const BUSINESS_ID = `${site.domain}/#empresa`
const WEBSITE_ID = `${site.domain}/#site`

type JsonLdNode = Record<string, unknown>

/** Página dedicada de cada serviço do catálogo da home (pelo `id` de src/content/services.ts). */
const SERVICE_URLS: Record<string, string> = {
  sites: absoluteUrl('/criacao-de-sites'),
  sistemas: absoluteUrl(servicePath('sistemas-personalizados')),
  'atendimento-ia': absoluteUrl(servicePath('automacao-whatsapp')),
  seo: absoluteUrl(servicePath('seo-e-divulgacao')),
}

/**
 * A empresa como `ProfessionalService` (um tipo de LocalBusiness, que também
 * é Organization): serviços profissionais prestados online, sem endereço
 * inventado. `sameAs` só recebe perfis confirmados em src/config/site.ts.
 */
export function buildBusinessNode(): JsonLdNode {
  const sameAs = confirmedSocialProfiles().map((profile) => profile.href)
  const landingPages = SERVICE_PAGE_INDEX.find((service) => service.slug === 'landing-pages-e-lojas')

  return {
    '@type': 'ProfessionalService',
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
      'SEO local',
      'Google Search Console',
      'Landing pages',
      'Lojas virtuais',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Serviços ${site.name}`,
      itemListElement: [
        ...SERVICES.map((service) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.title,
            description: service.description,
            ...(SERVICE_URLS[service.id] ? { url: SERVICE_URLS[service.id] } : {}),
          },
        })),
        ...(landingPages
          ? [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: landingPages.name,
                  description: landingPages.description,
                  url: absoluteUrl(servicePath(landingPages.slug)),
                },
              },
            ]
          : []),
      ],
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
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
  const mainEntity = meta.article ? `${url}#artigo` : meta.service ? `${url}#servico` : null
  return {
    '@type': meta.pageType ?? 'WebPage',
    '@id': `${url}#pagina`,
    url,
    name: meta.title,
    description: meta.description,
    inLanguage: site.locale,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': BUSINESS_ID },
    ...(mainEntity ? { mainEntity: { '@id': mainEntity } } : {}),
    ...(hasBreadcrumb ? { breadcrumb: { '@id': `${url}#trilha` } } : {}),
  }
}

/**
 * Serviço da página com a área atendida (`areaServed`): a forma correta de
 * dizer "atendemos esta cidade" sem endereço local. A empresa entra como
 * `provider`, pelo `@id`, nunca com um endereço inventado na cidade.
 */
export function buildServiceNode(meta: PageMeta): JsonLdNode | null {
  if (!meta.service) return null
  const url = absoluteUrl(meta.path)
  const { name, type, areaServed } = meta.service
  const country = { '@type': 'Country', name: 'Brasil' }
  const state = { '@type': 'State', name: 'São Paulo', containedInPlace: country }
  const area =
    areaServed.type === 'City'
      ? { '@type': 'City', name: areaServed.name, containedInPlace: state }
      : areaServed.type === 'State'
        ? state
        : country

  return {
    '@type': 'Service',
    '@id': `${url}#servico`,
    name,
    serviceType: type,
    description: meta.description,
    url,
    provider: { '@id': BUSINESS_ID },
    areaServed: area,
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: url,
      availableLanguage: { '@type': 'Language', name: 'Português', alternateName: site.locale },
    },
  }
}

/** Artigo da área de conteúdos, com a empresa como autora e editora. */
export function buildArticleNode(meta: PageMeta): JsonLdNode | null {
  if (!meta.article) return null
  const url = absoluteUrl(meta.path)
  const { headline, datePublished, dateModified, section, readingMinutes } = meta.article

  return {
    '@type': 'Article',
    '@id': `${url}#artigo`,
    headline,
    description: meta.description,
    image: absoluteUrl(site.ogImage.path),
    datePublished,
    dateModified,
    articleSection: section,
    timeRequired: `PT${readingMinutes}M`,
    inLanguage: site.locale,
    author: { '@id': BUSINESS_ID },
    publisher: { '@id': BUSINESS_ID },
    mainEntityOfPage: { '@id': `${url}#pagina` },
    isPartOf: { '@id': WEBSITE_ID },
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
  const graph: JsonLdNode[] = [buildBusinessNode(), buildWebSiteNode()]

  if (!meta.noindex) graph.push(buildWebPageNode(meta, breadcrumb !== null))
  if (breadcrumb) graph.push(breadcrumb)

  for (const node of meta.noindex ? [] : [buildServiceNode(meta), buildArticleNode(meta)]) {
    if (node) graph.push(node)
  }

  const faq = buildFaqNode(meta)
  if (faq) graph.push(faq)

  return { '@context': 'https://schema.org', '@graph': graph }
}
