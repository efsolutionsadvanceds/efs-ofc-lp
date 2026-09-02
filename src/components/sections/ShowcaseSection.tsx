import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { showcaseSlides } from '@/content/showcase'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const showcaseCopy = {
  eyebrow: 'COMO SUA EMPRESA PODE SE APRESENTAR',
  heading: 'A qualidade do seu projeto merece uma apresentação à altura.',
  lead: 'Imagens e estrutura ilustrativas — não fotos de projetos entregues pela E.F Solutions nem depoimentos de clientes.',
}

const AUTO_ADVANCE_MS = 6500

const Section = styled.section`
  position: relative;
  background: ${({ theme }) => theme.colors.navy};
  padding-block: ${({ theme }) => theme.space[20]};
`

const CarouselWrapper = styled.div`
  position: relative;
`

const Track = styled.ul`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: ${({ theme }) => theme.space[5]};
  padding-bottom: ${({ theme }) => theme.space[2]};
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const Slide = styled.li`
  flex: 0 0 100%;
  scroll-snap-align: start;
  position: relative;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderOnDark};
  background: ${({ theme }) => theme.colors.surface};
  aspect-ratio: 16 / 9;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.md}px) { flex-basis: calc(60% - ${theme.space[5]}); }`}
`

const SlideMedia = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const SlideVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Caption = styled.p`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: ${({ theme }) => theme.space[4]};
  background: linear-gradient(0deg, ${({ theme }) => theme.colors.navyAlpha(0.85)}, transparent);
  color: ${({ theme }) => theme.colors.textOnDark};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
`

const ConceptualTag = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.space[3]};
  left: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[3]}`};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.goldAlpha(0.9)};
  color: ${({ theme }) => theme.colors.textOnGold};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.space[5]};
`

const ArrowButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.borderOnDarkStrong};
  color: ${({ theme }) => theme.colors.textOnDark};

  &:hover,
  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.gold};
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`

const Dots = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[2]};
`

const Dot = styled.button<{ $isActive: boolean }>`
  width: ${({ $isActive }) => ($isActive ? '22px' : '8px')};
  height: 8px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $isActive }) => ($isActive ? theme.colors.gold : theme.colors.borderOnDarkStrong)};
  transition: width ${({ theme }) => theme.motion.durationFast} ${({ theme }) => theme.motion.ease};
`

/**
 * Galeria/carrossel de apresentação — imagens e vídeos ilustrativos do
 * padrão visual que um projeto bem apresentado transmite. Nunca fotos de
 * entregas reais da E.F Solutions nem depoimentos: `site-exemplo` é
 * explicitamente marcado como estrutura conceitual (ver ConceptualTag).
 */
export function ShowcaseSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef<HTMLUListElement>(null)
  const autoAdvanceRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current
    if (!track) return
    const slide = track.children[index] as HTMLElement | undefined
    if (!slide) return
    /* Rola apenas o próprio track (eixo horizontal) via scrollTo no elemento —
       nunca scrollIntoView, que pode arrastar a rolagem vertical da página
       inteira até o carrossel quando ele está fora da viewport. */
    track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' })
  }, [])

  const stopAutoAdvance = useCallback(() => {
    if (autoAdvanceRef.current) {
      clearInterval(autoAdvanceRef.current)
      autoAdvanceRef.current = null
    }
  }, [])

  /**
   * Enquanto uma rolagem programática (seta, ponto, avanço automático) está
   * em andamento, o observer de posição abaixo ignora atualizações — evita
   * que ele "brigue" com a navegação e reverta o índice ativo no meio da
   * animação suave de scroll.
   */
  const isProgrammaticScrollRef = useRef(false)
  const programmaticScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (prefersReducedMotion) return
    autoAdvanceRef.current = setInterval(() => {
      isProgrammaticScrollRef.current = true
      if (programmaticScrollTimeoutRef.current) clearTimeout(programmaticScrollTimeoutRef.current)
      programmaticScrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScrollRef.current = false
      }, 700)
      setActiveIndex((current) => {
        const next = (current + 1) % showcaseSlides.length
        scrollToIndex(next)
        return next
      })
    }, AUTO_ADVANCE_MS)
    return () => stopAutoAdvance()
  }, [prefersReducedMotion, scrollToIndex, stopAutoAdvance])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScrollRef.current) return
        const mostVisible = entries.reduce((best, entry) =>
          entry.intersectionRatio > (best?.intersectionRatio ?? 0) ? entry : best,
        )
        if (mostVisible?.isIntersecting) {
          const index = Array.from(track.children).indexOf(mostVisible.target)
          if (index >= 0) setActiveIndex(index)
        }
      },
      { root: track, threshold: [0.6] },
    )

    Array.from(track.children).forEach((child) => observer.observe(child))
    return () => observer.disconnect()
  }, [])

  function goTo(index: number) {
    stopAutoAdvance()
    isProgrammaticScrollRef.current = true
    if (programmaticScrollTimeoutRef.current) clearTimeout(programmaticScrollTimeoutRef.current)
    programmaticScrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false
    }, 700)
    setActiveIndex(index)
    scrollToIndex(index)
  }

  return (
    <Section id="vitrine">
      <Container>
        <SectionHeading eyebrow={showcaseCopy.eyebrow} heading={showcaseCopy.heading} lead={showcaseCopy.lead} />

        <CarouselWrapper onMouseEnter={stopAutoAdvance} onPointerDown={stopAutoAdvance}>
          <Track
            ref={trackRef}
            role="region"
            aria-label="Vitrine de imagens e vídeos ilustrativos"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight') goTo(Math.min(activeIndex + 1, showcaseSlides.length - 1))
              if (event.key === 'ArrowLeft') goTo(Math.max(activeIndex - 1, 0))
            }}
          >
            {showcaseSlides.map((slide, index) => (
              <Slide key={slide.id}>
                {slide.isConceptual ? <ConceptualTag>Estrutura conceitual</ConceptualTag> : null}
                {slide.type === 'video' ? (
                  <SlideVideo
                    src={slide.src}
                    muted
                    loop
                    playsInline
                    autoPlay={index === activeIndex && !prefersReducedMotion}
                    preload={index === activeIndex ? 'metadata' : 'none'}
                    disablePictureInPicture
                    controls={false}
                    aria-label={slide.alt}
                  />
                ) : (
                  <SlideMedia src={slide.src} alt={slide.alt} loading="lazy" decoding="async" />
                )}
                <Caption>{slide.caption}</Caption>
              </Slide>
            ))}
          </Track>

          <Controls>
            <ArrowButton
              type="button"
              aria-label="Slide anterior"
              disabled={activeIndex === 0}
              onClick={() => goTo(Math.max(activeIndex - 1, 0))}
            >
              <ChevronLeft aria-hidden="true" />
            </ArrowButton>

            <Dots role="tablist" aria-label="Selecionar slide">
              {showcaseSlides.map((slide, index) => (
                <Dot
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Ir para o slide ${index + 1}`}
                  $isActive={index === activeIndex}
                  onClick={() => goTo(index)}
                />
              ))}
            </Dots>

            <ArrowButton
              type="button"
              aria-label="Próximo slide"
              disabled={activeIndex === showcaseSlides.length - 1}
              onClick={() => goTo(Math.min(activeIndex + 1, showcaseSlides.length - 1))}
            >
              <ChevronRight aria-hidden="true" />
            </ArrowButton>
          </Controls>
        </CarouselWrapper>
      </Container>
    </Section>
  )
}
