import type { AnchorHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

interface SmartLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string
}

/**
 * Link interno que escolhe o elemento certo: rotas do site navegam pelo
 * React Router (sem recarregar a página); âncoras de seção (`/#servicos`)
 * continuam um <a> comum, para o navegador rolar até a seção.
 */
export function SmartLink({ href, ...props }: SmartLinkProps) {
  return href.includes('#') ? <a href={href} {...props} /> : <Link to={href} {...props} />
}
