"use client"

import { useSite } from "../site-provider"
import { CtaButton } from "../cta-button"

export function VectorsTab() {
  const { t } = useSite()
  const v = t.vectors

  return (
    <div className="space-y-12">
      <section className="border-b border-border pb-8">
        <h1 className="text-balance font-mono text-2xl font-bold leading-tight text-foreground sm:text-3xl">
          {v.h1}
        </h1>
        <p className="mt-5 max-w-3xl text-pretty leading-relaxed text-muted-foreground">{v.body}</p>
      </section>

      {/* Section A - Infrastructure */}
      <section>
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent">{v.infra.sectionLabel}</p>
        <h2 className="mt-3 text-balance text-lg font-semibold text-foreground">{v.infra.h2}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{v.infra.body}</p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          {v.infra.metrics.map((m, i) => (
            <div key={i} className="rounded-sm border border-border bg-card p-4">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-accent">{m.label}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Section B - Forensic matrix */}
      <section>
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent">{v.matrixLabel}</p>
        <div className="mt-6 space-y-4">
          {v.items.map((item, i) => (
            <article key={i} className="rounded-sm border border-border bg-card p-6">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="rounded-sm border border-accent/50 bg-accent/10 px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
                  {item.tag}
                </span>
                <h3 className="text-balance text-base font-semibold text-foreground">{item.h2}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              <dl className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
                {item.filters.map((f, j) => (
                  <div key={j}>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
                      {f.label}
                    </dt>
                    <dd className="mt-1 font-mono text-xs text-foreground">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </section>

      <CtaButton label={v.cta.button} subject={v.cta.subject} />
      <p className="text-center text-xs text-muted-foreground/70">{t.common.routingNote}</p>
    </div>
  )
}
