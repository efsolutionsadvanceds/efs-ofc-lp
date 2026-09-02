import { ArrowRight } from 'lucide-react'
import styled, { css, keyframes } from 'styled-components'

import { ContactForm } from '@/components/form/ContactForm'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { heroCopy } from '@/content/copy'
import { textSheen } from '@/styles/motion'

import { ArchitecturalGrid, CheckerFade, HeroVignette, ReadabilityGradient } from '../visuals/HeroOverlays'
import { HeroLogoWatermark } from '../visuals/HeroLogoWatermark'
import { HeroVideoLayer } from '../visuals/HeroVideoLayer'
import { BlueprintScene } from '../visuals/BlueprintScene'

const clipReveal = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const formEnter = keyframes`
  from {
    opacity: 0;
    transform: translateX(28px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const Section = styled.section`
  position: relative;
  isolation: isolate;
  padding-top: 132px;
  padding-bottom: ${({ theme }) => theme.space[16]};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.navy};

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding-top: 84px;
    padding-bottom: ${({ theme }) => theme.space[6]};
  }
`

const Grid = styled.div`
  position: relative;
  z-index: 7;
  display: grid;
  gap: ${({ theme }) => theme.space[10]};

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    grid-template-columns: minmax(0, 7fr) minmax(340px, 5fr);
    align-items: center;
    gap: ${({ theme }) => theme.space[8]};
  }
`

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
  /* Sem isto, o item do grid não encolhe abaixo da largura "preferida" do
     texto (min-width:auto implícito), estourando a viewport no mobile. */
  min-width: 0;
`

const Eyebrow = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.gold};
  opacity: 0;
  animation: ${fadeUp} ${({ theme }) => theme.motion.durationBase} ${({ theme }) => theme.motion.ease} 80ms both;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }
`

const Heading = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  color: ${({ theme }) => theme.colors.textOnDark};
`

const LineClip = styled.span`
  display: block;
  overflow: hidden;
  padding-bottom: 0.2em;
  margin-bottom: -0.2em;
`

const LineInner = styled.span<{ $delayMs: number; $isGold?: boolean }>`
  display: block;
  color: ${({ theme, $isGold }) => ($isGold ? theme.colors.gold : 'inherit')};
  transform: translateY(100%);
  animation: ${clipReveal} ${({ theme }) => theme.motion.durationSlow} ${({ theme }) => theme.motion.ease}
    ${({ $delayMs }) => $delayMs}ms both;

  ${({ $isGold, theme, $delayMs }) =>
    $isGold
      ? css`
          @supports (background-clip: text) or (-webkit-background-clip: text) {
            background-image: linear-gradient(
              100deg,
              ${theme.colors.gold} 42%,
              ${theme.colors.textOnDark} 50%,
              ${theme.colors.gold} 58%
            );
            background-size: 260% 100%;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation:
              ${clipReveal} ${theme.motion.durationSlow} ${theme.motion.ease} ${$delayMs}ms both,
              ${textSheen} 11s ease-in-out infinite 1.6s;

            @media (prefers-reduced-motion: reduce) {
              animation: ${clipReveal} ${theme.motion.durationSlow} ${theme.motion.ease} both;
              background-position: 0 0;
            }
          }
        `
      : ''}

  @media (prefers-reduced-motion: reduce) {
    transform: none;
  }
`

const Supporting = styled.p`
  max-width: 56ch;
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
  opacity: 0;
  animation: ${fadeUp} ${({ theme }) => theme.motion.durationBase} ${({ theme }) => theme.motion.ease} 560ms both;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }
`

const OutcomeList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[1]};
`

const OutcomeItem = styled.li<{ $delayMs: number }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textOnDark};
  opacity: 0;
  animation: ${fadeUp} ${({ theme }) => theme.motion.durationBase} ${({ theme }) => theme.motion.ease}
    ${({ $delayMs }) => $delayMs}ms both;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.gold};
    flex-shrink: 0;
  }
`

const NicheLine = styled.p`
  max-width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textOnDarkSubtle};
  opacity: 0;
  animation: ${fadeUp} ${({ theme }) => theme.motion.durationBase} ${({ theme }) => theme.motion.ease} 760ms both;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.md}px)`} {
    white-space: normal;
    overflow-x: visible;
  }
`

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[3]};
  opacity: 0;
  animation: ${fadeUp} ${({ theme }) => theme.motion.durationBase} ${({ theme }) => theme.motion.ease} 840ms both;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }
`

const FormColumn = styled.div`
  min-width: 0;
  opacity: 0;
  animation: ${formEnter} ${({ theme }) => theme.motion.durationSlow} ${({ theme }) => theme.motion.ease} 460ms both;

  &:focus {
    outline: none;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }
`

export function HeroSection() {
  return (
    <Section id="topo">
      <HeroVideoLayer />
      <ReadabilityGradient aria-hidden="true" />
      <ArchitecturalGrid aria-hidden="true" />
      <CheckerFade aria-hidden="true" />
      <HeroVignette aria-hidden="true" />
      <BlueprintScene />
      <HeroLogoWatermark />
      <Container>
        <Grid>
          <ContentColumn>
            <Eyebrow>{heroCopy.eyebrow}</Eyebrow>

            <Heading>
              {heroCopy.headingLines.map((line, index) => (
                <LineClip key={line}>
                  <LineInner $delayMs={140 + index * 110} $isGold={index === heroCopy.headingGoldLineIndex}>
                    {line}
                  </LineInner>
                </LineClip>
              ))}
            </Heading>

            <Supporting>{heroCopy.supporting}</Supporting>

            <OutcomeList>
              {heroCopy.outcomePoints.map((point, index) => (
                <OutcomeItem key={point} $delayMs={640 + index * 70}>
                  {point}
                </OutcomeItem>
              ))}
            </OutcomeList>

            <NicheLine>{heroCopy.nicheLine}</NicheLine>

            <CtaRow>
              <MagneticButton>
                <Button as="a" href="#contato-hero">
                  {heroCopy.primaryCta}
                  <ArrowRight aria-hidden="true" size={18} />
                </Button>
              </MagneticButton>
              <Button as="a" href="#problemas" $variant="secondary">
                {heroCopy.secondaryCta}
              </Button>
            </CtaRow>
          </ContentColumn>

          <FormColumn id="contato-hero" tabIndex={-1}>
            <ContactForm />
          </FormColumn>
        </Grid>
      </Container>
    </Section>
  )
}
