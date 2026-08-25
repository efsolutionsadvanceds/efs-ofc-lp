import { useEffect, useRef } from 'react'
import { Waypoints } from 'lucide-react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import styled, { useTheme } from 'styled-components'

const NODES = [
  { x: 30, y: 120 },
  { x: 110, y: 60 },
  { x: 190, y: 120 },
  { x: 270, y: 60 },
] as const

const ROUTE_PATH = 'M30,120 L70,120 L70,60 L110,60 L150,60 L150,120 L190,120 L230,120 L230,60 L270,60'

const Panel = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: linear-gradient(
    165deg,
    ${({ theme }) => theme.colors.surfaceDark},
    ${({ theme }) => theme.colors.darkBlue} 140%
  );
  padding: ${({ theme }) => theme.spacing.lg};
`

const GridLayer = styled(motion.div)`
  position: absolute;
  inset: -8%;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(circle at 50% 40%, black 0%, transparent 75%);
  -webkit-mask-image: radial-gradient(circle at 50% 40%, black 0%, transparent 75%);
`

const Vignette = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 30%, transparent 45%, rgba(0, 0, 0, 0.45) 100%);
  pointer-events: none;
`

const PanelHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`

const LabelGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textMuted};

  svg {
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.colors.gold};
  }
`

const PanelLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`

const StepIndicator = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamilyMono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.metallicGray};
`

const StatusText = styled.p`
  position: relative;
  margin: ${({ theme }) => theme.spacing.md} 0 0;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.white};
`

const DiagramWrap = styled(motion.div)`
  position: relative;
  margin-top: ${({ theme }) => theme.spacing.lg};
`

const DiagramSvg = styled.svg`
  display: block;
  width: 100%;
  height: auto;
`

const ScanBand = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    100deg,
    transparent 40%,
    rgba(253, 207, 69, 0.16) 50%,
    transparent 60%
  );
  pointer-events: none;
`

const NodeLabel = styled.text`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`

interface EngineeringBlueprintProps {
  activeIndex: number
  totalSteps: number
  status: string
  variant?: 'interactive' | 'static'
}

export function EngineeringBlueprint({
  activeIndex,
  totalSteps,
  status,
  variant = 'interactive',
}: EngineeringBlueprintProps) {
  const theme = useTheme()
  const shouldReduceMotion = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const isStatic = variant === 'static' || !!shouldReduceMotion

  const progressTarget = useMotionValue(
    isStatic ? 1 : activeIndex / Math.max(totalSteps - 1, 1),
  )
  const progressSpring = useSpring(progressTarget, { stiffness: 120, damping: 24, mass: 0.6 })

  const { scrollYProgress } = useScroll({ target: panelRef, offset: ['start end', 'end start'] })
  const gridY = useTransform(scrollYProgress, [0, 1], [-6, 6])
  const routeY = useTransform(scrollYProgress, [0, 1], [-14, 14])

  useEffect(() => {
    if (isStatic) {
      progressTarget.set(1)
    } else {
      progressTarget.set(activeIndex / Math.max(totalSteps - 1, 1))
    }
  }, [activeIndex, totalSteps, isStatic, progressTarget])

  const stepLabel = String(activeIndex + 1).padStart(2, '0')
  const totalLabel = String(totalSteps).padStart(2, '0')

  return (
    <Panel ref={panelRef}>
      <GridLayer style={isStatic ? undefined : { y: gridY }} />
      <Vignette />

      <PanelHeader>
        <LabelGroup>
          <Waypoints aria-hidden="true" />
          <PanelLabel>Fluxo de engenharia</PanelLabel>
        </LabelGroup>
        <StepIndicator>
          ETAPA {stepLabel} / {totalLabel}
        </StepIndicator>
      </PanelHeader>

      <StatusText>{status}</StatusText>

      <DiagramWrap
        key={isStatic ? 'static' : activeIndex}
        initial={isStatic ? false : { scale: 0.985, opacity: 0.85 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        {!isStatic && (
          <ScanBand
            key={activeIndex}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
        )}
        <DiagramSvg viewBox="0 0 300 160" aria-hidden="true" focusable="false">
          <motion.g style={isStatic ? undefined : { y: routeY }}>
            <path
              d={ROUTE_PATH}
              fill="none"
              stroke={theme.colors.borderSubtle}
              strokeWidth="1.5"
            />
            {isStatic ? (
              <path d={ROUTE_PATH} fill="none" stroke={theme.colors.gold} strokeWidth="1.5" />
            ) : (
              <motion.path
                d={ROUTE_PATH}
                fill="none"
                stroke={theme.colors.gold}
                strokeWidth="1.5"
                style={{ pathLength: progressSpring }}
              />
            )}

            {NODES.map((node, index) => {
              const isReached = isStatic || index <= activeIndex
              const isCurrent = !isStatic && index === activeIndex

              return (
                <g key={`${node.x}-${node.y}`}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isCurrent ? 8 : 6}
                    fill={theme.colors.surfaceDark}
                    stroke={isReached ? theme.colors.gold : theme.colors.metallicGray}
                    strokeWidth={isCurrent ? 2 : 1.5}
                    opacity={isReached ? 1 : 0.55}
                  />
                  <NodeLabel
                    x={node.x}
                    y={node.y - 14}
                    textAnchor="middle"
                    fontSize="9"
                    fontFamily={theme.typography.fontFamilyMono}
                    fill={isReached ? theme.colors.gold : theme.colors.metallicGray}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </NodeLabel>
                </g>
              )
            })}
          </motion.g>
        </DiagramSvg>
      </DiagramWrap>
    </Panel>
  )
}
