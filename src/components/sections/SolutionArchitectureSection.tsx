import { MessageCircle } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import styled, { useTheme } from 'styled-components'
import { trackEvent } from '../../analytics/analytics'
import { contact } from '../../config/contact'
import { solutionPillars } from '../../data/solutionPillars'
import type { SolutionPillar } from '../../data/solutionPillars'
import { goldActionStyles } from '../../styles/actions'
import { buildViewportRevealProps } from '../../utils/motionPresets'
import {
  ContentWrapper,
  Eyebrow,
  SectionContainer,
  SectionHeading,
  SectionIntro,
  SectionParagraph,
} from './sectionPrimitives'

const ArchitectureLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const PillarArticle = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceDark};
`

const PillarTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.white};
`

const PillarDescription = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
`

const ServiceList = styled.ul`
  list-style: none;
  margin: ${({ theme }) => theme.spacing.xs} 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const ServiceItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.white};

  svg {
    width: 16px;
    height: 16px;
    margin-top: 3px;
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.gold};
  }
`

const ConnectionLabel = styled.p`
  margin: ${({ theme }) => theme.spacing.sm} 0 0;
  font-family: ${({ theme }) => theme.typography.fontFamilyMono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.metallicGray};
`

const ConnectorColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing.sm} 0;
  }
`

const ConnectorSvg = styled.svg`
  display: block;
  width: 100%;
  max-width: 200px;
  height: 56px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 56px;
    height: 96px;
    transform: rotate(90deg);
  }
`

const ConnectorLabel = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamilyMono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`

const CtaBlock = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceElevated};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`

const CtaHeading = styled.h3`
  margin: 0;
  max-width: 46ch;
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.white};
`

const CtaText = styled.p`
  margin: 0;
  max-width: 52ch;
  font-size: ${({ theme }) => theme.typography.sizes.md};
  color: ${({ theme }) => theme.colors.textMuted};
`

const CtaLink = styled.a`
  ${goldActionStyles}
  margin-top: ${({ theme }) => theme.spacing.sm};
`

const CtaSupportLine = styled.p`
  margin: ${({ theme }) => theme.spacing.xs} 0 0;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.metallicGray};
`

interface PillarPanelProps {
  pillar: SolutionPillar
  reduceMotion: boolean
}

function PillarPanel({ pillar, reduceMotion }: PillarPanelProps) {
  return (
    <PillarArticle>
      <PillarTitle>{pillar.title}</PillarTitle>
      <PillarDescription>{pillar.description}</PillarDescription>
      <ServiceList>
        {pillar.services.map((service, index) => (
          <ServiceItem
            key={service}
            {...buildViewportRevealProps({ delay: index * 0.06, reduceMotion })}
          >
            <ServiceCheckIcon />
            {service}
          </ServiceItem>
        ))}
      </ServiceList>
      <ConnectionLabel>{pillar.connectionLabel}</ConnectionLabel>
    </PillarArticle>
  )
}

function ServiceCheckIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <path
        d="M3 8.5l3 3 7-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SolutionArchitectureSection() {
  const shouldReduceMotion = useReducedMotion()
  const theme = useTheme()
  const [pillarAcquisition, pillarEfficiency] = solutionPillars

  return (
    <SectionContainer id="solucoes">
      <ContentWrapper>
        <SectionIntro {...buildViewportRevealProps({ reduceMotion: !!shouldReduceMotion })}>
          <Eyebrow>ARQUITETURA DE SOLUÇÕES EFSA</Eyebrow>
          <SectionHeading>
            Duas frentes trabalhando para o mesmo objetivo: uma operação preparada para crescer.
          </SectionHeading>
          <SectionParagraph>
            Não vendemos ferramentas isoladas. Combinamos as soluções certas de acordo com o
            gargalo, a prioridade e o momento da empresa.
          </SectionParagraph>
        </SectionIntro>

        <ArchitectureLayout>
          <PillarPanel pillar={pillarAcquisition} reduceMotion={!!shouldReduceMotion} />

          <ConnectorColumn>
            <ConnectorSvg viewBox="0 0 200 56" aria-hidden="true" focusable="false">
              <motion.path
                d="M4,28 L86,28"
                fill="none"
                stroke={theme.colors.gold}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeOpacity="0.6"
                initial={shouldReduceMotion ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: 'easeOut' }}
              />
              <motion.path
                d="M114,28 L196,28"
                fill="none"
                stroke={theme.colors.gold}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeOpacity="0.6"
                initial={shouldReduceMotion ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.6,
                  delay: shouldReduceMotion ? 0 : 0.45,
                  ease: 'easeOut',
                }}
              />
              <motion.circle
                cx="100"
                cy="28"
                r="10"
                fill={theme.colors.surfaceDark}
                stroke={theme.colors.gold}
                strokeWidth="1.5"
                initial={shouldReduceMotion ? false : { scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: 'easeOut' }}
                style={{ transformOrigin: '100px 28px' }}
              />
              <circle cx="100" cy="28" r="3" fill={theme.colors.gold} />
            </ConnectorSvg>
            <ConnectorLabel>Engenharia aplicada ao negócio</ConnectorLabel>
          </ConnectorColumn>

          <PillarPanel pillar={pillarEfficiency} reduceMotion={!!shouldReduceMotion} />
        </ArchitectureLayout>

        <CtaBlock {...buildViewportRevealProps({ reduceMotion: !!shouldReduceMotion })}>
          <CtaHeading>
            Sua empresa não precisa digitalizar tudo. Precisa começar pelo gargalo certo.
          </CtaHeading>
          <CtaText>
            Converse diretamente com a EFSA para entender qual frente merece prioridade no seu
            cenário.
          </CtaText>
          <CtaLink
            href={contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('generate_lead', { placement_id: 'solucoes_cta' })}
          >
            <MessageCircle aria-hidden="true" />
            QUERO TER MAIS RESULTADOS
          </CtaLink>
          <CtaSupportLine>Conversa direta pelo WhatsApp</CtaSupportLine>
        </CtaBlock>
      </ContentWrapper>
    </SectionContainer>
  )
}
