export default function Benefits() {
  const benefits = [
    {
      icon: "💳",
      title: "PARCELAMENTO",
      subtitle: "EM ATÉ 12X"
    },
    {
      icon: "💰",
      title: "PAGAMENTO NO PIX",
      subtitle: "COM DESCONTO"
    },
    {
      icon: "🚚",
      title: "ENVIO RÁPIDO",
      subtitle: "EM 24H"
    },
    {
      icon: "📦",
      title: "FRETE GRÁTIS",
      subtitle: "TODO BRASIL"
    }
  ]

  return (
    <section className="w-full py-4 bg-white border-t border-b border-gray-200 hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center justify-center text-center">
              <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-3">
                <div className="text-xl md:text-2xl">
                  {benefit.icon}
                </div>
                <div className="text-center md:text-left">
                  <div className="text-xs md:text-sm text-gray-500 font-medium leading-tight">
                    {benefit.title}
                  </div>
                  <div className="text-sm md:text-base font-semibold text-gray-700 leading-tight">
                    {benefit.subtitle}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 