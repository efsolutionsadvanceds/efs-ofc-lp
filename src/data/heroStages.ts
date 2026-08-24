export interface HeroStage {
  id: string
  title: string
  command: string
  output: string
}

export const heroStages: readonly HeroStage[] = [
  {
    id: 'atrair',
    title: 'Atrair oportunidades',
    command: 'efsa iniciar --frente=aquisicao',
    output: 'Jornada digital preparada para transformar atenção em oportunidade.',
  },
  {
    id: 'converter',
    title: 'Transformar interesse em contato',
    command: 'efsa conectar --canal=whatsapp',
    output: 'Pontos de contato organizados para reduzir atrito na conversão.',
  },
  {
    id: 'atender',
    title: 'Atender com mais agilidade',
    command: 'efsa otimizar --fluxo=atendimento',
    output: 'Atendimento estruturado para responder e qualificar com mais agilidade.',
  },
  {
    id: 'automatizar',
    title: 'Automatizar rotinas operacionais',
    command: 'efsa automatizar --rotinas=operacionais',
    output: 'Tarefas repetitivas executadas com regras e supervisão humana.',
  },
] as const

export const heroCodeSnippet = `const operacao = await efsa.conectar({
  aquisicao,
  atendimento,
  automacao,
})`

export const STAGE_ROTATION_INTERVAL_MS = 3400
