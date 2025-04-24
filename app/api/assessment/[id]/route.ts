import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Obter os dados da avaliação específica
    const assessment = await kv.get(`assessment:${id}`)

    if (!assessment) {
      return NextResponse.json({ success: false, error: "Avaliação não encontrada" }, { status: 404 })
    }

    return NextResponse.json({ success: true, assessment })
  } catch (error) {
    console.error("Erro ao recuperar avaliação:", error)
    return NextResponse.json({ success: false, error: "Falha ao recuperar os dados" }, { status: 500 })
  }
}
