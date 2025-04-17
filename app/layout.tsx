import type React from "react"
import { GoogleAnalytics } from "@next/third-parties/google"
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Definamax - Suplemento Natural para Emagrecimento",
  description:
    "Conquiste o Corpo dos Seus Sonhos e Mais Confiança com Definamax! Você Mais Leve, Saudável e Confiante em Pouco Tempo.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
        {/* Google Analytics integration */}
        <GoogleAnalytics gaId="G-RTEPB48RDY" />

      </body>
    </html>
  )
}
