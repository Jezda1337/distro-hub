import { getWaitingDistro } from "@/services/distro.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { distroName } = req.query;

  if (req.method === "GET") {
    try {
      const waitingDistro = await getWaitingDistro(distroName);
      return res.status(200).json([waitingDistro]);
    } catch (error) {
      throw new Error("Something is wrong in GET request.");
    }
  }
}
