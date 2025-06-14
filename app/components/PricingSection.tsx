'use client'

import { useUTMTracking } from '../hooks/useUTMTracking'

// Função para obter a data atual formatada
const getCurrentDate = () => {
  const today = new Date()
  const day = today.getDate().toString().padStart(2, '0')
  const month = (today.getMonth() + 1).toString().padStart(2, '0')
  const year = today.getFullYear()
  return `${day}/${month}/${year}`
}

export default function PricingSection() {
  const { addUTMsToURL } = useUTMTracking()
  const packages = [
    {
      id: 1,
      name: "COMPRE 5 LEVE 8",
      subtitle: "GANHE 1 FRASCO DE COLÁGENO",
      description: "Tratamento Completo",
      image: "/8frascos.png",
      originalPrice: "De R$1.079,00",
      installments: "Por apenas 12x",
      price: "R$45,08",
      fullPrice: "Ou R$449,00 à vista!",
      buttonText: "COMPRAR AGORA",
      buttonColor: "bg-green-700 hover:bg-green-800",
      cardColor: "bg-white",
      shipping: "FRETE GRÁTIS",
      badges: ["Compra Segura", "Satisfação Garantida", "Privacidade Protegida"],
      highlight: true,
      highlightColor: "border-green-700",
      url: "https://full.sale/XONObQ"
    },
    {
      id: 2,
      name: "COMPRE 3 LEVE 5",
      subtitle: "GANHE 1 FRASCO DE COLÁGENO",
      description: "Tratamento Mais Vendido",
      image: "/5frascos.png",
      originalPrice: "De R$879,00",
      installments: "Por apenas 12x",
      price: "R$38,05",
      fullPrice: "Ou R$379,00 à vista!",
      buttonText: "COMPRAR AGORA",
      buttonColor: "bg-green-700 hover:bg-green-800",
      cardColor: "bg-white",
      shipping: "FRETE GRÁTIS",
      badges: ["Compra Segura", "Satisfação Garantida", "Privacidade Protegida"],
      highlight: true,
      highlightColor: "border-orange-400",
      url: "https://full.sale/ytA47b"
    },
    {
      id: 3,
      name: "COMPRE 2 LEVE 3",
      subtitle: "GANHE ENVIO IMEDIATO",
      description: "Tratamento Inicial",
      image: "/2frascos.png",
      originalPrice: "De R$589,00",
      installments: "Por apenas 12x",
      price: "R$35,04",
      fullPrice: "Ou R$349,00 à vista!",
      buttonText: "COMPRAR AGORA",
      buttonColor: "bg-green-700 hover:bg-green-800",
      cardColor: "bg-white",
      shipping: "FRETE GRÁTIS",
      badges: ["Compra Segura", "Satisfação Garantida", "Privacidade Protegida"],
      url: "https://full.sale/DmNQj1"
    },
    {
      id: 4,
      name: "1 FRASCO",
      subtitle: "GANHE ENVIO IMEDIATO",
      description: "Experimente",
      image: "/1frasco.png",
      originalPrice: "De R$289,00",
      installments: "Por apenas 12x",
      price: "R$23,79",
      fullPrice: "Ou R$237,00 à vista!",
      buttonText: "COMPRAR AGORA",
      buttonColor: "bg-green-700 hover:bg-green-800",
      cardColor: "bg-white",
      shipping: "FRETE GRÁTIS",
      badges: ["Compra Segura", "Satisfação Garantida", "Privacidade Protegida"],
      url: "https://full.sale/eMbtHp"
    }
  ]

  return (
    <section className="bg-gray-50 py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Escolha o kit perfeito para você
          </h2>
          <p className="text-lg text-gray-600">
            Restam <span className="underline font-semibold">poucos frascos</span> com <span className="font-bold text-red-600">FRETE GRÁTIS</span> no dia de hoje: <span className="font-bold text-red-600">{getCurrentDate()}</span>
          </p>
        </div>

        {/* Mobile Layout - Stack */}
        <div className="lg:hidden space-y-6">
          {packages.map((pkg) => (
            <div key={pkg.id} className={`${pkg.cardColor} rounded-2xl p-6 relative overflow-hidden shadow-lg border-2 ${
              pkg.highlight ? pkg.highlightColor : 'border-gray-200'
            }`}>
              
              {/* Header */}
              <div className="text-center mb-6">
                <div className={`text-white px-4 py-2 rounded-lg font-bold text-sm mb-2 ${
                  pkg.highlightColor === 'border-green-700' ? 'bg-green-700' :
                  pkg.highlightColor === 'border-orange-400' ? 'bg-orange-400' : 'bg-green-700'
                }`}>
                  {pkg.name}
                </div>
                <p className="text-sm text-gray-600 font-medium mb-1">{pkg.subtitle}</p>
                <p className="text-lg font-bold text-gray-800">{pkg.description}</p>
              </div>

              {/* Product Image */}
              <div className="flex justify-center mb-6">
                <img 
                  src={pkg.image} 
                  alt={pkg.name}
                  className="w-60 h-60 object-contain"
                />
              </div>

              {/* Pricing */}
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 line-through mb-1">{pkg.originalPrice}</p>
                <p className="text-sm text-gray-700 mb-1">{pkg.installments}</p>
                <p className="text-4xl font-bold mb-1 text-green-700">{pkg.price}</p>
                <p className="text-sm text-gray-700 mb-2">{pkg.fullPrice}</p>
              </div>

              <p className="text-green-700 font-bold text-lg mb-4 text-center">{pkg.shipping}</p>

              {/* Button */}
              <a 
                href={addUTMsToURL(pkg.url)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full ${pkg.buttonColor} text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-200 mb-6 block text-center`}
                onClick={() => {
                  // Evento de conversão para Google Analytics
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'purchase_intent', {
                      event_category: 'ecommerce',
                      event_label: pkg.name,
                      value: parseFloat(pkg.fullPrice.replace(/[^\d,]/g, '').replace(',', '.')),
                      currency: 'BRL',
                      item_name: pkg.name,
                      item_category: 'suplemento_emagrecedor',
                    })
                  }
                }}
              >
                {pkg.buttonText}
              </a>

              {/* Privacy Image */}
              <div className="flex justify-center">
                <img 
                  src="/privacidade.webp" 
                  alt="Privacidade e Segurança"
                  className="max-w-md w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Layout - Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div key={pkg.id} className={`${pkg.cardColor} rounded-2xl p-6 relative overflow-hidden transform transition-all duration-300 hover:scale-105 shadow-lg border-2 ${
              pkg.highlight ? pkg.highlightColor : 'border-gray-200'
            }`}>
              
              {/* Header */}
              <div className="text-center mb-6">
                <div className={`text-white px-3 py-2 rounded-lg font-bold text-sm mb-2 ${
                  pkg.highlightColor === 'border-green-700' ? 'bg-green-700' :
                  pkg.highlightColor === 'border-orange-400' ? 'bg-orange-400' : 'bg-green-700'
                }`}>
                  {pkg.name}
                </div>
                <p className="text-sm text-gray-600 font-medium mb-1">{pkg.subtitle}</p>
                <p className="text-lg font-bold text-gray-800">{pkg.description}</p>
              </div>

              {/* Product Image */}
              <div className="flex justify-center mb-6">
                <img 
                  src={pkg.image} 
                  alt={pkg.name}
                  className="w-56 h-56 object-contain"
                />
              </div>

              {/* Pricing */}
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 line-through mb-1">{pkg.originalPrice}</p>
                <p className="text-sm text-gray-700 mb-1">{pkg.installments}</p>
                <p className="text-3xl font-bold mb-1 text-green-700">{pkg.price}</p>
                <p className="text-sm text-gray-700 mb-2">{pkg.fullPrice}</p>
              </div>

              <p className="text-green-700 font-bold text-center mb-4">{pkg.shipping}</p>

              {/* Button */}
              <a 
                href={addUTMsToURL(pkg.url)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full ${pkg.buttonColor} text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-200 mb-6 hover:shadow-lg block text-center`}
                onClick={() => {
                  // Evento de conversão para Google Analytics
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'purchase_intent', {
                      event_category: 'ecommerce',
                      event_label: pkg.name,
                      value: parseFloat(pkg.fullPrice.replace(/[^\d,]/g, '').replace(',', '.')),
                      currency: 'BRL',
                      item_name: pkg.name,
                      item_category: 'suplemento_emagrecedor',
                    })
                  }
                }}
              >
                {pkg.buttonText}
              </a>

              {/* Privacy Image */}
              <div className="flex justify-center">
                <img 
                  src="/privacidade.webp" 
                  alt="Privacidade e Segurança"
                  className="max-w-sm w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Payment Methods - Centralized below all kits */}
        <div className="flex justify-center mt-12">
          <img 
            src="/cartoes.webp" 
            alt="Métodos de Pagamento Aceitos"
            className="max-w-md w-full h-auto"
          />
        </div>
      </div>
    </section>
  )
} 