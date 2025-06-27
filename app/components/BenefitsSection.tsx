export default function BenefitsSection() {
  const benefits = [
    {
      icon: "🎯",
      title: "Emagrecimento Inteligente",
      description: "Perca peso de forma natural sem dietas restritivas ou exercícios extremos. O Definamax trabalha 24h por dia para acelerar seu metabolismo.",
      highlight: "Resultados em 15 dias"
    },
    {
      icon: "🛡️",
      title: "100% Natural e Seguro",
      description: "Fórmula desenvolvida com ingredientes naturais clinicamente testados. Sem efeitos colaterais, aprovado pela ANVISA.",
      highlight: "Zero efeitos colaterais"
    },
    {
      icon: "🧠",
      title: "Controle da Compulsão",
      description: "Reduza a ansiedade por comida e controle a fome emocional. Sinta-se satisfeito com porções menores naturalmente.",
      highlight: "Fim da compulsão alimentar"
    },
    {
      icon: "⚡",
      title: "Metabolismo Acelerado",
      description: "Queime gordura mesmo em repouso. Aumente sua energia e disposição enquanto elimina medidas de forma eficaz.",
      highlight: "Queima gordura 24h"
    },
    {
      icon: "⏰",
      title: "Praticidade Total",
      description: "Apenas 2 cápsulas por dia. Encaixe facilmente na sua rotina sem complicações ou mudanças drásticas no seu dia a dia.",
      highlight: "Só 2 cápsulas/dia"
    },
    {
      icon: "📈",
      title: "Resultados Duradouros",
      description: "Não é só perda de peso temporária. Melhore sua saúde geral, autoestima e qualidade de vida de forma permanente.",
      highlight: "Transformação completa"
    }
  ]

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white pt-4 md:pt-6 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Por que milhares de pessoas escolhem o{" "}
            <span className="text-green-700 relative">
              Definamax
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-green-200 rounded-full"></div>
            </span>
            ?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra os benefícios únicos que fazem do Definamax a escolha #1 para quem busca resultados reais
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full">
                {/* Icon */}
                <div className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Highlight Badge */}
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-semibold">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    {benefit.highlight}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-16">
          <div className="bg-green-700 rounded-2xl p-6 md:p-8 text-white">
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              Mais de 50.000 pessoas já transformaram suas vidas
            </h3>
            <p className="text-green-100 text-lg mb-4">
              Junte-se a elas e descubra por que o Definamax é considerado o método mais eficaz do Brasil
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm md:text-base">
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">⭐⭐⭐⭐⭐</span>
                <span>4.9/5 estrelas</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-300 mr-1">✓</span>
                <span>Aprovado pela ANVISA</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-300 mr-1">🏆</span>
                <span>Produto do Ano 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 