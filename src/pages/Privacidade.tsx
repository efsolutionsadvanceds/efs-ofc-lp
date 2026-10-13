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
    description: 'Como a E.F Solutions trata as informações de quem visita o site.',
    path: '/privacidade',
  })

  return (
    <Section>
      <Narrow>
        <Reveal>
          <Heading>Política de Privacidade</Heading>
          <Updated>Última atualização: outubro de 2026</Updated>

          <SubHeading>Este site não tem formulário</SubHeading>
          <Paragraph>
            O site não coleta nome, e-mail, telefone ou qualquer outro dado digitado pelo visitante — não existe
            formulário em nenhuma página. O único canal de contato é um botão que leva direto ao WhatsApp da E.F
            Solutions, com um número já configurado pela empresa (não o seu). A conversa só começa se você decidir
            enviá-la, já dentro do próprio WhatsApp.
          </Paragraph>

          <SubHeading>Meta Pixel e medição de anúncios</SubHeading>
          <Paragraph>
            Este site utiliza o Meta Pixel (Facebook/Instagram) para medir a efetividade de campanhas de anúncios.
            Essa ferramenta usa cookies e tecnologias semelhantes para registrar visitas às páginas. Quando você
            clica no botão do WhatsApp, o Pixel registra esse clique como um evento de contato — sem enviar nome,
            telefone ou qualquer dado pessoal, apenas a informação de que o botão foi clicado. Você pode gerenciar
            cookies e preferências de anúncios diretamente nas configurações do seu navegador e da sua conta Meta.
          </Paragraph>

          <SubHeading>Com quem compartilhamos informações</SubHeading>
          <List>
            <ListItem>
              Meta Platforms, Inc. — apenas o evento de clique no botão do WhatsApp, descrito acima, para medição de
              anúncios.
            </ListItem>
            <ListItem>
              WhatsApp — se você enviar a mensagem, ela passa a existir na conversa entre você e a E.F Solutions
              naquele aplicativo, sujeita também às políticas de privacidade do WhatsApp/Meta.
            </ListItem>
          </List>

          <SubHeading>Por quanto tempo guardamos seus dados</SubHeading>
          <Paragraph>
            O site em si não guarda nenhum dado seu — não há banco de dados de visitantes nem de leads. Qualquer
            conversa iniciada fica apenas no WhatsApp, como qualquer conversa nesse aplicativo.
          </Paragraph>

          <SubHeading>Seus direitos</SubHeading>
          <Paragraph>
            Para qualquer dúvida sobre dados ou sobre uma conversa já iniciada, fale diretamente pelo{' '}
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
