import { Distro, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// create
export async function createDistro(distro: Distro) {
  if (distro.name === "" || distro.name.length === 0)
    throw new Error("Name is required.");

  const newDistro = await prisma.distro.create({
    data: distro,
  });

  return newDistro;
}

// read
export function getDistroByName(name: string) {
  if (name.length === 0 || name === "") throw new Error("Name is required");

  const distro = prisma.waitingDistro.findFirst({
    where: {
      name: name,
    },
  });

  return distro;
}

// update

// delete
