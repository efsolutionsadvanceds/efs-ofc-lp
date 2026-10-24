import { FAQ_ITEMS, type FaqItem } from '@/content/faq'

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
}

const HOME_CRUMB: BreadcrumbItem = { name: 'Início', path: '/' }

export const pages = {
  home: {
    path: '/',
    file: 'index.html',
    title: 'Criação de Sites, Sistemas Sob Medida e IA | E.F Solutions',
    description:
      'Criação de sites profissionais para empresas, sistemas de gestão sob medida e atendente virtual com IA no WhatsApp. SEO para aparecer no Google.',
    faq: FAQ_ITEMS,
    sitemap: { lastmod: '2026-10-24', changefreq: 'monthly', priority: 1 },
  },
  privacidade: {
    path: '/privacidade',
    file: 'privacidade.html',
    title: 'Política de Privacidade | E.F Solutions',
    description:
      'Saiba quais dados o site da E.F Solutions registra, como usamos o Google Analytics e o Meta Pixel e como funciona o contato pelo WhatsApp.',
    breadcrumbs: [HOME_CRUMB, { name: 'Política de Privacidade', path: '/privacidade' }],
    sitemap: { lastmod: '2026-10-24', changefreq: 'yearly', priority: 0.3 },
  },
  termos: {
    path: '/termos',
    file: 'termos.html',
    title: 'Termos de Uso | E.F Solutions',
    description:
      'Condições de uso do site da E.F Solutions: natureza do conteúdo, contato pelo WhatsApp, propostas comerciais e limites de responsabilidade.',
    breadcrumbs: [HOME_CRUMB, { name: 'Termos de Uso', path: '/termos' }],
    sitemap: { lastmod: '2026-10-24', changefreq: 'yearly', priority: 0.3 },
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

/** Todas as páginas geradas como HTML estático no build. */
export const PRERENDERED_PAGES: readonly PageMeta[] = Object.values(pages)

/** Resolve o meta da rota atual; qualquer caminho desconhecido cai na 404. */
export function getPageMeta(pathname: string): PageMeta {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/'
  const match = PRERENDERED_PAGES.find((page) => page.path === normalized && page !== pages.naoEncontrada)
  return match ?? pages.naoEncontrada
}
