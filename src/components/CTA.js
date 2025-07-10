import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CTASection = styled.section`
  padding: var(--section-padding);
  background: white;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: var(--container-padding);
  text-align: center;
  position: relative;
  z-index: 2;
`;

const CTATitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 800;
  color: #333;
  margin-bottom: 20px;
  letter-spacing: -1px;
`;

const CTASubtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: #666;
  margin-bottom: 40px;
  opacity: 0.9;
  line-height: 1.6;
`;

const PriceContainer = styled(motion.div)`
  background: white;
  padding: 40px 30px;
  border-radius: var(--border-radius-large);
  margin-bottom: 40px;
  box-shadow: var(--shadow-heavy);
`;

const PriceLabel = styled.div`
  font-size: 1rem;
  color: var(--text-light);
  margin-bottom: 10px;
`;

const OldPrice = styled.div`
  font-size: 1.5rem;
  color: var(--text-light);
  text-decoration: line-through;
  margin-bottom: 5px;
`;

const CurrentPrice = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 10px;
`;

const PriceNote = styled.div`
  font-size: 0.9rem;
  color: var(--text-light);
`;

const CTAButtons = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const PrimaryButton = styled(motion.button)`
  background: #1a4d2e;
  color: white;
  padding: 20px 50px;
  border-radius: var(--border-radius);
  font-weight: 700;
  font-size: 1.3rem;
  box-shadow: var(--shadow-medium);
  transition: all 0.3s ease;
  width: 100%;
  max-width: 400px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-heavy);
    background: #15402a;
  }
`;

const SecondaryButton = styled(motion.button)`
  background: transparent;
  color: #333;
  padding: 16px 32px;
  border: 2px solid #333;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #333;
    color: white;
  }
`;

const Guarantee = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
  color: #333;
  font-size: 1.1rem;
`;

const GuaranteeIcon = styled.div`
  width: 50px;
  height: 50px;
  background: #1a4d2e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
`;

const UrgencyBadge = styled(motion.div)`
  background: #FF4757;
  color: white;
  padding: 15px 25px;
  border-radius: var(--border-radius);
  font-weight: 600;
  margin-bottom: 30px;
  box-shadow: var(--shadow-medium);
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
`;

const CTA = () => {
  return (
    <CTASection id="cta">
      <BackgroundDecoration />
      <Container>
        <UrgencyBadge
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          🔥 OFERTA ESPECIAL - Últimas 24 horas!
        </UrgencyBadge>
        
        <CTATitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Comece Sua Transformação Hoje!
        </CTATitle>
        
        <CTASubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Não perca mais tempo. Mais de 45 mil pessoas já transformaram suas vidas. Agora é a sua vez!
        </CTASubtitle>
        
        <PriceContainer
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <PriceLabel>De:</PriceLabel>
          <OldPrice>R$ 297,00</OldPrice>
          <PriceLabel>Por apenas:</PriceLabel>
          <CurrentPrice>R$ 97</CurrentPrice>
          <PriceNote>ou 12x de R$ 9,70</PriceNote>
        </PriceContainer>
        
        <CTAButtons
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <PrimaryButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🚀 QUERO TRANSFORMAR MINHA VIDA AGORA!
          </PrimaryButton>
          
          <SecondaryButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ainda tenho dúvidas
          </SecondaryButton>
        </CTAButtons>
        
        <Guarantee
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <GuaranteeIcon>🛡️</GuaranteeIcon>
          <div>
            <strong>Garantia de 30 dias</strong><br />
            Risco zero - 100% do seu dinheiro de volta
          </div>
        </Guarantee>
      </Container>
    </CTASection>
  );
};

export default CTA; 