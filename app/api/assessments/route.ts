import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"

export async function GET() {
  try {
    // Obter a lista de IDs de avaliações
    const assessmentIds = await kv.lrange("assessments", 0, -1)

    // Obter os dados de cada avaliação
    const assessments = []
    for (const id of assessmentIds) {
      const assessment = await kv.get(`assessment:${id}`)
      if (assessment) {
        assessments.push({
          id,
          ...assessment,
        })
      }
    }

    return NextResponse.json({ success: true, assessments })
  } catch (error) {
    console.error("Erro ao recuperar avaliações:", error)
    return NextResponse.json({ success: false, error: "Falha ao recuperar os dados" }, { status: 500 })
  }
}
