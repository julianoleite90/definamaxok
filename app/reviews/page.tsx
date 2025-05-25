"use client"
import Image from "next/image"
import { Star, ShieldCheck, ArrowRight } from "lucide-react"
import { useState } from "react"

export default function Reviews() {
  // Estado para controlar a exibição de mais avaliações
  const [showMoreReviews, setShowMoreReviews] = useState(false)

  // Função para alternar a exibição de mais avaliações
  const toggleMoreReviews = () => {
    setShowMoreReviews(!showMoreReviews)
  }

  return (
    <section className="w-full py-8 bg-green-50" aria-label="Avaliações do Definamax">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Avaliações de consumidores</h2>
          <p className="text-gray-600 max-w-2xl mx-auto"></p>
        </div>

        <div className="mb-8 flex items-center justify-center">
          <div className="flex items-center mr-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-xl font-bold">4.9/5</span>
          </div>
          <span className="text-gray-600">Baseado em 3.842 avaliações verificadas</span>
        </div>

        <div className="space-y-6">
          {/* Avaliações iniciais - primeiras 5 */}
          <div>
            {/* Avaliação Nova 1 */}
            <div className="border border-gray-200 rounded-lg p-6 mb-6 hover:border-green-200 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <h4 className="font-semibold">Valeu cada centavo!</h4>
                </div>
                <div className="text-sm text-gray-500">05/05/2025</div>
              </div>
              <p className="text-gray-700 mb-4">
                Tava desconfiada, porque já tentei várias coisas pra emagrecer e nada dava certo. O Definamax demorou
                umas semanas pra fazer efeito, mas perdi 8kg em 2 meses. Não é milagre, tem que tomar direitinho e
                cuidar da comida, mas me ajudou a não beliscar besteira no trabalho.
              </p>
              <div className="flex gap-2 mb-4">
                <Image
                  src="/review5.png"
                  alt="Foto da avaliação"
                  width={100}
                  height={100}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                  <Image
                    src="/review5.png"
                    alt="Mariana C."
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium">Mariana C. • Cliente Verificado</span>
              </div>
            </div>

            {/* Avaliação Nova 2 */}
            <div className="border border-gray-200 rounded-lg p-6 mb-6 hover:border-green-200 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <h4 className="font-semibold">Acabou com minha barriga de churrasco e cerveja</h4>
                </div>
                <div className="text-sm text-gray-500">28/04/2025</div>
              </div>
              <p className="text-gray-700 mb-4">
                Todo fim de semana era churrasco com os amigos, e a barriga só crescia. Tava até evitando camiseta
                justa. Comprei o Definamax porque era mais em conta que nutricionista. Em 3 meses, perdi 9kg e agora
                consigo jogar uma pelada sem passar vergonha. Tô mais leve e com disposição!
              </p>
              <div className="flex gap-2 mb-4">
                <Image
                  src="/review6.png"
                  alt="Foto da avaliação"
                  width={100}
                  height={100}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                  <Image
                    src="/review6.png"
                    alt="Rosimari M."
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium">Lucas. • Cliente Verificado</span>
              </div>
            </div>

            {/* Avaliação 1 */}
            <div className="border border-gray-200 rounded-lg p-6 mb-6 hover:border-green-200 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <h4 className="font-semibold">Tô me sentindo mais leve!</h4>
                </div>
                <div className="text-sm text-gray-500">12/03/2025</div>
              </div>
              <p className="text-gray-700 mb-4">
                "Eu sempre lutei com o peso e com vontade de comer besteira o tempo todo. Com o Definamax, em 4 meses
                consegui perder 12kg. Não foi fácil no começo, porque às vezes esquecia de tomar, mas depois que
                peguei o jeito, senti que comia menos e tinha mais energia. Tô feliz com o progresso!"
              </p>
              <div className="flex gap-2 mb-4">
                <Image
                  src="/revi1.jpeg"
                  alt="Foto da avaliação"
                  width={100}
                  height={100}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                  <Image
                    src="/revi1.jpeg"
                    alt="Juliana."
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium">Renata • Cliente Verificado</span>
              </div>
            </div>

            {/* Avaliação 2 */}
            <div className="border border-gray-200 rounded-lg p-6 mb-6 hover:border-green-200 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <h4 className="font-semibold">Finalmente algo que não me deu problema!</h4>
                </div>
                <div className="text-sm text-gray-500">28/02/2025</div>
              </div>
              <p className="text-gray-700 mb-4">
                "Tentei umas injeções pra emagrecer, mas me davam náusea e dor de cabeça. O Definamax foi diferente, é
                natural e não senti nada ruim. Perdi 9kg em 3 meses, e minha pressão, que tava alta, tá bem melhor.
                Não é rápido como prometem por aí, mas funcionou pra mim!"
              </p>
              <div className="flex gap-2 mb-4">
                <Image
                  src="/2depois.png"
                  alt="Foto da avaliação"
                  width={100}
                  height={100}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                  <Image
                    src="/daniele.png"
                    alt="Roberto S."
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium">Daniele T. • Cliente Verificado</span>
              </div>
            </div>

            {/* Avaliação 3 - Masculina */}
            <div className="border border-gray-200 rounded-lg p-6 mb-6 hover:border-green-200 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <h4 className="font-semibold">Voltei a jogar bola com os amigos!</h4>
                </div>
                <div className="text-sm text-gray-500">15/02/2025</div>
              </div>
              <p className="text-gray-700 mb-4">
                "Depois de engordar na pandemia, tava difícil até subir escada. O Definamax me ajudou a perder 11kg em
                3 meses. Não virei atleta, mas agora consigo jogar uma pelada com os amigos sem passar vergonha. Minha
                esposa tá feliz com a mudança, e eu também!"
              </p>
              <div className="flex gap-2 mb-4">
                <Image
                  src="/ricardo.png"
                  alt="Foto da avaliação"
                  width={100}
                  height={100}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                  <Image
                    src="/rica.png"
                    alt="Ricardo M."
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium">Ricardo M. • Cliente Verificado</span>
              </div>
            </div>

            {/* Avaliação 4 */}
            <div className="border border-gray-200 rounded-lg p-6 mb-6 hover:border-green-200 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <h4 className="font-semibold">Me sinto muito melhor</h4>
                </div>
                <div className="text-sm text-gray-500">02/02/2025</div>
              </div>
              <p className="text-gray-700 mb-4">
                "Depois do meu filho, tava impossível voltar ao peso de antes. Tentei umas dietas, mas não tinha
                paciência. Com o Definamax, perdi 12kg em 3 meses e meio. Não fico mais tão ansiosa pra comer doce."
              </p>
              <div className="flex gap-2 mb-4">
                <Image
                  src="/revi3.jpeg"
                  alt="Foto da avaliação"
                  width={100}
                  height={100}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                  <Image
                    src="/revi3.jpeg"
                    alt="Patricia L."
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium">Patricia L. • Cliente Verificado</span>
              </div>
            </div>

            {/* Avaliação 5 - Masculina */}
            <div className="border border-gray-200 rounded-lg p-6 hover:border-green-200 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <h4 className="font-semibold">Não acreditava, mas funcionou!</h4>
                </div>
                <div className="text-sm text-gray-500">20/01/2025</div>
              </div>
              <p className="text-gray-700 mb-4">
                "Tava desconfiado, achando que era só mais um suplemento caro. Mas resolvi tentar o Definamax porque o
                preço tava bom. Perdi 8kg em 2 meses, e minha barriga tá bem menor. Ainda tenho que tomar direitinho
                pra não esquecer, mas tô gostando do resultado. Já indiquei pros amigos do trampo!"
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                  <Image
                    src="/andre.png"
                    alt="André T."
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium">André T. • Cliente Verificado</span>
              </div>
            </div>
          </div>

          {/* Avaliações adicionais - últimas 5 (inicialmente escondidas) */}
          {showMoreReviews && (
            <div>
              {/* Avaliação 6 - Masculina */}
              <div className="border border-gray-200 rounded-lg p-6 mb-6 hover:border-green-200 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <h4 className="font-semibold">Muito mais saúde!</h4>
                  </div>
                  <div className="text-sm text-gray-500">15/01/2025</div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Estava com pré-diabetes e o médico falou pra emagrecer urgente. Não tinha grana pra nutricionista
                  particular, então comprei o Definamax. Perdi 10kg em 3 meses, e meus exames melhoraram bastante. Não
                  é mágica, mas com um pouco de cuidado com a comida, fez diferença!"
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                    <Image
                      src="/fernando.png"
                      alt="Fernando D."
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">Fernando D. • Cliente Verificado</span>
                </div>
              </div>

              {/* Avaliação 7 */}
              <div className="border border-gray-200 rounded-lg p-6 mb-6 hover:border-green-200 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex mb-1">
                      {[1, 2, 3, 4, 5].map((star, index) =>
                        index < 5 ? (
                          <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ) : (
                          <Star key={star} className="h-5 w-5 text-gray-300 fill-gray-300" />
                        ),
                      )}
                    </div>
                    <h4 className="font-semibold">Deu um jeito na minha vontade de doce!</h4>
                  </div>
                  <div className="text-sm text-gray-500">05/01/2025</div>
                </div>
                <p className="text-gray-700 mb-4">
                  Sou mãe de dois, trabalho o dia todo e vivia beliscando chocolate pra aguentar o estresse. Tentei
                  várias dietas, mas nada durava. Com o Definamax, em 2 meses perdi 9kg e quase não sinto vontade de
                  doce. Me sinto mais leve pra correr atrás das crianças!
                </p>
                <div className="flex gap-2 mb-4">
                  <Image
                    src="/revi6.jpeg"
                    alt="Foto da avaliação"
                    width={100}
                    height={100}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                    <Image
                      src="/revi6.jpeg"
                      alt="Vanessa R."
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">Vanessa R. • Cliente Verificado</span>
                </div>
              </div>

              {/* Avaliação 8 */}
              <div className="border border-gray-200 rounded-lg p-6 mb-6 hover:border-green-200 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <h4 className="font-semibold">Voltei a usar minhas roupas antigas!</h4>
                  </div>
                  <div className="text-sm text-gray-500">22/12/2024</div>
                </div>
                <p className="text-gray-700 mb-4">
                  Depois da pandemia, engordei muito e tava me sentindo mal no trabalho, porque sou vendedora e a
                  aparência conta. O Definamax me ajudou a perder 8kg em 3 meses. Agora, consigo usar as roupas que
                  tava guardada no armário e me sinto mais confiante com os clientes!
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                    <Image
                      src="/review7.png"
                      alt="Amanda P."
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">Amanda P. • Cliente Verificado</span>
                </div>
              </div>

              {/* Avaliação 9 - Masculina */}
              <div className="border border-gray-200 rounded-lg p-6 mb-6 hover:border-green-200 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <h4 className="font-semibold">Menos inchaço e mais energia!</h4>
                  </div>
                  <div className="text-sm text-gray-500">10/12/2024</div>
                </div>
                <p className="text-gray-700 mb-4">
                  Trabalho como motorista de app e passo o dia sentado. Tava sempre inchado e cansado. Comprei o
                  Definamax porque não tinha grana pra academia ou injeções caras. Em 2 meses, perdi 7kg e o inchaço
                  sumiu. Tô com mais energia pra trabalhar e até pra brincar com meu filho!
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                    <Image
                      src="/review8.png"
                      alt="Marcelo F."
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">Marcelo F. • Cliente Verificado</span>
                </div>
              </div>

              {/* Avaliação 10 */}
              <div className="border border-gray-200 rounded-lg p-6 hover:border-green-200 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <h4 className="font-semibold">Me deu mais confiança no trabalho!</h4>
                  </div>
                  <div className="text-sm text-gray-500">01/12/2024</div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Sou vendedora numa loja de carros, e a aparência conta muito. Tava difícil emagrecer com a correria
                  do dia a dia. Com o Definamax, perdi 6kg em 2 meses e me sinto mais disposta. Meus colegas notaram a
                  diferença, e já indiquei pra várias amigas!"
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden mr-2">
                    <Image
                      src="/review9.png"
                      alt="Claudia S."
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">Claudia S. • Cliente Verificado</span>
                </div>
              </div>
            </div>
          )}

          {/* Botão "Ver Mais Avaliações" */}
          <div className="flex justify-center mt-8">
            <button
              onClick={toggleMoreReviews}
              className="inline-flex items-center justify-center rounded-lg border border-green-600 px-6 py-3 text-sm font-medium text-green-600 hover:bg-green-50"
            >
              {showMoreReviews ? "Ver Menos Avaliações" : "Ver Mais Avaliações"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-2 transition-transform ${showMoreReviews ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-10 flex-col items-center">
          <button
            onClick={() => window.location.href = "/#comprar"}
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 text-base font-bold text-white hover:from-green-500 hover:to-green-600 hover:scale-105 transition-all shadow-lg hover:shadow-xl border-b-4 border-green-700"
          >
            QUERO EMAGRECER AGORA! <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <div className="flex items-center justify-center mt-3 text-sm text-gray-600">
            <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
            <span>Resultados vísiveis ou seu dinheiro de volta</span>
          </div>
        </div>
      </div>
    </section>
  )
} 