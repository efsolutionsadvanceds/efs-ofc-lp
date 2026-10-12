import { Bot, Globe, Search, Settings2 } from 'lucide-react'
import styled from 'styled-components'

import { Container } from '@/components/ui/Container'
import { FeatureCard } from '@/components/page/FeatureCard'
import { FeatureGrid } from '@/components/page/FeatureGrid'
import { FinalCta } from '@/components/page/FinalCta'
import { PageHero } from '@/components/page/PageHero'
import { useSeo } from '@/hooks/useSeo'

const Section = styled.section`
  padding-block: ${({ theme }) => theme.space[20]};
`

export default function Solucoes() {
  useSeo({
    title: 'Soluções de Tecnologia para Empresas | E.F Solutions',
    description:
      'Conheça as soluções da E.F Solutions: criação de sites e lojas virtuais, sistemas personalizados, automação de WhatsApp e SEO e divulgação digital.',
    path: '/solucoes',
  })

  return (
    <>
      <PageHero
        heading="Soluções de tecnologia para cada etapa do seu negócio."
        supporting="Cada empresa tem uma necessidade diferente. Veja as frentes em que a E.F Solutions pode ajudar e escolha o ponto de partida que faz mais sentido para você agora."
        primaryCta={{ label: 'Solicitar orçamento', to: '/contato' }}
      />

      <Section>
        <Container>
          <FeatureGrid columns={4}>
            <FeatureCard
              icon={Globe}
              title="Sites e lojas virtuais"
              description="Criação de sites, landing pages e lojas virtuais para apresentar sua empresa e facilitar o contato com clientes."
              to="/criacao-de-sites"
              linkLabel="Conhecer criação de sites"
            />
            <FeatureCard
              icon={Settings2}
              title="Sistemas personalizados"
              description="Ferramentas próprias para organizar processos, dados e tarefas do seu negócio, desenvolvidas sob medida."
              to="/sistemas-personalizados"
              linkLabel="Conhecer sistemas"
              delayMs={80}
            />
            <FeatureCard
              icon={Bot}
              title="Automação de WhatsApp"
              description="Atendimento automatizado para responder dúvidas frequentes, organizar pedidos e agilizar o primeiro contato."
              to="/automacao-whatsapp"
              linkLabel="Conhecer automações"
              delayMs={160}
            />
            <FeatureCard
              icon={Search}
              title="SEO e divulgação digital"
              description="Presença mais forte no Google e campanhas de divulgação alinhadas aos objetivos da sua empresa."
              to="/seo-e-divulgacao"
              linkLabel="Conhecer divulgação digital"
              delayMs={240}
            />
          </FeatureGrid>
        </Container>
      </Section>

      <FinalCta
        heading="Não sabe por onde começar?"
        text="Conte o que sua empresa precisa — vamos ajudar você a identificar a solução certa para o momento do seu negócio."
      />
    </>
  )
}
