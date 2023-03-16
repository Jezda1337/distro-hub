import * as React from "react"
import { twMerge } from "tailwind-merge"

const defaultStyle = `relative isolate overflow-hidden rounded border border-black bg-white px-3 py-1 transition-all after:absolute after:inset-0 after:-z-10 after:block after:origin-bottom after:scale-y-0 after:rounded-t-[10rem] after:bg-black after:transition-[border-radius, transform] after:duration-[0.4s] hover:text-white hover:after:scale-y-100 hover:after:rounded-none hover:transition-all hover:duration-[400ms] hover:bg-black active:scale-100 active:transition-transform`

const Button = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
	return (
		<button
			className={twMerge(defaultStyle, className)}
			ref={ref}
			{...props}
		/>
	)
})

Button.displayName = "Button"

export { Button }
