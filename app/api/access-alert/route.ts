// Registra un log de acceso consultable en el panel de Vercel
// (proyecto → pestaña Logs / Observability). Sin claves API ni servicios externos.

export async function POST(request: Request) {
  let payload: { code?: string; userAgent?: string }
  try {
    payload = await request.json()
  } catch {
    return Response.json({ ok: false, error: "Cuerpo inválido." }, { status: 400 })
  }

  const code = typeof payload.code === "string" ? payload.code.trim() : ""
  if (!code) {
    return Response.json({ ok: false, error: "Código requerido." }, { status: 400 })
  }

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
  const userAgent =
    typeof payload.userAgent === "string" && payload.userAgent
      ? payload.userAgent
      : request.headers.get("user-agent") ?? "Desconocido"
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "Desconocida"

  const mensaje = `Alerta LVP: El código ${code} ha sido consultado a las ${hora} del ${fecha}.`

  // Estas líneas aparecen en los logs de tu proyecto en Vercel.
  console.log(`[ALERTA-LVP] ${mensaje}`)
  console.log(
    `[ALERTA-LVP] Detalles -> código="${code}" fecha="${fecha}" hora="${hora}" ip="${ip}" dispositivo="${userAgent}"`,
  )

  return Response.json({ ok: true })
}
