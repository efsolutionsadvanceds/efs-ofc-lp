import { Info } from 'lucide-react'
import type { CSSProperties } from 'react'
import styled, { css } from 'styled-components'

import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AmbientGlow } from '@/components/visuals/AmbientGlow'
import { type ImpactCardConfig, impactStageConfig } from '@/content/impactStageConfig'
import { illustrativeScenarios, type IllustrativeScenario } from '@/content/testimonials'
import { useReveal } from '@/hooks/useReveal'
import { useSectionActive } from '@/hooks/useSectionActive'
import { energyBorderGlow } from '@/styles/energyBorder'
import {
  ambientFloat,
  depthFloat,
  energyRingPulse,
  fadeUp,
  floatDrift,
  orbitReverse,
  rotateSlow,
  settleFromDepth,
  settleFromLeft,
  settleFromRight,
} from '@/styles/motion'

const impactCopy = {
  eyebrow: 'IMPACTO NA ROTINA',
  heading: 'Quando tecnologia e processo trabalham juntos, o que pode mudar no dia a dia?',
  lead: 'Veja cenários ilustrativos de como uma presença digital e uma operação mais estruturada podem reduzir atritos, organizar informações e fortalecer novas oportunidades.',
  disclosure: 'Cenários ilustrativos — exemplos de impacto possível, não depoimentos de clientes.',
}

const Section = styled.section`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.navy};
  padding-block: ${({ theme }) => theme.space[20]};

  &[data-paused='true'] * {
    animation-play-state: paused !important;
  }
`

const Disclosure = styled.p`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space[3]};
  max-width: 62ch;
  padding: ${({ theme }) => `${theme.space[4]} ${theme.space[5]}`};
  margin-bottom: ${({ theme }) => theme.space[10]};
  border: 1px solid ${({ theme }) => theme.colors.borderGold};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.goldAlpha(0.08)};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textOnDark};

  svg {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-top: 2px;
    color: ${({ theme }) => theme.colors.gold};
  }
`

const Stage = styled.div`
  position: relative;
`

const StageBackdrop = styled.div`
  display: none;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    display: flex;
    position: absolute;
    inset: 0;
    align-items: center;
    justify-content: center;
    z-index: 0;
    pointer-events: none;
  }
`

const OrbitRing = styled.span<{ $size: number; $duration: number; $reverse?: boolean }>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.borderGold};
  opacity: 0.3;
  animation: ${({ $reverse }) => ($reverse ? orbitReverse : rotateSlow)} ${({ $duration }) => $duration}s linear
    infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const CrossLines = styled.span`
  position: absolute;
  inset: 0;
  opacity: 0.4;
  background:
    linear-gradient(90deg, transparent 0%, ${({ theme }) => theme.colors.borderGold} 50%, transparent 100%) center /
      100% 1px no-repeat,
    linear-gradient(0deg, transparent 0%, ${({ theme }) => theme.colors.borderGold} 50%, transparent 100%) center /
      1px 100% no-repeat;
`

const BrandAnchor = styled.div`
  position: relative;
  width: 132px;
  height: 132px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const EnergyRing = styled.span<{ $delayMs: number }>`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.gold};
  animation: ${energyRingPulse} 4.5s ease-out ${({ $delayMs }) => $delayMs}ms infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`

const BrandMarkImg = styled.img`
  position: relative;
  z-index: 1;
  width: 74px;
  height: 74px;
  border-radius: ${({ theme }) => theme.radii.md};
  filter: drop-shadow(0 0 20px ${({ theme }) => theme.colors.goldAlpha(0.35)});
`

const CardGrid = styled.ul`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space[5]};

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.md}px)`} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    grid-template-columns: repeat(4, 1fr);
    gap: ${({ theme }) => theme.space[6]};
  }
`

const entryKeyframeFor = (direction: ImpactCardConfig['entryDirection']) =>
  direction === 'left' ? settleFromLeft : direction === 'right' ? settleFromRight : settleFromDepth

const CardArticle = styled.article<{
  $visible: boolean
  $entryDirection: ImpactCardConfig['entryDirection']
  $depth: 1 | 2
  $floatDurationS: number
  $floatDelayMs: number
  $energy: boolean
}>`
  position: relative;
  height: 100%;
  padding: ${({ theme }) => theme.space[5]};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderOnDark};
  border-radius: ${({ theme }) => theme.radii.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition:
    border-color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease},
    box-shadow ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};

  ${({ $energy }) => ($energy ? energyBorderGlow : '')}

  ${({ $visible, $floatDurationS, $floatDelayMs }) =>
    $visible
      ? css`
          animation:
            ${fadeUp} 600ms ease both,
            ${ambientFloat} ${$floatDurationS}s ease-in-out ${$floatDelayMs}ms infinite;
        `
      : ''}

  ${({ theme, $visible, $entryDirection, $depth, $floatDurationS, $floatDelayMs }) =>
    $visible
      ? css`
          ${`@media (min-width: ${theme.breakpoints.lg}px)`} {
            animation:
              ${entryKeyframeFor($entryDirection)} 700ms ${theme.motion.ease} both,
              ${$depth === 2 ? depthFloat : floatDrift} ${$floatDurationS}s ease-in-out ${$floatDelayMs}ms infinite;
          }
        `
      : ''}

  &:hover,
  &:focus-within {
    z-index: 5;
    border-color: ${({ theme }) => theme.colors.borderGold};
    box-shadow: ${({ theme }) => theme.shadows.md};
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`

const Label = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const Statement = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textOnDark};
`

const Impact = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
`

interface ImpactCardProps {
  scenario: IllustrativeScenario
  config: ImpactCardConfig
}

function ImpactCard({ scenario, config }: ImpactCardProps) {
  const { ref, isVisible } = useReveal<HTMLLIElement>({ threshold: 0.2, delayMs: config.delayMs })

  const cssVars = {
    '--card-rotate': `${config.rotate}deg`,
    '--card-offset-y': `${config.offsetY}px`,
  } as CSSProperties

  return (
    <li ref={ref} style={cssVars}>
      <CardArticle
        $visible={isVisible}
        $entryDirection={config.entryDirection}
        $depth={config.depth}
        $floatDurationS={config.floatDurationS}
        $floatDelayMs={config.floatDelayMs}
        $energy={config.depth === 2}
      >
        <Label>{scenario.label}</Label>
        <Statement>{scenario.statement}</Statement>
        <Impact>{scenario.impact}</Impact>
      </CardArticle>
    </li>
  )
}

export function ImpactSection() {
  const { ref: sectionRef, isActive } = useSectionActive<HTMLElement>()

  return (
    <Section id="impactos" ref={sectionRef} data-paused={!isActive}>
      <AmbientGlow flip />
      <Container style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading eyebrow={impactCopy.eyebrow} heading={impactCopy.heading} lead={impactCopy.lead} />

        <Reveal>
          <Disclosure id="impactos-disclosure">
            <Info aria-hidden="true" />
            {impactCopy.disclosure}
          </Disclosure>
        </Reveal>

        <Stage>
          <StageBackdrop aria-hidden="true">
            <OrbitRing $size={280} $duration={70} />
            <OrbitRing $size={200} $duration={55} $reverse />
            <BrandAnchor>
              <CrossLines />
              <EnergyRing $delayMs={0} />
              <EnergyRing $delayMs={1500} />
              <EnergyRing $delayMs={3000} />
              <BrandMarkImg src="/assets/logo-mark.png" width={74} height={74} alt="" />
            </BrandAnchor>
          </StageBackdrop>

          <CardGrid aria-describedby="impactos-disclosure">
            {illustrativeScenarios.map((scenario, index) => (
              <ImpactCard
                key={scenario.id}
                scenario={scenario}
                config={impactStageConfig[index] ?? impactStageConfig[0]!}
              />
            ))}
          </CardGrid>
        </Stage>
      </Container>
    </Section>
  )
}
