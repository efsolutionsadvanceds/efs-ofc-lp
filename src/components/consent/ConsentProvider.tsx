import { startTransition, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import { applyConsent, readConsent, trackPixelPageView, writeConsent, type ConsentChoice, type StoredConsent } from '@/lib/tracking'

import { ConsentContext } from './ConsentContext'

/**
 * Estado do consentimento de cookies. A escolha é lida do navegador só
 * depois da hidratação: o HTML pré-renderizado é o mesmo para todos, sem
 * aviso nenhum, e quem já escolheu nunca vê o aviso piscar.
 */
export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<StoredConsent | null>(null)
  const [ready, setReady] = useState(false)
  const [preferencesOpen, setPreferencesOpen] = useState(false)
  const { pathname } = useLocation()
  const firstPath = useRef(true)

  useEffect(() => {
    const saved = readConsent()
    if (saved) applyConsent(saved)
    // Como transição: a mudança chega a rotas sob demanda que ainda podem estar
    // hidratando (a barra de conversão lê este contexto). Uma atualização comum
    // obrigava o React a trocar o HTML do servidor pelo esqueleto até o código
    // chegar, e a página saltava (CLS ~0,4). Como transição, ele termina a
    // hidratação antes de aplicar.
    startTransition(() => {
      setConsent(saved)
      setReady(true)
    })
  }, [])

  // PageView do Pixel nas navegações internas (o primeiro sai junto com o carregamento do Pixel).
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false
      return
    }
    trackPixelPageView()
  }, [pathname])

  // As ações também são transições, pelo mesmo motivo (um clique logo no
  // carregamento não pode trocar a rota pelo esqueleto). Gravar a escolha e
  // carregar ou desligar as ferramentas acontece na hora.
  const choose = useCallback((choice: ConsentChoice) => {
    const saved = writeConsent(choice)
    applyConsent(saved)
    startTransition(() => {
      setConsent(saved)
      setPreferencesOpen(false)
    })
  }, [])

  const openPreferences = useCallback(() => startTransition(() => setPreferencesOpen(true)), [])
  const closePreferences = useCallback(() => startTransition(() => setPreferencesOpen(false)), [])

  const value = useMemo(
    () => ({
      consent,
      ready,
      bannerVisible: ready && consent === null,
      preferencesOpen,
      choose,
      openPreferences,
      closePreferences,
    }),
    [consent, ready, preferencesOpen, choose, openPreferences, closePreferences],
  )

  return <ConsentContext value={value}>{children}</ConsentContext>
}
