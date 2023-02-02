import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  try {
    const getWaitingList = await prisma.waitingDistro.findMany();
    return res.status(200).json(getWaitingList);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: res.statusMessage,
    });
  }
}
