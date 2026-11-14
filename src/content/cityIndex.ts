/**
 * Índice das cidades com página própria de criação de sites (SEO local):
 * só o que o <head>, o sitemap e os links precisam. O conteúdo de cada
 * página (contexto local, setores, perguntas) fica em src/content/cities.ts,
 * carregado só com a rota, fora do bundle inicial da home.
 *
 * Nenhuma cidade tem endereço: o atendimento é online. O schema usa
 * `Service` com `areaServed` (a cidade atendida), nunca um endereço local
 * inventado.
 */

export type CityGroup = 'capital' | 'interior' | 'litoral'

export interface CityIndexEntry {
  slug: string
  name: string
  /** Região exibida nas páginas (ex.: "ABC Paulista"). */
  region: string
  group: CityGroup
  /** Meta description própria (até ~155 caracteres). */
  description: string
}

export const CITY_INDEX = [
  {
    slug: 'sao-paulo',
    name: 'São Paulo',
    region: 'Capital',
    group: 'capital',
    description:
      'Criação de sites profissionais para empresas de São Paulo: páginas rápidas, SEO por bairro e especialidade e orçamento direto pelo WhatsApp.',
  },
  {
    slug: 'campinas',
    name: 'Campinas',
    region: 'Região Metropolitana de Campinas',
    group: 'interior',
    description:
      'Criação de sites em Campinas para empresas de tecnologia, logística e saúde. Sites rápidos, SEO para o Google e orçamento pelo WhatsApp.',
  },
  {
    slug: 'guarulhos',
    name: 'Guarulhos',
    region: 'Grande São Paulo',
    group: 'capital',
    description:
      'Criação de sites em Guarulhos para indústria, logística e comércio. Sites rápidos, prontos para o Google, com orçamento pelo WhatsApp.',
  },
  {
    slug: 'sao-bernardo-do-campo',
    name: 'São Bernardo do Campo',
    region: 'ABC Paulista',
    group: 'capital',
    description:
      'Criação de sites em São Bernardo do Campo para indústria, autopeças e comércio do ABC. SEO para o Google e orçamento pelo WhatsApp.',
  },
  {
    slug: 'santo-andre',
    name: 'Santo André',
    region: 'ABC Paulista',
    group: 'capital',
    description:
      'Criação de sites em Santo André para comércio, serviços, indústria e turismo em Paranapiacaba. SEO local e orçamento pelo WhatsApp.',
  },
  {
    slug: 'osasco',
    name: 'Osasco',
    region: 'Grande São Paulo',
    group: 'capital',
    description:
      'Criação de sites em Osasco para comércio, serviços financeiros e empresas da Castello Branco. SEO local e orçamento pelo WhatsApp.',
  },
  {
    slug: 'sorocaba',
    name: 'Sorocaba',
    region: 'Região de Sorocaba',
    group: 'interior',
    description:
      'Criação de sites em Sorocaba para indústria, fornecedores e comércio regional. Sites rápidos, SEO para o Google e orçamento pelo WhatsApp.',
  },
  {
    slug: 'ribeirao-preto',
    name: 'Ribeirão Preto',
    region: 'Região de Ribeirão Preto',
    group: 'interior',
    description:
      'Criação de sites em Ribeirão Preto para agronegócio, saúde e comércio. Sites rápidos, SEO para o Google e orçamento pelo WhatsApp.',
  },
  {
    slug: 'sao-jose-dos-campos',
    name: 'São José dos Campos',
    region: 'Vale do Paraíba',
    group: 'interior',
    description:
      'Criação de sites em São José dos Campos para tecnologia, indústria aeroespacial e serviços do Vale. SEO e orçamento pelo WhatsApp.',
  },
  {
    slug: 'barueri',
    name: 'Barueri',
    region: 'Grande São Paulo',
    group: 'capital',
    description:
      'Criação de sites em Barueri para empresas de Alphaville e Tamboré, serviços e logística. SEO para o Google e orçamento pelo WhatsApp.',
  },
  {
    slug: 'santos',
    name: 'Santos',
    region: 'Baixada Santista',
    group: 'litoral',
    description:
      'Criação de sites em Santos para comércio exterior, turismo e imobiliárias. Sites rápidos, SEO para o Google e orçamento pelo WhatsApp.',
  },
  {
    slug: 'jundiai',
    name: 'Jundiaí',
    region: 'Região de Jundiaí',
    group: 'interior',
    description:
      'Criação de sites em Jundiaí para logística, indústria e agroturismo. Sites rápidos, SEO para o Google e orçamento pelo WhatsApp.',
  },
  {
    slug: 'sao-jose-do-rio-preto',
    name: 'São José do Rio Preto',
    region: 'Noroeste paulista',
    group: 'interior',
    description:
      'Criação de sites em São José do Rio Preto para saúde, comércio e serviços do noroeste paulista. SEO e orçamento pelo WhatsApp.',
  },
  {
    slug: 'piracicaba',
    name: 'Piracicaba',
    region: 'Região de Piracicaba',
    group: 'interior',
    description:
      'Criação de sites em Piracicaba para agroindústria, indústria automotiva e turismo na Rua do Porto. SEO e orçamento pelo WhatsApp.',
  },
  {
    slug: 'mogi-das-cruzes',
    name: 'Mogi das Cruzes',
    region: 'Alto Tietê',
    group: 'capital',
    description:
      'Criação de sites em Mogi das Cruzes para hortifrúti, comércio e serviços do Alto Tietê. SEO local e orçamento pelo WhatsApp.',
  },
] as const satisfies readonly CityIndexEntry[]

export type CitySlug = (typeof CITY_INDEX)[number]['slug']

/** Caminho do hub e das páginas de cidade. */
export const CITIES_HUB_PATH = '/criacao-de-sites'

export function cityPath(slug: CitySlug): string {
  return `${CITIES_HUB_PATH}/${slug}`
}

export function findCityEntry(slug: string | undefined): (typeof CITY_INDEX)[number] | undefined {
  return CITY_INDEX.find((city) => city.slug === slug)
}

/** Grupos do hub, na ordem de exibição. */
export const CITY_GROUPS: readonly { id: CityGroup; label: string }[] = [
  { id: 'capital', label: 'Capital e Grande São Paulo' },
  { id: 'interior', label: 'Interior' },
  { id: 'litoral', label: 'Litoral' },
]
