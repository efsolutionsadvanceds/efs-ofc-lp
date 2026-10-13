import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { Reveal } from '@/components/ui/Reveal'
import { SceneLight } from '@/components/visuals/SceneLight'
import { site } from '@/config/site'
import { lightSweep } from '@/styles/motion'

interface FinalCtaProps {
  heading: string
  text: string
  /** Padrão: abre o WhatsApp da empresa. Passe `ctaTo` para linkar a uma rota interna (ex.: /contato) em vez disso. */
  ctaLabel?: string
  ctaTo?: string
}

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

const Panel = styled(GlassPanel)`
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.space[10]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[5]};
  text-align: center;
  align-items: center;
  max-width: 44rem;
  margin-inline: auto;

  &::after {
    content: '';
    position: absolute;
    top: -60%;
    left: 0;
    width: 35%;
    height: 220%;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.accentAlpha(0.16)}, transparent);
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

/** Painel de CTA final reutilizado ao fim de toda página de rota. */
export function FinalCta({ heading, text, ctaLabel = 'Conversar pelo WhatsApp', ctaTo }: FinalCtaProps) {
  return (
    <Section>
      <SceneLight variant="section" />
      <Content>
        <Reveal>
          <Panel $accentBorder>
            <Heading>{heading}</Heading>
            <Text>{text}</Text>
            {ctaTo ? (
              <Button as={Link} to={ctaTo}>
                {ctaLabel}
              </Button>
            ) : (
              <Button as="a" href={site.whatsapp.url}>
                {ctaLabel}
              </Button>
            )}
          </Panel>
        </Reveal>
      </Content>
    </Section>
  )
}
