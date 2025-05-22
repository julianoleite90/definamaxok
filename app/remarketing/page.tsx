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
      vimeoId: "1079845171", // Substitua pelo ID real do Vimeo
      title: "Transformou a minha vida",
      description: "Depoimento de cliente Definamax",
      thumbnail: "/alarissa.png", // Substitua pelo caminho real da thumbnail
      duration: "3:45",
    },
    {
      id: 2,
      vimeoId: "1079850549", // Substitua pelo ID real do Vimeo
      title: "O melhor produto que já usei",
      description: "Depoimento de cliente Definamax",
      thumbnail: "/aandrea.png", // Substitua pelo caminho real da thumbnail
      duration: "5:12",
    },
    {
      id: 3,
      vimeoId: "1079845066", // Substitua pelo ID real do Vimeo
      title: "Incrível, de verdade!",
      description: "Depoimento de cliente Definamax",
      thumbnail: "/arenata.png", // Substitua pelo caminho real da thumbnail
      duration: "4:30",
    },
    {
      id: 4,
      vimeoId: "1079845128", // Substitua pelo ID real do Vimeo
      title: "Eu super recomendo!",
      description: "Depoimento de cliente Definamax",
      thumbnail: "/avanessa.png", // Substitua pelo caminho real da thumbnail
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
      <section className="w-full bg-gradient-to-b from-green-50 to-white py-8 md:py-12">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
          Veja Como Clientes Emagreceram e Recuperaram a Autoestima com <span className="text-green-600">Definamax</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
          Descubra como brasileiros como você perderam peso, reduziram medidas e se sentiram mais confiantes para o dia a dia com Definamax. Assista agora e inspire-se!
          </p>
          <div className="flex items-center justify-center mb-8">
            <div className="inline-flex items-center bg-green-50 px-3 py-1 rounded-lg">
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
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="w-full py-8 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <div key={video.id} className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
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
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-20 transition-all">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-green-600 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-all transform group-hover:scale-110">
                          <Play className="h-8 w-8 md:h-10 md:w-10 text-white fill-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{video.title}</h3>
                    {videosWatched[index] && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Assistido
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{video.description}</p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => playVideo(index)}
                      className="inline-flex items-center text-green-600 hover:text-green-700"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      {activeVideo === index
                        ? "Assistindo"
                        : videosWatched[index]
                          ? "Assistir novamente"
                          : "Assistir agora"}
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => shareVideo(index)}
                        className="inline-flex items-center text-gray-600 hover:text-gray-700"
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Compartilhar
                      </button>
                      {showShareOptions === index && (
                        <div className="absolute right-0 bottom-8 bg-white shadow-lg rounded-lg p-2 z-10 border border-gray-200">
                          <div className="flex flex-col space-y-2">
                            <button
                              onClick={() => shareToSocial("facebook", index)}
                              className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded text-sm whitespace-nowrap"
                            >
                              Facebook
                            </button>
                            <button
                              onClick={() => shareToSocial("twitter", index)}
                              className="text-blue-400 hover:bg-blue-50 px-3 py-1 rounded text-sm whitespace-nowrap"
                            >
                              Twitter
                            </button>
                            <button
                              onClick={() => shareToSocial("whatsapp", index)}
                              className="text-green-600 hover:bg-green-50 px-3 py-1 rounded text-sm whitespace-nowrap"
                            >
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
        </div>
      </section>

      {/* Kits Section */}
      <section className="w-full py-12 md:py-16 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
              Escolha o Kit Ideal para Você
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              Selecione o kit que melhor atende às suas necessidades e objetivos de emagrecimento. Quanto maior o kit,
              maior o desconto e os benefícios!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {/* Kit 1 mês */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-2 px-4 text-center">
                <h3 className="text-lg font-bold">Kit Inicial</h3>
                <p className="text-xs sm:text-sm opacity-90">
                  <span className="font-bold">Experimente</span>
                </p>
              </div>

              <div className="p-3 sm:p-4">
                <div className="flex justify-center mb-3 relative">
                  <Image
                    src="/1f.png"
                    alt="Kit 1 Mês"
                    width={400}
                    height={400}
                    className="h-28 sm:h-40 object-contain hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                    -18%
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-2 sm:p-3 mb-2 sm:mb-3 text-center">
                  <div className="flex items-center justify-center gap-2 mb-0.5">
                    <span className="text-gray-400 line-through text-xs">De R$329,90</span>
                  </div>
                  <div className="font-bold text-green-700 mb-0.5">
                    <span className="text-xs font-normal">Por: </span>
                    <span className="text-xl sm:text-2xl font-extrabold">12x R$28,01</span>
                  </div>
                  <div className="text-xs text-gray-600">ou R$279,90 à vista</div>
                </div>

                <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-3 text-left">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-1 sm:mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      Tratamento de <span className="font-bold">1 mês</span>
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-1 sm:mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">60 cápsulas</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-1 sm:mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Envio imediato</span>
                  </div>
                  <div className="flex items-start text-gray-400">
                    <X className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Sem bônus adicionais</span>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-1 sm:p-1.5 mb-2 text-xs text-center">
                  <p className="font-medium text-yellow-800">
                    <span className="inline-block bg-yellow-200 text-yellow-800 px-1 py-0.5 rounded text-xs font-bold mr-1">
                      VOCÊ ECONOMIZA
                    </span>
                    R$20,00
                  </p>
                </div>

                <Link
                  href={addUtmToUrl("https://full.sale/eMbtHp?src=rmkt1")}
                  className="inline-flex items-center justify-center rounded-lg bg-green-600 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base font-bold text-white hover:bg-green-700 w-full hover:scale-105 transition-all"
                >
                  COMPRAR AGORA
                </Link>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2 text-center">Frete fixo R$ 29,00</p>
              </div>
            </div>

            {/* Kit 3 meses - MAIS POPULAR */}
            <div className="bg-white rounded-xl border-2 border-green-500 shadow-lg relative transform scale-105 md:scale-110 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden z-10">
              <div className="absolute top-0 left-0 right-0 w-full bg-yellow-500 text-center text-white font-bold py-1 sm:py-2 px-4 z-20 text-xs sm:text-sm">
                MAIS VENDIDO
              </div>

              <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-2 px-4 text-center mt-6 sm:mt-8">
                <h3 className="text-lg font-bold">Kit Recomendado</h3>
                <p className="text-xs sm:text-sm opacity-90">
                  Melhor <span className="font-bold">custo benefício</span> nesse kit!
                </p>
              </div>

              <div className="p-3 sm:p-4">
                <div className="flex justify-center mb-3 relative">
                  <Image
                    src="/3f.png"
                    alt="Kit 3 Meses"
                    width={400}
                    height={400}
                    className="h-28 sm:h-40 object-contain hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                    -50%
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-2 sm:p-3 mb-2 sm:mb-3 border-2 border-green-100 text-center">
                  <div className="flex items-center justify-center gap-2 mb-0.5">
                    <span className="text-gray-400 line-through text-xs">De R$758,70</span>
                  </div>
                  <div className="font-bold text-green-700 mb-0.5">
                    <span className="text-xs font-normal">Por: </span>
                    <span className="text-xl sm:text-3xl font-extrabold">12x R$38,05</span>
                  </div>
                  <div className="text-xs text-gray-600">ou R$379,00 à vista</div>
                  <div className="text-xs font-medium text-green-700 mt-1">Apenas R$126,33 por frasco</div>
                </div>

                <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-3 text-left">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-1 sm:mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      Tratamento de <span className="font-bold">3 meses</span>
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-1 sm:mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">+ 1 Frasco de Colágeno Grátis</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-1 sm:mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Envio imediato</span>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-1 sm:p-1.5 mb-2 text-xs text-center">
                  <p className="font-medium text-yellow-800">
                    <span className="inline-block bg-yellow-200 text-yellow-800 px-1 py-0.5 rounded text-xs font-bold mr-1">
                      VOCÊ ECONOMIZA
                    </span>
                    R$420,00
                  </p>
                </div>

                <Link
                  href={addUtmToUrl("https://full.sale/DmNQj1?src=rmkt1")}
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base font-bold text-white hover:from-green-500 hover:to-green-600 w-full hover:scale-105 transition-all shadow-md hover:shadow-xl border-b-4 border-green-700 animate-pulse-border"
                >
                  COMPRAR AGORA
                </Link>
                <p className="text-xs sm:text-sm text-green-600 font-medium mt-1 sm:mt-2 text-center">
                  Frete grátis para todo Brasil
                </p>
              </div>
            </div>

            {/* Kit 6 meses */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-2 px-4 text-center">
                <h3 className="text-lg font-bold">Kit Completo</h3>
                <p className="text-xs sm:text-sm opacity-90">
                  Maior <span className="font-bold">desconto</span> nesse kit!
                </p>
              </div>

              <div className="p-3 sm:p-4">
                <div className="flex justify-center mb-3 relative">
                  <Image
                    src="/6f.png"
                    alt="Kit 6 Meses"
                    width={400}
                    height={400}
                    className="h-28 sm:h-40 object-contain hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                    -68%
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-2 sm:p-3 mb-2 sm:mb-3 text-center">
                  <div className="flex items-center justify-center gap-2 mb-0.5">
                    <span className="text-gray-400 line-through text-xs">De R$1.479,40</span>
                  </div>
                  <div className="font-bold text-green-700 mb-0.5">
                    <span className="text-xs font-normal">Por: </span>
                    <span className="text-xl sm:text-2xl font-extrabold">12x R$48,09</span>
                  </div>
                  <div className="text-xs text-gray-600">ou R$479,40 à vista</div>
                  <div className="text-xs font-medium text-green-700 mt-1">R$79,90 por frasco</div>
                </div>

                <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-3 text-left">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-1 sm:mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      Tratamento completo de <span className="font-bold">6 meses</span>
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-1 sm:mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">+ 2 Frascos de Colágeno Grátis</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-1 sm:mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Envio imediato</span>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-1 sm:p-1.5 mb-2 text-xs text-center">
                  <p className="font-medium text-yellow-800">
                    <span className="inline-block bg-yellow-200 text-yellow-800 px-1 py-0.5 rounded text-xs font-bold mr-1">
                      VOCÊ ECONOMIZA
                    </span>
                    R$1.000,00
                  </p>
                </div>

                <Link
                  href={addUtmToUrl("https://full.sale/ytA47b?src=rmkt1")}
                  className="inline-flex items-center justify-center rounded-lg bg-green-600 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base font-bold text-white hover:bg-green-700 w-full hover:scale-105 transition-all"
                >
                  COMPRAR AGORA
                </Link>
                <p className="text-xs sm:text-sm text-green-600 font-medium mt-1 sm:mt-2 text-center">
                  Frete grátis para todo Brasil
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-10 flex flex-col items-center">
            <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md mb-4 sm:mb-6 max-w-2xl">
              <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
                <div className="flex items-center">
                  <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-1 sm:mr-2" />
                  <span className="text-xs sm:text-sm font-medium">Garantia de 30 dias</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-1 sm:mr-2" />
                  <span className="text-xs sm:text-sm font-medium">Pagamento seguro</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-1 sm:mr-2" />
                  <span className="text-xs sm:text-sm font-medium">Entrega para todo Brasil</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
              <Image
                src="/master.png"
                alt="Mastercard"
                width={50}
                height={30}
                className="h-5 sm:h-7 w-auto object-contain"
              />
              <Image src="/visa.png" alt="Visa" width={50} height={30} className="h-5 sm:h-7 w-auto object-contain" />
              <Image
                src="/hiper.png"
                alt="Hipercard"
                width={50}
                height={30}
                className="h-5 sm:h-7 w-auto object-contain"
              />
              <Image src="/pix.png" alt="Pix" width={50} height={30} className="h-5 sm:h-7 w-auto object-contain" />
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
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
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
