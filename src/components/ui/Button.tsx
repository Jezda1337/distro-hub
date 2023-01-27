import * as React from "react";
import { twMerge } from "tailwind-merge";

const defaultStyle = `px-3 py-1 border rounded bg-white hover:bg-black hover:text-white transition-all`;

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
