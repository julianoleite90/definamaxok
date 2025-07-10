import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const FAQSection = styled.section`
  padding: 80px 20px;
  background: #f8f9fa;
  
  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 60px;
  letter-spacing: -1px;
`;

const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FAQItem = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 25px;
  background: white;
  border: none;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f8f9fa;
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    font-size: 1rem;
  }
`;

const FAQIcon = styled.span`
  font-size: 1.2rem;
  color: #1a4d2e;
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'rotate(45deg)' : 'rotate(0deg)'};
`;

const FAQAnswer = styled(motion.div)`
  padding: 0 25px 25px 25px;
  color: #666;
  line-height: 1.6;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    padding: 0 20px 20px 20px;
    font-size: 0.95rem;
  }
`;

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
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
      answer: "O prazo médio de entrega é de 5 a 14 dias úteis para todo Brasil. Após a confirmação do pagamento, você receberá o código de rastreamento para acompanhar sua encomenda."
    }
  ];

  return (
    <FAQSection>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          DÚVIDAS FREQUENTES
        </SectionTitle>
        
        <FAQGrid>
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FAQQuestion onClick={() => toggleItem(index)}>
                {item.question}
                <FAQIcon isOpen={openItems[index]}>+</FAQIcon>
              </FAQQuestion>
              
              <AnimatePresence>
                {openItems[index] && (
                  <FAQAnswer
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.answer}
                  </FAQAnswer>
                )}
              </AnimatePresence>
            </FAQItem>
          ))}
        </FAQGrid>
      </Container>
    </FAQSection>
  );
};

export default FAQ; 