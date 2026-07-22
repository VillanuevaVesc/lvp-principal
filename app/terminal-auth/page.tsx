import type { Metadata } from "next"
import { TerminalAuthForm } from "@/components/terminal-auth-form"

export const metadata: Metadata = {
  title: "Terminal de Autenticación · Luxe Vela Privé",
  description:
    "Validación de acceso mediante código OTP para la terminal analítica de Luxe Vela Privé.",
}

export default function TerminalAuthPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <TerminalAuthForm />
    </main>
  )
}
