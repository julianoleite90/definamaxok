import type React from "react"

export const metadata = {
  title: "Obrigado pela sua compra | Definamax",
  description: "Agradecemos pela sua confiança. Seu pedido foi recebido com sucesso.",
}

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>
}
