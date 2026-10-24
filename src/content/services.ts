/**
 * Serviços exibidos na seção "Serviços" — os títulos são os termos que donos
 * de empresa digitam no Google (intenção de busca), por isso viram os <h3>
 * dos cartões e também o catálogo de serviços do schema LocalBusiness.
 *
 * Não confundir com src/content/solutions.ts, que alimenta o seletor de
 * checkboxes e a mensagem do WhatsApp (e não deve mudar por motivo de SEO).
 */

export interface Service {
  id: string
  /** Rótulo curto em fonte mono, no topo do cartão. */
  label: string
  /** Título com o termo de busca principal (vira <h3>). */
  title: string
  description: string
  /** Etiquetas com o que está incluído. */
  tags: readonly string[]
  /** Texto do link do cartão para o orçamento. */
  cta: string
}

export const SERVICES: readonly Service[] = [
  {
    id: 'sites',
    label: 'sites/',
    title: 'Criação de sites profissionais para empresas',
    description:
      'Sites rápidos, responsivos e prontos para o Google, pensados para transformar visitas em pedidos de orçamento.',
    tags: ['Site institucional', 'Landing page', 'Loja virtual'],
    cta: 'Orçamento de site',
  },
  {
    id: 'sistemas',
    label: 'sistemas/',
    title: 'Desenvolvimento de sistemas de gestão sob medida',
    description:
      'Vendas, estoque, agenda e financeiro em uma plataforma web feita para o seu processo — e não o contrário.',
    tags: ['Estoque', 'Vendas', 'Agenda', 'Financeiro'],
    cta: 'Orçamento de sistema',
  },
  {
    id: 'atendimento-ia',
    label: 'atendimento-ia/',
    title: 'Atendente virtual e automação de atendimento no WhatsApp',
    description:
      'Um atendente com IA que responde na hora, a qualquer hora, e passa para a sua equipe só o que precisa de atenção humana.',
    tags: ['Atendimento 24h', 'Qualificação de contatos', 'Transferência para humano'],
    cta: 'Orçamento de atendente IA',
  },
  {
    id: 'seo',
    label: 'seo/',
    title: 'Otimização SEO para ser encontrado no Google',
    description:
      'SEO técnico, conteúdo e Perfil da Empresa no Google, com indexação e desempenho acompanhados no Google Search Console.',
    tags: ['SEO técnico', 'Google Search Console', 'Perfil da Empresa'],
    cta: 'Orçamento de SEO',
  },
]
