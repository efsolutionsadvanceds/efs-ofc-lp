/**
 * Catálogo das soluções selecionáveis na landing page — fonte única usada
 * pelo seletor de checkboxes, pela barra de conversão, pela mensagem enviada
 * ao WhatsApp e pelo schema LocalBusiness (hasOfferCatalog). A ordem deste
 * array é a ordem de exibição e também a ordem em que as soluções aparecem
 * na mensagem, independentemente da ordem em que o visitante clicou.
 */

export const SOLUTION_IDS = ['site', 'sistema', 'assistente', 'loja', 'automacao', 'seo'] as const

export type SolutionId = (typeof SOLUTION_IDS)[number]

export interface Solution {
  id: SolutionId
  /** Título exibido no cartão de seleção. */
  title: string
  /** Benefício em uma frase, exibido abaixo do título. */
  description: string
  /** Rótulo curto para espaços estreitos (barra fixa, resumo da seleção). */
  shortLabel: string
  /** Como a solução aparece na mensagem pré-formatada do WhatsApp. */
  messageLabel: string
}

export const SOLUTIONS: readonly Solution[] = [
  {
    id: 'site',
    title: 'Site profissional que gera clientes',
    description: 'Rápido, otimizado para o Google e pensado para transformar visitas em pedidos de orçamento.',
    shortLabel: 'Site',
    messageLabel: 'Site profissional otimizado para o Google',
  },
  {
    id: 'sistema',
    title: 'Sistema de gestão sob medida',
    description: 'Vendas, estoque, agenda ou atendimento organizados em uma plataforma feita para o seu processo.',
    shortLabel: 'Sistema de gestão',
    messageLabel: 'Sistema de gestão sob medida',
  },
  {
    id: 'assistente',
    title: 'Assistente virtual com IA 24h',
    description: 'Atende no WhatsApp a qualquer hora: responde dúvidas, coleta dados e encaminha para sua equipe.',
    shortLabel: 'Assistente com IA',
    messageLabel: 'Assistente virtual com IA para atendimento 24h',
  },
  {
    id: 'loja',
    title: 'Loja virtual',
    description: 'Catálogo, carrinho e pagamento em uma loja própria, rápida e fácil de gerenciar.',
    shortLabel: 'Loja virtual',
    messageLabel: 'Loja virtual',
  },
  {
    id: 'automacao',
    title: 'Automações e integrações',
    description: 'Conecte as ferramentas que você já usa e elimine tarefas manuais repetitivas.',
    shortLabel: 'Automações',
    messageLabel: 'Automação de processos e integrações',
  },
  {
    id: 'seo',
    title: 'SEO para quem já tem site',
    description: 'Otimização técnica, conteúdo e Perfil da Empresa no Google para ser encontrado por mais clientes.',
    shortLabel: 'SEO',
    messageLabel: 'SEO e posicionamento no Google',
  },
]

export function isSolutionId(value: unknown): value is SolutionId {
  return typeof value === 'string' && (SOLUTION_IDS as readonly string[]).includes(value)
}

/** Remove duplicados e devolve os IDs na ordem do catálogo. */
export function sortByCatalog(ids: Iterable<SolutionId>): SolutionId[] {
  const wanted = new Set(ids)
  return SOLUTION_IDS.filter((id) => wanted.has(id))
}

export function getSolutions(ids: readonly SolutionId[]): Solution[] {
  return SOLUTIONS.filter((solution) => ids.includes(solution.id))
}

/** "1 solução selecionada" / "3 soluções selecionadas". */
export function describeSelectionCount(count: number): string {
  return count === 1 ? '1 solução selecionada' : `${count} soluções selecionadas`
}
