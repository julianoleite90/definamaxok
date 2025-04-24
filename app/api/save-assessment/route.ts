import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import { nanoid } from "nanoid"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Gerar um ID único para o registro
    const id = nanoid()

    // Salvar os dados no Vercel KV
    await kv.set(`assessment:${id}`, {
      ...data,
      createdAt: new Date().toISOString(),
    })

    // Adicionar o ID à lista de avaliações para facilitar a recuperação posterior
    await kv.lpush("assessments", id)

    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.error("Erro ao salvar avaliação:", error)
    return NextResponse.json({ success: false, error: "Falha ao salvar os dados" }, { status: 500 })
  }
}
