/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.etsystatic.com',
      },
      // Add any other image domains you're using
      {
        protocol: 'https',
        hostname: '**.cloudinary.com', // if using Cloudinary
      },
    ],
  },
};

module.exports = nextConfig;