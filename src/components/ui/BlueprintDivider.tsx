import styled from 'styled-components'

import { travelAcross } from '@/styles/motion'

const Wrapper = styled.div`
  position: relative;
  height: 32px;
  display: flex;
  align-items: center;
  overflow: hidden;
`

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.borderOnDark};
`

const TravelingLight = styled.span`
  position: absolute;
  top: 50%;
  left: 0;
  width: 90px;
  height: 90px;
  margin-top: -45px;
  border-radius: 50%;
  background: radial-gradient(circle, ${({ theme }) => theme.colors.goldAlpha(0.5)} 0%, transparent 70%);
  animation: ${travelAcross} 15s ease-in-out infinite;
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`

/** Separador decorativo em linguagem de planta técnica (linha + marcações). */
export function BlueprintDivider() {
  return (
    <Wrapper aria-hidden="true">
      <Svg viewBox="0 0 1280 32" preserveAspectRatio="none">
        <line x1="0" y1="16" x2="1280" y2="16" stroke="currentColor" strokeWidth="1" />
        {Array.from({ length: 17 }, (_, index) => index * 80).map((x) => (
          <line key={x} x1={x} y1="10" x2={x} y2="22" stroke="currentColor" strokeWidth="1" />
        ))}
        <circle cx="640" cy="16" r="3.5" fill="#D5A54A" />
      </Svg>
      <TravelingLight />
    </Wrapper>
  )
}
