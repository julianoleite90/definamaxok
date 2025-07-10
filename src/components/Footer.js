import React from 'react';
import styled from 'styled-components';

const FooterSection = styled.footer`
  background: #1a4d2e;
  color: white;
  padding: 50px 0 30px;
  text-align: center;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--container-padding);
`;

const BrandSection = styled.div`
  margin-bottom: 30px;
`;

const BrandLogo = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  
  img {
    height: 60px;
    width: auto;
    
    @media (max-width: 768px) {
      height: 50px;
    }
  }
`;

const BrandDescription = styled.p`
  font-size: 1rem;
  color: white;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const DisclaimerText = styled.p`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 30px;
  line-height: 1.5;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

const LinksSection = styled.div`
  margin-bottom: 30px;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const LinkSeparator = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const CopyrightSection = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 25px;
`;

const Copyright = styled.p`
  color: white;
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

const CompanyInfo = styled.p`
  color: white;
  font-size: 0.9rem;
`;

const Footer = () => {
  return (
    <FooterSection>
      <Container>
        <BrandSection>
          <BrandLogo>
            <img src="/logo-definamax.png" alt="Definamax - Emagrecedor Natural | Bourjam Nature Health" />
          </BrandLogo>
          <BrandDescription>
            Definamax - O seu aliado natural para o emagrecimento saudável e eficaz.
          </BrandDescription>
        </BrandSection>

        <DisclaimerText>
          *Resultados podem variar de pessoa para pessoa. Este produto não se destina a diagnosticar, tratar, curar ou prevenir qualquer 
          doença. Consulte sempre um profissional de saúde qualificado antes de iniciar qualquer programa de emagrecimento.
        </DisclaimerText>

        <LinksSection>
          <FooterLinks>
            <FooterLink href="https://www.definamaxoficial.com/avaliacao-imc" target="_blank" rel="noopener noreferrer">Avaliação do IMC</FooterLink>
            <LinkSeparator>|</LinkSeparator>
            <FooterLink href="https://www.definamaxoficial.com/termos" target="_blank" rel="noopener noreferrer">Termos de Garantia</FooterLink>
            <LinkSeparator>|</LinkSeparator>
            <FooterLink href="https://www.definamaxoficial.com/faq" target="_blank" rel="noopener noreferrer">Perguntas Frequentes</FooterLink>
            <LinkSeparator>|</LinkSeparator>
            <FooterLink href="https://www.definamaxoficial.com/produtos" target="_blank" rel="noopener noreferrer">Produtos</FooterLink>
            <LinkSeparator>|</LinkSeparator>
            <FooterLink href="https://www.definamaxoficial.com/depoimentos" target="_blank" rel="noopener noreferrer">Depoimentos em Vídeo</FooterLink>
            <LinkSeparator>|</LinkSeparator>
            <FooterLink href="https://www.definamaxoficial.com/privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</FooterLink>
          </FooterLinks>
        </LinksSection>

        <CopyrightSection>
          <Copyright>
            Copyright © 2025 Definamax. Todos os direitos reservados.
          </Copyright>
          <CompanyInfo>
            Bourjam Nature Health, Florianópolis Santa Catarina
          </CompanyInfo>
        </CopyrightSection>
      </Container>
    </FooterSection>
  );
};

export default Footer; 