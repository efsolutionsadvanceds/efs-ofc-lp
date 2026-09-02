import styled from 'styled-components'

import { Accordion } from '@/components/ui/Accordion'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FAQ_ITEMS, faqCopy } from '@/content/faq'

const Section = styled.section`
  background: ${({ theme }) => theme.colors.navy};
  padding-block: ${({ theme }) => theme.space[20]};
`

const Wrapper = styled.div`
  max-width: 48rem;
`

export function FaqSection() {
  return (
    <Section id="duvidas">
      <Container>
        <SectionHeading eyebrow={faqCopy.eyebrow} heading={faqCopy.heading} />
        <Wrapper>
          <Accordion idPrefix="faq" items={FAQ_ITEMS} />
        </Wrapper>
      </Container>
    </Section>
  )
}
