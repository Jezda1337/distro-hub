import { Distro } from "@prisma/client"
// @ts-ignore
import { CldImage } from "next-cloudinary"

export default function WaitingDistroCard({ distro }: { distro: Distro }) {
	const submittedDate = new Date(distro.createdAt)

	function toJSONLocal(date: Date) {
		var local = new Date(date)
		local.setMinutes(date.getMinutes() - date.getTimezoneOffset())
		return local.toJSON().slice(0, 10)
	}

	return (
		<article className="my-3 flex w-full items-center justify-between rounded border border-gray-500 px-4 py-1 md:hover:shadow-lg md:hover:transition-all">
			<div>
				<CldImage
					alt="test"
					src={distro.logo}
					width="0"
					height="0"
					className="aspect-square w-8"
					format="svg"
				/>
			</div>

			<div className="flex w-full items-center">
				<h3 className="ml-4 w-full font-bold">{distro.name}</h3>
				<h3 className="w-full text-center font-medium">
					{toJSONLocal(submittedDate)}
				</h3>
			</div>

			<a
				className="ml-auto"
				target="_blank"
				rel="noreferrer"
				href={`http://www.${distro.website}`}>
				website
			</a>
		</article>
	)
}
