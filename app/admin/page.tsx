"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface Assessment {
  id: string
  userData: {
    name: string
    age: string
    gender: string
    height: string
    weight: string
    goal: string
  }
  results: {
    bmi: number
    idealWeight: number
    weeklyGoal: number
    timeToGoal: number
    recommendedKit: string
    timestamp: string
  }
  createdAt: string
}

export default function AdminPage() {
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAssessments() {
      try {
        const response = await fetch("/api/assessments")
        const data = await response.json()

        if (data.success) {
          setAssessments(data.assessments)
        } else {
          setError("Falha ao carregar os dados")
        }
      } catch (err) {
        setError("Erro ao conectar com o servidor")
      } finally {
        setLoading(false)
      }
    }

    fetchAssessments()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <span className="ml-2 text-lg">Carregando avaliações...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700">
          <h2 className="text-lg font-semibold mb-2">Erro</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Painel Administrativo - Avaliações</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Avaliações Recentes</h2>

          {assessments.length === 0 ? (
            <p className="text-gray-500">Nenhuma avaliação encontrada.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Idade
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IMC
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Objetivo
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kit Recomendado
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assessments.map((assessment) => (
                    <tr key={assessment.id}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(assessment.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {assessment.userData.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{assessment.userData.age}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{assessment.results.bmi}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {assessment.userData.goal} kg
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {assessment.results.recommendedKit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
