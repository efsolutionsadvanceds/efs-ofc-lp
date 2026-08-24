import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { useMotionValueEvent, useScroll } from 'motion/react'
import styled from 'styled-components'
import { contact } from '../../config/contact'

const SCROLL_THRESHOLD = 24

const Header = styled.header<{ $isScrolled: boolean }>`
  position: sticky;
  top: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid
    ${({ theme, $isScrolled }) => ($isScrolled ? theme.colors.borderSubtle : 'transparent')};
  background: ${({ $isScrolled }) => ($isScrolled ? 'rgba(5, 7, 11, 0.78)' : 'transparent')};
  backdrop-filter: ${({ $isScrolled }) => ($isScrolled ? 'blur(10px)' : 'none')};
  -webkit-backdrop-filter: ${({ $isScrolled }) => ($isScrolled ? 'blur(10px)' : 'none')};
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    backdrop-filter 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  }
`

const Wordmark = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.15;
  min-width: 0;
`

const WordmarkTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.white};
`

const WordmarkTagline = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.03em;
`

const CtaLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  min-height: 44px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  letter-spacing: 0.02em;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  transition:
    transform 0.2s ease,
    filter 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
    box-shadow: 0 8px 20px rgba(253, 207, 69, 0.25);
  }

  &:active {
    transform: translateY(0);
    filter: brightness(0.97);
  }

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`

const CtaFullLabel = styled.span`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`

const CtaShortLabel = styled.span`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: inline;
  }
`

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled((wasScrolled) => {
      if (!wasScrolled && latest > SCROLL_THRESHOLD) return true
      if (wasScrolled && latest <= SCROLL_THRESHOLD) return false
      return wasScrolled
    })
  })

  return (
    <Header $isScrolled={isScrolled}>
      <Wordmark>
        <WordmarkTitle>EFSA</WordmarkTitle>
        <WordmarkTagline>Engenharia de Software</WordmarkTagline>
      </Wordmark>
      <CtaLink href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer">
        <MessageCircle aria-hidden="true" />
        <CtaFullLabel>FALAR COM UM ESPECIALISTA</CtaFullLabel>
        <CtaShortLabel>FALAR NO WHATSAPP</CtaShortLabel>
      </CtaLink>
    </Header>
  )
}
