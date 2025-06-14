export default function FormulationSection() {
  const ingredients = [
    {
      id: 1,
      name: "Quitosana",
      image: "/ing-2.png",
      benefits: ["Combate Hipertensão", "Bloqueador de Gordura"],
      position: "top-left"
    },
    {
      id: 2,
      name: "Espirulina",
      image: "/ing-4.png", 
      benefits: ["Reduz Colesterol", "Fortalece Imunidade"],
      position: "left"
    },
    {
      id: 3,
      name: "Psyllium",
      image: "/ing-3.png",
      benefits: ["Reduz Triglicerídeos", "Promove a Saciedade"],
      position: "bottom-left"
    },
    {
      id: 4,
      name: "Fibras bioativas",
      image: "/ing-1.png",
      benefits: ["Fortalece Sistema Imune", "Aumenta Energia"],
      position: "top-right"
    },
    {
      id: 5,
      name: "Agar Agar",
      image: "/ing-6.png",
      benefits: ["Reduz Gordura Corporal", "Reduz a Fadiga"],
      position: "right"
    },
    {
      id: 6,
      name: "Cromo",
      image: "/ing-5.png",
      benefits: ["Controla Glicemia", "Acelera Metabolismo"],
      position: "bottom-right"
    }
  ]

  return (
    <section className="hidden bg-white pt-16 md:pt-24 pb-2 md:pb-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Conheça a formulação do <span className="text-green-700">Definamax</span>!
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
            Uma fórmula exclusiva com{" "}
                          <span className="underline decoration-green-700 decoration-2">fibras bioativas que agem como uma esponja</span>{" "}
            no seu organismo, absorvendo gorduras e açúcares para reduzir a absorção calórica, controlar a fome e acelerar a perda de peso de forma natural e eficaz.
          </p>
        </div>

        {/* Mobile Layout - Stack */}
        <div className="lg:hidden space-y-8">
          {/* Product Image */}
          <div className="flex justify-center mb-12 overflow-visible">
            <div className="relative w-full flex justify-center">
              <div className="w-64 h-64 bg-green-700 rounded-full flex items-center justify-center shadow-2xl relative z-0">
              </div>
              <img 
                src="/ingredientes.png" 
                alt="Ingredientes Definamax"
                className="absolute w-[32rem] h-[32rem] object-contain z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-4 border-white shadow-lg z-5"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-green-700 z-5"></div>
            </div>
          </div>

          {/* Ingredients Grid */}
          <div className="grid grid-cols-2 gap-4">
            {ingredients.map((ingredient) => (
              <div key={ingredient.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="text-center space-y-3">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-white rounded-full border-3 border-green-700 flex items-center justify-center shadow-lg">
                      <img 
                        src={ingredient.image} 
                        alt={ingredient.name}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-2">{ingredient.name}</h3>
                    <div className="space-y-1">
                      {ingredient.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center justify-center space-x-1">
                          <div className="w-1 h-1 bg-green-700 rounded-full flex-shrink-0"></div>
                          <span className="text-xs text-gray-600 text-center leading-tight">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout - Circle */}
        <div className="hidden lg:block relative overflow-visible">
          <div className="relative w-full h-[1000px] flex items-center justify-center overflow-visible">
            {/* Central Product */}
            <div className="absolute z-10 w-full h-full flex items-center justify-center overflow-visible">
              <div className="relative overflow-visible">
                <div className="w-80 h-80 bg-green-700 rounded-full shadow-2xl relative z-0">
                </div>
                <img 
                  src="/ingredientes.png" 
                  alt="Ingredientes Definamax"
                  className="absolute object-contain z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ width: '25.7rem', height: '25.7rem', maxWidth: 'none', maxHeight: 'none' }}
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-4 border-white shadow-lg z-5"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-2 border-green-700 z-5"></div>
              </div>
            </div>

            {/* Ingredients positioned around the circle */}
            {ingredients.map((ingredient, index) => {
              const angle = (index * 60) - 90; // 60 degrees apart, starting from top
              const radius = 320;
              const x = Math.cos(angle * Math.PI / 180) * radius;
              const y = Math.sin(angle * Math.PI / 180) * radius;
              
              return (
                <div
                  key={ingredient.id}
                  className="absolute"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    left: '50%',
                    top: '50%',
                    marginLeft: '-120px',
                    marginTop: '-60px'
                  }}
                >
                  <div className="w-60 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-white rounded-full border-4 border-green-700 flex items-center justify-center shadow-md">
                          <img 
                            src={ingredient.image} 
                            alt={ingredient.name}
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm mb-2 leading-tight">{ingredient.name}</h3>
                        <div className="space-y-1">
                          {ingredient.benefits.map((benefit, benefitIndex) => (
                            <div key={benefitIndex} className="flex items-center space-x-2">
                              <div className="w-1 h-1 bg-green-700 rounded-full flex-shrink-0"></div>
                              <span className="text-xs text-gray-600 leading-tight">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  )
} 