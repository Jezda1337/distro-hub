import { NextApiRequest, NextApiResponse } from "next"

const cloudinary = require("cloudinary").v2

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const public_id = JSON.parse(req.body)
		cloudinary.uploader
			.destroy(public_id, { invalidate: true, resource_type: "image" })
			.then(({ result }: { result: string }) => {
				return res.status(200).json(result)
			})
	}
}
