import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PlayerContainer = styled(motion.div)`
  background: var(--gradient-primary);
  border-radius: 0;
  padding: 0;
  margin: 10px 0;
  max-width: 720px;
  width: 100%;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  
  @media (max-width: 768px) {
    margin: 15px 0;
    max-width: 400px;
  }
`;

const PlayerContent = styled.div`
  position: relative;
  width: 100%;
  height: 405px;
  
  @media (max-width: 768px) {
    height: 240px;
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
`;

const ThumbnailContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(26, 77, 46, 0.6) 30%,
    rgba(22, 197, 94, 0.4) 70%,
    rgba(0, 0, 0, 0.7) 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(26, 77, 46, 0.7) 30%,
      rgba(22, 197, 94, 0.5) 70%,
      rgba(0, 0, 0, 0.8) 100%
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

const ThumbnailSubtext = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 20px;
  }
`;

const PlayerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.isPlaying ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.5)'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-radius: 0;
  
  ${props => props.isPlaying && `
    opacity: 0;
    
    &:hover {
      opacity: 1;
    }
  `}
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
    content: '${props => props.isPlaying ? '⏸' : '▶'}';
    margin-left: ${props => props.isPlaying ? '0' : '3px'};
  }
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 0;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: white;
  border-radius: 0;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        const progressPercent = (video.currentTime / video.duration) * 100;
        setProgress(progressPercent);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setShowThumbnail(true);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      // Desmuta o vídeo quando começa a reproduzir
      video.muted = false;
      video.play();
      setShowThumbnail(false);
    }
    setIsPlaying(!isPlaying);
  };

  const handleVideoClick = (e) => {
    e.stopPropagation();
    togglePlay();
  };

  return (
    <PlayerContainer
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.7 }}
    >
      <PlayerContent>
        <VideoContainer
          onClick={handleVideoClick}
        >
          <Video
            ref={videoRef}
            playsInline
            preload="auto"
            muted
            poster=""
            crossOrigin="anonymous"
          >
            <source src="/fabricacao.mp4" type="video/mp4" />
            Seu navegador não suporta o elemento de vídeo.
          </Video>
          
          {showThumbnail ? (
            <ThumbnailContainer onClick={togglePlay}>
              <ThumbnailText>APERTE O PLAY</ThumbnailText>
              <PlayButton
                isPlaying={false}
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            </ThumbnailContainer>
          ) : (
            <PlayerOverlay isPlaying={isPlaying}>
              <PlayButton
                isPlaying={isPlaying}
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            </PlayerOverlay>
          )}

          <ProgressBar>
            <ProgressFill progress={progress} />
          </ProgressBar>

        </VideoContainer>
      </PlayerContent>
    </PlayerContainer>
  );
};

export default VideoPlayer; 