import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

// Importar páginas
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import RemarketingPage from './pages/RemarketingPage';
import ThankYouPage from './pages/ThankYouPage';
import WarrantyTermsPage from './pages/WarrantyTermsPage';

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

function App() {
  return (
    <AppContainer>
      <Router>
        <Routes>
          {/* Página inicial - Landing Page */}
          <Route path="/" element={<HomePage />} />
          
          {/* Página de produto */}
          <Route path="/produto" element={<ProductPage />} />
          
          {/* Página de remarketing com vídeos */}
          <Route path="/remarketing" element={<RemarketingPage />} />
          
          {/* Página de agradecimento pós-compra */}
          <Route path="/obrigado" element={<ThankYouPage />} />
          
          {/* Página de termos de garantia */}
          <Route path="/termos" element={<WarrantyTermsPage />} />
          <Route path="/termos-garantia" element={<WarrantyTermsPage />} />
          
          {/* Redirecionar rotas não encontradas para homepage */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Router>
    </AppContainer>
  );
}

export default App; 