/**
 * SERVICIOS (Solapa 1) — Cartografía de Fugas Estructurales y Asimetrías de EBITDA.
 *
 * Sección autónoma y multilingüe (ES · EN · FR · DE) que representa los 12 Vectores
 * Operativos de intercepción econométrica exógena. Mantiene la estética oscura de alta
 * densidad (terminal pericial/forense) con tonos dorados y esmeralda sobre la cuadrícula.
 *
 * No altera el Header, el Footer global ni la estructura general del proyecto: es un
 * bloque de contenido puro que se inyecta dentro del área central de la solapa.
 */

type Lang = 'es' | 'en' | 'fr' | 'de'

const GOLD = '#c5a880'
const EMERALD = '#4fb999'

interface Vector {
  code: string
  category: string
  title: string
  description: string
}

interface ServiciosData {
  badge: string
  mainTitle: string
  subtitle: string
  vectors: Vector[]
  footer: {
    signatures: string
    universalClause: string
    iae: string
    cnae: string
    copyright: string
  }
}

const CONTENT: Record<Lang, ServiciosData> = {
  es: {
    badge: '[ ARQUITECTURA DE INFERENCIA EXÓGENA — CERO INTRUSIÓN EN SISTEMAS ]',
    mainTitle: 'Cartografía de Fugas Estructurales y Asimetrías de EBITDA',
    subtitle:
      'Intercepción econométrica exógena sobre frentes de alta fricción transaccional. Localizamos y neutralizamos el deterioro silencioso del margen consolidado en grandes corporaciones y fondos sin necesidad de credenciales, integración informática ni acceso a ERPs internos.',
    vectors: [
      {
        code: '01',
        category: 'BANCA, FINTECH Y PLATAFORMAS DE JUEGO',
        title: 'Float Soberano, Clearing e Intermediación Transfronteriza',
        description:
          'Intercepción del secuestro de liquidez corporativa e intersocietaria (float hijacking) en nodos de liquidación interbancaria, micro-fricciones en pasarelas de pago de alto volumen, spreads de conversión cambiaria y descalces en el traspaso de tesorería entre filiales y matrices.',
      },
      {
        code: '02',
        category: 'INDUSTRIA FARMACÉUTICA, BIOTECH Y SALUD',
        title: 'Royalties, Patentes y Trazabilidad Ultra-Crítica',
        description:
          'Aislamiento de retenciones transfronterizas en la liquidación de patentes, royalties y transferencias tecnológicas. Detección de mermas no imputadas en la cadena de frío ultra-crítica (APIs, biológicos y vacunas) y corrección de asimetrías en rebates y rappels de la gran distribución farmacéutica.',
      },
      {
        code: '03',
        category: 'REDES LOW-COST DE COMBUSTIBLES Y ENERGÍA',
        title: 'Retail de Carburantes, Refino y Coberturas PPA',
        description:
          'Auditoría de margen en redes de estaciones de servicio low-cost y distribuidoras de carburante. Aislamiento de erosiones en contratos PPA, indexaciones defectuosas de precio mayorista, volatilidad de carga base y peajes en surtidor automatizado.',
      },
      {
        code: '04',
        category: 'M&A, PRIVATE EQUITY Y COMPRAVENTA DE EMPRESAS',
        title: 'Auditoría Exógena de M&A y Ajuste de EBITDA Real',
        description:
          'Identificación de pasivos contingentes y erosiones contables no afloradas en auditorías tradicionales previas a la compraventa de compañías. Recálculo exógeno del EBITDA real y ajuste fino de deuda financiera neta antes del cierre de contratos SPA.',
      },
      {
        code: '05',
        category: 'SUPPLY CHAIN MULTIMODAL Y CADENA DE FRÍO',
        title: 'Cadenas de Suministro de Alta Densidad y Fletes',
        description:
          'Tracking exógeno de tiempos de tránsito y variaciones estocásticas en fletes marítimos, aéreos y terrestres. Identificación de mermas no compensadas en almacenamiento (temperatura controlada y ambiente) y sobrecostes por sobreestadías portuarias (demurrage).',
      },
      {
        code: '06',
        category: 'FRICCIÓN OPERATIVA E-CMR, ADUANAS Y PUERTOS',
        title: 'Transacciones Transfronterizas y Fletes Analógicos',
        description:
          'Auditoría exógena sobre desviaciones en la contratación analógica de fletes, retrasos administrativos en la confirmación de entregas por falta de integración digital e-CMR en fronteras e incoherencias de valoración en aduanas y terminales portuarias.',
      },
      {
        code: '07',
        category: 'ALUCINACIÓN ALGORÍTMICA E IA (XSPAM.AI)',
        title: 'Auditoría de Modelos Predictivos y Ruido en la C-Suite',
        description:
          'Evaluación exógena vía xspam.ai sobre modelos de IA corporativos para neutralizar alucinaciones lineales que generan decisiones erróneas de sobrecompra de stock, distorsiones en la demanda proyectada y pérdidas directas en el EBITDA.',
      },
      {
        code: '08',
        category: 'REAL ESTATE LOGÍSTICO Y SOCIMI',
        title: 'Rentas Extractivas, EPRA Yields y Valoración de Suelo',
        description:
          'Trituración pericial de GAV, GRI y EPRA Yields. Aislamiento de la extracción pasiva de caja por inercia en la indexación de arrendamientos complejos y descalces entre la revalorización de naves industriales y la tasa de capitalización real.',
      },
      {
        code: '09',
        category: 'HOSPITALITY, RETAIL Y OPEX CORPORATIVO',
        title: 'Superficie Operativa y Arrendamientos Comerciales',
        description:
          'Mapeado econométrico de la densidad de ocupación por metro cuadrado en grandes cadenas hoteleras, inmobiliarias y retail. Corrección de desactualizaciones contractuales y valoraciones catastrales que inflan la partida de Otros Gastos de Explotación.',
      },
      {
        code: '10',
        category: 'TRADING DE COMMODITIES Y MATERIAS PRIMAS',
        title: 'Liquidación de Derivados, Coberturas y Contango',
        description:
          'Detección de fricciones en el arbitraje de materias primas, costos ocultos de almacenamiento y financiación colateral (margin calls), y descalces de liquidación en instrumentos de cobertura cambiaria y de precios de mercado.',
      },
      {
        code: '11',
        category: 'INFRAESTRUCTURAS Y CONCESIONES ADMINISTRATIVAS',
        title: 'Peajes en Sombra, Revalorizaciones y Sector Público',
        description:
          'Identificación de descalces de indexación en contratos de concesión a largo plazo, demoras de pago no reclamadas en liquidadoras públicas y asimetrías de canon operativo en infraestructuras bajo gestión privada.',
      },
      {
        code: '12',
        category: 'MULTI-DIVISA Y PRECIOS DE TRANSFERENCIA',
        title: 'Descalce Cambiario e Inercia Regulatoria Transfronteriza',
        description:
          'Identificación de asimetrías temporales en la liquidación multi-divisa, amortiguación de fricciones en el comercio intracomunitario y desajustes en precios de transferencia intragrupo entre matrices y filiales.',
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
    badge: '[ EXOGENOUS INFERENCE ARCHITECTURE — ZERO SYSTEM INTRUSION ]',
    mainTitle: 'Cartography of Structural Leakage and EBITDA Asymmetries',
    subtitle:
      'Exogenous econometric interception across high-friction transactional fronts. We locate and neutralize the silent erosion of consolidated margin in large corporations and funds with no credentials, no IT integration and no access to internal ERPs.',
    vectors: [
      {
        code: '01',
        category: 'BANKING, FINTECH & GAMING PLATFORMS',
        title: 'Sovereign Float, Clearing and Cross-Border Intermediation',
        description:
          'Interception of corporate and intercompany liquidity hijacking (float hijacking) at interbank settlement nodes, micro-frictions in high-volume payment gateways, currency conversion spreads and treasury mismatches in the transfer between subsidiaries and parent companies.',
      },
      {
        code: '02',
        category: 'PHARMACEUTICAL INDUSTRY, BIOTECH & HEALTH',
        title: 'Royalties, Patents and Ultra-Critical Traceability',
        description:
          'Isolation of cross-border withholdings in the settlement of patents, royalties and technology transfers. Detection of unallocated shrinkage in the ultra-critical cold chain (APIs, biologics and vaccines) and correction of asymmetries in rebates and volume discounts across large pharmaceutical distribution.',
      },
      {
        code: '03',
        category: 'LOW-COST FUEL & ENERGY NETWORKS',
        title: 'Fuel Retail, Refining and PPA Hedging',
        description:
          'Margin audit across low-cost service-station networks and fuel distributors. Isolation of erosions in PPA contracts, faulty wholesale price indexation, base-load volatility and tolls at the automated pump.',
      },
      {
        code: '04',
        category: 'M&A, PRIVATE EQUITY & BUSINESS TRANSFERS',
        title: 'Exogenous M&A Audit and Real EBITDA Adjustment',
        description:
          'Identification of contingent liabilities and accounting erosions not surfaced in traditional audits prior to the sale of companies. Exogenous recalculation of real EBITDA and fine-tuning of net financial debt before closing SPA contracts.',
      },
      {
        code: '05',
        category: 'MULTIMODAL SUPPLY CHAIN & COLD CHAIN',
        title: 'High-Density Supply Chains and Freight',
        description:
          'Exogenous tracking of transit times and stochastic variations in maritime, air and land freight. Identification of uncompensated shrinkage in storage (temperature-controlled and ambient) and overcosts from port demurrage.',
      },
      {
        code: '06',
        category: 'OPERATIONAL FRICTION E-CMR, CUSTOMS & PORTS',
        title: 'Cross-Border Transactions and Analog Freight',
        description:
          'Exogenous audit of deviations in the analog contracting of freight, administrative delays in delivery confirmation due to the lack of e-CMR digital integration at borders, and valuation inconsistencies at customs and port terminals.',
      },
      {
        code: '07',
        category: 'ALGORITHMIC HALLUCINATION & AI (XSPAM.AI)',
        title: 'Audit of Predictive Models and C-Suite Noise',
        description:
          'Exogenous evaluation via xspam.ai of corporate AI models to neutralize linear hallucinations that generate erroneous stock over-purchase decisions, distortions in projected demand and direct EBITDA losses.',
      },
      {
        code: '08',
        category: 'LOGISTICS REAL ESTATE & SOCIMI',
        title: 'Extractive Rents, EPRA Yields and Land Valuation',
        description:
          'Forensic shredding of GAV, GRI and EPRA Yields. Isolation of passive cash extraction from inertia in the indexation of complex leases and mismatches between the revaluation of industrial warehouses and the real capitalization rate.',
      },
      {
        code: '09',
        category: 'HOSPITALITY, RETAIL & CORPORATE OPEX',
        title: 'Operating Floor Space and Commercial Leases',
        description:
          'Econometric mapping of occupancy density per square meter across large hotel chains, real estate and retail. Correction of contractual obsolescence and cadastral valuations that inflate the Other Operating Expenses line.',
      },
      {
        code: '10',
        category: 'COMMODITIES & RAW MATERIALS TRADING',
        title: 'Derivatives Settlement, Hedging and Contango',
        description:
          'Detection of frictions in commodity arbitrage, hidden storage and collateral financing costs (margin calls), and settlement mismatches in currency and market-price hedging instruments.',
      },
      {
        code: '11',
        category: 'INFRASTRUCTURE & ADMINISTRATIVE CONCESSIONS',
        title: 'Shadow Tolls, Revaluations and Public Sector',
        description:
          'Identification of indexation mismatches in long-term concession contracts, unclaimed payment delays in public clearing bodies and operating-fee asymmetries in infrastructure under private management.',
      },
      {
        code: '12',
        category: 'MULTI-CURRENCY & TRANSFER PRICING',
        title: 'Currency Mismatch and Cross-Border Regulatory Inertia',
        description:
          'Identification of temporal asymmetries in multi-currency settlement, damping of frictions in intra-community trade and misalignments in intragroup transfer pricing between parent companies and subsidiaries.',
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
    badge: "[ ARCHITECTURE D'INFÉRENCE EXOGÈNE — ZÉRO INTRUSION DANS LES SYSTÈMES ]",
    mainTitle: "Cartographie des Fuites Structurelles et Asymétries d'EBITDA",
    subtitle:
      "Interception économétrique exogène sur des fronts à forte friction transactionnelle. Nous localisons et neutralisons la détérioration silencieuse de la marge consolidée dans les grandes entreprises et les fonds, sans identifiants, sans intégration informatique ni accès aux ERP internes.",
    vectors: [
      {
        code: '01',
        category: 'BANQUE, FINTECH ET PLATEFORMES DE JEU',
        title: 'Float Souverain, Clearing et Intermédiation Transfrontalière',
        description:
          "Interception du détournement de liquidité d'entreprise et intersociétés (float hijacking) au niveau des nœuds de règlement interbancaire, micro-frictions dans les passerelles de paiement à haut volume, spreads de conversion de devises et décalages dans le transfert de trésorerie entre filiales et maisons mères.",
      },
      {
        code: '02',
        category: 'INDUSTRIE PHARMACEUTIQUE, BIOTECH ET SANTÉ',
        title: 'Redevances, Brevets et Traçabilité Ultra-Critique',
        description:
          "Isolement des retenues transfrontalières dans le règlement des brevets, redevances et transferts technologiques. Détection des pertes non imputées dans la chaîne du froid ultra-critique (API, biologiques et vaccins) et correction des asymétries de rabais et ristournes de la grande distribution pharmaceutique.",
      },
      {
        code: '03',
        category: 'RÉSEAUX LOW-COST DE CARBURANTS ET ÉNERGIE',
        title: 'Distribution de Carburants, Raffinage et Couvertures PPA',
        description:
          "Audit de marge sur les réseaux de stations-service low-cost et distributeurs de carburant. Isolement des érosions dans les contrats PPA, indexations défectueuses du prix de gros, volatilité de la charge de base et péages au distributeur automatisé.",
      },
      {
        code: '04',
        category: "M&A, PRIVATE EQUITY ET CESSION D'ENTREPRISES",
        title: "Audit Exogène M&A et Ajustement de l'EBITDA Réel",
        description:
          "Identification des passifs éventuels et érosions comptables non révélés dans les audits traditionnels préalables à la cession d'entreprises. Recalcul exogène de l'EBITDA réel et ajustement fin de la dette financière nette avant la clôture des contrats SPA.",
      },
      {
        code: '05',
        category: 'SUPPLY CHAIN MULTIMODALE ET CHAÎNE DU FROID',
        title: "Chaînes d'Approvisionnement à Haute Densité et Frets",
        description:
          "Suivi exogène des délais de transit et variations stochastiques des frets maritimes, aériens et terrestres. Identification des pertes non compensées en entreposage (température contrôlée et ambiante) et surcoûts de surestaries portuaires (demurrage).",
      },
      {
        code: '06',
        category: 'FRICTION OPÉRATIONNELLE E-CMR, DOUANES ET PORTS',
        title: 'Transactions Transfrontalières et Frets Analogiques',
        description:
          "Audit exogène des écarts dans la contractualisation analogique des frets, retards administratifs dans la confirmation des livraisons par manque d'intégration numérique e-CMR aux frontières et incohérences de valorisation en douane et terminaux portuaires.",
      },
      {
        code: '07',
        category: 'HALLUCINATION ALGORITHMIQUE ET IA (XSPAM.AI)',
        title: 'Audit des Modèles Prédictifs et Bruit dans la C-Suite',
        description:
          "Évaluation exogène via xspam.ai des modèles d'IA d'entreprise afin de neutraliser les hallucinations linéaires générant des décisions erronées de surachat de stock, des distorsions de la demande projetée et des pertes directes d'EBITDA.",
      },
      {
        code: '08',
        category: 'IMMOBILIER LOGISTIQUE ET SOCIMI',
        title: 'Rentes Extractives, EPRA Yields et Valorisation Foncière',
        description:
          "Broyage d'expertise du GAV, GRI et EPRA Yields. Isolement de l'extraction passive de trésorerie par inertie dans l'indexation de baux complexes et décalages entre la revalorisation des entrepôts industriels et le taux de capitalisation réel.",
      },
      {
        code: '09',
        category: "HÔTELLERIE, RETAIL ET OPEX D'ENTREPRISE",
        title: 'Surface Opérationnelle et Baux Commerciaux',
        description:
          "Cartographie économétrique de la densité d'occupation au mètre carré dans les grandes chaînes hôtelières, immobilières et de retail. Correction des désuétudes contractuelles et valorisations cadastrales qui gonflent le poste Autres Charges d'Exploitation.",
      },
      {
        code: '10',
        category: 'TRADING DE MATIÈRES PREMIÈRES',
        title: 'Règlement de Dérivés, Couvertures et Contango',
        description:
          "Détection des frictions dans l'arbitrage des matières premières, coûts cachés de stockage et de financement collatéral (margin calls), et décalages de règlement dans les instruments de couverture de change et de prix de marché.",
      },
      {
        code: '11',
        category: 'INFRASTRUCTURES ET CONCESSIONS ADMINISTRATIVES',
        title: 'Péages Fictifs, Revalorisations et Secteur Public',
        description:
          "Identification des décalages d'indexation dans les contrats de concession à long terme, retards de paiement non réclamés auprès des organismes publics de règlement et asymétries de redevance d'exploitation dans les infrastructures sous gestion privée.",
      },
      {
        code: '12',
        category: 'MULTI-DEVISES ET PRIX DE TRANSFERT',
        title: 'Décalage de Change et Inertie Réglementaire Transfrontalière',
        description:
          "Identification des asymétries temporelles dans le règlement multi-devises, amortissement des frictions dans le commerce intracommunautaire et désajustements des prix de transfert intragroupe entre maisons mères et filiales.",
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
    badge: '[ EXOGENE INFERENZARCHITEKTUR — NULL SYSTEMEINGRIFF ]',
    mainTitle: 'Kartografie Struktureller Leckagen und EBITDA-Asymmetrien',
    subtitle:
      'Exogene ökonometrische Interzeption an transaktionalen Hochreibungsfronten. Wir lokalisieren und neutralisieren den stillen Verfall der konsolidierten Marge in Großkonzernen und Fonds ohne Zugangsdaten, ohne IT-Integration und ohne Zugriff auf interne ERP-Systeme.',
    vectors: [
      {
        code: '01',
        category: 'BANKEN, FINTECH UND GAMING-PLATTFORMEN',
        title: 'Souveräner Float, Clearing und grenzüberschreitende Intermediation',
        description:
          'Interzeption der Entführung von Unternehmens- und konzerninterner Liquidität (Float Hijacking) an interbankären Abwicklungsknoten, Mikroreibungen in Zahlungs-Gateways mit hohem Volumen, Währungsumrechnungsspreads und Fehlanpassungen beim Treasury-Transfer zwischen Tochter- und Muttergesellschaften.',
      },
      {
        code: '02',
        category: 'PHARMAINDUSTRIE, BIOTECH UND GESUNDHEIT',
        title: 'Lizenzgebühren, Patente und ultrakritische Rückverfolgbarkeit',
        description:
          'Isolierung grenzüberschreitender Einbehalte bei der Abwicklung von Patenten, Lizenzgebühren und Technologietransfers. Erkennung nicht zugeordneter Schwundmengen in der ultrakritischen Kühlkette (APIs, Biologika und Impfstoffe) und Korrektur von Asymmetrien bei Rabatten und Boni im pharmazeutischen Großhandel.',
      },
      {
        code: '03',
        category: 'LOW-COST-KRAFTSTOFF- UND ENERGIENETZE',
        title: 'Kraftstoff-Retail, Raffination und PPA-Absicherung',
        description:
          'Margenprüfung in Low-Cost-Tankstellennetzen und Kraftstoffverteilern. Isolierung von Erosionen in PPA-Verträgen, fehlerhafte Indexierung des Großhandelspreises, Grundlast-Volatilität und Gebühren an der automatisierten Zapfsäule.',
      },
      {
        code: '04',
        category: 'M&A, PRIVATE EQUITY UND UNTERNEHMENSVERKAUF',
        title: 'Exogene M&A-Prüfung und Anpassung des realen EBITDA',
        description:
          'Identifizierung von Eventualverbindlichkeiten und bilanziellen Erosionen, die in traditionellen Prüfungen vor dem Unternehmensverkauf nicht aufgedeckt wurden. Exogene Neuberechnung des realen EBITDA und Feinabstimmung der Nettofinanzverschuldung vor Abschluss der SPA-Verträge.',
      },
      {
        code: '05',
        category: 'MULTIMODALE SUPPLY CHAIN UND KÜHLKETTE',
        title: 'Hochdichte Lieferketten und Frachten',
        description:
          'Exogenes Tracking von Transitzeiten und stochastischen Schwankungen bei See-, Luft- und Landfrachten. Identifizierung nicht kompensierter Schwundmengen bei der Lagerung (temperaturgeführt und Umgebung) und Mehrkosten durch Hafenliegegelder (Demurrage).',
      },
      {
        code: '06',
        category: 'OPERATIVE REIBUNG E-CMR, ZOLL UND HÄFEN',
        title: 'Grenzüberschreitende Transaktionen und analoge Frachten',
        description:
          'Exogene Prüfung von Abweichungen bei der analogen Frachtvergabe, administrativen Verzögerungen bei der Lieferbestätigung durch fehlende digitale e-CMR-Integration an Grenzen und Bewertungsinkohärenzen an Zoll- und Hafenterminals.',
      },
      {
        code: '07',
        category: 'ALGORITHMISCHE HALLUZINATION UND KI (XSPAM.AI)',
        title: 'Prüfung von Vorhersagemodellen und Rauschen in der C-Suite',
        description:
          'Exogene Bewertung über xspam.ai von unternehmerischen KI-Modellen zur Neutralisierung linearer Halluzinationen, die zu fehlerhaften Überbestellungsentscheidungen, Verzerrungen der prognostizierten Nachfrage und direkten EBITDA-Verlusten führen.',
      },
      {
        code: '08',
        category: 'LOGISTIK-IMMOBILIEN UND SOCIMI',
        title: 'Extraktive Mieten, EPRA-Renditen und Bodenbewertung',
        description:
          'Forensische Zerlegung von GAV, GRI und EPRA-Renditen. Isolierung der passiven Bargeldextraktion durch Trägheit bei der Indexierung komplexer Mietverträge und Fehlanpassungen zwischen der Neubewertung von Industriehallen und dem realen Kapitalisierungssatz.',
      },
      {
        code: '09',
        category: 'HOSPITALITY, RETAIL UND UNTERNEHMENS-OPEX',
        title: 'Betriebsfläche und Gewerbemietverträge',
        description:
          'Ökonometrische Kartierung der Belegungsdichte pro Quadratmeter in großen Hotelketten, Immobilien und Retail. Korrektur vertraglicher Veralterung und katasterlicher Bewertungen, die den Posten Sonstige Betriebsaufwendungen aufblähen.',
      },
      {
        code: '10',
        category: 'ROHSTOFFHANDEL UND COMMODITIES',
        title: 'Derivate-Abwicklung, Absicherungen und Contango',
        description:
          'Erkennung von Reibungen im Rohstoffarbitrage, versteckten Lager- und Sicherheitenfinanzierungskosten (Margin Calls) und Abwicklungs-Fehlanpassungen bei Währungs- und Marktpreis-Absicherungsinstrumenten.',
      },
      {
        code: '11',
        category: 'INFRASTRUKTUR UND VERWALTUNGSKONZESSIONEN',
        title: 'Schattenmauten, Neubewertungen und öffentlicher Sektor',
        description:
          'Identifizierung von Indexierungs-Fehlanpassungen in langfristigen Konzessionsverträgen, nicht geltend gemachten Zahlungsverzögerungen bei öffentlichen Abwicklungsstellen und Asymmetrien der Betriebsgebühr in Infrastrukturen unter privater Verwaltung.',
      },
      {
        code: '12',
        category: 'MEHRWÄHRUNGS- UND VERRECHNUNGSPREISE',
        title: 'Währungs-Fehlanpassung und grenzüberschreitende regulatorische Trägheit',
        description:
          'Identifizierung zeitlicher Asymmetrien bei der Mehrwährungsabwicklung, Dämpfung von Reibungen im innergemeinschaftlichen Handel und Fehlausrichtungen bei konzerninternen Verrechnungspreisen zwischen Mutter- und Tochtergesellschaften.',
      },
    ],
    footer: {
      signatures: 'CGVV - CEO - MD | DSR - CAAO',
      universalClause:
        'Wir garantieren Null-Invasion (Zero Operational Footprint) und arbeiten ausschließlich mit exogenen Daten unter dem strengen Schutz des Gesetzes 1/2019 über Geschäftsgeheimnisse.',
      iae: 'STEUERREGISTERCODE: IAE 1-8431',
      cnae: 'NATIONALE KLASSIFIKATION: CNAE 7020-7022',
      copyright: 'LUXE VELA PRIVE STRATEGIC CONSULTING SL © 2026',
    },
  },
}

export function ServiciosSection({ lang }: { lang: Lang }) {
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

      {/* Rejilla de los 12 Vectores Operativos */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px border bg-white/[0.04]" style={{ borderColor: `${GOLD}22` }}>
        {data.vectors.map((v) => (
          <article
            key={v.code}
            className="group relative flex flex-col gap-4 bg-[#141414] px-8 py-9 transition-colors duration-300 hover:bg-[#181613]"
          >
            {/* Índice + categoría */}
            <div className="flex items-center gap-3">
              <span
                className="font-mono text-4xl sm:text-5xl font-light leading-none tabular-nums"
                style={{ color: GOLD }}
              >
                {v.code}
              </span>
              <span
                aria-hidden="true"
                className="h-px flex-1"
                style={{ backgroundColor: `${EMERALD}55` }}
              />
            </div>
            <span
              className="font-mono text-[11px] uppercase tracking-[0.22em] leading-relaxed"
              style={{ color: EMERALD }}
            >
              {v.category}
            </span>
            <h2 className="text-xl font-semibold leading-snug tracking-wide text-white text-pretty">
              {v.title}
            </h2>
            <p className="text-base leading-relaxed font-light text-gray-400 text-pretty">
              {v.description}
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
          <span style={{ color: `${EMERALD}` }}>{data.footer.iae}</span>
          <span className="sm:text-center" style={{ color: EMERALD }}>
            {data.footer.cnae}
          </span>
          <span className="sm:text-right text-gray-500">
            {data.footer.copyright}
          </span>
        </div>
      </div>
    </div>
  )
}
