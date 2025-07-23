'use client'

import { useEffect, useRef, useState } from 'react'

export default function VideoSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [showWithAudio, setShowWithAudio] = useState(false)
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

  const handlePlayWithAudio = () => {
    setShowWithAudio(true)
  }

  // URLs dos vídeos
  const videoUrlMuted = "https://player.vimeo.com/video/1103301355?autoplay=1&loop=1&muted=1&controls=0&background=1"
  const videoUrlWithAudio = "https://player.vimeo.com/video/1103301355?autoplay=1&loop=0&muted=0&controls=1"

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
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
            {isVisible && (
              <>
                <iframe
                  key={showWithAudio ? 'mobile-audio' : 'mobile-muted'}
                  src={showWithAudio ? videoUrlWithAudio : videoUrlMuted}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  title="Fibras Bioativas - Mobile"
                ></iframe>
                
                {/* Custom Play Button Overlay */}
                {!showWithAudio && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer z-10" onClick={handlePlayWithAudio}>
                    <div className="bg-white/90 hover:bg-white rounded-full p-4 shadow-lg transform hover:scale-110 transition-all duration-300">
                      <svg className="w-8 h-8 text-green-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <div className="absolute -bottom-16 bg-white/90 px-4 py-2 rounded-lg shadow-lg">
                      <p className="text-sm text-gray-700 font-medium">Clique para assistir com áudio</p>
                    </div>
                  </div>
                )}
              </>
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
              {isVisible && (
                <>
                  <iframe
                    key={showWithAudio ? 'desktop-audio' : 'desktop-muted'}
                    src={showWithAudio ? videoUrlWithAudio : videoUrlMuted}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title="Fibras Bioativas - Desktop"
                  ></iframe>
                  
                  {/* Custom Play Button Overlay */}
                  {!showWithAudio && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer z-10" onClick={handlePlayWithAudio}>
                      <div className="bg-white/90 hover:bg-white rounded-full p-6 shadow-xl transform hover:scale-110 transition-all duration-300">
                        <svg className="w-12 h-12 text-green-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <div className="absolute -bottom-20 bg-white/90 px-6 py-3 rounded-lg shadow-lg">
                        <p className="text-base text-gray-700 font-medium">Clique para assistir com áudio</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 