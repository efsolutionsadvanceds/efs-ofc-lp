import { Globe, LayoutTemplate, ShoppingCart } from 'lucide-react'
import styled from 'styled-components'

import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CheckList } from '@/components/page/CheckList'
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

export default function CriacaoDeSites() {
  useSeo({
    title: 'Criação de Sites Profissionais para Empresas | E.F Solutions',
    description:
      'Criação de sites profissionais, landing pages e lojas virtuais para empresas. Apresente seu negócio na internet e facilite o contato com seus clientes.',
    path: '/criacao-de-sites',
  })

  return (
    <>
      <PageHero
        heading="Criação de sites profissionais para o seu negócio."
        supporting="Tenha um site que apresente seus serviços, transmita confiança e facilite o contato de novos clientes com sua empresa."
        primaryCta={{ label: 'Solicitar orçamento para meu site', to: '/contato' }}
      />

      <Section>
        <Container>
          <SectionHeading align="center" heading="Um site feito para o que sua empresa precisa." />
          <FeatureGrid columns={3}>
            <FeatureCard
              icon={Globe}
              title="Site profissional"
              description="Apresente sua empresa, seus serviços, diferenciais e formas de contato em um só lugar."
            />
            <FeatureCard
              icon={LayoutTemplate}
              title="Landing page"
              description="Uma página focada em apresentar uma oferta ou serviço e incentivar o visitante a entrar em contato."
              delayMs={80}
            />
            <FeatureCard
              icon={ShoppingCart}
              title="Loja virtual"
              description="Apresente produtos e crie uma experiência de compra online adequada à operação do seu negócio."
              delayMs={160}
            />
          </FeatureGrid>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading heading="O que seu projeto pode incluir?" />
          <CheckList
            items={[
              'Design personalizado e adaptado a celulares e computadores.',
              'Botões de WhatsApp e outros canais de contato.',
              'Organização das informações para facilitar a navegação.',
              'Configurações básicas de SEO técnico.',
              'Integrações e funcionalidades definidas no projeto.',
            ]}
          />
        </Container>
      </Section>

      <FinalCta
        heading="Seu negócio pronto para ser apresentado ao mundo digital."
        text="Vamos entender o que você precisa e definir a melhor solução para o seu projeto."
        ctaLabel="Pedir orçamento"
        ctaTo="/contato"
      />
    </>
  )
}
