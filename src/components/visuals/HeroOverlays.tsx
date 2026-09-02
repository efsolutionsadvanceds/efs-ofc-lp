import styled from 'styled-components'

import { softParallax } from '@/styles/motion'

/**
 * Pilha de camadas entre o vídeo e o conteúdo da hero — só CSS (gradientes e
 * pseudo-elementos), sem Canvas/WebGL/imagem extra. Ordem de empilhamento
 * (via z-index positivo explícito, nunca negativo):
 *   1 vídeo/poster · 2 gradiente de legibilidade · 3 grade arquitetônica ·
 *   4 fade em xadrez · 5 vinheta · 6 BlueprintScene (linhas decorativas) ·
 *   7 conteúdo · 8 navegação fixa.
 */

/** Camada A — gradiente de legibilidade (mais forte nas bordas onde vive o texto/formulário). */
export const ReadabilityGradient = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  /*
   * Duas camadas EMPILHADAS (não somam — compõem multiplicativamente), então
   * cada uma precisa ficar "leve" sozinha para a combinação bater com os
   * alvos do briefing: ~90-95% junto ao texto, ~45-60% na área mais limpa
   * do vídeo. A camada vertical só escurece as bordas superior/inferior
   * (nav e transição para a próxima seção) e fica transparente no meio,
   * para não somar com a horizontal sobre toda a altura do hero.
   */
  background:
    linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.navyAlpha(0.86)} 0%,
      ${({ theme }) => theme.colors.navyAlpha(0.68)} 30%,
      ${({ theme }) => theme.colors.navyAlpha(0.4)} 52%,
      ${({ theme }) => theme.colors.navyAlpha(0.22)} 72%,
      ${({ theme }) => theme.colors.navyAlpha(0.38)} 100%
    ),
    linear-gradient(
      180deg,
      ${({ theme }) => theme.colors.navyAlpha(0.55)} 0%,
      transparent 12%,
      transparent 86%,
      ${({ theme }) => theme.colors.navyAlpha(0.65)} 100%
    );
`

/** Camada B — grade arquitetônica (linhas finas + divisões maiores), deriva quase imperceptível. */
export const ArchitecturalGrid = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  --grid-cell: 40px;
  --grid-major: 200px;
  opacity: 0.9;
  background-image:
    repeating-linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.offWhiteAlpha(0.05)} 0,
      ${({ theme }) => theme.colors.offWhiteAlpha(0.05)} 1px,
      transparent 1px,
      transparent var(--grid-cell)
    ),
    repeating-linear-gradient(
      0deg,
      ${({ theme }) => theme.colors.offWhiteAlpha(0.05)} 0,
      ${({ theme }) => theme.colors.offWhiteAlpha(0.05)} 1px,
      transparent 1px,
      transparent var(--grid-cell)
    ),
    repeating-linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.goldAlpha(0.14)} 0,
      ${({ theme }) => theme.colors.goldAlpha(0.14)} 1px,
      transparent 1px,
      transparent var(--grid-major)
    ),
    repeating-linear-gradient(
      0deg,
      ${({ theme }) => theme.colors.goldAlpha(0.1)} 0,
      ${({ theme }) => theme.colors.goldAlpha(0.1)} 1px,
      transparent 1px,
      transparent var(--grid-major)
    );
  animation: ${softParallax} 22s linear infinite;
  will-change: transform;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    --grid-cell: 64px;
    --grid-major: 256px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

/** Camada C — fade em xadrez arquitetônico, mais visível na borda direita e apagado antes do texto. */
export const CheckerFade = styled.div`
  position: absolute;
  inset: 0;
  z-index: 4;
  --checker-size: 96px;
  background-image: conic-gradient(
    from 90deg at 1px 1px,
    transparent 90deg,
    ${({ theme }) => theme.colors.goldAlpha(0.05)} 0 180deg,
    transparent 0 270deg,
    ${({ theme }) => theme.colors.offWhiteAlpha(0.04)} 0
  );
  background-size: var(--checker-size) var(--checker-size);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, transparent 30%, black 62%, black 100%);
  mask-image: linear-gradient(90deg, transparent 0%, transparent 30%, black 62%, black 100%);

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    --checker-size: 140px;
  }
`

/** Camada D — vinheta suave nas bordas, com fallback sólido quando blend modes não são suportados. */
export const HeroVignette = styled.div`
  position: absolute;
  inset: 0;
  z-index: 5;
  background: radial-gradient(
    120% 120% at 50% 38%,
    transparent 48%,
    ${({ theme }) => theme.colors.navyAlpha(0.5)} 100%
  );
  opacity: 0.55;

  @supports (mix-blend-mode: soft-light) {
    mix-blend-mode: soft-light;
    opacity: 0.9;
  }
`
