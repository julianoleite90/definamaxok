import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Definamax - Vídeos Exclusivos | Descubra Como Emagrecer Naturalmente",
  description:
    "Assista a vídeos exclusivos sobre o Definamax e descubra como emagrecer de forma natural e eficaz sem dietas restritivas ou injeções perigosas.",
  keywords:
    "Definamax, vídeos emagrecimento, como emagrecer, suplemento natural, perda de peso, depoimentos emagrecimento",
}

export default function ReMarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div>{children}</div>
}
