import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 6;
  overflow: hidden;
`

const Scene = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.gold};
`

/**
 * Marcações técnicas decorativas (cantos + ticks de coordenada) sobre o
 * vídeo de fundo do hero — o vídeo agora carrega o peso visual principal;
 * esta camada só reforça a linguagem de "planta técnica" nas bordas, sem
 * competir com a grade arquitetônica em CSS (ver HeroOverlays.tsx).
 */
export function BlueprintScene() {
  return (
    <Wrapper aria-hidden="true">
      <Scene viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" focusable="false">
        <g stroke="currentColor" strokeOpacity="0.55" strokeWidth="2" fill="none">
          <path d="M32 32 h30 M32 32 v30" />
          <path d="M1568 32 h-30 M1568 32 v30" />
          <path d="M32 868 h30 M32 868 v-30" />
          <path d="M1568 868 h-30 M1568 868 v-30" />
        </g>

        <g stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5">
          <line x1="120" y1="850" x2="120" y2="866" />
          <line x1="800" y1="850" x2="800" y2="866" />
          <line x1="1480" y1="850" x2="1480" y2="866" />
          <line x1="120" y1="858" x2="1480" y2="858" />
        </g>
        <g fill="currentColor" fillOpacity="0.45" fontSize="13" fontFamily="monospace">
          <text x="120" y="882">0.00</text>
          <text x="770" y="882">42.00</text>
          <text x="1440" y="882">84.00</text>
        </g>

        <circle cx="800" cy="450" r="3.5" fill="currentColor" fillOpacity="0.6" />
      </Scene>
    </Wrapper>
  )
}
