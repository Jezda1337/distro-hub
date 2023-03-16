import { setUserCookie } from "@/lib/auth"
import { NextApiRequest, NextApiResponse } from "next"

export default function hanlder(req: NextApiRequest, res: NextApiResponse) {
	const expTime = -1
	if (req.method === "GET") {
		setUserCookie(res, expTime).then((err) => console.error(err))
	}
}
