"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, CheckCircle2, Share2, X, ShieldCheck } from "lucide-react"
import Head from "next/head"

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
      <section className="w-full bg-gradient-to-b from-green-50 to-white py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Perca até <span className="text-green-600">22kg</span> de Forma Natural e Definitiva
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Eles também estavam sofrendo com o sobrepeso, e todos emagreceram mais de 10kg usando a fórmula de Definamax
          </p>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <Image
                  src="/dep01.png"
                  alt="Débora - Antes e Depois"
                  width={400}
                  height={400}
                  className="w-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-green-600 text-4xl font-bold mb-2">-23kg</h3>
                <p className="text-gray-600 text-lg mb-3">em 7 meses</p>
                <p className="text-gray-800 text-xl font-medium mb-1">Débora, 31 anos</p>
                <p className="text-gray-500 mb-1">Professora</p>
                <p className="text-gray-500">São Paulo, SP</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <Image
                  src="/dep02.png"
                  alt="Arnaldo - Antes e Depois"
                  width={400}
                  height={400}
                  className="w-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-green-600 text-4xl font-bold mb-2">-25kg</h3>
                <p className="text-gray-600 text-lg mb-3">em 6 meses</p>
                <p className="text-gray-800 text-xl font-medium mb-1">Arnaldo, 34 anos</p>
                <p className="text-gray-500 mb-1">Auxiliar Administrativo</p>
                <p className="text-gray-500">Salvador, BA</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <Image
                  src="/dep03.png"
                  alt="Sara - Antes e Depois"
                  width={400}
                  height={400}
                  className="w-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-green-600 text-4xl font-bold mb-2">-11kg</h3>
                <p className="text-gray-600 text-lg mb-3">em 2 meses</p>
                <p className="text-gray-800 text-xl font-medium mb-1">Sara, 32 anos</p>
                <p className="text-gray-500 mb-1">Dona de casa</p>
                <p className="text-gray-500">Rio de Janeiro, RJ</p>
              </div>
            </div>
          </div>

          {!showMoreTestimonials && (
            <button 
              onClick={() => setShowMoreTestimonials(true)}
              className="text-green-600 hover:text-green-700 font-medium text-sm hover:underline"
            >
              Ver mais depoimentos
            </button>
          )}

          {/* Additional testimonials */}
          {showMoreTestimonials && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                {/* Additional Testimonial 1 */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative">
                    <Image
                      src="/dep04.png"
                      alt="Maria - Antes e Depois"
                      width={400}
                      height={400}
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-green-600 text-4xl font-bold mb-2">-18kg</h3>
                    <p className="text-gray-600 text-lg mb-3">em 5 meses</p>
                    <p className="text-gray-800 text-xl font-medium mb-1">Maria, 28 anos</p>
                    <p className="text-gray-500 mb-1">Vendedora</p>
                    <p className="text-gray-500">Curitiba, PR</p>
                  </div>
                </div>

                {/* Additional Testimonial 2 */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative">
                    <Image
                      src="/dep05.png"
                      alt="João - Antes e Depois"
                      width={400}
                      height={400}
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-green-600 text-4xl font-bold mb-2">-20kg</h3>
                    <p className="text-gray-600 text-lg mb-3">em 4 meses</p>
                    <p className="text-gray-800 text-xl font-medium mb-1">João, 45 anos</p>
                    <p className="text-gray-500 mb-1">Empresário</p>
                    <p className="text-gray-500">Belo Horizonte, MG</p>
                  </div>
                </div>

                {/* Additional Testimonial 3 */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative">
                    <Image
                      src="/dep06.png"
                      alt="Ana - Antes e Depois"
                      width={400}
                      height={400}
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-green-600 text-4xl font-bold mb-2">-15kg</h3>
                    <p className="text-gray-600 text-lg mb-3">em 3 meses</p>
                    <p className="text-gray-800 text-xl font-medium mb-1">Ana, 39 anos</p>
                    <p className="text-gray-500 mb-1">Enfermeira</p>
                    <p className="text-gray-500">Recife, PE</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setShowMoreTestimonials(false)}
                className="text-gray-500 hover:text-gray-600 font-medium text-sm hover:underline"
              >
                Fechar depoimentos
              </button>
            </>
          )}
        </div>
      </section>

      {/* Simple Separator */}
      <div className="w-full border-t border-gray-200">
        <div className="mx-auto max-w-5xl px-4">
          <div className="relative -top-3 text-center">
            <span className="bg-white px-4 text-gray-600 text-sm">
              Depoimentos em Vídeo
            </span>
          </div>
        </div>
      </div>

      {/* Videos Section */}
      <section className="w-full py-12 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <div key={video.id} className="bg-white rounded-2xl border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
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
        </div>
      </section>

      {/* Products Section */}
      <section className="w-full py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Escolha o kit ideal para você acelerar o seu processo de emagrecimento
            </h2>
            <p className="text-lg text-gray-600">
              Para melhores resultados recomendados o tratamento de 3 a 6 meses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Kit Completo */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-green-500 py-3 px-6">
                <h3 className="text-xl font-bold text-white text-center">Kit Completo</h3>
                <p className="text-white text-center text-sm">6 meses de tratamento</p>
              </div>
              <div className="p-6">
                <div className="flex justify-center mb-6">
                  <Image
                    src="/6frascos.png"
                    alt="Kit 6 meses Definamax"
                    width={300}
                    height={300}
                    className="w-auto h-48 object-contain"
                  />
                </div>
                <p className="text-center text-gray-600 text-sm mb-1">Em até 12x de</p>
                <div className="text-center mb-6">
                  <span className="text-green-500">
                    <span className="text-lg">R$</span>
                    <span className="text-5xl font-bold">48</span>
                    <span className="text-xl">,09</span>
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Tratamento completo</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>2 Frascos de colágeno hidrolisado</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Programa emagrecimento acelerado</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Envio imediato</span>
                  </li>
                </ul>
                <div className="text-center">
                  <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full mb-4">
                    MAIOR DESCONTO
                  </span>
                  <Link
                    href="https://full.sale/ytA47b?rmkt1"
                    className="relative block w-full bg-[#3BA755] text-white text-center py-4 rounded-2xl font-bold text-xl hover:bg-[#45c564] transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(59,167,85,0.6)] hover:shadow-[0_8px_24px_-6px_rgba(59,167,85,0.8)] hover:translate-y-[1px]"
                    style={{
                      background: "linear-gradient(180deg, #3BA755 0%, #2E8040 100%)"
                    }}
                  >
                    COMPRAR AGORA
                  </Link>
                  <p className="text-green-500 text-xs mt-3">Frete grátis para todo Brasil</p>
                </div>
              </div>
            </div>

            {/* Kit Recomendado */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-[#CD9B4A] py-3 px-6">
                <h3 className="text-xl font-bold text-white text-center">Kit Recomendado</h3>
                <p className="text-white text-center text-sm">3 meses de tratamento</p>
              </div>
              <div className="p-6">
                <div className="flex justify-center mb-6">
                  <Image
                    src="/3frascos.png"
                    alt="Kit 3 meses Definamax"
                    width={300}
                    height={300}
                    className="w-auto h-48 object-contain"
                  />
                </div>
                <p className="text-center text-gray-600 text-sm mb-1">Em até 12x de</p>
                <div className="text-center mb-6">
                  <span className="text-[#CD9B4A]">
                    <span className="text-lg">R$</span>
                    <span className="text-5xl font-bold">38</span>
                    <span className="text-xl">,05</span>
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#CD9B4A] mr-2 flex-shrink-0" />
                    <span>Tratamento intermediário</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#CD9B4A] mr-2 flex-shrink-0" />
                    <span>1 Frasco de colágeno hidrolisado</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#CD9B4A] mr-2 flex-shrink-0" />
                    <span>Programa emagrecimento acelerado</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#CD9B4A] mr-2 flex-shrink-0" />
                    <span>Envio imediato</span>
                  </li>
                </ul>
                <div className="text-center">
                  <span className="inline-block bg-[#FDF6E7] text-[#CD9B4A] text-xs font-medium px-3 py-1 rounded-full mb-4">
                    MAIS VENDIDO
                  </span>
                  <Link
                    href="https://full.sale/DmNQj1?src=rmkt1"
                    className="relative block w-full bg-[#3BA755] text-white text-center py-4 rounded-2xl font-bold text-xl hover:bg-[#45c564] transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(59,167,85,0.6)] hover:shadow-[0_8px_24px_-6px_rgba(59,167,85,0.8)] hover:translate-y-[1px]"
                    style={{
                      background: "linear-gradient(180deg, #3BA755 0%, #2E8040 100%)"
                    }}
                  >
                    COMPRAR AGORA
                  </Link>
                  <p className="text-[#CD9B4A] text-xs mt-3">Frete grátis para todo Brasil</p>
                </div>
              </div>
            </div>

            {/* Kit Inicial */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-green-500 py-3 px-6">
                <h3 className="text-xl font-bold text-white text-center">Kit Inicial</h3>
                <p className="text-white text-center text-sm">30 dias de tratamento</p>
              </div>
              <div className="p-6">
                <div className="flex justify-center mb-6">
                  <Image
                    src="/1frasco.png"
                    alt="Kit 1 mês Definamax"
                    width={300}
                    height={300}
                    className="w-auto h-48 object-contain"
                  />
                </div>
                <p className="text-center text-gray-600 text-sm mb-1">Em até 12x de</p>
                <div className="text-center mb-6">
                  <span className="text-green-500">
                    <span className="text-lg">R$</span>
                    <span className="text-5xl font-bold">28</span>
                    <span className="text-xl">,01</span>
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Tratamento inicial para 30 dias</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>60 cápsulas</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Envio imediato para todo Brasil</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <X className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                    <span className="text-gray-400">Sem bônus adicionais</span>
                  </li>
                </ul>
                <div className="text-center">
                  <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full mb-4">
                    EXPERIMENTE
                  </span>
                  <Link
                    href="https://full.sale/eMbtHp?rc=rmkt1"
                    className="relative block w-full bg-[#3BA755] text-white text-center py-4 rounded-2xl font-bold text-xl hover:bg-[#45c564] transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(59,167,85,0.6)] hover:shadow-[0_8px_24px_-6px_rgba(59,167,85,0.8)] hover:translate-y-[1px]"
                    style={{
                      background: "linear-gradient(180deg, #3BA755 0%, #2E8040 100%)"
                    }}
                  >
                    COMPRAR AGORA
                  </Link>
                  <p className="text-gray-500 text-xs mt-3">Frete fixo R$ 25,00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators and Payment Methods */}
          <div className="mt-12">
            {/* Trust Badges */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <span className="text-gray-700 text-sm">Garantia de 30 dias</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-gray-700 text-sm">Pagamento seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span className="text-gray-700 text-sm">Entrega para todo Brasil</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex justify-center items-center gap-8 mb-12">
              <Image src="/master.png" alt="Mastercard" width={48} height={32} className="h-6 w-auto" />
              <Image src="/visa.png" alt="Visa" width={48} height={32} className="h-6 w-auto" />
              <Image src="/hiper.png" alt="Hipercard" width={48} height={32} className="h-6 w-auto" />
              <Image src="/pix.png" alt="Pix" width={48} height={32} className="h-6 w-auto" />
            </div>

            {/* Guarantee Section */}
            <div className="bg-[#F0FDF4] rounded-2xl p-8 relative overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-green-500" />
                    <h3 className="text-2xl font-bold text-gray-800">Garantia Incondicional de 30 Dias</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">Teste Sem Compromisso</h4>
                        <p className="text-gray-600 text-sm">Use o Definamax por 30 dias e comprove os resultados</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">Devolução Integral</h4>
                        <p className="text-gray-600 text-sm">Receba 100% do seu dinheiro de volta se não estiver satisfeito</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">Processo Simples</h4>
                        <p className="text-gray-600 text-sm">Sem burocracia ou questionamentos na hora do reembolso</p>
                      </div>
                    </div>
                  </div>

                                      <Link
                      href="https://full.sale/ytA47b?rmkt1"
                      className="relative block w-full bg-[#3BA755] text-white text-center py-4 rounded-2xl font-bold text-base md:text-xl hover:bg-[#45c564] transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(59,167,85,0.6)] hover:shadow-[0_8px_24px_-6px_rgba(59,167,85,0.8)] hover:translate-y-[1px]"
                      style={{
                        background: "linear-gradient(180deg, #3BA755 0%, #2E8040 100%)"
                      }}
                    >
                      <span className="inline-flex items-center">
                        EXPERIMENTAR SEM RISCOS
                        <span className="ml-1 md:ml-2">→</span>
                      </span>
                    </Link>
                </div>

                {/* Guarantee Seal */}
                <div className="flex justify-center">
                  <div className="relative w-48 h-48">
                    <div className="absolute inset-0">
                      {/* Outer ring with gradient and shine effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-green-400 to-green-600 animate-pulse">
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] animate-[shine_2s_infinite]"></div>
                      </div>
                      
                      {/* White inner circle */}
                      <div className="absolute inset-1 bg-white rounded-full shadow-inner flex items-center justify-center">
                        {/* Content */}
                        <div className="text-center relative z-10">
                          {/* Shield icon with glow */}
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                            <div className="relative">
                              <ShieldCheck className="h-12 w-12 text-green-500 drop-shadow-[0_0_8px_rgba(59,167,85,0.4)]" />
                              <div className="absolute inset-0 blur-sm bg-green-400 opacity-40 animate-pulse"></div>
                            </div>
                          </div>
                          
                          {/* Main text */}
                          <div className="mt-8">
                            <div className="text-4xl font-black text-green-500 leading-none" style={{ textShadow: '0 2px 4px rgba(59,167,85,0.2)' }}>
                              30 DIAS
                            </div>
                            <div className="text-sm font-bold text-green-600 tracking-wider mt-1">
                              GARANTIA TOTAL
                            </div>
                            <div className="mt-2 text-[11px] text-green-500 font-semibold leading-tight">
                              SATISFAÇÃO OU<br />SEU DINHEIRO DE VOLTA
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute inset-0">
                        {/* Circular dots */}
                        {[...Array(24)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1.5 h-1.5 bg-white rounded-full"
                            style={{
                              top: '50%',
                              left: '50%',
                              transform: `rotate(${i * 15}deg) translateY(-22px)`,
                              transformOrigin: '50% 50%',
                              boxShadow: '0 0 4px rgba(255,255,255,0.8)'
                            }}
                          ></div>
                        ))}
                        
                        {/* Radial lines */}
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={`line-${i}`}
                            className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-white to-transparent opacity-20"
                            style={{
                              left: '50%',
                              transform: `rotate(${i * 30}deg)`,
                              transformOrigin: '50% 50%'
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
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
