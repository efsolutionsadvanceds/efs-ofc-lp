import { X } from 'lucide-react'
import styled, { keyframes } from 'styled-components'

import { Button } from '@/components/ui/Button'
import { site } from '@/config/site'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useFocusTrap } from '@/hooks/useFocusTrap'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  menuId: string
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-12px); }
  to { opacity: 1; transform: translateY(0); }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.mobileMenu};
  background: ${({ theme }) => theme.colors.navyAlpha(0.6)};
  animation: ${fadeIn} ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease} both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Panel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: min(320px, 86vw);
  background: ${({ theme }) => theme.colors.navy};
  border-left: 1px solid ${({ theme }) => theme.colors.borderOnDark};
  padding: ${({ theme }) => theme.space[6]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[6]};
  animation: ${slideDown} ${({ theme }) => theme.motion.durationBase} ${({ theme }) => theme.motion.ease} both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const TopRow = styled.div`
  display: flex;
  justify-content: flex-end;
`

const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.textOnDark};

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[1]};
`

const NavLink = styled.a`
  min-height: 44px;
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textOnDark};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderOnDark};

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.gold};
  }
`

export function MobileMenu({ isOpen, onClose, menuId }: MobileMenuProps) {
  const containerRef = useFocusTrap<HTMLDivElement>({ isActive: isOpen, onClose })
  useBodyScrollLock(isOpen)

  if (!isOpen) return null

  return (
    <Overlay
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <Panel id={menuId} ref={containerRef} role="dialog" aria-modal="true" aria-label="Menu de navegação">
        <TopRow>
          <CloseButton type="button" onClick={onClose} aria-label="Fechar menu">
            <X aria-hidden="true" />
          </CloseButton>
        </TopRow>
        <Nav>
          {site.nav.map((item) => (
            <NavLink key={item.href} href={item.href} onClick={onClose}>
              {item.label}
            </NavLink>
          ))}
        </Nav>
        <Button as="a" href="#contato-hero" onClick={onClose} $fullWidth>
          Falar sobre meu negócio
        </Button>
      </Panel>
    </Overlay>
  )
}
