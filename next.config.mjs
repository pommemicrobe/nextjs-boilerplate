/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'pdfobject.com',
      },
      {
        protocol: 'https',
        hostname: 'file-examples.com',
      },
    ],
  },
};

export default nextConfig;
