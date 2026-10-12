import { Compass, MessageCircle, Target } from 'lucide-react'
import styled from 'styled-components'

import { Container } from '@/components/ui/Container'
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

export default function Sobre() {
  useSeo({
    title: 'Sobre a E.F Solutions | Soluções de Tecnologia para Empresas',
    description:
      'Conheça a E.F Solutions, empresa de tecnologia que desenvolve sites, sistemas e automações para atender às necessidades de negócios.',
    path: '/sobre',
  })

  return (
    <>
      <PageHero
        heading="Tecnologia precisa resolver problemas reais."
        supporting={
          <>
            A E.F Solutions desenvolve soluções digitais para empresas que precisam melhorar sua presença na
            internet, organizar processos ou tornar o atendimento mais eficiente. Nosso trabalho começa entendendo a
            necessidade do cliente e definindo uma solução adequada ao projeto, sem acrescentar complexidade
            desnecessária.
          </>
        }
        primaryCta={{ label: 'Falar com a E.F Solutions', to: '/contato' }}
      />

      <Section>
        <Container>
          <SectionHeading align="center" heading="Nossa forma de trabalhar" />
          <FeatureGrid columns={3}>
            <FeatureCard
              icon={Compass}
              title="Entender antes de desenvolver"
              description="Buscamos compreender a necessidade real antes de definir a solução."
            />
            <FeatureCard
              icon={Target}
              title="Desenvolver com propósito"
              description="Cada funcionalidade precisa ter uma razão para existir."
              delayMs={80}
            />
            <FeatureCard
              icon={MessageCircle}
              title="Comunicar com clareza"
              description="O cliente precisa entender o que será feito, o que está incluído e quais são as próximas etapas."
              delayMs={160}
            />
          </FeatureGrid>
        </Container>
      </Section>

      <FinalCta heading="Vamos transformar sua necessidade em um projeto." text="Conte o que sua empresa precisa — vamos conversar sobre o próximo passo." ctaLabel="Falar com a E.F Solutions" ctaTo="/contato" />
    </>
  )
}
