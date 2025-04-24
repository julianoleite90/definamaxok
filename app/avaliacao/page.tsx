"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import {
  ArrowRight,
  ArrowLeft,
  Check,
  ShoppingCart,
  Loader2,
  Calendar,
  Activity,
  Utensils,
  Clock,
  ChevronRight,
  Target,
  TrendingUp,
  Droplets,
  Dumbbell,
} from "lucide-react"

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

// Componente de progresso de etapas
function ProgressSteps({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`relative flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              index + 1 <= currentStep ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            {index + 1}
            {index < totalSteps - 1 && (
              <div
                className={`absolute top-1/2 left-full w-full h-1 -translate-y-1/2 ${
                  index + 1 < currentStep ? "bg-green-600" : "bg-gray-200"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>Perfil</span>
        <span>Hábitos</span>
        <span>Análise</span>
        <span>Plano</span>
      </div>
    </div>
  )
}

// Componente de cronograma
function Timeline({ weeks, goal }: { weeks: number; goal: number }) {
  const milestones = [
    { week: 1, percent: 5, label: "Início" },
    { week: Math.floor(weeks * 0.25), percent: 20, label: "Adaptação" },
    { week: Math.floor(weeks * 0.5), percent: 50, label: "Progresso" },
    { week: Math.floor(weeks * 0.75), percent: 75, label: "Aceleração" },
    { week: weeks, percent: 100, label: "Meta" },
  ]

  return (
    <div className="mt-4 mb-6">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Cronograma estimado de perda de peso:</h4>
      <div className="relative pt-6 pb-2">
        <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200"></div>
        <div className="flex justify-between relative">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-4 h-4 rounded-full ${index === milestones.length - 1 ? "bg-green-600" : "bg-green-400"} z-10`}
              ></div>
              <div className="text-xs font-medium mt-1 text-gray-600">{milestone.label}</div>
              <div className="text-xs mt-1 text-gray-500">
                {index === milestones.length - 1 ? `${goal}kg` : `${Math.round((goal * milestone.percent) / 100)}kg`}
              </div>
              <div className="text-xs mt-1 text-gray-500">Semana {milestone.week}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function WeightLossRecommendation() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Dados pessoais
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    goal: "",

    // Hábitos e estilo de vida
    activityLevel: "",
    sleepQuality: "",
    waterIntake: "",
    mealFrequency: "",
    dietaryRestrictions: "",
    previousDiets: "",
    stressLevel: "",
  })

  const [errors, setErrors] = useState({
    name: false,
    age: false,
    gender: false,
    height: false,
    weight: false,
    goal: false,
    activityLevel: false,
    sleepQuality: false,
    waterIntake: false,
    mealFrequency: false,
    dietaryRestrictions: false,
    previousDiets: false,
    stressLevel: false,
  })

  const [bmi, setBmi] = useState<number | null>(null)
  const [idealWeight, setIdealWeight] = useState<number | null>(null)
  const [weeklyGoal, setWeeklyGoal] = useState<number | null>(null)
  const [timeToGoal, setTimeToGoal] = useState<number | null>(null)

  // Calcular IMC e peso ideal quando altura e peso forem preenchidos
  useEffect(() => {
    if (formData.height && formData.weight) {
      const heightInM = Number.parseInt(formData.height) / 100
      const weight = Number.parseInt(formData.weight)
      const calculatedBmi = weight / (heightInM * heightInM)
      setBmi(Math.round(calculatedBmi * 10) / 10)

      // Cálculo de peso ideal baseado na fórmula de IMC ideal (22.5)
      const calculatedIdealWeight = Math.round(22.5 * heightInM * heightInM)
      setIdealWeight(calculatedIdealWeight)
    }
  }, [formData.height, formData.weight])

  // Calcular tempo estimado para atingir o objetivo
  useEffect(() => {
    if (formData.goal) {
      const goal = Number.parseInt(formData.goal)

      // Taxas de perda de peso otimizadas com o uso do produto
      let weeklyLoss = 1.2 // padrão para sedentário com o produto

      if (formData.activityLevel === "leve") {
        weeklyLoss = 1.5
      } else if (formData.activityLevel === "moderado") {
        weeklyLoss = 1.8
      } else if (formData.activityLevel === "alto" || formData.activityLevel === "muito_alto") {
        weeklyLoss = 2.2
      }

      // Fator de aceleração do produto (simulando efeito potencializado)
      const accelerationFactor = 1.2
      weeklyLoss = weeklyLoss * accelerationFactor

      setWeeklyGoal(Math.round(weeklyLoss * 10) / 10) // Arredondar para 1 casa decimal

      // Calcular semanas com um pequeno desconto para parecer ainda mais rápido
      const weeks = Math.max(2, Math.ceil((goal / weeklyLoss) * 0.85))
      setTimeToGoal(weeks)
    }
  }, [formData.goal, formData.activityLevel])

  const validateFormStep1 = () => {
    const newErrors = {
      ...errors,
      name: formData.name.trim() === "",
      age: formData.age === "" || Number.parseInt(formData.age) < 18,
      gender: formData.gender === "",
      height: formData.height === "" || Number.parseInt(formData.height) < 100,
      weight: formData.weight === "" || Number.parseInt(formData.weight) < 30,
      goal: formData.goal === "" || Number.parseInt(formData.goal) <= 0,
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error, index) => index < 6 && error)
  }

  const validateFormStep2 = () => {
    const newErrors = {
      ...errors,
      activityLevel: formData.activityLevel === "",
      sleepQuality: formData.sleepQuality === "",
      waterIntake: formData.waterIntake === "",
      mealFrequency: formData.mealFrequency === "",
      dietaryRestrictions: formData.dietaryRestrictions === "",
      previousDiets: formData.previousDiets === "",
      stressLevel: formData.stressLevel === "",
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error, index) => index >= 6 && error)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: false }))
    }
  }

  const handleContinueToStep2 = () => {
    if (validateFormStep1()) {
      setStep(2)
    }
  }

  const handleContinueToStep3 = () => {
    if (validateFormStep2()) {
      setLoading(true)
      // Simulate loading delay
      setTimeout(() => {
        setLoading(false)
        setStep(3)
      }, 1500)
    }
  }

  const handleContinueToStep4 = () => {
    setStep(4)
  }

  const handleReset = () => {
    setStep(1)
  }

  const getRecommendation = () => {
    const goal = Number.parseInt(formData.goal)

    // Determinar o kit com base no objetivo e outros fatores
    if (goal <= 5) {
      return {
        kit: "1 frasco",
        duration: "30 dias",
        capsules: "2 cápsulas por dia",
        intensity: "leve",
      }
    } else if (goal <= 12) {
      return {
        kit: "3 frascos",
        duration: "90 dias",
        capsules: "2 cápsulas por dia",
        intensity: "moderada",
      }
    } else {
      return {
        kit: "6 frascos",
        duration: "180 dias",
        capsules: "2 cápsulas por dia",
        intensity: "intensiva",
      }
    }
  }

  function getPurchaseLink() {
    const goal = Number.parseInt(formData.goal)

    if (goal <= 5) {
      return "https://full.sale/aNAgTD"
    } else if (goal <= 12) {
      return "https://full.sale/fDTVWH"
    } else {
      return "https://full.sale/EgnvbQ"
    }
  }

  function getBmiCategory(bmiValue: number) {
    if (bmiValue < 18.5) return { category: "Abaixo do peso", color: "text-blue-500" }
    if (bmiValue < 25) return { category: "Peso normal", color: "text-green-500" }
    if (bmiValue < 30) return { category: "Sobrepeso", color: "text-yellow-500" }
    if (bmiValue < 35) return { category: "Obesidade Grau I", color: "text-orange-500" }
    if (bmiValue < 40) return { category: "Obesidade Grau II", color: "text-red-500" }
    return { category: "Obesidade Grau III", color: "text-red-700" }
  }

  function getAdditionalRecommendations() {
    const recommendations = []

    // Recomendações baseadas no nível de atividade
    if (formData.activityLevel === "sedentario") {
      recommendations.push("Comece com caminhadas leves de 15-20 minutos, 3 vezes por semana")
    } else if (formData.activityLevel === "moderado") {
      recommendations.push("Mantenha sua rotina de exercícios, aumentando gradualmente a intensidade")
    } else if (formData.activityLevel === "alto") {
      recommendations.push("Continue com seus exercícios de alta intensidade, focando em recuperação adequada")
    }

    // Recomendações baseadas na qualidade do sono
    if (formData.sleepQuality === "ruim") {
      recommendations.push("Priorize melhorar sua qualidade de sono - tente dormir 7-8 horas por noite")
    }

    // Recomendações baseadas na ingestão de água
    if (formData.waterIntake === "pouca") {
      recommendations.push("Aumente sua ingestão de água para pelo menos 2 litros por dia")
    }

    return recommendations
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <header className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-2">
              Avaliação Personalizada para Emagrecimento
            </h1>
            <p className="text-gray-600">
              Complete nossa avaliação profissional e receba um plano personalizado para atingir seus objetivos.
            </p>
          </header>

          {/* Indicador de progresso */}
          <ProgressSteps currentStep={step} totalSteps={4} />

          {step === 1 && (
            <div className="space-y-5">
              <div className="bg-green-50 rounded-lg p-4 border border-green-100 mb-6">
                <h2 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Perfil Pessoal
                </h2>
                <p className="text-sm text-green-700">
                  Estas informações são essenciais para criarmos um plano personalizado que atenda às suas necessidades
                  específicas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
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
                    placeholder="Seu nome completo"
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
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                    Gênero
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-md bg-gray-100 border ${
                      errors.gender ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                    <option value="prefiro_nao_informar">Prefiro não informar</option>
                  </select>
                  {errors.gender && <p className="mt-1 text-sm text-red-600">Por favor, selecione uma opção.</p>}
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
                  {errors.weight && (
                    <p className="mt-1 text-sm text-red-600">Por favor, informe um peso válido em kg.</p>
                  )}
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
              </div>

              {bmi && idealWeight && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Informações calculadas:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Seu IMC atual:</p>
                      <p className={`text-lg font-semibold ${getBmiCategory(bmi).color}`}>
                        {bmi} - {getBmiCategory(bmi).category}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Peso ideal estimado:</p>
                      <p className="text-lg font-semibold text-green-600">{idealWeight} kg</p>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleContinueToStep2}
                className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-md flex items-center justify-center transition-colors"
              >
                Continuar para Hábitos
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="bg-green-50 rounded-lg p-4 border border-green-100 mb-6">
                <h2 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  Hábitos e Estilo de Vida
                </h2>
                <p className="text-sm text-green-700">
                  Seus hábitos diários têm um impacto significativo no seu processo de emagrecimento. Estas informações
                  nos ajudarão a personalizar ainda mais seu plano.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700 mb-1">
                    Nível de Atividade Física
                  </label>
                  <select
                    id="activityLevel"
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-md bg-gray-100 border ${
                      errors.activityLevel ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="sedentario">Sedentário (pouco ou nenhum exercício)</option>
                    <option value="leve">Leve (exercício 1-3 dias/semana)</option>
                    <option value="moderado">Moderado (exercício 3-5 dias/semana)</option>
                    <option value="alto">Alto (exercício 6-7 dias/semana)</option>
                    <option value="muito_alto">Muito alto (exercício intenso diário)</option>
                  </select>
                  {errors.activityLevel && <p className="mt-1 text-sm text-red-600">Por favor, selecione uma opção.</p>}
                </div>

                <div>
                  <label htmlFor="sleepQuality" className="block text-sm font-medium text-gray-700 mb-1">
                    Qualidade do Sono
                  </label>
                  <select
                    id="sleepQuality"
                    name="sleepQuality"
                    value={formData.sleepQuality}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-md bg-gray-100 border ${
                      errors.sleepQuality ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="ruim">Ruim (menos de 6 horas/noite)</option>
                    <option value="regular">Regular (6-7 horas/noite)</option>
                    <option value="boa">Boa (7-8 horas/noite)</option>
                    <option value="excelente">Excelente (8+ horas/noite)</option>
                  </select>
                  {errors.sleepQuality && <p className="mt-1 text-sm text-red-600">Por favor, selecione uma opção.</p>}
                </div>

                <div>
                  <label htmlFor="waterIntake" className="block text-sm font-medium text-gray-700 mb-1">
                    Consumo Diário de Água
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
                    <option value="pouca">Menos de 1 litro por dia</option>
                    <option value="moderada">1-2 litros por dia</option>
                    <option value="adequada">2-3 litros por dia</option>
                    <option value="abundante">Mais de 3 litros por dia</option>
                  </select>
                  {errors.waterIntake && <p className="mt-1 text-sm text-red-600">Por favor, selecione uma opção.</p>}
                </div>

                <div>
                  <label htmlFor="mealFrequency" className="block text-sm font-medium text-gray-700 mb-1">
                    Frequência de Refeições
                  </label>
                  <select
                    id="mealFrequency"
                    name="mealFrequency"
                    value={formData.mealFrequency}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-md bg-gray-100 border ${
                      errors.mealFrequency ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="1-2">1-2 refeições por dia</option>
                    <option value="3">3 refeições por dia</option>
                    <option value="4-5">4-5 refeições por dia</option>
                    <option value="6+">6 ou mais refeições por dia</option>
                  </select>
                  {errors.mealFrequency && <p className="mt-1 text-sm text-red-600">Por favor, selecione uma opção.</p>}
                </div>

                <div>
                  <label htmlFor="stressLevel" className="block text-sm font-medium text-gray-700 mb-1">
                    Nível de Estresse
                  </label>
                  <select
                    id="stressLevel"
                    name="stressLevel"
                    value={formData.stressLevel}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-md bg-gray-100 border ${
                      errors.stressLevel ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="baixo">Baixo (raramente me sinto estressado/a)</option>
                    <option value="moderado">Moderado (estresse ocasional)</option>
                    <option value="alto">Alto (frequentemente estressado/a)</option>
                    <option value="muito_alto">Muito alto (estresse constante)</option>
                  </select>
                  {errors.stressLevel && <p className="mt-1 text-sm text-red-600">Por favor, selecione uma opção.</p>}
                </div>

                <div>
                  <label htmlFor="previousDiets" className="block text-sm font-medium text-gray-700 mb-1">
                    Experiência com Dietas Anteriores
                  </label>
                  <select
                    id="previousDiets"
                    name="previousDiets"
                    value={formData.previousDiets}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-md bg-gray-100 border ${
                      errors.previousDiets ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="nenhuma">Nenhuma experiência anterior</option>
                    <option value="pouca">Tentei 1-2 dietas sem sucesso</option>
                    <option value="moderada">Tentei várias dietas com sucesso temporário</option>
                    <option value="muita">Experiência extensa com dietas</option>
                  </select>
                  {errors.previousDiets && <p className="mt-1 text-sm text-red-600">Por favor, selecione uma opção.</p>}
                </div>
              </div>

              <div>
                <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700 mb-1">
                  Restrições Alimentares ou Alergias
                </label>
                <textarea
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-2 rounded-md bg-gray-100 border ${
                    errors.dietaryRestrictions ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="Descreva quaisquer restrições alimentares ou alergias que você tenha. Se não tiver, escreva 'Nenhuma'."
                ></textarea>
                {errors.dietaryRestrictions && (
                  <p className="mt-1 text-sm text-red-600">Por favor, preencha este campo.</p>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/2 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md shadow-md flex items-center justify-center transition-colors"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Voltar
                </button>

                <button
                  onClick={handleContinueToStep3}
                  className="w-1/2 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-md flex items-center justify-center transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analisando...
                    </>
                  ) : (
                    <>
                      Continuar
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-green-50 rounded-lg p-4 border border-green-100 mb-6">
                <h2 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Relato pessoal de consumidor Definamax
                </h2>
                <p className="text-sm text-green-700">
                  Assista ao vídeo abaixo e veja o que uma de nossas consumidoras relatou sobre a sua experiência com o Definamax
                </p>
              </div>

              <div>
                <VimeoVideo videoId="123456789" title="Como funciona nosso produto de emagrecimento" />
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-green-700 mb-4">As 4 Etapas do Processo de Emagrecimento</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-start">
                      <div className="bg-green-100 rounded-full p-3 mr-3">
                        <Droplets className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">Etapa 1: Desintoxicação</h4>
                        <p className="text-sm text-gray-600">
                          Nos primeiros dias, o produto inicia um processo de desintoxicação, eliminando toxinas e
                          preparando seu corpo para o emagrecimento.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-start">
                      <div className="bg-green-100 rounded-full p-3 mr-3">
                        <Utensils className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">Etapa 2: Controle do Apetite</h4>
                        <p className="text-sm text-gray-600">
                          A partir da primeira semana, você notará uma redução natural do apetite e dos desejos por
                          alimentos calóricos.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-start">
                      <div className="bg-green-100 rounded-full p-3 mr-3">
                        <Dumbbell className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">Etapa 3: Aceleração Metabólica</h4>
                        <p className="text-sm text-gray-600">
                          Seu metabolismo é acelerado, aumentando a queima de gordura mesmo em repouso e potencializando
                          os resultados dos exercícios.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-start">
                      <div className="bg-green-100 rounded-full p-3 mr-3">
                        <Activity className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">Etapa 4: Transformação Corporal</h4>
                        <p className="text-sm text-gray-600">
                          A gordura localizada é eliminada progressivamente, resultando em uma transformação visível da
                          sua silhueta.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Resultados Reais</h3>
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative w-full h-48 md:h-64">
                    <Image src="/antesedepoisformulario.png" alt="Antes e Depois" fill className="object-cover" />
                  </div>
                  <div className="p-3 text-center text-sm text-gray-600">Resultados reais após 90 dias de uso</div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setStep(2)}
                  className="w-1/2 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md shadow-md flex items-center justify-center transition-colors"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Voltar
                </button>

                <button
                  onClick={handleContinueToStep4}
                  className="w-1/2 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-md flex items-center justify-center transition-colors"
                >
                  Ver Recomendação
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-green-50 rounded-lg p-5 border-2 border-green-500">
                <div className="flex items-start">
                  <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      Plano Personalizado para {formData.name}
                    </h2>
                    <p className="text-gray-700">
                      Com base na sua avaliação completa, desenvolvemos um plano personalizado para ajudá-lo(a) a perder{" "}
                      {formData.goal} kg de forma saudável e sustentável.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Resumo da Avaliação
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Idade:</p>
                    <p className="font-medium">{formData.age} anos</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Altura:</p>
                    <p className="font-medium">{formData.height} cm</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Peso atual:</p>
                    <p className="font-medium">{formData.weight} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">IMC atual:</p>
                    <p className="font-medium">
                      {bmi} ({getBmiCategory(bmi!).category})
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nível de atividade:</p>
                    <p className="font-medium">{formData.activityLevel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Consumo de água:</p>
                    <p className="font-medium">{formData.waterIntake}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium text-gray-700 mb-2">Objetivo:</h4>
                  <div className="bg-green-50 p-3 rounded-md">
                    <p className="font-semibold text-green-800">
                      Perder {formData.goal} kg em aproximadamente {timeToGoal} semanas
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Cronograma e Expectativas
                </h3>

                <p className="text-gray-700 mb-3">
                  Com nosso produto avançado, você pode alcançar uma perda de peso acelerada de até {weeklyGoal} kg por
                  semana, muito mais rápido que métodos convencionais.
                </p>
                <p className="text-sm text-green-700 font-medium mb-3">
                  Nossa fórmula exclusiva potencializa seu metabolismo, permitindo resultados até 3x mais rápidos que
                  dietas comuns.
                </p>

                <Timeline weeks={timeToGoal!} goal={Number.parseInt(formData.goal)} />

                <div className="bg-yellow-50 p-3 rounded-md border border-yellow-100 mt-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Importante:</strong> Os resultados podem variar de pessoa para pessoa. Este cronograma é uma
                    estimativa baseada em seu perfil atual.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Recomendação de Kit
                </h3>

                <div className="p-4 bg-green-50 rounded-lg border border-green-100 mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Kit Recomendado: {getRecommendation().kit}</h4>
                  <div className="bg-green-600 text-white p-2 rounded-md mb-3 text-center font-medium">
                    Resultados em até {timeToGoal} semanas!
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Duração do tratamento: {getRecommendation().duration}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Posologia: {getRecommendation().capsules}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Intensidade do tratamento: {getRecommendation().intensity}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>
                        <strong>Perda de peso acelerada:</strong> até {weeklyGoal} kg por semana
                      </span>
                    </li>
                  </ul>
                </div>

                <h4 className="font-medium text-gray-800 mb-2">Benefícios do kit:</h4>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>
                      <strong>Resultados rápidos:</strong> Efeitos visíveis já nas primeiras semanas
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>
                      <strong>Potente inibição de apetite:</strong> Redução imediata da fome
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>
                      <strong>Aceleração metabólica:</strong> Queima de gordura até 3x mais rápida
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>
                      <strong>Energia explosiva:</strong> Disposição para atividades físicas
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>
                      <strong>Efeito 24 horas:</strong> Continua agindo mesmo durante o sono
                    </span>
                  </li>
                </ul>

                <a
                  href={getPurchaseLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md shadow-lg flex items-center justify-center text-lg transition-colors"
                >
                  <ShoppingCart className="mr-2 h-6 w-6" />
                  Comprar Kit Recomendado
                </a>
              </div>

              <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Recomendações Adicionais
                </h3>

                <ul className="space-y-3">
                  {getAdditionalRecommendations().map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{recommendation}</span>
                    </li>
                  ))}
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Mantenha uma dieta balanceada, rica em proteínas e vegetais</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Tome as cápsulas conforme recomendado, preferencialmente 30 minutos antes das refeições</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleReset}
                  className="w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md shadow-md flex items-center justify-center transition-colors"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Refazer Avaliação
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
