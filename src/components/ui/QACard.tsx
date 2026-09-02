import type { LucideIcon } from 'lucide-react'
import styled from 'styled-components'

import { Reveal } from './Reveal'

interface QACardProps {
  icon?: LucideIcon
  question: string
  situationLabel?: string
  answer: string
  delayMs?: number
}

const Card = styled.article`
  position: relative;
  height: 100%;
  padding: ${({ theme }) => theme.space[6]};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderOnDark};
  border-radius: ${({ theme }) => theme.radii.lg};
  transition:
    border-color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease},
    transform ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease},
    box-shadow ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: ${({ theme }) => theme.space[6]};
    width: 32px;
    height: 2px;
    background: ${({ theme }) => theme.colors.gold};
    transform: translateY(-1px);
  }

  &:hover,
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.borderGold};
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`

const IconBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.goldAlpha(0.12)};
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: ${({ theme }) => theme.space[4]};

  svg {
    width: 22px;
    height: 22px;
  }
`

const SituationLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textOnDarkSubtle};
  margin-bottom: ${({ theme }) => theme.space[2]};
`

const Question = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textOnDark};
  margin-bottom: ${({ theme }) => theme.space[3]};
`

const Answer = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
`

export function QACard({ icon: Icon, question, situationLabel, answer, delayMs = 0 }: QACardProps) {
  return (
    <Reveal delayMs={delayMs} as="li" offsetPx={24}>
      <Card>
        {Icon ? (
          <IconBadge aria-hidden="true">
            <Icon />
          </IconBadge>
        ) : null}
        {situationLabel ? <SituationLabel>{situationLabel}</SituationLabel> : null}
        <Question>{question}</Question>
        <Answer>{answer}</Answer>
      </Card>
    </Reveal>
  )
}
