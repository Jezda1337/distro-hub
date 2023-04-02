import { motion } from "framer-motion"
import { useEffect } from "react"

export default function Backdrop({ children, handleClose }: any) {
	useEffect(() => {
		window.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				handleClose()
			}
		})
		return window.removeEventListener("keydown", handleClose)
	}, [handleClose])

	return (
		<motion.div
			onClick={handleClose}
			className="fixed inset-0 overflow-scroll flex justify-center items-center z-10 bg-black/50 backdrop-blur-sm"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}>
			{children}
		</motion.div>
	)
}
