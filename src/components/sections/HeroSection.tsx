import { useRef } from 'react'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import styled from 'styled-components'
import { AmbientHeroBackground } from '../visuals/AmbientHeroBackground'
import { BusinessEngine } from '../visuals/BusinessEngine'
import { trackEvent } from '../../analytics/analytics'
import { contact } from '../../config/contact'
import { goldActionStyles } from '../../styles/actions'
import { EASE } from '../../utils/motionPresets'

const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl}
    ${({ theme }) => theme.spacing['4xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.md}
      ${({ theme }) => theme.spacing['3xl']};
  }
`

const Layout = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: ${({ theme }) => theme.spacing['3xl']};
  align-items: center;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing['2xl']};
  }
`

const CopyColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 620px;
`

const Eyebrow = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.gold};
`

const Heading = styled(motion.h1)`
  font-size: clamp(2rem, 1.4rem + 2.4vw, ${({ theme }) => theme.typography.sizes['4xl']});
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.white};
`

const Paragraph = styled(motion.p)`
  max-width: 52ch;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
`

const CtaRow = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const PrimaryCta = styled.a`
  ${goldActionStyles}
`

const SecondaryCta = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: 44px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: transparent;
  color: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  letter-spacing: 0.03em;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
    background: rgba(253, 207, 69, 0.06);
  }

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(3px);
  }
`

const CredibilityLine = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.metallicGray};
  letter-spacing: 0.01em;
`

const EngineColumn = styled(motion.div)`
  display: flex;
  justify-content: center;
`

function buildEntranceProps(delay: number, reduceMotion: boolean) {
  if (reduceMotion) {
    return { initial: false as const }
  }

  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  }
}

export function HeroSection() {
  const engineRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  function handleSecondaryCtaClick() {
    trackEvent('cta_click', { placement_id: 'hero_secondary' })

    const node = engineRef.current
    if (!node) return

    node.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
      block: 'center',
    })
    node.focus({ preventScroll: true })
  }

  return (
    <Section>
      <AmbientHeroBackground />
      <Layout>
        <CopyColumn>
          <Eyebrow {...buildEntranceProps(0, !!shouldReduceMotion)}>
            ENGENHARIA DE SOFTWARE PARA REFORMA, ARQUITETURA E CONSTRUÇÃO
          </Eyebrow>
          <Heading {...buildEntranceProps(0.08, !!shouldReduceMotion)}>
            Tecnologia trabalhando para sua empresa vender mais, atender melhor e operar com menos
            esforço.
          </Heading>
          <Paragraph {...buildEntranceProps(0.16, !!shouldReduceMotion)}>
            Landing pages, tráfego estratégico, sistemas sob medida e agentes de IA conectados a
            uma estratégia única de crescimento.
          </Paragraph>
          <CtaRow {...buildEntranceProps(0.24, !!shouldReduceMotion)}>
            <PrimaryCta
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('generate_lead', { placement_id: 'hero_primary' })}
            >
              <MessageCircle aria-hidden="true" />
              QUERO TER MAIS RESULTADOS
            </PrimaryCta>
            <SecondaryCta
              type="button"
              aria-controls="business-engine"
              onClick={handleSecondaryCtaClick}
            >
              VER A ENGENHARIA EM AÇÃO
              <ArrowRight aria-hidden="true" />
            </SecondaryCta>
          </CtaRow>
          <CredibilityLine {...buildEntranceProps(0.32, !!shouldReduceMotion)}>
            Diagnóstico estratégico • Solução sob medida • Atendimento direto
          </CredibilityLine>
        </CopyColumn>
        <EngineColumn {...buildEntranceProps(0.2, !!shouldReduceMotion)}>
          <BusinessEngine ref={engineRef} />
        </EngineColumn>
      </Layout>
    </Section>
  )
}
