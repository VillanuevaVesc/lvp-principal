import type { SiteContent } from "./types"
import { es } from "./es"
import { en } from "./en"
import { fr } from "./fr"
import { de } from "./de"

export type Lang = "es" | "en" | "fr" | "de"

export const LANGS: Lang[] = ["es", "en", "fr", "de"]

export const LANG_SHORT: Record<Lang, string> = {
  es: "ES",
  en: "EN",
  fr: "FR",
  de: "DE",
}

export const content: Record<Lang, SiteContent> = { es, en, fr, de }

export type { SiteContent }
