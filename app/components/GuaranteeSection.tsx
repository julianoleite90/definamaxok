export default function GuaranteeSection() {
  return (
    <section className="bg-gray-100 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="text-green-700">Garantia de 30 dias</span>,{" "}
              <span className="text-green-700">tenha resultados ou não pague</span>
            </h2>
          </div>
          
          <div className="flex justify-center mb-8">
            <img 
              src="/garantia-definamax.png" 
              alt="Garantia de 30 dias Definamax" 
              className="w-96 h-auto"
            />
          </div>
          
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              Se você não ficar 100% satisfeita com os resultados do{" "}
              <span className="font-bold text-green-700">Definamax</span>, a qualquer momento nos próximos 30 dias,
              nós devolvemos 100% do seu dinheiro. Sem perguntas, sem complicações.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              É simples assim: experimente por 30 dias e veja os resultados por si mesma.
              Sua satisfação é nossa prioridade!
            </p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              <span className="text-green-700">Garantia de 30 dias</span>,{" "}
              <span className="text-green-700">tenha resultados ou não pague</span>
            </h2>
            <div className="space-y-4">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Se você não ficar 100% satisfeita com os resultados do{" "}
                <span className="font-bold text-green-700">Definamax</span>, a qualquer momento nos próximos 30 dias,
                nós devolvemos 100% do seu dinheiro. Sem perguntas, sem complicações.
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                É simples assim: experimente por 30 dias e veja os resultados por si mesma.
                Sua satisfação é nossa prioridade!
              </p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <img 
              src="/garantia-definamax.png" 
              alt="Garantia de 30 dias Definamax" 
              className="w-[500px] h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
} 