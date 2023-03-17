import WaitingDistroCard from "@/components/WaitingDistroCard"
import { Distro } from "@/interfaces/distro.interface"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import Head from "next/head"

async function getWaitingList() {
	try {
		// const response = await fetch(`${process.env.base_api}/waitingList`)
		const response = await fetch("/api/v1/waitingList")
		return await response.json()
	} catch (error) {
		console.error(error)
	}
}

export async function getServerSideProps() {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(["waitingList"], getWaitingList)

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}

export default function WaitingList() {
	const { data, isLoading } = useQuery({
		queryKey: ["waitingList"],
		queryFn: getWaitingList,
	})

	return (
		<section className="mt-40">
			<Head>
				<title>DistroHub - Waiting List</title>
			</Head>
			<div className="flex w-full items-center justify-between border-gray-500 px-4 py-1 text-sm text-slate-500">
				<div className="w-full">
					<span>Logo</span>
					<span className="mx-1">|</span>
					<span>Name</span>
				</div>
				<div className="flex w-full justify-end text-end">
					<span className="w-full text-center">Submited date</span>
				</div>
				<span className="ml-auto">Details</span>
			</div>
			{isLoading ? (
				<>loading...</>
			) : data.length !== 0 ? (
				data.map((distro: Distro) => (
					<WaitingDistroCard
						key={distro.id}
						distro={distro}
					/>
				))
			) : (
				<p className="mt-7 text-center text-2xl font-bold">
					No waiting distros.
				</p>
			)}
		</section>
	)
}
