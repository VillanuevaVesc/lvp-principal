"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Metodología", href: "#metodologia" },
  { label: "Credenciales", href: "#credenciales" },
  { label: "Contacto", href: "#contacto" },
]

export function LvpHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-6 w-6 shrink-0 rotate-45 border border-gold"
          />
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-foreground sm:text-base">
            Luxe Vela Prive
            <span className="hidden text-muted-foreground sm:inline">
              {" "}
              Strategic Consulting SL
            </span>
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Technical badge */}
        <div className="hidden items-center md:flex">
          <span className="rounded-sm border border-gold-muted px-3 py-1.5 font-mono text-[10px] tracking-wider text-gold">
            [CEO-MD-CVV // LVP-OMEGA-V.3.1]
          </span>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-sm border border-border p-2 text-foreground lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4" aria-label="Navegación móvil">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
            <span className="mt-3 w-fit rounded-sm border border-gold-muted px-3 py-1.5 font-mono text-[10px] tracking-wider text-gold">
              [CEO-MD-CVV // LVP-OMEGA-V.3.1]
            </span>
          </nav>
        </div>
      )}
    </header>
  )
}
