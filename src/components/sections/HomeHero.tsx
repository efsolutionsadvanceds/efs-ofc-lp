import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Container } from '@/components/ui/Container'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { MaskedHeadline } from '@/components/ui/MaskedHeadline'
import { Reveal } from '@/components/ui/Reveal'
import { SceneLight } from '@/components/visuals/SceneLight'
import { usePointerGlow } from '@/hooks/usePointerGlow'

const Section = styled.section`
  position: relative;
  overflow: hidden;
  min-height: 92vh;
  display: flex;
  align-items: center;
  padding-block: ${({ theme }) => `calc(${theme.layout.headerHeight} + ${theme.space[12]}) ${theme.space[16]}`};
  background: radial-gradient(ellipse 120% 80% at 50% -10%, ${({ theme }) => theme.colors.midnight} 0%, ${({ theme }) => theme.colors.navy} 55%, ${({ theme }) => theme.colors.black} 100%);

  @media (prefers-reduced-motion: reduce) {
    min-height: auto;
  }
`

const Content = styled(Container)`
  position: relative;
  z-index: 1;
  max-width: 54rem;
`

const Badge = styled(GlassPanel)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[4]}`};
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.iceBlue};
  margin-bottom: ${({ theme }) => theme.space[6]};

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 8px 2px ${({ theme }) => theme.colors.glowGreen};
  }
`

const Supporting = styled.p`
  margin-top: ${({ theme }) => theme.space[6]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
  max-width: 54ch;
`

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
  margin-top: ${({ theme }) => theme.space[10]};
`

const PrimaryCta = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  min-height: 52px;
  padding: ${({ theme }) => `${theme.space[4]} ${theme.space[8]}`};
  border-radius: ${({ theme }) => theme.radii.pill};
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.textOnAccent};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.borderAccent}, 0 12px 32px ${({ theme }) => theme.colors.glowGreen};
  transition:
    transform ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease},
    box-shadow ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};

  svg {
    width: 18px;
    height: 18px;
    transition: transform ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};
  }

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.accent}, 0 16px 40px ${({ theme }) => theme.colors.glowGreen};
  }

  &:hover svg,
  &:focus-visible svg {
    transform: translateX(3px);
  }

  &:active {
    transform: translateY(0);
  }
`

const SecondaryCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 52px;
  padding: ${({ theme }) => `${theme.space[4]} ${theme.space[6]}`};
  border-radius: ${({ theme }) => theme.radii.pill};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textOnDark};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  background: ${({ theme }) => theme.colors.glass};
  transition:
    border-color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease},
    color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};

  &:hover,
  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.accentBlue};
    color: ${({ theme }) => theme.colors.iceBlue};
  }
`

export function HomeHero() {
  const pointerRef = usePointerGlow<HTMLElement>()

  return (
    <Section ref={pointerRef}>
      <SceneLight variant="hero" />
      <Content>
        <Reveal>
          <Badge as="div">Sites · Sistemas · Automações · SEO</Badge>
        </Reveal>

        <MaskedHeadline text="Criação de sites, sistemas e automações para o seu negócio." />

        <Reveal delayMs={420}>
          <Supporting>
            Precisa de um site profissional, de um sistema personalizado ou de um atendimento mais ágil? A E.F
            Solutions desenvolve soluções tecnológicas para ajudar sua empresa a conquistar oportunidades, economizar
            tempo e trabalhar melhor.
          </Supporting>
        </Reveal>

        <Reveal delayMs={520}>
          <CtaRow>
            <PrimaryCta to="/contato">
              Solicitar orçamento
              <ArrowRight aria-hidden="true" />
            </PrimaryCta>
            <SecondaryCta to="/solucoes">Conhecer soluções</SecondaryCta>
          </CtaRow>
        </Reveal>
      </Content>
    </Section>
  )
}
