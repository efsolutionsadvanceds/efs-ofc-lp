import styled from 'styled-components'

const FooterEl = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.black};
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`

const FooterInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`

const FooterTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xl};
`

const FooterBrand = styled.div`
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

const FooterNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
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

const PrivacyBlock = styled.div`
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`

const PrivacyHeading = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.white};
`

const PrivacyText = styled.p`
  margin: 0;
  max-width: 76ch;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.metallicGray};
`

const Copyright = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.metallicGray};
`

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <FooterEl>
      <FooterInner>
        <FooterTop>
          <FooterBrand>
            <FooterWordmark>EFSA</FooterWordmark>
            <FooterTagline>Engenharia de Software</FooterTagline>
            <FooterDescription>
              Engenharia de software aplicada à aquisição, ao atendimento e à eficiência
              operacional.
            </FooterDescription>
            <FooterDomain>efsa.com.br</FooterDomain>
          </FooterBrand>

          <FooterNav aria-label="Navegação do rodapé">
            <FooterNavLink href="#topo">Início</FooterNavLink>
            <FooterNavLink href="#diagnostico">Diagnóstico</FooterNavLink>
            <FooterNavLink href="#solucoes">Soluções</FooterNavLink>
            <FooterNavLink href="#como-atuamos">Como atuamos</FooterNavLink>
            <FooterNavLink href="#duvidas">Dúvidas</FooterNavLink>
            <FooterNavLink href="#contato">Contato</FooterNavLink>
          </FooterNav>
        </FooterTop>

        <PrivacyBlock id="privacidade">
          <PrivacyHeading>Privacidade</PrivacyHeading>
          <PrivacyText>
            Os dados preenchidos no formulário não são armazenados por este site. Ao continuar,
            eles são inseridos em uma mensagem que você decide enviar pelo WhatsApp. O tratamento
            posterior ocorre pelos canais de atendimento da EFSA e pela plataforma utilizada para
            a conversa.
          </PrivacyText>
        </PrivacyBlock>

        <Copyright>© {currentYear} E.F Solutions Advanced's. Todos os direitos reservados.</Copyright>
      </FooterInner>
    </FooterEl>
  )
}
