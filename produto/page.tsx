"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, CheckCircle2, Share2, MessageCircle, X, ShieldCheck } from "lucide-react"
import Head from "next/head"

export default function ReMarketingPage() {
  // Estado para controlar qual vídeo está sendo reproduzido
  const [activeVideo, setActiveVideo] = useState<number | null>(null)

  // Referências para os players de vídeo
  const videoRefs = useRef<Array<HTMLIFrameElement | null>>([null, null, null, null])

  // Estado para rastrear se o vídeo foi assistido
  const [videosWatched, setVideosWatched] = useState<boolean[]>([false, false, false, false])

  // Estado para controlar a visibilidade do botão do WhatsApp
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false)

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

  // Função para abrir o WhatsApp
  const openWhatsApp = () => {
    const message = encodeURIComponent("Olá! Vi os vídeos sobre o Definamax e gostaria de saber mais.")
    window.open(`https://wa.me/5541984549172?text=${message}`, "_blank")
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

  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
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
          <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
            🎉 MAIS DE 127.849 PESSOAS JÁ CONQUISTARAM O CORPO DOS SONHOS
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Perca até <span className="text-green-600">22kg</span> de Forma Natural e Definitiva
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Assista aos depoimentos reais de quem transformou sua vida com Definamax e entenda por que somos o <span className="font-semibold">suplemento mais recomendado do Brasil</span>
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-md">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star, index) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 text-yellow-400 fill-current ${index === 0 ? "animate-pulse" : ""}`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm font-medium">4.9/5 (3.842 avaliações)</span>
            </div>

            <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-md">
              <Image src="/anvisa.png" alt="Anvisa" width={24} height={24} className="mr-2" />
              <span className="text-sm font-medium">Aprovado pela ANVISA</span>
            </div>

            <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-md">
              <ShieldCheck className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm font-medium">Garantia de 30 dias</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white rounded-lg p-3 shadow-md">
              <div className="font-bold text-2xl text-green-600">98%</div>
              <div className="text-sm text-gray-600">Satisfação dos clientes</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-md">
              <div className="font-bold text-2xl text-green-600">7 dias</div>
              <div className="text-sm text-gray-600">Primeiros resultados</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-md">
              <div className="font-bold text-2xl text-green-600">100%</div>
              <div className="text-sm text-gray-600">Natural e seguro</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-md">
              <div className="font-bold text-2xl text-green-600">30 dias</div>
              <div className="text-sm text-gray-600">Garantia de satisfação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Benefícios */}
      <section className="w-full py-12 bg-gradient-to-b from-white to-green-50">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Por que <span className="text-green-600">Definamax</span> é a solução que você procura?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Resultados Rápidos</h3>
              <p className="text-gray-600 text-center">Veja mudanças visíveis em apenas 7 dias de uso, com redução de até 5kg no primeiro mês.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">100% Natural</h3>
              <p className="text-gray-600 text-center">Fórmula exclusiva com ingredientes naturais que aceleram seu metabolismo sem efeitos colaterais.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Ação Prolongada</h3>
              <p className="text-gray-600 text-center">Mantenha os resultados mesmo após parar o tratamento, sem efeito sanfona.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block bg-yellow-100 border border-yellow-200 rounded-lg p-4 max-w-2xl">
              <p className="text-lg font-medium text-yellow-800">
                🔥 Promoção por tempo limitado: Até <span className="font-bold">68% OFF</span> + Frete Grátis!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Antes e Depois */}
      <section className="w-full py-16 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Transformações Reais com Definamax
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Veja os resultados impressionantes de pessoas que mudaram suas vidas com Definamax
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-green-50 to-white rounded-xl p-6 shadow-lg">
              <div className="mb-6">
                <Image
                  src="/dep01.png"
                  alt="Debora - Transformação com Definamax"
                  width={300}
                  height={400}
                  className="rounded-lg w-full object-cover mx-auto"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Debora, 31 anos</h3>
                <p className="text-green-600 font-bold mb-2">-23kg em 7 meses</p>
                <p className="text-gray-600">"Nunca imaginei que conseguiria emagrecer tanto! O Definamax mudou completamente minha vida e minha autoestima."</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-white rounded-xl p-6 shadow-lg">
              <div className="mb-6">
                <Image
                  src="/dep05.png"
                  alt="Laura - Transformação com Definamax"
                  width={300}
                  height={400}
                  className="rounded-lg w-full object-cover mx-auto"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Laura de Guarulhos</h3>
                <p className="text-green-600 font-bold mb-2">-24kg em 6 meses</p>
                <p className="text-gray-600">"O Definamax foi a única coisa que realmente funcionou pra mim. Os resultados começaram já no primeiro mês!"</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-green-800 mb-3">Garantia Tripla Definamax</h3>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <div className="flex items-center">
                  <ShieldCheck className="h-6 w-6 text-green-600 mr-2" />
                  <span className="font-medium">Satisfação ou Dinheiro de Volta</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mr-2" />
                  <span className="font-medium">Envio em 24h</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mr-2" />
                  <span className="font-medium">Compra 100% Segura</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="w-full py-12 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
              ⚠️ ATENÇÃO: DEPOIMENTOS REAIS E SEM FILTROS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Veja Como o Definamax Está <span className="text-green-600">Transformando Vidas</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Assista aos depoimentos emocionantes de pessoas reais que conseguiram emagrecer de forma definitiva com Definamax
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <div key={video.id} className="bg-white rounded-2xl border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  {activeVideo === index ? (
                    <div className="aspect-video w-full bg-black">
                      <iframe
                        ref={(el) => (videoRefs.current[index] = el)}
                        src={`https://player.vimeo.com/video/${video.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
                        className="w-full h-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={video.title}
                      ></iframe>
                    </div>
                  ) : (
                    <div className="aspect-video w-full relative cursor-pointer group" onClick={() => playVideo(index)}>
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all">
                        <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-all transform group-hover:scale-110 shadow-lg">
                          <Play className="h-10 w-10 text-white fill-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white bg-opacity-90 rounded-lg p-3">
                          <h3 className="text-base font-medium text-gray-800">{video.title}</h3>
                          <p className="text-green-600 text-xs">Depoimento exclusivo</p>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white text-xs px-3 py-1.5 rounded-full">
                        {video.duration}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{video.title}</h3>
                      <p className="text-gray-600">{video.description}</p>
                    </div>
                    {videosWatched[index] && (
                      <span className="bg-green-100 text-green-800 text-xs px-3 py-1.5 rounded-full flex items-center whitespace-nowrap">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Assistido
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => playVideo(index)}
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {activeVideo === index ? "Assistindo" : videosWatched[index] ? "Assistir novamente" : "Assistir agora"}
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => shareVideo(index)}
                        className="inline-flex items-center text-gray-600 hover:text-gray-800 px-3 py-2"
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Compartilhar
                      </button>
                      {showShareOptions === index && (
                        <div className="absolute right-0 bottom-12 bg-white shadow-xl rounded-xl p-3 z-10 border border-gray-100 min-w-[140px]">
                          <div className="flex flex-col space-y-2">
                            <button
                              onClick={() => shareToSocial("facebook", index)}
                              className="flex items-center text-blue-600 hover:bg-blue-50 px-3 py-2 rounded text-sm"
                            >
                              <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                              </svg>
                              Facebook
                            </button>
                            <button
                              onClick={() => shareToSocial("twitter", index)}
                              className="flex items-center text-blue-400 hover:bg-blue-50 px-3 py-2 rounded text-sm"
                            >
                              <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.993-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                              </svg>
                              Twitter
                            </button>
                            <button
                              onClick={() => shareToSocial("whatsapp", index)}
                              className="flex items-center text-green-600 hover:bg-green-50 px-3 py-2 rounded text-sm"
                            >
                              <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                              </svg>
                              WhatsApp
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

          <div className="mt-12 text-center">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-yellow-800 mb-3">⚡ Oferta Especial por Tempo Limitado</h3>
              <p className="text-lg mb-4">
                Aproveite agora mesmo e garanta até <span className="font-bold">68% de desconto</span> + Frete Grátis!
              </p>
              <Link
                href={addUtmToUrl("https://full.sale/DmNQj1?src=rmkt2")}
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 text-lg font-bold text-white hover:from-green-500 hover:to-green-600 transform hover:scale-105 transition-all shadow-lg"
              >
                QUERO COMEÇAR AGORA →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Área de compra */}
      <section

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
                  6 meses de tratamento
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
                    <span className="text-gray-400 text-sm">APENAS</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-700 mb-1">
                    <span className="text-sm font-normal">12x de</span> R$48,09
                  </div>
                  <div className="text-sm text-gray-600">R$479 à vista</div>
                  <div className="text-sm font-medium text-green-700 mt-1"></div>
                </div>

                <div className="space-y-2 mb-3 text-left">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">
                      Tratamento completo
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">2 Frascos de colágeno hidrolisado</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Programa emagrecimento acelerado</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Envio imediato</span>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-1.5 mb-2 sm:mb-3 text-xs">
                  <p className="font-medium text-yellow-800">
                    <span className="inline-block bg-yellow-200 text-yellow-800 px-1.5 py-0.5 rounded text-xs font-bold mr-1">
                      68% 
                    </span>
                    DE DESCONTO
                  </p>
                </div>

                <Link
                  href={addUtmToUrl("https://full.sale/ytA47b?rmkt2")}
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
                  3 meses de tratamento
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
                    <span className="text-gray-400 text-sm">APENAS</span>
                  </div>
                  <div className="text-2xl sm:text-4xl font-bold text-green-700 mb-1">
                    <span className="text-sm font-normal">12x de </span>R$38,05
                  </div>
                  <div className="text-sm text-gray-600">R$379,00 à vista</div>
                </div>

                <div className="space-y-2 mb-3 text-left">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">
                      Tratamento intermediário
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">1 Frasco de colágeno hidrolisado</span>
                  </div>

                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Envio imediato</span>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-1.5 mb-2 sm:mb-3 text-xs">
                  <p className="font-medium text-yellow-800">
                    <span className="inline-block bg-yellow-200 text-yellow-800 px-1.5 py-0.5 rounded text-xs font-bold mr-1">
                      50%
                    </span>
                    DE DESCONTO
                  </p>
                </div>

                <Link
                  href={addUtmToUrl("https://full.sale/DmNQj1?src=rmkt2")}
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
                  30 dias de tratamento
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
                    <span className="text-gray-400 text-sm">APENAS</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-700 mb-1">
                    <span className="text-sm font-normal">12x de </span> R$28,01
                  </div>
                  <div className="text-sm text-gray-600">R$279,90 à vista</div>
                </div>

                <div className="space-y-2 mb-3 text-left">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">
                      Tratamento inicial
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
                      18%
                    </span>
                    DE DESCONTO
                  </p>
                </div>

                <Link
                  href={addUtmToUrl("https://full.sale/eMbtHp?rc=rmkt2")}
                  className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-3 text-base font-medium text-white hover:bg-green-700 w-full hover:scale-105 transition-all"
                >
                  COMPRAR AGORA
                </Link>
                <p className="text-sm text-gray-600 mt-2">Frete fixo R$ 25,00</p>
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

          <div className="flex justify-center mt-6">
            <Link
              href="/perguntas-frequentes"
              className="inline-flex items-center justify-center rounded-lg border border-green-600 px-6 py-3 text-sm font-medium text-green-600 hover:bg-green-50"
            >
              Ver Todas as Perguntas
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-green-800 text-white">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Image src="/logo2.png" alt="Definamax" width={150} height={45} className="h-9 w-auto mb-4" />
              <p className="text-sm mb-4">Definamax - O seu aliado natural para o emagrecimento saudável e eficaz.</p>
              <div className="flex space-x-4">
                <Link href="#" className="text-white hover:text-green-200">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-white hover:text-green-200">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.353.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                              </svg>
                            </Link>
                <Link href="#" className="text-white hover:text-green-200">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Produtos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/produto?kit=kit1" className="text-gray-300 hover:text-white">
                    Kit 1 Mês
                  </Link>
                </li>
                <li>
                  <Link href="/produto?kit=kit3" className="text-gray-300 hover:text-white">
                    Kit 3 Meses
                  </Link>
                </li>
                <li>
                  <Link href="/produto?kit=kit6" className="text-gray-300 hover:text-white">
                    Kit 6 Meses
                  </Link>
                </li>
                <li>
                  <Link href="/produto" className="text-gray-300 hover:text-white">
                    Todos os Produtos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Informações</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/perguntas-frequentes" className="text-gray-300 hover:text-white">
                    Perguntas Frequentes
                  </Link>
                </li>
                <li>
                  <Link href="/termos-garantia" className="text-gray-300 hover:text-white">
                    Garantia de 30 Dias
                  </Link>
                </li>
                <li>
                  <Link href="/analise-imc" className="text-gray-300 hover:text-white">
                    Calculadora de IMC
                  </Link>
                </li>
                <li>
                  <Link href="/remarketing" className="text-gray-300 hover:text-white">
                    Vídeos Exclusivos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-400 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-300">suporte@definamaxoficial.com</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-400 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-gray-300">(41) 98454-9172</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-400 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
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
                  <span className="text-gray-300">Florianópolis, SC</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <p className="text-center text-gray-400 text-sm">© 2023 Definamax. Todos os direitos reservados.</p>
            <div className="flex justify-center space-x-4 mt-4">
              <Link href="/termos-uso" className="text-gray-400 hover:text-white text-sm">
                Termos de Uso
              </Link>
              <Link href="/politica-privacidade" className="text-gray-400 hover:text-white text-sm">
                Política de Privacidade
              </Link>
              <Link href="/politica-entrega" className="text-gray-400 hover:text-white text-sm">
                Política de Entrega
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <button
        id="whatsAppButton"
        onClick={openWhatsApp}
        className="fixed bottom-8 right-4 bg-green-500 hover:bg-green-700 text-white rounded-full p-3 shadow-lg transition-transform duration-300 transform translateY(100px) opacity-0 z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </main>
  )
}
