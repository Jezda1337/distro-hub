import { setUserCookie } from "@/lib/auth"
import { NextApiRequest, NextApiResponse } from "next"

export default async function hanlder(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { userName, password } = JSON.parse(req.body)
	const expTime = 60 * 60 * 2

	if (req.method === "POST") {
		if (userName === "admin" && password === "admin123") {
			setUserCookie(res, expTime).then((err) => {
				console.error(err)
			})
		} else {
			return res.status(401).json({ message: "Invalid credentials!" })
		}
	}
}
