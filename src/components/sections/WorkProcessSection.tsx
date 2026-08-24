import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import styled from 'styled-components'
import { EngineeringBlueprint } from '../visuals/EngineeringBlueprint'
import { processSteps } from '../../data/processSteps'
import type { ProcessStep } from '../../data/processSteps'
import { buildViewportRevealProps } from '../../utils/motionPresets'
import {
  ContentWrapper,
  Eyebrow,
  SectionContainer,
  SectionHeading,
  SectionIntro,
  SectionParagraph,
} from './sectionPrimitives'

const ScrollArea = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: ${({ theme }) => theme.spacing['2xl']};
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: 1fr;
  }
`

const StickyColumn = styled.div`
  position: sticky;
  top: ${({ theme }) => theme.spacing['4xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    display: none;
  }
`

const MobileBlueprintTeaser = styled.div`
  display: none;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    display: block;
  }
`

const StepsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing['2xl']};
  }
`

const StepBlock = styled.div<{ $isActive: boolean }>`
  position: relative;
  padding-left: ${({ theme }) => theme.spacing.lg};
  border-left: 2px solid
    ${({ theme, $isActive }) => ($isActive ? theme.colors.gold : theme.colors.borderSubtle)};
  transition: border-color 0.3s ease;

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    min-height: 46vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

const StepNumber = styled.span`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.typography.fontFamilyMono};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.gold};
`

const StepTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.white};
`

const StepDescription = styled.p`
  margin: 0;
  max-width: 52ch;
  font-size: ${({ theme }) => theme.typography.sizes.md};
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
`

const StepDirection = styled.p`
  margin: ${({ theme }) => theme.spacing.sm} 0 0;
  font-family: ${({ theme }) => theme.typography.fontFamilyMono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.metallicGray};
`

interface StepEntryProps {
  step: ProcessStep
  index: number
  onActiveChange: (index: number, isActive: boolean) => void
}

function StepEntry({ step, index, onActiveChange }: StepEntryProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '-42% 0px -42% 0px' })

  useEffect(() => {
    onActiveChange(index, isInView)
  }, [isInView, index, onActiveChange])

  return (
    <StepBlock ref={ref} $isActive={isInView}>
      <StepNumber>{step.number}</StepNumber>
      <StepTitle>{step.title}</StepTitle>
      <StepDescription>{step.description}</StepDescription>
      <StepDirection>{step.directionLabel}</StepDirection>
    </StepBlock>
  )
}

export function WorkProcessSection() {
  const shouldReduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const activeFlagsRef = useRef<boolean[]>(processSteps.map((_, index) => index === 0))

  const handleActiveChange = useCallback((index: number, isActive: boolean) => {
    const flags = activeFlagsRef.current
    if (flags[index] === isActive) return
    flags[index] = isActive

    const lastActive = flags.lastIndexOf(true)
    if (lastActive !== -1) {
      setActiveIndex((prev) => (prev === lastActive ? prev : lastActive))
    }
  }, [])

  const activeStep = processSteps[activeIndex]

  return (
    <SectionContainer id="como-atuamos">
      <ContentWrapper>
        <SectionIntro {...buildViewportRevealProps({ reduceMotion: !!shouldReduceMotion })}>
          <Eyebrow>DO GARGALO À SOLUÇÃO</Eyebrow>
          <SectionHeading>
            Engenharia com método, clareza e decisões que fazem sentido para o negócio.
          </SectionHeading>
          <SectionParagraph>
            Cada projeto começa pelo problema certo e avança com prioridades, validação e
            transparência em cada etapa.
          </SectionParagraph>
        </SectionIntro>

        <MobileBlueprintTeaser>
          <EngineeringBlueprint
            activeIndex={processSteps.length - 1}
            totalSteps={processSteps.length}
            status="Visão geral do processo"
            variant="static"
          />
        </MobileBlueprintTeaser>

        <ScrollArea>
          <StickyColumn>
            <EngineeringBlueprint
              activeIndex={activeIndex}
              totalSteps={processSteps.length}
              status={activeStep.cinematicStatus}
              variant="interactive"
            />
          </StickyColumn>
          <StepsColumn>
            {processSteps.map((step, index) => (
              <StepEntry
                key={step.id}
                step={step}
                index={index}
                onActiveChange={handleActiveChange}
              />
            ))}
          </StepsColumn>
        </ScrollArea>
      </ContentWrapper>
    </SectionContainer>
  )
}
