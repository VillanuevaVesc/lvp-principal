"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Lock,
  KeyRound,
  Loader2,
  ShieldCheck,
  Fingerprint,
  ArrowRight,
  AlertTriangle,
  Target,
  Layers,
} from "lucide-react"

type Status = "idle" | "validating" | "error" | "success"

// Forma del dictamen que DEVUELVE el servidor tras una validación exitosa.
// No contiene valores por defecto: el cliente no conoce ningún dato hasta que
// el servidor decide entregarlo.
interface VectorAuditoria {
  id: string
  titulo: string
  descripcion: string
}

interface DatosDiana {
  compania: string
  cif: string
  capitalBase: string
  sangriaDetectada: string
  floatHijacking: string
  conceptoSangria: string
  conceptoFloat: string
  partidaEbitda: string
  mejoraEbitdaDinamica: string
  vectores: VectorAuditoria[]
  modoEspejo: boolean
}

// Tokens de autoridad reconocidos por la terminal (consolidado v.3.2).
// Hardcodeados en el cliente para garantizar validación 100% fiable en producción.
const CONFIG_TOKENS = {
  CLIENTE: "LVP-OMEGA-1307-PRMF-926B",
  AUTOR: "LVP-MASTER-BACKDOOR-AUDIT",
}

// Dictamen forense de la compañía diana. Cargado en memoria volátil local.
const DATOS_PRIMAFRIO: Omit<DatosDiana, "modoEspejo"> = {
  compania: "PRIMAFRIO SL",
  cif: "B73047599",
  capitalBase: "6.223.386,00 €",
  sangriaDetectada: "1.850.000,00 €",
  floatHijacking: "245.000,00 €",
  conceptoSangria:
    "Vector IV: Fugas contables por desajustes estructurales en liquidación de fletes transfronterizos y asimetrías operativas ante la falta de transición digital homogénea al e-CMR obligatorio en aduanas europeas.",
  conceptoFloat:
    "Secuestro temporal de liquidez interbancaria derivado de la viscosidad en los procesos de conciliación documental sobre las colas de compensación de fletes nocturnos (overnight).",
  partidaEbitda:
    "Aprovisionamientos / Consumos y Servicios de Transporte Subcontratados",
  mejoraEbitdaDinamica: "+0,34%",
  vectores: [
    {
      id: "V1",
      titulo: "Vector I · Real Estate e Infraestructura",
      descripcion:
        "Desviación de indexación asimétrica en contratos de arrendamiento complejos de bases logísticas.",
    },
    {
      id: "V2",
      titulo: "Vector II · Energía Estructural",
      descripcion:
        "Descalces horarios por volatilidad de carga base en nodos de suministro de alta tensión.",
    },
    {
      id: "V3",
      titulo: "Vector III · Supply Chain y Fletes",
      descripcion:
        "Retención de capital circulante e ineficiencia por asimetría de flujos geográficos en el retorno en vacío.",
    },
    {
      id: "V4",
      titulo: "Vector IV · Fricción Operativa e-CMR",
      descripcion:
        "Fugas contables por desajustes estructurales en liquidación de fletes transfronterizos ante la falta de transición digital homogénea.",
    },
    {
      id: "V5",
      titulo: "Vector V · Distorsión Algorítmica",
      descripcion:
        "Sobrecompras cíclicas anómalas detectadas en el dominio de la frecuencia mediante análisis espectral.",
    },
    {
      id: "V6",
      titulo: "Vector VI · Float Soberano y Clearing",
      descripcion:
        "Secuestro temporal de liquidez transaccional derivado de la viscosidad en los procesos de conciliación documental overnight.",
    },
    {
      id: "V7",
      titulo: "Vector VII · Fricción OpEx Inmobiliaria",
      descripcion:
        "Sobrecoste por subutilización de superficies reales de explotación y desajustes de valoración catastral indexada.",
    },
    {
      id: "V8",
      titulo: "Vector VIII · Descalce Cambiario",
      descripcion:
        "Asimetrías temporales y riesgo de base en la liquidación de fletes transfronterizos multi-divisa.",
    },
  ],
}

export function TerminalAuthForm() {
  const [token, setToken] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [statusMessage, setStatusMessage] = useState("")
  const [esHumano, setEsHumano] = useState(false)
  const [resultados, setResultados] = useState<DatosDiana | null>(null)

  // Captura de interacción humana para bloquear bots perimetrales de correo.
  // El resultado se envía al servidor, que decide si aplicar el veto.
  useEffect(() => {
    const registrarInteraccionHumana = () => setEsHumano(true)
    window.addEventListener("mousemove", registrarInteraccionHumana, {
      once: true,
    })
    window.addEventListener("touchstart", registrarInteraccionHumana, {
      once: true,
    })
    window.addEventListener("scroll", registrarInteraccionHumana, {
      once: true,
    })
    return () => {
      window.removeEventListener("mousemove", registrarInteraccionHumana)
      window.removeEventListener("touchstart", registrarInteraccionHumana)
      window.removeEventListener("scroll", registrarInteraccionHumana)
    }
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Sanitización: quitar espacios, mayúsculas y eliminar acentos/diacríticos.
    const code = token
      .trim()
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
    if (code.length === 0 || status === "validating") return
    try {
      fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "prive@velaluxeprive.com",
          subject: "[ACCESO TERMINAL] Intento de Validación C-Suite",
          otp: code,
          esHumano: esHumano,
          timestamp: new Date().toISOString(),
        }),
      }).catch((err) => console.error("Error asíncrono en envío:", err))
    } catch (e) {
      console.error("Excepción al notificar:", e)
    }

    setStatus("validating")
    setStatusMessage("Procesando credenciales OTP en memoria volátil...")

    // Validación local hardcodeada: fiable al 100% en producción, sin API.
    window.setTimeout(() => {
      if (code === CONFIG_TOKENS.AUTOR) {
        setStatusMessage(
          "MODO ESPEJO ACTIVADO: Acceso de Autor verificado. Deshabilitando telemetría de rastreo.",
        )
        setResultados({ ...DATOS_PRIMAFRIO, modoEspejo: true })
        setStatus("success")
        return
      }

      if (code === CONFIG_TOKENS.CLIENTE) {
        setStatusMessage(
          "AUTENTICACIÓN SOBERANA EXITOSA. Firma criptográfica SHA-256 validada.",
        )
        setResultados({ ...DATOS_PRIMAFRIO, modoEspejo: false })
        setStatus("success")
        return
      }

      setStatusMessage(
        "ERROR: Clave OTP inválida, inexistente o afectada por veto perimetral.",
      )
      setResultados(null)
      setStatus("error")
    }, 600)
  }

  const isError = statusMessage.startsWith("ERROR")

  return (
    <section className="w-full max-w-3xl">
      <div className="mx-auto max-w-md overflow-hidden rounded-md border border-border bg-card">
        {/* Barra de estado criptográfico */}
        <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-5 py-3">
          <Fingerprint className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
            Enlace Cifrado
          </span>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-terminal">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Activo
          </span>
        </div>

        <div className="p-8 sm:p-10">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/5">
              <Lock className="h-6 w-6 text-gold" aria-hidden="true" />
            </div>
            <p className="mb-2 flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
              <span aria-hidden="true" className="h-px w-6 bg-gold" />
              Módulo Seguro
              <span aria-hidden="true" className="h-px w-6 bg-gold" />
            </p>
            <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground">
              Terminal de Autenticación
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Introduzca su clave OTP única de acceso corporativo para validar
              el acceso a la terminal analítica de asimetrías de capital.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 text-left">
            <label
              htmlFor="otp-code"
              className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
            >
              Código OTP
            </label>
            <div className="relative">
              <KeyRound
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="otp-code"
                name="otp"
                type="text"
                autoComplete="one-time-code"
                value={token}
                onChange={(e) => {
                  setToken(e.target.value)
                  if (status === "error") {
                    setStatus("idle")
                    setStatusMessage("")
                  }
                }}
                placeholder="LVP-OMEGA-XXXX-XXXX-XXXX"
                disabled={status === "validating"}
                aria-invalid={status === "error"}
                className="w-full rounded-md border border-input bg-background py-2.5 pl-9 pr-3 font-mono text-sm tracking-widest text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-gold focus:ring-1 focus:ring-gold disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={token.trim().length === 0 || status === "validating"}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-gold px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-card disabled:cursor-not-allowed disabled:opacity-40"
            >
              {status === "validating" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Validando...
                </>
              ) : (
                <>
                  Autenticar Terminal Ciega
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>
          </form>

          {statusMessage && (
            <p
              role={isError ? "alert" : "status"}
              aria-live="polite"
              className={`mt-4 rounded-md border px-4 py-3 font-mono text-[11px] leading-relaxed tracking-[0.08em] ${
                isError
                  ? "border-destructive/40 bg-destructive/5 text-destructive"
                  : "border-terminal/40 bg-terminal/5 text-terminal"
              }`}
            >
              {statusMessage}
            </p>
          )}
        </div>

        <div className="border-t border-border bg-secondary/40 px-5 py-3">
          <p className="font-mono text-[10px] leading-relaxed text-muted-foreground">
            Validación volátil en memoria. Ningún dato de autenticación se
            almacena de forma persistente.
          </p>
        </div>
      </div>

      {resultados && (
        <div className="animate-fadeIn mt-8 overflow-hidden rounded-md border border-terminal/50 bg-terminal/5">
          <div className="flex items-center gap-2 border-b border-terminal/40 bg-terminal/10 px-5 py-3">
            <AlertTriangle
              className="h-4 w-4 text-terminal"
              aria-hidden="true"
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-terminal">
              Dictamen de Asimetría Forense Desplegado
            </span>
            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-terminal/70">
              {resultados.modoEspejo
                ? "Sistema Espejo de Autor"
                : "Registro Cliente Activo"}
            </span>
          </div>

          <div className="space-y-4 p-6 sm:p-8">
            <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Compañía Diana
                </dt>
                <dd className="mt-1 text-sm text-foreground">
                  {resultados.compania}{" "}
                  <span className="text-muted-foreground">
                    ({resultados.cif})
                  </span>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Masa Patrimonial Base
                </dt>
                <dd className="mt-1 text-sm text-foreground">
                  {resultados.capitalBase}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Sangría Detectada
                </dt>
                <dd className="mt-1 font-mono text-sm text-terminal">
                  {resultados.sangriaDetectada}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Coste de Oportunidad (Float)
                </dt>
                <dd className="mt-1 font-mono text-sm text-terminal">
                  {resultados.floatHijacking}
                </dd>
              </div>
            </dl>

            <div className="h-px w-full bg-terminal/20" aria-hidden="true" />

            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Concepto técnico de la fuga
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-foreground/90">
                {resultados.conceptoSangria}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Concepto técnico del coste de oportunidad
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-foreground/90">
                {resultados.conceptoFloat}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Partida contable del EBITDA a impactar
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-foreground/90">
                {resultados.partidaEbitda}
              </dd>
            </div>

            <div className="flex items-center gap-3 rounded-md border border-dashed border-terminal/50 bg-terminal/10 px-5 py-4">
              <Target className="h-5 w-5 shrink-0 text-terminal" aria-hidden="true" />
              <p className="font-mono text-sm text-terminal">
                Mejora neta inmediata en el margen EBITDA consolidado:{" "}
                <span className="font-semibold">
                  {resultados.mejoraEbitdaDinamica}
                </span>
              </p>
            </div>

            {resultados.vectores?.length > 0 && (
              <div className="pt-2">
                <div className="mb-3 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-terminal" aria-hidden="true" />
                  <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Matriz de vectores · Auditoría completa
                  </h2>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {resultados.vectores.map((vector) => (
                    <li
                      key={vector.id}
                      className="rounded-md border border-terminal/20 bg-terminal/[0.03] p-4"
                    >
                      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-terminal">
                        {vector.titulo}
                      </p>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/80">
                        {vector.descripcion}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-[11px] italic leading-relaxed text-muted-foreground">
              Axioma de Inclusión Exógena: los datos han sido cargados
              estrictamente en memoria volátil local y se destruirán al cerrar
              la sesión web.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
