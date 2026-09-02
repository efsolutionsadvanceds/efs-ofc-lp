import { Quote, Sparkle } from 'lucide-react'
import styled, { css, keyframes } from 'styled-components'

import { AmbientGlow } from '@/components/visuals/AmbientGlow'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { perceptionCopy } from '@/content/copy'
import { ambientDrift, lightSweep } from '@/styles/motion'
import { energyBorderGlow } from '@/styles/energyBorder'

const Section = styled.section`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.navy};
  padding-block: ${({ theme }) => theme.space[20]};
`

const ContextLabel = styled.p`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[4]}`};
  border: 1px solid ${({ theme }) => theme.colors.borderGold};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.goldAlpha(0.08)};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: ${({ theme }) => theme.space[8]};

  svg {
    width: 14px;
    height: 14px;
  }
`

const Grid = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space[6]};
  position: relative;
  z-index: 1;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.md}px)`} {
    grid-template-columns: repeat(2, 1fr);
  }
`

const pulse = keyframes`
  0%, 100% { opacity: 0.35; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.08); }
`

const CardOffset = styled.li<{ $offset: boolean }>`
  ${({ theme, $offset }) =>
    $offset
      ? css`
          @media (min-width: ${theme.breakpoints.md}px) {
            transform: translateY(${theme.space[5]});
          }
        `
      : ''}
`

const Card = styled.article<{ $energy: boolean; $floatDelay: number }>`
  position: relative;
  height: 100%;
  padding: ${({ theme }) => theme.space[6]};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderOnDark};
  border-radius: ${({ theme }) => theme.radii.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
  animation: ${ambientDrift} 9s ease-in-out infinite;
  animation-delay: ${({ $floatDelay }) => $floatDelay}ms;
  transition:
    border-color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease},
    transform ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};

  ${({ $energy }) => ($energy ? energyBorderGlow : '')}

  &:hover,
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.borderGold};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const CardAura = styled.span`
  position: absolute;
  top: -20%;
  right: -15%;
  width: 55%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, ${({ theme }) => theme.colors.goldAlpha(0.12)} 0%, transparent 70%);
  animation: ${pulse} 7s ease-in-out infinite;
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.4;
  }
`

const TopSweep = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg} ${({ theme }) => theme.radii.lg} 0 0;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    width: 40%;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.goldAlpha(0.9)},
      transparent
    );
    animation: ${lightSweep} 10s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
      opacity: 0;
    }
  }
`

const QuoteMark = styled.span`
  display: inline-flex;
  color: ${({ theme }) => theme.colors.goldAlpha(0.6)};

  svg {
    width: 22px;
    height: 22px;
  }
`

const Category = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const Statement = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textOnDark};
`

const Supporting = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
`

export function PerceptionSection() {
  return (
    <Section id="percepcao-profissional">
      <AmbientGlow />
      <Container style={{ position: 'relative', zIndex: 1 }}>
        <Reveal>
          <ContextLabel>
            <Sparkle aria-hidden="true" />
            {perceptionCopy.contextLabel}
          </ContextLabel>
        </Reveal>

        <SectionHeading
          eyebrow={perceptionCopy.eyebrow}
          heading={perceptionCopy.heading}
          lead={perceptionCopy.lead}
        />

        <Grid>
          {perceptionCopy.cards.map((card, index) => (
            <CardOffset key={card.category} $offset={index % 2 === 1}>
              <Reveal delayMs={index * 100} offsetPx={24}>
                <Card $energy={index === 0 || index === 2} $floatDelay={index * 700}>
                  {index === 1 || index === 3 ? <CardAura aria-hidden="true" /> : null}
                  {index === 3 ? <TopSweep aria-hidden="true" /> : null}
                  <QuoteMark aria-hidden="true">
                    <Quote fill="currentColor" />
                  </QuoteMark>
                  <Category>{card.category}</Category>
                  <Statement>{card.statement}</Statement>
                  <Supporting>{card.supporting}</Supporting>
                </Card>
              </Reveal>
            </CardOffset>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
