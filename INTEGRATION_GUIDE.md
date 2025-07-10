# 🔄 Guia de Integração - Landing Page Definamax

## Como integrar esta landing page no seu site React existente

### **Método 1: Substituição da Homepage**

#### 1. **Copiar Componentes**
Copie estes arquivos para seu projeto `definamax`:

```bash
# Componentes principais
src/components/Hero.js
src/components/OfferSection.js
src/components/Results.js
src/components/FlexibilitySection.js
src/components/VideoSection.js
src/components/KitsSection.js
src/components/ExperimentSection.js
src/components/FAQ.js
src/components/Footer.js
```

#### 2. **Copiar Assets**
Copie todos os arquivos da pasta `public/`:
- `logo-definamax.png`
- `fundo.png`
- `kit-promo.png`
- `luana.png`, `dep01.png`, `dep03.png`
- `1frasco.png`, `2frascos.png`, `5frascos.png`
- `garantia-definamax.png`
- `cartoes.webp`
- `jeans.png`
- `fabricacao.mp4`

#### 3. **Criar Homepage Component**

Crie `src/pages/Homepage.js`:

```jsx
import React from 'react';
import Hero from '../components/Hero';
import OfferSection from '../components/OfferSection';
import Results from '../components/Results';
import FlexibilitySection from '../components/FlexibilitySection';
import VideoSection from '../components/VideoSection';
import KitsSection from '../components/KitsSection';
import ExperimentSection from '../components/ExperimentSection';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Homepage = () => {
  return (
    <div>
      <Hero />
      <OfferSection />
      <Results />
      <FlexibilitySection />
      <VideoSection />
      <KitsSection />
      <ExperimentSection />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Homepage;
```

#### 4. **Atualizar Rotas**

No seu `App.js` ou onde estão as rotas:

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
// ... outros imports

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* Suas outras rotas existentes */}
        <Route path="/produtos" element={<ProdutosPage />} />
        <Route path="/sobre" element={<SobrePage />} />
        {/* etc... */}
      </Routes>
    </Router>
  );
}
```

#### 5. **Instalar Dependências**

Se não tiver, instale:

```bash
npm install framer-motion styled-components
```

#### 6. **Atualizar index.html**

Substitua o conteúdo do `public/index.html` pelo nosso otimizado:
- Meta tags SEO
- Open Graph
- Schema markup
- Performance optimizations

### **Método 2: Manter Estrutura Existente**

Se quiser manter sua estrutura atual e só atualizar a homepage:

1. **Backup** da sua homepage atual
2. **Substitua** apenas o conteúdo da página principal
3. **Mantenha** header/navbar existente se necessário

### **Arquivos Importantes para SEO**

Copie também estes arquivos para melhor SEO:
- `public/robots.txt`
- `public/sitemap.xml`
- `public/site.webmanifest`
- `public/.htaccess`

### **Configurações Adicionais**

#### **VideoPlayer Component**
Se não tiver, crie `src/components/VideoPlayer.js`:

```jsx
import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    max-width: 400px;
  }
`;

const VideoElement = styled.video`
  width: 100%;
  height: auto;
  display: block;
`;

const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  background: transparent;
  border: 2px solid white;
  border-radius: 50%;
  color: white;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translate(-50%, -50%) scale(1.1);
  }
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0.1;
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <VideoContainer>
      <VideoElement
        ref={videoRef}
        preload="metadata"
        onClick={togglePlay}
        onLoadedData={() => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0.1;
          }
        }}
      >
        <source src="/fabricacao.mp4" type="video/mp4" />
      </VideoElement>
      
      {!isPlaying && (
        <PlayButton onClick={togglePlay}>
          ▶
        </PlayButton>
      )}
    </VideoContainer>
  );
};

export default VideoPlayer;
```

### **Checklist Final**

- [ ] Componentes copiados
- [ ] Imagens copiadas  
- [ ] Dependências instaladas
- [ ] Rotas atualizadas
- [ ] SEO files copiados
- [ ] VideoPlayer criado
- [ ] Homepage component criado
- [ ] Teste em desenvolvimento
- [ ] Build de produção

### **Comandos Úteis**

```bash
# Testar em desenvolvimento
npm start

# Build de produção  
npm run build

# Servir build localmente
npx serve -s build
```

---

💡 **Dica**: Faça backup do seu projeto antes de integrar!

📧 **Suporte**: Se precisar de ajuda, me avise qual método preferir! 