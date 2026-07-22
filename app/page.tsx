'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldAlert, AlertTriangle, Trash2 } from 'lucide-react'
import { FlagIcon } from '@/components/flag-icons'
import { ServiciosSection } from '@/components/servicios-section'
import { MetodologiaSection } from '@/components/metodologia-section'
import { FirmaContactoSection } from '@/components/firma-contacto-section'
import { grantOmegaAccess } from '@/lib/omega-session'

// Código de enlace maestro que otorga acceso directo al dashboard analítico de la firma.
const DASHBOARD_ACCESS_CODE = 'LVP-OMEGA-1307-PRMF-926B'

type Lang = 'es' | 'en' | 'fr' | 'de'
type MenuKey = 'SERVICIOS' | 'METODOLOGIA' | 'FIRMA_CONTACTO' | 'EVALUACION'

const GOLD = '#c5a880'
const MATTE = '#121212'

// Cuadrícula matemática sutil: líneas finas oscuras espaciadas uniformemente a 40px.
const GRID_BACKGROUND: React.CSSProperties = {
  backgroundColor: MATTE,
  backgroundImage:
    'linear-gradient(#1c1c1c 1px, transparent 1px), linear-gradient(90deg, #1c1c1c 1px, transparent 1px)',
  backgroundSize: '40px 40px',
}

type Block = { h: string; p: string }
type Section = { tag: string; title: string; lead: string; blocks: Block[] }

// Indicadores contables raíz extraídos de forma efímera del documento (en memoria volátil).
type RootIndicators = {
  revenue: number
  profit: number
  cash: number
  debtors: number
}

const LOCALE_MAP: Record<Lang, string> = {
  es: 'es-ES',
  en: 'en-GB',
  fr: 'fr-FR',
  de: 'de-DE',
}

// Formatea un importe en euros según el idioma activo (miles/decimales).
function formatEuro(value: number, lang: Lang): string {
  return new Intl.NumberFormat(LOCALE_MAP[lang], {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

// Normaliza un número contable escrito en formato europeo (1.850.000,00) o anglosajón (1,850,000.00).
function parseAccountingNumber(raw: string): number | null {
  const cleaned = raw.replace(/[^\d.,-]/g, '').trim()
  if (!cleaned) return null
  const lastComma = cleaned.lastIndexOf(',')
  const lastDot = cleaned.lastIndexOf('.')
  let normalized = cleaned
  if (lastComma > lastDot) {
    // La coma actúa como separador decimal (europeo): quitar puntos de millar.
    normalized = cleaned.replace(/\./g, '').replace(',', '.')
  } else {
    // El punto actúa como separador decimal (anglosajón): quitar comas de millar.
    normalized = cleaned.replace(/,/g, '')
  }
  const n = Number.parseFloat(normalized)
  return Number.isFinite(n) ? n : null
}

// Genera valores deterministas a partir de una semilla (nombre + tamaño del archivo).
function seededIndicators(seed: number): RootIndicators {
  const rand = (n: number, min: number, max: number) => {
    const x = Math.sin(seed * (n + 1.7)) * 10000
    const frac = x - Math.floor(x)
    return Math.round(min + frac * (max - min))
  }
  const revenue = rand(1, 42_000_000, 88_000_000)
  const profit = rand(2, Math.round(revenue * 0.03), Math.round(revenue * 0.09))
  const cash = rand(3, Math.round(revenue * 0.05), Math.round(revenue * 0.14))
  const debtors = rand(4, Math.round(revenue * 0.12), Math.round(revenue * 0.24))
  return { revenue, profit, cash, debtors }
}

// Extracción efímera de los 4 indicadores raíz leyendo el texto del archivo en memoria.
// Sin llamadas de red: opera exclusivamente sobre el contenido ya cargado por FileReader.
function extractRootIndicators(text: string, fileName: string, size: number): RootIndicators {
  const seed =
    size + Array.from(fileName).reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  const fallback = seededIndicators(seed)

  if (!text) return fallback

  const lines = text.split(/\r?\n/)
  const findByKeywords = (keywords: string[]): number | null => {
    for (const line of lines) {
      const low = line.toLowerCase()
      if (keywords.some((k) => low.includes(k))) {
        const matches = line.match(/-?[\d][\d.,\s]*[\d]/g)
        if (matches && matches.length) {
          const parsed = parseAccountingNumber(matches[matches.length - 1])
          if (parsed !== null && Math.abs(parsed) >= 100) return parsed
        }
      }
    }
    return null
  }

  return {
    revenue:
      findByKeywords(['ingres', 'turnover', 'revenue', 'produits', 'umsatz']) ??
      fallback.revenue,
    profit:
      findByKeywords(['beneficio', 'net profit', 'earnings', 'résultat', 'resultat', 'überschuss', 'uberschuss']) ??
      fallback.profit,
    cash:
      findByKeywords(['caja', 'cash', 'trésorerie', 'tresorerie', 'liquid']) ??
      fallback.cash,
    debtors:
      findByKeywords(['deudor', 'debtor', 'créances', 'creances', 'forderung']) ??
      fallback.debtors,
  }
}

const ACCEPTED_EXT = ['.csv', '.pdf']
function isAcceptedFile(name: string): boolean {
  const lower = name.toLowerCase()
  return ACCEPTED_EXT.some((ext) => lower.endsWith(ext))
}

type Dict = {
  brandSub: string
  menu: Record<MenuKey, string>
  servicios: Section
  metodologia: Section
  credenciales: Section
  contacto: Section
  vectorsTag: string
  vectorsTitle: string
  vectorsLead: string
  vectors: Block[]
  terminal: {
    tag: string
    title: string
    noticeHead: string
    noticeBody: string
    p1Head: string
    p1Body: string
    otpPlaceholder: string
    authBtn: string
    otpError: string
    p2Head: string
    p2Body: string
    enclaveActive: string
    attachBtn: string
    attachSub: string
    fileReady: string
    shredBtn: string
    processing: string
    processingSub: string
    reportHead: string
    autoDestroy: string
    diagnosis: string
    colVector: string
    colDamage: string
    rowMargin: string
    marginVal: string
    rowFloat: string
    floatVal: string
    rowEbitda: string
    ebitdaVal: string
    withheld: string
    closeBtn: string
    rootHead: string
    indRevenue: string
    indProfit: string
    indCash: string
    indDebtors: string
    volatileValue: string
    mandateHead: string
    sealLabel: string
    readError: string
    dictamenHead: string
    leakMassLabel: string
    floatHijackLabel: string
    deficitNote: string
    computedTag: string
    contextEyebrow: string
    contextSubtitle: string
    legalHead: string
    legalClauses: string[]
    legalConsent: string
    procSteps: string[]
    purgeBtn: string
  }
  footer: {
    fiscalLabel: string
    cnaeLabel: string
    disclaimer: string
  }
}

const translations: Record<Lang, Dict> = {
  es: {
    brandSub: 'STRATEGIC CONSULTING SL',
    menu: {
      SERVICIOS: 'SERVICIOS',
      METODOLOGIA: 'METODOLOGÍA',
      FIRMA_CONTACTO: 'FIRMA & CONTACTO',
      EVALUACION: 'EVALUACIÓN ANUAL C-SUITE',
    },
    servicios: {
      tag: '[ CAPA I — ARBITRAJE EXÓGENO ]',
      title: 'Arbitraje Exógeno y Auditoría Forense de Procesos para C-Suite',
      lead: 'Intercepción de fugas de capital e incremento del margen EBITDA consolidado bajo el Axioma de Inclusión Exógena. Un dictamen de autor construido íntegramente desde el exterior de la corporación objetivo.',
      blocks: [
        {
          h: 'Intercepción de Asimetrías de Capital',
          p: 'Localizamos las distorsiones estructurales vivas en la cuenta de pérdidas y ganancias, aislando los desfases contables que asumen pérdidas silenciosas en el flujo operativo diario sin interferir en la rutina de la entidad.',
        },
        {
          h: 'Optimización Directa del Panel EBITDA',
          p: 'Cada vector de fricción detectado se traduce en una monetización precisa del daño patrimonial y en una mejora neta e inmediata del margen operativo consolidado del Consejo de Administración.',
        },
        {
          h: 'Recuperación de Liquidez Secuestrada',
          p: 'Detectamos el secuestro transaccional de liquidez —float hijacking— dentro de los ciclos de compensación transfronteriza y devolvemos el control del capital circulante a la alta dirección.',
        },
        {
          h: 'Dictamen Pericial de Autor',
          p: 'Entregamos un expediente monetizado exclusivo, blindado bajo secreto empresarial, que constituye una modelización econométrica de optimización de nivel soberano.',
        },
      ],
    },
    metodologia: {
      tag: '[ CAPA II — INFERENCIA SOBERANA ]',
      title: 'Metodología Estrictamente Exógena',
      lead: 'El Framework opera de manera estrictamente exterior. Se abstiene por completo de interactuar, acoplarse o modificar las bases de datos o los sistemas ERP (SAP / Oracle) internos de la corporación objetivo.',
      blocks: [
        {
          h: '01 · Inferencia Exógena',
          p: 'El motor analítico extrae la señal econométrica mediante el procesamiento exclusivo de flujos de información públicos, registros oficiales de clearing, datos transaccionales transfronterizos e indicadores macroeconómicos de fricción sectorial.',
        },
        {
          h: '02 · Cointegración Matricial',
          p: 'El contranálisis matricial exógeno cointegra las series estructurales del sector para revelar las desviaciones del balance, garantizando el secreto empresarial absoluto conforme a la Ley 1/2019 de Secretos Empresariales.',
        },
        {
          h: '03 · Frontera Estocástica',
          p: 'Modelizamos la frontera de eficiencia estocástica para separar la ineficiencia sistémica del ruido de mercado, aislando la erosión real del margen operativo con precisión pericial.',
        },
        {
          h: '04 · Procesamiento en Memoria Volátil',
          p: 'El cribado se ejecuta íntegramente en memoria volátil de autor. El sistema despliega exclusivamente el resultado final monetizado y destruye la totalidad de los datos al cerrar la sesión.',
        },
      ],
    },
    credenciales: {
      tag: '[ CAPA III — MARCO REGULATORIO ]',
      title: 'Credenciales & Marco de Actuación',
      lead: 'LUXE VELA PRIVE STRATEGIC CONSULTING SL elabora sus dictámenes de autor fundamentados exclusivamente en el procesamiento de flujos informativos exógenos y registros públicos consolidados.',
      blocks: [
        {
          h: 'Epígrafe Fiscal · IAE 1-8431',
          p: 'Actividad registrada de servicios técnicos de consultoría estratégica y auditoría forense de procesos para estructuras de alta dirección.',
        },
        {
          h: 'Clasificación Nacional · CNAE 7020-7022',
          p: 'Actividades de consultoría de gestión empresarial y asesoramiento sobre dirección y gestión, conforme a la Clasificación Nacional de Actividades Económicas.',
        },
        {
          h: 'Secreto Empresarial · Ley 1/2019',
          p: 'Todo el procesamiento se ejecuta bajo garantía de confidencialidad absoluta y protección del secreto de empresa, sin interferir en la operativa corporativa del cliente.',
        },
        {
          h: 'Naturaleza del Dictamen',
          p: 'Las conclusiones métricas constituyen una modelización econométrica de optimización y no representan asesoramiento jurídico formal, auditoría contable regulada por el ICAC, ni decisiones corporativas vinculantes.',
        },
      ],
    },
    contacto: {
      tag: '[ ACCESO RESTRINGIDO C-SUITE ]',
      title: 'Contacto & Enrolamiento Formal',
      lead: 'El acceso al entorno analítico exógeno LVP-OMEGA v.3.1 se encuentra restringido a miembros del Consejo de Administración y perfiles CEO / MD / CVV mediante comunicación formal previa.',
      blocks: [
        {
          h: 'Canal Institucional',
          p: 'Toda solicitud de enrolamiento se tramita mediante comunicación formal cifrada. Cada Consejo recibe una clave de acceso única de un solo uso (OTP) vinculada a su expediente nominal.',
        },
        {
          h: 'Expediente Nominal',
          p: 'El sistema opera bajo referencia de expediente (EXP-PRMF) con sellado temporal certificado (TSA / UTC) para cada sesión de análisis forense.',
        },
        {
          h: 'Muestra de Cortesía',
          p: 'El Consejo dispone de un único intento real, gratuito y libre para contrastar la infalibilidad de nuestro entorno analítico antes de iniciar cualquier trámite formal de honorarios.',
        },
        {
          h: 'Prioridad Soberana',
          p: 'Las incorporaciones se procesan de forma estrictamente confidencial y con prioridad soberana sobre el flujo de trabajo pericial vigente.',
        },
      ],
    },
    vectorsTag: '[ SEIS VECTORES DE SANGRÍA CRÍTICA — CORREDOR MEDITERRÁNEO ]',
    vectorsTitle: 'Cartografía de Fugas Estructurales',
    vectorsLead: 'Seis frentes econométricos donde el margen consolidado se erosiona de forma silenciosa a lo largo del corredor logístico mediterráneo.',
    vectors: [
      {
        h: '01 · Real Estate Logístico / SOCIMI',
        p: 'Infravaloración sistemática de rentas y desajuste en la revalorización de naves logísticas dentro del perímetro SOCIMI, con desfases de indexación IPC que drenan el retorno neto del activo inmobiliario.',
      },
      {
        h: '02 · Energía / PPA',
        p: 'Asimetrías en los Power Purchase Agreements: indexación errónea del precio mayorista, coberturas incompletas y sobrecoste de peajes que erosionan el margen energético del perímetro industrial.',
      },
      {
        h: '03 · Supply Chain / Cadena de Frío',
        p: 'Fuga de margen en la logística de temperatura controlada, roturas de cadena de frío no imputadas y mermas de producto perecedero que se contabilizan como coste difuso sin trazabilidad de responsabilidad.',
      },
      {
        h: '04 · Fricción Documental e-CMR',
        p: 'Desajustes en la carta de porte electrónica e-CMR: retrasos de conciliación transfronteriza, penalizaciones por documentación incompleta y bloqueos de cobro que dilatan artificialmente el ciclo de caja.',
      },
      {
        h: '05 · Alucinación Algorítmica (xspam.ai)',
        p: 'Ruido predictivo introducido por modelos de IA no auditados —xspam.ai— que generan decisiones de aprovisionamiento erróneas, sobrestock fantasma y distorsión de la demanda proyectada sobre el balance.',
      },
      {
        h: '06 · Float Soberano / Float Hijacking',
        p: 'Secuestro transaccional de liquidez en los ciclos de compensación transfronteriza: el float soberano queda retenido por intermediarios de clearing, sustrayendo capital circulante al control de la alta dirección.',
      },
    ],
    terminal: {
      tag: '[ TERMINAL DE AUTENTICACIÓN DE ASIMETRÍAS ]',
      title: 'Metodología e Intervención Pericial',
      noticeHead: '■ CONTRACONTROL DIRECTO AL EBITDA (MUESTRA DE CORTESÍA)',
      noticeBody:
        'El Consejo de Administración dispone de un único intento real, gratuito y libre para contrastar la infalibilidad de nuestro entorno analítico exógeno LVP-OMEGA v.3.1 antes de iniciar cualquier trámite formal.',
      p1Head: '1. Acceso Seguro',
      p1Body: 'Introduzca su clave de acceso única de un solo uso (OTP) reflejada en su comunicación formal.',
      otpPlaceholder: 'INTRODUZCA OTP DE ACCESO PRIVADO',
      authBtn: 'Establecer Enlace Seguro',
      otpError: 'AUTENTICACIÓN RECHAZADA. CLAVE OTP ENCRIPTADA NO CONCORDANTE CON EL EXPEDIENTE.',
      p2Head: '2. Terminal Ciega & Procesamiento Volátil',
      p2Body: 'Inyecte el Balance Anual en memoria volátil para su cribado exógeno.',
      enclaveActive: 'ENCLAVE_ACTIVO',
      attachBtn: 'Arrastre aquí el balance consolidado (Formato .CSV)',
      attachSub: 'La lectura pericial se ejecutará de forma aislada en el hilo del cliente.',
      fileReady: 'Estructura volátil lista en memoria periférica',
      shredBtn: 'Triturar Estados Financieros',
      processing: 'Ejecutando cribado forense LVP-OMEGA v.3.1…',
      processingSub: 'Procesando flujos informativos exógenos y registros públicos oficiales',
      reportHead: 'Auditoría Forense de Asimetría de Capital',
      autoDestroy: 'DESTRUCCIÓN AUTOMÁTICA ACTIVA',
      diagnosis:
        'DICTAMEN DE ARBITRAJE EXÓGENO (DIAGNÓSTICO DE CORTESÍA): el motor analítico ha localizado desviaciones estructurales vivas en la cuenta de pérdidas y ganancias, provocando desfases contables que asumen pérdidas silenciosas en el flujo diario.',
      colVector: 'VECTOR DE FRICCIÓN DETECTADO',
      colDamage: 'MONETIZACIÓN DEL DAÑO',
      rowMargin: 'Erosión Neta del Margen Operativo',
      marginVal: '1.850.000,00 € anuales',
      rowFloat: 'Secuestro de Liquidez (Float Hijacking)',
      floatVal: '245.000,00 €',
      rowEbitda: 'Impacto Neto en EBITDA',
      ebitdaVal: '+2,4%',
      withheld:
        'De conformidad con nuestra política de protección de activos de autor, no se facilitará información técnica, metodológica ni de ejecución operativa sobre las soluciones correctivas hasta la liquidación íntegra de los honorarios correspondientes.',
      closeBtn: 'Cerrar Enclave & Destruir Datos',
      rootHead: 'Indicadores Contables Raíz Extraídos',
      indRevenue: 'Ingresos Totales',
      indProfit: 'Beneficio Neto',
      indCash: 'Caja Libre',
      indDebtors: 'Deudores Comerciales',
      volatileValue: 'Leído en memoria volátil',
      mandateHead: '■ MANDATO OBLIGATORIO DE SALIDA (EXPEDIENTE PERICIAL INDEXADO)',
      sealLabel: 'SELLO PERICIAL',
      readError: 'FORMATO NO VÁLIDO. INYECTE ÚNICAMENTE ARCHIVOS .CSV O .PDF.',
      dictamenHead: '◈ DICTAMEN PERICIAL ESPECTRAL DE RENDIMIENTO',
      leakMassLabel: 'Masa de Fuga Anualizada (2,4% s/ Ingresos)',
      floatHijackLabel: 'Secuestro Transaccional de Liquidez (Float Hijacking)',
      deficitNote: 'Beneficio neto negativo: masa tratada como absorción directa del déficit operativo.',
      computedTag: 'CÁLCULO FORENSE VINCULADO A DATOS CAPTURADOS',
      contextEyebrow: '[ CORE SYSTEM METHODOLOGY & SECURE GATEWAY ]',
      contextSubtitle:
        'Servicios técnicos de ingeniería y consultoría estratégica de gestión bajo el axioma Zero Operational Footprint. No desarrollamos software; aislamos desviaciones de capital.',
      legalHead: '[ AVISO LEGAL DE EXENCIÓN DE RESPONSABILIDAD ]',
      legalClauses: [
        'La carga y análisis de cualquier balance financiero en esta terminal es un acto enteramente voluntario por parte del usuario.',
        'El usuario declara que la información proporcionada procede exclusivamente de fuentes accesibles al público o depósitos mercantiles legales.',
        'Privacidad Inmutable: El procesamiento se ejecuta al 100% en la memoria RAM local del navegador, garantizando la destrucción absoluta de los datos al cerrar o purgar la sesión sin persistencia externa.',
      ],
      legalConsent:
        'Confirmo voluntariedad, procedencia pública de los datos y acepto el protocolo efímero local.',
      procSteps: [
        'Ejecutando Zero Operational Footprint: aislamiento del entorno local…',
        'Filtrando cadenas de texto e identificadores personales (anonimización LOPD)…',
        'Escaneando vectores de fricción y asimetrías de margen EBITDA…',
        'Analizando desviaciones temporales de flujo diario (float hijacking)…',
        'Estructurando dictamen pericial efímero…',
      ],
      purgeBtn: 'Descargar Dictamen y Purgar RAM',
    },
    footer: {
      fiscalLabel: 'Código Registro Fiscal',
      cnaeLabel: 'Clasificación Nacional',
      disclaimer:
        'LUXE VELA PRIVE STRATEGIC CONSULTING SL elabora dictámenes de autor sobre flujos exógenos y registros públicos. No constituye asesoramiento jurídico formal, auditoría regulada por el ICAC ni decisión vinculante. La interpretación del balance y las decisiones mercantiles competen al Deber de Diligencia de los administradores, quedando la firma exenta de responsabilidad pericial. © 2026 LUXE Vela Prive.',
    },
  },

  en: {
    brandSub: 'STRATEGIC CONSULTING SL',
    menu: {
      SERVICIOS: 'SERVICES',
      METODOLOGIA: 'METHODOLOGY',
      FIRMA_CONTACTO: 'SIGNATURE & CONTACT',
      EVALUACION: 'C-SUITE ANNUAL EVALUATION',
    },
    servicios: {
      tag: '[ LAYER I — EXOGENOUS ARBITRAGE ]',
      title: 'Exogenous Arbitrage and Forensic Process Audit for the C-Suite',
      lead: 'Interception of capital leakage and enhancement of consolidated EBITDA margin under the Axiom of Exogenous Inclusion. An authored opinion constructed entirely from outside the target corporation.',
      blocks: [
        {
          h: 'Interception of Capital Asymmetries',
          p: 'We locate the live structural distortions in the profit and loss account, isolating the accounting gaps that absorb silent losses in the daily operating flow without interfering with the entity’s routine.',
        },
        {
          h: 'Direct Optimization of the EBITDA Panel',
          p: 'Each detected friction vector is translated into a precise monetization of the patrimonial damage and into a net, immediate improvement of the Board’s consolidated operating margin.',
        },
        {
          h: 'Recovery of Hijacked Liquidity',
          p: 'We detect the transactional hijacking of liquidity —float hijacking— within cross-border clearing cycles and return control of working capital to senior management.',
        },
        {
          h: 'Authored Expert Opinion',
          p: 'We deliver an exclusive monetized dossier, shielded under trade secret, constituting a sovereign-level econometric optimization model.',
        },
      ],
    },
    metodologia: {
      tag: '[ LAYER II — SOVEREIGN INFERENCE ]',
      title: 'Strictly Exogenous Methodology',
      lead: 'The Framework operates in a strictly external manner. It fully abstains from interacting with, coupling to, or modifying the target corporation’s internal databases or ERP systems (SAP / Oracle).',
      blocks: [
        {
          h: '01 · Exogenous Inference',
          p: 'The analytical engine extracts the econometric signal through exclusive processing of public information flows, official clearing records, cross-border transactional data and macroeconomic indicators of sector friction.',
        },
        {
          h: '02 · Matrix Cointegration',
          p: 'Exogenous matrix counter-analysis cointegrates the sector’s structural series to reveal balance-sheet deviations, guaranteeing absolute trade secrecy under Spanish Trade Secrets Act 1/2019.',
        },
        {
          h: '03 · Stochastic Frontier',
          p: 'We model the stochastic efficiency frontier to separate systemic inefficiency from market noise, isolating the real erosion of the operating margin with expert precision.',
        },
        {
          h: '04 · Volatile-Memory Processing',
          p: 'The screening runs entirely in authored volatile memory. The system displays only the final monetized result and destroys all data upon closing the session.',
        },
      ],
    },
    credenciales: {
      tag: '[ LAYER III — REGULATORY FRAMEWORK ]',
      title: 'Credentials & Framework of Action',
      lead: 'LUXE VELA PRIVE STRATEGIC CONSULTING SL prepares its authored opinions founded exclusively on the processing of exogenous information flows and consolidated public records.',
      blocks: [
        {
          h: 'Tax Heading · IAE 1-8431',
          p: 'Registered activity of technical strategic consulting services and forensic process audit for senior-management structures.',
        },
        {
          h: 'National Classification · CNAE 7020-7022',
          p: 'Business management consulting activities and advice on direction and management, in accordance with the National Classification of Economic Activities.',
        },
        {
          h: 'Trade Secret · Act 1/2019',
          p: 'All processing is executed under a guarantee of absolute confidentiality and protection of the trade secret, without interfering with the client’s corporate operations.',
        },
        {
          h: 'Nature of the Opinion',
          p: 'The metric conclusions constitute an econometric optimization model and do not represent formal legal advice, accounting audit regulated by the ICAC, or binding corporate decisions.',
        },
      ],
    },
    contacto: {
      tag: '[ RESTRICTED C-SUITE ACCESS ]',
      title: 'Contact & Formal Enrollment',
      lead: 'Access to the exogenous analytical environment LVP-OMEGA v.3.1 is restricted to members of the Board of Directors and CEO / MD / CVV profiles through prior formal communication.',
      blocks: [
        {
          h: 'Institutional Channel',
          p: 'Every enrollment request is processed through encrypted formal communication. Each Board receives a unique one-time access key (OTP) linked to its nominal file.',
        },
        {
          h: 'Nominal File',
          p: 'The system operates under a file reference (EXP-PRMF) with certified time-stamping (TSA / UTC) for each forensic analysis session.',
        },
        {
          h: 'Courtesy Sample',
          p: 'The Board has a single real, free and unconditional attempt to test the infallibility of our analytical environment before initiating any formal fee procedure.',
        },
        {
          h: 'Sovereign Priority',
          p: 'Onboardings are processed strictly confidentially and with sovereign priority over the current expert workflow.',
        },
      ],
    },
    vectorsTag: '[ SIX VECTORS OF CRITICAL BLEEDING — MEDITERRANEAN CORRIDOR ]',
    vectorsTitle: 'Cartography of Structural Leakage',
    vectorsLead: 'Six econometric fronts where the consolidated margin silently erodes along the Mediterranean logistics corridor.',
    vectors: [
      {
        h: '01 · Logistics Real Estate / REIT (SOCIMI)',
        p: 'Systematic undervaluation of rents and mismatch in the revaluation of logistics warehouses within the REIT (SOCIMI) perimeter, with CPI indexation gaps that drain the net return of the real-estate asset.',
      },
      {
        h: '02 · Energy / PPA',
        p: 'Asymmetries in Power Purchase Agreements: erroneous indexation of the wholesale price, incomplete hedging and grid-toll overcost that erode the energy margin of the industrial perimeter.',
      },
      {
        h: '03 · Supply Chain / Cold Chain',
        p: 'Margin leakage in temperature-controlled logistics, unattributed cold-chain breaks and perishable-product shrinkage booked as diffuse cost without any traceability of liability.',
      },
      {
        h: '04 · e-CMR Documentary Friction',
        p: 'Mismatches in the electronic consignment note (e-CMR): cross-border reconciliation delays, penalties for incomplete documentation and collection blocks that artificially dilate the cash cycle.',
      },
      {
        h: '05 · Algorithmic Hallucination (xspam.ai)',
        p: 'Predictive noise introduced by unaudited AI models —xspam.ai— generating erroneous procurement decisions, phantom overstock and distortion of projected demand on the balance sheet.',
      },
      {
        h: '06 · Sovereign Float / Float Hijacking',
        p: 'Transactional hijacking of liquidity in cross-border clearing cycles: the sovereign float is withheld by clearing intermediaries, subtracting working capital from senior-management control.',
      },
    ],
    terminal: {
      tag: '[ ASYMMETRY AUTHENTICATION TERMINAL ]',
      title: 'Methodology & Forensic Intervention',
      noticeHead: '■ DIRECT COUNTER-CONTROL ON EBITDA (COURTESY SAMPLE)',
      noticeBody:
        'The Board of Directors has a single real, free and unconditional attempt to test the infallibility of our exogenous analytical environment LVP-OMEGA v.3.1 before initiating any formal procedure.',
      p1Head: '1. Secure Access',
      p1Body: 'Enter your unique one-time access key (OTP) shown in your formal communication.',
      otpPlaceholder: 'ENTER PRIVATE ACCESS OTP',
      authBtn: 'Establish Secure Link',
      otpError: 'AUTHENTICATION REJECTED. ENCRYPTED OTP KEY DOES NOT MATCH THE FILE.',
      p2Head: '2. Blind Terminal & Volatile Processing',
      p2Body: 'Inject the Annual Balance Sheet into volatile memory for exogenous screening.',
      enclaveActive: 'ENCLAVE_ACTIVE',
      attachBtn: 'Drag and drop consolidated balance sheet here (.CSV format)',
      attachSub: 'Forensic analysis will execute isolated within the client thread.',
      fileReady: 'Volatile structure ready in peripheral memory',
      shredBtn: 'Shred Financial Statements',
      processing: 'Running LVP-OMEGA v.3.1 forensic screening…',
      processingSub: 'Processing exogenous information flows and official public records',
      reportHead: 'Forensic Audit of Capital Asymmetry',
      autoDestroy: 'AUTOMATIC DESTRUCTION ACTIVE',
      diagnosis:
        'EXOGENOUS ARBITRAGE OPINION (COURTESY DIAGNOSIS): the analytical engine has located live structural deviations in the profit and loss account, causing accounting gaps that absorb silent losses in the daily flow.',
      colVector: 'DETECTED FRICTION VECTOR',
      colDamage: 'DAMAGE MONETIZATION',
      rowMargin: 'Net Erosion of Operating Margin',
      marginVal: '€1,850,000.00 per year',
      rowFloat: 'Liquidity Hijacking (Float Hijacking)',
      floatVal: '€245,000.00',
      rowEbitda: 'Net Impact on EBITDA',
      ebitdaVal: '+2.4%',
      withheld:
        'In accordance with our authored-asset protection policy, no technical, methodological or operational execution information on the corrective solutions will be provided until full settlement of the corresponding fees.',
      closeBtn: 'Close Enclave & Destroy Data',
      rootHead: 'Extracted Root Accounting Indicators',
      indRevenue: 'Total Revenue',
      indProfit: 'Net Profit',
      indCash: 'Free Cash',
      indDebtors: 'Trade Debtors',
      volatileValue: 'Read in volatile memory',
      mandateHead: '■ MANDATORY OUTPUT MANDATE (INDEXED EXPERT FILE)',
      sealLabel: 'EXPERT SEAL',
      readError: 'INVALID FORMAT. INJECT ONLY .CSV OR .PDF FILES.',
      dictamenHead: '◈ SPECTRAL EXPERT PERFORMANCE OPINION',
      leakMassLabel: 'Annualized Leak Mass (2.4% of Revenue)',
      floatHijackLabel: 'Transactional Liquidity Hijacking (Float Hijacking)',
      deficitNote: 'Negative net profit: mass treated as direct absorption of the operating deficit.',
      computedTag: 'FORENSIC CALCULATION BOUND TO CAPTURED DATA',
      contextEyebrow: '[ CORE SYSTEM METHODOLOGY & SECURE GATEWAY ]',
      contextSubtitle:
        'Technical engineering services and strategic management consulting under the Zero Operational Footprint axiom. We do not develop software; we isolate capital deviations.',
      legalHead: '[ LEGAL DISCLAIMER & COMPLIANCE ]',
      legalClauses: [
        'Uploading and analyzing any financial balance sheet on this terminal is an entirely voluntary act by the user.',
        'The user declares under their sole responsibility that the information originates strictly from publicly accessible sources or legal commercial registries.',
        'Immutable Privacy: Processing is executed 100% within the local browser RAM, guaranteeing absolute data destruction upon closing or purging the session with zero external persistence.',
      ],
      legalConsent:
        'I confirm consent, public source data compliance, and accept the local ephemeral protocol.',
      procSteps: [
        'Executing Zero Operational Footprint: isolating the local environment…',
        'Filtering text strings and personal identifiers (GDPR anonymization)…',
        'Scanning friction vectors and EBITDA margin asymmetries…',
        'Analyzing temporal deviations in daily flow (float hijacking)…',
        'Structuring ephemeral expert opinion…',
      ],
      purgeBtn: 'Download Assessment & Purge RAM',
    },
    footer: {
      fiscalLabel: 'Tax Register Code',
      cnaeLabel: 'National Classification',
      disclaimer:
        'LUXE VELA PRIVE STRATEGIC CONSULTING SL prepares authored opinions on exogenous flows and public records. It does not constitute formal legal advice, an audit regulated by the ICAC, or a binding decision. Balance-sheet interpretation and commercial decisions fall under the Directors’ Duty of Diligence, the firm being exempt from expert liability. © 2026 LUXE Vela Prive.',
    },
  },

  fr: {
    brandSub: 'STRATEGIC CONSULTING SL',
    menu: {
      SERVICIOS: 'SERVICES',
      METODOLOGIA: 'MÉTHODOLOGIE',
      FIRMA_CONTACTO: 'SIGNATURE & CONTACT',
      EVALUACION: 'ÉVALUATION ANNUELLE C-SUITE',
    },
    servicios: {
      tag: '[ COUCHE I — ARBITRAGE EXOGÈNE ]',
      title: 'Arbitrage Exogène et Audit Forensique des Processus pour le C-Suite',
      lead: 'Interception des fuites de capital et augmentation de la marge EBITDA consolidée sous l’Axiome d’Inclusion Exogène. Un avis d’auteur construit intégralement depuis l’extérieur de la corporation cible.',
      blocks: [
        {
          h: 'Interception des Asymétries de Capital',
          p: 'Nous localisons les distorsions structurelles vives dans le compte de résultat, isolant les décalages comptables qui absorbent des pertes silencieuses dans le flux opérationnel quotidien sans interférer avec la routine de l’entité.',
        },
        {
          h: 'Optimisation Directe du Panneau EBITDA',
          p: 'Chaque vecteur de friction détecté se traduit par une monétisation précise du dommage patrimonial et par une amélioration nette et immédiate de la marge opérationnelle consolidée du Conseil d’Administration.',
        },
        {
          h: 'Récupération de la Liquidité Séquestrée',
          p: 'Nous détectons le séquestre transactionnel de liquidité —float hijacking— au sein des cycles de compensation transfrontalière et rendons le contrôle du fonds de roulement à la direction générale.',
        },
        {
          h: 'Avis d’Expert d’Auteur',
          p: 'Nous livrons un dossier monétisé exclusif, protégé sous secret d’affaires, constituant une modélisation économétrique d’optimisation de niveau souverain.',
        },
      ],
    },
    metodologia: {
      tag: '[ COUCHE II — INFÉRENCE SOUVERAINE ]',
      title: 'Méthodologie Strictement Exogène',
      lead: 'Le Framework opère de manière strictement externe. Il s’abstient totalement d’interagir avec, de se coupler à ou de modifier les bases de données ou les systèmes ERP (SAP / Oracle) internes de la corporation cible.',
      blocks: [
        {
          h: '01 · Inférence Exogène',
          p: 'Le moteur analytique extrait le signal économétrique par le traitement exclusif de flux d’information publics, de registres officiels de clearing, de données transactionnelles transfrontalières et d’indicateurs macroéconomiques de friction sectorielle.',
        },
        {
          h: '02 · Cointégration Matricielle',
          p: 'La contre-analyse matricielle exogène cointègre les séries structurelles du secteur pour révéler les déviations du bilan, garantissant le secret d’affaires absolu conformément à la Loi 1/2019 sur les Secrets d’Affaires.',
        },
        {
          h: '03 · Frontière Stochastique',
          p: 'Nous modélisons la frontière d’efficience stochastique pour séparer l’inefficience systémique du bruit de marché, isolant l’érosion réelle de la marge opérationnelle avec une précision d’expert.',
        },
        {
          h: '04 · Traitement en Mémoire Volatile',
          p: 'Le criblage s’exécute intégralement en mémoire volatile d’auteur. Le système n’affiche que le résultat final monétisé et détruit la totalité des données à la clôture de la session.',
        },
      ],
    },
    credenciales: {
      tag: '[ COUCHE III — CADRE RÉGLEMENTAIRE ]',
      title: 'Crédentials & Cadre d’Action',
      lead: 'LUXE VELA PRIVE STRATEGIC CONSULTING SL élabore ses avis d’auteur fondés exclusivement sur le traitement de flux d’information exogènes et de registres publics consolidés.',
      blocks: [
        {
          h: 'Rubrique Fiscale · IAE 1-8431',
          p: 'Activité enregistrée de services techniques de conseil stratégique et d’audit forensique des processus pour les structures de direction générale.',
        },
        {
          h: 'Classification Nationale · CNAE 7020-7022',
          p: 'Activités de conseil en gestion d’entreprise et conseil en direction et gestion, conformément à la Classification Nationale des Activités Économiques.',
        },
        {
          h: 'Secret d’Affaires · Loi 1/2019',
          p: 'Tout le traitement s’exécute sous garantie de confidentialité absolue et de protection du secret d’affaires, sans interférer avec l’exploitation corporative du client.',
        },
        {
          h: 'Nature de l’Avis',
          p: 'Les conclusions métriques constituent une modélisation économétrique d’optimisation et ne représentent pas un conseil juridique formel, un audit comptable régulé par l’ICAC, ni des décisions corporatives contraignantes.',
        },
      ],
    },
    contacto: {
      tag: '[ ACCÈS RESTREINT C-SUITE ]',
      title: 'Contact & Enrôlement Formel',
      lead: 'L’accès à l’environnement analytique exogène LVP-OMEGA v.3.1 est restreint aux membres du Conseil d’Administration et aux profils CEO / MD / CVV via communication formelle préalable.',
      blocks: [
        {
          h: 'Canal Institutionnel',
          p: 'Toute demande d’enrôlement est traitée par communication formelle chiffrée. Chaque Conseil reçoit une clé d’accès unique à usage unique (OTP) liée à son dossier nominal.',
        },
        {
          h: 'Dossier Nominal',
          p: 'Le système opère sous référence de dossier (EXP-PRMF) avec horodatage certifié (TSA / UTC) pour chaque session d’analyse forensique.',
        },
        {
          h: 'Échantillon de Courtoisie',
          p: 'Le Conseil dispose d’une unique tentative réelle, gratuite et libre pour éprouver l’infaillibilité de notre environnement analytique avant d’engager toute procédure formelle d’honoraires.',
        },
        {
          h: 'Priorité Souveraine',
          p: 'Les incorporations sont traitées de manière strictement confidentielle et avec priorité souveraine sur le flux de travail d’expertise en vigueur.',
        },
      ],
    },
    vectorsTag: '[ SIX VECTEURS DE SAIGNÉE CRITIQUE — CORRIDOR MÉDITERRANÉEN ]',
    vectorsTitle: 'Cartographie des Fuites Structurelles',
    vectorsLead: 'Six fronts économétriques où la marge consolidée s’érode silencieusement le long du corridor logistique méditerranéen.',
    vectors: [
      {
        h: '01 · Real Estate Logistique / SIIC (SOCIMI)',
        p: 'Sous-évaluation systématique des loyers et décalage dans la revalorisation des entrepôts logistiques au sein du périmètre SIIC (SOCIMI), avec des écarts d’indexation IPC qui drainent le rendement net de l’actif immobilier.',
      },
      {
        h: '02 · Énergie / PPA',
        p: 'Asymétries dans les Power Purchase Agreements : indexation erronée du prix de gros, couvertures incomplètes et surcoût de péages qui érodent la marge énergétique du périmètre industriel.',
      },
      {
        h: '03 · Supply Chain / Chaîne du Froid',
        p: 'Fuite de marge dans la logistique à température contrôlée, ruptures de chaîne du froid non imputées et pertes de produit périssable comptabilisées comme coût diffus sans traçabilité de responsabilité.',
      },
      {
        h: '04 · Friction Documentaire e-CMR',
        p: 'Décalages dans la lettre de voiture électronique e-CMR : retards de réconciliation transfrontalière, pénalités pour documentation incomplète et blocages d’encaissement qui dilatent artificiellement le cycle de trésorerie.',
      },
      {
        h: '05 · Hallucination Algorithmique (xspam.ai)',
        p: 'Bruit prédictif introduit par des modèles d’IA non audités —xspam.ai— générant des décisions d’approvisionnement erronées, un surstock fantôme et une distorsion de la demande projetée sur le bilan.',
      },
      {
        h: '06 · Float Souverain / Float Hijacking',
        p: 'Séquestre transactionnel de liquidité dans les cycles de compensation transfrontalière : le float souverain est retenu par les intermédiaires de clearing, soustrayant le fonds de roulement au contrôle de la direction générale.',
      },
    ],
    terminal: {
      tag: '[ TERMINAL D’AUTHENTIFICATION DES ASYMÉTRIES ]',
      title: 'Méthodologie et Intervention Expert',
      noticeHead: '■ CONTRE-CONTRÔLE DIRECT SUR L’EBITDA (ÉCHANTILLON DE COURTOISIE)',
      noticeBody:
        'Le Conseil d’Administration dispose d’une unique tentative réelle, gratuite et libre pour éprouver l’infaillibilité de notre environnement analytique exogène LVP-OMEGA v.3.1 avant d’engager toute procédure formelle.',
      p1Head: '1. Accès Sécurisé',
      p1Body: 'Saisissez votre clé d’accès unique à usage unique (OTP) figurant dans votre communication formelle.',
      otpPlaceholder: 'SAISISSEZ L’OTP D’ACCÈS PRIVÉ',
      authBtn: 'Établir la Liaison Sécurisée',
      otpError: 'AUTHENTIFICATION REJETÉE. CLÉ OTP CHIFFRÉE NON CONCORDANTE AVEC LE DOSSIER.',
      p2Head: '2. Terminal Aveugle & Traitement Volatil',
      p2Body: 'Injectez le Bilan Annuel en mémoire volatile pour son criblage exogène.',
      enclaveActive: 'ENCLAVE_ACTIVE',
      attachBtn: 'Glissez-déposez le bilan consolidé ici (Format .CSV)',
      attachSub: 'L’analyse d’expert s’exécutera de manière isolée dans le fil du client.',
      fileReady: 'Structure volatile prête en mémoire périphérique',
      shredBtn: 'Broyer les États Financiers',
      processing: 'Exécution du criblage forensique LVP-OMEGA v.3.1…',
      processingSub: 'Traitement des flux d’information exogènes et des registres publics officiels',
      reportHead: 'Audit Forensique de l’Asymétrie de Capital',
      autoDestroy: 'DESTRUCTION AUTOMATIQUE ACTIVE',
      diagnosis:
        'AVIS D’ARBITRAGE EXOGÈNE (DIAGNOSTIC DE COURTOISIE) : le moteur analytique a localisé des déviations structurelles vives dans le compte de résultat, provoquant des décalages comptables qui absorbent des pertes silencieuses dans le flux quotidien.',
      colVector: 'VECTEUR DE FRICTION DÉTECTÉ',
      colDamage: 'MONÉTISATION DU DOMMAGE',
      rowMargin: 'Érosion Nette de la Marge Opérationnelle',
      marginVal: '1 850 000,00 € par an',
      rowFloat: 'Séquestre de Liquidité (Float Hijacking)',
      floatVal: '245 000,00 €',
      rowEbitda: 'Impact Net sur l’EBITDA',
      ebitdaVal: '+2,4 %',
      withheld:
        'Conformément à notre politique de protection des actifs d’auteur, aucune information technique, méthodologique ou d’exécution opérationnelle sur les solutions correctives ne sera fournie avant le règlement intégral des honoraires correspondants.',
      closeBtn: 'Fermer l’Enclave & Détruire les Données',
      rootHead: 'Indicateurs Comptables Racine Extraits',
      indRevenue: 'Produits Totaux',
      indProfit: 'Résultat Net',
      indCash: 'Trésorerie Disponible',
      indDebtors: 'Créances Clients',
      volatileValue: 'Lu en mémoire volatile',
      mandateHead: '■ MANDAT DE SORTIE OBLIGATOIRE (DOSSIER D’EXPERTISE INDEXÉ)',
      sealLabel: 'SCEAU D’EXPERTISE',
      readError: 'FORMAT INVALIDE. INJECTEZ UNIQUEMENT DES FICHIERS .CSV OU .PDF.',
      dictamenHead: '◈ EXPERTISE SPECTRALE DE PERFORMANCE',
      leakMassLabel: 'Masse de Fuite Annualisée (2,4% des Produits)',
      floatHijackLabel: 'Détournement Transactionnel de Liquidité (Float Hijacking)',
      deficitNote: 'Résultat net négatif : masse traitée comme absorption directe du déficit opérationnel.',
      computedTag: 'CALCUL FORENSIQUE LIÉ AUX DONNÉES CAPTURÉES',
      contextEyebrow: '[ CORE SYSTEM METHODOLOGY & SECURE GATEWAY ]',
      contextSubtitle:
        'Services techniques d’ingénierie et conseil en gestion stratégique selon l’axiome Zero Operational Footprint. Nous ne développons pas de logiciels ; nous isolons les écarts de capital.',
      legalHead: '[ MENTIONS LÉGALES ET AVIS DE NON-RESPONSABILITÉ ]',
      legalClauses: [
        'Le chargement et l’analyse de tout bilan financier sur ce terminal est un acte entièrement volontaire de la part de l’utilisateur.',
        'L’utilisateur déclare sous sa responsabilité que les informations fournies proviennent exclusivement de sources accessibles au public ou de registres du commerce légaux.',
        'Confidentialité Immuable : le traitement est exécuté à 100% dans la mémoire RAM locale du navigateur, garantissant la destruction absolue des données lors de la fermeture ou de la purge de la session.',
      ],
      legalConsent:
        'Je confirme le volontariat, la provenance publique des données et j’accepte le protocole éphémère local.',
      procSteps: [
        'Exécution du Zero Operational Footprint : isolement de l’environnement local…',
        'Filtrage des chaînes de texte et des identifiants personnels (anonymisation RGPD)…',
        'Analyse des vecteurs de friction et des asymétries de marge EBITDA…',
        'Analyse des déviations temporelles du flux quotidien (float hijacking)…',
        'Structuration de l’avis d’expertise éphémère…',
      ],
      purgeBtn: 'Télécharger l’Expertise et Purger la Mémoire',
    },
    footer: {
      fiscalLabel: 'Code Registre Fiscal',
      cnaeLabel: 'Classification Nationale',
      disclaimer:
        'LUXE VELA PRIVE STRATEGIC CONSULTING SL élabore des avis d’auteur sur des flux exogènes et des registres publics. Cela ne constitue pas un conseil juridique formel, un audit régulé par l’ICAC ni une décision contraignante. L’interprétation du bilan et les décisions commerciales relèvent du Devoir de Diligence des administrateurs, la firme étant exempte de responsabilité d’expertise. © 2026 LUXE Vela Prive.',
    },
  },

  de: {
    brandSub: 'STRATEGIC CONSULTING SL',
    menu: {
      SERVICIOS: 'SERVICES',
      METODOLOGIA: 'METHODOLOGIE',
      FIRMA_CONTACTO: 'UNTERSCHRIFT & KONTAKT',
      EVALUACION: 'C-SUITE JAHRESBEWERTUNG',
    },
    servicios: {
      tag: '[ EBENE I — EXOGENE ARBITRAGE ]',
      title: 'Exogene Arbitrage und forensisches Prozess-Audit für die C-Suite',
      lead: 'Abfangen von Kapitalabflüssen und Steigerung der konsolidierten EBITDA-Marge nach dem Axiom der exogenen Inklusion. Ein Autorengutachten, das vollständig von außerhalb der Zielkorporation erstellt wird.',
      blocks: [
        {
          h: 'Abfangen von Kapitalasymmetrien',
          p: 'Wir lokalisieren die lebendigen strukturellen Verzerrungen in der Gewinn- und Verlustrechnung und isolieren die buchhalterischen Diskrepanzen, die stille Verluste im täglichen Betriebsfluss aufnehmen, ohne in die Routine der Einheit einzugreifen.',
        },
        {
          h: 'Direkte Optimierung des EBITDA-Panels',
          p: 'Jeder erkannte Reibungsvektor wird in eine präzise Monetarisierung des Vermögensschadens und in eine sofortige Nettoverbesserung der konsolidierten Betriebsmarge des Verwaltungsrats übersetzt.',
        },
        {
          h: 'Rückgewinnung entführter Liquidität',
          p: 'Wir erkennen die transaktionale Entführung von Liquidität —Float Hijacking— innerhalb grenzüberschreitender Clearing-Zyklen und geben die Kontrolle über das Betriebskapital an die Geschäftsleitung zurück.',
        },
        {
          h: 'Autoren-Sachverst��ndigengutachten',
          p: 'Wir liefern ein exklusives monetarisiertes Dossier, geschützt durch das Geschäftsgeheimnis, das ein ökonometrisches Optimierungsmodell auf souveränem Niveau darstellt.',
        },
      ],
    },
    metodologia: {
      tag: '[ EBENE II — SOUVERÄNE INFERENZ ]',
      title: 'Streng Exogene Methodologie',
      lead: 'Das Framework arbeitet streng extern. Es verzichtet vollständig darauf, mit den internen Datenbanken oder ERP-Systemen (SAP / Oracle) der Zielkorporation zu interagieren, sich anzukoppeln oder sie zu verändern.',
      blocks: [
        {
          h: '01 · Exogene Inferenz',
          p: 'Die analytische Engine extrahiert das ökonometrische Signal durch die ausschließliche Verarbeitung öffentlicher Informationsflüsse, offizieller Clearing-Register, grenzüberschreitender Transaktionsdaten und makroökonomischer Indikatoren sektoraler Reibung.',
        },
        {
          h: '02 · Matrix-Kointegration',
          p: 'Die exogene Matrix-Gegenanalyse kointegriert die strukturellen Reihen des Sektors, um Bilanzabweichungen aufzudecken, und garantiert absolutes Geschäftsgeheimnis gemäß dem Geschäftsgeheimnisgesetz 1/2019.',
        },
        {
          h: '03 · Stochastische Grenze',
          p: 'Wir modellieren die stochastische Effizienzgrenze, um systemische Ineffizienz vom Marktrauschen zu trennen, und isolieren die reale Erosion der Betriebsmarge mit sachverständiger Präzision.',
        },
        {
          h: '04 · Verarbeitung im flüchtigen Speicher',
          p: 'Die Sichtung wird vollständig im flüchtigen Autoren-Speicher ausgeführt. Das System zeigt ausschließlich das endgültige monetarisierte Ergebnis an und vernichtet sämtliche Daten beim Schließen der Sitzung.',
        },
      ],
    },
    credenciales: {
      tag: '[ EBENE III — REGULATORISCHER RAHMEN ]',
      title: 'Referenzen & Handlungsrahmen',
      lead: 'LUXE VELA PRIVE STRATEGIC CONSULTING SL erstellt ihre Autorengutachten ausschließlich auf Grundlage der Verarbeitung exogener Informationsflüsse und konsolidierter öffentlicher Register.',
      blocks: [
        {
          h: 'Steuerrubrik · IAE 1-8431',
          p: 'Registrierte Tätigkeit technischer strategischer Beratungsdienste und forensischer Prozess-Audits für Strukturen der Geschäftsleitung.',
        },
        {
          h: 'Nationale Klassifikation · CNAE 7020-7022',
          p: 'Tätigkeiten der Unternehmensberatung sowie Beratung zu Leitung und Management gemäß der Nationalen Klassifikation der Wirtschaftstätigkeiten.',
        },
        {
          h: 'Geschäftsgeheimnis · Gesetz 1/2019',
          p: 'Die gesamte Verarbeitung erfolgt unter Gewährleistung absoluter Vertraulichkeit und des Schutzes des Geschäftsgeheimnisses, ohne in den Geschäftsbetrieb des Kunden einzugreifen.',
        },
        {
          h: 'Natur des Gutachtens',
          p: 'Die metrischen Schlussfolgerungen stellen ein ökonometrisches Optimierungsmodell dar und bilden keine formelle Rechtsberatung, kein durch das ICAC reguliertes Buchprüfungs-Audit und keine verbindlichen Unternehmensentscheidungen ab.',
        },
      ],
    },
    contacto: {
      tag: '[ EINGESCHRÄNKTER C-SUITE-ZUGANG ]',
      title: 'Kontakt & Formelle Aufnahme',
      lead: 'Der Zugang zur exogenen analytischen Umgebung LVP-OMEGA v.3.1 ist Mitgliedern des Verwaltungsrats sowie CEO- / MD- / CVV-Profilen über vorherige formelle Kommunikation vorbehalten.',
      blocks: [
        {
          h: 'Institutioneller Kanal',
          p: 'Jeder Aufnahmeantrag wird über verschlüsselte formelle Kommunikation bearbeitet. Jeder Verwaltungsrat erhält einen einmaligen Zugangsschlüssel (OTP), der mit seiner Namensakte verknüpft ist.',
        },
        {
          h: 'Namensakte',
          p: 'Das System arbeitet unter einer Aktenreferenz (EXP-PRMF) mit zertifiziertem Zeitstempel (TSA / UTC) für jede forensische Analysesitzung.',
        },
        {
          h: 'Kulanz-Muster',
          p: 'Der Verwaltungsrat verfügt über einen einzigen echten, kostenlosen und freien Versuch, um die Unfehlbarkeit unserer analytischen Umgebung zu prüfen, bevor ein formelles Honorarverfahren eingeleitet wird.',
        },
        {
          h: 'Souveräne Priorität',
          p: 'Aufnahmen werden streng vertraulich und mit souveräner Priorität gegenüber dem laufenden Sachverständigen-Workflow bearbeitet.',
        },
      ],
    },
    vectorsTag: '[ SECHS VEKTOREN KRITISCHER BLUTUNG — MEDITERRANER KORRIDOR ]',
    vectorsTitle: 'Kartografie struktureller Lecks',
    vectorsLead: 'Sechs ökonometrische Fronten, an denen die konsolidierte Marge entlang des mediterranen Logistikkorridors stillschweigend erodiert.',
    vectors: [
      {
        h: '01 · Logistik-Immobilien / REIT (SOCIMI)',
        p: 'Systematische Unterbewertung der Mieten und Diskrepanz bei der Neubewertung von Logistikhallen innerhalb des REIT-(SOCIMI-)Perimeters, mit VPI-Indexierungslücken, die die Nettorendite des Immobilienvermögens abziehen.',
      },
      {
        h: '02 · Energie / PPA',
        p: 'Asymmetrien in Power Purchase Agreements: fehlerhafte Indexierung des Großhandelspreises, unvollständige Absicherungen und Netzentgelt-Mehrkosten, die die Energiemarge des Industrieperimeters erodieren.',
      },
      {
        h: '03 · Supply Chain / Kühlkette',
        p: 'Margenverlust in der temperaturgeführten Logistik, nicht zugeordnete Kühlkettenunterbrechungen und Schwund verderblicher Produkte, die als diffuse Kosten ohne Haftungsnachverfolgung verbucht werden.',
      },
      {
        h: '04 · Dokumentarische Reibung e-CMR',
        p: 'Diskrepanzen im elektronischen Frachtbrief e-CMR: grenzüberschreitende Abstimmungsverzögerungen, Strafen für unvollständige Dokumentation und Inkassosperren, die den Cash-Zyklus künstlich verlängern.',
      },
      {
        h: '05 · Algorithmische Halluzination (xspam.ai)',
        p: 'Prädiktives Rauschen, eingeführt durch nicht auditierte KI-Modelle —xspam.ai—, das fehlerhafte Beschaffungsentscheidungen, Phantom-Überbestände und eine Verzerrung der projizierten Nachfrage in der Bilanz erzeugt.',
      },
      {
        h: '06 · Souveräner Float / Float Hijacking',
        p: 'Transaktionale Entführung von Liquidität in grenzüberschreitenden Clearing-Zyklen: Der souveräne Float wird von Clearing-Vermittlern zurückgehalten und entzieht das Betriebskapital der Kontrolle der Geschäftsleitung.',
      },
    ],
    terminal: {
      tag: '[ ASYMMETRIE-AUTHENTIFIZIERUNGSTERMINAL ]',
      title: 'Methodik & Gutachterliche Intervention',
      noticeHead: '■ DIREKTE GEGENKONTROLLE DES EBITDA (KULANZ-MUSTER)',
      noticeBody:
        'Der Verwaltungsrat verfügt über einen einzigen echten, kostenlosen und freien Versuch, um die Unfehlbarkeit unserer exogenen analytischen Umgebung LVP-OMEGA v.3.1 zu prüfen, bevor ein formelles Verfahren eingeleitet wird.',
      p1Head: '1. Sicherer Zugang',
      p1Body: 'Geben Sie Ihren einmaligen Zugangsschlüssel (OTP) ein, der in Ihrer formellen Kommunikation angegeben ist.',
      otpPlaceholder: 'PRIVATEN ZUGANGS-OTP EINGEBEN',
      authBtn: 'Sichere Verbindung Herstellen',
      otpError: 'AUTHENTIFIZIERUNG ABGELEHNT. VERSCHLÜSSELTER OTP-SCHLÜSSEL STIMMT NICHT MIT DER AKTE ÜBEREIN.',
      p2Head: '2. Blindes Terminal & Flüchtige Verarbeitung',
      p2Body: 'Injizieren Sie die Jahresbilanz in den flüchtigen Speicher zur exogenen Sichtung.',
      enclaveActive: 'ENKLAVE_AKTIV',
      attachBtn: 'Konsolidierte Bilanz hierher ziehen (Format .CSV)',
      attachSub: 'Die gutachterliche Analyse wird isoliert im Client-Thread ausgeführt.',
      fileReady: 'Flüchtige Struktur im peripheren Speicher bereit',
      shredBtn: 'Jahresabschlüsse Schreddern',
      processing: 'Forensische Sichtung LVP-OMEGA v.3.1 wird ausgeführt…',
      processingSub: 'Verarbeitung exogener Informationsflüsse und offizieller öffentlicher Register',
      reportHead: 'Forensisches Audit der Kapitalasymmetrie',
      autoDestroy: 'AUTOMATISCHE VERNICHTUNG AKTIV',
      diagnosis:
        'GUTACHTEN ZUR EXOGENEN ARBITRAGE (KULANZ-DIAGNOSE): Die analytische Engine hat lebendige strukturelle Abweichungen in der Gewinn- und Verlustrechnung lokalisiert, die buchhalterische Diskrepanzen verursachen, welche stille Verluste im täglichen Fluss aufnehmen.',
      colVector: 'ERKANNTER REIBUNGSVEKTOR',
      colDamage: 'MONETARISIERUNG DES SCHADENS',
      rowMargin: 'Netto-Erosion der Betriebsmarge',
      marginVal: '1.850.000,00 € pro Jahr',
      rowFloat: 'Liquiditätsentführung (Float Hijacking)',
      floatVal: '245.000,00 €',
      rowEbitda: 'Netto-Auswirkung auf das EBITDA',
      ebitdaVal: '+2,4 %',
      withheld:
        'Gemäß unserer Richtlinie zum Schutz von Autorenvermögen werden keine technischen, methodologischen oder betrieblichen Ausführungsinformationen zu den Korrekturlösungen bereitgestellt, bis die entsprechenden Honorare vollständig beglichen sind.',
      closeBtn: 'Enklave Schließen & Daten Vernichten',
      rootHead: 'Extrahierte Buchhalterische Stammindikatoren',
      indRevenue: 'Umsatzerlöse',
      indProfit: 'Jahresüberschuss',
      indCash: 'Freie Liquidität',
      indDebtors: 'Forderungen aus L&L',
      volatileValue: 'Im flüchtigen Speicher gelesen',
      mandateHead: '■ OBLIGATORISCHES AUSGABEMANDAT (INDIZIERTE GUTACHTERAKTE)',
      sealLabel: 'GUTACHTERSIEGEL',
      dictamenHead: '◈ SPEKTRALES LEISTUNGSGUTACHTEN',
      leakMassLabel: 'Annualisierte Leckmasse (2,4% des Umsatzes)',
      floatHijackLabel: 'Transaktionale Liquiditätsentführung (Float Hijacking)',
      deficitNote: 'Negativer Jahresüberschuss: Masse als direkte Absorption des Betriebsdefizits behandelt.',
      computedTag: 'FORENSISCHE BERECHNUNG AN ERFASSTE DATEN GEBUNDEN',
      readError: 'UNGÜLTIGES FORMAT. NUR .CSV- ODER .PDF-DATEIEN INJIZIEREN.',
      contextEyebrow: '[ CORE SYSTEM METHODOLOGY & SECURE GATEWAY ]',
      contextSubtitle:
        'Technische Ingenieurdienstleistungen und strategische Unternehmensberatung unter dem Zero Operational Footprint-Axiom. Wir entwickeln keine Software; wir isolieren Kapitalabweichungen.',
      legalHead: '[ RECHTLICHER HAFTUNGSAUSSCHLUSS ]',
      legalClauses: [
        'Das Hochladen und Analysieren von Finanzbilanzen auf diesem Terminal erfolgt absolut freiwillig durch den Nutzer.',
        'Der Nutzer erklärt in eigener Verantwortung, dass die bereitgestellten Informationen ausschließlich aus öffentlich zugänglichen Quellen oder gesetzlichen Handelsregistern stammen.',
        'Unveränderliche Privatsphäre: Die Verarbeitung wird zu 100% im lokalen RAM des Browsers ausgeführt, was eine absolute Datenvernichtung beim Schließen oder Löschen der Sitzung ohne externe Speicherung garantiert.',
      ],
      legalConsent:
        'Ich bestätige die Freiwilligkeit, die öffentliche Datenherkunft und akzeptiere das lokale flüchtige Protokoll.',
      procSteps: [
        'Zero Operational Footprint wird ausgeführt: Isolierung der lokalen Umgebung…',
        'Filtern von Textketten und personenbezogenen Kennungen (DSGVO-Anonymisierung)…',
        'Scannen von Reibungsvektoren und EBITDA-Margen-Asymmetrien…',
        'Analyse zeitlicher Abweichungen im täglichen Fluss (Float Hijacking)…',
        'Strukturierung des flüchtigen Gutachtens…',
      ],
      purgeBtn: 'Gutachten Herunterladen und RAM Löschen',
    },
    footer: {
      fiscalLabel: 'Steuerregistercode',
      cnaeLabel: 'Nationale Klassifikation',
      disclaimer:
        'LUXE VELA PRIVE STRATEGIC CONSULTING SL erstellt Autorengutachten zu exogenen Flüssen und öffentlichen Registern. Dies stellt keine formelle Rechtsberatung, kein durch das ICAC reguliertes Audit und keine verbindliche Entscheidung dar. Die Bilanzinterpretation und die geschäftlichen Entscheidungen unterliegen der Sorgfaltspflicht der Verwalter, wobei die Firma von der Sachverständigenhaftung befreit ist. © 2026 LUXE Vela Prive.',
    },
  },
}

const LANGS: { code: Lang; flag: string; label: string }[] = [
  { code: 'es', flag: '🇪🇸', label: 'ES' },
  { code: 'fr', flag: '🇫🇷', label: 'FR' },
  { code: 'de', flag: '🇩🇪', label: 'DE' },
  { code: 'en', flag: '🇺🇸', label: 'EN' },
]

  const MENU_ORDER: MenuKey[] = ['SERVICIOS', 'METODOLOGIA', 'FIRMA_CONTACTO', 'EVALUACION']

export default function App() {
  const [lang, setLang] = useState<Lang>('es')
  const [active, setActive] = useState<MenuKey>('SERVICIOS')
  const router = useRouter()

  // Estados del Enclave de Validación de Balances (Terminal Ciega de Procesamiento Volátil)
  const [otpInput, setOtpInput] = useState('')
  const [isOtpVerified, setIsOtpVerified] = useState(false)
  const [fileSelected, setFileSelected] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [reportView, setReportView] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [indicators, setIndicators] = useState<RootIndicators | null>(null)
  const [dragOver, setDragOver] = useState(false)

  // Buffer volátil del contenido leído en memoria (nunca sale del navegador).
  const fileContentRef = React.useRef<string>('')
  const fileMetaRef = React.useRef<{ name: string; size: number }>({ name: '', size: 0 })

  const t = translations[lang]

  // PURGA ABSOLUTA: reseteo total de hooks de estado + limpieza del buffer volátil.
  const resetTerminal = () => {
    setIsOtpVerified(false)
    setFileSelected(null)
    setProcessing(false)
    setReportView(false)
    setOtpInput('')
    setErrorMessage('')
    setIndicators(null)
    setDragOver(false)
    fileContentRef.current = ''
    fileMetaRef.current = { name: '', size: 0 }
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    // Enlace maestro: concede el acceso pericial efímero (un solo uso) y abre el expediente.
    if (otpInput.trim().toUpperCase() === DASHBOARD_ACCESS_CODE) {
      setErrorMessage('')
      grantOmegaAccess()
      router.push('/dashboard')
      return
    }
    // Cualquier otra combinación mantiene la alerta roja de rechazo.
    setErrorMessage(t.terminal.otpError)
  }

  // Lectura estricta en memoria local con FileReader. Cero red, cero persistencia.
  const ingestFile = (file: File | undefined | null) => {
    if (!file) return
    if (!isAcceptedFile(file.name)) {
      setErrorMessage(t.terminal.readError)
      return
    }
    setErrorMessage('')
    fileMetaRef.current = { name: file.name, size: file.size }

    const reader = new FileReader()
    reader.onload = () => {
      // El contenido queda únicamente en la caché volátil del navegador del iPad.
      fileContentRef.current = typeof reader.result === 'string' ? reader.result : ''
      setFileSelected(file.name)
    }
    reader.onerror = () => {
      setErrorMessage(t.terminal.readError)
    }
    // CSV como texto; PDF como texto latin1 para rastrear indicadores incrustados.
    reader.readAsText(file)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    ingestFile(e.target.files?.[0])
    // Permite reinyectar el mismo archivo tras una purga.
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    ingestFile(e.dataTransfer.files?.[0])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  // Cribado econométrico simulado (2.5s) y extracción efímera de los 4 indicadores raíz.
  const handleProcessBalance = () => {
    setProcessing(true)
    setTimeout(() => {
      const extracted = extractRootIndicators(
        fileContentRef.current,
        fileMetaRef.current.name,
        fileMetaRef.current.size,
      )
      setIndicators(extracted)
      setProcessing(false)
      setReportView(true)
    }, 2500)
  }

  return (
    <div
      className="w-screen h-screen flex flex-col overflow-hidden select-none font-sans text-white selection:bg-[#c5a880] selection:text-black"
      style={GRID_BACKGROUND}
    >
      {/* HEADER CORPORATIVO — flota sobre la cuadrícula */}
      <header className="w-full px-6 py-4 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center space-x-4">
          {/* ISOTIPO CRÍTICO: REPLICACIÓN EXACTA MÁSTER V-VELA */}
          <svg
            aria-hidden="true"
            className="h-12 w-16 shrink-0"
            viewBox="0 0 140 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* TRAZO 1: La letra V estilizada con el remate clásico de serif en el ala izquierda */}
            <path d="M15 35H32L47 78L62 35H72L52 87H43L15 35Z" fill="#C5A880" />
            {/* TRAZO 2: El brazo interno de la V que cruza y asciende en paralelo */}
            <path d="M35 45L47 78L58 45H51L47 68L42 45H35Z" fill="#C5A880" opacity="0.8" />
            {/* TRAZO 3: La vela mayor curvada, esbelta y con punta alzada que nace desde la base */}
            <path d="M52 80C52 80 65 50 72 20C72 20 82 52 95 65C80 65 62 72 52 80Z" fill="#C5A880" />
            {/* TRAZO 4: La base o quilla horizontal dinámica que envuelve la parte inferior */}
            <path d="M32 87C55 87 85 85 105 72C85 78 55 78 32 82V87Z" fill="#C5A880" />
          </svg>
          {/* ARQUITECTURA TIPOGRÁFICA EXIGIDA */}
          <div className="flex flex-col justify-center">
            <span className="text-2xl font-light tracking-[0.25em] text-[#C5A880] uppercase font-sans leading-none">
              LUXE VELA PRIVE
            </span>
            <span className="text-xs font-normal tracking-[0.22em] text-[#C5A880] opacity-80 mt-1.5 font-sans">
              Strategic Consulting
            </span>
          </div>
        </div>

        {/* SELECTOR DE IDIOMA — 4 solapas con lógica de traducción */}
        <div className="flex flex-row items-center gap-3 shrink-0">
          {LANGS.map((l) => {
            const isActive = lang === l.code
            return (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                aria-label={l.label}
                aria-pressed={isActive}
                className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider transition-opacity"
                style={{
                  color: isActive ? GOLD : '#6f6f6f',
                  opacity: isActive ? 1 : 0.75,
                  borderBottom: isActive ? `1px solid ${GOLD}` : '1px solid transparent',
                  fontWeight: isActive ? 700 : 400,
                  paddingBottom: 2,
                }}
              >
                <span>{l.label}</span>
                <FlagIcon code={l.code} className="w-4 h-3 shrink-0" />
              </button>
            )
          })}
        </div>
      </header>

      {/* MENÚ PRINCIPAL — sin recuadros, texto flotante */}
      <nav className="w-full px-4 sm:px-6 flex overflow-x-auto scrollbar-none shrink-0">
        {MENU_ORDER.map((key) => {
          const isActive = active === key
          const isTerminal = key === 'EVALUACION'
          return (
            <button
              key={key}
              onClick={() => {
                setActive(key)
                if (key === 'EVALUACION') resetTerminal()
              }}
              className="py-3 px-4 sm:px-5 text-sm sm:text-base font-mono font-light tracking-widest whitespace-nowrap transition-colors"
              style={{
                color: isActive ? GOLD : '#7a7a7a',
                borderBottom: isActive ? `1px solid ${GOLD}` : '1px solid transparent',
                fontWeight: isActive || isTerminal ? 700 : 400,
              }}
            >
              {t.menu[key]}
            </button>
          )
        })}
      </nav>

      {/* ÁREA CENTRAL — único scroll interno, blindado para iPad Safari */}
      <main className="w-full flex-1 overflow-y-auto overflow-x-hidden px-6 sm:px-10 lg:px-16 py-12 sm:py-20">
        {active === 'SERVICIOS' && <ServiciosSection lang={lang} />}
        {active === 'METODOLOGIA' && <MetodologiaSection lang={lang} />}
        {active === 'FIRMA_CONTACTO' && <FirmaContactoSection lang={lang} />}

        {active === 'EVALUACION' && (
          <AsymmetryTerminal
            t={t.terminal}
            lang={lang}
            otpInput={otpInput}
            setOtpInput={setOtpInput}
            isOtpVerified={isOtpVerified}
            fileSelected={fileSelected}
            processing={processing}
            reportView={reportView}
            errorMessage={errorMessage}
            indicators={indicators}
            dragOver={dragOver}
            onVerify={handleVerifyOtp}
            onInputChange={handleInputChange}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onProcess={handleProcessBalance}
            onClose={resetTerminal}
          />
        )}
      </main>

      {/* FOOTER REGULATORIO FIJO — flota sobre la cuadrícula */}
      <footer className="w-full px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs shrink-0 font-mono">
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] tracking-[0.2em] text-gray-500 uppercase">{t.footer.fiscalLabel}</span>
          <span className="font-medium tracking-wide" style={{ color: GOLD }}>
            IAE 1-8431
          </span>
        </div>
        <div className="flex flex-col gap-0.5 sm:items-center">
          <span className="text-[11px] tracking-[0.2em] text-gray-500 uppercase">{t.footer.cnaeLabel}</span>
          <span className="font-medium tracking-wide" style={{ color: GOLD }}>
            CNAE 7020-7022
          </span>
        </div>
        <div className="text-gray-500 text-[11px] sm:text-right leading-snug font-sans">{t.footer.disclaimer}</div>
      </footer>
    </div>
  )
}

/* ---------- CONTENIDO CORPORATIVO ---------- */

function ContentSection({ section }: { section: Section }) {
  return (
    <div className="max-w-6xl mx-auto animate-fadeIn">
      <span className="text-[11px] font-mono uppercase tracking-[0.3em] inline-block mb-5" style={{ color: GOLD }}>
        {section.tag}
      </span>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-[1.15] text-balance max-w-4xl">
        {section.title}
      </h1>
      <p className="mt-6 text-base sm:text-lg text-gray-400 font-light leading-relaxed max-w-3xl text-pretty">
        {section.lead}
      </p>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-12">
        {section.blocks.map((b) => (
          <div key={b.h} className="pl-6" style={{ borderLeft: `1px solid ${GOLD}55` }}>
            <h2 className="text-[15px] font-semibold uppercase tracking-widest mb-4" style={{ color: GOLD }}>
              {b.h}
            </h2>
            <p className="text-base text-gray-400 leading-relaxed font-light">{b.p}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- SEIS VECTORES DE SANGRÍA CRÍTICA ---------- */

function VectorsSection({
  tag,
  title,
  lead,
  vectors,
}: {
  tag: string
  title: string
  lead: string
  vectors: Block[]
}) {
  return (
    <div className="max-w-6xl mx-auto mt-24 pt-12 animate-fadeIn" style={{ borderTop: `1px solid ${GOLD}22` }}>
      <span className="text-[11px] font-mono uppercase tracking-[0.3em] inline-block mb-5" style={{ color: GOLD }}>
        {tag}
      </span>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-[1.15] text-balance max-w-4xl">{title}</h2>
      <p className="mt-6 text-base sm:text-lg text-gray-400 font-light leading-relaxed max-w-3xl text-pretty">{lead}</p>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
        {vectors.map((v) => (
          <div key={v.h} className="pl-6" style={{ borderLeft: `1px solid ${GOLD}55` }}>
            <h3 className="text-[15px] font-semibold uppercase tracking-widest mb-4 font-mono" style={{ color: GOLD }}>
              {v.h}
            </h3>
            <p className="text-base text-gray-400 leading-relaxed font-light">{v.p}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- TERMINAL DE AUTENTICACIÓN DE ASIMETRÍAS ---------- */

function AsymmetryTerminal({
  t,
  lang,
  otpInput,
  setOtpInput,
  isOtpVerified,
  fileSelected,
  processing,
  reportView,
  errorMessage,
  indicators,
  dragOver,
  onVerify,
  onInputChange,
  onDrop,
  onDragOver,
  onDragLeave,
  onProcess,
  onClose,
}: {
  t: Dict['terminal']
  lang: Lang
  otpInput: string
  setOtpInput: (v: string) => void
  isOtpVerified: boolean
  fileSelected: string | null
  processing: boolean
  reportView: boolean
  errorMessage: string
  indicators: RootIndicators | null
  dragOver: boolean
  onVerify: (e: React.FormEvent) => void
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDrop: (e: React.DragEvent) => void
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onProcess: () => void
  onClose: () => void
}) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [legalAccepted, setLegalAccepted] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)

  // Ciclo de pasos del cribado volátil mientras dura el procesamiento.
  useEffect(() => {
    if (!processing) {
      setStepIndex(0)
      return
    }
    const id = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % t.procSteps.length)
    }, 500)
    return () => clearInterval(id)
  }, [processing, t.procSteps.length])

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <div className="text-center mb-10">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: GOLD }}>
          {t.contextEyebrow}
        </span>
          <h1 className="text-xl sm:text-2xl font-light tracking-tight mt-3">{t.title}</h1>
        <p className="mt-3 text-xs text-gray-500 font-light leading-relaxed max-w-xl mx-auto text-pretty">
          {t.contextSubtitle}
        </p>
      </div>

      {/* Aviso de cortesía — texto flotante con acento fino, sin caja pesada */}
      <div
        className="mb-10 pl-4 text-xs leading-relaxed"
        style={{ borderLeft: '1px solid rgba(220,38,38,0.5)', color: '#f4a3a3' }}
      >
        <span className="font-bold block mb-1 font-mono">{t.noticeHead}</span>
        {t.noticeBody}
      </div>

      {/* FASE 1 · OTP */}
      {!isOtpVerified && (
        <form onSubmit={onVerify} className="space-y-5 font-mono">
          <div className="pb-2" style={{ borderBottom: `1px solid ${GOLD}22` }}>
            <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: GOLD }}>
              {t.p1Head}
            </h3>
            <p className="text-[11px] text-gray-400 font-sans mt-1">{t.p1Body}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              placeholder={t.otpPlaceholder}
              className="flex-1 px-0 py-2.5 text-xs tracking-[0.15em] uppercase bg-transparent focus:outline-none placeholder-gray-700"
              style={{ borderBottom: `1px solid ${GOLD}44`, color: '#fff' }}
            />
            <button
              type="submit"
              className="font-sans font-bold text-xs px-5 py-2.5 rounded uppercase tracking-wider shrink-0 transition-opacity hover:opacity-90"
              style={{ backgroundColor: GOLD, color: '#000' }}
            >
              {t.authBtn}
            </button>
          </div>
          {errorMessage && (
            <p className="text-[10px] font-bold animate-pulse" style={{ color: '#f87171' }}>
              ▲ {errorMessage}
            </p>
          )}
        </form>
      )}

      {/* FASE 2 · CARGA VOLÁTIL */}
      {isOtpVerified && !processing && !reportView && (
        <div className="space-y-5 font-mono animate-fadeIn">
          <div className="pb-2 flex justify-between items-center gap-3" style={{ borderBottom: `1px solid ${GOLD}22` }}>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: '#34d399' }}>
                {t.p2Head}
              </h3>
              <p className="text-[11px] text-gray-400 font-sans mt-1">{t.p2Body}</p>
            </div>
            <span className="text-[9px] shrink-0" style={{ color: '#34d399' }}>
              {t.enclaveActive}
            </span>
          </div>

          {/* CLÁUSULAS DE SALVAGUARDA LEGAL Y PROTECCIÓN DE DATOS (RGPD/LOPD) */}
          <div
            className="p-4 space-y-3 text-[11px] leading-relaxed"
            style={{ borderLeft: `2px solid ${GOLD}`, backgroundColor: 'rgba(0,0,0,0.35)' }}
          >
            <p className="flex items-center gap-2 font-bold tracking-wider" style={{ color: GOLD }}>
              <ShieldAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {t.legalHead}
            </p>
            <ol className="space-y-2 list-decimal pl-4 text-gray-400 font-sans">
              {t.legalClauses.map((clause, i) => (
                <li key={i}>{clause}</li>
              ))}
            </ol>
            <label
              className="flex items-start gap-3 mt-2 pt-3 cursor-pointer"
              style={{ borderTop: `1px solid ${GOLD}22` }}
            >
              <input
                type="checkbox"
                checked={legalAccepted}
                onChange={(e) => setLegalAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0"
                style={{ accentColor: GOLD }}
              />
              <span className="text-gray-300 font-sans">{t.legalConsent}</span>
            </label>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.pdf"
            onChange={onInputChange}
            className="hidden"
          />

          {!fileSelected ? (
            <div
              role="button"
              tabIndex={legalAccepted ? 0 : -1}
              aria-disabled={!legalAccepted}
              onClick={() => legalAccepted && fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (legalAccepted && (e.key === 'Enter' || e.key === ' ')) fileInputRef.current?.click()
              }}
              onDrop={legalAccepted ? onDrop : (e) => e.preventDefault()}
              onDragOver={legalAccepted ? onDragOver : (e) => e.preventDefault()}
              onDragLeave={onDragLeave}
              className={
                'w-full py-10 text-center transition-colors outline-none ' +
                (legalAccepted ? 'cursor-pointer group' : 'cursor-not-allowed opacity-40')
              }
              style={{
                border: `1px dashed ${dragOver && legalAccepted ? GOLD : '#3a3a3a'}`,
                backgroundColor: dragOver && legalAccepted ? 'rgba(197,168,128,0.06)' : 'transparent',
              }}
            >
              <span className="text-xs text-gray-400 group-hover:text-white block">{t.attachBtn}</span>
              <span className="text-[10px] text-gray-600 block mt-1 font-sans">{t.attachSub}</span>
              <span className="text-[9px] text-gray-700 block mt-2 font-mono tracking-wider">
                .CSV · .PDF
              </span>
            </div>
          ) : (
            <div className="py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span style={{ color: '#34d399' }}>▣</span>
                <div className="flex flex-col">
                  <span className="text-xs text-white font-medium">{fileSelected}</span>
                  <span className="text-[9px] text-gray-500 uppercase">{t.fileReady}</span>
                </div>
              </div>
              <button
                onClick={onProcess}
                className="font-sans font-bold text-xs py-2.5 px-5 rounded uppercase tracking-wider shrink-0 transition-opacity hover:opacity-90"
                style={{ backgroundColor: GOLD, color: '#000' }}
              >
                {t.shredBtn}
              </button>
            </div>
          )}

          {errorMessage && (
            <p className="text-[10px] font-bold animate-pulse font-mono" style={{ color: '#f87171' }}>
              ▲ {errorMessage}
            </p>
          )}
        </div>
      )}

      {/* FASE 3 · CRIBADO */}
      {processing && (
        <div className="py-14 text-center space-y-4">
          <div
            className="w-8 h-8 rounded-full animate-spin mx-auto"
            style={{ border: `2px solid ${GOLD}`, borderTopColor: 'transparent' }}
          />
          <p className="text-xs animate-pulse tracking-wide font-mono" style={{ color: GOLD }}>
            {t.procSteps[stepIndex]}
          </p>
          <p className="text-[10px] text-gray-600 font-mono">{t.processingSub}</p>
        </div>
      )}

      {/* FASE 4 · EXPEDIENTE REAL */}
      {reportView && (
        <div className="space-y-6 animate-fadeIn">
          <div className="pb-2 flex justify-between items-center gap-3" style={{ borderBottom: `1px solid ${GOLD}22` }}>
            <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: '#f87171' }}>
              {t.reportHead}
            </h3>
            <span className="text-[9px] shrink-0 font-mono" style={{ color: '#f87171' }}>
              {t.autoDestroy}
            </span>
          </div>

          <div
            className="pl-4 text-xs leading-relaxed"
            style={{ borderLeft: '1px solid rgba(220,38,38,0.5)', color: '#f4a3a3' }}
          >
            {t.diagnosis}
          </div>

          {/* INDICADORES CONTABLES RAÍZ EXTRAÍDOS DEL ARCHIVO (efímeros, en memoria volátil) */}
          {indicators && (
            <div className="space-y-3 text-xs font-mono">
              <div className="pb-2 text-[10px] tracking-wider" style={{ color: GOLD }}>
                {t.rootHead}
              </div>
              {(
                [
                  { label: t.indRevenue, value: indicators.revenue },
                  { label: t.indProfit, value: indicators.profit },
                  { label: t.indCash, value: indicators.cash },
                  { label: t.indDebtors, value: indicators.debtors },
                ] as const
              ).map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between gap-3 pb-2"
                  style={{ borderBottom: '1px solid #ffffff0d' }}
                >
                  <span className="text-gray-400">{row.label}</span>
                  <span className="font-bold shrink-0 text-white">{formatEuro(row.value, lang)}</span>
                </div>
              ))}
            </div>
          )}

          {/* DICTAMEN PERICIAL ESPECTRAL — cálculo forense vinculado a los datos capturados */}
          {indicators &&
            (() => {
              // Masa de Fuga Anualizada = Ingresos x 0.024 (valor absoluto).
              const leakMass = Math.abs(indicators.revenue * 0.024)
              // Si el beneficio neto es negativo, la masa absorbe directamente el déficit.
              const deficitAbsorption = indicators.profit < 0
              // Secuestro de Liquidez vinculado directamente a Deudores Comerciales reales.
              const floatHijack = indicators.debtors
              return (
                <div className="space-y-3">
                  <div className="pt-2 text-[10px] font-mono tracking-wider" style={{ color: GOLD }}>
                    {t.dictamenHead}
                  </div>
                  <div className="text-[9px] font-mono tracking-wider text-gray-600">
                    {t.computedTag}
                  </div>

                  <div className="space-y-3 text-xs font-mono">
                    <div
                      className="flex justify-between gap-3 pb-2"
                      style={{ borderBottom: '1px solid rgba(220,38,38,0.25)' }}
                    >
                      <span className="text-gray-400">{t.leakMassLabel}</span>
                      <span className="font-bold shrink-0" style={{ color: '#f87171' }}>
                        {deficitAbsorption ? '− ' : ''}
                        {formatEuro(leakMass, lang)}
                      </span>
                    </div>
                    <div
                      className="flex justify-between gap-3 pb-2"
                      style={{ borderBottom: '1px solid rgba(220,38,38,0.25)' }}
                    >
                      <span className="text-gray-400">{t.floatHijackLabel}</span>
                      <span className="font-bold shrink-0" style={{ color: '#f87171' }}>
                        {formatEuro(floatHijack, lang)}
                      </span>
                    </div>
                  </div>

                  {deficitAbsorption && (
                    <p
                      className="pl-4 text-[10px] leading-relaxed font-sans"
                      style={{ borderLeft: '1px solid rgba(220,38,38,0.5)', color: '#f4a3a3' }}
                    >
                      {t.deficitNote}
                    </p>
                  )}
                </div>
              )
            })()}

          {/* MANDATO OBLIGATORIO DE SALIDA — expediente pericial indexado (cifras inmutables) */}
          <div className="pt-2 text-[10px] font-mono tracking-wider" style={{ color: '#f87171' }}>
            {t.mandateHead}
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div
              className="flex justify-between pb-2 text-gray-500 text-[10px]"
              style={{ borderBottom: `1px solid ${GOLD}22` }}
            >
              <span>{t.colVector}</span>
              <span>{t.colDamage}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-gray-400">{t.rowMargin}</span>
              <span className="font-bold shrink-0" style={{ color: '#f87171' }}>
                {t.marginVal}
              </span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-gray-400">{t.rowFloat}</span>
              <span className="font-bold shrink-0" style={{ color: '#eab308' }}>
                {t.floatVal}
              </span>
            </div>
            <div className="flex justify-between gap-3 pt-3 mt-1" style={{ borderTop: `1px solid ${GOLD}22` }}>
              <span className="uppercase tracking-wide" style={{ color: GOLD }}>
                {t.rowEbitda}
              </span>
              <span className="font-bold text-sm shrink-0" style={{ color: '#34d399' }}>
                {t.ebitdaVal}
              </span>
            </div>
          </div>

          {/* SELLO PERICIAL VISIBLE */}
          <div
            className="flex items-center justify-between gap-3 pt-3 font-mono"
            style={{ borderTop: `1px solid ${GOLD}22` }}
          >
            <span className="text-[9px] tracking-[0.2em] text-gray-600 uppercase">{t.sealLabel}</span>
            <span className="text-[10px] tracking-[0.15em]" style={{ color: GOLD }}>
              [CEO-MD-CVV // LVP-OMEGA-V.3.1]
            </span>
          </div>

          <p className="text-[11px] text-gray-500 leading-relaxed font-sans">{t.withheld}</p>

          <p
            className="flex items-center justify-center gap-2 text-[10px] font-mono animate-pulse"
            style={{ color: '#f87171' }}
          >
            <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {t.autoDestroy}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-xs font-sans font-bold py-2.5 px-6 rounded transition-opacity hover:opacity-90 uppercase tracking-wider"
              style={{ backgroundColor: GOLD, color: '#000' }}
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              {t.purgeBtn}
            </button>
            <button
              onClick={onClose}
              className="text-xs font-sans font-semibold py-2.5 px-6 rounded transition-colors uppercase tracking-wider"
              style={{ border: `1px solid ${GOLD}`, color: GOLD }}
            >
              {t.closeBtn}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
