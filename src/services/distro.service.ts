import { Distro } from "@/interfaces/distro.interface";
import { PrismaClient, WaitingDistro } from "@prisma/client";

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

export async function addToWaitingList(distro: WaitingDistro) {
  const newDistro = await prisma.waitingDistro.create({
    data: distro,
  });

  return newDistro;
}

// read
export function getDistros() {
  const distros = prisma.distro.findMany();
  return distros;
}
export function getDistroByName(name: any) {
  if (name.length === 0 || name === "") throw new Error("Name is required");

  const distro = prisma.distro.findFirst({
    where: {
      name: name,
    },
  });

  return distro;
}

export async function getWaitingDistros() {
  const distros = await prisma.waitingDistro.findMany();
  return distros;
}

// update

// delete
