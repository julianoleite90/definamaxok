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
        {/* Layout Mobile - Ordem: Título, Imagem, Subtítulo */}
        <div className="lg:hidden">
          {/* Main Headline - Mobile */}
          <h1 className="text-3xl font-bold text-green-700 leading-tight text-center mb-6">
            Emagreça rápido, recupere sua autoestima e renove a sua confiança
          </h1>

          {/* Product Image - Mobile */}
          <div className="relative mb-6">
            <div className="flex justify-center items-center">
              <div className="relative">
                <img 
                  src="/hero.png" 
                  alt="Definamax Pro - 2 Frascos" 
                  className="max-w-[315px] h-auto drop-shadow-2xl"
                  style={{ maxHeight: '500px' }}
                />
                {/* Sombra adicional embaixo dos frascos */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-black/20 rounded-full blur-lg"></div>
              </div>
            </div>
          </div>

          {/* Subheadline - Mobile */}
          <p className="text-base text-gray-600 leading-relaxed text-center mb-6">
            Descubra o poder das fibras que absorvem gordura, controlam a compulsão e aceleram seu metabolismo – <strong className="text-gray-800 font-bold">Assuma o controle do seu peso, de forma natural e segura, sem colocar sua saúde em risco.</strong>
          </p>

          {/* CTA Button - Mobile */}
          <div className="flex justify-center mb-4 px-4">
            <button 
              onClick={scrollToKits}
              className="bg-green-600 hover:bg-green-700 text-white text-xs font-extrabold py-6 px-12 rounded-lg shadow-lg shadow-green-600/50 hover:shadow-xl hover:shadow-green-600/60 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 relative z-10 w-full max-w-sm border-2 border-green-500"
            >
              SIM, QUERO COMEÇAR A EMAGRECER!
            </button>
          </div>

          {/* Payment Methods - Mobile */}
          <div className="flex justify-center">
            <img 
              src="/cartoes.webp" 
              alt="Formas de pagamento aceitas" 
              className="h-10 w-auto"
            />
          </div>
        </div>

        {/* Layout Desktop - Grid original */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6 order-2 lg:order-1">
            {/* Logo - Desktop */}
            <div className="flex items-center gap-3">
              <img 
                src="/logo-outracor.png" 
                alt="Definamax" 
                className="h-12 w-auto"
              />
            </div>

            {/* Main Headline - Desktop */}
            <h1 className="text-4xl lg:text-5xl font-bold text-green-700 leading-tight text-left">
              Emagreça rápido, recupere sua autoestima e renove a sua confiança
            </h1>

            {/* Subheadline - Desktop */}
            <p className="text-xl text-gray-600 leading-relaxed text-left">
              Descubra o poder das fibras que absorvem gordura, controlam a compulsão e aceleram seu metabolismo – <strong className="text-gray-800 font-bold">Assuma o controle do seu peso, de forma natural e segura, sem colocar sua saúde em risco.</strong>
            </p>

            {/* CTA Button - Desktop */}
            <div className="flex justify-start pt-4">
              <button 
                onClick={scrollToKits}
                className="bg-green-600 hover:bg-green-700 text-white text-lg font-extrabold py-5 px-12 rounded-lg shadow-lg shadow-green-600/50 hover:shadow-xl hover:shadow-green-600/60 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 relative z-10 border-2 border-green-500"
              >
                SIM, QUERO COMEÇAR A EMAGRECER!
              </button>
            </div>

            {/* Payment Methods - Desktop */}
            <div className="flex justify-start">
              <img 
                src="/cartoes.webp" 
                alt="Formas de pagamento aceitas" 
                className="h-12 w-auto"
              />
            </div>
          </div>

          {/* Right Side - Product Image - Desktop */}
          <div className="relative order-1 lg:order-2">
            <div className="flex justify-center items-center">
              <div className="relative">
                <img 
                  src="/hero.png" 
                  alt="Definamax Pro - 2 Frascos" 
                  className="max-w-full h-auto drop-shadow-2xl"
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