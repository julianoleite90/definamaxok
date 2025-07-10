import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FaCheckCircle, FaLock, FaArrowRight, FaClock, FaBox, FaMobile, FaFileAlt } from 'react-icons/fa';

const ThankYouContainer = styled.div`
  min-height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
  background: linear-gradient(to right, #1a4d2e, #22c55e, #1a4d2e);
  padding: 1rem 0;
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
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
`;

const Logo = styled.img`
  height: 3rem;
  width: auto;
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
`;

const HeroSection = styled.section`
  width: 100%;
  background: linear-gradient(to bottom, #f0fdf4, white);
  padding: 3rem 0;

  @media (min-width: 768px) {
    padding: 4rem 0;
  }
`;

const HeroContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
`;

const StatusBadge = styled.div`
  display: inline-block;
  background: #dcfce7;
  color: #166534;
  padding: 0.25rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const CheckIconContainer = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
`;

const CheckIconWrapper = styled.div`
  width: 5rem;
  height: 5rem;
  background: #dcfce7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckIcon = styled(FaCheckCircle)`
  height: 2.5rem;
  width: 2.5rem;
  color: #16a34a;
`;

const HeroTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  color: #166534;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;

const HeroText = styled.p`
  font-size: 1.125rem;
  color: #374151;
  margin-bottom: 1.5rem;
  max-width: 32rem;
  margin-left: auto;
  margin-right: auto;
`;

const SecurityBadge = styled.div`
  display: inline-flex;
  align-items: center;
  background: #f0fdf4;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
`;

const SecurityIcon = styled(FaLock)`
  height: 1rem;
  width: 1rem;
  color: #16a34a;
`;

const SecurityText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`;

const OrderSection = styled.section`
  width: 100%;
  padding: 2rem 0;
  background: white;
`;

const OrderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const OrderCard = styled.div`
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const OrderTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const OrderGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  text-align: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const OrderItem = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const OrderItemIcon = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  color: #16a34a;
  margin: 0 auto 0.5rem;
`;

const OrderItemTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const OrderItemText = styled.p`
  color: #374151;
`;

const NextStepsSection = styled.section`
  width: 100%;
  padding: 3rem 0;
  background: #f0fdf4;
`;

const NextStepsContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SectionHeader = styled.div`
  text-center;
  margin-bottom: 2.5rem;
`;

const SectionBadge = styled.div`
  display: inline-block;
  background: #dcfce7;
  color: #166534;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const SectionSubtitle = styled.p`
  color: #6b7280;
  max-width: 32rem;
  margin: 0 auto;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StepCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #bbf7d0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const StepNumber = styled.div`
  position: absolute;
  top: -1rem;
  left: -1rem;
  width: 2.5rem;
  height: 2.5rem;
  background: #16a34a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const StepContent = styled.div`
  padding-top: 0.5rem;
`;

const StepTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.75rem;
`;

const StepText = styled.p`
  color: #6b7280;
  margin-bottom: 1rem;
`;

const StepMeta = styled.div`
  display: flex;
  align-items: center;
  color: #16a34a;
  gap: 0.5rem;
`;

const StepMetaIcon = styled.div`
  height: 1.25rem;
  width: 1.25rem;
`;

const StepMetaText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`;

const UsageSection = styled.section`
  width: 100%;
  padding: 3rem 0;
  background: white;
`;

const UsageContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const UsageCard = styled.div`
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const UsageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const UsageColumn = styled.div``;

const UsageColumnTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const UsageList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const UsageItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 0.75rem;
`;

const UsageItemIcon = styled(FaCheckCircle)`
  height: 1.25rem;
  width: 1.25rem;
  color: #16a34a;
  flex-shrink: 0;
  margin-top: 0.125rem;
`;

const UsageItemText = styled.span``;

const SupportSection = styled.section`
  width: 100%;
  padding: 3rem 0;
  background: #f0fdf4;
`;

const SupportContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SupportGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const SupportCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #bbf7d0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  transform: translateY(0);

  &:hover {
    box-shadow: 0 8px 25px -8px rgba(0, 0, 0, 0.1);
    transform: translateY(-0.25rem);
  }
`;

const SupportHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const SupportIconWrapper = styled.div`
  background: #dcfce7;
  border-radius: 50%;
  padding: 0.75rem;
  margin-right: 1rem;
`;

const SupportIconContainer = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  color: #16a34a;
`;

const SupportTitleContainer = styled.div``;

const SupportTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
`;

const SupportSubtitle = styled.p`
  color: #6b7280;
`;

const SupportText = styled.p`
  color: #374151;
  margin-bottom: 1rem;
`;

const SupportButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background: #16a34a;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  text-decoration: none;
  width: 100%;
  gap: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background: #15803d;
  }
`;

const Footer = styled.footer`
  width: 100%;
  background: #166534;
  color: white;
`;

const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 1rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FooterColumn = styled.div``;

const FooterLogo = styled.img`
  height: 2.5rem;
  width: auto;
  margin-bottom: 1rem;
`;

const FooterText = styled.p`
  font-size: 0.875rem;
  color: #bbf7d0;
  margin-bottom: 1rem;
`;

const FooterTitle = styled.h3`
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 1rem;
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const FooterLink = styled.a`
  color: #bbf7d0;
  font-size: 0.875rem;
  text-decoration: none;

  &:hover {
    color: white;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #15803d;
  margin-top: 2rem;
  padding-top: 2rem;
  text-align: center;
`;

const FooterBottomText = styled.p`
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const FooterBottomSmall = styled.p`
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
`;

const ThankYouPage = () => {
  // Função para obter parâmetros da URL
  const getUrlParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      value: urlParams.get('value') || '379.00', // Valor padrão Kit 5 Meses
      transaction_id: urlParams.get('transaction_id') || `TX-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      product_name: urlParams.get('product') || 'Definamax - Kit 5 Meses',
      quantity: urlParams.get('quantity') || '1'
    };
  };

  const purchaseData = getUrlParams();

  useEffect(() => {
    // Enhanced Ecommerce - Purchase Event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: purchaseData.transaction_id,
        value: parseFloat(purchaseData.value),
        currency: 'BRL',
        items: [{
          item_id: 'definamax-kit',
          item_name: purchaseData.product_name,
          category: 'Suplementos',
          quantity: parseInt(purchaseData.quantity),
          price: parseFloat(purchaseData.value)
        }]
      });

      // Google Ads Conversion Tracking
      window.gtag('event', 'conversion', {
        'send_to': 'AW-632000271/jO6vCIOx2NQBEI-erq0C',
        'value': parseFloat(purchaseData.value),
        'currency': 'BRL',
        'transaction_id': purchaseData.transaction_id
      });

      // Facebook Pixel - Purchase Event
      if (window.fbq) {
        window.fbq('track', 'Purchase', {
          value: parseFloat(purchaseData.value),
          currency: 'BRL',
          content_name: purchaseData.product_name,
          content_category: 'Suplementos',
          content_ids: ['definamax-kit'],
          content_type: 'product',
          num_items: parseInt(purchaseData.quantity)
        });
      }
    }
  }, [purchaseData]);

  return (
    <ThankYouContainer>
      {/* Header */}
      <Header>
        <HeaderContent>
          <Logo src="/logo2.png" alt="Definamax" />
        </HeaderContent>
      </Header>

      <Main>
        {/* Thank You Hero Section */}
        <HeroSection>
          <HeroContent>
            <StatusBadge>
              Pedido Confirmado
            </StatusBadge>

            <CheckIconContainer>
              <CheckIconWrapper>
                <CheckIcon />
              </CheckIconWrapper>
            </CheckIconContainer>

            <HeroTitle>Obrigado pela sua compra!</HeroTitle>

            <HeroText>
              Seu pedido foi recebido com sucesso e está sendo processado. Em breve você receberá um e-mail com os
              detalhes da sua compra.
            </HeroText>

            <SecurityBadge>
              <SecurityIcon />
              <SecurityText>Compra 100% segura e protegida</SecurityText>
            </SecurityBadge>
          </HeroContent>
        </HeroSection>

        {/* Order Details */}
        <OrderSection>
          <OrderContent>
            <OrderCard>
              <OrderTitle>Detalhes do Pedido</OrderTitle>

              <OrderGrid>
                <OrderItem>
                  <OrderItemIcon as={FaClock} />
                  <OrderItemTitle>Status do Pedido</OrderItemTitle>
                  <OrderItemText>Confirmado</OrderItemText>
                </OrderItem>

                <OrderItem>
                  <OrderItemIcon as={FaBox} />
                  <OrderItemTitle>Prazo de Entrega</OrderItemTitle>
                  <OrderItemText>5-7 dias úteis</OrderItemText>
                </OrderItem>

                <OrderItem>
                  <OrderItemIcon as={FaFileAlt} />
                  <OrderItemTitle>Nota Fiscal</OrderItemTitle>
                  <OrderItemText>Será enviada por e-mail</OrderItemText>
                </OrderItem>
              </OrderGrid>
            </OrderCard>
          </OrderContent>
        </OrderSection>

        {/* Next Steps */}
        <NextStepsSection>
          <NextStepsContent>
            <SectionHeader>
              <SectionBadge>
                Próximos Passos
              </SectionBadge>
              <SectionTitle>O que acontece agora?</SectionTitle>
              <SectionSubtitle>Aqui está o que você pode esperar nos próximos dias</SectionSubtitle>
            </SectionHeader>

            <StepsGrid>
              <StepCard>
                <StepNumber>1</StepNumber>
                <StepContent>
                  <StepTitle>Processamento</StepTitle>
                  <StepText>
                    Seu pedido será processado em até 24 horas. Você receberá um e-mail de confirmação com os detalhes
                    da compra.
                  </StepText>
                  <StepMeta>
                    <StepMetaIcon as={FaClock} />
                    <StepMetaText>Dentro de 24 horas</StepMetaText>
                  </StepMeta>
                </StepContent>
              </StepCard>

              <StepCard>
                <StepNumber>2</StepNumber>
                <StepContent>
                  <StepTitle>Envio</StepTitle>
                  <StepText>
                    Assim que seu pedido for enviado, você receberá um código de rastreamento para acompanhar a entrega.
                  </StepText>
                  <StepMeta>
                    <StepMetaIcon as={FaBox} />
                    <StepMetaText>Em até 48 horas</StepMetaText>
                  </StepMeta>
                </StepContent>
              </StepCard>

              <StepCard>
                <StepNumber>3</StepNumber>
                <StepContent>
                  <StepTitle>Entrega</StepTitle>
                  <StepText>
                    Seu Definamax será entregue em sua casa. Lembre-se de verificar se há alguém para receber.
                  </StepText>
                  <StepMeta>
                    <StepMetaIcon as={FaLock} />
                    <StepMetaText>5-7 dias úteis</StepMetaText>
                  </StepMeta>
                </StepContent>
              </StepCard>
            </StepsGrid>
          </NextStepsContent>
        </NextStepsSection>

        {/* Usage Instructions */}
        <UsageSection>
          <UsageContent>
            <SectionHeader>
              <SectionBadge>
                Como Usar
              </SectionBadge>
              <SectionTitle>Instruções de Uso</SectionTitle>
              <SectionSubtitle>
                Para obter os melhores resultados com o Definamax, siga estas recomendações
              </SectionSubtitle>
            </SectionHeader>

            <UsageCard>
              <UsageGrid>
                <UsageColumn>
                  <UsageColumnTitle>Modo de Uso</UsageColumnTitle>
                  <UsageList>
                    <UsageItem>
                      <UsageItemIcon />
                      <UsageItemText>Tome 2 cápsulas por dia, preferencialmente 30 minutos antes do almoço</UsageItemText>
                    </UsageItem>
                    <UsageItem>
                      <UsageItemIcon />
                      <UsageItemText>Beba pelo menos 2 litros de água por dia para potencializar os resultados</UsageItemText>
                    </UsageItem>
                    <UsageItem>
                      <UsageItemIcon />
                      <UsageItemText>Para melhores resultados, mantenha uma alimentação equilibrada</UsageItemText>
                    </UsageItem>
                    <UsageItem>
                      <UsageItemIcon />
                      <UsageItemText>Pratique atividade física regularmente, mesmo que seja uma caminhada leve</UsageItemText>
                    </UsageItem>
                  </UsageList>
                </UsageColumn>
                <UsageColumn>
                  <UsageColumnTitle>Resultados Esperados</UsageColumnTitle>
                  <UsageList>
                    <UsageItem>
                      <UsageItemIcon />
                      <UsageItemText>Primeiros 7 dias: Redução da fome e da compulsão alimentar</UsageItemText>
                    </UsageItem>
                    <UsageItem>
                      <UsageItemIcon />
                      <UsageItemText>15-30 dias: Primeiros resultados visíveis na balança</UsageItemText>
                    </UsageItem>
                    <UsageItem>
                      <UsageItemIcon />
                      <UsageItemText>30-60 dias: Redução significativa de medidas e peso</UsageItemText>
                    </UsageItem>
                    <UsageItem>
                      <UsageItemIcon />
                      <UsageItemText>90 dias: Transformação completa e resultados duradouros</UsageItemText>
                    </UsageItem>
                  </UsageList>
                </UsageColumn>
              </UsageGrid>
            </UsageCard>
          </UsageContent>
        </UsageSection>

        {/* Support Section */}
        <SupportSection>
          <SupportContent>
            <SectionHeader>
              <SectionBadge>
                Suporte
              </SectionBadge>
              <SectionTitle>Estamos aqui para ajudar</SectionTitle>
              <SectionSubtitle>
                Se você tiver qualquer dúvida ou precisar de assistência, nossa equipe está pronta para atendê-lo
              </SectionSubtitle>
            </SectionHeader>

            <SupportGrid>
              <SupportCard>
                <SupportHeader>
                  <SupportIconWrapper>
                    <SupportIconContainer as={FaMobile} />
                  </SupportIconWrapper>
                  <SupportTitleContainer>
                    <SupportTitle>WhatsApp</SupportTitle>
                    <SupportSubtitle>Atendimento rápido e direto</SupportSubtitle>
                  </SupportTitleContainer>
                </SupportHeader>
                <SupportText>
                  Para dúvidas sobre seu pedido, uso do produto ou qualquer outra informação, fale conosco pelo
                  WhatsApp.
                </SupportText>
                <SupportButton
                  href="https://wa.link/qbqegi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Falar com Atendimento <FaArrowRight />
                </SupportButton>
              </SupportCard>

              <SupportCard>
                <SupportHeader>
                  <SupportIconWrapper>
                    <SupportIconContainer as={FaFileAlt} />
                  </SupportIconWrapper>
                  <SupportTitleContainer>
                    <SupportTitle>E-mail</SupportTitle>
                    <SupportSubtitle>Suporte por e-mail</SupportSubtitle>
                  </SupportTitleContainer>
                </SupportHeader>
                <SupportText>
                  Para questões mais detalhadas ou envio de documentos, você pode entrar em contato através do nosso
                  e-mail.
                </SupportText>
                <SupportButton href="mailto:sac@bourjun.com.br">
                  Enviar E-mail <FaArrowRight />
                </SupportButton>
              </SupportCard>
            </SupportGrid>
          </SupportContent>
        </SupportSection>
      </Main>

      {/* Footer */}
      <Footer>
        <FooterContent>
          <FooterGrid>
            <FooterColumn>
              <FooterLogo src="/logo2.png" alt="Definamax" />
              <FooterText>
                Definamax é um suplemento 100% natural para emagrecimento saudável e duradouro.
              </FooterText>
            </FooterColumn>

            <FooterColumn>
              <FooterTitle>Informações</FooterTitle>
              <FooterList>
                <FooterListItem>
                  <FooterLink href="#">Sobre nós</FooterLink>
                </FooterListItem>
                <FooterListItem>
                  <FooterLink href="#">Como funciona</FooterLink>
                </FooterListItem>
                <FooterListItem>
                  <FooterLink href="#">Ingredientes</FooterLink>
                </FooterListItem>
                <FooterListItem>
                  <FooterLink href="#">Blog</FooterLink>
                </FooterListItem>
              </FooterList>
            </FooterColumn>

            <FooterColumn>
              <FooterTitle>Suporte</FooterTitle>
              <FooterList>
                <FooterListItem>
                  <FooterLink href="#">Perguntas frequentes</FooterLink>
                </FooterListItem>
                <FooterListItem>
                  <FooterLink href="#">Política de privacidade</FooterLink>
                </FooterListItem>
                <FooterListItem>
                  <FooterLink href="#">Termos de uso</FooterLink>
                </FooterListItem>
                <FooterListItem>
                  <FooterLink href="#">Contato</FooterLink>
                </FooterListItem>
              </FooterList>
            </FooterColumn>

            <FooterColumn>
              <FooterTitle>Contato</FooterTitle>
              <FooterList>
                <FooterListItem>
                  <FooterText>📧 sac@bourjun.com.br</FooterText>
                </FooterListItem>
                <FooterListItem>
                  <FooterText>📞 (41) 98454-9172</FooterText>
                </FooterListItem>
                <FooterListItem>
                  <FooterText>📍 Av. Luiz Boiteux Piazza - Florianópolis/SC</FooterText>
                </FooterListItem>
              </FooterList>
            </FooterColumn>
          </FooterGrid>

          <FooterBottom>
            <FooterBottomText>© {new Date().getFullYear()} Definamax. Todos os direitos reservados.</FooterBottomText>
            <FooterBottomSmall>Este produto não substitui o acompanhamento de profissionais de saúde.</FooterBottomSmall>
            <FooterBottomSmall>*Resultados podem variar de pessoa para pessoa.</FooterBottomSmall>
          </FooterBottom>
        </FooterContent>
      </Footer>
    </ThankYouContainer>
  );
};

export default ThankYouPage; 