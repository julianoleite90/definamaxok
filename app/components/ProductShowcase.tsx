export default function ProductShowcase() {
  return (
    <section className="relative overflow-hidden">
      {/* Green background matching footer */}
      <div className="absolute inset-0 bg-green-700"></div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2">
          {/* Left Side - Product Image */}
          <div className="relative order-2 lg:order-1 flex items-end">
            <div className="w-full flex justify-center">
              <div className="relative">
                <img 
                  src="/mockup-maos.png" 
                  alt="Definamax - Suplemento Natural" 
                  className="max-w-full h-auto drop-shadow-2xl block"
                  style={{ maxHeight: '650px' }}
                />
                {/* Product glow effect */}
                <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl scale-110 -z-10"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6 order-1 lg:order-2 text-white px-4 sm:px-6 lg:px-8 py-8 md:py-12 text-center lg:text-left">
            {/* Main Headline */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              Com Definamax, a perda de peso se torna uma realidade ao seu alcance.
            </h2>

            {/* Description Paragraphs */}
            <div className="space-y-4">
              <p className="text-lg md:text-xl leading-relaxed opacity-95">
                Definamax acelera o seu processo de emagrecimento com fibras bioativas avançadas que capturam parte da gordura dos alimentos antes da absorção, regula o apetite de forma natural e potencializa seu metabolismo. O resultado? Emagrecimento saudável e sustentável, sem dietas restritivas ou efeito rebote.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4 flex justify-center lg:justify-start">
              <button className="bg-white hover:bg-gray-100 text-green-700 text-sm md:text-lg font-bold py-4 px-6 md:px-8 rounded-lg drop-shadow-[0_8px_16px_rgba(255,255,255,0.6)] hover:drop-shadow-[0_12px_20px_rgba(255,255,255,0.8)] transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 relative z-10" style={{boxShadow: '0 8px 16px rgba(255, 255, 255, 0.4), 0 4px 8px rgba(255, 255, 255, 0.3)'}}>
                QUERO EMAGRECER E VIVER MELHOR!
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 