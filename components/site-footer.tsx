'use client'

import { useI18n } from '@/lib/i18n/context'

export function SiteFooter() {
  const { footer } = useI18n().t

  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-6 py-14 md:px-12">
        <div className="flex items-center gap-4">
          <span className="font-sans text-[11px] tracking-[0.28em] text-gold">
            {footer.block}
          </span>
          <span className="h-px w-12 bg-gold-muted" aria-hidden="true" />
          <span className="font-sans text-[11px] tracking-[0.28em] text-mist">
            {footer.perimeter}
          </span>
        </div>

        <div className="flex flex-col gap-6">
          {footer.sections.map((section, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 border-t border-border pt-6"
            >
              <span className="font-sans text-[11px] tracking-[0.18em] text-gold">
                {section.label}
              </span>
              <p className="max-w-4xl text-pretty font-sans text-[12px] leading-relaxed text-mist">
                {section.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
