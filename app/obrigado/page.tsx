import type { Metadata } from "next"
import ThankYouClientPage from "./ThankYouClientPage"

export const metadata: Metadata = {
  title: "Obrigado pela sua compra | Definamax",
  description: "Agradecemos pela sua confiança. Seu pedido foi recebido com sucesso.",
}

export default function ThankYouPage() {
  return <ThankYouClientPage />
}
