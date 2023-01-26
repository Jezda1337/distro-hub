import * as React from "react";
import { twMerge } from "tailwind-merge";

const defaultStyling = `w-full border rounded py-2 pr-7 px-3 h-9 focus:outline-black`;

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <div>
      <input
        placeholder="Placeholder .."
        className={twMerge(defaultStyling, className)}
        ref={ref}
        type="text"
        autoComplete="off"
        {...props}
      />
    </div>
  );
});

Input.displayName = "Input";

export { Input };
