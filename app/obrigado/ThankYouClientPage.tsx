"use client"

import Script from "next/script"
import Image from "next/image"
import { CheckCircle2, ShieldCheck, ArrowRight, Clock, Package, Smartphone, FileText } from "lucide-react"

export default function ThankYouClientPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      {/* Header - Same as landing page */}
      <header className="w-full bg-gradient-to-r from-green-800 via-green-700 to-green-800 py-4 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] animate-[shine_1.5s_infinite] pointer-events-none"></div>
        <div className="mx-auto max-w-5xl px-4 flex justify-center">
          <Image src="/logo2.png" alt="Definamax" width={200} height={60} className="h-12 w-auto" />
        </div>
      </header>

      <main className="flex-1 w-full">
        {/* Thank You Hero Section */}
        <section className="w-full bg-gradient-to-b from-green-50 to-white py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <div className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Pedido Confirmado
            </div>

            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Obrigado pela sua compra!</h1>

            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              Seu pedido foi recebido com sucesso e está sendo processado. Em breve você receberá um e-mail com os
              detalhes da sua compra.
            </p>

            <div className="inline-flex items-center bg-green-50 px-3 py-1 rounded-lg mb-6">
              <ShieldCheck className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm font-medium">Compra 100% segura e protegida</span>
            </div>
          </div>
        </section>

        {/* Order Details */}
        <section className="w-full py-8 bg-white">
          <div className="mx-auto max-w-5xl px-4">
            <div className="bg-green-50 border border-green-100 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Detalhes do Pedido</h2>

              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Status do Pedido</h3>
                  <p className="text-green-600 font-medium">Confirmado</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <Package className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Prazo de Entrega</h3>
                  <p className="text-gray-700">5-7 dias úteis</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <FileText className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Nota Fiscal</h3>
                  <p className="text-gray-700">Será enviada por e-mail</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="w-full py-12 bg-green-50">
          <div className="mx-auto max-w-5xl px-4">
            <div className="text-center mb-10">
              <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                Próximos Passos
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">O que acontece agora?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Aqui está o que você pode esperar nos próximos dias</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Processamento</h3>
                  <p className="text-gray-600 mb-4">
                    Seu pedido será processado em até 24 horas. Você receberá um e-mail de confirmação com os detalhes
                    da compra.
                  </p>
                  <div className="flex items-center text-green-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">Dentro de 24 horas</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Envio</h3>
                  <p className="text-gray-600 mb-4">
                    Assim que seu pedido for enviado, você receberá um código de rastreamento para acompanhar a entrega.
                  </p>
                  <div className="flex items-center text-green-600">
                    <Package className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">Em até 48 horas</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Entrega</h3>
                  <p className="text-gray-600 mb-4">
                    Seu Definamax será entregue em sua casa. Lembre-se de verificar se há alguém para receber.
                  </p>
                  <div className="flex items-center text-green-600">
                    <ShieldCheck className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">5-7 dias úteis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Instructions */}
        <section className="w-full py-12 bg-white">
          <div className="mx-auto max-w-5xl px-4">
            <div className="text-center mb-10">
              <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                Como Usar
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Instruções de Uso</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Para obter os melhores resultados com o Definamax, siga estas recomendações
              </p>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-6 mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Modo de Uso</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Tome 2 cápsulas por dia, preferencialmente 30 minutos antes do almoço</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Beba pelo menos 2 litros de água por dia para potencializar os resultados</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Para melhores resultados, mantenha uma alimentação equilibrada</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Pratique atividade física regularmente, mesmo que seja uma caminhada leve</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Resultados Esperados</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Primeiros 7 dias: Redução da fome e da compulsão alimentar</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>15-30 dias: Primeiros resultados visíveis na balança</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>30-60 dias: Redução significativa de medidas e peso</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>90 dias: Transformação completa e resultados duradouros</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="w-full py-12 bg-green-50">
          <div className="mx-auto max-w-5xl px-4">
            <div className="text-center mb-8">
              <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                Suporte
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Estamos aqui para ajudar</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Se você tiver qualquer dúvida ou precisar de assistência, nossa equipe está pronta para atendê-lo
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 rounded-full p-3 mr-4">
                    <Smartphone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">WhatsApp</h3>
                    <p className="text-gray-600">Atendimento rápido e direto</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Para dúvidas sobre seu pedido, uso do produto ou qualquer outra informação, fale conosco pelo
                  WhatsApp.
                </p>
                <a
                  href="https://wa.link/qbqegi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 w-full"
                >
                  Falar com Atendimento <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>

              <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 rounded-full p-3 mr-4">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">E-mail</h3>
                    <p className="text-gray-600">Suporte por e-mail</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Para questões mais detalhadas ou envio de documentos, você pode entrar em contato através do nosso
                  e-mail.
                </p>
                <a
                  href="mailto:sac@bourjun.com.br"
                  className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 w-full"
                >
                  Enviar E-mail <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Same as landing page */}
      <footer className="w-full bg-green-800 text-white">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Image src="/logo2.png" alt="Definamax" width={150} height={50} className="h-10 w-auto mb-4" />
              <p className="text-sm text-green-100 mb-4">
                Definamax é um suplemento 100% natural para emagrecimento saudável e duradouro.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-green-100 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-green-100 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Informações</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-sm">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-sm">
                    Como funciona
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-sm">
                    Ingredientes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-sm">
                    Estudos científicos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-sm">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Suporte</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-sm">
                    Perguntas frequentes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-sm">
                    Política de privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-sm">
                    Termos de uso
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-sm">
                    Política de devolução
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-sm">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Contato</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-green-100 text-sm">sac@bourjun.com.br</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-green-100 text-sm">(41) 98454-9172</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <span className="text-green-100 text-sm">Av. Luiz Boiteux Piazza - Florianópolis/SC</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-green-700 mt-8 pt-8 text-center">
            <p className="text-sm mb-4">© {new Date().getFullYear()} Definamax. Todos os direitos reservados.</p>
            <p className="text-xs mb-2">Este produto não substitui o acompanhamento de profissionais de saúde.</p>
            <p className="text-xs mb-2"> *Resultados podem variar de pessoa para pessoa.</p>
          </div>
        </div>
      </footer>

      {/* Google Analytics */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-RTEPB48RDY" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-RTEPB48RDY');
        `}
      </Script>

      {/* Google Ads Conversion Tracking */}
      <Script id="google-ads-conversion" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {
            'send_to': 'AW-632000271/jO6vCIOx2NQBEI-erq0C',
            'value': 1.0,
            'currency': 'BRL',
            'transaction_id': ''
          });
        `}
      </Script>
    </div>
  )
}
