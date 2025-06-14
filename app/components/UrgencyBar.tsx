export default function UrgencyBar() {
  return (
    <div className="bg-green-700 text-white py-3 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout */}
        <div className="flex md:hidden justify-between items-center">
          {/* Logo à esquerda */}
          <div className="flex items-center gap-2">
            <img 
              src="/logo2.png" 
              alt="Definamax" 
              className="h-10 w-auto"
            />
          </div>
          
          {/* Botão COMPRAR à direita com efeito elevado */}
          <button className="bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded font-bold text-sm border border-white shadow-2xl hover:shadow-green-700/25 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 relative z-10 hover:border-green-300">
            COMPRAR AGORA
          </button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block text-center">
          <p className="text-sm md:text-base font-medium">
            <span className="font-bold">Nunca foi tão barato emagrecer.</span> Aproveite nossos super descontos nas compras acima de 2 potes!
          </p>
        </div>
      </div>
    </div>
  )
} 