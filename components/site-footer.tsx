"use client"

import { useSite } from "./site-provider"

export function SiteFooter() {
  const { t } = useSite()
  const f = t.footer

  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          {f.lines.map((line, i) => (
            <div key={i}>
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-accent">
                {line.title}
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{line.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <span>{f.legalLeft}</span>
          <span>{f.legalRight}</span>
        </div>
      </div>
    </footer>
  )
}
