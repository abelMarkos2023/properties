/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // or '5mb'
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: ''
      }
    ]
  }
};

export default nextConfig;
