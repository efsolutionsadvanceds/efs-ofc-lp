import {
  AppWindow,
  Clock,
  Database,
  Globe,
  HelpCircle,
  LayoutTemplate,
  LineChart,
  ListChecks,
  MapPin,
  Megaphone,
  MessagesSquare,
  Search,
  ShoppingCart,
  Sparkles,
  Workflow,
} from 'lucide-react'
import styled from 'styled-components'

import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TerminalWindow } from '@/components/ui/TerminalWindow'
import { CheckList } from '@/components/page/CheckList'
import { FeatureCard } from '@/components/page/FeatureCard'
import { FeatureGrid } from '@/components/page/FeatureGrid'
import { FinalCta } from '@/components/page/FinalCta'
import { PageHero } from '@/components/page/PageHero'
import { useSeo } from '@/hooks/useSeo'
import { buildBreadcrumbStructuredData, buildServiceStructuredData } from '@/lib/seo'
import { StructuredData } from '@/components/seo/StructuredData'

const SOLUCOES_SCHEMA = [
  buildBreadcrumbStructuredData([
    { name: 'Início', path: '/' },
    { name: 'Soluções', path: '/solucoes' },
  ]),
  buildServiceStructuredData({
    name: 'Criação de sites e lojas virtuais',
    description: 'Sites profissionais, landing pages e lojas virtuais para apresentar sua empresa e vender online.',
    path: '/solucoes#sites',
  }),
  buildServiceStructuredData({
    name: 'Sistemas personalizados',
    description: 'Desenvolvimento de sistemas web sob medida para organizar processos e tarefas do negócio.',
    path: '/solucoes#sistemas',
  }),
  buildServiceStructuredData({
    name: 'Automação de WhatsApp',
    description: 'Atendimento automatizado pelo WhatsApp para responder dúvidas e organizar solicitações.',
    path: '/solucoes#automacao',
  }),
  buildServiceStructuredData({
    name: 'SEO e divulgação digital',
    description: 'SEO técnico, presença local no Google e campanhas de divulgação digital.',
    path: '/solucoes#divulgacao',
  }),
]

const Section = styled.section`
  padding-block: ${({ theme }) => theme.space[20]};
  scroll-margin-top: ${({ theme }) => theme.layout.headerHeight};

  &:nth-of-type(even) {
    background: ${({ theme }) => theme.colors.surface};
  }
`

const QuickNav = styled.nav`
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]};
  padding-bottom: ${({ theme }) => theme.space[16]};
`

const QuickNavLink = styled.a`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[4]}`};
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  background: ${({ theme }) => theme.colors.glass};
  transition:
    border-color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease},
    color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};

  &:hover,
  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.textOnDark};
  }
`

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[8]};
  align-items: start;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    grid-template-columns: 1.3fr 1fr;
  }
`

const TermLine = styled.div`
  color: ${({ theme }) => theme.colors.textOnDarkMuted};

  .k {
    color: ${({ theme }) => theme.colors.accentBlue};
  }

  .s {
    color: ${({ theme }) => theme.colors.accent};
  }

  & + & {
    margin-top: ${({ theme }) => theme.space[1]};
  }
`

export default function Solucoes() {
  useSeo({
    title: 'Soluções de Tecnologia para Empresas | E.F Solutions',
    description:
      'Criação de sites e lojas virtuais, sistemas personalizados, automação de WhatsApp e SEO e divulgação digital — soluções de tecnologia da E.F Solutions para o seu negócio.',
    path: '/solucoes',
  })

  return (
    <>
      <StructuredData schema={SOLUCOES_SCHEMA} />
      <PageHero
        heading="4 jeitos de fazer seu negócio andar mais rápido."
        supporting="Escolhe o que te trava hoje. A gente resolve."
        primaryCta={{ label: 'Falar no WhatsApp', to: '/contato' }}
      />

      <Container>
        <QuickNav aria-label="Ir para uma solução">
          <QuickNavLink href="#sites">sites</QuickNavLink>
          <QuickNavLink href="#sistemas">sistemas</QuickNavLink>
          <QuickNavLink href="#automacao">automação</QuickNavLink>
          <QuickNavLink href="#divulgacao">seo</QuickNavLink>
        </QuickNav>
      </Container>

      <Section id="sites">
        <Container>
          <SectionHeading eyebrow="01 · Sites e lojas virtuais" heading="Seu negócio, online, do jeito certo." />
          <FeatureGrid columns={3}>
            <FeatureCard icon={Globe} title="Site profissional" description="Seus serviços, bem apresentados." />
            <FeatureCard
              icon={LayoutTemplate}
              title="Landing page"
              description="Foco total em converter visita em contato."
              delayMs={80}
            />
            <FeatureCard
              icon={ShoppingCart}
              title="Loja virtual"
              description="Vitrine pronta pra vender online."
              delayMs={160}
            />
          </FeatureGrid>
          <Reveal delayMs={220}>
            <div style={{ marginTop: '3rem' }}>
              <CheckList
                items={[
                  'Responsivo — celular, tablet, desktop.',
                  'Botão de WhatsApp direto no site.',
                  'SEO técnico básico incluso.',
                ]}
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section id="sistemas">
        <Container>
          <SectionHeading eyebrow="02 · Sistemas sob medida" heading="O sistema que falta na sua operação." />
          <Grid>
            <FeatureGrid columns={2}>
              <FeatureCard icon={Database} title="Gestão interna" description="Organiza tudo num lugar só." />
              <FeatureCard
                icon={LineChart}
                title="Painéis"
                description="Dados visuais, decisão rápida."
                delayMs={80}
              />
              <FeatureCard
                icon={AppWindow}
                title="Plataformas web"
                description="Acessa de qualquer navegador."
                delayMs={160}
              />
              <FeatureCard
                icon={Workflow}
                title="Integrações"
                description="Suas ferramentas, conversando entre si."
                delayMs={240}
              />
            </FeatureGrid>
            <Reveal delayMs={200}>
              <TerminalWindow title="como-funciona.sh">
                <TermLine>
                  <span className="k">$</span> explica_o_problema
                </TermLine>
                <TermLine>
                  <span className="k">$</span> definimos_escopo
                </TermLine>
                <TermLine>
                  <span className="k">$</span> desenvolvemos
                </TermLine>
                <TermLine>
                  <span className="s">✓ entregue</span>
                </TermLine>
              </TerminalWindow>
            </Reveal>
          </Grid>
        </Container>
      </Section>

      <Section id="automacao">
        <Container>
          <SectionHeading eyebrow="03 · Automação de WhatsApp" heading="Atende enquanto você dorme." />
          <FeatureGrid columns={4}>
            <FeatureCard icon={HelpCircle} title="Dúvidas frequentes" description="Respostas na hora." />
            <FeatureCard
              icon={ListChecks}
              title="Pedidos de orçamento"
              description="Coleta o essencial."
              delayMs={80}
            />
            <FeatureCard
              icon={MessagesSquare}
              title="Primeiro contato"
              description="Direciona certo, sem perder tempo."
              delayMs={160}
            />
            <FeatureCard
              icon={Clock}
              title="Fora do horário"
              description="Sua empresa não dorme."
              delayMs={240}
            />
          </FeatureGrid>
        </Container>
      </Section>

      <Section id="divulgacao">
        <Container>
          <SectionHeading eyebrow="04 · SEO e divulgação" heading="Pra te acharem no Google." />
          <FeatureGrid columns={4}>
            <FeatureCard icon={Search} title="SEO técnico" description="Google entende seu site." />
            <FeatureCard icon={MapPin} title="Google local" description="Perfil da empresa em dia." delayMs={80} />
            <FeatureCard
              icon={Sparkles}
              title="Buscas com IA"
              description="Conteúdo claro pra IA entender."
              delayMs={160}
            />
            <FeatureCard
              icon={Megaphone}
              title="Campanhas pagas"
              description="Anúncio certo, público certo."
              delayMs={240}
            />
          </FeatureGrid>
        </Container>
      </Section>

      <FinalCta heading="Qual dessas é a sua?" text="Me chama no WhatsApp e resolve agora." />
    </>
  )
}
