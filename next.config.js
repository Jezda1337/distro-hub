/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		cloudinary_logos: process.env.CLOUDINARY_LOGOS,
		base_api: process.env.BASE_API,
		DATABASE_URL: process.env.DATABASE_URL,
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		cloud_api_key: process.env.CLOUDINARY_API_KEY,
		cloud_api_secret: process.env.CLOUDINARY_API_SECRET,
	},

	images: {
		domains: [],
	},

	// async rewrites() {
	// 	return [
	// 		{
	// 			source: "/api/v1/:path*",
	// 			destination: "http://localhost:3000/:path*",
	// 		},
	// 	]
	// },
}

module.exports = nextConfig
