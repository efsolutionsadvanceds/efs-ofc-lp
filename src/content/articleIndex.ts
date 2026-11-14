import type { ServiceSlug } from './serviceIndex'
import type { SolutionId } from './solutions'

/**
 * Índice da área de conteúdos: só o que o <head>, o sitemap, o llms.txt e
 * as listagens precisam. O texto de cada artigo fica em
 * src/content/articles.ts, carregado só com a rota do artigo.
 *
 * `readingMinutes` é conferido por teste contra o texto do artigo.
 */

export interface ArticleIndexEntry {
  slug: string
  /** Título do artigo (H1 e headline do schema). */
  headline: string
  /** Título da aba e do resultado de busca (até 60 caracteres). */
  title: string
  description: string
  /** Assunto, exibido em fonte mono e no schema (`articleSection`). */
  section: string
  datePublished: string
  dateModified: string
  readingMinutes: number
  /** Soluções já marcadas no orçamento a partir deste artigo. */
  solutions: readonly SolutionId[]
  /** Serviço relacionado (links do artigo e da página do serviço). */
  service: ServiceSlug
}

export const ARTICLE_INDEX = [
  {
    slug: 'quanto-custa-criar-um-site-profissional',
    headline: 'Quanto custa criar um site profissional: o que define o preço',
    title: 'Quanto Custa Criar um Site Profissional | E.F Solutions',
    description:
      'O que define o preço de um site profissional: tipo de site, conteúdo, design, funcionalidades, SEO e custos recorrentes, e como pedir um orçamento comparável.',
    section: 'Sites',
    datePublished: '2026-11-14',
    dateModified: '2026-11-14',
    readingMinutes: 7,
    solutions: ['site'],
    service: 'landing-pages-e-lojas',
  },
  {
    slug: 'como-funciona-atendente-ia-no-whatsapp',
    headline: 'Como funciona um atendente com IA no WhatsApp',
    title: 'Atendente com IA no WhatsApp: Como Funciona | E.F Solutions',
    description:
      'Como um atendente com IA responde clientes no WhatsApp: plataforma oficial da Meta, base de conhecimento, transferência para humano, regras e cuidados.',
    section: 'Atendimento com IA',
    datePublished: '2026-11-14',
    dateModified: '2026-11-14',
    readingMinutes: 6,
    solutions: ['assistente'],
    service: 'automacao-whatsapp',
  },
  {
    slug: 'sistema-personalizado-ou-planilha-quando-migrar',
    headline: 'Sistema personalizado ou planilha: quando migrar',
    title: 'Sistema Personalizado ou Planilha: Quando Migrar',
    description:
      'Os sinais de que a planilha virou gargalo, a diferença entre sistema pronto e sob medida e como migrar sem parar a operação da empresa.',
    section: 'Sistemas',
    datePublished: '2026-11-14',
    dateModified: '2026-11-14',
    readingMinutes: 5,
    solutions: ['sistema'],
    service: 'sistemas-personalizados',
  },
  {
    slug: 'como-aparecer-no-google-seo-local-empresas',
    headline: 'Como aparecer no Google: SEO local para empresas',
    title: 'Como Aparecer no Google: SEO Local para Empresas',
    description:
      'Como empresas aparecem no Google e no Maps: Perfil da Empresa, avaliações reais, site com páginas locais, SEO técnico e o que medir no Search Console.',
    section: 'SEO',
    datePublished: '2026-11-14',
    dateModified: '2026-11-14',
    readingMinutes: 6,
    solutions: ['seo'],
    service: 'seo-e-divulgacao',
  },
] as const satisfies readonly ArticleIndexEntry[]

export type ArticleSlug = (typeof ARTICLE_INDEX)[number]['slug']

export const ARTICLES_PATH = '/conteudos'

export function articlePath(slug: ArticleSlug): string {
  return `${ARTICLES_PATH}/${slug}`
}

export function findArticleEntry(slug: string | undefined): (typeof ARTICLE_INDEX)[number] | undefined {
  return ARTICLE_INDEX.find((article) => article.slug === slug)
}

const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

/** "2026-11-14" → "14 de novembro de 2026" (sem depender do idioma do navegador: igual no servidor e no cliente). */
export function formatArticleDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number)
  return `${day} de ${MONTHS[(month ?? 1) - 1]} de ${year}`
}
