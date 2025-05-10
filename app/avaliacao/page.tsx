"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
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
  Shield,
} from "lucide-react"

interface VimeoVideoProps {
  videoId: string
  title?: string
}

function VimeoVideo({ videoId, title = "Vimeo Video" }: VimeoVideoProps) {
  return (
    <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-md">
      <img
        src="https://emagrecedores-naturais.com/wp-content/uploads/2025/05/Captura-de-Tela-2025-05-10-as-12.12.24.png"
        alt=""
      />
      <iframe
        src="https://player.vimeo.com/video/1078349413?autoplay=1&loop=0&muted=0&background=1"
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
        muted
        playsInline
        title="Como o Definamax funciona"
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

function ProductExplanation() {
  return (
    <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-green-700 mb-3">Como o Definamax Funciona</h3>

      <div className="bg-green-50 p-4 rounded-lg mb-4">
        <p className="text-gray-700 font-medium">
          O Definamax revoluciona o processo de emagrecimento através de sua tecnologia exclusiva de tripla ação:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg border border-green-100 shadow-sm">
          <div className="flex items-center mb-2">
            <div className="bg-green-100 rounded-full p-2 mr-2">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-800">Bloqueio de Gorduras</h4>
          </div>
          <p className="text-sm text-gray-600">
            As fibras inteligentes patenteadas do Definamax capturam e absorvem até 76% das gorduras ingeridas antes que
            sejam absorvidas pelo organismo, impedindo seu acúmulo.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-green-100 shadow-sm">
          <div className="flex items-center mb-2">
            <div className="bg-green-100 rounded-full p-2 mr-2">
              <Activity className="h-5 w-5 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-800">Aceleração Metabólica</h4>
          </div>
          <p className="text-sm text-gray-600">
            Seus compostos bioativos estimulam o metabolismo a trabalhar até 3x mais rápido, transformando seu corpo em
            uma máquina de queimar calorias 24 horas por dia, mesmo durante o sono.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-green-100 shadow-sm">
          <div className="flex items-center mb-2">
            <div className="bg-green-100 rounded-full p-2 mr-2">
              <Utensils className="h-5 w-5 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-800">Controle da Saciedade</h4>
          </div>
          <p className="text-sm text-gray-600">
            O complexo de fibras e extratos naturais promove uma sensação duradoura de saciedade, reduzindo naturalmente
            a fome e os desejos por alimentos calóricos sem esforço.
          </p>
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
        <p className="text-sm text-green-700">
          <strong>Resultado:</strong> Perda de peso rápida, eficaz e sem efeito sanfona, sem necessidade de dietas
          restritivas ou exercícios intensos. O Definamax trabalha para você, enquanto você segue sua vida normalmente.
        </p>
      </div>
    </div>
  )
}

// Adicionar após a função Timeline:

function MetabolicProfile({
  age,
  gender,
  bmi,
  activityLevel,
  weight,
  height,
}: { age: string; gender: string; bmi: number; activityLevel: string; weight: string; height: string }) {
  let metabolicRate = "normal"
  let burnRate = 0

  const weightKg = Number.parseInt(weight)
  const heightCm = Number.parseInt(height)
  const ageYears = Number.parseInt(age)

  // Cálculo da Taxa Metabólica Basal usando a fórmula de Harris-Benedict revisada
  if (gender === "masculino") {
    // Fórmula para homens: TMB = 88.362 + (13.397 × peso em kg) + (4.799 × altura em cm) - (5.677 × idade em anos)
    burnRate = Math.round(88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * ageYears)
  } else {
    // Fórmula para mulheres: TMB = 447.593 + (9.247 × peso em kg) + (3.098 × altura em cm) - (4.330 × idade em anos)
    burnRate = Math.round(447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * ageYears)
  }

  // Ajuste baseado no nível de atividade (fatores padrão de nutrição)
  if (activityLevel === "sedentario") {
    burnRate = Math.round(burnRate * 1.2)
    metabolicRate = "lento"
  } else if (activityLevel === "leve") {
    burnRate = Math.round(burnRate * 1.375)
    metabolicRate = "moderado"
  } else if (activityLevel === "moderado") {
    burnRate = Math.round(burnRate * 1.55)
    metabolicRate = "normal"
  } else if (activityLevel === "alto") {
    burnRate = Math.round(burnRate * 1.725)
    metabolicRate = "acelerado"
  } else if (activityLevel === "muito_alto") {
    burnRate = Math.round(burnRate * 1.9)
    metabolicRate = "muito acelerado"
  }

  return (
    <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-green-700 mb-3">Seu Perfil Metabólico</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">Taxa Metabólica</h4>
          <p className="text-2xl font-bold text-green-600 mb-1">{metabolicRate.toUpperCase()}</p>
          <p className="text-sm text-gray-600">
            Seu metabolismo está {metabolicRate}, o que influencia diretamente sua capacidade de queimar calorias.
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">Queima Calórica Diária</h4>
          <p className="text-2xl font-bold text-green-600 mb-1">{burnRate} kcal</p>
          <p className="text-sm text-gray-600">
            Esta é uma estimativa de quantas calorias seu corpo queima diariamente em repouso, baseada na fórmula de
            Harris-Benedict.
          </p>
        </div>
      </div>
    </div>
  )
}

function HealthInsights({
  age,
  bmi,
  waterIntake,
  stressLevel,
}: { age: string; bmi: number; waterIntake: string; stressLevel: string }) {
  const insights = []

  // Insights baseados no IMC
  if (bmi < 18.5) {
    insights.push("Seu IMC indica que você está abaixo do peso ideal. Foque em ganhar massa magra de forma saudável.")
  } else if (bmi >= 25 && bmi < 30) {
    insights.push("Seu IMC indica sobrepeso. Uma perda de peso gradual e consistente é recomendada.")
  } else if (bmi >= 30) {
    insights.push("Seu IMC indica obesidade. Recomendamos acompanhamento médico durante seu processo de emagrecimento.")
  }

  // Insights baseados na idade
  const ageNum = Number.parseInt(age)
  if (ageNum > 40) {
    insights.push(
      "Após os 40 anos, o metabolismo naturalmente desacelera. Nosso produto ajuda a reverter esse processo.",
    )
  }

  // Insights baseados na ingestão de água
  if (waterIntake === "pouca") {
    insights.push(
      "Sua baixa ingestão de água pode estar prejudicando seu metabolismo. Aumente para pelo menos 2L diários.",
    )
  }

  // Insights baseados no nível de estresse
  if (stressLevel === "alto" || stressLevel === "muito_alto") {
    insights.push("Altos níveis de estresse aumentam o cortisol, hormônio que favorece o acúmulo de gordura abdominal.")
  }

  // Adicionar insight padrão se não houver outros
  if (insights.length === 0) {
    insights.push("Seu perfil indica boas condições para resultados rápidos com nosso produto.")
  }

  return (
    <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-green-700 mb-3">Insights de Saúde Personalizados</h3>
      <ul className="space-y-3">
        {insights.map((insight, index) => (
          <li key={index} className="flex items-start">
            <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
              <Check className="h-4 w-4 text-green-600" />
            </div>
            <span className="text-gray-700">{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SuccessStories() {
  const stories = [
    {
      name: "Mariana S.",
      age: 42,
      weightLoss: 18,
      timeframe: "3 meses",
      quote: "Depois de tentar várias dietas sem sucesso, o Definamax foi o único que realmente funcionou para mim.",
    },
    {
      name: "Carlos R.",
      age: 35,
      weightLoss: 15,
      timeframe: "2 meses",
      quote: "Perdi 15kg em apenas 2 meses e o melhor: sem efeito sanfona! Já faz 6 meses que mantenho o peso.",
    },
    {
      name: "Juliana M.",
      age: 28,
      weightLoss: 12,
      timeframe: "45 dias",
      quote: "Minha autoestima voltou! Consegui eliminar aquela gordura localizada que tanto me incomodava.",
    },
  ]

  return (
    <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-green-700 mb-3">Histórias de Sucesso</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stories.map((story, index) => (
          <div key={index} className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center mr-2">
                {story.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium">
                  {story.name}, {story.age}
                </p>
                <p className="text-sm text-green-700">
                  -{story.weightLoss}kg em {story.timeframe}
                </p>
              </div>
            </div>
            <p className="text-sm italic text-gray-600">"{story.quote}"</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function trackEvent(eventName: string, eventProperties?: Record<string, any>) {
  // Track with Google Analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventProperties)
  }

  // Track with custom trackConversion function if available
  if (typeof window !== "undefined" && window.trackConversion) {
    window.trackConversion(eventName, eventProperties)
  }

  // Log event for debugging
  console.log(`Analytics event tracked: ${eventName}`, eventProperties)
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
    waterIntake: "",
    mealFrequency: "",
    stressLevel: "",
  })

  // Referência para o topo da página
  const topRef = useRef<HTMLDivElement>(null)

  const [errors, setErrors] = useState({
    name: false,
    age: false,
    gender: false,
    height: false,
    weight: false,
    goal: false,
    activityLevel: false,
    waterIntake: false,
    mealFrequency: false,
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

  // Rolar para o topo quando mudar de etapa
  useEffect(() => {
    if (step === 4 && topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [step])

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
      waterIntake: formData.waterIntake === "",
      mealFrequency: formData.mealFrequency === "",
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
      // Track step completion with new naming convention
      trackEvent("botao-etapa-1-avaliacao", {
        form_name: "weight_loss_assessment",
        step: 1,
      })

      setStep(2)
    }
  }

  // Função para salvar dados no Vercel KV
  const saveDataToVercel = async () => {
    try {
      const response = await fetch("/api/save-assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userData: formData,
          results: {
            bmi,
            idealWeight,
            weeklyGoal,
            timeToGoal,
            recommendedKit: getRecommendation().kit,
            timestamp: new Date().toISOString(),
          },
        }),
      })

      const data = await response.json()
      return data.id // Retorna o ID do registro salvo
    } catch (error) {
      console.error("Erro ao salvar dados:", error)
      return null
    }
  }

  const handleContinueToStep3 = () => {
    if (validateFormStep2()) {
      // Track step completion with new naming convention
      trackEvent("botao-etapa-2-avaliacao", {
        form_name: "weight_loss_assessment",
        step: 2,
      })

      setLoading(true)
      // Simulate loading delay
      setTimeout(() => {
        setLoading(false)
        setStep(3)
      }, 1500)
    }
  }

  const handleContinueToStep4 = async () => {
    // Track video view with new naming convention
    trackEvent("botao-etapa-3-avaliacao", {
      content_name: "weight_loss_explanation",
      step: 3,
    })

    // Salvar dados no Vercel
    await saveDataToVercel()

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
    } else if (goal <= 13) {
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
    } else if (goal <= 13) {
      return "https://full.sale/fDTVWH"
    } else {
      return "https://full.sale/EgnvbQ"
    }
  }

  // Adicionar a função getKitImage logo após a função getPurchaseLink
  function getKitImage() {
    const goal = Number.parseInt(formData.goal)

    if (goal <= 5) {
      return "/1f.png"
    } else if (goal <= 13) {
      return "/3f.png"
    } else {
      return "/6f.png"
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

    // Recomendações baseadas na ingestão de água
    if (formData.waterIntake === "pouca") {
      recommendations.push("Aumente sua ingestão de água para pelo menos 2 litros por dia")
    }

    // Adicionar recomendações padrão que não exigem esforço
    recommendations.push("Tome as cápsulas com um copo cheio de água para potencializar a absorção")
    recommendations.push("Para resultados ainda melhores, tome as cápsulas 30 minutos antes das principais refeições")

    return recommendations
  }

  // Rastrear cliques no botão de compra
  const handlePurchaseClick = () => {
    // Track purchase click with new naming convention
    trackEvent("botao-comprar-kit", {
      items: [
        {
          id: getRecommendation().kit,
          name: `Kit ${getRecommendation().kit}`,
          category: "weight_loss",
          quantity: 1,
        },
      ],
      value: formData.goal,
      currency: "BRL",
      step: 4,
    })

    // Keep the existing Google Ads conversion tracking
    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-632000271/CVC-1",
        value: formData.goal,
        currency: "BRL",
        transaction_id: new Date().getTime().toString(),
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4" ref={topRef}>
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <header className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-2">
              Descubra Seu Plano de Emagrecimento Personalizado <span className="text-green-500">100% Gratuito</span>
            </h1>
            <p className="text-gray-600">
              Complete nossa avaliação profissional, descubra seu IMC e receba um plano personalizado para atingir seus
              objetivos de forma saudável.
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
                Avançar
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <p className="text-center text-sm text-gray-500 mt-2">1/3 • Tempo estimado: 2 minutos</p>
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
                      Avançar
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
              <p className="text-center text-sm text-gray-500 mt-2">2/3 • Tempo estimado: 1 minuto</p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-green-50 rounded-lg p-4 border border-green-100 mb-6">
                <h2 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Análise Personalizada
                </h2>
                <p className="text-sm text-green-700">
                  Com base nas suas informações, preparamos uma análise detalhada do seu perfil e potencial de
                  emagrecimento.
                </p>
              </div>

              {/* Novos componentes de análise */}
              <MetabolicProfile
                age={formData.age}
                gender={formData.gender}
                bmi={bmi || 0}
                activityLevel={formData.activityLevel}
                weight={formData.weight}
                height={formData.height}
              />

              <HealthInsights
                age={formData.age}
                bmi={bmi || 0}
                waterIntake={formData.waterIntake}
                stressLevel={formData.stressLevel}
              />

              <ProductExplanation />

              <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-green-700 mb-3">Seu Potencial de Emagrecimento</h3>
                <p className="text-gray-700 mb-3">
                  Com nosso produto avançado, você pode alcançar uma perda de peso acelerada de até {weeklyGoal} kg por
                  semana, muito mais rápido que métodos convencionais.
                </p>
                <p className="text-sm text-green-700 font-medium mb-3">
                  Nossa fórmula exclusiva potencializa seu metabolismo, permitindo resultados até 3x mais rápidos que
                  dietas comuns.
                </p>

                <Timeline weeks={timeToGoal!} goal={Number.parseInt(formData.goal)} />
              </div>

              <SuccessStories />

              <div className="bg-green-50 rounded-lg p-4 border border-green-100 mb-6">
                <h2 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Relato pessoal de consumidor Definamax
                </h2>
                <p className="text-sm text-green-700">
                  Assista ao vídeo abaixo e veja o que uma de nossas consumidoras relatou sobre a sua experiência com o
                  Definamax
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
                  <img
                    src="/imagem-avaliacao.jpg"
                    alt="Antes e Depois"
                    className="w-full h-auto max-h-[600px] object-contain"
                  />
                  <div className="p-3 text-center text-sm text-gray-600">Resultados reais após 150 dias de uso</div>
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
                  Avançar
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
              <p className="text-center text-sm text-gray-500 mt-2">3/3 • Tempo estimado: menos de 1 minuto</p>
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

                <div className="p-4 bg-green-50 rounded-lg border border-green-100 mb-4 text-center">
                  <h4 className="font-medium text-gray-800 mb-2">Kit Recomendado: {getRecommendation().kit}</h4>
                  <div className="bg-green-600 text-white p-2 rounded-md mb-3 text-center font-medium">
                    Resultados em até {timeToGoal} semanas!
                  </div>

                  {/* Imagem do kit */}
                  <div className="my-4 flex justify-center">
                    <div className="relative w-64 h-64">
                      <Image
                        src={getKitImage() || "/placeholder.svg"}
                        alt={`Kit ${getRecommendation().kit}`}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>

                  <ul className="space-y-2 inline-block text-left">
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
                  onClick={handlePurchaseClick}
                  className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md shadow-lg flex items-center justify-center text-lg transition-colors"
                >
                  <ShoppingCart className="mr-2 h-6 w-6" />
                  Comprar {getRecommendation().kit} de Definamax
                </a>
                <p className="text-center text-sm font-medium text-green-700 mt-2">
                  Emagreça até {formData.goal}kg com esse kit
                </p>
                <div className="mt-3">
                  <a
                    href="https://definamaxoficial.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("botao-site-oficial", { step: 4 })}
                    className="w-full py-3 px-6 bg-white border-2 border-green-600 hover:bg-green-50 text-green-600 font-bold rounded-md shadow-sm flex items-center justify-center text-lg transition-colors"
                  >
                    Acessar o Site Oficial Definamax
                  </a>
                </div>
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
                </ul>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    trackEvent("botao-refazer-avaliacao", { step: 4 })
                    handleReset()
                  }}
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
