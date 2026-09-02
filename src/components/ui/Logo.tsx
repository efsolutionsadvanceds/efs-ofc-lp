import styled, { keyframes } from 'styled-components'

interface LogoProps {
  /** `header` — lockup compacto (monograma + "E.F Solutions"), usado no header.
   *  `full` — composição completa (monograma + wordmark + tagline), usada no rodapé. */
  variant?: 'header' | 'full'
  className?: string
}

const SOURCES = {
  header: { src: '/assets/logo-header.png', width: 241, height: 200, displayHeight: 46 },
  full: { src: '/assets/logo-full.jpg', width: 900, height: 813, displayHeight: 96 },
} as const

/** Máscara horizontal se abrindo — a logo "revela-se" em vez de simplesmente aparecer. */
const maskReveal = keyframes`
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
`

const edgeGlowIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const Wrapper = styled.span<{ $displayHeight: number }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  height: ${({ $displayHeight }) => $displayHeight}px;

  img {
    display: block;
    height: 100%;
    width: auto;
    animation: ${maskReveal} 900ms ${({ theme }) => theme.motion.ease} both;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -3px -6px;
    border-radius: ${({ theme }) => theme.radii.sm};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.goldAlpha(0.35)};
    opacity: 0;
    animation: ${edgeGlowIn} 500ms ${({ theme }) => theme.motion.ease} 900ms both;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    img {
      animation: none;
    }
    &::after {
      animation: none;
      opacity: 1;
    }
  }
`

/**
 * Logo real da E.F Solutions (public/assets/logo-*), derivada do arquivo
 * fonte `logo-efsolutions.jpeg` — ver scripts/generate-brand-assets.cjs.
 * Substitui o monograma SVG provisório usado antes da logo real existir.
 */
export function Logo({ variant = 'header', className }: LogoProps) {
  const { src, width, height, displayHeight } = SOURCES[variant]

  return (
    <Wrapper className={className} $displayHeight={displayHeight}>
      <img src={src} width={width} height={height} alt="E.F Solutions" decoding="async" fetchPriority="high" />
    </Wrapper>
  )
}
