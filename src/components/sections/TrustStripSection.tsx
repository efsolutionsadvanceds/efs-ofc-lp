import { Gauge, RadioTower, Wrench } from 'lucide-react'
import styled from 'styled-components'

import { BlueprintDivider } from '@/components/ui/BlueprintDivider'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { trustStripCopy } from '@/content/copy'

const ICONS = [Wrench, RadioTower, Gauge]

const Section = styled.section`
  background: ${({ theme }) => theme.colors.navy};
  padding-block: ${({ theme }) => theme.space[8]};
`

const List = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space[6]};
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`

const ItemRow = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};

  svg {
    width: 22px;
    height: 22px;
    color: ${({ theme }) => theme.colors.gold};
    flex-shrink: 0;
  }
`

const ItemText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
`

export function TrustStripSection() {
  return (
    <Section aria-label="Princípios de trabalho">
      <BlueprintDivider />
      <Container>
        <Reveal>
          <List>
            {trustStripCopy.items.map((item, index) => {
              const Icon = ICONS[index % ICONS.length]
              return (
                <ItemRow key={item}>
                  {Icon ? <Icon aria-hidden="true" /> : null}
                  <ItemText>{item}</ItemText>
                </ItemRow>
              )
            })}
          </List>
        </Reveal>
      </Container>
    </Section>
  )
}
