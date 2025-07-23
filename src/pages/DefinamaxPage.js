import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Hero from '../components/Hero';
import OfferSection from '../components/OfferSection';
import Results from '../components/Results';
import FlexibilitySection from '../components/FlexibilitySection';
import VideoSection from '../components/VideoSection';
import ExperimentSection from '../components/ExperimentSection';
import KitsSectionDefinamax from '../components/KitsSectionDefinamax';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';


const HomeContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

function DefinamaxPage() {
  return (
    <HomeContainer>
      <Helmet>
        <title>Track 2 - Definamax® - Emagrecedor Natural | Perca até 30kg em 5 Meses | Resultado Garantido</title>
      </Helmet>
      <Hero />
      <OfferSection />
      <Results />
      <FlexibilitySection />
      <VideoSection />
      <KitsSectionDefinamax />
      <ExperimentSection />
      <FAQ />
      <Footer />

    </HomeContainer>
  );
}

export default DefinamaxPage; 