import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ResultsSection = styled.section`
  background: #f8f9fa;
  padding: 80px 20px;
  text-align: center;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const MainTitle = styled(motion.h2)`
  text-align: center;
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 400;
  color: #333;
  margin-bottom: 10px;
  line-height: 1.2;
  
  .highlight {
    font-weight: 700;
    color: #333;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 60px;
  font-weight: 400;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-bottom: 50px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const ResultItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PhotoContainer = styled.div`
  width: 300px;
  height: 350px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 15px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 480px) {
    width: 250px;
    height: 280px;
  }
`;

const PersonInfo = styled.div`
  font-size: 0.95rem;
  color: #555;
  text-align: center;
  
  .name {
    font-weight: 600;
    margin-right: 8px;
  }
  
  .details {
    font-weight: 400;
  }
  
  .city {
    font-weight: 500;
    color: #1a4d2e;
    font-size: 0.9rem;
    margin-top: 4px;
    display: block;
  }
`;

const CTAButton = styled(motion.button)`
  background: #1a4d2e;
  color: white;
  font-size: 1.4rem;
  font-weight: 700;
  padding: 18px 50px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(26, 77, 46, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(26, 77, 46, 0.4);
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 16px 40px;
  }
`;

const ExpandButton = styled(motion.button)`
  background: none;
  border: 2px solid #1a4d2e;
  color: #1a4d2e;
  font-size: 1rem;
  font-weight: 600;
  padding: 12px 30px;
  border-radius: 8px;
  cursor: pointer;
  margin: 30px auto 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #1a4d2e;
    color: white;
    transform: translateY(-2px);
  }
  
  .arrow {
    transition: transform 0.3s ease;
    transform: ${props => props.expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px 24px;
  }
`;

const Disclaimer = styled.p`
  font-size: 0.85rem;
  color: #666;
  line-height: 1.4;
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Results = () => {
  const [expanded, setExpanded] = useState(false);
  
  const allResults = [
    {
      name: "Luana",
      age: "26 anos",
      weight: "-30kg",
      city: "São Paulo - SP",
      image: "/luana.png"
    },
    {
      name: "Renatha Almeida", 
      age: "34 anos",
      weight: "-12Kg",
      city: "Rio de Janeiro - RJ",
      image: "/dep03.png"
    },
    {
      name: "Fernanda Costa",
      age: "39 anos", 
      weight: "-20Kg",
      city: "Belo Horizonte - MG",
      image: "/dep01.png"
    },
    {
      name: "Maria Silva",
      age: "28 anos",
      weight: "-15kg",
      city: "Porto Alegre - RS",
      image: "/a.png"
    },
    {
      name: "Ana Paula",
      age: "32 anos",
      weight: "-18kg",
      city: "Salvador - BA",
      image: "/b.png"
    },
    {
      name: "Carlos Santos",
      age: "35 anos",
      weight: "-28kg",
      city: "Recife - PE",
      image: "/c.png"
    }
  ];

  // Mostrar apenas 3 inicialmente, ou todos se expandido
  const resultsToShow = expanded ? allResults : allResults.slice(0, 3);

  return (
    <ResultsSection>
      <Container>
        <MainTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          BASTA INGERIR 2 CÁPSULAS AO DIA<br />
          PARA <span className="highlight">ALCANÇAR O SEU OBJETIVO</span>
        </MainTitle>
        
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Veja o que é possível alcançar fazendo o uso corretamente do Definamax
        </Subtitle>

        <ResultsGrid>
          {resultsToShow.map((result, index) => (
            <ResultItem
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <PhotoContainer>
                <img src={result.image} alt={`${result.name} resultado`} />
              </PhotoContainer>
              
              <PersonInfo>
                <span className="name">{result.name}</span>
                <span className="details">| {result.age} | {result.weight}</span>
                <br />
                <span className="city">{result.city}</span>
              </PersonInfo>
            </ResultItem>
          ))}
        </ResultsGrid>

        {/* Botão para expandir/contrair */}
        <ExpandButton
          expanded={expanded}
          onClick={() => setExpanded(!expanded)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {expanded ? 'Ver Menos' : 'Ver Mais Resultados'}
          <span className="arrow">▼</span>
        </ExpandButton>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <CTAButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const kitsSection = document.getElementById('kits');
              if (kitsSection) {
                kitsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            EU QUERO ESSES RESULTADOS
          </CTAButton>
        </motion.div>

        <Disclaimer>
          *Esses são usuários do Definamax® que alcançaram resultado seguindo todas as instruções. Os resultados variam para cada pessoa.
        </Disclaimer>
      </Container>
    </ResultsSection>
  );
};

export default Results; 