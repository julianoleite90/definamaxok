import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaStar, FaLock, FaTruck, FaCheckCircle, FaChevronRight, FaWhatsapp, FaFileAlt, FaMobile, FaPlay, FaChevronDown, FaShoppingCart, FaArrowRight } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import Footer from '../components/Footer';

// Structured Data for Google Merchant
const structuredData = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Definamax - Kit 5 Meses (5 Frascos)",
  "image": [
    "https://definamaxoficial.com/kit-5-frascos.png",
    "https://definamaxoficial.com/definamax-frasco.png"
  ],
  "description": "Kit avançado com 5 frascos de Definamax para 5 meses de uso (300 cápsulas). Suplemento alimentar natural com fibras e ingredientes naturais para apoiar um estilo de vida saudável.",
  "sku": "DEFMAX-5M",
  "mpn": "DEFMAX-5M",
  "brand": {
    "@type": "Brand",
    "name": "Definamax"
  },
  "category": "Saúde > Suplementos > Suplementos Alimentares",
  "offers": {
    "@type": "Offer",
    "url": "https://definamaxoficial.com/produto",
    "priceCurrency": "BRL",
    "price": "379.00",
    "priceValidUntil": "2025-12-31",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Bourjun Nature Health"
    },
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingRate": {
        "@type": "MonetaryAmount",
        "value": "0",
        "currency": "BRL"
      },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "handlingTime": {
          "@type": "QuantitativeValue",
          "minValue": 1,
          "maxValue": 1,
          "unitCode": "DAY"
        },
        "transitTime": {
          "@type": "QuantitativeValue",
          "minValue": 3,
          "maxValue": 15,
          "unitCode": "DAY"
        }
      }
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "3842"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Joana"
      },
      "datePublished": "2025-04-15",
      "reviewBody": "Após meses usando Definamax, senti mais disposição e bem-estar no meu dia a dia. O suplemento me ajudou a manter uma rotina mais saudável!"
    }
  ],
  "gtin": "7898489348755",
  "weight": {
    "@type": "QuantitativeValue",
    "value": "500",
    "unitCode": "GRM"
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Conteúdo",
      "value": "300 cápsulas"
    },
    {
      "@type": "PropertyValue", 
      "name": "Sabor",
      "value": "Neutro"
    }
  ]
};


const ProductContainer = styled.div`
  min-height: 100vh;
  background: white;
`;

const Header = styled.header`
  background: linear-gradient(135deg, #1a4d2e 0%, #22c55e 50%, #16a34a 100%);
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  height: 3rem;
  width: auto;
`;

const CTAButton = styled.a`
  background: linear-gradient(135deg, #1a4d2e 0%, #22c55e 50%, #16a34a 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    background: linear-gradient(135deg, #15803d 0%, #16a34a 50%, #166534 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
`;

const Main = styled.main`
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Breadcrumb = styled.nav`
  margin-bottom: 2rem;
`;

const BreadcrumbList = styled.ol`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
`;

const BreadcrumbItem = styled.li`
  color: #6b7280;
  
  a {
    color: #6b7280;
    text-decoration: none;
    
    &:hover {
      color: #16a34a;
    }
  }
  
  &:last-child {
    color: #111827;
    font-weight: 500;
  }
  
  &:not(:last-child)::after {
    content: '';
    margin-left: 0.5rem;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin-bottom: 4rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ProductImages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MainImageContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  text-align: center;
`;

const MainImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  object-fit: contain;
`;

const ThumbnailContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

const ThumbnailButton = styled.button`
  background: white;
  border: 2px solid ${props => props.active ? '#22c55e' : '#e5e7eb'};
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #22c55e;
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 60px;
  object-fit: contain;
`;

const ThumbnailLabel = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: 0.5rem;
  color: #374151;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProductTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #111827;
  margin: 0;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StarRating = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const StarIcon = styled(FaStar)`
  color: #fbbf24;
  font-size: 1.125rem;
`;

const RatingText = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
`;

const ProductDescription = styled.p`
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const OriginalPrice = styled.span`
  font-size: 1.125rem;
  color: #6b7280;
  text-decoration: line-through;
`;

const DiscountBadge = styled.span`
  background: #dc2626;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
`;

const CurrentPrice = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #111827;
`;

const InstallmentInfo = styled.p`
  color: #16a34a;
  font-size: 0.875rem;
  margin: 0;
`;

const BenefitsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const BenefitIcon = styled.div`
  color: #16a34a;
  font-size: 1.125rem;
`;

const BenefitText = styled.span`
  color: #374151;
  font-size: 0.875rem;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BuyButton = styled.a`
  background: linear-gradient(135deg, #1a4d2e 0%, #22c55e 50%, #16a34a 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.125rem;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: linear-gradient(135deg, #15803d 0%, #16a34a 50%, #166534 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
  }
`;

const WhatsAppButton = styled.a`
  background: white;
  color: #16a34a;
  padding: 0.75rem 2rem;
  border: 2px solid #16a34a;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: #f0fdf4;
  }
`;

// Content Sections
const ContentSection = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 2rem;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const InfoCard = styled.div`
  background: #f0fdf4;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  border: 1px solid #bbf7d0;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #166534;
  margin-bottom: 1rem;
`;

const CardText = styled.p`
  color: #166534;
  line-height: 1.6;
  margin: 0;
`;

const BenefitsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
`;

const BenefitItemLarge = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const BenefitIconLarge = styled.div`
  color: #16a34a;
  font-size: 1.5rem;
  margin-top: 0.25rem;
`;

const BenefitContent = styled.div``;

const BenefitTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const BenefitDescription = styled.p`
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
`;

const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const IngredientCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 2rem;
`;

const IngredientTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
`;

const IngredientDescription = styled.p`
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
`;

const UsageSteps = styled.div`
  background: #f0fdf4;
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2rem;
`;

const StepsList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StepItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const StepNumber = styled.div`
  background: #16a34a;
  color: white;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
`;

const StepContent = styled.div``;

const StepTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #166534;
  margin-bottom: 0.5rem;
`;

const StepDescription = styled.p`
  color: #166534;
  line-height: 1.6;
  margin: 0;
`;

const SpecsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const SpecsRow = styled.tr`
  &:nth-child(even) {
    background: #f9fafb;
  }
`;

const SpecsLabel = styled.td`
  padding: 1rem;
  font-weight: 600;
  color: #111827;
  border-bottom: 1px solid #e5e7eb;
  width: 30%;
`;

const SpecsValue = styled.td`
  padding: 1rem;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
`;

const ShippingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ShippingCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const ShippingTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ShippingIcon = styled.div`
  color: #16a34a;
  font-size: 1.5rem;
`;

const ReviewsContainer = styled.div`
  margin-top: 2rem;
`;

const ReviewsHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const OverallRating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const RatingScore = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: #111827;
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ReviewCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 2rem;
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ReviewerAvatar = styled.div`
  width: 3rem;
  height: 3rem;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #6b7280;
`;

const ReviewerInfo = styled.div``;

const ReviewerName = styled.h4`
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
`;

const ReviewDate = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

const ReviewText = styled.p`
  color: #374151;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const VerifiedPurchase = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #16a34a;
`;

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto 0;
`;

const FAQItem = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 1.5rem;
  background: white;
  border: none;
  text-align: left;
  font-weight: 600;
  color: #111827;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.2s;

  &:hover {
    background: #f9fafb;
  }
`;

const FAQAnswer = styled.div`
  padding: 0 1.5rem 1.5rem;
  color: #6b7280;
  line-height: 1.6;
  display: ${props => props.open ? 'block' : 'none'};
`;

const ChevronIcon = styled(FaChevronDown)`
  transition: transform 0.2s;
  transform: ${props => props.open ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const ProductPage = () => {
  const [selectedKit, setSelectedKit] = useState('kit5');
  const [openFAQ, setOpenFAQ] = useState(null);

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

  // Atualiza a imagem quando o kit é alterado
  useEffect(() => {
    // setCurrentImage(kits[selectedKit].image); // This line is removed as per new_code
  }, [selectedKit]);

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

  // Função para abrir o WhatsApp
  const openWhatsApp = () => {
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre o Definamax.');
    window.open(`https://wa.me/5541984549172?text=${message}`, '_blank');
  };

  // Dados dos kits
  const kits = {
    kit1: {
      id: 'DEFMAX-1M',
      title: 'Definamax - Kit 1 Mês (1 Frasco)',
      description: 'Kit básico com 1 frasco de Definamax para 1 mês de uso (60 cápsulas). Suplemento alimentar natural com fibras e ingredientes naturais para apoiar um estilo de vida saudável.',
      regularPrice: 279.00,
      salePrice: 237.00,
      image: '/1frasco.png',
      bonus: [],
      freeShipping: true,
      shipping: 0,
      gtin: '7898489348748',
      mpn: 'DEFMAX-1M',
      weight: '100g'
    },
    kit3: {
      id: 'DEFMAX-3M',
      title: 'Definamax - Kit 3 Meses (3 Frascos)',
      description: 'Kit intermediário com 3 frascos de Definamax para 3 meses de uso (180 cápsulas). Suplemento alimentar natural com fibras e ingredientes naturais para apoiar um estilo de vida saudável.',
      regularPrice: 579.00,
      salePrice: 349.00,
      image: '/2frascos.png',
      bonus: [],
      freeShipping: true,
      shipping: 0,
      gtin: '7898489348751',
      mpn: 'DEFMAX-3M',
      weight: '300g'
    },
    kit5: {
      id: 'DEFMAX-5M',
      title: 'Definamax - Kit 5 Meses (5 Frascos)',
      description: 'Kit avançado com 5 frascos de Definamax para 5 meses de uso (300 cápsulas). Suplemento alimentar natural com fibras e ingredientes naturais para apoiar um estilo de vida saudável.',
      regularPrice: 879.00,
      salePrice: 379.00,
      image: '/5frascos.png',
      bonus: ['1 Frasco de Colágeno'],
      freeShipping: true,
      shipping: 0,
      gtin: '7898489348755',
      mpn: 'DEFMAX-5M',
      weight: '500g'
    },
    kit8: {
      id: 'DEFMAX-8M',
      title: 'Definamax - Kit 8 Meses (8 Frascos)',
      description: 'Kit completo com 8 frascos de Definamax para 8 meses de uso (480 cápsulas). Suplemento alimentar natural com fibras e ingredientes naturais para apoiar um estilo de vida saudável.',
      regularPrice: 1079.00,
      salePrice: 449.00,
      image: '/8frascos.png',
      bonus: ['2 Frascos de Colágeno'],
      freeShipping: true,
      shipping: 0,
      gtin: '7898489348762',
      mpn: 'DEFMAX-8M',
      weight: '800g'
    }
  };

  // Kit selecionado
  const kit = kits[selectedKit];
  const currentImage = kit.image;

  return (
    <ProductContainer>
      <Helmet>
        <title>{kit.title} - Suplemento Natural para Vida Saudável | Definamax</title>
        <meta name="description" content={kit.description} />
        <meta name="keywords" content="definamax, suplemento natural, fibras alimentares, vida saudável, emagrecimento natural, psyllium, espirulina, colágeno" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={kit.title} />
        <meta property="og:description" content={kit.description} />
        <meta property="og:image" content={`https://definamaxoficial.com${kit.image}`} />
        <meta property="og:url" content="https://definamaxoficial.com/produto" />
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="Definamax Oficial" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={kit.title} />
        <meta name="twitter:description" content={kit.description} />
        <meta name="twitter:image" content={`https://definamaxoficial.com${kit.image}`} />
        
        {/* Product Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": kit.title,
            "image": `https://definamaxoficial.com${kit.image}`,
            "description": kit.description,
            "sku": kit.id,
            "mpn": kit.mpn,
            "brand": {
              "@type": "Brand",
              "name": "Definamax"
            },
            "category": "Saúde > Suplementos > Suplementos Alimentares",
            "offers": {
              "@type": "Offer",
              "url": "https://definamaxoficial.com/produto",
              "priceCurrency": "BRL",
              "price": kit.salePrice.toFixed(2),
              "priceValidUntil": "2025-12-31",
              "itemCondition": "https://schema.org/NewCondition",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": "Bourjun Nature Health"
              },
              "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                  "@type": "MonetaryAmount",
                  "value": "0",
                  "currency": "BRL"
                },
                "deliveryTime": {
                  "@type": "ShippingDeliveryTime",
                  "handlingTime": {
                    "@type": "QuantitativeValue",
                    "minValue": 1,
                    "maxValue": 1,
                    "unitCode": "DAY"
                  },
                  "transitTime": {
                    "@type": "QuantitativeValue",
                    "minValue": 3,
                    "maxValue": 15,
                    "unitCode": "DAY"
                  }
                }
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "3842"
            },
            "review": [
              {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "author": {
                  "@type": "Person",
                  "name": "Joana"
                },
                "datePublished": "2025-04-15",
                "reviewBody": "Após meses usando Definamax, senti mais disposição e bem-estar no meu dia a dia. O suplemento me ajudou a manter uma rotina mais saudável!"
              }
            ],
            "gtin": "7898489348755",
            "weight": {
              "@type": "QuantitativeValue",
              "value": kit.weight.replace('g', ''),
              "unitCode": "GRM"
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Conteúdo",
                "value": "300 cápsulas"
              },
              {
                "@type": "PropertyValue", 
                "name": "Sabor",
                "value": "Neutro"
              }
            ]
          })}
        </script>
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Início",
                "item": "https://definamaxoficial.com"
              },
              {
                "@type": "ListItem", 
                "position": 2,
                "name": "Suplementos",
                "item": "https://definamaxoficial.com/suplementos"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Kit 5 Meses",
                "item": "https://definamaxoficial.com/produto"
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Header */}
      <Header>
        <HeaderContent>
          <a href="/">
            <Logo src="/logo-definamax.png" alt="Definamax - Suplemento Natural" />
          </a>
          <CTAButton href={addUtmToUrl('https://full.sale/ytA47b')}>
            Comprar Agora
          </CTAButton>
        </HeaderContent>
      </Header>

      <Main>
        <Container>
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList itemScope itemType="https://schema.org/BreadcrumbList">
              <BreadcrumbItem itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <a href="/" itemProp="item">
                  <span itemProp="name">Início</span>
                </a>
                <meta itemProp="position" content="1" />
              </BreadcrumbItem>
              <FaChevronRight style={{ fontSize: '0.75rem', color: '#9ca3af' }} />
              <BreadcrumbItem itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <a href="/suplementos" itemProp="item">
                  <span itemProp="name">Suplementos</span>
                </a>
                <meta itemProp="position" content="2" />
              </BreadcrumbItem>
              <FaChevronRight style={{ fontSize: '0.75rem', color: '#9ca3af' }} />
              <BreadcrumbItem itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name">Kit 5 Meses</span>
                <meta itemProp="position" content="3" />
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <ProductGrid>
            {/* Product Images */}
            <ProductImages>
              <MainImageContainer>
                <MainImage src={currentImage} alt={kit.title} />
                {kit.bonus.length > 0 && (
                  <div style={{ 
                    marginTop: '1rem', 
                    background: '#f0fdf4', 
                    padding: '1rem', 
                    borderRadius: '8px',
                    textAlign: 'center',
                    color: '#166534',
                    fontWeight: '500'
                  }}>
                    5 Frascos Definamax + 1 Frasco de Colágeno
                  </div>
                )}
              </MainImageContainer>

              {/* Thumbnails */}
              <ThumbnailContainer>
                <div>
                  <ThumbnailButton
                    active={selectedKit === 'kit1'}
                    onClick={() => setSelectedKit('kit1')}
                  >
                    <ThumbnailImage src="/1frasco.png" alt="Kit 1 Mês" />
                  </ThumbnailButton>
                  <ThumbnailLabel>1 Frasco</ThumbnailLabel>
                </div>

                <div>
                  <ThumbnailButton
                    active={selectedKit === 'kit3'}
                    onClick={() => setSelectedKit('kit3')}
                  >
                    <ThumbnailImage src="/2frascos.png" alt="Kit 3 Meses" />
                  </ThumbnailButton>
                  <ThumbnailLabel>3 Frascos</ThumbnailLabel>
                </div>

                <div>
                  <ThumbnailButton
                    active={selectedKit === 'kit5'}
                    onClick={() => setSelectedKit('kit5')}
                  >
                    <ThumbnailImage src="/5frascos.png" alt="Kit 5 Meses" />
                  </ThumbnailButton>
                  <ThumbnailLabel>5 Frascos</ThumbnailLabel>
                </div>

                <div>
                  <ThumbnailButton
                    active={selectedKit === 'kit8'}
                    onClick={() => setSelectedKit('kit8')}
                  >
                    <ThumbnailImage src="/8frascos.png" alt="Kit 8 Meses" />
                  </ThumbnailButton>
                  <ThumbnailLabel>8 Frascos</ThumbnailLabel>
                </div>
              </ThumbnailContainer>
            </ProductImages>

            {/* Product Info */}
            <ProductInfo>
              <ProductTitle>{kit.title}</ProductTitle>
              
              <RatingContainer>
                <StarRating>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} />
                  ))}
                </StarRating>
                <RatingText>(3.842 avaliações)</RatingText>
              </RatingContainer>

              <ProductDescription>{kit.description}</ProductDescription>

              <PriceContainer>
                <PriceRow>
                  <OriginalPrice>R$ {kit.regularPrice.toFixed(2)}</OriginalPrice>
                  <DiscountBadge>
                    {Math.round((kit.regularPrice - kit.salePrice) / kit.regularPrice * 100)}% OFF
                  </DiscountBadge>
                </PriceRow>
                <CurrentPrice>
                  R$ {kit.salePrice.toFixed(2)}
                </CurrentPrice>
                <InstallmentInfo>
                  em até 12x de R$ {(kit.salePrice / 12).toFixed(2)} sem juros
                </InstallmentInfo>
              </PriceContainer>

              <BenefitsContainer>
                <BenefitItem>
                  <BenefitIcon>
                    <FaLock />
                  </BenefitIcon>
                  <BenefitText>Garantia de 30 dias ou seu dinheiro de volta</BenefitText>
                </BenefitItem>
                <BenefitItem>
                  <BenefitIcon>
                    <FaTruck />
                  </BenefitIcon>
                  <BenefitText>Frete Grátis</BenefitText>
                </BenefitItem>
                <BenefitItem>
                  <BenefitIcon>
                    <FaCheckCircle />
                  </BenefitIcon>
                  <BenefitText>Em estoque - Envio em 24h</BenefitText>
                </BenefitItem>
              </BenefitsContainer>

              <ActionButtons>
                <BuyButton href={addUtmToUrl('https://full.sale/ytA47b')}>
                  <FaShoppingCart /> Comprar Agora <FaArrowRight />
                </BuyButton>

                <WhatsAppButton onClick={openWhatsApp}>
                  <FaWhatsapp /> Tirar Dúvidas
                </WhatsAppButton>
              </ActionButtons>
            </ProductInfo>
          </ProductGrid>

          {/* Content Sections */}
          <ContentSection>
            <SectionTitle>DESCUBRA O PODER DAS FIBRAS QUE ABSORVEM GORDURA! ✨</SectionTitle>
            <ProductDescription style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '1.125rem' }}>
              <strong>ATENÇÃO:</strong> A fórmula DEFINAMAX contém fibras bioativas exclusivas que agem como uma ESPONJA no seu organismo, absorvendo gorduras e açúcares ANTES que sejam transformados em peso extra! Este é o SEGREDO por trás de mais de 45 MIL TRANSFORMAÇÕES reais!
            </ProductDescription>
            <CardsGrid>
              <InfoCard>
                <CardTitle>QUEIMA GORDURA 24H</CardTitle>
                <CardText>Acelera seu metabolismo MESMO enquanto você dorme! As fibras trabalham o tempo todo para eliminar o excesso de peso.</CardText>
              </InfoCard>
              <InfoCard>
                <CardTitle>ELIMINA A COMPULSÃO ALIMENTAR</CardTitle>
                <CardText>ACABA com a vontade descontrolada de comer doces e carboidratos! Você finalmente terá o controle sobre sua alimentação.</CardText>
              </InfoCard>
              <InfoCard>
                <CardTitle>RESULTADOS EM 7 DIAS OU DINHEIRO DE VOLTA!</CardTitle>
                <CardText>Sinta a diferença logo na primeira semana ou DEVOLVEMOS 100% do seu dinheiro! Esta é nossa garantia de eficácia!</CardText>
              </InfoCard>
            </CardsGrid>
          </ContentSection>

          <ContentSection>
            <SectionTitle>POR QUE MAIS DE 45 MIL PESSOAS ESCOLHERAM DEFINAMAX?</SectionTitle>
            <BenefitsList>
              <BenefitItemLarge>
                <BenefitIconLarge>
                  <FaCheckCircle />
                </BenefitIconLarge>
                <BenefitContent>
                  <BenefitTitle>ACELERA O EMAGRECIMENTO EM ATÉ 5X:</BenefitTitle>
                  <BenefitDescription>As fibras bioativas absorvem gorduras e açúcares ANTES de virarem peso! Resultados até 5x mais rápidos que dietas convencionais!</BenefitDescription>
                </BenefitContent>
              </BenefitItemLarge>
              <BenefitItemLarge>
                <BenefitIconLarge>
                  <FaCheckCircle />
                </BenefitIconLarge>
                <BenefitContent>
                  <BenefitTitle>ELIMINA A FOME DESCONTROLADA:</BenefitTitle>
                  <BenefitDescription>NUNCA MAIS passe vontade! Controle total sobre a compulsão alimentar e ataques de fome.</BenefitDescription>
                </BenefitContent>
              </BenefitItemLarge>
              <BenefitItemLarge>
                <BenefitIconLarge>
                  <FaCheckCircle />
                </BenefitIconLarge>
                <BenefitContent>
                  <BenefitTitle>TRANSFORMA SEU METABOLISMO:</BenefitTitle>
                  <BenefitDescription>Seu corpo vira uma MÁQUINA de queimar gordura 24 horas por dia, MESMO dormindo!</BenefitDescription>
                </BenefitContent>
              </BenefitItemLarge>
              <BenefitItemLarge>
                <BenefitIconLarge>
                  <FaCheckCircle />
                </BenefitIconLarge>
                <BenefitContent>
                  <BenefitTitle>ENERGIA EXPLOSIVA O DIA TODO:</BenefitTitle>
                  <BenefitDescription>Acorde com DISPOSIÇÃO e mantenha a energia em alta o dia inteiro! Sem cansaço, sem preguiça!</BenefitDescription>
                </BenefitContent>
              </BenefitItemLarge>
              <BenefitItemLarge>
                <BenefitIconLarge>
                  <FaCheckCircle />
                </BenefitIconLarge>
                <BenefitContent>
                  <BenefitTitle>100% NATURAL E APROVADO PELA ANVISA:</BenefitTitle>
                  <BenefitDescription>Fórmula SEGURA, sem efeitos colaterais! Mais de 45 mil pessoas já comprovaram a eficácia!</BenefitDescription>
                </BenefitContent>
              </BenefitItemLarge>
            </BenefitsList>
          </ContentSection>

          <ContentSection>
            <SectionTitle>OS 6 INGREDIENTES QUEIMA-GORDURA MAIS PODEROSOS DO MUNDO!</SectionTitle>
            <ProductDescription style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <strong>FÓRMULA EXCLUSIVA:</strong> Cada ingrediente foi cientificamente selecionado para MAXIMIZAR a queima de gordura e ACELERAR seus resultados!
            </ProductDescription>
            <IngredientsGrid>
              <IngredientCard>
                <IngredientTitle>Quitosana - O "ÍMÃN" DE GORDURA</IngredientTitle>
                <IngredientDescription>REVOLUCIONÁRIO! Atrai e ELIMINA até 8x seu peso em gordura do seu organismo! É como ter um aspirador de gordura trabalhando 24h no seu corpo!</IngredientDescription>
              </IngredientCard>
              <IngredientCard>
                <IngredientTitle>Psyllium - CONTROLE TOTAL DA FOME</IngredientTitle>
                <IngredientDescription>ACABA com a fome descontrolada! Forma um "gel" no estômago que te deixa saciado por HORAS! Nunca mais sofra com compulsão alimentar!</IngredientDescription>
              </IngredientCard>
              <IngredientCard>
                <IngredientTitle>Espirulina - ENERGIA EXPLOSIVA</IngredientTitle>
                <IngredientDescription>TURBINA seu metabolismo e energia! Rico em proteínas e nutrientes, acelera a queima de gordura e te dá energia para o dia todo!</IngredientDescription>
              </IngredientCard>
              <IngredientCard>
                <IngredientTitle>Cromo - BLOQUEIA O AÇÚCAR</IngredientTitle>
                <IngredientDescription>IMPEDE que açúcares virem gordura! Controla a glicemia e força seu corpo a usar gordura estocada como energia!</IngredientDescription>
              </IngredientCard>
              <IngredientCard>
                <IngredientTitle>Agar Agar - BARREIRA ANTI-GORDURA</IngredientTitle>
                <IngredientDescription>Cria uma BARREIRA natural no intestino que BLOQUEIA a absorção de gorduras e carboidratos! É como ter um escudo contra o ganho de peso!</IngredientDescription>
              </IngredientCard>
              <IngredientCard>
                <IngredientTitle>Colágeno - PELE FIRME E JOVEM</IngredientTitle>
                <IngredientDescription>Enquanto você emagrece, sua pele fica FIRME e JOVEM! Evita flacidez e rugas, mantendo você linda por dentro e por fora!</IngredientDescription>
              </IngredientCard>
            </IngredientsGrid>
          </ContentSection>

          <ContentSection>
            <SectionTitle>O PROTOCOLO QUEIMA-GORDURA DE 3 PASSOS!</SectionTitle>
            <UsageSteps>
              <StepsList>
                <StepItem>
                  <StepNumber>1</StepNumber>
                  <StepContent>
                    <StepTitle>TOME 2 CÁPSULAS ANTES DA REFEIÇÃO PRINCIPAL</StepTitle>
                    <StepDescription>ATIVE o modo queima-gordura! Tome 30 minutos antes do almoço ou jantar para BLOQUEAR a absorção de gorduras e carboidratos!</StepDescription>
                  </StepContent>
                </StepItem>
                <StepItem>
                  <StepNumber>2</StepNumber>
                  <StepContent>
                    <StepTitle>BEBA 300ML DE ÁGUA PARA TURBINAR O EFEITO</StepTitle>
                    <StepDescription>A água ATIVA as fibras queima-gordura! Quanto mais água, MAIS PODEROSO fica o efeito absorvedor de gordura!</StepDescription>
                  </StepContent>
                </StepItem>
                <StepItem>
                  <StepNumber>3</StepNumber>
                  <StepContent>
                    <StepTitle>USE POR 90 DIAS PARA TRANSFORMAÇÃO COMPLETA</StepTitle>
                    <StepDescription>Em 30 dias: PRIMEIROS RESULTADOS | 60 dias: TRANSFORMAÇÃO VISÍVEL | 90 dias: CORPO DOS SONHOS! Não pare antes dos 90 dias!</StepDescription>
                  </StepContent>
                </StepItem>
              </StepsList>
            </UsageSteps>
          </ContentSection>

          <ContentSection>
            <SectionTitle>Especificações do Produto</SectionTitle>
            <SpecsTable>
              <tbody>
                <SpecsRow>
                  <SpecsLabel>Marca</SpecsLabel>
                  <SpecsValue>Definamax</SpecsValue>
                </SpecsRow>
                <SpecsRow>
                  <SpecsLabel>GTIN/EAN</SpecsLabel>
                  <SpecsValue>{kit.gtin}</SpecsValue>
                </SpecsRow>
                <SpecsRow>
                  <SpecsLabel>MPN</SpecsLabel>
                  <SpecsValue>{kit.mpn}</SpecsValue>
                </SpecsRow>
                <SpecsRow>
                  <SpecsLabel>Categoria</SpecsLabel>
                  <SpecsValue>Saúde &gt; Suplementos &gt; Suplementos Alimentares</SpecsValue>
                </SpecsRow>
                <SpecsRow>
                  <SpecsLabel>Conteúdo</SpecsLabel>
                  <SpecsValue>300 cápsulas</SpecsValue>
                </SpecsRow>
                <SpecsRow>
                  <SpecsLabel>Peso</SpecsLabel>
                  <SpecsValue>500g</SpecsValue>
                </SpecsRow>
                <SpecsRow>
                  <SpecsLabel>Condição</SpecsLabel>
                  <SpecsValue>Novo</SpecsValue>
                </SpecsRow>
              </tbody>
            </SpecsTable>
          </ContentSection>

          <ContentSection>
            <SectionTitle>Envio e Garantia</SectionTitle>
            <ShippingGrid>
              <ShippingCard>
                <ShippingTitle>
                  <ShippingIcon>
                    <FaTruck />
                  </ShippingIcon>
                  Informações de Envio
                </ShippingTitle>
                <BenefitsList>
                  <BenefitItemLarge>
                    <BenefitIconLarge>
                      <FaCheckCircle />
                    </BenefitIconLarge>
                    <BenefitContent>
                      <BenefitTitle>Prazo de envio</BenefitTitle>
                      <BenefitDescription>Enviamos em até 1 dia útil após a confirmação do pagamento</BenefitDescription>
                    </BenefitContent>
                  </BenefitItemLarge>
                  <BenefitItemLarge>
                    <BenefitIconLarge>
                      <FaCheckCircle />
                    </BenefitIconLarge>
                    <BenefitContent>
                      <BenefitTitle>Prazo de entrega</BenefitTitle>
                      <BenefitDescription>
                        Capitais: 3-7 dias úteis<br/>
                        Interior: 5-12 dias úteis<br/>
                        Norte/Nordeste: 7-15 dias úteis
                      </BenefitDescription>
                    </BenefitContent>
                  </BenefitItemLarge>
                  <BenefitItemLarge>
                    <BenefitIconLarge>
                      <FaCheckCircle />
                    </BenefitIconLarge>
                    <BenefitContent>
                      <BenefitTitle>Frete</BenefitTitle>
                      <BenefitDescription>Grátis para todo o Brasil neste kit</BenefitDescription>
                    </BenefitContent>
                  </BenefitItemLarge>
                  <BenefitItemLarge>
                    <BenefitIconLarge>
                      <FaCheckCircle />
                    </BenefitIconLarge>
                    <BenefitContent>
                      <BenefitTitle>Rastreamento</BenefitTitle>
                      <BenefitDescription>Você receberá um código de rastreio por e-mail assim que seu pedido for enviado</BenefitDescription>
                    </BenefitContent>
                  </BenefitItemLarge>
                  <BenefitItemLarge>
                    <BenefitIconLarge>
                      <FaCheckCircle />
                    </BenefitIconLarge>
                    <BenefitContent>
                      <BenefitTitle>Embalagem</BenefitTitle>
                      <BenefitDescription>Enviamos em embalagem discreta, sem identificação do conteúdo, garantindo sua privacidade</BenefitDescription>
                    </BenefitContent>
                  </BenefitItemLarge>
                </BenefitsList>
              </ShippingCard>

              <ShippingCard>
                <ShippingTitle>
                  <ShippingIcon>
                    <FaLock />
                  </ShippingIcon>
                  Garantia e Devolução
                </ShippingTitle>
                <BenefitsList>
                  <BenefitItemLarge>
                    <BenefitIconLarge>
                      <FaCheckCircle />
                    </BenefitIconLarge>
                    <BenefitContent>
                      <BenefitTitle>Garantia de 30 dias</BenefitTitle>
                      <BenefitDescription>Se você não estiver satisfeito com o produto, devolvemos 100% do seu dinheiro</BenefitDescription>
                    </BenefitContent>
                  </BenefitItemLarge>
                  <BenefitItemLarge>
                    <BenefitIconLarge>
                      <FaCheckCircle />
                    </BenefitIconLarge>
                    <BenefitContent>
                      <BenefitTitle>Como solicitar reembolso</BenefitTitle>
                      <BenefitDescription>Entre em contato com nosso suporte através do WhatsApp (41) 98454-9172 ou e-mail suporte@definamaxoficial.com</BenefitDescription>
                    </BenefitContent>
                  </BenefitItemLarge>
                  <BenefitItemLarge>
                    <BenefitIconLarge>
                      <FaCheckCircle />
                    </BenefitIconLarge>
                    <BenefitContent>
                      <BenefitTitle>Prazo para devolução</BenefitTitle>
                      <BenefitDescription>Você tem até 30 dias após o recebimento do produto para solicitar o reembolso</BenefitDescription>
                    </BenefitContent>
                  </BenefitItemLarge>
                  <BenefitItemLarge>
                    <BenefitIconLarge>
                      <FaCheckCircle />
                    </BenefitIconLarge>
                    <BenefitContent>
                      <BenefitTitle>Processo de reembolso</BenefitTitle>
                      <BenefitDescription>O reembolso é processado em até 7 dias úteis após a aprovação da solicitação</BenefitDescription>
                    </BenefitContent>
                  </BenefitItemLarge>
                  <BenefitItemLarge>
                    <BenefitIconLarge>
                      <FaCheckCircle />
                    </BenefitIconLarge>
                    <BenefitContent>
                      <BenefitTitle>Garantia de qualidade</BenefitTitle>
                      <BenefitDescription>Todos os produtos passam por rigorosos testes de qualidade antes de serem enviados</BenefitDescription>
                    </BenefitContent>
                  </BenefitItemLarge>
                </BenefitsList>
              </ShippingCard>
            </ShippingGrid>
          </ContentSection>

          <ContentSection>
            <SectionTitle>VEJA O QUE DIZEM AS 45 MIL PESSOAS QUE JÁ SE TRANSFORMARAM!</SectionTitle>
            <ReviewsContainer>
              <ReviewsHeader>
                <OverallRating>
                  <StarRating>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} />
                    ))}
                  </StarRating>
                  <RatingScore>4.9/5</RatingScore>
                  <RatingText>Baseado em 3.842 avaliações verificadas</RatingText>
                </OverallRating>
              </ReviewsHeader>
              <ReviewsGrid>
                <ReviewCard>
                  <ReviewHeader>
                    <ReviewerAvatar>J</ReviewerAvatar>
                    <ReviewerInfo>
                      <ReviewerName>Joana</ReviewerName>
                      <StarRating>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon key={star} style={{ fontSize: '0.875rem' }} />
                        ))}
                      </StarRating>
                      <ReviewDate>15/04/2025</ReviewDate>
                    </ReviewerInfo>
                  </ReviewHeader>
                  <ReviewText>
                    "INACREDITÁVEL! Em 45 dias perdi 12 kg e nunca mais tive compulsão por doces! O Definamax MUDOU minha vida completamente! Minha autoestima voltou e me sinto uma mulher nova!"
                  </ReviewText>
                  <VerifiedPurchase>
                    <FaCheckCircle />
                    Compra verificada • Kit 6 Meses
                  </VerifiedPurchase>
                </ReviewCard>
                <ReviewCard>
                  <ReviewHeader>
                    <ReviewerAvatar>B</ReviewerAvatar>
                    <ReviewerInfo>
                      <ReviewerName>Brenda S.</ReviewerName>
                      <StarRating>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon key={star} style={{ fontSize: '0.875rem' }} />
                        ))}
                      </StarRating>
                      <ReviewDate>02/03/2025</ReviewDate>
                    </ReviewerInfo>
                  </ReviewHeader>
                  <ReviewText>
                    "ELIMINEI 18 kg em 3 meses sem dieta! Minha barriga sumiu, a celulite diminuiu muito e tenho energia para acompanhar meus filhos. MELHOR investimento da minha vida!"
                  </ReviewText>
                  <VerifiedPurchase>
                    <FaCheckCircle />
                    Compra verificada • Kit 3 Meses
                  </VerifiedPurchase>
                </ReviewCard>
                <ReviewCard>
                  <ReviewHeader>
                    <ReviewerAvatar>M</ReviewerAvatar>
                    <ReviewerInfo>
                      <ReviewerName>Marcos A.</ReviewerName>
                      <StarRating>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon key={star} style={{ fontSize: '0.875rem' }} />
                        ))}
                      </StarRating>
                      <ReviewDate>18/02/2025</ReviewDate>
                    </ReviewerInfo>
                  </ReviewHeader>
                  <ReviewText>
                    "Perdi 25 kg em 4 meses! Minha esposa não para de me elogiar e recuperei minha confiança. Definamax é REVOLUCIONÁRIO - funciona MESMO sem academia!"
                  </ReviewText>
                  <VerifiedPurchase>
                    <FaCheckCircle />
                    Compra verificada • Kit 6 Meses
                  </VerifiedPurchase>
                </ReviewCard>
              </ReviewsGrid>
            </ReviewsContainer>
          </ContentSection>

          <ContentSection>
            <SectionTitle>Perguntas Frequentes</SectionTitle>
            <FAQContainer>
              <FAQItem>
                <FAQQuestion onClick={() => setOpenFAQ(openFAQ === 'q1' ? null : 'q1')}>
                  <span>Por que o Definamax é TÃO EFICAZ?</span>
                  <ChevronIcon open={openFAQ === 'q1'} />
                </FAQQuestion>
                <FAQAnswer open={openFAQ === 'q1'}>
                  Definamax contém uma fórmula EXCLUSIVA com 6 ingredientes queima-gordura que agem como uma ESPONJA no seu organismo! As fibras bioativas absorvem gorduras e açúcares ANTES que virem peso extra. É por isso que mais de 45 MIL pessoas já se transformaram - os resultados são GARANTIDOS!
                </FAQAnswer>
              </FAQItem>
              <FAQItem>
                <FAQQuestion onClick={() => setOpenFAQ(openFAQ === 'q2' ? null : 'q2')}>
                  <span>Como devo tomar o Definamax?</span>
                  <ChevronIcon open={openFAQ === 'q2'} />
                </FAQQuestion>
                <FAQAnswer open={openFAQ === 'q2'}>
                  Recomendamos tomar 2 cápsulas por dia, preferencialmente 30 minutos antes da sua refeição principal (almoço ou jantar), com um copo cheio de água (200-300ml). A água é essencial para o funcionamento adequado das fibras.
                </FAQAnswer>
              </FAQItem>
              <FAQItem>
                <FAQQuestion onClick={() => setOpenFAQ(openFAQ === 'q3' ? null : 'q3')}>
                  <span>O Definamax tem efeitos colaterais?</span>
                  <ChevronIcon open={openFAQ === 'q3'} />
                </FAQQuestion>
                <FAQAnswer open={openFAQ === 'q3'}>
                  O Definamax é composto por ingredientes naturais e é geralmente bem tolerado. No entanto, como qualquer suplemento, recomendamos consultar um profissional de saúde antes de iniciar o uso, especialmente se você tiver alguma condição médica específica.
                </FAQAnswer>
              </FAQItem>
              <FAQItem>
                <FAQQuestion onClick={() => setOpenFAQ(openFAQ === 'q4' ? null : 'q4')}>
                  <span>Em quanto tempo vou ver RESULTADOS REAIS?</span>
                  <ChevronIcon open={openFAQ === 'q4'} />
                </FAQQuestion>
                <FAQAnswer open={openFAQ === 'q4'}>
                  PREPARE-SE para se surpreender! 7 DIAS: Menos inchaço e mais disposição | 30 DIAS: Roupas folgando e barriga diminuindo | 60 DIAS: Transformação VISÍVEL que todo mundo vai notar | 90 DIAS: Corpo dos seus SONHOS! Muitos clientes perdem até 15kg nos primeiros 60 dias!
                </FAQAnswer>
              </FAQItem>
              <FAQItem>
                <FAQQuestion onClick={() => setOpenFAQ(openFAQ === 'q5' ? null : 'q5')}>
                  <span>O produto tem garantia?</span>
                  <ChevronIcon open={openFAQ === 'q5'} />
                </FAQQuestion>
                <FAQAnswer open={openFAQ === 'q5'}>
                  Sim! Oferecemos uma garantia de 30 dias. Se você não estiver satisfeito com o produto, devolvemos 100% do seu dinheiro. Entre em contato conosco através do WhatsApp (41) 98454-9172 ou e-mail suporte@definamaxoficial.com para solicitar o reembolso.
                </FAQAnswer>
              </FAQItem>
            </FAQContainer>
          </ContentSection>
        </Container>
      </Main>
      <Footer />
    </ProductContainer>
  );
};

export default ProductPage; 