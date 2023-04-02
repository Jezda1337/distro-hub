const cloudinary = require("cloudinary").v2
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const cloudinaryConfig = cloudinary.config({
		cloud_name: process.env.cloud_name,
		api_key: process.env.cloud_api_key,
		api_secret: process.env.cloud_api_secret,
		secure: true,
	})

	if (req.method === "GET") {
		const timestamp = Math.round(new Date().getTime() / 1000)
		const signature = cloudinary.utils.api_sign_request(
			{
				timestamp: timestamp,
			},
			cloudinaryConfig.api_secret
		)
		return res.json({ timestamp, signature })
	}
}
