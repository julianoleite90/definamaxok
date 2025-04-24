"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, ArrowLeft, Check, ShoppingCart, Loader2 } from "lucide-react"

interface VimeoVideoProps {
  videoId: string
  title?: string
}

function VimeoVideo({ videoId, title = "Vimeo Video" }: VimeoVideoProps) {
  return (
    <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-md">
      <iframe
        src={`https://player.vimeo.com/video/1078349413`}
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={title}
      ></iframe>
    </div>
  )
}

export default function WeightLossRecommendation() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    goal: "",
    waterIntake: "",
  })
  const [errors, setErrors] = useState({
    name: false,
    age: false,
    height: false,
    weight: false,
    goal: false,
    waterIntake: false,
  })

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === "",
      age: formData.age === "" || Number.parseInt(formData.age) < 18,
      height: formData.height === "" || Number.parseInt(formData.height) < 100,
      weight: formData.weight === "" || Number.parseInt(formData.weight) < 30,
      goal: formData.goal === "" || Number.parseInt(formData.goal) <= 0,
      waterIntake: formData.waterIntake === "",
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: false }))
    }
  }

  const handleContinue = () => {
    if (validateForm()) {
      setStep(2)
    }
  }

  const handleConfirm = () => {
    setLoading(true)
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false)
      setStep(3)
    }, 1000)
  }

  const handleContinueToRecommendation = () => {
    setStep(4)
  }

  const handleReset = () => {
    setStep(1)
  }

  const getRecommendation = () => {
    const goal = Number.parseInt(formData.goal)

    if (goal <= 5) {
      return {
        kit: "1 frasco",
        duration: "30 dias",
        capsules: "2 cápsulas por dia",
      }
    } else if (goal <= 12) {
      return {
        kit: "3 frascos",
        duration: "90 dias",
        capsules: "2 cápsulas por dia",
      }
    } else {
      return {
        kit: "6 frascos",
        duration: "180 dias",
        capsules: "2 cápsulas por dia",
      }
    }
  }

  function getPurchaseLink() {
    const goal = Number.parseInt(formData.goal)

    if (goal <= 5) {
      return "https://sua-loja.com/comprar/kit-1-frasco"
    } else if (goal <= 12) {
      return "https://sua-loja.com/comprar/kit-3-frascos"
    } else {
      return "https://sua-loja.com/comprar/kit-6-frascos"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <header className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-2">
              Descubra o Kit Ideal para Seu Emagrecimento
            </h1>
            <p className="text-gray-600">Preencha os dados abaixo e receba uma recomendação personalizada.</p>
          </header>

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-md bg-gray-100 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="Seu nome"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">Por favor, informe seu nome.</p>}
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Idade (mínimo 18 anos)
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  min="18"
                  value={formData.age}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-md bg-gray-100 border ${
                    errors.age ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="Ex: 35"
                />
                {errors.age && (
                  <p className="mt-1 text-sm text-red-600">Por favor, informe uma idade válida (mínimo 18 anos).</p>
                )}
              </div>

              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                  Altura (em cm)
                </label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  min="100"
                  value={formData.height}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-md bg-gray-100 border ${
                    errors.height ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="Ex: 170"
                />
                {errors.height && (
                  <p className="mt-1 text-sm text-red-600">Por favor, informe uma altura válida em cm.</p>
                )}
              </div>

              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                  Peso atual (em kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  min="30"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-md bg-gray-100 border ${
                    errors.weight ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="Ex: 80"
                />
                {errors.weight && <p className="mt-1 text-sm text-red-600">Por favor, informe um peso válido em kg.</p>}
              </div>

              <div>
                <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">
                  Objetivo de perda de peso (em kg)
                </label>
                <input
                  type="number"
                  id="goal"
                  name="goal"
                  min="1"
                  value={formData.goal}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-md bg-gray-100 border ${
                    errors.goal ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="Ex: 10"
                />
                {errors.goal && (
                  <p className="mt-1 text-sm text-red-600">Por favor, informe um objetivo válido de perda de peso.</p>
                )}
              </div>

              <div>
                <label htmlFor="waterIntake" className="block text-sm font-medium text-gray-700 mb-1">
                  Você consegue tomar de 1 a 2 litros de água por dia?
                </label>
                <select
                  id="waterIntake"
                  name="waterIntake"
                  value={formData.waterIntake}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-md bg-gray-100 border ${
                    errors.waterIntake ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                >
                  <option value="">Selecione uma opção</option>
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>
                {errors.waterIntake && <p className="mt-1 text-sm text-red-600">Por favor, selecione uma opção.</p>}
              </div>

              <button
                onClick={handleContinue}
                className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-md flex items-center justify-center transition-colors"
              >
                Continuar
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800">Você deseja perder {formData.goal} kg?</h2>

              <div className="flex space-x-4 justify-center">
                {loading ? (
                  <button
                    disabled
                    className="py-3 px-8 bg-gray-400 text-white font-medium rounded-md shadow-md flex items-center justify-center"
                  >
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processando...
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleConfirm}
                      className="py-3 px-8 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-md transition-colors"
                    >
                      Sim
                    </button>
                    <button
                      onClick={handleReset}
                      className="py-3 px-8 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium rounded-md shadow-md transition-colors"
                    >
                      Não
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-green-700 text-center">Relato de consumidores</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Assista ao vídeo</h3>
                  <VimeoVideo videoId="123456789" title="Como funciona nosso produto de emagrecimento" />
                </div>

                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Como Funciona no Organismo</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md">
                      <div className="relative w-full h-40">
                        <Image src="/1fase.png" alt="Etapa 1" fill className="object-cover" />
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-green-700">Etapa 1</h4>
                        <p className="text-sm text-gray-600">
                          As cápsulas são absorvidas pelo sistema digestivo, e inibem o apetite.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg overflow-hidden shadow-md">
                      <div className="relative w-full h-40">
                        <Image src="/2fase.png" alt="Etapa 2" fill className="object-cover" />
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-green-700">Etapa 2</h4>
                        <p className="text-sm text-gray-600">
                          Os compostos aceleram o metabolismo e iniciam o processo de queima de gordura.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg overflow-hidden shadow-md">
                      <div className="relative w-full h-40">
                        <Image src="/3fase.png" alt="Etapa 3" fill className="object-cover" />
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-green-700">Etapa 3</h4>
                        <p className="text-sm text-gray-600">
                          A gordura é eliminada e o corpo começa a mostrar resultados visíveis.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleContinueToRecommendation}
                  className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-md flex items-center justify-center transition-colors"
                >
                  Ver Recomendação
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="border-2 border-green-500 rounded-lg p-4 bg-green-50">
                <div className="flex items-start">
                  <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Olá, {formData.name}!</h2>
                    <p className="text-gray-700 mb-4">
                      Para perder {formData.goal} kg, recomendamos o kit de {getRecommendation().kit}, tomando{" "}
                      {getRecommendation().capsules} durante {getRecommendation().duration}.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-800">Benefícios do kit:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Inibição de apetite</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Aceleração do metabolismo</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Aumento de energia</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Melhora na disposição</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <a
                  href={getPurchaseLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md shadow-lg flex items-center justify-center text-lg transition-colors"
                >
                  <ShoppingCart className="mr-2 h-6 w-6" />
                  Comprar Agora
                </a>

                <button
                  onClick={handleReset}
                  className="w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md shadow-md flex items-center justify-center transition-colors"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Voltar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
