/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-api-domain.com', // Ganti dengan domain API asli Anda jika memuat gambar dari luar
      },
    ],
  },
}

export default nextConfig
