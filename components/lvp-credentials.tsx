import { FileText, Layers, ShieldCheck } from "lucide-react"

const CREDENTIALS = [
  {
    icon: FileText,
    tag: "Registro Fiscal",
    title: "Código de Registro Fiscal",
    value: "IAE 1-8431",
  },
  {
    icon: Layers,
    tag: "Clasificación",
    title: "Clasificación Nacional",
    value: "CNAE 7020-7022",
  },
  {
    icon: ShieldCheck,
    tag: "Especialización",
    title: "Área de Práctica",
    value: "Consultoría de Dirección Estratégica y Procesos Forenses de Autor",
  },
]

export function LvpCredentials() {
  return (
    <section id="credenciales" className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
            Parámetros de Registro
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Credenciales Fiscales
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Inscripción regulada conforme a la normativa nacional vigente para
          estructuras de alta dirección.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3">
        {CREDENTIALS.map((item) => {
          const Icon = item.icon
          return (
            <article
              key={item.title}
              className="group flex flex-col gap-6 bg-card p-8 transition-colors hover:bg-secondary"
            >
              <div className="flex items-center justify-between">
                <Icon className="h-6 w-6 text-gold" aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {item.tag}
                </span>
              </div>
              <div className="mt-auto">
                <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-pretty font-mono text-base leading-relaxed text-foreground">
                  {item.value}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
