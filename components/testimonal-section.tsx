"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, ShieldCheck } from "lucide-react"

export default function TestimonialSection({ scrollToBuy }) {
  // Estado para controlar o carrossel de depoimentos
  const [testimonialPage, setTestimonialPage] = useState(0)
  const totalTestimonialPages = 2

  // Estado para controlar a exibição de mais avaliações
  const [showMoreTestimonials, setShowMoreTestimonials] = useState(false)

  // Função para navegar para o slide anterior do carrossel
  const prevTestimonial = () => {
    setTestimonialPage((prev) => (prev - 1 + totalTestimonialPages) % totalTestimonialPages)
  }

  // Função para navegar para o próximo slide do carrossel
  const nextTestimonial = () => {
    setTestimonialPage((prev) => (prev + 1) % totalTestimonialPages)
  }

  // Efeito para rotação automática do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="w-full py-16 bg-green-50">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center mb-8">
          <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
            Veja quem já transformou a vida com Definamax
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Olha só! Eles também estavam como você...</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chega de se esconder! Conheça pessoas REAIS que recuperaram a autoestima e o prazer de se olhar no espelho.
          </p>
        </div>

        <div className="relative">
          {/* Desktop Carousel */}
          <div className="hidden md:block">
            {/* Página 1 de depoimentos */}
            <div
              className={`grid gap-8 grid-cols-3 transition-opacity duration-500 ${
                testimonialPage === 0 ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              <div className="bg-white p-6 rounded-lg border border-green-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-200 overflow-hidden mr-4">
                    <Image
                      src="/joana.png"
                      alt="Maria"
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">Joana</h4>
                      <span className="bg-green-600 text-white text-xs font-bold py-1 px-2 rounded-lg">-27kg</span>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div>
                    <Image
                      src="/1-min.png"
                      alt="Antes"
                      width={300}
                      height={300}
                      className="w-full h-auto object-contain rounded-lg"
                      loading="lazy"
                    />
                  </div>
                </div>

                <p className="text-gray-700 mb-2">
                  "Oi, gente! Em 7 meses de Definamax, perdi 27kg! O melhor é que a fome sumiu e eu tenho uma energia
                  incrível pra tudo. Super recomendo!"
                </p>
                <p className="text-green-700 font-medium">- 27kg em 7 meses</p>
              </div>

              {/* Additional testimonials... */}
              {/* (Remaining testimonial items would be here) */}
            </div>

            {/* Página 2 de depoimentos */}
            <div
              className={`grid gap-8 grid-cols-3 transition-opacity duration-500 ${
                testimonialPage === 1 ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              {/* Testimonial items for page 2 */}
              {/* (Remaining testimonial items would be here) */}
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-green-50 hidden md:block"
              aria-label="Anterior"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-green-50 hidden md:block"
              aria-label="Próximo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                {[0, 1].map((page) => (
                  <button
                    key={page}
                    onClick={() => setTestimonialPage(page)}
                    className={`w-3 h-3 rounded-full ${testimonialPage === page ? "bg-green-600" : "bg-green-200"}`}
                    aria-label={`Página ${page + 1} de depoimentos`}
                  ></button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile View - Load More */}
          <div className="md:hidden">
            {/* Mobile testimonial content */}
            {/* (Mobile testimonial content would be here) */}
          </div>
        </div>

        <div className="flex justify-center mt-10 flex-col items-center">
          <button
            onClick={scrollToBuy}
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 text-base font-bold text-white hover:from-green-500 hover:to-green-600 hover:scale-105 transition-all shadow-lg hover:shadow-xl border-b-4 border-green-700"
          >
            EU TAMBÉM QUERO EMAGRECER! <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <div className="flex items-center justify-center mt-3 text-sm text-gray-600">
            <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
            <span>30 dias de garantia ou seu dinheiro de volta</span>
          </div>
        </div>
      </div>
    </section>
  )
}
