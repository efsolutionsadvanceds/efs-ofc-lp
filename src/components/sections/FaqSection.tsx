import { ChevronDown } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import styled from 'styled-components'
import { trackEvent } from '../../analytics/analytics'
import { faqItems } from '../../data/faq'
import { buildViewportRevealProps } from '../../utils/motionPresets'
import {
  ContentWrapper,
  Eyebrow,
  SectionContainer,
  SectionHeading,
  SectionIntro,
  SectionParagraph,
} from './sectionPrimitives'

const FaqList = styled.div`
  max-width: 860px;
`

const FaqItemEl = styled.details`
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  }
`

const FaqSummary = styled.summary`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg} 0;
  cursor: pointer;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
  }

  svg {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.gold};
    transition: transform 0.2s ease;
  }

  details[open] > & svg {
    transform: rotate(180deg);
  }
`

const FaqQuestion = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.white};
`

const FaqAnswer = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  max-width: 68ch;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
`

export function FaqSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <SectionContainer id="duvidas">
      <ContentWrapper>
        <SectionIntro {...buildViewportRevealProps({ reduceMotion: !!shouldReduceMotion })}>
          <Eyebrow>RESPOSTAS DIRETAS</Eyebrow>
          <SectionHeading>Antes de decidir, você precisa ter clareza.</SectionHeading>
          <SectionParagraph>
            Reunimos as dúvidas mais importantes sobre a forma como a EFSA trabalha, define
            soluções e conduz cada projeto.
          </SectionParagraph>
        </SectionIntro>

        <FaqList>
          {faqItems.map((item, index) => (
            <FaqItemEl
              key={item.id}
              open={index === 0}
              onToggle={(event) => {
                if (event.currentTarget.open) {
                  trackEvent('select_content', { content_type: 'faq', item_id: item.id })
                }
              }}
            >
              <FaqSummary>
                <FaqQuestion>{item.question}</FaqQuestion>
                <ChevronDown aria-hidden="true" />
              </FaqSummary>
              <FaqAnswer>{item.answer}</FaqAnswer>
            </FaqItemEl>
          ))}
        </FaqList>
      </ContentWrapper>
    </SectionContainer>
  )
}
