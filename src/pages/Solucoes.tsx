import {
  AppWindow,
  Clock,
  Compass,
  Database,
  Globe,
  HelpCircle,
  LayoutTemplate,
  LineChart,
  ListChecks,
  MapPin,
  Megaphone,
  MessageCircle,
  MessagesSquare,
  Search,
  ShoppingCart,
  Sparkles,
  Target,
  Workflow,
} from 'lucide-react'
import styled from 'styled-components'

import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CheckList } from '@/components/page/CheckList'
import { FeatureCard } from '@/components/page/FeatureCard'
import { FeatureGrid } from '@/components/page/FeatureGrid'
import { FinalCta } from '@/components/page/FinalCta'
import { PageHero } from '@/components/page/PageHero'
import { Steps } from '@/components/page/Steps'
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

const Copy = styled.p`
  max-width: 64ch;
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
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
        heading="Soluções de tecnologia para cada etapa do seu negócio."
        supporting="Cada empresa tem uma necessidade diferente. Veja as frentes em que a E.F Solutions pode ajudar e escolha o ponto de partida que faz mais sentido para você agora."
        primaryCta={{ label: 'Solicitar orçamento', to: '/contato' }}
      />

      <Container>
        <QuickNav aria-label="Ir para uma solução">
          <QuickNavLink href="#sites">Sites e lojas virtuais</QuickNavLink>
          <QuickNavLink href="#sistemas">Sistemas personalizados</QuickNavLink>
          <QuickNavLink href="#automacao">Automação de WhatsApp</QuickNavLink>
          <QuickNavLink href="#divulgacao">SEO e divulgação</QuickNavLink>
        </QuickNav>
      </Container>

      <Section id="sites">
        <Container>
          <SectionHeading
            eyebrow="Sites e lojas virtuais"
            heading="Um site feito para o que sua empresa precisa."
            lead="Tenha um site que apresente seus serviços, transmita confiança e facilite o contato de novos clientes com sua empresa."
          />
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
          <Reveal delayMs={220}>
            <div style={{ marginTop: '3rem' }}>
              <CheckList
                items={[
                  'Design personalizado e adaptado a celulares e computadores.',
                  'Botões de WhatsApp e outros canais de contato.',
                  'Configurações básicas de SEO técnico.',
                  'Integrações e funcionalidades definidas no projeto.',
                ]}
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section id="sistemas">
        <Container>
          <SectionHeading
            eyebrow="Sistemas personalizados"
            heading="Um sistema desenvolvido para a realidade da sua empresa."
            lead="Quando as ferramentas disponíveis não atendem ao que você precisa, desenvolvemos um sistema sob medida para simplificar tarefas e organizar informações."
          />
          <FeatureGrid columns={4}>
            <FeatureCard
              icon={Database}
              title="Sistemas de gestão interna"
              description="Ferramentas para organizar informações e acompanhar atividades do negócio."
            />
            <FeatureCard
              icon={LineChart}
              title="Painéis e relatórios"
              description="Interfaces para visualizar dados relevantes em um único lugar."
              delayMs={80}
            />
            <FeatureCard
              icon={AppWindow}
              title="Plataformas web"
              description="Sistemas acessíveis pelo navegador, desenvolvidos conforme as regras do projeto."
              delayMs={160}
            />
            <FeatureCard
              icon={Workflow}
              title="Integrações"
              description="Conexão entre ferramentas e serviços para reduzir tarefas manuais, quando viável."
              delayMs={240}
            />
          </FeatureGrid>
          <Reveal delayMs={300}>
            <div style={{ marginTop: '3rem', maxWidth: '36rem' }}>
              <Steps
                steps={[
                  'Você explica o problema ou a necessidade.',
                  'Definimos o escopo e as funcionalidades.',
                  'Desenvolvemos e validamos a solução conforme o projeto acordado.',
                ]}
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section id="automacao">
        <Container>
          <SectionHeading
            eyebrow="Automação de WhatsApp"
            heading="Atenda melhor, sem depender de responder tudo manualmente."
            lead="Desenvolvemos atendimento automatizado pelo WhatsApp para agilizar respostas e organizar solicitações, de acordo com o funcionamento da sua empresa."
          />
          <FeatureGrid columns={4}>
            <FeatureCard
              icon={HelpCircle}
              title="Responder dúvidas frequentes"
              description="Informações comuns sobre produtos, serviços, horários e atendimento."
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
              title="Atendimento fora do horário comercial"
              description="Quando a integração e a configuração contratadas permitirem."
              delayMs={240}
            />
          </FeatureGrid>
          <Reveal delayMs={300}>
            <div style={{ marginTop: '2.5rem' }}>
              <Copy>
                A automação deve ajudar sua empresa, não dificultar a conversa com seus clientes. Por isso, a solução
                é configurada conforme suas informações, seus serviços e as tarefas que fazem sentido automatizar.
              </Copy>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section id="divulgacao">
        <Container>
          <SectionHeading
            eyebrow="SEO e divulgação digital"
            heading="Ajude mais pessoas a encontrar sua empresa na internet."
            lead="Trabalhamos para melhorar a presença digital do seu negócio, facilitar sua descoberta nas buscas e estruturar ações de divulgação alinhadas aos seus objetivos."
          />
          <FeatureGrid columns={4}>
            <FeatureCard
              icon={Search}
              title="SEO para sites"
              description="Ajustes técnicos e de conteúdo para os mecanismos de busca compreenderem suas páginas."
            />
            <FeatureCard
              icon={MapPin}
              title="Presença local no Google"
              description="Fortalecimento da presença nas buscas locais e no Perfil da Empresa no Google."
              delayMs={80}
            />
            <FeatureCard
              icon={Sparkles}
              title="Preparação para buscas por IA"
              description="Conteúdo claro e consistente para sistemas de busca que utilizam IA."
              delayMs={160}
            />
            <FeatureCard
              icon={Megaphone}
              title="Campanhas de divulgação"
              description="Planejamento de campanhas pagas conforme orçamento, público e objetivos."
              delayMs={240}
            />
          </FeatureGrid>
          <Reveal delayMs={300}>
            <div style={{ marginTop: '2.5rem' }}>
              <Copy>
                Cada negócio possui concorrência, demanda e condições diferentes. As ações são definidas e
                acompanhadas com base nos dados disponíveis, sem promessas de posições específicas ou de quantidade
                garantida de clientes.
              </Copy>
            </div>
          </Reveal>
        </Container>
      </Section>

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
              description="Você precisa entender o que será feito, o que está incluído e quais são as próximas etapas."
              delayMs={160}
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
