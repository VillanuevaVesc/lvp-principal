"use client"

import React, { useState } from "react"

export default function Page() {
  const [tokenInput, setTokenInput] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authRole, setAuthRole] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const cleanToken = tokenInput.trim()
    if (cleanToken === "LVP-OMEGA-1307-PRMF-926B") {
      setIsAuthenticated(true)
      setAuthRole("CLIENTE - EJECUTIVO C-SUITE")
      setErrorMessage("")
    } else if (cleanToken === "LVP-MASTER-BACKDOOR-AUDIT") {
      setIsAuthenticated(true)
      setAuthRole("AUDITOR SENIOR LVP")
      setErrorMessage("")
    } else {
      setErrorMessage("ACCESO DENEGADO - TOKEN INVALIDO O EXPIRADO")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setTokenInput("")
    setAuthRole("")
    setErrorMessage("")
  }

  const chartData = [
    { month: "ENE", val: "-154.16k €", width: "8.3%" },
    { month: "FEB", val: "-308.33k €", width: "16.6%" },
    { month: "MAR", val: "-462.50k €", width: "25.0%" },
    { month: "ABR", val: "-616.66k €", width: "33.3%" },
    { month: "MAY", val: "-770.83k €", width: "41.6%" },
    { month: "JUN", val: "-925.00k €", width: "50.0%" },
    { month: "JUL", val: "-1079.16k €", width: "58.3%" },
    { month: "AGO", val: "-1233.33k €", width: "66.6%" },
    { month: "SEP", val: "-1387.50k €", width: "75.0%" },
    { month: "OCT", val: "-1541.66k €", width: "83.3%" },
    { month: "NOV", val: "-1695.83k €", width: "91.6%" },
    { month: "DIC", val: "-1850.00k €", width: "100.0%" },
  ]

  return (
    <main className="min-h-screen bg-[#040507] text-[#e2e8f0] font-mono p-4 md:p-8">
      {!isAuthenticated ? (
        <div className="max-w-md mx-auto mt-16 bg-[#090c12] border border-[#2d3748] border-l-4 border-l-[#c5a059] rounded-lg p-6 shadow-2xl">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#121824] border border-[#2d3748] mb-3">
              <svg className="w-6 h-6 text-[#c5a059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-xl font-extrabold tracking-wider text-white uppercase">LUXE VELA PRIVÉ</h1>
            <p className="text-xs text-[#c5a059] mt-1 tracking-widest uppercase">Terminal Pericial de Auditoría Forense</p>
            <p className="text-[10px] text-gray-500 mt-2">SUJETO AUDITADO: PRIMAFRIO SL (CIF B73047599)</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase text-gray-400 mb-1">Token de Acceso OTP</label>
              <input
                type="password"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Introduzca token pericial..."
                className="w-full bg-[#040507] border border-[#2d3748] focus:border-[#c5a059] text-white text-sm rounded px-3 py-2.5 outline-none tracking-widest"
              />
            </div>

            {errorMessage && (
              <div className="bg-red-950/60 border border-red-800 text-red-400 text-xs p-2.5 rounded text-center">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#c5a059] to-[#997836] hover:from-[#d4af66] hover:to-[#a8853e] text-black font-extrabold text-xs uppercase tracking-wider py-3 px-4 rounded transition-all"
            >
              Autenticar y Desbloquear
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#1e2636] text-[10px] text-gray-500 text-center">
            Acceso restringido bajo Secreto Empresarial (Ley 1/2019).
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="bg-[#0f141e] border border-[#2d3748] border-l-4 border-l-[#c5a059] p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <h1 className="text-lg font-black tracking-wider text-white uppercase">
                  LUXE VELA PRIVÉ // EXPEDIENTE PRIMAFRIO SL
                </h1>
              </div>
              <p className="text-xs text-[#c5a059] mt-0.5">
                CIF: B73047599 | Masa Patrimonial Base: 6.223.386,00 €
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Filiales Consolidadas: Doctrans Lda. (100%), Lamision Lda. (1,3%)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] bg-[#1a2333] border border-[#2d3748] text-gray-300 px-3 py-1 rounded">
                ROL: <strong className="text-white">{authRole}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-950 hover:bg-red-900 border border-red-800 text-red-300 text-xs px-3 py-1 rounded transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#18080a] border border-red-900 border-l-4 border-l-red-500 p-4 rounded-lg">
              <span className="text-[10px] font-black text-red-400 tracking-widest uppercase block mb-1">
                CÓDIGO ROJO — HERIDA CONTABLE VIVA
              </span>
              <div className="text-2xl font-black text-red-500">-1.850.000,00 € / AÑO</div>
              <p className="text-xs text-red-200/80 mt-1">
                Drenaje mensual confirmado de <strong>-154.166,67 €/mes</strong>. Pérdida de caja provocada por
                ineficiencias analógicas y descalces de ruta.
              </p>
            </div>

            <div className="bg-[#061510] border border-emerald-900 border-l-4 border-l-emerald-500 p-4 rounded-lg">
              <span className="text-[10px] font-black text-emerald-400 tracking-widest uppercase block mb-1">
                CÓDIGO VERDE — NEUTRALIZACIÓN LVP
              </span>
              <div className="text-2xl font-black text-emerald-400">+1.850.000,00 € / RESCATE</div>
              <p className="text-xs text-emerald-200/80 mt-1">
                Impacto neto inmediato de <strong>+2,4% NETO en EBITDA</strong>. Sellado total de la sangría mediante
                reestructuración algorítmica de fletes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-[#090c12] border border-red-900/60 border-t-2 border-t-red-500 p-3 rounded">
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block">Drain Mensual</span>
              <div className="text-base font-black text-red-400 my-1">-154.166,67 €</div>
              <p className="text-[10px] text-gray-400">Fuga constante en ruta.</p>
            </div>

            <div className="bg-[#090c12] border border-red-900/60 border-t-2 border-t-red-500 p-3 rounded">
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block">Erosión Anualizada</span>
              <div className="text-base font-black text-red-400 my-1">-1.850.000,00 €</div>
              <p className="text-[10px] text-gray-400">Pérdida EBITDA directa.</p>
            </div>

            <div className="bg-[#090c12] border border-amber-900/60 border-t-2 border-t-amber-500 p-3 rounded">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Float Hijacking</span>
              <div className="text-base font-black text-amber-400 my-1">245.000,00 €</div>
              <p className="text-[10px] text-gray-400">Liquidez retenida e-CMR.</p>
            </div>

            <div className="bg-[#090c12] border border-emerald-900/60 border-t-2 border-t-emerald-500 p-3 rounded">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                Mejora EBITDA Neto
              </span>
              <div className="text-base font-black text-emerald-400 my-1">+2,4% NETO</div>
              <p className="text-[10px] text-gray-400">Inyección limpia al resultado.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#080b10] border border-[#1a2231] p-4 rounded-lg">
              <h3 className="text-xs font-extrabold text-red-400 uppercase tracking-wider mb-3 pb-2 border-b border-[#1a2231]">
                Curva de Drenaje Acumulado Anual (Sin Intervención)
              </h3>
              <div className="space-y-1.5">
                {chartData.map((item, index) => (
                  <div key={index} className="flex items-center text-[10px]">
                    <span className="w-8 text-gray-500 font-bold">{item.month}</span>
                    <div className="flex-1 mx-2 bg-[#121824] h-2 rounded overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-red-900 to-red-500 h-full rounded"
                        style={{ width: item.width }}
                      ></div>
                    </div>
                    <span className="w-20 text-right text-red-400 font-bold">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#080b10] border border-[#1a2231] p-4 rounded-lg flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider mb-3 pb-2 border-b border-[#1a2231]">
                  Matriz de Restitución y Inyección de Rescate LVP
                </h3>
                <div className="space-y-2.5">
                  <div className="bg-[#0d131f] border border-[#1e293b] border-l-2 border-l-emerald-500 p-2.5 rounded">
                    <div className="flex justify-between text-xs font-bold text-emerald-400">
                      <span>Aprovisionamientos y Servicios de Flete</span>
                      <span>+1.850.000,00 €</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">
                      Corrección de sobreprecio en subcontratación mediante arbitraje de tarifas en tiempo real.
                    </p>
                  </div>

                  <div className="bg-[#0d131f] border border-[#1e293b] border-l-2 border-l-emerald-500 p-2.5 rounded">
                    <div className="flex justify-between text-xs font-bold text-emerald-400">
                      <span>Inyección EBITDA Consolidado</span>
                      <span>+2,4% IMPACTO</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">
                      Retorno directo y limpio sobre la cuenta de pérdidas y ganancias del grupo.
                    </p>
                  </div>

                  <div className="bg-[#0d131f] border border-[#1e293b] border-l-2 border-l-amber-500 p-2.5 rounded">
                    <div className="flex justify-between text-xs font-bold text-amber-400">
                      <span>Desbloqueo Float Aduanero</span>
                      <span>+245.000,00 €</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">
                      Liberación de caja inmovilizada mediante clearing digital e-CMR transfronterizo.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-2.5 bg-[#090d16] border border-blue-900/50 rounded text-[11px] text-blue-300">
                <strong>Vinculación Permanente:</strong> La cuota mensual C-Suite ($25.000/mes) se autofinancia con el
                primer 15% del ahorro retenido en el balance.
              </div>
            </div>
          </div>

          <div className="bg-[#080b10] border border-[#1a2231] p-4 rounded-lg">
            <h3 className="text-xs font-extrabold text-[#c5a059] uppercase tracking-wider mb-3 pb-2 border-b border-[#1a2231]">
              Checklist de Auditoría: 4 Asimetrías Detectadas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-[#0d131f] border border-red-900/40 border-l-2 border-l-red-500 p-2.5 rounded">
                <span className="text-xs font-bold text-red-400 uppercase block">
                  1. Tarifa €/Km (Estructura Distorsionada)
                </span>
                <p className="text-[11px] text-gray-300 mt-1">
                  Descalce entre la tarifa cobrada y los costes reales de tracción en el Corredor Mediterráneo.
                </p>
              </div>

              <div className="bg-[#0d131f] border border-red-900/40 border-l-2 border-l-red-500 p-2.5 rounded">
                <span className="text-xs font-bold text-red-400 uppercase block">
                  2. e-CMR (Ausencia Trazabilidad Digital)
                </span>
                <p className="text-[11px] text-gray-300 mt-1">
                  Retención de documentación física en aduanas provocando secuestro de liquidez (245k€).
                </p>
              </div>

              <div className="bg-[#0d131f] border border-red-900/40 border-l-2 border-l-red-500 p-2.5 rounded">
                <span className="text-xs font-bold text-red-400 uppercase block">
                  3. Filial Doctrans Lda. (Fuga Margen Operativo)
                </span>
                <p className="text-[11px] text-gray-300 mt-1">
                  Falta de cointegración con la filial portuguesa (100%), absorbiendo la matriz pérdidas no ajustadas.
                </p>
              </div>

              <div className="bg-[#0d131f] border border-red-900/40 border-l-2 border-l-red-500 p-2.5 rounded">
                <span className="text-xs font-bold text-red-400 uppercase block">
                  4. Recargo Fuel (Descalce Cláusula Diésel)
                </span>
                <p className="text-[11px] text-gray-300 mt-1">
                  Subidas de carburante impactan 3,2x más rápido de lo que se repercute en la tarifa final al cliente.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#06080d] border border-amber-900/50 p-3 rounded text-[10px] text-gray-400 space-y-1">
            <div className="flex justify-between flex-wrap font-bold text-amber-500 uppercase">
              <span>Blindaje Legal — Ley 1/2019 de Secretos Empresariales (Arts. 278/279 C.P.)</span>
              <span>Jurisdicción: Tribunales de Madrid Capital</span>
            </div>
            <p>
              Propiedad Intelectual exclusiva de LUXE VELA PRIVÉ STRATEGIC CONSULTING SL (CIF B88823737). Honorarios
              liquidables según esquema de pronto pago o suscripción permanente C-Suite.
            </p>
            <p className="text-right text-gray-600 font-mono pt-1">
              REGISTRO HASH SHA-256: 8f9a2b4c1e0d3f5a7b9c2d4e6f8a0b1c3d5e7f9a2b4c1e0d3f5a7b9c2d4e6f8a
            </p>
          </div>
        </div>
      )}
    </main>
  )
}
