import styled from 'styled-components'

const StyledSkipLink = styled.a`
  position: fixed;
  top: -100px;
  left: ${({ theme }) => theme.space[4]};
  z-index: ${({ theme }) => theme.zIndex.skipLink};
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[5]}`};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.textOnGold};
  font-weight: 700;
  border-radius: ${({ theme }) => theme.radii.md};
  transition: top ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};

  &:focus {
    top: ${({ theme }) => theme.space[4]};
  }
`

export function SkipLink() {
  return <StyledSkipLink href="#conteudo-principal">Pular para o conteúdo</StyledSkipLink>
}
