'use client'

import { useEffect, useState } from 'react'

interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  gclid?: string
  fbclid?: string
}

export function useUTMTracking() {
  const [utmParams, setUtmParams] = useState<UTMParams>({})
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Função para extrair UTMs da URL
    const extractUTMsFromURL = (): UTMParams => {
      const urlParams = new URLSearchParams(window.location.search)
      const utms: UTMParams = {}

      // UTMs padrão
      const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
      utmKeys.forEach(key => {
        const value = urlParams.get(key)
        if (value) {
          utms[key as keyof UTMParams] = value
        }
      })

      // Google Ads Click ID
      const gclid = urlParams.get('gclid')
      if (gclid) {
        utms.gclid = gclid
      }

      // Facebook Click ID
      const fbclid = urlParams.get('fbclid')
      if (fbclid) {
        utms.fbclid = fbclid
      }

      return utms
    }

    // Função para detectar tráfego orgânico
    const detectOrganicTraffic = (): UTMParams => {
      const referrer = document.referrer
      const utms: UTMParams = {}

      if (!referrer) {
        // Tráfego direto
        utms.utm_source = 'direct'
        utms.utm_medium = 'none'
        return utms
      }

      try {
        const referrerURL = new URL(referrer)
        const hostname = referrerURL.hostname.toLowerCase()

        // Google Search
        if (hostname.includes('google.')) {
          utms.utm_source = 'google'
          utms.utm_medium = 'organic'
          utms.utm_campaign = 'organic_search'
          
          // Extrair termo de busca se disponível
          const query = referrerURL.searchParams.get('q')
          if (query) {
            utms.utm_term = query
          }
        }
        // Bing Search
        else if (hostname.includes('bing.')) {
          utms.utm_source = 'bing'
          utms.utm_medium = 'organic'
          utms.utm_campaign = 'organic_search'
          
          const query = referrerURL.searchParams.get('q')
          if (query) {
            utms.utm_term = query
          }
        }
        // Yahoo Search
        else if (hostname.includes('yahoo.')) {
          utms.utm_source = 'yahoo'
          utms.utm_medium = 'organic'
          utms.utm_campaign = 'organic_search'
        }
        // Facebook
        else if (hostname.includes('facebook.') || hostname.includes('fb.')) {
          utms.utm_source = 'facebook'
          utms.utm_medium = 'social'
          utms.utm_campaign = 'social_referral'
        }
        // Instagram
        else if (hostname.includes('instagram.')) {
          utms.utm_source = 'instagram'
          utms.utm_medium = 'social'
          utms.utm_campaign = 'social_referral'
        }
        // YouTube
        else if (hostname.includes('youtube.')) {
          utms.utm_source = 'youtube'
          utms.utm_medium = 'video'
          utms.utm_campaign = 'video_referral'
        }
        // WhatsApp
        else if (hostname.includes('whatsapp.')) {
          utms.utm_source = 'whatsapp'
          utms.utm_medium = 'messaging'
          utms.utm_campaign = 'whatsapp_referral'
        }
        // Outros referrers
        else {
          utms.utm_source = hostname.replace('www.', '')
          utms.utm_medium = 'referral'
          utms.utm_campaign = 'website_referral'
        }
      } catch (error) {
        // Se não conseguir parsear o referrer, considera como direto
        utms.utm_source = 'direct'
        utms.utm_medium = 'none'
      }

      return utms
    }

    // Capturar UTMs da URL atual
    const urlUTMs = extractUTMsFromURL()
    
    // Se não há UTMs na URL, detectar tráfego orgânico/referrer
    const finalUTMs = Object.keys(urlUTMs).length > 0 ? urlUTMs : detectOrganicTraffic()

    // Salvar no localStorage para persistir durante a sessão
    const existingUTMs = localStorage.getItem('definamax_utm_params')
    if (!existingUTMs || Object.keys(urlUTMs).length > 0) {
      // Só sobrescreve se há novos UTMs na URL ou se não existe dados salvos
      localStorage.setItem('definamax_utm_params', JSON.stringify(finalUTMs))
      setUtmParams(finalUTMs)
    } else {
      // Usar UTMs salvos
      setUtmParams(JSON.parse(existingUTMs))
    }

    // Enviar evento para Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'utm_capture', {
        utm_source: finalUTMs.utm_source,
        utm_medium: finalUTMs.utm_medium,
        utm_campaign: finalUTMs.utm_campaign,
        utm_term: finalUTMs.utm_term,
        utm_content: finalUTMs.utm_content,
      })
    }
  }, [])

  // Função para adicionar UTMs a uma URL
  const addUTMsToURL = (baseURL: string): string => {
    if (!isClient) return baseURL
    
    try {
      const url = new URL(baseURL)
      
      // Adicionar UTMs salvos
      Object.entries(utmParams).forEach(([key, value]) => {
        if (value) {
          url.searchParams.set(key, value)
        }
      })

      // Adicionar timestamp para tracking
      url.searchParams.set('timestamp', Date.now().toString())
      
      // Adicionar identificador da landing page
      url.searchParams.set('lp_source', 'landing_page_vencedora')

      return url.toString()
    } catch (error) {
      console.error('Erro ao adicionar UTMs à URL:', error)
      return baseURL
    }
  }

  return {
    utmParams,
    addUTMsToURL,
    isClient
  }
} 