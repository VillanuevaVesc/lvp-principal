import type { Metadata } from "next"
import { OmegaTerminal } from "@/components/omega-terminal"

export const metadata: Metadata = {
  title: "Terminal LVP OMEGA v3.2 · Luxe Vela Privé",
  description:
    "Terminal forense C-Suite de Luxe Vela Privé Strategic Consulting SL. Acceso restringido mediante código clave OTP.",
}

export default function OmegaPage() {
  return <OmegaTerminal />
}
