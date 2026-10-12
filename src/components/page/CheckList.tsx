import { CheckCircle2 } from 'lucide-react'
import styled from 'styled-components'

import { Reveal } from '@/components/ui/Reveal'
import { staggerDelay } from '@/styles/motion'

interface CheckListProps {
  items: readonly string[]
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
`

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};

  svg {
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    margin-top: 2px;
    color: ${({ theme }) => theme.colors.accent};
  }
`

/** Lista com marcador de check — usada em "o que seu projeto pode incluir" e listas de recursos similares. */
export function CheckList({ items }: CheckListProps) {
  return (
    <List>
      {items.map((item, index) => (
        <Reveal key={item} as="li" delayMs={staggerDelay(index, 60)}>
          <Row>
            <CheckCircle2 aria-hidden="true" />
            <span>{item}</span>
          </Row>
        </Reveal>
      ))}
    </List>
  )
}
