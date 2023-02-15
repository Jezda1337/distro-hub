import { getDistroByName } from "@/services/distro.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { distroName } = req.query;

  if (req.method === "GET") {
    const distro = await getDistroByName(distroName);
    return res.status(200).json(distro);
  }
}
