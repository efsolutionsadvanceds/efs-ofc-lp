import styled from 'styled-components'

import { ContactForm } from '@/components/form/ContactForm'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SceneLight } from '@/components/visuals/SceneLight'
import { site } from '@/config/site'
import { useSeo } from '@/hooks/useSeo'

const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding-block: ${({ theme }) => `calc(${theme.layout.headerHeight} + ${theme.space[16]}) ${theme.space[20]}`};
  background: ${({ theme }) => theme.colors.navy};

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    padding-block: ${({ theme }) => `calc(${theme.layout.headerHeight} + ${theme.space[20]}) ${theme.space[20]}`};
  }
`

const Grid = styled(Container)`
  position: relative;
  z-index: 1;
  display: grid;
  gap: ${({ theme }) => theme.space[10]};
  align-items: start;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    grid-template-columns: 1fr 1.1fr;
  }
`

const Eyebrow = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.space[4]};
`

const Heading = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  color: ${({ theme }) => theme.colors.textOnDark};
`

const Supporting = styled.p`
  margin-top: ${({ theme }) => theme.space[5]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
  max-width: 48ch;
`

const DirectContact = styled.p`
  margin-top: ${({ theme }) => theme.space[8]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textOnDarkMuted};

  a {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.accent};

    &:hover,
    &:focus-visible {
      text-decoration: underline;
    }
  }
`

export default function Contato() {
  useSeo({
    title: 'Solicite um Orçamento de Tecnologia | E.F Solutions',
    description:
      'Entre em contato com a E.F Solutions para solicitar um orçamento de site, sistema personalizado, automação ou solução digital para sua empresa.',
    path: '/contato',
  })

  return (
    <Section>
      <SceneLight variant="section" />
      <Grid>
        <div>
          <Reveal>
            <Eyebrow>Contato</Eyebrow>
            <Heading>Conte o que sua empresa precisa.</Heading>
            <Supporting>
              Você não precisa saber qual tecnologia utilizar. Explique o que gostaria de melhorar e vamos conversar
              sobre as possibilidades.
            </Supporting>
          </Reveal>
          <Reveal delayMs={100}>
            <DirectContact>
              Prefere conversar diretamente? Chame a E.F Solutions pelo{' '}
              <a href={site.whatsapp.url}>WhatsApp</a>.
            </DirectContact>
          </Reveal>
        </div>

        <ContactForm />
      </Grid>
    </Section>
  )
}
