"use client"

import { useEffect } from 'react'

export default function UTMHandler() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
      
      utmParams.forEach(param => {
        const value = params.get(param)
        if (value) {
          localStorage.setItem(param, value)
        }
      })
    }
  }, [])

  return null // Este componente não renderiza nada visualmente
} 