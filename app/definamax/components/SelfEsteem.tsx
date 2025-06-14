export default function SelfEsteem() {
  return (
    <section className="bg-gray-50 pt-12 md:pt-20 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left Side - Content */}
          <div className="space-y-6 order-1 lg:order-1 flex flex-col justify-center text-center lg:text-left">
            {/* Main Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-700 leading-tight">
              Cansada que os jeans não entram mais?
            </h2>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                              <strong className="text-gray-800 font-bold">Definamax</strong> não é só um emagrecedor natural – é um recomeço.
            </p>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Redescubra a harmonia com seu corpo e conquiste uma vida mais plena com um suplemento que transforma seu peso em bem-estar. Definamax foi criado para que cada quilo perdido signifique mais autoestima, mais confiança e mais amor próprio em seu dia a dia - naturalmente, sem sacrifícios, com resultados que vão muito além da balança.
            </p>
          </div>

          {/* Right Side - Image */}
          <div className="relative order-2 lg:order-2 flex items-end">
            <div className="flex justify-center w-full">
              <img 
                src="/jeans.png" 
                alt="Jeans que não entram mais" 
                className="max-w-full h-auto"
                style={{ maxHeight: '600px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 