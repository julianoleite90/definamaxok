'use client'

import { useEffect, useRef, useState } from 'react'

export default function VideoSection() {
  const [mobileVideoLoaded, setMobileVideoLoaded] = useState(false)
  const [desktopVideoLoaded, setDesktopVideoLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Intersection Observer para detectar quando a seção está visível
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { 
        threshold: 0.1,
        rootMargin: '200px 0px' // Começar a carregar 200px antes
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} className="bg-gray-100 py-0 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Mobile Title */}
          <h2 className="text-3xl font-bold text-gray-900 leading-tight text-center pt-8 pb-4">
            Conheça o poder das{" "}
            <span className="text-green-700">fibras bioativas</span>{" "}
            que absorvem a gordura.
          </h2>
          
          {/* Mobile Video Container */}
          <div className="relative w-full aspect-video bg-black overflow-hidden rounded-lg">
            {/* Thumbnail de fundo - sempre visível */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="/thumb-mob-min.png" 
                alt="Fibras Bioativas"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback para cor sólida se a imagem não existir
                  e.currentTarget.style.display = 'none'
                }}
              />
              {/* Fallback background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-800 to-green-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-sm font-medium">Fibras Bioativas</p>
                </div>
              </div>
            </div>

            {/* Vídeo - aparece por cima quando carregado */}
            {isVisible && (
              <iframe
                src="https://player.vimeo.com/video/1092325775?autoplay=1&loop=1&muted=1&controls=0&background=1&transparent=0"
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                  mobileVideoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
                title="Fibras Bioativas - Mobile"
                onLoad={() => setMobileVideoLoaded(true)}
              ></iframe>
            )}

            {/* Play button overlay - desaparece quando o vídeo carrega */}
            {!mobileVideoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-green-700 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            )}
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
            {/* Desktop Video Container */}
            <div className="relative w-full h-[540px] overflow-hidden rounded-lg">
              {/* Thumbnail de fundo - sempre visível */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src="/thumb-desk-min.png" 
                  alt="Fibras Bioativas"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback para cor sólida se a imagem não existir
                    e.currentTarget.style.display = 'none'
                  }}
                />
                {/* Fallback background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-800 to-green-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-lg font-medium">Fibras Bioativas</p>
                    <p className="text-sm opacity-80 mt-1">Absorção de Gordura</p>
                  </div>
                </div>
              </div>

              {/* Vídeo - aparece por cima quando carregado */}
              {isVisible && (
                <iframe
                  src="https://player.vimeo.com/video/1092325858?autoplay=1&loop=1&muted=1&controls=0&transparent=1"
                  className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                    desktopVideoLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  title="Fibras Bioativas - Desktop"
                  onLoad={() => setDesktopVideoLoaded(true)}
                ></iframe>
              )}

              {/* Play button overlay - desaparece quando o vídeo carrega */}
              {!desktopVideoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-24 h-24 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                    <svg className="w-10 h-10 text-green-700 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 