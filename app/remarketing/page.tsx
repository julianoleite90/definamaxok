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

  // Função para scroll suave
  const scrollToKits = () => {
    const kitsSection = document.getElementById('kits-section')
    if (kitsSection) {
      kitsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
          <button
            onClick={scrollToKits}
            className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-2 rounded-lg transition-all duration-300"
          >
            COMPRAR
          </button>
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

      {/* Products Section */}
      <section id="kits-section" className="w-full py-12 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Escolha o kit ideal para você acelerar o seu processo de emagrecimento
            </h2>
            <p className="text-lg text-gray-600">
              Para melhores resultados recomendados o tratamento de 3 a 6 meses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Kit Completo */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all relative border border-gray-100">
              <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4 md:p-5 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] animate-[shine_2s_infinite]"></div>
                <h3 className="text-lg md:text-xl font-bold">Kit Completo</h3>
                <p className="text-sm text-white/90">6 meses de tratamento</p>
              </div>
              <div className="p-4 md:p-8">
                <div className="flex justify-center mb-4 md:mb-6">
                  <Image
                    src="/6frascos.png"
                    alt="Kit Completo Definamax"
                    width={180}
                    height={180}
                    className="object-contain w-36 md:w-[200px]"
                  />
                </div>
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-500">De <span className="line-through">R$ 1497,00</span> por apenas:</p>
                  <div className="flex items-baseline justify-center gap-1 mt-1">
                    <span className="text-lg md:text-xl font-semibold text-green-800">12x</span>
                    <span className="text-3xl md:text-5xl font-bold text-green-800">39</span>
                    <span className="text-lg md:text-xl font-semibold text-green-800">,91</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Parcelamento sem juros</p>
                  <div className="mt-2">
                    <span className="inline-block bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                      Economize R$ 1.000,00
                    </span>
                  </div>
                </div>
                <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-gray-600">Tratamento completo de 6 meses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">2 Frascos de colágeno hidrolisado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Programa emagrecimento acelerado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Envio imediato</span>
                  </li>
                </ul>
                <div className="flex justify-center mb-4">
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-700 text-white">
                    MAIOR DESCONTO
                  </div>
                </div>
                <Link
                  href="https://full.sale/ytA47b?src=rmkt"
                  className="block w-full bg-green-700 text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:bg-green-600 transition-all text-center shadow-lg relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] group-hover:animate-[shine_1.5s_infinite]"></div>
                  <span className="relative">COMPRAR AGORA</span>
                </Link>
                <p className="text-center text-gray-600 font-medium text-sm mt-3">Frete grátis para todo Brasil</p>
              </div>
            </div>

            {/* Kit Recomendado */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all relative border border-gray-100 md:scale-105">
              <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600"></div>
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white p-4 md:p-5 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] animate-[shine_2s_infinite]"></div>
                <h3 className="text-lg md:text-xl font-bold">Kit Recomendado</h3>
                <p className="text-sm text-white/90">3 meses de tratamento</p>
              </div>
              <div className="p-4 md:p-8">
                <div className="flex justify-center mb-4 md:mb-6">
                  <Image
                    src="/3frascos.png"
                    alt="Kit Recomendado Definamax"
                    width={180}
                    height={180}
                    className="object-contain w-32 md:w-48 h-auto"
                  />
                </div>
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-500">De <span className="line-through">R$ 758,00</span> por apenas:</p>
                  <div className="flex items-baseline justify-center gap-1 mt-1">
                    <span className="text-xl font-semibold text-green-800">12x</span>
                    <span className="text-4xl md:text-5xl font-bold text-green-800">31</span>
                    <span className="text-xl font-semibold text-green-800">,58</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Parcelamento sem juros</p>
                  <div className="mt-2">
                    <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full">
                      Economize R$ 379,00
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Tratamento intermediário de 3 meses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">1 Frasco de colágeno hidrolisado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Programa emagrecimento acelerado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Envio imediato</span>
                  </li>
                </ul>
                <div className="flex justify-center mb-4">
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-600 text-white">
                    MAIS VENDIDO
                  </div>
                </div>
                <Link
                  href="https://full.sale/DmNQj1?src=rmkt"
                  className="block w-full bg-emerald-600 text-white font-bold py-4 rounded-lg hover:bg-emerald-500 transition-all text-center shadow-lg relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] group-hover:animate-[shine_1.5s_infinite]"></div>
                  <span className="relative">COMPRAR AGORA</span>
                </Link>
                <p className="text-center text-gray-600 font-medium text-sm mt-3">Frete grátis para todo Brasil</p>
              </div>
            </div>

            {/* Kit Inicial */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all relative border border-gray-100">
              <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4 md:p-5 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] animate-[shine_2s_infinite]"></div>
                <h3 className="text-lg md:text-xl font-bold">Kit Inicial</h3>
                <p className="text-sm text-white/90">30 dias de tratamento</p>
              </div>
              <div className="p-4 md:p-8">
                <div className="flex justify-center mb-4 md:mb-6">
                  <Image
                    src="/1frasco.png"
                    alt="Kit Inicial Definamax"
                    width={180}
                    height={180}
                    className="object-contain w-32 md:w-48 h-auto"
                  />
                </div>
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-500">De <span className="line-through">R$ 299,00</span> por apenas:</p>
                  <div className="flex items-baseline justify-center gap-1 mt-1">
                    <span className="text-xl font-semibold text-green-800">12x</span>
                    <span className="text-4xl md:text-5xl font-bold text-green-800">25</span>
                    <span className="text-xl font-semibold text-green-800">,33</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Parcelamento sem juros</p>
                  <div className="mt-2">
                    <span className="inline-block bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                      Economize R$ 25,00
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Tratamento inicial para 30 dias</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">60 cápsulas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Envio imediato para todo Brasil</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-400">Sem bônus adicionais</span>
                  </li>
                </ul>
                <div className="flex justify-center mb-4">
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-700 text-white">
                    EXPERIMENTE
                  </div>
                </div>
                <Link
                  href="https://full.sale/eMbtHp?src=rmkt"
                  className="block w-full bg-green-700 text-white font-bold py-4 rounded-lg hover:bg-green-600 transition-all text-center shadow-lg relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] group-hover:animate-[shine_1.5s_infinite]"></div>
                  <span className="relative">COMPRAR AGORA</span>
                </Link>
                <p className="text-center text-gray-600 font-medium text-sm mt-3">Frete fixo R$ 25,00</p>
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
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToKits()
                      }}
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
