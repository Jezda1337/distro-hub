import Loading from "@/components/Loading"
import { Button } from "@/components/ui/Button"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
// @ts-ignore
import { CldImage } from "next-cloudinary"
import Head from "next/head"
import { useRouter } from "next/router"

import Carousel from "@/components/Carousel"

export const runtime = "edge"

async function getDistro({ queryKey }: any) {
	let [_, distro] = queryKey
	// make first letter capital
	distro = distro.charAt(0).toUpperCase() + distro.slice(1)

	try {
		const response = await fetch(`/api/v1/distro/${distro}`)
		return await response.json()
	} catch (error) {
		console.error(error)
	}
}

export async function getServerSideProps({ params }: any) {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(["distro", params["distro"]], getDistro)

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}

export default function Distro() {
	const { query, push } = useRouter()
	const { data } = useQuery({
		queryKey: ["distro", query.distro],
		queryFn: getDistro,
	})

	if (data === null) {
		push("/404")
		return
	}

	if (!data) {
		return <Loading />
	}

	return (
		<section className="my-20">
			<Head>
				<title>DistroHub - {data.name}</title>
			</Head>

			<div className="my-20 grid w-full place-items-center rounded shadow md:min-h-[300px]">
				<div className="grid h-full w-full place-items-center">
					{data.images.length ? (
						<Carousel
							images={data.images}
							distroName={data.name}
						/>
					) : (
						<p>No images 😭</p>
					)}
				</div>
			</div>
			<div className="flex flex-col items-start md:flex-row md:items-end">
				<CldImage
					alt="logo"
					src={data.logo}
					width="0"
					height="0"
					className="h-12 w-12"
					format="svg"
					placeholder="blur"
					blurDataURL="rgba(237, 181, 6)"
				/>
				<h2 className="my-2 text-2xl first-letter:uppercase md:my-0 md:ml-4">
					{data.name}
				</h2>

				<div className="flex gap-4 md:ml-auto">
					<a
						rel="noreferrer"
						target="_blank"
						href={`//${data.website}`}>
						<Button>web</Button>
					</a>
					<a
						rel="noreferrer"
						target="_blank"
						href={`//${data.downloadLink}` || `${data.downloadLink}`}>
						<Button>Download</Button>
					</a>
				</div>
			</div>
			<div className="mt-20">
				<h2 className=" relative my-4 text-2xl first-letter:uppercase after:absolute after:top-1/2 after:ml-5 after:h-[3px] after:w-12 after:-translate-y-1/2 after:rounded-full after:bg-black">
					About
				</h2>
				<p className="">{data.about}</p>
			</div>
		</section>
	)
}
