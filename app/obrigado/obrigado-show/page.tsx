import type { Metadata } from "next"
import ThankYouShowPage from "./ThankYouShowPage"

export const metadata: Metadata = {
  title: "Show! Sua compra foi confirmada! | Definamax Entertainment",
  description: "Você está pronto para brilhar! Seu pedido foi confirmado com sucesso.",
}

export default function ThankYouShowRoute() {
  return <ThankYouShowPage />
} 