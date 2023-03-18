import * as React from "react"
import { twMerge } from "tailwind-merge"

const defaultStyle = `"after:transition-[border-radius, transform] relative isolate overflow-hidden rounded border border-black bg-white px-3 py-1 transition-all after:absolute after:inset-0 after:-z-10 after:block after:origin-bottom after:scale-y-0 after:rounded-t-[10rem] after:bg-black after:duration-[0.4s] hover:scale-110 hover:bg-black hover:text-white hover:transition-all hover:duration-[400ms] hover:after:scale-y-100 hover:after:rounded-none active:scale-100 active:transition-transform active:delay-75"`

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
