import styled from 'styled-components'

import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { useSeo } from '@/hooks/useSeo'

const Section = styled.section`
  padding-block: ${({ theme }) => `calc(${theme.layout.headerHeight} + ${theme.space[12]}) ${theme.space[20]}`};
`

const Narrow = styled(Container)`
  max-width: 48rem;
`

const Heading = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
`

const Updated = styled.p`
  margin-top: ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textOnDarkSubtle};
`

const SubHeading = styled.h2`
  margin-top: ${({ theme }) => theme.space[10]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`

const Paragraph = styled.p`
  margin-top: ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
`

export default function Termos() {
  useSeo({
    title: 'Termos de Uso | E.F Solutions',
    description: 'Condições de uso do site da E.F Solutions.',
    path: '/termos',
  })

  return (
    <Section>
      <Narrow>
        <Reveal>
          <Heading>Termos de Uso</Heading>
          <Updated>Última atualização: outubro de 2026</Updated>

          <SubHeading>Natureza deste site</SubHeading>
          <Paragraph>
            Este site tem caráter informativo e institucional. Ele apresenta a E.F Solutions, suas áreas de atuação
            em tecnologia e um canal para solicitar um orçamento. As informações aqui publicadas não constituem uma
            proposta comercial fechada nem um contrato de prestação de serviços.
          </Paragraph>

          <SubHeading>Uso do conteúdo</SubHeading>
          <Paragraph>
            Os textos, imagens e demais materiais publicados neste site pertencem à E.F Solutions ou são usados com
            a devida autorização. Você pode visualizar e compartilhar o conteúdo para fins pessoais e não
            comerciais; a reprodução comercial sem autorização prévia não é permitida.
          </Paragraph>

          <SubHeading>Contato pelo WhatsApp</SubHeading>
          <Paragraph>
            Este site não tem formulário — o contato acontece pelo botão que leva ao WhatsApp da E.F Solutions. Veja
            a{' '}
            <a href="/privacidade" style={{ color: 'inherit', fontWeight: 700, textDecoration: 'underline' }}>
              Política de Privacidade
            </a>{' '}
            para mais detalhes sobre o que o site registra ao clicar nesse botão.
          </Paragraph>

          <SubHeading>Escopo, prazos e condições comerciais</SubHeading>
          <Paragraph>
            Escopo de projeto, cronograma, valores, forma de pagamento, prazos de entrega e garantias específicas de
            cada serviço são definidos individualmente na proposta comercial e no contrato de prestação de serviços
            acordado diretamente com cada cliente — não neste site.
          </Paragraph>

          <SubHeading>Limitação de responsabilidade</SubHeading>
          <Paragraph>
            Fazemos o possível para manter as informações deste site atualizadas e corretas, mas não garantimos que
            o site estará livre de interrupções ou erros a qualquer momento. O uso do site é por conta e risco do
            visitante, nos limites permitidos pela legislação aplicável.
          </Paragraph>

          <SubHeading>Alterações a estes termos</SubHeading>
          <Paragraph>
            Estes termos podem ser atualizados conforme o site evoluir. A data de "última atualização" no topo desta
            página sempre reflete a versão mais recente.
          </Paragraph>
        </Reveal>
      </Narrow>
    </Section>
  )
}
