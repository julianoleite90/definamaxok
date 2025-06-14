'use client'

export default function Hero() {
  const scrollToKits = () => {
    const kitsSection = document.getElementById('kits-section');
    if (kitsSection) {
      kitsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gray-100 py-6 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-3 md:space-y-6 order-2 lg:order-1">
            {/* Logo - Oculto no mobile */}
            <div className="hidden md:flex items-center gap-3">
              <img 
                src="/logo-outracor.png" 
                alt="Definamax" 
                className="h-12 w-auto"
              />
            </div>

            {/* Main Headline - Centralizado no mobile */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-700 leading-tight text-center lg:text-left">
              Emagreça rápido com segurança e conquiste o corpo que você sempre quis!
            </h1>

            {/* Subheadline - Centralizado no mobile */}
            <p className="text-base md:text-xl text-gray-600 leading-relaxed text-center lg:text-left">
              Aproveite o poder das fibras bioativas do Definamax que absorvem gordura, controlam a compulsão e aceleram seu metabolismo – <strong className="text-gray-800 font-bold">emagreça rápido, de forma natural e segura, sem colocar sua saúde em risco!</strong>
            </p>

            {/* CTA Button - Centralizado no mobile, alinhado à esquerda no desktop */}
            <div className="flex justify-center lg:justify-start pt-2 md:pt-4">
              <button 
                onClick={scrollToKits}
                className="bg-green-700 hover:bg-green-800 text-white text-xs md:text-lg font-bold py-6 px-8 md:py-5 md:px-12 rounded-lg shadow-2xl hover:shadow-green-700/40 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 relative z-10"
              >
                SIM, QUERO COMEÇAR A EMAGRECER!
              </button>
            </div>

            {/* Payment Methods - Centralizada com o CTA no mobile */}
            <div className="flex justify-center lg:justify-start">
              <div className="flex justify-center">
                <img 
                  src="/cartoes.webp" 
                  alt="Formas de pagamento aceitas" 
                  className="h-12 w-auto"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Product Image com sombra e tamanho reduzido no mobile */}
          <div className="relative order-1 lg:order-2 mt-4 md:mt-0">
            <div className="flex justify-center items-center">
              <div className="relative">
                <img 
                  src="/hero.png" 
                  alt="Definamax Pro - 2 Frascos" 
                  className="max-w-[350px] md:max-w-full h-auto drop-shadow-2xl"
                  style={{ maxHeight: '500px' }}
                />
                {/* Sombra adicional embaixo dos frascos */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-black/20 rounded-full blur-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 