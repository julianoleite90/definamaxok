"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { CheckCircle2, ArrowRight, MessageCircle, Star, ShieldCheck, Truck } from "lucide-react"
import Head from "next/head"

// Definindo a interface para os kits
interface Kit {
  id: string;
  name: string;
  title: string;
  description: string;
  regularPrice: number;
  salePrice: number;
  discount: number;
  installments: number;
  installmentValue: number;
  image: string;
  link: string;
  shipping: number;
  freeShipping: boolean;
  bonus: string[];
  weight: string;
  gtin: string;
  mpn: string;
  inStock: boolean;
  expectedResults: string;
  bestSeller?: boolean;
}

interface Kits {
  [key: string]: Kit;
}

export default function ProdutoDefinamax() {
  // Estados para controlar o kit selecionado e a imagem
  const [selectedKit, setSelectedKit] = useState<"kit1" | "kit3" | "kit6">("kit3")
  const [currentImage, setCurrentImage] = useState("/3frascos.png")

  // Atualiza a imagem quando o kit é alterado
  useEffect(() => {
    setCurrentImage(kits[selectedKit].image)
  }, [selectedKit])

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

  // Função para adicionar UTMs aos links de compra
  const addUtmToUrl = (baseUrl: string): string => {
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
  const kits: Kits = {
    kit1: {
      id: "kit1",
      name: "Kit 1 Mês",
      title: "Definamax - Kit 1 Mês (1 Frasco)",
      description: "Kit inicial com 1 frasco de Definamax para 1 mês de uso (60 cápsulas). Suplemento alimentar natural com fibras e ingredientes naturais para apoiar um estilo de vida saudável.",
      regularPrice: 299.00,
      salePrice: 279.90,
      discount: 25.00,
      installments: 12,
      installmentValue: 23.33,
      image: "/1frasco.png",
      link: "https://full.sale/eMbtHp?src=googleshopping",
      shipping: 29.9,
      freeShipping: false,
      bonus: [],
      weight: "100g",
      gtin: "7898489348731",
      mpn: "DEFMAX-1M",
      inStock: true,
      expectedResults: "suporte inicial",
    },
    kit3: {
      id: "kit3",
      name: "Kit 3 Meses",
      title: "Definamax - Kit 3 Meses (3 Frascos)",
      description: "Kit recomendado com 3 frascos de Definamax para 3 meses de uso (180 cápsulas). Suplemento alimentar natural com fibras e ingredientes naturais para apoiar um estilo de vida saudável.",
      regularPrice: 758.00,
      salePrice: 379.00,
      discount: 379.00,
      installments: 12,
      installmentValue: 31.58,
      image: "/3frascos.png",
      link: "https://full.sale/DmNQj1?src=googleshopping",
      shipping: 0,
      freeShipping: true,
      bonus: ["3 Frascos Definamax"],
      weight: "300g",
      gtin: "7898489348748",
      mpn: "DEFMAX-3M",
      inStock: true,
      expectedResults: "suporte contínuo",
      bestSeller: true,
    },
    kit6: {
      id: "kit6",
      name: "Kit 6 Meses",
      title: "Definamax - Kit 6 Meses (6 Frascos)",
      description: "Kit completo com 6 frascos de Definamax para 6 meses de uso (360 cápsulas). Suplemento alimentar natural com fibras e ingredientes naturais para apoiar um estilo de vida saudável.",
      regularPrice: 1497.00,
      salePrice: 479.00,
      discount: 1018.00,
      installments: 12,
      installmentValue: 39.92,
      image: "/6frascos.png",
      link: "https://full.sale/ytA47b?src=googleshopping",
      shipping: 0,
      freeShipping: true,
      bonus: ["6 Frascos Definamax"],
      weight: "600g",
      gtin: "7898489348755",
      mpn: "DEFMAX-6M",
      inStock: true,
      expectedResults: "suporte prolongado",
    },
  }

  // Kit selecionado
  const kit = kits[selectedKit]

  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <Head>
        <title>{kit.title} - Definamax Emagrecedor Natural | Resultados Comprovados</title>
        <meta
          name="description"
          content={`${kit.description} Frete Grátis. Garantia de 30 dias. ⭐ ${kit.regularPrice.toFixed(2)} por ${kit.salePrice.toFixed(2)}`}
        />
        <meta
          name="keywords"
          content="Definamax, suplemento alimentar, fibras naturais, bem-estar, saúde, estilo de vida saudável, alimentação equilibrada, emagrecimento saudável"
        />
        <meta name="author" content="Definamax" />
        <meta name="robots" content="index, follow" />

        {/* Preço para Rich Snippets */}
        <meta name="price" content={kit.salePrice.toFixed(2)} />
        <meta name="currency" content="BRL" />
        <meta name="availability" content="in stock" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://www.definamaxoficial.com/produto?kit=${kit.id}`} />
        <meta property="og:title" content={kit.title} />
        <meta property="og:description" content={kit.description} />
        <meta property="og:image" content={`https://www.definamaxoficial.com${kit.image}`} />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta property="og:site_name" content="Definamax Oficial" />
        <meta property="og:locale" content="pt_BR" />

        {/* Product Metadata */}
        <meta property="product:price:amount" content={kit.salePrice.toString()} />
        <meta property="product:price:currency" content="BRL" />
        <meta property="product:availability" content="in stock" />
        <meta property="product:condition" content="new" />
        <meta property="product:retailer_item_id" content={kit.mpn} />
        <meta property="product:brand" content="Definamax" />
        <meta property="product:category" content="Saúde > Suplementos > Suplementos Alimentares" />
        <meta property="product:gtin13" content={kit.gtin} />
        <meta property="product:mpn" content={kit.mpn} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="product" />
        <meta name="twitter:title" content={kit.title} />
        <meta name="twitter:description" content={kit.description} />
        <meta name="twitter:image" content={`https://www.definamaxoficial.com${kit.image}`} />
        <meta name="twitter:label1" content="Preço" />
        <meta name="twitter:data1" content={`R$ ${kit.salePrice.toFixed(2)}`} />
        <meta name="twitter:label2" content="Disponibilidade" />
        <meta name="twitter:data2" content="Em estoque" />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://www.definamaxoficial.com/produto?kit=${kit.id}`} />
      </Head>

      {/* Header */}
      <header className="w-full bg-gradient-to-r from-green-800 via-green-700 to-green-800 py-3 shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image 
                src="/logo2.png" 
                alt="Definamax" 
                width={200} 
                height={60} 
                className="h-10 w-auto sm:h-12" 
              />
            </Link>

            {/* CTA Button */}
            <div className="flex items-center">
              <Link
                href={addUtmToUrl(kit.link)}
                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors sm:px-6 sm:py-3 sm:text-base"
              >
                <span className="hidden sm:inline">Comprar Agora</span>
                <span className="sm:hidden">Comprar</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Product Section - Google Shopping Compliant */}
      <section className="w-full py-8 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <div className="bg-white rounded-lg p-4 mb-4">
                                  <Image
                    src={currentImage}
                    alt={kit.title}
                    width={500}
                    height={500}
                    className="w-full h-auto object-contain max-h-[300px] sm:max-h-[500px]"
                    priority
                  />
                {kit.bonus.length > 0 && (
                  <div className="mt-4 bg-green-50 p-3 rounded-lg">
                    <p className="text-green-700 font-medium text-center">
                      {kit.bonus.join(" + ")}
                    </p>
                  </div>
                )}

                {/* Kit Selection Buttons */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <button
                    onClick={() => setSelectedKit("kit1")}
                    className={`border rounded-lg p-2 ${
                      selectedKit === "kit1" ? "border-green-500 bg-green-50" : "border-gray-200"
                    }`}
                  >
                    <div className="relative h-24 w-full flex items-center justify-center">
                      <Image 
                        src="/1frasco.png" 
                        alt="Kit 1 Mês" 
                        width={60} 
                        height={120} 
                        className="object-contain max-h-24" 
                      />
                    </div>
                    <p className="text-xs font-medium text-center mt-1">1 Frasco</p>
                  </button>

                  <button
                    onClick={() => setSelectedKit("kit3")}
                    className={`border rounded-lg p-2 ${
                      selectedKit === "kit3" ? "border-green-500 bg-green-50" : "border-gray-200"
                    }`}
                  >
                    <div className="relative h-24 w-full flex items-center justify-center">
                      <Image 
                        src="/3frascos.png" 
                        alt="Kit 3 Meses" 
                        width={80} 
                        height={120} 
                        className="object-contain max-h-24" 
                      />
                    </div>
                    <p className="text-xs font-medium text-center mt-1">3 Frascos</p>
                  </button>

                  <button
                    onClick={() => setSelectedKit("kit6")}
                    className={`border rounded-lg p-2 ${
                      selectedKit === "kit6" ? "border-green-500 bg-green-50" : "border-gray-200"
                    }`}
                  >
                    <div className="relative h-24 w-full flex items-center justify-center">
                      <Image 
                        src="/6frascos.png" 
                        alt="Kit 6 Meses" 
                        width={100} 
                        height={120} 
                        className="object-contain max-h-24" 
                      />
                    </div>
                    <p className="text-xs font-medium text-center mt-1">6 Frascos</p>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <nav className="text-sm mb-4">
                <ol className="flex items-center space-x-2">
                  <li><Link href="/" className="text-gray-500 hover:text-green-600">Início</Link></li>
                  <li className="text-gray-500">/</li>
                  <li><Link href="/produtos" className="text-gray-500 hover:text-green-600">Suplementos</Link></li>
                  <li className="text-gray-500">/</li>
                  <li className="text-gray-900 font-medium">{kit.name}</li>
                </ol>
              </nav>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">{kit.title}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">(3.842 avaliações)</span>
              </div>

              <div className="mb-6">
                <p className="text-gray-600">{kit.description}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-gray-500 line-through">R$ {kit.regularPrice.toFixed(2)}</span>
                  <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded">
                    {Math.round((kit.regularPrice - kit.salePrice) / kit.regularPrice * 100)}% OFF
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  R$ {kit.salePrice.toFixed(2)}
                </div>
                <div className="text-sm text-gray-700">
                  em até {kit.installments}x de <span className="font-semibold text-green-600">R$ {kit.installmentValue.toFixed(2)}</span> sem juros
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-green-600 mr-2" />
                  <span>Garantia de 30 dias ou seu dinheiro de volta</span>
                </div>
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-green-600 mr-2" />
                  <span>
                    {kit.freeShipping ? "Frete Grátis" : `Frete: R$ ${kit.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  <span>Em estoque - Envio em 24h</span>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href={addUtmToUrl(kit.link)}
                  className="flex items-center justify-center w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Comprar Agora <ArrowRight className="ml-2 h-5 w-5" />
                </Link>

                <button
                  onClick={openWhatsApp}
                  className="flex items-center justify-center w-full border border-green-600 text-green-600 py-3 px-6 rounded-lg font-medium hover:bg-green-50 transition-colors"
                >
                  <MessageCircle className="mr-2 h-5 w-5" /> Tirar Dúvidas
                </button>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="mt-12 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">O que é Definamax?</h2>
            <p className="text-gray-700 mb-8">
              Definamax é um suplemento alimentar 100% natural desenvolvido para auxiliar em um estilo de vida saudável. Sua fórmula combina fibras alimentares e ingredientes naturais que podem contribuir para o bem-estar geral quando utilizados com uma alimentação equilibrada e hábitos saudáveis.
            </p>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-green-700 font-semibold mb-2">Suporte à Digestão</h3>
                <p className="text-gray-600">As fibras do Definamax podem auxiliar na digestão, contribuindo para a saúde do sistema digestivo.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-green-700 font-semibold mb-2">Controle do Apetite</h3>
                <p className="text-gray-600">Ingredientes como Psyllium e Agar Agar podem ajudar a promover uma sensação de saciedade.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-green-700 font-semibold mb-2">Suporte ao Metabolismo</h3>
                <p className="text-gray-600">Componentes naturais, como Espirulina e Cromo, podem apoiar o metabolismo quando combinados com uma dieta saudável.</p>
              </div>
            </div>

            {/* Benefits List */}
            <h2 className="text-xl font-bold text-gray-900 mb-4">Benefícios do Definamax</h2>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                <span><strong>Suporte à alimentação saudável:</strong> Pode auxiliar no bem-estar geral quando combinado com uma dieta equilibrada.</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                <span><strong>Controle do apetite:</strong> Pode ajudar a reduzir a vontade de comer em excesso.</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                <span><strong>Apoio ao metabolismo:</strong> Pode contribuir para o funcionamento metabólico normal.</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                <span><strong>Mais energia:</strong> Pode promover maior disposição para as atividades diárias.</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                <span><strong>Ingredientes naturais:</strong> Fórmula composta por ingredientes de origem natural.</span>
              </li>
            </ul>

            {/* Ingredients */}
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ingredientes</h2>
            <p className="text-gray-700 mb-4">
              O Definamax é composto por ingredientes 100% naturais, cuidadosamente selecionados para apoiar um estilo de vida saudável:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Quitosana</h3>
                <p className="text-gray-600">Fibra natural derivada da quitina, que pode auxiliar na saúde digestiva.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Psyllium</h3>
                <p className="text-gray-600">Fibra solúvel que pode contribuir para a sensação de saciedade e saúde intestinal.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Espirulina</h3>
                <p className="text-gray-600">Alga rica em nutrientes que pode apoiar a energia e o bem-estar geral.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Cromo</h3>
                <p className="text-gray-600">Mineral que pode ajudar no metabolismo de carboidratos.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Agar Agar</h3>
                <p className="text-gray-600">Fibra extraída de algas marinhas que pode promover a sensação de saciedade.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Colágeno Hidrolisado</h3>
                <p className="text-gray-600">Proteína que pode apoiar a saúde da pele e articulações.</p>
              </div>
            </div>

            {/* Usage Instructions */}
            <h2 className="text-xl font-bold text-gray-900 mb-4">Modo de Uso</h2>
            <div className="bg-green-50 p-6 rounded-lg mb-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">1</div>
                  <div>
                    <h3 className="font-semibold mb-1">Tome 2 cápsulas de Definamax por dia</h3>
                    <p className="text-gray-600">Preferencialmente 30 minutos antes do almoço ou jantar (sua refeição principal)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">2</div>
                  <div>
                    <h3 className="font-semibold mb-1">Ingira com um copo cheio de água (200-300ml)</h3>
                    <p className="text-gray-600">A água é essencial para ativar as fibras e garantir seu funcionamento adequado</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">3</div>
                  <div>
                    <h3 className="font-semibold mb-1">Use continuamente por pelo menos 3 meses</h3>
                    <p className="text-gray-600">Para melhores resultados, recomenda-se o uso contínuo por 3 a 6 meses</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <h2 className="text-xl font-bold text-gray-900 mb-4">Especificações do Produto</h2>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50 w-1/3">
                      Marca
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Definamax
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                      GTIN/EAN
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {kit.gtin}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                      MPN
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {kit.mpn}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                      Categoria
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Saúde &gt; Suplementos &gt; Suplementos Alimentares
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                      Conteúdo
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {kit.id === "kit1" ? "60" : kit.id === "kit3" ? "180" : "360"} cápsulas
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                      Peso
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {kit.weight}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                      Condição
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Novo
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Shipping and Warranty */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Envio e Garantia</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Shipping Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Truck className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold">Informações de Envio</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Prazo de envio</p>
                      <p className="text-gray-600">Enviamos em até 1 dia útil após a confirmação do pagamento</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Prazo de entrega</p>
                      <p className="text-gray-600">Capitais: 3-7 dias úteis</p>
                      <p className="text-gray-600">Interior: 5-12 dias úteis</p>
                      <p className="text-gray-600">Norte/Nordeste: 7-15 dias úteis</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Frete</p>
                      <p className="text-gray-600">Grátis para todo o Brasil neste kit</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Rastreamento</p>
                      <p className="text-gray-600">Você receberá um código de rastreio por e-mail assim que seu pedido for enviado</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Embalagem</p>
                      <p className="text-gray-600">Enviamos em embalagem discreta, sem identificação do conteúdo, garantindo sua privacidade</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warranty Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold">Garantia e Devolução</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Garantia de 30 dias</p>
                      <p className="text-gray-600">Se você não estiver satisfeito com o produto, devolvemos 100% do seu dinheiro</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Como solicitar reembolso</p>
                      <p className="text-gray-600">Entre em contato com nosso suporte através do WhatsApp (41) 98454-9172 ou e-mail suporte@definamaxoficial.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Prazo para devolução</p>
                      <p className="text-gray-600">Você tem até 30 dias após o recebimento do produto para solicitar o reembolso</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Processo de reembolso</p>
                      <p className="text-gray-600">O reembolso é processado em até 7 dias úteis após a aprovação da solicitação</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Garantia de qualidade</p>
                      <p className="text-gray-600">Todos os produtos passam por rigorosos testes de qualidade antes de serem enviados</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Avaliações de Clientes</h2>
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-2xl font-bold text-gray-900 mx-2">4.9/5</span>
              <span className="text-gray-600">Baseado em 3.842 avaliações verificadas</span>
            </div>

            {/* Review Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Review 1 */}
              <div className="bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 hover:shadow-[0_4px_25px_rgba(0,0,0,0.08)] transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <Image
                    src="/joana.png"
                    alt="Joana"
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">Joana</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-gray-500 text-sm">15/04/2025</span>
                </div>
                <p className="text-gray-600 mb-3">"Após meses usando Definamax, senti mais disposição e bem-estar no meu dia a dia. O suplemento me ajudou a manter uma rotina mais saudável!"</p>
                <div className="flex items-center text-green-600 text-sm">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  <span>Compra verificada • Kit 6 Meses</span>
                </div>
              </div>

              {/* Review 2 */}
              <div className="bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 hover:shadow-[0_4px_25px_rgba(0,0,0,0.08)] transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <Image
                    src="/fernanda.png"
                    alt="Brenda S."
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">Brenda S.</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-gray-500 text-sm">02/03/2025</span>
                </div>
                <p className="text-gray-600 mb-3">"Definamax me ajudou a me sentir mais leve e com mais energia. Estou muito satisfeita com o suporte que ele oferece à minha rotina saudável."</p>
                <div className="flex items-center text-green-600 text-sm">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  <span>Compra verificada • Kit 3 Meses</span>
                </div>
              </div>

              {/* Review 3 */}
              <div className="bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 hover:shadow-[0_4px_25px_rgba(0,0,0,0.08)] transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <Image
                    src="/h1p.png"
                    alt="Marcos A."
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">Marcos A.</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-gray-500 text-sm">18/02/2025</span>
                </div>
                <p className="text-gray-600 mb-3">"Comecei a usar Definamax e notei uma melhora na minha disposição diária. Me sinto mais motivado para manter hábitos saudáveis."</p>
                <div className="flex items-center text-green-600 text-sm">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  <span>Compra verificada • Kit 6 Meses</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Perguntas Frequentes</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                  onClick={(e) => {
                    const content = e.currentTarget.nextElementSibling;
                    if (content) content.classList.toggle('hidden');
                  }}
                >
                  <span className="font-medium">O que é o Definamax?</span>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div id="faq1" className="hidden p-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600">
                    Definamax é um suplemento alimentar 100% natural desenvolvido para auxiliar em um estilo de vida saudável. Sua fórmula combina fibras alimentares e ingredientes naturais que podem contribuir para o bem-estar geral quando utilizados com uma alimentação equilibrada e hábitos saudáveis.
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                  onClick={(e) => {
                    const content = e.currentTarget.nextElementSibling;
                    if (content) content.classList.toggle('hidden');
                  }}
                >
                  <span className="font-medium">Como devo tomar o Definamax?</span>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div id="faq2" className="hidden p-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600">
                    Tome 2 cápsulas por dia, preferencialmente 30 minutos antes do almoço ou jantar, com um copo cheio de água (200-300ml). É importante manter o uso contínuo por pelo menos 3 meses para melhores resultados.
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                  onClick={(e) => {
                    const content = e.currentTarget.nextElementSibling;
                    if (content) content.classList.toggle('hidden');
                  }}
                >
                  <span className="font-medium">O Definamax tem efeitos colaterais?</span>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div id="faq3" className="hidden p-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600">
                    O Definamax é composto por ingredientes 100% naturais e é geralmente bem tolerado. Como todo suplemento, recomendamos consultar um profissional de saúde antes de iniciar o uso, especialmente se você estiver grávida, amamentando ou em tratamento médico.
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                  onClick={(e) => {
                    const content = e.currentTarget.nextElementSibling;
                    if (content) content.classList.toggle('hidden');
                  }}
                >
                  <span className="font-medium">Quanto tempo leva para ver resultados?</span>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div id="faq4" className="hidden p-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600">
                    Os resultados podem variar de pessoa para pessoa, mas geralmente os usuários começam a notar mudanças após 30 dias de uso contínuo. Para resultados mais significativos, recomendamos o uso por pelo menos 3 meses, combinado com uma alimentação equilibrada e hábitos saudáveis.
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                  onClick={(e) => {
                    const content = e.currentTarget.nextElementSibling;
                    if (content) content.classList.toggle('hidden');
                  }}
                >
                  <span className="font-medium">O produto tem garantia?</span>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div id="faq5" className="hidden p-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600">
                    Sim! Oferecemos garantia de satisfação de 30 dias. Se você não estiver satisfeito com o produto, pode solicitar o reembolso de 100% do valor dentro deste período. Entre em contato com nosso suporte para mais informações sobre o processo de devolução.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-green-800 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <Image src="/logo2.png" alt="Definamax" width={150} height={45} className="h-9 w-auto mx-auto mb-4" />
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

      {/* Structured Data for Google Shopping */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: kit.title,
            description: kit.description,
            image: [`https://www.definamaxoficial.com${kit.image}`],
            brand: {
              "@type": "Brand",
              name: "Definamax"
            },
            gtin13: kit.gtin,
            mpn: kit.mpn,
            sku: kit.mpn,
            category: "Saúde > Suplementos > Suplementos Alimentares",
            weight: kit.weight,
            offers: {
              "@type": "Offer",
              url: `https://www.definamaxoficial.com/produto?kit=${kit.id}`,
              priceCurrency: "BRL",
              price: kit.salePrice.toFixed(2),
              priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
              itemCondition: "https://schema.org/NewCondition",
              availability: kit.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              seller: {
                "@type": "Organization",
                name: "Definamax Oficial",
                url: "https://www.definamaxoficial.com"
              },
              priceSpecification: {
                "@type": "PriceSpecification",
                price: kit.salePrice.toFixed(2),
                priceCurrency: "BRL",
                valueAddedTaxIncluded: true
              },
              hasMerchantReturnPolicy: {
                "@type": "MerchantReturnPolicy",
                applicableCountry: "BR",
                returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
                merchantReturnDays: 30,
                returnMethod: "https://schema.org/ReturnByMail",
                returnFees: "https://schema.org/FreeReturn"
              },
              shippingDetails: {
                "@type": "OfferShippingDetails",
                shippingRate: {
                  "@type": "MonetaryAmount",
                  value: kit.shipping,
                  currency: "BRL"
                },
                shippingDestination: {
                  "@type": "DefinedRegion",
                  addressCountry: "BR"
                },
                deliveryTime: {
                  "@type": "ShippingDeliveryTime",
                  handlingTime: {
                    "@type": "QuantitativeValue",
                    minValue: 1,
                    maxValue: 1,
                    unitCode: "DAY"
                  },
                  transitTime: {
                    "@type": "QuantitativeValue",
                    minValue: 3,
                    maxValue: 7,
                    unitCode: "DAY"
                  }
                }
              }
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "3842",
              bestRating: "5",
              worstRating: "1"
            },
            review: [
              {
                "@type": "Review",
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: "5",
                  bestRating: "5"
                },
                author: {
                  "@type": "Person",
                  name: "Joana"
                },
                datePublished: "2025-04-15",
                reviewBody: "Após meses usando Definamax, senti mais disposição e bem-estar no meu dia a dia. O suplemento me ajudou a manter uma rotina mais saudável!"
              },
              {
                "@type": "Review",
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: "5",
                  bestRating: "5"
                },
                author: {
                  "@type": "Person",
                  name: "Brenda S."
                },
                datePublished: "2025-03-02",
                reviewBody: "Definamax me ajudou a me sentir mais leve e com mais energia. Estou muito satisfeita com o suporte que ele oferece à minha rotina saudável."
              }
            ]
          })
        }}
      />
    </main>
  )
}