import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import styled, { useTheme } from 'styled-components'
import { usePageVisibility } from '../../hooks/usePageVisibility'

const NODES = [
  { x: 60, y: 90 },
  { x: 220, y: 40 },
  { x: 340, y: 160 },
  { x: 520, y: 70 },
  { x: 700, y: 150 },
] as const

const PATHS = [
  'M60,90 C160,60 200,50 220,40',
  'M220,40 C280,90 300,130 340,160',
  'M340,160 C420,110 460,90 520,70',
  'M520,70 C600,110 640,130 700,150',
] as const

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: ${({ theme }) => theme.zIndex.decorative};
`

const Atmosphere = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 72% 18%, rgba(0, 31, 91, 0.4), transparent 60%),
    radial-gradient(circle at 15% 85%, rgba(0, 31, 91, 0.22), transparent 55%);
`

const Grid = styled(motion.div)`
  position: absolute;
  inset: -10%;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(circle at 60% 40%, black 0%, transparent 72%);
  -webkit-mask-image: radial-gradient(circle at 60% 40%, black 0%, transparent 72%);
`

const NodeField = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`

const Glow = styled(motion.div)`
  position: absolute;
  top: -10%;
  right: -10%;
  width: 60%;
  height: 60%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(253, 207, 69, 0.08), transparent 70%);
  filter: blur(2px);
`

export function AmbientHeroBackground() {
  const theme = useTheme()
  const shouldReduceMotion = useReducedMotion()
  const isPageVisible = usePageVisibility()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const gridX = useTransform(pointerX, [-1, 1], [-6, 6])
  const gridY = useTransform(pointerY, [-1, 1], [-6, 6])
  const [allowParallax, setAllowParallax] = useState(
    () => window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')

    function handleChange(event: MediaQueryListEvent) {
      setAllowParallax(event.matches)
    }

    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (!allowParallax || shouldReduceMotion) return

    function handlePointerMove(event: PointerEvent) {
      pointerX.set((event.clientX / window.innerWidth) * 2 - 1)
      pointerY.set((event.clientY / window.innerHeight) * 2 - 1)
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [allowParallax, shouldReduceMotion, pointerX, pointerY])

  const shouldAnimateGlow = !shouldReduceMotion && isPageVisible
  const enableParallax = allowParallax && !shouldReduceMotion

  return (
    <Wrapper aria-hidden="true">
      <Atmosphere />
      <Grid style={enableParallax ? { x: gridX, y: gridY } : undefined} />
      <Glow
        animate={shouldAnimateGlow ? { x: [0, -24, 0], y: [0, 16, 0] } : { x: 0, y: 0 }}
        transition={
          shouldAnimateGlow
            ? { duration: 14, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0 }
        }
      />
      <NodeField viewBox="0 0 760 220" preserveAspectRatio="xMidYMid slice">
        {PATHS.map((d, index) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke={theme.colors.gold}
            strokeWidth="1"
            strokeOpacity="0.35"
            strokeLinecap="round"
            initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.35 }}
            transition={{ duration: 1.4, delay: 0.4 + index * 0.15, ease: 'easeOut' }}
          />
        ))}
        {NODES.map((node, index) => (
          <motion.circle
            key={`${node.x}-${node.y}`}
            cx={node.x}
            cy={node.y}
            r={3}
            fill={theme.colors.gold}
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0 }}
            animate={{ opacity: 0.55, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.12, ease: 'easeOut' }}
          />
        ))}
      </NodeField>
    </Wrapper>
  )
}
