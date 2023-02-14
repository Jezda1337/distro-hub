import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const data = JSON.parse(body);
  const prisma = new PrismaClient();

  try {
    const newWaitingDistro = await prisma.waitingDistro.create({
      data: {
        email: data.email,
        name: data.name,
        website: data.website,
        description: data.description,
        logo: data.logo,
        createdAt: new Date(),
      },
    });

    res.status(200).json(newWaitingDistro);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error,
    });
  }
}
