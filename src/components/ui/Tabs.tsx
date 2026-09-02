import type { KeyboardEvent } from 'react'
import { useRef } from 'react'
import styled from 'styled-components'

export interface TabItem {
  id: string
  label: string
}

interface TabsProps {
  tabs: TabItem[]
  activeId: string
  onChange: (id: string) => void
  idPrefix: string
  'aria-label': string
}

const TabListScroller = styled.div`
  overflow-x: auto;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
`

const TabList = styled.div`
  display: inline-flex;
  gap: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => theme.space[1]};
  border: 1px solid ${({ theme }) => theme.colors.borderOnDark};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surface};
`

const Tab = styled.button<{ $isActive: boolean }>`
  position: relative;
  min-height: 44px;
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[5]}`};
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  white-space: nowrap;
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.textOnGold : theme.colors.textOnDarkMuted)};
  background: ${({ $isActive, theme }) => ($isActive ? theme.colors.gold : 'transparent')};
  transition:
    background-color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease},
    color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};

  &:hover:not(:disabled) {
    color: ${({ $isActive, theme }) => ($isActive ? theme.colors.textOnGold : theme.colors.gold)};
  }
`

export function Tabs({ tabs, activeId, onChange, idPrefix, ...aria }: TabsProps) {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  function focusAndSelect(index: number) {
    const target = tabs[(index + tabs.length) % tabs.length]
    if (!target) return
    onChange(target.id)
    tabRefs.current[target.id]?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault()
        focusAndSelect(index + 1)
        break
      case 'ArrowLeft':
        event.preventDefault()
        focusAndSelect(index - 1)
        break
      case 'Home':
        event.preventDefault()
        focusAndSelect(0)
        break
      case 'End':
        event.preventDefault()
        focusAndSelect(tabs.length - 1)
        break
      default:
        break
    }
  }

  return (
    <TabListScroller>
      <TabList role="tablist" aria-label={aria['aria-label']}>
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeId
          return (
            <Tab
              key={tab.id}
              ref={(node) => {
                tabRefs.current[tab.id] = node
              }}
              role="tab"
              id={`${idPrefix}-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`${idPrefix}-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              $isActive={isActive}
              onClick={() => onChange(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {tab.label}
            </Tab>
          )
        })}
      </TabList>
    </TabListScroller>
  )
}
