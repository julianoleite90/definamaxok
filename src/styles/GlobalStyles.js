import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    color: #333;
  }

  html {
    scroll-behavior: smooth;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    outline: none;
    cursor: pointer;
    font-family: inherit;
  }

  :root {
    --primary-color: #FF4500;
    --secondary-color: #E53E3E;
    --accent-color: #FF6B35;
    --text-dark: #2C3E50;
    --text-light: #7F8C8D;
    --white: #FFFFFF;
    --light-gray: #F8F9FA;
    --medium-gray: #E9ECEF;
    --dark-gray: #1A1A1A;
    --very-dark: #0A0A0A;
    
    --gradient-primary: linear-gradient(135deg, #FF4500 0%, #FF6B35 100%);
    --gradient-secondary: linear-gradient(135deg, #E53E3E 0%, #FF4500 100%);
    
    --shadow-light: 0 2px 10px rgba(0, 0, 0, 0.1);
    --shadow-medium: 0 4px 20px rgba(0, 0, 0, 0.15);
    --shadow-heavy: 0 8px 30px rgba(0, 0, 0, 0.2);
    
    --border-radius: 8px;
    --border-radius-large: 16px;
    
    --container-padding: 0 20px;
    --section-padding: 80px 0;
  }

  @media (max-width: 768px) {
    :root {
      --container-padding: 0 16px;
      --section-padding: 60px 0;
    }
  }
`;

export default GlobalStyles; 