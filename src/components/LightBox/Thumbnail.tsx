import { CldImage } from "next-cloudinary"
import { useEffect, useRef } from "react"

export default function Thumbnail({
	currentImage,
	index,
	setCurrentImage,
	thumbnail,
}: any) {
	const ref = useRef<HTMLAnchorElement>(null)
	function handleThumbnail() {
		setCurrentImage(index)
		ref.current?.scrollIntoView({
			block: "nearest",
			inline: "start",
			behavior: "smooth",
		})
	}

	useEffect(() => {
		if (currentImage === index) {
			// solves the problem on chromium base browsers, not good but workaround
			setTimeout(function () {
				ref.current?.scrollIntoView({
					block: "nearest",
					inline: "start",
					behavior: "smooth",
				})
			}, 0)
		}
	}, [currentImage, index])

	return (
		<a
			ref={ref}
			className={`aspect-auto flex-1 max-w-[150px] min-w-[150px] rounded overflow-hidden transition snap-center`}
			onClick={handleThumbnail}>
			<CldImage
				className="h-full w-full object-cover"
				crop="thumb"
				gravity="faces"
				// zoom="100"
				style={
					currentImage === index
						? { filter: "grayscale(0%)" }
						: { filter: "grayscale(1000%)" }
				}
				width={200}
				height={200}
				src={thumbnail.value}
				alt=""
			/>
		</a>
	)
}
