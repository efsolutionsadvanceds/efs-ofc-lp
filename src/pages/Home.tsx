import { Bot, Globe, Search, Settings2 } from 'lucide-react'
import styled from 'styled-components'

import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FeatureCard } from '@/components/page/FeatureCard'
import { FeatureGrid } from '@/components/page/FeatureGrid'
import { FinalCta } from '@/components/page/FinalCta'
import { HomeHero } from '@/components/sections/HomeHero'
import { ProblemSolution } from '@/components/sections/ProblemSolution'
import { useSeo } from '@/hooks/useSeo'

const ServicesSection = styled.section`
  padding-block: ${({ theme }) => theme.space[20]};
`

const TransitionSection = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  padding-block: ${({ theme }) => theme.space[20]};
`

export default function Home() {
  useSeo({
    title: 'Sites, Sistemas e Automações para Empresas | E.F Solutions',
    description:
      'Criação de sites, sistemas personalizados, automação de atendimento pelo WhatsApp e SEO para o seu negócio. Tecnologia desenvolvida para a necessidade real da sua empresa.',
    path: '/',
  })

  return (
    <>
      <HomeHero />

      <ServicesSection>
        <Container>
          <SectionHeading
            align="center"
            heading="Qual é o próximo passo para o seu negócio?"
            lead="Encontre a solução que faz sentido para sua empresa."
          />
          <FeatureGrid columns={4}>
            <FeatureCard
              icon={Globe}
              title="Sites e lojas virtuais"
              description="Seu negócio merece uma presença profissional na internet. Criamos sites, landing pages e lojas virtuais para apresentar seus serviços, produtos e facilitar o contato com seus clientes."
              to="/solucoes#sites"
              linkLabel="Conhecer criação de sites"
            />
            <FeatureCard
              icon={Settings2}
              title="Sistemas personalizados"
              description="Precisa de uma ferramenta própria para organizar seu negócio ou facilitar tarefas? Desenvolvemos sistemas conforme as necessidades da sua empresa."
              to="/solucoes#sistemas"
              linkLabel="Conhecer sistemas"
              delayMs={80}
            />
            <FeatureCard
              icon={Bot}
              title="Atendimento automatizado"
              description="Agilize parte do atendimento pelo WhatsApp com soluções inteligentes que podem responder dúvidas frequentes, organizar solicitações e ajudar sua equipe a ganhar tempo."
              to="/solucoes#automacao"
              linkLabel="Conhecer automações"
              delayMs={160}
            />
            <FeatureCard
              icon={Search}
              title="Google e divulgação digital"
              description="Ajude mais pessoas a encontrar sua empresa. Trabalhamos com melhorias para buscas orgânicas, presença digital e campanhas de divulgação."
              to="/solucoes#divulgacao"
              linkLabel="Conhecer divulgação digital"
              delayMs={240}
            />
          </FeatureGrid>
        </Container>
      </ServicesSection>

      <TransitionSection>
        <Container>
          <SectionHeading heading="O que está dificultando o seu negócio agora?" />
          <ProblemSolution
            items={[
              {
                problem: 'Seu negócio precisa de um site profissional?',
                solution: 'Criamos sites e lojas virtuais que apresentam sua empresa com credibilidade.',
              },
              {
                problem: 'Você ainda resolve tudo manualmente?',
                solution: 'Desenvolvemos sistemas sob medida para organizar processos e tarefas repetitivas.',
              },
              {
                problem: 'Seus clientes conseguem falar com você fora do horário?',
                solution: 'Automatizamos o primeiro contato pelo WhatsApp sem perder o tom da sua empresa.',
              },
              {
                problem: 'Seus clientes encontram sua empresa na internet?',
                solution: 'Trabalhamos SEO e divulgação digital para melhorar sua presença no Google.',
              },
            ]}
          />
        </Container>
      </TransitionSection>

      <FinalCta
        heading="Qual desafio você precisa resolver hoje?"
        text="Conte o que sua empresa precisa. Vamos conversar sobre a solução mais adequada para o seu momento."
      />
    </>
  )
}
