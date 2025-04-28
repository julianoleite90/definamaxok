"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import {
  CheckCircle2,
  Shield,
  Award,
  ThumbsUp,
  X,
  ArrowRight,
  Star,
  Clock,
  Gift,
  BadgePercent,
  ShieldCheck,
} from "lucide-react"

export default function LandingPage() {
  // Estado para controlar o carrossel de depoimentos
  const [testimonialPage, setTestimonialPage] = useState(0)
  const totalTestimonialPages = 2

  // Estado para controlar a exibição de mais avaliações
  const [showMoreReviews, setShowMoreReviews] = useState(false)
  const [showMoreTestimonials, setShowMoreTestimonials] = useState(false)

  // Estado para contagem regressiva
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 59,
    seconds: 59,
  })

  // Referência para a seção de compra
  const buyRef = useRef(null)

  // Estado para controlar quais perguntas estão abertas no acordeão
  const [openFaqs, setOpenFaqs] = useState({
    faq1: false,
    faq2: false,
    faq3: false,
    faq4: false,
    faq5: false,
  })

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

  // Função para rolar até a seção de compra
  const scrollToBuy = () => {
    buyRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Função para navegar para o slide anterior do carrossel
  const prevTestimonial = () => {
    setTestimonialPage((prev) => (prev - 1 + totalTestimonialPages) % totalTestimonialPages)
  }

  // Função para navegar para o próximo slide do carrossel
  const nextTestimonial = () => {
    setTestimonialPage((prev) => (prev + 1) % totalTestimonialPages)
  }

  // Função para alternar a exibição de mais avaliações
  const toggleMoreReviews = () => {
    setShowMoreReviews(!showMoreReviews)
  }

  // Efeito para rotação automática do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-green-800 via-green-700 to-green-800 py-4 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] animate-[shine_1.5s_infinite] pointer-events-none"></div>
        <div className="mx-auto max-w-5xl px-4 flex justify-center">
          <Image src="/logo2.png" alt="Definamax" width={200} height={60} className="h-12 w-auto" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-green-50 to-white py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-3 sm:px-4 grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-[2rem] sm:text-[2.2rem] md:text-[2.5rem] font-bold text-green-800 mb-4 break-words leading-tight">
            Emagreça de {" "}
              <span className="text-green-600 relative">
              Forma Rápida{" "}
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              </span>{" "}
              e Recupere Sua Autoestima
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-4 break-words">
            Chega de dietas restritivas e métodos perigosos! Com Definamax, você perde gordura teimosa de forma segura, rápida e sem sofrimento.
            </p>

            <div className="inline-flex items-center bg-green-50 px-3 py-1 rounded-lg mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star, index) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 text-yellow-400 fill-current ${index === 0 ? "animate-pulse" : ""}`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm font-medium">4.9/5 (3.842 avaliações)</span>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Controle a compulsão alimentar naturalmente</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Queima gordura 24 horas por dia</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Fórmula 100% natural e segura, sem efeitos colaterais</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Fácil de usar: apenas 2 cápsulas por dia</span>
                </li>
              </ul>
            </div>

            <button
              onClick={scrollToBuy}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-bold text-white hover:from-green-500 hover:to-green-600 w-full sm:w-auto text-center hover:scale-105 transition-all shadow-lg hover:shadow-xl border-b-4 border-green-700 animate-pulse-border"
            >
              QUERO EMAGRECER AGORA <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <div className="flex items-center justify-center mt-3 text-sm text-gray-600">
              <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
              <span>30 dias de garantia ou seu dinheiro de volta</span>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative h-[350px] w-full flex justify-center">
              <div className="absolute top-0 right-0 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold z-10 flex items-center hidden md:flex">
                <BadgePercent className="h-4 w-4 mr-1" />
                50% OFF HOJE
              </div>
              <Image
                src="/mockup.png"
                width={800}
                height={900}
                alt="Definamax - Suplemento Natural para Emagrecimento"
                className="h-[350px] w-auto object-contain mx-auto floating"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resultados Rápidos */}
      <section className="w-full py-8 bg-green-600 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center gap-4 md:gap-8 px-4 md:px-0">
            <div className="flex items-center">
              <div className="bg-white rounded-full p-2 mr-3">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-bold">Resultados Rápidos</p>
                <p className="text-sm">Primeiros resultados em poucos dias</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-white rounded-full p-2 mr-3">
                <Gift className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-bold">Desconto no PIX</p>
                <p className="text-sm">Pagamentos via PIX ganham 10% de desconto</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-white rounded-full p-2 mr-3">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-bold">Garantia de 30 Dias</p>
                <p className="text-sm">Satisfação ou seu dinheiro de volta</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mídia - Movida para logo após a primeira seção */}
      <section className="w-full py-8 bg-white">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h3 className="text-xl font-bold text-gray-600 mb-6">Estamos na mídia</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <Image src="/agencia-globo.png" alt="Globo" width={120} height={40} className="h-8 w-auto" />
            <Image src="/agencia-estado.png" alt="UOL" width={120} height={40} className="h-8 w-auto" />
            <Image src="/ig.png" alt="Folha" width={120} height={40} className="h-8 w-auto" />
            <Image src="/terra.png" alt="Exame" width={120} height={40} className="h-8 w-auto" />
            <Image src="/valor.png" alt="Exame" width={120} height={40} className="h-8 w-auto" />
          </div>
        </div>
      </section>

      {/* Depoimentos - Carrossel React - Movido para cima para mostrar prova social mais cedo */}
      <section className="w-full py-16 bg-green-50">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-8">
            <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
            Veja quem já transformou a vida com Definamax
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Olha só! Eles também estavam como você...</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chega de se esconder! Conheça pessoas REAIS que recuperaram a autoestima e o prazer de se olhar no
              espelho.
            </p>
          </div>

          <div className="relative">
            {/* Desktop Carousel */}
            <div className="hidden md:block">
              {/* Página 1 de depoimentos */}
              <div
                className={`grid gap-8 grid-cols-3 transition-opacity duration-500 ${
                  testimonialPage === 0 ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-200 overflow-hidden mr-4">
                      <Image
                        src="/elizabete.png"
                        alt="Maria"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">Elizabete</h4>
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
                    <div className="relative">
                      <Image
                        src="/depoimento01.png"
                        alt="Antes"
                        width={300}
                        height={300}
                        className="w-full h-80 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold py-1 px-3 rounded-lg">
                        -14kg
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-2">
                  "Pra quem tá na luta pra emagrecer, digo uma coisa: Definamax funciona mesmo! Perdi 19kg em 5 meses e tô me amando mais a cada dia."
                  </p>
                  <p className="text-green-700 font-medium">- 14kg em 4 meses</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-200 overflow-hidden mr-4">
                      <Image
                        src="/brenda.png"
                        alt="Carlos"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">Brenda S.</h4>
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
                    <div className="relative">
                      <Image
                        src="/depoimento02.png"
                        alt="Antes"
                        width={300}
                        height={300}
                        className="w-full h-80 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold py-1 px-3 rounded-lg">
                        -22kg
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-2">
                  "Depois da maternidade, meu corpo mudou e a insegurança me incomodava muito. Tentei de tudo, mas foi com Definamax que, em 6 meses, perdi 22kg e finalmente recuperei a confiança em mim mesma.""
                  </p>
                  <p className="text-green-700 font-medium">- 22kg em 6 meses</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-200 overflow-hidden mr-4">
                      <Image src="/paula.png" alt="Ana" width={100} height={100} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Ana P.</h4>
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
                    <div className="relative">
                      <Image
                        src="/depoimento03.png"
                        alt="Antes"
                        width={300}
                        height={300}
                        className="w-full h-80 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold py-1 px-3 rounded-lg">
                        -11kg
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-2">
                  "Menos 11kg com Definamax! Uma vitória que me motiva a continuar cuidando da minha saúde e bem-estar."
                  </p>
                  <p className="text-green-700 font-medium">- 11kg em 3 meses</p>
                </div>
              </div>

              {/* Página 2 de depoimentos */}
              <div
                className={`grid gap-8 grid-cols-3 transition-opacity duration-500 ${
                  testimonialPage === 1 ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-200 overflow-hidden mr-4">
                      <Image
                        src="/ju.png"
                        alt="Juliana"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">Juliana R.</h4>
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
                    <div className="relative">
                      <Image
                        src="depoimento04.png"
                        alt="Antes"
                        width={300}
                        height={300}
                        className="w-full h-80 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold py-1 px-3 rounded-lg">
                        -15kg
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-2">
                    "Comecei a tomar o Definamax há uns 4 meses e já perdi uns 15kg! Minha disposição melhorou demais e
                    tô conseguindo fazer caminhadas sem cansar tanto"
                  </p>
                  <p className="text-green-700 font-medium">- 15kg em 4 meses</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-200 overflow-hidden mr-4">
                      <Image
                        src="/h2p.png"
                        alt="Roberto"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">Roberto T.</h4>
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
                    <div className="relative">
                      <Image
                        src="/h2.png"
                        alt="Antes"
                        width={300}
                        height={300}
                        className="w-full h-80 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold py-1 px-3 rounded-lg">
                        -14kg
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-2">
                    "Já tinha tentado de tudo pra emagrecer, mas nada funcionava. Aí usei o Definamax e, em uns 3 meses,
                    perdi 14kg! Pra mim, foi a solução."
                  </p>
                  <p className="text-green-700 font-medium">- 14kg em 3 meses</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-200 overflow-hidden mr-4">
                      <Image
                        src="/h1p.png"
                        alt="Marcos"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">Marcos A.</h4>
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
                    <div className="relative">
                      <Image
                        src="/h1.png"
                        alt="Antes"
                        width={300}
                        height={300}
                        className="w-full h-80 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold py-1 px-3 rounded-lg">
                        -16kg
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-2">
                    "Eu estava com o pé atrás, achando que não ia funcionar. Mas com o Definamax perdi 16kg em 3 meses!
                    A diferença na minha barriga é enorme e estou me sentindo muito mais ativo."
                  </p>
                  <p className="text-green-700 font-medium">- 16kg em 3 meses</p>
                </div>
              </div>

              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-green-50 hidden md:block"
                aria-label="Anterior"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-green-50 hidden md:block"
                aria-label="Próximo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  {[0, 1].map((page) => (
                    <button
                      key={page}
                      onClick={() => setTestimonialPage(page)}
                      className={`w-3 h-3 rounded-full ${testimonialPage === page ? "bg-green-600" : "bg-green-200"}`}
                      aria-label={`Página ${page + 1} de depoimentos`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile View - Load More */}
            <div className="md:hidden">
              <div className="grid gap-8 grid-cols-1">
                {/* First 3 testimonials always visible */}
                <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-200 overflow-hidden mr-4">
                      <Image
                        src="/elizabete.png"
                        alt="Maria"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">Elizabete</h4>
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
                    <div className="relative">
                      <Image
                        src="/depoimento01.png"
                        alt="Antes"
                        width={300}
                        height={300}
                        className="w-full h-80 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold py-1 px-3 rounded-lg">
                        -14kg
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-2">
                    "Pra quem tá na luta pra emagrecer, digo uma coisa: Definamax funciona mesmo! Perdi 14kg em 4 meses e tô me amando mais a cada dia."
                  </p>
                  <p className="text-green-700 font-medium">- 14kg em 4 meses</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-200 overflow-hidden mr-4">
                      <Image
                        src="/brenda.png"
                        alt="Carlos"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">Brenda S.</h4>
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
                    <div className="relative">
                      <Image
                        src="/depoimento02.png"
                        alt="Antes"
                        width={300}
                        height={300}
                        className="w-full h-80 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold py-1 px-3 rounded-lg">
                        -22kg
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-2">
                  "Depois da maternidade, meu corpo mudou e a insegurança me incomodava muito. Tentei de tudo, mas foi com Definamax que, em 6 meses, perdi 22kg e finalmente recuperei a confiança em mim mesma.""
                  </p>
                  <p className="text-green-700 font-medium">- 22kg em 6 meses</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-200 overflow-hidden mr-4">
                      <Image src="/paula.png" alt="Ana" width={100} height={100} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Ana P.</h4>
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
                    <div className="relative">
                      <Image
                        src="/depoimento03.png"
                        alt="Antes"
                        width={300}
                        height={300}
                        className="w-full h-80 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold py-1 px-3 rounded-lg">
                        -11kg
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-2">
                  "Menos 11kg com Definamax! Uma vitória que me motiva a continuar cuidando da minha saúde e bem-estar."
                  </p>
                  <p className="text-green-700 font-medium">- 11kg em 3 meses</p>
                </div>

                {/* Additional testimonials shown when "load more" is clicked */}
                {showMoreTestimonials && (
                  <>
                    <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-green-200 overflow-hidden mr-4">
                          <Image
                            src="/ju.png"
                            alt="Juliana"
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold">Juliana R.</h4>
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
                        <div className="relative">
                          <Image
                            src="depoimento04.png"
                            alt="Antes"
                            width={300}
                            height={300}
                            className="w-full h-80 object-cover rounded-lg"
                          />
                          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold py-1 px-3 rounded-lg">
                            -15kg
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-2">
                        "Comecei a tomar o Definamax há uns 4 meses e já perdi uns 15kg! Minha disposição melhorou
                        demais e tô conseguindo fazer caminhadas sem cansar tanto"
                      </p>
                      <p className="text-green-700 font-medium">- 15kg em 4 meses</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-green-200 overflow-hidden mr-4">
                          <Image
                            src="/h2p.png"
                            alt="Roberto"
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold">Roberto T.</h4>
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
                        <div className="relative">
                          <Image
                            src="/h2.png"
                            alt="Antes"
                            width={300}
                            height={300}
                            className="w-full h-80 object-cover rounded-lg"
                          />
                          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold py-1 px-3 rounded-lg">
                            -14kg
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-2">
                        "Já tinha tentado de tudo pra emagrecer, mas nada funcionava. Aí usei o Definamax e, em uns 3
                        meses, perdi 14kg! Pra mim, foi a solução."
                      </p>
                      <p className="text-green-700 font-medium">- 14kg em 3 meses</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-green-200 overflow-hidden mr-4">
                          <Image
                            src="/h1p.png"
                            alt="Marcos"
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold">Marcos A.</h4>
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
                        <div className="relative">
                          <Image
                            src="/h1.png"
                            alt="Antes"
                            width={300}
                            height={300}
                            className="w-full h-80 object-cover rounded-lg"
                          />
                          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold py-1 px-3 rounded-lg">
                            -16kg
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-2">
                        "Eu estava com o pé atrás, achando que não ia funcionar. Mas com o Definamax perdi 16kg em 3
                        meses! A diferença na minha barriga é enorme e estou me sentindo muito mais ativo."
                      </p>
                      <p className="text-green-700 font-medium">- 16kg em 3 meses</p>
                    </div>
                  </>
                )}
              </div>

              {/* Load More Button for Mobile */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowMoreTestimonials(!showMoreTestimonials)}
                  className="inline-flex items-center justify-center rounded-lg border border-green-600 px-6 py-3 text-sm font-medium text-green-600 hover:bg-green-50"
                >
                  {showMoreTestimonials ? "Ver menos depoimentos" : "Ver mais depoimentos"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ml-2 transition-transform ${showMoreTestimonials ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10 flex-col items-center">
            <button
              onClick={scrollToBuy}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 text-base font-bold text-white hover:from-green-500 hover:to-green-600 hover:scale-105 transition-all shadow-lg hover:shadow-xl border-b-4 border-green-700"
            >
              QUERO RESULTADOS COMO ESTES <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <div className="flex items-center justify-center mt-3 text-sm text-gray-600">
              <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
              <span>30 dias de garantia ou seu dinheiro de volta</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="w-full py-16 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
              Benefícios Comprovados
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Gordura Teimosa? <span className="text-green-700">NUNCA MAIS!</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sinta a alegria de ver a balança baixar e suas roupas voltarem a servir
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-white to-green-50 p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-green-600 mr-3 flex-shrink-0" />
                <h3 className="text-xl font-semibold">Emagreça com Tranquilidade e Segurança</h3>
              </div>
              <p className="text-gray-700">
              Com Definamax, você emagrece sem enjoos, dores de barriga ou surpresas desagradáveis. Ingredientes naturais e sua saúde sempre em primeiro lugar!
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-green-50 p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <Award className="h-8 w-8 text-green-600 mr-3 flex-shrink-0" />
                <h3 className="text-xl font-semibold">Menos Medidas, Mais Energia e Autoestima</h3>
              </div>
              <p className="text-gray-700">
              Veja sua cintura afinar, sinta-se mais leve e experimente uma disposição renovada. Com Definamax, os resultados aparecem e você recupera a confiança!
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-green-50 p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <ThumbsUp className="h-8 w-8 text-green-600 mr-3 flex-shrink-0" />
                <h3 className="text-xl font-semibold">Emagreça com a Força da Natureza, Sem Sofrimento</h3>
              </div>
              <p className="text-gray-700">
              Definamax controla seu apetite de forma natural e eficaz. Emagrecer sem dietas radicais ou sacrifícios é possível!
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-green-50 p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600 mr-3 flex-shrink-0" />
                <h3 className="text-xl font-semibold">Emagreça de uma vez por todas, com Saúde</h3>
              </div>
              <p className="text-gray-700">
              Definamax é recomendado por especialistas para quem quer emagrecer de verdade e manter o resultado. Confie na ciência e conquiste o corpo dos seus sonhos!
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-8 flex-col items-center">
            <button
              onClick={scrollToBuy}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 text-base font-bold text-white hover:from-green-500 hover:to-green-600 hover:scale-105 transition-all shadow-lg hover:shadow-xl border-b-4 border-green-700"
            >
              QUERO EMAGRECER AGORA <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <div className="flex items-center justify-center mt-3 text-sm text-gray-600">
              <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
              <span>Compra 100% segura • Satisfação garantida</span>
            </div>
          </div>
        </div>
      </section>

      {/* Comparativo */}
      <section className="w-full py-16 bg-green-50">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
              Comparativo Exclusivo
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Natural x Injeções Químicas
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
            Sua Saúde em Primeiro Lugar: Por que escolher Definamax?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-500 shadow-md relative overflow-hidden transform hover:scale-105 transition-duration-300">
              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                RECOMENDADO
              </div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-green-700">Definamax</h3>
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>

              <div className="mb-6 rounded-lg overflow-hidden bg-white p-2">
                <Image
                  src="/natural-1.png"
                  width={400}
                  height={250}
                  alt="Benefícios do suplemento natural"
                  className="w-full h-48 object-contain rounded-lg"
                />
              </div>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">100% Natural: ingredientes seguros e eficazes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Detox poderoso para resultados rápidos

</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Preço acessível: a partir de R$79,90 por frasco</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Sem burocracia: não precisa de receita</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Prático: apenas 2 cápsulas por dia</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Resultados visíveis em poucas semanas</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border border-red-200 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                NÃO RECOMENDADO
              </div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-red-700">Injeções de Emagrecimento</h3>
                <X className="h-6 w-6 text-red-600" />
              </div>

              <div className="mb-6 rounded-lg overflow-hidden bg-white p-2">
                <Image
                  src="/perigoso-1.png"
                  width={400}
                  height={250}
                  alt="Efeitos colaterais de injeções"
                  className="w-full h-48 object-contain rounded-lg"
                />
              </div>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Compostos químicos e sintéticos</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Possíveis efeitos colaterais: náuseas, vômitos, desconfortos gastrointestinais</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Custo elevado: acima de R$1.000/mês</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Exige prescrição e acompanhamento médico</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Aplicação dolorosa e invasiva</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Risco de efeito rebote após interrupção</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center mt-10 flex-col items-center">
            <button
              onClick={scrollToBuy}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 text-base font-bold text-white hover:from-green-500 hover:to-green-600 hover:scale-105 transition-all shadow-lg hover:shadow-xl border-b-4 border-green-700"
            >
              ESCOLHER MEU KIT DE EMAGRECIMENTO <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <div className="flex items-center justify-center mt-3 text-sm text-gray-600">
              <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
              <span>30 dias de garantia ou seu dinheiro de volta</span>
            </div>
          </div>
        </div>
      </section>

      {/* Aprovação ANVISA e Garantia */}
      <section className="w-full py-12 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Aprovação ANVISA */}
            <div className="bg-green-50 p-6 rounded-lg border border-green-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <Image src="/anvisa.png" alt="ANVISA" width={80} height={80} className="h-16 w-16 object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Aprovado pela ANVISA</h3>
                  <p className="text-gray-600">RDC 240/2018.</p>
                </div>
              </div>
              <p className="text-gray-700">
                O Definamax é um suplemento alimentar devidamente registrado na Agência Nacional de Vigilância Sanitária
                (ANVISA), garantindo que todos os ingredientes e processos de fabricação seguem os mais rigorosos
                padrões de qualidade e segurança.
              </p>
              <div className="mt-4 flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-700 font-medium">Fabricado em laboratório certificado</span>
              </div>
            </div>

            {/* Garantia */}
            <div className="bg-green-50 p-6 rounded-lg border border-green-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <Image
                    src="/garantia.png"
                    alt="Garantia"
                    width={80}
                    height={80}
                    className="h-16 w-16 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Garantia de 30 Dias</h3>
                  <p className="text-gray-600">Satisfação ou seu dinheiro de volta</p>
                </div>
              </div>
              <p className="text-gray-700">
                Estamos tão confiantes na eficácia do Definamax que oferecemos uma garantia incondicional de 30 dias. Se
                você não estiver completamente satisfeito com os resultados, basta entrar em contato conosco para
                receber 100% do seu dinheiro de volta, sem perguntas, conforme os nossos termos*.
              </p>
              <div className="mt-4 flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-700 font-medium">Sem burocracia, sem complicações</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-10 flex-col items-center">
            <button
              onClick={scrollToBuy}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 text-base font-bold text-white hover:from-green-500 hover:to-green-600 hover:scale-105 transition-all shadow-lg hover:shadow-xl border-b-4 border-green-700"
            >
              EXPERIMENTAR COM GARANTIA <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <div className="flex items-center justify-center mt-3 text-sm text-gray-600">
              <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
              <span>Compra 100% segura • Satisfação garantida</span>
            </div>
          </div>
        </div>
      </section>

      {/* Área de compra */}
      <section id="comprar" ref={buyRef} className="w-full py-16 bg-gradient-to-b from-green-100 to-green-50">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <div className="mb-10">
            <div className="inline-block bg-yellow-400 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold mb-2">
              OFERTA ESPECIAL POR TEMPO LIMITADO
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Comece Sua Transformação Hoje</h2>
            <p className="text-gray-700 mb-2 max-w-2xl mx-auto">
              Escolha o plano ideal para você e receba Definamax diretamente em sua casa
            </p>
            <div className="flex items-center justify-center text-sm text-red-600 font-medium">
              <Clock className="h-4 w-4 mr-1" />
              <span>
                Promoção válida por mais {timeLeft.hours.toString().padStart(2, "0")}:
                {timeLeft.minutes.toString().padStart(2, "0")}:{timeLeft.seconds.toString().padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="grid gap-8 md:gap-10 md:grid-cols-3">
            {/* Kit 6 meses */}
            <div className="bg-white p-6 rounded-lg border border-green-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-green-600 text-white py-1 px-3 rounded-full text-sm font-bold mb-4 inline-block">
                Kit 6 Meses
              </div>
              <div className="flex justify-center mb-4 relative">
                <Image src="/6f.png" alt="Kit 6 Meses" width={400} height={400} className="h-60 object-contain" />
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                  -68%
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">Perca até 19kg</h3>

              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-gray-400 line-through text-sm">De R$1.479,40</span>
                <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-bold">-68%</span>
              </div>

              <div className="text-3xl font-bold text-green-700 mb-1">12x R$48,09</div>
              <div className="text-sm text-gray-600 mb-3">ou R$479,40 à vista</div>

              <div className="bg-gray-50 p-2 rounded-md mb-3">
                <p className="text-sm text-gray-500 mb-1">6 frascos - 360 cápsulas</p>
                <p className="text-sm text-green-700 font-medium">R$79,90 por frasco</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-100 rounded-md p-2 mb-4 text-sm text-yellow-800">
                <span className="font-medium">BÔNUS:</span> 2 Frascos de Colágeno Grátis
              </div>

              <Link
                href={addUtmToUrl("https://full.sale/ytA47b")}
                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-3 text-base font-medium text-white hover:bg-green-700 w-full hover:scale-105 transition-all"
              >
                COMPRAR AGORA
              </Link>
              <p className="text-sm text-green-600 font-medium mt-2">Frete grátis</p>
            </div>

            {/* Kit 3 meses - MAIS POPULAR */}
            <div className="bg-white p-6 rounded-lg border-2 border-green-500 shadow-lg relative transform scale-105 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute -top-3 left-0 right-0 mx-auto w-max bg-green-500 text-white text-xs font-bold py-1 px-4 rounded-full shadow-md">
                MAIS POPULAR
              </div>
              <div className="bg-green-600 text-white py-1 px-3 rounded-full text-sm font-bold mb-4 inline-block">
                Kit 3 Meses
              </div>
              <div className="flex justify-center mb-4 relative">
                <Image src="/3f.png" alt="Kit 3 Meses" width={400} height={400} className="h-60 object-contain" />
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                  -50%
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">Perca até 13kg</h3>

              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-gray-400 line-through text-sm">De R$758,70</span>
                <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-bold">-50%</span>
              </div>

              <div className="text-4xl font-bold text-green-700 mb-1">12x R$38,05</div>
              <div className="text-sm text-gray-600 mb-3">ou R$379,00 à vista</div>

              <div className="bg-gray-50 p-2 rounded-md mb-3">
                <p className="text-sm text-gray-500 mb-1">3 frascos - 180 cápsulas</p>
                <p className="text-sm text-green-700 font-medium">R$126,34 por frasco</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-100 rounded-md p-2 mb-4 text-sm text-yellow-800">
                <span className="font-medium">BÔNUS:</span> 1 Frasco de Colágeno Grátis
              </div>

              <Link
                href={addUtmToUrl("https://full.sale/DmNQj1")}
                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-3 text-base font-medium text-white hover:bg-green-700 w-full hover:scale-105 transition-all animate-pulse-border"
              >
                COMPRAR AGORA
              </Link>
              <p className="text-sm text-green-600 font-medium mt-2">Frete grátis</p>
              <div className="mt-2 bg-yellow-100 text-yellow-800 text-xs p-1 rounded">
                Apenas 17 kits disponíveis neste preço!
              </div>
            </div>

            {/* Kit 1 mês */}
            <div className="bg-white p-6 rounded-lg border border-green-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-green-600 text-white py-1 px-3 rounded-full text-sm font-bold mb-4 inline-block">
                Kit 1 Mês
              </div>
              <div className="flex justify-center mb-4 relative">
                <Image src="/1f.png" alt="Kit 1 Mês" width={400} height={400} className="h-60 object-contain" />
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                  -18%
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">Perca até 5kg</h3>

              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-gray-400 line-through text-sm">De R$329,90</span>
                <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-bold">-18%</span>
              </div>

              <div className="text-3xl font-bold text-green-700 mb-1">12x R$28,01</div>
              <div className="text-sm text-gray-600 mb-3">ou R$279,90 à vista</div>

              <div className="bg-gray-50 p-2 rounded-md mb-4">
                <p className="text-sm text-gray-500 mb-1">1 frasco - 60 cápsulas</p>
                <p className="text-sm text-green-700 font-medium">R$279,90 por frasco</p>
              </div>

              <Link
                href={addUtmToUrl("https://full.sale/eMbtHp")}
                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-3 text-base font-medium text-white hover:bg-green-700 w-full hover:scale-105 transition-all"
              >
                COMPRAR AGORA
              </Link>
              <p className="text-sm text-gray-600 mt-2">Frete fixo R$ 29,00</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Image src="/master.png" alt="Mastercard" width={60} height={40} className="h-10" />
            <Image src="/visa.png" alt="Visa" width={60} height={40} className="h-10" />
            <Image src="/hiper.png" alt="Hipercard" width={60} height={40} className="h-10" />
            <Image src="/pix.png" alt="Pix" width={60} height={40} className="h-10" />
          </div>

          <div className="mt-6 text-sm text-gray-600 flex items-center justify-center">
            <span>Compra 100% segura • Satisfação garantida ou seu dinheiro de volta</span>
          </div>
        </div>
      </section>
      {/* Avaliações estilo Amazon - Movido para cima */}
      <section className="w-full py-8 bg-green-50">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
              Avaliações Verificadas
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">O Que Nossos Clientes Estão Dizendo</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mais de 3.800 avaliações positivas de clientes satisfeitos com os resultados
            </p>
          </div>

          <div className="mb-8 flex items-center justify-center">
            <div className="flex items-center mr-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-xl font-bold">4.9/5</span>
            </div>
            <span className="text-gray-600">Baseado em 3.842 avaliações verificadas</span>
          </div>

          <div className="space-y-6">
            {/* Avaliações iniciais - primeiras 5 */}
            <div>
              {/* Avaliação 1 */}
              <div className="border border-gray-200 rounded-lg p-6 mb-6 hover:border-green-200 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <h4 className="font-semibold">Resultado incrível em pouco tempo!</h4>
                  </div>
                  <div className="text-sm text-gray-500">12/03/2025</div>
                </div>
                <p className="text-gray-700 mb-4">
                  Comecei a tomar o Definamax há 4 meses e já perdi 15kg! O mais impressionante é que não sinto mais
                  aquela fome ansiosa que me fazia comer compulsivamente. Minha disposição melhorou muito e estou
                  conseguindo fazer exercícios sem me sentir cansada. Super recomendo!
                </p>
                <div className="flex gap-2 mb-4">
                  <Image
                    src="/revi1.jpeg"
                    alt="Foto da avaliação"
                    width={100}
                    height={100}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                    <Image
                      src="/revi1.jpeg"
                      alt="Juliana."
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">Renata • Cliente Verificado</span>
                </div>
              </div>

              {/* Avaliação 2 */}
              <div className="border border-gray-200 rounded-lg p-6 mb-6 hover:border-green-200 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <h4 className="font-semibold">Finalmente algo que funciona!</h4>
                  </div>
                  <div className="text-sm text-gray-500">28/02/2025</div>
                </div>
                <p className="text-gray-700 mb-4">
                  Já tentei de tudo para emagrecer, inclusive injeções que me deixaram com náuseas terríveis. O
                  Definamax foi a única coisa que realmente funcionou para mim sem efeitos colaterais. Em 3 meses perdi
                  14kg e minha pressão arterial normalizou. Estou muito feliz com os resultados!
                </p>
                <div className="flex gap-2 mb-4">
                  <Image
                    src="/2depois.png"
                    alt="Foto da avaliação"
                    width={100}
                    height={100}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                    <Image
                      src="/daniele.png"
                      alt="Roberto S."
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">Daniele T. • Cliente Verificado</span>
                </div>
              </div>

              {/* Avaliação 3 - Masculina */}
              <div className="border border-gray-200 rounded-lg p-6 mb-6 hover:border-green-200 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <h4 className="font-semibold">Transformação completa em 3 meses</h4>
                  </div>
                  <div className="text-sm text-gray-500">15/02/2025</div>
                </div>
                <p className="text-gray-700 mb-4">
                  Depois de anos tentando emagrecer sem sucesso, o Definamax mudou minha vida. Perdi 16kg em 3 meses,
                  minha energia aumentou e voltei a praticar esportes. Minha esposa está impressionada com a mudança e
                  minha autoestima voltou!
                </p>
                <div className="flex gap-2 mb-4">
                  <Image
                    src="/ricardo.png"
                    alt="Foto da avaliação"
                    width={100}
                    height={100}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                    <Image
                      src="/rica.png"
                      alt="Ricardo M."
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">Ricardo M. • Cliente Verificado</span>
                </div>
              </div>

              {/* Avaliação 4 */}
              <div className="border border-gray-200 rounded-lg p-6 mb-6 hover:border-green-200 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <h4 className="font-semibold">Transformou minha vida!</h4>
                  </div>
                  <div className="text-sm text-gray-500">02/02/2025</div>
                </div>
                <p className="text-gray-700 mb-4">
                  Depois de ter meu segundo filho, não conseguia mais voltar ao meu peso. Tentei várias dietas sem
                  sucesso. Com o Definamax, perdi 10kg em 2 meses e meio! O melhor é que não sinto aquela ansiedade por
                  comida que tinha antes. Minha autoestima voltou!
                </p>
                <div className="flex gap-2 mb-4">
                  <Image
                    src="/revi3.jpeg"
                    alt="Foto da avaliação"
                    width={100}
                    height={100}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                    <Image
                      src="/revi3.jpeg"
                      alt="Patricia L."
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">Patricia L. • Cliente Verificado</span>
                </div>
              </div>

              {/* Avaliação 5 - Masculina */}
              <div className="border border-gray-200 rounded-lg p-6 hover:border-green-200 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <h4 className="font-semibold">Superou minhas expectativas</h4>
                  </div>
                  <div className="text-sm text-gray-500">20/01/2025</div>
                </div>
                <p className="text-gray-700 mb-4">
                  Confesso que estava cético no início, mas decidi dar uma chance. Já tinha tentado outros suplementos
                  sem resultado. Com o Definamax, perdi 13kg no segundo mês! Minha barriga diminuiu visivelmente e minha
                  energia aumentou. Já recomendei para todos os meus amigos.
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                    <Image
                      src="/andre.png"
                      alt="André T."
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">André T. • Cliente Verificado</span>
                </div>
              </div>
            </div>

            {/* Avaliações adicionais - últimas 5 (inicialmente escondidas) */}
            {showMoreReviews && (
              <div>
                {/* Avaliação 6 - Masculina */}
                <div className="border border-gray-200 rounded-lg p-6 mb-6 hover:border-green-200 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <h4 className="font-semibold">Meu médico ficou impressionado!</h4>
                    </div>
                    <div className="text-sm text-gray-500">15/01/2025</div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Eu estava com pré-diabetes e meu médico sugeriu que eu perdesse peso urgentemente. Comecei a tomar
                    Definamax e em 3 meses perdi 16kg! Na última consulta, meus exames voltaram ao normal e meu médico
                    perguntou o que eu tinha feito. Recomendei para todos no consultório!
                  </p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                      <Image
                        src="/fernando.png"
                        alt="Fernando D."
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium">Fernando D. • Cliente Verificado</span>
                  </div>
                </div>

                {/* Avaliação 7 */}
                <div className="border border-gray-200 rounded-lg p-6 mb-6 hover:border-green-200 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex mb-1">
                        {[1, 2, 3, 4, 5].map((star, index) =>
                          index < 5 ? (
                            <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                          ) : (
                            <Star key={star} className="h-5 w-5 text-gray-300 fill-gray-300" />
                          ),
                        )}
                      </div>
                      <h4 className="font-semibold">Ótimo para manter o peso</h4>
                    </div>
                    <div className="text-sm text-gray-500">05/01/2025</div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Emagreci 12kg com dieta e exercício há um ano, mas estava difícil manter o peso. Comecei a usar
                    Definamax para ajudar e tem funcionado perfeitamente. Não recuperei nenhum kg nos últimos 3 meses e
                    tenho me sentido muito bem!
                  </p>
                  <div className="flex gap-2 mb-4">
                    <Image
                      src="/revi6.jpeg"
                      alt="Foto da avaliação"
                      width={100}
                      height={100}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                      <Image
                        src="/revi6.jpeg"
                        alt="Vanessa R."
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium">Vanessa R. • Cliente Verificado</span>
                  </div>
                </div>

                {/* Avaliação 8 */}
                <div className="border border-gray-200 rounded-lg p-6 mb-6 hover:border-green-200 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <h4 className="font-semibold">Casamento em 2 meses!</h4>
                    </div>
                    <div className="text-sm text-gray-500">22/12/2024</div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Meu casamento estava chegando e eu queria entrar no vestido dos meus sonhos! Comecei a tomar
                    Definamax e em 2 meses perdi 9kg! Consegui usar meu vestido e me senti maravilhosa no grande dia. As
                    fotos ficaram perfeitas!
                  </p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                      <Image
                        src="/luisa.png"
                        alt="Luísa C."
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium">Luísa C. • Cliente Verificado</span>
                  </div>
                </div>

                {/* Avaliação 9 - Masculina */}
                <div className="border border-gray-200 rounded-lg p-6 mb-6 hover:border-green-200 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex mb-1">
                        {[1, 2, 3, 4, 5].map((star, index) =>
                          index < 4 ? (
                            <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                          ) : (
                            <Star key={star} className="h-5 w-5 text-gray-300 fill-gray-300" />
                          ),
                        )}
                      </div>
                      <h4 className="font-semibold">Bom produto, poderia ser mais barato</h4>
                    </div>
                    <div className="text-sm text-gray-500">10/12/2024</div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    O produto funciona bem, perdi 5kg em um mês. Minha única reclamação é o preço, que acho um pouco
                    salgado. Por isso comprei o kit de 6 meses para economizar. Recomendo para quem está com dificuldade
                    para emagrecer.
                  </p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                      <Image
                        src="/paulo.png"
                        alt="Paulo G."
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium">Paulo G. • Cliente Verificado</span>
                  </div>
                </div>

                {/* Avaliação 10 */}
                <div className="border border-gray-200 rounded-lg p-6 hover:border-green-200 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <h4 className="font-semibold">Melhor que produtos importados!</h4>
                    </div>
                    <div className="text-sm text-gray-500">01/12/2024</div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Já gastei muito dinheiro com produtos importados que não funcionaram. Definamax foi o único que
                    realmente me ajudou a emagrecer. Em 4 meses perdi 16kg e me sinto com muito mais energia. Vale cada
                    centavo!
                  </p>
                  <div className="flex gap-2 mb-4">
                    <Image
                      src="/antes-sandra.png"
                      alt="Foto da avaliação"
                      width={100}
                      height={100}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                      <Image
                        src="/depoissandra.png"
                        alt="Sandra M."
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium">Sandra M. • Cliente Verificado</span>
                  </div>
                </div>
              </div>
            )}

            {/* Botão para ver mais avaliações */}
            <div className="text-center">
              <button
                onClick={toggleMoreReviews}
                className="inline-flex items-center justify-center rounded-lg border border-green-600 px-6 py-3 text-sm font-medium text-green-600 hover:bg-green-50"
              >
                {showMoreReviews ? "Ver menos avaliações" : "Ver mais avaliações"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-2 transition-transform ${showMoreReviews ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex justify-center mt-10 flex-col items-center">
            <button
              onClick={scrollToBuy}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 text-base font-bold text-white hover:from-green-500 hover:to-green-600 hover:scale-105 transition-all shadow-lg hover:shadow-xl border-b-4 border-green-700"
            >
              QUERO RESULTADOS COMO ESTES <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <div className="flex items-center justify-center mt-3 text-sm text-gray-600">
              <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
              <span>30 dias de garantia ou seu dinheiro de volta</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-16 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
              Dúvidas Frequentes
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Perguntas Frequentes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tudo o que você precisa saber antes de começar sua jornada de transformação
            </p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {/* FAQ 1 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:border-green-200 hover:shadow-md transition-all overflow-hidden">
              <button
                onClick={() => toggleFaq("faq1")}
                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
              >
                <h3 className="font-semibold text-lg">O Definamax tem efeitos colaterais?</h3>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${openFaqs.faq1 ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openFaqs.faq1 ? "max-h-96 pb-6" : "max-h-0"
                }`}
              >
                <p className="text-gray-700">
                  Definamax é formulado com ingredientes 100% naturais e, por isso, não causa efeitos colaterais na
                  maioria das pessoas. A única contraindicação é para indivíduos com alergia a crustáceos, que devem
                  evitar o uso. Para todos os demais, Definamax é uma forma segura e natural de alcançar seus objetivos
                  de emagrecimento.
                </p>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:border-green-200 hover:shadow-md transition-all overflow-hidden">
              <button
                onClick={() => toggleFaq("faq2")}
                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
              >
                <h3 className="font-semibold text-lg">Quanto tempo leva para ver resultados?</h3>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${openFaqs.faq2 ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openFaqs.faq2 ? "max-h-96 pb-6" : "max-h-0"
                }`}
              >
                <p className="text-gray-700">
                  A maioria dos usuários percebe redução no apetite e na compulsão por doces já na primeira semana.
                  Resultados visíveis na balança geralmente começam a partir de 15 dias de uso contínuo, com melhores
                  resultados entre 30-90 dias. Para resultados ótimos, recomendamos o tratamento completo de 3 meses.
                </p>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:border-green-200 hover:shadow-md transition-all overflow-hidden">
              <button
                onClick={() => toggleFaq("faq3")}
                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
              >
                <h3 className="font-semibold text-lg">Preciso fazer dieta enquanto uso Definamax?</h3>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${openFaqs.faq3 ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openFaqs.faq3 ? "max-h-96 pb-6" : "max-h-0"
                }`}
              >
                <p className="text-gray-700">
                  O Definamax funciona naturalmente reduzindo a fome e controlando a compulsão alimentar, o que facilita
                  a perda de peso sem dietas restritivas. No entanto, manter uma alimentação equilibrada e incluir
                  alguma atividade física potencializa os resultados e acelera o processo de emagrecimento.
                </p>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:border-green-200 hover:shadow-md transition-all overflow-hidden">
              <button
                onClick={() => toggleFaq("faq4")}
                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
              >
                <h3 className="font-semibold text-lg">Por que Definamax é melhor que injeções de emagrecimento?</h3>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${openFaqs.faq4 ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openFaqs.faq4 ? "max-h-96 pb-6" : "max-h-0"
                }`}
              >
                <p className="text-gray-700">
                  As injeções de emagrecimento foram desenvolvidas para diabéticos e causam vários efeitos colaterais
                  como náuseas severas, problemas digestivos e até pancreatite. Além disso, são extremamente caras e
                  requerem acompanhamento médico. Definamax oferece emagrecimento natural, sem efeitos colaterais
                  graves, por um preço acessível e sem necessidade de receita médica.
                </p>
              </div>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:border-green-200 hover:shadow-md transition-all overflow-hidden">
              <button
                onClick={() => toggleFaq("faq5")}
                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
              >
                <h3 className="font-semibold text-lg">Quais ingredientes compõem o Definamax?</h3>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${openFaqs.faq5 ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openFaqs.faq5 ? "max-h-[800px] pb-6" : "max-h-0"
                }`}
              >
                <div className="text-gray-700">
                  <p className="mb-2">
                    A fórmula poderosa do Definamax combina ingredientes naturais importados, cuidadosamente
                    selecionados para te ajudar a emagrecer de forma eficaz e saudável:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>
                      <strong>Psyllium:</strong> Uma fibra natural que promove a saciedade, auxilia no trânsito
                      intestinal e ajuda a controlar o apetite, essencial para reduzir a ingestão calórica.
                    </li>
                    <li>
                      <strong>Agar Agar:</strong> Uma gelatina vegetal que também contribui para a sensação de
                      plenitude, além de auxiliar na absorção de gorduras e na desintoxicação do organismo.
                    </li>
                    <li>
                      <strong>Quitosana:</strong> Uma fibra natural com a incrível capacidade de se ligar à gordura no
                      sistema digestivo, impedindo sua absorção e auxiliando na eliminação.
                    </li>
                    <li>
                      <strong>Espirulina:</strong> Uma alga rica em nutrientes, proteínas e antioxidantes, que além de
                      fornecer energia, pode ajudar a controlar a fome e acelerar o metabolismo.
                    </li>
                    <li>
                      <strong>Cromo:</strong> Um mineral importante que auxilia na regulação dos níveis de açúcar no
                      sangue, reduzindo a vontade de comer doces e carboidratos, um grande aliado no emagrecimento.
                    </li>
                  </ul>
                  <p>
                    O segredo do Definamax está na pureza e na qualidade desses ingredientes importados, sem aditivos
                    desnecessários, trabalhando em sinergia para potencializar seus resultados de emagrecimento de forma
                    natural e segura.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-10 flex-col items-center">
            <button
              onClick={scrollToBuy}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 text-base font-bold text-white hover:from-green-500 hover:to-green-600 hover:scale-105 transition-all shadow-lg hover:shadow-xl border-b-4 border-green-700"
            >
              QUERO COMEÇAR AGORA <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <div className="flex items-center justify-center mt-3 text-sm text-gray-600">
              <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
              <span>Compra 100% segura • 30 dias de garantia</span>
            </div>
          </div>
        </div>
      </section>

      {/* Rodapé expandido */}
      <footer className="w-full bg-green-800 text-white">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Image src="/logo2.png" alt="Definamax" width={150} height={50} className="h-10 w-auto mb-4" />
              <p className="text-sm text-green-100 mb-4">
                Definamax é um suplemento 100% natural para emagrecimento saudável e duradouro.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-green-100 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-green-100 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Informações</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-sm">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-sm">
                    Como funciona
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-sm">
                    Ingredientes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-sm">
                    Estudos científicos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-sm">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Suporte</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-sm">
                    Perguntas frequentes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-sm">
                    Política de privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-sm">
                    Termos de uso
                  </a>
                </li>
                <li>
                  <a href="https://www.definamaxoficial.com/termos" className="text-green-100 hover:text-white text-sm">
                    Política de devolução
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-sm">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Contato</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-green-100 text-sm">sac@bourjun.com.br</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-green-100 text-sm">(41) 98454-9172</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-green-100 text-sm">Av. Luiz Boiteux Piazza - Florianópolis/SC</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-green-700 mt-8 pt-8 text-center">
            <p className="text-sm mb-4">© {new Date().getFullYear()} Definamax. Todos os direitos reservados.</p>
            <p className="text-xs mb-2">Este produto não substitui o acompanhamento de profissionais de saúde.</p>
            <p className="text-xs mb-2"> *Resultados podem variar de pessoa para pessoa.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a
        href="https://wa.link/mhljyo"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg hover:scale-105 transition-all z-50 flex items-center justify-center px-3 py-2 text-sm sm:text-base animate-pulse-border"
        aria-label="Contato via WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Tire suas dúvidas
      </a>
    </main>
  )
}
