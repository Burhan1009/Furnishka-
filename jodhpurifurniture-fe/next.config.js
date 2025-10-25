/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    
    ignoreDuringBuilds: true,
  },
  compiler: {
    emotion: true,
  },

};


module.exports = nextConfig;
