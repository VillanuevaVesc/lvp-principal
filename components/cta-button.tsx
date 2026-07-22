"use client"

const CONTACT_EMAIL = "control@luxevelaprive.com"

export function CtaButton({ label, subject }: { label: string; subject: string }) {
  const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      <a
        href={href}
        className="inline-flex items-center justify-center rounded-sm border border-accent bg-accent/10 px-6 py-3 text-center font-mono text-sm font-semibold uppercase tracking-wider text-accent transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {label}
      </a>
    </div>
  )
}
