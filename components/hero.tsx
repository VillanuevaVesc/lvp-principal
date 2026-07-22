'use client'

import { useI18n } from '@/lib/i18n/context'

export function Hero() {
  const { hero } = useI18n().t

  return (
    <section className="mx-auto w-full max-w-[1400px] px-6 pb-12 pt-20 md:px-12 md:pb-20 md:pt-28">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="flex flex-col gap-8">
          <span className="font-sans text-[11px] tracking-[0.32em] text-gold">
            {hero.eyebrow}
          </span>
          <h2 className="max-w-2xl text-balance font-sans text-4xl font-medium leading-[1.1] tracking-tight text-foreground md:text-6xl">
            {hero.title}
          </h2>
          <p className="max-w-xl text-pretty font-sans text-[16px] leading-relaxed text-mist">
            {hero.intro}
          </p>
        </div>
        <div className="flex flex-col gap-6 border-l border-gold-muted pl-8">
          <p className="font-sans text-[13px] leading-relaxed tracking-wide text-mist">
            {hero.aside}
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="font-sans text-[12px] tracking-wide text-mist">
                {hero.jurisdictionLabel}
              </span>
              <span className="font-sans text-[13px] text-foreground">
                {hero.jurisdictionValue}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="font-sans text-[12px] tracking-wide text-mist">
                {hero.classificationLabel}
              </span>
              <span className="font-sans text-[13px] text-gold">
                {hero.classificationValue}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
