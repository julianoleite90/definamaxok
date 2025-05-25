"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { CheckCircle2, X, ArrowRight, Star, ShieldCheck, MessageCircle, Clock, ChevronLeft, ChevronRight, Lock, Truck, ChevronDown } from "lucide-react"

export default function LandingPage() {
  // Estados necessários
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 59, seconds: 59 })
  const [showMoreReviews, setShowMoreReviews] = useState(false)
  const [showMoreDeliveries, setShowMoreDeliveries] = useState(false)
  const [openFaqs, setOpenFaqs] = useState<number[]>([])
  const buyRef = useRef<HTMLDivElement>(null)

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

  // Função para rolar até a seção de compra
  const scrollToBuy = () => {
    buyRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Função para alternar a exibição de mais avaliações
  const toggleMoreReviews = () => {
    setShowMoreReviews(!showMoreReviews)
  }

  // Função para alternar FAQ
  const toggleFaq = (index: number) => {
    setOpenFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  // Função para adicionar UTMs aos links de compra
  const addUtmToUrl = (baseUrl: string): string => {
    if (typeof window === "undefined") return baseUrl

    const url = new URL(baseUrl)
    url.searchParams.append("src", "rmkt")

    return url.toString()
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      {/* Header com CTA */}
      <header className="w-full bg-gradient-to-r from-green-800 to-green-700 py-3 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] animate-[shine_1.5s_infinite] pointer-events-none"></div>
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex flex-col md:flex-row md:items-start items-center gap-4 md:gap-0">
            <div className="flex-1">
              <Image 
                src="/logo2.png" 
                alt="Definamax" 
                width={400} 
                height={120} 
                className="h-10 w-auto" 
                quality={100}
                priority
              />
            </div>
            <div className="flex justify-center md:justify-end">
              <button
                onClick={scrollToBuy}
                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500 transition-all shadow-sm"
              >
                COMPRAR AGORA
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section Otimizada */}
      <section className="w-full bg-gradient-to-b from-green-50 to-white py-8 md:py-12">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 items-start">
            {/* Título e Subtítulo */}
            <div className="md:pt-8">
              <h1 className="text-[2.3rem] md:text-[2.3rem] lg:text-[2.8rem] font-bold text-green-800 mb-4 leading-tight">
                Aproveite esta <span className="text-green-600 relative inline-block">
                  oferta especial
                  <span className="absolute bottom-0 left-0 w-full h-[6px] bg-green-200 -z-10 skew-x-3"></span>
                  <span className="absolute -inset-1 bg-green-100/50 -z-20 rounded-lg transform rotate-1"></span>
                </span> por tempo limitado!
              </h1>

              <p className="text-xl md:text-xl text-gray-700 mb-3">
                Garanta agora seu <span className="font-semibold text-green-700">Definamax com desconto especial</span> e comece sua transformação hoje mesmo
              </p>

              {/* Timer */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-green-100 mb-6">
                <p className="text-sm text-gray-600 mb-2">Oferta expira em:</p>
                <div className="flex items-center gap-2 text-2xl font-bold text-green-800">
                  <span>{String(timeLeft.hours).padStart(2, "0")}</span>
                  <span>:</span>
                  <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
                  <span>:</span>
                  <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
                </div>
              </div>

              {/* Social Proof */}
              <div className="flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium">4.9/5 (3.842 avaliações)</span>
              </div>
            </div>

            {/* Imagem do Produto */}
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

            {/* Benefícios e CTA */}
            <div className="md:col-start-1 md:row-start-2 md:-mt-20 mt-4">
              {/* Benefícios principais */}
              <ul className="space-y-3 mb-8 md:mb-4">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Mais saciedade durante o dia todo</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Reduz a compulsão por doces e lanches</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Equilibra seu metabolismo</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Combate a retenção de líquidos</span>
                </li>
              </ul>

              {/* CTA Principal */}
              <div className="flex flex-col items-center md:items-start w-full mt-3 md:mt-0">
                <div className="w-full md:w-[320px]">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-400 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <Link
                      href={addUtmToUrl("https://full.sale/DmNQj1")}
                      className="relative w-full inline-flex items-center justify-center rounded-lg bg-green-600 px-4 md:px-6 py-4 text-base md:text-xl font-bold text-white hover:bg-green-500 transition-all shadow-lg text-center"
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] group-hover:animate-[shine_1.5s_infinite]"></div>
                      <span className="flex items-center justify-center">
                        APROVEITAR OFERTA ESPECIAL <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6" />
                      </span>
                    </Link>
                  </div>

                  <div className="flex items-center justify-center md:justify-start mt-3 text-sm text-gray-600">
                    <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
                    <span>30 dias de garantia incondicional</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Kits */}
      <section className="w-full py-16 bg-gradient-to-b from-white to-green-50" ref={buyRef}>
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Escolha seu kit com <span className="text-green-600">desconto especial</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Oferta por tempo limitado - Garanta o seu agora!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Kit Completo */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all relative">
              <div className="bg-green-600 text-white p-3 md:p-4 text-center">
                <h3 className="text-lg md:text-xl font-bold">Kit Completo</h3>
                <p className="text-sm text-white/90">6 meses de tratamento</p>
              </div>
              <div className="p-4 md:p-6">
                <div className="flex justify-center mb-4 md:mb-6">
                  <Image
                    src="/6frascos.png"
                    alt="Kit Completo Definamax"
                    width={180}
                    height={180}
                    className="object-contain w-40 md:w-[180px]"
                  />
                </div>
                <div className="text-center mb-3 md:mb-4">
                  <p className="text-sm text-gray-500 mb-1">Em até 12x de</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl md:text-2xl font-bold text-green-600">R$</span>
                    <span className="text-5xl md:text-5xl font-bold text-green-600">48</span>
                    <span className="text-2xl md:text-2xl font-bold text-green-600">,09</span>
                  </div>
                </div>
                <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-gray-700">Tratamento completo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-gray-700">2 Frascos de colágeno hidrolisado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-gray-700">Programa emagrecimento acelerado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-gray-700">Envio imediato</span>
                  </li>
                </ul>
                <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-green-50 text-green-800 mb-3">
                  MAIOR DESCONTO
                </div>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-400 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <Link
                    href={addUtmToUrl("https://full.sale/ytA47b")}
                    className="relative block w-full bg-green-600 text-white font-bold py-3 md:py-4 rounded-lg hover:bg-green-500 transition-all text-center shadow-lg"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] group-hover:animate-[shine_1.5s_infinite]"></div>
                    <span className="relative">COMPRAR AGORA</span>
                  </Link>
                </div>
                <p className="text-center text-green-600 font-medium text-sm mt-2">Frete grátis para todo Brasil</p>
              </div>
            </div>

            {/* Kit Recomendado */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all relative md:scale-105 md:shadow-xl">
              <div className="bg-gradient-to-r from-[#CD9B4A] to-[#B07F2D] text-white p-3 md:p-4 text-center">
                <h3 className="text-lg md:text-xl font-bold">Kit Recomendado</h3>
                <p className="text-sm text-white/90">3 meses de tratamento</p>
              </div>
              <div className="p-4 md:p-6">
                <div className="flex justify-center mb-4 md:mb-6">
                  <Image
                    src="/3frascos.png"
                    alt="Kit Recomendado Definamax"
                    width={180}
                    height={180}
                    className="object-contain w-40 md:w-48 h-auto"
                  />
                </div>
                <div className="text-center mb-3 md:mb-4">
                  <p className="text-sm text-gray-500 mb-1">Em até 12x de</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl md:text-2xl font-bold text-[#CD9B4A]">R$</span>
                    <span className="text-5xl md:text-5xl font-bold text-[#CD9B4A]">38</span>
                    <span className="text-2xl md:text-2xl font-bold text-[#CD9B4A]">,05</span>
                  </div>
                </div>
                <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#CD9B4A] flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-gray-700">Tratamento intermediário</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#CD9B4A] flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-gray-700">1 Frasco de colágeno hidrolisado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#CD9B4A] flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-gray-700">Programa emagrecimento acelerado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#CD9B4A] flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-gray-700">Envio imediato</span>
                  </li>
                </ul>
                <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#CD9B4A]/10 to-[#B07F2D]/10 text-[#B07F2D] mb-3">
                  MAIS VENDIDO
                </div>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#CD9B4A] to-[#B07F2D] rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <Link
                    href={addUtmToUrl("https://full.sale/DmNQj1")}
                    className="relative block w-full bg-gradient-to-r from-[#CD9B4A] to-[#B07F2D] text-white font-bold py-3 md:py-4 rounded-lg hover:from-[#B07F2D] hover:to-[#CD9B4A] transition-all text-center shadow-lg"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] group-hover:animate-[shine_1.5s_infinite]"></div>
                    <span className="relative">COMPRAR AGORA</span>
                  </Link>
                </div>
                <p className="text-center text-[#CD9B4A] font-medium text-sm mt-2">Frete grátis para todo Brasil</p>
              </div>
            </div>

            {/* Kit Inicial */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all relative">
              <div className="bg-green-600 text-white p-3 md:p-4 text-center">
                <h3 className="text-lg md:text-xl font-bold">Kit Inicial</h3>
                <p className="text-sm text-white/90">30 dias de tratamento</p>
              </div>
              <div className="p-4 md:p-6">
                <div className="flex justify-center mb-4 md:mb-6">
                  <Image
                    src="/1frasco.png"
                    alt="Kit Inicial Definamax"
                    width={180}
                    height={180}
                    className="object-contain w-40 md:w-48 h-auto"
                  />
                </div>
                <div className="text-center mb-3 md:mb-4">
                  <p className="text-sm text-gray-500 mb-1">Em até 12x de</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl md:text-2xl font-bold text-green-600">R$</span>
                    <span className="text-5xl md:text-5xl font-bold text-green-600">28</span>
                    <span className="text-2xl md:text-2xl font-bold text-green-600">,01</span>
                  </div>
                </div>
                <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-gray-700">Tratamento inicial para 30 dias</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-gray-700">60 cápsulas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-gray-700">Envio imediato para todo Brasil</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-gray-400">Sem bônus adicionais</span>
                  </li>
                </ul>
                <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-green-50 text-green-800 mb-3">
                  EXPERIMENTE
                </div>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-400 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <Link
                    href={addUtmToUrl("https://full.sale/eMbtHp")}
                    className="relative block w-full bg-green-600 text-white font-bold py-3 md:py-4 rounded-lg hover:bg-green-500 transition-all text-center shadow-lg"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] group-hover:animate-[shine_1.5s_infinite]"></div>
                    <span className="relative">COMPRAR AGORA</span>
                  </Link>
                </div>
                <p className="text-center text-gray-600 font-medium text-sm mt-2">Frete fixo R$ 25,00</p>
              </div>
            </div>
          </div>

          {/* Garantias */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 mt-12 mb-8 bg-white rounded-2xl shadow-sm py-6 px-4 mx-auto max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="bg-green-50 p-2 rounded-full">
                <ShieldCheck className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-gray-700 font-medium">Garantia de 30 dias</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-50 p-2 rounded-full">
                <Lock className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-gray-700 font-medium">Pagamento seguro</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-50 p-2 rounded-full">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-gray-700 font-medium">Entrega para todo Brasil</span>
            </div>
          </div>

          {/* Bandeiras de Cartão */}
          <div className="flex justify-center items-center gap-8 mb-12 bg-white rounded-2xl shadow-sm py-5 px-8 mx-auto max-w-2xl">
            <Image
              src="/master.png"
              alt="Mastercard"
              width={45}
              height={30}
              className="w-auto h-8 object-contain opacity-90 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/visa.png"
              alt="Visa"
              width={45}
              height={30}
              className="w-auto h-8 object-contain opacity-90 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/hiper.png"
              alt="Hipercard"
              width={45}
              height={30}
              className="w-auto h-8 object-contain opacity-90 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/pix.png"
              alt="PIX"
              width={45}
              height={30}
              className="w-auto h-8 object-contain opacity-90 hover:opacity-100 transition-opacity"
            />
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
