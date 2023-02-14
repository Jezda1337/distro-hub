import { createDistro, getDistroByName } from "@/services/distro.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const distro = await getDistroByName("Arch Linux");
    return res.status(200).json(distro);
  }

  if (req.method === "POST") {
    const distro = await createDistro(req.body).then((d) => console.log(d));
    return distro; // this need to change
  }
}
