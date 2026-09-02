import styled from 'styled-components'

import { Container } from '@/components/ui/Container'
import { legalCopy } from '@/content/copy'

const Section = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  padding-block: ${({ theme }) => theme.space[16]};
`

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[10]};

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.md}px)`} {
    grid-template-columns: repeat(2, 1fr);
  }
`

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
`

const Heading = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`

const Updated = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textOnDarkSubtle};
`

const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
`

export function LegalSection() {
  return (
    <Section aria-label="Informações legais">
      <Container>
        <Grid>
          <Article id="privacidade">
            <Heading>{legalCopy.privacy.heading}</Heading>
            <Updated>{legalCopy.privacy.updated}</Updated>
            {legalCopy.privacy.paragraphs.map((paragraph) => (
              <Paragraph key={paragraph}>{paragraph}</Paragraph>
            ))}
          </Article>

          <Article id="termos">
            <Heading>{legalCopy.terms.heading}</Heading>
            <Updated>{legalCopy.terms.updated}</Updated>
            {legalCopy.terms.paragraphs.map((paragraph) => (
              <Paragraph key={paragraph}>{paragraph}</Paragraph>
            ))}
          </Article>
        </Grid>
      </Container>
    </Section>
  )
}
