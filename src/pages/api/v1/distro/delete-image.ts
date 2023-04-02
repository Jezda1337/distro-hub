import { NextApiRequest, NextApiResponse } from "next"

const cloudinary = require("cloudinary").v2

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log(req.method)
	if (req.method === "POST") {
		const public_id = JSON.parse(req.body)
		cloudinary.uploader
			.destroy(public_id, { invalidate: true, resource_type: "image" })
			.then((result: any) => {
				console.log(result)
				return res.status(200).json(result)
			})
	}
}
