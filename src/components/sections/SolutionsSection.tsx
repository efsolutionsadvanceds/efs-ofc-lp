import { Gauge, Globe, LayoutGrid, MonitorSmartphone, Workflow, Zap } from 'lucide-react'
import styled from 'styled-components'

import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { solutionsCopy } from '@/content/copy'
import { energyBorderGlow } from '@/styles/energyBorder'
import { ambientFloat } from '@/styles/motion'

const ICONS = [Globe, Workflow, LayoutGrid, MonitorSmartphone, Zap, Gauge]

const Section = styled.section`
  background: ${({ theme }) => theme.colors.navy};
  padding-block: ${({ theme }) => theme.space[20]};
`

const Grid = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space[6]};

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.md}px)`} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Block = styled.article<{ $energy?: boolean }>`
  height: 100%;
  padding: ${({ theme }) => theme.space[6]};
  border: 1px solid ${({ theme }) => theme.colors.borderOnDark};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
  transition:
    border-color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease},
    transform ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};

  ${({ $energy }) => ($energy ? energyBorderGlow : '')}

  &:hover,
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.borderGold};
    transform: translateY(-4px);
  }
`

const IconBadge = styled.span<{ $float?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.goldAlpha(0.12)};
  color: ${({ theme }) => theme.colors.gold};
  animation: ${({ $float }) => ($float ? ambientFloat : 'none')} 7s ease-in-out infinite;

  svg {
    width: 22px;
    height: 22px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textOnDark};
`

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
  flex: 1;
`

const TechnicalLabel = styled.span`
  align-self: flex-start;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textOnDarkSubtle};
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[3]}`};
  border: 1px solid ${({ theme }) => theme.colors.borderOnDark};
  border-radius: ${({ theme }) => theme.radii.pill};
`

export function SolutionsSection() {
  return (
    <Section id="solucoes">
      <Container>
        <SectionHeading eyebrow={solutionsCopy.eyebrow} heading={solutionsCopy.heading} lead={solutionsCopy.lead} />

        <Grid>
          {solutionsCopy.blocks.map((block, index) => {
            const Icon = ICONS[index % ICONS.length]
            return (
              <Reveal as="li" key={block.title} delayMs={(index % 3) * 90} offsetPx={24}>
                <Block $energy={index === 0 || index === 3}>
                  {Icon ? (
                    <IconBadge aria-hidden="true" $float={index < 2} style={{ animationDelay: `${index * 900}ms` }}>
                      <Icon />
                    </IconBadge>
                  ) : null}
                  <Title>{block.title}</Title>
                  <Description>{block.description}</Description>
                  <TechnicalLabel>{block.technicalLabel}</TechnicalLabel>
                </Block>
              </Reveal>
            )
          })}
        </Grid>
      </Container>
    </Section>
  )
}
