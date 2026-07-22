'use client'

/**
 * FIRMA & CONTACTO (Solapa 3 unificada) — Gobernanza, Credenciales & Despacho C-Suite.
 *
 * Consolida las antiguas secciones "Credenciales" y "Contacto" en un único bloque
 * institucional denso, dividido en 3 niveles de alta jerarquía:
 *   01 · Gobernanza y Autoría de Dirección (con ficha de ejecutivos)
 *   02 · Blindaje Jurídico & Protocolo de Enclave (con compromisos)
 *   03 · Terminal de Despacho & Acceso Restringido (canales + formulario cifrado)
 *
 * Sección autónoma y multilingüe (ES · EN · FR · DE). Mantiene la estética oscura de
 * alta densidad (terminal pericial/forense) con tonos dorados y esmeralda sobre
 * fondo obsidian. No altera el Header, el Footer global ni las Solapas 1 y 2.
 */

import { useState, type FormEvent } from 'react'

type Lang = 'es' | 'en' | 'fr' | 'de'

const GOLD = '#c5a880'
const EMERALD = '#4fb999'

interface Executive {
  code: string
  role: string
  spec: string
}

interface FirmaData {
  badge: string
  mainTitle: string
  subtitle: string
  governance: {
    title: string
    description: string
    executives: Executive[]
  }
  legal: {
    title: string
    description: string
    commitments: string[]
  }
  contact: {
    title: string
    notice: string
    dispatchLabel: string
    dispatch: string
    boardLabel: string
    boardSupport: string
    fields: {
      entity: string
      contactPerson: string
      email: string
      vectorInterest: string
      message: string
    }
    button: string
    submitted: string
  }
  footer: {
    signatures: string
    universalClause: string
    iae: string
    cnae: string
    copyright: string
  }
}

const CONTENT: Record<Lang, FirmaData> = {
  es: {
    badge: '[ CAPA III — GOBERNANZA, CREDENCIALES & DESPACHO C-SUITE ]',
    mainTitle: 'Gobernanza de Autor, Credenciales & Despacho Pericial',
    subtitle:
      'Dirección ejecutiva, copilotaje soberano y canales de comunicación restringidos blindados bajo el marco estricto del Secreto Empresarial (Ley 1/2019).',
    governance: {
      title: '01 · GOBERNANZA Y AUTORÍA DE DIRECCIÓN',
      description:
        'Luxe Vela Privé rechaza explícitamente el modelo masivo y delegativo de las firmas de auditoría tradicionales. Sostenemos como axioma que las distorsiones complejas del EBITDA no pueden ser analizadas por equipos júniores. Cada expediente es asumido, elaborado y visado personalmente por la dirección ejecutiva de la firma bajo un modelo puro de Auditoría de Autor con copilotaje asíncrono y continuo.',
      executives: [
        {
          code: 'CGVV - CEO - MD',
          role: 'Chief Executive Officer & Managing Director',
          spec: 'Licenciado en Economía y Máster en Finanzas Internacionales por la Universitat Pompeu Fabra (UPF). Administrador Único, Diseñador de la Arquitectura LVP-OMEGA y Validador Supremo del algoritmo de inferencia exógena.',
        },
        {
          code: 'DSR - CAAO',
          role: 'Chief Accounting & Audit Officer',
          spec: 'Máster en Auditoría Internacional con más de tres décadas liderando la jefatura de auditoría, control estratégico y análisis de balances en la banca regulada de España, Portugal y LATAM.',
        },
      ],
    },
    legal: {
      title: '02 · BLINDAJE JURÍDICO & PROTOCOLO DE ENCLAVE',
      description:
        'Toda intervención pericial se ampara en la Ley 1/2019, de 20 de febrero, de Secretos Empresariales. Garantizamos la máxima inmunidad legal y de ciberseguridad mediante nuestra política innegociable de Invasión Cero (Zero Operational Footprint): operamos 100% de manera exógena sobre registros públicos, clearing internacional e indicadores de fricción distribuida, sin acceso, credenciales ni modificación de los ERPs internos (SAP / Oracle) del cliente.',
      commitments: [
        'Inmunidad Tecnológica: Cero interacción o acoplamiento con redes corporativas internas.',
        'Destrucción Segura: Cribado en memoria volátil de autor con borrado automático tras el dictamen.',
        'Dictamen de Autor: Moneda de valor soberano blindada contra fugas de información.',
      ],
    },
    contact: {
      title: '03 · TERMINAL DE DESPACHO & ACCESO RESTRINGIDO',
      notice:
        'Atención pericial exclusiva para miembros del Consejo de Administración, Direcciones Financieras (CFO), Fondos de Inversión y Presidencia.',
      dispatchLabel: 'DESPACHO PERICIAL',
      dispatch: 'despacho@velaluxeprive.com',
      boardLabel: 'SOPORTE CONSEJO C-SUITE',
      boardSupport: 'c-suite@velaluxeprive.com',
      fields: {
        entity: 'Denominación Social / CIF-NIF',
        contactPerson: 'Representante C-Suite / Cargo',
        email: 'Correo Corporativo Oficial',
        vectorInterest: 'Vector u Operativa de Interés (01 a 12)',
        message: 'Detalle Confidencial del Expediente / Masa Patrimonial a Evaluar',
      },
      button: 'SOLICITAR VALORACIÓN EXÓGENA CONFIDENCIAL',
      submitted:
        'Solicitud recibida en el canal restringido. La dirección ejecutiva responderá por vía cifrada.',
    },
    footer: {
      signatures: 'CGVV - CEO - MD | DSR - CAAO',
      universalClause:
        'Garantizamos Invasión Cero (Zero Operational Footprint), operando exclusivamente con datos exógenos y bajo el estricto amparo de la Ley 1/2019 de Secretos Empresariales.',
      iae: 'CÓDIGO REGISTRO FISCAL: IAE 1-8431',
      cnae: 'CLASIFICACIÓN NACIONAL: CNAE 7020-7022',
      copyright: 'LUXE VELA PRIVE STRATEGIC CONSULTING SL © 2026',
    },
  },
  en: {
    badge: '[ LAYER III — GOVERNANCE, CREDENTIALS & C-SUITE DISPATCH ]',
    mainTitle: 'Author Governance, Credentials & Expert Dispatch',
    subtitle:
      'Executive direction, sovereign co-piloting and restricted communication channels shielded under the strict framework of Trade Secrecy (Law 1/2019).',
    governance: {
      title: '01 · GOVERNANCE & DIRECTORIAL AUTHORSHIP',
      description:
        'Luxe Vela Privé explicitly rejects the mass, delegative model of traditional audit firms. We hold as an axiom that complex EBITDA distortions cannot be analyzed by junior teams. Every file is personally assumed, produced and signed off by the firm’s executive management under a pure Author-Led Audit model with asynchronous, continuous co-piloting.',
      executives: [
        {
          code: 'CGVV - CEO - MD',
          role: 'Chief Executive Officer & Managing Director',
          spec: 'Degree in Economics and Master in International Finance from Universitat Pompeu Fabra (UPF). Sole Director, Designer of the LVP-OMEGA Architecture and Supreme Validator of the exogenous inference algorithm.',
        },
        {
          code: 'DSR - CAAO',
          role: 'Chief Accounting & Audit Officer',
          spec: 'Master in International Auditing with more than three decades leading the head of audit, strategic control and balance-sheet analysis in the regulated banking sector of Spain, Portugal and LATAM.',
        },
      ],
    },
    legal: {
      title: '02 · LEGAL SHIELDING & ENCLAVE PROTOCOL',
      description:
        'Every expert intervention is protected under Law 1/2019, of 20 February, on Trade Secrets. We guarantee maximum legal and cybersecurity immunity through our non-negotiable Zero Operational Footprint policy: we operate 100% exogenously over public records, international clearing and distributed friction indicators, without access, credentials or modification of the client’s internal ERPs (SAP / Oracle).',
      commitments: [
        'Technological Immunity: Zero interaction or coupling with internal corporate networks.',
        'Secure Destruction: Screening in author-held volatile memory with automatic erasure after the opinion.',
        'Author Opinion: Sovereign-value currency shielded against information leaks.',
      ],
    },
    contact: {
      title: '03 · DISPATCH TERMINAL & RESTRICTED ACCESS',
      notice:
        'Expert attention exclusive to members of the Board of Directors, Chief Financial Officers (CFO), Investment Funds and the Chairmanship.',
      dispatchLabel: 'EXPERT DISPATCH',
      dispatch: 'despacho@velaluxeprive.com',
      boardLabel: 'C-SUITE BOARD SUPPORT',
      boardSupport: 'c-suite@velaluxeprive.com',
      fields: {
        entity: 'Legal Name / Company Tax ID',
        contactPerson: 'C-Suite Representative / Position',
        email: 'Official Corporate Email',
        vectorInterest: 'Vector or Operation of Interest (01 to 12)',
        message: 'Confidential Detail of the File / Patrimonial Mass to Evaluate',
      },
      button: 'REQUEST CONFIDENTIAL EXOGENOUS VALUATION',
      submitted:
        'Request received on the restricted channel. Executive management will respond via encrypted channel.',
    },
    footer: {
      signatures: 'CGVV - CEO - MD | DSR - CAAO',
      universalClause:
        'We guarantee Zero Operational Footprint, operating exclusively with exogenous data and under the strict protection of Law 1/2019 on Trade Secrets.',
      iae: 'FISCAL REGISTRY CODE: IAE 1-8431',
      cnae: 'NATIONAL CLASSIFICATION: CNAE 7020-7022',
      copyright: 'LUXE VELA PRIVE STRATEGIC CONSULTING SL © 2026',
    },
  },
  fr: {
    badge: '[ COUCHE III — GOUVERNANCE, RÉFÉRENCES & CABINET C-SUITE ]',
    mainTitle: "Gouvernance d'Auteur, Références & Cabinet d'Expertise",
    subtitle:
      "Direction exécutive, co-pilotage souverain et canaux de communication restreints protégés sous le cadre strict du Secret des Affaires (Loi 1/2019).",
    governance: {
      title: "01 · GOUVERNANCE ET PATERNITÉ DE DIRECTION",
      description:
        "Luxe Vela Privé rejette explicitement le modèle massif et délégatif des cabinets d'audit traditionnels. Nous tenons pour axiome que les distorsions complexes de l'EBITDA ne peuvent être analysées par des équipes juniors. Chaque dossier est assumé, élaboré et visé personnellement par la direction exécutive du cabinet selon un modèle pur d'Audit d'Auteur avec un co-pilotage asynchrone et continu.",
      executives: [
        {
          code: 'CGVV - CEO - MD',
          role: 'Chief Executive Officer & Managing Director',
          spec: "Diplômé en Économie et Master en Finance Internationale de l'Universitat Pompeu Fabra (UPF). Administrateur Unique, Concepteur de l'Architecture LVP-OMEGA et Validateur Suprême de l'algorithme d'inférence exogène.",
        },
        {
          code: 'DSR - CAAO',
          role: 'Chief Accounting & Audit Officer',
          spec: "Master en Audit International avec plus de trois décennies à la tête de l'audit, du contrôle stratégique et de l'analyse de bilans dans la banque régulée d'Espagne, du Portugal et d'Amérique latine.",
        },
      ],
    },
    legal: {
      title: "02 · BLINDAGE JURIDIQUE & PROTOCOLE D'ENCLAVE",
      description:
        "Toute intervention d'expertise est protégée par la Loi 1/2019, du 20 février, sur les Secrets d'Affaires. Nous garantissons une immunité légale et de cybersécurité maximale grâce à notre politique non négociable d'Invasion Zéro (Zero Operational Footprint) : nous opérons à 100% de manière exogène sur des registres publics, le clearing international et des indicateurs de friction distribuée, sans accès, identifiants ni modification des ERP internes (SAP / Oracle) du client.",
      commitments: [
        "Immunité Technologique : Zéro interaction ou couplage avec les réseaux d'entreprise internes.",
        "Destruction Sécurisée : Criblage en mémoire volatile d'auteur avec effacement automatique après l'avis.",
        "Avis d'Auteur : Monnaie de valeur souveraine protégée contre les fuites d'information.",
      ],
    },
    contact: {
      title: '03 · TERMINAL DE CABINET & ACCÈS RESTREINT',
      notice:
        "Attention d'expertise exclusive aux membres du Conseil d'Administration, aux Directions Financières (CFO), aux Fonds d'Investissement et à la Présidence.",
      dispatchLabel: "CABINET D'EXPERTISE",
      dispatch: 'despacho@velaluxeprive.com',
      boardLabel: 'SUPPORT CONSEIL C-SUITE',
      boardSupport: 'c-suite@velaluxeprive.com',
      fields: {
        entity: 'Dénomination Sociale / Numéro Fiscal',
        contactPerson: 'Représentant C-Suite / Fonction',
        email: 'Courriel Corporatif Officiel',
        vectorInterest: "Vecteur ou Opérative d'Intérêt (01 à 12)",
        message: 'Détail Confidentiel du Dossier / Masse Patrimoniale à Évaluer',
      },
      button: 'DEMANDER UNE ÉVALUATION EXOGÈNE CONFIDENTIELLE',
      submitted:
        "Demande reçue sur le canal restreint. La direction exécutive répondra par voie chiffrée.",
    },
    footer: {
      signatures: 'CGVV - CEO - MD | DSR - CAAO',
      universalClause:
        "Nous garantissons une Invasion Zéro (Zero Operational Footprint), en opérant exclusivement avec des données exogènes et sous la stricte protection de la Loi 1/2019 sur les Secrets d'Affaires.",
      iae: 'CODE REGISTRE FISCAL : IAE 1-8431',
      cnae: 'CLASSIFICATION NATIONALE : CNAE 7020-7022',
      copyright: 'LUXE VELA PRIVE STRATEGIC CONSULTING SL © 2026',
    },
  },
  de: {
    badge: '[ EBENE III — GOVERNANCE, REFERENZEN & C-SUITE-KANZLEI ]',
    mainTitle: 'Autoren-Governance, Referenzen & Gutachterkanzlei',
    subtitle:
      'Exekutive Leitung, souveräne Co-Steuerung und eingeschränkte Kommunikationskanäle, geschützt unter dem strengen Rahmen des Geschäftsgeheimnisses (Gesetz 1/2019).',
    governance: {
      title: '01 · GOVERNANCE & DIREKTIONALE AUTORENSCHAFT',
      description:
        'Luxe Vela Privé lehnt das massenhafte, delegative Modell traditioneller Prüfungsgesellschaften ausdrücklich ab. Wir halten es für ein Axiom, dass komplexe EBITDA-Verzerrungen nicht von Junior-Teams analysiert werden können. Jeder Fall wird von der Geschäftsführung der Kanzlei persönlich übernommen, erstellt und abgezeichnet, nach einem reinen Modell des autorengeführten Audits mit asynchroner, kontinuierlicher Co-Steuerung.',
      executives: [
        {
          code: 'CGVV - CEO - MD',
          role: 'Chief Executive Officer & Managing Director',
          spec: 'Diplom in Wirtschaftswissenschaften und Master in Internationaler Finanzwirtschaft an der Universitat Pompeu Fabra (UPF). Alleiniger Geschäftsführer, Designer der LVP-OMEGA-Architektur und oberster Validierer des exogenen Inferenzalgorithmus.',
        },
        {
          code: 'DSR - CAAO',
          role: 'Chief Accounting & Audit Officer',
          spec: 'Master in Internationaler Wirtschaftsprüfung mit mehr als drei Jahrzehnten an der Spitze von Audit, strategischer Kontrolle und Bilanzanalyse im regulierten Bankwesen Spaniens, Portugals und Lateinamerikas.',
        },
      ],
    },
    legal: {
      title: '02 · JURISTISCHE ABSCHIRMUNG & ENKLAVEN-PROTOKOLL',
      description:
        'Jede gutachterliche Intervention ist durch das Gesetz 1/2019 vom 20. Februar über Geschäftsgeheimnisse geschützt. Wir garantieren maximale rechtliche und Cybersicherheits-Immunität durch unsere nicht verhandelbare Null-Invasion-Politik (Zero Operational Footprint): Wir arbeiten zu 100% exogen über öffentliche Register, internationales Clearing und verteilte Reibungsindikatoren, ohne Zugang, Zugangsdaten oder Veränderung der internen ERP-Systeme (SAP / Oracle) des Kunden.',
      commitments: [
        'Technologische Immunität: Null Interaktion oder Kopplung mit internen Unternehmensnetzwerken.',
        'Sichere Vernichtung: Screening im autoreneigenen flüchtigen Speicher mit automatischer Löschung nach dem Gutachten.',
        'Autorengutachten: Währung souveränen Wertes, abgeschirmt gegen Informationslecks.',
      ],
    },
    contact: {
      title: '03 · KANZLEI-TERMINAL & EINGESCHRÄNKTER ZUGANG',
      notice:
        'Gutachterliche Betreuung ausschließlich für Mitglieder des Verwaltungsrats, Finanzvorstände (CFO), Investmentfonds und die Präsidentschaft.',
      dispatchLabel: 'GUTACHTERKANZLEI',
      dispatch: 'despacho@velaluxeprive.com',
      boardLabel: 'C-SUITE VORSTANDSSUPPORT',
      boardSupport: 'c-suite@velaluxeprive.com',
      fields: {
        entity: 'Firmenname / Steuernummer',
        contactPerson: 'C-Suite-Vertreter / Position',
        email: 'Offizielle Unternehmens-E-Mail',
        vectorInterest: 'Vektor oder Operative von Interesse (01 bis 12)',
        message: 'Vertrauliches Detail des Falls / Zu bewertende Vermögensmasse',
      },
      button: 'VERTRAULICHE EXOGENE BEWERTUNG ANFORDERN',
      submitted:
        'Anfrage über den eingeschränkten Kanal empfangen. Die Geschäftsführung antwortet über einen verschlüsselten Kanal.',
    },
    footer: {
      signatures: 'CGVV - CEO - MD | DSR - CAAO',
      universalClause:
        'Wir garantieren Null Invasion (Zero Operational Footprint) und arbeiten ausschließlich mit exogenen Daten unter dem strikten Schutz des Gesetzes 1/2019 über Geschäftsgeheimnisse.',
      iae: 'STEUERREGISTERCODE: IAE 1-8431',
      cnae: 'NATIONALE KLASSIFIKATION: CNAE 7020-7022',
      copyright: 'LUXE VELA PRIVE STRATEGIC CONSULTING SL © 2026',
    },
  },
}

const FIELD_CLASS =
  'w-full bg-black/40 text-white placeholder:text-gray-600 font-mono text-[13px] px-4 py-3 outline-none transition-colors focus:bg-black/60'

export function FirmaContactoSection({ lang }: { lang: Lang }) {
  const data = CONTENT[lang] ?? CONTENT.es
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="max-w-6xl mx-auto animate-fadeIn">
      {/* Cabecera de la sección */}
      <span
        className="text-[11px] font-mono uppercase tracking-[0.3em] inline-block mb-5"
        style={{ color: EMERALD }}
      >
        {data.badge}
      </span>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-[1.15] text-balance max-w-4xl text-white">
        {data.mainTitle}
      </h1>
      <p className="mt-6 text-base sm:text-lg text-gray-400 font-light leading-relaxed max-w-3xl text-pretty">
        {data.subtitle}
      </p>

      {/* BLOQUE 01 — GOBERNANZA Y AUTORÍA */}
      <section
        className="mt-14 relative bg-white/[0.03] px-6 py-8 sm:px-9 sm:py-10"
        style={{ border: `1px solid ${GOLD}33`, borderLeft: `2px solid ${GOLD}` }}
        aria-labelledby="governance-title"
      >
        <div className="flex items-center gap-3 mb-5">
          <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45" style={{ backgroundColor: EMERALD }} />
          <h2
            id="governance-title"
            className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.22em] font-medium"
            style={{ color: GOLD }}
          >
            {data.governance.title}
          </h2>
        </div>
        <p className="text-[14px] sm:text-[15px] leading-relaxed font-light text-gray-300 max-w-4xl text-pretty">
          {data.governance.description}
        </p>

        {/* Ficha de ejecutivos */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-px border bg-white/[0.04]" style={{ borderColor: `${GOLD}22` }}>
          {data.governance.executives.map((ex) => (
            <article key={ex.code} className="flex flex-col gap-2 bg-[#141414] px-6 py-6 sm:px-7 sm:py-7">
              <span className="font-mono text-sm font-semibold tracking-[0.14em]" style={{ color: GOLD }}>
                {ex.code}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: EMERALD }}>
                {ex.role}
              </span>
              <p className="mt-1 text-[13px] leading-relaxed font-light text-gray-400 text-pretty">{ex.spec}</p>
            </article>
          ))}
        </div>
      </section>

      {/* BLOQUE 02 — BLINDAJE JURÍDICO */}
      <section
        className="mt-8 relative bg-white/[0.03] px-6 py-8 sm:px-9 sm:py-10"
        style={{ border: `1px solid ${GOLD}33`, borderLeft: `2px solid ${GOLD}` }}
        aria-labelledby="legal-title"
      >
        <div className="flex items-center gap-3 mb-5">
          <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45" style={{ backgroundColor: EMERALD }} />
          <h2
            id="legal-title"
            className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.22em] font-medium"
            style={{ color: GOLD }}
          >
            {data.legal.title}
          </h2>
        </div>
        <p className="text-[14px] sm:text-[15px] leading-relaxed font-light text-gray-300 max-w-4xl text-pretty">
          {data.legal.description}
        </p>
        <ul className="mt-6 flex flex-col gap-3">
          {data.legal.commitments.map((c, i) => (
            <li key={i} className="flex items-start gap-3 text-[13px] leading-relaxed font-light text-gray-300 text-pretty">
              <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45" style={{ backgroundColor: GOLD }} />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* BLOQUE 03 — TERMINAL DE DESPACHO & ACCESO RESTRINGIDO */}
      <section
        className="mt-8 relative bg-white/[0.03] px-6 py-8 sm:px-9 sm:py-10"
        style={{ border: `1px solid ${GOLD}33`, borderLeft: `2px solid ${GOLD}` }}
        aria-labelledby="contact-title"
      >
        <div className="flex items-center gap-3 mb-5">
          <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45" style={{ backgroundColor: EMERALD }} />
          <h2
            id="contact-title"
            className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.22em] font-medium"
            style={{ color: GOLD }}
          >
            {data.contact.title}
          </h2>
        </div>
        <p className="text-[14px] sm:text-[15px] leading-relaxed font-light text-gray-300 max-w-4xl text-pretty">
          {data.contact.notice}
        </p>

        {/* Canales de despacho */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-px border bg-white/[0.04]" style={{ borderColor: `${GOLD}22` }}>
          <div className="flex flex-col gap-1.5 bg-[#141414] px-6 py-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: EMERALD }}>
              {data.contact.dispatchLabel}
            </span>
            <a href={`mailto:${data.contact.dispatch}`} className="font-mono text-[13px] transition-opacity hover:opacity-80" style={{ color: GOLD }}>
              {data.contact.dispatch}
            </a>
          </div>
          <div className="flex flex-col gap-1.5 bg-[#141414] px-6 py-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: EMERALD }}>
              {data.contact.boardLabel}
            </span>
            <a href={`mailto:${data.contact.boardSupport}`} className="font-mono text-[13px] transition-opacity hover:opacity-80" style={{ color: GOLD }}>
              {data.contact.boardSupport}
            </a>
          </div>
        </div>

        {/* Formulario cifrado */}
        {submitted ? (
          <div
            className="mt-8 flex items-start gap-3 px-6 py-6 bg-black/40"
            style={{ border: `1px solid ${EMERALD}55`, borderLeft: `2px solid ${EMERALD}` }}
            role="status"
            aria-live="polite"
          >
            <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45" style={{ backgroundColor: EMERALD }} />
            <p className="text-[13px] leading-relaxed font-light text-gray-200 text-pretty">{data.contact.submitted}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-px border bg-white/[0.04]" style={{ borderColor: `${GOLD}22` }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
              <input
                type="text"
                name="entity"
                required
                aria-label={data.contact.fields.entity}
                placeholder={data.contact.fields.entity}
                className={FIELD_CLASS}
                style={{ borderBottom: `1px solid ${GOLD}22` }}
              />
              <input
                type="text"
                name="contactPerson"
                required
                aria-label={data.contact.fields.contactPerson}
                placeholder={data.contact.fields.contactPerson}
                className={FIELD_CLASS}
                style={{ borderBottom: `1px solid ${GOLD}22` }}
              />
              <input
                type="email"
                name="email"
                required
                aria-label={data.contact.fields.email}
                placeholder={data.contact.fields.email}
                className={FIELD_CLASS}
                style={{ borderBottom: `1px solid ${GOLD}22` }}
              />
              <input
                type="text"
                name="vectorInterest"
                aria-label={data.contact.fields.vectorInterest}
                placeholder={data.contact.fields.vectorInterest}
                className={FIELD_CLASS}
                style={{ borderBottom: `1px solid ${GOLD}22` }}
              />
            </div>
            <textarea
              name="message"
              required
              rows={4}
              aria-label={data.contact.fields.message}
              placeholder={data.contact.fields.message}
              className={`${FIELD_CLASS} resize-none leading-relaxed`}
            />
            <button
              type="submit"
              className="w-full px-6 py-4 font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-90"
              style={{ backgroundColor: GOLD }}
            >
              {data.contact.button}
            </button>
          </form>
        )}
      </section>

      {/* Pie pericial de la sección */}
      <div className="mt-16 pt-10 flex flex-col gap-6" style={{ borderTop: `1px solid ${GOLD}22` }}>
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45" style={{ backgroundColor: EMERALD }} />
          <span className="font-mono text-[12px] font-medium tracking-[0.18em]" style={{ color: GOLD }}>
            {data.footer.signatures}
          </span>
        </div>

        <p className="text-[13px] leading-relaxed font-light text-gray-400 max-w-3xl text-pretty">
          {data.footer.universalClause}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-[10px] tracking-[0.16em]">
          <span style={{ color: EMERALD }}>{data.footer.iae}</span>
          <span className="sm:text-center" style={{ color: EMERALD }}>
            {data.footer.cnae}
          </span>
          <span className="sm:text-right text-gray-500">{data.footer.copyright}</span>
        </div>
      </div>
    </div>
  )
}
