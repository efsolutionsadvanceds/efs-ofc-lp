import { CITIES_HUB_PATH, CITY_INDEX, cityPath } from '@/content/cityIndex'
import { FAQ_ITEMS, type FaqItem } from '@/content/faq'
import { SERVICE_PAGE_INDEX, servicePath } from '@/content/serviceIndex'
import type { SolutionId } from '@/content/solutions'

/**
 * Registro central de páginas — fonte única para:
 * - título, description, robots, canonical e Open Graph de cada rota
 *   (`useSeo` no cliente e o pré-render no build usam o mesmo objeto);
 * - dados estruturados por página (FAQPage, BreadcrumbList);
 * - o sitemap.xml gerado no build (só entram páginas indexáveis com `sitemap`);
 * - a lista de arquivos HTML pré-renderizados em `dist/`.
 *
 * Para criar uma página nova: adicione-a aqui e crie a rota em `App.tsx` —
 * o teste de SSR (`entry-server.test.tsx`) falha se as duas listas divergirem.
 */

export interface BreadcrumbItem {
  name: string
  /** Ausente apenas no item atual de páginas sem URL canônica (ex.: 404). */
  path?: string
}

export interface SitemapEntry {
  /** Data da última alteração relevante de conteúdo (AAAA-MM-DD). */
  lastmod: string
  changefreq: 'weekly' | 'monthly' | 'yearly'
  priority: number
}

/** Área atendida no schema `Service` (sem endereço: o atendimento é online). */
export interface AreaServed {
  type: 'City' | 'State' | 'Country'
  name: string
}

/** Artigo da área de conteúdos: vira schema `Article`. */
export interface ArticleMeta {
  headline: string
  datePublished: string
  dateModified: string
  section: string
  readingMinutes: number
}

export interface PageMeta {
  path: string
  /** Arquivo gerado em `dist/` (o Vercel serve `/x` a partir de `x.html` com `cleanUrls`). */
  file: string
  title: string
  description: string
  noindex?: boolean
  breadcrumbs?: readonly BreadcrumbItem[]
  /** Perguntas exibidas na página — viram schema FAQPage. */
  faq?: readonly FaqItem[]
  sitemap?: SitemapEntry
  /** Serviço oferecido na página e onde: vira schema `Service` com `areaServed`. */
  service?: { name: string; type: string; areaServed: AreaServed }
  /** Cidade da página: entra na mensagem do WhatsApp e no GA4 (`page_city`). */
  city?: { slug: string; name: string }
  /** Serviço da página: entra na mensagem do WhatsApp e no GA4 (`page_service`). */
  leadService?: { slug: string; name: string }
  /** Artigo da página: entra na mensagem do WhatsApp, no GA4 (`page_article`) e no schema. */
  article?: ArticleMeta & { slug: string }
  /** Soluções que já chegam marcadas no seletor de orçamento (até o visitante mexer). */
  defaultSolutions?: readonly SolutionId[]
  /** Tipo de página no schema (padrão: WebPage). */
  pageType?: 'AboutPage' | 'CollectionPage'
  /** A página tem a barra fixa de conversão (o rodapé reserva espaço para ela no celular). */
  conversionBar?: boolean
}

const HOME_CRUMB: BreadcrumbItem = { name: 'Início', path: '/' }
const CITIES_CRUMB: BreadcrumbItem = { name: 'Criação de sites', path: CITIES_HUB_PATH }

export const pages = {
  home: {
    path: '/',
    file: 'index.html',
    title: 'Criação de Sites, Sistemas Sob Medida e IA | E.F Solutions',
    description:
      'Criação de sites profissionais para empresas, sistemas de gestão sob medida e atendente virtual com IA no WhatsApp. SEO para aparecer no Google.',
    faq: FAQ_ITEMS,
    sitemap: { lastmod: '2026-11-14', changefreq: 'monthly', priority: 1 },
    conversionBar: true,
  },
  cidades: {
    path: CITIES_HUB_PATH,
    file: 'criacao-de-sites.html',
    title: 'Criação de Sites no Estado de São Paulo | E.F Solutions',
    description:
      'Criação de sites profissionais para empresas da capital, da Grande São Paulo, do litoral e do interior paulista. Veja as cidades atendidas e peça orçamento.',
    breadcrumbs: [HOME_CRUMB, CITIES_CRUMB],
    sitemap: { lastmod: '2026-11-14', changefreq: 'monthly', priority: 0.8 },
    service: { name: 'Criação de sites', type: 'Criação de sites', areaServed: { type: 'State', name: 'São Paulo' } },
    defaultSolutions: ['site'],
    conversionBar: true,
  },
  privacidade: {
    path: '/politica-de-privacidade',
    file: 'politica-de-privacidade.html',
    title: 'Política de Privacidade | E.F Solutions',
    description:
      'Saiba quais dados o site da E.F Solutions registra, como usamos o Google Analytics e o Meta Pixel e como funciona o contato pelo WhatsApp.',
    breadcrumbs: [HOME_CRUMB, { name: 'Política de Privacidade', path: '/politica-de-privacidade' }],
    sitemap: { lastmod: '2026-11-14', changefreq: 'yearly', priority: 0.3 },
  },
  sobre: {
    path: '/sobre',
    file: 'sobre.html',
    title: 'Sobre a E.F Solutions: Sites, Sistemas e IA',
    description:
      'Conheça a E.F Solutions: engenharia de software para sites, sistemas de gestão, atendimento com IA e SEO, com atendimento online e proposta por escrito.',
    breadcrumbs: [HOME_CRUMB, { name: 'Sobre', path: '/sobre' }],
    sitemap: { lastmod: '2026-11-14', changefreq: 'monthly', priority: 0.6 },
    pageType: 'AboutPage',
  },
  projetos: {
    path: '/projetos',
    file: 'projetos.html',
    title: 'Projetos Entregues | E.F Solutions',
    description:
      'Projetos reais da E.F Solutions: os sites da FRD Locações e da Mark Assistência, o que cada empresa precisava e o que foi entregue, nas palavras dos clientes.',
    breadcrumbs: [HOME_CRUMB, { name: 'Projetos', path: '/projetos' }],
    sitemap: { lastmod: '2026-11-14', changefreq: 'monthly', priority: 0.6 },
    pageType: 'CollectionPage',
  },
  cookies: {
    path: '/politica-de-cookies',
    file: 'politica-de-cookies.html',
    title: 'Política de Cookies | E.F Solutions',
    description:
      'Quais cookies o site da E.F Solutions usa, para quê e por quanto tempo. O Google Analytics e o Meta Pixel só funcionam depois da sua permissão.',
    breadcrumbs: [HOME_CRUMB, { name: 'Política de Cookies', path: '/politica-de-cookies' }],
    sitemap: { lastmod: '2026-11-14', changefreq: 'yearly', priority: 0.3 },
  },
  termos: {
    path: '/termos-de-uso',
    file: 'termos-de-uso.html',
    title: 'Termos de Uso | E.F Solutions',
    description:
      'Condições de uso do site da E.F Solutions: natureza do conteúdo, contato pelo WhatsApp, propostas comerciais e limites de responsabilidade.',
    breadcrumbs: [HOME_CRUMB, { name: 'Termos de Uso', path: '/termos-de-uso' }],
    sitemap: { lastmod: '2026-11-14', changefreq: 'yearly', priority: 0.3 },
  },
  obrigado: {
    path: '/obrigado',
    file: 'obrigado.html',
    title: 'Mensagem pronta no WhatsApp | E.F Solutions',
    description:
      'Sua seleção foi enviada para o WhatsApp da E.F Solutions. Confira a mensagem e toque em enviar para receber os próximos passos.',
    noindex: true,
    breadcrumbs: [HOME_CRUMB, { name: 'Obrigado', path: '/obrigado' }],
  },
  naoEncontrada: {
    path: '/404',
    file: '404.html',
    title: 'Página não encontrada | E.F Solutions',
    description:
      'O endereço acessado não existe ou foi movido. Volte para a página inicial da E.F Solutions ou fale com a gente pelo WhatsApp.',
    noindex: true,
    breadcrumbs: [HOME_CRUMB, { name: 'Página não encontrada' }],
  },
} as const satisfies Record<string, PageMeta>

/**
 * Uma página por serviço principal (src/content/serviceIndex.ts), na raiz do
 * domínio. O conteúdo vem de src/content/servicePages.ts, carregado só com a
 * rota. O seletor de orçamento já chega com o serviço marcado.
 */
export const SERVICE_PAGES: readonly PageMeta[] = SERVICE_PAGE_INDEX.map((service) => ({
  path: servicePath(service.slug),
  file: `${service.slug}.html`,
  title: service.title,
  description: service.description,
  breadcrumbs: [HOME_CRUMB, { name: service.name, path: servicePath(service.slug) }],
  sitemap: { lastmod: '2026-11-14', changefreq: 'monthly', priority: 0.9 },
  service: { name: service.name, type: service.schemaType, areaServed: { type: 'Country', name: 'Brasil' } },
  leadService: { slug: service.slug, name: service.messageName },
  defaultSolutions: service.solutions,
  conversionBar: true,
}))

/**
 * Uma página por cidade (src/content/cityIndex.ts), gerada no build em
 * `dist/criacao-de-sites/<cidade>.html`. O conteúdo de cada uma vem de
 * src/content/cities.ts, carregado só com a rota.
 */
export const CITY_PAGES: readonly PageMeta[] = CITY_INDEX.map((city) => ({
  path: cityPath(city.slug),
  file: `${cityPath(city.slug).slice(1)}.html`,
  title: `Criação de Sites em ${city.name} | E.F Solutions`,
  description: city.description,
  breadcrumbs: [HOME_CRUMB, CITIES_CRUMB, { name: city.name, path: cityPath(city.slug) }],
  sitemap: { lastmod: '2026-11-14', changefreq: 'monthly', priority: 0.7 },
  service: { name: `Criação de sites em ${city.name}`, type: 'Criação de sites', areaServed: { type: 'City', name: city.name } },
  city: { slug: city.slug, name: city.name },
  defaultSolutions: ['site'],
  conversionBar: true,
}))

/** Todas as páginas geradas como HTML estático no build. */
export const PRERENDERED_PAGES: readonly PageMeta[] = [...Object.values(pages), ...SERVICE_PAGES, ...CITY_PAGES]

/** Resolve o meta da rota atual; qualquer caminho desconhecido cai na 404. */
export function getPageMeta(pathname: string): PageMeta {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/'
  const match = PRERENDERED_PAGES.find((page) => page.path === normalized && page !== pages.naoEncontrada)
  return match ?? pages.naoEncontrada
}
