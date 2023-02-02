import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "./Button";
import { ArrowUpTrayIcon } from "@heroicons/react/20/solid";

const defaultStyling = `flex w-full gap-3 justify-center items-center px-3 py-3 text-slate-500 md:hover:cursor-pointer`;

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
          <span>{label ? label : "Upload file"}</span>
          <ArrowUpTrayIcon className="w-5 h-5" />
          <input
            id="input_file"
            placeholder="Placeholder .."
            ref={ref}
            type="file"
            className="hidden"
            autoComplete="off"
            {...props}
          />
        </label>
      </Button>
    </div>
  );
});

InputFile.displayName = "InputFile";

export { InputFile };
