'use client'

import { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const testimonials = [
  {
    id: 1,
    image: '/apaula2.png',
  },
  {
    id: 2,
    image: '/luana.png',
  },
  {
    id: 3,
    image: '/chintia.png',
  },
  {
    id: 4,
    image: '/dep01.png',
  },
  {
    id: 5,
    image: '/dep03.png',
  },
  {
    id: 6,
    image: '/dep04.png',
  },
  {
    id: 7,
    image: '/dep05.png',
  },
]

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  // Calculate visible slides for desktop (3 slides) and mobile (1 slide)
  const getVisibleSlides = () => {
    const slides = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length
      slides.push(testimonials[index])
    }
    return slides
  }

  return (
    <section className="bg-white py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Veja os resultados de <span className="text-green-700">pessoas</span> que viveram
          </h2>
          <p className="text-xl md:text-2xl text-gray-700">
            a transformação de corpo e de vida com o <span className="font-bold text-green-700">Definamax</span>!
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden relative">
          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="relative h-80 md:h-96">
                    <img
                      src={testimonial.image}
                      alt="Transformação antes e depois"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-200 z-10"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-200 z-10"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Desktop Carousel */}
        <div className="hidden lg:block relative">
          <div className="grid grid-cols-3 gap-6">
            {getVisibleSlides().slice(0, 3).map((testimonial, index) => (
              <div key={`${testimonial.id}-${index}`} className="group">
                <div className="relative h-80">
                  <img
                    src={testimonial.image}
                    alt="Transformação antes e depois"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-10"
          >
            <ChevronLeftIcon className="w-8 h-8 text-gray-700" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-10"
          >
            <ChevronRightIcon className="w-8 h-8 text-gray-700" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-green-700 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Sophisticated Section Divider */}
        <div className="flex items-center justify-center mt-20 mb-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="mx-6 flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-700 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-green-700 rounded-full"></div>
            <div className="w-2 h-2 bg-green-700 rounded-full animate-pulse"></div>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
      </div>
    </section>
  )
} 