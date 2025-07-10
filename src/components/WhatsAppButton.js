import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
  70% { box-shadow: 0 0 0 20px rgba(37, 211, 102, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
`;

const WhatsAppContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  animation: ${float} 3s ease-in-out infinite;
`;

const WhatsAppLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: #25D366;
  border-radius: 50%;
  color: white;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
  transition: all 0.3s ease;
  animation: ${pulse} 2s infinite;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(37, 211, 102, 0.6);
  }

  @media (max-width: 768px) {
    width: 55px;
    height: 55px;
    bottom: 15px;
    right: 15px;
  }
`;

const WhatsAppIcon = styled(FaWhatsapp)`
  font-size: 28px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const WhatsAppButton = () => {
  const message = encodeURIComponent('Olá! Gostaria de saber mais sobre o Definamax.');
  
  return (
    <WhatsAppContainer>
      <WhatsAppLink
        href={`https://wa.me/5541984549172?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
      >
        <WhatsAppIcon />
      </WhatsAppLink>
    </WhatsAppContainer>
  );
};

export default WhatsAppButton; 