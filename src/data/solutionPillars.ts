export interface SolutionPillar {
  id: string
  title: string
  description: string
  services: readonly string[]
  connectionLabel: string
}

export const solutionPillars: readonly SolutionPillar[] = [
  {
    id: 'aquisicao-e-conversao',
    title: 'Aquisição e conversão',
    description:
      'Para transformar presença digital em uma jornada clara entre atenção, interesse e contato.',
    services: [
      'Landing pages de alta conversão',
      'Sites institucionais e sob medida',
      'E-commerce',
      'Tráfego pago estratégico',
      'Criativos publicitários assistidos por IA',
    ],
    connectionLabel: 'Conecta: atenção → interesse → conversa',
  },
  {
    id: 'eficiencia-operacional-e-escala',
    title: 'Eficiência operacional e escala',
    description:
      'Para organizar atendimento, informações e rotinas sem depender de processos dispersos.',
    services: [
      'Sistemas sob medida de alta performance',
      'Agentes de IA para atendimento e qualificação',
      'Automações de rotinas operacionais',
      'Integrações entre ferramentas e fluxos',
    ],
    connectionLabel: 'Conecta: contato → atendimento → operação',
  },
] as const
