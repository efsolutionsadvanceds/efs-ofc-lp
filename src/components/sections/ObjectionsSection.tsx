import styled from 'styled-components'

import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { objectionsCopy } from '@/content/copy'

const Section = styled.section`
  background: ${({ theme }) => theme.colors.navy};
  padding-block: ${({ theme }) => theme.space[20]};
`

const List = styled.ul`
  border-top: 1px solid ${({ theme }) => theme.colors.borderOnDark};
`

const Row = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
  padding-block: ${({ theme }) => theme.space[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderOnDark};

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.md}px)`} {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: ${({ theme }) => theme.space[8]};
  }
`

const Question = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.gold};
`

const Answer = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
`

export function ObjectionsSection() {
  return (
    <Section id="objecoes" aria-labelledby="objecoes-heading">
      <Container>
        <SectionHeading id="objecoes-heading" eyebrow={objectionsCopy.eyebrow} heading={objectionsCopy.heading} />

        <List>
          {objectionsCopy.items.map((item, index) => (
            <Reveal as="li" key={item.question} delayMs={(index % 3) * 80} offsetPx={16}>
              <Row>
                <Question>{item.question}</Question>
                <Answer>{item.answer}</Answer>
              </Row>
            </Reveal>
          ))}
        </List>
      </Container>
    </Section>
  )
}
