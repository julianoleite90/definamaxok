import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Definamax - Produto | Suplemento Natural para Emagrecimento",
  description:
    "Conheça o Definamax, um suplemento alimentar natural que pode auxiliar no seu processo de emagrecimento quando combinado com uma alimentação equilibrada.",
  keywords:
    "Definamax, suplemento natural, emagrecimento saudável, perda de peso, bem-estar, saúde",
  icons: {
    icon: "/ico.png",
    apple: "/ico.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.definamaxoficial.com",
    title: "Definamax - Suplemento Alimentar Natural",
    description:
      "Conheça as fibras alimentares de Definamax",
    siteName: "Definamax",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Definamax - Suplemento Natural para Emagrecimento",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Definamax - Suplemento Alimentar Natural",
    description:
      "Conheça as fibras alimentares de Definamax",
    images: ["/og.png"],
  },
  alternates: {
    canonical: "https://www.definamaxoficial.com/",
  },
  verification: {
    google: "055Y8Zlr7CXBMOD8_TVqgFAiashS0o5vcUD8K7vxO_s",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','G-RTEPB48RDY');`,
          }}
        />
        {/* End Google Tag Manager */}

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-RTEPB48RDY" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RTEPB48RDY');
            `,
          }}
        />
        {/* End Google Analytics */}
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=G-RTEPB48RDY"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  )
}
