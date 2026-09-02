import { BarChart3, ClipboardList, Copy, HelpCircle, MessagesSquare, MousePointerClick } from 'lucide-react'
import styled from 'styled-components'

import { Container } from '@/components/ui/Container'
import { QACard } from '@/components/ui/QACard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { problemsCopy } from '@/content/copy'

const ICONS = [MessagesSquare, Copy, HelpCircle, ClipboardList, MousePointerClick, BarChart3]

const Section = styled.section`
  background: ${({ theme }) => theme.colors.navy};
  padding-block: ${({ theme }) => theme.space[20]};
`

const CardGrid = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.md}px)`} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    grid-template-columns: repeat(3, 1fr);
  }
`

export function ProblemsSection() {
  return (
    <Section id="reconhecimento">
      <Container>
        <SectionHeading eyebrow={problemsCopy.eyebrow} heading={problemsCopy.heading} lead={problemsCopy.intro} />

        <CardGrid>
          {problemsCopy.cards.map((card, index) => (
            <QACard
              key={card.question}
              icon={ICONS[index % ICONS.length]}
              situationLabel="Situação atual"
              question={card.question}
              answer={card.answer}
              delayMs={(index % 3) * 90}
            />
          ))}
        </CardGrid>
      </Container>
    </Section>
  )
}
