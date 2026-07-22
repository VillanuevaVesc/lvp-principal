'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

type VectorRow = {
  id: string
  label: string
  exposure: number
  status: 'TRACKING' | 'ALERT' | 'STABLE'
}

const VECTORS: VectorRow[] = [
  { id: 'I', label: 'Logística inmobiliaria y SOCIMI', exposure: 42.7, status: 'TRACKING' },
  { id: 'II', label: 'Energía estructural y contratos PPA', exposure: 18.3, status: 'STABLE' },
  { id: 'III', label: 'Cadena de suministro de alta densidad', exposure: 61.9, status: 'ALERT' },
  { id: 'IV', label: 'Fricción operativa y transición e-CMR', exposure: 27.4, status: 'TRACKING' },
  { id: 'V', label: 'Alucinación algorítmica (auditoría)', exposure: 12.1, status: 'STABLE' },
  { id: 'VI', label: 'Float soberano y clearing institucional', exposure: 73.5, status: 'ALERT' },
]

const STATUS_STYLE: Record<VectorRow['status'], string> = {
  TRACKING: 'text-gold border-gold-muted',
  ALERT: 'text-destructive border-destructive/50',
  STABLE: 'text-terminal border-terminal/40',
}

function useTicker(seed: number) {
  const [value, setValue] = useState(seed)
  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => {
        const drift = (Math.random() - 0.5) * 0.4
        return Math.max(0, +(v + drift).toFixed(2))
      })
    }, 1800)
    return () => clearInterval(id)
  }, [])
  return value
}

export default function RadarPage() {
  const float = useTicker(214.6)
  const [pulse, setPulse] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setPulse((p) => (p + 1) % 100), 90)
    return () => clearInterval(id)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      <section className="mx-auto w-full max-w-[1400px] px-6 py-14 md:px-12 md:py-20">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.22em] text-mist transition-colors hover:text-gold"
        >
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:-translate-x-1"
          >
            ←
          </span>
          VOLVER AL PERÍMETRO PÚBLICO
        </Link>

        <header className="mt-8 flex flex-col gap-4 border-b border-border pb-10">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terminal opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-terminal" />
            </span>
            <span className="font-sans text-[11px] tracking-[0.28em] text-gold">
              RADAR DE PROSPECCIÓN EXÓGENA · v3.0
            </span>
          </div>
          <h2 className="text-balance font-sans text-3xl font-medium leading-tight tracking-tight text-foreground md:text-4xl">
            Hub de inferencia soberana en operación continua
          </h2>
          <p className="max-w-3xl text-pretty font-sans text-[14px] leading-relaxed text-mist">
            Entorno homomórfico aislado. Las series públicas y semipúblicas se
            procesan en tiempo real para localizar distorsiones de EBITDA con
            precisión forense, sin residuo operativo sobre la entidad objetivo.
          </p>
        </header>

        {/* Live metric strip */}
        <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-3">
          {[
            { label: 'FLOAT SOBERANO INTERCEPTADO', value: `€${float.toFixed(2)}M` },
            { label: 'VECTORES EN SEGUIMIENTO', value: '06 / 06' },
            { label: 'INTEGRIDAD DEL PERÍMETRO', value: '100%' },
          ].map((m) => (
            <div key={m.label} className="flex flex-col gap-2 bg-card px-6 py-6">
              <span className="font-sans text-[10px] tracking-[0.22em] text-mist">
                {m.label}
              </span>
              <span className="font-sans text-2xl font-medium tracking-tight text-gold">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Scan progress */}
        <div className="mt-10 flex flex-col gap-3 border border-border bg-secondary/50 p-6">
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-mist">
            <span>BARRIDO MATRICIAL EXÓGENO EN CURSO</span>
            <span className="text-terminal">{String(pulse).padStart(3, '0')}%</span>
          </div>
          <div className="h-1 w-full overflow-hidden bg-secondary">
            <div
              className="h-full bg-terminal transition-[width] duration-75 ease-linear"
              style={{ width: `${pulse}%` }}
            />
          </div>
        </div>

        {/* Vector table */}
        <div className="mt-10 border border-border">
          <div className="grid grid-cols-[0.4fr_2fr_1fr_1fr] border-b border-border bg-secondary px-6 py-3">
            {['VECT', 'PERÍMETRO DE INTERCEPTACIÓN', 'EXPOSICIÓN', 'ESTADO'].map(
              (h) => (
                <span
                  key={h}
                  className="font-sans text-[10px] tracking-[0.2em] text-mist"
                >
                  {h}
                </span>
              ),
            )}
          </div>
          {VECTORS.map((v) => (
            <div
              key={v.id}
              className="grid grid-cols-[0.4fr_2fr_1fr_1fr] items-center gap-3 border-b border-border px-6 py-4 last:border-b-0"
            >
              <span className="font-sans text-[12px] tracking-[0.18em] text-gold">
                {v.id}
              </span>
              <span className="text-pretty font-sans text-[13px] leading-relaxed text-foreground">
                {v.label}
              </span>
              <span className="font-sans text-[13px] font-medium tracking-wide text-foreground">
                {v.exposure.toFixed(1)}%
              </span>
              <span>
                <span
                  className={`inline-flex border px-2 py-1 font-sans text-[10px] tracking-[0.18em] ${STATUS_STYLE[v.status]}`}
                >
                  {v.status}
                </span>
              </span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-pretty font-sans text-[11px] leading-relaxed text-mist">
          Acceso restringido. La identidad nominal del personal analítico de campo
          permanece bajo secreto comercial estricto (Ley 1/2019). Datos mostrados
          con fines de monitorización institucional.
        </p>
      </section>

      <SiteFooter />
    </main>
  )
}
