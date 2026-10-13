import styled, { css } from 'styled-components'

interface GlassPanelProps {
  /** `strong` para painéis que precisam de mais contraste atrás (ex.: formulário). */
  $tone?: 'regular' | 'strong'
  /** Acrescenta a borda luminosa com leve brilho na cor de destaque. */
  $accentBorder?: boolean
}

const glassFallback = css`
  background: ${({ theme }) => theme.colors.surfaceElevated};
`

/**
 * Superfície de vidro do "Neon Depth System" — fundo translúcido com blur,
 * borda fina iluminada e um realce interno sutil no topo. Em navegadores
 * sem suporte a `backdrop-filter`, cai para uma superfície sólida opaca
 * (nunca depende do blur para ter contraste suficiente).
 */
export const GlassPanel = styled.div<GlassPanelProps>`
  position: relative;
  background: ${({ theme, $tone }) => ($tone === 'strong' ? theme.colors.glassStrong : theme.colors.glass)};
  border: 1px solid ${({ theme, $accentBorder }) => ($accentBorder ? theme.colors.borderAccent : theme.colors.glassBorder)};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  isolation: isolate;
  ${glassFallback}

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(180deg, ${({ theme }) => theme.colors.offWhiteAlpha(0.06)} 0%, transparent 40%);
    pointer-events: none;
  }

  @supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
    background: ${({ theme, $tone }) => ($tone === 'strong' ? theme.colors.glassStrong : theme.colors.glass)};
    backdrop-filter: blur(18px) saturate(140%);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
  }
`
