import styled from 'styled-components'

import { Reveal } from '@/components/ui/Reveal'
import { staggerDelay } from '@/styles/motion'

interface StepsProps {
  steps: readonly string[]
}

const List = styled.ol`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[5]};
`

const StepRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space[4]};
`

const Number = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background: ${({ theme }) => theme.colors.accentAlpha(0.14)};
  color: ${({ theme }) => theme.colors.accent};
  border: 1px solid ${({ theme }) => theme.colors.borderAccent};
`

const Text = styled.p`
  margin-top: ${({ theme }) => theme.space[1]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
`

/** Lista numerada usada em seções "Como funciona". */
export function Steps({ steps }: StepsProps) {
  return (
    <List>
      {steps.map((step, index) => (
        <Reveal key={step} as="li" delayMs={staggerDelay(index, 80)}>
          <StepRow>
            <Number aria-hidden="true">{index + 1}</Number>
            <Text>{step}</Text>
          </StepRow>
        </Reveal>
      ))}
    </List>
  )
}
