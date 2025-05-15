"use client"

import { useEffect, useRef } from "react"

export default function VideoPlayer() {
  const iframeRef = useRef(null)

  useEffect(() => {
    // Only load the iframe when this component is mounted
    if (iframeRef.current) {
      iframeRef.current.src = "https://player.vimeo.com/video/1082333298?autoplay=1&loop=1&background=1"
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full">
      <img
        src="https://emagrecedores-naturais.com/wp-content/uploads/2025/05/Captura-de-Tela-2025-05-07-as-17.58.20.png"
        alt=""
        className="absolute top-0 left-0 w-full h-full"
      />
      <iframe
        ref={iframeRef}
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
        title="Como o Definamax funciona"
      ></iframe>
    </div>
  )
}
