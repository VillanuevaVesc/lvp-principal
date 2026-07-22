import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import type React from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "LUXE VELA PRIVE STRATEGIC CONSULTING SL — LVP-OMEGA v3.0",
  description:
    "Operación de alta dirección: infraestructura de transporte y reclamación pericial exógena. Framework de control econométrico LVP-OMEGA v3.0.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`bg-background ${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">{children}</body>
    </html>
  )
}
