import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Termos de Garantia | Definamax",
  description: "Conheça os detalhes sobre nossa política de garantia e devolução",
}

export default function TermosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
