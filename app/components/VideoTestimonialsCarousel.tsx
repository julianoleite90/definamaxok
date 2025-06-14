'use client'

import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface VideoTestimonialsCarouselProps {
  scrollToKits?: () => void
}

const videoTestimonials = [
  {
    id: 1,
    vimeoId: '1092606215',
    name: 'Luana',
    city: 'São Paulo - SP',
    weightLoss: '30kg em 9 meses'
  },
  {
    id: 2,
    vimeoId: '1092323500',
    name: 'Paula',
    city: 'Colombo - PR',
    weightLoss: '6kg em apenas 30 dias'
  },
  {
    id: 3,
    vimeoId: '1092323559',
    name: 'Joana',
    city: 'Recife - PE',
    weightLoss: '9kg em 2 meses'
  },
  {
    id: 4,
    vimeoId: '1092323577',
    name: 'Ranny',
    city: 'Florianópolis - SC',
    weightLoss: '11kg em 4 meses'
  }
]

export default function VideoTestimonialsCarousel({ scrollToKits }: VideoTestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? videoTestimonials.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === videoTestimonials.length - 1 ? 0 : currentIndex + 1)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="bg-gray-50 py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Veja os depoimentos de quem já <span className="text-green-700">transformou</span> a vida
          </h2>
          <p className="text-xl md:text-2xl text-gray-700">
            Resultados reais de pessoas reais que escolheram o Definamax
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden relative">
          {/* Main Video Display */}
          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-2xl">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                <iframe
                  key={videoTestimonials[currentIndex].id}
                  src={`https://player.vimeo.com/video/${videoTestimonials[currentIndex].vimeoId}?loop=1&title=0&byline=0&portrait=0`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              {/* Video Info - Subtle */}
              <div className="mt-4 text-center space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-700 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {videoTestimonials[currentIndex].name}
                  </h3>
                  <span className="text-sm text-gray-500">•</span>
                  <p className="text-sm text-gray-600">
                    {videoTestimonials[currentIndex].city}
                  </p>
                </div>
                            <div className="inline-flex items-center bg-green-50 border border-green-200 px-3 py-1 rounded-full">
              <span className="text-green-700 font-medium text-sm">
                    Emagreceu {videoTestimonials[currentIndex].weightLoss}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 bottom-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-200 z-10"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 bottom-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-200 z-10"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-700" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {videoTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-green-700 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-2 gap-8">
            {videoTestimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="text-center">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black mb-6">
                  <iframe
                    src={`https://player.vimeo.com/video/${testimonial.vimeoId}?loop=1&title=0&byline=0&portrait=0`}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                
                {/* Video Info - Subtle */}
                <div className="mt-3 text-center space-y-2">
                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                    <h3 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <span className="text-gray-400">•</span>
                    <p className="text-gray-600">
                      {testimonial.city}
                    </p>
                  </div>
                  <div className="inline-flex items-center bg-green-50 border border-green-200 px-2 py-1 rounded-full">
                    <span className="text-green-700 font-medium text-xs">
                      Emagreceu {testimonial.weightLoss}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button
            onClick={scrollToKits}
            className="inline-flex items-center justify-center px-8 md:px-12 py-4 text-sm md:text-xl font-bold text-white bg-green-700 hover:bg-green-800 rounded-xl transition-all transform hover:scale-105 shadow-lg"
          >
            SIM, QUERO COMEÇAR A EMAGRECER!
          </button>
        </div>
      </div>
    </section>
  )
} 