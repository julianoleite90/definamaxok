"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { CheckCircle2, X, ArrowRight, Star, ShieldCheck, MessageCircle, Clock } from "lucide-react"

// Adicione esta imagem para o novo comparativo
const outrosEmagrecedoresImg = "/placeholder-m1oov.png"

export default function LandingPage() {
  // Estado para controlar o carrossel de depoimentos
  const [testimonialPage, setTestimonialPage] = useState(0)
  const totalTestimonialPages = 2

  // Estado para controlar a exibição de mais avaliações
  const [showMoreReviews, setShowMoreReviews] = useState(false)
  const [showMoreTestimonials, setshowMoreTestimonials] = useState(false)

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

  // Estado para controlar a visibilidade do botão do WhatsApp
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false)

  // Add the following state variables after the existing state declarations (around line 40)
  // State for exit intent popup
  const [showExitPopup, setShowExitPopup] = useState(false)

  // State for exit popup timer
  const [exitPopupTimer, setExitPopupTimer] = useState({
    minutes: 3,
    seconds: 0,
  })

  // Ref for the popup
  const popupRef = useRef(null)

  // Reference to track when the page was loaded
  const pageLoadTimeRef = useRef(Date.now())

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
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  // Control WhatsApp button visibility based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const whatsAppButton = document.getElementById("whatsAppButton")
      const buySection = buyRef.current
      const heroSection = document.querySelector("section") // First section (hero)

      if (whatsAppButton && buySection && heroSection) {
        const scrollPosition = window.scrollY
        const heroRect = heroSection.getBoundingClientRect()
        const buyRect = buySection.getBoundingClientRect()
        const windowHeight = window.innerHeight

        // Check if we've scrolled past the hero section
        const isPastHeroSection = scrollPosition > heroSection.offsetHeight

        // Check if buy section is visible in viewport
        const isBuySectionVisible = buyRect.top < windowHeight && buyRect.bottom > 0

        // Show button only after scrolling past hero section AND when not in buy section
        if (isPastHeroSection && !isBuySectionVisible) {
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

  // Add the following useEffect for exit intent detection after the other useEffect hooks (around line 150)
  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e) => {
      // Only trigger when mouse leaves through the top of the page
      if (e.clientY <= 0 && !showExitPopup) {
        setShowExitPopup(true)
      }
    }

    // Close popup when clicking outside
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowExitPopup(false)
      }
    }

    // Handle mobile back button/gesture
    const handleMobileBackButton = () => {
      // Only show popup if it's not already showing and user has been on page for at least 5 seconds
      if (!showExitPopup && Date.now() - pageLoadTimeRef.current > 5000) {
        // Show the popup
        setShowExitPopup(true)

        // Add a new history entry to prevent the back action
        window.history.pushState(null, document.title, window.location.href)
      }
    }

    // Add a history entry on page load to enable back button detection
    window.history.pushState(null, document.title, window.location.href)

    // Only add the listener after 5 seconds on the page
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave)
      window.addEventListener("popstate", handleMobileBackButton)
    }, 5000)

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener("popstate", handleMobileBackButton)
    }
  }, [showExitPopup])

  // Countdown timer for exit popup
  useEffect(() => {
    if (!showExitPopup) return

    const timer = setInterval(() => {
      setExitPopupTimer((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 }
        } else {
          // When timer reaches zero, close the popup
          setShowExitPopup(false)
          return { minutes: 3, seconds: 0 }
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [showExitPopup])

  // Função para abrir o WhatsApp
  const openWhatsApp = () => {
    const message = encodeURIComponent("Olá! Gostaria de saber mais sobre o Definamax.")
    window.open(`https://wa.me/5541984549172?text=${message}`, "_blank")
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      {/* Header */}
      <header className="w-full relative overflow-hidden">
        <div className="bg-gradient-to-r from-green-800 via-green-700 to-green-800 py-3 shadow-md">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] animate-[shine_1.5s_infinite] pointer-events-none"></div>
          <div className="mx-auto max-w-5xl px-4 flex justify-center">
            <Image src="/logo2.png" alt="Definamax" width={200} height={60} className="h-12 w-auto" />
          </div>
        </div>
        <meta name="google-site-verification" content="055Y8Zlr7CXBMOD8_TVqgFAiashS0o5vcUD8K7vxO_s" />
      </header>

      {/* Hero Section */}
      <section
        className="w-full bg-gradient-to-b from-green-50 to-white py-6 md:py-8"
        aria-label="Benefícios do Definamax"
      >
        <div className="mx-auto max-w-5xl px-3 sm:px-4 grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
          <div className="order-2 md:order-1">
            <dep06 className="text-[2rem] sm:text-[2.2rem] md:text-[2.5rem] font-bold text-green-800 mb-4 break-words leading-tight">
              Perca peso{" "}
              <span className="text-green-600 relative">
                sem dietas drásticas,{" "}
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              </span>{" "}
              ou injeções arriscadas
            </dep06>

            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-4 break-words">
            Descubra o Poder das Fibras Naturais que Reduzem a Absorção de Gordura, Aceleram o Metabolismo e Prolongam a Saciedade
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
                  <span className="font-medium">Saciedade por mais tempo</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Redução da compulsão alimentar</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Metabolismo equilibrado</span>
                </li>

                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Resultados visíveis em semanas</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Fórmula 100% Natural e Segura</span>
                </li>
              </ul>
            </div>

            <button
              onClick={scrollToBuy}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-5 sm:px-8 py-4 sm:py-5 text-base sm:text-xl font-bold text-white hover:from-green-500 hover:to-green-600 w-full sm:w-auto text-center hover:scale-105 transition-all shadow-lg hover:shadow-xl border-b-4 border-green-700 animate-pulse-border"
            >
              EXPERIMENTE DEFINAMAX <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <div className="flex items-center justify-center mt-3 text-sm text-gray-600">
              <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
              <span>Resultados vísiveis ou seu dinheiro de volta</span>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative h-[400px] w-full flex justify-center">
              <Image
                src="/mockup.png"
                width={800}
                height={900}
                alt="Definamax - Suplemento Natural para Emagrecimento com Fibras Alimentares que Absorvem Gordura"
                className="h-[400px] w-auto object-contain mx-auto floating"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos - Carrossel React - Movido para cima para mostrar prova social mais cedo */}
      <section className="w-full py-16 bg-green-50" aria-label="Depoimentos de clientes Definamax">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-8">
            <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
              Veja quem já transformou a vida com Definamax
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Olha só! Pessoas normais que usaram e adoraram os benefícios...</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chega de se esconder! Conheça pessoas reais que recuperaram a autoestima e o prazer de se olhar no
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
                        src="/ava1.png"
                        alt="Maria"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
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
                    <div>
                      <Image
                        src="/dep01.png"
                        alt="Antes"
                        width={300}
                        height={300}
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    </div>
                  </div>

                  <p className="text-gray-700 mb-2">"Emagreceu 6kg em 30 dias, e eliminou a compulsão alimentar e diminuiu a ansiedade."</p>
                  <p className="text-green-700 font-medium">- 6kg em 1 mês</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-200 overflow-hidden mr-4">
                      <Image
                        src="/ava2.png"
                        alt="Carlos"
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
                    <div>
                      <Image
                        src="/dep02.png"
                        alt="Antes"
                        width={300}
                        height={300}
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    </div>
                  </div>

                  <p className="text-gray-700 mb-2">
                    "Patricia conseguiu perder 9kgs em 2 meses após a gravidez."
                  </p>
                  <p className="text-green-700 font-medium">- 9kg em 2 meses</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-200 overflow-hidden mr-4">
                      <Image
                        src="/ava3.png"
                        alt="Ana"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">Larissa</h4>
                        <span className="bg-green-600 text-white text-xs font-bold py-1 px-2 rounded-lg">-5kg</span>
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
                    <div>
                      <Image
                        src="dep03.png"
                        alt="Antes"
                        width={300}
                        height={300}
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    </div>
                  </div>

                  <p className="text-gray-700 mb-2">
                    "Larissa emagreceu 5kg em apenas 30 dias usando Definamax"
                  </p>
                  <p className="text-green-700 font-medium">- 5kg em 30 dias</p>
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
                        src="/ava4.png"
                        alt="Juliana"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">Lucas</h4>
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
                    <div>
                      <Image
                        src="dep04.png"
                        alt="Antes"
                        width={300}
                        height={300}
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    </div>
                  </div>

                  <p className="text-gray-700 mb-2">
                    "Lucas conseguiu perder 16kg em 5 meses sem precisar parar de tomar sua cerveja no final de semana"
                  </p>
                  <p className="text-green-700 font-medium">- 16kg em 5 meses</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-200 overflow-hidden mr-4">
                      <Image
                        src="/ava5.png"
                        alt="Roberto"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">Renata</h4>
                        <span className="bg-green-600 text-white text-xs font-bold py-1 px-2 rounded-lg">-10kg</span>
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
                    <div>
                      <Image
                        src="/dep05.png"
                        alt="Antes"
                        width={300}
                        height={300}
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    </div>
                  </div>

                  <p className="text-gray-700 mb-2">"Renata venceu a compulsão e  emagreceu 10kgs em 4 meses usando Definamax."</p>
                  <p className="text-green-700 font-medium">- 10kg em 4 meses</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-200 overflow-hidden mr-4">
                      <Image
                        src="/ava6.png"
                        alt="Marcos"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">Mariana</h4>
                        <span className="bg-green-600 text-white text-xs font-bold py-1 px-2 rounded-lg">-8kg</span>
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
                    <div>
                      <Image
                        src="/dep06.png"
                        alt="Antes"
                        width={300}
                        height={300}
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    </div>
                  </div>

                  <p className="text-gray-700 mb-2">"Mariana eliminou 8kg em 2 meses usando Definamax"</p>
                  <p className="text-green-700 font-medium">- 8kg em 2 meses</p>
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
                        src="/ava1.png"
                        alt="Maria"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
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
                    <div>
                      <Image
                        src="/dep01.png"
                        alt="Antes"
                        width={300}
                        height={300}
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    </div>
                  </div>

                  <p className="text-gray-700 mb-2">"Emagreceu 6kg em 30 dias, e eliminou a compulsão alimentar e diminuiu a ansiedade."</p>
                  <p className="text-green-700 font-medium">- 6kg em 30 dias</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-200 overflow-hidden mr-4">
                      <Image
                        src="/ava2.png"
                        alt="Carlos"
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
                    <div>
                      <Image
                        src="/dep02.png"
                        alt="Antes"
                        width={300}
                        height={300}
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    </div>
                  </div>

                  <p className="text-gray-700 mb-2">
                    "Patricia conseguiu perder 9kgs em 2 meses após a gravidez."
                  </p>
                  <p className="text-green-700 font-medium">- 9kg em 2 meses</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-200 overflow-hidden mr-4">
                      <Image
                        src="/ava3.png"
                        alt="Ana"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">Larissa</h4>
                        <span className="bg-green-600 text-white text-xs font-bold py-1 px-2 rounded-lg">-5kg</span>
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
                    <div>
                      <Image
                        src="dep03.png"
                        alt="Antes"
                        width={300}
                        height={300}
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    </div>
                  </div>

                  <p className="text-gray-700 mb-2">
                    "Larissa emagreceu 5kg em apenas 30 dias usando Definamax"
                  </p>
                  <p className="text-green-700 font-medium">- 5kg em 30 dias</p>
                </div>

                {/* Additional testimonials shown when "load more" is clicked */}
                {showMoreTestimonials && (
                  <>
                    <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-green-200 overflow-hidden mr-4">
                          <Image
                            src="/ava4.png"
                            alt="Juliana"
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">Lucas</h4>
                            <span className="bg-green-600 text-white text-xs font-bold py-1 px-2 rounded-lg">
                              -15kg
                            </span>
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
                        <div>
                          <Image
                            src="dep04.png"
                            alt="Antes"
                            width={300}
                            height={300}
                            className="w-full h-auto object-contain rounded-lg"
                          />
                        </div>
                      </div>

                      <p className="text-gray-700 mb-2">
                        "Lucas conseguiu perder 16kg em 5 meses sem precisar parar de tomar sua cerveja no final de semana."
                      </p>
                      <p className="text-green-700 font-medium">- 16g em 5 meses</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-green-200 overflow-hidden mr-4">
                          <Image
                            src="/ava5.png"
                            alt="Roberto"
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">Renata</h4>
                            <span className="bg-green-600 text-white text-xs font-bold py-1 px-2 rounded-lg">
                              -10kg
                            </span>
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
                        <div>
                          <Image
                            src="/dep05.png"
                            alt="Antes"
                            width={300}
                            height={300}
                            className="w-full h-auto object-contain rounded-lg"
                          />
                        </div>
                      </div>

                      <p className="text-gray-700 mb-2">"Renata venceu a compulsão e emagreceu 10kgs em 4 meses usando Definamax."</p>
                      <p className="text-green-700 font-medium">- 10kg em 4 meses</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-green-200 overflow-hidden mr-4">
                          <Image
                            src="/ava6.png"
                            alt="Marcos"
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">Mariana</h4>
                            <span className="bg-green-600 text-white text-xs font-bold py-1 px-2 rounded-lg">
                              -8kg
                            </span>
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
                        <div>
                          <Image
                            src="/dep06.png"
                            alt="Antes"
                            width={300}
                            height={300}
                            className="w-full h-auto object-contain rounded-lg"
                          />
                        </div>
                      </div>

                      <p className="text-gray-700 mb-2">"Mariana eliminou 8kg em 2 meses usando Definamax"</p>
                      <p className="text-green-700 font-medium">- 8kg em 2 meses</p>
                    </div>
                  </>
                )}
              </div>

              {/* Load More Button for Mobile */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setshowMoreTestimonials(!showMoreTestimonials)}
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
              EU TAMBÉM QUERO EMAGRECER! <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <div className="flex items-center justify-center mt-3 text-sm text-gray-600">
              <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
              <span>Resultados vísiveis ou seu dinheiro de volta</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      {/* Ciência por trás do Definamax */}
      <section className="w-full py-16 bg-white" aria-label="Como o Definamax funciona">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
              Entenda por que a fórmula realmente funciona
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
            A Ciência do Definamax:<span className="text-green-700"> Como Ele Transforma Seu Corpo</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
            A fórmula exclusiva combina ingredientes naturais que trabalham juntos para promover um emagrecimento saudável e sustentável. Veja como o Definamax age no seu organismo:
            </p>
          </div>

          <div className="grid md:grid-cols-2 items-center gap-8">
            <div className="relative w-full overflow-hidden rounded-lg shadow-lg aspect-video">
              <img
                src="https://emagrecedores-naturais.com/wp-content/uploads/2025/05/Captura-de-Tela-2025-05-07-as-17.58.20.png"
                alt="Definamax - Como as fibras inteligentes absorvem gordura e aceleram o metabolismo"
              />
              <iframe
                src="https://player.vimeo.com/video/1082333298?autoplay=1&loop=1&muted=1&background=1"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Definamax - Como funciona"
              ></iframe>
            </div>

            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-lg">
                <h3 className="text-xl font-semibold text-green-700 mb-2">Máxima Absorção de Gordura</h3>
                <p className="text-gray-700">
                  As fibras naturais do Definamax, extraidas da Quitosana se ligam às moléculas de gordura durante a
                  digestão, impedindo que a gordura consumida seja absorvida pelo organismo. Essas gorduras são
                  eliminadas naturalmente, sem sobrecarregar o sistema digestivo.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-lg">
                <h3 className="text-xl font-semibold text-green-700 mb-2">Saciedade prolongada</h3>
                <p className="text-gray-700">
                  Chega de sentir aquela fome incontrolável. As fibras extraídas do Psyllium e Agar-Agar se combinam com a água no estômago, formando um gel que te deixa saciado por horas, diminuindo a fome e os desejos por lanches.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-lg">
                <h3 className="text-xl font-semibold text-green-700 mb-2">Metabolismo acelerado</h3>
                <p className="text-gray-700">
                A espirulina, uma superalga rica em nutrientes, ajuda o corpo a usar carboidratos e gorduras de forma mais eficiente, liberando energia e vitalidade. O cromo regula os níveis de açúcar no sangue, otimizando o metabolismo para queimar calorias com mais potência.
                </p>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={scrollToBuy}
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 text-base font-bold text-white hover:from-green-500 hover:to-green-600 hover:scale-105 transition-all shadow-lg hover:shadow-xl border-b-4 border-green-700"
                >
                  QUERO EXPERIMENTAR <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparativo */}
      <section className="w-full py-16 bg-green-50" aria-label="Definamax vs Injeções de Emagrecimento">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
              Comparativo Exclusivo
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Definamax vs Injeções de Emagrecimento</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Por que a fórmula natural de Definamax é a melhor escolha?</p>
          </div>

          {/* Desktop View */}
          <div className="hidden md:grid md:grid-cols-2 gap-8">
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
                  src="/clorela.png"
                  width={400}
                  height={250}
                  alt="Benefícios do suplemento natural"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Fórmula natural</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Sem contraindicações</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Preço acessível</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Não precisa de receita médica</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Fácil de usar</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Não causa dependência</span>
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
                  src="/caneta.png"
                  width={400}
                  height={250}
                  alt="Efeitos colaterais de injeções"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Fórmula química</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Efeitos colaterais</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Preço extremamente caro</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Necessita de receita médica</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Causa náuseas e vômitos</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Efeito sanfona</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Mobile View - Carousel */}

          <div className="md:hidden">
            <div className="relative overflow-x-auto pb-8">
              <div className="flex space-x-4 w-max px-2 pb-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-500 shadow-md relative overflow-hidden min-w-[280px] max-w-[280px]">
                  <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                    RECOMENDADO
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-green-700">Definamax</h3>
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>

                  <div className="mb-4 rounded-lg overflow-hidden bg-white p-2">
                    <Image
                      src="/clorela1.png"
                      width={400}
                      height={250}
                      alt="Benefícios do suplemento natural"
                      className="w-full h-36 object-cover rounded-lg"
                    />
                  </div>

                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Fórmula natural</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Sem contraindicações</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Preço acessível</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Não precisa de receita médica</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Fácil de usar</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border border-red-200 shadow-md relative overflow-hidden min-w-[280px] max-w-[280px]">
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                    NÃO RECOMENDADO
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-red-700">Injeções</h3>
                    <X className="h-5 w-5 text-red-600" />
                  </div>

                  <div className="mb-4 rounded-lg overflow-hidden bg-white p-2">
                    <Image
                      src="/caneta1.png"
                      width={400}
                      height={250}
                      alt="Efeitos colaterais de injeções"
                      className="w-full h-36 object-cover rounded-lg"
                    />
                  </div>

                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <X className="h-4 w-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Fórmula química</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-4 w-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Efeitos colaterais</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-4 w-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Preço extremamente caro</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-4 w-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Necessita de receita médica</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-4 w-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Causa náuseas e vômitos</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-4 w-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="font-medium">Efeito sanfona</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Scroll indicator */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                <div className="flex items-center space-x-1">
                  <div className="w-8 h-1 bg-green-500 rounded-full"></div>
                  <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
                </div>
              </div>

              {/* Scroll prompt */}
              <div className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-green-600 text-white rounded-full p-2 animate-pulse shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Scroll instruction */}
            <div className="text-center text-sm text-green-700 font-medium mt-2 mb-6 animate-pulse">
              Deslize para o lado para ver mais comparações ➡️
            </div>
          </div>
          <div className="flex justify-center mt-10 flex-col items-center">
            <button
              onClick={scrollToBuy}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 text-base font-bold text-white hover:from-green-500 hover:to-green-600 hover:scale-105 transition-all shadow-lg hover:shadow-xl border-b-4 border-green-700"
            >
              ESCOLHER MEU DEFINAMAX <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <div className="flex items-center justify-center mt-3 text-sm text-gray-600">
              <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
              <span>Resultados vísiveis ou seu dinheiro de volta</span>
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
                  <Image
                    src="/onatural.png"
                    alt="Definamax Aprovado pela ANVISA - Suplemento Alimentar Registrado"
                    width={80}
                    height={80}
                    className="h-16 w-16 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">100% Natural</h3>
                  <p className="text-gray-600">Fabricado em laboratório certificado</p>
                </div>
              </div>
              <p className="text-gray-700">
              Definamax é composto por ingredientes 100% naturais, cuidadosamente selecionados e com seus benefícios amplamente comprovados pela ciência e por rigorosos estudos científicos no auxílio à perda de peso. Cada componente de Definamax atua de forma sinérgica para otimizar o seu metabolismo, promover a saciedade e auxiliar na queima de gordura. 

              </p>
              <div className="mt-4 flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-700 font-medium">Conheça os estudos científicos</span>
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
                Experimente o Definamax com total confiança! Oferecemos uma garantia incondicional de 30 dias para você
                sentir os benefícios das fibras inteligentes na sua jornada de emagrecimento. Se, dentro de 30 dias,
                você não estiver 100% satisfeito com os resultados, é só entrar em contato pelo e-mail e devolvemos 100%
                do seu dinheiro. Conforme nossos termos*
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
              EU TAMBÉM QUERO EMAGRECER COM DEFINAMAX <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <div className="flex items-center justify-center mt-3 text-sm text-gray-600">
              <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
              <span>Compra 100% segura • Satisfação garantida</span>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Bônus */}
      <section
        className="w-full py-16 bg-gradient-to-b from-white to-green-100 border-y-4 border-dashed border-yellow-400"
        aria-label="Bônus Exclusivos Definamax"
      >
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <div className="inline-block bg-yellow-400 text-yellow-800 px-4 py-2 rounded-full text-sm font-bold mb-3 animate-pulse">
              BÔNUS EXCLUSIVOS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Compras acima de 2 Frascos Ganham:</h2>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-lg">
              Aproveite estes bônus especiais para potencializar seus resultados
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Bônus 1: Colágeno Hidrolisado */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl border-2 border-yellow-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white py-3 px-4 text-center">
                <h3 className="text-xl font-bold">Colágeno Hidrolisado</h3>
                <p className="text-sm opacity-90">Combate a flacidez durante o emagrecimento</p>
              </div>

              <div className="p-6">
                <div className="flex justify-center mb-6 relative">
                  <Image
                    src="/colageno.png"
                    alt="Colágeno Hidrolisado"
                    width={200}
                    height={200}
                    className="h-48 object-contain hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                    GRÁTIS
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="font-medium">Previne a flacidez durante o processo de emagrecimento</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="font-medium">Melhora a elasticidade e firmeza da pele</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="font-medium">Fortalece unhas, cabelos e articulações</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="font-medium">Complemento perfeito para o Definamax</span>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-sm">
                  <p className="font-medium text-yellow-800 text-center">
                    <span className="inline-block bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded text-xs font-bold mb-1 md:mb-0 md:mr-1">
                      VALOR: <span className="line-through">R$89,90</span>
                    </span>
                    <span className="block md:inline">VOCÊ RECEBE GRATUITAMENTE!</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Bônus 2: Programa de Emagrecimento Acelerado */}

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl border-2 border-yellow-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white py-3 px-4 text-center">
                <h3 className="text-xl font-bold">Programa De Emagrecimento Acelerado</h3>
                <p className="text-sm opacity-90">Videoaulas com informações secretas para acelerar resultados</p>
              </div>

              <div className="p-6">
                <div className="flex justify-center mb-6 relative">
                  <Image
                    src="/programa.png"
                    alt="Programa De Emagrecimento Acelerado"
                    width={200}
                    height={200}
                    className="h-48 object-contain hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                    GRÁTIS
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="font-medium">Videoaulas exclusivas com especialistas em emagrecimento</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="font-medium">Técnicas secretas para potencializar a perda de peso</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="font-medium">Dicas de alimentação para maximizar os resultados</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="font-medium">Acesso vitalício ao conteúdo exclusivo</span>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-sm">
                  <p className="font-medium text-yellow-800 text-center">
                    <span className="inline-block bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded text-xs font-bold mb-1 md:mb-0 md:mr-1">
                      VALOR: <span className="line-through">R$197,00</span>
                    </span>
                    <span className="block md:inline">VOCÊ RECEBE GRATUITAMENTE!</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10 flex-col items-center">
            <button
              onClick={scrollToBuy}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-500 px-6 py-3 text-base font-bold text-white hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transition-all shadow-lg hover:shadow-xl border-b-4 border-yellow-700 animate-pulse-border"
            >
              GARANTIR MEUS BÔNUS AGORA <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <div className="flex items-center justify-center mt-3 text-sm text-gray-600">
              <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
              <span>Oferta por tempo limitado </span>
            </div>
          </div>
        </div>
      </section>

      {/* Área de compra */}
      <section
        id="comprar"
        ref={buyRef}
        className="w-full py-16 bg-gradient-to-b from-green-100 to-green-50"
        aria-label="Comprar Definamax"
      >
        <div className="mx-auto max-w-5xl px-4 text-center">
          <div className="mb-16">
            <div className="inline-block bg-yellow-400 text-yellow-800 px-4 py-2 rounded-full text-sm font-bold mb-3 animate-pulse">
              DISPONÍVEL ENQUANTO DURAREM OS ESTOQUES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Tome uma decisão hoje!</h2>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-lg">
              Escolha o kit ideal para você acelerar o seu processo de perda de peso
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 md:gap-8">
            {/* Kit 6 meses - Agora primeiro */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-2 px-4 text-center">
                <h3 className="text-lg font-bold">Kit Completo</h3>
                <p className="text-sm opacity-90">
                  Maior <span className="font-bold">desconto</span> nesse kit!
                </p>
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex justify-center mb-4 relative">
                  <Image
                    src="/6f.png"
                    alt="Kit 6 Meses"
                    width={400}
                    height={400}
                    className="h-40 sm:h-[10rem] object-contain hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                    -68%
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-gray-400 line-through text-sm">De R$1.479,40</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-700 mb-1">
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
                    <span className="text-sm">Programa Emagrecimento Acelerado</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Envio imediato</span>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-1.5 mb-2 sm:mb-3 text-xs">
                  <p className="font-medium text-yellow-800">
                    <span className="inline-block bg-yellow-200 text-yellow-800 px-1.5 py-0.5 rounded text-xs font-bold mr-1">
                      VOCÊ ECONOMIZA
                    </span>
                    R$1.000,00
                  </p>
                </div>

                <Link
                  href={addUtmToUrl("https://full.sale/ytA47b")}
                  className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-3 text-base font-medium text-white hover:bg-green-700 w-full hover:scale-105 transition-all"
                >
                  COMPRAR AGORA
                </Link>
                <p className="text-sm text-green-600 font-medium mt-2">Frete grátis para todo Brasil</p>
              </div>
            </div>

            {/* Kit 3 meses - MAIS POPULAR - Agora segundo */}
            <div className="bg-white rounded-2xl border-2 border-green-500 shadow-lg relative transform scale-105 md:scale-110 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden z-10">
              <div className="absolute top-0 left-0 right-0 w-full bg-yellow-500 text-center text-white font-bold py-2 px-4 z-20">
                MAIS VENDIDO
              </div>

              <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-2 sm:py-3 px-4 text-center mt-8">
                <h3 className="text-lg sm:text-xl font-bold">Kit Recomendado</h3>
                <p className="text-sm opacity-90">
                  Melhor <span className="font-bold">custo benefício</span> nesse kit!
                </p>
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex justify-center mb-4 relative">
                  <Image
                    src="/3f.png"
                    alt="Kit 3 Meses"
                    width={400}
                    height={400}
                    className="h-40 sm:h-[10rem] object-contain hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                    -50%
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 border-2 border-green-100">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-gray-400 line-through text-sm">De R$758,70</span>
                  </div>
                  <div className="text-2xl sm:text-4xl font-bold text-green-700 mb-1">
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
                    <span className="text-sm">Envio imediato</span>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-1.5 mb-2 sm:mb-3 text-xs">
                  <p className="font-medium text-yellow-800">
                    <span className="inline-block bg-yellow-200 text-yellow-800 px-1.5 py-0.5 rounded text-xs font-bold mr-1">
                      VOCÊ ECONOMIZA
                    </span>
                    R$420,00
                  </p>
                </div>

                <Link
                  href={addUtmToUrl("https://full.sale/DmNQj1")}
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-4 py-3 text-base font-bold text-white hover:from-green-500 hover:to-green-600 w-full hover:scale-105 transition-all shadow-md hover:shadow-xl border-b-4 border-green-700 animate-pulse-border"
                >
                  COMPRAR AGORA
                </Link>
                <p className="text-sm text-green-600 font-medium mt-2">Frete grátis para todo Brasil</p>
              </div>
            </div>

            {/* Kit 1 mês - Agora terceiro */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-2 px-4 text-center">
                <h3 className="text-lg font-bold">Kit Inicial</h3>
                <p className="text-sm opacity-90">
                  <span className="font-bold">Experimente</span>
                </p>
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex justify-center mb-4 relative">
                  <Image
                    src="/1f.png"
                    alt="Kit 1 Mês"
                    width={400}
                    height={400}
                    className="h-40 sm:h-[11rem] object-contain hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                    -18%
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-gray-400 line-through text-sm">De R$329,90</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-700 mb-1">
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
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Envio imediato</span>
                  </div>
                  <div className="flex items-start text-gray-400">
                    <X className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Sem bônus adcionais</span>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-1.5 mb-2 sm:mb-3 text-xs">
                  <p className="font-medium text-yellow-800">
                    <span className="inline-block bg-yellow-200 text-yellow-800 px-1.5 py-0.5 rounded text-xs font-bold mr-1">
                      VOCÊ ECONOMIZA
                    </span>
                    R$20,00
                  </p>
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
          </div>

          <div className="mt-10 flex flex-col items-center">
            <div className="bg-white rounded-xl p-4 shadow-md mb-6 max-w-2xl">
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <div className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium">Garantia de 30 dias</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium">Pagamento seguro</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium">Entrega para todo Brasil</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <Image src="/master.png" alt="Mastercard" width={60} height={40} className="h-8" />
              <Image src="/visa.png" alt="Visa" width={60} height={40} className="h-8" />
              <Image src="/hiper.png" alt="Hipercard" width={60} height={40} className="h-8" />
              <Image src="/pix.png" alt="Pix" width={60} height={40} className="h-8" />
            </div>

            <div className="text-sm text-gray-600 flex items-center justify-center">
              <span>Compra 100% segura • Satisfação garantida ou seu dinheiro de volta</span>
            </div>
          </div>
        </div>
      </section>

      {/* Avaliações estilo Amazon - Movido para cima */}
      <section className="w-full py-8 bg-green-50" aria-label="Avaliações do Definamax">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
              Avaliações Verificadas
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Avaliações de consumidores</h2>
            <p className="text-gray-600 max-w-2xl mx-auto"></p>
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
              {/* Avaliação Nova 1 */}
              <div className="border border-gray-200 rounded-lg p-6 mb-6 hover:border-green-200 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <h4 className="font-semibold">Valeu cada centavo!</h4>
                  </div>
                  <div className="text-sm text-gray-500">05/05/2025</div>
                </div>
                <p className="text-gray-700 mb-4">
                  Eu já tinha tentado de tudo, aquelas dietas malucas da internet, mas nada dava certo. Resolvi
                  experimentar o Definamax porque vi uma propaganda e o preço cabia no bolso. Em 2 meses, perdi 8kg! Não
                  é milagre, mas me ajudou a comer menos sem passar fome. Agora consigo correr atrás dos meus filhos sem
                  cansar tão rápido. Tô gostando muito!
                </p>
                <div className="flex gap-2 mb-4">
                  <Image
                    src="/review5.png"
                    alt="Foto da avaliação"
                    width={100}
                    height={100}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                    <Image
                      src="/review5.png"
                      alt="Mariana C."
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">Mariana C. • Cliente Verificado</span>
                </div>
              </div>

              {/* Avaliação Nova 2 */}
              <div className="border border-gray-200 rounded-lg p-6 mb-6 hover:border-green-200 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <h4 className="font-semibold">Me ajudou a curtir meu futebol sem culpa!</h4>
                  </div>
                  <div className="text-sm text-gray-500">28/04/2025</div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Vi o Definamax numa matéria da TV e fiquei curioso, mas esperei pra ver se era verdade. Eu não queria
                  parar com minha cervejinha de fim de semana, sabe? Minha barriga tava enorme por causa disso. Em 5
                  meses tomando, perdi 16kg e a barriga diminuiu bastante. Ainda tomo minha gelada no sábado de futebol,
                  mas com moderação. Pra mim, tá aprovado!"
                </p>
                <div className="flex gap-2 mb-4">
                  <Image
                    src="/review6.png"
                    alt="Foto da avaliação"
                    width={100}
                    height={100}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                    <Image
                      src="/review6.png"
                      alt="Lucas M."
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">Lucas M. • Cliente Verificado</span>
                </div>
              </div>

              {/* Avaliação 1 */}
              <div className="border border-gray-200 rounded-lg p-6 mb-6 hover:border-green-200 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <h4 className="font-semibold">Tô me sentindo mais leve!</h4>
                  </div>
                  <div className="text-sm text-gray-500">12/03/2025</div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Eu sempre lutei com o peso e com vontade de comer besteira o tempo todo. Com o Definamax, em 4 meses
                  consegui perder 10kg. Não foi fácil no começo, porque às vezes esquecia de tomar, mas depois que
                  peguei o jeito, senti que comia menos e tinha mais energia. Tô feliz com o progresso!"
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
                    <h4 className="font-semibold">Finalmente algo que não me deu problema!</h4>
                  </div>
                  <div className="text-sm text-gray-500">28/02/2025</div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Tentei umas injeções pra emagrecer, mas me davam náusea e dor de cabeça. O Definamax foi diferente, é
                  natural e não senti nada ruim. Perdi 9kg em 3 meses, e minha pressão, que tava alta, tá bem melhor.
                  Não é rápido como prometem por aí, mas funcionou pra mim!"
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
                    <h4 className="font-semibold">Voltei a jogar bola com os amigos!</h4>
                  </div>
                  <div className="text-sm text-gray-500">15/02/2025</div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Depois de engordar na pandemia, tava difícil até subir escada. O Definamax me ajudou a perder 11kg em
                  3 meses. Não virei atleta, mas agora consigo jogar uma pelada com os amigos sem passar vergonha. Minha
                  esposa tá feliz com a mudança, e eu também!"
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
                    <h4 className="font-semibold">Me sinto muito melhor</h4>
                  </div>
                  <div className="text-sm text-gray-500">02/02/2025</div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Depois do meu filho, tava impossível voltar ao peso de antes. Tentei umas dietas, mas não tinha
                  paciência. Com o Definamax, perdi 9kg em 2 meses e meio. Não fico mais tão ansiosa pra comer doce."
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
                    <h4 className="font-semibold">Não acreditava, mas funcionou!</h4>
                  </div>
                  <div className="text-sm text-gray-500">20/01/2025</div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Tava desconfiado, achando que era só mais um suplemento caro. Mas resolvi tentar o Definamax porque o
                  preço tava bom. Perdi 8kg em 2 meses, e minha barriga tá bem menor. Ainda tenho que tomar direitinho
                  pra não esquecer, mas tô gostando do resultado. Já indiquei pros amigos do trampo!"
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
                      <h4 className="font-semibold">Muito mais saúde!</h4>
                    </div>
                    <div className="text-sm text-gray-500">15/01/2025</div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    "Estava com pré-diabetes e o médico falou pra emagrecer urgente. Não tinha grana pra nutricionista
                    particular, então comprei o Definamax. Perdi 10kg em 3 meses, e meus exames melhoraram bastante. Não
                    é mágica, mas com um pouco de cuidado com a comida, fez diferença!"
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
                      <h4 className="font-semibold">Não voltei a engordar!</h4>
                    </div>
                    <div className="text-sm text-gray-500">05/01/2025</div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    "Emagreci 10kg com dieta e academia no ano passado, mas tava difícil manter. Comecei o Definamax pra
                    ajudar, e há 3 meses não ganhei peso nenhum. Me sinto mais leve e com menos vontade de beliscar
                    besteira. Pra quem quer manter o peso, é uma boa!"
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
                      <h4 className="font-semibold">Me senti bem na festa da empresa!</h4>
                    </div>
                    <div className="text-sm text-gray-500">22/12/2024</div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    "Queria emagrecer pra festa de fim de ano da firma. Comprei o Definamax e perdi 6kg em 2 meses. Não
                    foi fácil, porque às vezes esquecia de tomar, mas consegui usar uma roupa mais justa e me senti
                    linda! Tô continuando pra perder mais um pouco."
                  </p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                      <Image
                        src="/review7.png"
                        alt="Amanda P."
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium">Amanda P. • Cliente Verificado</span>
                  </div>
                </div>

                {/* Avaliação 9 - Masculina */}
                <div className="border border-gray-200 rounded-lg p-6 mb-6 hover:border-green-200 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <h4 className="font-semibold">Melhorou minha disposição em casa!</h4>
                    </div>
                    <div className="text-sm text-gray-500">10/12/2024</div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    "Engordei na pandemia, e tava difícil acompanhar as crianças. Minha esposa reclamava que eu tava
                    muito parado. Com o Definamax, perdi 5kg em 1 mês e tô com mais energia. Não é milagre, mas me
                    ajudou a comer menos e me mexer mais. Tô bem mais animado!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                      <Image
                        src="/review8.png"
                        alt="Marcelo F."
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium">Marcelo F. • Cliente Verificado</span>
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
                      <h4 className="font-semibold">Me deu mais confiança no trabalho!</h4>
                    </div>
                    <div className="text-sm text-gray-500">01/12/2024</div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    "Trabalho como vendedora numa loja de carros, e a aparência conta muito. Tava difícil emagrecer com
                    a correria do dia a dia. Com o Definamax, perdi 6kg em 2 meses e me sinto mais disposta. Meus
                    colegas notaram a diferença, e já indiquei pra várias amigas!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                      <Image
                        src="/review9.png"
                        alt="Claudia S."
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium">Claudia S. • Cliente Verificado</span>
                  </div>
                </div>
              </div>
            )}

            {/* Botão "Ver Mais Avaliações" */}
            <div className="flex justify-center mt-8">
              <button
                onClick={toggleMoreReviews}
                className="inline-flex items-center justify-center rounded-lg border border-green-600 px-6 py-3 text-sm font-medium text-green-600 hover:bg-green-50"
              >
                {showMoreReviews ? "Ver Menos Avaliações" : "Ver Mais Avaliações"}
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
              QUERO EMAGRECER AGORA! <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <div className="flex items-center justify-center mt-3 text-sm text-gray-600">
              <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
              <span>Resultados vísiveis ou seu dinheiro de volta</span>
            </div>
          </div>
        </div>
      </section>

      {/* Perguntas Frequentes (FAQ) */}
      <section className="w-full py-16 bg-white" aria-label="Perguntas Frequentes sobre Definamax">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
              Dúvidas Comuns
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Perguntas Frequentes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Encontre respostas rápidas para as dúvidas mais comuns sobre o Definamax
            </p>
          </div>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full text-left py-4 px-6 font-semibold text-gray-800 flex justify-between items-center"
                onClick={() => toggleFaq("faq1")}
                aria-expanded={openFaqs.faq1}
              >
                O que é Definamax e como ele funciona?
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${openFaqs.faq1 ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`px-6 pb-4 text-gray-700 transition-all duration-300 overflow-hidden ${
                  openFaqs.faq1 ? "block" : "hidden"
                }`}
              >
                Definamax é um Suplemento Alimentar cuidadosamente formulado com agar-agar, espirulina, psyllium e cromo para auxiliar no seu processo de emagrecimento de forma natural e eficaz.

Com Definamax, você pode esperar resultados significativos na redução do peso corporal e na melhora do controle do apetite. Isso é possível devido aos ingredientes que o compõem, que fazem o seguinte:

Agar-agar e psyllium são fibras que, ao entrarem em contato com a água, formam um gel no estômago, aumentando a sensação de saciedade e reduzindo a ingestão calórica nas refeições.
A espirulina, rica em proteínas e nutrientes, também contribui para a saciedade e apoia um metabolismo saudável.
O cromo atua na regulação dos níveis de açúcar no sangue e na redução da vontade de comer doces e carboidratos, o que é crucial para manter a dieta.
Juntos, esses ingredientes trabalham para otimizar a digestão, promover a saciedade prolongada e auxiliar no metabolismo de gorduras e carboidratos, guiando você para uma perda de peso saudável e sustentável.
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full text-left py-4 px-6 font-semibold text-gray-800 flex justify-between items-center"
                onClick={() => toggleFaq("faq2")}
                aria-expanded={openFaqs.faq2}
              >
                Quais são os principais benefícios do Definamax?
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${openFaqs.faq2 ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`px-6 pb-4 text-gray-700 transition-all duration-300 overflow-hidden ${
                  openFaqs.faq2 ? "block" : "hidden"
                }`}
              >
                Auxílio na Perda de Peso: A combinação de ingredientes naturais e cientificamente comprovados atua sinergicamente para promover a redução do peso corporal.
Controle do Apetite e da Saciedade: As fibras presentes (agar-agar e psyllium) expandem-se no estômago, proporcionando uma sensação de plenitude por mais tempo, o que ajuda a diminuir a fome e a ingestão excessiva de alimentos.
Redução da Vontade por Doces e Carboidratos: O cromo, um dos componentes chave, contribui para a regulação dos níveis de glicose no sangue, o que pode diminuir os desejos por alimentos açucarados e ricos em carboidratos.
Metabolismo Otimizado: Ingredientes como a espirulina e o cromo apoiam o metabolismo de gorduras e carboidratos, contribuindo para uma queima de energia mais eficiente.
Melhora da Saúde Digestiva: As fibras do agar-agar e do psyllium também auxiliam no bom funcionamento intestinal, promovendo a regularidade e o bem-estar digestivo geral.
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full text-left py-4 px-6 font-semibold text-gray-800 flex justify-between items-center"
                onClick={() => toggleFaq("faq3")}
                aria-expanded={openFaqs.faq3}
              >
                Definamax possui alguma contraindicação ou efeito colateral?
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${openFaqs.faq3 ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`px-6 pb-4 text-gray-700 transition-all duration-300 overflow-hidden ${
                  openFaqs.faq3 ? "block" : "hidden"
                }`}
              >
                Definamax é um produto 100% natural e não possui contraindicações ou efeitos colaterais conhecidos. No
                entanto, gestantes, lactantes e pessoas com doenças preexistentes devem consultar um médico antes de
                iniciar o uso.
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full text-left py-4 px-6 font-semibold text-gray-800 flex justify-between items-center"
                onClick={() => toggleFaq("faq4")}
                aria-expanded={openFaqs.faq4}
              >
                Como devo utilizar o Definamax para obter os melhores resultados?
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${openFaqs.faq4 ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`px-6 pb-4 text-gray-700 transition-all duration-300 overflow-hidden ${
                  openFaqs.faq4 ? "block" : "hidden"
                }`}
              >
                Recomenda-se utilizar 2 cápsulas de Definamax por dia, preferencialmente antes das principais refeições,
                com um copo de água. Para obter os melhores resultados, utilize o produto de forma contínua por pelo
                menos 3 meses.
              </div>
            </div>

            {/* FAQ 5 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full text-left py-4 px-6 font-semibold text-gray-800 flex justify-between items-center"
                onClick={() => toggleFaq("faq5")}
                aria-expanded={openFaqs.faq5}
              >
                Qual o prazo de entrega e a política de garantia do Definamax?
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${openFaqs.faq5 ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`px-6 pb-4 text-gray-700 transition-all duration-300 overflow-hidden ${
                  openFaqs.faq5 ? "block" : "hidden"
                }`}
              >
                O prazo de entrega do Definamax varia de acordo com a sua região, mas geralmente é de 5 a 10 dias úteis.
                Oferecemos uma garantia de satisfação de 30 dias. Se você não estiver satisfeito com os resultados,
                basta entrar em contato conosco para receber 100% do seu dinheiro de volta.
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10 flex-col items-center">
            <button
              onClick={scrollToBuy}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 text-base font-bold text-white hover:from-green-500 hover:to-green-600 hover:scale-105 transition-all shadow-lg hover:shadow-xl border-b-4 border-green-700"
            >
              EU QUERO EXPERIMENTAR! <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <div className="flex items-center justify-center mt-3 text-sm text-gray-600">
              <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
              <span>Compra 100% segura • Satisfação garantida</span>
            </div>
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
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Link href="/avaliacao" className="text-sm hover:text-green-200">
              Avaliação de IMC
            </Link>
            <Link href="/termos" className="text-sm hover:text-green-200">
              Termos de Garantia
            </Link>
            <Link href="/perguntas-frequentes" className="text-sm hover:text-green-200">
              Perguntas Frequentes
            </Link>
            <Link href="/produto" className="text-sm hover:text-green-200">
              Produtos
            </Link>
            <Link href="/remarketing" className="text-sm hover:text-green-200">
              Depoimentos em Vídeo
            </Link>
            <Link href="/privacidade" className="text-sm hover:text-green-200">
              Política de Privacidade
            </Link>
          </div>
          <p className="text-xs text-gray-300">
            Copyright © {new Date().getFullYear()} Definamax. Todos os direitos reservados.
          </p>
          <p className="text-xs text-gray-300 mt-2">Bourjun Nature Health, Florianópolis Santa Catarina</p>
        </div>
      </footer>
      {/* Botão flutuante do WhatsApp */}
      <div id="whatsAppButton" className="fixed bottom-4 right-4 z-50 transition-all duration-300">
        <button
          onClick={openWhatsApp}
          className="flex items-center justify-center rounded-full bg-green-500 p-4 text-white hover:bg-green-600 shadow-lg hover:shadow-xl transition-all animate-pulse-border hover:scale-110"
          aria-label="Compre pelo WhatsApp"
        >
          <MessageCircle className="h-8 w-8" />
        </button>
        <span className="absolute bottom-full right-0 mb-2 bg-white text-green-600 text-xs font-bold py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap border border-green-200 animate-bounce">
          Fale conosco no WhatsApp!
        </span>
      </div>
      {/* Structured Data for Product */}

      {/* Structured Data for FAQ */}

      {/* Structured Data for Organization */}
      {/* Exit Intent Popup */}
      {showExitPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div
            ref={popupRef}
            className="bg-white rounded-lg max-w-md w-full p-6 relative animate-[shake_0.8s_ease-in-out]"
          >
            <button
              onClick={() => setShowExitPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Espere! Não vá embora ainda!</h3>
              <p className="text-red-600 font-semibold">Oferta especial só para você</p>
            </div>

            <div className="flex justify-center mb-4">
              <Image
                src="/mockup.png"
                alt="Definamax - Oferta Especial"
                width={120}
                height={160}
                className="h-32 object-contain"
              />
            </div>

            <div className="bg-green-50 rounded-lg p-4 mb-4 text-center">
              <p className="text-lg font-bold text-green-700 mb-2">+10% de DESCONTO</p>
              <p className="text-gray-700">No kit com 3 frascos de Definamax</p>

              <div className="mt-3 bg-yellow-100 rounded-lg p-2 flex items-center justify-center">
                <Clock className="h-5 w-5 text-red-500 mr-2" />
                <p className="font-bold text-red-600">
                  Oferta expira em: {exitPopupTimer.minutes.toString().padStart(2, "0")}:
                  {exitPopupTimer.seconds.toString().padStart(2, "0")}
                </p>
              </div>
            </div>

            <Link
              href={addUtmToUrl("https://checkout.fullsale.com.br/?pid=Xure9l7ypYcKclqaxtM6&coupon=saida")}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-4 py-3 text-base font-bold text-white hover:from-green-500 hover:to-green-600 w-full hover:scale-105 transition-all text-center"
            >
              APROVEITAR DESCONTO ADICIONAL <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
