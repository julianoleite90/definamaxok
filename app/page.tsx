"use client"

import { useRef, useEffect } from 'react'
import { useUTMTracking } from './hooks/useUTMTracking'
import UrgencyBar from './components/UrgencyBar'
import Hero from './components/Hero'
import Benefits from './components/Benefits'
import SelfEsteem from './components/SelfEsteem'
import ProductShowcase from './components/ProductShowcase'
import VideoSection from './components/VideoSection'
import TestimonialsCarousel from './components/TestimonialsCarousel'
import VideoTestimonialsCarousel from './components/VideoTestimonialsCarousel'
import BenefitsSection from './components/BenefitsSection'
import FormulationSection from './components/FormulationSection'
import PricingSection from './components/PricingSection'
import GuaranteeSection from './components/GuaranteeSection'
import FAQSection from './components/FAQSection'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function LandingPage() {
  const kitsRef = useRef<HTMLDivElement>(null)
  const { utmParams } = useUTMTracking()

  const scrollToKits = () => {
    kitsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Enviar evento de page view para Google Analytics com UTMs
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: 'Definamax - Landing Page Vencedora',
        page_location: window.location.href,
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
      })
    }
  }, [utmParams])

  return (
    <div className="min-h-screen bg-gray-50">
      <header>
        <UrgencyBar />
      </header>
      <main>
        <Hero />
      <section aria-label="Benefícios do produto">
        <Benefits />
      </section>
      <section aria-label="Autoestima e transformação">
        <SelfEsteem />
      </section>
      <section aria-label="Apresentação do produto">
        <ProductShowcase />
      </section>
      <section aria-label="Vídeo explicativo">
        <VideoSection />
      </section>
      <section aria-label="Depoimentos de clientes">
        <TestimonialsCarousel />
      </section>
      <section aria-label="Benefícios detalhados">
        <BenefitsSection />
      </section>
      <section aria-label="Depoimentos em vídeo">
        <VideoTestimonialsCarousel scrollToKits={scrollToKits} />
      </section>
      <section aria-label="Formulação do produto">
        <FormulationSection />
      </section>
      <section ref={kitsRef} id="kits-section" aria-label="Pacotes e preços">
        <PricingSection />
      </section>
      <section aria-label="Garantia do produto">
        <GuaranteeSection />
      </section>
      <section aria-label="Perguntas frequentes">
        <FAQSection />
      </section>
      </main>
      <footer>
        <Footer />
      </footer>
      
      {/* Botão WhatsApp fixo */}
      <WhatsAppButton />
    </div>
  )
}

