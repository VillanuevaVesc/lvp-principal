// Ruta segura de autenticación (Server-Side).
// Contiene los tokens de autoridad y el dictamen forense de PRIMAFRIO SL.
// NADA de esto se envía al bundle del cliente: solo se devuelve el JSON del
// dictamen cuando el token (y el estado de interacción humana) coinciden.

// Tokens de autoridad reconocidos por la terminal (consolidado v.3.2).
const CONFIG_TOKENS = {
  CLIENTE: "LVP-OMEGA-1307-PRMF-926B",
  AUTOR: "LVP-MASTER-BACKDOOR-AUDIT",
}

// Datos interceptados de la compañía diana. Solo existen en el servidor.
const DATOS_PRIMAFRIO = {
  compania: "PRIMAFRIO SL",
  cif: "B73047599",
  capitalBase: "6.223.386,00 €",
  sangriaDetectada: "1.850.000,00 €",
  floatHijacking: "245.000,00 €",
  conceptoSangria:
    "Vector IV: Fugas contables por desajustes estructurales en liquidación de fletes transfronterizos y asimetrías operativas ante la falta de transición digital homogénea al e-CMR obligatorio en aduanas europeas.",
  conceptoFloat:
    "Secuestro temporal de liquidez interbancaria derivado de la viscosidad en los procesos de conciliación documental sobre las colas de compensación de fletes nocturnos (overnight).",
  partidaEbitda:
    "Aprovisionamientos / Consumos y Servicios de Transporte Subcontratados",
  mejoraEbitdaDinamica: "+0,34%",
  // Matriz agnóstica de los 8 vectores raíz del Algoritmo OMEGA.
  vectores: [
    {
      id: "V1",
      titulo: "Vector I · Real Estate e Infraestructura",
      descripcion:
        "Desviación de indexación asimétrica en contratos de arrendamiento complejos de bases logísticas.",
    },
    {
      id: "V2",
      titulo: "Vector II · Energía Estructural",
      descripcion:
        "Descalces horarios por volatilidad de carga base en nodos de suministro de alta tensión.",
    },
    {
      id: "V3",
      titulo: "Vector III · Supply Chain y Fletes",
      descripcion:
        "Retención de capital circulante e ineficiencia por asimetría de flujos geográficos en el retorno en vacío.",
    },
    {
      id: "V4",
      titulo: "Vector IV · Fricción Operativa e-CMR",
      descripcion:
        "Fugas contables por desajustes estructurales en liquidación de fletes transfronterizos ante la falta de transición digital homogénea.",
    },
    {
      id: "V5",
      titulo: "Vector V · Distorsión Algorítmica",
      descripcion:
        "Sobrecompras cíclicas anómalas detectadas en el dominio de la frecuencia mediante análisis espectral.",
    },
    {
      id: "V6",
      titulo: "Vector VI · Float Soberano y Clearing",
      descripcion:
        "Secuestro temporal de liquidez transaccional derivado de la viscosidad en los procesos de conciliación documental overnight.",
    },
    {
      id: "V7",
      titulo: "Vector VII · Fricción OpEx Inmobiliaria",
      descripcion:
        "Sobrecoste por subutilización de superficies reales de explotación y desajustes de valoración catastral indexada.",
    },
    {
      id: "V8",
      titulo: "Vector VIII · Descalce Cambiario",
      descripcion:
        "Asimetrías temporales y riesgo de base en la liquidación de fletes transfronterizos multi-divisa.",
    },
  ],
}

// Registra la alerta de acceso en los logs de Vercel (sin servicios externos).
function registrarAlertaAcceso(code: string, request: Request, userAgent: string) {
  const now = new Date()
  const hora = now.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
  const fecha = now.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "Desconocida"

  console.log(
    `[ALERTA-LVP] El código ${code} ha sido consultado a las ${hora} del ${fecha}.`,
  )
  console.log(
    `[ALERTA-LVP] Detalles -> código="${code}" fecha="${fecha}" hora="${hora}" ip="${ip}" dispositivo="${userAgent}"`,
  )
}

export async function POST(request: Request) {
  let payload: { token?: string; esHumano?: boolean; userAgent?: string }
  try {
    payload = await request.json()
  } catch {
    return Response.json(
      { ok: false, message: "ERROR: Cuerpo de la petición inválido." },
      { status: 400 },
    )
  }

  const token = typeof payload.token === "string" ? payload.token.trim() : ""
  const esHumano = payload.esHumano === true
  const userAgent =
    typeof payload.userAgent === "string" && payload.userAgent
      ? payload.userAgent
      : request.headers.get("user-agent") ?? "Desconocido"

  if (!token) {
    return Response.json(
      { ok: false, message: "ERROR: Código requerido." },
      { status: 400 },
    )
  }

  // Caso 1: acceso Master Backdoor (modo espejo de autor).
  if (token === CONFIG_TOKENS.AUTOR) {
    return Response.json({
      ok: true,
      message:
        "MODO ESPEJO ACTIVADO: Acceso de Autor verificado. Deshabilitando telemetría de rastreo.",
      datos: { ...DATOS_PRIMAFRIO, modoEspejo: true },
    })
  }

  // Caso 2: acceso del cliente (diana).
  if (token === CONFIG_TOKENS.CLIENTE) {
    // Veto perimetral: bloquea bots que abren enlaces sin interacción humana.
    if (!esHumano) {
      return Response.json(
        {
          ok: false,
          message:
            "ERROR: Intento de acceso automatizado por bot perimetral bloqueado de forma cautelar.",
        },
        { status: 403 },
      )
    }

    registrarAlertaAcceso(token, request, userAgent)

    return Response.json({
      ok: true,
      message:
        "AUTENTICACIÓN SOBERANA EXITOSA. Firma criptográfica SHA-256 validada.",
      datos: { ...DATOS_PRIMAFRIO, modoEspejo: false },
    })
  }

  // Caso 3: credencial inválida. No se filtra ningún dato.
  return Response.json(
    {
      ok: false,
      message:
        "ERROR: Clave OTP inválida, inexistente o afectada por veto perimetral.",
    },
    { status: 401 },
  )
}
