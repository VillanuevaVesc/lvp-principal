export function LvpHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Subtle geometric grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--gold) 1px, transparent 1px), linear-gradient(to bottom, var(--gold) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="max-w-3xl">
          <p className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            Consultoría de Dirección Estratégica
          </p>

          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Arbitraje Exógeno y{" "}
            <span className="text-gold">Auditoría Forense</span> de Procesos
            para C-Suite
          </h1>

          <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Intercepción de fugas de capital e incremento del margen EBITDA
            consolidado bajo el Axioma de Inclusión Exógena.
          </p>
        </div>
      </div>
    </section>
  )
}
