import { Link } from 'react-router-dom'

import { useConsent } from '@/components/consent/ConsentContext'
import { LegalPage, LegalSection } from '@/components/layout/LegalPage'
import { buttonStyles, inlineLinkStyles } from '@/components/ui/buttonStyles'
import { pages } from '@/config/pages'
import { site } from '@/config/site'

interface CookieRow {
  name: string
  provider: string
  purpose: string
  duration: string
}

const COOKIES: readonly { category: string; when: string; rows: readonly CookieRow[] }[] = [
  {
    category: 'Necessários',
    when: 'Sempre ativos. Não é um cookie: a escolha fica no armazenamento local do navegador.',
    rows: [
      {
        name: 'efsolutions:consentimento',
        provider: 'E.F Solutions',
        purpose: 'Guarda a sua escolha sobre cookies, para o aviso não aparecer a cada visita.',
        duration: '12 meses',
      },
    ],
  },
  {
    category: 'Medição (Google Analytics 4)',
    when: 'Só depois que você permite. Antes disso, o script do Google nem é carregado.',
    rows: [
      { name: '_ga', provider: 'Google', purpose: 'Distingue visitantes de forma anônima para as estatísticas.', duration: '2 anos' },
      { name: '_ga_<ID>', provider: 'Google', purpose: 'Mantém o estado da sessão de navegação.', duration: '2 anos' },
    ],
  },
  {
    category: 'Marketing (Meta Pixel)',
    when: 'Só depois que você permite. Antes disso, o script da Meta nem é carregado.',
    rows: [
      {
        name: '_fbp',
        provider: 'Meta',
        purpose: 'Mede visitas e cliques vindos de anúncios no Facebook e no Instagram.',
        duration: '90 dias',
      },
    ],
  },
]

/** Política de Cookies (/politica-de-cookies), com o botão que reabre as preferências. */
export default function Cookies() {
  const { openPreferences } = useConsent()

  return (
    <LegalPage meta={pages.cookies} title="Política de Cookies" updatedAt="novembro de 2026">
      <LegalSection title="Resumo">
        <p>
          Cookies são pequenos arquivos que um site guarda no seu navegador. Aqui, as ferramentas de medição (Google
          Analytics) e de marketing (Meta Pixel) só funcionam se você permitir no aviso de cookies. Se você recusar,
          nenhum script delas é carregado e nenhum cookie delas é criado.
        </p>
      </LegalSection>

      <LegalSection title="O que usamos">
        <div className="flex flex-col gap-8">
          {COOKIES.map((group) => (
            <div key={group.category}>
              <h3 className="text-body font-semibold">{group.category}</h3>
              <p className="mt-1 text-small text-muted">{group.when}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {group.rows.map((row) => (
                  <li key={row.name} className="rounded-xl border border-white/10 p-4">
                    <p className="font-mono text-micro text-accent">{row.name}</p>
                    <p className="mt-2 text-small">{row.purpose}</p>
                    <p className="mt-1 text-small text-muted">
                      {row.provider}, duração: {row.duration}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </LegalSection>

      <LegalSection title="Como mudar a sua escolha">
        <p>
          Você pode mudar a qualquer momento, pelo botão abaixo ou pelo link “Preferências de cookies” no rodapé de
          qualquer página. Ao retirar uma permissão, a ferramenta é desligada e os cookies dela são apagados.
        </p>
        <div>
          <button type="button" onClick={openPreferences} className={buttonStyles({ variant: 'secondary', size: 'md' })}>
            Abrir preferências de cookies
          </button>
        </div>
        <p>
          Também dá para apagar ou bloquear cookies nas configurações do seu navegador. A escolha vale por 12 meses;
          depois disso, o aviso aparece de novo.
        </p>
      </LegalSection>

      <LegalSection title="Mais informações">
        <p>
          Como tratamos dados pessoais está na{' '}
          <Link to={site.legal.privacyHref} className={inlineLinkStyles}>
            Política de Privacidade
          </Link>
          . As ferramentas de terceiros seguem também as políticas do{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={inlineLinkStyles}>
            Google
          </a>{' '}
          e da{' '}
          <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className={inlineLinkStyles}>
            Meta
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  )
}
