import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { pages } from '@/config/pages'
import { trackWhatsAppLead, type CtaLocation } from '@/lib/analytics'
import { createThankYouState } from '@/lib/thankYouState'
import { buildLeadUrl } from '@/lib/whatsapp'

import { useSelection } from './SelectionContext'

type AnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel' | 'onClick'>

interface WhatsAppCtaProps extends AnchorProps {
  /** Onde o botão está — enviado ao GA4 como `cta_location`. */
  location: CtaLocation
}

/**
 * CTA de conversão. É um `<a href>` real para o wa.me com a mensagem montada
 * a partir da seleção atual: funciona antes da hidratação, respeita
 * Ctrl/⌘+clique e abre o WhatsApp (app ou nova aba) direto do gesto do
 * usuário, sem risco de bloqueio de pop-up. No mesmo clique, registra a
 * conversão e leva esta aba para a página de obrigado.
 */
export function WhatsAppCta({ location, children, ...anchorProps }: WhatsAppCtaProps) {
  const { selected } = useSelection()
  const navigate = useNavigate()

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackWhatsAppLead({ services: selected, location })

    const isPlainClick = event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
    if (!isPlainClick) return

    // A navegação fica para a próxima tarefa: o link precisa continuar no
    // documento até o navegador concluir a abertura da nova aba.
    const state = createThankYouState(selected)
    window.setTimeout(() => navigate(pages.obrigado.path, { state }), 0)
  }

  return (
    <a {...anchorProps} href={buildLeadUrl(selected)} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
      {children}
    </a>
  )
}
