import styled from 'styled-components'

import { useHeroVideo } from '@/hooks/useHeroVideo'

const POSTER_JPG = '/assets/movie/digitandoNotebook-header-poster.jpg'
const POSTER_WEBP = '/assets/movie/digitandoNotebook-header-poster.webp'
const VIDEO_SRC = '/assets/movie/digitandoNotebook-header.mp4'

/**
 * Camada de vídeo do hero. Sempre absoluta dentro de uma seção já
 * dimensionada (min-height no desktop, altura por conteúdo no mobile) —
 * como não participa do fluxo do documento, não pode gerar CLS.
 */
const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.navy};
`

const PosterImg = styled.img<{ $isHidden: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 62% center;
  opacity: ${({ $isHidden }) => ($isHidden ? 0 : 1)};
  transition: opacity ${({ theme }) => theme.motion.durationSlow} ${({ theme }) => theme.motion.ease};

  ${({ theme }) => `@media (max-width: ${theme.breakpoints.lg - 1}px)`} {
    object-position: 50% 30%;
  }
`

const Video = styled.video<{ $isReady: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 62% center;
  opacity: ${({ $isReady }) => ($isReady ? 1 : 0)};
  transition: opacity ${({ theme }) => theme.motion.durationSlow} ${({ theme }) => theme.motion.ease};
  pointer-events: none;

  ${({ theme }) => `@media (max-width: ${theme.breakpoints.lg - 1}px)`} {
    object-position: 50% 30%;
  }
`

export function HeroVideoLayer() {
  const { videoRef, containerRef, shouldLoadVideo, isVideoReady, hasVideoFailed } = useHeroVideo()
  const isVideoVisible = shouldLoadVideo && !hasVideoFailed && isVideoReady

  return (
    <Wrapper ref={containerRef}>
      <picture>
        <source srcSet={POSTER_WEBP} type="image/webp" />
        <PosterImg $isHidden={isVideoVisible} src={POSTER_JPG} alt="" decoding="async" fetchPriority="high" />
      </picture>

      {shouldLoadVideo && !hasVideoFailed ? (
        <Video
          ref={videoRef}
          $isReady={isVideoReady}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
          poster={POSTER_JPG}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </Video>
      ) : null}
    </Wrapper>
  )
}
