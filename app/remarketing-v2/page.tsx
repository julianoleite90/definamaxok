"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, CheckCircle2, Share2, X, ShieldCheck, Star, ArrowRight, Clock, Users, Lock } from "lucide-react"
import Head from "next/head"

export default function ReMarketingPageV2() {
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
    if (activeVideo === index) return

    if (activeVideo !== null && videoRefs.current[activeVideo]) {
      const iframe = videoRefs.current[activeVideo]
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage('{"method":"pause"}', "*")
      }
    }

    setActiveVideo(index)

    const newVideosWatched = [...videosWatched]
    newVideosWatched[index] = true
    setVideosWatched(newVideosWatched)
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

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-white to-gray-50">
      {/* Header - Mantido igual ao original */}
      <header className="w-full bg-green-800">
        <div className="mx-auto max-w-7xl px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex-shrink-0">
            <Image src="/logo2.png" alt="Definamax" width={200} height={40} className="h-8 w-auto" />
          </Link>
          <Link
            href="https://full.sale/ytA47b?rmkt1"
            className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-2 rounded-lg transition-all duration-300"
          >
            COMPRAR
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-16 bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
                  O EMAGRECEDOR <span className="text-green-600">N°1</span> DO BRASIL
                </h1>
                <p className="text-xl text-gray-600">
                  Descubra como milhares de pessoas perderam mais de 10kg de forma saudável e definitiva com Definamax
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    const kits = document.getElementById('kits')
                    if (kits) {
                      kits.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white text-lg font-bold rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Comece Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    const depoimentos = document.getElementById('depoimentos')
                    if (depoimentos) {
                      depoimentos.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 text-lg font-bold rounded-xl border-2 border-green-600 hover:bg-green-50 transition-all duration-300"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Ver Depoimentos
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">10k+</div>
                  <p className="text-gray-600 text-sm">Clientes Satisfeitos</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">30</div>
                  <p className="text-gray-600 text-sm">Dias de Garantia</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">4.9</div>
                  <div className="flex justify-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">Avaliação Média</p>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center md:justify-end">
              <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative">
                <Image
                  src="/mockup2.png"
                  alt="Transformação com Definamax"
                  width={400}
                  height={400}
                  className="w-full h-auto max-w-[400px] rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 md:-right-6 -left-6 md:left-auto bg-white p-4 rounded-xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold">Resultados Reais</p>
                      <p className="text-gray-600 text-sm">Em até 30 dias</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section className="w-full py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher Definamax?
            </h2>
            <p className="text-xl text-gray-600">
              Descubra os benefícios que fazem do Definamax a escolha número 1 para emagrecimento
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="h-8 w-8 text-green-600" />,
                title: "Resultados Rápidos",
                description: "Veja mudanças visíveis em seu corpo já nas primeiras semanas de uso"
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-green-600" />,
                title: "100% Natural",
                description: "Fórmula segura e eficaz, sem efeitos colaterais"
              },
              {
                icon: <Users className="h-8 w-8 text-green-600" />,
                title: "Comunidade Ativa",
                description: "Faça parte de uma comunidade que já transformou milhares de vidas"
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-white w-16 h-16 rounded-xl shadow-md flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section id="depoimentos" className="w-full py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Histórias reais de transformação
            </h2>
            <p className="text-xl text-gray-600">
              Veja como o Definamax mudou a vida de milhares de pessoas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <div key={video.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
                <div className="relative">
                  {activeVideo === index ? (
                    <div className="aspect-video w-full bg-black">
                      <iframe
                        ref={(el) => {
                          if (videoRefs.current) {
                            videoRefs.current[index] = el
                          }
                        }}
                        src={`https://player.vimeo.com/video/${video.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
                        className="w-full h-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={video.title}
                      ></iframe>
                    </div>
                  ) : (
                    <div 
                      className="aspect-video w-full relative cursor-pointer group" 
                      onClick={() => playVideo(index)}
                    >
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-all transform group-hover:scale-110 shadow-lg">
                            <Play className="h-10 w-10 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white text-sm px-3 py-1.5 rounded-full">
                        {video.duration}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{video.title}</h3>
                      <p className="text-gray-600 text-sm">{video.description}</p>
                    </div>
                    {videosWatched[index] && (
                      <span className="bg-green-100 text-green-800 text-xs px-3 py-1.5 rounded-full flex items-center">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Assistido
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => playVideo(index)}
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-sm"
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
                        <div className="absolute right-0 bottom-12 bg-white shadow-xl rounded-xl p-3 z-10 border border-gray-100">
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
        </div>
      </section>

      {/* Products Section */}
      <section className="w-full py-16 bg-gradient-to-b from-white to-green-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Seu corpo dos sonhos com <span className="text-green-700">Definamax!</span>
            </h2>
            <div className="inline-block bg-white rounded-full px-6 py-2 shadow-sm">
              <p className="text-gray-700">
                Restam poucos frascos com FRETE GRÁTIS no dia de hoje: <span className="text-red-500 font-semibold">27/05/2025</span>
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Kit Completo */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-green-600 text-white p-4 text-center">
                <h3 className="text-xl font-bold">COMPRE 5 LEVE 8 FRASCOS</h3>
                <p className="text-sm">GANHE 2 FRASCOS DE COLÁGENO</p>
              </div>
              <div className="p-6">
                <div className="text-center text-green-700 font-semibold mb-4">
                  Tratamento Completo
                </div>
                <div className="flex justify-center mb-6">
                  <Image
                    src="/8frascos.png"
                    alt="Kit Completo Definamax"
                    width={300}
                    height={300}
                    className="w-auto h-auto"
                  />
                </div>
                <div className="text-center mb-4">
                  <p className="text-gray-500 line-through text-sm">De R$1.079,00</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <p className="text-sm">Por apenas 12x</p>
                    <p className="text-4xl font-bold text-green-700">R$45</p>
                    <p className="text-xl font-bold text-green-700">,08</p>
                  </div>
                  <p className="text-gray-700 font-medium">Ou R$449,00 à vista!</p>
                </div>
                <div className="text-center text-green-600 font-bold mb-4">
                  FRETE GRÁTIS
                </div>
                <Link
                  href="https://full.sale/ytA47b"
                  className="block w-full bg-green-600 text-white text-center py-4 rounded-xl font-bold hover:bg-green-700 transition-all mb-4"
                >
                  COMPRAR AGORA
                </Link>
                <div className="flex justify-center space-x-4">
                  <div className="flex items-center">
                    <ShieldCheck className="h-5 w-5 text-gray-600 mr-1" />
                    <span className="text-xs text-gray-600">Compra Segura</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-gray-600 mr-1" />
                    <span className="text-xs text-gray-600">Satisfação Garantida</span>
                  </div>
                  <div className="flex items-center">
                    <Lock className="h-5 w-5 text-gray-600 mr-1" />
                    <span className="text-xs text-gray-600">Privacidade Protegida</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kit Recomendado */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-yellow-500 text-white p-4 text-center">
                <h3 className="text-xl font-bold">COMPRE 3 LEVE 5 FRASCOS</h3>
                <p className="text-sm">GANHE 1 FRASCO DE COLÁGENO</p>
              </div>
              <div className="p-6">
                <div className="text-center text-yellow-600 font-semibold mb-4">
                  Tratamento Mais Vendido
                </div>
                <div className="flex justify-center mb-6">
                  <Image
                    src="/5frascos.png"
                    alt="Kit Recomendado Definamax"
                    width={300}
                    height={300}
                    className="w-auto h-auto"
                  />
                </div>
                <div className="text-center mb-4">
                  <p className="text-gray-500 line-through text-sm">De R$379,00</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <p className="text-sm">Por apenas 12x</p>
                    <p className="text-4xl font-bold text-yellow-600">R$38</p>
                    <p className="text-xl font-bold text-yellow-600">,05</p>
                  </div>
                  <p className="text-gray-700 font-medium">Ou R$379,00 à vista!</p>
                </div>
                <div className="text-center text-green-600 font-bold mb-4">
                  FRETE GRÁTIS
                </div>
                <Link
                  href="https://full.sale/DmNQj1"
                  className="block w-full bg-green-600 text-white text-center py-4 rounded-xl font-bold hover:bg-green-700 transition-all mb-4"
                >
                  COMPRAR AGORA
                </Link>
                <div className="flex justify-center space-x-4">
                  <div className="flex items-center">
                    <ShieldCheck className="h-5 w-5 text-gray-600 mr-1" />
                    <span className="text-xs text-gray-600">Compra Segura</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-gray-600 mr-1" />
                    <span className="text-xs text-gray-600">Satisfação Garantida</span>
                  </div>
                  <div className="flex items-center">
                    <Lock className="h-5 w-5 text-gray-600 mr-1" />
                    <span className="text-xs text-gray-600">Privacidade Protegida</span>
                  </div>
                </div>
              </div>
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
            <Link href="/analise-imc" className="hover:text-white">Avaliação de IMC</Link>
            <Link href="/termos-garantia" className="hover:text-white">Termos de Garantia</Link>
            <Link href="/perguntas-frequentes" className="hover:text-white">Perguntas Frequentes</Link>
            <Link href="/produtos" className="hover:text-white">Produtos</Link>
            <Link href="/depoimentos" className="hover:text-white">Depoimentos em Vídeo</Link>
            <Link href="/politica-privacidade" className="hover:text-white">Política de Privacidade</Link>
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