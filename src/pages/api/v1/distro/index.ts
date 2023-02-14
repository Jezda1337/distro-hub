import { createDistro, getDistros } from "@/services/distro.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const distros = await getDistros();
    return res.status(200).json(distros);
  }

  if (req.method === "POST") {
    const distro = await createDistro(req.body);
    return res.status(200).json(distro);
  }
}
