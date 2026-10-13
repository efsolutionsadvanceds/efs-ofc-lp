import type { ReactNode } from 'react'
import styled from 'styled-components'

import { Reveal } from '@/components/ui/Reveal'
import { travelAcross } from '@/styles/motion'

export interface ProblemSolutionItem {
  problem: string
  solution: ReactNode
}

interface ProblemSolutionProps {
  items: readonly ProblemSolutionItem[]
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[1]};
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space[4]};
  padding-block: ${({ theme }) => theme.space[6]};
  border-top: 1px solid ${({ theme }) => theme.colors.borderOnDark};

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.md}px)`} {
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: ${({ theme }) => theme.space[8]};
  }
`

const Problem = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textOnDark};
`

const Connector = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.borderOnDarkStrong};
  overflow: hidden;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.md}px)`} {
    width: 56px;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    width: 40%;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.accent}, transparent);
    animation: ${travelAcross} 7s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
      display: none;
    }
  }
`

const Solution = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};

  strong {
    color: ${({ theme }) => theme.colors.iceBlue};
    font-weight: 600;
  }
`

/** Transição visual "problema → solução": cada linha conecta uma dor comum do negócio à abordagem da E.F Solutions, com uma linha de luz entre os dois lados. */
export function ProblemSolution({ items }: ProblemSolutionProps) {
  return (
    <List>
      {items.map((item, index) => (
        <Reveal key={item.problem} delayMs={index * 90}>
          <Row>
            <Problem>{item.problem}</Problem>
            <Connector aria-hidden="true" />
            <Solution>{item.solution}</Solution>
          </Row>
        </Reveal>
      ))}
    </List>
  )
}
