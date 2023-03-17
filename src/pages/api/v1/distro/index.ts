import { createDistro, getDistros } from "@/services/distro.service"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.setHeader("Access-Control-Allow-Origins", ["res.cloudinary.com"])
	if (req.method === "GET") {
		try {
			const distros = await getDistros()
			return res.status(200).json(distros)
		} catch (err) {
			console.error(err)
			throw new Error("Something is not right with db")
		}
	}

	if (req.method === "POST") {
		const distro = await createDistro({ distro: req.body })
		return res.status(200).json(distro)
	}
}
