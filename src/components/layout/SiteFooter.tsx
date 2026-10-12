import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { Reveal } from '@/components/ui/Reveal'
import { site } from '@/config/site'

const Footer = styled.footer`
  background: ${({ theme }) => theme.colors.navy};
  border-top: 1px solid ${({ theme }) => theme.colors.borderOnDark};
  padding-block: ${({ theme }) => theme.space[12]};
`

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[10]};

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.md}px)`} {
    grid-template-columns: 1.4fr 1fr 1fr;
  }
`

const BrandColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
`

const Positioning = styled.p`
  max-width: 34ch;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
`

const ColumnTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textOnDarkSubtle};
  margin-bottom: ${({ theme }) => theme.space[4]};
`

const LinkList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
`

const FooterLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textOnDarkMuted};

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.accent};
  }
`

const ContactLink = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};

  &:hover,
  &:focus-visible {
    text-decoration: underline;
  }
`

const SecondGrid = styled(Grid)`
  margin-top: ${({ theme }) => theme.space[10]};
`

const BottomBar = styled.div`
  margin-top: ${({ theme }) => theme.space[10]};
  padding-top: ${({ theme }) => theme.space[6]};
  border-top: 1px solid ${({ theme }) => theme.colors.borderOnDark};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textOnDarkSubtle};
`

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <Footer>
      <Container>
        <Grid>
          <BrandColumn>
            <Reveal>
              <Logo variant="full" />
            </Reveal>
            <Positioning>{site.positioning}</Positioning>
          </BrandColumn>

          <div>
            <ColumnTitle>Navegação</ColumnTitle>
            <LinkList>
              {site.nav.map((item) => (
                <li key={item.href}>
                  <FooterLink to={item.href}>{item.label}</FooterLink>
                </li>
              ))}
              <li>
                <FooterLink to="/contato">Contato</FooterLink>
              </li>
            </LinkList>
          </div>

          <div>
            <ColumnTitle>Soluções</ColumnTitle>
            <LinkList>
              {site.services.map((item) => (
                <li key={item.href}>
                  <FooterLink to={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </LinkList>
          </div>
        </Grid>

        <SecondGrid>
          <div>
            <ColumnTitle>Fale com a E.F Solutions</ColumnTitle>
            <ContactLink href={site.whatsapp.url}>Conversar pelo WhatsApp</ContactLink>
          </div>
          <div>
            <ColumnTitle>Legal</ColumnTitle>
            <LinkList>
              <li>
                <FooterLink to={site.legal.privacyHref}>Política de Privacidade</FooterLink>
              </li>
              <li>
                <FooterLink to={site.legal.termsHref}>Termos de Uso</FooterLink>
              </li>
            </LinkList>
          </div>
        </SecondGrid>

        <BottomBar>
          © {year} {site.name}. Todos os direitos reservados.
        </BottomBar>
      </Container>
    </Footer>
  )
}
