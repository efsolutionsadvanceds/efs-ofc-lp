import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Reveal } from '@/components/ui/Reveal'

interface FeatureCardProps {
  icon?: LucideIcon
  title: string
  description: ReactNode
  /** Quando informado, o card inteiro vira um link de rota (usado nos cards de serviço da home). */
  to?: string
  linkLabel?: string
  delayMs?: number
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
  height: 100%;
  padding: ${({ theme }) => theme.space[6]};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderOnDark};
  border-radius: ${({ theme }) => theme.radii.lg};
  transition:
    border-color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease},
    transform ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};
`

const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
  height: 100%;
  padding: ${({ theme }) => theme.space[6]};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderOnDark};
  border-radius: ${({ theme }) => theme.radii.lg};
  transition:
    border-color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease},
    transform ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};

  &:hover,
  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.borderAccent};
    transform: translateY(-3px);
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

  svg {
    width: 22px;
    height: 22px;
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
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};

  svg {
    width: 16px;
    height: 16px;
  }
`

/** Card genérico usado nos quatro serviços da home (com link) e em grades de recursos dentro das páginas de serviço (sem link). */
export function FeatureCard({ icon: Icon, title, description, to, linkLabel, delayMs = 0 }: FeatureCardProps) {
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
      {to ? <CardLink to={to}>{body}</CardLink> : <Card>{body}</Card>}
    </Reveal>
  )
}
