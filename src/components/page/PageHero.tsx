import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { AmbientGlow } from '@/components/visuals/AmbientGlow'

interface PageHeroCta {
  label: string
  to: string
}

interface PageHeroProps {
  eyebrow?: string
  heading: ReactNode
  supporting: ReactNode
  primaryCta: PageHeroCta
  secondaryCta?: PageHeroCta
}

const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding-block: ${({ theme }) => `calc(${theme.layout.headerHeight} + ${theme.space[16]}) ${theme.space[16]}`};
  background: ${({ theme }) => theme.colors.navy};

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    padding-block: ${({ theme }) => `calc(${theme.layout.headerHeight} + ${theme.space[24]}) ${theme.space[20]}`};
  }
`

const Content = styled(Container)`
  position: relative;
  z-index: 1;
  max-width: 48rem;
`

const Eyebrow = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.space[4]};
`

const Heading = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  color: ${({ theme }) => theme.colors.textOnDark};
`

const Supporting = styled.div`
  margin-top: ${({ theme }) => theme.space[5]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
  max-width: 56ch;
`

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[3]};
  margin-top: ${({ theme }) => theme.space[8]};
`

/** Hero compartilhado por todas as páginas de rota — home e páginas de serviço. */
export function PageHero({ eyebrow, heading, supporting, primaryCta, secondaryCta }: PageHeroProps) {
  return (
    <Section>
      <AmbientGlow />
      <Content>
        {eyebrow ? (
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
        ) : null}
        <Reveal delayMs={60}>
          <Heading>{heading}</Heading>
        </Reveal>
        <Reveal delayMs={120}>
          <Supporting>{supporting}</Supporting>
        </Reveal>
        <Reveal delayMs={180}>
          <CtaRow>
            <Button as={Link} to={primaryCta.to}>
              {primaryCta.label}
            </Button>
            {secondaryCta ? (
              <Button as={Link} to={secondaryCta.to} $variant="secondary">
                {secondaryCta.label}
              </Button>
            ) : null}
          </CtaRow>
        </Reveal>
      </Content>
    </Section>
  )
}
