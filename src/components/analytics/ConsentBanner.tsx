import styled from 'styled-components'
import { goldActionStyles } from '../../styles/actions'

const Panel = styled.div`
  position: fixed;
  left: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  bottom: ${({ theme }) => theme.spacing.md};
  z-index: ${({ theme }) => theme.zIndex.skipLink};
  max-width: ${({ theme }) => theme.layout.readableWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceElevated};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`

const Heading = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.white};
`

const Text = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`

const AcceptButton = styled.button`
  ${goldActionStyles}
  flex: 1 1 auto;
  justify-content: center;
`

const RejectButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
  min-height: 44px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: transparent;
  color: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  letter-spacing: 0.03em;
  cursor: pointer;
  transition:
    border-color ${({ theme }) => theme.motion.duration.fast}s ${({ theme }) => theme.motion.easing},
    background ${({ theme }) => theme.motion.duration.fast}s ${({ theme }) => theme.motion.easing};

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
    background: rgba(253, 207, 69, 0.06);
  }
`

interface ConsentBannerProps {
  onAccept: () => void
  onReject: () => void
}

export function ConsentBanner({ onAccept, onReject }: ConsentBannerProps) {
  return (
    <Panel role="region" aria-label="Preferências de privacidade">
      <Heading>Usamos o Google Analytics?</Heading>
      <Text>
        Podemos usar o Google Analytics apenas para entender, de forma agregada, como o site é
        usado. É totalmente opcional: a navegação e o envio de mensagens pelo WhatsApp funcionam
        normalmente mesmo se você recusar. Você pode mudar de ideia depois pelo rodapé do site.
      </Text>
      <Actions>
        <AcceptButton type="button" onClick={onAccept}>
          Aceitar
        </AcceptButton>
        <RejectButton type="button" onClick={onReject}>
          Recusar
        </RejectButton>
      </Actions>
    </Panel>
  )
}
