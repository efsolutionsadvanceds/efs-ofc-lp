import { motion, useReducedMotion } from 'motion/react'
import styled, { useTheme } from 'styled-components'

const CheckmarkSvg = styled.svg`
  flex-shrink: 0;
`

interface AnimatedCheckProps {
  isActive: boolean
  size?: number
}

export function AnimatedCheck({ isActive, size = 22 }: AnimatedCheckProps) {
  const theme = useTheme()
  const shouldReduceMotion = useReducedMotion()

  return (
    <CheckmarkSvg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <motion.circle
        cx="12"
        cy="12"
        r="9.5"
        fill="none"
        strokeWidth="1.5"
        animate={{
          stroke: isActive ? theme.colors.gold : theme.colors.metallicGray,
          opacity: isActive ? 1 : 0.45,
          scale: isActive ? 1 : 0.94,
        }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: 'easeOut' }}
        style={{ transformOrigin: '12px 12px' }}
      />
      <motion.path
        d="M7.5 12.5l3 3 6-6.5"
        fill="none"
        stroke={theme.colors.gold}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{ pathLength: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: 'easeOut' }}
      />
    </CheckmarkSvg>
  )
}
