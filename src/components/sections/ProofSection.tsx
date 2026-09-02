import styled from 'styled-components'

import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { proofCopy } from '@/content/copy'

const Section = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  padding-block: ${({ theme }) => theme.space[20]};
`

const Grid = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space[6]};

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.md}px)`} {
    grid-template-columns: repeat(2, 1fr);
  }
`

const PrincipleCard = styled.article`
  padding: ${({ theme }) => theme.space[6]};
  border-left: 3px solid ${({ theme }) => theme.colors.gold};
  background: ${({ theme }) => theme.colors.navyAlpha(0.4)};
  border-radius: 0 ${({ theme }) => theme.radii.md} ${({ theme }) => theme.radii.md} 0;
`

const PrincipleTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textOnDark};
  margin-bottom: ${({ theme }) => theme.space[2]};
`

const PrincipleDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
`

export function ProofSection() {
  return (
    <Section id="forma-de-trabalhar">
      <Container>
        <SectionHeading eyebrow={proofCopy.eyebrow} heading={proofCopy.heading} />

        <Grid>
          {proofCopy.principles.map((principle, index) => (
            <Reveal as="li" key={principle.title} delayMs={(index % 2) * 90}>
              <PrincipleCard>
                <PrincipleTitle>{principle.title}</PrincipleTitle>
                <PrincipleDescription>{principle.description}</PrincipleDescription>
              </PrincipleCard>
            </Reveal>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
