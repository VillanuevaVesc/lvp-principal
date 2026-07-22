"use client"

import { useSite, type Tab } from "./site-provider"
import { LANGS, LANG_SHORT, type Lang } from "@/lib/content"

export function SiteHeader() {
  const { t, lang, setLang, tab, setTab } = useSite()

  const tabs: { key: Tab; label: string }[] = [
    { key: "home", label: t.nav.home },
    { key: "engine", label: t.nav.engine },
    { key: "vectors", label: t.nav.vectors },
    { key: "billing", label: t.nav.billing },
    { key: "governance", label: t.nav.governance },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      {/* Status bar */}
      <div className="flex items-center justify-between gap-4 border-b border-border/60 bg-card px-4 py-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:text-xs">
          {t.statusBar.brand}
        </span>
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-accent sm:text-xs">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden="true" />
          {t.statusBar.status}
        </span>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Nav */}
        <nav aria-label="Navegación principal" className="-mx-1 overflow-x-auto">
          <ul className="flex min-w-max items-center gap-1">
            {tabs.map((item) => {
              const active = tab === item.key
              return (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => setTab(item.key)}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-sm px-3 py-2 font-mono text-xs font-medium uppercase tracking-wider transition-colors ${
                      active
                        ? "bg-accent/15 text-accent"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Language selector */}
        <div className="flex items-center gap-1" role="group" aria-label="Selector de idioma">
          {LANGS.map((code: Lang) => {
            const active = lang === code
            return (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={active}
                className={`rounded-sm border px-2.5 py-1 font-mono text-xs font-semibold tracking-wider transition-colors ${
                  active
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border text-muted-foreground hover:border-accent/60 hover:text-foreground"
                }`}
              >
                {LANG_SHORT[code]}
              </button>
            )
          })}
        </div>
      </div>
    </header>
  )
}
