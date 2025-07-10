import React from 'react';
import styled from 'styled-components';
import Hero from '../components/Hero';
import OfferSection from '../components/OfferSection';
import Results from '../components/Results';
import FlexibilitySection from '../components/FlexibilitySection';
import VideoSection from '../components/VideoSection';
import ExperimentSection from '../components/ExperimentSection';
import KitsSection from '../components/KitsSection';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';


const HomeContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

function HomePage() {
  return (
    <HomeContainer>
      <Hero />
      <OfferSection />
      <Results />
      <FlexibilitySection />
      <VideoSection />
      <KitsSection />
      <ExperimentSection />
      <FAQ />
      <Footer />

    </HomeContainer>
  );
}

export default HomePage; 