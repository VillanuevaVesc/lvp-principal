"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { content, type Lang, type SiteContent } from "@/lib/content"

type Tab = "home" | "engine" | "vectors" | "billing" | "governance"

interface SiteContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  tab: Tab
  setTab: (tab: Tab) => void
  t: SiteContent
}

const SiteContext = createContext<SiteContextValue | null>(null)

export function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es")
  const [tab, setTab] = useState<Tab>("home")

  const handleSetTab = useCallback((next: Tab) => {
    setTab(next)
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [])

  return (
    <SiteContext.Provider value={{ lang, setLang, tab, setTab: handleSetTab, t: content[lang] }}>
      {children}
    </SiteContext.Provider>
  )
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error("useSite must be used within SiteProvider")
  return ctx
}

export type { Tab }
