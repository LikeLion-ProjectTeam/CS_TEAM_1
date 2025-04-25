/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/search/:path*',
        destination: 'http://localhost:8000/api/search/:path*', // Proxy to Django
      },
    ]
  },
}

module.exports = nextConfig
