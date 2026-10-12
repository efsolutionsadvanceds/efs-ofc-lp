import { site } from '@/config/site'

export function buildOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.legalName,
    url: `${site.domain}/`,
    description:
      'Criação de sites, sistemas personalizados, automação de atendimento pelo WhatsApp e SEO para empresas, comércios e prestadores de serviço.',
    areaServed: 'BR',
    inLanguage: 'pt-BR',
  }
}

export function buildWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: `${site.domain}/`,
    inLanguage: 'pt-BR',
  }
}

export interface ServiceSchemaInput {
  name: string
  description: string
  path: string
}

export function buildServiceStructuredData({ name, description, path }: ServiceSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${site.domain}${path}`,
    provider: {
      '@type': 'ProfessionalService',
      name: site.legalName,
      url: `${site.domain}/`,
    },
    areaServed: 'BR',
  }
}

export interface BreadcrumbInput {
  name: string
  path: string
}

export function buildBreadcrumbStructuredData(items: readonly BreadcrumbInput[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${site.domain}${item.path}`,
    })),
  }
}
