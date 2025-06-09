"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { CheckCircle2, ArrowRight, Star, Clock, ShieldCheck, ThumbsUp, Lock, ChevronDown } from "lucide-react"

export default function LandingPage() {
  // Estado para controlar o carrossel de depoimentos
  const [testimonialPage, setTestimonialPage] = useState(0)
  const totalTestimonialPages = 2

  // Estado para controlar a exibição de mais avaliações
  const [showMoreReviews, setShowMoreReviews] = useState(false)
  const [showMoreTestimonials, setShowMoreTestimonials] = useState(false)

  // Referência para a seção de kits
  const kitsRef = useRef<HTMLDivElement>(null)

  // Estado para contagem regressiva
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 59,
    seconds: 59,
  })

  // Referência para a seção de compra
  const buyRef = useRef<HTMLDivElement>(null)

  // Estado para controlar quais perguntas estão abertas no acordeão
  const [openFaqs, setOpenFaqs] = useState<number[]>([])

  // Função para alternar o estado de uma pergunta
  const toggleFaq = (faqId: number) => {
    setOpenFaqs(prev => 
      prev.includes(faqId) 
        ? prev.filter(i => i !== faqId)
        : [...prev, faqId]
    )
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

  // Substitua o useEffect que lida com os cliques nos thumbnails pelo seguinte código:

  useEffect(() => {
    // Função para lidar com o clique nos thumbnails
    function setupVideoThumbnails() {
      // Para cada container de vídeo
      for (let i = 1; i <= 4; i++) {
        const thumbnailOverlay = document.querySelector(`#video-container-${i} .thumbnail-overlay`)
        const videoFrame = document.getElementById(`video-frame-${i}`)
        const videoContainer = document.getElementById(`video-container-${i}`)

        if (thumbnailOverlay && videoFrame && videoContainer) {
          // Adiciona o event listener diretamente ao elemento
          thumbnailOverlay.addEventListener("click", () => {
            console.log(`Thumbnail ${i} clicked`) // Debug log

            // Esconde o thumbnail
            thumbnailOverlay.classList.add("hidden")

            // Mostra o iframe do vídeo e garante que ele ocupe todo o espaço
            videoFrame.classList.remove("hidden")
            videoFrame.style.position = "absolute"
            videoFrame.style.top = "0"
            videoFrame.style.left = "0"
            videoFrame.style.width = "100%"
            videoFrame.style.height = "100%"

            // Atualiza o src do iframe para iniciar o vídeo com autoplay
            const currentSrc = videoFrame.getAttribute("src")
            if (currentSrc) {
              const newSrc = currentSrc.includes("?") ? `${currentSrc}&autoplay=1` : `${currentSrc}?autoplay=1`

              videoFrame.setAttribute("src", newSrc)
              console.log(`Video ${i} src updated to: ${newSrc}`) // Debug log
            }
          })
        } else {
          console.error(`Elements not found for video ${i}`) // Debug log
        }
      }
    }

    // Executar a configuração após um pequeno delay para garantir que o DOM está pronto
    setTimeout(setupVideoThumbnails, 500)

    // Também executar quando o DOM estiver completamente carregado
    if (document.readyState === "complete") {
      setupVideoThumbnails()
    } else {
      window.addEventListener("load", setupVideoThumbnails)
      return () => window.removeEventListener("load", setupVideoThumbnails)
    }
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

      {/* Vimeo Testimonials Section */}
      <section className="w-full py-16 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
              Depoimentos em Vídeo
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Veja Transformações Reais</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Assista aos depoimentos de pessoas que transformaram suas vidas com Definamax
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="aspect-video w-full relative">
                <div className="video-container absolute inset-0" id="video-container-1">
                  <div className="thumbnail-overlay absolute inset-0 cursor-pointer z-10">
                    <Image
                      src="/alarissa.png"
                      alt="Thumbnail do vídeo"
                      width={600}
                      height={400}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-green-600 rounded-full p-4 bg-opacity-80 hover:bg-opacity-100 transition-all transform hover:scale-110">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <iframe
                    src="https://player.vimeo.com/video/1079845171"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="hidden"
                    title="Depoimento 1"
                    id="video-frame-1"
                  ></iframe>
                </div>
              </div>
              <div className="p-4 bg-green-50">
                <h3 className="font-semibold text-lg">Larissa, 32 anos</h3>
                <p className="text-gray-700">Cliente de Definamax</p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="aspect-video w-full relative">
                <div className="video-container absolute inset-0" id="video-container-2">
                  <div className="thumbnail-overlay absolute inset-0 cursor-pointer z-10">
                    <Image
                      src="/aandrea.png"
                      alt="Thumbnail do vídeo"
                      width={600}
                      height={400}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-green-600 rounded-full p-4 bg-opacity-80 hover:bg-opacity-100 transition-all transform hover:scale-110">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <iframe
                    src="https://player.vimeo.com/video/1079850549"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="hidden"
                    title="Depoimento 2"
                    id="video-frame-2"
                  ></iframe>
                </div>
              </div>
              <div className="p-4 bg-green-50">
                <h3 className="font-semibold text-lg">Andrea, 28 anos</h3>
                <p className="text-gray-700">Perdeu 18kg em 4 meses com Definamax</p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="aspect-video w-full relative">
                <div className="video-container absolute inset-0" id="video-container-3">
                  <div className="thumbnail-overlay absolute inset-0 cursor-pointer z-10">
                    <Image
                      src="/arenata.png"
                      alt="Thumbnail do vídeo"
                      width={600}
                      height={400}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-green-600 rounded-full p-4 bg-opacity-80 hover:bg-opacity-100 transition-all transform hover:scale-110">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <iframe
                    src="https://player.vimeo.com/video/1079845066"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="hidden"
                    title="Depoimento 3"
                    id="video-frame-3"
                  ></iframe>
                </div>
              </div>
              <div className="p-4 bg-green-50">
                <h3 className="font-semibold text-lg">Renata, 31 anos</h3>
                <p className="text-gray-700">Perdeu 15kg em 4 meses com Definamax</p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="aspect-video w-full relative">
                <div className="video-container absolute inset-0" id="video-container-4">
                  <div className="thumbnail-overlay absolute inset-0 cursor-pointer z-10">
                    <Image
                      src="/avanessa.png"
                      alt="Thumbnail do vídeo"
                      width={600}
                      height={400}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-green-600 rounded-full p-4 bg-opacity-80 hover:bg-opacity-100 transition-all transform hover:scale-110">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <iframe
                    src="https://player.vimeo.com/video/1079845128"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="hidden"
                    title="Depoimento 4"
                    id="video-frame-4"
                  ></iframe>
                </div>
              </div>
              <div className="p-4 bg-green-50">
                <h3 className="font-semibold text-lg">Vanessa, 29 anos</h3>
                <p className="text-gray-700">Perdeu 12kg em 3 meses com Definamax</p>
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

      {/* Seção de Reviews */}
      <section className="w-full py-16 bg-white">
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Avaliações dos clientes
            </h2>
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-xl font-bold text-gray-800">4.9 de 5</span>
              </div>
              <div className="h-6 w-px bg-gray-300"></div>
              <span className="hidden md:block text-sm text-gray-600">
                3.842 avaliações globais
              </span>
            </div>
          </div>

          {/* Barra de Avaliações */}
          <div className="max-w-xl mx-auto mb-12 px-4">
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-24">
                    <span className="text-sm text-gray-600">{rating} estrelas</span>
                  </div>
                  <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400 rounded-full" 
                      style={{ 
                        width: rating === 5 ? '85%' : 
                               rating === 4 ? '10%' : 
                               rating === 3 ? '3%' : 
                               rating === 2 ? '1%' : '1%' 
                      }}
                    ></div>
                  </div>
                  <div className="w-16 text-right">
                    <span className="text-sm text-gray-600">
                      {rating === 5 ? '85%' : 
                       rating === 4 ? '10%' : 
                       rating === 3 ? '3%' : 
                       rating === 2 ? '1%' : '1%'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="grid grid-cols-1 gap-8">
            {/* Primeiros 4 Reviews */}
            {[
              {
                name: "Mariana Santos",
                title: "Finalmente consegui emagrecer depois de ter filho",
                date: "05/05/2025",
                verified: true,
                text: "Depois que tive meu segundo filho, tentei de tudo pra emagrecer. Fiz dieta da sopa, shake, até aquela do ovo... nada funcionava. Vivia cansada e desanimada, me sentindo culpada cada vez que comia um pedacinho de pão. Uma amiga me indicou o Definamax e resolvi tentar. Em 2 meses perdi 8kg, mas o mais importante: não fico mais com aquela fome absurda e consigo cuidar das crianças com mais disposição. Até voltei a usar minhas roupas antigas!",
                image: "/review5.png",
                helpful: 152
              },
              {
                name: "Carlos Eduardo",
                title: "Consegui controlar a compulsão por doce depois do trabalho",
                date: "28/04/2025",
                verified: true,
                text: "Trabalho como motorista de aplicativo, 12 horas por dia. Era só chegar em casa e atacava a geladeira, principalmente doces. Já tava com pré-diabetes e pressão alta, mas não conseguia parar de comer. Com o Definamax, a ansiedade diminuiu muito e aquela fome descontrolada passou. Em 3 meses, perdi 9kg e meus exames melhoraram. O médico até diminuiu meus remédios. Agora consigo fazer minhas corridas sem ficar ofegante.",
                image: "/review6.png",
                helpful: 98
              },
              {
                name: "Renata Silva",
                title: "Não precisei fazer dieta maluca pra emagrecer",
                date: "12/03/2025",
                verified: true,
                text: "Já gastei uma fortuna com nutricionista e remédios caros, mas sempre desistia porque as dietas eram muito restritivas. Como trabalho em loja, não dava pra ficar pesando comida ou fazendo várias refeições. O Definamax me ajudou a controlar a fome sem precisar de cardápio complicado. Perdi 5kg em 30 dias, e o melhor: consigo manter o peso mesmo comendo um docinho de vez em quando. Não é milagre, mas funciona de verdade!",
                image: "/revi1.jpeg",
                helpful: 76
              },
              {
                name: "Daniela Torres",
                title: "Voltei a me sentir bonita depois dos 40",
                date: "28/02/2025",
                verified: true,
                text: "A menopausa acabou comigo, engordei 15kg em um ano e nada que eu fazia resolvia. Me sentia péssima, sem energia e com vergonha de sair de casa. Uma cliente da minha loja me falou do Definamax. No começo fiquei com medo de ser furada, mas decidi tentar. Foi a melhor decisão! Perdi 9kg em 3 meses, minhas ondas de calor diminuíram e voltei a ter disposição pra fazer hidroginástica. Minha autoestima voltou!",
                image: "/revi2.png",
                helpful: 89
              }
            ].map((review, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-green-100">
                      <Image
                        src={review.image}
                        alt={review.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
                        {review.verified && (
                          <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                            <span className="text-xs text-green-700 font-medium">Verificado</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-1">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium text-green-800 mb-2">{review.title}</h4>
                    <p className="text-gray-600 text-[15px] leading-relaxed">{review.text}</p>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{review.helpful} pessoas acharam útil</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Reviews adicionais */}
            {showMoreReviews && (
              <>
                {[
                  {
                    name: "Ricardo Mendes",
                    title: "Recuperei minha saúde e disposição",
                    date: "15/02/2025",
                    verified: true,
                    text: "Sou vendedor, passo o dia todo na rua e só comia besteira. Tava com 108kg, colesterol alto e dormia mal por causa da apneia. Comecei a tomar Definamax junto com uma alimentação mais regrada, nada muito radical. Em 3 meses perdi 11kg e minha vida mudou completamente. Durmo melhor, tenho mais energia pra trabalhar e até voltei a jogar futebol com meus filhos no fim de semana. Vale cada centavo!",
                    image: "/rica.png",
                    helpful: 187
                  },
                  {
                    name: "Patricia Lima",
                    title: "Emagreci sem passar fome ou ficar irritada",
                    date: "02/02/2025",
                    verified: true,
                    text: "Sou professora e mãe solo, não tenho tempo nem dinheiro pra academia. Já tinha tentado vários remédios pra emagrecer, mas ficava muito nervosa e com insônia. O Definamax foi diferente, me ajudou a controlar a ansiedade e aquela fome emocional que vinha sempre à noite. Perdi 12kg em 3 meses e meio, sem efeitos colaterais. O melhor é que consigo manter minha rotina normal, só que mais leve e disposta.",
                    image: "/revi3.png",
                    helpful: 143
                  },
                  {
                    name: "André Teixeira",
                    title: "Resolvi meu problema com a compulsão alimentar",
                    date: "20/01/2025",
                    verified: true,
                    text: "Trabalho em home office na área de TI, e a ansiedade me fazia comer o dia todo na frente do computador. Já tinha perdido as esperanças quando um amigo me indicou o Definamax. Nos primeiros dias já senti diferença na fome e na vontade de beliscar. Perdi 8kg em 2 meses, mas o principal foi ter me livrado daquela necessidade de estar sempre comendo. Agora consigo me concentrar melhor no trabalho e não fico mais com aquela sensação de culpa.",
                    image: "/andre.png",
                    helpful: 165
                  },
                  {
                    name: "Fernanda Duarte",
                    title: "Me livrei do efeito sanfona",
                    date: "15/01/2025",
                    verified: true,
                    text: "Sempre fui aquela pessoa que fazia dieta, perdia peso e depois engordava tudo de novo. Era um ciclo sem fim de frustração. Com o Definamax, pela primeira vez consegui emagrecer de forma equilibrada. Perdi 10kg em 3 meses e, o mais importante, já faz 6 meses que mantenho o peso. Não preciso mais ficar contando caloria ou me privando de tudo. Aprendi a ter uma relação melhor com a comida.",
                    image: "/fernando.png",
                    helpful: 134
                  }
                ].map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 md:pb-8">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={review.image}
                          alt={review.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base md:text-lg font-semibold text-gray-800">{review.name}</h3>
                        <div className="flex items-center gap-2 mb-1 md:mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <span className="text-xs md:text-sm font-medium">{review.title}</span>
                        </div>
                        <div className="text-xs md:text-sm text-gray-500 mb-2 md:mb-3">
                          Avaliado em {review.date}
                          {review.verified && (
                            <span className="ml-2 text-green-600 font-medium">• Cliente Verificado</span>
                          )}
                        </div>
                        <div className="prose prose-sm max-w-none text-gray-600">
                          <p className="text-sm md:text-base">{review.text}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Botão Ver Mais */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowMoreReviews(!showMoreReviews)}
              className="group inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-600 hover:text-gray-900 gap-2 bg-white rounded-lg border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md active:shadow-inner active:translate-y-[1px] transition-all duration-200"
            >
              {showMoreReviews ? "Ver menos depoimentos" : "Ver mais depoimentos"}
              <ChevronDown className={`h-5 w-5 transition-transform animate-pulse group-hover:animate-none group-hover:translate-y-1 ${showMoreReviews ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
      </section>

      {/* Seção de Kits */}
      <section className="w-full py-16 relative bg-green-50" ref={buyRef}>
        <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_0%,#4ade8025_0,transparent_50%)]"></div>
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 relative">
              Seu corpo dos sonhos com{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-[#E8F5E9] transform -rotate-1 rounded-2xl"></span>
                <span className="relative text-green-800">Definamax!</span>
              </span>
            </h2>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="max-w-3xl mx-auto px-4 py-4 bg-white rounded-2xl shadow-sm border border-gray-100 my-4">
                <p className="text-gray-700 text-lg md:text-xl">
                  Restam poucos frascos com FRETE GRÁTIS no dia de hoje:{" "}
                  <span className="text-red-600 font-bold">27/05/2025</span>
                </p>
              </div>
            </div>
          </div>

          <div ref={kitsRef} className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-y-20 gap-x-0 max-w-5xl mx-auto px-4 mt-4">
            {/* Kit 8 Frascos */}
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden border border-[#E8F5E9] max-w-[460px] mx-auto md:scale-y-[1.07]">
              <div className="bg-[#1B8E3D] p-2.5 text-white text-center rounded-t-[20px]">
                <h3 className="text-[1.425rem] font-bold tracking-wider">COMPRE 5 LEVE 8 FRASCOS</h3>
                <p className="text-[1.0675rem]">GANHE 2 FRASCOS DE COLÁGENO</p>
              </div>
              
              <div className="bg-[#E8F5E9] py-1.5 text-center">
                <p className="text-xl font-medium text-[#1B8E3D]">Tratamento Completo</p>
              </div>

              <div className="p-4">
                <div className="flex justify-center mb-4">
                  <Image
                    src="/8frascos.png"
                    alt="Kit 8 Meses"
                    width={400}
                    height={400}
                    className="h-auto w-full max-w-[200px] object-contain"
                  />
                </div>

                <div className="text-center space-y-1.5">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-gray-400 line-through text-xl">De R$1.079,00</span>
                  </div>
                  <p className="text-lg font-medium">Por apenas 12x</p>
                  <p className="text-green-700 text-5xl font-bold">R$45<span className="text-[70%]">,08</span></p>
                  <p className="text-base font-medium">Ou R$449,00 à vista!</p>
                </div>

                <div className="bg-[#E8F5E9] py-1.5 text-center -mx-4 mt-3">
                  <span className="text-xl font-medium text-[#1B8E3D]">FRETE GRÁTIS</span>
                </div>

                <div className="mt-8">
                  <Link
                    href={addUtmToUrl("https://full.sale/XONObQ")}
                    className="block w-full bg-[#15803D] text-white font-bold py-3 text-xl rounded-xl hover:bg-[#166534] transition-all text-center shadow-lg relative overflow-hidden group animate-[pulseAndScale_2s_ease-in-out_infinite]"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] group-hover:animate-[shine_1.5s_infinite]"></div>
                    <span className="relative">COMPRAR AGORA</span>
                  </Link>
                </div>

                <div className="flex justify-center mt-4">
                  <Image
                    src="/privacidade.webp"
                    alt="Selos de Segurança"
                    width={380}
                    height={76}
                    className="h-auto w-full max-w-[380px]"
                  />
                </div>
              </div>
            </div>

            {/* Kit 5 Frascos */}
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden border-2 border-yellow-500 max-w-[460px] mx-auto md:scale-y-[1.07]">
              <div className="bg-yellow-500 p-2.5 text-white text-center rounded-t-[20px]">
                <h3 className="text-[1.425rem] font-bold tracking-wider">COMPRE 3 LEVE 5 FRASCOS</h3>
                <p className="text-[1.0675rem]">GANHE 1 FRASCO DE COLÁGENO</p>
              </div>
              
              <div className="bg-yellow-50 py-1.5 text-center">
                <p className="text-xl font-medium text-yellow-600">Tratamento Mais Vendido</p>
              </div>

              <div className="p-4">
                <div className="flex justify-center mb-4">
                  <Image
                    src="/5frascos.png"
                    alt="Kit 5 Meses"
                    width={400}
                    height={400}
                    className="h-auto w-full max-w-[200px] object-contain"
                  />
                </div>

                <div className="text-center space-y-1.5">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-gray-400 line-through text-xl">De R$879,00</span>
                  </div>
                  <p className="text-lg font-medium">Por apenas 12x</p>
                  <p className="text-yellow-600 text-5xl font-bold">R$38<span className="text-[70%]">,05</span></p>
                  <p className="text-base font-medium">Ou R$379,00 à vista!</p>
                </div>

                <div className="bg-[#E8F5E9] py-1.5 text-center -mx-4 mt-3">
                  <span className="text-xl font-medium text-[#1B8E3D]">FRETE GRÁTIS</span>
                </div>

                <div className="mt-8">
                  <Link
                    href={addUtmToUrl("https://full.sale/ytA47b")}
                    className="block w-full bg-[#15803D] text-white font-bold py-3 text-xl rounded-xl hover:bg-[#166534] transition-all text-center shadow-lg relative overflow-hidden group animate-[pulseAndScale_2s_ease-in-out_infinite]"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] group-hover:animate-[shine_1.5s_infinite]"></div>
                    <span className="relative">COMPRAR AGORA</span>
                  </Link>
                </div>

                <div className="flex justify-center mt-4">
                  <Image
                    src="/privacidade.webp"
                    alt="Selos de Segurança"
                    width={380}
                    height={76}
                    className="h-auto w-full max-w-[380px]"
                  />
                </div>
              </div>
            </div>

            {/* Kit 3 Frascos */}
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden border border-[#E8F5E9] max-w-[460px] mx-auto md:scale-y-[1.07]">
              <div className="bg-[#1B8E3D] p-2.5 text-white text-center rounded-t-[20px]">
                <h3 className="text-[1.425rem] font-bold tracking-wider">COMPRE 2 LEVE 3 FRASCOS</h3>
                <p className="text-[1.0675rem]">GANHE ENVIO IMEDIATO</p>
              </div>
              
              <div className="bg-[#E8F5E9] py-1.5 text-center">
                <p className="text-xl font-medium text-[#1B8E3D]">Tratamento Inicial</p>
              </div>

              <div className="p-4">
                <div className="flex justify-center mb-4">
                  <Image
                    src="/2frascos.png"
                    alt="Kit 3 Meses"
                    width={400}
                    height={400}
                    className="h-auto w-full max-w-[200px] object-contain"
                  />
                </div>

                <div className="text-center space-y-1.5">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-gray-400 line-through text-xl">De R$579,00</span>
                  </div>
                  <p className="text-lg font-medium">Por apenas 12x</p>
                  <p className="text-green-700 text-5xl font-bold">R$28<span className="text-[70%]">,01</span></p>
                  <p className="text-base font-medium">Ou R$279,00 à vista!</p>
                </div>

                <div className="bg-[#E8F5E9] py-1.5 text-center -mx-4 mt-3">
                  <span className="text-xl font-medium text-[#1B8E3D]">FRETE GRÁTIS</span>
                </div>

                <div className="mt-8">
                  <button
                    disabled
                    className="block w-full bg-gray-400 text-white font-bold py-3 text-xl rounded-xl cursor-not-allowed text-center shadow-lg relative overflow-hidden"
                  >
                    <span className="relative">ESGOTADO</span>
                  </button>
                </div>

                <div className="flex justify-center mt-4">
                  <Image
                    src="/privacidade.webp"
                    alt="Selos de Segurança"
                    width={380}
                    height={76}
                    className="h-auto w-full max-w-[380px]"
                  />
                </div>
              </div>
            </div>

            {/* Kit 1 Frasco */}
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden border border-[#E8F5E9] max-w-[460px] mx-auto md:scale-y-[1.07]">
              <div className="bg-[#1B8E3D] p-2.5 text-white text-center rounded-t-[20px]">
                <h3 className="text-[1.425rem] font-bold tracking-wider">1 FRASCO</h3>
                <p className="text-[1.0675rem]">GANHE ENVIO IMEDIATO</p>
              </div>
              
              <div className="bg-[#E8F5E9] py-1.5 text-center">
                <p className="text-xl font-medium text-[#1B8E3D]">Experimente</p>
              </div>

              <div className="p-4">
                <div className="flex justify-center mb-4">
                  <Image
                    src="/1fraso.png"
                    alt="Kit 1 Mês"
                    width={400}
                    height={400}
                    className="h-auto w-full max-w-[200px] object-contain"
                  />
                </div>

                <div className="text-center space-y-1.5">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-gray-400 line-through text-xl">De R$197,00</span>
                  </div>
                  <p className="text-lg font-medium">Por apenas 12x</p>
                  <p className="text-green-700 text-5xl font-bold">R$14<span className="text-[70%]">,72</span></p>
                  <p className="text-base font-medium">Ou R$147,20 à vista!</p>
                </div>

                <div className="bg-[#E8F5E9] py-1.5 text-center -mx-4 mt-3">
                  <span className="text-xl font-medium text-[#1B8E3D]">FRETE GRÁTIS</span>
                </div>

                <div className="mt-8">
                  <Link
                    href={addUtmToUrl("https://full.sale/eMbtHp")}
                    className="block w-full bg-[#15803D] text-white font-bold py-3 text-xl rounded-xl hover:bg-[#166534] transition-all text-center shadow-lg relative overflow-hidden group animate-[pulseAndScale_2s_ease-in-out_infinite]"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] group-hover:animate-[shine_1.5s_infinite]"></div>
                    <span className="relative">COMPRAR AGORA</span>
                  </Link>
                </div>

                <div className="flex justify-center mt-4">
                  <Image
                    src="/privacidade.webp"
                    alt="Selos de Segurança"
                    width={380}
                    height={76}
                    className="h-auto w-full max-w-[380px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Selos de Segurança */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
            <div className="flex items-center gap-3">
              <Lock className="h-8 w-8 text-gray-400" />
              <div>
                <div className="font-medium text-gray-800">Site Seguro</div>
                <div className="text-sm text-gray-500">Certificado SSL</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-gray-400" />
              <div>
                <div className="font-medium text-gray-800">Garantia</div>
                <div className="text-sm text-gray-500">30 dias</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-gray-400" />
              <div>
                <div className="font-medium text-gray-800">Entrega</div>
                <div className="text-sm text-gray-500">7 dias úteis</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/comprasegura.png"
                alt="Compra Segura"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <div>
                <div className="font-medium text-gray-800">Compra Segura</div>
                <div className="text-sm text-gray-500">Ambiente protegido</div>
              </div>
            </div>
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
                onClick={() => toggleFaq(1)}
                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
              >
                <h3 className="font-semibold text-lg">O Definamax tem efeitos colaterais?</h3>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${openFaqs.includes(1) ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openFaqs.includes(1) ? "max-h-96 pb-6" : "max-h-0"
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
                onClick={() => toggleFaq(2)}
                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
              >
                <h3 className="font-semibold text-lg">Quanto tempo leva para ver resultados?</h3>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${openFaqs.includes(2) ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openFaqs.includes(2) ? "max-h-96 pb-6" : "max-h-0"
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
                onClick={() => toggleFaq(3)}
                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
              >
                <h3 className="font-semibold text-lg">Preciso fazer dieta enquanto uso Definamax?</h3>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${openFaqs.includes(3) ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openFaqs.includes(3) ? "max-h-96 pb-6" : "max-h-0"
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
                onClick={() => toggleFaq(4)}
                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
              >
                <h3 className="font-semibold text-lg">Por que Definamax é melhor que injeções de emagrecimento?</h3>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${openFaqs.includes(4) ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openFaqs.includes(4) ? "max-h-96 pb-6" : "max-h-0"
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
                onClick={() => toggleFaq(5)}
                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
              >
                <h3 className="font-semibold text-lg">Quais ingredientes compõem o Definamax?</h3>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${openFaqs.includes(5) ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openFaqs.includes(5) ? "max-h-[800px] pb-6" : "max-h-0"
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

      {/* Seção de Kits */}
      <section className="w-full py-16 relative bg-green-50" ref={buyRef}>
        <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_0%,#4ade8025_0,transparent_50%)]"></div>
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 relative">
              Seu corpo dos sonhos com{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-[#E8F5E9] transform -rotate-1 rounded-2xl"></span>
                <span className="relative text-green-800">Definamax!</span>
              </span>
            </h2>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="max-w-3xl mx-auto px-4 py-4 bg-white rounded-2xl shadow-sm border border-gray-100 my-4">
                <p className="text-gray-700 text-lg md:text-xl">
                  Restam poucos frascos com FRETE GRÁTIS no dia de hoje:{" "}
                  <span className="text-red-600 font-bold">27/05/2025</span>
                </p>
              </div>
            </div>
          </div>

          <div ref={kitsRef} className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-y-20 gap-x-0 max-w-5xl mx-auto px-4 mt-4">
            {/* Kit 8 Frascos */}
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden border border-[#E8F5E9] max-w-[460px] mx-auto md:scale-y-[1.07]">
              <div className="bg-[#1B8E3D] p-2.5 text-white text-center rounded-t-[20px]">
                <h3 className="text-[1.425rem] font-bold tracking-wider">COMPRE 5 LEVE 8 FRASCOS</h3>
                <p className="text-[1.0675rem]">GANHE 2 FRASCOS DE COLÁGENO</p>
              </div>
              
              <div className="bg-[#E8F5E9] py-1.5 text-center">
                <p className="text-xl font-medium text-[#1B8E3D]">Tratamento Completo</p>
              </div>

              <div className="p-4">
                <div className="flex justify-center mb-4">
                  <Image
                    src="/8frascos.png"
                    alt="Kit 8 Meses"
                    width={400}
                    height={400}
                    className="h-auto w-full max-w-[200px] object-contain"
                  />
                </div>

                <div className="text-center space-y-1.5">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-gray-400 line-through text-xl">De R$1.079,00</span>
                  </div>
                  <p className="text-lg font-medium">Por apenas 12x</p>
                  <p className="text-green-700 text-5xl font-bold">R$45<span className="text-[70%]">,08</span></p>
                  <p className="text-base font-medium">Ou R$449,00 à vista!</p>
                </div>

                <div className="bg-[#E8F5E9] py-1.5 text-center -mx-4 mt-3">
                  <span className="text-xl font-medium text-[#1B8E3D]">FRETE GRÁTIS</span>
                </div>

                <div className="mt-8">
                  <Link
                    href={addUtmToUrl("https://full.sale/XONObQ")}
                    className="block w-full bg-[#15803D] text-white font-bold py-3 text-xl rounded-xl hover:bg-[#166534] transition-all text-center shadow-lg relative overflow-hidden group animate-[pulseAndScale_2s_ease-in-out_infinite]"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] group-hover:animate-[shine_1.5s_infinite]"></div>
                    <span className="relative">COMPRAR AGORA</span>
                  </Link>
                </div>

                <div className="flex justify-center mt-4">
                  <Image
                    src="/privacidade.webp"
                    alt="Selos de Segurança"
                    width={380}
                    height={76}
                    className="h-auto w-full max-w-[380px]"
                  />
                </div>
              </div>
            </div>

            {/* Kit 5 Frascos */}
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden border-2 border-yellow-500 max-w-[460px] mx-auto md:scale-y-[1.07]">
              <div className="bg-yellow-500 p-2.5 text-white text-center rounded-t-[20px]">
                <h3 className="text-[1.425rem] font-bold tracking-wider">COMPRE 3 LEVE 5 FRASCOS</h3>
                <p className="text-[1.0675rem]">GANHE 1 FRASCO DE COLÁGENO</p>
              </div>
              
              <div className="bg-yellow-50 py-1.5 text-center">
                <p className="text-xl font-medium text-yellow-600">Tratamento Mais Vendido</p>
              </div>

              <div className="p-4">
                <div className="flex justify-center mb-4">
                  <Image
                    src="/5frascos.png"
                    alt="Kit 5 Meses"
                    width={400}
                    height={400}
                    className="h-auto w-full max-w-[200px] object-contain"
                  />
                </div>

                <div className="text-center space-y-1.5">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-gray-400 line-through text-xl">De R$879,00</span>
                  </div>
                  <p className="text-lg font-medium">Por apenas 12x</p>
                  <p className="text-yellow-600 text-5xl font-bold">R$38<span className="text-[70%]">,05</span></p>
                  <p className="text-base font-medium">Ou R$379,00 à vista!</p>
                </div>

                <div className="bg-[#E8F5E9] py-1.5 text-center -mx-4 mt-3">
                  <span className="text-xl font-medium text-[#1B8E3D]">FRETE GRÁTIS</span>
                </div>

                <div className="mt-8">
                  <Link
                    href={addUtmToUrl("https://full.sale/ytA47b")}
                    className="block w-full bg-[#15803D] text-white font-bold py-3 text-xl rounded-xl hover:bg-[#166534] transition-all text-center shadow-lg relative overflow-hidden group animate-[pulseAndScale_2s_ease-in-out_infinite]"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] group-hover:animate-[shine_1.5s_infinite]"></div>
                    <span className="relative">COMPRAR AGORA</span>
                  </Link>
                </div>

                <div className="flex justify-center mt-4">
                  <Image
                    src="/privacidade.webp"
                    alt="Selos de Segurança"
                    width={380}
                    height={76}
                    className="h-auto w-full max-w-[380px]"
                  />
                </div>
              </div>
            </div>

            {/* Kit 3 Frascos */}
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden border border-[#E8F5E9] max-w-[460px] mx-auto md:scale-y-[1.07]">
              <div className="bg-[#1B8E3D] p-2.5 text-white text-center rounded-t-[20px]">
                <h3 className="text-[1.425rem] font-bold tracking-wider">COMPRE 2 LEVE 3 FRASCOS</h3>
                <p className="text-[1.0675rem]">GANHE ENVIO IMEDIATO</p>
              </div>
              
              <div className="bg-[#E8F5E9] py-1.5 text-center">
                <p className="text-xl font-medium text-[#1B8E3D]">Tratamento Inicial</p>
              </div>

              <div className="p-4">
                <div className="flex justify-center mb-4">
                  <Image
                    src="/2frascos.png"
                    alt="Kit 3 Meses"
                    width={400}
                    height={400}
                    className="h-auto w-full max-w-[200px] object-contain"
                  />
                </div>

                <div className="text-center space-y-1.5">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-gray-400 line-through text-xl">De R$579,00</span>
                  </div>
                  <p className="text-lg font-medium">Por apenas 12x</p>
                  <p className="text-green-700 text-5xl font-bold">R$28<span className="text-[70%]">,01</span></p>
                  <p className="text-base font-medium">Ou R$279,00 à vista!</p>
                </div>

                <div className="bg-[#E8F5E9] py-1.5 text-center -mx-4 mt-3">
                  <span className="text-xl font-medium text-[#1B8E3D]">FRETE GRÁTIS</span>
                </div>

                <div className="mt-8">
                  <button
                    disabled
                    className="block w-full bg-gray-400 text-white font-bold py-3 text-xl rounded-xl cursor-not-allowed text-center shadow-lg relative overflow-hidden"
                  >
                    <span className="relative">ESGOTADO</span>
                  </button>
                </div>

                <div className="flex justify-center mt-4">
                  <Image
                    src="/privacidade.webp"
                    alt="Selos de Segurança"
                    width={380}
                    height={76}
                    className="h-auto w-full max-w-[380px]"
                  />
                </div>
              </div>
            </div>

            {/* Kit 1 Frasco */}
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden border border-[#E8F5E9] max-w-[460px] mx-auto md:scale-y-[1.07]">
              <div className="bg-[#1B8E3D] p-2.5 text-white text-center rounded-t-[20px]">
                <h3 className="text-[1.425rem] font-bold tracking-wider">1 FRASCO</h3>
                <p className="text-[1.0675rem]">GANHE ENVIO IMEDIATO</p>
              </div>
              
              <div className="bg-[#E8F5E9] py-1.5 text-center">
                <p className="text-xl font-medium text-[#1B8E3D]">Experimente</p>
              </div>

              <div className="p-4">
                <div className="flex justify-center mb-4">
                  <Image
                    src="/1fraso.png"
                    alt="Kit 1 Mês"
                    width={400}
                    height={400}
                    className="h-auto w-full max-w-[200px] object-contain"
                  />
                </div>

                <div className="text-center space-y-1.5">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-gray-400 line-through text-xl">De R$197,00</span>
                  </div>
                  <p className="text-lg font-medium">Por apenas 12x</p>
                  <p className="text-green-700 text-5xl font-bold">R$14<span className="text-[70%]">,72</span></p>
                  <p className="text-base font-medium">Ou R$147,20 à vista!</p>
                </div>

                <div className="bg-[#E8F5E9] py-1.5 text-center -mx-4 mt-3">
                  <span className="text-xl font-medium text-[#1B8E3D]">FRETE GRÁTIS</span>
                </div>

                <div className="mt-8">
                  <Link
                    href={addUtmToUrl("https://full.sale/eMbtHp")}
                    className="block w-full bg-[#15803D] text-white font-bold py-3 text-xl rounded-xl hover:bg-[#166534] transition-all text-center shadow-lg relative overflow-hidden group animate-[pulseAndScale_2s_ease-in-out_infinite]"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] group-hover:animate-[shine_1.5s_infinite]"></div>
                    <span className="relative">COMPRAR AGORA</span>
                  </Link>
                </div>

                <div className="flex justify-center mt-4">
                  <Image
                    src="/privacidade.webp"
                    alt="Selos de Segurança"
                    width={380}
                    height={76}
                    className="h-auto w-full max-w-[380px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Selos de Segurança */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
            <div className="flex items-center gap-3">
              <Lock className="h-8 w-8 text-gray-400" />
              <div>
                <div className="font-medium text-gray-800">Site Seguro</div>
                <div className="text-sm text-gray-500">Certificado SSL</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-gray-400" />
              <div>
                <div className="font-medium text-gray-800">Garantia</div>
                <div className="text-sm text-gray-500">30 dias</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-gray-400" />
              <div>
                <div className="font-medium text-gray-800">Entrega</div>
                <div className="text-sm text-gray-500">7 dias úteis</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/comprasegura.png"
                alt="Compra Segura"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <div>
                <div className="font-medium text-gray-800">Compra Segura</div>
                <div className="text-sm text-gray-500">Ambiente protegido</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Garantia */}
      <section className="w-full py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-5xl mx-auto mb-16 px-4 mt-16">
            <div className="bg-gradient-to-br from-green-50/80 to-white rounded-[32px] shadow-lg overflow-hidden border border-green-100">
              <div className="flex flex-col md:grid md:grid-cols-2 items-start md:items-center gap-8 p-6 md:p-12">
                {/* Coluna da Esquerda - Imagem */}
                <div className="w-full max-w-md mx-auto md:max-w-none">
                  <div className="bg-green-600 rounded-t-[24px] p-4">
                    <Image
                      src="/mockup2.png"
                      alt="Definamax Garantia"
                      width={500}
                      height={500}
                      className="w-full h-auto object-contain max-h-[400px]"
                    />
                  </div>
                  <div className="bg-white rounded-b-[24px] p-4 border-x border-b border-green-100 shadow-sm">
                    <p className="text-lg md:text-xl font-bold text-green-600 text-left md:text-center">30 DIAS DE GARANTIA</p>
                  </div>
                </div>

                {/* Coluna da Direita - Texto */}
                <div className="flex flex-col gap-4 md:gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/logo2.png"
                        alt="Garantia"
                        width={24}
                        height={24}
                        className="w-6 h-6 object-contain"
                      />
                      <span className="text-green-600 font-medium">Garantia</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-green-600">30 DIAS DE GARANTIA</h2>
                    <h3 className="text-lg md:text-2xl font-bold text-gray-800">GARANTIA DE RESULTADOS</h3>
                  </div>

                  <p className="text-gray-600">
                    Investir no <span className="font-semibold">Definamax</span> é uma decisão importante para transformar sua saúde, por isso, asseguramos que nosso produto é <span className="font-semibold">desenvolvido com os mais rigorosos padrões de qualidade</span>.
                  </p>

                  <p className="text-gray-600">
                    Temos total confiança na eficácia do <span className="font-semibold">Definamax</span>, e por isso oferecemos uma <span className="font-semibold">garantia de 30 dias</span>.
                  </p>

                  <p className="text-gray-600">
                    Se por qualquer motivo você não ficar satisfeito com os resultados, basta entrar em contato conosco dentro do período de garantia que devolveremos 100% do seu dinheiro, sem questionamentos.
                  </p>

                  <button
                    onClick={() => kitsRef.current?.scrollIntoView({ behavior: "smooth" })}
                    className="inline-flex whitespace-nowrap items-center justify-center rounded-lg bg-green-600 px-6 md:px-[6.6rem] py-4 md:py-[1.32rem] text-base md:text-[1.1rem] font-bold text-white hover:bg-green-500 transition-all shadow-md hover:shadow-lg"
                  >
                    QUERO EMAGRECER AGORA!
                  </button>
                </div>
              </div>
            </div>
          </div>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-6 left-12 w-24 h-24 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              <div className="relative">
                <Image
                  src="/garantia.png"
                  alt="Selo de garantia de 30 dias"
                  width={500}
                  height={500}
                  className="w-full max-w-md mx-auto floating"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Experimente{" "}
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-[#E8F5E9] transform -rotate-1 rounded-2xl"></span>
                  <span className="relative text-green-800">sem risco</span>
                </span>{" "}
                por 30 dias!
              </h2>
              <div className="space-y-6">
                <p className="text-gray-600 text-lg">
                  Confiamos tanto no poder do Definamax que oferecemos uma{" "}
                  <strong className="text-gray-800">garantia incondicional de 30 dias</strong>. Se por qualquer motivo
                  você não ficar satisfeito, devolvemos 100% do seu dinheiro.
                </p>
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Lock className="h-5 w-5 text-green-600" />
                    Nossa Garantia Blindada
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="flex-shrink-0">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <strong className="text-gray-800">Devolução Garantida:</strong>
                        <p className="text-gray-600 mt-1">
                          Se você não estiver completamente satisfeito com os resultados, basta entrar em contato com
                          nosso atendimento e solicitar o reembolso.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <strong className="text-gray-800">Sem Burocracia:</strong>
                        <p className="text-gray-600 mt-1">
                          Não fazemos perguntas complexas. Nosso processo de devolução é simples e rápido, sem
                          questionamentos.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <strong className="text-gray-800">Reembolso Integral:</strong>
                        <p className="text-gray-600 mt-1">
                          Devolvemos 100% do valor investido, sem descontos ou taxas escondidas.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <button
                    onClick={scrollToBuy}
                    className="w-full md:w-auto inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 text-base font-bold text-white hover:from-green-500 hover:to-green-600 hover:scale-105 transition-all shadow-lg hover:shadow-xl border-b-4 border-green-700"
                  >
                    QUERO EXPERIMENTAR SEM RISCO <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                  <div className="flex items-center justify-center mt-3 text-sm text-gray-600">
                    <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
                    <span>Compra 100% segura • 30 dias de garantia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Reviews */}
      <section className="w-full py-16 bg-white">
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Avaliações dos clientes
            </h2>
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-xl font-bold text-gray-800">4.9 de 5</span>
              </div>
              <div className="h-6 w-px bg-gray-300"></div>
              <span className="hidden md:block text-sm text-gray-600">
                3.842 avaliações globais
              </span>
            </div>
          </div>

          {/* Barra de Avaliações */}
          <div className="max-w-xl mx-auto mb-12 px-4">
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-24">
                    <span className="text-sm text-gray-600">{rating} estrelas</span>
                  </div>
                  <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400 rounded-full" 
                      style={{ 
                        width: rating === 5 ? '85%' : 
                               rating === 4 ? '10%' : 
                               rating === 3 ? '3%' : 
                               rating === 2 ? '1%' : '1%' 
                      }}
                    ></div>
                  </div>
                  <div className="w-16 text-right">
                    <span className="text-sm text-gray-600">
                      {rating === 5 ? '85%' : 
                       rating === 4 ? '10%' : 
                       rating === 3 ? '3%' : 
                       rating === 2 ? '1%' : '1%'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="grid grid-cols-1 gap-8">
            {/* Primeiros 4 Reviews */}
            {[
              {
                name: "Mariana Santos",
                title: "Finalmente consegui emagrecer depois de ter filho",
                date: "05/05/2025",
                verified: true,
                text: "Depois que tive meu segundo filho, tentei de tudo pra emagrecer. Fiz dieta da sopa, shake, até aquela do ovo... nada funcionava. Vivia cansada e desanimada, me sentindo culpada cada vez que comia um pedacinho de pão. Uma amiga me indicou o Definamax e resolvi tentar. Em 2 meses perdi 8kg, mas o mais importante: não fico mais com aquela fome absurda e consigo cuidar das crianças com mais disposição. Até voltei a usar minhas roupas antigas!",
                image: "/review5.png",
                helpful: 152
              },
              {
                name: "Carlos Eduardo",
                title: "Consegui controlar a compulsão por doce depois do trabalho",
                date: "28/04/2025",
                verified: true,
                text: "Trabalho como motorista de aplicativo, 12 horas por dia. Era só chegar em casa e atacava a geladeira, principalmente doces. Já tava com pré-diabetes e pressão alta, mas não conseguia parar de comer. Com o Definamax, a ansiedade diminuiu muito e aquela fome descontrolada passou. Em 3 meses, perdi 9kg e meus exames melhoraram. O médico até diminuiu meus remédios. Agora consigo fazer minhas corridas sem ficar ofegante.",
                image: "/review6.png",
                helpful: 98
              },
              {
                name: "Renata Silva",
                title: "Não precisei fazer dieta maluca pra emagrecer",
                date: "12/03/2025",
                verified: true,
                text: "Já gastei uma fortuna com nutricionista e remédios caros, mas sempre desistia porque as dietas eram muito restritivas. Como trabalho em loja, não dava pra ficar pesando comida ou fazendo várias refeições. O Definamax me ajudou a controlar a fome sem precisar de cardápio complicado. Perdi 5kg em 30 dias, e o melhor: consigo manter o peso mesmo comendo um docinho de vez em quando. Não é milagre, mas funciona de verdade!",
                image: "/revi1.jpeg",
                helpful: 76
              },
              {
                name: "Daniela Torres",
                title: "Voltei a me sentir bonita depois dos 40",
                date: "28/02/2025",
                verified: true,
                text: "A menopausa acabou comigo, engordei 15kg em um ano e nada que eu fazia resolvia. Me sentia péssima, sem energia e com vergonha de sair de casa. Uma cliente da minha loja me falou do Definamax. No começo fiquei com medo de ser furada, mas decidi tentar. Foi a melhor decisão! Perdi 9kg em 3 meses, minhas ondas de calor diminuíram e voltei a ter disposição pra fazer hidroginástica. Minha autoestima voltou!",
                image: "/revi2.png",
                helpful: 89
              }
            ].map((review, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-green-100">
                      <Image
                        src={review.image}
                        alt={review.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
                        {review.verified && (
                          <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                            <span className="text-xs text-green-700 font-medium">Verificado</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-1">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium text-green-800 mb-2">{review.title}</h4>
                    <p className="text-gray-600 text-[15px] leading-relaxed">{review.text}</p>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{review.helpful} pessoas acharam útil</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Reviews adicionais */}
            {showMoreReviews && (
              <>
                {[
                  {
                    name: "Ricardo Mendes",
                    title: "Recuperei minha saúde e disposição",
                    date: "15/02/2025",
                    verified: true,
                    text: "Sou vendedor, passo o dia todo na rua e só comia besteira. Tava com 108kg, colesterol alto e dormia mal por causa da apneia. Comecei a tomar Definamax junto com uma alimentação mais regrada, nada muito radical. Em 3 meses perdi 11kg e minha vida mudou completamente. Durmo melhor, tenho mais energia pra trabalhar e até voltei a jogar futebol com meus filhos no fim de semana. Vale cada centavo!",
                    image: "/rica.png",
                    helpful: 187
                  },
                  {
                    name: "Patricia Lima",
                    title: "Emagreci sem passar fome ou ficar irritada",
                    date: "02/02/2025",
                    verified: true,
                    text: "Sou professora e mãe solo, não tenho tempo nem dinheiro pra academia. Já tinha tentado vários remédios pra emagrecer, mas ficava muito nervosa e com insônia. O Definamax foi diferente, me ajudou a controlar a ansiedade e aquela fome emocional que vinha sempre à noite. Perdi 12kg em 3 meses e meio, sem efeitos colaterais. O melhor é que consigo manter minha rotina normal, só que mais leve e disposta.",
                    image: "/revi3.png",
                    helpful: 143
                  },
                  {
                    name: "André Teixeira",
                    title: "Resolvi meu problema com a compulsão alimentar",
                    date: "20/01/2025",
                    verified: true,
                    text: "Trabalho em home office na área de TI, e a ansiedade me fazia comer o dia todo na frente do computador. Já tinha perdido as esperanças quando um amigo me indicou o Definamax. Nos primeiros dias já senti diferença na fome e na vontade de beliscar. Perdi 8kg em 2 meses, mas o principal foi ter me livrado daquela necessidade de estar sempre comendo. Agora consigo me concentrar melhor no trabalho e não fico mais com aquela sensação de culpa.",
                    image: "/andre.png",
                    helpful: 165
                  },
                  {
                    name: "Fernanda Duarte",
                    title: "Me livrei do efeito sanfona",
                    date: "15/01/2025",
                    verified: true,
                    text: "Sempre fui aquela pessoa que fazia dieta, perdia peso e depois engordava tudo de novo. Era um ciclo sem fim de frustração. Com o Definamax, pela primeira vez consegui emagrecer de forma equilibrada. Perdi 10kg em 3 meses e, o mais importante, já faz 6 meses que mantenho o peso. Não preciso mais ficar contando caloria ou me privando de tudo. Aprendi a ter uma relação melhor com a comida.",
                    image: "/fernando.png",
                    helpful: 134
                  }
                ].map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 md:pb-8">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={review.image}
                          alt={review.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base md:text-lg font-semibold text-gray-800">{review.name}</h3>
                        <div className="flex items-center gap-2 mb-1 md:mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <span className="text-xs md:text-sm font-medium">{review.title}</span>
                        </div>
                        <div className="text-xs md:text-sm text-gray-500 mb-2 md:mb-3">
                          Avaliado em {review.date}
                          {review.verified && (
                            <span className="ml-2 text-green-600 font-medium">• Cliente Verificado</span>
                          )}
                        </div>
                        <div className="prose prose-sm max-w-none text-gray-600">
                          <p className="text-sm md:text-base">{review.text}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Botão Ver Mais */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowMoreReviews(!showMoreReviews)}
              className="group inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-600 hover:text-gray-900 gap-2 bg-white rounded-lg border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md active:shadow-inner active:translate-y-[1px] transition-all duration-200"
            >
              {showMoreReviews ? "Ver menos depoimentos" : "Ver mais depoimentos"}
              <ChevronDown className={`h-5 w-5 transition-transform animate-pulse group-hover:animate-none group-hover:translate-y-1 ${showMoreReviews ? "rotate-180" : ""}`} />
            </button>
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

          <div className="mt-8 pt-8 border-t border-green-700">
            <p className="text-center text-sm text-green-100">
              © {new Date().getFullYear()} Definamax. Todos os direitos reservados.
            </p>
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
