export interface FaqItem {
  id: string
  question: string
  answer: string
}

export const faqItems: readonly FaqItem[] = [
  {
    id: 'segmentos-atendidos',
    question: 'A EFSA trabalha somente com empresas de reforma e construção?',
    answer:
      'Esse é o nosso foco principal porque conhecemos os desafios de aquisição, atendimento e operação desses segmentos. Também avaliamos empresas de áreas correlatas quando existe aderência entre o problema e nossa capacidade de entrega.',
  },
  {
    id: 'definicao-da-solucao',
    question: 'Preciso saber qual solução contratar antes de falar com a EFSA?',
    answer:
      'Não. A conversa começa pelo cenário, pelo gargalo e pela prioridade. A tecnologia é definida depois que entendemos o que realmente precisa mudar.',
  },
  {
    id: 'modelos-prontos',
    question: 'Vocês usam modelos prontos?',
    answer:
      'Podemos reutilizar fundamentos técnicos confiáveis, mas arquitetura, jornada, interface e integrações são definidas de acordo com o fluxo real da empresa. Não encaixamos todo negócio na mesma solução.',
  },
  {
    id: 'ia-substitui-equipe',
    question: 'Um agente de IA substitui totalmente a minha equipe?',
    answer:
      'Não. Agentes de IA apoiam atendimento, qualificação e tarefas operacionais dentro de regras definidas. Decisões sensíveis e exceções permanecem sob supervisão humana.',
  },
  {
    id: 'prazo-de-desenvolvimento',
    question: 'Quanto tempo leva para desenvolver uma solução?',
    answer:
      'O prazo depende do escopo, das integrações e do nível de complexidade. Depois do diagnóstico, a EFSA apresenta as etapas, os critérios de validação e uma estimativa compatível com o projeto.',
  },
  {
    id: 'garantia-de-resultado',
    question: 'Existe garantia de resultado?',
    answer:
      'Nenhuma empresa séria deve garantir vendas ou crescimento de forma isolada. A EFSA se compromete com método, qualidade técnica, transparência e uma solução alinhada ao objetivo definido. O resultado também depende da oferta, do mercado, da operação e da execução comercial.',
  },
  {
    id: 'comecar-por-uma-frente',
    question: 'Posso começar contratando apenas uma frente?',
    answer:
      'Sim. O projeto pode começar pela prioridade mais relevante, como uma landing page, tráfego estratégico, um sistema ou uma automação, desde que essa decisão faça sentido dentro do cenário analisado.',
  },
] as const
