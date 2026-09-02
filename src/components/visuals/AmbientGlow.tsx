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
 * Glow dourado — normalmente posicionado perto do conteúdo/CTA principal da
 * seção. Deriva muito lentamente (14-28s), retomando um respiro sutil.
 */
const GoldGlow = styled.div`
  position: absolute;
  top: -10%;
  right: -12%;
  width: 55%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, ${({ theme }) => theme.colors.goldAlpha(0.14)} 0%, transparent 68%);
  animation: ${driftA} 22s ease-in-out infinite;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

/**
 * Contrapeso "frio" do lado oposto ao dourado — usa off-white em alfa baixo
 * (não introduz uma quarta cor: contra o navy, uma leitura fria/azulada é o
 * resultado natural de off-white em baixa opacidade, mantendo o sistema de
 * apenas 3 cores-base do site).
 */
const CoolGlow = styled.div`
  position: absolute;
  bottom: -14%;
  left: -10%;
  width: 48%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, ${({ theme }) => theme.colors.offWhiteAlpha(0.06)} 0%, transparent 70%);
  animation: ${driftB} 26s ease-in-out infinite;
  animation-delay: 1.2s;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

interface AmbientGlowProps {
  /** Inverte os lados do par dourado/frio — útil para alternar o ritmo entre seções vizinhas. */
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
      <GoldGlow />
      <CoolGlow />
    </Wrapper>
  )
}
