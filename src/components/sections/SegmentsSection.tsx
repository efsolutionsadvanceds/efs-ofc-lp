import { Check } from 'lucide-react'
import { useId, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Tabs } from '@/components/ui/Tabs'
import { SEGMENT_DEFINITIONS, segmentsCopy } from '@/content/segments'

const Section = styled.section`
  background: ${({ theme }) => theme.colors.offWhite};
  padding-block: ${({ theme }) => theme.space[20]};
`

const TabsWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.space[8]};
`

const panelEnter = keyframes`
  from {
    opacity: 0;
    transform: translateX(12px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const Panel = styled.div`
  animation: ${panelEnter} ${({ theme }) => theme.motion.durationBase} ${({ theme }) => theme.motion.ease} both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const PanelGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[8]};

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    grid-template-columns: minmax(0, 1fr) minmax(280px, auto);
    align-items: center;
  }
`

const ExampleList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
`

const ExampleItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textOnLight};

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.gold};
    flex-shrink: 0;
  }
`

const CtaBlock = styled.div`
  display: flex;
  justify-content: flex-start;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    justify-content: flex-end;
  }
`

export function SegmentsSection() {
  const idPrefix = useId()
  const [activeId, setActiveId] = useState(SEGMENT_DEFINITIONS[0]?.id ?? '')
  const activeSegment = SEGMENT_DEFINITIONS.find((segment) => segment.id === activeId) ?? SEGMENT_DEFINITIONS[0]

  return (
    <Section id="segmentos">
      <Container>
        <SectionHeading
          tone="light"
          eyebrow={segmentsCopy.eyebrow}
          heading={segmentsCopy.heading}
          lead={segmentsCopy.answer}
        />

        <TabsWrapper>
          <Tabs
            idPrefix={idPrefix}
            aria-label="Segmentos atendidos pela E.F Solutions"
            tabs={SEGMENT_DEFINITIONS.map((segment) => ({ id: segment.id, label: segment.label }))}
            activeId={activeId}
            onChange={setActiveId}
          />
        </TabsWrapper>

        {activeSegment ? (
          <Panel
            key={activeSegment.id}
            role="tabpanel"
            id={`${idPrefix}-panel-${activeSegment.id}`}
            aria-labelledby={`${idPrefix}-tab-${activeSegment.id}`}
            tabIndex={0}
          >
            <PanelGrid>
              <ExampleList>
                {activeSegment.examples.map((example) => (
                  <ExampleItem key={example}>
                    <Check aria-hidden="true" />
                    {example}
                  </ExampleItem>
                ))}
              </ExampleList>
              <CtaBlock>
                <Button as="a" href="#contato-hero">
                  {segmentsCopy.cta}
                </Button>
              </CtaBlock>
            </PanelGrid>
          </Panel>
        ) : null}
      </Container>
    </Section>
  )
}
