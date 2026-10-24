import { Check } from 'lucide-react'

import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { sequenceStep } from '@/lib/stagger'

interface Message {
  from: 'cliente' | 'ia'
  text: string
  /** Momento em que a mensagem entra na cena (ver `.seq` em app.css). */
  step: number
}

const MESSAGES: readonly Message[] = [
  { from: 'cliente', text: 'Oi! Vocês fazem sistema de controle de estoque?', step: 0 },
  { from: 'ia', text: 'Fazemos, sim! Quantos produtos você controla hoje?', step: 0.9 },
  { from: 'cliente', text: 'Uns 300 itens, tudo em planilha.', step: 2.6 },
  { from: 'ia', text: 'Perfeito! Já registrei seu pedido — um especialista segue com a proposta.', step: 3.5 },
]

/**
 * Cena "Atendente IA": o fluxo real do serviço — responder, qualificar e
 * encaminhar para a equipe. A bolha da IA mostra "digitando…" antes do
 * texto; o texto já ocupa o espaço desde o início (sem deslocar nada).
 */
export function ChatPreview() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-full bg-accent/15 font-mono text-micro font-semibold text-accent">
          IA
        </span>
        <div className="min-w-0">
          <p className="text-small font-medium">Atendente virtual</p>
          <p className="flex items-center gap-1.5 text-micro text-muted">
            <span className="size-1.5 rounded-full bg-accent" /> online · responde 24h
          </p>
        </div>
        <WhatsAppIcon size={18} className="ml-auto text-muted" />
      </div>

      <ol aria-label="Exemplo de conversa" className="mt-4 flex flex-col gap-2.5">
        {MESSAGES.map((message) =>
          message.from === 'cliente' ? (
            <li
              key={message.text}
              className="seq max-w-[85%] self-end rounded-2xl rounded-br-md bg-accent/15 px-3.5 py-2 text-small"
              style={sequenceStep(message.step)}
            >
              <span className="sr-only">Cliente: </span>
              {message.text}
            </li>
          ) : (
            <li
              key={message.text}
              className="seq relative max-w-[88%] self-start rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-3.5 py-2 text-small"
              style={sequenceStep(message.step)}
            >
              <span className="sr-only">Atendente com IA: </span>
              <span className="seq-text" style={sequenceStep(message.step)}>
                {message.text}
              </span>
              <span
                aria-hidden="true"
                className="seq-typing absolute top-1/2 left-3.5 flex -translate-y-1/2 gap-1"
                style={sequenceStep(message.step)}
              >
                <span className="size-1.5 rounded-full bg-muted" />
                <span className="size-1.5 rounded-full bg-muted" />
                <span className="size-1.5 rounded-full bg-muted" />
              </span>
            </li>
          ),
        )}
      </ol>

      <p
        className="seq mt-3 inline-flex items-center gap-2 self-start rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-micro text-accent"
        style={sequenceStep(5)}
      >
        <Check aria-hidden="true" className="size-3.5" />
        Qualificado · enviado à equipe
      </p>
    </div>
  )
}
