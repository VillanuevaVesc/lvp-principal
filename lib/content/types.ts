export type LangCode = "es" | "en" | "fr" | "de"

export interface TitledBlock {
  title: string
  body: string
}

export interface LabeledValue {
  label: string
  value: string
}

export interface SiteContent {
  langLabel: string
  nav: {
    home: string
    engine: string
    vectors: string
    billing: string
    governance: string
  }
  statusBar: {
    brand: string
    status: string
  }
  common: {
    routingNote: string
  }
  home: {
    hero: { h1: string; h3: string; body: string }
    matrix: { h2: string; items: TitledBlock[] }
    columns: {
      left: { label: string; h2: string; body: string }
      right: { label: string; h2: string; body: string }
    }
    cta: { button: string; subject: string }
  }
  engine: {
    h1: string
    intro: string
    layers: TitledBlock[]
    team: { h2: string; intro: string; members: TitledBlock[] }
    cta: { button: string; subject: string }
  }
  vectors: {
    h1: string
    body: string
    infra: {
      sectionLabel: string
      h2: string
      body: string
      metrics: LabeledValue[]
    }
    matrixLabel: string
    items: {
      tag: string
      h2: string
      body: string
      filters: LabeledValue[]
    }[]
    cta: { button: string; subject: string }
  }
  billing: {
    h1: string
    intro: string
    via1: {
      h2: string
      intro: string
      tiers: LabeledValue[]
      clauses: TitledBlock[]
    }
    via2: {
      h2: string
      intro: string
      tiers: LabeledValue[]
      floorTitle: string
      floors: LabeledValue[]
      floorNote: string
      minFilter: string
    }
    damocles: {
      note: string
      windows: { title: string; tone: "white" | "silver" | "alert"; body: string }[]
    }
    addendum: {
      h2: string
      intro: string
      jurisdictions: TitledBlock[]
    }
  }
  governance: {
    h1: string
    body: string
    patrimony: { h2: string; items: TitledBlock[] }
    regime: { h2: string; intro: string; points: TitledBlock[] }
    kyc: { h2: string; points: TitledBlock[] }
    cta: { button: string; subject: string }
  }
  footer: {
    lines: TitledBlock[]
    legalLeft: string
    legalRight: string
  }
}
