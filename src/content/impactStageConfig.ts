/**
 * Configuração determinística por cartão da seção de impacto — nunca gerada
 * via `Math.random()` (evita mudanças de posição a cada render/SSR). Os
 * valores ficam dentro dos limites do briefing: rotação ±2°, deslocamento
 * vertical estático moderado, duração de flutuação ambiente 6–13s.
 */
export interface ImpactCardConfig {
  /** Rotação estática do cartão (graus). */
  rotate: number
  /** Deslocamento vertical estático — cria o efeito de linhas "escalonadas". */
  offsetY: number
  /** Camada de profundidade — cartões "2" ficam sutilmente maiores/mais próximos. */
  depth: 1 | 2
  /** Direção de entrada ao rolar a página até a seção. */
  entryDirection: 'left' | 'right' | 'depth'
  /** Atraso da entrada (ms). */
  delayMs: number
  /** Duração da flutuação ambiente contínua pós-entrada (s). */
  floatDurationS: number
  /** Atraso da flutuação ambiente, para evitar sincronismo entre cartões (ms). */
  floatDelayMs: number
}

export const impactStageConfig: ImpactCardConfig[] = [
  { rotate: -1.6, offsetY: 12, depth: 2, entryDirection: 'left', delayMs: 0, floatDurationS: 8, floatDelayMs: 0 },
  { rotate: 1.1, offsetY: -10, depth: 1, entryDirection: 'left', delayMs: 90, floatDurationS: 11, floatDelayMs: 400 },
  { rotate: -0.8, offsetY: 16, depth: 1, entryDirection: 'depth', delayMs: 180, floatDurationS: 9, floatDelayMs: 900 },
  {
    rotate: 1.7,
    offsetY: -14,
    depth: 2,
    entryDirection: 'depth',
    delayMs: 270,
    floatDurationS: 13,
    floatDelayMs: 200,
  },
  { rotate: -1.3, offsetY: 8, depth: 1, entryDirection: 'right', delayMs: 360, floatDurationS: 7, floatDelayMs: 700 },
  {
    rotate: 0.9,
    offsetY: -12,
    depth: 2,
    entryDirection: 'right',
    delayMs: 450,
    floatDurationS: 10,
    floatDelayMs: 100,
  },
  {
    rotate: -1.8,
    offsetY: 10,
    depth: 1,
    entryDirection: 'left',
    delayMs: 540,
    floatDurationS: 12,
    floatDelayMs: 550,
  },
  {
    rotate: 1.2,
    offsetY: -9,
    depth: 1,
    entryDirection: 'right',
    delayMs: 630,
    floatDurationS: 6,
    floatDelayMs: 850,
  },
]
