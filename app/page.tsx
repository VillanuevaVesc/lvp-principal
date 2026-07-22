"use client"

import React, { useState } from "react"

const CONFIG_TOKENS = {
  CLIENTE: "LVP-OMEGA-1307-PRMF-926B",
  AUTOR: "LVP-MASTER-BACKDOOR-AUDIT",
} as const

const SANGRIAS_MENSUALES = [
  { mes: "Ene", acumulado: 154.16 },
  { mes: "Feb", acumulado: 308.33 },
  { mes: "Mar", acumulado: 462.50 },
  { mes: "Abr", acumulado: 616.66 },
  { mes: "May", acumulado: 770.83 },
  { mes: "Jun", acumulado: 925.00 },
  { mes: "Jul", acumulado: 1079.16 },
  { mes: "Ago", acumulado: 1233.33 },
  { mes: "Sep", acumulado: 1387.50 },
  { mes: "Oct", acumulado: 1541.66 },
  { mes: "Nov", acumulado: 1695.83 },
  { mes: "Dic", acumulado: 1850.00 },
]

export default function Home() {
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
        setErrorMessage("AUTENTICACIÓN RECHAZADA. CLAVE OTP ENCRIPTADA NO CONCORDANTE CON EL EXPEDIENTE.")
      }
    }, 400)
  }

  return (
    <main className="min-h-screen bg-[#040507] text-slate-200 py-6 px-4 flex items-center justify-center font-sans">
      <div className="w-full max-w-6xl mx-auto bg-[#060709] border border-[#2a3241] rounded-lg shadow-2xl overflow-hidden">
        
        {/* CABECERA */}
        <div className="bg-[#0f131c] border-b border-[#2a3241] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-xs tracking-widest text-[#c5a059] uppercase font-mono font-bold">
              LUXE VELA PRIVÉ // TERMINAL DE AUDITORÍA DE AUTOR LVP-OMEGA v3.1
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">ENCLAVE C-SUITE ACTIVO</span>
          </div>
        </div>

        {/* LOGIN FORM */}
        {status !== "success_cliente" && status !== "success_autor" && (
          <div className="p-10">
            <div className="max-w-xl mx-auto text-center mb-8">
              <h2 className="text-xl font-semibold text-white tracking-wide uppercase font-mono">
                Acceso a Dictamen Pericial Exógeno
              </h2>
              <p className="text-xs text-slate-400 mt-2">
                Introduzca la clave OTP para decodificar la auditoría técnica de asimetrías de capital.
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
                  className="w-full bg-[#12161f] border border-[#2a3241] focus:border-[#c5a059] text-white font-mono text-sm rounded px-4 py-3 pr-10 outline-none transition-colors placeholder:text-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors text-xs font-mono"
                >
                  {showPassword ? "OCULTAR" : "VER"}
                </button>
              </div>

              {status === "error" && (
                <div className="text-rose-400 bg-rose-950/30 border border-rose-800/50 rounded p-3 text-xs font-mono">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading" || !tokenInput.trim()}
                className="w-full bg-[#c5a059] hover:bg-[#b38f48] disabled:opacity-50 text-black font-semibold text-xs tracking-wider uppercase rounded py-3 px-4 flex items-center justify-center space-x-2 transition-colors cursor-pointer font-mono"
              >
                {status === "loading" ? "DECODIFICANDO EXPEDIENTE FORENSE..." : "Establecer Enlace Seguro"}
              </button>
            </form>
          </div>
        )}

        {/* AUDITORÍA PRIMAFRIO SL */}
        {status === "success_cliente" && (
          <div className="p-8 space-y-8">
            <div className="bg-[#0f131c] border border-emerald-500/40 rounded p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                  EXPEDIENTE DE AUDITORÍA: PRIMAFRIO SL (NIF/CIF: B73047599)
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Masa Patrimonial Base: <span className="text-white">6.223.386,00 €</span> | Filiales Afectadas: <span className="text-white">Doctrans Lda. (100%) / Lamision Lda. (1,3%)</span>
                </p>
              </div>
              <div className="text-right font-mono">
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-700 px-3 py-1 rounded">
                  EXP-PRMF-20260713
                </span>
                <p className="text-[10px] text-slate-500 mt-1">HUELLA OPERATIVA NULA // ZERO INTRUSION</p>
              </div>
            </div>

            {/* METRICAS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-[#0f131c] border border-rose-900/60 p-4 rounded">
                <span className="text-[10px] text-rose-400 font-mono uppercase tracking-widest block font-bold">DRAIN MENSUAL (ROJO)</span>
                <div className="text-2xl font-bold text-rose-500 font-mono mt-1">-154.166,67 €</div>
                <span className="text-[10px] text-slate-400 mt-1 block">Pérdida viva cada 30 días</span>
              </div>

              <div className="bg-[#0f131c] border border-rose-800 p-4 rounded">
                <span className="text-[10px] text-rose-400 font-mono uppercase tracking-widest block font-bold">EROSIÓN ANUALIZADA</span>
                <div className="text-2xl font-bold text-rose-500 font-mono mt-1">-1.850.000,00 €</div>
                <span className="text-[10px] text-slate-400 mt-1 block">Erosión contable acumulada</span>
              </div>

              <div className="bg-[#0f131c] border border-amber-900/60 p-4 rounded">
                <span className="text-[10px] text-amber-400 font-mono uppercase tracking-widest block font-bold">SECUESTRO LIQUIDEZ (FLOAT)</span>
                <div className="text-2xl font-bold text-amber-400 font-mono mt-1">245.000,00 €</div>
                <span className="text-[10px] text-slate-400 mt-1 block">Inmovilizado aduanero e-CMR</span>
              </div>

              <div className="bg-[#0f131c] border border-emerald-500/70 p-4 rounded bg-emerald-950/10">
                <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-widest block font-bold">MEJORA EBITDA NETO</span>
                <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">+2,4% NETO</div>
                <span className="text-[10px] text-emerald-300 mt-1 block font-mono">Inyección directa al resultado</span>
              </div>
            </div>

            {/* GRAFICAS Y PANELES */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#0f131c] border border-[#2a3241] rounded p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-[#2a3241] pb-3">
                  <h4 className="text-xs font-bold text-rose-400 font-mono uppercase tracking-wider">
                    CURVA DE DRENAJE EN EBITDA DE PRIMAFRIO SL (ACUMULADO ANUAL)
                  </h4>
                  <span className="text-[10px] font-mono text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded">
                    -1.850.000,00 €/año
                  </span>
                </div>

                <div className="space-y-2 pt-2">
                  {SANGRIAS_MENSUALES.map((item, idx) => {
                    const porcentaje = (item.acumulado / 1850) * 100
                    return (
                      <div key={idx} className="flex items-center text-[10px] font-mono space-x-2">
                        <span className="w-8 text-slate-400">{item.mes}</span>
                        <div className="flex-1 bg-[#161a22] h-3 rounded overflow-hidden relative">
                          <div
                            className="bg-gradient-to-r from-rose-800 to-rose-600 h-full rounded"
                            style={{ width: `${porcentaje}%` }}
                          ></div>
                        </div>
                        <span className="w-24 text-right text-rose-400 font-bold">
                          -{(item.acumulado * 1000).toLocaleString("es-ES")} €
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-[#0f131c] border border-emerald-500/30 rounded p-5 space-y-4 bg-emerald-950/5">
                <div className="flex justify-between items-center border-b border-[#2a3241] pb-3">
                  <h4 className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider">
                    INYECCIÓN POSITIVA EN CUENTAS DE EXPLOTACIÓN (RESCATE NETO)
                  </h4>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 border border-emerald-700 px-2 py-0.5 rounded">
                    +1.850.000,00 € RECUPERADOS
                  </span>
                </div>

                <div className="space-y-4 pt-2 font-mono text-xs">
                  <div className="bg-[#121822] border border-emerald-500/30 p-3 rounded space-y-1">
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>Partida: Aprovisionamientos y Servicios de Flete</span>
                      <span>+1.850.000,00 €</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans">
                      Ajuste directo recortando la sobrepartida de fletes subcontratados transfronterizos.
                    </p>
                  </div>

                  <div className="bg-[#121822] border border-emerald-500/30 p-3 rounded space-y-1">
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>Margen EBITDA Consolidado</span>
                      <span>+2,4% IMPACTO DIRECTO</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans">
                      Inyección limpia e inmediata en el resultado de explotación del grupo Primafrio.
                    </p>
                  </div>

                  <div className="bg-[#121822] border border-emerald-500/30 p-3 rounded space-y-1">
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>Flujo de Caja Libre (Free Cash Flow)</span>
                      <span>+129.166,67 € / mes</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans">
                      Detención inmediata del drenaje mensual descontando la minuta de intervención LVP.
                    </p>
                  </div>

                  <div className="bg-[#121822] border border-amber-500/30 p-3 rounded space-y-1">
                    <div className="flex justify-between text-amber-400 font-bold">
                      <span>Liberación de Float Hijacking</span>
                      <span>+245.000,00 €</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans">
                      Recuperación del rendimiento en mercado monetario (*overnight*) retenido en aduanas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CHECKLIST */}
            <div className="bg-[#0f131c] border border-[#2a3241] rounded p-6 space-y-6">
              <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider border-b border-[#2a3241] pb-3">
                CHECKLIST DE ASIMETRÍAS LOCALIZADAS EN PRIMAFRIO SL Y MATRIZ DE REINGENIERÍA
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#141923] border border-rose-900/40 p-4 rounded space-y-2">
                  <div className="text-rose-400 font-mono font-bold">
                    01. Asimetría de Tarifa €/Km en Corredor Europeo
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    <strong>Punto de Fuga:</strong> Descalces analógicos entre las tarifas aplicadas por km y la fluctuación de los costes reales de la flota transfronteriza europea.
                  </p>
                  <div className="bg-[#0c0e12] p-2 rounded border border-emerald-500/30 text-emerald-400 font-mono text-[10px]">
                    <strong>Cambio de Rumbo LVP:</strong> Sincronización estocástica exógena de los vectores de flete sin intrusión en su ERP.
                  </div>
                </div>

                <div className="bg-[#141923] border border-rose-900/40 p-4 rounded space-y-2">
                  <div className="text-rose-400 font-mono font-bold">
                    02. Retraso en Transición Digital e-CMR
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    <strong>Punto de Fuga:</strong> Penalizaciones cruzadas, demoras administrativas en aduanas y secuestro temporal de liquidez (Float Hijacking) por documentación analógica.
                  </p>
                  <div className="bg-[#0c0e12] p-2 rounded border border-emerald-500/30 text-emerald-400 font-mono text-[10px]">
                    <strong>Cambio de Rumbo LVP:</strong> Protocolo de clearing automatizado y homogenización de la señal aduanera transfronteriza.
                  </div>
                </div>

                <div className="bg-[#141923] border border-rose-900/40 p-4 rounded space-y-2">
                  <div className="text-rose-400 font-mono font-bold">
                    03. Descalce Contable con Filial Doctrans Lda.
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    <strong>Punto de Fuga:</strong> Falta de cointegración perfecta en las liquidaciones internas de tracción entre la matriz española y la filial portuguesa (100%).
                  </p>
                  <div className="bg-[#0c0e12] p-2 rounded border border-emerald-500/30 text-emerald-400 font-mono text-[10px]">
                    <strong>Cambio de Rumbo LVP:</strong> Calibración matricial del espacio de estados intersocietario para frenar el goteo de caja.
                  </div>
                </div>

                <div className="bg-[#141923] border border-rose-900/40 p-4 rounded space-y-2">
                  <div className="text-rose-400 font-mono font-bold">
                    04. Volatilidad de Recargo de Combustible (Fuel)
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    <strong>Punto de Fuga:</strong> Desfase temporal en la repercusión dinámica del coste de hidrocarburos sobre el flujo diario de rutas de larga distancia.
                  </p>
                  <div className="bg-[#0c0e12] p-2 rounded border border-emerald-500/30 text-emerald-400 font-mono text-[10px]">
                    <strong>Cambio de Rumbo LVP:</strong> Inferencia de frontera estocástica mediante filtrado autorregresivo ARCH/GARCH.
                  </div>
                </div>
              </div>
            </div>

            {/* CONDICIONES */}
            <div className="bg-amber-950/10 border border-amber-500/30 rounded p-5 space-y-3 font-mono text-xs">
              <div className="text-amber-400 font-bold uppercase">
                RESERVA DE EJECUCIÓN C-SUITE Y CONDICIONES LIQUIDATIVAS (LEY 1/2019)
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed text-justify font-sans">
                De acuerdo con la Ley 1/2019 de Secretos Empresariales, el código algorítmico, las fórmulas de cointegración y el soporte de ejecución pericial para detener la sangría se activarán **únicamente tras la firma del expediente y liquidación de honorarios**.
              </p>
              <div className="bg-[#080a0d] p-3 rounded border border-amber-500/20 text-[11px] space-y-1 text-slate-400">
                <div>• <strong className="text-white">Ventana Pronto Pago (T0 + 15 días):</strong> 185.000,00 € netos (Ahorro directo de 92.500 €).</div>
                <div>• <strong className="text-white">Tarifa Nominal de Balance (Día 16 al 30):</strong> 277.500,00 € netos (15% sobre la herida).</div>
                <div>• <strong className="text-white">Suscripción Ejecutiva Permanente (Vía I):</strong> 25.000,00 € / mes (Permanencia contractual de 10 meses).</div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-[#040507] border-t border-[#1e2430] px-6 py-3 text-[10px] font-mono text-slate-500 flex justify-between items-center">
          <span>LUXE VELA PRIVÉ STRATEGIC CONSULTING SL // NIF: B88823737</span>
          <span>HASH SHA-256: 25e5abdea0c1de19ed3ddbdd53c8268d800cb6...</span>
        </div>
      </div>
    </main>
  )
}
