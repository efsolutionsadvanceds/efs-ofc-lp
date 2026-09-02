import styled from 'styled-components'

import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { comparisonCopy } from '@/content/copy'
import { useReveal } from '@/hooks/useReveal'

const Section = styled.section`
  background: ${({ theme }) => theme.colors.navy};
  padding-block: ${({ theme }) => theme.space[20]};
`

const Table = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[6]};

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    gap: 0;
    border-top: 1px solid ${({ theme }) => theme.colors.borderOnDark};
  }
`

const HeaderRow = styled.div`
  display: none;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    display: grid;
    grid-template-columns: 200px 1fr 56px 1fr;
    padding-block: ${({ theme }) => theme.space[3]};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textOnDarkSubtle};
  }
`

const Row = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
  padding-block: ${({ theme }) => theme.space[5]};

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    grid-template-columns: 200px 1fr 56px 1fr;
    align-items: center;
    border-top: 1px solid ${({ theme }) => theme.colors.borderOnDark};
  }
`

const RowLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gold};
`

const StateCard = styled.p<{ $tone: 'before' | 'after' }>`
  padding: ${({ theme }) => theme.space[4]};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.55;
  background: ${({ theme, $tone }) =>
    $tone === 'after' ? theme.colors.goldAlpha(0.08) : theme.colors.offWhiteAlpha(0.05)};
  color: ${({ theme, $tone }) => ($tone === 'after' ? theme.colors.textOnDark : theme.colors.textOnDarkMuted)};
  border: 1px solid
    ${({ theme, $tone }) => ($tone === 'after' ? theme.colors.borderGold : theme.colors.borderOnDark)};
`

const Connector = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    height: auto;
  }
`

const ConnectorLine = styled.div<{ $revealed: boolean }>`
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.colors.gold};
  transform: scaleX(${({ $revealed }) => ($revealed ? 1 : 0)});
  transform-origin: left;
  transition: transform ${({ theme }) => theme.motion.durationSlow} ${({ theme }) => theme.motion.ease};

  ${({ theme }) => `@media (max-width: ${theme.breakpoints.lg - 1}px)`} {
    width: 2px;
    height: 100%;
    transform: scaleY(${({ $revealed }) => ($revealed ? 1 : 0)});
    transform-origin: top;
    margin-inline: auto;
  }
`

export function ComparisonSection() {
  const { ref, isVisible } = useReveal<HTMLDivElement>({ threshold: 0.15 })

  return (
    <Section id="comparativo">
      <Container>
        <SectionHeading heading={comparisonCopy.heading} lead={comparisonCopy.answer} />

        <Table ref={ref}>
          <HeaderRow aria-hidden="true">
            <span />
            <span>{comparisonCopy.columns.before}</span>
            <span />
            <span>{comparisonCopy.columns.after}</span>
          </HeaderRow>

          {comparisonCopy.rows.map((row) => (
            <Row key={row.label}>
              <RowLabel>{row.label}</RowLabel>
              <StateCard $tone="before">{row.before}</StateCard>
              <Connector aria-hidden="true">
                <ConnectorLine $revealed={isVisible} />
              </Connector>
              <StateCard $tone="after">{row.after}</StateCard>
            </Row>
          ))}
        </Table>
      </Container>
    </Section>
  )
}
