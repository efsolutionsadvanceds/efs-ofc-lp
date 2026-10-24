import { Link } from 'react-router-dom'

import { LegalPage, LegalSection } from '@/components/layout/LegalPage'
import { inlineLinkStyles } from '@/components/ui/buttonStyles'
import { pages } from '@/config/pages'
import { site } from '@/config/site'

export default function Termos() {
  return (
    <LegalPage meta={pages.termos} title="Termos de Uso" updatedAt="outubro de 2026">
      <LegalSection title="Natureza deste site">
        <p>
          Este site tem caráter informativo e institucional. Ele apresenta a E.F Solutions, suas áreas de atuação em
          tecnologia e um canal para solicitar um orçamento. As informações aqui publicadas não constituem uma proposta
          comercial fechada nem um contrato de prestação de serviços.
        </p>
      </LegalSection>

      <LegalSection title="Uso do conteúdo">
        <p>
          Os textos, imagens e demais materiais publicados neste site pertencem à E.F Solutions ou são usados com a
          devida autorização. Você pode visualizar e compartilhar o conteúdo para fins pessoais e não comerciais; a
          reprodução comercial sem autorização prévia não é permitida.
        </p>
      </LegalSection>

      <LegalSection title="Contato pelo WhatsApp">
        <p>
          Este site não tem formulário. Você seleciona as soluções de interesse e o contato acontece pelo WhatsApp da
          E.F Solutions, com uma mensagem montada a partir da sua seleção — que só é enviada se você confirmar no
          próprio aplicativo. Veja a{' '}
          <Link to={site.legal.privacyHref} className={inlineLinkStyles}>
            Política de Privacidade
          </Link>{' '}
          para saber o que o site registra quando você clica nesses botões.
        </p>
      </LegalSection>

      <LegalSection title="Escopo, prazos e condições comerciais">
        <p>
          Escopo de projeto, cronograma, valores, forma de pagamento, prazos de entrega e garantias específicas de cada
          serviço são definidos individualmente na proposta comercial e no contrato de prestação de serviços acordado
          diretamente com cada cliente — não neste site.
        </p>
      </LegalSection>

      <LegalSection title="Limitação de responsabilidade">
        <p>
          Fazemos o possível para manter as informações deste site atualizadas e corretas, mas não garantimos que o site
          estará livre de interrupções ou erros a qualquer momento. O uso do site é por conta e risco do visitante, nos
          limites permitidos pela legislação aplicável.
        </p>
      </LegalSection>

      <LegalSection title="Alterações nestes termos">
        <p>
          Estes termos podem ser atualizados conforme o site evoluir. A data de última atualização, no topo desta
          página, sempre indica a versão mais recente.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
