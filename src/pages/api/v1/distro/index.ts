import { createDistro, getDistros } from "@/services/distro.service"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.setHeader("Access-Control-Allow-Origins", "*")
	res.setHeader("cors", "*")
	if (req.method === "GET") {
		try {
			const distros = await getDistros()
			console.log("---------")
			console.log(distros)
			console.log("---------")
			return res.status(200).json(distros)
		} catch (err) {
			console.error(err)
			throw new Error("Something is not right with db")
		}
	}

	if (req.method === "POST") {
		const { body } = req
		console.log(body)
		const distro = await createDistro(req.body)
		return res.status(200).json(distro)
	}
}
