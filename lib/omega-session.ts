// Acceso pericial efímero de UN SOLO USO (One-Time View Protocol).
//
// El permiso vive EXCLUSIVAMENTE en memoria del módulo JavaScript. Sobrevive a
// la navegación cliente (router.push desde la Solapa 4 tras validar el OTP),
// pero se destruye automáticamente ante cualquier recarga de página o cierre
// de pestaña, ya que la memoria del runtime se reinicia por completo.
//
// No se usa localStorage ni sessionStorage de forma deliberada: sessionStorage
// sobreviviría a una recarga, rompiendo la garantía de auto-bloqueo al salir.

let granted = false

/** Concede el acceso pericial tras validar el Token OTP. */
export function grantOmegaAccess(): void {
  granted = true
}

/** Indica si existe un acceso pericial vigente en esta sesión volátil. */
export function isOmegaGranted(): boolean {
  return granted
}

/** Revoca el acceso pericial (auto-bloqueo al salir del expediente). */
export function revokeOmegaAccess(): void {
  granted = false
}
