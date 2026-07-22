'use client'

import { useI18n } from '@/lib/i18n/context'
import { LOCALES, type Locale } from '@/lib/i18n'
import { FlagIcon } from './flag-icons'

const LABELS: Record<Locale, string> = {
  es: 'ES',
  en: 'EN',
  de: 'DE',
  fr: 'FR',
}

export function LanguageSelector() {
  const { locale, setLocale, t } = useI18n()

  return (
    <div
      className="flex items-center font-mono text-[11px] tracking-[0.18em] text-mist"
      role="group"
      aria-label={t.header.languageAria}
    >
      {LOCALES.map((code, i) => (
        <span key={code} className="flex items-center">
          {i > 0 && (
            <span className="px-2 text-gold-muted" aria-hidden="true">
              |
            </span>
          )}
          <button
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={locale === code}
            aria-current={locale === code ? 'true' : undefined}
            className={
              'group flex cursor-pointer items-center transition-colors duration-200 hover:text-gold ' +
              (locale === code ? 'text-gold' : 'text-mist')
            }
          >
            <FlagIcon
              code={code}
              className={
                'mr-2 w-4 shrink-0 rounded-[1.5px] shadow-sm transition-all duration-200 ' +
                (locale === code
                  ? 'opacity-100 saturate-100'
                  : 'opacity-80 saturate-[0.9] group-hover:opacity-100 group-hover:saturate-100')
              }
            />
            {LABELS[code]}
          </button>
        </span>
      ))}
    </div>
  )
}
