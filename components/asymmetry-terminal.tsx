'use client'

import type React from 'react'
import { useRef, useState } from 'react'
import {
  Fingerprint,
  KeyRound,
  UploadCloud,
  FileCheck2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react'

const OTP_LENGTH = 6

export function AsymmetryTerminal() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const otpComplete = otp.every((d) => d !== '')

  function handleOtpChange(index: number, value: string) {
    const digit = value.replace(/\D/g, '').slice(-1)
    setOtp((prev) => {
      const next = [...prev]
      next[index] = digit
      return next
    })
    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  function handleOtpKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  function handleOtpPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const pasted = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, OTP_LENGTH)
    if (!pasted) return
    const next = Array(OTP_LENGTH).fill('')
    for (let i = 0; i < pasted.length; i += 1) next[i] = pasted[i]
    setOtp(next)
    inputsRef.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus()
  }

  function acceptFile(f: File | undefined) {
    if (!f || file) return // single attempt: ignore if one is already loaded
    setFile(f)
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(false)
    acceptFile(e.dataTransfer.files?.[0])
  }

  return (
    <section id="enclave" className="border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            Enclave Restringido
          </p>
          <h2 className="text-balance font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Terminal de Autenticación de Asimetrías
          </h2>
        </div>

        <div className="overflow-hidden rounded-md border border-gold-muted bg-card shadow-2xl shadow-black/40">
          {/* Cryptographic status bar */}
          <div className="flex items-center justify-between gap-3 border-b border-border bg-secondary/60 px-5 py-3">
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
              <Fingerprint className="h-3.5 w-3.5" aria-hidden="true" />
              Sesión Cifrada
            </span>
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-terminal">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-terminal"
              />
              Canal Seguro
            </span>
          </div>

          <div className="space-y-10 p-6 sm:p-10">
            {/* OTP authentication */}
            <div>
              <label className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <KeyRound className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                Código de Autenticación (OTP)
              </label>
              <div
                className="flex items-center gap-2 sm:gap-3"
                role="group"
                aria-label="Código OTP de 6 dígitos"
              >
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ref={(el) => {
                      inputsRef.current[i] = el
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    value={digit}
                    aria-label={`Dígito ${i + 1}`}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    onPaste={handleOtpPaste}
                    className="h-14 w-full rounded-md border border-input bg-background text-center font-mono text-xl font-semibold text-foreground outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                ))}
              </div>
            </div>

            {/* Drag-and-drop upload zone */}
            <div>
              <label
                htmlFor="corp-report"
                className="mb-3 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
              >
                Suba el Informe Anual de su Corporación
              </label>

              <div
                onDragOver={(e) => {
                  e.preventDefault()
                  if (!file) setIsDragging(true)
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => !file && fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                aria-disabled={!!file}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && !file) {
                    e.preventDefault()
                    fileInputRef.current?.click()
                  }
                }}
                className={
                  'flex flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed px-6 py-12 text-center transition-colors duration-200 ' +
                  (file
                    ? 'cursor-default border-terminal/40 bg-terminal/5'
                    : isDragging
                      ? 'cursor-copy border-gold bg-gold/10'
                      : 'cursor-pointer border-gold-muted bg-background hover:border-gold hover:bg-gold/5')
                }
              >
                {file ? (
                  <>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-terminal/40 bg-terminal/10">
                      <FileCheck2
                        className="h-6 w-6 text-terminal"
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      <p className="font-mono text-sm text-foreground">
                        {file.name}
                      </p>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-terminal">
                        Cargado en memoria volátil
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-muted bg-gold/5">
                      <UploadCloud
                        className="h-6 w-6 text-gold"
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      <p className="text-sm text-foreground">
                        Arrastre el documento aquí o{' '}
                        <span className="text-gold underline underline-offset-4">
                          selecciónelo
                        </span>
                      </p>
                      <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-muted-foreground">
                        Único Intento de Cribado en Memoria Volátil
                        (Alucinaciones Cero)
                      </p>
                    </div>
                  </>
                )}
                <input
                  id="corp-report"
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.xlsx,.xls,.csv,.doc,.docx"
                  className="sr-only"
                  onChange={(e) => acceptFile(e.target.files?.[0])}
                  disabled={!!file}
                />
              </div>

              {/* Muted red single-attempt advisory */}
              <p className="mt-3 flex items-start gap-2 font-mono text-[11px] leading-relaxed text-destructive">
                <AlertTriangle
                  className="mt-0.5 h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                />
                Único intento de cribado. El documento no se almacena y se
                destruye al finalizar la sesión.
              </p>
            </div>

            {/* Submit */}
            <button
              type="button"
              disabled={!otpComplete || !file}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-gold px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-card disabled:cursor-not-allowed disabled:opacity-30"
            >
              Iniciar Cribado
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
