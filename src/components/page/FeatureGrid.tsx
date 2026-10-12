import type { ReactNode } from 'react'
import styled from 'styled-components'

interface FeatureGridProps {
  children: ReactNode
  /** Número de colunas no breakpoint `lg` e acima (o grid é 1 coluna abaixo de `sm` e 2 colunas entre `sm` e `lg`). */
  columns?: 2 | 3 | 4
}

const Grid = styled.div<{ $columns: number }>`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
  grid-template-columns: 1fr;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.sm}px)`} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme, $columns }) => `
    @media (min-width: ${theme.breakpoints.lg}px) {
      grid-template-columns: repeat(${$columns}, 1fr);
    }
  `}
`

export function FeatureGrid({ children, columns = 4 }: FeatureGridProps) {
  return <Grid $columns={columns}>{children}</Grid>
}
