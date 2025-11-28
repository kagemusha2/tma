/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Output standalone pour AWS Amplify
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  
  // Optimisations de production
  ...(process.env.NODE_ENV === 'production' && {
    compress: true,
    poweredByHeader: false,
  }),
  
  // Headers de sécurité
  async headers() {
    if (process.env.NODE_ENV !== 'production') {
      return [];
    }
    
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Variables d'environnement publiques
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version || '0.1.0',
  },
}

module.exports = nextConfig
