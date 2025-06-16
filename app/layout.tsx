import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import GoogleAnalytics from './components/GoogleAnalytics'
import UTMHandler from './components/UTMHandler'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.definamaxoficial.com'),
  title: 'Definamax - Site Oficial | Emagrecedor Natural',
  description: 'Emagreça até 10kg em 30 dias com Definamax, o emagrecedor natural mais vendido do Brasil. ✓ 100% Natural ✓ Envio Imediato ✓ Resultados Garantidos ✓ Frete Grátis',
  keywords: 'definamax, emagrecedor natural, perda de peso, metabolismo, compulsão alimentar, emagrecer, perder peso, gordura localizada',
  alternates: {
    canonical: 'https://www.definamaxoficial.com'
  },
  openGraph: {
    title: 'Definamax - Site Oficial | Emagrecedor Natural',
    description: 'Emagreça até 10kg em 30 dias com Definamax, o emagrecedor natural mais vendido do Brasil. ✓ 100% Natural ✓ Envio Imediato ✓ Resultados Garantidos ✓ Frete Grátis',
    url: 'https://www.definamaxoficial.com',
    siteName: 'Definamax Oficial',
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Definamax - Emagrecedor Natural',
        type: 'image/jpeg',
      },
      {
        url: '/mockup2.png',
        width: 800,
        height: 600,
        alt: 'Frasco Definamax',
        type: 'image/png',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Definamax - Site Oficial | Resultados em 30 Dias',
    description: 'Emagreça até 10kg em 30 dias com Definamax. ✓ 100% Natural ✓ Envio Imediato ✓ Resultados Garantidos ✓ Frete Grátis',
    images: ['/opengraph-image.jpg'],
    creator: '@definamax',
    site: '@definamax'
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
    google: '055Y8Zlr7CXBMOD8_TVqgFAiashS0o5vcUD8K7vxO_s',
  },
  other: {
    'msapplication-TileColor': '#10b981',
    'theme-color': '#10b981',
  }
}

// Schema.org markup para Rich Snippets
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Definamax',
  description: 'Suplemento natural para emagrecimento saudável e eficaz',
  image: [
    'https://www.definamaxoficial.com/mockup2.png',
    'https://www.definamaxoficial.com/opengraph-image.jpg'
  ],
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
    offerCount: '3',
    seller: {
      '@type': 'Organization',
      name: 'Definamax'
    },
    priceValidUntil: '2025-12-31'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    bestRating: '5',
    worstRating: '1',
    reviewCount: '3842'
  },
  review: [
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      },
      author: {
        '@type': 'Person',
        name: 'Mariana C.'
      },
      datePublished: '2025-05-05',
      reviewBody: 'Perdi 8kg em 2 meses com o Definamax. Realmente funciona!'
    },
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      },
      author: {
        '@type': 'Person',
        name: 'Lucas M.'
      },
      datePublished: '2025-04-28',
      reviewBody: 'Em 3 meses, perdi 9kg e agora consigo jogar uma pelada sem passar vergonha.'
    }
  ]
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Definamax',
  url: 'https://www.definamaxoficial.com',
  logo: 'https://www.definamaxoficial.com/logo2.png',
  sameAs: [
    'https://www.instagram.com/definamax',
    'https://www.facebook.com/definamax'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+55-41-98454-9172',
    contactType: 'customer service',
    areaServed: 'BR',
    availableLanguage: 'Portuguese'
  }
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{
    '@type': 'ListItem',
    position: 1,
    name: 'Home',
    item: 'https://www.definamaxoficial.com'
  }]
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
        
        {/* Favicon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#10b981" />
        
        {/* Preconnect to required origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Schema.org markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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

        {/* UTM Tracking - Improved version */}
        <Script id="utm-tracking" strategy="afterInteractive">
          {`
            function getUTMParameters() {
              const urlParams = new URLSearchParams(window.location.search);
              const utmParams = ['source', 'medium', 'campaign', 'term', 'content'];
              const params = {};
              
              utmParams.forEach(param => {
                const value = urlParams.get('utm_' + param);
                if (value) {
                  params['utm_' + param] = value;
                  localStorage.setItem('utm_' + param, value);
                }
              });
              
              return params;
            }

            function getStoredUTMs() {
              const utmParams = ['source', 'medium', 'campaign', 'term', 'content'];
              const params = {};
              
              utmParams.forEach(param => {
                const value = localStorage.getItem('utm_' + param);
                if (value) params['utm_' + param] = value;
              });
              
              return params;
            }

            function attachUTMsToLinks() {
              const urlUTMs = getUTMParameters();
              const storedUTMs = getStoredUTMs();
              const utmParams = { ...storedUTMs, ...urlUTMs };
              
              if (Object.keys(utmParams).length === 0) return;

              document.querySelectorAll('a[href*="full.sale"]').forEach(link => {
                try {
                  const url = new URL(link.href);
                  Object.entries(utmParams).forEach(([key, value]) => {
                    url.searchParams.set(key, value);
                  });
                  link.href = url.toString();
                } catch (e) {
                  console.error('Error updating UTMs for link:', link.href);
                }
              });
            }

            // Attach UTMs on page load
            window.addEventListener('load', attachUTMsToLinks);
            
            // Reattach UTMs when new elements are added to the DOM
            const observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length) {
                  attachUTMsToLinks();
                }
              });
            });

            observer.observe(document.body, {
              childList: true,
              subtree: true
            });
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
        <UTMHandler />
        {children}
      </body>
    </html>
  )
}
