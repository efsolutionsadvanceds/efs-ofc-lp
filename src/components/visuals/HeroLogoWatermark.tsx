import styled, { keyframes } from 'styled-components'

const driftRotate = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
  50% { transform: translate3d(-1%, 1.5%, 0) rotate(0.4deg); }
`

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 6;
  overflow: hidden;
  pointer-events: none;
`

const Mark = styled.img`
  position: absolute;
  right: -6%;
  bottom: -10%;
  height: 62%;
  width: auto;
  max-width: none;
  opacity: 0.16;
  mix-blend-mode: screen;
  animation: ${driftRotate} 48s ease-in-out infinite;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  ${({ theme }) => `@media (max-width: ${theme.breakpoints.lg - 1}px)`} {
    display: none;
  }
`

/**
 * Marca d'água decorativa da logo real no hero — canto inferior direito,
 * baixa opacidade, `mix-blend-mode: screen` (o fundo quase-preto do arquivo
 * fonte "desaparece" contra o navy do site, restando só o traço luminoso do
 * monograma). Nunca compete com o h1; oculta em telas menores que `lg`, onde
 * o espaço de respiro do hero é menor.
 */
export function HeroLogoWatermark() {
  return (
    <Wrapper aria-hidden="true">
      <Mark src="/assets/logo-mark.png" width={512} height={512} alt="" />
    </Wrapper>
  )
}
