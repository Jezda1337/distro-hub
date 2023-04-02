import { TrashIcon } from "@heroicons/react/20/solid"
// import { Cloudinary } from "@cloudinary/url-gen"
import { Button } from "./ui/Button"

export default function FileCard({
	image,
	images,
	setImages,
}: {
	image: any
	images: any[]
	setImages?: any
	index: number
}) {
	function handleRemove() {
		const index = images.indexOf(image)
		if (index > -1) {
			setImages(images.filter((img) => img !== images[index]))
		}

		handleRemoveImage()
	}

	async function handleRemoveImage() {
		const res = await fetch("api/v1/distro/delete-image", {
			method: "POST",
			body: JSON.stringify(image.public_id),
		})

		if (res.status !== 200) {
			console.error(res.statusText)
		}
	}
	return (
		<div className="flex w-full items-center justify-between rounded border p-2">
			<p>{image.original_filename}</p>
			<Button
				type="button"
				onClick={handleRemove}
				className="after:bg-red-500 hover:bg-red-500">
				<TrashIcon className="h-5 w-5" />
			</Button>
		</div>
	)
}
