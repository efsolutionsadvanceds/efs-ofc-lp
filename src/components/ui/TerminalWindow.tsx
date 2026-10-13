import type { ReactNode } from 'react'
import styled from 'styled-components'

import { GlassPanel } from './GlassPanel'

interface TerminalWindowProps {
  title: string
  children: ReactNode
  className?: string
}

const Window = styled(GlassPanel)`
  overflow: hidden;
  padding: 0;
`

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.glassBorder};
  background: ${({ theme }) => theme.colors.navyAlpha(0.4)};
`

const Dots = styled.span`
  display: inline-flex;
  gap: ${({ theme }) => theme.space[2]};
  flex-shrink: 0;

  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  span:nth-child(1) {
    background: #ff5f56;
  }

  span:nth-child(2) {
    background: #ffbd2e;
  }

  span:nth-child(3) {
    background: #27c93f;
  }
`

const Title = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textOnDarkSubtle};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Content = styled.div`
  padding: ${({ theme }) => theme.space[5]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.8;
`

/** Painel estilo terminal/editor — usado para apresentar informações de forma técnica e visual, nunca como especificação de código real. */
export function TerminalWindow({ title, children, className }: TerminalWindowProps) {
  return (
    <Window className={className}>
      <TitleBar>
        <Dots aria-hidden="true">
          <span />
          <span />
          <span />
        </Dots>
        <Title>{title}</Title>
      </TitleBar>
      <Content>{children}</Content>
    </Window>
  )
}
