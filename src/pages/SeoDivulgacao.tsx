import { MapPin, Megaphone, Search, Sparkles } from 'lucide-react'
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

export default function SeoDivulgacao() {
  useSeo({
    title: 'SEO, Google e Divulgação Digital para Empresas | E.F Solutions',
    description:
      'Melhore a presença digital da sua empresa com SEO técnico, otimizações para buscas orgânicas, preparação para buscas locais e campanhas de divulgação.',
    path: '/seo-e-divulgacao',
  })

  return (
    <>
      <PageHero
        heading="Ajude mais pessoas a encontrar sua empresa na internet."
        supporting="Trabalhamos para melhorar a presença digital do seu negócio, facilitar sua descoberta nas buscas e estruturar ações de divulgação alinhadas aos seus objetivos."
        primaryCta={{ label: 'Melhorar a presença digital da minha empresa', to: '/contato' }}
      />

      <Section>
        <Container>
          <SectionHeading align="center" heading="Como podemos ajudar?" />
          <FeatureGrid columns={4}>
            <FeatureCard
              icon={Search}
              title="SEO para sites"
              description="Ajustes técnicos e de conteúdo para ajudar os mecanismos de busca a compreender suas páginas."
            />
            <FeatureCard
              icon={MapPin}
              title="Presença local no Google"
              description="Orientações e configurações para fortalecer a presença da empresa nas buscas locais e no Perfil da Empresa no Google, conforme o escopo contratado."
              delayMs={80}
            />
            <FeatureCard
              icon={Sparkles}
              title="Preparação para buscas por IA"
              description="Conteúdo claro e informações consistentes para facilitar a compreensão dos serviços da empresa por mecanismos de busca e sistemas que utilizam IA."
              delayMs={160}
            />
            <FeatureCard
              icon={Megaphone}
              title="Campanhas de divulgação"
              description="Planejamento e configuração de campanhas pagas, conforme o orçamento, o público e os objetivos definidos."
              delayMs={240}
            />
          </FeatureGrid>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading heading="Resultados acompanhados com clareza" />
          <Reveal>
            <Copy>
              Cada negócio possui concorrência, demanda e condições diferentes. Por isso, as ações são definidas e
              acompanhadas com base nos dados disponíveis, sem promessas de posições específicas ou de quantidade
              garantida de clientes.
            </Copy>
          </Reveal>
        </Container>
      </Section>

      <FinalCta
        heading="Sua empresa está sendo encontrada pelas pessoas certas?"
        text="Conte o que sua empresa precisa e vamos avaliar as melhores ações para o seu momento."
        ctaLabel="Conversar sobre divulgação"
        ctaTo="/contato"
      />
    </>
  )
}
