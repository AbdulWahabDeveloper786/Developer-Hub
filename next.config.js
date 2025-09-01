/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    // optimizeCss: true, // Commented out for Vercel compatibility
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // Bundle analyzer (uncomment to analyze bundle)
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       fs: false,
  //     };
  //   }
  //   return config;
  // },
  
  // Performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Output configuration removed for Vercel compatibility
  // output: 'standalone', // Only needed for Docker deployments
};

module.exports = nextConfig;