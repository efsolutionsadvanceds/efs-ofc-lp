import { MessageCircle } from 'lucide-react'
import styled from 'styled-components'
import { trackEvent } from '../../analytics/analytics'
import { contact } from '../../config/contact'
import { goldActionStyles } from '../../styles/actions'
import { ContentWrapper } from '../sections/sectionPrimitives'

const FooterEl = styled.footer`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.black};
`

const HorizonLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.darkBlue} 0%,
    ${({ theme }) => theme.colors.gold} 50%,
    ${({ theme }) => theme.colors.darkBlue} 100%
  );
  z-index: ${({ theme }) => theme.zIndex.decorative};
`

const GridLayer = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: linear-gradient(to bottom, transparent, black 40%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 40%, black 70%, transparent);
  z-index: ${({ theme }) => theme.zIndex.decorative};
`

const Watermark = styled.span`
  position: absolute;
  right: -2vw;
  bottom: -8%;
  font-size: clamp(6rem, 18vw, 13rem);
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  letter-spacing: -0.02em;
  color: rgba(255, 255, 255, 0.035);
  line-height: 1;
  pointer-events: none;
  user-select: none;
  z-index: ${({ theme }) => theme.zIndex.decorative};
`

const FooterInner = styled(ContentWrapper)`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.layout.gutterDesktop};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.layout.gutterMobile};
  }
`

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    'brand'
    'nav'
    'contact';
  gap: ${({ theme }) => theme.spacing['2xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: calc(${({ theme }) => theme.breakpoints.lg} - 1px)) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'brand brand'
      'nav contact';
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1.2fr 0.8fr 1fr;
    grid-template-areas: 'brand nav contact';
    gap: ${({ theme }) => theme.spacing.xl};
  }
`

const FooterBrand = styled.div`
  grid-area: brand;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  max-width: 40ch;
`

const FooterWordmark = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.white};
`

const FooterTagline = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`

const FooterDescription = styled.p`
  margin: ${({ theme }) => theme.spacing.sm} 0 0;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
`

const FooterDomain = styled.p`
  margin: ${({ theme }) => theme.spacing.sm} 0 0;
  font-family: ${({ theme }) => theme.typography.fontFamilyMono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.metallicGray};
`

const FooterNavGroup = styled.div`
  grid-area: nav;
`

const FooterNavHeading = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.metallicGray};
`

const FooterNavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: ${({ theme }) => theme.spacing.lg};
  }
`

const FooterNavLink = styled.a`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`

const FooterContact = styled.div`
  grid-area: contact;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
`

const FooterContactLabel = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.metallicGray};
`

const FooterCtaLink = styled.a`
  ${goldActionStyles}
  width: 100%;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: auto;
  }
`

const LegalRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing['2xl']};
  }
`

const PrivacyBlock = styled.div`
  max-width: 64ch;
`

const PrivacyHeading = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.white};
`

const PrivacyText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.metallicGray};
`

const PrivacyPreferencesButton = styled.button`
  display: inline-flex;
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding: 0;
  border: 0;
  background: none;
  color: ${({ theme }) => theme.colors.gold};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
`

const Copyright = styled.p`
  margin: 0;
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.metallicGray};
`

interface SiteFooterProps {
  onOpenPrivacyPreferences?: () => void
}

export function SiteFooter({ onOpenPrivacyPreferences }: SiteFooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <FooterEl>
      <HorizonLine aria-hidden="true" />
      <GridLayer aria-hidden="true" />
      <Watermark aria-hidden="true">EFSA</Watermark>

      <FooterInner>
        <FooterTop>
          <FooterBrand>
            <FooterWordmark>EFSA</FooterWordmark>
            <FooterTagline>Engenharia de Software</FooterTagline>
            <FooterDescription>
              Engenharia de software aplicada à aquisição, ao atendimento e à eficiência
              operacional.
            </FooterDescription>
            <FooterDomain>www.efsolutions.com.br</FooterDomain>
          </FooterBrand>

          <FooterNavGroup>
            <FooterNavHeading>Navegação</FooterNavHeading>
            <FooterNavList aria-label="Navegação do rodapé">
              <FooterNavLink href="#topo">Início</FooterNavLink>
              <FooterNavLink href="#diagnostico">Diagnóstico</FooterNavLink>
              <FooterNavLink href="#solucoes">Soluções</FooterNavLink>
              <FooterNavLink href="#como-atuamos">Como atuamos</FooterNavLink>
              <FooterNavLink href="#duvidas">Dúvidas</FooterNavLink>
              <FooterNavLink href="#contato">Contato</FooterNavLink>
            </FooterNavList>
          </FooterNavGroup>

          <FooterContact>
            <FooterContactLabel>Conversa direta</FooterContactLabel>
            <FooterCtaLink
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('generate_lead', { placement_id: 'footer' })}
            >
              <MessageCircle aria-hidden="true" />
              FALAR COM A EFSA
            </FooterCtaLink>
          </FooterContact>
        </FooterTop>

        <LegalRow>
          <PrivacyBlock id="privacidade">
            <PrivacyHeading>Privacidade</PrivacyHeading>
            <PrivacyText>
              Os dados preenchidos no formulário não são armazenados por este site. Ao continuar,
              eles são inseridos em uma mensagem que você decide enviar pelo WhatsApp. O
              tratamento posterior ocorre pelos canais de atendimento da EFSA e pela plataforma
              utilizada para a conversa. Quando o Google Analytics está habilitado, ele só é
              carregado após o seu consentimento explícito, e apenas essa escolha de
              consentimento fica salva neste navegador — nunca dados do formulário. Este texto é
              informativo e ainda depende de revisão jurídica específica sobre a LGPD.
            </PrivacyText>
            {onOpenPrivacyPreferences && (
              <PrivacyPreferencesButton type="button" onClick={onOpenPrivacyPreferences}>
                Preferências de privacidade
              </PrivacyPreferencesButton>
            )}
          </PrivacyBlock>

          <Copyright>© {currentYear} E.F Solutions Advanced's. Todos os direitos reservados.</Copyright>
        </LegalRow>
      </FooterInner>
    </FooterEl>
  )
}
