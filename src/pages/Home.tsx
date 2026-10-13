import { Bot, Globe, Search, Settings2 } from 'lucide-react'
import styled from 'styled-components'

import { Container } from '@/components/ui/Container'
import { Marquee } from '@/components/ui/Marquee'
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

const MarqueeSection = styled.div`
  padding-block: ${({ theme }) => theme.space[10]};
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

      <MarqueeSection>
        <Marquee
          items={['SITES', 'LOJAS VIRTUAIS', 'SISTEMAS SOB MEDIDA', 'AUTOMAÇÃO WHATSAPP', 'SEO', 'GOOGLE']}
        />
      </MarqueeSection>

      <ServicesSection>
        <Container>
          <SectionHeading align="center" heading="Escolhe aí o que você precisa" lead="Sem enrolação." />
          <FeatureGrid columns={4}>
            <FeatureCard
              icon={Globe}
              title="Sites e lojas virtuais"
              description="Presença profissional online. Site, landing page ou loja — pronto pra vender."
              to="/solucoes#sites"
              linkLabel="Ver sites"
            />
            <FeatureCard
              icon={Settings2}
              title="Sistemas sob medida"
              description="Ferramenta própria pra organizar seu negócio, do seu jeito."
              to="/solucoes#sistemas"
              linkLabel="Ver sistemas"
              delayMs={80}
            />
            <FeatureCard
              icon={Bot}
              title="Automação de WhatsApp"
              description="Atendimento automático que responde rápido, até fora do horário."
              to="/solucoes#automacao"
              linkLabel="Ver automação"
              delayMs={160}
            />
            <FeatureCard
              icon={Search}
              title="SEO e Google"
              description="Mais gente te encontrando na internet, sem pagar sempre por isso."
              to="/solucoes#divulgacao"
              linkLabel="Ver SEO"
              delayMs={240}
            />
          </FeatureGrid>
        </Container>
      </ServicesSection>

      <TransitionSection>
        <Container>
          <SectionHeading heading="Isso aí parece com você?" />
          <ProblemSolution
            items={[
              { problem: 'Seu site não traz clientes.', solution: 'A gente constrói um que traz.' },
              { problem: 'Você faz tudo na mão.', solution: 'A gente automatiza o que dá.' },
              { problem: 'Cliente chama fora de hora.', solution: 'O WhatsApp responde por você.' },
              { problem: 'Ninguém te acha no Google.', solution: 'A gente resolve seu SEO.' },
            ]}
          />
        </Container>
      </TransitionSection>

      <FinalCta
        heading="Bora resolver isso?"
        text="Manda uma mensagem agora. Sem formulário, sem burocracia — direto no WhatsApp."
        ctaLabel="Chamar no WhatsApp"
      />
    </>
  )
}
