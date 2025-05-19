import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Definamax - Emagrecedor N1 do Brasil"
export const size = {
  width: 1200,
  height: 630,
}

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 128,
        background: "linear-gradient(to bottom, #16a34a, #22c55e)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        padding: "40px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <img
          src="https://www.definamaxoficial.com/mockup.png"
          alt="Definamax"
          width={300}
          height={300}
          style={{ marginRight: "20px" }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "64px", fontWeight: "bold", marginBottom: "10px" }}>Definamax</div>
          <div style={{ fontSize: "36px", fontWeight: "normal" }}>Emagrecedor N1 do Brasil</div>
        </div>
      </div>
      <div style={{ fontSize: "32px", textAlign: "center", maxWidth: "80%" }}>
        Emagreça até 27kg sem dietas restritivas ou injeções perigosas
      </div>
    </div>,
    {
      ...size,
    },
  )
}
