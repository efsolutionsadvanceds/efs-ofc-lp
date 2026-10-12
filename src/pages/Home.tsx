import { Bot, Globe, Search, Settings2 } from 'lucide-react'
import styled from 'styled-components'

import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CheckList } from '@/components/page/CheckList'
import { FeatureCard } from '@/components/page/FeatureCard'
import { FeatureGrid } from '@/components/page/FeatureGrid'
import { FinalCta } from '@/components/page/FinalCta'
import { PageHero } from '@/components/page/PageHero'
import { useSeo } from '@/hooks/useSeo'

const ServicesSection = styled.section`
  padding-block: ${({ theme }) => theme.space[20]};
`

const DifferentiationSection = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  padding-block: ${({ theme }) => theme.space[20]};
`

const DifferentiationGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[10]};

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`

const DifferentiationCopy = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};

  & + & {
    margin-top: ${({ theme }) => theme.space[4]};
  }
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
      <PageHero
        heading="Criação de sites, sistemas e automações para o seu negócio."
        supporting="Precisa de um site profissional, de um sistema personalizado ou de um atendimento mais ágil? A E.F Solutions desenvolve soluções tecnológicas para ajudar sua empresa a conquistar oportunidades, economizar tempo e trabalhar melhor."
        primaryCta={{ label: 'Solicitar orçamento', to: '/contato' }}
        secondaryCta={{ label: 'Conhecer soluções', to: '/solucoes' }}
      />

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
              to="/criacao-de-sites"
              linkLabel="Conhecer criação de sites"
            />
            <FeatureCard
              icon={Settings2}
              title="Sistemas personalizados"
              description="Precisa de uma ferramenta própria para organizar seu negócio ou facilitar tarefas? Desenvolvemos sistemas conforme as necessidades da sua empresa."
              to="/sistemas-personalizados"
              linkLabel="Conhecer sistemas"
              delayMs={80}
            />
            <FeatureCard
              icon={Bot}
              title="Atendimento automatizado"
              description="Agilize parte do atendimento pelo WhatsApp com soluções inteligentes que podem responder dúvidas frequentes, organizar solicitações e ajudar sua equipe a ganhar tempo."
              to="/automacao-whatsapp"
              linkLabel="Conhecer automações"
              delayMs={160}
            />
            <FeatureCard
              icon={Search}
              title="Google e divulgação digital"
              description="Ajude mais pessoas a encontrar sua empresa. Trabalhamos com melhorias para buscas orgânicas, presença digital e campanhas de divulgação."
              to="/seo-e-divulgacao"
              linkLabel="Conhecer divulgação digital"
              delayMs={240}
            />
          </FeatureGrid>
        </Container>
      </ServicesSection>

      <DifferentiationSection>
        <Container>
          <DifferentiationGrid>
            <SectionHeading heading="Você explica a necessidade. Nós desenvolvemos a solução." />
            <div>
              <Reveal>
                <DifferentiationCopy>
                  Cada empresa trabalha de um jeito. Por isso, antes de sugerir uma tecnologia, buscamos entender o
                  que você precisa resolver.
                </DifferentiationCopy>
                <DifferentiationCopy>
                  Seja para criar um site, desenvolver um sistema ou melhorar o atendimento, o projeto é definido
                  conforme sua necessidade e seus objetivos.
                </DifferentiationCopy>
              </Reveal>
              <Reveal delayMs={120}>
                <div style={{ marginTop: '2rem' }}>
                  <CheckList
                    items={[
                      'Soluções pensadas para a realidade do seu negócio.',
                      'Comunicação direta, sem complicar o que é simples.',
                      'Escopo e investimento alinhados antes do início do projeto.',
                    ]}
                  />
                </div>
              </Reveal>
            </div>
          </DifferentiationGrid>
        </Container>
      </DifferentiationSection>

      <FinalCta
        heading="Qual desafio você precisa resolver hoje?"
        text="Conte o que sua empresa precisa. Vamos conversar sobre a solução mais adequada para o seu momento."
      />
    </>
  )
}
