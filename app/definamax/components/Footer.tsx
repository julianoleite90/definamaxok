export default function Footer() {
  return (
    <footer className="bg-green-700 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Logo e descrição principal */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/logo2.png" 
              alt="Definamax" 
              className="h-12 w-auto"
            />
          </div>
          <p className="text-green-100 max-w-4xl mx-auto leading-relaxed">
            Definamax - O seu aliado natural para o emagrecimento saudável e eficaz.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="text-center mb-8">
          <p className="text-green-100 text-sm max-w-4xl mx-auto leading-relaxed">
            *Resultados podem variar de pessoa para pessoa. Este produto não se destina a diagnosticar, tratar, curar ou prevenir qualquer 
            doença. Consulte sempre um profissional de saúde qualificado antes de iniciar qualquer programa de emagrecimento.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-8 text-sm">
          <a href="#" className="text-green-100 hover:text-white transition-colors">
            Avaliação do IMC
          </a>
          <span className="text-green-300">|</span>
          <a href="https://www.definamaxoficial.com/termos" className="text-green-100 hover:text-white transition-colors">
            Termos de Garantia
          </a>
          <span className="text-green-300">|</span>
          <a href="#" className="text-green-100 hover:text-white transition-colors">
            Perguntas Frequentes
          </a>
          <span className="text-green-300">|</span>
          <a href="#" className="text-green-100 hover:text-white transition-colors">
            Produtos
          </a>
          <span className="text-green-300">|</span>
          <a href="#" className="text-green-100 hover:text-white transition-colors">
            Depoimentos em Vídeo
          </a>
          <span className="text-green-300">|</span>
          <a href="#" className="text-green-100 hover:text-white transition-colors">
            Política de Privacidade
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-green-600 pt-6">
          <p className="text-green-100 text-sm mb-2">
            Copyright © 2025 Definamax. Todos os direitos reservados.
          </p>
          <p className="text-green-200 text-sm">
            Bourjan Nature Health, Florianópolis Santa Catarina
          </p>
        </div>
      </div>
    </footer>
  )
} 