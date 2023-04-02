import { CldImage } from "next-cloudinary"
import Link from "next/link"

export default function DistroCard({ distro }: { distro: any }): JSX.Element {
	return (
		<article className="my-3 flex w-full items-center rounded border border-gray-500 px-4 py-1 transition-all md:hover:scale-[1.025] md:hover:shadow-2xl md:hover:transition-all">
			<div>
				<CldImage
					alt="test"
					src={distro.logo}
					width="0"
					height="0"
					className="aspect-square w-8"
					format="svg"
					placeholder="blur"
					blurDataURL="rgba(237, 181, 6)"
				/>
			</div>
			<h3 className="ml-4 font-bold first-letter:uppercase">{distro.name}</h3>
			<Link
				className="ml-auto rounded px-2 py-1 transition-colors hover:bg-black hover:text-white"
				href={"/distro/" + distro.name.toLowerCase()}>
				<p className="ml-auto">read more</p>
			</Link>
		</article>
	)
}
