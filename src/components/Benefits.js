import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const BenefitsSection = styled.section`
  padding: var(--section-padding);
  background: var(--light-gray);
  
  @media (max-width: 768px) {
    padding-top: 20px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--container-padding);
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: var(--text-dark);
  margin-bottom: 20px;
  letter-spacing: -1px;
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
`;

const BenefitCard = styled(motion.div)`
  background: white;
  padding: 40px 30px;
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-light);
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-medium);
  }
`;

const BenefitIcon = styled.div`
  width: 80px;
  height: 80px;
  background: var(--gradient-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
  font-size: 2rem;
  color: white;
`;

const BenefitTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 15px;
`;

const BenefitDescription = styled.p`
  color: var(--text-light);
  line-height: 1.6;
`;

const benefits = [
  {
    icon: '🔥',
    title: 'Queima de Gordura Acelerada',
    description: 'Acelere seu metabolismo e queime gordura 24 horas por dia, mesmo em repouso.'
  },
  {
    icon: '💪',
    title: 'Preserve Massa Muscular',
    description: 'Perca peso mantendo e definindo seus músculos para um corpo tonificado.'
  },
  {
    icon: '⚡',
    title: 'Mais Energia e Disposição',
    description: 'Sinta-se mais disposto(a) e energizado(a) durante todo o seu dia.'
  },
  {
    icon: '🧠',
    title: 'Melhora o Foco Mental',
    description: 'Aumente sua concentração e clareza mental para ser mais produtivo(a).'
  },
  {
    icon: '❤️',
    title: 'Saúde Cardiovascular',
    description: 'Melhore a saúde do seu coração e reduza riscos de doenças cardíacas.'
  },
  {
    icon: '😴',
    title: 'Qualidade do Sono',
    description: 'Durma melhor e tenha um sono mais reparador e revigorante.'
  }
];

const Benefits = () => {
  return (
    <BenefitsSection id="benefits">
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Por Que Escolher o DEFINAMAX?
          </SectionTitle>
          
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Mais que um produto, é uma transformação completa para seu corpo e mente
          </SectionSubtitle>
        </SectionHeader>
        
        <BenefitsGrid>
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <BenefitIcon>{benefit.icon}</BenefitIcon>
              <BenefitTitle>{benefit.title}</BenefitTitle>
              <BenefitDescription>{benefit.description}</BenefitDescription>
            </BenefitCard>
          ))}
        </BenefitsGrid>
      </Container>
    </BenefitsSection>
  );
};

export default Benefits; 