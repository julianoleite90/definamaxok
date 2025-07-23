'use client'

export default function BenefitsSection() {
  const scrollToKits = () => {
    const kitsSection = document.getElementById('kits-section');
    if (kitsSection) {
      kitsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const benefits = [
    {
      image: "/benefit-1.png",
      title: "Deseja emagrecer",
      subtitle: "sem recorrer a dietas extremas",
      description: "ou exercícios exaustivos."
    },
    {
      image: "/benefit-2.png", 
      title: "Busca um método natural e",
      subtitle: "seguro",
      description: "para perder peso, sem efeitos colaterais."
    },
    {
      image: "/benefit-3.png",
      title: "Luta contra a compulsão alimentar",
      subtitle: "e procura uma forma eficaz de",
      description: "controlar o apetite."
    },
    {
      image: "/benefit-4.png",
      title: "Quer aumentar seu metabolismo",
      subtitle: "de forma saudável,",
      description: "mesmo enquanto está em repouso."
    },
    {
      image: "/benefit-5.png",
      title: "Precisa de uma solução prática",
      subtitle: "que se encaixe na sua rotina",
      description: "agitada."
    },
    {
      image: "/benefit-6.png",
      title: "Está cansado(a) de produtos que",
      subtitle: "prometem muito, mas entregam",
      description: "pouco."
    },
    {
      image: "/benefit-1.png",
      title: "Valoriza um produto com",
      subtitle: "ingredientes de alta qualidade",
      description: "e comprovadamente eficazes."
    },
    {
      image: "/benefit-2.png",
      title: "Quer ver resultados rápidos e",
      subtitle: "duradouros",
      description: "que também melhorem sua saúde geral."
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Título Principal */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            O <span className="text-green-600">Definamax</span> é a solução perfeita para você que...
          </h2>
        </div>

        {/* Grid de Benefícios */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              {/* Círculo com Imagem */}
              <div className="relative mb-6 mx-auto">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full border-4 border-green-500 overflow-hidden shadow-lg">
                  <img 
                    src={benefit.image} 
                    alt={benefit.title}
                    className="w-full h-full object-cover"
                                        onError={(e) => {
                       (e.target as HTMLImageElement).src = '/mockup2.png'; // Fallback para imagem do produto
                     }}
                  />
                </div>
              </div>

              {/* Texto */}
              <div className="text-sm md:text-base text-gray-700 leading-relaxed">
                <p>
                  <span className="font-semibold">{benefit.title}</span>{" "}
                  <span className="font-bold text-gray-900">{benefit.subtitle}</span>{" "}
                  <span>{benefit.description}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

                 {/* Botão CTA */}
         <div className="text-center">
           <button 
             onClick={scrollToKits}
             className="bg-green-600 hover:bg-green-700 text-white text-lg font-extrabold py-5 px-12 rounded-lg shadow-lg shadow-green-600/50 hover:shadow-xl hover:shadow-green-600/60 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 relative z-10 border-2 border-green-500"
           >
             O DEFINAMAX É PERFEITO PARA MIM!
           </button>
         </div>
      </div>
    </section>
  )
} 