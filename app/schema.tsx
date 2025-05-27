import Script from "next/script"

export default function Schema() {
  return (
    <>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Definamax",
            description:
              "Suplemento natural para emagrecimento que utiliza fibras alimentares para absorver gordura, acelerar o metabolismo e aumentar a saciedade.",
            image: "https://www.definamaxoficial.com/mockup.png",
            brand: {
              "@type": "Brand",
              name: "Definamax",
            },
            offers: {
              "@type": "AggregateOffer",
              lowPrice: "279.90",
              highPrice: "479.40",
              priceCurrency: "BRL",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "3842",
            },
          }),
        }}
      />
      <Script
        id="sitelinks-searchbox"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://www.definamaxoficial.com/",
            potentialAction: [
              {
                "@type": "ReadAction",
                target: [
                  "https://www.definamaxoficial.com/#beneficios",
                  "https://www.definamaxoficial.com/#depoimentos",
                  "https://www.definamaxoficial.com/#como-funciona",
                  "https://www.definamaxoficial.com/#comparativo",
                  "https://www.definamaxoficial.com/#garantia",
                  "https://www.definamaxoficial.com/#comprar",
                  "https://www.definamaxoficial.com/#avaliacoes",
                  "https://www.definamaxoficial.com/#faq",
                ],
              },
            ],
          }),
        }}
      />
    </>
  )
}

export const productSchema = {
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

export const organizationSchema = {
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

export const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{
    '@type': 'ListItem',
    position: 1,
    name: 'Home',
    item: 'https://www.definamaxoficial.com'
  }]
}

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Como devo tomar o Definamax?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Recomenda-se tomar 2 cápsulas por dia, preferencialmente antes das principais refeições. Para melhores resultados, tome uma cápsula 30 minutos antes do almoço e outra 30 minutos antes do jantar, sempre com um copo de água.'
      }
    },
    {
      '@type': 'Question',
      name: 'Quanto tempo demora para ver resultados?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Os resultados podem variar de pessoa para pessoa, mas a maioria dos usuários começa a notar mudanças significativas após 30 dias de uso contínuo. Para resultados mais expressivos, recomendamos o tratamento completo de 3 a 6 meses.'
      }
    },
    {
      '@type': 'Question',
      name: 'O Definamax tem efeitos colaterais?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Por ser um produto 100% natural, o Definamax não apresenta efeitos colaterais significativos. No entanto, como todo suplemento, recomendamos consultar um profissional de saúde antes de iniciar o uso, especialmente se você estiver grávida, amamentando ou em tratamento médico.'
      }
    }
  ]
}

export const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Definamax: O Emagrecedor Natural Mais Vendido do Brasil',
  image: [
    'https://www.definamaxoficial.com/mockup2.png',
    'https://www.definamaxoficial.com/opengraph-image.jpg'
  ],
  datePublished: '2024-03-20T08:00:00+08:00',
  dateModified: '2024-03-20T09:00:00+08:00',
  author: {
    '@type': 'Organization',
    name: 'Definamax',
    url: 'https://www.definamaxoficial.com'
  }
}
