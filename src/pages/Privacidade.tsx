import { LegalPage, LegalSection } from '@/components/layout/LegalPage'
import { inlineLinkStyles } from '@/components/ui/buttonStyles'
import { pages } from '@/config/pages'
import { site } from '@/config/site'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const PRIVACY_CONTACT_URL = buildWhatsAppUrl('Olá! Tenho uma dúvida sobre a Política de Privacidade do site da E.F Solutions.')

export default function Privacidade() {
  return (
    <LegalPage meta={pages.privacidade} title="Política de Privacidade" updatedAt="outubro de 2026">
      <LegalSection title="Resumo">
        <p>
          O site da E.F Solutions não tem formulário e não pede nome, e-mail ou telefone. Você escolhe as soluções de
          interesse e a conversa acontece no WhatsApp — apenas se você decidir enviar a mensagem.
        </p>
      </LegalSection>

      <LegalSection title="Seleção de soluções e WhatsApp">
        <p>
          As soluções que você marca ficam somente no seu navegador, enquanto a página está aberta — elas não são
          enviadas a nenhum servidor nosso. Ao tocar em um botão de WhatsApp, a seleção é usada para montar a mensagem
          que aparece no aplicativo, já endereçada ao número da E.F Solutions. Nada é enviado até você confirmar o envio
          dentro do próprio WhatsApp.
        </p>
      </LegalSection>

      <LegalSection title="Google Analytics">
        <p>
          Usamos o Google Analytics 4 para entender, de forma agregada, como o site é usado: páginas visitadas, origem
          do acesso, tipo de dispositivo e cliques nos botões de WhatsApp — incluindo quais soluções estavam
          selecionadas no momento do clique, sem nenhum dado que identifique você pessoalmente.
        </p>
        <p>
          A ferramenta usa cookies e identificadores do navegador. Você pode bloqueá-los nas configurações do navegador
          ou instalar o{' '}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLinkStyles}
          >
            complemento de desativação do Google Analytics
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Meta Pixel e medição de anúncios">
        <p>
          Este site utiliza o Meta Pixel (Facebook/Instagram) para medir a efetividade de campanhas de anúncios. Essa
          ferramenta usa cookies e tecnologias semelhantes para registrar visitas às páginas. Quando você clica em um
          botão de WhatsApp, o Pixel registra esse clique como um evento de contato — sem enviar nome, telefone ou
          qualquer dado digitado por você. Você pode gerenciar cookies e preferências de anúncios nas configurações do
          seu navegador e da sua conta Meta.
        </p>
      </LegalSection>

      <LegalSection title="Com quem compartilhamos informações">
        <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-muted">
          <li>Google LLC — dados de navegação e de cliques coletados pelo Google Analytics, descritos acima.</li>
          <li>Meta Platforms, Inc. — eventos de visita e de clique nos botões de WhatsApp, para medição de anúncios.</li>
          <li>
            WhatsApp — se você enviar a mensagem, ela passa a existir na conversa entre você e a E.F Solutions naquele
            aplicativo, sujeita também às políticas de privacidade do WhatsApp/Meta.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Por quanto tempo os dados são guardados">
        <p>
          O site em si não guarda nenhum dado seu: não há banco de dados de visitantes nem de contatos. Os dados de
          medição ficam com o Google e a Meta pelos prazos configurados em cada ferramenta, e as conversas iniciadas
          ficam no WhatsApp, como qualquer conversa nesse aplicativo.
        </p>
      </LegalSection>

      <LegalSection title="Seus direitos">
        <p>
          Você tem os direitos previstos na Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018), como confirmar
          a existência de tratamento, acessar, corrigir e pedir a eliminação de dados. Para qualquer pedido ou dúvida,
          fale com a gente pelo{' '}
          <a href={PRIVACY_CONTACT_URL} target="_blank" rel="noopener noreferrer" className={inlineLinkStyles}>
            WhatsApp {site.whatsapp.display}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Alterações nesta política">
        <p>
          Esta política pode ser atualizada conforme o site evoluir. A data de última atualização, no topo desta
          página, sempre indica a versão mais recente.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
