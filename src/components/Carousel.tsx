import { AnimatePresence } from "framer-motion"
import { CldImage } from "next-cloudinary"
import { useState } from "react"
import Backdrop from "./Backdrop"
import LightBox from "./LightBox"

export default function Carousel({ images, distroName }: any) {
	const [currentImage, setCurrentImage] = useState(0)
	const [open, setOpen] = useState(false)

	function handleOpen() {
		setOpen(!open)
	}

	function handleNextImage() {
		console.log("tets")
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
		<>
			<div className="group relative h-full overflow-hidden rounded transition-all">
				<div className="relative flex w-full overflow-hidden">
					{images.map((image: any, index: number) => (
						<div
							onClick={handleOpen}
							key={index}
							className="max-h-[490px] min-w-full transition-all"
							style={{ transform: `translateX(-${currentImage}00%)` }}>
							<CldImage
								src={image.value}
								width={0}
								height={0}
								className="h-full w-full object-cover"
								alt="image of current distro"
							/>
						</div>
					))}
				</div>
				<button
					className="absolute top-1/2 left-5 -translate-y-1/2 rounded border bg-transparent px-5 py-2 text-white transition-all hover:bg-neutral-900 lg:-translate-x-[150%] lg:group-hover:-translate-x-0"
					onClick={handlePrevImage}>
					«
				</button>
				<button
					className="absolute top-1/2 right-5 -translate-y-1/2 rounded border bg-transparent px-5 py-2 text-white transition-all hover:bg-neutral-900 lg:translate-x-[150%] lg:group-hover:-translate-x-0"
					onClick={handleNextImage}>
					»
				</button>
				<div className="absolute top-0 flex w-full items-center justify-between bg-gradient-to-b from-black/75 to-transparent px-5 py-2 text-right text-white transition-all lg:-translate-y-full lg:group-hover:translate-y-0">
					<div>{distroName}</div>
					<div>
						{currentImage + 1}/{images.length}
					</div>
				</div>
			</div>
			<AnimatePresence>
				{open ? (
					<Backdrop
						handleClose={handleOpen}
						open={open}>
						<LightBox
							open={open}
							currentImage={currentImage}
							images={images}
							setOpen={handleOpen}
							setCurrentImage={setCurrentImage}
						/>
					</Backdrop>
				) : null}
			</AnimatePresence>
		</>
	)
}
