import { keyframes } from 'styled-components'

/**
 * Sistema de movimento centralizado. Primitivas reutilizáveis em vez de
 * `@keyframes` soltos espalhados por componente — qualquer novo elemento
 * animado deve reaproveitar uma destas antes de criar uma nova.
 *
 * Todas as primitivas animam apenas `transform`/`opacity` (compositor-friendly).
 * `prefers-reduced-motion` é tratado globalmente em GlobalStyle.ts, que zera
 * duração/atraso de qualquer animação — os componentes não precisam repetir
 * essa lógica, exceto para pausar movimento autônomo contínuo (ver `ambientFloat`
 * e `lightSweep`, que devem ser aplicados condicionalmente via JS quando o
 * movimento for infinito, já que "duração quase zero" não é o mesmo que "parado").
 */

export const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

export const slideFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-32px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const slideFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(32px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.94);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

/** Revela um bloco de texto com um clip vertical (a linha "sobe" para o lugar). */
export const clipTextReveal = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`

/** Traça uma linha/borda decorativa da esquerda para a direita. */
export const lineDraw = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`

/**
 * Deriva extremamente lenta e sutil, usada em camadas decorativas contínuas
 * (grade arquitetônica do hero). Não é parallax real ligado ao scroll — é um
 * movimento autônomo de baixíssima amplitude que sugere profundidade.
 */
export const softParallax = keyframes`
  0% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(-1.5%, 1%, 0); }
  100% { transform: translate3d(0, 0, 0); }
`

/** Flutuação vertical mínima para ícones decorativos isolados (não usar em muitos elementos ao mesmo tempo). */
export const ambientFloat = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`

/** Reflexo dourado diagonal que cruza um elemento em intervalos longos. */
export const lightSweep = keyframes`
  0%, 92%, 100% { transform: translateX(-140%) skewX(-12deg); }
  96% { transform: translateX(140%) skewX(-12deg); }
`

/** Ponto de luz que percorre uma linha/divisor horizontal em intervalos longos (sem o skew do lightSweep). */
export const travelAcross = keyframes`
  0%, 92%, 100% { transform: translateX(-140%); }
  96% { transform: translateX(140%); }
`

/** Onda expansiva usada pelo botão de WhatsApp (ver WhatsAppFloatButton). */
export const radarWave = keyframes`
  0% {
    transform: scale(0.85);
    opacity: 0.45;
  }
  100% {
    transform: scale(1.55);
    opacity: 0;
  }
`

/** Respiração extremamente sutil para um elemento de destaque isolado. */
export const breathe = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04); }
`

/** Rotação contínua e lenta — usada pelo anel de energia em bordas selecionadas. */
export const rotateSlow = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

/** Flutuação combinada (vertical + leve rotação) para auras/ícones de destaque. */
export const ambientDrift = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(0.6deg); }
`

/**
 * Reflexo de luz sobre um trecho de texto em destaque (dourado), via
 * `background-position` de um gradiente recortado ao texto (`background-clip:
 * text`). Uso sempre atrás de `@supports (background-clip: text)` para não
 * deixar o texto invisível em navegadores sem suporte.
 */
export const textSheen = keyframes`
  0%, 88%, 100% { background-position: -120% 0; }
  94% { background-position: 220% 0; }
`

/**
 * Anel de energia em expansão — usado no núcleo de marca da seção de
 * impacto e em marcadores de destaque isolados. `scale`+`opacity` apenas.
 */
export const energyRingPulse = keyframes`
  0% { transform: scale(0.75); opacity: 0.5; }
  70% { opacity: 0.12; }
  100% { transform: scale(1.6); opacity: 0; }
`

/** Rotação lenta em sentido anti-horário — par de `rotateSlow` para órbitas com profundidade dupla. */
export const orbitReverse = keyframes`
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
`

/**
 * As primitivas de cartão abaixo (flutuação e entradas direcionais) usam as
 * propriedades customizadas \`--card-rotate\`/\`--card-offset-y\`, definidas
 * inline por cartão (ver ImpactSection) — assim uma única \`@keyframes\`
 * compartilhada resulta em posições de repouso diferentes por instância,
 * sem duplicar keyframes por cartão. Reservado a telas ≥lg; abaixo disso os
 * cartões usam \`fadeUp\`/\`ambientFloat\` (sem rotação/offset).
 */

/** Flutuação de profundidade — leve translação + escala, para cartões que "flutuam" acima de camadas inferiores. */
export const depthFloat = keyframes`
  0%, 100% { transform: translate3d(0, var(--card-offset-y, 0px), 0) rotate(var(--card-rotate, 0deg)) scale(1); }
  50% {
    transform: translate3d(0, calc(var(--card-offset-y, 0px) - 8px), 0) rotate(var(--card-rotate, 0deg)) scale(1.015);
  }
`

/** Deriva ambiente combinando eixo X e Y — variante de `ambientDrift` sem rotação adicional, para cartões da seção de impacto. */
export const floatDrift = keyframes`
  0%, 100% { transform: translate3d(0, var(--card-offset-y, 0px), 0) rotate(var(--card-rotate, 0deg)); }
  50% {
    transform: translate3d(4px, calc(var(--card-offset-y, 0px) - 7px), 0) rotate(var(--card-rotate, 0deg));
  }
`

/** Entrada de cartão a partir da esquerda com leve rotação, usada na composição da seção de impacto. */
export const settleFromLeft = keyframes`
  from { opacity: 0; transform: translate3d(-46px, calc(var(--card-offset-y, 0px) + 10px), 0) rotate(-3deg) scale(0.96); }
  to { opacity: 1; transform: translate3d(0, var(--card-offset-y, 0px), 0) rotate(var(--card-rotate, 0deg)) scale(1); }
`

/** Entrada de cartão a partir da direita — par de `settleFromLeft`. */
export const settleFromRight = keyframes`
  from { opacity: 0; transform: translate3d(46px, calc(var(--card-offset-y, 0px) + 10px), 0) rotate(3deg) scale(0.96); }
  to { opacity: 1; transform: translate3d(0, var(--card-offset-y, 0px), 0) rotate(var(--card-rotate, 0deg)) scale(1); }
`

/** Entrada de cartão central a partir da profundidade (escala), para posições centrais da composição. */
export const settleFromDepth = keyframes`
  from { opacity: 0; transform: translate3d(0, calc(var(--card-offset-y, 0px) + 18px), 0) scale(0.9); }
  to { opacity: 1; transform: translate3d(0, var(--card-offset-y, 0px), 0) rotate(var(--card-rotate, 0deg)) scale(1); }
`

/**
 * Delay em ms para o N-ésimo item de uma lista com stagger — mantém o
 * espaçamento consistente com o resto do site (~70-90ms por item) sem
 * repetir o cálculo em cada seção.
 */
export function staggerDelay(index: number, baseMs = 80, startMs = 0): number {
  return startMs + index * baseMs
}
