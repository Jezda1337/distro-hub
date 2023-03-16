export function IsFileSizeOk(size: number): boolean {
	const oneMB = 1024
	const fileSize = Math.round(size / oneMB)
	if (fileSize >= oneMB) {
		return false
	} else {
		return true
	}
}
