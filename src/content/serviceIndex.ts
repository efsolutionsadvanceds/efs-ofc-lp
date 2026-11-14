import type { SolutionId } from './solutions'

/**
 * Índice das páginas de serviço: só o que o <head>, o sitemap, os links e
 * o seletor de orçamento precisam. O conteúdo de cada página (recursos,
 * público, etapas, perguntas) fica em src/content/servicePages.ts,
 * carregado só com a rota.
 */

export interface ServiceIndexEntry {
  slug: string
  /** Nome do serviço, como aparece nos links e no schema. */
  name: string
  /** Como o serviço entra na mensagem do WhatsApp ("Vim pela página de ..."). */
  messageName: string
  /** Rótulo curto em fonte mono, no topo da página e nos cartões. */
  label: string
  /** Tipo do serviço no schema (`serviceType`). */
  schemaType: string
  title: string
  description: string
  /** Soluções já marcadas no seletor de orçamento desta página. */
  solutions: readonly SolutionId[]
}

export const SERVICE_PAGE_INDEX = [
  {
    slug: 'sistemas-personalizados',
    name: 'Sistemas de gestão sob medida',
    messageName: 'sistemas de gestão sob medida',
    label: 'sistemas/',
    schemaType: 'Desenvolvimento de sistemas de gestão sob medida',
    title: 'Sistemas de Gestão Sob Medida e ERP Web | E.F Solutions',
    description:
      'Desenvolvimento de sistemas de gestão sob medida e ERP web: vendas, estoque, agenda e financeiro no mesmo lugar, com acesso pelo celular e integrações.',
    solutions: ['sistema'],
  },
  {
    slug: 'automacao-whatsapp',
    name: 'Atendente virtual com IA no WhatsApp',
    messageName: 'atendente virtual com IA no WhatsApp',
    label: 'atendimento-ia/',
    schemaType: 'Atendente virtual com inteligência artificial para WhatsApp',
    title: 'Atendente Virtual com IA no WhatsApp | E.F Solutions',
    description:
      'Atendente virtual com IA no WhatsApp: responde clientes a qualquer hora, agenda, coleta dados de orçamento e passa para a sua equipe o que precisa de atenção.',
    solutions: ['assistente', 'automacao'],
  },
  {
    slug: 'seo-e-divulgacao',
    name: 'SEO técnico e SEO local',
    messageName: 'SEO e posicionamento no Google',
    label: 'seo/',
    schemaType: 'Otimização para mecanismos de busca (SEO)',
    title: 'SEO Técnico e SEO Local para Empresas | E.F Solutions',
    description:
      'SEO técnico, SEO local e Perfil da Empresa no Google para o seu site ser encontrado por quem procura o que você vende, com acompanhamento no Search Console.',
    solutions: ['seo'],
  },
  {
    slug: 'landing-pages-e-lojas',
    name: 'Landing pages e lojas virtuais',
    messageName: 'landing pages e lojas virtuais',
    label: 'landing-pages/',
    schemaType: 'Criação de landing pages e lojas virtuais',
    title: 'Landing Pages e Lojas Virtuais | E.F Solutions',
    description:
      'Landing pages rápidas, pensadas para campanhas e pedidos de orçamento, e lojas virtuais próprias com catálogo, carrinho, pagamento e pedidos organizados.',
    solutions: ['site', 'loja'],
  },
] as const satisfies readonly ServiceIndexEntry[]

export type ServiceSlug = (typeof SERVICE_PAGE_INDEX)[number]['slug']

export function servicePath(slug: ServiceSlug): string {
  return `/${slug}`
}

export function findServiceEntry(slug: string | undefined): (typeof SERVICE_PAGE_INDEX)[number] | undefined {
  return SERVICE_PAGE_INDEX.find((service) => service.slug === slug)
}
