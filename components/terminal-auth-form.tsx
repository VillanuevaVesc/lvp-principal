"use client"

import React, { useState } from "react"
import { Shield, Lock, Terminal, CheckCircle2, AlertCircle, ArrowRight, Eye, EyeOff, TrendingUp, AlertTriangle, FileText } from "lucide-react"

const CONFIG_TOKENS = {
  CLIENTE: "LVP-OMEGA-1307-PRMF-926B",
  AUTOR: "LVP-MASTER-BACKDOOR-AUDIT",
} as const

export default function TerminalAuthForm() {
  const [tokenInput, setTokenInput] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success_cliente" | "success_autor" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")
    setStatus("loading")

    const cleanToken = tokenInput.trim()

    setTimeout(() => {
      if (cleanToken === CONFIG_TOKENS.CLIENTE) {
        setStatus("success_cliente")
      } else if (cleanToken === CONFIG_TOKENS.AUTOR) {
        setStatus("success_autor")
      } else {
        setStatus("error")
        setErrorMessage("TOKEN DE ACCESO NO VÁLIDO O CADUCADO. REVISE SUS CREDENCIALES OTP.")
      }
    }, 500)
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-[#0a0c0e] text-slate-200 border border-[#2a3241] rounded-lg shadow-2xl overflow-hidden font-sans my-8">
      {/* Cabecera LVP */}
      <div className="bg-[#12161f] border-b border-[#2a3241] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Terminal className="w-5 h-5 text-[#c5a059]" />
          <span className="text-xs tracking-widest text-[#c5a059] uppercase font-mono font-bold">
            LUXE VELA PRIVÉ // TERMINAL DE AUDITANZA EXÓGENA OMEGA v3.1
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">ENCLAVE C-SUITE ACTIVO</span>
        </div>
      </div>

      {/* LOGIN / OTP */}
      {status !== "success_cliente" && status !== "success_autor" && (
        <div className="p-10">
          <div className="max-w-xl mx-auto text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#161a22] border border-[#c5a059]/30 mb-4">
              <Lock className="w-6 h-6 text-[#c5a059]" />
            </div>
            <h2 className="text-xl font-semibold text-white tracking-wide uppercase">
              Acceso a Dictamen de Autor
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Introduzca su clave de acceso de un solo uso (OTP) para acceder al expediente pericial.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="LVP-OMEGA-..."
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
                <span>DECODIFICANDO EXPEDIENTE...</span>
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

      {/* DESBLOQUEADO: VISTA REAL PRIMAFRIO SL */}
      {status === "success_cliente" && (
        <div className="p-8 space-y-6">
          {/* Status Header */}
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  SUJETO DE ANÁLSIIS: PRIMAFRIO SL (NIF: B73047599)
                </h3>
                <p className="text-xs text-emerald-400 font-mono mt-0.5">
                  EXPEDIENTE: EXP-PRMF-20260713 // DICTAMEN PERICIAL DESBLOQUEADO
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-emerald-900/50 text-emerald-300 border border-emerald-700/50 px-3 py-1 rounded uppercase">
              MODO_LECTURA_C_SUITE
            </span>
          </div>

          {/* Tarjetas Métricas Principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#12161f] border border-[#2a3241] p-5 rounded">
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">EROSIÓN NETA DEL MARGEN</span>
              <div className="text-2xl font-bold text-rose-500 font-mono mt-1">-1.850.000,00 €</div>
              <p className="text-[11px] text-slate-500 mt-1">Cómputo anualizado por fricción transaccional</p>
            </div>

            <div className="bg-[#12161f] border border-[#2a3241] p-5 rounded">
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">SECUESTRO DE LIQUIDEZ (FLOAT)</span>
              <div className="text-2xl font-bold text-amber-500 font-mono mt-1">245.000,00 €</div>
              <p className="text-[11px] text-slate-500 mt-1">Inmovilizado en colas de compensación e-CMR</p>
            </div>

            <div className="bg-[#12161f] border border-[#2a3241] p-5 rounded">
              <span className="text-[10px] text-[#c5a059] font-mono uppercase tracking-widest">IMPACTO EN EBITDA CONSOLIDADO</span>
              <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">+0,34% NETO</div>
              <p className="text-[11px] text-slate-500 mt-1">Recuperación directa en el resultado de explotación</p>
            </div>
          </div>

          {/* Detalle Técnico del Vector Afectado */}
          <div className="bg-[#12161f] border border-[#2a3241] rounded p-6 space-y-4">
            <div className="flex items-center space-x-2 border-b border-[#2a3241] pb-3">
              <AlertTriangle className="w-5 h-5 text-[#c5a059]" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                VECTOR IV: FRICCIÓN OPERATIVA Y TRANSICIÓN e-CMR
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed text-justify">
              Fuga financiera localizada en la cuenta de pérdidas y ganancias, provocada por descalces y asimetrías de liquidación en las tarifas por kilómetro de las flotas transfronterizas europeas (incluyendo la alineación con la filial <span className="text-white font-mono">Doctrans Transportes Rodoviários Lda.</span>), ante la falta de una integración masiva y homogénea del e-CMR obligatorio en aduanas.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed text-justify">
              Esto genera incidencias de valoración contable, penalizaciones cruzadas y retrasos administrativos en la cadena de frío que erosionan silenciosamente su margen operativo.
            </p>
          </div>

          {/* Cuadro de Capas Exógenas Analizadas */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-[#c5a059] uppercase tracking-wider flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>DESGLOSE DE CAPAS DE AUDITORÍA MATRICIAL</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#12161f] border border-[#242c3d] p-4 rounded space-y-1">
                <div className="text-[#c5a059] font-mono font-bold">CAPA I: Volatilidad Hidrocarburífera</div>
                <div className="text-slate-300">Ineficiencias temporales en la aplicación dinámica de recargos por combustible (fuel) en rutas europeas sobre la masa de capital base (6.223.386,00 €).</div>
              </div>

              <div className="bg-[#12161f] border border-[#242c3d] p-4 rounded space-y-1">
                <div className="text-[#c5a059] font-mono font-bold">CAPA II: Cointegración Filiales</div>
                <div className="text-slate-300">Descalces en liquidaciones internas de flete por km entre la matriz nacional y la red transfronteriza (Doctrans Lda. 100%).</div>
              </div>

              <div className="bg-[#12161f] border border-[#242c3d] p-4 rounded space-y-1">
                <div className="text-[#c5a059] font-mono font-bold">CAPA III: Subvenciones y Fondos EU</div>
                <div className="text-slate-300">Coste de oportunidad en la ejecución y amortización de 454.575,00 € asignados a proyectos Zero Emission & Logistic Intelligence.</div>
              </div>

              <div className="bg-[#12161f] border border-[#242c3d] p-4 rounded space-y-1">
                <div className="text-[#c5a059] font-mono font-bold">CAPA V: Simulación Fiscal EBITDA</div>
                <div className="text-slate-300">Optimización sobre la partida de Consumos y Servicios Subcontratados de Transporte, deteniendo un drenaje de 154.166,67 €/mes.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VISTA AUTOR */}
      {status === "success_autor" && (
        <div className="p-8 space-y-4">
          <div className="bg-amber-950/20 border border-amber-500/30 rounded p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">MODO ESPEJO / CONTROL INTERNO LVP</h3>
                <p className="text-xs text-amber-400 font-mono mt-0.5">Acceso Master autorizado para revisión técnica.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pie de Terminal */}
      <div className="bg-[#08090b] border-t border-[#1e2430] px-6 py-3 text-[10px] font-mono text-slate-500 flex justify-between items-center">
        <span>LUXE VELA PRIVÉ STRATEGIC CONSULTING SL // NIF: B88823737</span>
        <span>HUELLA OPERATIVA NULA // HASH SHA-256 REGISTRADO</span>
      </div>
    </div>
  )
}
