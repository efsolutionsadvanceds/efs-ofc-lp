import { AppWindow, Database, LineChart, Workflow } from 'lucide-react'
import styled from 'styled-components'

import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FeatureCard } from '@/components/page/FeatureCard'
import { FeatureGrid } from '@/components/page/FeatureGrid'
import { FinalCta } from '@/components/page/FinalCta'
import { PageHero } from '@/components/page/PageHero'
import { Steps } from '@/components/page/Steps'
import { useSeo } from '@/hooks/useSeo'

const Section = styled.section`
  padding-block: ${({ theme }) => theme.space[20]};

  &:nth-of-type(even) {
    background: ${({ theme }) => theme.colors.surface};
  }
`

export default function SistemasPersonalizados() {
  useSeo({
    title: 'Desenvolvimento de Sistemas Personalizados para Empresas | E.F Solutions',
    description:
      'Desenvolvemos sistemas web personalizados para organizar processos, facilitar tarefas e atender às necessidades específicas da sua empresa.',
    path: '/sistemas-personalizados',
  })

  return (
    <>
      <PageHero
        heading="Um sistema desenvolvido para a realidade da sua empresa."
        supporting="Quando as ferramentas disponíveis não atendem ao que você precisa, podemos desenvolver um sistema personalizado para simplificar tarefas, organizar informações e facilitar sua operação."
        primaryCta={{ label: 'Conversar sobre meu sistema', to: '/contato' }}
      />

      <Section>
        <Container>
          <SectionHeading align="center" heading="O que podemos desenvolver?" />
          <FeatureGrid columns={4}>
            <FeatureCard
              icon={Database}
              title="Sistemas de gestão interna"
              description="Ferramentas para organizar informações e acompanhar atividades do negócio."
            />
            <FeatureCard
              icon={LineChart}
              title="Painéis e relatórios"
              description="Interfaces para visualizar dados relevantes e acompanhar informações em um único lugar."
              delayMs={80}
            />
            <FeatureCard
              icon={AppWindow}
              title="Plataformas web"
              description="Sistemas acessíveis pelo navegador, desenvolvidos de acordo com as regras e necessidades do projeto."
              delayMs={160}
            />
            <FeatureCard
              icon={Workflow}
              title="Integrações"
              description="Conexão entre ferramentas e serviços para reduzir tarefas manuais, quando tecnicamente viável."
              delayMs={240}
            />
          </FeatureGrid>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading heading="Como funciona?" />
          <Steps
            steps={[
              'Você explica o problema ou a necessidade.',
              'Definimos o escopo e as funcionalidades.',
              'Desenvolvemos e validamos a solução conforme o projeto acordado.',
            ]}
          />
        </Container>
      </Section>

      <FinalCta
        heading="Sua empresa tem uma necessidade específica?"
        text="Vamos avaliar o que faz sentido desenvolver para você."
        ctaLabel="Solicitar avaliação do projeto"
        ctaTo="/contato"
      />
    </>
  )
}
