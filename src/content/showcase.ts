export interface ShowcaseSlide {
  id: string
  alt: string
  caption: string
  /** Apenas `site-exemplo` é conceitual — os demais são imagens/vídeos ilustrativos de ambiente. */
  isConceptual?: boolean
}

export interface ShowcaseImageSlide extends ShowcaseSlide {
  type: 'image'
  src: string
}

export interface ShowcaseVideoSlide extends ShowcaseSlide {
  type: 'video'
  src: string
}

export const showcaseSlides: (ShowcaseImageSlide | ShowcaseVideoSlide)[] = [
  {
    id: 'area-moderna',
    type: 'image',
    src: '/assets/images/area-moderna.jpg',
    alt: 'Ambiente interno moderno com acabamento em madeira, representando o padrão de apresentação que um projeto bem executado transmite.',
    caption: 'Presença visual à altura do projeto',
  },
  {
    id: 'sala-sofisticada',
    type: 'video',
    src: '/assets/movie/sala-sofisticada.mp4',
    alt: 'Sala sofisticada com vista para o mar, ilustrando um ambiente de alto padrão.',
    caption: 'Experiência visual que gera confiança',
  },
  {
    id: 'area-paisagem',
    type: 'image',
    src: '/assets/images/area-paisagem.jpg',
    alt: 'Ambiente integrado com vista para a paisagem, com grandes esquadrias de vidro.',
    caption: 'Projetos que merecem uma apresentação à altura',
  },
  {
    id: 'casa-com-piscina',
    type: 'image',
    src: '/assets/images/casa-com-piscina.jpg',
    alt: 'Casa moderna com piscina, iluminação noturna e acabamento sofisticado.',
    caption: 'Cada detalhe comunica profissionalismo',
  },
  {
    id: 'entrada-de-casa-moderna',
    type: 'image',
    src: '/assets/images/entrada-de-casa-moderna.jpg',
    alt: 'Entrada de casa com acabamento cuidadoso, plantas e iluminação.',
    caption: 'A primeira impressão começa antes da porta',
  },
  {
    id: 'casa-moderna-1',
    type: 'video',
    src: '/assets/movie/casa-moderna-1.mp4',
    alt: 'Fachada de casa moderna, ilustrando um projeto residencial concluído.',
    caption: 'Do projeto à obra concluída',
  },
  {
    id: 'site-exemplo',
    type: 'image',
    src: '/assets/images/site-exemplo.png',
    alt: 'Estrutura conceitual e ilustrativa de site — wireframe, não um projeto real entregue a um cliente.',
    caption: 'Estrutura conceitual e ilustrativa de site',
    isConceptual: true,
  },
]
