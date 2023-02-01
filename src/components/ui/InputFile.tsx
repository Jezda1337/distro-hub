import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "./Button";

const defaultStyling = `block px-3 py-1 md:hover:cursor-pointer`;

const InputFile = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
  }
>(({ className, label, ...props }, ref) => {
  return (
    <div>
      <Button className="w-full p-0 overflow-hidden" type="button">
        <label
          htmlFor="input_file"
          className={twMerge(defaultStyling, className)}
        >
          {label ? label : "Upload file"}
        </label>
      </Button>
      <input
        id="input_file"
        placeholder="Placeholder .."
        ref={ref}
        type="file"
        className="hidden"
        autoComplete="off"
        {...props}
      />
    </div>
  );
});

InputFile.displayName = "InputFile";

export { InputFile };
