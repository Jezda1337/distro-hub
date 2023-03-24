import Loading from "@/components/Loading"
import { Button } from "@/components/ui/Button"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import lgThumbnail from "lightgallery/plugins/thumbnail"
import LightGallery from "lightgallery/react"
// @ts-ignore
import { CldImage } from "next-cloudinary"
import Head from "next/head"
import { useRouter } from "next/router"

import "lightgallery/css/lg-thumbnail.css"
import "lightgallery/css/lg-zoom.css"
import "lightgallery/css/lightgallery.css"
import lgZoom from "lightgallery/plugins/zoom"

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

			<div className="my-20 grid h-[300px] w-full place-items-center rounded shadow">
				<div className="flex gap-2">
					{data.images.length >= 1 ? (
						<LightGallery
							elementClassNames="flex"
							speed={500}
							plugins={[lgThumbnail, lgZoom]}>
							{data.images.map((image: any) => (
								<a
									key={image.id}
									href={`https://res.cloudinary.com/db1fkstfm/image/upload/v1679580698/${image.value}`}>
									<CldImage
										src={image.value}
										width={0}
										height={0}
										className="aspect-auto w-full object-cover"
										alt="image of current distro"
									/>
								</a>
							))}
						</LightGallery>
					) : (
						<p>No images</p>
					)}
				</div>
			</div>
			<div className="flex items-end">
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
				<h2 className=" ml-4 text-2xl first-letter:uppercase">{data.name}</h2>

				<div className="ml-auto flex gap-4">
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
