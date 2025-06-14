'use client'

import { useState } from 'react'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const scrollToKits = () => {
    const kitsSection = document.getElementById('kits-section');
    if (kitsSection) {
      kitsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      question: "Como devo tomar o Definamax?",
      answer: "Recomenda-se tomar 2 cápsulas por dia, preferencialmente antes das principais refeições. Para melhores resultados, tome uma cápsula 30 minutos antes do almoço e outra 30 minutos antes do jantar, sempre com um copo de água."
    },
    {
      question: "Quanto tempo demora para ver resultados?",
      answer: "Os resultados podem variar de pessoa para pessoa, mas a maioria dos usuários começa a notar mudanças significativas após 30 dias de uso contínuo. Para resultados mais expressivos, recomendamos o tratamento completo de 3 a 6 meses."
    },
    {
      question: "O Definamax tem efeitos colaterais?",
      answer: "Por ser um produto 100% natural, o Definamax não apresenta efeitos colaterais significativos. No entanto, como todo suplemento, recomendamos consultar um profissional de saúde antes de iniciar o uso, especialmente se você estiver grávida, amamentando ou em tratamento médico."
    },
    {
      question: "Preciso fazer dieta enquanto tomo Definamax?",
      answer: "O Definamax funciona mesmo sem dietas restritivas, pois age reduzindo naturalmente seu apetite e a absorção de gorduras. No entanto, para resultados ainda melhores, recomendamos manter uma alimentação equilibrada e praticar atividades físicas regularmente."
    },
    {
      question: "Como funciona a garantia de satisfação?",
      answer: "Oferecemos 30 dias de garantia incondicional. Se você não ficar satisfeito com os resultados, basta entrar em contato com nosso atendimento e solicitar o reembolso total do seu investimento, sem questionamentos."
    },
    {
      question: "Qual o prazo de entrega?",
      answer: "O prazo médio de entrega é de 5 a 7 dias úteis para todo Brasil. Após a confirmação do pagamento, você receberá o código de rastreamento para acompanhar sua encomenda."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-600">
            Tire suas dúvidas sobre o Definamax
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-green-50 rounded-lg border border-green-700 overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-green-100 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-green-700 transform transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={scrollToKits}
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-4 px-8 md:px-12 rounded-lg text-sm md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl uppercase"
          >
            SIM, QUERO COMEÇAR A EMAGRECER!
          </button>
        </div>
      </div>
    </section>
  )
} 