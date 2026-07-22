'use client'

import { useState } from 'react'
import { GoldButton } from './gold-button'
import { useI18n } from '@/lib/i18n/context'

type Phase = 'form' | 'scanning' | 'success'

// Lead destination (corporate inbox) and the form-processing endpoint.
// Configure a free form service (Formspree or similar) whose endpoint forwards
// submissions to this address. Set NEXT_PUBLIC_FORM_ENDPOINT in the project's
// environment variables to your real endpoint, e.g. https://formspree.io/f/xxxxxxx
const LEAD_RECIPIENT = 'prive@velaluxeprive.com'
const FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? 'https://formspree.io/f/your-form-id'

export function IncidentReportButton({ label }: { label: string }) {
  const { t } = useI18n()
  const m = t.incidentModal
  const [open, setOpen] = useState(false)
  const [phase, setPhase] = useState<Phase>('form')
  const [progress, setProgress] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const [form, setForm] = useState({
    mass: '',
    area: '',
    contact: '',
  })

  function reset() {
    setPhase('form')
    setProgress(0)
    setStepIndex(0)
    setForm({ mass: '', area: '', contact: '' })
  }

  function close() {
    setOpen(false)
    // delay reset until the dialog has visually closed
    setTimeout(reset, 250)
  }

  async function sendLead() {
    // Fire the POST to the form-processing service so the incident data lands
    // directly in the corporate inbox. Runs alongside the scan animation and
    // never blocks the UX — failures are logged but do not interrupt flow.
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: 'Canal de Incidentes Críticos · Auditoría Exprés · Nuevo aviso',
          recipient: LEAD_RECIPIENT,
          masa_critica_estimada: form.mass,
          area_corporativa_afectada: form.area,
          via_contacto_cifrada: form.contact,
          enviado_en: new Date().toISOString(),
        }),
      })
      if (!res.ok) {
        console.log('[v0] Incident POST returned non-OK status:', res.status)
      }
    } catch (err) {
      console.log('[v0] Incident POST failed:', err)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Send the structured incident report to the form-processing service.
    void sendLead()

    setPhase('scanning')
    setProgress(0)
    setStepIndex(0)

    const totalSteps = m.scanSteps.length

    // Reveal each async process line in sequence across the 3s window.
    const stepTimer = setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= totalSteps - 1) {
          clearInterval(stepTimer)
          return prev
        }
        return prev + 1
      })
    }, 900)

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          return 100
        }
        return prev + 1
      })
    }, 28)

    // Final message after 3 seconds of asynchronous execution.
    window.setTimeout(() => {
      clearInterval(stepTimer)
      clearInterval(progressTimer)
      setStepIndex(totalSteps - 1)
      setProgress(100)
      setPhase('success')
    }, 3000)
  }

  return (
    <>
      <GoldButton onClick={() => setOpen(true)}>{label}</GoldButton>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={m.aria}
        >
          <button
            type="button"
            aria-label={m.closeAria}
            onClick={close}
            className="absolute inset-0 bg-background/85 backdrop-blur-sm"
          />

          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto border border-gold-muted bg-card shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                <span className="font-sans text-[11px] tracking-[0.28em] text-gold">
                  {m.channel}
                </span>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label={m.closeWindowAria}
                className="font-sans text-[16px] leading-none text-mist transition-colors hover:text-foreground"
              >
                ×
              </button>
            </div>

            <div className="px-6 py-7">
              {phase === 'form' && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-balance font-sans text-[15px] leading-snug tracking-[0.04em] text-foreground">
                      {m.formTitle}
                    </h2>
                    <p className="text-pretty font-sans text-[12px] leading-relaxed text-mist">
                      {m.formIntro}
                    </p>
                  </div>

                  <div className="flex flex-col gap-5 border-t border-border pt-5">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="incident-mass"
                        className="font-sans text-[10px] tracking-[0.22em] text-mist"
                      >
                        {m.fieldMass.toUpperCase()}
                      </label>
                      <select
                        id="incident-mass"
                        required
                        value={form.mass}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, mass: e.target.value }))
                        }
                        className="border border-border bg-secondary px-3 py-2.5 font-sans text-[13px] text-foreground outline-none transition-colors focus:border-gold"
                      >
                        <option value="" disabled>
                          {m.massPlaceholder}
                        </option>
                        {m.massOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <Field
                      id="incident-area"
                      label={m.fieldArea}
                      placeholder={m.areaPlaceholder}
                      value={form.area}
                      onChange={(v) => setForm((f) => ({ ...f, area: v }))}
                    />

                    <Field
                      id="incident-contact"
                      label={m.fieldContact}
                      placeholder={m.contactPlaceholder}
                      value={form.contact}
                      onChange={(v) => setForm((f) => ({ ...f, contact: v }))}
                    />

                    <GoldButton type="submit" className="w-full justify-center">
                      {m.submit}
                    </GoldButton>
                  </div>
                </form>
              )}

              {phase === 'scanning' && (
                <div className="flex flex-col gap-6 py-2">
                  <h2 className="font-sans text-[13px] tracking-[0.18em] text-gold">
                    {m.scanTitle}
                  </h2>
                  <div className="flex flex-col gap-2 border border-border bg-secondary/60 p-4 font-mono text-[12px] leading-relaxed text-terminal">
                    {m.scanSteps.map((step, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-2 transition-opacity duration-300 ${
                          i <= stepIndex ? 'opacity-100' : 'opacity-25'
                        }`}
                      >
                        <span>
                          {i < stepIndex ? '[OK]' : i === stepIndex ? '[··]' : '[  ]'}
                        </span>
                        <span>{step}</span>
                        {i === stepIndex && (
                          <span className="animate-pulse text-terminal">▋</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="h-1 w-full overflow-hidden bg-secondary">
                      <div
                        className="h-full bg-terminal transition-[width] duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-mist">
                      <span>{m.transferLabel}</span>
                      <span className="text-terminal">
                        {String(progress).padStart(3, '0')}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {phase === 'success' && (
                <div className="flex flex-col items-center gap-5 py-4 text-center">
                  <span className="flex h-12 w-12 items-center justify-center border border-gold text-[20px] text-gold">
                    ✓
                  </span>
                  <div className="flex flex-col gap-2">
                    <h2 className="font-sans text-[14px] tracking-[0.1em] text-foreground">
                      {m.successTitle}
                    </h2>
                    <p className="text-pretty font-sans text-[12px] leading-relaxed text-mist">
                      {m.successText}
                    </p>
                  </div>
                  <div className="w-full border-t border-border pt-5">
                    <GoldButton onClick={close} className="w-full justify-center">
                      {m.closeChannel}
                    </GoldButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-sans text-[10px] tracking-[0.22em] text-mist"
      >
        {label.toUpperCase()}
      </label>
      <input
        id={id}
        type={type}
        required
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="border border-border bg-secondary px-3 py-2.5 font-sans text-[13px] text-foreground outline-none transition-colors placeholder:text-mist focus:border-gold"
      />
    </div>
  )
}
