import styled, { keyframes } from 'styled-components'

const driftA = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(3%, -2%, 0) scale(1.05); }
`

const driftB = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(-4%, 2%, 0) scale(1.04); }
`

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
`

/**
 * Glow em verde-neon — normalmente posicionado perto do conteúdo/CTA
 * principal da seção. Deriva muito lentamente (14-28s), retomando um
 * respiro sutil.
 */
const AccentGlow = styled.div`
  position: absolute;
  top: -10%;
  right: -12%;
  width: 55%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, ${({ theme }) => theme.colors.accentAlpha(0.14)} 0%, transparent 68%);
  animation: ${driftA} 22s ease-in-out infinite;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

/**
 * Contrapeso em azul elétrico do lado oposto ao verde — reforça a
 * profundidade "tecnológica" do sistema visual sem competir com o verde,
 * que fica reservado a CTAs e destaques principais.
 */
const CoolGlow = styled.div`
  position: absolute;
  bottom: -14%;
  left: -10%;
  width: 48%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, ${({ theme }) => theme.colors.accentBlueAlpha(0.12)} 0%, transparent 70%);
  animation: ${driftB} 26s ease-in-out infinite;
  animation-delay: 1.2s;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

interface AmbientGlowProps {
  /** Inverte os lados do par verde/azul — útil para alternar o ritmo entre seções vizinhas. */
  flip?: boolean
}

/**
 * Par de glows radiais de baixíssima opacidade para aprofundar o fundo de
 * seções escuras selecionadas, sem substituir o background existente.
 * `position: absolute` dentro de uma seção com `position: relative` +
 * `overflow: hidden`; fica atrás de todo o conteúdo real (z-index:0) e nunca
 * intercepta cliques (`pointer-events: none`).
 */
export function AmbientGlow({ flip = false }: AmbientGlowProps) {
  return (
    <Wrapper aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
      <AccentGlow />
      <CoolGlow />
    </Wrapper>
  )
}
