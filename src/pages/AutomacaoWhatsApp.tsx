import { Clock, HelpCircle, ListChecks, MessagesSquare } from 'lucide-react'
import styled from 'styled-components'

import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FeatureCard } from '@/components/page/FeatureCard'
import { FeatureGrid } from '@/components/page/FeatureGrid'
import { FinalCta } from '@/components/page/FinalCta'
import { PageHero } from '@/components/page/PageHero'
import { useSeo } from '@/hooks/useSeo'

const Section = styled.section`
  padding-block: ${({ theme }) => theme.space[20]};

  &:nth-of-type(even) {
    background: ${({ theme }) => theme.colors.surface};
  }
`

const Copy = styled.p`
  max-width: 64ch;
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
`

export default function AutomacaoWhatsApp() {
  useSeo({
    title: 'Automação de WhatsApp para Empresas | E.F Solutions',
    description:
      'Automatize parte do atendimento pelo WhatsApp com soluções inteligentes para responder dúvidas, organizar solicitações e agilizar o contato com clientes.',
    path: '/automacao-whatsapp',
  })

  return (
    <>
      <PageHero
        heading="Atenda melhor seus clientes, sem depender de responder tudo manualmente."
        supporting="Desenvolvemos soluções de atendimento automatizado pelo WhatsApp para agilizar respostas, atender dúvidas frequentes e organizar solicitações, de acordo com o funcionamento da sua empresa."
        primaryCta={{ label: 'Quero automatizar meu atendimento', to: '/contato' }}
      />

      <Section>
        <Container>
          <SectionHeading align="center" heading="O que a automação pode fazer?" />
          <FeatureGrid columns={4}>
            <FeatureCard
              icon={HelpCircle}
              title="Responder dúvidas frequentes"
              description="Disponibilizar informações comuns sobre produtos, serviços, horários e atendimento."
            />
            <FeatureCard
              icon={ListChecks}
              title="Receber pedidos de orçamento"
              description="Coletar as informações necessárias para facilitar o atendimento da equipe."
              delayMs={80}
            />
            <FeatureCard
              icon={MessagesSquare}
              title="Organizar o primeiro contato"
              description="Direcionar conversas conforme a necessidade do cliente."
              delayMs={160}
            />
            <FeatureCard
              icon={Clock}
              title="Apoiar o atendimento fora do horário comercial"
              description="Quando a integração e a configuração contratadas permitirem."
              delayMs={240}
            />
          </FeatureGrid>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading heading="Feito para o seu atendimento" />
          <Reveal>
            <Copy>
              A automação deve ajudar sua empresa, não dificultar a conversa com seus clientes. Por isso, a solução é
              configurada conforme suas informações, seus serviços e as tarefas que fazem sentido automatizar.
            </Copy>
          </Reveal>
        </Container>
      </Section>

      <FinalCta
        heading="Quanto tempo sua empresa poderia economizar com um atendimento mais organizado?"
        text="Vamos entender seu processo atual e avaliar as possibilidades."
        ctaLabel="Conhecer automação para WhatsApp"
        ctaTo="/contato"
      />
    </>
  )
}
