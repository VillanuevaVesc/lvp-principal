export type Lang = 'es' | 'en' | 'de' | 'fr'

export const LANGS: Lang[] = ['es', 'en', 'de', 'fr']

/** A rich text fragment: an optional bold "lead" rendered in foreground, plus body copy. */
export interface RichItem {
  lead?: string
  text: string
}

export type Block =
  | { type: 'title'; text: string }
  | { type: 'subtitle'; text: string }
  | { type: 'blockTitle'; text: string }
  | { type: 'prose'; lead?: string; text: string }
  | { type: 'strong'; text: string }
  | { type: 'bullets'; items: RichItem[] }
  | { type: 'numbered'; items: RichItem[] }
  | { type: 'vectors'; items: { head: string; text: string }[] }
  | { type: 'table'; head: [string, string]; rows: [string, string][] }

export interface Panel {
  index: string
  /** Short uppercase tab label (also used as the section eyebrow). */
  label: string
  /** Call-to-action button text. */
  action: string
  blocks: Block[]
}

export interface Dictionary {
  langName: string
  header: {
    company: string
    classification: string
    languageAria: string
  }
  hero: {
    eyebrow: string
    title: string
    intro: string
    aside: string
    jurisdictionLabel: string
    jurisdictionValue: string
    classificationLabel: string
    classificationValue: string
  }
  tabsAria: string
  servicesAria: string
  panels: Panel[]
  footer: {
    block: string
    perimeter: string
    sections: { label: string; text: string }[]
  }
  modal: {
    aria: string
    channel: string
    formTitle: string
    formIntro: string
    /** Section: contracting entity */
    sectionEntity: string
    fieldLegalName: string
    fieldTaxId: string
    fieldJurisdiction: string
    jurisdictionPlaceholder: string
    jurisdictions: string[]
    /** Section: executing officer */
    sectionInterventor: string
    fieldInterventorName: string
    fieldInterventorRole: string
    fieldInterventorEmail: string
    emailGenericError: string
    /** Mandatory legitimation declaration */
    declaration: string
    submit: string
    scanTitle: string
    scanSteps: string[]
    transferLabel: string
    successTitle: string
    successText: string
    closeChannel: string
    closeAria: string
    closeWindowAria: string
  }
  incidentModal: {
    aria: string
    channel: string
    formTitle: string
    formIntro: string
    fieldMass: string
    massPlaceholder: string
    massOptions: string[]
    fieldArea: string
    areaPlaceholder: string
    fieldContact: string
    contactPlaceholder: string
    submit: string
    scanTitle: string
    scanSteps: string[]
    transferLabel: string
    successTitle: string
    successText: string
    closeChannel: string
    closeAria: string
    closeWindowAria: string
  }
}

export type Translations = Record<Lang, Dictionary>
