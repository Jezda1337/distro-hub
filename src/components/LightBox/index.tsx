import { CldImage } from "next-cloudinary"
import Thumbnail from "./Thumbnail"

export default function LightBox({
	images,
	currentImage,
	setOpen,
	setCurrentImage,
	open,
}: any) {
	function handleNextImage() {
		setCurrentImage((a) => a + 1)
		if (currentImage == images.length - 1) {
			setCurrentImage(0)
		}
	}
	function handlePrevImage() {
		setCurrentImage((a) => a - 1)
		if (currentImage <= 0) {
			setCurrentImage(images.length - 1)
		}
	}

	return (
		<div onClick={(e) => e.stopPropagation()}>
			<div className="absolute top-4 right-20 flex gap-6">
				<div className="text-white">
					{currentImage + 1}/{images.length}
				</div>
				<button onClick={() => setOpen(false)}>close</button>
			</div>
			<div tabIndex={0}>
				<div className="relative">
					<div className="flex w-full max-w-6xl overflow-hidden rounded">
						<div
							className="flex w-full transition ease-in"
							style={{ transform: `translateX(-${currentImage}00%)` }}>
							{images.map((image: any, index: number) => (
								<CldImage
									className="h-full w-full min-w-full"
									key={index}
									src={image.value}
									zoom="0.5"
									alt=""
									width={0}
									height={0}
								/>
							))}
						</div>
					</div>

					<button
						onClick={handlePrevImage}
						className="absolute top-1/2 left-5 -translate-y-1/2 rounded border bg-transparent px-5 py-2 text-white transition-all hover:bg-neutral-900 lg:-translate-x-[150%] lg:group-hover:-translate-x-0">
						«
					</button>
					<button
						onClick={handleNextImage}
						className="absolute top-1/2 right-5 -translate-y-1/2 rounded border bg-transparent px-5 py-2 text-white transition-all hover:bg-neutral-900 lg:translate-x-[150%] lg:group-hover:-translate-x-0">
						»
					</button>
				</div>
				<div className="scrollbar-hide mt-4 flex max-w-6xl snap-x snap-proximity overflow-y-hidden overflow-x-scroll">
					<div className={`w-full h-full justify-center flex gap-2`}>
						{open
							? images.map((_image: any, index: number) => (
									<Thumbnail
										thumbnail={_image}
										key={index}
										index={index}
										setCurrentImage={setCurrentImage}
										currentImage={currentImage}
									/>
							  ))
							: null}
					</div>
				</div>
			</div>
		</div>
	)
}
