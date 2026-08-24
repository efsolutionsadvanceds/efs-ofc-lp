import { motion } from 'motion/react'
import styled from 'styled-components'

export const SectionContainer = styled.section`
  position: relative;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  scroll-margin-top: ${({ theme }) => theme.spacing['4xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.md};
  }
`

export const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`

export const SectionIntro = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 640px;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`

export const Eyebrow = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.gold};
`

export const SectionHeading = styled.h2`
  font-size: clamp(1.75rem, 1.3rem + 1.8vw, ${({ theme }) => theme.typography.sizes['3xl']});
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  line-height: 1.22;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.white};
`

export const SectionParagraph = styled.p`
  max-width: 60ch;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
`
