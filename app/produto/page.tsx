"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { CheckCircle2, ArrowRight, MessageCircle, Star, ShieldCheck, Truck, RotateCcw, Award } from "lucide-react"
import Head from "next/head"

export default function ProdutoDefinamax() {
  // Estado para controlar o kit selecionado
  const [selectedKit, setSelectedKit] = useState("kit3")

  // Estado para controlar a visibilidade do botão do WhatsApp
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false)

  // Estado para contagem regressiva
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 59,
    seconds: 59,
  })

  // Função para capturar parâmetros UTM da URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const utmSource = urlParams.get("utm_source")
      const utmMedium = urlParams.get("utm_medium")
      const utmCampaign = urlParams.get("utm_campaign")
      const utmContent = urlParams.get("utm_content")
      const utmTerm = urlParams.get("utm_term")

      // Armazenar parâmetros UTM no localStorage para uso posterior
      if (utmSource) localStorage.setItem("utm_source", utmSource)
      if (utmMedium) localStorage.setItem("utm_medium", utmMedium)
      if (utmCampaign) localStorage.setItem("utm_campaign", utmCampaign)
      if (utmContent) localStorage.setItem("utm_content", utmContent)
      if (utmTerm) localStorage.setItem("utm_term", utmTerm)
    }
  }, [])

  // Add keyframes for shine animation
  useEffect(() => {
    if (typeof document !== "undefined") {
      const style = document.createElement("style")
      style.innerHTML = `
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse-border {
          0% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(22, 163, 74, 0); }
          100% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); }
        }
        
        .animate-pulse-border {
          animation: pulse-border 2s infinite;
        }
        
        .floating {
          animation: floating 3s ease-in-out infinite;
        }
        
        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `
      document.head.appendChild(style)
      return () => {
        document.head.removeChild(style)
      }
    }
  }, [])

  // Contagem regressiva
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Control WhatsApp button visibility based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const whatsAppButton = document.getElementById("whatsAppButton")
      const scrollPosition = window.scrollY

      if (whatsAppButton) {
        // Show button after scrolling down a bit
        if (scrollPosition > 300) {
          whatsAppButton.style.transform = "translateY(0)"
          whatsAppButton.style.opacity = "1"
        } else {
          whatsAppButton.style.transform = "translateY(100px)"
          whatsAppButton.style.opacity = "0"
        }
      }
    }

    // Initial check
    handleScroll()

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Função para adicionar UTMs aos links de compra
  const addUtmToUrl = (baseUrl) => {
    if (typeof window === "undefined") return baseUrl

    const utmSource = localStorage.getItem("utm_source")
    const utmMedium = localStorage.getItem("utm_medium")
    const utmCampaign = localStorage.getItem("utm_campaign")
    const utmContent = localStorage.getItem("utm_content")
    const utmTerm = localStorage.getItem("utm_term")

    const url = new URL(baseUrl)

    if (utmSource) url.searchParams.append("utm_source", utmSource)
    if (utmMedium) url.searchParams.append("utm_medium", utmMedium)
    if (utmCampaign) url.searchParams.append("utm_campaign", utmCampaign)
    if (utmContent) url.searchParams.append("utm_content", utmContent)
    if (utmTerm) url.searchParams.append("utm_term", utmTerm)

    return url.toString()
  }

  // Função para abrir o WhatsApp
  const openWhatsApp = () => {
    const message = encodeURIComponent("Olá! Gostaria de saber mais sobre o Definamax.")
    window.open(`https://wa.me/5541984549172?text=${message}`, "_blank")
  }

  // Dados dos kits
  const kits = {
    kit1: {
      id: "kit1",
      name: "Kit 1 Mês",
      title: "Definamax - Kit 1 Mês (1 Frasco)",
      description: "Kit inicial com 1 frasco de Definamax para 1 mês de tratamento (60 cápsulas)",
      regularPrice: 329.9,
      salePrice: 279.9,
      discount: 18,
      installments: 12,
      installmentValue: 28.01,
      image: "/1f.png",
      link: "https://full.sale/eMbtHp",
      shipping: 29.9,
      freeShipping: false,
      bonus: [],
      weight: "100g",
      gtin: "7898489348731", // Código de barras fictício
      mpn: "DEFMAX-1M", // Número de peça do fabricante fictício
      inStock: true,
      expectedResults: "até 5kg",
    },
    kit3: {
      id: "kit3",
      name: "Kit 3 Meses",
      title: "Definamax - Kit 3 Meses (3 Frascos)",
      description: "Kit recomendado com 3 frascos de Definamax para 3 meses de tratamento (180 cápsulas)",
      regularPrice: 758.7,
      salePrice: 379.0,
      discount: 50,
      installments: 12,
      installmentValue: 38.05,
      image: "/3f.png",
      link: "https://full.sale/DmNQj1",
      shipping: 0,
      freeShipping: true,
      bonus: ["1 Frasco de Colágeno Grátis"],
      weight: "300g",
      gtin: "7898489348748", // Código de barras fictício
      mpn: "DEFMAX-3M", // Número de peça do fabricante fictício
      inStock: true,
      expectedResults: "até 13kg",
      bestSeller: true,
    },
    kit6: {
      id: "kit6",
      name: "Kit 6 Meses",
      title: "Definamax - Kit 6 Meses (6 Frascos)",
      description: "Kit completo com 6 frascos de Definamax para 6 meses de tratamento (360 cápsulas)",
      regularPrice: 1479.4,
      salePrice: 479.4,
      discount: 68,
      installments: 12,
      installmentValue: 48.09,
      image: "/6f.png",
      link: "https://full.sale/ytA47b",
      shipping: 0,
      freeShipping: true,
      bonus: ["2 Frascos de Colágeno Grátis"],
      weight: "600g",
      gtin: "7898489348755", // Código de barras fictício
      mpn: "DEFMAX-6M", // Número de peça do fabricante fictício
      inStock: true,
      expectedResults: "até 19kg",
    },
  }

  // Kit selecionado
  const kit = kits[selectedKit]

  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <Head>
        <title>{kit.title} | Suplemento Natural para Emagrecimento</title>
        <meta
          name="description"
          content="Definamax: suplemento natural que absorve gordura, acelera o metabolismo e aumenta a saciedade. Emagreça até 27kg sem dietas restritivas ou injeções perigosas."
        />
        <meta
          name="keywords"
          content="Definamax, emagrecimento, perda de peso, suplemento natural, absorção de gordura, metabolismo acelerado, saciedade, emagrecer rápido, sem dietas, sem injeções"
        />
        <meta name="author" content="Definamax" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://www.definamaxoficial.com/produto?kit=${kit.id}`} />
        <meta property="og:title" content={kit.title} />
        <meta
          property="og:description"
          content="Emagreça rápido sem dietas restritivas ou injeções perigosas com Definamax, o suplemento natural que absorve gordura e acelera seu metabolismo."
        />
        <meta property="og:image" content={`https://www.definamaxoficial.com${kit.image}`} />
        <meta property="product:price:amount" content={kit.salePrice.toString()} />
        <meta property="product:price:currency" content="BRL" />
        <meta property="product:availability" content="in stock" />
        <meta property="product:condition" content="new" />
        <meta property="product:retailer_item_id" content={kit.mpn} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://www.definamaxoficial.com/produto?kit=${kit.id}`} />
        <meta property="twitter:title" content={kit.title} />
        <meta
          property="twitter:description"
          content="Emagreça rápido sem dietas restritivas ou injeções perigosas com Definamax, o suplemento natural que absorve gordura e acelera seu metabolismo."
        />
        <meta property="twitter:image" content={`https://www.definamaxoficial.com${kit.image}`} />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://www.definamaxoficial.com/produto?kit=${kit.id}`} />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Language */}
        <meta httpEquiv="content-language" content="pt-BR" />
      </Head>

      {/* Header */}
      <header className="w-full relative overflow-hidden">
        <div className="bg-gradient-to-r from-green-800 via-green-700 to-green-800 py-3 shadow-md">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] animate-[shine_1.5s_infinite] pointer-events-none"></div>
          <div className="mx-auto max-w-5xl px-4 flex justify-center">
            <Link href="/">
              <Image src="/logo2.png" alt="Definamax" width={200} height={60} className="h-12 w-auto" />
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="mx-auto max-w-5xl px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600">
              Início
            </Link>
            <span className="mx-2">/</span>
            <Link href="/produto" className="hover:text-green-600">
              Produtos
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-gray-900">{kit.title}</span>
          </div>
        </div>
      </div>

      {/* Oferta por tempo limitado */}
      <div className="w-full bg-yellow-50 border-b border-yellow-200">
        <div className="mx-auto max-w-5xl px-4 py-2">
          <div className="flex items-center justify-center text-sm text-yellow-800">
            <span className="font-bold mr-2">OFERTA POR TEMPO LIMITADO:</span>
            <span className="font-medium">
              {timeLeft.hours.toString().padStart(2, "0")}:{timeLeft.minutes.toString().padStart(2, "0")}:
              {timeLeft.seconds.toString().padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <section className="w-full py-8 md:py-12 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Product Images */}
            <div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 relative">
                <div className="absolute top-2 right-2 z-10 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                  -{kit.discount}%
                </div>
                {kit.bestSeller && (
                  <div className="absolute top-2 left-2 z-10 bg-yellow-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                    MAIS VENDIDO
                  </div>
                )}
                <div className="relative h-[350px] w-full flex justify-center">
                  <Image
                    src={kit.image || "/placeholder.svg"}
                    alt={kit.title}
                    width={300}
                    height={400}
                    className="h-[350px] w-auto object-contain mx-auto floating"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSelectedKit("kit1")}
                  className={`border rounded-lg p-2 ${
                    selectedKit === "kit1" ? "border-green-500 bg-green-50" : "border-gray-200"
                  }`}
                >
                  <div className="relative h-20 w-full">
                    <Image src="/1f.png" alt="Kit 1 Mês" width={100} height={100} className="h-20 w-auto mx-auto" />
                  </div>
                  <p className="text-xs font-medium text-center mt-1">Kit 1 Mês</p>
                </button>

                <button
                  onClick={() => setSelectedKit("kit3")}
                  className={`border rounded-lg p-2 ${
                    selectedKit === "kit3" ? "border-green-500 bg-green-50" : "border-gray-200"
                  }`}
                >
                  <div className="relative h-20 w-full">
                    <Image src="/3f.png" alt="Kit 3 Meses" width={100} height={100} className="h-20 w-auto mx-auto" />
                  </div>
                  <p className="text-xs font-medium text-center mt-1">Kit 3 Meses</p>
                </button>

                <button
                  onClick={() => setSelectedKit("kit6")}
                  className={`border rounded-lg p-2 ${
                    selectedKit === "kit6" ? "border-green-500 bg-green-50" : "border-gray-200"
                  }`}
                >
                  <div className="relative h-20 w-full">
                    <Image src="/6f.png" alt="Kit 6 Meses" width={100} height={100} className="h-20 w-auto mx-auto" />
                  </div>
                  <p className="text-xs font-medium text-center mt-1">Kit 6 Meses</p>
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{kit.title}</h1>

              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium">4.9/5</span>
                <span className="ml-1 text-sm text-gray-500">(3.842 avaliações verificadas)</span>
              </div>

              <div className="bg-green-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-400 line-through text-sm">De R${kit.regularPrice.toFixed(2)}</span>
                  <span className="bg-red-500 text-white text-xs font-bold py-0.5 px-1 rounded">
                    ECONOMIZE R${(kit.regularPrice - kit.salePrice).toFixed(2)}
                  </span>
                </div>
                <div className="text-3xl font-bold text-green-700 mb-1">
                  <span className="text-sm font-normal">Por: </span>
                  {kit.installments}x R${kit.installmentValue.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">ou R${kit.salePrice.toFixed(2)} à vista</div>
                {kit.id !== "kit1" && (
                  <div className="text-sm font-medium text-green-700 mt-1">
                    Apenas R${(kit.salePrice / (kit.id === "kit3" ? 3 : 6)).toFixed(2)} por frasco
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">
                    Tratamento {kit.id === "kit6" ? "completo" : ""} de{" "}
                    <span className="font-bold">
                      {kit.id === "kit1" ? "1 mês" : kit.id === "kit3" ? "3 meses" : "6 meses"}
                    </span>
                  </span>
                </div>

                {kit.bonus.length > 0 &&
                  kit.bonus.map((bonus, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="font-medium">{bonus}</span>
                    </div>
                  ))}

                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">
                    {kit.freeShipping ? "Frete grátis para todo Brasil" : "Frete fixo R$ 29,90"}
                  </span>
                </div>

                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Envio imediato</span>
                </div>

                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Garantia de 30 dias ou seu dinheiro de volta</span>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-sm">
                <p className="font-medium text-yellow-800">
                  <span className="inline-block bg-yellow-200 text-yellow-800 px-1.5 py-0.5 rounded text-xs font-bold mr-1">
                    EMAGREÇA {kit.expectedResults.toUpperCase()}
                  </span>
                  COM ESSE KIT!
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <Link
                  href={addUtmToUrl(kit.link)}
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-5 py-4 text-lg font-bold text-white hover:from-green-500 hover:to-green-600 w-full hover:scale-105 transition-all shadow-lg hover:shadow-xl border-b-4 border-green-700 animate-pulse-border"
                >
                  COMPRAR AGORA <ArrowRight className="ml-2 h-5 w-5" />
                </Link>

                <button
                  onClick={openWhatsApp}
                  className="inline-flex items-center justify-center rounded-lg border border-green-600 px-5 py-3 text-base font-medium text-green-600 hover:bg-green-50 w-full"
                >
                  <MessageCircle className="mr-2 h-5 w-5" /> TIRAR DÚVIDAS
                </button>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-4">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium">Envio em 24h</span>
                </div>
                <div className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium">Compra segura</span>
                </div>
                <div className="flex items-center">
                  <RotateCcw className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium">30 dias de garantia</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Image src="/master.png" alt="Mastercard" width={60} height={40} className="h-8" />
                <Image src="/visa.png" alt="Visa" width={60} height={40} className="h-8" />
                <Image src="/hiper.png" alt="Hipercard" width={60} height={40} className="h-8" />
                <Image src="/pix.png" alt="Pix" width={60} height={40} className="h-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Description */}
      <section className="w-full py-8 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Descrição do Produto</h2>

          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-green-700 mb-4">O que é Definamax?</h3>
            <p className="mb-4">
              <strong>Definamax</strong> é um suplemento alimentar 100% natural desenvolvido para auxiliar no processo
              de emagrecimento de forma saudável e eficaz. Sua fórmula exclusiva combina fibras alimentares de alta
              potência que atuam em três frentes principais:
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-2">Absorção de Gordura</h4>
                <p className="text-sm">
                  As fibras especiais do Definamax se ligam às moléculas de gordura durante a digestão, impedindo que
                  até 76% da gordura consumida seja absorvida pelo organismo.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-2">Aumento da Saciedade</h4>
                <p className="text-sm">
                  O Psyllium e o Agar Agar expandem-se no estômago, criando uma sensação de plenitude que reduz o
                  apetite e controla a compulsão alimentar.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-2">Aceleração do Metabolismo</h4>
                <p className="text-sm">
                  Os componentes naturais como a Espirulina e o Cromo aumentam a termogênese corporal, elevando o
                  metabolismo basal para que seu corpo queime mais calorias naturalmente.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-green-700 mb-4">Benefícios do Definamax</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Emagrecimento rápido e saudável:</strong> resultados visíveis em poucas semanas de uso
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Controle da fome e ansiedade:</strong> redução da compulsão alimentar e da vontade de comer
                  doces
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Eliminação da gordura localizada:</strong> ação eficaz nas áreas mais difíceis como abdômen,
                  coxas e braços
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Aumento da energia e disposição:</strong> melhora significativa na qualidade de vida e
                  bem-estar
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Sem efeito sanfona:</strong> resultados duradouros com uso contínuo
                </span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-green-700 mb-4">Ingredientes</h3>
            <p className="mb-4">
              O Definamax é composto por ingredientes 100% naturais, cuidadosamente selecionados e combinados na
              proporção ideal para maximizar os resultados:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Quitosana</h4>
                <p className="text-sm">
                  Fibra natural derivada da quitina, capaz de se ligar às moléculas de gordura no sistema digestivo,
                  impedindo sua absorção.
                </p>
              </div>
              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Psyllium</h4>
                <p className="text-sm">
                  Fibra solúvel que expande no estômago, proporcionando sensação de saciedade prolongada e auxiliando no
                  controle do apetite.
                </p>
              </div>
              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Espirulina</h4>
                <p className="text-sm">
                  Alga rica em nutrientes que ajuda a acelerar o metabolismo e fornecer energia para o corpo.
                </p>
              </div>
              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Cromo</h4>
                <p className="text-sm">
                  Mineral que auxilia no controle dos níveis de açúcar no sangue, reduzindo a vontade de comer doces.
                </p>
              </div>
              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Agar Agar</h4>
                <p className="text-sm">
                  Fibra extraída de algas marinhas que expande no estômago, aumentando a sensação de saciedade.
                </p>
              </div>
              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Colágeno Hidrolisado</h4>
                <p className="text-sm">
                  Proteína que ajuda a manter a firmeza da pele durante o processo de emagrecimento, evitando a
                  flacidez.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-green-700 mb-4">Modo de Uso</h3>
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-green-700 font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Tome 2 cápsulas de Definamax por dia</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Preferencialmente 30 minutos antes do almoço ou jantar (sua refeição principal)
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-green-700 font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Ingira com um copo cheio de água (200-300ml)</p>
                    <p className="text-sm text-gray-600 mt-1">
                      A água é essencial para ativar as fibras e garantir seu funcionamento adequado
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-green-700 font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Use continuamente por pelo menos 3 meses</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Para resultados ótimos, recomenda-se o uso contínuo por 3 a 6 meses
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-green-700 mb-4">Informações Técnicas</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-200">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-4 bg-gray-50 font-medium">Nome do Produto</td>
                    <td className="py-2 px-4">Definamax</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-4 bg-gray-50 font-medium">Categoria</td>
                    <td className="py-2 px-4">Suplemento Alimentar</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-4 bg-gray-50 font-medium">Conteúdo por Frasco</td>
                    <td className="py-2 px-4">60 cápsulas (tratamento para 30 dias)</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-4 bg-gray-50 font-medium">Peso do Produto</td>
                    <td className="py-2 px-4">{kit.weight}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-4 bg-gray-50 font-medium">Registro</td>
                    <td className="py-2 px-4">Aprovado pela ANVISA (RDC 240/2018)</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-4 bg-gray-50 font-medium">Fabricação</td>
                    <td className="py-2 px-4">Produzido em laboratório certificado no Brasil</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-4 bg-gray-50 font-medium">Validade</td>
                    <td className="py-2 px-4">24 meses a partir da data de fabricação</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-4 bg-gray-50 font-medium">Código de Barras (GTIN)</td>
                    <td className="py-2 px-4">{kit.gtin}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 bg-gray-50 font-medium">Código do Fabricante (MPN)</td>
                    <td className="py-2 px-4">{kit.mpn}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-yellow-800">
                <strong>Importante:</strong> Resultados podem variar de pessoa para pessoa. O Definamax é um suplemento
                alimentar e não substitui uma alimentação equilibrada e hábitos saudáveis. Consulte seu médico antes de
                iniciar qualquer suplementação, especialmente se estiver grávida, amamentando ou em tratamento médico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping and Returns */}
      <section className="w-full py-8 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Envio e Garantia</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Truck className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">Informações de Envio</h3>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Prazo de envio</p>
                    <p className="text-sm text-gray-600">Enviamos em até 1 dia útil após a confirmação do pagamento</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Prazo de entrega</p>
                    <p className="text-sm text-gray-600">
                      Capitais: 3-7 dias úteis
                      <br />
                      Interior: 5-12 dias úteis
                      <br />
                      Norte/Nordeste: 7-15 dias úteis
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Frete</p>
                    <p className="text-sm text-gray-600">
                      {kit.freeShipping
                        ? "Grátis para todo o Brasil neste kit"
                        : "Taxa fixa de R$ 29,90 para todo o Brasil"}
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Rastreamento</p>
                    <p className="text-sm text-gray-600">
                      Você receberá um código de rastreio por e-mail assim que seu pedido for enviado
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Embalagem</p>
                    <p className="text-sm text-gray-600">
                      Enviamos em embalagem discreta, sem identificação do conteúdo, garantindo sua privacidade
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <ShieldCheck className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">Garantia e Devolução</h3>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Garantia de 30 dias</p>
                    <p className="text-sm text-gray-600">
                      Se você não estiver satisfeito com os resultados, devolvemos 100% do seu dinheiro
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Como solicitar reembolso</p>
                    <p className="text-sm text-gray-600">
                      Entre em contato com nosso suporte através do WhatsApp (41) 98454-9172 ou e-mail
                      suporte@definamaxoficial.com
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Prazo para devolução</p>
                    <p className="text-sm text-gray-600">
                      Você tem até 30 dias após o recebimento do produto para solicitar o reembolso
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Processo de reembolso</p>
                    <p className="text-sm text-gray-600">
                      O reembolso é processado em até 7 dias úteis após a aprovação da solicitação
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Garantia de qualidade</p>
                    <p className="text-sm text-gray-600">
                      Todos os produtos passam por rigorosos testes de qualidade antes de serem enviados
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="w-full py-8 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Avaliações de Clientes</h2>

          <div className="mb-8 flex items-center justify-center">
            <div className="flex items-center mr-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="ml-2 text-xl font-bold">4.9/5</span>
            </div>
            <span className="text-gray-600">Baseado em 3.842 avaliações verificadas</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-md">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 overflow-hidden mr-3">
                    <Image
                      src="/joana.png"
                      alt="Joana"
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Joana</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-500">15/04/2025</span>
              </div>
              <p className="text-sm mb-2">
                "Em 7 meses de Definamax, perdi 27kg! O melhor é que a fome sumiu e eu tenho uma energia incrível pra
                tudo. Super recomendo!"
              </p>
              <p className="text-xs text-green-700 font-medium">Compra verificada • Kit 6 Meses</p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-md">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 overflow-hidden mr-3">
                    <Image
                      src="/fernanda.png"
                      alt="Brenda"
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Brenda S.</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-500">02/03/2025</span>
              </div>
              <p className="text-sm mb-2">
                "Meu sonho era emagrecer naturalmente, mas nada funcionava, nem injeção! Com Definamax, perdi 22 kg e tô
                chocada com o resultado no meu corpo."
              </p>
              <p className="text-xs text-green-700 font-medium">Compra verificada • Kit 3 Meses</p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-md">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 overflow-hidden mr-3">
                    <Image
                      src="/h1p.png"
                      alt="Marcos"
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Marcos A.</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-500">18/02/2025</span>
              </div>
              <p className="text-sm mb-2">
                "Eu estava com o pé atrás, achando que não ia funcionar. Mas com o Definamax perdi 16kg em 3 meses! A
                diferença na minha barriga é enorme."
              </p>
              <p className="text-xs text-green-700 font-medium">Compra verificada • Kit 6 Meses</p>
            </div>
          </div>

          <div className="flex justify-center">
            <Link
              href="/perguntas-frequentes#definamax-reclame-aqui"
              className="inline-flex items-center justify-center rounded-lg border border-green-600 px-6 py-3 text-sm font-medium text-green-600 hover:bg-green-50"
            >
              Ver Mais Avaliações
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-8 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Perguntas Frequentes</h2>

          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">O que é Definamax e como ele funciona?</h3>
              <p className="text-sm text-gray-700">
                Definamax é um suplemento alimentar 100% natural que combina fibras de alta potência para absorver a
                gordura, aumentar a saciedade e acelerar o metabolismo. Ele funciona como um detox poderoso, promovendo
                resultados rápidos e visíveis em poucas semanas.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Como devo utilizar o Definamax?</h3>
              <p className="text-sm text-gray-700">
                Recomenda-se utilizar 2 cápsulas de Definamax por dia, preferencialmente antes das principais refeições,
                com um copo de água. Para obter os melhores resultados, utilize o produto de forma contínua por pelo
                menos 3 meses.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Definamax possui alguma contraindicação?</h3>
              <p className="text-sm text-gray-700">
                Definamax é um produto 100% natural e não possui contraindicações ou efeitos colaterais conhecidos. No
                entanto, gestantes, lactantes e pessoas com doenças preexistentes devem consultar um médico antes de
                iniciar o uso.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Qual o prazo de entrega do Definamax?</h3>
              <p className="text-sm text-gray-700">
                O prazo de entrega do Definamax varia de acordo com a sua região, mas geralmente é de 3 a 7 dias úteis
                para capitais, 5 a 12 dias úteis para interior e 7 a 15 dias úteis para regiões Norte e Nordeste.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">O Definamax é aprovado pela ANVISA?</h3>
              <p className="text-sm text-gray-700">
                Sim, o Definamax é um suplemento alimentar devidamente registrado na Agência Nacional de Vigilância
                Sanitária (ANVISA) sob a RDC 240/2018, que regulamenta os suplementos alimentares no Brasil.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Link
              href="/perguntas-frequentes"
              className="inline-flex items-center justify-center rounded-lg border border-green-600 px-6 py-3 text-sm font-medium text-green-600 hover:bg-green-50"
            >
              Ver Todas as Perguntas
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 bg-gradient-to-r from-green-600 to-green-500 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Transforme seu corpo com Definamax</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Junte-se a milhares de pessoas que já conquistaram o corpo dos sonhos. Aproveite nossa oferta especial por
            tempo limitado!
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Award className="h-10 w-10 text-yellow-300 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Qualidade Garantida</h3>
              <p className="text-sm text-white/80">Aprovado pela ANVISA e fabricado em laboratório certificado</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <ShieldCheck className="h-10 w-10 text-yellow-300 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Garantia de 30 Dias</h3>
              <p className="text-sm text-white/80">Satisfação garantida ou seu dinheiro de volta</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Truck className="h-10 w-10 text-yellow-300 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Entrega Rápida</h3>
              <p className="text-sm text-white/80">Envio em até 24h após confirmação do pagamento</p>
            </div>
          </div>

          <Link
            href={addUtmToUrl(kit.link)}
            className="inline-flex items-center justify-center rounded-lg bg-white text-green-600 px-8 py-4 text-lg font-bold hover:bg-gray-100 hover:scale-105 transition-all shadow-lg hover:shadow-xl"
          >
            COMPRAR {kit.name.toUpperCase()} <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Related Products */}
      <section className="w-full py-8 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Produtos Relacionados</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.values(kits)
              .filter((k) => k.id !== kit.id)
              .map((relatedKit) => (
                <div
                  key={relatedKit.id}
                  className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-2 px-4 text-center">
                    <h3 className="text-lg font-bold">{relatedKit.name}</h3>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-center mb-4 relative">
                      <Image
                        src={relatedKit.image || "/placeholder.svg"}
                        alt={relatedKit.title}
                        width={200}
                        height={200}
                        className="h-32 object-contain hover:scale-105 transition-all duration-300"
                      />
                      <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                        -{relatedKit.discount}%
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-3 mb-3">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <span className="text-gray-400 line-through text-sm">
                          De R${relatedKit.regularPrice.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-xl font-bold text-green-700 mb-1">
                        <span className="text-sm font-normal">Por: </span>
                        {relatedKit.installments}x R${relatedKit.installmentValue.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">ou R${relatedKit.salePrice.toFixed(2)} à vista</div>
                    </div>

                    <div className="space-y-2 mb-3 text-left">
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          Tratamento de{" "}
                          <span className="font-bold">
                            {relatedKit.id === "kit1" ? "1 mês" : relatedKit.id === "kit3" ? "3 meses" : "6 meses"}
                          </span>
                        </span>
                      </div>
                      {relatedKit.bonus.length > 0 &&
                        relatedKit.bonus.map((bonus, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{bonus}</span>
                          </div>
                        ))}
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          {relatedKit.freeShipping ? "Frete grátis" : "Frete fixo R$ 29,90"}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={addUtmToUrl(relatedKit.link)}
                      className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 w-full hover:scale-105 transition-all"
                    >
                      COMPRAR AGORA
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-green-800 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <Image src="/logo2.png" alt="Definamax" width={150} height={45} className="h-9 w-auto mx-auto mb-4" />
          <p className="text-sm mb-2">Definamax - O seu aliado natural para o emagrecimento saudável e eficaz.</p>
          <p className="text-xs text-gray-300 mb-4">
            *Resultados podem variar de pessoa para pessoa. Este produto não se destina a diagnosticar, tratar, curar ou
            prevenir qualquer doença. Consulte sempre um profissional de saúde qualificado antes de iniciar qualquer
            programa de emagrecimento.
          </p>
          <div className="flex justify-center space-x-4 mb-4">
            <Link href="/termos" className="text-sm hover:text-green-200">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="text-sm hover:text-green-200">
              Política de Privacidade
            </Link>
            <Link href="/termos-garantia" className="text-sm hover:text-green-200">
              Política de Reembolso
            </Link>
          </div>
          <p className="text-xs text-gray-300">
            Copyright © {new Date().getFullYear()} Definamax. Todos os direitos reservados.
          </p>
          <p className="text-xs text-gray-300 mt-2">Bourjun Nature Health, Florianópolis Santa Catarina</p>
        </div>
      </footer>

      {/* Botão flutuante do WhatsApp */}
      <div id="whatsAppButton" className="fixed bottom-4 right-4 z-50 transition-all duration-300 opacity-0">
        <button
          onClick={openWhatsApp}
          className="flex items-center justify-center rounded-full bg-green-500 p-4 text-white hover:bg-green-600 shadow-lg hover:shadow-xl transition-all animate-pulse-border hover:scale-110"
          aria-label="Fale conosco pelo WhatsApp"
        >
          <MessageCircle className="h-8 w-8" />
        </button>
        <span className="absolute bottom-full right-0 mb-2 bg-white text-green-600 text-xs font-bold py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap border border-green-200 animate-bounce">
          Dúvidas? Fale conosco!
        </span>
      </div>

      {/* Structured Data for Product */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: kit.title,
            image: [`https://www.definamaxoficial.com${kit.image}`, "https://www.definamaxoficial.com/mockup.png"],
            description:
              "Definamax é um suplemento natural para emagrecimento que absorve gordura, acelera o metabolismo e aumenta a saciedade, permitindo emagrecer sem dietas restritivas ou injeções perigosas.",
            brand: {
              "@type": "Brand",
              name: "Definamax",
            },
            gtin13: kit.gtin,
            mpn: kit.mpn,
            sku: kit.mpn,
            offers: {
              "@type": "Offer",
              url: `https://www.definamaxoficial.com/produto?kit=${kit.id}`,
              priceCurrency: "BRL",
              price: kit.salePrice.toFixed(2),
              priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                .toISOString()
                .split("T")[0],
              itemCondition: "https://schema.org/NewCondition",
              availability: kit.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              seller: {
                "@type": "Organization",
                name: "Definamax Oficial",
              },
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "3842",
              bestRating: "5",
              worstRating: "1",
            },
            review: [
              {
                "@type": "Review",
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: "5",
                  bestRating: "5",
                  worstRating: "1",
                },
                author: {
                  "@type": "Person",
                  name: "Joana",
                },
                datePublished: "2025-04-15",
                reviewBody:
                  "Em 7 meses de Definamax, perdi 27kg! O melhor é que a fome sumiu e eu tenho uma energia incrível pra tudo. Super recomendo!",
              },
              {
                "@type": "Review",
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: "5",
                  bestRating: "5",
                  worstRating: "1",
                },
                author: {
                  "@type": "Person",
                  name: "Brenda S.",
                },
                datePublished: "2025-03-02",
                reviewBody:
                  "Meu sonho era emagrecer naturalmente, mas nada funcionava, nem injeção! Com Definamax, perdi 22 kg e tô chocada com o resultado no meu corpo.",
              },
            ],
          }),
        }}
      />
    </main>
  )
}
