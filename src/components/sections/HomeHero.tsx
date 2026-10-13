import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { MaskedHeadline } from '@/components/ui/MaskedHeadline'
import { Reveal } from '@/components/ui/Reveal'
import { Typewriter } from '@/components/ui/Typewriter'
import { SceneLight } from '@/components/visuals/SceneLight'
import { usePointerGlow } from '@/hooks/usePointerGlow'

const floatSlow = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-16px) rotate(4deg); }
`

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

const FloatingGlyph = styled.span<{ $top: string; $left: string; $delayS: number }>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accentBlueAlpha(0.3)};
  animation: ${floatSlow} 6s ease-in-out infinite;
  animation-delay: ${({ $delayS }) => $delayS}s;
  pointer-events: none;
  display: none;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    display: block;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
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
  min-width: 15ch;
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
    flex-shrink: 0;
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

export function HomeHero() {
  const pointerRef = usePointerGlow<HTMLElement>()

  return (
    <Section ref={pointerRef}>
      <SceneLight variant="hero" />
      <FloatingGlyph $top="18%" $left="78%" $delayS={0} aria-hidden="true">
        {'{ }'}
      </FloatingGlyph>
      <FloatingGlyph $top="62%" $left="85%" $delayS={1.5} aria-hidden="true">
        {'</>'}
      </FloatingGlyph>
      <FloatingGlyph $top="72%" $left="8%" $delayS={3} aria-hidden="true">
        {'$_'}
      </FloatingGlyph>
      <Content>
        <Reveal>
          <Badge as="div">
            <Typewriter words={['sites_', 'sistemas_', 'automações_', 'seo_']} />
          </Badge>
        </Reveal>

        <MaskedHeadline text="Criação de sites, sistemas e automações para o seu negócio." />

        <Reveal delayMs={420}>
          <Supporting>
            Site travado, sistema que não existe ou atendimento manual demais? A E.F Solutions resolve isso — rápido,
            direto, sem enrolação.
          </Supporting>
        </Reveal>

        <Reveal delayMs={520}>
          <CtaRow>
            <Button as={Link} to="/contato">
              Falar no WhatsApp
              <ArrowRight aria-hidden="true" />
            </Button>
            <Button as={Link} to="/solucoes" $variant="secondary">
              Ver soluções
            </Button>
          </CtaRow>
        </Reveal>
      </Content>
    </Section>
  )
}
