"use client"

import { useSite } from "../site-provider"
import { CtaButton } from "../cta-button"

export function HomeTab() {
  const { t } = useSite()
  const h = t.home

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="border-b border-border pb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">{h.hero.h3}</p>
        <h1 className="mt-4 text-balance font-mono text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          {h.hero.h1}
        </h1>
        <p className="mt-6 max-w-3xl text-pretty leading-relaxed text-muted-foreground">{h.hero.body}</p>
      </section>

      {/* Matrix */}
      <section>
        <h2 className="text-balance text-xl font-semibold text-foreground sm:text-2xl">{h.matrix.h2}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {h.matrix.items.map((item, i) => (
            <article key={i} className="rounded-sm border border-border bg-card p-5">
              <h3 className="font-mono text-sm font-semibold uppercase tracking-wide text-accent">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Columns */}
      <section className="grid gap-6 lg:grid-cols-2">
        {[h.columns.left, h.columns.right].map((col, i) => (
          <article key={i} className="rounded-sm border border-border bg-card p-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{col.label}</p>
            <h2 className="mt-3 text-balance text-lg font-semibold text-foreground">{col.h2}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{col.body}</p>
          </article>
        ))}
      </section>

      <CtaButton label={h.cta.button} subject={h.cta.subject} />
      <p className="text-center text-xs text-muted-foreground/70">{t.common.routingNote}</p>
    </div>
  )
}
