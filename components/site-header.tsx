'use client'

import { useI18n } from '@/lib/i18n/context'
import { LanguageSelector } from './language-selector'

export function SiteHeader() {
  const { t } = useI18n()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-[1400px] items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-4">
          <div
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center border border-gold-muted"
          >
            <span className="font-sans text-sm font-medium tracking-widest text-gold">
              LV
            </span>
          </div>
          <h1 className="font-sans text-[13px] font-medium tracking-[0.28em] text-foreground md:text-[15px]">
            {t.header.company}
          </h1>
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          <span
            className="hidden font-sans text-[11px] tracking-[0.22em] text-mist lg:inline"
          >
            {t.header.classification}
          </span>
          <span className="hidden h-3 w-px bg-gold-muted lg:inline-block" aria-hidden="true" />
          <LanguageSelector />
        </div>
      </div>
    </header>
  )
}
