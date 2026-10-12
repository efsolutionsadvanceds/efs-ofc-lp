import styled from 'styled-components'

import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { site } from '@/config/site'
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

const List = styled.ul`
  margin-top: ${({ theme }) => theme.space[3]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`

const ListItem = styled.li`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
  padding-left: ${({ theme }) => theme.space[4]};
  position: relative;

  &::before {
    content: '—';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.accent};
  }
`

export default function Privacidade() {
  useSeo({
    title: 'Política de Privacidade | E.F Solutions',
    description: 'Como a E.F Solutions trata as informações enviadas pelo formulário de contato e pelo site.',
    path: '/privacidade',
  })

  return (
    <Section>
      <Narrow>
        <Reveal>
          <Heading>Política de Privacidade</Heading>
          <Updated>Última atualização: outubro de 2026</Updated>

          <SubHeading>Quais informações coletamos</SubHeading>
          <Paragraph>
            Quando você preenche o formulário de contato do site, coletamos apenas os dados que você mesmo informa:
            nome, empresa (opcional), número de WhatsApp, o tipo de solução que procura e, se quiser, uma descrição
            do que precisa.
          </Paragraph>

          <SubHeading>Como usamos essas informações</SubHeading>
          <Paragraph>
            Usamos os dados enviados exclusivamente para montar uma mensagem e encaminhar você ao WhatsApp da E.F
            Solutions, dando continuidade ao atendimento diretamente naquela conversa. Não vendemos nem
            compartilhamos seus dados com terceiros para fins de marketing.
          </Paragraph>

          <SubHeading>Meta Pixel e medição de anúncios</SubHeading>
          <Paragraph>
            Este site utiliza o Meta Pixel (Facebook/Instagram) para medir a efetividade de campanhas de anúncios.
            Essa ferramenta usa cookies e tecnologias semelhantes para registrar visitas ao site e o evento de
            envio do formulário de contato. Quando o formulário é enviado com sucesso, também enviamos ao Meta,
            pelo lado do servidor (Conversions API), uma versão do seu número de WhatsApp transformada
            irreversivelmente por uma função de hash (SHA-256) — nunca o número em texto puro — para ajudar a
            medir a origem desse contato entre os anúncios veiculados. Você pode gerenciar cookies e preferências
            de anúncios diretamente nas configurações do seu navegador e da sua conta Meta.
          </Paragraph>

          <SubHeading>Com quem compartilhamos informações</SubHeading>
          <List>
            <ListItem>
              Meta Platforms, Inc. — apenas o evento de conversão e o número de WhatsApp com hash descritos acima,
              para medição de anúncios.
            </ListItem>
            <ListItem>
              WhatsApp — a mensagem que você revisa antes de enviar, pelo canal de atendimento da própria E.F
              Solutions, sujeita também às políticas de privacidade do WhatsApp/Meta para essa conversa.
            </ListItem>
          </List>

          <SubHeading>Por quanto tempo guardamos seus dados</SubHeading>
          <Paragraph>
            O formulário em si não grava um banco de dados de leads no momento — ele existe para preparar sua
            mensagem e te encaminhar ao WhatsApp. A partir daí, a conversa fica armazenada no WhatsApp da E.F
            Solutions, como qualquer conversa nesse aplicativo.
          </Paragraph>

          <SubHeading>Seus direitos</SubHeading>
          <Paragraph>
            Você pode solicitar a qualquer momento informações sobre os dados que nos enviou, correção ou exclusão
            de uma conversa, entrando em contato pelo{' '}
            <a href={site.whatsapp.url} style={{ color: 'inherit', fontWeight: 700, textDecoration: 'underline' }}>
              WhatsApp da E.F Solutions
            </a>
            .
          </Paragraph>

          <SubHeading>Alterações a esta política</SubHeading>
          <Paragraph>
            Esta política pode ser atualizada conforme o site evoluir. A data de "última atualização" no topo desta
            página sempre reflete a versão mais recente.
          </Paragraph>
        </Reveal>
      </Narrow>
    </Section>
  )
}
