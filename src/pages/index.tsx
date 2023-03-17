import DistroCard from "@/components/DistroCard"
import Filters from "@/components/Filters"
import WorkInProgressBar from "@/components/WorkInProgressBar"
import { useStore } from "@/context/store"
import { Distro } from "@/interfaces/distro.interface"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import Head from "next/head"
import { useMemo } from "react"

export default function Home() {
	const { data, isLoading } = useQuery({
		queryKey: ["distros"],
		queryFn: getDistros,
	})

	const { env, basedOn, search } = useStore()

	const filteredData = useMemo(() => {
		if (search)
			return data.filter((d: any) =>
				d.name.toLowerCase().match(search.toLowerCase())
			)
		if ((!env && !basedOn) || (env === null && basedOn === null)) return data
		if (basedOn && !env)
			return data.filter(
				(d: any) => d.basedOn.toLowerCase() === basedOn?.name.toLowerCase()
			)
		if (env && !basedOn)
			return data.filter((d: any) =>
				d.desktopEnvironments.includes(env.name.toLowerCase())
			)

		return []
	}, [search, data, env, basedOn])

	return (
		<section>
			<Head>
				<title>DistroHub</title>
			</Head>
			<Filters />
			<h1 className="mb-8 text-3xl font-bold">Most Popular</h1>

			<div className="mb-4 flex items-center px-4 text-sm text-slate-500">
				<div>
					<span>Logo</span>
					<span className="mx-2">|</span>
					<span>Name</span>
				</div>
				<span className="ml-auto">Details</span>
			</div>
			{isLoading ? (
				<> loading...</>
			) : filteredData.length !== 0 ? (
				filteredData?.map((distro: Distro, index: number) => (
					<DistroCard
						key={index}
						distro={distro}
					/>
				))
			) : (
				<p className=" mt-7 text-center text-2xl font-bold">Nothing found.</p>
			)}
			<WorkInProgressBar />
		</section>
	)
}

async function getDistros() {
	try {
		// const response = await fetch(`${process.env.base_api}/distro`)
		const response = await fetch("/api/v1/distro")
		if (response.status === 200) return await response.json()
		return response.status
	} catch (error) {
		console.error(error)
	}
}

export async function getServerSideProps() {
	const queryClient = new QueryClient()
	queryClient.clear()
	await queryClient.prefetchQuery(["distros"], getDistros)

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}
