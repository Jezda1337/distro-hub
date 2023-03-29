import { motion } from "framer-motion"

export default function Backdrop({ children, handleClose }: any) {
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
