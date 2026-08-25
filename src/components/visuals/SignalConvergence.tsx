import { motion, useReducedMotion } from 'motion/react'
import styled, { useTheme } from 'styled-components'

const SOURCES = [
  { id: 'aquisicao', label: 'Aquisição', x: 20, y: 40, path: 'M20,40 C90,40 120,70 168,98' },
  { id: 'atendimento', label: 'Atendimento', x: 20, y: 100, path: 'M20,100 L168,100' },
  { id: 'operacao', label: 'Operação', x: 20, y: 160, path: 'M20,160 C90,160 120,130 168,102' },
] as const

const CENTER = { x: 172, y: 100 }
const EXIT_PATH = 'M182,100 L266,100'
const SIGNAL_START_X = 190
const SIGNAL_TRAVEL_X = 250

const Panel = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: linear-gradient(
    160deg,
    ${({ theme }) => theme.colors.surfaceDark},
    ${({ theme }) => theme.colors.darkBlue} 150%
  );
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`

const GridLayer = styled.div`
  position: absolute;
  inset: -8%;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 30px 30px;
  mask-image: radial-gradient(circle at 50% 50%, black 0%, transparent 78%);
  -webkit-mask-image: radial-gradient(circle at 50% 50%, black 0%, transparent 78%);
`

const Vignette = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.4) 100%);
  pointer-events: none;
`

const DiagramSvg = styled.svg`
  position: relative;
  display: block;
  width: 100%;
  height: auto;
  max-height: 220px;
`

const CenterLabel = styled.p`
  position: relative;
  margin: ${({ theme }) => theme.spacing.md} 0 0;
  text-align: center;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`

export function SignalConvergence() {
  const theme = useTheme()
  const shouldReduceMotion = useReducedMotion()
  const isStatic = !!shouldReduceMotion

  return (
    <Panel>
      <GridLayer />
      <Vignette />
      <DiagramSvg viewBox="0 0 290 200" aria-hidden="true" focusable="false">
        {SOURCES.map((source, index) =>
          isStatic ? (
            <path
              key={source.id}
              d={source.path}
              fill="none"
              stroke={theme.colors.gold}
              strokeWidth="1.4"
              strokeOpacity="0.55"
            />
          ) : (
            <motion.path
              key={source.id}
              d={source.path}
              fill="none"
              stroke={theme.colors.gold}
              strokeWidth="1.4"
              strokeOpacity="0.55"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, delay: index * 0.15, ease: 'easeOut' }}
            />
          ),
        )}

        {SOURCES.map((source) => (
          <g key={`${source.id}-node`}>
            <circle cx={source.x} cy={source.y} r={3.5} fill={theme.colors.metallicGray} />
            <text
              x={source.x}
              y={source.y - 10}
              fontSize="9"
              fontFamily={theme.typography.fontFamilyMono}
              fill={theme.colors.textMuted}
            >
              {source.label}
            </text>
          </g>
        ))}

        {isStatic ? (
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r={11}
            fill={theme.colors.surfaceDark}
            stroke={theme.colors.gold}
            strokeWidth="2"
          />
        ) : (
          <motion.circle
            cx={CENTER.x}
            cy={CENTER.y}
            r={11}
            fill={theme.colors.surfaceDark}
            stroke={theme.colors.gold}
            strokeWidth="2"
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
            style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
          />
        )}
        <text
          x={CENTER.x}
          y={CENTER.y + 3}
          textAnchor="middle"
          fontSize="8"
          fontWeight="700"
          fontFamily={theme.typography.fontFamilyMono}
          fill={theme.colors.gold}
        >
          EFSA
        </text>

        {isStatic ? (
          <>
            <path d={EXIT_PATH} fill="none" stroke={theme.colors.gold} strokeWidth="1.6" />
            <circle cx={266} cy={CENTER.y} r={3} fill={theme.colors.gold} />
          </>
        ) : (
          <>
            <motion.path
              d={EXIT_PATH}
              fill="none"
              stroke={theme.colors.gold}
              strokeWidth="1.6"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.75, ease: 'easeOut' }}
            />
            <motion.circle
              cx={SIGNAL_START_X}
              cy={CENTER.y}
              r={3}
              fill={theme.colors.gold}
              initial={{ x: 0, opacity: 0 }}
              whileInView={{ x: SIGNAL_TRAVEL_X - SIGNAL_START_X, opacity: [0, 1, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 1.1, ease: 'easeOut' }}
            />
          </>
        )}
      </DiagramSvg>
      <CenterLabel>
        Aquisição, atendimento e operação convergindo em uma direção única de engenharia.
      </CenterLabel>
    </Panel>
  )
}
