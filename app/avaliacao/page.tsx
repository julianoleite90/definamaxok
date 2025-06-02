"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, ChevronRight, Play } from "lucide-react"

function trackEvent(eventName: string) {
  if (typeof window !== 'undefined' && 'trackConversion' in window) {
    (window as any).trackConversion(eventName)
  }
}

export default function AvaliacaoPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    peso: "",
    altura: "",
    idade: "",
    genero: "",
    agua: "",
    exercicios: "",
    compulsao: "",
    pesoDesejado: "",
    capsulas: "",
    videoAssistido: false
  })
  const [diagnostico, setDiagnostico] = useState({
    imc: 0,
    pesoIdeal: 0,
    pesoPerder: 0,
    tempoEstimado: 0,
    taxaMetabolica: "",
    caloriasBase: 0
  })

  const calculateIMC = () => {
    const weight = parseFloat(formData.peso)
    const height = parseFloat(formData.altura) / 100
    const pesoDesejado = parseFloat(formData.pesoDesejado)
    
    // Validação rigorosa dos valores
    if (weight > 0 && height > 0 && pesoDesejado > 0) {
      const imc = weight / (height * height)
      const pesoIdeal = 24.9 * (height * height)
      
      // Calcula quanto precisa perder baseado no peso desejado
      const pesoPerder = weight - pesoDesejado
      
      // Estima o tempo baseado em uma perda saudável de 3kg por mês
      const tempoEstimado = Math.max(1, Math.ceil(pesoPerder / 3))
      
      // Cálculo da Taxa Metabólica Basal (TMB)
      let tmb = 0
      if (formData.genero === "feminino") {
        tmb = 655 + (9.6 * weight) + (1.8 * (height * 100)) - (4.7 * parseInt(formData.idade))
      } else {
        tmb = 66 + (13.7 * weight) + (5 * (height * 100)) - (6.8 * parseInt(formData.idade))
      }

      // Ajuste baseado no nível de atividade
      let fatorAtividade = 1.2 // Sedentário
      if (formData.exercicios === "1-2") fatorAtividade = 1.375
      else if (formData.exercicios === "3-4") fatorAtividade = 1.55
      else if (formData.exercicios === "5+") fatorAtividade = 1.725

      const caloriasBase = Math.round(tmb * fatorAtividade)
      
      const diagnosticoAtualizado = {
        imc: parseFloat(imc.toFixed(1)),
        pesoIdeal: Math.round(pesoIdeal),
        pesoPerder: Math.round(pesoPerder),
        tempoEstimado,
        taxaMetabolica: caloriasBase < 1500 ? "lento" : caloriasBase < 1800 ? "normal" : "acelerado",
        caloriasBase
      }
      
      setDiagnostico(diagnosticoAtualizado)
      return diagnosticoAtualizado.imc
    }
    return 0
  }

  const getIMCStatus = (imcValue: number) => {
    if (imcValue < 18.5) return { status: "Abaixo do Peso", color: "text-blue-600" }
    if (imcValue < 24.9) return { status: "Peso Normal", color: "text-green-600" }
    if (imcValue < 29.9) return { status: "Sobrepeso", color: "text-yellow-600" }
    if (imcValue < 34.9) return { status: "Obesidade Grau I", color: "text-orange-600" }
    if (imcValue < 39.9) return { status: "Obesidade Grau II", color: "text-red-600" }
    return { status: "Obesidade Grau III", color: "text-red-700" }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      calculateIMC()
      trackEvent('avaliacao_etapa_1_dados_basicos')
      setStep(2)
    } else if (step === 2) {
      calculateIMC()
      trackEvent('avaliacao_etapa_2_habitos')
      setStep(3)
    } else if (step === 3) {
      trackEvent('avaliacao_etapa_3_diagnostico')
      setStep(4)
    } else if (step === 4) {
      trackEvent('avaliacao_etapa_4_tratamento')
      setStep(5)
    } else if (step === 5) {
      trackEvent('avaliacao_etapa_5_recomendacao')
      setStep(6)
    }
  }

  const getKitRecomendado = (pesoPerder: number) => {
    if (pesoPerder >= 24) {
      return {
        nome: "Kit 8 Frascos",
        imagem: "/8frascos.png",
        link: "https://full.sale/XONObQ?src=teste-imc",
        descricao: "Tratamento Completo - Compre 5 Leve 8",
        bonus: "2 Frascos de Colágeno GRÁTIS",
        perda: "24 a 27kg"
      }
    } else if (pesoPerder >= 19) {
      return {
        nome: "Kit 5 Frascos",
        imagem: "/5frascos.png",
        link: "https://full.sale/ytA47b?src=teste-imc",
        descricao: "Tratamento Recomendado - Compre 3 Leve 5",
        bonus: "1 Frasco de Colágeno GRÁTIS",
        perda: "19 a 23kg"
      }
    } else if (pesoPerder >= 13) {
      return {
        nome: "Kit 3 Frascos",
        imagem: "/2frascos.png",
        link: "https://full.sale/DmNQj1?src=teste-imc",
        descricao: "Tratamento Médio - Compre 2 Leve 3",
        bonus: "Envio Imediato",
        perda: "13 a 15kg"
      }
    } else {
      return {
        nome: "Kit 1 Frasco",
        imagem: "/1frasco.png",
        link: "https://full.sale/eMbtHp?src=teste-imc",
        descricao: "Tratamento Inicial",
        bonus: "Envio Imediato",
        perda: "5 a 7kg"
      }
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Descubra seu Peso Ideal
              </h2>
              <p className="text-gray-600 mb-6">
                Vamos criar um plano personalizado para você atingir seu objetivo de forma saudável e duradoura
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qual é o seu peso atual? (kg)
                </label>
                <input
                  type="number"
                  required
                  value={formData.peso}
                  onChange={(e) => setFormData({ ...formData, peso: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ex: 75"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qual é a sua altura? (cm)
                </label>
                <input
                  type="number"
                  required
                  value={formData.altura}
                  onChange={(e) => setFormData({ ...formData, altura: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ex: 170"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qual é a sua idade?
                </label>
                <input
                  type="number"
                  required
                  value={formData.idade}
                  onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ex: 35"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qual é o seu gênero?
                </label>
                <select
                  required
                  value={formData.genero}
                  onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Selecione uma opção</option>
                  <option value="feminino">Feminino</option>
                  <option value="masculino">Masculino</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Seus Hábitos Diários
              </h2>
              <p className="text-gray-600 mb-6">
                Essas informações nos ajudarão a personalizar seu plano de emagrecimento
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantos litros de água você bebe por dia?
                </label>
                <select
                  required
                  value={formData.agua}
                  onChange={(e) => setFormData({ ...formData, agua: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Selecione uma opção</option>
                  <option value="menos-1">Menos de 1 litro</option>
                  <option value="1-2">1 a 2 litros</option>
                  <option value="mais-2">Mais de 2 litros</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Com que frequência você se exercita?
                </label>
                <select
                  required
                  value={formData.exercicios}
                  onChange={(e) => setFormData({ ...formData, exercicios: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Selecione uma opção</option>
                  <option value="nunca">Não me exercito</option>
                  <option value="1-2">1 a 2 vezes por semana</option>
                  <option value="3-4">3 a 4 vezes por semana</option>
                  <option value="5+">5 ou mais vezes por semana</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Você tem compulsão alimentar?
                </label>
                <select
                  required
                  value={formData.compulsao}
                  onChange={(e) => setFormData({ ...formData, compulsao: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Selecione uma opção</option>
                  <option value="nunca">Nunca</option>
                  <option value="as-vezes">Às vezes</option>
                  <option value="frequente">Frequentemente</option>
                  <option value="sempre">Sempre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qual seu objetivo de peso? (kg)
                </label>
                <input
                  type="number"
                  required
                  value={formData.pesoDesejado}
                  onChange={(e) => setFormData({ ...formData, pesoDesejado: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ex: 65"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Seu Diagnóstico Personalizado
              </h2>
              <p className="text-gray-600 mb-4">
                Com base nas suas informações, identificamos alguns pontos importantes
              </p>
              <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                <p className="text-red-700 font-medium">
                  {formData.peso > formData.pesoDesejado 
                    ? `Atenção! Você precisa perder ${Math.round(parseFloat(formData.peso) - parseFloat(formData.pesoDesejado))}kg para atingir seu objetivo`
                    : formData.peso < formData.pesoDesejado
                    ? `Você precisa ganhar ${Math.round(parseFloat(formData.pesoDesejado) - parseFloat(formData.peso))}kg para atingir seu objetivo`
                    : "Seu peso atual já está dentro do objetivo desejado!"}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Seu IMC atual:</span>
                  <span className={`font-bold ${getIMCStatus(diagnostico.imc).color}`}>
                    {diagnostico.imc.toFixed(1)} - {getIMCStatus(diagnostico.imc).status}
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-red-500"
                    style={{ width: `${Math.min((diagnostico.imc / 40) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Seu Metabolismo:</h3>
                <p className="text-lg font-bold text-green-600 mb-1">
                  {diagnostico.taxaMetabolica.toUpperCase()}
                </p>
                <p className="text-sm text-gray-600">
                  Seu corpo queima aproximadamente {diagnostico.caloriasBase} calorias por dia
                </p>
              </div>

              <button
                onClick={() => {
                  trackEvent('clique_descobrir_tratamento_imc')
                  setStep(4)
                }}
                className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-500 transition-all"
              >
                QUERO DESCOBRIR COMO ATINGIR MEU PESO IDEAL
              </button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Como o Definamax vai te ajudar
              </h2>
              <p className="text-gray-600 mb-6">
                Desenvolvemos um programa completo de {diagnostico.tempoEstimado} meses para você perder {diagnostico.pesoPerder}kg
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-800">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-green-800">Fase 1: Desintoxicação (Primeiros 30 dias)</p>
                    <p className="text-green-700">
                      • Eliminação de toxinas<br />
                      • Redução da retenção de líquidos<br />
                      • Diminuição do inchaço<br />
                      • Perda inicial de 2-4kg
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-800">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-green-800">Fase 2: Aceleração (31-60 dias)</p>
                    <p className="text-green-700">
                      • Aumento do metabolismo<br />
                      • Queima de gordura intensificada<br />
                      • Redução do apetite<br />
                      • Perda de 3-5kg adicionais
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-800">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-green-800">Fase 3: Transformação (61-90 dias)</p>
                    <p className="text-green-700">
                      • Resultados visíveis<br />
                      • Redução de medidas<br />
                      • Mais disposição e energia<br />
                      • Perda de mais 4-6kg
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  trackEvent('clique_continuar_tratamento_imc')
                  setStep(5)
                }}
                className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-500 transition-all"
              >
                CONTINUAR
              </button>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Última Etapa
              </h2>
              <p className="text-gray-600 mb-6">
                Estamos quase lá! Precisamos confirmar alguns detalhes para seu tratamento
              </p>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-green-50 rounded-lg border border-green-100">
                <p className="text-lg font-medium text-gray-800 mb-4">
                  Para atingir seu objetivo de perder {diagnostico.pesoPerder}kg, você precisará tomar 2 cápsulas de Definamax por dia, uma antes do almoço e outra antes do jantar.
                </p>
                <p className="text-gray-700 mb-4">
                  Você tem disponibilidade para seguir essa recomendação?
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, capsulas: "sim" })}
                    className={`p-4 rounded-lg border ${
                      formData.capsulas === "sim"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    Sim, consigo
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, capsulas: "nao" })}
                    className={`p-4 rounded-lg border ${
                      formData.capsulas === "nao"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    Não consigo
                  </button>
                </div>
              </div>

              {formData.capsulas === "sim" && (
                <div className="space-y-6">
                  <div className="p-6 bg-green-50 rounded-lg border border-green-100">
                    <h3 className="text-xl font-bold text-green-800 mb-2">
                      História de Sucesso com Definamax
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Assista ao depoimento de alguém que também precisava perder {diagnostico.pesoPerder}kg e conseguiu com Definamax:
                    </p>
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <iframe
                        src="https://player.vimeo.com/video/1078349413?autoplay=1&loop=0&muted=1&background=1"
                        className="absolute top-0 left-0 w-full h-full"
                        frameBorder="0"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                        title="Depoimento Definamax"
                      ></iframe>
                      {!formData.videoAssistido && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-[2px] z-10 transition-all duration-500">
                          <div className="bg-black/60 px-8 py-4 rounded-2xl backdrop-blur-sm">
                            <h3 className="text-white text-2xl md:text-3xl font-bold mb-6 text-center drop-shadow-lg">
                              "Eu sempre fui gorda..."
                            </h3>
                          </div>
                          <button
                            onClick={() => {
                              trackEvent('clique_assistir_video_imc')
                              setFormData({ ...formData, videoAssistido: true })
                            }}
                            className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 hover:bg-red-700 animate-pulse hover:animate-none shadow-lg hover:shadow-xl ring-4 ring-white/30"
                          >
                            <Play className="w-10 h-10 text-white ml-1" />
                          </button>
                          <div className="bg-black/60 px-6 py-3 rounded-xl mt-6 backdrop-blur-sm">
                            <p className="text-white/90 text-lg text-center drop-shadow-lg">
                              Clique para assistir a história completa
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {formData.videoAssistido && (() => {
                    const kitRecomendado = getKitRecomendado(diagnostico.pesoPerder)
                    return (
                      <div className="space-y-4">
                        <div className="p-6 bg-green-50 rounded-lg border border-green-100">
                          <h3 className="text-xl font-bold text-green-800 mb-2">
                            Kit Recomendado para Seu Objetivo
                          </h3>
                          <p className="text-green-700 mb-4">
                            Para perder {diagnostico.pesoPerder}kg em {diagnostico.tempoEstimado} meses de forma saudável e duradoura, recomendamos:
                          </p>
                          <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-bold text-xl mb-2">{kitRecomendado.nome}</h4>
                            <p className="text-gray-600 mb-2">{kitRecomendado.descricao}</p>
                            <p className="text-green-600 font-medium mb-2">{kitRecomendado.bonus}</p>
                            <p className="text-green-800 font-medium mb-4">
                              Perda esperada: {kitRecomendado.perda}
                            </p>
                            <div className="flex justify-center mb-4">
                              <Image
                                src={kitRecomendado.imagem}
                                alt={kitRecomendado.nome}
                                width={200}
                                height={200}
                                className="h-auto"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid gap-4">
                          <Link
                            href={kitRecomendado.link}
                            onClick={() => trackEvent('clique_comprar_kit_imc')}
                            className="block w-full bg-green-600 text-white text-center font-bold py-4 rounded-xl hover:bg-green-500 transition-all"
                          >
                            COMPRAR MEU KIT AGORA
                          </Link>
                          <Link
                            href="https://www.definamaxoficial.com"
                            onClick={() => trackEvent('clique_site_oficial_imc')}
                            target="_blank"
                            className="block w-full bg-white text-green-600 text-center font-bold py-4 rounded-xl border-2 border-green-600 hover:bg-green-50 transition-all"
                          >
                            ACESSAR SITE OFICIAL
                          </Link>
                          <Link
                            href="https://wa.me/5541984549172"
                            onClick={() => trackEvent('clique_whatsapp_imc')}
                            target="_blank"
                            className="block w-full bg-white text-gray-600 text-center font-bold py-4 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition-all"
                          >
                            FALAR COM ESPECIALISTA
                          </Link>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="w-full bg-[#15803D] shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Image 
            src="/logo2.png" 
            alt="Definamax" 
            width={180} 
            height={50} 
            className="h-8 w-auto" 
          />
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4, 5].map((number) => (
              <div key={number} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= number ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > number ? <CheckCircle2 className="w-5 h-5" /> : number}
                </div>
                {number < 5 && (
                  <div className={`h-1 w-12 md:w-24 ${
                    step > number ? 'bg-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {renderStep()}

          {step < 5 && !formData.videoAssistido && (
            <button
              type="submit"
              disabled={
                (step === 1 && (!formData.peso || !formData.altura || !formData.idade || !formData.genero)) ||
                (step === 2 && (!formData.agua || !formData.exercicios || !formData.compulsao || !formData.pesoDesejado))
              }
              className="w-full mt-8 bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 3 ? "QUERO CONHECER O TRATAMENTO" : "CONTINUAR"}
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </form>
      </div>
    </main>
  )
}
