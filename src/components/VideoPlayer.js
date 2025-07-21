import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PlayerContainer = styled(motion.div)`
  background: transparent;
  border-radius: 0;
  padding: 0;
  margin: 10px 0;
  max-width: 720px;
  width: 100%;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  @media (max-width: 768px) {
    margin: 15px 0;
    max-width: 100%;
    width: 100%;
    overflow: hidden;
    background: transparent;
  }
  
  @media (max-width: 390px) and (max-height: 844px) {
    /* iPhone 12 Pro específico */
    overflow: hidden;
    background: transparent;
    max-width: 100%;
    width: 100%;
  }
`;

const PlayerContent = styled.div`
  position: relative;
  width: 100%;
  height: 405px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 240px;
    overflow: hidden;
  }
  
  @media (max-width: 390px) and (max-height: 844px) {
    /* iPhone 12 Pro específico */
    height: 220px;
    overflow: hidden;
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  
  @media (max-width: 768px) {
    overflow: hidden;
  }
  
  @media (max-width: 390px) and (max-height: 844px) {
    /* iPhone 12 Pro específico */
    overflow: hidden;
  }
`;

const VimeoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 0;
  object-fit: cover;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
  }
  
  @media (max-width: 390px) and (max-height: 844px) {
    /* iPhone 12 Pro específico - força o preenchimento completo */
    width: 110%;
    height: 110%;
    top: -5%;
    left: -5%;
    object-fit: cover;
  }
`;

const ThumbnailContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(26, 77, 46, 0.3) 30%,
    rgba(22, 197, 94, 0.2) 70%,
    rgba(0, 0, 0, 0.4) 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover {
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(26, 77, 46, 0.4) 30%,
      rgba(22, 197, 94, 0.3) 70%,
      rgba(0, 0, 0, 0.5) 100%
    );
  }
`;

const ThumbnailText = styled.div`
  color: white;
  font-size: 1.8rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: 30px;
  text-shadow: 
    4px 4px 8px rgba(0, 0, 0, 1),
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0 0 10px rgba(0, 0, 0, 0.6);
  background: rgba(0, 0, 0, 0.3);
  padding: 10px 20px;
  border-radius: 8px;
  backdrop-filter: blur(2px);
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
    letter-spacing: 1px;
    margin-bottom: 20px;
    padding: 8px 16px;
  }
`;



const PlayButton = styled(motion.button)`
  width: 70px;
  height: 70px;
  background: transparent;
  border: 2px solid #ff3333;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: #ff3333;
  box-shadow: 0 4px 20px rgba(255, 51, 51, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 51, 51, 0.1);
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(255, 51, 51, 0.4);
  }
  
  &::before {
    content: '▶';
    margin-left: 3px;
  }
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }
`;



const VideoPlayer = () => {
  const [showThumbnail, setShowThumbnail] = useState(true);

  const handlePlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Remove a máscara para mostrar o vídeo
    setShowThumbnail(false);
  };

  // Vídeo COM SOM ATIVO - MESMO PADRÃO DOS DEPOIMENTOS QUE FUNCIONAM
  const vimeoSrc = `https://player.vimeo.com/video/1103301355?badge=0&autopause=0&muted=0&controls=1&title=0&byline=0&portrait=0`;

  return (
    <PlayerContainer
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.7 }}
    >
      <PlayerContent>
        <VideoContainer>
          {/* Vídeo sempre presente, carregado no fundo */}
          <VimeoIframe
            src={vimeoSrc}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Vídeo de Fabricação DEFINAMAX"
          />
          
          {/* Máscara que some quando clica no play */}
          {showThumbnail && (
            <ThumbnailContainer onClick={handlePlayClick}>
              <ThumbnailText>APERTE O PLAY</ThumbnailText>
              <PlayButton
                onClick={handlePlayClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            </ThumbnailContainer>
          )}
        </VideoContainer>
      </PlayerContent>
    </PlayerContainer>
  );
};

export default VideoPlayer; 