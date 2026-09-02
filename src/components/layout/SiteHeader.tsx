import { Menu } from 'lucide-react'
import { useId, useState } from 'react'
import styled from 'styled-components'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { site } from '@/config/site'
import { useScrolled } from '@/hooks/useScrolled'

import { MobileMenu } from './MobileMenu'

const HeaderBar = styled.header<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  border-bottom: 1px solid
    ${({ theme, $isScrolled }) => ($isScrolled ? theme.colors.borderOnDark : 'transparent')};
  background: ${({ theme, $isScrolled }) =>
    $isScrolled ? theme.colors.navyAlpha(0.92) : theme.colors.navyAlpha(0.08)};
  transition:
    background-color ${({ theme }) => theme.motion.durationBase} ${({ theme }) => theme.motion.ease},
    border-color ${({ theme }) => theme.motion.durationBase} ${({ theme }) => theme.motion.ease};
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[4]};
  min-height: 72px;
`

const LogoLink = styled.a<{ $compact: boolean }>`
  position: relative;
  display: inline-flex;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.sm};
  transform: scale(${({ $compact }) => ($compact ? 0.92 : 1)});
  transform-origin: left center;
  transition: transform ${({ theme }) => theme.motion.durationBase} ${({ theme }) => theme.motion.ease};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      100deg,
      transparent 30%,
      ${({ theme }) => theme.colors.goldAlpha(0.55)} 50%,
      transparent 70%
    );
    transform: translateX(-140%);
    transition: transform 650ms ${({ theme }) => theme.motion.ease};
    pointer-events: none;
  }

  &:hover::before,
  &:focus-visible::before {
    transform: translateX(140%);
  }

  @media (prefers-reduced-motion: reduce) {
    transform: none;
    &::before {
      transition: none;
    }
  }
`

const Nav = styled.nav`
  display: none;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space[6]};
  }
`

const NavLink = styled.a`
  position: relative;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
  padding-block: ${({ theme }) => theme.space[2]};
  transition: color ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.textOnDark};
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0%;
    height: 2px;
    background: ${({ theme }) => theme.colors.gold};
    transition: width ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};
  }

  &:hover::after,
  &:focus-visible::after {
    width: 100%;
  }
`

const DesktopCta = styled(Button)`
  display: none;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    display: inline-flex;
  }
`

const MenuToggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.textOnDark};

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg}px)`} {
    display: none;
  }
`

export function SiteHeader() {
  const isScrolled = useScrolled(24)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuId = useId()

  return (
    <HeaderBar $isScrolled={isScrolled}>
      <Container>
        <Row>
          <LogoLink href="#topo" aria-label={`${site.name} — página inicial`} $compact={isScrolled}>
            <Logo />
          </LogoLink>

          <Nav aria-label="Navegação principal">
            {site.nav.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </Nav>

          <DesktopCta as="a" href="#contato-hero">
            Falar sobre meu negócio
          </DesktopCta>

          <MenuToggle
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            aria-label={isMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            <Menu aria-hidden="true" />
          </MenuToggle>
        </Row>
      </Container>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} menuId={menuId} />
    </HeaderBar>
  )
}
