/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações básicas para desenvolvimento
  reactStrictMode: true,
  poweredByHeader: false,
  
  // Compressão de imagens básica
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  
  // Redirects para SEO
  async redirects() {
    return [
      {
        source: '/landing-page-vencedora',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig 