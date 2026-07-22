"use client"

import { useSite } from "../site-provider"
import { CtaButton } from "../cta-button"

export function GovernanceTab() {
  const { t } = useSite()
  const g = t.governance

  return (
    <div className="space-y-12">
      <section className="border-b border-border pb-8">
        <h1 className="text-balance font-mono text-2xl font-bold leading-tight text-foreground sm:text-3xl">
          {g.h1}
        </h1>
        <p className="mt-5 max-w-3xl text-pretty leading-relaxed text-muted-foreground">{g.body}</p>
      </section>

      <section>
        <h2 className="text-balance text-lg font-semibold text-foreground">{g.patrimony.h2}</h2>
        <div className="mt-6 space-y-3">
          {g.patrimony.items.map((item, i) => (
            <article key={i} className="rounded-sm border border-border bg-card p-5">
              <h3 className="font-mono text-sm font-semibold uppercase tracking-wide text-accent">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-balance text-lg font-semibold text-foreground">{g.regime.h2}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{g.regime.intro}</p>
        <div className="mt-6 space-y-3">
          {g.regime.points.map((p, i) => (
            <article key={i} className="rounded-sm border border-border bg-card p-5">
              <h3 className="font-mono text-sm font-semibold uppercase tracking-wide text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-balance text-lg font-semibold text-foreground">{g.kyc.h2}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {g.kyc.points.map((p, i) => (
            <article key={i} className="rounded-sm border border-border bg-card p-5">
              <h3 className="font-mono text-sm font-semibold uppercase tracking-wide text-accent">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaButton label={g.cta.button} subject={g.cta.subject} />
      <p className="text-center text-xs text-muted-foreground/70">{t.common.routingNote}</p>
    </div>
  )
}
