/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['upload.wikimedia.org']
  },
  env: {
    API_TOKEN: process.env.API_TOKEN
  }
}

module.exports = nextConfig
