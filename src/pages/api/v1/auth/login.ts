import { setUserCookie } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function hanlder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userName, password } = JSON.parse(req.body);

  if (req.method === "POST") {
    if (userName === "admin" && password === "admin123") {
      setUserCookie(res).then((err) => {
        console.log(err);
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
  }
}
