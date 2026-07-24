// Acceso pericial efímero de UN SOLO USO (One-Time View Protocol).
//
// El permiso vive EXCLUSIVAMENTE en memoria del módulo JavaScript. Sobrevive a
// la navegación cliente (router.push desde la Solapa 4 tras validar el OTP),
// pero se destruye automáticamente ante cualquier recarga de página o cierre
// de pestaña, ya que la memoria del runtime se reinicia por completo.
//
// No se usa localStorage ni sessionStorage de forma deliberada: sessionStorage
// sobreviviría a una recarga, rompiendo la garantía de auto-bloqueo al salir.

export type OmegaLang = 'es' | 'en' | 'fr' | 'de'

let granted = false
// Idioma activo del selector en el momento de conceder el acceso. Vive en la
// misma memoria volátil que el permiso: sobrevive al router.push hacia el
// expediente, pero se reinicia con cualquier recarga.
let activeLang: OmegaLang = 'es'

/** Concede el acceso pericial tras validar el Token OTP. */
export function grantOmegaAccess(): void {
  granted = true
}

/** Fija el idioma activo del expediente pericial (selector C-Suite). */
export function setOmegaLang(lang: OmegaLang): void {
  activeLang = lang
}

/** Devuelve el idioma activo del expediente pericial. */
export function getOmegaLang(): OmegaLang {
  return activeLang
}

/** Indica si existe un acceso pericial vigente en esta sesión volátil. */
export function isOmegaGranted(): boolean {
  return granted
}

/** Revoca el acceso pericial (auto-bloqueo al salir del expediente). */
export function revokeOmegaAccess(): void {
  granted = false
}
