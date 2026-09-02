import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'
import styled from 'styled-components'

import { Reveal } from './Reveal'

export interface AccordionItemData {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItemData[]
  idPrefix: string
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
`

const Item = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderOnDark};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  overflow: hidden;
`

const Trigger = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[4]};
  width: 100%;
  min-height: 44px;
  padding: ${({ theme }) => `${theme.space[4]} ${theme.space[5]}`};
  text-align: left;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 600;
  color: ${({ $isOpen, theme }) => ($isOpen ? theme.colors.gold : theme.colors.textOnDark)};

  svg {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    transition: transform ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};
    transform: rotate(${({ $isOpen }) => ($isOpen ? '180deg' : '0deg')});
  }
`

const PanelWrapper = styled.div<{ $isOpen: boolean }>`
  display: grid;
  grid-template-rows: ${({ $isOpen }) => ($isOpen ? '1fr' : '0fr')};
  transition: grid-template-rows ${({ theme }) => theme.motion.durationBase} ${({ theme }) => theme.motion.ease};
`

const PanelInner = styled.div`
  overflow: hidden;
`

const PanelContent = styled.p`
  padding: 0 ${({ theme }) => theme.space[5]} ${({ theme }) => theme.space[5]};
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
  line-height: 1.65;
`

function AccordionRow({
  item,
  itemId,
  delayMs,
}: {
  item: AccordionItemData
  itemId: string
  delayMs: number
}) {
  const [isOpen, setIsOpen] = useState(false)
  const panelId = `${itemId}-panel`
  const triggerId = `${itemId}-trigger`

  return (
    <Reveal as="li" delayMs={delayMs} offsetPx={16}>
      <Item>
        <h3>
          <Trigger
            id={triggerId}
            type="button"
            aria-expanded={isOpen}
            aria-controls={panelId}
            $isOpen={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            <span>{item.question}</span>
            <ChevronDown aria-hidden="true" />
          </Trigger>
        </h3>
        <PanelWrapper id={panelId} role="region" aria-labelledby={triggerId} $isOpen={isOpen}>
          <PanelInner>
            <PanelContent>{item.answer}</PanelContent>
          </PanelInner>
        </PanelWrapper>
      </Item>
    </Reveal>
  )
}

export function Accordion({ items, idPrefix }: AccordionProps) {
  const baseId = useId()

  return (
    <List>
      {items.map((item, index) => (
        <AccordionRow
          key={item.question}
          item={item}
          itemId={`${idPrefix}-${baseId}-${index}`}
          delayMs={Math.min(index, 5) * 60}
        />
      ))}
    </List>
  )
}
