export interface SegmentDefinition {
  id: string
  label: string
  examples: string[]
}

export const segmentsCopy = {
  eyebrow: 'Feito para o seu tipo de empresa',
  heading: 'Isso serve para o meu tipo de empresa?',
  answer:
    'Se sua rotina envolve captar pedidos, elaborar propostas, acompanhar etapas, produzir, instalar ou manter clientes informados, existe espaço para simplificar o processo.',
  cta: 'Quero uma solução para meu segmento',
}

export const SEGMENT_DEFINITIONS: SegmentDefinition[] = [
  {
    id: 'reformas',
    label: 'Reformas e construção',
    examples: [
      'Pedidos de orçamento',
      'Planejamento de etapas',
      'Registro de andamento',
      'Comunicação com clientes',
      'Documentos e fotos',
    ],
  },
  {
    id: 'arquitetura',
    label: 'Arquitetura e interiores',
    examples: ['Portfólio', 'Briefing estruturado', 'Propostas', 'Aprovações', 'Área do cliente'],
  },
  {
    id: 'marmoraria',
    label: 'Marmorarias',
    examples: ['Solicitação com medidas e fotos', 'Orçamento', 'Visita técnica', 'Produção', 'Instalação'],
  },
  {
    id: 'vidracaria',
    label: 'Vidraçarias',
    examples: ['Qualificação do pedido', 'Agendamento de medição', 'Proposta', 'Fabricação', 'Instalação'],
  },
  {
    id: 'marcenaria',
    label: 'Marcenarias',
    examples: ['Briefing', 'Aprovação de projeto', 'Produção', 'Entrega', 'Histórico do cliente'],
  },
  {
    id: 'servicos-tecnicos',
    label: 'Serviços técnicos',
    examples: ['Chamados', 'Equipes', 'Agenda', 'Evidências do serviço', 'Retorno ao cliente'],
  },
]
