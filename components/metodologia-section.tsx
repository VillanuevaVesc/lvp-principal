/**
 * METODOLOGÍA (Solapa 2) — Inferencia Soberana & Metodología Exógena.
 *
 * Sección autónoma y multilingüe (ES · EN · FR · DE). Incorpora el bloque de
 * autoridad institucional "QUIÉNES SOMOS" antes de la parrilla metodológica de
 * 4 fases. Mantiene la estética oscura de alta densidad (terminal pericial/forense)
 * con tonos dorados y esmeralda sobre fondo obsidian.
 *
 * No altera el Header, el Footer global ni la estructura general del proyecto:
 * es un bloque de contenido puro inyectado en el área central de la solapa.
 */

type Lang = 'es' | 'en' | 'fr' | 'de'

const GOLD = '#c5a880'
const EMERALD = '#4fb999'

interface Block {
  code: string
  title: string
  description: string
}

interface MetodologiaData {
  badge: string
  mainTitle: string
  subtitle: string
  aboutUs: {
    title: string
    description: string
  }
  blocks: Block[]
  footer: {
    signatures: string
    universalClause: string
    iae: string
    cnae: string
    copyright: string
  }
}

const CONTENT: Record<Lang, MetodologiaData> = {
  es: {
    badge: '[ CAPA II — INFERENCIA SOBERANA & METODOLOGÍA EXÓGENA ]',
    mainTitle: 'Metodología Estrictamente Exógena (Invasión Cero)',
    subtitle:
      'El Framework opera de manera estrictamente exterior. Se abstiene por completo de interactuar, acoplarse o modificar las bases de datos o los sistemas ERP (SAP / Oracle) internos de la corporación objetivo, garantizando invulnerabilidad operativa absoluta.',
    aboutUs: {
      title: 'QUIÉNES SOMOS · AUDITORÍA DE AUTOR & PARTNER ESTRUCTURAL',
      description:
        'Luxe Vela Privé está integrada por un equipo multidisciplinario con más de 30 años de experiencia al más alto nivel en la gestión estratégica de empresas multinacionales, Banca regulada, Telecomunicaciones y el sector de Energía. Nuestra firma reúne a Economistas, Estadísticos, Contables, Auditores e Ingenieros especializados en la intercepción de asimetrías de mercado, la detección de externalidades negativas y la optimización implacable del EBITDA consolidado. Actuamos como Partner colaborador fijo de los Consejos de Administración, sustituyendo la consultoría masiva y delegativa por un co-pilotaje pericial, soberano y directo.',
    },
    blocks: [
      {
        code: '01',
        title: 'INFERENCIA EXÓGENA Y CAPTURA DE SEÑAL',
        description:
          'El motor analítico extrae la señal econométrica mediante el procesamiento exclusivo de flujos de información públicos, registros oficiales de clearing, datos transaccionales distribuidos, matrices logísticas mundiales e indicadores macroeconómicos de fricción sectorial extraídos de bases de datos avanzadas como North Data. Cero credenciales, cero huella operativa y cero intrusión en redes locales.',
      },
      {
        code: '02',
        title: 'COINTEGRACIÓN MATRICIAL Y CONTROL FORENSE',
        description:
          'El contranálisis matricial exógeno cointegra las series temporales y estructurales del sector para aislar las desviaciones reales del balance frente a la frontera teórica de eficiencia. Este escáner saca a la luz pasivos ocultos, descalces de indexación y retenciones de liquidez, garantizando el secreto empresarial absoluto blindado por la Ley 1/2019 de Secretos Empresariales.',
      },
      {
        code: '03',
        title: 'FRONTERA ESTOCÁSTICA Y EMBUDO PREDICTIVO',
        description:
          'Modelizamos la frontera de eficiencia estocástica para separar quirúrgicamente la ineficiencia sistémica del ruido blanco de mercado. Mediante el submódulo VEC-ALPHA, monitorizamos cambios de régimen operativo para emitir alertas de colisión contable con una ventana de anticipación de 45 a 60 días antes del impacto irreversible en el EBITDA.',
      },
      {
        code: '04',
        title: 'PROCESAMIENTO EN MEMORIA VOLÁTIL Y DESTRUCCIÓN SEGURA',
        description:
          'El cribado econométrico y la cuantificación monetaria de la fuga se ejecutan íntegramente en un entorno homomórfico cerrado y en memoria volátil de autor. El sistema despliega exclusivamente el informe de impacto monetizado final para la C-Suite y destruye automáticamente la totalidad de los datos procesados al cerrar la sesión.',
      },
    ],
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
    badge: '[ LAYER II — SOVEREIGN INFERENCE & EXOGENOUS METHODOLOGY ]',
    mainTitle: 'Strictly Exogenous Methodology (Zero Invasion)',
    subtitle:
      'The Framework operates in a strictly external manner. It completely abstains from interacting with, coupling to or modifying the internal databases or ERP systems (SAP / Oracle) of the target corporation, guaranteeing absolute operational invulnerability.',
    aboutUs: {
      title: 'WHO WE ARE · AUTHOR-LED AUDIT & STRUCTURAL PARTNER',
      description:
        'Luxe Vela Privé is composed of a multidisciplinary team with more than 30 years of experience at the highest level in the strategic management of multinational companies, regulated Banking, Telecommunications and the Energy sector. Our firm brings together Economists, Statisticians, Accountants, Auditors and Engineers specialized in the interception of market asymmetries, the detection of negative externalities and the relentless optimization of consolidated EBITDA. We act as a permanent collaborating Partner to Boards of Directors, replacing mass, delegative consulting with sovereign, direct and expert co-piloting.',
    },
    blocks: [
      {
        code: '01',
        title: 'EXOGENOUS INFERENCE & SIGNAL CAPTURE',
        description:
          'The analytical engine extracts the econometric signal by exclusively processing public information flows, official clearing records, distributed transactional data, global logistics matrices and macroeconomic indicators of sectoral friction drawn from advanced databases such as North Data. Zero credentials, zero operational footprint and zero intrusion into local networks.',
      },
      {
        code: '02',
        title: 'MATRIX COINTEGRATION & FORENSIC CONTROL',
        description:
          'Exogenous matrix counter-analysis cointegrates the temporal and structural time series of the sector to isolate the real deviations of the balance sheet against the theoretical efficiency frontier. This scanner surfaces hidden liabilities, indexation mismatches and liquidity retentions, guaranteeing absolute trade secrecy shielded by Law 1/2019 on Trade Secrets.',
      },
      {
        code: '03',
        title: 'STOCHASTIC FRONTIER & PREDICTIVE FUNNEL',
        description:
          'We model the stochastic efficiency frontier to surgically separate systemic inefficiency from white market noise. Through the VEC-ALPHA submodule, we monitor operational regime changes to issue accounting-collision alerts with a lead window of 45 to 60 days before the irreversible impact on EBITDA.',
      },
      {
        code: '04',
        title: 'VOLATILE-MEMORY PROCESSING & SECURE DESTRUCTION',
        description:
          'The econometric screening and the monetary quantification of the leakage are executed entirely in a closed homomorphic environment and in author-held volatile memory. The system deploys exclusively the final monetized impact report for the C-Suite and automatically destroys the entirety of the processed data upon closing the session.',
      },
    ],
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
    badge: '[ COUCHE II — INFÉRENCE SOUVERAINE & MÉTHODOLOGIE EXOGÈNE ]',
    mainTitle: 'Méthodologie Strictement Exogène (Invasion Zéro)',
    subtitle:
      "Le Framework opère de manière strictement externe. Il s'abstient totalement d'interagir, de se coupler ou de modifier les bases de données ou les systèmes ERP (SAP / Oracle) internes de la corporation cible, garantissant une invulnérabilité opérationnelle absolue.",
    aboutUs: {
      title: "QUI SOMMES-NOUS · AUDIT D'AUTEUR & PARTENAIRE STRUCTUREL",
      description:
        "Luxe Vela Privé est composée d'une équipe multidisciplinaire cumulant plus de 30 ans d'expérience au plus haut niveau dans la gestion stratégique d'entreprises multinationales, la Banque régulée, les Télécommunications et le secteur de l'Énergie. Notre cabinet réunit des Économistes, Statisticiens, Comptables, Auditeurs et Ingénieurs spécialisés dans l'interception des asymétries de marché, la détection des externalités négatives et l'optimisation implacable de l'EBITDA consolidé. Nous agissons comme Partenaire collaborateur permanent des Conseils d'Administration, en substituant au conseil massif et délégatif un co-pilotage d'expertise, souverain et direct.",
    },
    blocks: [
      {
        code: '01',
        title: 'INFÉRENCE EXOGÈNE ET CAPTURE DU SIGNAL',
        description:
          "Le moteur analytique extrait le signal économétrique par le traitement exclusif de flux d'information publics, de registres officiels de clearing, de données transactionnelles distribuées, de matrices logistiques mondiales et d'indicateurs macroéconomiques de friction sectorielle issus de bases de données avancées comme North Data. Zéro identifiant, zéro empreinte opérationnelle et zéro intrusion dans les réseaux locaux.",
      },
      {
        code: '02',
        title: 'COINTÉGRATION MATRICIELLE ET CONTRÔLE FORENSIQUE',
        description:
          "La contre-analyse matricielle exogène cointègre les séries temporelles et structurelles du secteur afin d'isoler les écarts réels du bilan face à la frontière théorique d'efficacité. Ce scanner met au jour les passifs cachés, les décalages d'indexation et les rétentions de liquidité, garantissant le secret d'affaires absolu protégé par la Loi 1/2019 sur les Secrets d'Affaires.",
      },
      {
        code: '03',
        title: 'FRONTIÈRE STOCHASTIQUE ET ENTONNOIR PRÉDICTIF',
        description:
          "Nous modélisons la frontière d'efficacité stochastique pour séparer chirurgicalement l'inefficacité systémique du bruit blanc de marché. Via le sous-module VEC-ALPHA, nous surveillons les changements de régime opérationnel pour émettre des alertes de collision comptable avec une fenêtre d'anticipation de 45 à 60 jours avant l'impact irréversible sur l'EBITDA.",
      },
      {
        code: '04',
        title: 'TRAITEMENT EN MÉMOIRE VOLATILE ET DESTRUCTION SÉCURISÉE',
        description:
          "Le criblage économétrique et la quantification monétaire de la fuite s'exécutent intégralement dans un environnement homomorphe fermé et en mémoire volatile d'auteur. Le système ne déploie que le rapport d'impact monétisé final pour la C-Suite et détruit automatiquement l'intégralité des données traitées à la clôture de la session.",
      },
    ],
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
    badge: '[ EBENE II — SOUVERÄNE INFERENZ & EXOGENE METHODIK ]',
    mainTitle: 'Streng Exogene Methodik (Null Invasion)',
    subtitle:
      'Das Framework arbeitet streng von außen. Es verzichtet vollständig darauf, mit den internen Datenbanken oder ERP-Systemen (SAP / Oracle) der Zielkorporation zu interagieren, sich an sie anzukoppeln oder sie zu verändern, und garantiert damit absolute operative Unverwundbarkeit.',
    aboutUs: {
      title: 'WER WIR SIND · AUTORENGEFÜHRTES AUDIT & STRUKTURELLER PARTNER',
      description:
        'Luxe Vela Privé besteht aus einem multidisziplinären Team mit mehr als 30 Jahren Erfahrung auf höchstem Niveau im strategischen Management multinationaler Unternehmen, im regulierten Bankwesen, in der Telekommunikation und im Energiesektor. Unsere Kanzlei vereint Ökonomen, Statistiker, Buchhalter, Wirtschaftsprüfer und Ingenieure, spezialisiert auf die Interzeption von Marktasymmetrien, die Erkennung negativer Externalitäten und die kompromisslose Optimierung des konsolidierten EBITDA. Wir agieren als fester kollaborierender Partner der Verwaltungsräte und ersetzen massenhafte, delegative Beratung durch eine gutachterliche, souveräne und direkte Co-Steuerung.',
    },
    blocks: [
      {
        code: '01',
        title: 'EXOGENE INFERENZ & SIGNALERFASSUNG',
        description:
          'Die Analyse-Engine extrahiert das ökonometrische Signal durch die ausschließliche Verarbeitung öffentlicher Informationsströme, offizieller Clearing-Register, verteilter Transaktionsdaten, globaler Logistikmatrizen und makroökonomischer Indikatoren sektoraler Reibung aus fortschrittlichen Datenbanken wie North Data. Null Zugangsdaten, null operativer Fußabdruck und null Eindringen in lokale Netzwerke.',
      },
      {
        code: '02',
        title: 'MATRIX-KOINTEGRATION & FORENSISCHE KONTROLLE',
        description:
          'Die exogene Matrix-Gegenanalyse kointegriert die zeitlichen und strukturellen Zeitreihen des Sektors, um die realen Abweichungen der Bilanz gegenüber der theoretischen Effizienzgrenze zu isolieren. Dieser Scanner legt versteckte Verbindlichkeiten, Indexierungsdiskrepanzen und Liquiditätseinbehalte offen und garantiert das absolute Geschäftsgeheimnis, geschützt durch das Gesetz 1/2019 über Geschäftsgeheimnisse.',
      },
      {
        code: '03',
        title: 'STOCHASTISCHE GRENZE & PRÄDIKTIVER TRICHTER',
        description:
          'Wir modellieren die stochastische Effizienzgrenze, um systemische Ineffizienz chirurgisch vom weißen Marktrauschen zu trennen. Über das Submodul VEC-ALPHA überwachen wir operative Regimewechsel, um Bilanzkollisionswarnungen mit einem Vorlauffenster von 45 bis 60 Tagen vor dem irreversiblen Einschlag auf das EBITDA auszugeben.',
      },
      {
        code: '04',
        title: 'VERARBEITUNG IM FLÜCHTIGEN SPEICHER & SICHERE VERNICHTUNG',
        description:
          'Das ökonometrische Screening und die monetäre Quantifizierung des Lecks werden vollständig in einer geschlossenen homomorphen Umgebung und im autoreneigenen flüchtigen Speicher ausgeführt. Das System stellt ausschließlich den finalen monetarisierten Wirkungsbericht für die C-Suite bereit und vernichtet automatisch sämtliche verarbeiteten Daten beim Schließen der Sitzung.',
      },
    ],
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

export function MetodologiaSection({ lang }: { lang: Lang }) {
  const data = CONTENT[lang] ?? CONTENT.es

  return (
    <div className="max-w-7xl mx-auto animate-fadeIn">
      {/* Cabecera de la sección */}
      <span
        className="text-xs font-mono uppercase tracking-[0.3em] inline-block mb-6"
        style={{ color: EMERALD }}
      >
        {data.badge}
      </span>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] text-balance max-w-5xl text-white">
        {data.mainTitle}
      </h1>
      <p className="mt-7 text-lg sm:text-xl text-gray-400 font-light leading-relaxed max-w-4xl text-pretty">
        {data.subtitle}
      </p>

      {/* Bloque de autoridad institucional QUIÉNES SOMOS */}
      <section
        className="mt-16 relative bg-white/[0.03] px-7 py-9 sm:px-10 sm:py-12"
        style={{ border: `1px solid ${GOLD}33`, borderLeft: `2px solid ${GOLD}` }}
        aria-labelledby="about-us-title"
      >
        <div className="flex items-center gap-3 mb-6">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rotate-45"
            style={{ backgroundColor: EMERALD }}
          />
          <h2
            id="about-us-title"
            className="font-mono text-[13px] sm:text-sm uppercase tracking-[0.22em] font-medium"
            style={{ color: GOLD }}
          >
            {data.aboutUs.title}
          </h2>
        </div>
        <p className="text-base sm:text-lg leading-relaxed font-light text-gray-300 max-w-4xl text-pretty">
          {data.aboutUs.description}
        </p>
      </section>

      {/* Parrilla metodológica de 4 fases */}
      <div
        className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px border bg-white/[0.04]"
        style={{ borderColor: `${GOLD}22` }}
      >
        {data.blocks.map((b) => (
          <article
            key={b.code}
            className="group relative flex flex-col gap-4 bg-[#141414] px-8 py-9 sm:px-10 sm:py-11 transition-colors duration-300 hover:bg-[#181613]"
          >
            {/* Índice de fase */}
            <div className="flex items-center gap-3">
              <span
                className="font-mono text-4xl sm:text-5xl font-light leading-none tabular-nums"
                style={{ color: GOLD }}
              >
                {b.code}
              </span>
              <span
                aria-hidden="true"
                className="h-px flex-1"
                style={{ backgroundColor: `${EMERALD}55` }}
              />
            </div>
            <h3 className="font-mono text-sm sm:text-base font-semibold uppercase tracking-[0.14em] leading-snug text-white text-pretty">
              {b.title}
            </h3>
            <p className="text-base leading-relaxed font-light text-gray-400 text-pretty">
              {b.description}
            </p>
          </article>
        ))}
      </div>

      {/* Pie pericial de la sección */}
      <div
        className="mt-16 pt-10 flex flex-col gap-6"
        style={{ borderTop: `1px solid ${GOLD}22` }}
      >
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rotate-45"
            style={{ backgroundColor: EMERALD }}
          />
          <span
            className="font-mono text-[12px] font-medium tracking-[0.18em]"
            style={{ color: GOLD }}
          >
            {data.footer.signatures}
          </span>
        </div>

        <p className="text-base leading-relaxed font-light text-gray-400 max-w-4xl text-pretty">
          {data.footer.universalClause}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-[11px] tracking-[0.16em]">
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
