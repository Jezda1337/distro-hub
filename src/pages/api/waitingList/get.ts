import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  console.log(req.body);

  try {
    const getWaitingList = await prisma.waitingDistro.findMany();
    console.log(getWaitingList);
    res.status(200).json(getWaitingList);
  } catch (error) {
    console.error(error);
  }
}
