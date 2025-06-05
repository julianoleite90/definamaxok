"use client"

import Script from "next/script"
import Image from "next/image"
import { CheckCircle2, Trophy, Target, Zap, Clock, Package, Smartphone, FileText, Star, TrendingUp, Award } from "lucide-react"

export default function ThankYouSportsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 py-4 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] animate-[shine_1.5s_infinite] pointer-events-none"></div>
        <div className="mx-auto max-w-5xl px-4 flex justify-center">
          <Image src="/logo2.png" alt="Definamax" width={200} height={60} className="h-12 w-auto" />
        </div>
      </header>

      <main className="flex-1 w-full">
        {/* Hero Section - Esportivo */}
        <section className="w-full bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/sports-pattern.svg')] opacity-10"></div>
          <div className="mx-auto max-w-5xl px-4 text-center relative z-10">
            <div className="inline-block bg-yellow-400 text-blue-900 px-6 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
              🏆 COMPRA CONFIRMADA
            </div>

            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl">
                  <Trophy className="h-16 w-16 text-blue-900" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              VOCÊ ESTÁ PRONTO<br />
              <span className="text-yellow-400">PARA DOMINAR!</span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto font-medium">
              Seu Definamax está a caminho! Prepare-se para sentir mais energia, resistência e performance nos seus treinos.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">MAIS ENERGIA</h3>
                <p className="text-blue-100 text-sm">Sinta-se mais disposto para treinar intensamente</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <Target className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">FOCO TOTAL</h3>
                <p className="text-blue-100 text-sm">Concentração máxima para atingir seus objetivos</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <TrendingUp className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">PERFORMANCE</h3>
                <p className="text-blue-100 text-sm">Melhore seus resultados e quebre recordes pessoais</p>
              </div>
            </div>
          </div>
        </section>

        {/* Status do Pedido - Esportivo */}
        <section className="w-full py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="mx-auto max-w-5xl px-4">
            <div className="text-center mb-10">
              <div className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
                STATUS DA SUA JORNADA
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Seu Pedido em Ação</h2>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8 mb-8 shadow-lg">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">CONFIRMADO ✅</h3>
                  <p className="text-blue-600 font-medium">Pedido aprovado</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">ENTREGA RÁPIDA ⚡</h3>
                  <p className="text-gray-700">5-7 dias úteis</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">GARANTIA TOTAL 🛡️</h3>
                  <p className="text-gray-700">30 dias de proteção</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Plano de Treino - Esportivo */}
        <section className="w-full py-16 bg-gradient-to-br from-blue-600 to-indigo-700">
          <div className="mx-auto max-w-5xl px-4">
            <div className="text-center mb-12">
              <div className="inline-block bg-yellow-400 text-blue-900 px-4 py-1 rounded-full text-sm font-bold mb-4">
                PROTOCOLO DE CAMPEÃO
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Sua Estratégia Vencedora</h2>
              <p className="text-blue-100 max-w-2xl mx-auto text-lg">
                Siga este protocolo e maximize seus resultados esportivos
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                    <Zap className="h-6 w-6 text-blue-900" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">PRÉ-TREINO</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start text-blue-100">
                    <Star className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Tome 2 cápsulas 30 minutos antes do treino</span>
                  </li>
                  <li className="flex items-start text-blue-100">
                    <Star className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Hidrate-se bem com 500ml de água</span>
                  </li>
                  <li className="flex items-start text-blue-100">
                    <Star className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Faça um aquecimento dinâmico de 10 minutos</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                    <Trophy className="h-6 w-6 text-blue-900" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">RESULTADOS</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start text-blue-100">
                    <Star className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Semana 1-2: Mais energia e disposição</span>
                  </li>
                  <li className="flex items-start text-blue-100">
                    <Star className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Semana 3-4: Melhora na resistência</span>
                  </li>
                  <li className="flex items-start text-blue-100">
                    <Star className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Mês 2-3: Performance máxima atingida</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Suporte - Esportivo */}
        <section className="w-full py-16 bg-white">
          <div className="mx-auto max-w-5xl px-4">
            <div className="text-center mb-12">
              <div className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
                SUPORTE DE CAMPEÃO
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Nossa Equipe Está com Você</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Assim como um técnico de elite, estamos aqui para apoiar sua jornada
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-600 rounded-full p-4 mr-6">
                    <Smartphone className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">WhatsApp VIP 🏆</h3>
                    <p className="text-blue-600 font-medium">Atendimento exclusivo</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 text-lg">
                  Dúvidas sobre treino, uso do produto ou estratégias? Nossa equipe especializada está pronta!
                </p>
                <a
                  href="https://wa.link/qbqegi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 text-lg font-bold text-white hover:from-blue-700 hover:to-cyan-700 w-full shadow-lg transform hover:scale-105 transition-all"
                >
                  FALAR COM ESPECIALISTA ⚡
                </a>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <div className="bg-yellow-500 rounded-full p-4 mr-6">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">E-mail Técnico 📧</h3>
                    <p className="text-yellow-600 font-medium">Suporte detalhado</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 text-lg">
                  Para questões técnicas ou envio de relatórios de progresso, use nosso e-mail especializado.
                </p>
                <a
                  href="mailto:sac@bourjun.com.br"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4 text-lg font-bold text-white hover:from-yellow-600 hover:to-orange-600 w-full shadow-lg transform hover:scale-105 transition-all"
                >
                  ENVIAR E-MAIL 🚀
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Esportivo */}
      <footer className="w-full bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 text-white">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="text-center">
            <Image src="/logo2.png" alt="Definamax" width={150} height={50} className="h-10 w-auto mb-4 mx-auto" />
            <p className="text-blue-100 mb-4 text-lg font-medium">
              🏆 Definamax - Sua fonte de energia para a vitória
            </p>
            <p className="text-xs text-blue-200 mb-2">© {new Date().getFullYear()} Definamax. Todos os direitos reservados.</p>
            <p className="text-xs text-blue-200">💪 Resultados podem variar. Mantenha sempre uma rotina de treinos.</p>
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
              'event_type': 'sports'
            }
          });
        `}
      </Script>
    </div>
  )
} 