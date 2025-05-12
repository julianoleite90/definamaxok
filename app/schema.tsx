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
