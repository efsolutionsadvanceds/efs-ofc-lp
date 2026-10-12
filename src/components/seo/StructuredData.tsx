interface StructuredDataProps {
  /** Um ou mais objetos JSON-LD a injetar — cada um em sua própria tag <script>. */
  schema: readonly object[]
}

/**
 * Injeta dados estruturados (Organization, WebSite, Service,
 * BreadcrumbList...) gerados a partir do mesmo conteúdo exibido na página.
 * Serializa com `JSON.stringify` direto no `children` de cada
 * <script type="application/ld+json">  — React escapa `</script>` dentro de
 * strings de texto automaticamente, e esta tag nunca é interpretada como
 * HTML pelo navegador, então isto é seguro mesmo que o schema contenha texto
 * vindo de conteúdo da página.
 */
export function StructuredData({ schema }: StructuredDataProps) {
  return (
    <>
      {schema.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key -- lista estática por render, sem reordenação.
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </>
  )
}
