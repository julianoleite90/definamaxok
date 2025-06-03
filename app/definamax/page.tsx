"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { CheckCircle2, X, ArrowRight, Star, ShieldCheck, MessageCircle, Clock, ChevronLeft, ChevronRight, Lock, Truck, ChevronDown, Gift, ShoppingCart, ThumbsUp } from "lucide-react"

// Adicione isso após os imports
const pulseAnimation = `
@keyframes pulseAndScale {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}
`;

export default function LandingPage() {
  // Estados necessários
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 59, seconds: 59 })
  const [showMoreReviews, setShowMoreReviews] = useState(false)
  const [showMoreDeliveries, setShowMoreDeliveries] = useState(false) // Remover esta linha
  const [openFaqs, setOpenFaqs] = useState<number[]>([])
  const [showWhatsApp, setShowWhatsApp] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoLoadedDesktop, setVideoLoadedDesktop] = useState(false)
  const [videoLoadedMobile, setVideoLoadedMobile] = useState(false)
  const buyRef = useRef<HTMLDivElement>(null)
  const kitsRef = useRef<HTMLDivElement>(null)

  // Adicione os estados para controle de carregamento dos vídeos
  type VideoLoadedState = {
    [key: string]: boolean;
  };
  
  const [videosLoaded, setVideosLoaded] = useState<VideoLoadedState>({
    video1: false,
    video2: false,
    video3: false,
    video4: false
  });

  // Adicione os estados para controle de carregamento e reprodução dos vídeos
  type VideoState = {
    [key: string]: {
      loaded: boolean;
      playing: boolean;
    }
  };
  
  const [videoStates, setVideoStates] = useState<VideoState>({
    video1: { loaded: false, playing: false },
    video2: { loaded: false, playing: false },
    video3: { loaded: false, playing: false },
    video4: { loaded: false, playing: false }
  });

  const handlePlayVideo = (index: number) => {
    setVideoStates(prev => ({
      ...prev,
      [`video${index + 1}`]: {
        ...prev[`video${index + 1}`],
        playing: true
      }
    }));
  };

  // Função para formatar a data no padrão brasileiro
  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  // Estado para a data atual
  const [currentDate, setCurrentDate] = useState('')

  // Atualiza a data ao montar o componente
  useEffect(() => {
    setCurrentDate(formatDate(new Date()))
  }, [])

  // Captura e armazena UTMs
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
      
      utmParams.forEach(param => {
        const value = params.get(param)
        if (value) {
          localStorage.setItem(param, value)
        }
      })
    }
  }, [])

  // Contagem regressiva
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Controle de visibilidade do botão WhatsApp
  useEffect(() => {
    const handleScroll = () => {
      const secondSection = document.querySelector('section:nth-of-type(2)')
      const kitsSection = document.querySelector('section:nth-of-type(7)')
      
      if (!secondSection || !kitsSection) return
      
      const secondSectionTop = secondSection.getBoundingClientRect().top
      const kitsSectionTop = kitsSection.getBoundingClientRect().top
      const kitsSectionBottom = kitsSection.getBoundingClientRect().bottom
      
      setShowWhatsApp(
        secondSectionTop < 0 && // Passou da segunda seção
        (kitsSectionTop > 0 || kitsSectionBottom < 0) // Não está na seção de kits OU já passou dela
      )
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Função para rolar até a seção de compra
  const scrollToBuy = () => {
    buyRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Função para alternar a exibição de mais avaliações
  const toggleMoreReviews = () => {
    setShowMoreReviews(!showMoreReviews)
  }

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

  // Função para alternar FAQ
  const toggleFaq = (index: number) => {
    setOpenFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <style jsx global>{pulseAnimation}</style>
      
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/5541984549172?text=Olá!%20Estou%20entrando%20em%20contato%20para%20obter%20mais%20informações%20sobre%20o%20emagrecedor%20Definamax."
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed md:bottom-6 bottom-10 md:right-6 right-4 z-[9999] flex items-center gap-2 md:gap-3 bg-[#25D366] rounded-full shadow-xl hover:bg-[#20BD5A] transition-all transform hover:scale-105 md:px-4 md:py-2 px-3.5 py-2 group ${
          showWhatsApp ? 'translate-y-0 opacity-100 visible' : 'translate-y-[200%] opacity-0 invisible'
        }`}
      >
        <div className="relative flex items-center justify-center">
          {/* Indicador de Status - Estilo "Ao Vivo" */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3 md:h-3.5 md:w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 md:h-3.5 md:w-3.5 bg-red-500"></span>
          </span>
          <MessageCircle className="h-8 w-8 md:h-9 md:w-9 text-white" />
        </div>
        {/* Texto "Fale Conosco" */}
        <span className="text-white font-medium text-base md:text-lg whitespace-nowrap pr-1">Fale Conosco</span>
      </a>

      {/* Header com CTA */}
      <header className="w-full bg-gradient-to-r from-green-800 to-green-700 py-3.5 md:py-3 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] animate-[shine_1.5s_infinite] pointer-events-none"></div>
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex flex-row items-center justify-between gap-2 md:gap-8 py-0.5">
            <div className="flex justify-start items-center">
              <Image 
                src="/logo2.png" 
                alt="Definamax" 
                width={400} 
                height={120} 
                className="h-[2.4rem] md:h-[3.2rem] w-auto" 
                quality={100}
                priority
              />
            </div>
            <div className="flex justify-end items-center">
              <button
                onClick={() => kitsRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center rounded-[12px] bg-[#4CAF50] px-6 py-2.5 text-[1rem] font-medium text-white hover:bg-[#45A049] transition-all"
              >
                Comprar Agora
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section Otimizada */}
      <section className="w-full bg-gradient-to-b from-green-50 to-white py-6 md:py-12">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 items-start">
            {/* Título e Subtítulo */}
            <div className="md:pt-8">
              <h1 className="text-[1.9rem] md:text-[2.1rem] lg:text-[2.5rem] font-bold text-gray-800 mb-3 md:mb-4 leading-tight">
                <span className="text-gray-800 relative inline-block">
                  Emagreça rápido,
                  <span className="absolute bottom-0 left-0 w-full h-[6px] bg-gray-200 -z-10 skew-x-3"></span>
                  <span className="absolute -inset-1 bg-gray-50/50 -z-20 rounded-lg transform rotate-1"></span>
                </span>
                <br />
                <span className="text-green-700 relative inline-block">
                  recupere sua autoestima e renove sua confiança
                  <span className="absolute bottom-0 left-0 w-full h-[6px] bg-green-500 -z-10 skew-x-3"></span>
                  <span className="absolute -inset-1 bg-green-100/50 -z-20 rounded-lg transform rotate-1"></span>
                </span>
              </h1>

              <p className="text-lg md:text-lg text-gray-700 mb-3">
                Descubra o poder das fibras que absorvem gordura, controlam a compulsão, e aceleram a perda de peso.
              </p>

              {/* Social Proof mais conciso */}
              <div className="flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-3.5 w-3.5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium">4.9/5 (3.842 avaliações)</span>
              </div>
            </div>

            {/* Imagem do Produto - Aparece após o título no mobile */}
            <div className="flex justify-center items-center w-full md:order-last mt-2 md:mt-0">
              <div className="relative md:translate-x-8 md:translate-y-16">
                <Image
                  src="/mockup2.png"
                  width={400}
                  height={500}
                  alt="Definamax"
                  className="h-[340px] md:h-[460px] w-auto object-contain mx-auto"
                />
              </div>
            </div>

            {/* Benefícios e CTA - Aparece após a imagem no mobile */}
            <div className="md:col-start-1 md:row-start-2 md:-mt-20 mt-4">
              {/* Benefícios principais */}
              <ul className="space-y-2.5 md:space-y-3 mb-6 md:mb-8 -mt-7">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Mais saciedade durante o dia</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Menos compulsão por doces e lanches</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Metabolismo acelerado e equilibrado</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Menos retenção de líquidos e inchaço no corpo</span>
                </li>
              </ul>

              {/* CTA Principal */}
              <div className="flex flex-col items-center md:items-start w-full mt-2 md:mt-0">
                <div className="w-full md:w-auto flex justify-center md:justify-start">
                  <div className="relative group w-full md:w-auto">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-400 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <button
                      onClick={() => kitsRef.current?.scrollIntoView({ behavior: "smooth" })}
                      className="relative w-full md:w-auto whitespace-nowrap inline-flex items-center justify-center rounded-lg bg-green-600 px-8 py-4 text-[17px] md:text-lg font-bold text-white hover:bg-green-500 transition-all shadow-lg"
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] group-hover:animate-[shine_1.5s_infinite]"></div>
                      EXPERIMENTE DEFINAMAX HOJE
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center md:justify-start mt-3 text-sm text-gray-600">
                  <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
                  <span>30 dias de garantia incondicional</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos Reformulados */}
      <section className="w-full py-12 md:py-16 bg-green-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-3">
              Histórias Reais de Transformação
            </h2>
            <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
              Definamax está transformando vidas e ajudando pessoas reais a recuperar a autoestima
            </p>
          </div>

          {/* Carrossel */}
          <div className="relative">
            {/* Navegação Esquerda */}
            <button 
              onClick={() => {
                const container = document.querySelector('.carousel-container') as HTMLElement;
                if (container) {
                  container.scrollLeft -= container.offsetWidth;
                }
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-green-600 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110 hidden md:block"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Container do Carrossel */}
            <div className="carousel-container overflow-x-auto md:overflow-x-hidden scroll-smooth snap-x snap-mandatory flex gap-6 pb-8 -mx-4 px-4">
              {[
                { name: "Débora", age: 31, months: 7, image: "/dep01.png", profession: "Professora", location: "São Paulo, SP" },
                { name: "Arnaldo", age: 34, months: 6, image: "/dep02.png", profession: "Auxiliar Administrativo", location: "Salvador, BA" },
                { name: "Sara", age: 32, months: 2, image: "/dep03.png", profession: "Dona de casa", location: "Rio de Janeiro, RJ" },
                { name: "Rosimari", age: 34, months: 3, image: "/dep04.png", profession: "Vendedora", location: "Pinhais, PR" },
                { name: "Laura", age: 37, months: 6, image: "/dep05.png", profession: "Designer", location: "Guarulhos, SP" },
                { name: "Victor", age: 29, months: 10, image: "/dep06.png", profession: "Motorista de aplicativo", location: "Belo Horizonte, MG" }
              ].map((item, index) => (
                <div key={index} className="snap-start flex-none w-[90%] md:w-[calc(30%-1rem)] transition-all">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={item.image}
                        alt={`Resultado ${item.name}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <p className="text-3xl font-bold text-green-600 mb-1">{item.months} meses</p>
                      <p className="text-sm text-gray-600">de tratamento</p>
                      <div className="mt-2">
                        <p className="font-medium text-gray-700 text-sm">{item.name}, {item.age} anos</p>
                        <p className="text-xs text-gray-500">{item.profession}</p>
                        <p className="text-xs text-gray-400 mt-1">{item.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navegação Direita */}
            <button 
              onClick={() => {
                const container = document.querySelector('.carousel-container') as HTMLElement;
                if (container) {
                  container.scrollLeft += container.offsetWidth;
                }
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-green-600 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110 hidden md:block"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Indicadores de Página (Dots) - Apenas Desktop */}
            <div className="hidden md:flex justify-center gap-2 mt-6">
              {[0, 1, 2, 3].map((dot) => (
                <button
                  key={dot}
                  onClick={() => {
                    const container = document.querySelector('.carousel-container') as HTMLElement;
                    if (container) {
                      container.scrollLeft = container.offsetWidth * dot;
                    }
                  }}
                  className="w-2 h-2 rounded-full bg-green-200 hover:bg-green-300 transition-all"
                >
                  <span className="sr-only">Página {dot + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CTA após o carrossel */}
          <div className="text-center mt-12">
            <button
              onClick={() => kitsRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-green-600 rounded-xl hover:bg-green-500 transition-all transform hover:scale-105 shadow-lg relative overflow-hidden group animate-[pulseAndScale_2s_ease-in-out_infinite]"
            >
              EU TAMBÉM QUERO EMAGRECER
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Fórmula Exclusiva Definamax */}
      <section className="w-full py-16 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              As <span className="text-green-700">fibras bioativas</span> que<br className="hidden md:block" /> absorvem gordura
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Uma combinação exclusiva de fibras bioativas que aceleram seu emagrecimento de forma natural e mais rápida
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative w-full md:-mr-12">
              {/* Desktop Video */}
              <div className="hidden md:block relative w-full h-[600px] overflow-hidden bg-white">
                <iframe
                  src="https://player.vimeo.com/video/1088746169?controls=0&transparent=1&background=1&autoplay=1&loop=1&muted=1"
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  title="Como o Definamax funciona - Desktop"
                ></iframe>
              </div>
              
              {/* Mobile Video */}
              <div className="md:hidden relative w-full aspect-video bg-white">
                <iframe
                  src="https://player.vimeo.com/video/1088747168?controls=0&transparent=1&background=1&autoplay=1&loop=1&muted=1"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  title="Como o Definamax funciona - Mobile"
                ></iframe>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-100">
                <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2 text-green-600">1</span>
                  Absorção de Gorduras
                </h3>
                <p className="text-gray-700">
                  A Quitosana, uma fibra natural extraída de fontes marinhas, tem a capacidade única de se ligar às moléculas de gordura durante a digestão. Isso significa que até 30% das gorduras consumidas são naturalmente eliminadas antes de serem absorvidas pelo seu corpo.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-100">
                <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2 text-green-600">2</span>
                  Controle da Compulsão Alimentar
                </h3>
                <p className="text-gray-700">
                  O Psyllium e o Agar Agar são fibras especiais que, em contato com água, formam um gel natural expansivo no estômago. Este processo proporciona uma sensação duradoura de saciedade, reduzindo naturalmente a fome e a compulsão por doces.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-100">
                <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2 text-green-600">3</span>
                  Potencialização Metabólica
                </h3>
                <p className="text-gray-700">
                  A Espirulina e o Cromo são nutrientes essenciais que ajudam a regular o metabolismo e os níveis de açúcar no sangue. Juntos, contribuem para um metabolismo mais eficiente e uma melhor queima de gordura corporal.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-100">
                <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2 text-green-600">4</span>
                  Regulação Intestinal
                </h3>
                <p className="text-gray-700">
                  O conjunto de fibras solúveis e insolúveis promove uma limpeza natural do organismo, melhorando o funcionamento intestinal e aumentando sua disposição. Você se sente mais leve e com mais energia para suas atividades diárias.
                </p>
              </div>

              <div className="flex justify-center md:justify-start mt-10 flex-col items-center md:items-start">
                <button
                  onClick={() => kitsRef.current?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 text-base font-bold text-white hover:from-green-500 hover:to-green-600 hover:scale-105 transition-all shadow-lg hover:shadow-xl border-b-4 border-green-700"
                >
                  EXPERIMENTE DEFINAMAX HOJE <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparativo: Natural vs Injeções */}
      <section className="w-full py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              <span className="text-green-700">Definamax:</span> O Poder Natural vs. Injeções de Emagrecimento
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Descubra por que milhares de pessoas estão escolhendo o método natural e seguro para emagrecer
            </p>
          </div>

          {/* Mobile View - Swipeable */}
          <div className="md:hidden relative">
            <div className="overflow-x-auto pb-4 snap-x snap-mandatory touch-pan-x flex gap-4 -mx-4 px-4">
              {/* Card Definamax */}
              <div className="snap-start scroll-ml-4 flex-shrink-0 w-[85vw]">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-green-500 shadow-md overflow-hidden">
                  <div className="relative">
                    <div className="absolute top-3 left-3 z-10">
                      <div className="bg-white px-3 py-1.5 rounded-md shadow-md">
                        <span className="text-green-600 text-sm font-bold">RECOMENDADO</span>
                      </div>
            </div>

                    <div className="relative w-full aspect-[4/3]">
                <Image
                        src="/clorela.png"
                        alt="Chlorella - Ingrediente Natural do Definamax"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>

                  <div className="p-4 pt-3">
                    <h3 className="text-lg font-semibold text-green-700 mb-1">Fórmula Natural Definamax</h3>
                    <p className="text-sm text-gray-600 mb-3">Emagrecimento Seguro e Duradouro</p>

                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">100% Natural: Fibras poderosas que absorvem a gordura</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Sem Efeitos Colaterais</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Resultados Comprovados</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card Injeções */}
              <div className="snap-start scroll-ml-4 flex-shrink-0 w-[85vw]">
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg border border-red-200 shadow-md overflow-hidden">
                  <div className="relative">
                    <div className="absolute top-3 left-3 z-10">
                      <div className="bg-white px-3 py-1.5 rounded-md shadow-md">
                        <span className="text-red-600 text-sm font-bold">NÃO RECOMENDADO</span>
                      </div>
                    </div>

                    <div className="relative w-full aspect-[4/3]">
                      <Image
                        src="/caneta.png"
                        alt="Injeção de Ozempic"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>

                  <div className="p-4 pt-3">
                    <h3 className="text-lg font-semibold text-red-700 mb-1">Injeções de Emagrecimento</h3>
                    <p className="text-sm text-gray-600 mb-3">Riscos e Efeitos Colaterais</p>

                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <X className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Compostos químicos sintéticos com alto risco de reações adversas no organismo</span>
                      </li>
                      <li className="flex items-start">
                        <X className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Efeitos Colaterais Graves</span>
                      </li>
                      <li className="flex items-start">
                        <X className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Requer Prescrição Médica</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Indicador de Swipe */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 backdrop-blur-sm">
              <ArrowRight className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden md:grid md:grid-cols-2 gap-8">
            {/* Card Definamax */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-500 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                RECOMENDADO
              </div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-green-700">Definamax</h3>
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>

              <div className="mb-6">
                <div className="relative w-full aspect-square md:aspect-video bg-white rounded-lg overflow-hidden">
                <Image
                    src="/clorela.png"
                    alt="Chlorella - Ingrediente Natural do Definamax"
                    fill
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium block">Resultados Sustentáveis</span>
                    <span className="text-gray-600 text-sm">Perda de peso gradual e duradoura, sem efeito sanfona</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium block">100% Natural</span>
                    <span className="text-gray-600 text-sm">Composto por fibras e ingredientes naturais seguros</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium block">Sem Efeitos Colaterais</span>
                    <span className="text-gray-600 text-sm">Seguro para uso contínuo, sem riscos à saúde</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium block">Benefícios Adicionais</span>
                    <span className="text-gray-600 text-sm">Melhora da digestão, energia e bem-estar geral</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium block">Não Requer Prescrição</span>
                    <span className="text-gray-600 text-sm">Fácil acesso e uso sem necessidade de consultas</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Card Injeções */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border border-red-200 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                NÃO RECOMENDADO
              </div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-red-700">Injeções de Emagrecimento</h3>
                <X className="h-6 w-6 text-red-600" />
              </div>

              <div className="mb-6">
                <div className="relative w-full aspect-square md:aspect-video bg-white rounded-lg overflow-hidden">
                  <Image
                    src="/caneta.png"
                    alt="Injeção de Ozempic"
                    fill
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium block">Resultados Temporários</span>
                    <span className="text-gray-600 text-sm">Rápida recuperação do peso após interrupção</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium block">Substâncias Sintéticas</span>
                    <span className="text-gray-600 text-sm">Compostos químicos que podem ser prejudiciais</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium block">Efeitos Colaterais Graves</span>
                    <span className="text-gray-600 text-sm">Náusea, ansiedade, problemas cardíacos</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium block">Riscos à Saúde</span>
                    <span className="text-gray-600 text-sm">Possíveis complicações a longo prazo</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium block">Requer Prescrição</span>
                    <span className="text-gray-600 text-sm">Necessidade de acompanhamento médico constante</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <button
              onClick={() => kitsRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 text-lg font-bold text-white hover:from-green-500 hover:to-green-600 hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            >
              PEDIR AGORA DEFINAMAX <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Seção de Entregas */}
      <section className="w-full py-16 bg-gradient-to-b from-green-50 via-white to-green-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Clientes que venceram a <span className="text-green-700">compulsão</span> e <span className="text-green-700">emagreceram</span> com o <span className="text-green-700 font-extrabold">Definamax</span>
            </h2>
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-gray-600 text-lg md:text-xl max-w-2xl">
                <span className="font-semibold text-green-700">Assista os vídeos de nossos clientes</span>
              </p>
            </div>
          </div>

          {/* Grid de Entregas */}
          <div className="relative">
            {/* Navegação Esquerda - Apenas Desktop */}
            <button 
              onClick={() => {
                const container = document.querySelector('.delivery-videos') as HTMLElement;
                if (container) {
                  container.scrollLeft -= container.offsetWidth;
                }
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-green-600 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110 hidden md:block"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Container dos Vídeos */}
            <div className="delivery-videos flex flex-col md:flex-row md:overflow-x-auto md:scroll-smooth md:snap-x md:snap-mandatory gap-6 md:pb-8">
              {[
                { videoId: "1090220707" },
                { videoId: "1090182162" },
                { videoId: "1079845171" },
                { videoId: "1079850549" },
                { videoId: "1079845066" },
                { videoId: "1079845128" }
              ].map((item, index) => (
                <div key={index} className="w-full md:w-[calc(50%-1rem)] md:flex-none md:snap-start">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                    <div className="relative aspect-video bg-black">
                      <iframe
                        src={`https://player.vimeo.com/video/${item.videoId}?controls=1&transparent=1&background=0&autopause=0&playsinline=1&title=0&byline=0&portrait=0&sidedock=0`}
                        className="absolute inset-0 w-full h-full"
                        frameBorder="0"
                        allow="fullscreen"
                        allowFullScreen
                        title={`Depoimento em vídeo ${index + 1}`}
                      ></iframe>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navegação Direita - Apenas Desktop */}
            <button 
              onClick={() => {
                const container = document.querySelector('.delivery-videos') as HTMLElement;
                if (container) {
                  container.scrollLeft += container.offsetWidth;
                }
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-green-600 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110 hidden md:block"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Indicadores de Página (Dots) - Apenas Desktop */}
            <div className="hidden md:flex justify-center gap-2 mt-6">
              {[0, 1].map((dot) => (
                <button
                  key={dot}
                  onClick={() => {
                    const container = document.querySelector('.delivery-videos') as HTMLElement;
                    if (container) {
                      container.scrollLeft = container.offsetWidth * dot;
                    }
                  }}
                  className="w-2 h-2 rounded-full bg-green-200 hover:bg-green-300 transition-all"
                >
                  <span className="sr-only">Página {dot + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Kits */}
      <section className="w-full py-16 relative bg-green-50">
        <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_0%,#4ade8025_0,transparent_50%)]"></div>
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 relative">
              Escolha o melhor kit para o seu{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-[#E8F5E9] transform -rotate-1 rounded-2xl"></span>
                <span className="relative text-green-800">Emagrecimento</span>
              </span>
            </h2>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="max-w-3xl mx-auto px-4 py-4 bg-white rounded-2xl shadow-sm border border-gray-100 my-4">
                <p className="text-gray-700 text-lg md:text-xl">
                  Restam poucos frascos com FRETE GRÁTIS no dia de hoje:{" "}
                  <span className="text-red-600 font-bold">{currentDate}</span>
                </p>
              </div>
            </div>
          </div>

          <div ref={kitsRef} className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-y-20 gap-x-0 max-w-5xl mx-auto px-4 mt-4">
            {/* Kit 8 Frascos */}
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden border border-[#E8F5E9] max-w-[460px] mx-auto md:scale-y-[1.07]">
              <div className="bg-[#1B8E3D] p-2.5 text-white text-center rounded-t-[20px]">
                <h3 className="text-[1.425rem] font-bold tracking-wider">COMPRE 5 LEVE 8 </h3>
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
                    href={addUtmToUrl("https://full.sale/XONObQ?src=adv-2")}
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

            {/* Kit 5 Frascos - Aplicar as mesmas alterações */}
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden border-2 border-yellow-500 max-w-[460px] mx-auto md:scale-y-[1.07]">
              <div className="bg-yellow-500 p-2.5 text-white text-center rounded-t-[20px]">
                <h3 className="text-[1.425rem] font-bold tracking-wider">COMPRE 3 LEVE 5 </h3>
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
                    href={addUtmToUrl("https://full.sale/ytA47b?src=adv-2")}
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
                <h3 className="text-[1.425rem] font-bold tracking-wider">COMPRE 2 LEVE 3</h3>
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
                  <p className="text-green-700 text-5xl font-bold">R$33<span className="text-[70%]">,03</span></p>
                  <p className="text-base font-medium">Ou R$329,00 à vista!</p>
                </div>

                <div className="bg-[#E8F5E9] py-1.5 text-center -mx-4 mt-3">
                  <span className="text-xl font-medium text-[#1B8E3D]">FRETE GRÁTIS</span>
                </div>

                <div className="mt-8">
                  <Link
                    href={addUtmToUrl("https://full.sale/DmNQj1?src=adv-2")}
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
                    <span className="text-gray-400 line-through text-xl">De R$279,00</span>
                  </div>
                  <p className="text-lg font-medium">Por apenas 12x</p>
                  <p className="text-green-700 text-5xl font-bold">R$19<span className="text-[70%]">,78</span></p>
                  <p className="text-base font-medium">Ou R$197,00 à vista!</p>
                </div>

                <div className="bg-[#E8F5E9] py-1.5 text-center -mx-4 mt-3">
                  <span className="text-xl font-medium text-[#1B8E3D]">FRETE GRÁTIS</span>
                </div>

                <div className="mt-8">
                  <Link
                    href={addUtmToUrl("https://full.sale/eMbtHp?src=adv-2")}
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

          {/* Alerta de Estoque Limitado */}
          <div className="mt-12 mb-16 max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-[20px] shadow-lg p-5 flex items-center gap-3 relative text-center border border-red-100"
                 style={{
                   boxShadow: '0 4px 0 rgb(239 68 68 / 0.2)',
                 }}>
              <div className="flex items-start md:items-center md:justify-center w-full gap-2">
                <div className="w-8 h-8 flex-shrink-0 rounded-full bg-red-50 flex items-center justify-center border-2 border-red-500">
                  <span className="text-red-600 text-xl font-bold">!</span>
                </div>
                <div className="text-left md:text-center">
                  <h3 className="text-red-600 text-lg md:text-xl font-bold">*Estoques limitados, não espere!</h3>
                  <p className="text-gray-600 text-base">Garanta seu kit agora antes que acabe!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Seção de Garantia */}
          <div className="max-w-5xl mx-auto mb-16 px-4 mt-16">
            <div className="bg-gradient-to-br from-green-50/80 to-white rounded-[32px] shadow-lg overflow-hidden border border-green-100">
              <div className="flex flex-col md:grid md:grid-cols-2 items-start md:items-center gap-8 p-6 md:p-12">
                {/* Coluna da Esquerda - Imagem */}
                                  <div className="w-full max-w-md mx-auto md:max-w-none">
                    <div className="bg-white rounded-t-[24px] p-4">
                      <Image
                        src="/mockup2.png"
                        alt="Definamax Garantia"
                        width={500}
                        height={500}
                        className="w-full h-auto object-contain max-h-[400px]"
                      />
                    </div>
                    <div className="bg-gradient-to-r from-green-100 to-white rounded-b-[24px] p-4 border-x border-b border-green-100 shadow-sm">
                      <p className="text-lg md:text-xl font-bold text-green-800 text-left relative inline-block px-3 py-1">
                        30 DIAS DE GARANTIA
                        <span className="absolute inset-0 bg-gradient-to-r from-green-200 via-green-100 to-transparent rounded-lg -z-10"></span>
                        <span className="absolute bottom-0 left-0 w-full h-[6px] bg-gradient-to-r from-green-600 via-green-500 to-green-400 -z-10"></span>
                      </p>
                    </div>
                  </div>

                {/* Coluna da Direita - Texto */}
                <div className="flex flex-col gap-4 md:gap-6">
                  <div className="flex flex-col gap-2 text-left">
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

                  <p className="text-gray-600 text-left">
                    Investir no <span className="font-semibold">Definamax</span> é uma decisão importante para transformar sua saúde, por isso, asseguramos que nosso produto é <span className="font-semibold">desenvolvido com os mais rigorosos padrões de qualidade</span>.
                  </p>

                  <p className="text-gray-600 text-left">
                    Temos total confiança na eficácia do <span className="font-semibold">Definamax</span>, e por isso oferecemos uma <span className="font-semibold">garantia de 30 dias</span>.
                  </p>

                  <p className="text-gray-600 text-left">
                    Se você não perceber resultados visíveis na sua jornada de emagrecimento, devolveremos seu dinheiro de forma simples e rápida, sem burocracia.
                  </p>

                                      <div className="flex justify-center">
                      <button
                        onClick={() => {
                          if (kitsRef && kitsRef.current) {
                            kitsRef.current.scrollIntoView({ behavior: "smooth" });
                            window.scrollBy(0, -20); // Slight offset to ensure better visibility
                          }
                        }}
                        className="w-full md:w-auto whitespace-nowrap bg-green-600 hover:bg-green-500 text-white font-bold text-base md:text-xl py-3 md:py-4 px-6 md:px-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] group-hover:animate-[shine_1.5s_infinite]"></div>
                        <span className="relative flex items-center justify-center gap-2">
                          QUERO EMAGRECER AGORA!
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
                        </span>
                      </button>
                    </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <ShieldCheck className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-600">Compra Segura</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <ThumbsUp className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-600">Satisfação Garantida</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <Lock className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-600">Privacidade Protegida</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                  </>
                )}
              </div>

              {/* Botão Ver Mais */}
                            <div className="flex justify-center mt-8">
                <button
                onClick={() => {
                  setShowMoreReviews(!showMoreReviews);
                  // Se estiver fechando os reviews, scroll suave para o topo da seção
                  if (showMoreReviews) {
                    const reviewsSection = document.querySelector('section:has(.text-3xl:contains("Avaliações dos clientes"))');
                    if (reviewsSection) {
                      reviewsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className="group inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-600 hover:text-gray-900 gap-2 bg-white rounded-lg border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md active:shadow-inner active:translate-y-[1px] transition-all duration-200"
              >
                {showMoreReviews ? "Ver menos depoimentos" : "Ver mais depoimentos"}
                <ChevronDown className={`h-5 w-5 transition-transform animate-pulse group-hover:animate-none group-hover:translate-y-1 ${showMoreReviews ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Seção de Perguntas Frequentes */}
      <section className="w-full py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Perguntas Frequentes
            </h2>
            <p className="text-gray-600 text-lg">
              Tire suas dúvidas sobre o Definamax
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Como devo tomar o Definamax?",
                answer: "Recomenda-se tomar 2 cápsulas por dia, preferencialmente antes das principais refeições. Para melhores resultados, tome uma cápsula 30 minutos antes do almoço e outra 30 minutos antes do jantar, sempre com um copo de água."
              },
              {
                question: "Quanto tempo demora para ver resultados?",
                answer: "Os resultados podem variar de pessoa para pessoa, mas a maioria dos usuários começa a notar mudanças significativas após 30 dias de uso contínuo. Para resultados mais expressivos, recomendamos o tratamento completo de 3 a 6 meses."
              },
              {
                question: "O Definamax tem efeitos colaterais?",
                answer: "Por ser um produto 100% natural, o Definamax não apresenta efeitos colaterais significativos. No entanto, como todo suplemento, recomendamos consultar um profissional de saúde antes de iniciar o uso, especialmente se você estiver grávida, amamentando ou em tratamento médico."
              },
              {
                question: "Preciso fazer dieta enquanto tomo Definamax?",
                answer: "O Definamax funciona mesmo sem dietas restritivas, pois age reduzindo naturalmente seu apetite e a absorção de gorduras. No entanto, para resultados ainda melhores, recomendamos manter uma alimentação equilibrada e praticar atividades físicas regularmente."
              },
              {
                question: "Como funciona a garantia de satisfação?",
                answer: "Oferecemos 30 dias de garantia incondicional. Se você não ficar satisfeito com os resultados, basta entrar em contato com nosso atendimento e solicitar o reembolso total do seu investimento, sem questionamentos."
              },
              {
                question: "Qual o prazo de entrega?",
                answer: "O prazo médio de entrega é de 5 a 7 dias úteis para todo Brasil. Após a confirmação do pagamento, você receberá o código de rastreamento para acompanhar sua encomenda."
              }
            ].map((faq, index) => (
                              <div 
                key={index} 
                className="bg-green-50 rounded-xl border border-green-100 overflow-hidden hover:bg-green-100/50 transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <h3 className="text-lg font-semibold text-green-800">{faq.question}</h3>
                  <ChevronDown 
                    className={`h-5 w-5 text-gray-500 transition-transform ${openFaqs.includes(index) ? 'rotate-180' : ''}`}
                  />
                </button>
                <div 
                  className={`px-6 transition-all duration-200 ease-in-out ${
                    openFaqs.includes(index) 
                      ? 'max-h-[500px] pb-6 opacity-100' 
                      : 'max-h-0 overflow-hidden opacity-0'
                  }`}
                >
                  <p className="text-green-700">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA após FAQs */}
          <div className="text-center mt-12">
                                        <button
                onClick={() => kitsRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex whitespace-nowrap items-center justify-center rounded-lg bg-green-600 px-6 md:px-[6.6rem] py-4 md:py-[1.32rem] text-base md:text-[1.1rem] font-bold text-white hover:bg-green-500 transition-all shadow-md hover:shadow-lg"
              >
                QUERO EMAGRECER AGORA!
            </button>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="w-full bg-green-800">
        <div className="w-full border-b border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="text-center">
              <Image 
                src="/logo2.png" 
                alt="Definamax" 
                width={200} 
                height={60} 
                className="h-8 w-auto mx-auto mb-4" 
                quality={100}
              />
              <p className="text-white/90 text-sm mb-4">
                Definamax - O seu aliado natural para o emagrecimento saudável e eficaz.
              </p>
              <p className="text-white/70 text-xs mb-6 max-w-3xl mx-auto">
                *Resultados podem variar de pessoa para pessoa. Este produto não se destina a diagnosticar, tratar, curar ou prevenir qualquer doença. Consulte sempre um profissional de saúde qualificado antes de iniciar qualquer programa de emagrecimento.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
                <Link href="https://www.definamaxoficial.com/avaliacao" className="text-white/90 hover:text-white">
                  Avaliação de IMC
                </Link>
                <span className="text-white/30">|</span>
                <Link href="https://www.definamaxoficial.com/termos" className="text-white/90 hover:text-white">
                  Termos de Garantia
                </Link>
                <span className="text-white/30">|</span>
                <Link href="https://www.definamaxoficial.com/perguntas-frequentes" className="text-white/90 hover:text-white">
                  Perguntas Frequentes
                </Link>
                <span className="text-white/30">|</span>
                <Link href="https://www.definamaxoficial.com/produto" className="text-white/90 hover:text-white">
                  Produtos
                </Link>
                <span className="text-white/30">|</span>
                <Link href="https://www.definamaxoficial.com/remarketing" className="text-white/90 hover:text-white">
                  Depoimentos em Vídeo
                </Link>
                <span className="text-white/30">|</span>
                <Link href="https://www.definamaxoficial.com/termos" className="text-white/90 hover:text-white">
                  Política de Privacidade
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="text-center text-white/70 text-xs">
            <p className="mb-1">Copyright © 2025 Definamax. Todos os direitos reservados.</p>
            <p>Bourjun Nature Health, Florianópolis Santa Catarina</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

