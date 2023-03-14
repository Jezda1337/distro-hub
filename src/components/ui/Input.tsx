import * as React from "react";
import { twMerge } from "tailwind-merge";

const defaultStyling = `w-full border border-neutral-300 rounded py-2 pr-7 px-3 h-[38.6px] hover:border-neutral-400 focus:outline outline-2 focus:outline-black outline-offset-[-1px] transition-colors`;

type InputProps = {
	label?: string;
	prefixText?: boolean;
};

const Input = React.forwardRef<
	HTMLInputElement,
	React.InputHTMLAttributes<HTMLInputElement> & InputProps
>(({ className, label, prefixText, ...props }, ref) => {
	return (
		<div className="w-full">
			{label ? (
				<label className="mb-1 inline-block text-base">{label}</label>
			) : null}
			<div className="flex w-full">
				{prefixText ? (
					<span className="inline-flex h-[38.6px] items-center rounded-l-md border border-r-0 border-neutral-300 px-3 text-slate-500">
						https://
					</span>
				) : null}

				<input
					placeholder="Placeholder .."
					className={twMerge(defaultStyling, className)}
					ref={ref}
					type="text"
					autoComplete="off"
					{...props}
				/>
			</div>
		</div>
	);
});

Input.displayName = "Input";

export { Input };
