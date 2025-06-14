'use client'

import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const phoneNumber = "+5541984549172"
  const message = "Olá, eu estava no site do emagrecedor, e gostaria de saber mais sobre o Definamax."
  
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center bg-[#25D366] hover:bg-[#20BD5A] text-white px-4 py-2.5 md:px-4 md:py-3 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105"
    >
      {/* Indicador de status online */}
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
      
      {/* Ícone do WhatsApp */}
      <MessageCircle className="h-4 w-4 md:h-5 md:w-5 text-white mr-2" fill="currentColor" />
      
      {/* Texto */}
      <span className="text-xs md:text-sm font-semibold whitespace-nowrap">
        Compre no WhatsApp
      </span>
    </a>
  )
} 