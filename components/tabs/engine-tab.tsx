"use client"

import { useSite } from "../site-provider"
import { CtaButton } from "../cta-button"

export function EngineTab() {
  const { t } = useSite()
  const e = t.engine

  return (
    <div className="space-y-12">
      <section className="border-b border-border pb-8">
        <h1 className="text-balance font-mono text-2xl font-bold leading-tight text-foreground sm:text-3xl">
          {e.h1}
        </h1>
        <p className="mt-5 max-w-3xl text-pretty leading-relaxed text-muted-foreground">{e.intro}</p>
      </section>

      <section className="space-y-3">
        {e.layers.map((layer, i) => (
          <article key={i} className="flex gap-4 rounded-sm border border-border bg-card p-5">
            <span
              className="mt-0.5 font-mono text-sm font-bold text-accent"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-mono text-sm font-semibold uppercase tracking-wide text-foreground">
                {layer.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{layer.body}</p>
            </div>
          </article>
        ))}
      </section>

      <section>
        <h2 className="text-balance text-xl font-semibold text-foreground sm:text-2xl">{e.team.h2}</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{e.team.intro}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {e.team.members.map((m, i) => (
            <article key={i} className="rounded-sm border border-border bg-card p-5">
              <h3 className="font-mono text-sm font-semibold uppercase tracking-wide text-accent">{m.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaButton label={e.cta.button} subject={e.cta.subject} />
      <p className="text-center text-xs text-muted-foreground/70">{t.common.routingNote}</p>
    </div>
  )
}
