import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Definamax - Emagrecedor Natural Número 1 do Brasil',
    short_name: 'Definamax',
    description: 'Emagreça até 30kg de forma natural e segura com Definamax. Fibras bioativas que absorvem gordura, controlam compulsão e aceleram metabolismo.',
    start_url: '/landing-page-vencedora',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#15803d',
    icons: [
      {
        src: '/logo2.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo2.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
} 