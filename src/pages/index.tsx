import DistroCard from "@/components/DistroCard"
import Filters from "@/components/Filters"
import Footer from "@/components/Footer"
import Loading from "@/components/Loading"
import { useStore } from "@/context/store"
import { Distro } from "@prisma/client"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import Head from "next/head"
import { useMemo } from "react"

export default function Home() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["distros"],
		queryFn: getDistros,
	})

	// context
	const { env, basedOn, search } = useStore()

	// filtering
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
			return data.filter((d: any, _i: number) => {
				return d.de.find(
					(obj: any) => obj.value.toLowerCase() === env.name.toLowerCase()
				)
			})
		if (env && basedOn) {
			return data.filter((d: any) => {
				const { name } = env
				return d.de.find(
					(obj: any) =>
						obj.value === name.toLowerCase() &&
						basedOn.name.toLowerCase() === d.basedOn.toLowerCase()
				)
			})
		}
		return []
	}, [search, data, env, basedOn])

	if (error) {
		return <>error</>
	}

	return (
		<section className="flex min-h-[calc(100vh-5.375rem)] flex-col">
			<Head>
				<title>DistroHub</title>
			</Head>
			<Filters />
			<h1 className="mb-8 text-3xl font-bold">All Distros</h1>

			<div className="mb-4 flex items-center px-4 text-sm text-slate-500">
				<div>
					<span>Logo</span>
					<span className="mx-2">|</span>
					<span>Name</span>
				</div>
				<span className="ml-auto">Details</span>
			</div>
			<div>
				{isLoading ? (
					<Loading />
				) : data && filteredData.length !== 0 ? (
					filteredData.map((distro: Distro, index: number) => (
						<DistroCard
							key={index}
							distro={distro}
						/>
					))
				) : (
					<p className=" mt-7 text-center text-2xl font-bold">Nothing found.</p>
				)}
			</div>

			<Footer />
		</section>
	)
}

async function getDistros() {
	try {
		const response = await fetch("/api/v1/distro")
		if (response.status !== 200) return []
		return await response.json()
	} catch (error) {
		console.error(error)
	}
}

export async function getServerSideProps() {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(["distros"], getDistros)

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}
