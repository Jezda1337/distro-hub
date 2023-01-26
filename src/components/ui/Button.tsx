import * as React from "react";
import { twMerge } from "tailwind-merge";

const defaultStyle = `px-3 py-1 border rounded bg-white hover:bg-black hover:text-white transition-all relative after:inset-0 after:rounded after:border after:w-full after:h-full after:absolute after:translate-x-1 after:translate-y-1 after:-z-10 after:hover:translate-x-2 after:hover:translate-y-2 after:transition-all`;

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button className={twMerge(defaultStyle, className)} ref={ref} {...props} />
  );
});

Button.displayName = "Button";

export { Button };
