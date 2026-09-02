import { css } from 'styled-components'

import { rotateSlow } from './motion'

/**
 * Mixin — não um componente novo — para acrescentar um anel de energia
 * (borda com gradiente cônico dourado em rotação lenta) diretamente a um
 * styled-component já existente, sem envolver um wrapper extra. Uso:
 *
 *   const Shell = styled.div`
 *     ${energyBorderGlow}
 *     ...
 *   `
 *
 * Restrito deliberadamente a alguns elementos (formulário de contato,
 * cartões de percepção profissional) — não deve virar padrão universal.
 */
export const energyBorderGlow = css`
  position: relative;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: 1.5px;
    background: conic-gradient(
      from 0deg,
      transparent 0%,
      ${({ theme }) => theme.colors.goldAlpha(0.5)} 10%,
      transparent 24%,
      transparent 100%
    );
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: ${rotateSlow} 13s linear infinite;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      animation: none;
    }
  }
`
