"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { CheckCircle2, X, ArrowRight, MessageCircle, ChevronDown, ChevronUp } from "lucide-react"
import Head from "next/head"

export default function DefinamaxFAQ() {
  // Estado para controlar quais perguntas estão abertas no acordeão
  const [openFaqs, setOpenFaqs] = useState({
    faq1: true,
    faq2: false,
    faq3: false,
    faq4: false,
    faq5: false,
    faq6: false,
    faq7: false,
    faq8: false,
    faq9: false,
  })

  // Estado para controlar a visibilidade do botão do WhatsApp
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false)

  // Função para alternar o estado de uma pergunta
  const toggleFaq = (faqId) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [faqId]: !prev[faqId],
    }))
  }

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

  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <Head>
        <title>Definamax: Perguntas Frequentes | Tudo Sobre o Suplemento Natural para Emagrecimento</title>
        <meta
          name="description"
          content="Tire todas as suas dúvidas sobre o Definamax: o que é, como funciona, como usar, aprovação ANVISA, onde comprar, tempo de entrega e descontos disponíveis."
        />
        <meta
          name="keywords"
          content="Definamax, o que é Definamax, como Definamax funciona, como usar Definamax, Definamax ANVISA, Definamax farmácia, Definamax Reclame Aqui, Definamax tempo de entrega, desconto Definamax"
        />
        <meta name="author" content="Definamax" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.definamaxoficial.com/perguntas-frequentes" />
        <meta
          property="og:title"
          content="Definamax: Perguntas Frequentes | Tudo Sobre o Suplemento Natural para Emagrecimento"
        />
        <meta
          property="og:description"
          content="Tire todas as suas dúvidas sobre o Definamax: o que é, como funciona, como usar, aprovação ANVISA, onde comprar, tempo de entrega e descontos disponíveis."
        />
        <meta property="og:image" content="https://www.definamaxoficial.com/mockup.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.definamaxoficial.com/perguntas-frequentes" />
        <meta
          property="twitter:title"
          content="Definamax: Perguntas Frequentes | Tudo Sobre o Suplemento Natural para Emagrecimento"
        />
        <meta
          property="twitter:description"
          content="Tire todas as suas dúvidas sobre o Definamax: o que é, como funciona, como usar, aprovação ANVISA, onde comprar, tempo de entrega e descontos disponíveis."
        />
        <meta property="twitter:image" content="https://www.definamaxoficial.com/mockup.png" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.definamaxoficial.com/perguntas-frequentes" />

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

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-green-50 to-white py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
            Perguntas Frequentes sobre <span className="text-green-600">Definamax</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Tire todas as suas dúvidas sobre o Definamax, o suplemento natural que está revolucionando o emagrecimento
            saudável no Brasil.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href={addUtmToUrl("https://full.sale/DmNQj1")}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 text-base font-bold text-white hover:from-green-500 hover:to-green-600 hover:scale-105 transition-all shadow-lg hover:shadow-xl border-b-4 border-green-700"
            >
              COMPRAR DEFINAMAX <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button
              onClick={openWhatsApp}
              className="inline-flex items-center justify-center rounded-lg border border-green-600 px-6 py-3 text-base font-medium text-green-600 hover:bg-green-50"
            >
              <MessageCircle className="mr-2 h-5 w-5" /> Falar com Atendimento
            </button>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm font-medium">4.9/5 (3.842 avaliações verificadas)</span>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="mx-auto max-w-5xl px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600">
              Início
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-gray-900">Perguntas Frequentes</span>
          </div>
        </div>
      </div>

      {/* Main Content - FAQ */}
      <section className="w-full py-12 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Sidebar with quick links */}
            <div className="md:col-span-1">
              <div className="bg-green-50 rounded-lg p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Navegação Rápida</h2>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => toggleFaq("faq1")}
                      className="text-left w-full text-green-700 hover:text-green-500 font-medium"
                    >
                      O que é Definamax?
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => toggleFaq("faq2")}
                      className="text-left w-full text-green-700 hover:text-green-500 font-medium"
                    >
                      Como Definamax Funciona?
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => toggleFaq("faq3")}
                      className="text-left w-full text-green-700 hover:text-green-500 font-medium"
                    >
                      Como usar Definamax?
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => toggleFaq("faq4")}
                      className="text-left w-full text-green-700 hover:text-green-500 font-medium"
                    >
                      Definamax é aprovado pela Anvisa?
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => toggleFaq("faq5")}
                      className="text-left w-full text-green-700 hover:text-green-500 font-medium"
                    >
                      Definamax vende em farmácia?
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => toggleFaq("faq6")}
                      className="text-left w-full text-green-700 hover:text-green-500 font-medium"
                    >
                      Definamax Reclame Aqui
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => toggleFaq("faq7")}
                      className="text-left w-full text-green-700 hover:text-green-500 font-medium"
                    >
                      Definamax tempo de entrega?
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => toggleFaq("faq8")}
                      className="text-left w-full text-green-700 hover:text-green-500 font-medium"
                    >
                      Desconto Definamax?
                    </button>
                  </li>
                </ul>

                <div className="mt-8">
                  <div className="bg-white rounded-lg border border-green-200 p-4">
                    <div className="flex items-center mb-3">
                      <Image
                        src="/mockup.png"
                        alt="Definamax"
                        width={60}
                        height={100}
                        className="h-16 w-auto object-contain mr-3"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">Definamax</h3>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Link
                      href={addUtmToUrl("https://full.sale/DmNQj1")}
                      className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 w-full"
                    >
                      COMPRAR AGORA
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Main FAQ content */}
            <div className="md:col-span-2">
              <div className="space-y-6">
                {/* FAQ 1 - O que é Definamax? */}
                <div id="o-que-e-definamax" className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    className="w-full text-left py-5 px-6 font-bold text-gray-800 flex justify-between items-center"
                    onClick={() => toggleFaq("faq1")}
                    aria-expanded={openFaqs.faq1}
                  >
                    <h2 className="text-xl md:text-2xl">O que é Definamax?</h2>
                    {openFaqs.faq1 ? (
                      <ChevronUp className="h-6 w-6 text-green-600" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-green-600" />
                    )}
                  </button>
                  <div
                    className={`px-6 pb-6 text-gray-700 transition-all duration-300 overflow-hidden ${
                      openFaqs.faq1 ? "block" : "hidden"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
                      <div className="md:w-1/3">
                        <Image
                          src="/mockup.png"
                          alt="Definamax - Suplemento Natural para Emagrecimento"
                          width={300}
                          height={400}
                          className="w-full h-auto object-contain rounded-lg"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <p className="mb-4">
                          <strong>Definamax</strong> é um suplemento alimentar 100% natural desenvolvido para auxiliar
                          no processo de emagrecimento de forma saudável e eficaz. Sua fórmula exclusiva combina fibras
                          alimentares de alta potência que atuam em três frentes principais:
                        </p>
                        <ul className="space-y-2 mb-4">
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>
                              <strong>Absorção de gordura:</strong> captura e elimina até 76% da gordura ingerida nas
                              refeições
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>
                              <strong>Aumento da saciedade:</strong> reduz a fome e controla a compulsão alimentar
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>
                              <strong>Aceleração do metabolismo:</strong> aumenta a queima de calorias mesmo em repouso
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <p className="mb-4">
                      O Definamax foi desenvolvido por especialistas em nutrição e conta com ingredientes naturais
                      cuidadosamente selecionados, como:
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-green-700 mb-2">Quitosana</h3>
                        <p className="text-sm">
                          Fibra natural que se liga às moléculas de gordura no sistema digestivo, impedindo sua absorção
                          pelo organismo.
                        </p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-green-700 mb-2">Psyllium</h3>
                        <p className="text-sm">
                          Fibra solúvel que expande no estômago, proporcionando sensação de saciedade prolongada e
                          auxiliando no controle do apetite.
                        </p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-green-700 mb-2">Espirulina</h3>
                        <p className="text-sm">
                          Alga rica em nutrientes que ajuda a acelerar o metabolismo e fornecer energia para o corpo.
                        </p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-green-700 mb-2">Cromo</h3>
                        <p className="text-sm">
                          Mineral que auxilia no controle dos níveis de açúcar no sangue, reduzindo a vontade de comer
                          doces.
                        </p>
                      </div>
                    </div>

                    <p className="mb-4">
                      Diferente de outros métodos de emagrecimento, o Definamax não exige dietas restritivas ou
                      exercícios intensos para apresentar resultados. Ele trabalha naturalmente com seu corpo para
                      promover a perda de peso de forma saudável e sustentável.
                    </p>

                    <p className="mb-4">
                      Cada frasco de Definamax contém 60 cápsulas, suficientes para um mês de tratamento. O produto é
                      fabricado em laboratório certificado e segue rigorosos padrões de qualidade.
                    </p>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <p className="text-sm font-medium text-yellow-800">
                        <strong>Importante:</strong> Resultados podem variar de pessoa para pessoa. O Definamax é um
                        suplemento alimentar e não substitui uma alimentação equilibrada e hábitos saudáveis.
                      </p>
                    </div>

                    <div className="flex justify-center mt-6">
                      <Link
                        href={addUtmToUrl("https://full.sale/DmNQj1")}
                        className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-base font-medium text-white hover:bg-green-700 hover:scale-105 transition-all"
                      >
                        EXPERIMENTAR DEFINAMAX <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* FAQ 2 - Como Definamax Funciona? */}
                <div
                  id="como-definamax-funciona"
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    className="w-full text-left py-5 px-6 font-bold text-gray-800 flex justify-between items-center"
                    onClick={() => toggleFaq("faq2")}
                    aria-expanded={openFaqs.faq2}
                  >
                    <h2 className="text-xl md:text-2xl">Como Definamax Funciona?</h2>
                    {openFaqs.faq2 ? (
                      <ChevronUp className="h-6 w-6 text-green-600" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-green-600" />
                    )}
                  </button>
                  <div
                    className={`px-6 pb-6 text-gray-700 transition-all duration-300 overflow-hidden ${
                      openFaqs.faq2 ? "block" : "hidden"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
                      <div className="md:w-1/2">
                        <Image
                          src="/clorela.png"
                          alt="Como o Definamax funciona no organismo"
                          width={400}
                          height={300}
                          className="w-full h-auto object-contain rounded-lg"
                        />
                      </div>
                      <div className="md:w-1/2">
                        <p className="mb-4">
                          O <strong>Definamax</strong> funciona através de um mecanismo triplo de ação que atua
                          diretamente nos principais fatores que dificultam o emagrecimento. Sua fórmula exclusiva
                          trabalha de forma sinérgica para proporcionar resultados visíveis em poucas semanas.
                        </p>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-green-700 mb-3">Os 3 mecanismos de ação do Definamax:</h3>

                    <div className="space-y-6 mb-6">
                      <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 rounded-r-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">1. Absorção e Eliminação de Gordura</h4>
                        <p>
                          A Quitosana presente no Definamax é uma fibra natural com uma propriedade única: ela consegue
                          se ligar às moléculas de gordura durante o processo digestivo. Quando você ingere alimentos
                          gordurosos, a Quitosana captura até 76% dessa gordura, impedindo que ela seja absorvida pelo
                          organismo. Em vez disso, essa gordura é naturalmente eliminada pelo corpo.
                        </p>
                        <p className="mt-2">
                          <strong>Resultado:</strong> Mesmo consumindo alimentos com gordura, seu corpo absorve
                          significativamente menos calorias, criando um déficit calórico natural que favorece o
                          emagrecimento.
                        </p>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 rounded-r-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">2. Aumento da Saciedade</h4>
                        <p>
                          O Psyllium e o Agar Agar são fibras solúveis que, ao entrarem em contato com a água no
                          estômago, expandem-se significativamente. Essa expansão cria uma sensação natural de plenitude
                          gástrica, reduzindo a fome e controlando a compulsão alimentar.
                        </p>
                        <p className="mt-2">
                          <strong>Resultado:</strong> Você naturalmente come menos, sem sentir aquela fome angustiante
                          ou ansiedade por comida. Isso ajuda a reduzir a ingestão calórica total sem o sofrimento das
                          dietas restritivas.
                        </p>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 rounded-r-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">3. Aceleração do Metabolismo</h4>
                        <p>
                          A Espirulina, o Cromo e outros componentes termogênicos do Definamax trabalham para aumentar o
                          metabolismo basal do corpo. Isso significa que seu organismo passa a queimar mais calorias
                          mesmo quando você está em repouso.
                        </p>
                        <p className="mt-2">
                          <strong>Resultado:</strong> Seu corpo se torna mais eficiente na queima de gordura,
                          especialmente nas áreas mais problemáticas como abdômen, coxas e braços. Além disso, você
                          experimenta um aumento na disposição e energia.
                        </p>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-green-700 mb-3">Ciclo de funcionamento do Definamax:</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-white border border-green-200 rounded-lg p-4 text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-green-700 font-bold text-lg">1</span>
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2">Primeiras 2 semanas</h4>
                        <p className="text-sm">
                          Desintoxicação do organismo, redução do inchaço e início da sensação de saciedade aumentada.
                        </p>
                      </div>

                      <div className="bg-white border border-green-200 rounded-lg p-4 text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-green-700 font-bold text-lg">2</span>
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2">1º mês</h4>
                        <p className="text-sm">
                          Perda de peso inicial (3-5kg em média), redução da compulsão alimentar e aumento da energia.
                        </p>
                      </div>

                      <div className="bg-white border border-green-200 rounded-lg p-4 text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-green-700 font-bold text-lg">3</span>
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2">2-3 meses</h4>
                        <p className="text-sm">
                          Perda de peso significativa (8-15kg em média), redução visível de medidas e melhora da
                          autoestima.
                        </p>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-green-700 mb-2">Diferenciais do Definamax:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Não causa efeito sanfona:</strong> ao contrário de dietas restritivas, o Definamax
                            promove mudanças sustentáveis no metabolismo
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Sem efeitos colaterais:</strong> por ser 100% natural, não causa os efeitos
                            indesejados comuns em medicamentos para emagrecimento
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Não exige dietas restritivas:</strong> funciona mesmo sem mudanças drásticas na
                            alimentação
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Resultados visíveis:</strong> a maioria dos usuários relata mudanças perceptíveis já
                            nas primeiras semanas de uso
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex justify-center mt-6">
                      <Link
                        href={addUtmToUrl("https://full.sale/DmNQj1")}
                        className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-base font-medium text-white hover:bg-green-700 hover:scale-105 transition-all"
                      >
                        QUERO EXPERIMENTAR <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* FAQ 3 - Como usar Definamax? */}
                <div id="como-usar-definamax" className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    className="w-full text-left py-5 px-6 font-bold text-gray-800 flex justify-between items-center"
                    onClick={() => toggleFaq("faq3")}
                    aria-expanded={openFaqs.faq3}
                  >
                    <h2 className="text-xl md:text-2xl">Como usar Definamax?</h2>
                    {openFaqs.faq3 ? (
                      <ChevronUp className="h-6 w-6 text-green-600" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-green-600" />
                    )}
                  </button>
                  <div
                    className={`px-6 pb-6 text-gray-700 transition-all duration-300 overflow-hidden ${
                      openFaqs.faq3 ? "block" : "hidden"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
                      <div className="md:w-1/3">
                        <Image
                          src="/1f.png"
                          alt="Como usar Definamax corretamente"
                          width={300}
                          height={400}
                          className="w-full h-auto object-contain rounded-lg"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <h3 className="text-lg font-semibold text-green-700 mb-3">Modo de uso recomendado:</h3>
                        <ul className="space-y-4">
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
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-yellow-800 mb-2">Dicas importantes:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Beba bastante água:</strong> recomenda-se ingerir pelo menos 2 litros de água por
                            dia para potencializar os efeitos do Definamax
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Regularidade é essencial:</strong> tome as cápsulas todos os dias, preferencialmente
                            no mesmo horário
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Não exceda a dosagem recomendada:</strong> tomar mais cápsulas não acelera os
                            resultados e pode causar desconforto digestivo
                          </span>
                        </li>
                      </ul>
                    </div>

                    <h3 className="text-lg font-semibold text-green-700 mb-3">Perguntas comuns sobre o uso:</h3>

                    <div className="space-y-4 mb-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          Posso tomar Definamax junto com outros medicamentos?
                        </h4>
                        <p className="text-sm">
                          Se você faz uso contínuo de medicamentos, é recomendável consultar seu médico antes de iniciar
                          o uso do Definamax. Recomenda-se um intervalo de pelo menos 2 horas entre a ingestão do
                          Definamax e outros medicamentos.
                        </p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          Preciso fazer dieta enquanto tomo Definamax?
                        </h4>
                        <p className="text-sm">
                          O Definamax funciona mesmo sem dietas restritivas. No entanto, para maximizar os resultados,
                          recomenda-se manter uma alimentação equilibrada e evitar o consumo excessivo de alimentos
                          ultraprocessados e bebidas alcoólicas.
                        </p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          Quanto tempo leva para ver os primeiros resultados?
                        </h4>
                        <p className="text-sm">
                          A maioria dos usuários relata os primeiros resultados entre 15 e 30 dias de uso contínuo.
                          Estes incluem redução do inchaço, controle da fome e perda inicial de peso. Os resultados mais
                          significativos geralmente são observados após 2-3 meses de uso.
                        </p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          Posso usar Definamax se estiver grávida ou amamentando?
                        </h4>
                        <p className="text-sm">
                          Não é recomendado o uso de Definamax durante a gravidez ou amamentação. Consulte sempre seu
                          médico antes de iniciar qualquer suplementação nestes períodos.
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center mt-6">
                      <Link
                        href={addUtmToUrl("https://full.sale/DmNQj1")}
                        className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-base font-medium text-white hover:bg-green-700 hover:scale-105 transition-all"
                      >
                        COMPRAR DEFINAMAX <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* FAQ 4 - Definamax é aprovado pela Anvisa? */}
                <div
                  id="definamax-aprovado-anvisa"
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    className="w-full text-left py-5 px-6 font-bold text-gray-800 flex justify-between items-center"
                    onClick={() => toggleFaq("faq4")}
                    aria-expanded={openFaqs.faq4}
                  >
                    <h2 className="text-xl md:text-2xl">Definamax é aprovado pela Anvisa?</h2>
                    {openFaqs.faq4 ? (
                      <ChevronUp className="h-6 w-6 text-green-600" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-green-600" />
                    )}
                  </button>
                  <div
                    className={`px-6 pb-6 text-gray-700 transition-all duration-300 overflow-hidden ${
                      openFaqs.faq4 ? "block" : "hidden"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
                      <div className="md:w-1/3">
                        <Image
                          src="/anvisa.png"
                          alt="Selo de aprovação ANVISA para Definamax"
                          width={200}
                          height={200}
                          className="w-full h-auto object-contain rounded-lg"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <h3 className="text-lg font-semibold text-green-700 mb-3">
                          Sim, Definamax é aprovado pela ANVISA
                        </h3>
                        <p className="mb-4">
                          O <strong>Definamax</strong> é um suplemento alimentar devidamente registrado na Agência
                          Nacional de Vigilância Sanitária (ANVISA) sob a RDC 240/2018, que regulamenta os suplementos
                          alimentares no Brasil.
                        </p>
                        <p>
                          Isso significa que o produto passou por rigorosos testes de qualidade e segurança, atendendo a
                          todos os requisitos legais para comercialização no país.
                        </p>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-green-700 mb-2">O que significa a aprovação da ANVISA?</h3>
                      <p className="mb-3">A aprovação da ANVISA garante que o Definamax:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>É produzido em laboratório certificado com Boas Práticas de Fabricação (BPF)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            Contém ingredientes permitidos pela legislação brasileira e nas dosagens adequadas
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Passou por testes de controle de qualidade e segurança</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Possui rotulagem adequada com todas as informações exigidas pela legislação</span>
                        </li>
                      </ul>
                    </div>

                    <h3 className="text-lg font-semibold text-green-700 mb-3">Garantias de qualidade do Definamax:</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Fabricação Certificada</h4>
                        <p className="text-sm">
                          O Definamax é produzido em laboratório brasileiro certificado, seguindo rigorosos padrões de
                          qualidade e controle em todas as etapas de fabricação.
                        </p>
                      </div>

                      <div className="bg-white border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Ingredientes de Alta Qualidade</h4>
                        <p className="text-sm">
                          Todos os ingredientes utilizados na fórmula do Definamax são de origem natural e passam por
                          rigorosos testes de pureza antes de serem incorporados ao produto.
                        </p>
                      </div>

                      <div className="bg-white border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Testes de Eficácia</h4>
                        <p className="text-sm">
                          A fórmula do Definamax foi desenvolvida com base em estudos científicos que comprovam a
                          eficácia de seus componentes no processo de emagrecimento.
                        </p>
                      </div>

                      <div className="bg-white border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Garantia de Satisfação</h4>
                        <p className="text-sm">
                          O Definamax oferece garantia de 30 dias. Se você não estiver satisfeito com os resultados,
                          pode solicitar o reembolso integral do valor pago.
                        </p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-yellow-800 mb-2">Importante saber:</h3>
                      <p className="text-sm">
                        Como suplemento alimentar, o Definamax não requer prescrição médica para ser adquirido. No
                        entanto, sempre recomendamos consultar um profissional de saúde antes de iniciar qualquer
                        suplementação, especialmente se você possui condições médicas preexistentes ou faz uso de
                        medicamentos contínuos.
                      </p>
                    </div>

                    <p className="mb-4">
                      A aprovação da ANVISA é um selo de qualidade que garante a segurança e confiabilidade do
                      Definamax. Ao adquirir o produto através dos canais oficiais, você tem a certeza de estar
                      consumindo um suplemento que atende a todos os requisitos legais e de qualidade exigidos pela
                      legislação brasileira.
                    </p>

                    <div className="flex justify-center mt-6">
                      <Link
                        href={addUtmToUrl("https://full.sale/DmNQj1")}
                        className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-base font-medium text-white hover:bg-green-700 hover:scale-105 transition-all"
                      >
                        COMPRAR DEFINAMAX OFICIAL <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* FAQ 5 - Definamax vende em farmácia? */}
                <div
                  id="definamax-vende-farmacia"
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    className="w-full text-left py-5 px-6 font-bold text-gray-800 flex justify-between items-center"
                    onClick={() => toggleFaq("faq5")}
                    aria-expanded={openFaqs.faq5}
                  >
                    <h2 className="text-xl md:text-2xl">Definamax vende em farmácia?</h2>
                    {openFaqs.faq5 ? (
                      <ChevronUp className="h-6 w-6 text-green-600" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-green-600" />
                    )}
                  </button>
                  <div
                    className={`px-6 pb-6 text-gray-700 transition-all duration-300 overflow-hidden ${
                      openFaqs.faq5 ? "block" : "hidden"
                    }`}
                  >
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-red-700 mb-2">Atenção: Definamax NÃO é vendido em farmácias</h3>
                      <p>
                        O <strong>Definamax</strong> é um produto exclusivo que <strong>não é comercializado</strong> em
                        farmácias, drogarias ou lojas físicas. Ele está disponível apenas através do site oficial e
                        canais de venda autorizados online.
                      </p>
                    </div>

                    <h3 className="text-lg font-semibold text-green-700 mb-3">Onde comprar Definamax original:</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                          Site Oficial
                        </h4>
                        <p className="mb-3">
                          A única forma de garantir que você está adquirindo o Definamax original é comprando pelo site
                          oficial ou links autorizados.
                        </p>
                        <div className="bg-white rounded-lg p-3 border border-green-100">
                          <div className="flex items-center mb-2">
                            <Image
                              src="/mockup.png"
                              alt="Definamax Original"
                              width={60}
                              height={100}
                              className="h-14 w-auto object-contain mr-3"
                            />
                            <div>
                              <h5 className="font-semibold text-sm">Definamax Original</h5>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg key={star} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>
                          <Link
                            href={addUtmToUrl("https://full.sale/DmNQj1")}
                            className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 w-full"
                          >
                            COMPRAR ORIGINAL
                          </Link>
                        </div>
                      </div>

                      <div className="bg-red-50 border border-red-200 rounded-lg p-5">
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <X className="h-5 w-5 text-red-600 mr-2" />
                          Locais NÃO autorizados
                        </h4>
                        <p className="mb-3">
                          Desconfie de Definamax vendido em outros locais. Produtos encontrados em marketplaces ou lojas
                          físicas podem ser falsificados.
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <X className="h-4 w-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Farmácias e drogarias</span>
                          </li>
                          <li className="flex items-start">
                            <X className="h-4 w-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Lojas de suplementos</span>
                          </li>
                          <li className="flex items-start">
                            <X className="h-4 w-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Marketplaces não oficiais</span>
                          </li>
                          <li className="flex items-start">
                            <X className="h-4 w-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Revendedores não autorizados</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-green-700 mb-3">
                      Por que o Definamax não é vendido em farmácias?
                    </h3>

                    <p className="mb-4">
                      A decisão de comercializar o Definamax exclusivamente através do site oficial e canais autorizados
                      online foi tomada por diversos motivos:
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-green-700 font-bold">1</span>
                        </div>
                        <div>
                          <p className="font-medium">Garantia de autenticidade</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Ao comprar diretamente do fabricante, você tem a certeza de estar adquirindo o produto
                            original, com todos os componentes da fórmula nas dosagens corretas.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-green-700 font-bold">2</span>
                        </div>
                        <div>
                          <p className="font-medium">Melhor preço</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Sem intermediários, o fabricante consegue oferecer o Definamax por um preço mais acessível,
                            além de promoções exclusivas e kits com descontos progressivos.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-green-700 font-bold">3</span>
                        </div>
                        <div>
                          <p className="font-medium">Garantia de satisfação</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Apenas comprando pelos canais oficiais você tem acesso à garantia de 30 dias, que permite
                            solicitar reembolso caso não esteja satisfeito com os resultados.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-yellow-800 mb-2">Como identificar o Definamax original:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Embalagem oficial:</strong> com selo holográfico de autenticidade
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Código de rastreio:</strong> cada frasco possui um código único que pode ser
                            verificado no site oficial
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Preço justo:</strong> desconfie de preços muito abaixo do oficial, pois podem
                            indicar falsificação
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex justify-center mt-6">
                      <Link
                        href={addUtmToUrl("https://full.sale/DmNQj1")}
                        className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-base font-medium text-white hover:bg-green-700 hover:scale-105 transition-all"
                      >
                        COMPRAR DEFINAMAX ORIGINAL <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* FAQ 6 - Definamax Reclame Aqui */}
                <div id="definamax-reclame-aqui" className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    className="w-full text-left py-5 px-6 font-bold text-gray-800 flex justify-between items-center"
                    onClick={() => toggleFaq("faq6")}
                    aria-expanded={openFaqs.faq6}
                  >
                    <h2 className="text-xl md:text-2xl">Definamax Reclame Aqui</h2>
                    {openFaqs.faq6 ? (
                      <ChevronUp className="h-6 w-6 text-green-600" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-green-600" />
                    )}
                  </button>
                  <div
                    className={`px-6 pb-6 text-gray-700 transition-all duration-300 overflow-hidden ${
                      openFaqs.faq6 ? "block" : "hidden"
                    }`}
                  >
                    <div className="bg-green-50 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-green-700 mb-2">Definamax no Reclame Aqui:</h3>
                      <div className="flex items-center mb-3">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-green-700 font-bold text-xl">A</span>
                        </div>
                        <div>
                          <p className="font-medium">Excelente reputação</p>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p>
                        O Definamax mantém uma excelente reputação no Reclame Aqui, com alto índice de solução de
                        problemas e satisfação dos consumidores. A empresa responde a todas as reclamações em até 24
                        horas e busca resolver qualquer problema com agilidade e eficiência.
                      </p>
                    </div>

                    <h3 className="text-lg font-semibold text-green-700 mb-3">Principais pontos positivos:</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Atendimento ao Cliente</h4>
                        <p className="text-sm">
                          A equipe de suporte do Definamax é elogiada pela rapidez, cordialidade e eficiência no
                          atendimento aos clientes.
                        </p>
                      </div>

                      <div className="bg-white border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Entrega</h4>
                        <p className="text-sm">
                          A maioria dos clientes relata que as entregas são realizadas dentro do prazo informado, com
                          embalagem discreta e segura.
                        </p>
                      </div>

                      <div className="bg-white border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Eficácia do Produto</h4>
                        <p className="text-sm">
                          Muitos consumidores compartilham resultados positivos com o uso do Definamax, relatando perda
                          de peso significativa e melhora na qualidade de vida.
                        </p>
                      </div>

                      <div className="bg-white border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Política de Reembolso</h4>
                        <p className="text-sm">
                          A garantia de satisfação é cumprida quando solicitada, com reembolso realizado dentro do prazo
                          estabelecido.
                        </p>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-green-700 mb-3">Depoimentos de clientes:</h3>

                    <div className="space-y-4 mb-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-blue-700 font-bold">M</span>
                            </div>
                            <div>
                              <p className="font-medium">Mariana S.</p>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg key={star} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">15/04/2025</span>
                        </div>
                        <p className="text-sm">
                          "Comprei o Definamax com um pouco de receio, mas fiquei impressionada com os resultados. Em 2
                          meses perdi 8kg e minha disposição melhorou muito. A entrega foi rápida e o atendimento via
                          WhatsApp muito atencioso. Recomendo!"
                        </p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-green-700 font-bold">R</span>
                            </div>
                            <div>
                              <p className="font-medium">Roberto C.</p>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg key={star} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">02/03/2025</span>
                        </div>
                        <p className="text-sm">
                          "Tive um problema com a entrega do meu pedido, mas o suporte resolveu rapidamente. Entrei em
                          contato pelo WhatsApp e em menos de 24 horas já tinham enviado um novo produto. Quanto ao
                          Definamax, estou usando há 1 mês e já perdi 4kg. Muito satisfeito!"
                        </p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-purple-700 font-bold">C</span>
                            </div>
                            <div>
                              <p className="font-medium">Carla M.</p>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star, index) =>
                                  index < 4 ? (
                                    <svg
                                      key={star}
                                      className="w-3 h-3 text-yellow-400 fill-current"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                    </svg>
                                  ) : (
                                    <svg key={star} className="w-3 h-3 text-gray-300 fill-current" viewBox="0 0 24 24">
                                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                    </svg>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">18/02/2025</span>
                        </div>
                        <p className="text-sm">
                          "Achei que os resultados seriam mais rápidos, mas depois de 3 semanas comecei a notar a
                          diferença. O suporte me explicou que cada organismo responde de forma diferente. Estou no
                          segundo mês e já perdi 5kg. O atendimento é excelente."
                        </p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-yellow-800 mb-2">Como entrar em contato com o suporte:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>WhatsApp:</strong> (41) 98454-9172 - Atendimento de segunda a sexta, das 8h às 18h
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>E-mail:</strong> suporte@definamaxoficial.com - Resposta em até 24 horas úteis
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Site oficial:</strong> Formulário de contato disponível 24 horas
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex justify-center mt-6">
                      <button
                        onClick={openWhatsApp}
                        className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-base font-medium text-white hover:bg-green-700 hover:scale-105 transition-all"
                      >
                        <MessageCircle className="mr-2 h-5 w-5" /> FALAR COM ATENDIMENTO
                      </button>
                    </div>
                  </div>
                </div>

                {/* FAQ 7 - Definamax tempo de entrega? */}
                <div
                  id="definamax-tempo-entrega"
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    className="w-full text-left py-5 px-6 font-bold text-gray-800 flex justify-between items-center"
                    onClick={() => toggleFaq("faq7")}
                    aria-expanded={openFaqs.faq7}
                  >
                    <h2 className="text-xl md:text-2xl">Definamax tempo de entrega?</h2>
                    {openFaqs.faq7 ? (
                      <ChevronUp className="h-6 w-6 text-green-600" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-green-600" />
                    )}
                  </button>
                  <div
                    className={`px-6 pb-6 text-gray-700 transition-all duration-300 overflow-hidden ${
                      openFaqs.faq7 ? "block" : "hidden"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
                      <div className="md:w-1/3">
                        <Image
                          src="/entrega.png"
                          alt="Entrega do Definamax"
                          width={300}
                          height={300}
                          className="w-full h-auto object-contain rounded-lg"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <h3 className="text-lg font-semibold text-green-700 mb-3">Prazo de entrega do Definamax</h3>
                        <p className="mb-4">
                          O <strong>Definamax</strong> é enviado em até 1 dia útil após a confirmação do pagamento. O
                          prazo de entrega varia de acordo com a região do país, mas geralmente segue os seguintes
                          prazos:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>
                              <strong>Capitais e regiões metropolitanas:</strong> 3 a 7 dias úteis
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>
                              <strong>Interior dos estados:</strong> 5 a 12 dias úteis
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>
                              <strong>Regiões Norte e Nordeste:</strong> 7 a 15 dias úteis
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-green-700 mb-2">Informações importantes sobre a entrega:</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <span className="text-green-700 font-bold">1</span>
                          </div>
                          <div>
                            <p className="font-medium">Código de rastreio</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Após o envio do produto, você receberá por e-mail um código de rastreio para acompanhar a
                              entrega em tempo real.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <span className="text-green-700 font-bold">2</span>
                          </div>
                          <div>
                            <p className="font-medium">Embalagem discreta</p>
                            <p className="text-sm text-gray-600 mt-1">
                              O Definamax é enviado em embalagem discreta, sem identificação do conteúdo, garantindo sua
                              privacidade.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <span className="text-green-700 font-bold">3</span>
                          </div>
                          <div>
                            <p className="font-medium">Frete grátis</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Para compras de 3 ou 6 frascos, o frete é grátis para todo o Brasil. Para a compra de 1
                              frasco, é cobrada uma taxa fixa de R$ 29,90.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <h3 className="text-lg font-semibold text-green-700 mb-3">Perguntas frequentes sobre entrega:</h3>

                    <div className="space-y-4 mb-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          O que acontece se eu não estiver em casa no momento da entrega?
                        </h4>
                        <p className="text-sm">
                          Se você não estiver em casa, os Correios tentarão a entrega por mais duas vezes. Caso não seja
                          possível realizar a entrega, o pacote ficará disponível na agência dos Correios mais próxima
                          por até 7 dias para retirada.
                        </p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          É possível alterar o endereço de entrega após a compra?
                        </h4>
                        <p className="text-sm">
                          Sim, desde que o pedido ainda não tenha sido enviado. Para isso, entre em contato com o
                          suporte imediatamente após a compra informando o novo endereço.
                        </p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          O que fazer se o prazo de entrega foi excedido?
                        </h4>
                        <p className="text-sm">
                          Se o prazo máximo de entrega foi excedido, entre em contato com o suporte através do WhatsApp
                          (41) 98454-9172 informando o número do pedido e o código de rastreio. A equipe verificará o
                          status da entrega e tomará as providências necessárias.
                        </p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">É possível enviar para outro país?</h4>
                        <p className="text-sm">
                          Atualmente, o Definamax é enviado apenas para endereços no Brasil. Não há opção de envio
                          internacional disponível.
                        </p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-yellow-800 mb-2">Dica importante:</h3>
                      <p className="text-sm">
                        Para garantir uma entrega rápida e sem problemas, certifique-se de fornecer um endereço completo
                        e correto, incluindo número, complemento, bairro, CEP e ponto de referência. Isso evita atrasos
                        e possíveis devoluções.
                      </p>
                    </div>

                    <div className="flex justify-center mt-6">
                      <Link
                        href={addUtmToUrl("https://full.sale/DmNQj1")}
                        className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-base font-medium text-white hover:bg-green-700 hover:scale-105 transition-all"
                      >
                        COMPRAR COM FRETE GRÁTIS <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* FAQ 8 - Desconto Definamax? */}
                <div id="desconto-definamax" className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    className="w-full text-left py-5 px-6 font-bold text-gray-800 flex justify-between items-center"
                    onClick={() => toggleFaq("faq8")}
                    aria-expanded={openFaqs.faq8}
                  >
                    <h2 className="text-xl md:text-2xl">Desconto Definamax?</h2>
                    {openFaqs.faq8 ? (
                      <ChevronUp className="h-6 w-6 text-green-600" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-green-600" />
                    )}
                  </button>
                  <div
                    className={`px-6 pb-6 text-gray-700 transition-all duration-300 overflow-hidden ${
                      openFaqs.faq8 ? "block" : "hidden"
                    }`}
                  >
                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center mb-3">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-yellow-700 font-bold text-xl">%</span>
                        </div>
                        <h3 className="text-lg font-semibold text-yellow-800">
                          Promoção Especial: Até 68% de Desconto!
                        </h3>
                      </div>
                      <p className="mb-3">
                        Atualmente, o Definamax está com uma promoção especial por tempo limitado, oferecendo descontos
                        progressivos na compra de kits com múltiplos frascos:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Kit 6 meses (6 frascos):</strong> 68% de desconto + 2 frascos de colágeno grátis +
                            frete grátis
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Kit 3 meses (3 frascos):</strong> 50% de desconto + 1 frasco de colágeno grátis +
                            frete grátis
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Kit 1 mês (1 frasco):</strong> 18% de desconto
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      {/* Kit 6 meses */}
                      <div className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-2 px-4 text-center">
                          <h3 className="text-lg font-bold">Kit Completo</h3>
                          <p className="text-sm opacity-90">
                            Maior <span className="font-bold">desconto</span>
                          </p>
                        </div>

                        <div className="p-4">
                          <div className="flex justify-center mb-4 relative">
                            <Image
                              src="/6f.png"
                              alt="Kit 6 Meses"
                              width={400}
                              height={400}
                              className="h-32 object-contain hover:scale-105 transition-all duration-300"
                            />
                            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                              -68%
                            </div>
                          </div>

                          <div className="bg-green-50 rounded-xl p-3 mb-3">
                            <div className="flex items-center justify-center gap-2 mb-1">
                              <span className="text-gray-400 line-through text-sm">De R$1.479,40</span>
                            </div>
                            <div className="text-xl font-bold text-green-700 mb-1">
                              <span className="text-sm font-normal">Por: </span>12x R$48,09
                            </div>
                            <div className="text-sm text-gray-600">ou R$479,40 à vista</div>
                            <div className="text-sm font-medium text-green-700 mt-1">R$79,90 por frasco</div>
                          </div>

                          <div className="space-y-2 mb-3 text-left">
                            <div className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">
                                Tratamento completo de <span className="font-bold">6 meses</span>
                              </span>
                            </div>
                            <div className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">+ 2 Frascos de Colágeno Grátis</span>
                            </div>
                            <div className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Frete grátis</span>
                            </div>
                          </div>

                          <Link
                            href={addUtmToUrl("https://full.sale/ytA47b")}
                            className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 w-full hover:scale-105 transition-all"
                          >
                            COMPRAR COM DESCONTO
                          </Link>
                        </div>
                      </div>

                      {/* Kit 3 meses */}
                      <div className="bg-white rounded-xl border-2 border-green-500 shadow-lg relative transform scale-105 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden z-10">
                        <div className="absolute top-0 left-0 right-0 w-full bg-yellow-500 text-center text-white font-bold py-1 px-4 z-20">
                          MAIS VENDIDO
                        </div>

                        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-2 px-4 text-center mt-6">
                          <h3 className="text-lg font-bold">Kit Recomendado</h3>
                          <p className="text-sm opacity-90">
                            Melhor <span className="font-bold">custo benefício</span>
                          </p>
                        </div>

                        <div className="p-4">
                          <div className="flex justify-center mb-4 relative">
                            <Image
                              src="/3f.png"
                              alt="Kit 3 Meses"
                              width={400}
                              height={400}
                              className="h-32 object-contain hover:scale-105 transition-all duration-300"
                            />
                            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                              -50%
                            </div>
                          </div>

                          <div className="bg-green-50 rounded-xl p-3 mb-3 border-2 border-green-100">
                            <div className="flex items-center justify-center gap-2 mb-1">
                              <span className="text-gray-400 line-through text-sm">De R$758,70</span>
                            </div>
                            <div className="text-xl font-bold text-green-700 mb-1">
                              <span className="text-sm font-normal">Por: </span>12x R$38,05
                            </div>
                            <div className="text-sm text-gray-600">ou R$379,00 à vista</div>
                            <div className="text-sm font-medium text-green-700 mt-1">Apenas R$126,33 por frasco</div>
                          </div>

                          <div className="space-y-2 mb-3 text-left">
                            <div className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">
                                Tratamento de <span className="font-bold">3 meses</span>
                              </span>
                            </div>
                            <div className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">+ 1 Frasco de Colágeno Grátis</span>
                            </div>
                            <div className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Frete grátis</span>
                            </div>
                          </div>

                          <Link
                            href={addUtmToUrl("https://full.sale/DmNQj1")}
                            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-4 py-2 text-sm font-bold text-white hover:from-green-500 hover:to-green-600 w-full hover:scale-105 transition-all shadow-md hover:shadow-xl border-b-4 border-green-700 animate-pulse-border"
                          >
                            COMPRAR COM DESCONTO
                          </Link>
                        </div>
                      </div>

                      {/* Kit 1 mês */}
                      <div className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-2 px-4 text-center">
                          <h3 className="text-lg font-bold">Kit Inicial</h3>
                          <p className="text-sm opacity-90">
                            <span className="font-bold">Experimente</span>
                          </p>
                        </div>

                        <div className="p-4">
                          <div className="flex justify-center mb-4 relative">
                            <Image
                              src="/1f.png"
                              alt="Kit 1 Mês"
                              width={400}
                              height={400}
                              className="h-32 object-contain hover:scale-105 transition-all duration-300"
                            />
                            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                              -18%
                            </div>
                          </div>

                          <div className="bg-green-50 rounded-xl p-3 mb-3">
                            <div className="flex items-center justify-center gap-2 mb-1">
                              <span className="text-gray-400 line-through text-sm">De R$329,90</span>
                            </div>
                            <div className="text-xl font-bold text-green-700 mb-1">
                              <span className="text-sm font-normal">Por: </span>12x R$28,01
                            </div>
                            <div className="text-sm text-gray-600">ou R$279,90 à vista</div>
                          </div>

                          <div className="space-y-2 mb-3 text-left">
                            <div className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">
                                Tratamento de <span className="font-bold">1 mês</span>
                              </span>
                            </div>
                            <div className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">60 cápsulas</span>
                            </div>
                            <div className="flex items-start text-gray-400">
                              <X className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Sem bônus adicionais</span>
                            </div>
                          </div>

                          <Link
                            href={addUtmToUrl("https://full.sale/eMbtHp")}
                            className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 w-full hover:scale-105 transition-all"
                          >
                            COMPRAR COM DESCONTO
                          </Link>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-green-700 mb-3">Outras formas de obter desconto:</h3>

                    <div className="space-y-4 mb-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Cupons promocionais</h4>
                        <p className="text-sm mb-3">
                          Ocasionalmente, o Definamax disponibiliza cupons promocionais em suas redes sociais e para
                          clientes cadastrados na newsletter. Estes cupons podem oferecer descontos adicionais ou
                          brindes exclusivos.
                        </p>
                        <div className="bg-gray-50 border border-gray-200 rounded p-2 text-sm">
                          <p className="font-medium">Cupons ativos:</p>
                          <ul className="mt-1">
                            <li className="flex items-center">
                              <span className="font-mono bg-gray-100 px-2 py-1 rounded mr-2">BEMVINDO10</span>
                              <span>10% de desconto na primeira compra</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Programa de indicação</h4>
                        <p className="text-sm">
                          Ao indicar o Definamax para amigos e familiares, você pode ganhar descontos em suas próximas
                          compras. Para cada pessoa que comprar usando seu link de indicação, você recebe R$ 30,00 em
                          créditos para usar em compras futuras.
                        </p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Promoções sazonais</h4>
                        <p className="text-sm">
                          Em datas especiais como Black Friday, Natal e aniversário da marca, o Definamax oferece
                          descontos ainda maiores e condições especiais. Fique atento às redes sociais e ao site oficial
                          para não perder estas oportunidades.
                        </p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-yellow-800 mb-2">Importante:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Promoção por tempo limitado:</strong> os descontos atuais são válidos por tempo
                            limitado e podem ser encerrados a qualquer momento
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Estoque limitado:</strong> devido à alta demanda, os kits promocionais podem esgotar
                            rapidamente
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Garantia de menor preço:</strong> se encontrar o Definamax original por um preço
                            menor em outro site, a empresa iguala a oferta
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex justify-center mt-6">
                      <Link
                        href={addUtmToUrl("https://full.sale/DmNQj1")}
                        className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-base font-medium text-white hover:bg-green-700 hover:scale-105 transition-all"
                      >
                        APROVEITAR DESCONTO <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-lg p-6 mt-8 text-white">
                <h3 className="text-xl font-bold mb-3">Pronto para transformar seu corpo?</h3>
                <p className="mb-4">
                  Junte-se a milhares de pessoas que já conquistaram o corpo dos sonhos com Definamax. Aproveite a
                  promoção por tempo limitado!
                </p>
                <Link
                  href={addUtmToUrl("https://full.sale/DmNQj1")}
                  className="inline-flex items-center justify-center rounded-lg bg-white text-green-600 px-6 py-3 text-base font-bold hover:bg-gray-100 hover:scale-105 transition-all w-full"
                >
                  EXPERIMENTAR DEFINAMAX AGORA <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 bg-green-50">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Histórias de Sucesso com <span className="text-green-600">Definamax</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Veja como o Definamax tem transformado vidas e ajudado pessoas reais a conquistarem o corpo dos sonhos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 rounded-full bg-green-100 overflow-hidden mr-4">
                  <Image src="/ava1.png" alt="Joana" width={100} height={100} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">Joana</h4>
                    <span className="bg-green-600 text-white text-xs font-bold py-1 px-2 rounded-lg">-6kg</span>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <Image
                  src="/dep01.png"
                  alt="Antes e depois"
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>

              <p className="text-gray-700 mb-2">
              "Emagreceu 6kg em 30 dias, e eliminou a compulsão alimentar e diminuiu a ansiedade."
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 rounded-full bg-green-100 overflow-hidden mr-4">
                  <Image
                    src="/ava2.png"
                    alt="Brenda"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">Patricia</h4>
                    <span className="bg-green-600 text-white text-xs font-bold py-1 px-2 rounded-lg">-9kg</span>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <Image
                  src="/dep02.png"
                  alt="Antes e depois"
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>

              <p className="text-gray-700 mb-2">
              "Patricia conseguiu perder 9kgs em 2 meses após a gravidez."
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 rounded-full bg-green-100 overflow-hidden mr-4">
                  <Image src="/ava4.png" alt="Marcos" width={100} height={100} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">Lucas</h4>
                    <span className="bg-green-600 text-white text-xs font-bold py-1 px-2 rounded-lg">-16kg</span>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <Image
                  src="/dep04.png"
                  alt="Antes e depois"
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>

              <p className="text-gray-700 mb-2">
              "Lucas conseguiu perder 16kg em 5 meses sem precisar parar de tomar sua cerveja no final de semana"
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Link
              href={addUtmToUrl("https://full.sale/DmNQj1")}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 text-base font-bold text-white hover:from-green-500 hover:to-green-600 hover:scale-105 transition-all shadow-lg hover:shadow-xl border-b-4 border-green-700"
            >
              EU TAMBÉM QUERO EMAGRECER! <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
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
            <Link href="https://www.definamaxoficial.com/termos" className="text-sm hover:text-green-200">
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

      {/* Structured Data for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "O que é Definamax?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Definamax é um suplemento alimentar 100% natural desenvolvido para auxiliar no processo de emagrecimento de forma saudável e eficaz. Sua fórmula exclusiva combina fibras alimentares de alta potência que atuam absorvendo gordura, aumentando a saciedade e acelerando o metabolismo. Contém ingredientes como Quitosana, Psyllium, Espirulina e Cromo, que trabalham em sinergia para promover a perda de peso.",
                },
              },
              {
                "@type": "Question",
                name: "Como Definamax Funciona?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O Definamax funciona através de um mecanismo triplo de ação: 1) Absorção e Eliminação de Gordura: a Quitosana captura até 76% da gordura ingerida, impedindo sua absorção; 2) Aumento da Saciedade: o Psyllium e o Agar Agar expandem-se no estômago, criando sensação de plenitude; 3) Aceleração do Metabolismo: componentes termogênicos aumentam a queima de calorias mesmo em repouso.",
                },
              },
              {
                "@type": "Question",
                name: "Como usar Definamax?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Recomenda-se tomar 2 cápsulas de Definamax por dia, preferencialmente 30 minutos antes do almoço ou jantar, com um copo cheio de água (200-300ml). Para resultados ótimos, use continuamente por pelo menos 3 meses. É importante beber bastante água durante o dia (pelo menos 2 litros) para potencializar os efeitos do produto.",
                },
              },
              {
                "@type": "Question",
                name: "Definamax é aprovado pela Anvisa?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim, o Definamax é um suplemento alimentar devidamente registrado na Agência Nacional de Vigilância Sanitária (ANVISA) sob a RDC 240/2018. Isso significa que o produto passou por rigorosos testes de qualidade e segurança, atendendo a todos os requisitos legais para comercialização no Brasil.",
                },
              },
              {
                "@type": "Question",
                name: "Definamax vende em farmácia?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Não, o Definamax é um produto exclusivo que não é comercializado em farmácias, drogarias ou lojas físicas. Ele está disponível apenas através do site oficial e canais de venda autorizados online. Isso garante a autenticidade do produto, melhores preços e acesso à garantia de satisfação de 30 dias.",
                },
              },
              {
                "@type": "Question",
                name: "Definamax Reclame Aqui",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O Definamax mantém uma excelente reputação no Reclame Aqui, com alto índice de solução de problemas e satisfação dos consumidores. A empresa responde a todas as reclamações em até 24 horas e busca resolver qualquer problema com agilidade e eficiência.",
                },
              },
              {
                "@type": "Question",
                name: "Definamax tempo de entrega?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O Definamax é enviado em até 1 dia útil após a confirmação do pagamento. O prazo de entrega varia de acordo com a região do país, mas geralmente segue os seguintes prazos: Capitais e regiões metropolitanas: 3 a 7 dias úteis; Interior dos estados: 5 a 12 dias úteis; Regiões Norte e Nordeste: 7 a 15 dias úteis.",
                },
              },
              {
                "@type": "Question",
                name: "Desconto Definamax?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Atualmente, o Definamax está com uma promoção especial por tempo limitado, oferecendo descontos progressivos na compra de kits com múltiplos frascos: Kit 6 meses (6 frascos): 68% de desconto + 2 frascos de colágeno grátis + frete grátis; Kit 3 meses (3 frascos): 50% de desconto + 1 frasco de colágeno grátis + frete grátis; Kit 1 mês (1 frasco): 18% de desconto.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  )
}
