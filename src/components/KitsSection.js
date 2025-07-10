import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const KitsSectionContainer = styled.section`
  background: #f0f0f0;
  padding: 80px 20px 30px 20px;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 40px 15px 25px 15px;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 700;
  color: #1a4d2e;
  margin-bottom: 20px;
  line-height: 1.2;
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.1rem;
  font-weight: 400;
  color: #666;
  margin-bottom: 50px;
  text-align: center;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 40px;
  }
`;

const KitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  justify-items: center;
  align-items: stretch;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    gap: 10px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
    align-items: start;
  }
`;

const KitCard = styled(motion.div)`
  background: #1a4d2e;
  border-radius: 20px;
  padding: 25px 20px;
  color: white;
  position: relative;
  border: 4px solid white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  max-width: 360px;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  @media (max-width: 768px) {
    padding: 15px 12px;
    max-width: 380px;
    height: auto;
    border-radius: 15px;
  }
`;

const KitTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const KitTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 900;
  margin-bottom: 0;
  text-transform: uppercase;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const KitDays = styled.span`
  background: transparent;
  color: white;
  padding: 0;
  font-weight: 900;
  font-size: 1.2rem;
  margin: 0;
  display: inline-block;
  text-transform: uppercase;
  text-decoration: underline;
  text-decoration-color: #ffb932;
  text-underline-offset: 3px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const KitImage = styled.div`
  margin: 8px 0 15px 0;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  
  @media (max-width: 768px) {
    margin: 8px 0;
    height: 220px;
  }
`;

const ProductsCount = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  margin: 15px 0 10px 0;
  border-top: 2px solid rgba(255, 255, 255, 0.3);
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  padding: 10px 0;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 8px 0 6px 0;
    padding: 6px 0;
  }
`;

const PriceSection = styled.div`
  margin: 15px 0;
  
  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

const OldPrice = styled.div`
  font-size: 1.2rem;
  text-decoration: line-through;
  opacity: 0.7;
  margin-bottom: 10px;
`;

const MainPrice = styled.div`
  font-size: 2.2rem;
  font-weight: 900;
  margin-bottom: 5px;
  text-align: center;
  
  .installments {
    font-size: 1rem;
    font-weight: 400;
  }
  
  .big-price {
    background: #ffb932;
    color: #333;
    padding: 3px 8px;
    border-radius: 6px;
    display: inline-block;
    margin: 0 3px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 3px;
  }
`;

const CashPrice = styled.div`
  font-size: 1rem;
  margin-bottom: 15px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 10px;
  }
`;

const ProductsList = styled.div`
  text-align: left;
  margin: 15px 0;
  flex-grow: 1;
  
  .product-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    font-size: 0.9rem;
    
    &:before {
      content: '✓';
      background: #ffb932;
      color: #333;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      font-weight: 900;
      font-size: 0.8rem;
    }
  }
  
  @media (max-width: 768px) {
    margin: 8px 0;
    
    .product-item {
      margin-bottom: 5px;
      font-size: 0.85rem;
      
      &:before {
        width: 16px;
        height: 16px;
        margin-right: 8px;
        font-size: 0.7rem;
      }
    }
  }
`;

const CTASection = styled.div`
  margin-top: auto;
`;

const CTAButton = styled(motion.button)`
  background: #ffb932;
  color: #333;
  border: none;
  padding: 20px 40px;
  font-size: 1.3rem;
  font-weight: 900;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  width: 100%;
  margin-top: 15px;
  box-shadow: 0 0 8px rgba(255, 185, 50, 0.3);
  animation: pulse-glow 3s ease-in-out infinite alternate;
  
  @keyframes pulse-glow {
    from {
      box-shadow: 0 0 8px rgba(255, 185, 50, 0.3);
    }
    to {
      box-shadow: 0 0 12px rgba(255, 185, 50, 0.5);
    }
  }
  
  &:hover {
    background: #e6a429;
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(255, 185, 50, 0.6);
  }
  
  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 1rem;
    margin-top: 8px;
  }
`;

const FreteGratis = styled.div`
  text-align: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  margin-top: 12px;
  text-transform: uppercase;
  background: rgba(26, 77, 46, 0.1);
  padding: 5px 10px;
  border-radius: 5px;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-top: 8px;
    padding: 4px 8px;
  }
`;

const PaymentCards = styled.div`
  text-align: center;
  margin: 20px 0 10px 0;
  
  img {
    max-width: 100%;
    height: auto;
    max-width: 450px;
  }
  
  @media (max-width: 768px) {
    margin: 15px 0 8px 0;
    
    img {
      max-width: 280px;
    }
  }
`;

const KitsSection = () => {
  const kits = [
    {
      title: "TRATAMENTO PARA",
      days: "150 DIAS",
      oldPrice: "De R$879,00",
      mainPrice: "12x R$38,05",
      cashPrice: "ou R$379,00 à vista",
      products: [
        "05 frascos de Definamax",
        "2 frascos de colágeno para flacidez",
        "Envio prioritário"
      ],
      image: "/5frascos.png",
      link: "https://full.sale/ytA47b"
    },
    {
      title: "TRATAMENTO PARA",
      days: "90 DIAS",
      oldPrice: "De R$589,00",
      mainPrice: "12x R$35,04",
      cashPrice: "ou R$349,00 à vista",
      products: [
        "03 frascos de Definamax",
        "Envio imediato"
      ],
      image: "/2frascos.png",
      popular: true,
      link: "https://full.sale/DmNQj1"
    },
    {
      title: "TRATAMENTO PARA",
      days: "30 DIAS",
      oldPrice: "De R$289,00",
      mainPrice: "12x R$23,79",
      cashPrice: "ou R$237,00 à vista",
      products: [
        "01 frasco de Definamax",
        "Envio imediato"
      ],
      image: "/1frasco.png",
      link: "https://full.sale/eMbtHp"
    }
  ];

  return (
    <KitsSectionContainer id="kits">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          ESCOLHA SEU TRATAMENTO IDEAL
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Para melhores resultados recomendamos o tratamento mais vendido de 5 meses
        </SectionSubtitle>
        
        <KitsGrid>
          {kits.map((kit, index) => (
            <KitCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <KitTitleWrapper>
                <KitTitle>{kit.title}</KitTitle>
                <KitDays>{kit.days}</KitDays>
              </KitTitleWrapper>
              
              <KitImage>
                <img src={kit.image} alt={`Definamax Kit ${kit.days} - Tratamento de Emagrecimento Natural com ${kit.products[0].split(' ')[0]} frascos`} />
              </KitImage>
              
              <ProductsCount>
                {index === 0 ? '57% DE DESCONTO' : index === 1 ? '41% DE DESCONTO' : '18% DE DESCONTO'}
              </ProductsCount>
              
              <PriceSection>
                <OldPrice>{kit.oldPrice}</OldPrice>
                <MainPrice>
                  <span className="installments">12x </span>
                  <span className="big-price">{kit.mainPrice.replace('12x ', '')}</span>
                </MainPrice>
                <CashPrice>{kit.cashPrice}</CashPrice>
              </PriceSection>
              
              <ProductsList>
                {kit.products.map((product, idx) => (
                  <div key={idx} className="product-item">
                    {product}
                  </div>
                ))}
              </ProductsList>
              
              <CTASection>
                <CTAButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open(kit.link, '_blank')}
                >
                  Comprar Agora
                </CTAButton>
                <FreteGratis>FRETE GRÁTIS</FreteGratis>
              </CTASection>
            </KitCard>
          ))}
        </KitsGrid>
        
        <PaymentCards>
          <img src="/cartoes.webp" alt="Formas de Pagamento Aceitas - Visa, Mastercard, Pix, Boleto - Parcelamento em até 12x sem juros" />
        </PaymentCards>
      </Container>
    </KitsSectionContainer>
  );
};

export default KitsSection; 