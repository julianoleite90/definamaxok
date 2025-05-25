import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import GoogleAnalytics from './components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.definamaxoficial.com'),
  title: 'Definamax - Emagrecedor Natural',
  description: 'Emagreça de forma natural e saudável com Definamax. Resultados comprovados em milhares de pessoas.',
  keywords: 'definamax, emagrecedor natural, perda de peso, metabolismo, compulsão alimentar',
  openGraph: {
    title: 'Definamax - Emagrecedor Natural',
    description: 'Emagreça de forma natural e saudável com Definamax. Resultados comprovados em milhares de pessoas.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Definamax - Emagrecedor Natural | Resultados em 30 Dias',
    description: 'Definamax é um suplemento 100% natural que ajuda no emagrecimento saudável. Reduza a compulsão alimentar, acelere o metabolismo e perca peso de forma eficaz.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'seu-codigo-de-verificacao',
  },
}

// Schema.org markup para Rich Snippets
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Definamax',
  description: 'Suplemento natural para emagrecimento saudável',
  image: 'https://www.definamaxoficial.com/mockup2.png',
  brand: {
    '@type': 'Brand',
    name: 'Definamax'
  },
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '279.90',
    highPrice: '479.40',
    priceCurrency: 'BRL',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'Definamax'
    }
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '3842'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href="https://www.definamaxoficial.com" />
        
        {/* Preconnect to required origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Schema.org markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RTEPB48RDY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RTEPB48RDY', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `}
        </Script>

        {/* UTM Tracking */}
        <Script id="utm-tracking" strategy="afterInteractive">
          {`
            function getUTMParameters() {
              const urlParams = new URLSearchParams(window.location.search);
              const utmParams = {};
              ['source', 'medium', 'campaign', 'term', 'content'].forEach(param => {
                const value = urlParams.get('utm_' + param);
                if (value) utmParams['utm_' + param] = value;
              });
              return utmParams;
            }

            function attachUTMsToLinks() {
              const utmParams = getUTMParameters();
              if (Object.keys(utmParams).length === 0) return;

              document.querySelectorAll('a[href*="full.sale"]').forEach(link => {
                const url = new URL(link.href);
                Object.entries(utmParams).forEach(([key, value]) => {
                  url.searchParams.set(key, value as string);
                });
                link.href = url.toString();
              });
            }

            window.addEventListener('load', attachUTMsToLinks);
          `}
        </Script>
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
