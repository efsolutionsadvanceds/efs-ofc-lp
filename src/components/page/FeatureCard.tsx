import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import type { ReactNode, Ref } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { GlassPanel } from '@/components/ui/GlassPanel'
import { Reveal } from '@/components/ui/Reveal'
import { usePointerGlow } from '@/hooks/usePointerGlow'

interface FeatureCardProps {
  icon?: LucideIcon
  title: string
  description: ReactNode
  /** Quando informado, o card inteiro vira um link de rota (usado nos cards de serviço da home). */
  to?: string
  linkLabel?: string
  delayMs?: number
}

const CardBase = styled(GlassPanel)`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
  height: 100%;
  padding: ${({ theme }) => theme.space[6]};
  transition:
    border-color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease},
    transform ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(
      240px circle at var(--pointer-x, 50%) var(--pointer-y, -40%),
      ${({ theme }) => theme.colors.accentBlueAlpha(0.16)},
      transparent 72%
    );
    opacity: 0;
    transition: opacity ${({ theme }) => theme.motion.durationBase} ${({ theme }) => theme.motion.ease};
    pointer-events: none;
  }

  &:hover,
  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.borderAccent};
    transform: translateY(-4px);
  }

  &:hover::after,
  &:focus-visible::after {
    opacity: 1;
  }
`

const IconBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.accentBlueAlpha(0.14)};
  color: ${({ theme }) => theme.colors.accentBlue};
  transition: transform ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};

  svg {
    width: 22px;
    height: 22px;
  }

  ${CardBase}:hover &,
  ${CardBase}:focus-visible & {
    transform: translateY(-2px) scale(1.06);
  }
`

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textOnDark};
`

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
  flex-grow: 1;
`

const LinkRow = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};

  svg {
    width: 16px;
    height: 16px;
    transition: transform ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};
  }

  ${CardBase}:hover & svg,
  ${CardBase}:focus-visible & svg {
    transform: translateX(3px);
  }
`

/** Card genérico usado nos quatro serviços da home (com link) e em grades de recursos dentro das páginas de serviço (sem link). */
export function FeatureCard({ icon: Icon, title, description, to, linkLabel, delayMs = 0 }: FeatureCardProps) {
  const pointerRef = usePointerGlow<HTMLDivElement>()

  const body = (
    <>
      {Icon ? (
        <IconBadge aria-hidden="true">
          <Icon />
        </IconBadge>
      ) : null}
      <Title>{title}</Title>
      <Description>{description}</Description>
      {to && linkLabel ? (
        <LinkRow>
          {linkLabel}
          <ArrowRight aria-hidden="true" />
        </LinkRow>
      ) : null}
    </>
  )

  return (
    <Reveal delayMs={delayMs}>
      {to ? (
        <CardBase ref={pointerRef as Ref<HTMLAnchorElement>} as={Link} to={to}>
          {body}
        </CardBase>
      ) : (
        <CardBase ref={pointerRef}>{body}</CardBase>
      )}
    </Reveal>
  )
}
