/**
 * Cenários ilustrativos (não depoimentos reais) para a seção "Impacto na
 * rotina". Não existem, no momento, depoimentos verificados de clientes da
 * E.F Solutions — por isso este arquivo também define o formato que um
 * depoimento REAL precisará ter no futuro (ver `VerifiedTestimonial`), para
 * que a estrutura já esteja pronta quando houver casos verificados e com
 * consentimento. Nenhum nome, empresa, foto, nota ou métrica abaixo é real.
 */

export interface IllustrativeScenario {
  id: string
  /** Ex.: "CENÁRIO ILUSTRATIVO • ARQUITETURA" — sempre deixa explícito que não é um depoimento real. */
  label: string
  statement: string
  impact: string
}

export const illustrativeScenarios: IllustrativeScenario[] = [
  {
    id: 'arquitetura',
    label: 'CENÁRIO ILUSTRATIVO • ARQUITETURA',
    statement:
      'Um briefing estruturado reúne referências, prioridades e necessidades antes da primeira proposta.',
    impact: 'Menos mensagens dispersas e mais clareza para iniciar o projeto.',
  },
  {
    id: 'reformas',
    label: 'CENÁRIO ILUSTRATIVO • REFORMAS',
    statement:
      'Etapas, atualizações e documentos centralizados tornam o acompanhamento mais simples para equipe e cliente.',
    impact: 'Menos tempo repetindo informações sobre o andamento.',
  },
  {
    id: 'construcao',
    label: 'CENÁRIO ILUSTRATIVO • CONSTRUÇÃO',
    statement:
      'Responsáveis, prazos e próximos passos visíveis ajudam a equipe a entender o que precisa acontecer.',
    impact: 'Mais organização operacional e menos dependência da memória.',
  },
  {
    id: 'marmoraria',
    label: 'CENÁRIO ILUSTRATIVO • MARMORARIA',
    statement:
      'Medidas, fotos, materiais e detalhes enviados em um fluxo estruturado tornam o pedido mais completo.',
    impact: 'Orçamentos preparados com informações mais consistentes.',
  },
  {
    id: 'vidracaria',
    label: 'CENÁRIO ILUSTRATIVO • VIDRAÇARIA',
    statement: 'Solicitação, medição, fabricação e instalação podem seguir etapas mais claras.',
    impact: 'Menos conversas perdidas entre o primeiro contato e a instalação.',
  },
  {
    id: 'marcenaria',
    label: 'CENÁRIO ILUSTRATIVO • MARCENARIA',
    statement:
      'Aprovações, referências e etapas de produção reunidas ajudam todos a acompanhar o mesmo contexto.',
    impact: 'Menos retrabalho causado por informações espalhadas.',
  },
  {
    id: 'presenca-digital',
    label: 'CENÁRIO ILUSTRATIVO • PRESENÇA DIGITAL',
    statement:
      'Um site que explica serviços, diferenciais e próximos passos prepara melhor o visitante para solicitar um orçamento.',
    impact: 'Contatos mais alinhados ao serviço oferecido.',
  },
  {
    id: 'servicos-tecnicos',
    label: 'CENÁRIO ILUSTRATIVO • SERVIÇOS TÉCNICOS',
    statement:
      'Chamados, agenda, responsáveis e evidências do serviço podem ficar reunidos em uma experiência simples.',
    impact: 'Mais clareza para atender, executar e acompanhar.',
  },
]

/**
 * Formato exigido para um depoimento REAL e verificado. Nenhum registro
 * existe ainda — o array permanece vazio até que a E.F Solutions tenha
 * casos verificados e consentimento explícito para publicá-los. Componentes
 * de UI para depoimentos reais só devem renderizar quando `verified: true`
 * e todos os campos obrigatórios estiverem preenchidos.
 */
export interface VerifiedTestimonial {
  verified: true
  name: string
  role: string
  company: string
  quote: string
  consentStatus: 'given' | 'revoked'
  /** Resultado verificado opcional — só incluir com evidência real por trás. */
  verifiedOutcome?: string
  /** Referência/evidência (ex.: link para o caso, e-mail de aprovação, etc.). */
  evidenceSource?: string
}

export const verifiedTestimonials: VerifiedTestimonial[] = []
