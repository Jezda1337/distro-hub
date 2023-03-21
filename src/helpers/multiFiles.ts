export default async function multiFiles(file: File) {
	const url = "https://api.cloudinary.com/v1_1/db1fkstfm/image/upload"
	const body = new FormData()

	body.append("file", file, file.name)
	body.append("upload_preset", "distro_images")

	const config = {
		method: "POST",
		body,
	}

	try {
		const response = await fetch(url, config)
		return await response.json()
	} catch (error) {
		console.error(error)
		throw new Error("somethign is not okay in customHook")
	}
}
