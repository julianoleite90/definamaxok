export default function BenefitsSection() {
  const benefits = [
    {
      image: "/benefit-1.png",
      title: "Deseja emagrecer",
      subtitle: "sem recorrer a dietas extremas ou exercícios exaustivos.",
      highlight: "emagrecer"
    },
    {
      image: "/benefit-2.png",
      title: "Busca um método natural e",
      subtitle: "seguro para perder peso, sem efeitos colaterais.",
      highlight: "método natural"
    },
    {
      image: "/benefit-3.png",
      title: "Luta contra a compulsão alimentar e",
      subtitle: "procura uma forma eficaz de controlar o apetite.",
      highlight: "compulsão alimentar"
    },
    {
      image: "/benefit-4.png",
      title: "Quer aumentar seu metabolismo de",
      subtitle: "forma saudável, mesmo enquanto está em repouso.",
      highlight: "aumentar seu metabolismo"
    },
    {
      image: "/benefit-5.png",
      title: "Precisa de uma solução prática",
      subtitle: "que se encaixe na sua rotina agitada.",
      highlight: "solução prática"
    },
    {
      image: "/benefit-6.png",
      title: "Quer ver resultados rápidos e",
      subtitle: "duradouros que também melhorem sua saúde geral.",
      highlight: "resultados rápidos"
    }
  ]

  return (
    <section className="bg-white pt-4 md:pt-6 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            O <span className="text-green-700">Definamax</span> é a solução perfeita para você que...
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              {/* Image Container */}
              <div className="relative mb-4 md:mb-6">
                <div className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-4 border-green-700">
                  <img
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-1 md:space-y-2">
                <h3 className="text-sm md:text-lg lg:text-xl font-semibold text-gray-900 leading-tight">
                  {benefit.title.split(benefit.highlight)[0]}
                  <span className="text-green-700 font-bold">{benefit.highlight}</span>
                  {benefit.title.split(benefit.highlight)[1]}
                </h3>
                <p className="text-gray-600 text-xs md:text-base lg:text-lg leading-relaxed">
                  {benefit.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 