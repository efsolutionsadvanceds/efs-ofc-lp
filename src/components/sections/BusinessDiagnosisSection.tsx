import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import styled from 'styled-components'
import { AnimatedCheck } from '../visuals/AnimatedCheck'
import { businessDiagnosisCards } from '../../data/businessDiagnosis'
import { buildViewportRevealProps } from '../../utils/motionPresets'
import {
  ContentWrapper,
  Eyebrow,
  SectionContainer,
  SectionHeading,
  SectionIntro,
  SectionParagraph,
} from './sectionPrimitives'

const CardsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const CardArticle = styled.article<{ $isActive: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid
    ${({ theme, $isActive }) => ($isActive ? theme.colors.gold : theme.colors.borderSubtle)};
  border-top-width: ${({ $isActive }) => ($isActive ? '2px' : '1px')};
  background: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.surfaceElevated : theme.colors.surfaceDark};
  transition:
    border-color 0.2s ease,
    background 0.2s ease;

  &:has(button:hover) {
    border-color: rgba(253, 207, 69, 0.4);
  }

  &:has(button:focus-visible) {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const IconBadge = styled.span<{ $isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.gold : theme.colors.metallicGray)};
  transition: color 0.2s ease;

  svg {
    width: 18px;
    height: 18px;
  }
`

const CardCategory = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.metallicGray};
`

const CardTitle = styled.h3`
  margin: 0;
`

const CardTriggerButton = styled.button`
  display: inline-block;
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.white};
  text-align: left;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
  }
`

const CardProblem = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};
`

const ConnectorTrack = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  height: 28px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`

const ConnectorCell = styled.div`
  display: flex;
  justify-content: center;
`

const ConnectorLine = styled(motion.span)`
  width: 2px;
  height: 100%;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.gold},
    rgba(253, 207, 69, 0)
  );
`

const ResponsePanel = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceDark};
`

const ResponseLabel = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const ResponseCategory = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.metallicGray};
`

const ResponseText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.white};
`

export function BusinessDiagnosisSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()
  const panelId = useId()
  const activeCard = businessDiagnosisCards[activeIndex]

  return (
    <SectionContainer id="diagnostico">
      <ContentWrapper>
        <SectionIntro {...buildViewportRevealProps({ reduceMotion: !!shouldReduceMotion })}>
          <Eyebrow>O CRESCIMENTO TRAVA NOS PONTOS QUE NÃO SE CONECTAM</Eyebrow>
          <SectionHeading>
            Oportunidades se perdem quando marketing, atendimento e operação trabalham separados.
          </SectionHeading>
          <SectionParagraph>
            A EFSA identifica onde a jornada quebra e conecta presença digital, conversão e
            eficiência operacional em uma estrutura pensada para o seu negócio.
          </SectionParagraph>
        </SectionIntro>

        <CardsGrid
          {...buildViewportRevealProps({ delay: 0.1, reduceMotion: !!shouldReduceMotion })}
        >
          {businessDiagnosisCards.map((card, index) => {
            const isActive = index === activeIndex
            const Icon = card.icon

            return (
              <CardArticle key={card.id} $isActive={isActive}>
                <CardHeader>
                  <IconBadge $isActive={isActive}>
                    <Icon aria-hidden="true" />
                  </IconBadge>
                  <AnimatedCheck isActive={isActive} size={18} />
                </CardHeader>
                <CardCategory>{card.category}</CardCategory>
                <CardTitle>
                  <CardTriggerButton
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={panelId}
                    onClick={() => setActiveIndex(index)}
                  >
                    {card.title}
                  </CardTriggerButton>
                </CardTitle>
                <CardProblem>{card.problem}</CardProblem>
              </CardArticle>
            )
          })}
        </CardsGrid>

        <ConnectorTrack aria-hidden="true">
          {businessDiagnosisCards.map((card, index) => (
            <ConnectorCell key={card.id}>
              {index === activeIndex && (
                <ConnectorLine
                  layoutId="diagnosis-connector"
                  transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: 'easeOut' }}
                />
              )}
            </ConnectorCell>
          ))}
        </ConnectorTrack>

        <ResponsePanel id={panelId} aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: 'easeOut' }}
            >
              <ResponseLabel>Como a EFSA atua</ResponseLabel>
              <ResponseCategory>{activeCard.category}</ResponseCategory>
              <ResponseText>{activeCard.response}</ResponseText>
            </motion.div>
          </AnimatePresence>
        </ResponsePanel>
      </ContentWrapper>
    </SectionContainer>
  )
}
