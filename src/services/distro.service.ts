// import { Distro } from "@/interfaces/distro.interface"
import { Distro, PrismaClient, WaitingDistro } from "@prisma/client"

const prisma = new PrismaClient()

// create
export async function createDistro(distro: Distro) {
	if (distro.name === "" || distro.name.length === 0)
		throw new Error("Name is required.")

	const newDistro = await prisma.distro.create({
		data: distro,
	})

	return newDistro
}

export async function addToWaitingList(distro: WaitingDistro) {
	const newDistro = await prisma.waitingDistro.create({
		data: distro,
	})

	return newDistro
}

// read
export function getDistros() {
	const distros = prisma.distro.findMany({
		include: {
			desktopEnvironments: true,
			images: true,
		},
	})
	return distros
}

export function getDistroByName(distroName: string) {
	if (distroName.length === 0 || !distroName)
		throw new Error("Name is required")

	const distro = prisma.distro.findFirst({
		where: {
			name: distroName,
		},
		include: {
			desktopEnvironments: true,
			images: true,
		},
	})

	return distro
}

export async function getWaitingDistros() {
	const distros = await prisma.waitingDistro.findMany()
	return distros
}

export async function getWaitingDistro(distroName: string) {
	const distro = await prisma.waitingDistro.findFirst({
		where: {
			name: distroName,
		},
	})
	return distro
}

// update

// delete
