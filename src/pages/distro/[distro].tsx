import { Button } from "@/components/ui/Button"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
// @ts-ignore
import { CldImage } from "next-cloudinary"
import Head from "next/head"
import { useRouter } from "next/router"

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
	const { query } = useRouter()

	const { data } = useQuery({
		queryKey: ["distro", query.distro],
		queryFn: getDistro,
	})

	if (!data) {
		return <h1 className="">Still in development</h1>
	}

	return (
		<section className="my-20">
			<Head>
				<title>DistroHub - {data.name}</title>
			</Head>

			<div className="my-20 h-[300px] w-full bg-red-100"></div>
			<div className="flex items-end">
				<CldImage
					alt="test"
					src={"logos/" + data.logo}
					width="0"
					height="0"
					className="h-12 w-12"
					format="svg"
					placeholder="blur"
					blurDataURL="rgba(237, 181, 6)"
				/>
				<h2 className=" ml-4 text-2xl first-letter:uppercase">{data.name}</h2>

				<div className="ml-auto flex gap-4">
					<Button className="">
						<a
							rel="noreferrer"
							target="_blank"
							href={`//${data.website}`}>
							web
						</a>
					</Button>
					<Button className="">
						{/* href need change */}
						<a
							rel="noreferrer"
							target="_blank"
							href={data.download || ""}>
							download
						</a>
					</Button>
				</div>
			</div>
			<div className="mt-20">
				<h2 className=" relative my-4 text-2xl first-letter:uppercase after:absolute after:top-1/2 after:ml-5 after:h-[3px] after:w-12 after:-translate-y-1/2 after:rounded-full after:bg-black">
					About
				</h2>
				<p className="">{data.description}</p>
			</div>
		</section>
	)
}
