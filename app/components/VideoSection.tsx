export default function VideoSection() {

  return (
    <section className="bg-gray-100 py-0 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Mobile Title */}
          <h2 className="text-3xl font-bold text-gray-900 leading-tight text-center pt-8 pb-4">
            Conheça o poder das{" "}
            <span className="text-green-700">fibras bioativas</span>{" "}
            que absorvem a gordura.
          </h2>
          
          {/* Mobile Video - Como estava funcionando */}
          <div className="relative w-full aspect-video bg-black overflow-hidden">
            <iframe
              src="https://player.vimeo.com/video/1092325775?autoplay=1&loop=1&muted=1&controls=0&background=1&transparent=0"
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Fibras Bioativas - Mobile"
            ></iframe>
          </div>
          
          {/* Mobile Description */}
          <p className="text-lg text-gray-600 leading-relaxed text-center pt-4 pb-8">
            Uma fórmula exclusiva com{" "}
            <span className="underline decoration-green-700 decoration-2">
              fibras bioativas que agem como uma esponja
            </span>{" "}
            no seu organismo, absorvendo gorduras e açúcares para reduzir a absorção calórica, controlar a fome e acelerar a perda de peso de forma natural e eficaz.
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6">
            {/* Main Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Conheça o poder das{" "}
              <span className="text-green-700">fibras bioativas</span>{" "}
              que absorvem a gordura.
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Uma fórmula exclusiva com{" "}
              <span className="underline decoration-green-700 decoration-2">
                fibras bioativas que agem como uma esponja
              </span>{" "}
              no seu organismo, absorvendo gorduras e açúcares para reduzir a absorção calórica, controlar a fome e acelerar a perda de peso de forma natural e eficaz.
            </p>
          </div>

          {/* Right Side - Video */}
          <div className="relative">
            {/* Video Container Desktop - Sem fundo, solto na seção */}
            <div className="relative w-full h-[540px] overflow-hidden">
              {/* Desktop Video - Solto sem container visível */}
              <iframe
                src="https://player.vimeo.com/video/1092325858?autoplay=1&loop=1&muted=1&controls=0&transparent=1"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
                title="Fibras Bioativas - Desktop"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 