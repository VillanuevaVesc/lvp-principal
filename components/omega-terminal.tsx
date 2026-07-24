"use client"

import type React from "react"
import { useState } from "react"
import { track } from "@vercel/analytics"
import {
  Terminal,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldAlert,
  Fingerprint,
  Layers,
  Snowflake,
  Waves,
  Route,
  Handshake,
  Timer,
  KeyRound,
  Activity,
  CircleCheck,
  ScrollText,
} from "lucide-react"

type Status = "idle" | "error" | "success_prmf" | "success_autor"

const TOKENS = {
  CLIENTE: "LVP-OMEGA-1307-PRMF-926B",
  AUTOR: "LVP-MASTER-BACKDOOR-AUDIT",
} as const

const IMPACT_VECTORS = [
  {
    icon: Layers,
    label: "Subcontratación Multimodal",
    amount: "-1.120.000,00 € / año",
    pct: 60.54,
    tone: "rose" as const,
  },
  {
    icon: Snowflake,
    label: "Cadena de Frío y Mermas",
    amount: "-485.000,00 € / año",
    pct: 26.22,
    tone: "amber" as const,
  },
  {
    icon: Waves,
    label: "Float Hijacking y e-CMR",
    amount: "+245.000,00 € liquidez",
    pct: 13.24,
    tone: "emerald" as const,
  },
]

const PHASES = [
  {
    n: "01",
    title: "Requerimiento Fehaciente",
    desc: "Notificación burofax con acuse y sellado temporal a la contraparte. Apertura del expediente forense.",
  },
  {
    n: "02",
    title: "Cuantificación Pericial",
    desc: "Dictamen de asimetrías con trazabilidad e-CMR y reconstrucción contable de los tres vectores de impacto.",
  },
  {
    n: "03",
    title: "Negociación Asistida",
    desc: "Mesa técnica de conciliación con propuesta de rescale neto y calendario de compensación vinculante.",
  },
  {
    n: "04",
    title: "Cierre y Custodia",
    desc: "Acuerdo transaccional firmado, liquidación de success fees y archivo criptográfico del expediente.",
  },
]

export function OmegaTerminal() {
  const [token, setToken] = useState("")
  const [show, setShow] = useState(false)
  const [status, setStatus] = useState<Status>("idle")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const code = token.trim().toUpperCase()
    if (code.length === 0) return

    if (code === TOKENS.CLIENTE || code === TOKENS.AUTOR) {
      const tipo = code === TOKENS.AUTOR ? "autor_master" : "cliente_prmf"
      const entidad = code === TOKENS.AUTOR ? "LVP_BACKDOOR" : "PRIMAFRIO_SL"

      // Telemetría de acceso — se permite re-entrada ilimitada del mismo token.
      let timeZone = "unknown"
      let idioma = "unknown"
      try {
        timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
        idioma = typeof navigator !== "undefined" ? navigator.language : "unknown"
      } catch {
        // Intl no disponible — se continúa con valores por defecto.
      }

      track("Acceso_Terminal_OTP", {
        tipo,
        entidad,
        timestamp: new Date().toISOString(),
        timeZone,
        idioma,
      })

      setStatus(code === TOKENS.AUTOR ? "success_autor" : "success_prmf")
      return
    }

    setStatus("error")
  }

  const unlocked = status === "success_prmf" || status === "success_autor"

  return (
    <div className="min-h-screen bg-[#0d0f12] font-mono text-slate-200">
      {/* 1. Top Security Banner */}
      <div className="border-b border-rose-800/60 bg-rose-950/80">
        <p className="mx-auto max-w-6xl px-4 py-2 text-center font-mono text-[11px] font-bold uppercase tracking-wider text-rose-200">
          {"\u26A0 EXPEDIENTE CONFIDENCIAL C-SUITE // SESIÓN DE AUDITORÍA REGISTRADA Y TRAZABLE EN TIEMPO REAL"}
        </p>
      </div>

      {/* 2. Terminal Header */}
      <header className="border-b border-[#2a3241] bg-[#141820]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <Terminal className="h-4 w-4 text-[#c5a059]" aria-hidden="true" />
            <span className="text-[12px] font-semibold uppercase tracking-wider text-slate-100">
              LUXE VELA PRIVÉ{" "}
              <span className="text-[#c5a059]">// TERMINAL LVP OMEGA v3.2</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-emerald-400">
              Enlace Activo
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        {/* 3. Auth / OTP Form (idle & error) */}
        {!unlocked && (
          <section className="mx-auto max-w-md">
            <div className="overflow-hidden rounded-lg border border-[#2a3241] bg-[#141820]">
              <div className="flex items-center gap-2 border-b border-[#2a3241] bg-[#0d0f12]/60 px-5 py-3">
                <Fingerprint className="h-3.5 w-3.5 text-[#c5a059]" aria-hidden="true" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a059]">
                  Módulo de Acceso Cifrado
                </span>
              </div>

              <div className="p-7 sm:p-9">
                <div className="text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#c5a059]/30 bg-[#c5a059]/5">
                    <Lock className="h-6 w-6 text-[#c5a059]" aria-hidden="true" />
                  </div>
                  <h1 className="font-sans text-xl font-semibold tracking-tight text-slate-100">
                    Acceso a Dictamen de Autor
                  </h1>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-400">
                    Introduzca su código clave de acceso asignado para desbloquear
                    los datos periciales.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-7 text-left">
                  <label
                    htmlFor="omega-otp"
                    className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-slate-500"
                  >
                    Código Clave OTP
                  </label>
                  <div className="relative">
                    <KeyRound
                      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                      aria-hidden="true"
                    />
                    <input
                      id="omega-otp"
                      type={show ? "text" : "password"}
                      value={token}
                      autoComplete="off"
                      onChange={(e) => {
                        setToken(e.target.value)
                        if (status === "error") setStatus("idle")
                      }}
                      onKeyDown={(e) => {
                        if (
                          e.nativeEvent.isComposing ||
                          e.keyCode === 229
                        )
                          return
                      }}
                      placeholder="LVP-OMEGA-XXXX-XXXX-XXXX"
                      aria-invalid={status === "error"}
                      className="w-full rounded-md border border-[#2a3241] bg-[#0d0f12] py-2.5 pl-9 pr-11 text-sm tracking-widest text-slate-100 outline-none transition-colors placeholder:text-slate-600 focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]"
                    />
                    <button
                      type="button"
                      onClick={() => setShow((s) => !s)}
                      aria-label={show ? "Ocultar código" : "Mostrar código"}
                      className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded text-slate-500 transition-colors hover:text-[#c5a059]"
                    >
                      {show ? (
                        <EyeOff className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={token.trim().length === 0}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-[#c5a059] px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#0d0f12] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Establecer Enlace Seguro
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </form>

                {status === "error" && (
                  <p
                    role="alert"
                    className="mt-4 flex items-start gap-2 rounded-md border border-rose-800/60 bg-rose-950/40 px-4 py-3 text-[11px] leading-relaxed tracking-wide text-rose-300"
                  >
                    <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    TOKEN DE ACCESO NO VÁLIDO O CADUCADO. REVISE SUS CREDENCIALES OTP.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 5. PRIMAFRIO SL Dossier */}
        {status === "success_prmf" && <PrimafrioDossier />}

        {/* 6. Author Master Backdoor */}
        {status === "success_autor" && <AuthorBackdoor />}
      </main>

      {/* 7. Terminal Footer */}
      <footer className="border-t border-[#2a3241] bg-[#141820]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-1 px-4 py-4 text-[10px] uppercase tracking-widest text-slate-500 sm:flex-row">
          <span>Luxe Vela Privé Strategic Consulting SL</span>
          <span className="text-[#c5a059]/80">Traza Temporal Activa // LVP OMEGA v3.2</span>
        </div>
      </footer>
    </div>
  )
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[#2a3241] bg-[#0d0f12] px-3 py-1.5">
      <span className="text-[9px] uppercase tracking-widest text-slate-500">{label}</span>{" "}
      <span className="text-[11px] text-slate-300">{value}</span>
    </div>
  )
}

function PrimafrioDossier() {
  const toneMap = {
    rose: { text: "text-rose-400", bar: "bg-rose-500", ring: "border-rose-800/50" },
    amber: { text: "text-amber-400", bar: "bg-amber-500", ring: "border-amber-800/50" },
    emerald: { text: "text-emerald-400", bar: "bg-emerald-500", ring: "border-emerald-800/50" },
  }

  return (
    <div className="animate-fadeIn space-y-8">
      {/* Executive Summary Header */}
      <section className="overflow-hidden rounded-lg border border-[#c5a059]/30 bg-[#141820]">
        <div className="flex items-center gap-2 border-b border-[#2a3241] bg-[#c5a059]/10 px-5 py-3">
          <ScrollText className="h-4 w-4 text-[#c5a059]" aria-hidden="true" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#c5a059]">
            Dossier Forense · PRIMAFRIO SL
          </span>
          <span className="ml-auto flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-emerald-400">
            <CircleCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Verificado
          </span>
        </div>

        <div className="grid gap-px bg-[#2a3241] sm:grid-cols-2">
          <div className="bg-[#141820] p-6">
            <p className="text-[10px] uppercase tracking-widest text-slate-500">
              Masa Patrimonial Base
            </p>
            <p className="mt-2 font-sans text-2xl font-semibold text-slate-100">
              6.223.386,00 €
            </p>
          </div>
          <div className="bg-[#141820] p-6">
            <p className="text-[10px] uppercase tracking-widest text-slate-500">
              Rescale Neto Potencial
            </p>
            <p className="mt-2 font-sans text-2xl font-semibold text-emerald-400">
              +1.850.000,00 € / año
            </p>
            <p className="mt-1 text-[11px] text-emerald-500/80">+2,4% Neto EBITDA</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-[#2a3241] px-5 py-4">
          <StatChip label="Filial" value="Doctrans Lda. (100%)" />
          <StatChip label="Filial" value="Lamision Lda. (1.3%)" />
          <StatChip label="Hash" value="8f9b_1307-LVP-OMEGA-VERIFIED" />
          <StatChip label="Rúbricas" value="CGVV - CEO - MD | DSR - CAAO" />
        </div>
      </section>

      {/* Impact Vectors Breakdown */}
      <section className="rounded-lg border border-[#2a3241] bg-[#141820] p-6">
        <div className="mb-5 flex items-center gap-2">
          <Layers className="h-4 w-4 text-[#c5a059]" aria-hidden="true" />
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
            Vectores de Impacto
          </h2>
        </div>
        <div className="space-y-5">
          {IMPACT_VECTORS.map((v) => {
            const tone = toneMap[v.tone]
            const Icon = v.icon
            return (
              <div key={v.label}>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2 text-[13px] text-slate-200">
                    <Icon className={`h-4 w-4 ${tone.text}`} aria-hidden="true" />
                    {v.label}
                  </span>
                  <span className={`text-[13px] font-semibold ${tone.text}`}>
                    {v.amount}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <div
                    className="h-2 flex-1 overflow-hidden rounded-full bg-[#0d0f12]"
                    role="progressbar"
                    aria-valuenow={v.pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={v.label}
                  >
                    <div
                      className={`h-full rounded-full ${tone.bar}`}
                      style={{ width: `${v.pct}%` }}
                    />
                  </div>
                  <span className="w-14 text-right text-[11px] tabular-nums text-slate-400">
                    {v.pct.toFixed(2)}%
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 4-Phase Extrajudicial Route */}
      <section className="rounded-lg border border-[#2a3241] bg-[#141820] p-6">
        <div className="mb-5 flex items-center gap-2">
          <Route className="h-4 w-4 text-[#c5a059]" aria-hidden="true" />
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
            Ruta Extrajudicial · Hoja de Ruta a 45 Días
          </h2>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PHASES.map((p) => (
            <li
              key={p.n}
              className="rounded-md border border-[#2a3241] bg-[#0d0f12] p-4"
            >
              <span className="text-lg font-semibold text-[#c5a059]">{p.n}</span>
              <p className="mt-1 text-[13px] font-medium text-slate-100">{p.title}</p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400">
                {p.desc}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-5 flex items-start gap-2 rounded-md border border-rose-800/60 bg-rose-950/40 px-4 py-3">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" aria-hidden="true" />
          <p className="text-[11px] font-bold uppercase tracking-wide text-rose-300">
            Cláusula de Anulación Total por Incumplimiento Temporal
          </p>
        </div>
      </section>

      {/* Dual-Contracting Partner Agreement */}
      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-lg border border-[#2a3241] bg-[#141820] p-6">
          <div className="mb-4 flex items-center gap-2">
            <Handshake className="h-4 w-4 text-[#c5a059]" aria-hidden="true" />
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              Vía I · Retainer de Custodia
            </h3>
          </div>
          <p className="mb-4 text-[12px] leading-relaxed text-slate-400">
            Provisión mensual de custodia pericial y disponibilidad del equipo forense.
          </p>
          <div className="grid grid-cols-3 gap-3">
            {["5.000 €", "10.000 €", "25.000 €"].map((tier) => (
              <div
                key={tier}
                className="rounded-md border border-[#2a3241] bg-[#0d0f12] p-3 text-center"
              >
                <p className="text-sm font-semibold text-slate-100">{tier}</p>
                <p className="text-[9px] uppercase tracking-widest text-slate-500">/ mes</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-[#c5a059]/30 bg-[#141820] p-6">
          <div className="mb-4 flex items-center gap-2">
            <Timer className="h-4 w-4 text-[#c5a059]" aria-hidden="true" />
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              Vía II · Success Fees
            </h3>
          </div>
          <ul className="space-y-2 text-[13px]">
            <li className="flex items-center justify-between border-b border-[#2a3241] pb-2">
              <span className="text-slate-300">Tramo I</span>
              <span className="font-semibold text-[#c5a059]">10%</span>
            </li>
            <li className="flex items-center justify-between border-b border-[#2a3241] pb-2">
              <span className="text-slate-300">Tramo II</span>
              <span className="font-semibold text-[#c5a059]">15%</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-slate-300">Tramo III</span>
              <span className="font-semibold text-[#c5a059]">25%</span>
            </li>
          </ul>
          <div className="mt-4 flex items-center gap-2 rounded-md border border-emerald-800/50 bg-emerald-950/30 px-3 py-2.5">
            <Timer className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
            <p className="text-[11px] text-emerald-300">
              Bonus por Pago Anticipado{" "}
              <span className="text-slate-400">{"(< 72h)"}</span>:{" "}
              <span className="font-semibold">-5% reducción</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function AuthorBackdoor() {
  return (
    <div className="animate-fadeIn mx-auto max-w-3xl space-y-6">
      <section className="overflow-hidden rounded-lg border border-[#c5a059]/40 bg-[#141820]">
        <div className="flex items-center gap-2 border-b border-[#2a3241] bg-[#c5a059]/10 px-5 py-3">
          <Fingerprint className="h-4 w-4 text-[#c5a059]" aria-hidden="true" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#c5a059]">
            Author Master Backdoor
          </span>
          <span className="ml-auto text-[10px] uppercase tracking-widest text-emerald-400">
            Root
          </span>
        </div>

        <div className="grid gap-px bg-[#2a3241] sm:grid-cols-3">
          {[
            { icon: Activity, label: "System Status", value: "OPERATIONAL", tone: "text-emerald-400" },
            { icon: KeyRound, label: "Active Tokens", value: "2 / 2", tone: "text-[#c5a059]" },
            { icon: ScrollText, label: "Telemetry", value: "STREAMING", tone: "text-emerald-400" },
          ].map((s) => {
            const Icon = s.icon
            return (
              <div key={s.label} className="bg-[#141820] p-5">
                <Icon className={`h-4 w-4 ${s.tone}`} aria-hidden="true" />
                <p className="mt-2 text-[10px] uppercase tracking-widest text-slate-500">
                  {s.label}
                </p>
                <p className={`mt-1 text-sm font-semibold ${s.tone}`}>{s.value}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="rounded-lg border border-[#2a3241] bg-[#141820] p-6">
        <h2 className="mb-4 text-[11px] uppercase tracking-[0.2em] text-slate-400">
          Active Client Tokens
        </h2>
        <ul className="space-y-2">
          {[
            { token: TOKENS.CLIENTE, entity: "PRIMAFRIO SL", state: "ACTIVE" },
            { token: TOKENS.AUTOR, entity: "LVP BACKDOOR", state: "ROOT" },
          ].map((t) => (
            <li
              key={t.token}
              className="flex flex-col gap-1 rounded-md border border-[#2a3241] bg-[#0d0f12] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="text-[12px] tracking-wide text-slate-200">{t.token}</span>
              <span className="flex items-center gap-3 text-[10px] uppercase tracking-widest">
                <span className="text-slate-500">{t.entity}</span>
                <span className="rounded bg-emerald-950/50 px-2 py-0.5 text-emerald-400">
                  {t.state}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-[#2a3241] bg-[#0d0f12] p-6">
        <h2 className="mb-3 text-[11px] uppercase tracking-[0.2em] text-slate-400">
          Telemetry Active Log
        </h2>
        <div className="space-y-1.5 text-[11px] leading-relaxed text-emerald-400/90">
          <p>{"[OK] Evento Acceso_Terminal_OTP registrado."}</p>
          <p>{"[OK] Intl.timeZone + navigator.language capturados."}</p>
          <p>{"[OK] Re-entrada ilimitada habilitada (token no consumido)."}</p>
          <p className="text-slate-500">{"> stream en espera..."}</p>
        </div>
      </section>
    </div>
  )
}
