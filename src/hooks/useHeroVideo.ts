import { useEffect, useRef, useState } from 'react'

import { usePrefersReducedMotion } from './usePrefersReducedMotion'

interface NetworkInformationLike {
  saveData?: boolean
}

function getSaveData(): boolean {
  if (typeof navigator === 'undefined') return false
  const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection
  return Boolean(connection?.saveData)
}

/** Abaixo do breakpoint `md`, o vídeo do hero não é baixado — o poster cobre esse caso. */
function isNarrowViewport(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(max-width: 767px)').matches
}

interface UseHeroVideoResult {
  videoRef: React.RefObject<HTMLVideoElement | null>
  containerRef: React.RefObject<HTMLDivElement | null>
  /** Falso quando o vídeo não deve nem ser solicitado (movimento reduzido ou economia de dados). */
  shouldLoadVideo: boolean
  /** Verdadeiro só depois que o primeiro frame reproduzível chega — controla o fade-in. */
  isVideoReady: boolean
  /** Verdadeiro se o autoplay/carregamento falhar — mantém o poster como resultado final. */
  hasVideoFailed: boolean
}

/**
 * Orquestra o vídeo de fundo do hero: decide se ele deve carregar (respeitando
 * `prefers-reduced-motion` e `navigator.connection.saveData`), acompanha
 * quando está pronto para exibir (para o fade-in do poster) e pausa/retoma a
 * reprodução via IntersectionObserver quando o hero sai/entra na viewport —
 * sem listener de scroll manual.
 */
export function useHeroVideo(): UseHeroVideoResult {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [shouldLoadVideo] = useState(() => !prefersReducedMotion && !getSaveData() && !isNarrowViewport())
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [hasVideoFailed, setHasVideoFailed] = useState(false)

  useEffect(() => {
    if (!shouldLoadVideo) return
    const video = videoRef.current
    if (!video) return

    function handleCanPlay() {
      setIsVideoReady(true)
    }

    function handleError() {
      setHasVideoFailed(true)
    }

    video.addEventListener('canplaythrough', handleCanPlay)
    video.addEventListener('playing', handleCanPlay)
    video.addEventListener('error', handleError)

    const playAttempt = video.play()
    if (playAttempt) {
      playAttempt.catch(() => {
        // Autoplay bloqueado pelo navegador — o poster permanece visível, sem quebrar a hero.
        setHasVideoFailed(true)
      })
    }

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay)
      video.removeEventListener('playing', handleCanPlay)
      video.removeEventListener('error', handleError)
    }
  }, [shouldLoadVideo])

  useEffect(() => {
    if (!shouldLoadVideo) return
    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined)
        } else {
          video.pause()
        }
      },
      { threshold: 0 },
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [shouldLoadVideo])

  return { videoRef, containerRef, shouldLoadVideo, isVideoReady, hasVideoFailed }
}
