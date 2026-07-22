import type { Dictionary } from './types'
import { es } from './es'
import { en } from './en'
import { de } from './de'
import { fr } from './fr'

export type Locale = 'es' | 'en' | 'de' | 'fr'

export const LOCALES: Locale[] = ['es', 'en', 'de', 'fr']

export const dictionaries: Record<Locale, Dictionary> = { es, en, de, fr }

export const DEFAULT_LOCALE: Locale = 'es'

export type { Dictionary } from './types'
