import { site } from '@/config/site'
import { FAQ_ITEMS } from '@/content/faq'

export function buildFaqStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function buildOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.legalName,
    url: `${site.domain}/`,
    description:
      'Sites, sistemas sob medida e agentes de IA para escritórios de arquitetura, construtoras, empresas de reforma, marmorarias, vidraçarias, marcenarias e serviços técnicos venderem mais.',
    areaServed: 'BR',
    inLanguage: 'pt-BR',
  }
}
