"use client"

import Image from "next/image"
import { ShieldCheck, Clock, Shield, CheckCircle2, FileText } from "lucide-react"

export default function WarrantyTermsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-green-800 via-green-700 to-green-800 py-4 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] animate-[shine_1.5s_infinite] pointer-events-none"></div>
        <div className="mx-auto max-w-5xl px-4 flex justify-center">
          <Image src="/logo2.png" alt="Definamax" width={200} height={60} className="h-12 w-auto" />
        </div>
      </header>

      {/* Main Content */}
      <section className="w-full py-8 md:py-12 bg-white">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Termos de Garantia</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conheça os detalhes sobre nossa política de garantia e devolução
            </p>
          </div>

          {/* Introduction Section */}
          <div className="bg-green-50 p-4 md:p-6 rounded-lg border border-green-100 shadow-sm mb-8 md:mb-10">
            <div className="flex items-start">
              <div className="bg-white p-2 rounded-full mr-3 md:mr-4 flex-shrink-0">
                <FileText className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Compromisso com sua satisfação</h2>
                <p className="text-sm md:text-base text-gray-700">
                  Na Definamax, acreditamos que a confiança de nossos clientes é nosso maior patrimônio. Por isso,
                  oferecemos uma política de garantia transparente e justa, que assegura sua total satisfação com nossos
                  produtos. Nosso compromisso vai além do que determina a legislação, pois queremos que você tenha a
                  melhor experiência possível.
                </p>
                <p className="text-sm md:text-base text-gray-700 mt-2">
                  Abaixo, detalhamos todas as informações sobre nossas garantias, procedimentos de devolução e
                  reembolso. Caso tenha qualquer dúvida após a leitura, nossa equipe de atendimento está à disposição
                  para ajudá-lo através dos nossos canais de contato.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            {/* Garantia de Arrependimento */}
            <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row md:items-start">
                <div className="bg-green-100 p-2 rounded-full mb-3 md:mb-0 md:mr-4 self-start">
                  <Clock className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Garantia de Arrependimento</h2>
                  <p className="text-sm md:text-base text-gray-700">
                    De acordo com o Código de Defesa do Consumidor (Lei nº 8.078/90), o cliente tem o direito de
                    solicitar o cancelamento da compra em até 7 (sete) dias corridos a partir da data de recebimento do
                    produto. Este direito está previsto no artigo 49 do CDC, que estabelece o direito de arrependimento
                    para compras realizadas fora do estabelecimento comercial, como é o caso de compras online.
                  </p>
                  <div className="mt-3 text-xs md:text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                    <p>
                      <strong>Base Legal:</strong> Art. 49 do CDC - "O consumidor pode desistir do contrato, no prazo de
                      7 dias a contar de sua assinatura ou do ato de recebimento do produto ou serviço, sempre que a
                      contratação de fornecimento de produtos e serviços ocorrer fora do estabelecimento comercial,
                      especialmente por telefone ou a domicílio."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Garantia de Satisfação */}
            <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row md:items-start">
                <div className="bg-green-100 p-2 rounded-full mb-3 md:mb-0 md:mr-4 self-start">
                  <ShieldCheck className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Garantia de Satisfação</h2>
                  <p className="text-sm md:text-base text-gray-700">
                    Além da garantia legal, oferecemos uma garantia de satisfação de 30 (trinta) dias após a compra,
                    válida exclusivamente para compras de 1 (um) frasco. Esta garantia representa nosso compromisso com
                    a qualidade do produto e a satisfação dos nossos clientes.
                  </p>
                  <div className="mt-3 bg-green-50 p-3 md:p-4 rounded-md border border-green-100">
                    <h3 className="font-medium text-green-800 mb-2 text-sm md:text-base">
                      Como solicitar a garantia de satisfação:
                    </h3>
                    <ol className="list-decimal pl-4 md:pl-5 space-y-1 md:space-y-2 text-sm md:text-base text-gray-700">
                      <li>
                        Envie um e-mail para <span className="font-medium">sac@bourjun.com.br</span> com o assunto:{" "}
                        <span className="font-medium">"Garantia de satisfação"</span>
                      </li>
                      <li>Anexe a nota fiscal do produto</li>
                      <li>Informe o motivo da insatisfação (opcional, mas recomendado)</li>
                      <li>Aguarde o retorno da nossa equipe em até 48 horas úteis</li>
                    </ol>
                  </div>
                  <p className="mt-3 text-xs md:text-sm text-gray-600">
                    <strong>Observação:</strong> A garantia de satisfação é um benefício adicional oferecido pela
                    empresa, não substituindo as garantias legais previstas no Código de Defesa do Consumidor.
                  </p>
                </div>
              </div>
            </div>

            {/* Trocas por Defeitos */}
            <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row md:items-start">
                <div className="bg-green-100 p-2 rounded-full mb-3 md:mb-0 md:mr-4 self-start">
                  <Shield className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Trocas por Defeitos ou Vícios</h2>
                  <p className="text-sm md:text-base text-gray-700">
                    Trocas por defeitos ou vícios no produto são realizadas sem custo adicional para o cliente, conforme
                    previsto no Código de Defesa do Consumidor. Caso o produto apresente qualquer problema de
                    fabricação, embalagem danificada ou qualquer outro vício que comprometa sua qualidade ou eficácia, o
                    cliente tem direito à substituição do produto.
                  </p>
                  <div className="mt-3 bg-green-50 p-3 md:p-4 rounded-md border border-green-100">
                    <h3 className="font-medium text-green-800 mb-2 text-sm md:text-base">
                      Procedimento para solicitação de troca:
                    </h3>
                    <ol className="list-decimal pl-4 md:pl-5 space-y-1 md:space-y-2 text-sm md:text-base text-gray-700">
                      <li>
                        Entre em contato com nosso SAC pelo e-mail{" "}
                        <span className="font-medium">sac@bourjun.com.br</span> com o assunto:{" "}
                        <span className="font-medium">"Solicitação de troca por defeito"</span>
                      </li>
                      <li>Anexe fotos do produto com o defeito ou vício identificado</li>
                      <li>Anexe a nota fiscal de compra</li>
                      <li>Nossa equipe analisará o caso e retornará com as instruções para a troca</li>
                    </ol>
                  </div>
                  <p className="mt-3 text-xs md:text-sm text-gray-600">
                    <strong>Base Legal:</strong> Art. 18 do CDC - "Os fornecedores de produtos de consumo duráveis ou
                    não duráveis respondem solidariamente pelos vícios de qualidade ou quantidade que os tornem
                    impróprios ou inadequados ao consumo a que se destinam ou lhes diminuam o valor, assim como por
                    aqueles decorrentes da disparidade, com as indicações constantes do recipiente, da embalagem,
                    rotulagem ou mensagem publicitária, respeitadas as variações decorrentes de sua natureza, podendo o
                    consumidor exigir a substituição das partes viciadas."
                  </p>
                </div>
              </div>
            </div>

            {/* Condições Gerais */}
            <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row md:items-start">
                <div className="bg-green-100 p-2 rounded-full mb-3 md:mb-0 md:mr-4 self-start">
                  <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Condições Gerais</h2>
                  <div className="space-y-3 text-sm md:text-base text-gray-700">
                    <p>
                      <strong>1. Prazo para Análise:</strong> Todas as solicitações de garantia, devolução ou troca
                      serão analisadas em até 5 (cinco) dias úteis após o recebimento da solicitação completa com todos
                      os documentos necessários.
                    </p>
                    <p>
                      <strong>2. Reembolso:</strong> Em caso de devolução aprovada, o reembolso será processado em até
                      10 (dez) dias úteis, na mesma forma de pagamento utilizada na compra, conforme previsto no artigo
                      49, parágrafo único, do CDC. O reembolso será realizado exclusivamente no CPF correspondente à
                      compra realizada e o método de reembolso será obrigatoriamente o mesmo utilizado para o pagamento
                      original (cartão de crédito, boleto, PIX, etc.).
                    </p>
                    <p>
                      <strong>3. Estado do Produto:</strong> Para exercer o direito de arrependimento ou a garantia de
                      satisfação, o produto deve estar em condições adequadas, preferencialmente na embalagem original,
                      com todos os acessórios e componentes recebidos.
                    </p>
                    <p>
                      <strong>4. Frete de Devolução:</strong> Em casos de arrependimento (7 dias) ou garantia de
                      satisfação (30 dias), o custo do frete de devolução será por conta da empresa. Em casos de troca
                      por defeito, tanto o frete de devolução quanto o de envio do novo produto serão por conta da
                      empresa.
                    </p>
                    <p>
                      <strong>5. Limitações:</strong> A garantia de satisfação de 30 dias é válida apenas para a compra
                      de 1 (um) frasco. Para compras de kits promocionais (3 ou 6 frascos), aplica-se apenas a garantia
                      legal de 7 dias prevista no CDC.
                    </p>
                    <p>
                      <strong>6. Documentação Necessária:</strong> Para qualquer solicitação de garantia, é
                      imprescindível a apresentação da nota fiscal de compra. Solicitações sem este documento poderão
                      ser recusadas.
                    </p>
                    <p>
                      <strong>7. Casos Omissos:</strong> Situações não previstas nestes termos serão analisadas
                      individualmente pela equipe jurídica da empresa, sempre em conformidade com a legislação vigente e
                      buscando a melhor solução para o cliente.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Disposições Finais */}
            <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Disposições Finais</h2>
              <div className="space-y-3 text-sm md:text-base text-gray-700">
                <p>
                  Os presentes Termos de Garantia estão em conformidade com o Código de Defesa do Consumidor (Lei nº
                  8.078/90) e demais legislações aplicáveis. A empresa se reserva o direito de alterar estes termos a
                  qualquer momento, sendo as alterações aplicáveis apenas para compras realizadas após a data de
                  modificação.
                </p>
                <p>
                  Ao realizar uma compra em nosso site, o cliente declara estar ciente e de acordo com todos os termos e
                  condições aqui estabelecidos. Recomendamos a leitura integral deste documento antes de finalizar
                  qualquer compra.
                </p>
                <p>
                  Para esclarecimentos adicionais ou dúvidas sobre nossa política de garantia, entre em contato com
                  nosso Serviço de Atendimento ao Cliente através do e-mail{" "}
                  <span className="font-medium">sac@bourjun.com.br</span> ou pelo telefone{" "}
                  <span className="font-medium">(41) 98454-9172</span>, de segunda a sexta-feira, das 9h às 18h.
                </p>
                <p className="text-xs md:text-sm text-gray-500 mt-4">
                  Última atualização: {new Date().toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rodapé expandido */}
      <footer className="w-full bg-green-800 text-white">
        <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <Image src="/logo2.png" alt="Definamax" width={150} height={50} className="h-10 w-auto mb-4" />
              <p className="text-xs md:text-sm text-green-100 mb-4">
                Definamax é um suplemento 100% natural para emagrecimento saudável e duradouro.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-green-100 hover:text-white">
                  <svg className="h-5 w-5 md:h-6 md:w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-green-100 hover:text-white">
                  <svg className="h-5 w-5 md:h-6 md:w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">Informações</h3>
              <ul className="space-y-1 md:space-y-2">
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-xs md:text-sm">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-xs md:text-sm">
                    Como funciona
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-xs md:text-sm">
                    Ingredientes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-xs md:text-sm">
                    Estudos científicos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-xs md:text-sm">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">Suporte</h3>
              <ul className="space-y-1 md:space-y-2">
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-xs md:text-sm">
                    Perguntas frequentes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-xs md:text-sm">
                    Política de privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-xs md:text-sm">
                    Termos de uso
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-xs md:text-sm">
                    Política de devolução
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white text-xs md:text-sm">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">Contato</h3>
              <ul className="space-y-1 md:space-y-2">
                <li className="flex items-start">
                  <svg
                    className="h-4 w-4 md:h-5 md:w-5 mr-2 mt-0.5"
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
                  <span className="text-green-100 text-xs md:text-sm">sac@bourjun.com.br</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-4 w-4 md:h-5 md:w-5 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-green-100 text-xs md:text-sm">(41) 98454-9172</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-4 w-4 md:h-5 md:w-5 mr-2 mt-0.5"
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
                  <span className="text-green-100 text-xs md:text-sm">Av. Luiz Boiteux Piazza - Florianópolis/SC</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-green-700 mt-6 md:mt-8 pt-6 md:pt-8 text-center">
            <p className="text-xs md:text-sm mb-3 md:mb-4">
              © {new Date().getFullYear()} Definamax. Todos os direitos reservados.
            </p>
            <p className="text-xs mb-1 md:mb-2">
              Este produto não substitui o acompanhamento de profissionais de saúde.
            </p>
            <p className="text-xs mb-1 md:mb-2"> *Resultados podem variar de pessoa para pessoa.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
