import { Bot, PenTool, ShieldCheck, SlidersHorizontal } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Differentiator {
  id: string
  icon: LucideIcon
  title: string
  description: string
}

export const differentiators: readonly Differentiator[] = [
  {
    id: 'decisao-antes-da-ferramenta',
    icon: SlidersHorizontal,
    title: 'Decisão antes da ferramenta',
    description:
      'A tecnologia entra depois que o problema, a prioridade e o resultado esperado estão claros.',
  },
  {
    id: 'solucao-sob-medida',
    icon: PenTool,
    title: 'Solução sob medida',
    description:
      'Arquitetura e interface construídas de acordo com o fluxo real e a necessidade de cada empresa.',
  },
  {
    id: 'performance-e-seguranca-desde-a-base',
    icon: ShieldCheck,
    title: 'Performance e segurança desde a base',
    description:
      'Boas práticas aplicadas à arquitetura, ao código e ao tratamento responsável de dados.',
  },
  {
    id: 'ia-com-regras-e-supervisao',
    icon: Bot,
    title: 'IA com regras e supervisão',
    description:
      'Agentes e automações operam dentro de limites definidos, com acompanhamento humano.',
  },
] as const
