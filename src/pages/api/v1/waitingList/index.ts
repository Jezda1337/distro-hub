import { addToWaitingList, getWaitingDistros } from "@/services/distro.service"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		try {
			const waitingDistros = await getWaitingDistros()
			return res.status(200).json(waitingDistros)
		} catch (error) {
			throw new Error("Something is wrong in GET request.")
		}
	}

	if (req.method === "POST") {
		console.log(JSON.parse(req.body))
		try {
			const newDistro = await addToWaitingList(JSON.parse(req.body))
			return res.status(200).json(newDistro)
		} catch (error) {
			console.error(error)
			throw new Error("Something is wrong POST request.")
		}
	}
}
