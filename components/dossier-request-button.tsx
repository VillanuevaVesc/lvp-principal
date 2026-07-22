'use client'

import { useState } from 'react'
import { GoldButton } from './gold-button'
import { useI18n } from '@/lib/i18n/context'

type Phase = 'form' | 'scanning' | 'success'

const GENERIC_EMAIL_DOMAINS = [
  'gmail.com',
  'googlemail.com',
  'hotmail.com',
  'hotmail.es',
  'outlook.com',
  'outlook.es',
  'live.com',
  'msn.com',
  'yahoo.com',
  'yahoo.es',
  'ymail.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'aol.com',
  'gmx.com',
  'gmx.net',
  'protonmail.com',
  'proton.me',
  'mail.com',
  'zoho.com',
  'yandex.com',
  'qq.com',
]

const EMAIL_RE = /^[^\s@]+@([^\s@]+\.[^\s@]+)$/

// Lead destination (corporate inbox) and the form-processing endpoint.
// Configure a free form service (Formspree or similar) whose endpoint forwards
// submissions to this address. Set NEXT_PUBLIC_FORM_ENDPOINT in the project's
// environment variables to your real endpoint, e.g. https://formspree.io/f/xxxxxxx
const LEAD_RECIPIENT = 'prive@velaluxeprive.com'
const FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? 'https://formspree.io/f/your-form-id'

function validateCorporateEmail(email: string): boolean {
  const match = email.trim().toLowerCase().match(EMAIL_RE)
  if (!match) return false
  const domain = match[1]
  return !GENERIC_EMAIL_DOMAINS.includes(domain)
}

export function DossierRequestButton({ label }: { label: string }) {
  const { t } = useI18n()
  const m = t.modal
  const [open, setOpen] = useState(false)
  const [phase, setPhase] = useState<Phase>('form')
  const [progress, setProgress] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const [emailError, setEmailError] = useState(false)
  const [form, setForm] = useState({
    legalName: '',
    taxId: '',
    jurisdiction: '',
    interventorName: '',
    interventorRole: '',
    interventorEmail: '',
    declaration: false,
  })

  function reset() {
    setPhase('form')
    setProgress(0)
    setStepIndex(0)
    setEmailError(false)
    setForm({
      legalName: '',
      taxId: '',
      jurisdiction: '',
      interventorName: '',
      interventorRole: '',
      interventorEmail: '',
      declaration: false,
    })
  }

  function close() {
    setOpen(false)
    // delay reset until the dialog has visually closed
    setTimeout(reset, 250)
  }

  async function sendLead() {
    // Fire the POST to the form-processing service so the structured fields
    // land directly in the corporate inbox. Runs alongside the scan animation
    // and never blocks the UX — failures are logged but do not interrupt flow.
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: 'Protocolo de Validación Pericial de No-Conflicto · Nuevo lead',
          _replyto: form.interventorEmail,
          recipient: LEAD_RECIPIENT,
          razon_social: form.legalName,
          identificacion_fiscal_lei: form.taxId,
          jurisdiccion_matriz: form.jurisdiction,
          interventor_nombre: form.interventorName,
          interventor_cargo: form.interventorRole,
          interventor_email: form.interventorEmail,
          declaracion_titularidad_real: form.declaration ? 'Sí' : 'No',
          enviado_en: new Date().toISOString(),
        }),
      })
      if (!res.ok) {
        console.log('[v0] Lead POST returned non-OK status:', res.status)
      }
    } catch (err) {
      console.log('[v0] Lead POST failed:', err)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!validateCorporateEmail(form.interventorEmail)) {
      setEmailError(true)
      return
    }
    setEmailError(false)

    // Send the structured lead to the form-processing service.
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

                  <fieldset className="flex flex-col gap-5 border-t border-border pt-5">
                    <legend className="mb-1 font-sans text-[10px] tracking-[0.24em] text-gold">
                      {m.sectionEntity}
                    </legend>
                    <Field
                      id="dossier-legal-name"
                      label={m.fieldLegalName}
                      value={form.legalName}
                      onChange={(v) => setForm((f) => ({ ...f, legalName: v }))}
                      autoComplete="organization"
                    />
                    <Field
                      id="dossier-tax-id"
                      label={m.fieldTaxId}
                      value={form.taxId}
                      onChange={(v) => setForm((f) => ({ ...f, taxId: v }))}
                    />
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="dossier-jurisdiction"
                        className="font-sans text-[10px] tracking-[0.22em] text-mist"
                      >
                        {m.fieldJurisdiction.toUpperCase()}
                      </label>
                      <select
                        id="dossier-jurisdiction"
                        required
                        value={form.jurisdiction}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, jurisdiction: e.target.value }))
                        }
                        className="border border-border bg-secondary px-3 py-2.5 font-sans text-[13px] text-foreground outline-none transition-colors focus:border-gold"
                      >
                        <option value="" disabled>
                          {m.jurisdictionPlaceholder}
                        </option>
                        {m.jurisdictions.map((j) => (
                          <option key={j} value={j}>
                            {j}
                          </option>
                        ))}
                      </select>
                    </div>
                  </fieldset>

                  <fieldset className="flex flex-col gap-5 border-t border-border pt-5">
                    <legend className="mb-1 font-sans text-[10px] tracking-[0.24em] text-gold">
                      {m.sectionInterventor}
                    </legend>
                    <Field
                      id="dossier-interventor-name"
                      label={m.fieldInterventorName}
                      value={form.interventorName}
                      onChange={(v) =>
                        setForm((f) => ({ ...f, interventorName: v }))
                      }
                      autoComplete="name"
                    />
                    <Field
                      id="dossier-interventor-role"
                      label={m.fieldInterventorRole}
                      value={form.interventorRole}
                      onChange={(v) =>
                        setForm((f) => ({ ...f, interventorRole: v }))
                      }
                      autoComplete="organization-title"
                    />
                    <div className="flex flex-col gap-2">
                      <Field
                        id="dossier-interventor-email"
                        label={m.fieldInterventorEmail}
                        type="email"
                        value={form.interventorEmail}
                        onChange={(v) => {
                          setForm((f) => ({ ...f, interventorEmail: v }))
                          if (emailError) setEmailError(false)
                        }}
                        autoComplete="email"
                        invalid={emailError}
                      />
                      {emailError && (
                        <p
                          role="alert"
                          className="text-pretty font-sans text-[11px] leading-relaxed text-destructive"
                        >
                          {m.emailGenericError}
                        </p>
                      )}
                    </div>
                  </fieldset>

                  <div className="flex flex-col gap-5 border-t border-border pt-5">
                    <label
                      htmlFor="dossier-declaration"
                      className="flex cursor-pointer items-start gap-3"
                    >
                      <input
                        id="dossier-declaration"
                        type="checkbox"
                        required
                        checked={form.declaration}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, declaration: e.target.checked }))
                        }
                        className="mt-0.5 h-4 w-4 shrink-0 accent-gold"
                      />
                      <span className="text-pretty font-sans text-[12px] leading-relaxed text-mist">
                        {m.declaration}
                      </span>
                    </label>

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
                    <GoldButton
                      onClick={close}
                      className="w-full justify-center"
                    >
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
  type = 'text',
  autoComplete,
  invalid = false,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  autoComplete?: string
  invalid?: boolean
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
        autoComplete={autoComplete}
        aria-invalid={invalid}
        onChange={(e) => onChange(e.target.value)}
        className={`border bg-secondary px-3 py-2.5 font-sans text-[13px] text-foreground outline-none transition-colors placeholder:text-mist focus:border-gold ${
          invalid ? 'border-destructive' : 'border-border'
        }`}
      />
    </div>
  )
}
