import { forwardRef, useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Terminal as TerminalIcon } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import styled from 'styled-components'
import { heroCodeSnippet, heroStages, STAGE_ROTATION_INTERVAL_MS } from '../../data/heroStages'
import { usePageVisibility } from '../../hooks/usePageVisibility'
import { AnimatedCheck } from './AnimatedCheck'

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceDark};
  box-shadow: ${({ theme }) => theme.shadows.lg};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 4px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`

const PanelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.white};

  svg {
    width: 18px;
    height: 18px;
    color: ${({ theme }) => theme.colors.gold};
    flex-shrink: 0;
  }
`

const Title = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  letter-spacing: 0.08em;
`

const DemoBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceElevated};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  letter-spacing: 0.06em;
`

const StageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const StageRow = styled.button<{ $isActive: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: 44px;
  padding: ${({ theme }) => theme.spacing.sm};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background: none;
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.white : theme.colors.textMuted)};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme, $isActive }) =>
    $isActive ? theme.typography.weights.semibold : theme.typography.weights.regular};
  text-align: left;
  cursor: pointer;
  overflow: hidden;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
  }
`

const RowHighlight = styled(motion.span)`
  position: absolute;
  inset: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceElevated};
  border: 1px solid rgba(253, 207, 69, 0.28);
  z-index: 0;
`

const RowContent = styled.span`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const TerminalWindow = styled.div`
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.black};
  overflow: hidden;
`

const TerminalChrome = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`

const ChromeDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.metallicGray};
  opacity: 0.5;
`

const ChromeLabel = styled.span`
  margin-left: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.typography.fontFamilyMono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`

const TerminalBody = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.fontFamilyMono};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  min-height: 108px;
  overflow-wrap: anywhere;
  overflow-x: hidden;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
  }
`

const CommandLine = styled.p`
  color: ${({ theme }) => theme.colors.gold};
  white-space: pre-wrap;

  &::before {
    content: '$ ';
    color: ${({ theme }) => theme.colors.metallicGray};
  }
`

const OutputLine = styled.p`
  margin-top: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: pre-wrap;
`

const Cursor = styled.span`
  display: inline-block;
  width: 7px;
  height: 1em;
  margin-left: 2px;
  vertical-align: text-bottom;
  background: ${({ theme }) => theme.colors.gold};
  animation: efsa-cursor-blink 1.1s steps(2, start) infinite;

  @keyframes efsa-cursor-blink {
    to {
      visibility: hidden;
    }
  }
`

const CodeBlock = styled.pre`
  margin: ${({ theme }) => theme.spacing.md} 0 0;
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  color: ${({ theme }) => theme.colors.metallicGray};
  white-space: pre-wrap;
  overflow-wrap: anywhere;
`

export const BusinessEngine = forwardRef<HTMLDivElement>(function BusinessEngine(_props, ref) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const isPageVisible = usePageVisibility()
  const shouldReduceMotion = useReducedMotion()
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const activeStage = heroStages[activeIndex]
  const shouldRotate = !isPaused && isPageVisible && !shouldReduceMotion

  useEffect(() => {
    if (!shouldRotate) return

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroStages.length)
    }, STAGE_ROTATION_INTERVAL_MS)

    return () => window.clearInterval(timer)
  }, [shouldRotate, activeIndex])

  function selectStage(index: number) {
    setActiveIndex(index)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const lastIndex = heroStages.length - 1
    let nextIndex: number | null = null

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = activeIndex === lastIndex ? 0 : activeIndex + 1
        break
      case 'ArrowLeft':
        nextIndex = activeIndex === 0 ? lastIndex : activeIndex - 1
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = lastIndex
        break
      default:
        return
    }

    event.preventDefault()
    selectStage(nextIndex)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <Panel
      ref={ref}
      id="business-engine"
      tabIndex={-1}
      aria-label="EFSA Business Engine, demonstração conceitual"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setIsPaused(false)
        }
      }}
    >
      <PanelHeader>
        <TitleGroup>
          <TerminalIcon aria-hidden="true" />
          <Title>EFSA BUSINESS ENGINE</Title>
        </TitleGroup>
        <DemoBadge>DEMONSTRAÇÃO CONCEITUAL</DemoBadge>
      </PanelHeader>

      <StageList
        role="tablist"
        aria-label="Etapas do motor de negócio EFSA"
        aria-orientation="vertical"
        onKeyDown={handleKeyDown}
      >
        {heroStages.map((stage, index) => {
          const isActive = index === activeIndex
          return (
            <StageRow
              key={stage.id}
              ref={(node) => {
                tabRefs.current[index] = node
              }}
              type="button"
              role="tab"
              id={`stage-tab-${stage.id}`}
              aria-selected={isActive}
              aria-controls="business-engine-terminal"
              tabIndex={isActive ? 0 : -1}
              $isActive={isActive}
              onClick={() => selectStage(index)}
            >
              {isActive && (
                <RowHighlight
                  layoutId="active-stage-highlight"
                  transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: 'easeOut' }}
                />
              )}
              <RowContent>
                <AnimatedCheck isActive={isActive} />
                <span>{stage.title}</span>
              </RowContent>
            </StageRow>
          )
        })}
      </StageList>

      <TerminalWindow>
        <TerminalChrome>
          <ChromeDot />
          <ChromeDot />
          <ChromeDot />
          <ChromeLabel>efsa@business-engine</ChromeLabel>
        </TerminalChrome>
        <TerminalBody
          id="business-engine-terminal"
          role="tabpanel"
          aria-labelledby={`stage-tab-${activeStage.id}`}
          tabIndex={0}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: 'easeOut' }}
            >
              <CommandLine>
                {activeStage.command}
                <Cursor aria-hidden="true" />
              </CommandLine>
              <OutputLine>{activeStage.output}</OutputLine>
            </motion.div>
          </AnimatePresence>
          <CodeBlock>
            <code>{heroCodeSnippet}</code>
          </CodeBlock>
        </TerminalBody>
      </TerminalWindow>
    </Panel>
  )
})
