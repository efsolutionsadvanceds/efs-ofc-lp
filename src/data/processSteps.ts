export interface ProcessStep {
  id: string
  number: string
  title: string
  description: string
  directionLabel: string
  cinematicStatus: string
}

export const processSteps: readonly ProcessStep[] = [
  {
    id: 'diagnostico-estrategico',
    number: '01',
    title: 'Diagnóstico estratégico',
    description:
      'Entendemos o cenário, a jornada do cliente, os gargalos e a prioridade real da operação.',
    directionLabel: 'Direção: problema, impacto e próximo passo',
    cinematicStatus: 'Mapeando gargalos',
  },
  {
    id: 'arquitetura-da-solucao',
    number: '02',
    title: 'Arquitetura da solução',
    description:
      'Definimos a combinação necessária entre presença digital, aquisição, software e automação.',
    directionLabel: 'Direção: escopo, fluxo e critérios de validação',
    cinematicStatus: 'Conectando decisões',
  },
  {
    id: 'construcao-e-validacao',
    number: '03',
    title: 'Construção e validação',
    description:
      'Transformamos a estratégia em uma experiência rápida, segura e fácil de usar, revisando cada etapa da entrega.',
    directionLabel: 'Entrega: solução funcional e validada',
    cinematicStatus: 'Construindo a solução',
  },
  {
    id: 'evolucao-orientada',
    number: '04',
    title: 'Evolução orientada',
    description:
      'Analisamos o uso da solução e priorizamos melhorias de acordo com o objetivo e o momento do negócio.',
    directionLabel: 'Evolução: melhorias com contexto e prioridade',
    cinematicStatus: 'Preparando a evolução',
  },
] as const
