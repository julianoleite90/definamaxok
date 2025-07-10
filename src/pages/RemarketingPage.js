import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaPlay, FaCheckCircle, FaShare, FaStar, FaLock, FaGift, FaChevronDown, FaArrowRight } from 'react-icons/fa';


const RemarketingContainer = styled.div`
  min-height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  width: 100%;
  background: linear-gradient(to right, #1a4d2e, #22c55e, #1a4d2e);
  padding: 0.875rem 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    animation: shine 1.5s infinite;
  }

  @keyframes shine {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  @media (min-width: 768px) {
    padding: 0.75rem 0;
  }
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;

  @media (min-width: 768px) {
    gap: 2rem;
    padding: 0.125rem 1rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Logo = styled.img`
  height: 2.4rem;
  width: auto;

  @media (min-width: 768px) {
    height: 3.2rem;
  }
`;

const HeaderButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #4CAF50;
  padding: 0.625rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #45A049;
  }
`;

const LimitSection = styled.div`
  background: linear-gradient(to bottom, #f0fdf4, white);
  border-bottom: 1px solid #e5e7eb;
  width: 100%;
`;

const LimitContent = styled.div`
  max-width: 1792px;
  margin: 0 auto;
  padding: 1rem;
`;

const LimitInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;

const LimitBadge = styled.div`
  background: #f0fdf4;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  border: 1px solid #bbf7d0;
  width: 100%;
  text-align: center;

  @media (min-width: 768px) {
    width: auto;
  }
`;

const LimitTitle = styled.h2`
  color: #166534;
  font-weight: bold;
  font-size: 1rem;

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

const LimitText = styled.p`
  color: #6b7280;
  font-size: 1rem;
  text-align: center;
  max-width: 48rem;
  line-height: 1.625;

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

const PaymentInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    width: auto;
  }
`;

const PaymentLabel = styled.span`
  color: #6b7280;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

const PaymentMethods = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  width: 100%;

  @media (min-width: 768px) {
    width: auto;
  }
`;

const PaymentIcon = styled.img`
  height: 1.5rem;
  width: auto;
`;

const PromoSection = styled.div`
  background: white;
  padding: 2rem 0;

  @media (min-width: 768px) {
    padding: 3rem 0;
  }

  &.mobile-only {
    @media (min-width: 768px) {
      display: none;
    }
  }

  &.desktop-only {
    display: none;

    @media (min-width: 768px) {
      display: block;
    }
  }
`;

const PromoDesktop = styled.div`
  max-width: 1536px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const PromoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
`;

const PromoImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PromoImage = styled.img`
  object-fit: contain;
`;

const PromoContent = styled.div``;

const PromoTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 900;
  color: #111827;
  margin-bottom: 0.75rem;
  line-height: 1.2;
`;

const PromoSubtitle = styled.h3`
  font-size: 1.875rem;
  font-weight: bold;
  color: #CD853F;
  margin-bottom: 1.5rem;
`;

const PromoText = styled.p`
  color: #374151;
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  line-height: 1.625;
`;

const PromoBox = styled.div`
  background: rgba(239, 246, 255, 0.5);
  border: 2px solid #3b82f6;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const PromoBoxTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: 900;
  color: #1f2937;
  margin-bottom: 0.75rem;
`;

const PromoBoxPrice = styled.div`
  margin-bottom: 0.25rem;
`;

const PromoBoxOldPrice = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ef4444;
  text-decoration: line-through;
`;

const PromoBoxNewPrice = styled.p`
  font-size: 1.875rem;
  font-weight: 900;
  color: #059669;
`;

const PromoButton = styled.button`
  display: inline-block;
  width: 100%;
  background: #059669;
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #047857;
  }
`;

const SecuritySeals = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding-top: 0.5rem;
`;

const SecurityItem = styled.div`
  display: flex;
  align-items: center;
  color: #374151;
  gap: 0.5rem;
`;

const SecurityIcon = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  color: #059669;
`;

const SecurityText = styled.span`
  font-size: 0.875rem;
`;

// Mobile Promo Components
const PromoMobile = styled.div`
  max-width: 24rem;
  margin: 0 auto;
  padding: 0 1rem;
`;

const PromoCard = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  text-align: center;
`;

const PromoImageMobile = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const PromoTitleMobile = styled.h2`
  font-size: 1.5rem;
  font-weight: 900;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const PromoSubtitleMobile = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #CD853F;
  margin-bottom: 1rem;
`;

const PromoTextMobile = styled.p`
  color: #374151;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.625;
`;

const PromoBoxMobile = styled.div`
  border: 2px solid #3b82f6;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  background: rgba(239, 246, 255, 0.5);
`;

const PromoBoxTitleMobile = styled.h4`
  font-size: 1.25rem;
  font-weight: 900;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const PromoBoxOldPriceMobile = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  color: #ef4444;
  text-decoration: line-through;
  margin-bottom: 0.25rem;
`;

const PromoBoxNewPriceMobile = styled.p`
  font-size: 1.5rem;
  font-weight: 900;
  color: #059669;
`;

const PromoButtonMobile = styled.button`
  display: block;
  width: 100%;
  background: #059669;
  color: white;
  font-size: 1.125rem;
  font-weight: bold;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #047857;
  }
`;

const SecuritySealsMobile = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const SecurityItemMobile = styled.div`
  display: flex;
  align-items: center;
  color: #4b5563;
  font-size: 0.875rem;
  gap: 0.25rem;
`;

const SecurityIconMobile = styled.div`
  width: 1rem;
  height: 1rem;
  color: #059669;
`;

const Separator = styled.div`
  width: 100%;
  border-top: 1px solid #e5e7eb;
`;

const VideoSection = styled.section`
  width: 100%;
  padding: 4rem 0;
  background: linear-gradient(to bottom, #f0fdf4, white);
`;

const VideoContent = styled.div`
  max-width: 1536px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const VideoHeader = styled.div`
  text-center;
  margin-bottom: 3rem;
`;

const VideoTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;

const VideoSubtitle = styled.p`
  color: #6b7280;
  font-size: 1.125rem;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const VideoCard = styled.div`
  position: relative;
`;

const VideoContainer = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 0.75rem;
  overflow: hidden;
  background: black;
`;

const VideoThumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlayOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  transform: scale(1);

  &:hover {
    background: white;
    transform: scale(1.1);
  }
`;

const PlayIcon = styled(FaPlay)`
  height: 2rem;
  width: 2rem;
  color: #059669;
`;

const VideoDuration = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  color: white;
  font-size: 0.875rem;
`;

const VideoIframe = styled.iframe`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const VideoInfo = styled.div`
  margin-top: 1rem;
`;

const VideoInfoTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
`;

const VideoInfoDescription = styled.p`
  color: #6b7280;
`;

const VideoMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const VideoStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusIcon = styled(FaCheckCircle)`
  height: 1.25rem;
  width: 1.25rem;
  color: ${props => props.watched ? '#059669' : '#9ca3af'};
`;

const StatusText = styled.span`
  font-size: 0.875rem;
  color: ${props => props.watched ? '#059669' : '#9ca3af'};
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    color: #1f2937;
  }
`;

const ShareIcon = styled(FaShare)`
  height: 1.25rem;
  width: 1.25rem;
`;

const RemarketingPage = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [videosWatched, setVideosWatched] = useState([false, false, false, false]);
  const [showShareOptions, setShowShareOptions] = useState(null);
  const videoRefs = useRef([null, null, null, null]);

  const getCurrentDate = () => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const scrollToKits = () => {
    // Implementar scroll para seção de kits ou redirecionar
    window.location.href = '#kits';
  };

  // Função para capturar parâmetros UTM da URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    const utmContent = urlParams.get('utm_content');
    const utmTerm = urlParams.get('utm_term');

    // Armazenar parâmetros UTM no localStorage para uso posterior
    if (utmSource) localStorage.setItem('utm_source', utmSource);
    if (utmMedium) localStorage.setItem('utm_medium', utmMedium);
    if (utmCampaign) localStorage.setItem('utm_campaign', utmCampaign);
    if (utmContent) localStorage.setItem('utm_content', utmContent);
    if (utmTerm) localStorage.setItem('utm_term', utmTerm);
  }, []);

  // Função para adicionar UTMs aos links de compra
  const addUtmToUrl = (baseUrl) => {
    const utmSource = localStorage.getItem('utm_source');
    const utmMedium = localStorage.getItem('utm_medium');
    const utmCampaign = localStorage.getItem('utm_campaign');
    const utmContent = localStorage.getItem('utm_content');
    const utmTerm = localStorage.getItem('utm_term');

    const url = new URL(baseUrl);

    if (utmSource) url.searchParams.append('utm_source', utmSource);
    if (utmMedium) url.searchParams.append('utm_medium', utmMedium);
    if (utmCampaign) url.searchParams.append('utm_campaign', utmCampaign);
    if (utmContent) url.searchParams.append('utm_content', utmContent);
    if (utmTerm) url.searchParams.append('utm_term', utmTerm);

    return url.toString();
  };

  // Dados dos vídeos
  const videos = [
    {
      id: 1,
      vimeoId: "1079845171",
      title: "Eu sempre fui gorda, com Definamax a minha vida mudou",
      description: "Depoimento de cliente Definamax",
      thumbnail: "/alarissa.png",
      duration: "3:45",
    },
    {
      id: 2,
      vimeoId: "1079850549",
      title: "Definamax acabou com a minha compulsão alimentar",
      description: "Depoimento de cliente Definamax",
      thumbnail: "/aandrea.png",
      duration: "5:12",
    },
    {
      id: 3,
      vimeoId: "1079845066",
      title: "Em 30 dias perdi 5 kg, incrível",
      description: "Depoimento de cliente Definamax",
      thumbnail: "/arenata.png",
      duration: "4:30",
    },
    {
      id: 4,
      vimeoId: "1079845128",
      title: "Recuperou muito a minha autoestima",
      description: "Depoimento de cliente Definamax",
      thumbnail: "/avanessa.png",
      duration: "6:18",
    },
  ];

  // Função para reproduzir vídeo
  const playVideo = (index) => {
    // Se já estiver reproduzindo este vídeo, não faz nada
    if (activeVideo === index) return;

    // Se estiver reproduzindo outro vídeo, para ele primeiro
    if (activeVideo !== null && videoRefs.current[activeVideo]) {
      const iframe = videoRefs.current[activeVideo];
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage('{"method":"pause"}', "*");
      }
    }

    // Ativa o novo vídeo
    setActiveVideo(index);

    // Marca o vídeo como assistido
    const newVideosWatched = [...videosWatched];
    newVideosWatched[index] = true;
    setVideosWatched(newVideosWatched);
  };

  // Função para compartilhar vídeo
  const shareVideo = (index) => {
    if (showShareOptions === index) {
      setShowShareOptions(null);
    } else {
      setShowShareOptions(index);
    }
  };

  return (
    <RemarketingContainer>
      {/* Header */}
      <Header>
        <HeaderContent>
          <LogoContainer>
            <Logo src="/logo2.png" alt="Definamax" />
          </LogoContainer>
          <div>
            <HeaderButton onClick={scrollToKits}>
              Comprar Agora
            </HeaderButton>
          </div>
        </HeaderContent>
      </Header>

      {/* Seção de Limite de Compra */}
      <LimitSection>
        <LimitContent>
          <LimitInner>
            <LimitBadge>
              <LimitTitle>
                LIMITADO A UMA COMPRA POR CLIENTE
              </LimitTitle>
            </LimitBadge>
            <LimitText>
              Devido a grande demanda de pedidos, a partir de hoje {getCurrentDate()}, 
              nós temos um estoque limitado e pronto para envio em 24horas.
            </LimitText>
            <PaymentInfo>
              <PaymentLabel>FORMAS DE PAGAMENTO:</PaymentLabel>
              <PaymentMethods>
                <PaymentIcon src="/visa.png" alt="Visa" />
                <PaymentIcon src="/master.png" alt="Mastercard" />
                <PaymentIcon src="/hiper.png" alt="Hipercard" />
                <PaymentIcon src="/pix.png" alt="PIX" />
              </PaymentMethods>
            </PaymentInfo>
          </LimitInner>
        </LimitContent>
      </LimitSection>

      {/* Seção Promocional Desktop */}
      <PromoSection className="desktop-only">
        <PromoDesktop>
          <PromoGrid>
            {/* Coluna da Imagem */}
            <PromoImageContainer>
              <PromoImage
                src="/potegratis.png"
                alt="Definamax - Pote Extra Grátis"
                width={450}
                height={450}
              />
            </PromoImageContainer>

            {/* Coluna do Conteúdo */}
            <PromoContent>
              <PromoTitle>
                RECEBA 1 POTE EXTRA
              </PromoTitle>
              <PromoSubtitle>
                GRÁTIS
              </PromoSubtitle>

              <PromoText>
                Na compra de qualquer kit do DEFINAMAX você receberá GRATUITAMENTE 
                um pote extra para potencializar seus resultados com mais um mês de 
                tratamento ou para presentear alguém que gostaria de emagrecer.
              </PromoText>

              <PromoBox>
                <PromoBoxTitle>
                  VOCÊ LEVA UM POTE EXTRA
                </PromoBoxTitle>
                <PromoBoxPrice>
                  <PromoBoxOldPrice>
                    DE R$ 279,00
                  </PromoBoxOldPrice>
                  <PromoBoxNewPrice>
                    TOTALMENTE GRÁTIS
                  </PromoBoxNewPrice>
                </PromoBoxPrice>
              </PromoBox>

              <div style={{textAlign: 'center'}}>
                <PromoButton onClick={scrollToKits}>
                  APROVEITAR OFERTA AGORA
                </PromoButton>

                <SecuritySeals>
                  <SecurityItem>
                    <SecurityIcon>🔒</SecurityIcon>
                    <SecurityText>Compra Segura</SecurityText>
                  </SecurityItem>
                  <SecurityItem>
                    <SecurityIcon>✓</SecurityIcon>
                    <SecurityText>Site Oficial</SecurityText>
                  </SecurityItem>
                </SecuritySeals>
              </div>
            </PromoContent>
          </PromoGrid>
        </PromoDesktop>
      </PromoSection>

      {/* Seção Promocional Mobile */}
      <PromoSection className="mobile-only">
        <PromoMobile>
          <PromoCard>
            <PromoImageMobile>
              <img
                src="/potegratis.png"
                alt="Definamax - Pote Extra Grátis"
                width={280}
                height={280}
                style={{margin: '0 auto', display: 'block'}}
              />
            </PromoImageMobile>

            <PromoTitleMobile>
              RECEBA 1 POTE EXTRA
            </PromoTitleMobile>
            <PromoSubtitleMobile>
              GRÁTIS
            </PromoSubtitleMobile>

            <PromoTextMobile>
              Na compra de qualquer kit do DEFINAMAX você receberá GRATUITAMENTE 
              um pote extra para potencializar seus resultados com mais um mês de 
              tratamento ou para presentear alguém que gostaria de emagrecer.
            </PromoTextMobile>

            <PromoBoxMobile>
              <PromoBoxTitleMobile>
                VOCÊ LEVA UM POTE EXTRA
              </PromoBoxTitleMobile>
              <PromoBoxOldPriceMobile>
                DE R$ 279,00
              </PromoBoxOldPriceMobile>
              <PromoBoxNewPriceMobile>
                TOTALMENTE GRÁTIS
              </PromoBoxNewPriceMobile>
            </PromoBoxMobile>

            <div style={{textAlign: 'center'}}>
              <PromoButtonMobile onClick={scrollToKits}>
                APROVEITAR OFERTA AGORA
              </PromoButtonMobile>

              <SecuritySealsMobile>
                <SecurityItemMobile>
                  <SecurityIconMobile>🔒</SecurityIconMobile>
                  Compra Segura
                </SecurityItemMobile>
                <SecurityItemMobile>
                  <SecurityIconMobile>✓</SecurityIconMobile>
                  Site Oficial
                </SecurityItemMobile>
              </SecuritySealsMobile>
            </div>
          </PromoCard>
        </PromoMobile>
      </PromoSection>

      <Separator />

      {/* Seção de Vídeos */}
      <VideoSection>
        <VideoContent>
          <VideoHeader>
            <VideoTitle>
              Veja os resultados reais
            </VideoTitle>
            <VideoSubtitle>
              Depoimentos de pessoas que transformaram suas vidas com Definamax
            </VideoSubtitle>
          </VideoHeader>

          <VideoGrid>
            {videos.map((video, index) => (
              <VideoCard key={index}>
                <VideoContainer>
                  {activeVideo === index ? (
                    <VideoIframe
                      ref={el => { videoRefs.current[index] = el }}
                      src={`https://player.vimeo.com/video/${video.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
                      allow="autoplay; fullscreen"
                      allowFullScreen
                    />
                  ) : (
                    <VideoThumbnail>
                      <ThumbnailImage
                        src={video.thumbnail}
                        alt={video.title}
                      />
                      <PlayOverlay>
                        <PlayButton onClick={() => playVideo(index)}>
                          <PlayIcon />
                        </PlayButton>
                      </PlayOverlay>
                      <VideoDuration>
                        {video.duration}
                      </VideoDuration>
                    </VideoThumbnail>
                  )}
                </VideoContainer>
                <VideoInfo>
                  <VideoInfoTitle>{video.title}</VideoInfoTitle>
                  <VideoInfoDescription>{video.description}</VideoInfoDescription>
                  <VideoMeta>
                    <VideoStatus>
                      <StatusIcon watched={videosWatched[index]} />
                      <StatusText watched={videosWatched[index]}>
                        {videosWatched[index] ? "Assistido" : "Não assistido"}
                      </StatusText>
                    </VideoStatus>
                    <ShareButton onClick={() => shareVideo(index)}>
                      <ShareIcon />
                      <span>Compartilhar</span>
                    </ShareButton>
                  </VideoMeta>
                </VideoInfo>
              </VideoCard>
            ))}
          </VideoGrid>
        </VideoContent>
      </VideoSection>
      

    </RemarketingContainer>
  );
};

export default RemarketingPage; 