import { ListChecks, MonitorCheck, Search } from 'lucide-react'
import styled from 'styled-components'

import { Container } from '@/components/ui/Container'
import { QACard } from '@/components/ui/QACard'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AmbientGlow } from '@/components/visuals/AmbientGlow'
import { whyEfCopy } from '@/content/copy'

const ICONS = [Search, ListChecks, MonitorCheck]

const Section = styled.section`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.navy};
  padding-block: ${({ theme }) => theme.space[20]};
`

const Content = styled(Container)`
  position: relative;
  z-index: 1;
`

const AnswerBlock = styled.div`
  max-width: 60ch;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
  margin-bottom: ${({ theme }) => theme.space[10]};
`

const AnswerText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
`

const CardGrid = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.md}px)`} {
    grid-template-columns: repeat(3, 1fr);
  }
`

export function WhyEfSection() {
  return (
    <Section id="por-que-a-ef">
      <AmbientGlow />
      <Content>
        <SectionHeading eyebrow={whyEfCopy.eyebrow} heading={whyEfCopy.heading} />

        <AnswerBlock>
          <Reveal>
            <AnswerText>{whyEfCopy.answer}</AnswerText>
          </Reveal>
          <Reveal delayMs={80}>
            <AnswerText>{whyEfCopy.secondParagraph}</AnswerText>
          </Reveal>
        </AnswerBlock>

        <CardGrid>
          {whyEfCopy.cards.map((card, index) => (
            <QACard
              key={card.question}
              icon={ICONS[index % ICONS.length]}
              question={card.question}
              answer={card.answer}
              delayMs={index * 90}
            />
          ))}
        </CardGrid>
      </Content>
    </Section>
  )
}
