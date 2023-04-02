import DistroForm from "@/components/DistroForm"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import Backdrop from "./Backdrop"
import DropdownMenu from "./DropdownMenu"
import { Button } from "./ui/Button"

export default function Header() {
	const [open, setOpen] = useState(false)

	function handleOpen() {
		setOpen(!open)
	}

	return (
		<header className="pt-14 flex justify-between md:pt-12">
			<Link href="/">
				<h1 className="text-2xl font-bold transition-all hover:scale-110">
					DistroHub
				</h1>
			</Link>
			<div className="flex gap-6">
				<DropdownMenu />
				<Button
					onClick={handleOpen}
					className="text-base sm:text-xl ">
					Submit distro
				</Button>
			</div>
			<AnimatePresence>
				{open ? (
					<Backdrop
						handleClose={handleOpen}
						open={open}>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0 }}
							transition={{
								duration: 0.25,
							}}
							className="w-full h-full flex items-center justify-center">
							<DistroForm
								open
								setOpen={setOpen}
								handleOpen={handleOpen}
							/>
						</motion.div>
					</Backdrop>
				) : null}
			</AnimatePresence>
		</header>
	)
}
