import styled from 'styled-components'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { AmbientGlow } from '@/components/visuals/AmbientGlow'
import { finalCtaCopy } from '@/content/copy'
import { lightSweep } from '@/styles/motion'

const Section = styled.section`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.navy};
  padding-block: ${({ theme }) => theme.space[20]};
`

const Content = styled(Container)`
  position: relative;
  z-index: 1;
`

const Panel = styled.div`
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.space[10]};
  border-top: 3px solid ${({ theme }) => theme.colors.gold};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[5]};
  text-align: center;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: -60%;
    left: 0;
    width: 35%;
    height: 220%;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.goldAlpha(0.16)},
      transparent
    );
    animation: ${lightSweep} 12s ease-in-out infinite;
    pointer-events: none;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
      display: none;
    }
  }
`

const Heading = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  max-width: 32ch;
`

const Text = styled.p`
  max-width: 52ch;
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
`

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.space[3]};
`

export function FinalCtaSection() {
  return (
    <Section id="proximo-passo">
      <AmbientGlow />
      <Content>
        <Reveal>
          <Panel>
            <Heading>{finalCtaCopy.heading}</Heading>
            <Text>{finalCtaCopy.text}</Text>
            <CtaRow>
              <Button as="a" href="#contato-hero">
                {finalCtaCopy.primaryCta}
              </Button>
            </CtaRow>
          </Panel>
        </Reveal>
      </Content>
    </Section>
  )
}
