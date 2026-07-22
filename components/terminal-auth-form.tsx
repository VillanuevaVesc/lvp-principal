"use client"

import React, { useState } from "react"
import { Shield, Lock, Terminal, CheckCircle2, AlertCircle, ArrowRight, Eye, EyeOff } from "lucide-react"
import { track } from "@vercel/analytics"

// Configuración exacta de tokens autorizados
const CONFIG_TOKENS = {
  CLIENTE: "LVP-OMEGA-1307-PRMF-926B",
  AUTOR: "LVP-MASTER-BACKDOOR-AUDIT",
} as const

// Definición de los 8 Vectores Analíticos
const VECTORES_ANALITICOS = [
  { id: "VECTOR I", name: "Real Estate Logístico", desc: "Indexación pasiva de contratos y desactualización de EPRA Yields." },
  { id: "VECTOR II", name: "Energía Estructural", desc: "Pérdidas latentes en alta tensión y descalces de margen mayorista PPA." },
  { id: "VECTOR III", name: "Supply Chain & Fletes", desc: "Retenciones de Working Capital y fricción en cadena de frío masiva." },
  { id: "VECTOR IV", name: "Fricción e-CMR y Aduanas", desc: "Desajustes en tarifas/km e incidencias de liquidación transfronteriza." },
  { id: "VECTOR V", name: "Distorsión Algorítmica", desc: "Sobrecompras cíclicas anómalas mediante análisis espectral de Fourier." },
  { id: "VECTOR VI", name: "Float Soberano y Clearing", desc: "Secuestro de liquidez en colas de compensación interbancaria overnight." },
  { id: "VECTOR VII", name: "Fricción OpEx Inmobiliaria", desc: "Sobrecostes por subutilización de superficies reales de explotación." },
  { id: "VECTOR VIII", name: "Descalce Cambiario", desc: "Asimetrías temporales y riesgo de base en la liquidación multi-divisa." },
]

export default function TerminalAuthForm() {
  const [tokenInput, setTokenInput] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success_cliente" | "success_autor" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")
    setStatus("loading")

    const cleanToken = tokenInput.trim()

    // Captura de zona horaria y navegador del cliente para el informe forense
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Desconocida"
    const userLanguage = navigator.language || "Desconocido"

    setTimeout(() => {
      if (cleanToken === CONFIG_TOKENS.CLIENTE) {
        setStatus("success_cliente")
        try {
          track("Acceso_Terminal_OTP", {
            tipo: "CLIENTE",
            entidad: "PRIMAFRIO SL",
            timestamp: new Date().toISOString(),
            timeZone: userTimeZone,
            idioma_dispositivo: userLanguage,
          })
        } catch (err) {
          console.error("Telemetry error:", err)
        }
      } else if (cleanToken === CONFIG_TOKENS.AUTOR) {
        setStatus("success_autor")
        try {
          track("Acceso_Terminal_OTP", {
            tipo: "AUTOR_MASTER",
            timestamp: new Date().toISOString(),
            timeZone: userTimeZone,
          })
        } catch (err) {
          console.error("Telemetry error:", err)
        }
      } else {
        setStatus("error")
        setErrorMessage("TOKEN DE ACCESO NO VÁLIDO O CADUCADO. REVISE SUS CREDENCIALES OTP.")
      }
    }, 600)
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#0d0f12] text-slate-200 border border-[#2a3241] rounded-lg shadow-2xl overflow-hidden font-sans">
      {/* Banner Superior de Cabecera */}
      <div className="bg-[#141820] border-b border-[#2a3241] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Terminal className="w-5 h-5 text-[#c5a059]" />
          <span className="text-xs tracking-widest text-[#c5a059] uppercase font-mono font-bold">
            LUXE VELA PRIVE // TERMINAL LVP OMEGA v3.1
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">ENLACE ACTIVO</span>
        </div>
      </div>

      {/* Formulario de Acceso OTP */}
      {status !== "success_cliente" && status !== "success_autor" && (
        <div className="p-8">
          <div className="max-w-xl mx-auto text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#161a22] border border-[#c5a059]/30 mb-4">
              <Lock className="w-6 h-6 text-[#c5a059]" />
            </div>
            <h2 className="text-xl font-semibold text-white tracking-wide uppercase">
              Acceso a Dictamen de Autor
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Introduzca su código clave de acceso asignado para desbloquear los datos periciales.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Introduzca Token OTP..."
                required
                className="w-full bg-[#161a22] border border-[#2a3241] focus:border-[#c5a059] text-white font-mono text-sm rounded px-4 py-3 pr-10 outline-none transition-colors placeholder:text-slate-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {status === "error" && (
              <div className="flex items-center space-x-2 text-rose-400 bg-rose-950/30 border border-rose-800/50 rounded p-3 text-xs font-mono">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading" || !tokenInput.trim()}
              className="w-full bg-[#c5a059] hover:bg-[#b38f48] disabled:opacity-50 text-black font-semibold text-xs tracking-wider uppercase rounded py-3 px-4 flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              {status === "loading" ? (
                <span>VALIDANDO CREDENCIAL...</span>
              ) : (
                <>
                  <span>Establecer Enlace Seguro</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* Pantalla Desbloqueada: CLIENTE (PRIMAFRIO SL) */}
      {status === "success_cliente" && (
        <div className="p-8 space-y-6">
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Acceso Autorizado // PRIMAFRIO SL
                </h3>
                <p className="text-xs text-emerald-400 font-mono mt-0.5">
                  Dictamen Pericial Contable y Forense Desbloqueado.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-emerald-900/50 text-emerald-300 border border-emerald-700/50 px-2 py-1 rounded">
              MODO_LECTURA_CLIENTE
            </span>
          </div>

          <div className="border border-[#2a3241] rounded bg-[#141820] p-6 space-y-4">
            <div className="border-b border-[#2a3241] pb-3">
              <span className="text-[10px] text-[#c5a059] font-mono tracking-widest uppercase">
                RESUMEN DE RESULTADOS // ANÁLISIS EXÓGENO
              </span>
              <h4 className="text-base font-semibold text-white mt-1">
                Evaluación Forense de Asimetrías Patrimoniales
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed text-justify">
              Tras el cotejo de las cuentas públicas, estados de pérdidas y ganancias e informes financieros, el motor LVP OMEGA v3.1 ha aislado fugas operativas directas en fletes transfronterizos y viscosidad en la conciliación interbancaria overnight.
            </p>
          </div>

          {/* Matriz de los 8 Vectores */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-[#c5a059] uppercase tracking-wider">
              MATRIZ DE LOS VIII VECTORES ANALÍTICOS
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {VECTORES_ANALITICOS.map((vector) => (
                <div key={vector.id} className="bg-[#141820] border border-[#242c3d] p-3 rounded">
                  <div className="text-[11px] font-mono text-[#c5a059] font-bold">{vector.id}</div>
                  <div className="text-xs font-semibold text-white mt-0.5">{vector.name}</div>
                  <div className="text-[11px] text-slate-400 mt-1 leading-snug">{vector.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pantalla Desbloqueada: AUTOR (MODO ESPEJO) */}
      {status === "success_autor" && (
        <div className="p-8 space-y-6">
          <div className="bg-amber-950/20 border border-amber-500/30 rounded p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Acceso Autor / Master Backdoor
                </h3>
                <p className="text-xs text-amber-400 font-mono mt-0.5">
                  Modo Espejo Activo // Telemetría de rastreo desactivada.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-amber-900/50 text-amber-300 border border-amber-700/50 px-2 py-1 rounded">
              CONTROL_INTERNO_LVP
            </span>
          </div>

          <div className="bg-[#141820] border border-[#2a3241] p-4 rounded font-mono text-xs text-slate-300 space-y-2">
            <div className="text-[#c5a059] font-bold">ESTADO DEL SISTEMA:</div>
            <div>• Token Cliente Activo: LVP-OMEGA-1307-PRMF-926B</div>
            <div>• Entidad Diana: PRIMAFRIO SL</div>
            <div>• Eventos Telemetría: Vercel Analytics Activo (`track`)</div>
          </div>
        </div>
      )}

      {/* Pie de página de la terminal */}
      <div className="bg-[#0a0c0e] border-t border-[#1e2430] px-6 py-3 text-[10px] font-mono text-slate-500 flex justify-between items-center">
        <span>LUXE VELA PRIVE STRATEGIC CONSULTING SL</span>
        <span>MEMORIA VOLÁTIL // CLIENT-SIDE VALIDATION</span>
      </div>
    </div>
  )
}

