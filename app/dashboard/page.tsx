'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ShieldAlert,
  LogOut,
  Fingerprint,
  Waypoints,
  Snowflake,
  Timer,
  Landmark,
  Handshake,
  Mail,
  Repeat,
  Percent,
  Zap,
} from 'lucide-react'
import { isOmegaGranted, revokeOmegaAccess } from '@/lib/omega-session'

/* ---------- PALETA PERICIAL FORENSE C-SUITE ---------- */
const OBSIDIAN = '#0A0A0B'
const GOLD = '#c5a880'
const EMERALD = '#00FF66'
const RED = '#FF2E2E'
const BLUE = '#00E5FF'
const EMAIL = 'prive@velaluxeprive.com'

const GRID_BACKGROUND: React.CSSProperties = {
  backgroundColor: OBSIDIAN,
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
  backgroundSize: '44px 44px',
}

/* ---------- DISTRIBUCIÓN PORCENTUAL DE SANGRÍA (DONUT) ---------- */
const BLEED = [
  {
    key: 'multimodal',
    pct: 60.54,
    label: 'Subcontratación Multimodal',
    amount: '−1.120.000,00 € / año',
    tone: RED,
  },
  {
    key: 'frio',
    pct: 26.22,
    label: 'Cadena de Frío y Mermas',
    amount: '−485.000,00 € / año',
    tone: BLUE,
  },
  {
    key: 'float',
    pct: 13.24,
    label: 'Float Hijacking / Liquidez e-CMR',
    amount: '+245.000,00 € en caja',
    tone: EMERALD,
  },
] as const

const VECTORS = [
  {
    code: 'VECTOR 01',
    icon: Waypoints,
    title: 'Subcontratación Multimodal',
    impact: '−1.120.000,00 € / año',
    tone: RED,
    body: 'Divergencia estocástica no compensada en coeficientes de indexación de tracción intermedia frente a la curva de paridad de mercado. Descalce del 18,00 % sobre la masa patrimonial base.',
  },
  {
    code: 'VECTOR 02',
    icon: Snowflake,
    title: 'Cadena de Frío y Mermas',
    impact: '−485.000,00 € / año',
    tone: BLUE,
    body: 'Asimetría en la conciliación transaccional de micro-penalizaciones térmicas. Absorción pasiva del 7,79 % de la masa patrimonial base, compensable vía reconciliación técnica directa.',
  },
  {
    code: 'VECTOR 03',
    icon: Timer,
    title: 'Float Hijacking y e-CMR',
    impact: '+245.000,00 € liquidez',
    tone: EMERALD,
    body: 'Retención ineficiente de circulante por decalaje analógico en nodos de liquidación aduanera (14-22 días). Aceleración de clearing digital para liberar el 3,93 % de la masa patrimonial base.',
  },
] as const

const ROADMAP = [
  { phase: 'FASE I', days: 'Días 1-7', title: 'Invasión Cero' },
  { phase: 'FASE II', days: 'Días 8-21', title: 'Arbitraje y Float' },
  { phase: 'FASE III', days: 'Días 22-35', title: 'Reconciliación de Mermas' },
  { phase: 'FASE IV', days: 'Días 36-45', title: 'Consignación EBITDA' },
] as const

const RETAINER = [
  { band: 'Facturación < 5 M€', fee: '5.000 € / mes' },
  { band: '5 M€ – 25 M€', fee: '10.000 € / mes' },
  { band: 'Facturación > 25 M€', fee: '25.000 € / mes' },
] as const

const SUCCESS_SCALE = [
  { tramo: 'Tramo I', rate: '10 %', note: 'Masa crítica inicial' },
  { tramo: 'Tramo II', rate: '15 %', note: 'Masa crítica intermedia' },
  { tramo: 'Tramo III', rate: '25 %', note: 'Masa crítica máxima' },
] as const

/* ---------- GUARDA EFIMERA · ONE-TIME VIEW PROTOCOL ---------- */
export default function DashboardPage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    // El acceso solo es válido si la Solapa 4 concedió el permiso en esta sesión
    // volátil. Una recarga reinicia la memoria del módulo → expediente bloqueado.
    if (!isOmegaGranted()) {
      router.replace('/')
      return
    }
    setAuthorized(true)

    // Auto-bloqueo al salir: recarga o cierre de pestaña revoca el token.
    const revoke = () => revokeOmegaAccess()
    window.addEventListener('beforeunload', revoke)
    window.addEventListener('pagehide', revoke)
    return () => {
      window.removeEventListener('beforeunload', revoke)
      window.removeEventListener('pagehide', revoke)
    }
  }, [router])

  const handleClose = () => {
    revokeOmegaAccess()
    router.replace('/')
  }

  if (!authorized) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center" style={GRID_BACKGROUND}>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: RED }}>
          ▲ Expediente bloqueado · Redirigiendo…
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full text-white font-sans" style={GRID_BACKGROUND}>
      {/* BANNER SUPERIOR · SESIÓN ÚNICA */}
      <div
        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 text-center"
        style={{
          background: 'linear-gradient(90deg, rgba(255,46,46,0.14), rgba(197,168,128,0.14))',
          borderBottom: `1px solid ${RED}55`,
        }}
      >
        <ShieldAlert className="h-3.5 w-3.5 shrink-0 animate-pulse" style={{ color: RED }} aria-hidden="true" />
        <p className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em]">
          <span style={{ color: RED }}>SESIÓN PERICIAL ÚNICA Y CONFIDENCIAL</span>
          <span className="text-gray-500"> // </span>
          <span style={{ color: GOLD }}>ESTE EXPEDIENTE SE AUTO-BLOQUEARÁ AL SALIR</span>
        </p>
      </div>

      {/* BARRA DE CONTROL */}
      <header className="w-full px-5 sm:px-8 py-4 flex items-center justify-between gap-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <svg aria-hidden="true" width="24" height="24" viewBox="0 0 100 100" className="shrink-0">
            <path d="M20 22 L50 80 L80 22" fill="none" stroke={GOLD} strokeWidth="6" />
          </svg>
          <div>
            <p className="text-[13px] font-light tracking-[0.2em] leading-none">LUXE&nbsp;VELA&nbsp;PRIVÉ</p>
            <p className="text-[9px] font-mono uppercase tracking-[0.28em] text-gray-500 mt-1">
              One-Time View Protocol · Enclave Cifrado
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider px-3 py-2 rounded border border-white/10 hover:border-white/30 transition-colors text-gray-300"
        >
          <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
          Cerrar y bloquear
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-10 space-y-14">
        {/* ================= BLOQUE 1 · CABECERA PERICIAL ================= */}
        <section className="animate-fadeIn">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: GOLD }}>
            Dictamen Pericial · Alta Dirección
          </span>
          <h1 className="mt-4 text-2xl sm:text-4xl font-light tracking-tight leading-[1.15] text-balance">
            LUXE VELA PRIVÉ <span style={{ color: GOLD }}>//</span> Dictamen Pericial y Marco de Rescate
            <span className="text-gray-500 text-lg sm:text-2xl"> (v.3.2)</span>
          </h1>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-px border bg-white/[0.03]" style={{ borderColor: `${GOLD}22` }}>
            <HeaderCell label="Partner Auditado" value="PRIMAFRIO SL" note="CIF: B73047599" />
            <HeaderCell label="Masa Patrimonial Base" value="6.223.386,00 €" note="Base de cómputo pericial" valueTone={GOLD} />
            <HeaderCell label="Filiales Consolidadas" value="Doctrans Lda. (100 %)" note="Lamision Lda. (1,3 %)" />
            <HeaderCell label="Marco Legal" value="Ley 1/2019 de Secretos Empresariales" note="Invasión Cero en ERPs" />
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t pt-5" style={{ borderColor: `${GOLD}22` }}>
            <div className="flex items-start gap-2.5">
              <Fingerprint className="h-4 w-4 mt-0.5 shrink-0" style={{ color: EMERALD }} aria-hidden="true" />
              <div className="font-mono text-[10px] leading-relaxed">
                <span className="text-gray-500 uppercase tracking-[0.18em] block">Trazabilidad · Hash SHA-256</span>
                <span style={{ color: EMERALD }}>8f9b…1307-LVP-OMEGA-VERIFIED</span>
              </div>
            </div>
            <div className="font-mono text-[10px] leading-relaxed sm:text-right">
              <span className="text-gray-500 uppercase tracking-[0.18em] block">Rúbricas Oficiales</span>
              <span style={{ color: GOLD }}>CGVV · CEO — MD</span>
              <span className="text-gray-600"> | </span>
              <span style={{ color: GOLD }}>DSR · CAAO</span>
            </div>
          </div>
        </section>

        {/* ================= BLOQUE 2 · DASHBOARD DE IMPACTO + DONUT ================= */}
        <section className="animate-fadeIn">
          <SectionTitle index="01" title="Dashboard de Impacto y Distribución de Sangría" caption="Cuadro Core · Anillo Porcentual" />

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-px border bg-white/[0.03]" style={{ borderColor: `${GOLD}22` }}>
            {/* Cifra core */}
            <div className="bg-[#0d0d0e] p-6 sm:p-8 flex flex-col justify-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">
                Rescate Neto Potencial
              </span>
              <p className="text-3xl sm:text-4xl font-light tracking-tight" style={{ color: EMERALD }}>
                +1.850.000,00 €
                <span className="text-base text-gray-500"> / año</span>
              </p>
              <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(0,255,102,0.08)', border: `1px solid ${EMERALD}44` }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: EMERALD }} />
                <span className="font-mono text-[11px] font-bold tracking-wider" style={{ color: EMERALD }}>
                  +2,4 % NETO EN EBITDA
                </span>
              </div>
              <p className="mt-2 text-[12px] text-gray-400 font-light leading-relaxed">
                Reversión íntegra de la sangría estructural confirmada de{' '}
                <span style={{ color: RED }}>−1.850.000,00 € / año</span> sobre una masa patrimonial base de{' '}
                <span style={{ color: GOLD }}>6.223.386,00 €</span>.
              </p>
            </div>

            {/* Donut + leyenda */}
            <div className="bg-[#0d0d0e] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8">
              <DonutChart data={BLEED} />
              <ul className="flex-1 w-full space-y-4">
                {BLEED.map((b) => (
                  <li key={b.key} className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: b.tone }} aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-[13px] font-medium text-white leading-tight">{b.label}</span>
                        <span className="font-mono text-[13px] font-bold shrink-0" style={{ color: b.tone }}>
                          {b.pct.toLocaleString('es-ES', { minimumFractionDigits: 2 })} %
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-gray-400">{b.amount}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ================= BLOQUE 3 · VECTORES DE IMPACTO ================= */}
        <section className="animate-fadeIn">
          <SectionTitle index="02" title="Análisis Forense de Vectores de Impacto" caption="Técnico · Opacidad Pericial" />
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-px border bg-white/[0.03]" style={{ borderColor: `${GOLD}22` }}>
            {VECTORS.map((v) => {
              const Icon = v.icon
              return (
                <div key={v.code} className="bg-[#0d0d0e] p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.22em]" style={{ color: GOLD }}>
                      {v.code}
                    </span>
                    <Icon className="h-4 w-4" style={{ color: v.tone }} aria-hidden="true" />
                  </div>
                  <h3 className="text-[15px] font-medium text-white leading-tight">{v.title}</h3>
                  <span className="font-mono text-[13px] font-bold" style={{ color: v.tone }}>
                    {v.impact}
                  </span>
                  <p className="text-[12px] text-gray-400 leading-relaxed font-light">{v.body}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* ================= BLOQUE 4 · RUTA + CLÁUSULA DE ANULACIÓN ================= */}
        <section className="animate-fadeIn">
          <SectionTitle index="03" title="Matriz de Ruta Extrajudicial y Cláusula de Caducidad" />

          {/* Hoja de ruta 45 días */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Landmark className="h-3.5 w-3.5" style={{ color: GOLD }} aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                Hoja de Ruta Extrajudicial · 45 Días
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px border bg-white/[0.03]" style={{ borderColor: `${GOLD}22` }}>
              {ROADMAP.map((r) => (
                <div key={r.phase} className="bg-[#0d0d0e] p-5 flex flex-col gap-1.5">
                  <span className="font-mono text-[10px] tracking-[0.22em]" style={{ color: EMERALD }}>
                    {r.phase}
                  </span>
                  <span className="font-mono text-[10px] text-gray-500">{r.days}</span>
                  <span className="text-[13px] font-light text-white mt-1">{r.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cláusula de anulación total */}
          <div
            className="mt-6 p-5 space-y-2"
            style={{ borderLeft: `2px solid ${RED}`, backgroundColor: 'rgba(255,46,46,0.05)' }}
          >
            <p className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: RED }}>
              <ShieldAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Cláusula de Anulación Total por Incumplimiento Temporal
            </p>
            <p className="text-[12px] text-gray-300 leading-relaxed font-light">
              La falta de ejecución de las directrices periciales en tiempo y forma por el cliente{' '}
              <strong className="font-semibold" style={{ color: RED }}>ANULA TOTALMENTE</strong> el Dictamen Técnico
              Pericial emitido y deja sin efecto la proyección de rescate{' '}
              <strong className="font-semibold" style={{ color: GOLD }}>(+2,4 % EBITDA)</strong>, exonerando al 100 % a{' '}
              <strong className="font-semibold text-white">Luxe Vela Privé Strategic Consulting SL</strong> de cualquier
              penalidad, responsabilidad o garantía. Enfoque estricto de arbitraje técnico exógeno y conciliación
              extrajudicial: <span style={{ color: EMERALD }}>cero vía judicial</span>.
            </p>
          </div>
        </section>

        {/* ================= BLOQUE 5 · MODELO DE ALIANZA · DOS VÍAS ================= */}
        <section className="animate-fadeIn">
          <SectionTitle index="04" title="Modelo de Alianza y Dos Vías de Contratación" caption="Partner Agreement" />

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* VÍA I · RETAINER */}
            <div className="bg-[#0d0d0e] border border-white/5 p-6 flex flex-col gap-5" style={{ borderTop: `2px solid ${GOLD}` }}>
              <div className="flex items-center gap-2.5">
                <Repeat className="h-4 w-4 shrink-0" style={{ color: GOLD }} aria-hidden="true" />
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] block" style={{ color: GOLD }}>
                    Vía I · Suscripción Ejecutiva Permanente
                  </span>
                  <span className="font-mono text-[10px] text-gray-500">Retainer de Custodia</span>
                </div>
              </div>
              <ul className="divide-y divide-white/5 border-y border-white/5">
                {RETAINER.map((r) => (
                  <li key={r.band} className="flex items-center justify-between gap-3 py-3">
                    <span className="text-[12px] text-gray-300 font-light">{r.band}</span>
                    <span className="font-mono text-[13px] font-bold" style={{ color: GOLD }}>
                      {r.fee}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="font-mono text-[11px] text-gray-400 leading-relaxed">
                Permanencia indexada de <span style={{ color: GOLD }}>10 meses</span> mientras exista contingencia
                pericial activa.
              </p>
            </div>

            {/* VÍA II · A ÉXITO */}
            <div className="bg-[#0d0d0e] border border-white/5 p-6 flex flex-col gap-5" style={{ borderTop: `2px solid ${EMERALD}` }}>
              <div className="flex items-center gap-2.5">
                <Percent className="h-4 w-4 shrink-0" style={{ color: EMERALD }} aria-hidden="true" />
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] block" style={{ color: EMERALD }}>
                    Vía II · Liquidación por Intercepción Puntual
                  </span>
                  <span className="font-mono text-[10px] text-gray-500">Honorarios a Éxito</span>
                </div>
              </div>
              <ul className="divide-y divide-white/5 border-y border-white/5">
                {SUCCESS_SCALE.map((s) => (
                  <li key={s.tramo} className="flex items-center justify-between gap-3 py-3">
                    <div className="flex flex-col">
                      <span className="text-[12px] text-gray-300 font-light">{s.tramo}</span>
                      <span className="font-mono text-[10px] text-gray-500">{s.note}</span>
                    </div>
                    <span className="font-mono text-[15px] font-bold" style={{ color: EMERALD }}>
                      {s.rate}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="flex items-start gap-2 font-mono text-[11px] leading-relaxed" style={{ color: BLUE }}>
                <Zap className="h-3.5 w-3.5 mt-px shrink-0" aria-hidden="true" />
                <span>
                  Bonificación Pronto Pago <span className="font-bold">&lt; 72 h</span>: reducción de{' '}
                  <span className="font-bold">5 puntos porcentuales absolutos</span> sobre la tasa nominal.
                </span>
              </p>
            </div>
          </div>

          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent('ACTIVACIÓN PROTOCOLO DE INTERVENCIÓN · PRIMAFRIO SL')}`}
            className="mt-6 w-full flex items-center justify-center gap-3 px-6 py-4 font-sans font-bold text-[13px] uppercase tracking-[0.12em] rounded transition-opacity hover:opacity-90 text-center"
            style={{ backgroundColor: GOLD, color: '#000' }}
          >
            <Handshake className="h-4 w-4 shrink-0" aria-hidden="true" />
            Activar Protocolo de Intervención y Firmar Alianza de Rescate
          </a>

          <a
            href={`mailto:${EMAIL}`}
            className="mt-4 flex items-center justify-center gap-2 font-mono text-[12px] tracking-[0.06em] transition-opacity hover:opacity-80"
            style={{ color: GOLD }}
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            {EMAIL}
          </a>
        </section>

        <footer className="pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-[9px] tracking-[0.14em]">
          <span style={{ color: EMERALD }}>IAE 1-8431 · CNAE 7020-7022</span>
          <span className="sm:text-center text-gray-500">CGVV · CEO — MD | DSR · CAAO</span>
          <span className="sm:text-right text-gray-600">© Luxe Vela Privé Strategic Consulting SL</span>
        </footer>
      </main>
    </div>
  )
}

/* ---------- SUBCOMPONENTES ---------- */

function DonutChart({ data }: { data: ReadonlyArray<{ key: string; pct: number; tone: string }> }) {
  const size = 168
  const stroke = 26
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  let cumulative = 0

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Distribución porcentual de la sangría estructural">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={stroke}
        />
        {data.map((d) => {
          const seg = (d.pct / 100) * circumference
          const dashArray = `${seg} ${circumference - seg}`
          const dashOffset = -(cumulative / 100) * circumference
          cumulative += d.pct
          return (
            <circle
              key={d.key}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={d.tone}
              strokeWidth={stroke}
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              strokeLinecap="butt"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          )
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gray-500">Masa</span>
        <span className="text-[15px] font-light text-white leading-tight">100 %</span>
        <span className="font-mono text-[9px] text-gray-500">sangría</span>
      </div>
    </div>
  )
}

function HeaderCell({
  label,
  value,
  note,
  valueTone = '#ffffff',
}: {
  label: string
  value: string
  note?: string
  valueTone?: string
}) {
  return (
    <div className="bg-[#0d0d0e] px-5 py-4 flex flex-col gap-1">
      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-gray-500">{label}</span>
      <span className="text-[15px] font-light" style={{ color: valueTone }}>
        {value}
      </span>
      {note && <span className="font-mono text-[10px] text-gray-500">{note}</span>}
    </div>
  )
}

function SectionTitle({ index, title, caption }: { index: string; title: string; caption?: string }) {
  return (
    <div className="flex items-baseline gap-4 border-b pb-3" style={{ borderColor: `${GOLD}22` }}>
      <span className="font-mono text-[11px] font-bold" style={{ color: GOLD }}>
        {index}
      </span>
      <div className="flex flex-col">
        <h2 className="text-lg sm:text-xl font-light tracking-tight text-white text-balance">{title}</h2>
        {caption && (
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-gray-500 mt-1">{caption}</span>
        )}
      </div>
    </div>
  )
}
