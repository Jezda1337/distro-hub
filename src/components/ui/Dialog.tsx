import * as React from "react"
import { twMerge } from "tailwind-merge"

const defaultStyling = ``

const Dialog = React.forwardRef<
	HTMLDialogElement,
	React.DialogHTMLAttributes<HTMLDialogElement>
>(({ className, ...props }, ref) => {
	return (
		<dialog
			className={twMerge(defaultStyling, className)}
			{...props}
			ref={ref}
		/>
	)
})

Dialog.displayName = "Dialog"

export { Dialog }
