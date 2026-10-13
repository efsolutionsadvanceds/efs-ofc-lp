import styled, { keyframes } from 'styled-components'

import { lightSweep } from '@/styles/motion'

interface SceneLightProps {
  /** `hero` usa o flare mais forte (grid + streak + spot de ponteiro); `section` é mais discreto. */
  variant?: 'hero' | 'section'
}

const driftBlue = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(2%, -3%, 0) scale(1.06); }
`

const driftGreen = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(-3%, 2%, 0) scale(1.05); }
`

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
`

const BlueGlow = styled.div<{ $variant: 'hero' | 'section' }>`
  position: absolute;
  top: -22%;
  left: 8%;
  width: ${({ $variant }) => ($variant === 'hero' ? '62%' : '45%')};
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, ${({ theme }) => theme.colors.glowBlue} 0%, transparent 70%);
  filter: blur(2px);
  animation: ${driftBlue} 24s ease-in-out infinite;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const GreenGlow = styled.div<{ $variant: 'hero' | 'section' }>`
  position: absolute;
  bottom: -18%;
  right: -6%;
  width: ${({ $variant }) => ($variant === 'hero' ? '48%' : '36%')};
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, ${({ theme }) => theme.colors.glowGreen} 0%, transparent 72%);
  filter: blur(2px);
  animation: ${driftGreen} 28s ease-in-out infinite;
  animation-delay: 1.4s;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Grid = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.5;
  background-image:
    linear-gradient(${({ theme }) => theme.colors.offWhiteAlpha(0.035)} 1px, transparent 1px),
    linear-gradient(90deg, ${({ theme }) => theme.colors.offWhiteAlpha(0.035)} 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 85%);
`

const Streak = styled.div`
  position: absolute;
  top: 12%;
  left: -20%;
  width: 55%;
  height: 1px;
  background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.iceBlue}, transparent);
  opacity: 0.5;
  animation: ${lightSweep} 16s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`

const PointerSpot = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    420px circle at var(--pointer-x, 50%) var(--pointer-y, 50%),
    ${({ theme }) => theme.colors.accentBlueAlpha(0.14)},
    transparent 70%
  );
  transition: opacity ${({ theme }) => theme.motion.durationBase} ${({ theme }) => theme.motion.ease};
`

/**
 * Composição de luz atmosférica reutilizável — fundação do "Neon Depth
 * System". `variant="hero"` acrescenta a grade técnica, o streak horizontal
 * e um spot que segue o ponteiro. O spot lê `--pointer-x`/`--pointer-y` via
 * `var()`, que cascateiam de um ancestral (ver `usePointerGlow`, aplicado no
 * container real da seção — nunca aqui, que é `pointer-events: none` e por
 * isso nunca receberia o evento de mouse). Fica atrás de todo o conteúdo
 * real (`z-index: 0`, `pointer-events: none`).
 */
export function SceneLight({ variant = 'section' }: SceneLightProps) {
  return (
    <Wrapper aria-hidden="true">
      <BlueGlow $variant={variant} />
      <GreenGlow $variant={variant} />
      {variant === 'hero' ? (
        <>
          <Grid />
          <Streak />
          <PointerSpot />
        </>
      ) : null}
    </Wrapper>
  )
}
