import { Compass, MessagesSquare, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface DiagnosisCard {
  id: string
  icon: LucideIcon
  title: string
  problem: string
  category: string
  response: string
}

export const businessDiagnosisCards: readonly DiagnosisCard[] = [
  {
    id: 'atencao-sem-direcao',
    icon: Compass,
    title: 'Atenção sem direção',
    problem:
      'Sua empresa aparece, mas o site não conduz o visitante para uma próxima ação clara.',
    category: 'Gargalo de aquisição e conversão',
    response: 'Jornada, copy e páginas projetadas para transformar interesse em contato.',
  },
  {
    id: 'contato-que-esfria',
    icon: MessagesSquare,
    title: 'Contato que esfria',
    problem:
      'O lead chega, mas respostas tardias e processos dispersos aumentam o atrito no atendimento.',
    category: 'Gargalo de atendimento',
    response:
      'Fluxos e agentes de IA ajudam a responder, organizar e qualificar com regras e supervisão humana.',
  },
  {
    id: 'operacao-presa-ao-manual',
    icon: Workflow,
    title: 'Operação presa ao manual',
    problem: 'Informações, tarefas e aprovações dependem de planilhas, mensagens e retrabalho.',
    category: 'Gargalo de eficiência operacional',
    response: 'Sistemas e automações sob medida conectam rotinas e reduzem tarefas repetitivas.',
  },
] as const
