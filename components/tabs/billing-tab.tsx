"use client"

import { useSite } from "../site-provider"

const toneStyles: Record<string, string> = {
  white: "border-border bg-card",
  silver: "border-muted-foreground/40 bg-muted",
  alert: "border-destructive/60 bg-destructive/10",
}

const toneLabel: Record<string, string> = {
  white: "text-foreground",
  silver: "text-foreground",
  alert: "text-destructive",
}

export function BillingTab() {
  const { t } = useSite()
  const b = t.billing

  return (
    <div className="space-y-12">
      <section className="border-b border-border pb-8">
        <h1 className="text-balance font-mono text-2xl font-bold leading-tight text-foreground sm:text-3xl">
          {b.h1}
        </h1>
        <p className="mt-5 max-w-3xl text-pretty leading-relaxed text-muted-foreground">{b.intro}</p>
      </section>

      {/* Via I */}
      <section>
        <h2 className="text-balance text-lg font-semibold text-foreground">{b.via1.h2}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{b.via1.intro}</p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          {b.via1.tiers.map((tier, i) => (
            <div key={i} className="rounded-sm border border-border bg-card p-4">
              <dt className="text-xs leading-relaxed text-muted-foreground">{tier.label}</dt>
              <dd className="mt-2 font-mono text-sm font-semibold text-accent">{tier.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 space-y-3">
          {b.via1.clauses.map((c, i) => (
            <article key={i} className="rounded-sm border border-border bg-card p-5">
              <h3 className="font-mono text-sm font-semibold uppercase tracking-wide text-foreground">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Via II */}
      <section>
        <h2 className="text-balance text-lg font-semibold text-foreground">{b.via2.h2}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{b.via2.intro}</p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          {b.via2.tiers.map((tier, i) => (
            <div key={i} className="rounded-sm border border-border bg-card p-4">
              <dt className="text-xs leading-relaxed text-muted-foreground">{tier.label}</dt>
              <dd className="mt-2 font-mono text-sm font-semibold text-accent">{tier.value}</dd>
            </div>
          ))}
        </dl>

        <h3 className="mt-8 font-mono text-sm font-semibold uppercase tracking-wide text-foreground">
          {b.via2.floorTitle}
        </h3>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {b.via2.floors.map((f, i) => (
            <div key={i} className="rounded-sm border border-border bg-card p-4">
              <dt className="text-xs leading-relaxed text-muted-foreground">{f.label}</dt>
              <dd className="mt-2 font-mono text-sm font-semibold text-accent">{f.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{b.via2.floorNote}</p>
        <p className="mt-4 rounded-sm border-l-2 border-accent bg-card p-4 text-sm leading-relaxed text-muted-foreground">
          {b.via2.minFilter}
        </p>
      </section>

      {/* Damocles windows */}
      <section>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">{b.damocles.note}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {b.damocles.windows.map((w, i) => (
            <article key={i} className={`rounded-sm border p-5 ${toneStyles[w.tone]}`}>
              <h3 className={`font-mono text-sm font-semibold uppercase tracking-wide ${toneLabel[w.tone]}`}>
                {w.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Addendum */}
      <section>
        <h2 className="text-balance text-lg font-semibold text-foreground">{b.addendum.h2}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{b.addendum.intro}</p>
        <div className="mt-6 space-y-3">
          {b.addendum.jurisdictions.map((j, i) => (
            <article key={i} className="rounded-sm border border-border bg-card p-5">
              <h3 className="font-mono text-sm font-semibold uppercase tracking-wide text-accent">{j.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{j.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
