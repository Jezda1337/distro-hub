/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    cloudinary_logos: process.env.CLOUDINARY_LOGOS,
  },
};

module.exports = nextConfig;
