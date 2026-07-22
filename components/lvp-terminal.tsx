"use client"

import type React from "react"
import { useState } from "react"
import {
  Lock,
  Loader2,
  ShieldAlert,
  ShieldCheck,
  Globe2,
  Fingerprint,
  KeyRound,
  ArrowRight,
} from "lucide-react"

const HASH = "25e5abdea0c1de19ed3ddbdd53c8268d800cb63767538f08594826c0e3b73b90"

type Jurisdiction = "espana" | "alemania" | "suiza"

type Phase = "gateway" | "workspace" | "loading" | "results"

const LOADING_STEPS = [
  "Procesando Módulo Alpha...",
  "Ejecutando Escudo Beta...",
  "Calibrando Vector Gamma...",
]

const COMPLIANCE: Record<
  Jurisdiction,
  { tone: "red" | "blue" | "gold"; title: string; message: string }
> = {
  espana: {
    tone: "red",
    title: "Alerta Compliance",
    message: "Facturación Nacional ordinaria sujeta al 21% de IVA General.",
  },
  alemania: {
    tone: "blue",
    title: "Gobernanza ROI/VIES Detectada",
    message:
      "Operación intracomunitaria exenta de IVA por Inversión del Sujeto Pasivo (Reverse Charge - 0% IVA).",
  },
  suiza: {
    tone: "gold",
    title: "Operación Internacional Especial",
    message:
      "Facturación fuera del territorio de la Unión Europea. No sujeta a IVA por reglas de localización (0% IVA).",
  },
}

const toneStyles: Record<
  "red" | "blue" | "gold",
  { container: string; icon: string }
> = {
  red: {
    container: "border-red-500/40 bg-red-500/10 text-red-200",
    icon: "text-red-400",
  },
  blue: {
    container: "border-sky-500/40 bg-sky-500/10 text-sky-200",
    icon: "text-sky-400",
  },
  gold: {
    container: "border-gold/40 bg-gold/10 text-gold",
    icon: "text-gold",
  },
}

export function LvpTerminal() {
  const [phase, setPhase] = useState<Phase>("gateway")
  const [otp, setOtp] = useState("")
  const [capital, setCapital] = useState("")
  const [costes, setCostes] = useState("")
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>("espana")
  const [loadingLabel, setLoadingLabel] = useState(LOADING_STEPS[0])

  function handleAuth(e: React.FormEvent) {
    e.preventDefault()
    if (otp.trim().length === 0) return
    setPhase("workspace")
  }

  function handleScreening() {
    setPhase("loading")
    setLoadingLabel(LOADING_STEPS[0])
    const t1 = setTimeout(() => setLoadingLabel(LOADING_STEPS[1]), 1000)
    const t2 = setTimeout(() => setLoadingLabel(LOADING_STEPS[2]), 2000)
    const t3 = setTimeout(() => setPhase("results"), 3000)
    // cleanup not strictly needed for one-shot, timers self-clear
    void [t1, t2, t3]
  }

  const result = COMPLIANCE[jurisdiction]

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            Módulo Operativo
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Terminal Ciega de Autenticación de Asimetrías
          </h2>
        </div>

        <div className="overflow-hidden rounded-md border border-border bg-card">
          {/* Cryptographic Status Bar */}
          <div className="flex flex-col gap-1 border-b border-border bg-secondary/60 px-5 py-3 sm:flex-row sm:items-center sm:gap-3">
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
              <Fingerprint className="h-3.5 w-3.5" aria-hidden="true" />
              Depósito Criptográfico de Obra
            </span>
            <span className="font-mono text-[11px] text-muted-foreground sm:ml-auto">
              <span className="text-gold/80">SHA-256:</span>{" "}
              <span className="break-all">{HASH}</span>
            </span>
          </div>

          <div className="p-6 sm:p-10">
            {/* Access Gateway */}
            {phase === "gateway" && (
              <div className="animate-in fade-in duration-500">
                <div className="mx-auto max-w-md text-center">
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/5">
                    <Lock className="h-6 w-6 text-gold" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground">
                    Acceso Restringido
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Introduzca su clave OTP para inicializar la terminal
                    analítica.
                  </p>

                  <form onSubmit={handleAuth} className="mt-8 text-left">
                    <label
                      htmlFor="otp-key"
                      className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      OTP Key
                    </label>
                    <div className="relative">
                      <KeyRound
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <input
                        id="otp-key"
                        type="password"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="••••••••••••"
                        autoComplete="off"
                        className="w-full rounded-md border border-input bg-background py-2.5 pl-9 pr-3 font-mono text-sm tracking-widest text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-gold focus:ring-1 focus:ring-gold"
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-gold px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-card disabled:cursor-not-allowed disabled:opacity-40"
                      disabled={otp.trim().length === 0}
                    >
                      Autenticar Terminal
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Workspace + Loading */}
            {(phase === "workspace" || phase === "loading") && (
              <div className="animate-in fade-in duration-500">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div>
                    <label
                      htmlFor="capital"
                      className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
                    >
                      Masa Crítica de Capital Social (€)
                    </label>
                    <input
                      id="capital"
                      type="number"
                      value={capital}
                      onChange={(e) => setCapital(e.target.value)}
                      placeholder="0"
                      disabled={phase === "loading"}
                      className="w-full rounded-md border border-input bg-background px-3 py-2.5 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-gold focus:ring-1 focus:ring-gold disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="costes"
                      className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
                    >
                      Volumen Anualizado de Costes Externos - Bezogene Leistungen
                      (€)
                    </label>
                    <input
                      id="costes"
                      type="number"
                      value={costes}
                      onChange={(e) => setCostes(e.target.value)}
                      placeholder="0"
                      disabled={phase === "loading"}
                      className="w-full rounded-md border border-input bg-background px-3 py-2.5 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-gold focus:ring-1 focus:ring-gold disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="jurisdiccion"
                      className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
                    >
                      Jurisdicción Fiscal
                    </label>
                    <select
                      id="jurisdiccion"
                      value={jurisdiction}
                      onChange={(e) =>
                        setJurisdiction(e.target.value as Jurisdiction)
                      }
                      disabled={phase === "loading"}
                      className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold disabled:opacity-50"
                    >
                      <option value="espana">España</option>
                      <option value="alemania">Alemania / Luxemburgo</option>
                      <option value="suiza">Suiza / Terceros Países</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleScreening}
                  disabled={phase === "loading"}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-md bg-gold px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-card disabled:cursor-wait disabled:opacity-80 sm:w-auto"
                >
                  {phase === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      {loadingLabel}
                    </>
                  ) : (
                    "Ejecutar Cribado Volátil"
                  )}
                </button>
              </div>
            )}

            {/* Results */}
            {phase === "results" && (
              <div className="animate-in fade-in duration-700">
                <div
                  className={`flex items-start gap-4 rounded-md border p-5 ${toneStyles[result.tone].container}`}
                  role="alert"
                >
                  <span className={`mt-0.5 shrink-0 ${toneStyles[result.tone].icon}`}>
                    {result.tone === "red" ? (
                      <ShieldAlert className="h-5 w-5" aria-hidden="true" />
                    ) : result.tone === "blue" ? (
                      <Globe2 className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide">
                      {result.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed">
                      {result.message}
                    </p>
                  </div>
                </div>

                <dl className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3">
                  <div className="bg-card p-5">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      Capital Social
                    </dt>
                    <dd className="mt-2 font-mono text-lg text-foreground">
                      € {capital ? Number(capital).toLocaleString("es-ES") : "0"}
                    </dd>
                  </div>
                  <div className="bg-card p-5">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      Costes Externos
                    </dt>
                    <dd className="mt-2 font-mono text-lg text-foreground">
                      € {costes ? Number(costes).toLocaleString("es-ES") : "0"}
                    </dd>
                  </div>
                  <div className="bg-card p-5">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      Jurisdicción
                    </dt>
                    <dd className="mt-2 text-sm text-foreground">
                      {jurisdiction === "espana"
                        ? "España"
                        : jurisdiction === "alemania"
                          ? "Alemania / Luxemburgo"
                          : "Suiza / Terceros Países"}
                    </dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={() => setPhase("workspace")}
                  className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-gold transition-opacity hover:opacity-70"
                >
                  ← Recalibrar Parámetros
                </button>
              </div>
            )}
          </div>

          {/* Privacy Subtext */}
          <div className="border-t border-border bg-secondary/40 px-5 py-3">
            <p className="font-mono text-[10px] leading-relaxed text-muted-foreground">
              Procesamiento volátil en memoria RAM. Datos destruídos
              automáticamente al cerrar sesión bajo Ley 1/2019 de Secretos
              Empresariales.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
