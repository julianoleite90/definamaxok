import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const VideoSectionContainer = styled.section`
  background: white;
  padding: 120px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 80px 20px;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 400;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  line-height: 1.2;
  
  .highlight {
    font-weight: 700;
    color: #333;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: #666;
  margin-bottom: 80px;
  text-align: center;
  font-weight: 300;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 60px;
  }
`;

const VideosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 60px;
  justify-items: center;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 50px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 0 10px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 0 20px;
  }
`;

const PhoneMockup = styled(motion.div)`
  position: relative;
  width: 280px;
  transition: all 0.3s ease;
  background: white;
  
  &:hover {
    transform: translateY(-10px);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 350px;
    background: white;
    border-radius: 0;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    max-width: 100%;
    background: white;
    border-radius: 0;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: none;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    height: 400px;
    border-radius: 0;
    background: white;
    box-shadow: none;
  }
  
  @media (max-width: 480px) {
    height: 450px;
    border-radius: 0;
    width: 100%;
    background: white;
    box-shadow: none;
  }
`;

const VideoSection = () => {
  const videos = [
    {
      vimeoId: "1100433801",
      title: "Perdi 15kg em 3 meses"
    },
    {
      vimeoId: "1100433922", 
      title: "Voltei a usar M novamente"
    },
    {
      vimeoId: "1100433861",
      title: "Minha autoestima voltou"
    },
    {
      vimeoId: "1100433969",
      title: "Resultado em 30 dias"
    }
  ];

  return (
    <VideoSectionContainer>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          RESULTADOS QUE VOCÊ NÃO ENCONTRA EM <span className="highlight">NENHUM OUTRO LUGAR</span>
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Depoimentos reais de pessoas que mudaram suas vidas com o DEFINAMAX
        </SectionSubtitle>
        
        <VideosGrid>
          {videos.map((video, index) => (
            <PhoneMockup
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <VideoContainer>
                <iframe
                  src={`https://player.vimeo.com/video/${video.vimeoId}?badge=0&autopause=0&controls=1&title=0&byline=0&portrait=0`}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={video.title}
                />
              </VideoContainer>
            </PhoneMockup>
          ))}
        </VideosGrid>
      </Container>
    </VideoSectionContainer>
  );
};

export default VideoSection;