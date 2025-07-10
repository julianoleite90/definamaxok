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
    gap: 30px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const PhoneMockup = styled(motion.div)`
  position: relative;
  width: 280px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
  
  @media (max-width: 768px) {
    width: 220px;
  }
  
  @media (max-width: 480px) {
    width: 260px;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    height: 400px;
  }
  
  @media (max-width: 480px) {
    height: 450px;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  
  &::-webkit-media-controls-volume-slider,
  &::-webkit-media-controls-mute-button {
    display: none !important;
  }
  
  &::-webkit-media-controls-fullscreen-button {
    display: none !important;
  }
`;

const VideoTitle = styled.div`
  margin-top: 20px;
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
  text-align: center;
  background: #f8f9fa;
  padding: 12px 20px;
  border-radius: 25px;
  border: 1px solid #e9ecef;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 10px 16px;
  }
`;

const VideoSection = () => {
  const videos = [
    {
      src: "/video1.mp4",
      title: "Perdi 15kg em 3 meses",
      poster: "/video1-poster.jpg"
    },
    {
      src: "/video2.mp4", 
      title: "Voltei a usar M novamente",
      poster: "/video2-poster.jpg"
    },
    {
      src: "/video3.mp4",
      title: "Minha autoestima voltou", 
      poster: "/video3-poster.jpg"
    },
    {
      src: "/video4.mp4",
      title: "Resultado em 30 dias",
      poster: "/video4-poster.jpg"
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
                <Video
                  src={video.src}
                  controls
                  controlsList="nodownload nofullscreen noremoteplayback"
                  muted
                  playsInline
                  preload="metadata"
                  disablePictureInPicture
                  onLoadedMetadata={(e) => {
                    e.target.currentTime = 0;
                  }}
                >
                  Seu navegador não suporta o elemento de vídeo.
                </Video>
              </VideoContainer>
              <VideoTitle>{video.title}</VideoTitle>
            </PhoneMockup>
          ))}
        </VideosGrid>
      </Container>
    </VideoSectionContainer>
  );
};

export default VideoSection; 