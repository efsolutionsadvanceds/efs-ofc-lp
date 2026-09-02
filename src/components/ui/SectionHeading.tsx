import type { ReactNode } from 'react'
import styled from 'styled-components'

import { useReveal } from '@/hooks/useReveal'
import { breathe } from '@/styles/motion'

import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow?: string
  heading: ReactNode
  lead?: ReactNode
  align?: 'left' | 'center'
  id?: string
  tone?: 'dark' | 'light'
}

const Wrapper = styled.div<{ $align: 'left' | 'center' }>`
  max-width: 46rem;
  text-align: ${({ $align }) => $align};
  margin-inline: ${({ $align }) => ($align === 'center' ? 'auto' : '0')};
  margin-bottom: ${({ theme }) => theme.space[10]};
`

const EyebrowRow = styled.div<{ $align: 'left' | 'center' }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  justify-content: ${({ $align }) => ($align === 'center' ? 'center' : 'flex-start')};
`

const StatusDot = styled.span`
  display: inline-block;
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gold};
  animation: ${breathe} 6s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Eyebrow = styled.p<{ $tone: 'dark' | 'light' }>`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: 0;
`

const EyebrowUnderline = styled.span<{ $revealed: boolean; $align: 'left' | 'center' }>`
  display: block;
  width: 28px;
  height: 2px;
  margin-top: ${({ theme }) => theme.space[2]};
  margin-bottom: ${({ theme }) => theme.space[3]};
  margin-inline: ${({ $align }) => ($align === 'center' ? 'auto' : '0')};
  background: ${({ theme }) => theme.colors.gold};
  transform-origin: left;
  transform: scaleX(${({ $revealed }) => ($revealed ? 1 : 0)});
  transition: transform ${({ theme }) => theme.motion.durationSlow} ${({ theme }) => theme.motion.ease};
`

const Heading = styled.h2<{ $tone: 'dark' | 'light' }>`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  color: ${({ theme, $tone }) => ($tone === 'dark' ? theme.colors.textOnDark : theme.colors.textOnLight)};
`

const Lead = styled.p<{ $tone: 'dark' | 'light' }>`
  margin-top: ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.65;
  color: ${({ theme, $tone }) =>
    $tone === 'dark' ? theme.colors.textOnDarkMuted : theme.colors.textOnLightMuted};
`

export function SectionHeading({
  eyebrow,
  heading,
  lead,
  align = 'left',
  id,
  tone = 'dark',
}: SectionHeadingProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>({ threshold: 0.4 })

  return (
    <Wrapper ref={ref} $align={align}>
      {eyebrow ? (
        <>
          <Reveal>
            <EyebrowRow $align={align}>
              <StatusDot aria-hidden="true" />
              <Eyebrow $tone={tone}>{eyebrow}</Eyebrow>
            </EyebrowRow>
          </Reveal>
          <EyebrowUnderline aria-hidden="true" $revealed={isVisible} $align={align} />
        </>
      ) : null}
      <Reveal delayMs={60}>
        <Heading id={id} $tone={tone}>
          {heading}
        </Heading>
      </Reveal>
      {lead ? (
        <Reveal delayMs={120}>
          <Lead $tone={tone}>{lead}</Lead>
        </Reveal>
      ) : null}
    </Wrapper>
  )
}
