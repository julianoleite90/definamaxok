import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  z-index: 999;
  background: ${props => props.scrolled ? 'rgba(26, 26, 26, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  transition: all 0.3s ease;
  padding: 15px 0;
  
  @media (max-width: 768px) {
    top: 80px;
  }
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--container-padding);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: white;
  letter-spacing: -1px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-weight: 500;
  color: white;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const CTAButton = styled(motion.button)`
  background: var(--gradient-primary);
  color: white;
  padding: 12px 24px;
  border-radius: var(--border-radius);
  font-weight: 600;
  box-shadow: var(--shadow-light);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
  }
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderContainer
      scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Nav>
        <Logo>DEFINAMAX</Logo>
        
        <NavLinks>
          <NavLink href="#benefits">Benefícios</NavLink>
          <NavLink href="#depoimentos">Depoimentos</NavLink>
          <NavLink href="#sobre">Sobre</NavLink>
        </NavLinks>
        
        <CTAButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('cta').scrollIntoView({ behavior: 'smooth' })}
        >
          Comprar Agora
        </CTAButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 