// 1m for storing in db, so covert to base64 and string storing into db - not
// recommendent
// not in use
export function IsFileSizeOk(size: number): boolean {
	const oneMB = 1024
	const fileSize = Math.round(size / oneMB)
	if (fileSize >= oneMB) {
		return false
	} else {
		return true
	}
}
