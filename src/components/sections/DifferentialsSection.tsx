import { MessageCircle } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import styled from 'styled-components'
import { contact } from '../../config/contact'
import { differentiators } from '../../data/differentiators'
import type { Differentiator } from '../../data/differentiators'
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

const EditorialLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
  gap: ${({ theme }) => theme.spacing['2xl']};
  align-items: start;
  padding-top: ${({ theme }) => theme.spacing['2xl']};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const StatementColumn = styled.div``

const TransparencyStatement = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.white};
`

const TransparencyLine = styled.span`
  display: block;

  &::before {
    content: '— ';
    color: ${({ theme }) => theme.colors.gold};
  }
`

const DifferentiatorRail = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  transition: background 0.2s ease;

  &:first-child {
    border-top: none;
  }

  &:hover,
  &:focus-within {
    background: ${({ theme }) => theme.colors.surfaceDark};
  }
`

const RowMarker = styled.span`
  flex-shrink: 0;
  width: 2.5ch;
  font-family: ${({ theme }) => theme.typography.fontFamilyMono};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.gold};
`

const RowIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  color: ${({ theme }) => theme.colors.metallicGray};

  svg {
    width: 18px;
    height: 18px;
  }
`

const RowBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const RowTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.white};
`

const RowDescription = styled.p`
  margin: 0;
  max-width: 56ch;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Checkpoint = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-top: 2px solid ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceElevated};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`

const CheckpointCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const CheckpointHeading = styled.h3`
  margin: 0;
  max-width: 44ch;
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.white};
`

const CheckpointText = styled.p`
  margin: 0;
  max-width: 52ch;
  font-size: ${({ theme }) => theme.typography.sizes.md};
  color: ${({ theme }) => theme.colors.textMuted};
`

const CheckpointActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.xs};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    align-items: flex-start;
  }
`

const CheckpointCtaLink = styled.a`
  ${goldActionStyles}
`

const CheckpointSupportLine = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.metallicGray};
`

interface DifferentiatorRowProps {
  item: Differentiator
  index: number
  reduceMotion: boolean
}

function DifferentiatorRow({ item, index, reduceMotion }: DifferentiatorRowProps) {
  const Icon = item.icon

  return (
    <Row {...buildViewportRevealProps({ delay: index * 0.08, reduceMotion })}>
      <RowMarker>{String(index + 1).padStart(2, '0')}</RowMarker>
      <RowIcon>
        <Icon aria-hidden="true" />
      </RowIcon>
      <RowBody>
        <RowTitle>{item.title}</RowTitle>
        <RowDescription>{item.description}</RowDescription>
      </RowBody>
    </Row>
  )
}

export function DifferentialsSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <SectionContainer id="diferenciais">
      <ContentWrapper>
        <SectionIntro {...buildViewportRevealProps({ reduceMotion: !!shouldReduceMotion })}>
          <Eyebrow>O QUE SUSTENTA CADA ENTREGA</Eyebrow>
          <SectionHeading>
            Tecnologia sofisticada por trás. Experiência simples na frente.
          </SectionHeading>
          <SectionParagraph>
            A solução precisa fazer sentido para o negócio, ser clara para quem usa e sustentável
            para quem mantém.
          </SectionParagraph>
        </SectionIntro>

        <EditorialLayout>
          <StatementColumn>
            <TransparencyStatement>
              <TransparencyLine>Sem promessas genéricas.</TransparencyLine>
              <TransparencyLine>Sem tecnologia por moda.</TransparencyLine>
              <TransparencyLine>Sem automação sem controle.</TransparencyLine>
            </TransparencyStatement>
          </StatementColumn>

          <DifferentiatorRail>
            {differentiators.map((item, index) => (
              <DifferentiatorRow
                key={item.id}
                item={item}
                index={index}
                reduceMotion={!!shouldReduceMotion}
              />
            ))}
          </DifferentiatorRail>
        </EditorialLayout>

        <Checkpoint>
          <CheckpointCopy>
            <CheckpointHeading>Seu próximo passo deve começar pelo gargalo certo.</CheckpointHeading>
            <CheckpointText>
              Conte brevemente o seu cenário e converse diretamente com a EFSA sobre a prioridade
              da sua empresa.
            </CheckpointText>
          </CheckpointCopy>
          <CheckpointActions>
            <CheckpointCtaLink href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" />
              QUERO TER MAIS RESULTADOS
            </CheckpointCtaLink>
            <CheckpointSupportLine>Conversa direta pelo WhatsApp</CheckpointSupportLine>
          </CheckpointActions>
        </Checkpoint>
      </ContentWrapper>
    </SectionContainer>
  )
}
