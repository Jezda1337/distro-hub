import { motion } from "framer-motion"
import { useEffect } from "react"

export default function Backdrop({ children, handleClose, open }: any) {
	useEffect(() => {
		// document.body.style.overflow = "hidden"
		window.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				handleClose()
			}
		})
		return window.removeEventListener("keydown", handleClose)
	}, [handleClose])

	useEffect(() => {
		// if (open) {
		// 	window.document.body.style.overflowY = "hidden"
		// } else {
		// 	window.document.body.style.overflowY = "scroll"
		// }
	}, [open])

	return (
		<motion.div
			onClick={handleClose}
			className="absolute inset-0 z-10 grid place-items-center bg-black/50 backdrop-blur-sm"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}>
			{children}
		</motion.div>
	)
}
