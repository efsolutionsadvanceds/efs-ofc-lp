import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AmbientGlow } from '@/components/visuals/AmbientGlow'
import { processCopy } from '@/content/copy'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useReveal } from '@/hooks/useReveal'
import { fadeIn } from '@/styles/motion'

const Section = styled.section`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  padding-block: ${({ theme }) => theme.space[20]};
`

const Content = styled(Container)`
  position: relative;
  z-index: 1;
`

const Layout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[8]};

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    grid-template-columns: minmax(0, 6fr) minmax(0, 6fr);
    align-items: start;
  }
`

const List = styled.ol`
  display: flex;
  flex-direction: column;
  position: relative;
`

const StepButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space[4]};
  width: 100%;
  padding-block: ${({ theme }) => theme.space[4]};
  text-align: left;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderOnDark};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.6)};
  transition:
    opacity ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease},
    border-color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};

  &:hover,
  &:focus-visible {
    opacity: 1;
  }

  &:last-child {
    border-bottom: none;
  }
`

const Badge = styled.span<{ $isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 2px solid ${({ theme }) => theme.colors.gold};
  background: ${({ theme, $isActive }) => ($isActive ? theme.colors.gold : 'transparent')};
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.textOnGold : theme.colors.gold)};
  font-weight: 800;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition:
    background-color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease},
    color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};
`

const StepContent = styled.div`
  padding-top: ${({ theme }) => theme.space[1]};
`

const StepTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textOnDark};
  margin-bottom: ${({ theme }) => theme.space[2]};
`

const StepDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
  max-width: 46ch;
`

const MediaPanel = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderOnDark};
  background: ${({ theme }) => theme.colors.navy};
  display: none;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    display: block;
    position: sticky;
    top: ${({ theme }) => theme.space[10]};
  }
`

const MediaVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: ${fadeIn} ${({ theme }) => theme.motion.durationSlow} ${({ theme }) => theme.motion.ease} both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const CtaRow = styled.div`
  display: flex;
  padding-top: ${({ theme }) => theme.space[6]};
`

export function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const listRef = useRef<HTMLOListElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const activeStep = processCopy.steps[activeIndex] ?? processCopy.steps[0]!
  /** Só carrega o primeiro vídeo quando a seção realmente se aproxima do viewport — nunca no mount inicial. */
  const { ref: sectionRef, isVisible: hasEnteredViewport } = useReveal<HTMLElement>({ threshold: 0, delayMs: 0 })

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const buttons = Array.from(list.querySelectorAll<HTMLButtonElement>('[data-step-index]'))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return
        const closest = visible.reduce((best, entry) =>
          Math.abs(entry.boundingClientRect.top) < Math.abs(best.boundingClientRect.top) ? entry : best,
        )
        const index = Number((closest.target as HTMLElement).dataset.stepIndex)
        if (!Number.isNaN(index)) setActiveIndex(index)
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0 },
    )

    buttons.forEach((button) => observer.observe(button))
    return () => observer.disconnect()
  }, [])

  return (
    <Section id="como-funciona" ref={sectionRef}>
      <AmbientGlow flip />
      <Content>
        <SectionHeading eyebrow={processCopy.eyebrow} heading={processCopy.heading} lead={processCopy.lead} />

        <Layout>
          <List ref={listRef}>
            {processCopy.steps.map((step, index) => (
              <li key={step.title}>
                <StepButton
                  type="button"
                  data-step-index={index}
                  $isActive={index === activeIndex}
                  aria-current={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                >
                  <Badge aria-hidden="true" $isActive={index === activeIndex}>
                    {index + 1}
                  </Badge>
                  <StepContent>
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </StepContent>
                </StepButton>
              </li>
            ))}
          </List>

          <MediaPanel aria-hidden="true">
            {hasEnteredViewport ? (
              <MediaVideo
                key={activeStep.media.src}
                src={activeStep.media.src}
                autoPlay={!prefersReducedMotion}
                muted
                loop
                playsInline
                preload="metadata"
                disablePictureInPicture
                controls={false}
              />
            ) : null}
          </MediaPanel>
        </Layout>

        <CtaRow>
          <Button as="a" href="#contato-hero">
            {processCopy.cta}
          </Button>
        </CtaRow>
      </Content>
    </Section>
  )
}
