import type { Locale } from '@/lib/i18n'

/**
 * Banderas vectoriales a todo color (estilo "pin" compacto).
 *
 * Criterios de diseño:
 * - Sin emojis: SVG puro y autocontenido.
 * - Colores nacionales vívidos y saturados, fieles a cada bandera.
 * - 16px de ancho, proporción 4:3 (16x12), esquinas suaves y borde sutil
 *   para recortarlas con elegancia sobre el fondo oscuro de la cabecera.
 */

type FlagProps = {
  className?: string
}

const baseProps = {
  width: 16,
  height: 12,
  viewBox: '0 0 16 12',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true as const,
  focusable: false as const,
}

/** Borde + recorte redondeado compartido por todas las banderas. */
function FlagFrame({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <>
      <defs>
        <clipPath id={id}>
          <rect x="0" y="0" width="16" height="12" rx="1.5" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>{children}</g>
      <rect
        x="0.4"
        y="0.4"
        width="15.2"
        height="11.2"
        rx="1.3"
        fill="none"
        stroke="#000"
        strokeOpacity="0.18"
      />
    </>
  )
}

/** España — rojo, amarillo (doble franja central) con escudo insinuado. */
function FlagES({ className }: FlagProps) {
  return (
    <svg {...baseProps} className={className}>
      <FlagFrame id="flag-es">
        <rect x="0" y="0" width="16" height="12" fill="#C60B1E" />
        <rect x="0" y="3" width="16" height="6" fill="#FFC400" />
        <rect x="3" y="4.6" width="1.9" height="2.8" rx="0.3" fill="#C60B1E" fillOpacity="0.85" />
      </FlagFrame>
    </svg>
  )
}

/** Estados Unidos — barras y estrellas (Stars & Stripes). */
function FlagEN({ className }: FlagProps) {
  return (
    <svg {...baseProps} className={className}>
      <FlagFrame id="flag-en">
        <rect x="0" y="0" width="16" height="12" fill="#FFFFFF" />
        {/* 7 franjas rojas sobre fondo blanco (13 franjas en total) */}
        <rect x="0" y="0" width="16" height="0.92" fill="#B22234" />
        <rect x="0" y="1.85" width="16" height="0.92" fill="#B22234" />
        <rect x="0" y="3.69" width="16" height="0.92" fill="#B22234" />
        <rect x="0" y="5.54" width="16" height="0.92" fill="#B22234" />
        <rect x="0" y="7.38" width="16" height="0.92" fill="#B22234" />
        <rect x="0" y="9.23" width="16" height="0.92" fill="#B22234" />
        <rect x="0" y="11.08" width="16" height="0.92" fill="#B22234" />
        {/* cantón azul */}
        <rect x="0" y="0" width="6.4" height="6.46" fill="#3C3B6E" />
      </FlagFrame>
    </svg>
  )
}

/** Alemania — negro, rojo, oro. */
function FlagDE({ className }: FlagProps) {
  return (
    <svg {...baseProps} className={className}>
      <FlagFrame id="flag-de">
        <rect x="0" y="0" width="16" height="4" fill="#000000" />
        <rect x="0" y="4" width="16" height="4" fill="#DD0000" />
        <rect x="0" y="8" width="16" height="4" fill="#FFCE00" />
      </FlagFrame>
    </svg>
  )
}

/** Francia — azul, blanco, rojo. */
function FlagFR({ className }: FlagProps) {
  return (
    <svg {...baseProps} className={className}>
      <FlagFrame id="flag-fr">
        <rect x="0" y="0" width="5.33" height="12" fill="#0055A4" />
        <rect x="5.33" y="0" width="5.34" height="12" fill="#FFFFFF" />
        <rect x="10.67" y="0" width="5.33" height="12" fill="#EF4135" />
      </FlagFrame>
    </svg>
  )
}

const FLAGS: Record<Locale, (props: FlagProps) => React.ReactElement> = {
  es: FlagES,
  en: FlagEN,
  de: FlagDE,
  fr: FlagFR,
}

export function FlagIcon({ code, className }: { code: Locale; className?: string }) {
  const Flag = FLAGS[code]
  return <Flag className={className} />
}
