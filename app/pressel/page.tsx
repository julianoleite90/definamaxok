"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Loader2 } from "lucide-react"

export default function RedirectPage() {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate content loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-green-800 via-green-700 to-green-800 py-4 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] animate-[shine_1.5s_infinite] pointer-events-none"></div>
        <div className="mx-auto max-w-5xl px-4 flex justify-center">
          <Image src="/logo2.png" alt="Definamax" width={200} height={60} className="h-12 w-auto" />
        </div>
      </header>

      {/* Redirect Content */}
      <div className="flex flex-col items-center justify-center flex-1 p-6 max-w-md mx-auto text-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full border border-green-100">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Bem-vindo ao Definamax</h1>

          {isLoading ? (
            <div className="flex flex-col items-center space-y-4 py-6">
              <Loader2 className="h-10 w-10 text-green-600 animate-spin" />
              <p className="text-gray-600">O conteúdo está sendo carregado...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-gray-600">
                Você está sendo redirecionado para o site oficial do Definamax, onde poderá conhecer todos os benefícios.
              </p>

              <Link
                href="https://www.definamaxoficial.com/rmkt"
                className="inline-flex items-center justify-center w-full rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 text-base font-bold text-white hover:from-green-500 hover:to-green-600 hover:scale-105 transition-all shadow-lg hover:shadow-xl border-b-4 border-green-700"
              >
                ACESSAR O SITE OFICIAL <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <p className="text-sm text-gray-500 mt-4">
                Clique no botão acima para continuar para o site oficial do Definamax. 
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-4 bg-gray-50 border-t border-gray-100">
        <div className="text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Definamax. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  )
}
