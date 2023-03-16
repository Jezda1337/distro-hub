/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		cloudinary_logos: process.env.CLOUDINARY_LOGOS,
		base_api: process.env.BASE_API,
	},
}

module.exports = nextConfig
