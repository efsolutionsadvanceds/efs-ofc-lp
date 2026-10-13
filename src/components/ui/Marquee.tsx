import styled, { keyframes } from 'styled-components'

interface MarqueeProps {
  items: readonly string[]
  /** Segundos para um ciclo completo — menor é mais rápido. */
  durationS?: number
}

const scroll = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`

const Wrapper = styled.div`
  overflow: hidden;
  border-top: 1px solid ${({ theme }) => theme.colors.borderOnDark};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderOnDark};
  mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
`

const Track = styled.div<{ $durationS: number }>`
  display: flex;
  width: max-content;
  animation: ${scroll} ${({ $durationS }) => $durationS}s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Item = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => `${theme.space[4]} ${theme.space[6]}`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
  white-space: nowrap;

  &::after {
    content: '//';
    color: ${({ theme }) => theme.colors.accent};
  }
`

/** Faixa de texto em loop horizontal contínuo — duplica a lista para o scroll parecer infinito. */
export function Marquee({ items, durationS = 22 }: MarqueeProps) {
  const doubled = [...items, ...items]

  return (
    <Wrapper aria-hidden="true">
      <Track $durationS={durationS}>
        {doubled.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key -- lista duplicada propositalmente, índice é a única chave estável.
          <Item key={`${item}-${index}`}>{item}</Item>
        ))}
      </Track>
    </Wrapper>
  )
}
