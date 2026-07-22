'use client'

import { Lock } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import type { Locale } from '@/lib/i18n'
import { FlagIcon } from './flag-icons'

/** Language selector order requested for the navbar: ES · FR · DE · EN. */
const LANG_ORDER: { code: Locale; label: string }[] = [
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
]

const NAV_LINKS: { href: string; label: string }[] = [
  { href: '#enclave', label: 'Enclave Restricted' },
  { href: '#vectors', label: 'Vectors' },
]

export function InterfaceHeader() {
  const { locale, setLocale } = useI18n()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
        {/* Marque / wordmark */}
        <a
          href="#top"
          className="flex items-center gap-2.5 shrink-0"
          aria-label="Luxe Vela Prive Strategic Consulting"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-sm border border-gold-muted bg-gold/5">
            <Lock className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
          </span>
          <span className="font-heading text-sm font-semibold tracking-[0.14em] text-foreground">
            LUXE VELA PRIVE
          </span>
        </a>

        {/* Navigation links */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-mist transition-colors duration-200 hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Language selector — 4 flag icons */}
        <div
          role="group"
          aria-label="Language selector"
          className="flex items-center gap-1"
        >
          {LANG_ORDER.map((lang) => {
            const active = locale === lang.code
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLocale(lang.code)}
                aria-pressed={active}
                title={lang.label}
                className={
                  'group flex items-center gap-1.5 rounded-sm px-2 py-1.5 font-mono text-[10px] tracking-[0.16em] transition-colors duration-200 ' +
                  (active
                    ? 'bg-gold/10 text-gold'
                    : 'text-mist hover:bg-secondary hover:text-foreground')
                }
              >
                <FlagIcon
                  code={lang.code}
                  className={
                    'w-4 shrink-0 rounded-[1.5px] shadow-sm transition-all duration-200 ' +
                    (active
                      ? 'opacity-100 saturate-100'
                      : 'opacity-70 saturate-[0.85] group-hover:opacity-100 group-hover:saturate-100')
                  }
                />
                <span className="hidden sm:inline">{lang.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </header>
  )
}
