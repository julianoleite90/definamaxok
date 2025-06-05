"use client"

import Script from "next/script"
import Image from "next/image"
import { CheckCircle2, Star, Music, Sparkles, Clock, Package, Smartphone, FileText, Heart, Mic, PartyPopper } from "lucide-react"

export default function ThankYouShowPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-purple-900 via-pink-800 to-red-900">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 py-4 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] animate-[shine_1.5s_infinite] pointer-events-none"></div>
        <div className="mx-auto max-w-5xl px-4 flex justify-center">
          <Image src="/logo2.png" alt="Definamax" width={200} height={60} className="h-12 w-auto" />
        </div>
      </header>

      <main className="flex-1 w-full">
        {/* Hero Section - Show */}
        <section className="w-full bg-gradient-to-b from-purple-600 via-pink-500 to-red-400 py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/music-notes.svg')] opacity-10"></div>
          <div className="absolute inset-0">
            <div className="animate-pulse bg-gradient-to-r from-yellow-400/20 via-pink-400/20 to-purple-400/20 h-full w-full"></div>
          </div>
          <div className="mx-auto max-w-5xl px-4 text-center relative z-10">
            <div className="inline-block bg-yellow-400 text-purple-900 px-6 py-2 rounded-full text-sm font-bold mb-6 shadow-lg animate-bounce">
              🎉 SHOW! COMPRA CONFIRMADA!
            </div>

            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                  <Sparkles className="h-16 w-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-spin">
                  <Star className="h-3 w-3 text-purple-900" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              VOCÊ VAI<br />
              <span className="text-yellow-400 animate-pulse">BRILHAR! ✨</span>
            </h1>

            <p className="text-xl md:text-2xl text-pink-100 mb-8 max-w-3xl mx-auto font-medium">
              Seu Definamax está chegando! Prepare-se para se sentir confiante, radiante e pronto para qualquer palco da vida.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                <Music className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">MAIS CONFIANÇA</h3>
                <p className="text-pink-100 text-sm">Sinta-se seguro e radiante em qualquer ocasião</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                <Heart className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">AUTOESTIMA ALTA</h3>
                <p className="text-pink-100 text-sm">Reconquiste sua autoestima e amor próprio</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                <PartyPopper className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">ENERGIA PRA FESTA</h3>
                <p className="text-pink-100 text-sm">Disposição para curtir cada momento especial</p>
              </div>
            </div>
          </div>
        </section>

        {/* Status do Pedido - Show */}
        <section className="w-full py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="mx-auto max-w-5xl px-4">
            <div className="text-center mb-10">
              <div className="inline-block bg-purple-100 text-purple-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
                🎭 SEU SHOW JÁ COMEÇOU
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Acompanhe sua Transformação</h2>
            </div>

            <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-red-50 border-2 border-purple-200 rounded-2xl p-8 mb-8 shadow-lg">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">CONFIRMADO! ✨</h3>
                  <p className="text-purple-600 font-medium">Pedido aprovado</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-pink-500">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-6 w-6 text-pink-600" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">ENTREGA VIP 🚀</h3>
                  <p className="text-gray-700">5-7 dias úteis</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">GARANTIA GOLD 👑</h3>
                  <p className="text-gray-700">30 dias de proteção</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rotina de Estrela */}
        <section className="w-full py-16 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600">
          <div className="mx-auto max-w-5xl px-4">
            <div className="text-center mb-12">
              <div className="inline-block bg-yellow-400 text-purple-900 px-4 py-1 rounded-full text-sm font-bold mb-4">
                🌟 ROTINA DE ESTRELA
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Seu Plano de Transformação</h2>
              <p className="text-pink-100 max-w-2xl mx-auto text-lg">
                Siga esta rotina e brilhe como nunca antes
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                    <Sparkles className="h-6 w-6 text-purple-900" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">RITUAL MATINAL</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start text-pink-100">
                    <Star className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Tome 2 cápsulas ao acordar com água gelada</span>
                  </li>
                  <li className="flex items-start text-pink-100">
                    <Star className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Pratique 5 minutos de afirmações positivas</span>
                  </li>
                  <li className="flex items-start text-pink-100">
                    <Star className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Dance sua música favorita por 10 minutos</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                    <Mic className="h-6 w-6 text-purple-900" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">RESULTADOS</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start text-pink-100">
                    <Star className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Semana 1-2: Mais energia e brilho</span>
                  </li>
                  <li className="flex items-start text-pink-100">
                    <Star className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Semana 3-4: Autoestima renovada</span>
                  </li>
                  <li className="flex items-start text-pink-100">
                    <Star className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Mês 2-3: Confiança de estrela</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Suporte VIP */}
        <section className="w-full py-16 bg-white">
          <div className="mx-auto max-w-5xl px-4">
            <div className="text-center mb-12">
              <div className="inline-block bg-purple-100 text-purple-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
                💎 SUPORTE VIP
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Atendimento de Primeira Classe</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Como uma verdadeira estrela, você merece um atendimento especial
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-4 mr-6">
                    <Smartphone className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">WhatsApp Exclusivo 💜</h3>
                    <p className="text-purple-600 font-medium">Atendimento estrela</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 text-lg">
                  Dúvidas sobre beleza, autoestima ou o produto? Nossa equipe VIP está aqui para você brilhar!
                </p>
                <a
                  href="https://wa.link/qbqegi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-lg font-bold text-white hover:from-purple-700 hover:to-pink-700 w-full shadow-lg transform hover:scale-105 transition-all"
                >
                  FALAR COM NOSSA EQUIPE ✨
                </a>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full p-4 mr-6">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">E-mail Premium 📨</h3>
                    <p className="text-yellow-600 font-medium">Suporte detalhado</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 text-lg">
                  Para dúvidas mais detalhadas ou compartilhar sua transformação, use nosso canal premium.
                </p>
                <a
                  href="mailto:sac@bourjun.com.br"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4 text-lg font-bold text-white hover:from-yellow-600 hover:to-orange-600 w-full shadow-lg transform hover:scale-105 transition-all"
                >
                  ENVIAR E-MAIL 🌟
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Show */}
      <footer className="w-full bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 text-white">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="text-center">
            <Image src="/logo2.png" alt="Definamax" width={150} height={50} className="h-10 w-auto mb-4 mx-auto" />
            <p className="text-purple-100 mb-4 text-lg font-medium">
              ✨ Definamax - Sua parceira para brilhar
            </p>
            <p className="text-xs text-purple-200 mb-2">© {new Date().getFullYear()} Definamax. Todos os direitos reservados.</p>
            <p className="text-xs text-purple-200">🌟 Você merece se sentir especial todos os dias.</p>
          </div>
        </div>
      </footer>

      {/* Scripts de Tracking */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-RTEPB48RDY" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-RTEPB48RDY');
        `}
      </Script>

      <Script id="google-ads-conversion" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {
            'send_to': 'AW-632000271/jO6vCIOx2NQBEI-erq0C',
            'value': 1.0,
            'currency': 'BRL',
            'transaction_id': '',
            'custom_parameters': {
              'event_type': 'entertainment'
            }
          });
        `}
      </Script>
    </div>
  )
} 