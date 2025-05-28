"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, CheckCircle2, Share2, X, ShieldCheck, Gift, Star, ChevronDown, ArrowRight, Lock } from "lucide-react"
import Head from "next/head"

// Declare o tipo gtag
declare global {
  interface Window {
    gtag: any;
  }
}

export default function ReMarketingPage() {
  // Estado para controlar qual vídeo está sendo reproduzido
  const [activeVideo, setActiveVideo] = useState<number | null>(null)

  // Referências para os players de vídeo
  const videoRefs = useRef<Array<HTMLIFrameElement | null>>([null, null, null, null])

  // Estado para rastrear se o vídeo foi assistido
  const [videosWatched, setVideosWatched] = useState<boolean[]>([false, false, false, false])

  // Estado para controlar o compartilhamento
  const [showShareOptions, setShowShareOptions] = useState<number | null>(null)

  // Estado para controlar quais perguntas estão abertas no acordeão
  const [openFaqs, setOpenFaqs] = useState({
    faq1: false,
    faq2: false,
    faq3: false,
    faq4: false,
    faq5: false,
  })

  // Dados dos vídeos
  const videos = [
    {
      id: 1,
      vimeoId: "1079845171",
      title: "Eu sempre fui gorda, com Definamax a minha vida mudou",
      description: "Depoimento de cliente Definamax",
      thumbnail: "/alarissa.png",
      duration: "3:45",
    },
    {
      id: 2,
      vimeoId: "1079850549",
      title: "Definamax acabou com a minha compulsão alimentar",
      description: "Depoimento de cliente Definamax",
      thumbnail: "/aandrea.png",
      duration: "5:12",
    },
    {
      id: 3,
      vimeoId: "1079845066",
      title: "Em 30 dias perdi 5 kg, incrível",
      description: "Depoimento de cliente Definamax",
      thumbnail: "/arenata.png",
      duration: "4:30",
    },
    {
      id: 4,
      vimeoId: "1079845128",
      title: "Recuperou muito a minha autoestima",
      description: "Depoimento de cliente Definamax",
      thumbnail: "/avanessa.png",
      duration: "6:18",
    },
  ]

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

  // Adiciona a keyframe animation para vibração
  const vibrationKeyframes = `
    @keyframes vibrate {
      0% { transform: translate(0); }
      25% { transform: translate(-1px, 1px); }
      50% { transform: translate(1px, -1px); }
      75% { transform: translate(-1px, -1px); }
      100% { transform: translate(1px, 1px); }
    }
  `

  // Função para adicionar UTMs aos links de compra
  const addUtmToUrl = (baseUrl: string) => {
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

  // Função para reproduzir vídeo
  const playVideo = (index: number) => {
    // Se já estiver reproduzindo este vídeo, não faz nada
    if (activeVideo === index) return

    // Se estiver reproduzindo outro vídeo, para ele primeiro
    if (activeVideo !== null && videoRefs.current[activeVideo]) {
      const iframe = videoRefs.current[activeVideo]
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage('{"method":"pause"}', "*")
      }
    }

    // Ativa o novo vídeo
    setActiveVideo(index)

    // Marca o vídeo como assistido
    const newVideosWatched = [...videosWatched]
    newVideosWatched[index] = true
    setVideosWatched(newVideosWatched)

    // Registra evento de analytics (exemplo)
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "play_video", {
        event_category: "Video",
        event_label: videos[index].title,
        value: index,
      })
    }
  }

  // Função para compartilhar vídeo
  const shareVideo = (index: number) => {
    if (showShareOptions === index) {
      setShowShareOptions(null)
    } else {
      setShowShareOptions(index)
    }
  }

  // Função para compartilhar em redes sociais específicas
  const shareToSocial = (platform: string, index: number) => {
    const video = videos[index]
    const url = encodeURIComponent(`https://www.definamaxoficial.com/remarketing?video=${index + 1}`)
    const title = encodeURIComponent(`Definamax - ${video.title}`)
    const description = encodeURIComponent(video.description)

    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`
        break
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`
        break
      default:
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }

    setShowShareOptions(null)
  }

  // Efeito para verificar se há um vídeo específico na URL para reproduzir
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const videoParam = urlParams.get("video")

      if (videoParam) {
        const videoIndex = Number.parseInt(videoParam) - 1
        if (videoIndex >= 0 && videoIndex < videos.length) {
          // Pequeno timeout para garantir que a página carregou completamente
          setTimeout(() => {
            playVideo(videoIndex)
          }, 500)
        }
      }
    }
  }, [])

  // Estado para controlar a exibição de mais depoimentos
  const [showMoreTestimonials, setShowMoreTestimonials] = useState(false)

  // Função para scroll suave
  const scrollToKits = () => {
    kitsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Estado para controlar a exibição de mais depoimentos
  const [showMoreReviews, setShowMoreReviews] = useState(false)
  const kitsRef = useRef<HTMLDivElement>(null)

  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <style jsx global>{vibrationKeyframes}</style>
      <Head>
        <title>Definamax - Vídeos Exclusivos | Descubra Como Emagrecer Naturalmente</title>
        <meta
          name="description"
          content="Assista a vídeos exclusivos sobre o Definamax e descubra como emagrecer de forma natural e eficaz sem dietas restritivas ou injeções perigosas."
        />
        <meta
          name="keywords"
          content="Definamax, vídeos emagrecimento, como emagrecer, suplemento natural, perda de peso, depoimentos emagrecimento"
        />
        <meta name="author" content="Definamax" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.definamaxoficial.com/remarketing" />
        <meta property="og:title" content="Definamax - Vídeos Exclusivos | Descubra Como Emagrecer Naturalmente" />
        <meta
          property="og:description"
          content="Assista a vídeos exclusivos sobre o Definamax e descubra como emagrecer de forma natural e eficaz sem dietas restritivas ou injeções perigosas."
        />
        <meta property="og:image" content="https://www.definamaxoficial.com/video-thumb-1.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.definamaxoficial.com/remarketing" />
        <meta property="twitter:title" content="Definamax - Vídeos Exclusivos | Descubra Como Emagrecer Naturalmente" />
        <meta
          property="twitter:description"
          content="Assista a vídeos exclusivos sobre o Definamax e descubra como emagrecer de forma natural e eficaz sem dietas restritivas ou injeções perigosas."
        />
        <meta property="twitter:image" content="https://www.definamaxoficial.com/video-thumb-1.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.definamaxoficial.com/remarketing" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Language */}
        <meta httpEquiv="content-language" content="pt-BR" />
      </Head>

      {/* Header */}
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
                onClick={scrollToKits}
                className="inline-flex items-center justify-center rounded-[12px] bg-[#4CAF50] px-6 py-2.5 text-[1rem] font-medium text-white hover:bg-[#45A049] transition-all"
              >
                Comprar Agora
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Seção de Limite de Compra */}
      <div className="bg-gradient-to-b from-green-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-green-50 px-8 py-3 rounded-full border border-green-100 w-full md:w-auto text-center">
              <h2 className="text-green-800 font-bold text-base md:text-lg">
                LIMITADO A UMA COMPRA POR CLIENTE
              </h2>
            </div>
            <p className="text-gray-600 text-base md:text-lg text-center max-w-3xl leading-relaxed" id="dataHoraTexto">
              Devido a grande demanda de pedidos, a partir de hoje {new Date().toLocaleDateString('pt-BR')}, 
              nós temos um estoque limitado e pronto para envio em 24horas.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-3 mt-2 w-full md:w-auto">
              <span className="text-gray-500 text-base md:text-lg font-medium text-center">FORMAS DE PAGAMENTO:</span>
              <div className="flex justify-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 w-full md:w-auto">
                <Image src="/visa.png" alt="Visa" width={45} height={30} className="h-6 w-auto" />
                <Image src="/master.png" alt="Mastercard" width={45} height={30} className="h-6 w-auto" />
                <Image src="/hiper.png" alt="Hipercard" width={45} height={30} className="h-6 w-auto" />
                <Image src="/pix.png" alt="PIX" width={45} height={30} className="h-6 w-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Script para atualizar data e hora */}
      <script dangerouslySetInnerHTML={{
        __html: `
          function atualizarDataHora() {
            const agora = new Date();
            const opcoes = { 
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            };
            const dataFormatada = agora.toLocaleDateString('pt-BR', opcoes);
            const texto = document.getElementById('dataHoraTexto');
            if (texto) {
              texto.innerHTML = 'Devido a grande demanda de pedidos, a partir de hoje ' + dataFormatada + 
                               ', nós temos um estoque limitado e pronto para envio em 24horas.';
            }
          }
          
          // Atualiza imediatamente e depois a cada minuto
          atualizarDataHora();
          setInterval(atualizarDataHora, 60000);
        `
      }} />

      {/* Cards Informativos - Visível apenas em desktop */}
      <div className="hidden md:block py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-4">
            {/* Card Entrega */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100 flex items-start gap-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">ENTREGA PARA TODO O BRASIL</h3>
                <p className="text-gray-600 text-sm">ATÉ 10 DIAS ÚTEIS</p>
              </div>
            </div>

            {/* Card Pagamento */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100 flex items-start gap-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">PAGUE COM CARTÃO DE CRÉDITO</h3>
                <p className="text-gray-600 text-sm">EM ATÉ 12X</p>
              </div>
            </div>

            {/* Card Site Seguro */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100 flex items-start gap-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">SITE SEGURO</h3>
                <p className="text-gray-600 text-sm">SITE OFICIAL</p>
              </div>
            </div>

            {/* Card Suporte */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100 flex items-start gap-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">DIFICULDADES NO PAGAMENTO</h3>
                <p className="text-gray-600 text-sm">sac@bourjun.com.br</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção Promocional Desktop - 2 colunas */}
      <div className="hidden md:block bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 items-center">
            {/* Coluna da Imagem */}
            <div className="flex justify-center">
              <Image
                src="/potegratis.png"
                alt="Definamax - Pote Extra Grátis"
                width={450}
                height={450}
                className="object-contain"
              />
            </div>

            {/* Coluna do Conteúdo */}
            <div>
              {/* Textos Principais */}
              <h2 className="text-4xl font-black text-gray-900 mb-3 leading-tight">
                RECEBA 1 POTE EXTRA
              </h2>
              <h3 className="text-3xl font-bold text-[#CD853F] mb-6">
                GRÁTIS
              </h3>

              {/* Texto Explicativo */}
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Na compra de qualquer kit do DEFINAMAX você receberá GRATUITAMENTE 
                um pote extra para potencializar seus resultados com mais um mês de 
                tratamento ou para presentear alguém que gostaria de emagrecer.
              </p>

              {/* Box de Destaque */}
              <div className="bg-blue-50/50 border-2 border-blue-200 rounded-xl p-6 mb-6">
                <h4 className="text-2xl font-black text-gray-800 mb-3">
                  VOCÊ LEVA UM POTE EXTRA
                </h4>
                <p className="text-2xl font-bold text-red-500 line-through mb-1">
                  DE R$ 279,00
                </p>
                <p className="text-3xl font-black text-green-600">
                  TOTALMENTE GRÁTIS
                </p>
              </div>

              {/* Botão e Selos */}
              <div className="text-center space-y-4">
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToKits()
                  }}
                  className="inline-block w-full bg-green-600 text-white text-xl font-bold py-4 px-8 rounded-xl hover:bg-green-700 transition-all shadow-lg"
                >
                  APROVEITAR OFERTA AGORA
                </Link>

                {/* Selos de Segurança */}
                <div className="flex justify-center items-center gap-6 pt-2">
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-sm">Compra Segura</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-sm">Site Oficial</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção Promocional - Visível apenas em mobile */}
      <div className="md:hidden bg-white py-8 px-4">
        <div className="max-w-sm mx-auto">
          {/* Container da Promoção */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            {/* Imagem dos Frascos */}
            <div className="relative mb-4">
              <Image
                src="/potegratis.png"
                alt="Definamax - Pote Extra Grátis"
                width={280}
                height={280}
                className="mx-auto"
              />
            </div>

            {/* Texto Principal */}
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              RECEBA 1 POTE EXTRA
            </h2>
            <h3 className="text-xl font-bold text-[#CD853F] mb-4">
              GRÁTIS
            </h3>

            {/* Texto Explicativo */}
            <p className="text-gray-700 text-base mb-6 leading-relaxed">
              Na compra de qualquer kit do DEFINAMAX você receberá GRATUITAMENTE 
              um pote extra para potencializar seus resultados com mais um mês de 
              tratamento ou para presentear alguém que gostaria de emagrecer.
            </p>

            {/* Box de Destaque */}
            <div className="border-2 border-blue-200 rounded-xl p-4 mb-6 bg-blue-50/50">
              <h4 className="text-xl font-black text-gray-800 mb-2">
                VOCÊ LEVA UM POTE EXTRA
              </h4>
              <p className="text-xl font-bold text-red-500 line-through mb-1">
                DE R$ 279,00
              </p>
              <p className="text-2xl font-black text-green-600">
                TOTALMENTE GRÁTIS
              </p>
            </div>

            {/* Botão de Ação */}
            <div className="text-center">
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToKits()
                }}
                className="block w-full bg-green-600 text-white text-lg font-bold py-4 px-6 rounded-xl hover:bg-green-700 transition-all shadow-lg"
              >
                APROVEITAR OFERTA AGORA
              </Link>

              {/* Selos de Segurança */}
              <div className="mt-4 flex justify-center items-center gap-4">
                <div className="flex items-center text-gray-600 text-sm">
                  <svg className="w-4 h-4 text-green-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Compra Segura
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <svg className="w-4 h-4 text-green-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Site Oficial
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Separador */}
      <div className="w-full border-t border-gray-100"></div>

      {/* Seção de Vídeos */}
      <section className="w-full py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Veja os resultados reais
            </h2>
            <p className="text-gray-600 text-lg">
              Depoimentos de pessoas que transformaram suas vidas com Definamax
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video, index) => (
              <div key={index} className="relative">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                  {activeVideo === index ? (
                    <iframe
                      ref={el => { videoRefs.current[index] = el }}
                      src={`https://player.vimeo.com/video/${video.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
                      className="absolute inset-0 w-full h-full"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="relative w-full h-full">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <button
                          onClick={() => playVideo(index)}
                          className="bg-white/90 hover:bg-white rounded-full p-4 transition-all transform hover:scale-110"
                        >
                          <Play className="h-8 w-8 text-green-600" />
                        </button>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 rounded text-white text-sm">
                        {video.duration}
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800">{video.title}</h3>
                  <p className="text-gray-600">{video.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        className={`h-5 w-5 ${
                          videosWatched[index] ? "text-green-600" : "text-gray-400"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          videosWatched[index] ? "text-green-600" : "text-gray-400"
                        }`}
                      >
                        {videosWatched[index] ? "Assistido" : "Não assistido"}
                      </span>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => shareVideo(index)}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
                      >
                        <Share2 className="h-5 w-5" />
                        <span className="text-sm">Compartilhar</span>
                      </button>
                      {showShareOptions === index && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                          <div className="py-1">
                            <button
                              onClick={() => shareToSocial("facebook", index)}
                              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Compartilhar no Facebook
                            </button>
                            <button
                              onClick={() => shareToSocial("twitter", index)}
                              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Compartilhar no Twitter
                            </button>
                            <button
                              onClick={() => shareToSocial("whatsapp", index)}
                              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Compartilhar no WhatsApp
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="w-full py-8 bg-gradient-to-b from-white to-green-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Seu corpo dos sonhos com <span className="text-green-700">Definamax!</span>
            </h2>
            <div className="inline-block bg-white rounded-full px-6 py-2 shadow-sm">
              <p className="text-gray-700">
                Restam poucos frascos com FRETE GRÁTIS no dia de hoje: <span className="text-red-500 font-semibold">27/05/2025</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-24 gap-x-6 max-w-[900px] mx-auto !mt-8">
            {/* Kit 8 Frascos */}
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden border border-[#E8F5E9] max-w-[420px] mx-auto md:scale-y-[1.07] md:mt-0">
              <div className="bg-[#1B8E3D] p-2.5 text-white text-center rounded-t-[20px]">
                <h3 className="text-[1.425rem] font-bold tracking-wider">COMPRE 5 LEVE 8</h3>
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
                    href={addUtmToUrl("https://full.sale/XONObQ?src=rmkt-1")}
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
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden border-2 border-yellow-500 max-w-[420px] mx-auto md:scale-y-[1.07]">
              <div className="bg-yellow-500 p-2.5 text-white text-center rounded-t-[20px]">
                <h3 className="text-[1.425rem] font-bold tracking-wider">COMPRE 3 LEVE 5</h3>
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
                    href={addUtmToUrl("https://full.sale/ytA47b?src=rmkt-1")}
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
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden border border-[#E8F5E9] max-w-[420px] mx-auto md:scale-y-[1.07]">
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
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden border border-[#E8F5E9] max-w-[420px] mx-auto md:scale-y-[1.07]">
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
                    href={addUtmToUrl("https://full.sale/eMbtHp?src=rmkt-1")}
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
        </div>
      </section>

      {/* Alerta de Estoque Limitado */}
      <div className="w-full bg-gradient-to-b from-white to-green-50 pt-12 pb-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-[20px] shadow-lg p-3 flex items-center gap-2 relative text-center border border-red-100"
               style={{
                 boxShadow: '0 4px 0 rgb(239 68 68 / 0.2)',
               }}>
            <div className="flex items-start md:items-center md:justify-center w-full gap-2">
              <div className="w-7 h-7 flex-shrink-0 rounded-full bg-red-50 flex items-center justify-center border-2 border-red-500">
                <span className="text-red-600 text-lg font-bold">!</span>
              </div>
              <div className="text-left md:text-center">
                <h3 className="text-red-600 text-lg md:text-xl font-bold">*Estoques limitados, não espere!</h3>
                <p className="text-gray-600 text-base">Garanta seu kit agora antes que acabe!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Garantia */}
      <section className="w-full pt-8 pb-16 bg-gradient-to-b from-green-50 to-white">
        <div className="mx-auto max-w-4xl px-4">
          <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg overflow-hidden border border-green-100">
            <div className="grid md:grid-cols-5 items-center gap-8 p-8 md:p-12">
              {/* Coluna da Esquerda - Texto */}
              <div className="md:col-span-3">
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="h-8 w-8 text-green-600" />
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Garantia Incondicional de 30 Dias</h2>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-800 block mb-1">Teste Sem Compromisso</span>
                      <span className="text-gray-600">Use o Definamax por 30 dias e comprove os resultados</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-800 block mb-1">Devolução Integral</span>
                      <span className="text-gray-600">Receba 100% do seu dinheiro de volta se não estiver satisfeito</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-800 block mb-1">Processo Simples</span>
                      <span className="text-gray-600">Sem burocracia ou questionamentos na hora do reembolso</span>
                    </div>
                  </li>
                </ul>

                <button
                  onClick={scrollToKits}
                  className="w-full md:w-auto inline-flex items-center justify-center rounded-lg bg-green-600 px-8 py-4 text-lg font-bold text-white hover:bg-green-500 transition-all shadow-md hover:shadow-lg"
                >
                  EXPERIMENTAR SEM RISCOS <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>

              {/* Coluna da Direita - Selo */}
              <div className="relative md:col-span-2 flex justify-center items-center">
                <div className="relative w-48 h-48 md:w-64 md:h-64">
                  <div className="absolute inset-0 bg-white rounded-full shadow-xl"></div>
                  <div className="absolute inset-[2px] bg-gradient-to-br from-green-50 to-white rounded-full border-2 border-green-100 flex items-center justify-center">
                    <div className="text-center transform">
                      <ShieldCheck className="h-16 w-16 md:h-20 md:w-20 text-green-600 mx-auto mb-2" />
                      <p className="text-3xl md:text-4xl font-black text-green-800 leading-none mb-1">30 DIAS</p>
                      <p className="text-sm md:text-base font-bold text-green-600 uppercase tracking-wider">Garantia Total</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Reviews */}
      <section className="w-full py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="mx-auto max-w-6xl px-4">
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
              className="group inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 gap-1.5 bg-white/50 hover:bg-white rounded-full shadow-sm hover:shadow transition-all duration-200"
            >
              {showMoreReviews ? "Ver menos depoimentos" : "Ver mais depoimentos"}
              <ChevronDown className={`h-4 w-4 transition-transform group-hover:translate-y-0.5 ${showMoreReviews ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-8 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Perguntas Frequentes</h2>

          <div className="space-y-4 mb-8">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full text-left py-4 px-6 font-semibold text-gray-800 flex justify-between items-center"
                onClick={() => {
                  const newOpenFaqs = { ...openFaqs, faq1: !openFaqs.faq1 }
                  setOpenFaqs(newOpenFaqs)
                }}
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
                Definamax é um suplemento alimentar 100% natural que combina fibras de alta potência para absorver a
                gordura, aumentar a saciedade e acelerar o metabolismo. Ele funciona como um detox poderoso, promovendo
                resultados rápidos e visíveis em poucas semanas.
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full text-left py-4 px-6 font-semibold text-gray-800 flex justify-between items-center"
                onClick={() => {
                  const newOpenFaqs = { ...openFaqs, faq2: !openFaqs.faq2 }
                  setOpenFaqs(newOpenFaqs)
                }}
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
                Os principais benefícios do Definamax incluem: emagrecimento rápido e natural, aumento da saciedade,
                controle da compulsão alimentar, aceleração do metabolismo, queima da gordura teimosa, melhora da
                disposição e bem-estar geral.
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full text-left py-4 px-6 font-semibold text-gray-800 flex justify-between items-center"
                onClick={() => {
                  const newOpenFaqs = { ...openFaqs, faq3: !openFaqs.faq3 }
                  setOpenFaqs(newOpenFaqs)
                }}
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

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full text-left py-4 px-6 font-semibold text-gray-800 flex justify-between items-center"
                onClick={() => {
                  const newOpenFaqs = { ...openFaqs, faq4: !openFaqs.faq4 }
                  setOpenFaqs(newOpenFaqs)
                }}
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

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full text-left py-4 px-6 font-semibold text-gray-800 flex justify-between items-center"
                onClick={() => {
                  const newOpenFaqs = { ...openFaqs, faq5: !openFaqs.faq5 }
                  setOpenFaqs(newOpenFaqs)
                }}
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
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-green-800 text-white">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-4">
            <p className="text-white text-base">Definamax - O seu aliado natural para o emagrecimento saudável e eficaz.</p>
          </div>
          
          <div className="text-center text-sm text-gray-300 mb-6">
            <p>*Resultados podem variar de pessoa para pessoa. Este produto não se destina a diagnosticar, tratar, curar ou prevenir qualquer doença. Consulte sempre um profissional de saúde qualificado antes de iniciar qualquer programa de emagrecimento.</p>
          </div>

          <div className="flex justify-center space-x-6 text-gray-300 text-sm mb-8">
            <Link href="/termos-garantia" className="hover:text-white">Termos de Garantia</Link>
            <Link href="/perguntas-frequentes" className="hover:text-white">Perguntas Frequentes</Link>
            <Link href="/produtos" className="hover:text-white">Produtos</Link>
            <Link href="/depoimentos" className="hover:text-white">Depoimentos</Link>
          </div>

          <div className="text-center text-sm text-gray-300">
            <p className="mb-2">Copyright © 2025 Definamax. Todos os direitos reservados.</p>
            <p>Bourjun Nature Health, Florianópolis Santa Catarina</p>
          </div>
        </div>
      </footer>

    </main>
  )
}
