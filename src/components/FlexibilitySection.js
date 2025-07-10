import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FlexibilityContainer = styled.section`
  background: #e8f5e8;
  padding: 80px 20px 0 20px;
  color: #333;
  text-align: center;
  min-height: 500px;
  display: flex;
  align-items: flex-end;
  
  @media (max-width: 768px) {
    padding: 60px 20px 0 20px;
    min-height: 400px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: flex-end;
  height: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
    align-items: center;
  }
`;

const ContentArea = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 40px;
  
  @media (max-width: 768px) {
    text-align: center;
    padding-bottom: 20px;
  }
`;

const MainTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 700;
  color: #333;
  margin-bottom: 30px;
  line-height: 1.2;
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const DeviceArea = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  height: 100%;
`;

const DeviceMockup = styled.div`
  width: 100%;
  max-width: 700px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 0;
  
  img {
    width: 100%;
    height: auto;
    display: block;
    margin-bottom: 0;
  }
`;

const FlexibilitySection = () => {
  return (
    <FlexibilityContainer>
      <Container>
        <ContentArea>
          <MainTitle
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Quando foi a última vez que você se sentiu confiante com seu peso e o seu corpo?
          </MainTitle>
          
          <Description
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Recupere a sua confiança em seu corpo e conquiste uma vida mais plena com um emagrecedor que transforma seu peso em bem-estar. Definamax foi criado para que cada quilo perdido signifique mais autoestima, mais confiança e mais amor próprio em seu dia a dia - naturalmente, sem sacrifícios, com resultados que vão muito além da balança.
          </Description>
        </ContentArea>

        <DeviceArea
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <DeviceMockup>
            <img src="/jeans.png" alt="Mulher magra vestindo calça jeans após emagrecer com Definamax" />
          </DeviceMockup>
        </DeviceArea>
      </Container>
    </FlexibilityContainer>
  );
};

export default FlexibilitySection; 