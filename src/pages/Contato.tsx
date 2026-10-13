import { Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react'
import { useRef } from 'react'
import styled from 'styled-components'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { TerminalWindow } from '@/components/ui/TerminalWindow'
import { site } from '@/config/site'
import { useSeo } from '@/hooks/useSeo'
import { generateEventId, trackContactEvent } from '@/lib/metaPixel'
import { SceneLight } from '@/components/visuals/SceneLight'

const SOCIAL_ICONS = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
  tiktok: MessageCircle,
} as const

const Section = styled.section`
  position: relative;
  overflow: hidden;
  min-height: 80vh;
  display: flex;
  align-items: center;
  padding-block: ${({ theme }) => `calc(${theme.layout.headerHeight} + ${theme.space[16]}) ${theme.space[20]}`};
  background: ${({ theme }) => theme.colors.navy};
`

const Content = styled(Container)`
  position: relative;
  z-index: 1;
  display: grid;
  gap: ${({ theme }) => theme.space[12]};
  align-items: center;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    grid-template-columns: 1.1fr 1fr;
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
  font-family: ${({ theme }) => theme.displayFontStack};
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  color: ${({ theme }) => theme.colors.textOnDark};
`

const Supporting = styled.p`
  margin-top: ${({ theme }) => theme.space[5]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
  max-width: 44ch;
`

const CtaWrapper = styled.div`
  margin-top: ${({ theme }) => theme.space[10]};
`

const BigButton = styled(Button)`
  min-height: 64px;
  padding-inline: ${({ theme }) => theme.space[10]};
  font-size: ${({ theme }) => theme.fontSizes.md};
`

const SocialRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[3]};
  margin-top: ${({ theme }) => theme.space[6]};
`

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
  transition:
    border-color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease},
    color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease},
    transform ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};

  &:hover,
  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
`

const TermLine = styled.div`
  color: ${({ theme }) => theme.colors.textOnDarkMuted};

  .k {
    color: ${({ theme }) => theme.colors.accentBlue};
  }

  & + & {
    margin-top: ${({ theme }) => theme.space[2]};
  }
`

export default function Contato() {
  useSeo({
    title: 'Fala com a E.F Solutions no WhatsApp | E.F Solutions',
    description: 'Chama a E.F Solutions direto no WhatsApp. Sem formulário, sem burocracia.',
    path: '/contato',
  })

  const eventIdRef = useRef(generateEventId())

  function handleWhatsAppClick() {
    trackContactEvent(eventIdRef.current)
  }

  return (
    <Section>
      <SceneLight variant="section" />
      <Content>
        <div>
          <Reveal>
            <Eyebrow>Contato</Eyebrow>
            <Heading>Bora conversar?</Heading>
            <Supporting>
              Sem formulário, sem espera. Chama agora no WhatsApp e já começa a resolver.
            </Supporting>
          </Reveal>

          <Reveal delayMs={120}>
            <CtaWrapper>
              <BigButton as="a" href={site.whatsapp.url} onClick={handleWhatsAppClick}>
                Chamar no WhatsApp
              </BigButton>
            </CtaWrapper>
          </Reveal>

          {site.social.length > 0 ? (
            <Reveal delayMs={200}>
              <SocialRow>
                {site.social.map((item) => {
                  const Icon = SOCIAL_ICONS[item.icon]
                  return (
                    <SocialLink key={item.href} href={item.href} aria-label={item.label} target="_blank" rel="noopener noreferrer">
                      <Icon aria-hidden="true" size={20} />
                    </SocialLink>
                  )
                })}
              </SocialRow>
            </Reveal>
          ) : null}
        </div>

        <Reveal delayMs={160}>
          <TerminalWindow title="contato.sh">
            <TermLine>
              <span className="k">empresa:</span> E.F Solutions
            </TermLine>
            <TermLine>
              <span className="k">whatsapp:</span> {site.whatsapp.display}
            </TermLine>
            <TermLine>
              <span className="k">canal:</span> direto, sem formulário
            </TermLine>
            <TermLine>
              <span className="k">status:</span> online
            </TermLine>
          </TerminalWindow>
        </Reveal>
      </Content>
    </Section>
  )
}
