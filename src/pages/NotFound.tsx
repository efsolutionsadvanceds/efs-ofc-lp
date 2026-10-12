import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { useSeo } from '@/hooks/useSeo'

const Section = styled.section`
  display: flex;
  align-items: center;
  min-height: 70dvh;
  padding-block: ${({ theme }) => `calc(${theme.layout.headerHeight} + ${theme.space[12]}) ${theme.space[20]}`};
`

const Content = styled(Container)`
  max-width: 36rem;
  text-align: center;
`

const Code = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  letter-spacing: 0.14em;
  color: ${({ theme }) => theme.colors.accent};
`

const Heading = styled.h1`
  margin-top: ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
`

const Text = styled.p`
  margin-top: ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
`

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.space[3]};
  margin-top: ${({ theme }) => theme.space[8]};
`

export default function NotFound() {
  useSeo({
    title: 'Página não encontrada | E.F Solutions',
    description: 'A página que você procura não existe ou foi movida.',
    path: '/404',
    noindex: true,
  })

  return (
    <Section>
      <Content>
        <Reveal>
          <Code>ERRO 404</Code>
          <Heading>Essa página não existe.</Heading>
          <Text>O endereço que você acessou pode ter sido movido ou digitado incorretamente.</Text>
          <CtaRow>
            <Button as={Link} to="/">
              Voltar para a página inicial
            </Button>
            <Button as={Link} to="/contato" $variant="secondary">
              Falar com a E.F Solutions
            </Button>
          </CtaRow>
        </Reveal>
      </Content>
    </Section>
  )
}
