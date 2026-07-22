'use client'

import React, { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  LogOut,
  ShieldCheck,
  Globe,
  TrendingUp,
  Wallet,
  Layers,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const GOLD = '#c5a880'
const MATTE = '#121212'

const GRID_BACKGROUND: React.CSSProperties = {
  backgroundColor: MATTE,
  backgroundImage:
    'linear-gradient(#1c1c1c 1px, transparent 1px), linear-gradient(90deg, #1c1c1c 1px, transparent 1px)',
  backgroundSize: '40px 40px',
}

// Formatea importes en euros (formato español) para la lectura ejecutiva.
function formatEuro(value: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

// Series analíticas de la firma (datos de demostración, deterministas).
const AUM_SERIES = [
  { m: 'ENE', v: 412 },
  { m: 'FEB', v: 428 },
  { m: 'MAR', v: 447 },
  { m: 'ABR', v: 441 },
  { m: 'MAY', v: 469 },
  { m: 'JUN', v: 488 },
  { m: 'JUL', v: 502 },
  { m: 'AGO', v: 519 },
  { m: 'SEP', v: 534 },
  { m: 'OCT', v: 561 },
  { m: 'NOV', v: 588 },
  { m: 'DIC', v: 612 },
]

const ALLOCATION = [
  { name: 'Renta Fija Soberana', v: 34 },
  { name: 'Capital Privado', v: 27 },
  { name: 'Inmobiliario Prime', v: 19 },
  { name: 'Divisa y Cobertura', v: 12 },
  { name: 'Liquidez Estratégica', v: 8 },
]

const RISK_SERIES = [
  { q: 'Q1', exp: 2.1, cob: 1.6 },
  { q: 'Q2', exp: 2.4, cob: 2.0 },
  { q: 'Q3', exp: 2.0, cob: 1.7 },
  { q: 'Q4', exp: 2.6, cob: 2.3 },
]

const MANDATES = [
  { ref: 'LVP-EQ-4471', region: 'Zúrich', clase: 'Capital Privado', estado: 'Activo', var: 4.2 },
  { ref: 'LVP-RF-2210', region: 'Luxemburgo', clase: 'Renta Fija', estado: 'Activo', var: 1.1 },
  { ref: 'LVP-RE-8830', region: 'Mónaco', clase: 'Inmobiliario', estado: 'Revisión', var: -0.8 },
  { ref: 'LVP-FX-1097', region: 'Singapur', clase: 'Cobertura', estado: 'Activo', var: 2.7 },
  { ref: 'LVP-EQ-5562', region: 'Londres', clase: 'Capital Privado', estado: 'Activo', var: -1.4 },
]

function tooltipStyle() {
  return {
    backgroundColor: '#0c0c0c',
    border: `1px solid ${GOLD}55`,
    borderRadius: 4,
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#fff',
  }
}

export default function DashboardPage() {
  const router = useRouter()

  const kpis = useMemo(
    () => [
      { label: 'Activos Bajo Gestión', value: formatEuro(612_400_000), delta: 8.4, icon: Wallet, up: true },
      { label: 'Rendimiento YTD', value: '+14,7 %', delta: 2.1, icon: TrendingUp, up: true },
      { label: 'Mandatos Activos', value: '47', delta: 3.0, icon: Layers, up: true },
      { label: 'Exposición a Riesgo', value: '2,4 σ', delta: -0.6, icon: Activity, up: false },
    ],
    [],
  )

  return (
    <div className="min-h-screen w-full text-white font-sans" style={GRID_BACKGROUND}>
      {/* BARRA SUPERIOR */}
      <header className="w-full px-6 py-4 flex items-center justify-between gap-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <svg aria-hidden="true" width="26" height="26" viewBox="0 0 100 100" className="shrink-0">
            <path d="M20 20 L50 80 L80 20" fill="none" stroke={GOLD} strokeWidth="6" />
          </svg>
          <div>
            <p className="text-sm font-light tracking-[0.2em] leading-none">LUXE&nbsp;VELA&nbsp;PRIVÉ</p>
            <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-gray-500 mt-1">
              Dashboard Analítico · Enlace Seguro
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider" style={{ color: '#34d399' }}>
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Sesión cifrada
          </span>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider px-3 py-2 rounded border border-white/10 hover:border-white/30 transition-colors text-gray-300"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
            Cerrar enlace
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* ENCABEZADO */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: GOLD }}>
              Panorama de la firma
            </span>
            <h1 className="text-2xl font-light tracking-tight mt-2 text-balance">
              Consola de Inteligencia Patrimonial
            </h1>
          </div>
          <p className="text-[11px] font-mono text-gray-500 flex items-center gap-2">
            <Globe className="h-3.5 w-3.5" aria-hidden="true" />
            Consolidado · {new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* KPIs */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((k) => {
            const Icon = k.icon
            return (
              <div
                key={k.label}
                className="p-5 rounded-lg border border-white/5 bg-black/30"
                style={{ borderLeft: `2px solid ${GOLD}` }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500">{k.label}</span>
                  <Icon className="h-4 w-4" style={{ color: GOLD }} aria-hidden="true" />
                </div>
                <p className="mt-3 text-xl font-light tracking-tight">{k.value}</p>
                <p
                  className="mt-2 flex items-center gap-1 text-[11px] font-mono"
                  style={{ color: k.up ? '#34d399' : '#f87171' }}
                >
                  {k.up ? <ArrowUpRight className="h-3 w-3" aria-hidden="true" /> : <ArrowDownRight className="h-3 w-3" aria-hidden="true" />}
                  {Math.abs(k.delta)} % vs. trimestre previo
                </p>
              </div>
            )
          })}
        </section>

        {/* GRÁFICAS PRINCIPALES */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* AUM */}
          <div className="lg:col-span-2 p-5 rounded-lg border border-white/5 bg-black/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-mono uppercase tracking-wider" style={{ color: GOLD }}>
                Evolución de Activos Bajo Gestión (M€)
              </h2>
              <span className="text-[10px] font-mono text-gray-500">12 meses</span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={AUM_SERIES} margin={{ top: 5, right: 8, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="aum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={GOLD} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="m" tick={{ fill: '#888', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#888', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle()} cursor={{ stroke: GOLD, strokeOpacity: 0.3 }} />
                <Area type="monotone" dataKey="v" stroke={GOLD} strokeWidth={2} fill="url(#aum)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* ASIGNACIÓN */}
          <div className="p-5 rounded-lg border border-white/5 bg-black/30">
            <h2 className="text-xs font-mono uppercase tracking-wider mb-4" style={{ color: GOLD }}>
              Asignación de Cartera
            </h2>
            <div className="space-y-4">
              {ALLOCATION.map((a) => (
                <div key={a.name}>
                  <div className="flex justify-between text-[11px] font-mono mb-1">
                    <span className="text-gray-400">{a.name}</span>
                    <span style={{ color: GOLD }}>{a.v}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${a.v}%`, backgroundColor: GOLD }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RIESGO + TABLA */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="p-5 rounded-lg border border-white/5 bg-black/30">
            <h2 className="text-xs font-mono uppercase tracking-wider mb-4" style={{ color: GOLD }}>
              Exposición vs. Cobertura (σ)
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={RISK_SERIES} margin={{ top: 5, right: 8, left: -12, bottom: 0 }}>
                <CartesianGrid stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="q" tick={{ fill: '#888', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#888', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle()} cursor={{ fill: '#ffffff08' }} />
                <Bar dataKey="exp" fill={GOLD} radius={[2, 2, 0, 0]} />
                <Bar dataKey="cob" radius={[2, 2, 0, 0]}>
                  {RISK_SERIES.map((_, i) => (
                    <Cell key={i} fill="#3a3a3a" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="lg:col-span-2 p-5 rounded-lg border border-white/5 bg-black/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-mono uppercase tracking-wider" style={{ color: GOLD }}>
                Mandatos Activos
              </h2>
              <span className="text-[10px] font-mono text-gray-500">{MANDATES.length} referencias</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] font-mono">
                <thead>
                  <tr className="text-gray-500 uppercase tracking-wider border-b border-white/10">
                    <th className="py-2 pr-4 font-normal">Referencia</th>
                    <th className="py-2 pr-4 font-normal">Jurisdicción</th>
                    <th className="py-2 pr-4 font-normal">Clase</th>
                    <th className="py-2 pr-4 font-normal">Estado</th>
                    <th className="py-2 pr-4 font-normal text-right">Var. 30d</th>
                  </tr>
                </thead>
                <tbody>
                  {MANDATES.map((m) => (
                    <tr key={m.ref} className="border-b border-white/5">
                      <td className="py-2.5 pr-4" style={{ color: GOLD }}>{m.ref}</td>
                      <td className="py-2.5 pr-4 text-gray-300">{m.region}</td>
                      <td className="py-2.5 pr-4 text-gray-400">{m.clase}</td>
                      <td className="py-2.5 pr-4">
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px]"
                          style={
                            m.estado === 'Activo'
                              ? { backgroundColor: 'rgba(52,211,153,0.12)', color: '#34d399' }
                              : { backgroundColor: 'rgba(197,168,128,0.12)', color: GOLD }
                          }
                        >
                          {m.estado}
                        </span>
                      </td>
                      <td
                        className="py-2.5 pr-4 text-right"
                        style={{ color: m.var >= 0 ? '#34d399' : '#f87171' }}
                      >
                        {m.var >= 0 ? '+' : ''}
                        {m.var.toFixed(1)} %
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <footer className="pt-4 text-[10px] font-mono text-gray-600 border-t border-white/5">
          Luxe Vela Privé Strategic Consulting · Datos consolidados de demostración · Uso confidencial
        </footer>
      </main>
    </div>
  )
}
