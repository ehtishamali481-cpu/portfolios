/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['mongoose', 'bcryptjs', 'jsonwebtoken'],
};

module.exports = nextConfig;
