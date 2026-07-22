import { ShieldOff, Footprints } from 'lucide-react'

const ASSURANCES: { icon: typeof ShieldOff; label: string; detail: string }[] = [
  {
    icon: ShieldOff,
    label: 'Zero System Intrusion',
    detail:
      'No connectors, no credentials, no access to your internal systems at any stage.',
  },
  {
    icon: Footprints,
    label: 'Zero Operational Footprint',
    detail:
      'No agents installed, no logs retained. Analysis performed entirely off your infrastructure.',
  },
]

export function InterfaceHero() {
  return (
    <section id="vectors" className="relative border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <p className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
          <span aria-hidden="true" className="h-px w-8 bg-gold" />
          Exogenous Mandate
        </p>

        <h1 className="max-w-4xl text-balance font-heading text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Exogenous Financial Inference <span className="text-gold">&</span> Autor
          Audit.
        </h1>

        <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-mist">
          Sovereign forensic examination of corporate asymmetries, conducted
          entirely from the outside &mdash; with{' '}
          <span className="text-foreground">zero system intrusion</span> and{' '}
          <span className="text-foreground">zero operational footprint</span>.
        </p>

        <dl className="mt-14 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
          {ASSURANCES.map(({ icon: Icon, label, detail }) => (
            <div
              key={label}
              className="flex flex-col gap-3 rounded-sm border border-border bg-card p-6"
            >
              <dt className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-sm border border-gold-muted bg-gold/5">
                  <Icon className="h-4 w-4 text-gold" aria-hidden="true" />
                </span>
                <span className="font-heading text-sm font-semibold tracking-wide text-foreground">
                  {label}
                </span>
              </dt>
              <dd className="text-sm leading-relaxed text-muted-foreground">
                {detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
