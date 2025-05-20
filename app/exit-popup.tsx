"use client"
import { useState, useEffect, useCallback } from "react"
import { X } from "lucide-react"
import Link from "next/link"

interface ExitPopupProps {
  vimeoVideoId: string
  ctaLink: string
  ctaText: string
}

export default function ExitPopup({
  vimeoVideoId = "1082333298",
  ctaLink = "https://full.sale/DmNQj1",
  ctaText = "QUERO EXPERIMENTAR DEFINAMAX",
}: ExitPopupProps) {
  const [showPopup, setShowPopup] = useState(false)
  const [hasShownPopup, setHasShownPopup] = useState(false)

  // Função para mostrar o popup
  const handleShowPopup = useCallback(() => {
    if (!hasShownPopup) {
      setShowPopup(true)
      setHasShownPopup(true)
    }
  }, [hasShownPopup])

  // Função para fechar o popup
  const handleClosePopup = () => {
    setShowPopup(false)
  }

  // Detectar quando o usuário tenta sair da página
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!hasShownPopup) {
        e.preventDefault()
        e.returnValue = ""
        handleShowPopup()
        return ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [hasShownPopup, handleShowPopup])

  // Detectar quando o usuário clica no botão voltar ou faz gesto de voltar no mobile
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault()
      handleShowPopup()
      // Adiciona um novo estado ao histórico para evitar que o usuário saia da página
      window.history.pushState(null, "", window.location.pathname)
    }

    // Adiciona um estado ao histórico para poder detectar quando o usuário clica em voltar
    window.history.pushState(null, "", window.location.pathname)
    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [handleShowPopup])

  // Detectar movimento de deslize para voltar no mobile (comum em iOS)
  useEffect(() => {
    let touchStartX = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!hasShownPopup && e.touches[0].clientX - touchStartX > 100 && touchStartX < 50) {
        // Deslize da esquerda para direita começando na borda (gesto comum de voltar)
        handleShowPopup()
      }
    }

    document.addEventListener("touchstart", handleTouchStart)
    document.addEventListener("touchmove", handleTouchMove)

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
    }
  }, [hasShownPopup, handleShowPopup])

  // Adicionar classe ao body para prevenir scroll quando o popup estiver aberto
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [showPopup])

  if (!showPopup) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <button
          onClick={handleClosePopup}
          className="absolute top-2 right-2 z-10 p-2 text-gray-500 hover:text-gray-700 bg-white/80 rounded-full"
          aria-label="Fechar"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-4 bg-gradient-to-r from-green-600 to-green-500 text-white text-center">
          <h2 className="text-xl font-bold">ESPERE! TEMOS UMA OFERTA ESPECIAL PARA VOCÊ!</h2>
          <p className="text-sm opacity-90">Assista este vídeo rápido antes de sair</p>
        </div>

        <div className="aspect-video w-full">
          <iframe
            src={`https://player.vimeo.com/video/${vimeoVideoId}?autoplay=1&title=0&byline=0&portrait=0`}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Definamax - Oferta Especial"
          ></iframe>
        </div>

        <div className="p-6 text-center">
          <Link
            href={ctaLink}
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-6 py-4 text-lg font-bold text-white hover:from-green-500 hover:to-green-600 w-full sm:w-auto hover:scale-105 transition-all shadow-lg hover:shadow-xl border-b-4 border-green-700 animate-pulse"
          >
            {ctaText}
          </Link>

          <p className="mt-4 text-sm text-gray-600">Aproveite esta oferta exclusiva por tempo limitado!</p>
        </div>
      </div>
    </div>
  )
}
